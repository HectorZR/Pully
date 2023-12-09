import * as vscode from 'vscode';

class ContextHandler {
	private context: vscode.ExtensionContext | null = null;

	setContext(context: vscode.ExtensionContext) {
		this.context = context;
	}

	getContext() {
		if (!this.context) {
			throw new Error('Context not defined, set a context first');
		}

		return this.context;
	}
}

export const contextHandler = new ContextHandler();
