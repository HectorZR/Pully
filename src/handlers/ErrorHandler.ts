import { NotifierHandler } from './NotifierHandler';

export class ErrorHandler {
	static handleError(error: unknown) {
		if (error instanceof Error) {
			NotifierHandler.error(error.message);
		}
		if (typeof error === 'string') {
			NotifierHandler.error(error);
		}
	}
}
