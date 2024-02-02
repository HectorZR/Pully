export interface TokenInfo {
	token: string;
	tokenExpiresAt: string;
	refreshToken: string;
	refreshTokenExpiresAt: string;
}

export interface Provider {
	initialize(): void;
}