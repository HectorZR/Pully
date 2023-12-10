// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { config } from 'dotenv';
import * as vscode from 'vscode';
import { SidebarProvider } from './providers';
import { ConnectToGitProviderCommand } from './commands';
import { AuthUriHandler, contextHandler } from './handlers';

config({ path: __dirname + '/../.env' });

export function activate(context: vscode.ExtensionContext) {
	// Store context in memory to make it globally accessible
	contextHandler.setContext(context);

	// Create a new sidebar item
	vscode.window.registerTreeDataProvider(
		'pully-the-pr-manager',
		new SidebarProvider()
	);

	// register commands
	const commands = [ConnectToGitProviderCommand];
	commands.forEach((command) => {
		const commandInstance = new command();

		if (commandInstance.isPrivate) {
			return;
		}

		context.subscriptions.push(commandInstance.registerCommand());
	});

	// register handlers
	AuthUriHandler.registerUriHandler();
}

export function deactivate() {}
