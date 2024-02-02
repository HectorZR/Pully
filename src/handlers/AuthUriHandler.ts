import { Uri, window } from 'vscode';
import { GITHUB_PROVIDER } from '../constants/gitProviders';
import { EditorStorage, GlobalStorageKeys } from '../storages/EditorStorage';
import { githubProvider } from '../providers/GithubProvider';

export class AuthUriHandler {
	static async handleUri(uri: Uri) {
		const queryParams = new URLSearchParams(uri.query);
		const isGithubProvider =
			EditorStorage.get(GlobalStorageKeys.GIT_PROVIDER) === GITHUB_PROVIDER;

		const authCode = queryParams.get('code');
		const stateCode = queryParams.get('state');
		if (isGithubProvider && authCode && stateCode) {
			await githubProvider.getAccessToken(authCode, stateCode);
		}
	}

	static registerUriHandler() {
		window.registerUriHandler({
			handleUri: AuthUriHandler.handleUri,
		});
	}
}
