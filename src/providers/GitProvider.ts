import { extensions } from 'vscode';
import type { GitExtension } from '../external/git';
import { Provider } from './types';

class GitProvider implements Provider {
	private gitExtension: GitExtension | undefined = undefined;
	private notFoundError = new Error('Git extension not found');

	async initialize() {
		const gitExtension = await extensions.getExtension<GitExtension>(
			'vscode.git'
		);

		if (!gitExtension) {
			throw this.notFoundError;
		}

		this.gitExtension = await gitExtension.activate();
	}

	getGitExtension() {
		if (!this.gitExtension) {
			throw this.notFoundError;
		}

		return this.gitExtension.getAPI(1);
	}
}

export const gitProvider = new GitProvider();
