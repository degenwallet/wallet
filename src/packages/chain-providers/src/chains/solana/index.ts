import {ChainProvider} from '../../chain-provider';
import {Asset, AssetBalance, Chain} from '@degenwallet/chain-types';
import {JSOPRPCClient} from '@degenwallet/json-rpc';
import {Balance, LatestBlockHash} from './model';

enum METHOD {
  GET_BALANCE = 'getBalance',
  BLOCK_NUMBER = 'getLatestBlockhash',
}

export class ChainProviderSolana implements ChainProvider {
  client: JSOPRPCClient;
  chain: Chain;

  constructor(url: string, chain: Chain) {
    this.client = new JSOPRPCClient(url);
    this.chain = chain;
  }

  async getBalances(address: string, assets: Asset[]): Promise<AssetBalance[]> {
    return this.client.call<Balance>(METHOD.GET_BALANCE, [address]).then(balance => {
      return assets.map(asset => {
        return new AssetBalance(asset, BigInt(balance.value));
      });
    });
  }

  getAssets(_: string): Promise<Asset[]> {
    return Promise.resolve([new Asset(this.chain)]);
  }

  async getLatestBlock(): Promise<number> {
    return this.client.call<LatestBlockHash>(METHOD.BLOCK_NUMBER, []).then(block => {
      return Promise.resolve(block.lastValidBlockHeight);
    });
  }
}
