import * as vscode from 'vscode';

export class SidebarProvider implements vscode.TreeDataProvider<TreeItem> {
	constructor() {}

	getTreeItem(element: TreeItem) {
		return element;
	}

	getChildren(element?: TreeItem): vscode.ProviderResult<TreeItem[]> {
		const items: TreeItem[] = [
			{
				label: '🔍 Search',
				collapsibleState: vscode.TreeItemCollapsibleState.None,
				command: {
					title: 'Open Search',
					command: 'pully-the-pr-manager.openSearch',
				},
			},
			{
				label: '🎉 Pull Requests',
				collapsibleState: vscode.TreeItemCollapsibleState.None,
				command: {
					title: 'Open Pull Requests',
					command: 'pully-the-pr-manager.openPullRequests',
				},
			},
		];

		return items;
	}
}


class TreeItem extends vscode.TreeItem {}
