import {ChainProvider} from '../../chain-provider';
import {BlockResponse} from './model';
import {Client} from './client';
import {Asset, AssetBalance, Chain} from '@degenwallet/chain-types';

export {Denom} from './denom';

export class ChainProviderCosmos implements ChainProvider {
  client: Client;
  chain: Chain;
  denom: string;

  constructor(url: string, chain: Chain, denom: string) {
    this.client = new Client(url);
    this.chain = chain;
    this.denom = denom;
  }

  async getBalances(address: string, assets: Asset[]): Promise<AssetBalance[]> {
    return this.client.getBalance(address).then(balances => {
      return assets.map(asset => {
        const balance = balances.balances.find(el => el.denom === this.denom);
        return new AssetBalance(asset, BigInt(balance?.amount || 0));
      });
    });
  }

  getAssets(_: string): Promise<Asset[]> {
    //TODO: Implement fetching all assets.
    return Promise.resolve([new Asset(this.chain)]);
  }

  async getLatestBlock(): Promise<number> {
    return fetch(this.client.url + '/blocks/latest')
      .then(res => res.json())
      .then((res: BlockResponse) => {
        return parseInt(res.block.header.height, 10);
      });
  }
}
