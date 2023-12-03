import * as vscode from 'vscode';
import { Command } from './types';

export class BaseCommand implements Command {
	public name: string;
	public isPrivate: boolean;
	constructor() {
		this.name = 'pully-the-pr-manager.';
		this.isPrivate = false;
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
