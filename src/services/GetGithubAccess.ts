import * as vscode from 'vscode';
import { ErrorHandler } from '../handlers/ErrorHandler';
import { AuthTokenResponse } from './types';

export class GetGithubAccess {
	static getAccessCode() {
		const url =
			'https://github.com/login/oauth/authorize?' +
			new URLSearchParams({
				client_id: process.env.GITHUB_CLIENT_ID ?? '',
				state: new Date().getTime().toString(),
			});
		vscode.env.openExternal(vscode.Uri.parse(url));
	}

	static getAccessToken(code: string, state: string) {
		const queryParams = new URLSearchParams({
			code,
			client_id: process.env.GITHUB_CLIENT_ID,
			client_secret: process.env.GITHUB_CLIENT_SECRET,
			state,
		}).toString();
		const url: NodeJS.fetch.RequestInfo =
			'https://github.com/login/oauth/access_token?' + queryParams;
		const options: RequestInit = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		};
		fetch(url, options)
			.then((response) => response.json())
			.then((data) => {
				// TODO: save access token to global or secret state and use it to make requests
				console.log('data', data);
				if (data && typeof data === 'object' && 'access_token' in data) {
					vscode.window.showInformationMessage(
						'this is your access token: ' + data.access_token
					);
				}
			})
			.catch((error) => {
				console.error(error);
				ErrorHandler.handleError(error);
			});
	}
}
