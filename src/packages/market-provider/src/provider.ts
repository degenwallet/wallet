import {Asset} from '@degenwallet/chain-types';
import {Prices} from '@degenwallet/market-provider';

export interface MarketProvider {
  getPrice(currency: string, assets: Asset[]): Promise<Prices>;
}
