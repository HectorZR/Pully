// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { config } from 'dotenv';
import { ExtensionContext, window } from 'vscode';
import { ProvidersInitializer } from './providers';
import { AuthUriHandler, contextHandler } from './handlers';
import { CommandsInitializer } from './commands';
import { TreeDataProvidersInitializer } from './treeProviders';

config({ path: __dirname + '/../.env' });

export function activate(context: ExtensionContext) {
	// Store context in memory to make it globally accessible
	contextHandler.setContext(context);

	AuthUriHandler.registerUriHandler();

	CommandsInitializer.initialize();

	ProvidersInitializer.initialize();

	TreeDataProvidersInitializer.initialize();
}

export function deactivate() {}
