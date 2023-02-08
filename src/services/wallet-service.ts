import {
  addToAssetsList,
  AssetBalanceValues,
  updateAssetsPrice,
  updateAssetsTotalFiatValue,
  updateDefaultAssets,
  updateWalletBalances,
} from '@degenwallet/redux';
import {Asset} from '@degenwallet/chain-types';
import {AppDispatch} from '@degenwallet/store';
import {GetAssetResource, GetAssetResources} from '../assets/asset-resource';
import {MarketFetcher} from '@degenwallet/market-provider';
import {AssetService, BalanceService} from '@degenwallet/chain-services';
import {fromBigNumber, Wallet} from '@degenwallet/types';
import {walletBalancesUpdate} from '@degenwallet/redux/src/actions/assets_actions';

export class WalletService {
  marketProvider = new MarketFetcher();
  assetService = new AssetService();
  balanceService = new BalanceService();

  constructor() {}

  refresh(dispatch: AppDispatch, wallet: Wallet, currency: string) {
    const assetResource = GetAssetResources(wallet.accounts[0].chain);
    const assetsResource = Object.keys(assetResource.assets).map(key => assetResource.assets[key]);
    return dispatch(addToAssetsList(assetsResource))
      .then(_ => {
        return dispatch(updateDefaultAssets(wallet));
      })
      .then(_ => {
        return this.assetService.getAssets(wallet.accounts);
      })
      .then(assets => {
        return this.balanceService.getBalances(wallet.accounts, assets);
      })
      .then(balances => {
        return dispatch(updateWalletBalances(wallet.id, balances));
      })
      .then(assets => {
        return this.updatePrices(dispatch, wallet, currency, assets.payload.assets);
      });
  }

  updatePrices(dispatch: AppDispatch, wallet: Wallet, currency: string, balances: {[key: string]: AssetBalanceValues}) {
    return this.marketProvider
      .getPrice(
        currency,
        Object.keys(balances).map(key => Asset.fromID(key)),
      )
      .then(prices => {
        return dispatch(updateAssetsPrice(prices.prices)).then(_ => {
          prices.prices.forEach(price => {
            const assetId = price.asset.getId();
            const asset = balances[assetId];
            const assetResource = GetAssetResource(Asset.fromID(assetId))!;
            if (asset === undefined || assetResource === undefined) {
              return;
            }
            const balance = fromBigNumber(BigInt(asset.balance), assetResource.decimals);
            balances[assetId].fiat_value = price.price * balance;
          });
          return dispatch(walletBalancesUpdate({walletId: wallet.id, assets: balances}));
        });
      })
      .then(_ => {
        return dispatch(updateAssetsTotalFiatValue(wallet.id));
      });
  }
}
