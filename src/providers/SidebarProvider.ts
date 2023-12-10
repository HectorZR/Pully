import * as vscode from 'vscode';

export class SidebarProvider implements vscode.TreeDataProvider<TreeItem> {
	constructor() {}

	getTreeItem(element: TreeItem) {
		return element;
	}

	getChildren(element?: TreeItem): vscode.ProviderResult<TreeItem[]> {
		const items: TreeItem[] = [
			{
				label: '🔗 Connect to Git Provider',
				collapsibleState: vscode.TreeItemCollapsibleState.None,
				command: {
					title: 'Connect to Git Provider',
					command: 'pully-the-pr-manager.connectToGitProvider',
				},
			},
			{
				label: '🔍 Search PR',
				collapsibleState: vscode.TreeItemCollapsibleState.None,
				command: {
					title: 'Search PR',
					command: 'pully-the-pr-manager.getPullRequest',
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
