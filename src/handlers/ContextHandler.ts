import type { ExtensionContext } from 'vscode';

class ContextHandler {
	private context: ExtensionContext | null = null;

	setContext(context: ExtensionContext) {
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
