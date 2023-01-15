import {MarketProvider} from '../../provider';
import {Asset} from '@degenwallet/chain-types';
import {Prices} from './../../model';
import {Client} from './client';
import {TWAsset} from './TWAsset';

export class TWMarketProvider implements MarketProvider {
  client: Client;

  constructor() {
    this.client = new Client();
  }

  async getPrice(currency: string, assets: Asset[]): Promise<Prices> {
    const prices = await this.client.getPrice(
      currency,
      assets.map(asset => TWAsset.toTWAsset(asset)),
    );
    return new Prices(currency, prices);
  }
}
