import {TWMarketProvider} from './providers/trustwallet';
import {Asset} from '@degenwallet/chain-types';
import {Prices} from './model';

export class MarketFetcher {
  provider = new TWMarketProvider();

  getPrice(currency: string, assets: Asset[]): Promise<Prices> {
    return this.provider.getPrice(currency, assets);
  }
}
