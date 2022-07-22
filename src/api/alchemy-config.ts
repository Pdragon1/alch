import { AlchemySettings, Network } from '../types/types';
import type { AlchemyProvider } from './alchemy-provider';
import type { AlchemyWebSocketProvider } from './alchemy-websocket-provider';
import {
  DEFAULT_ALCHEMY_API_KEY,
  DEFAULT_MAX_RETRIES,
  DEFAULT_NETWORK,
  getAlchemyHttpUrl,
  getAlchemyNftHttpUrl
} from '../util/const';

/**
 * This class holds the config information for the SDK client instance and
 * exposes the underlying providers for more advanced use cases.
 *
 * @public
 */
export class AlchemyConfig {
  /** The Alchemy API key. */
  readonly apiKey: string;

  /** The Network that this SDK is associated with. */
  readonly network: Network;

  /** The maximum number of retries to perform. */
  readonly maxRetries: number;

  /**
   * Dynamically imported provider instance.
   *
   * @internal
   */
  private _baseAlchemyProvider: Promise<AlchemyProvider> | undefined;

  /**
   * Dynamically imported provider instance.
   *
   * @internal
   */
  private _baseAlchemyWssProvider:
    | Promise<AlchemyWebSocketProvider>
    | undefined;

  constructor(config?: AlchemySettings) {
    this.apiKey = config?.apiKey || DEFAULT_ALCHEMY_API_KEY;
    this.network = config?.network || DEFAULT_NETWORK;
    this.maxRetries = config?.maxRetries || DEFAULT_MAX_RETRIES;
  }

  /** @internal */
  _getBaseUrl(): string {
    return getAlchemyHttpUrl(this.network, this.apiKey);
  }

  /** @internal */
  _getNftUrl(): string {
    return getAlchemyNftHttpUrl(this.network, this.apiKey);
  }

  /**
   * Returns an AlchemyProvider instance. Only one provider is created per
   * Alchemy instance.
   *
   * The AlchemyProvider is a wrapper around ether's `AlchemyProvider` class and
   * has been expanded to support Alchemy's Enhanced APIs.
   *
   * Most common methods on the provider are available as top-level methods on
   * the {@link Alchemy} instance, but the provider is exposed here to access
   * other less-common methods.
   *
   * @public
   */
  getProvider(): Promise<AlchemyProvider> {
    if (!this._baseAlchemyProvider) {
      this._baseAlchemyProvider = (async () => {
        const { AlchemyProvider } = await import('./alchemy-provider');
        return new AlchemyProvider(this.network, this.apiKey, this.maxRetries);
      })();
    }
    return this._baseAlchemyProvider;
  }

  /**
   * Returns an AlchemyWebsocketProvider instance. Only one provider is created
   * per Alchemy instance.
   *
   * The AlchemyWebSocketProvider is a wrapper around ether's
   * `AlchemyWebSocketProvider` class and has been expanded to support Alchemy's
   * Subscription APIs, automatic backfilling, and other performance improvements.
   *
   * Most common methods on the provider are available as top-level methods on
   * the {@link Alchemy} instance, but the provider is exposed here to access
   * other less-common methods.
   *
   * @internal
   */
  getWebSocketProvider(): Promise<AlchemyWebSocketProvider> {
    if (!this._baseAlchemyWssProvider) {
      this._baseAlchemyWssProvider = (async () => {
        const { AlchemyWebSocketProvider } = await import(
          './alchemy-websocket-provider'
        );
        return new AlchemyWebSocketProvider(this.network, this.apiKey);
      })();
    }
    return this._baseAlchemyWssProvider;
  }
}
