import { Uri, env } from 'vscode';
import { Octokit, App } from 'octokit';
import { ErrorHandler, NotifierHandler } from '../handlers';
import { EditorStorage, SecretStorageKeys } from '../storages/EditorStorage';
import { TokenInfo } from './types';

class GithubProvider {
	public client: Octokit | undefined;
	private app: App | undefined;
	private token = '';
	private tokenExpiresAt = '';
	private refreshToken = '';
	private refreshTokenExpiresAt = '';

	initializeProvider() {
		this.app = new App({
			appId: process.env.GITHUB_APP_ID,
			privateKey: process.env.GITHUB_SECRET,
			oauth: {
				clientId: process.env.GITHUB_CLIENT_ID,
				clientSecret: process.env.GITHUB_CLIENT_SECRET,
			},
		});

		this.client = this.app.octokit;
		this.retrieveTokenInfo();
	}

	getAccessCode() {
		if (this.token && this.isTokenValid(this.tokenExpiresAt)) {
			return NotifierHandler.info('Already connected to Github');
		}

		const url =
			'https://github.com/login/oauth/authorize?' +
			new URLSearchParams({
				client_id: process.env.GITHUB_CLIENT_ID,
				state: new Date().getTime().toString(),
			});
		env.openExternal(Uri.parse(url));
	}

	async getAccessToken(code: string, state: string) {
		console.log('Getting access token');
		if (!this.app) {
			return NotifierHandler.error('Github provider not initialized');
		}

		try {
			const { authentication: auth } = await this.app.oauth.createToken({
				code,
				state,
			});
			if (!('expiresAt' in auth)) {
				return NotifierHandler.error('No valid token retrieved');
			}

			console.log('auth', auth);
			await this.saveTokenInfo({
				token: auth.token,
				refreshToken: auth.refreshToken,
				refreshTokenExpiresAt: auth.refreshTokenExpiresAt,
				tokenExpiresAt: auth.expiresAt,
			});
		} catch (error) {
			ErrorHandler.handleError(error);
		}
	}

	private isTokenValid(expiresAt: string) {
		return new Date(expiresAt) > new Date();
	}

	private async retrieveTokenInfo() {
		this.token = (await EditorStorage.getSecret(SecretStorageKeys.TOKEN)) ?? '';
		this.tokenExpiresAt =
			(await EditorStorage.getSecret(SecretStorageKeys.TOKEN_EXPIRES_AT)) ?? '';
		this.refreshToken =
			(await EditorStorage.getSecret(SecretStorageKeys.REFRESH_TOKEN)) ?? '';
		this.refreshTokenExpiresAt =
			(await EditorStorage.getSecret(
				SecretStorageKeys.REFRESH_TOKEN_EXPIRES_AT
			)) ?? '';
	}

	private async saveTokenInfo({
		token,
		refreshToken,
		refreshTokenExpiresAt,
		tokenExpiresAt,
	}: TokenInfo) {
		this.token = token;
		this.tokenExpiresAt = tokenExpiresAt;
		this.refreshToken = refreshToken;
		this.refreshTokenExpiresAt = refreshTokenExpiresAt;

		await EditorStorage.setSecret(SecretStorageKeys.TOKEN, this.token);
		await EditorStorage.setSecret(
			SecretStorageKeys.TOKEN_EXPIRES_AT,
			this.tokenExpiresAt
		);
		await EditorStorage.setSecret(
			SecretStorageKeys.REFRESH_TOKEN,
			this.refreshToken
		);
		await EditorStorage.setSecret(
			SecretStorageKeys.REFRESH_TOKEN_EXPIRES_AT,
			this.refreshTokenExpiresAt
		);
	}
}

export const githubProvider = new GithubProvider();
