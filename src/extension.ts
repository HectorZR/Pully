// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { config } from 'dotenv';
import { ExtensionContext, window } from 'vscode';
import { SidebarProvider, gitProvider, githubProvider } from './providers';
import { AuthUriHandler, contextHandler } from './handlers';
import { CommandsInitializer } from './commands';

config({ path: __dirname + '/../.env' });

export function activate(context: ExtensionContext) {
	// Store context in memory to make it globally accessible
	contextHandler.setContext(context);

	// Create a new sidebar item
	window.registerTreeDataProvider('pully-actions', new SidebarProvider());

	new CommandsInitializer().initialize();

	// register handlers
	AuthUriHandler.registerUriHandler();

	// initialize providers
	const providers = [gitProvider, githubProvider];
	providers.forEach((provider) => {
		provider.initialize();
	});
}

export function deactivate() {}
