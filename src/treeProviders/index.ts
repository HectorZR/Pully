import { window } from 'vscode';
import { ActionProvider } from './ActionProvider';

export class TreeDataProvidersInitializer {
	static initialize() {
		const providers = [ActionProvider];

		providers.forEach((ProviderClass) => {
			const provider = new ProviderClass();
			window.registerTreeDataProvider(provider.name, provider);
		});
	}
}
