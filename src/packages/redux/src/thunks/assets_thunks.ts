import {AssetResource} from '../../../../assets/asset-resource';
import {AppDispatch} from '@degenwallet/store';
import {
  assetsAddToList,
  assetsBalancesUpdate,
  assetsFiatTotalUpdate,
  assetsFiatUpdate,
  assetsPriceUpdate,
  mapPricesToMap,
} from '../actions/assets_actions';
import {AssetPrice, Wallet} from '@degenwallet/types';
import {AssetBalance} from '@degenwallet/chain-types';
import {BalancesMap} from '../reducers/assets';

export const updateAssetsBalance = (wallet: Wallet, balances: AssetBalance[]) => async (dispatch: AppDispatch) => {
  const balancesMap: BalancesMap = Object.fromEntries(
    balances.map(balance => [balance.asset.getId(), balance.available.toString(10)]),
  );
  return dispatch(assetsBalancesUpdate({wallet_id: wallet.id, balances: balancesMap}));
};

export const addToAssetsList = (assets: AssetResource[]) => async (dispatch: AppDispatch) => {
  return dispatch(assetsAddToList(assets));
};

export const updateAssetsFiatValue = (wallet_id: string, prices: AssetPrice[]) => async (dispatch: AppDispatch) => {
  return dispatch(assetsFiatUpdate({wallet_id, prices: mapPricesToMap(prices)}));
};

export const updateAssetsTotalFiatValue = (wallet_id: string) => async (dispatch: AppDispatch) => {
  return dispatch(assetsFiatTotalUpdate({wallet_id}));
};

export const updateAssetsPrice = (prices: AssetPrice[]) => async (dispatch: AppDispatch) => {
  return dispatch(assetsPriceUpdate(mapPricesToMap(prices)));
};
