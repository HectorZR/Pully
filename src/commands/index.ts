import { contextHandler } from '../handlers';
import { ConnectToGitProviderCommand } from './ConnectToGitProviderCommand';
import { GetPullRequestCommand } from './GetPullRequestCommand';

export class CommandsInitializer {
	static initialize() {
		const commands = [ConnectToGitProviderCommand, GetPullRequestCommand];

		commands.forEach((CommandClass) => {
			const command = new CommandClass();

			if (command.isPrivate) {
				return;
			}

			contextHandler.getContext().subscriptions.push(command.registerCommand());
		});
	}
}
