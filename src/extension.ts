// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { SidebarProvider } from './SidebarProvider';

export function activate(context: vscode.ExtensionContext) {
	// Create a new sidebar item
	vscode.window.registerTreeDataProvider(
		'pully-the-pr-manager',
		new SidebarProvider()
	);
}

export function deactivate() {}
