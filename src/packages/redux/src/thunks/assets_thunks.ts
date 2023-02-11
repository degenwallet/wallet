import {AssetResource} from '../../../../assets/asset-resource';
import {AppDispatch} from '@degenwallet/store';
import {
  assetsAddToList,
  assetsDefaultUpdate,
  assetsPriceUpdate,
  mapPricesToMap,
  walletBalancesUpdate,
} from '../actions/assets_actions';
import {AssetPrice, Wallet} from '@degenwallet/types';
import {Asset, AssetBalance} from '@degenwallet/chain-types';

export const updateDefaultAssets = (wallet: Wallet) => async (dispatch: AppDispatch) => {
  // TODO: Once we support multi-chain it would enable us to add only specific coins on start.
  const defaultAssets = wallet.accounts
    .map(el => [new Asset(el.chain)]) // TODO: reduce
    .flat()
    .map(asset => asset.getId());
  return dispatch(assetsDefaultUpdate({walletId: wallet.id, assets: defaultAssets}));
};

export const updateWalletBalances = (walletId: string, balances: AssetBalance[]) => async (dispatch: AppDispatch) => {
  const values = Object.fromEntries(
    balances.map(value => [
      value.asset.getId(),
      {
        balance: value.available.toString(10),
        fiat_value: 0,
      },
    ]),
  );
  return dispatch(walletBalancesUpdate({walletId: walletId, assets: values}));
};

export const addToAssetsList = (assets: AssetResource[]) => async (dispatch: AppDispatch) => {
  return dispatch(assetsAddToList(assets));
};

export const updateAssetsPrice = (prices: AssetPrice[]) => async (dispatch: AppDispatch) => {
  return dispatch(assetsPriceUpdate(mapPricesToMap(prices)));
};
