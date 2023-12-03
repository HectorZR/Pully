// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { config } from 'dotenv';
import * as vscode from 'vscode';
import { SidebarProvider } from './SidebarProvider';
import { ConnectToGitProviderCommand } from './commands/ConnectToGitProviderCommand';
import { AuthUriHandler } from './handlers/AuthUriHandler';

config({ path: __dirname + '/../.env' });

export function activate(context: vscode.ExtensionContext) {
	// Create a new sidebar item
	vscode.window.registerTreeDataProvider(
		'pully-the-pr-manager',
		new SidebarProvider()
	);

	// register commands
	const commands = [ConnectToGitProviderCommand];
	commands.forEach((command) => {
		const commandInstance = new command();

		context.subscriptions.push(commandInstance.registerCommand());
	});

	// register handlers
	const uriHandler = new AuthUriHandler();
	uriHandler.registerUriHandler();
}

export function deactivate() {}
