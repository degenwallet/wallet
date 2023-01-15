import {Account} from '@degenwallet/types';
import {Asset, Chain} from '@degenwallet/chain-types';
import {ChainProvider} from '@degenwallet/chain-providers';
import {ProviderFactory} from './provider-factory';

export class AssetService {
  providers: Map<Chain, ChainProvider>;

  constructor(providers = ProviderFactory.setup()) {
    this.providers = providers;
  }

  async getAssets(accounts: Account[]): Promise<Asset[]> {
    const getAssets = accounts.map(account => {
      return this.providers.get(account.chain)!.getAssets(account.address);
    });
    return Promise.all(getAssets).then(value => {
      return value.flat();
    });
  }
}
