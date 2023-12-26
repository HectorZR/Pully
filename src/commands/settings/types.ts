export interface Command {
	name: string;
	isPrivate: boolean;
	command(): unknown | void;
}
