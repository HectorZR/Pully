import * as vscode from 'vscode';
import { GetGithubAccess } from '../services/GetGithubAccess';
import { ErrorHandler } from '../handlers/ErrorHandler';
import { GITHUB_PROVIDER } from '../constants/gitProviders';
import { EditorStorage } from '../storages/EditorStorage';
import { BaseCommand } from './settings/BaseCommand';

export class ConnectToGitProviderCommand extends BaseCommand {
	constructor() {
		super('connectToGitProvider');
	}

	command() {
		vscode.window.showQuickPick([GITHUB_PROVIDER]).then((provider) => {
			EditorStorage.set('gitProvider', provider);

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
