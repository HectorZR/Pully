import { window } from 'vscode';
import { ErrorHandler, NotifierHandler } from '../handlers';
import { gitProvider, githubProvider } from '../providers';
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
			const [owner, repo, _, rawNumber] = prUrl?.split('/')?.slice(-4) ?? [];

			if (!owner || !repo || !rawNumber) {
				return NotifierHandler.info('No valid PR url provided');
			}

			const pullNumber = Number(rawNumber);
			const prRequestParams = {
				owner,
				repo,
				pull_number: pullNumber,
			};
			const client = await githubProvider.getClient();
			const prInfo = await client.rest.pulls.get(prRequestParams);
			const originBranch = prInfo.data.head.ref;
			const targetBranch = prInfo.data.base.ref;
			// const targetBranch = prInfo.data.base.sha;

			const git = gitProvider.getGitExtension();
			const repository = git.repositories[0];

			if (!repository) {
				return NotifierHandler.info('Open your project workspace first');
			}

			const changes = await repository.diffBetween(targetBranch, originBranch);

			console.log(changes);
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
