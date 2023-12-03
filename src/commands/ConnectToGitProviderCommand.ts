import { BaseCommand } from './settings/BaseCommand';

export class ConnectToGitProviderCommand extends BaseCommand {
	constructor(public context: vscode.ExtensionContext) {
		super('connectToGitProvider');
	}

	command() {
		console.log('ConnectToGitProviderCommand command');
	}
}
