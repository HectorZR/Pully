import { commands } from 'vscode';
import { Command } from './types';

export class BaseCommand implements Command {
	private nameRoot: string = 'pully-the-pr-manager.';
	public isPrivate: boolean;

	constructor(public name: string) {
		this.isPrivate = false;
	}

	command() {
		throw new Error('Command not defined');
	}

	registerCommand() {
		const registeredCommand = commands.registerCommand(
			`${this.nameRoot}${this.name}`,
			this.command
		);
		return registeredCommand;
	}
}
