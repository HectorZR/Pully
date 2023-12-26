import { gitProvider, githubProvider } from '.';

export class ProvidersInitializer {
	static async initialize() {
		const providers = [gitProvider, githubProvider];

		for (const provider of providers) {
			await provider.initialize();
		}
	}
}
