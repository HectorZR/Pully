import * as vscode from 'vscode';

export class ActionProvider implements vscode.TreeDataProvider<ActionItem> {
	name: string = 'pully-actions';
	constructor() {}

	getTreeItem(element: ActionItem) {
		return element;
	}

	getChildren(element?: ActionItem): vscode.ProviderResult<ActionItem[]> {
		const items: ActionItem[] = [
			{
				label: '🔗 Connect to Git Provider',
				collapsibleState: vscode.TreeItemCollapsibleState.None,
				command: {
					title: 'Connect to Git Provider',
					command: 'pullyManager.connectToGitProvider',
				},
			},
			{
				label: '🔍 Search PR',
				collapsibleState: vscode.TreeItemCollapsibleState.None,
				command: {
					title: 'Search PR',
					command: 'pullyManager.getPullRequest',
				},
			},
			{
				label: '🎉 Pull Requests',
				collapsibleState: vscode.TreeItemCollapsibleState.None,
				command: {
					title: 'Open Pull Requests',
					command: 'pullyManager.openPullRequests',
				},
			},
		];

		return items;
	}
}

class ActionItem extends vscode.TreeItem {}
