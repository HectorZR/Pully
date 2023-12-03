import * as vscode from 'vscode';

export class AuthUriHandler {
	handleUri(uri: vscode.Uri) {
		const queryParams = new URLSearchParams(uri.query);
		if (queryParams.has('code')) {
			vscode.window.showInformationMessage(
				'this is your auth code: ' + queryParams.get('code')
			);
		}
	}

	registerUriHandler() {
		vscode.window.registerUriHandler({
			handleUri: this.handleUri,
		});
	}
}
