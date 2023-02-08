import {createAction} from '@reduxjs/toolkit';
import {AssetsPriceMap, AssetBalanceValues} from '../reducers/assets';
import {AssetResource} from '../../../../assets/asset-resource';
import {withPayloadType} from './index';
import {AssetPrice} from '@degenwallet/types';

export const assetsAddToList = createAction('assets.list.generic.update', withPayloadType<AssetResource[]>());

export const assetsDefaultUpdate = createAction(
  'assets.list.default.update',
  withPayloadType<{walletId: string; assets: string[]}>(),
);

export const walletBalancesUpdate = createAction(
  'assets.balances.update',
  withPayloadType<{walletId: string; assets: {[key: string]: AssetBalanceValues}}>(),
);

export const assetsPriceUpdate = createAction('assets.prices.update', withPayloadType<AssetsPriceMap>());

export const assetsFiatUpdate = createAction(
  'assets.fiat.update.value',
  withPayloadType<{wallet_id: string; prices: AssetsPriceMap}>(),
);

export const assetsFiatTotalUpdate = createAction(
  'assets.fiat.total.update.value',
  withPayloadType<{wallet_id: string}>(),
);

export const mapPricesToMap = (prices: AssetPrice[]): AssetsPriceMap => {
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
