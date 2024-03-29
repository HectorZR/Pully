import { window } from 'vscode';
import { ErrorHandler } from '../handlers';
import { githubProvider } from '../providers';
import { GITHUB_PROVIDER } from '../constants/gitProviders';
import { EditorStorage, GlobalStorageKeys } from '../storages/EditorStorage';
import { BaseCommand } from './settings/BaseCommand';

export class ConnectToGitProviderCommand extends BaseCommand {
	constructor() {
		super('connectToGitProvider');
	}

	async command() {
		try {
			const provider = await window.showQuickPick([GITHUB_PROVIDER]);
			EditorStorage.set(GlobalStorageKeys.GIT_PROVIDER, provider);

			switch (provider) {
				case GITHUB_PROVIDER:
					githubProvider.getAccessCode();
					break;

				default:
					ErrorHandler.handleError('No provider selected');
					break;
			}
		} catch (error) {
			ErrorHandler.handleError(error);
		}
	}
}
