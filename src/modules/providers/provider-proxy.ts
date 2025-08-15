import { BaseProvider } from './base-provider';
import { LocalStorageProvider } from './local-storage-provider';
import { ApiProvider } from './api-provider';

class ProviderSingleton {
  private static instance: BaseProvider | null = null;

  static init(mode: 'local' | 'api') {
    if (this.instance) {
      throw new Error('Provider already initialized');
    }
    this.instance = mode === 'local' ? new LocalStorageProvider() : new ApiProvider();
  }

  static get(): BaseProvider {
    if (!this.instance) {
      throw new Error('Provider not initialized');
    }
    return this.instance;
  }
}

export const initProvider = ProviderSingleton.init.bind(ProviderSingleton);
export const getProvider = ProviderSingleton.get.bind(ProviderSingleton);

