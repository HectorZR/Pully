import * as vscode from 'vscode';
import { GetGithubAccess } from '../services/GetGithubAccess';
import { GITHUB_PROVIDER } from '../constants/gitProviders';
import { EditorStorage } from '../storages/EditorStorage';

export class AuthUriHandler {
	static handleUri(uri: vscode.Uri) {
		const queryParams = new URLSearchParams(uri.query);
		const isGithubProvider =
			EditorStorage.get('gitProvider') === GITHUB_PROVIDER;

		const authCode = queryParams.get('code');
		const stateCode = queryParams.get('state');
		if (isGithubProvider && authCode && stateCode) {
			GetGithubAccess.getAccessToken(authCode, stateCode);
		}
	}

	static registerUriHandler() {
		vscode.window.registerUriHandler({
			handleUri: AuthUriHandler.handleUri,
		});
	}
}
