import { BaseCommand } from './settings/BaseCommand';

export class ConnectToGitProviderCommand extends BaseCommand {
	constructor() {
		super();
		this.name += `connectToGitProvider`;
	}

	command() {
		console.log('ConnectToGitProviderCommand command');
	}
}
