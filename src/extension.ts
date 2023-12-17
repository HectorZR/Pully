// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { config } from 'dotenv';
import * as vscode from 'vscode';
import { SidebarProvider, githubProvider } from './providers';
import { AuthUriHandler, contextHandler } from './handlers';
import { CommandsInitializer } from './commands';

config({ path: __dirname + '/../.env' });

export function activate(context: vscode.ExtensionContext) {
	// Store context in memory to make it globally accessible
	contextHandler.setContext(context);

	// Create a new sidebar item
	vscode.window.registerTreeDataProvider(
		'pully-the-pr-manager',
		new SidebarProvider()
	);

	new CommandsInitializer().initialize();

	// register handlers
	AuthUriHandler.registerUriHandler();

	// initialize providers
	const providers = [githubProvider];
	providers.forEach((provider) => {
		provider.initializeProvider();
	});
}

export function deactivate() {}
