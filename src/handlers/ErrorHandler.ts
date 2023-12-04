import * as vscode from 'vscode';

export class ErrorHandler {
	static handleError(error: unknown) {
		if (error instanceof Error) {
			vscode.window.showErrorMessage(error.message);
		}
		if (typeof error === 'string') {
			vscode.window.showErrorMessage(error);
		}
	}
}
