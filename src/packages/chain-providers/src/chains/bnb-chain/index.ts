import {ChainProvider} from '../../chain-provider';
import {NodeInfo} from './model';
import {Client} from './client';
import {Asset, AssetBalance, AssetType, Chain} from '@degenwallet/chain-types';
import {toBigNumber} from '@degenwallet/types';

const BNB_SYMBOL = 'BNB';

export class ChainProviderBNBChain implements ChainProvider {
  client: Client;
  chain: Chain;

  constructor(url: string, chain: Chain) {
    this.client = new Client(url);
    this.chain = chain;
  }

  //async getBalance(address: string, asset: string): Promise<BigInt> {
  async getBalances(address: string, assets: Asset[]): Promise<AssetBalance[]> {
    return this.client.getAccount(address).then(account => {
      if (account.balances == null) {
        return assets.map(asset => {
          return new AssetBalance(asset, BigInt(0));
        });
      }
      return account.balances
        .flatMap(balance => {
          return assets.flatMap(asset => {
            if (
              asset.token_id === balance.symbol ||
              (asset.getType() === AssetType.NATIVE && balance.symbol === BNB_SYMBOL)
            ) {
              const freeBalance = parseFloat(balance.free.replace('.', ''));
              return new AssetBalance(asset, toBigNumber(freeBalance, 0));
            }
            return undefined;
          });
        })
        .filter(value => value !== undefined)
        .flat() as AssetBalance[];
    });
  }

  getAssets(address: string): Promise<Asset[]> {
    return this.client.getAccount(address).then(account => {
      return [
        new Asset(this.chain),
        ...account.balances.map(balance => this.normalizeSymbol(new Asset(this.chain, balance.symbol))),
      ];
    });
  }

  async getLatestBlock(): Promise<number> {
    return fetch(this.client.url + '/api/v1/node-info')
      .then(res => res.json())
      .then((res: NodeInfo) => {
        return res.sync_info.latest_block_height;
      });
  }

  private normalizeSymbol(asset: Asset): Asset {
    if (asset.token_id === BNB_SYMBOL) {
      return new Asset(this.chain);
    }
    return asset;
  }
}
