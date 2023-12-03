import * as vscode from 'vscode';
import { Command } from './types';

export class BaseCommand implements Command {
	public name: string;
	constructor() {
		this.name = 'pully-the-pr-manager.';
	}

	command() {
		throw new Error('Command not defined');
	}

	registerCommand() {
		const registeredCommand = vscode.commands.registerCommand(
			this.name,
			this.command
		);
		return registeredCommand;
	}
}
