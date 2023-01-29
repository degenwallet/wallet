import {createAction} from '@reduxjs/toolkit';
import {AssetsPriceMap, BalancesMap} from '../reducers/assets';
import {AssetResource} from '../../../../assets/asset-resource';
import {withPayloadType} from './index';
import {AppDispatch} from '@degenwallet/store';
import {AssetPrice, Wallet} from '@degenwallet/types';
import {AssetBalance} from '@degenwallet/chain-types';

export const assetsAddToList = createAction('assets.list.generic.update', withPayloadType<AssetResource[]>());

export const assetAddToListThunk = (assets: AssetResource[]) => async (dispatch: AppDispatch) => {
  return dispatch(assetsAddToList(assets));
};

export const assetsBalancesUpdate = createAction(
  'assets.balances.update',
  withPayloadType<{wallet_id: string; balances: BalancesMap}>(),
);

export const balancesUpdateThunk = (wallet: Wallet, balances: AssetBalance[]) => async (dispatch: AppDispatch) => {
  const balancesMap: BalancesMap = Object.fromEntries(
    balances.map(balance => [balance.asset.getId(), balance.available.toString(10)]),
  );
  return dispatch(assetsBalancesUpdate({wallet_id: wallet.id, balances: balancesMap}));
};

export const assetsPriceUpdate = createAction('assets.prices.update', withPayloadType<AssetsPriceMap>());

export const assetsPriceUpdateThunk = (prices: AssetPrice[]) => async (dispatch: AppDispatch) => {
  return dispatch(assetsPriceUpdate(mapPricesToMap(prices)));
};

export const assetsFiatUpdate = createAction(
  'assets.fiat.update.value',
  withPayloadType<{wallet_id: string; prices: AssetsPriceMap}>(),
);

export const assetsFiatUpdateThunk = (wallet_id: string, prices: AssetPrice[]) => async (dispatch: AppDispatch) => {
  return dispatch(assetsFiatUpdate({wallet_id, prices: mapPricesToMap(prices)}));
};

export const assetsFiatTotalUpdate = createAction(
  'assets.fiat.total.update.value',
  withPayloadType<{wallet_id: string}>(),
);

export const assetsFiatTotalUpdateThunk = (wallet_id: string) => async (dispatch: AppDispatch) => {
  return dispatch(assetsFiatTotalUpdate({wallet_id}));
};

const mapPricesToMap = (prices: AssetPrice[]): AssetsPriceMap => {
  const pricesMap: AssetsPriceMap = {};
  prices.map(
    x =>
      (pricesMap[x.asset.getId()] = {
        price: x.price,
        change_24h: x.change_24h,
      }),
  );
  return pricesMap;
};
