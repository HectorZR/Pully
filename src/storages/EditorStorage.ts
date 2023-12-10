import { contextHandler } from '../handlers/ContextHandler';

type StorageType = 'global' | 'secret';

export class EditorStorage {
	static get(key: string, storage: StorageType = 'global') {
		const context = contextHandler.getContext();
		if (storage === 'secret') {
			return context.secrets.get(key);
		}
		return context.globalState.get(key);
	}

	static set(key: string, value: unknown, storage: StorageType = 'global') {
		const context = contextHandler.getContext();
		if (storage === 'secret') {
			context.secrets.store(key, value as string);
			return;
		}

		context.globalState.update(key, value);
	}
}

export enum StorageKeys {
	GLOBAL_GIT_PROVIDER = 'gitProvider',
}
