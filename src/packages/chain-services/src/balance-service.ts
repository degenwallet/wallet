import {Asset, AssetBalance, Chain} from '@degenwallet/chain-types';
import {Account} from '@degenwallet/types';
import {ProviderFactory} from './provider-factory';
import {ChainProvider} from '@degenwallet/chain-providers';

export class BalanceService {
  providers: Map<Chain, ChainProvider>;

  constructor(providers = ProviderFactory.setup()) {
    this.providers = providers;
  }

  getBalances(accounts: Account[], assets: Asset[]): Promise<AssetBalance[]> {
    const assetsMap = new Map<Chain, Asset[]>();
    assets.forEach(asset => {
      assetsMap.set(asset.chain, [...(assetsMap.get(asset.chain) || []), asset]);
    });

    const getBalances = accounts.map(account => {
      return this.providers.get(account.chain)!.getBalances(account.address, assetsMap.get(account.chain)!);
    });

    return Promise.all(getBalances).then(balances => {
      return balances.flat();
    });
  }
}
