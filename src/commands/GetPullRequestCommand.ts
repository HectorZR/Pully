import { window } from 'vscode';
import { ErrorHandler, NotifierHandler } from '../handlers';
import { githubProvider } from '../providers';
import { EditorStorage, GlobalStorageKeys } from '../storages/EditorStorage';
import { BaseCommand } from './settings/BaseCommand';
import { GITHUB_PROVIDER } from '../constants/gitProviders';

export class GetPullRequestCommand extends BaseCommand {
	constructor() {
		super('getPullRequest');

		this.command = this.command.bind(this);
	}

	private async getGithubPr() {
		try {
			const prUrl = await window.showInputBox({
				title: 'Enter PR URL',
				placeHolder: 'Enter PR URL',
				ignoreFocusOut: true,
			});
			const [owner, repo, _, pullNumber] = prUrl?.split('/')?.slice(-4) ?? [];

			if (!owner || !repo || !pullNumber) {
				return NotifierHandler.info('No PR url provided');
			}

			const client = await githubProvider.getClient();
			const res = await client.rest.pulls.get({
				owner,
				repo,
				pull_number: Number(pullNumber),
			});

		} catch (error) {
			ErrorHandler.handleError(error);
		}
	}

	async command() {
		try {
			const provider = await EditorStorage.get(GlobalStorageKeys.GIT_PROVIDER);

			switch (provider) {
				case GITHUB_PROVIDER:
					return await this.getGithubPr();

				default:
					// TODO: Run connectToGitProvider command
					return ErrorHandler.handleError('No provider available');
			}
		} catch (error) {
			ErrorHandler.handleError(error);
		}
	}
}
