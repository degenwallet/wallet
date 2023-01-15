import {Asset, AssetBalance} from '@degenwallet/chain-types';

export interface ChainProvider {
  getBalances(address: string, assets: Asset[]): Promise<AssetBalance[]>;

  getAssets(address: string): Promise<Asset[]>;

  getLatestBlock(): Promise<number>;
}
