import { contextHandler } from '../handlers';

export class EditorStorage {
	static get<T = unknown>(key: string) {
		return contextHandler.getContext().globalState.get<T>(key);
	}

	static set(key: string, value: unknown) {
		return contextHandler.getContext().globalState.update(key, value);
	}

	static getSecret(key: string) {
		return contextHandler.getContext().secrets.get(key);
	}

	static setSecret(key: string, value: string) {
		return contextHandler.getContext().secrets.store(key, value);
	}
}

export enum GlobalStorageKeys {
	GIT_PROVIDER = 'gitProvider',
}

export enum SecretStorageKeys {
	TOKEN = 'token',
	TOKEN_EXPIRES_AT = 'tokenExpiresAt',
	REFRESH_TOKEN = 'refreshToken',
	REFRESH_TOKEN_EXPIRES_AT = 'refreshTokenExpiresAt',
}
