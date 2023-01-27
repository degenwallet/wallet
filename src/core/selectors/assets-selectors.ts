import {createSelector} from '@reduxjs/toolkit';
import {AppState} from '../store';
import {Asset, AssetInfo, AssetItem} from '@degenwallet/chain-types';
import {AssetResource} from '../../assets/asset-resource';
import {AssetDetails} from '@degenwallet/chain-types/src/asset-item';
import {FiatValue, Wallet} from '@degenwallet/types';
import {AssetBalanceFiat} from '@degenwallet/chain-types/src/asset-balance';

const getAssetsListMap = (state: AppState) => state.assets.generic_list || {};
const getAssetsWalletMap = (state: AppState) => state.assets.wallets || {};
const getPrices = (state: AppState) => state.assets.prices || {};
const getAssetsForWalletMap = (state: AppState, wallet: Wallet) => state.assets.wallets[wallet.id] || {};
const getAssetForWallet = (_: any, id: {wallet: Wallet; asset: Asset}) => id;

export const GetAssetSelector = createSelector(
  getAssetsListMap,
  getAssetsWalletMap,
  getAssetForWallet,
  getPrices,
  (assetsList, assets, {wallet, asset}, prices) => {
    const assetResource = assetsList[asset.getId()];
    const price = prices[asset.getId()];
    const assetBalance = assets[wallet.id].assets[assetResource.asset] || 0;

    return GetAssetItem(
      asset,
      assetResource,
      new AssetBalanceFiat(asset, BigInt(assetBalance.balance), assetBalance.fiat_value, price),
    );
  },
);

export const GetTotalFiatValueSelector = createSelector(getAssetsForWalletMap, assets => {
  return (
    assets.fiat_value || {
      value: 0,
      value_change: 0,
      value_change_percentage: 0,
    }
  );
});

export const GetAssetTotalFiatValueSelector = createSelector(
  getAssetsWalletMap,
  getPrices,
  getAssetForWallet,
  (assets, prices, {wallet, asset}) => {
    const assetStore = assets[wallet.id].assets[asset.getId()];
    const price = prices[asset.getId()] || {price: 0, change_24h: 0};
    return {
      value: assetStore.fiat_value,
      value_change: price.price,
      value_change_percentage: price.change_24h,
    } as FiatValue;
  },
);

export const GetAssetsSelector = createSelector(
  getAssetsListMap,
  getAssetsForWalletMap,
  getPrices,
  (assetsList, assets, prices) => {
    const assetsMap = assets.assets || {};
    const pricesMap = prices || {};
    return Object.keys(assetsMap)
      .map(key => {
        return assetsList[key] as AssetResource;
      })
      .filter(value => value !== undefined)
      .map(assetResource => {
        const assetId = assetResource.asset;
        const assetBalance = assetsMap[assetId];
        const asset = Asset.fromID(assetId);
        const price = pricesMap[assetId];
        return GetAssetItem(
          asset,
          assetResource,
          new AssetBalanceFiat(asset, BigInt(assetBalance.balance), assetBalance.fiat_value, price),
        );
      })
      .sort((a, b) => b.balance.fiatValue - a.balance.fiatValue);
  },
);

const GetAssetItem = (asset: Asset, assetResource: AssetResource, balance: AssetBalanceFiat): AssetItem => {
  return new AssetItem(
    asset,
    new AssetInfo(assetResource.name, assetResource.symbol, assetResource.decimals),
    new AssetDetails(assetResource.info.is_buy_available),
    balance,
  );
};

export const GetAssetTitle = createSelector(
  (asset: AssetInfo) => asset,
  asset => {
    return `${asset.name} (${asset.symbol})`;
  },
);
