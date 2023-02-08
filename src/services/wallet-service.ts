import {
  addToAssetsList,
  AssetBalanceValues,
  updateAssetsFiatValue,
  updateAssetsPrice,
  updateAssetsTotalFiatValue,
  updateDefaultAssets,
  updateWalletBalances,
} from '@degenwallet/redux';
import {Asset, Chain} from '@degenwallet/chain-types';
import {AppDispatch} from '@degenwallet/store';
import {GetAssetResources} from '../assets/asset-resource';
import {MarketFetcher, Price} from '@degenwallet/market-provider';
import {AssetService, BalanceService} from '@degenwallet/chain-services';
import {Wallet} from '@degenwallet/types';

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
          return this.updateFiat(dispatch, wallet, prices.prices);
        });
      });
  }

  updateFiat(dispatch: AppDispatch, wallet: Wallet, prices: Price[]) {
    return dispatch(updateAssetsFiatValue(wallet.id, prices)).then(_ =>
      dispatch(updateAssetsTotalFiatValue(wallet.id)),
    );
  }
}
