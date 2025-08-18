import { BaseProvider } from './base-provider';
import { LocalStorageProvider } from './local-storage-provider';
import { ApiProvider } from './api-provider';

class ProviderSingleton {
  private static instance: BaseProvider | null = null;
  private static mode: string | null = null;

  static init(mode: 'local' | 'api') {
    if (this.instance) {
      throw new Error('Provider already initialized');
    }
    this.mode = mode;
    this.instance = this.mode === 'local' ? new LocalStorageProvider() : new ApiProvider();
  }

  static get(): BaseProvider {
    if (!this.instance) {
      throw new Error('Provider not initialized');
    }
    return this.instance;
  }

  static getMode(): string|null {
    return this.mode
  }
}

export const initProvider = ProviderSingleton.init.bind(ProviderSingleton);
export const getProvider = ProviderSingleton.get.bind(ProviderSingleton);
export const getProviderMode = ProviderSingleton.getMode.bind(ProviderSingleton);
