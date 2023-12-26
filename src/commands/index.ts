import { contextHandler } from '../handlers';
import { ConnectToGitProviderCommand } from './ConnectToGitProviderCommand';
import { GetPullRequestCommand } from './GetPullRequestCommand';

export class CommandsInitializer {
	private commands = [
		new ConnectToGitProviderCommand(),
		new GetPullRequestCommand(),
	];

	initialize() {
		this.commands.forEach((command) => {
			if (command.isPrivate) {
				return;
			}

			contextHandler.getContext().subscriptions.push(command.registerCommand());
		});
	}
}
