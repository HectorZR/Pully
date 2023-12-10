import { env, Uri } from 'vscode';
import { ErrorHandler, NotifierHandler } from '../handlers';
import { EditorStorage, StorageKeys } from '../storages/EditorStorage';
import { AuthTokenResponse } from './types';

export class GetGithubAccess {
	static getAccessCode() {
		const url =
			'https://github.com/login/oauth/authorize?' +
			new URLSearchParams({
				client_id: process.env.GITHUB_CLIENT_ID ?? '',
				state: new Date().getTime().toString(),
			});
		env.openExternal(Uri.parse(url));
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
				console.log('data', data);
				if (!(data && typeof data === 'object' && 'access_token' in data)) {
					NotifierHandler.error(
						'Something went wrong while getting access token'
					);
					return;
				}

				EditorStorage.set(StorageKeys.SECRET_AUTH, data, 'secret');
			})
			.catch((error) => {
				console.error(error);
				ErrorHandler.handleError(error);
			});
	}
}
