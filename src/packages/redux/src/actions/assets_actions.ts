import {createAction} from '@reduxjs/toolkit';
import {AssetsPriceMap, BalancesMap} from '../reducers/assets';
import {AssetResource} from '../../../../assets/asset-resource';
import {withPayloadType} from './index';
import {AssetPrice} from '@degenwallet/types';

export const assetsAddToList = createAction('assets.list.generic.update', withPayloadType<AssetResource[]>());

export const assetsBalancesUpdate = createAction(
  'assets.balances.update',
  withPayloadType<{wallet_id: string; balances: BalancesMap}>(),
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
