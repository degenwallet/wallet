import {ChainProvider} from '../..//chain-provider';
import {Client} from './client';
import {Asset, AssetBalance, Chain} from '@degenwallet/chain-types';

export class ChainProviderAptos implements ChainProvider {
  client: Client;

  constructor(client: {url: string}) {
    this.client = new Client(client.url);
  }

  async getBalances(address: string, assets: Asset[]): Promise<AssetBalance[]> {
    return this.client.getBalance(address).then(balance => {
      return assets.map(asset => {
        return new AssetBalance(asset, BigInt(balance.data.coin.value));
      });
    });
  }

  getAssets(_: string): Promise<Asset[]> {
    return Promise.resolve([new Asset(Chain.APTOS)]);
  }

  getLatestBlock(): Promise<number> {
    return Promise.resolve(0);
  }
}
