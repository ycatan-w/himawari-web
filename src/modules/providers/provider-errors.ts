// provider-errors.ts
export enum ProviderErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  NOT_AUTHENTICATED = 'NOT_AUTHENTICATED',
  NETWORK_ERROR = 'NETWORK_ERROR',
  SERVER_ERROR = 'SERVER_ERROR'
}

export interface ProviderError {
  code: ProviderErrorCode;
  message?: string;
  details?: Record<string, string>;
}
