export interface Command {
	name: string;
	command(): unknown | void;
}
