import {
  assetAddToList,
  assetsBalancesUpdate,
  BalancesMap,
  marketUpdateAssetFiatValue,
  marketUpdatePrices,
  marketUpdateTotalFiatValue,
} from '../../core/reducers/assets';
import {Asset, AssetBalance, Chain} from '@degenwallet/chain-types';
import {AppDispatch} from '../../core/store';
import {GetAssetResources} from '../../assets/asset-resource';
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
    const defaultAssets = wallet.accounts
      .map(el => el.chain)
      .map(el => this.defaultAssets(el))
      .flat()
      .map(asset => {
        return new AssetBalance(asset, BigInt(0));
      });

    return dispatch(assetAddToList(assetsResource))
      .then(_ => {
        return dispatch(assetsBalancesUpdate(wallet, defaultAssets));
      })
      .then(_ => {
        return this.assetService.getAssets(wallet.accounts);
      })
      .then(assets => {
        return this.balanceService.getBalances(wallet.accounts, assets);
      })
      .then(assets => {
        return dispatch(assetsBalancesUpdate(wallet, assets));
      })
      .then(assets => {
        return this.updatePrices(dispatch, wallet, currency, assets.payload.balances);
      });
  }

  // TODO: Once we support multi-chain it would enable us to add only specific coins on start.
  defaultAssets(chain: Chain): Asset[] {
    return [new Asset(chain)];
  }

  updatePrices(dispatch: AppDispatch, wallet: Wallet, currency: string, balances: BalancesMap) {
    return this.marketProvider
      .getPrice(
        currency,
        Object.keys(balances).map(key => Asset.fromID(key)),
      )
      .then(prices => {
        return dispatch(marketUpdatePrices(prices.prices)).then(_ => {
          return this.updateFiat(dispatch, wallet, prices.prices);
        });
      });
  }

  updateFiat(dispatch: AppDispatch, wallet: Wallet, prices: Price[]) {
    return dispatch(marketUpdateAssetFiatValue(wallet.id, prices)).then(_ =>
      dispatch(marketUpdateTotalFiatValue(wallet.id)),
    );
  }
}
