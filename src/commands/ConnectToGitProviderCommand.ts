import * as vscode from 'vscode';
import { GetGithubAccess } from '../services/GetGithubAccess';
import { ErrorHandler } from '../handlers/ErrorHandler';
import { GITHUB_PROVIDER } from '../constants/gitProviders';
import { BaseCommand } from './settings/BaseCommand';

export class ConnectToGitProviderCommand extends BaseCommand {
	constructor(public context: vscode.ExtensionContext) {
		super('connectToGitProvider');
		this.command = this.command.bind(this);
	}

	command() {
		vscode.window.showQuickPick([GITHUB_PROVIDER]).then((provider) => {
			this.context.globalState.update('gitProvider', provider);

			switch (provider) {
				case GITHUB_PROVIDER:
					GetGithubAccess.getAccessCode();
					break;

				default:
					ErrorHandler.handleError('No provider selected');
					break;
			}
		});
	}
}
