import { window } from 'vscode';

export class NotifierHandler {
	static info(message: string) {
		window.showInformationMessage(message);
	}

	static error(message: string) {
		window.showErrorMessage(message);
	}

	static warning(message: string) {
		window.showWarningMessage(message);
	}
}
