import { window } from 'vscode';
import { GetGithubAccess } from '../services/GetGithubAccess';
import { ErrorHandler } from '../handlers/ErrorHandler';
import { GITHUB_PROVIDER } from '../constants/gitProviders';
import { EditorStorage, StorageKeys } from '../storages/EditorStorage';
import { BaseCommand } from './settings/BaseCommand';

export class ConnectToGitProviderCommand extends BaseCommand {
	constructor() {
		super('connectToGitProvider');
	}

	command() {
		window.showQuickPick([GITHUB_PROVIDER]).then((provider) => {
			EditorStorage.set(StorageKeys.GLOBAL_GIT_PROVIDER, provider);

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
