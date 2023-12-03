import * as vscode from 'vscode';

export class ErrorHandler {
	static handleError(error: Error) {
		vscode.window.showErrorMessage(error.message);
	}
}
