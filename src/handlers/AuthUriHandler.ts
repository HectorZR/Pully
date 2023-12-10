import { Uri, window } from 'vscode';
import { GetGithubAccess } from '../services/GetGithubAccess';
import { GITHUB_PROVIDER } from '../constants/gitProviders';
import { EditorStorage, StorageKeys } from '../storages/EditorStorage';

export class AuthUriHandler {
	static handleUri(uri: Uri) {
		const queryParams = new URLSearchParams(uri.query);
		const isGithubProvider =
			EditorStorage.get(StorageKeys.GLOBAL_GIT_PROVIDER) === GITHUB_PROVIDER;

		const authCode = queryParams.get('code');
		const stateCode = queryParams.get('state');
		if (isGithubProvider && authCode && stateCode) {
			GetGithubAccess.getAccessToken(authCode, stateCode);
		}
	}

	static registerUriHandler() {
		window.registerUriHandler({
			handleUri: AuthUriHandler.handleUri,
		});
	}
}
