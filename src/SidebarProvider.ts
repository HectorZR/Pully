import * as vscode from 'vscode';

export class SidebarProvider implements vscode.TreeDataProvider<TreeItem> {
	constructor() {}

	getTreeItem(element: TreeItem) {
		vscode.window.showInformationMessage(
			'Hello World from Pully - The PR Manager! - getTreeItem'
		);
		return element;
	}
	getChildren(element?: TreeItem) {
		vscode.window.showInformationMessage(
			'Hello World from Pully - The PR Manager! - getChildren'
		);
		return [];
	}
}

class TreeItem extends vscode.TreeItem {}
