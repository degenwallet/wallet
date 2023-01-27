import {Asset} from '@degenwallet/chain-types';
import {AssetResources, GetAssetResource} from '../../../../assets/asset-resource';
import {FiatValue, fromBigNumber, Price} from '@degenwallet/types';
import {createReducer} from '@reduxjs/toolkit';
import {
  assetsBalancesUpdate,
  assetsFiatTotalUpdate,
  assetsFiatUpdate,
  assetsAddToList,
  assetsPriceUpdate,
} from '../actions/assets_actions';

export type AssetStore = {
  balance: string;
  fiat_value: number;
};

export type WalletAssetsMap = {
  [key: string]: WalletAssets;
};

export type WalletAssets = {
  fiat_value: FiatValue;
  assets: {[key: string]: AssetStore};
};

export type BalancesMap = {
  [key: string]: string;
};

interface AssetsState {
  generic_list: AssetResources;
  wallets: WalletAssetsMap;
  prices: {[key: string]: Price};
}

export type AssetsPriceMap = {[key: string]: Price};

const INITIAL_STATE: AssetsState = {
  generic_list: {},
  wallets: {},
  prices: {},
};

export const AssetsReducer = createReducer(INITIAL_STATE, builder => {
  builder
    .addCase(assetsAddToList, (state, action) => {
      const list: AssetResources = {};
      action.payload.forEach(asset => {
        console.log('update generic asset error: ', asset);
        list[asset.asset] = asset;
      });
      return {
        ...state,
        generic_list: list,
      };
    })
    .addCase(assetsBalancesUpdate, (state, action) => {
      const wallet_id = action.payload.wallet_id;
      const wallets = state.wallets || {};
      const balances = action.payload.balances;
      const walletAssets: WalletAssets = wallets[wallet_id] || {
        assets: {},
        fiat_value: {
          value: 0,
          value_change: 0,
          value_change_percentage: 0,
        },
      };

      Object.keys(balances).forEach(key => {
        const asset = walletAssets.assets[key] || {
          balance: '',
          fiat_value: 0,
        };
        asset.balance = balances[key];
        walletAssets.assets[key] = asset;
      });

      wallets[wallet_id] = walletAssets;
    })
    .addCase(assetsPriceUpdate, (state, action) => {
      return {
        ...state,
        prices: {...action.payload, ...state.prices},
      };
    })
    .addCase(assetsFiatUpdate, (state, action) => {
      const wallet_id = action.payload.wallet_id;
      const prices = action.payload.prices;
      const wallets = state.wallets;
      const walletAssets = wallets[wallet_id];

      Object.keys(prices).forEach(assetId => {
        const price = prices[assetId];
        const asset = walletAssets.assets[assetId];
        const assetResource = GetAssetResource(Asset.fromID(assetId))!;
        if (asset === undefined || assetResource === undefined) {
          return;
        }
        const balance = fromBigNumber(BigInt(asset.balance), assetResource.decimals);
        asset.fiat_value = price.price * balance;
        walletAssets.assets[assetId] = asset;
      });
      wallets[wallet_id] = walletAssets;
    })
    .addCase(assetsFiatTotalUpdate, (state, action) => {
      const wallet_id = action.payload.wallet_id;
      const wallets = state.wallets;
      const walletAssets = wallets[wallet_id] || {};
      const fiatValue = walletAssets.fiat_value || {
        value: 0,
        value_change: 0,
        value_change_percentage: 0,
      };

      let totalValue = 0;
      let totalValueChange = 0;

      Object.keys(walletAssets.assets).forEach(assetId => {
        const asset = walletAssets.assets[assetId];
        const price = state.prices[assetId];
        if (price === undefined) {
          return;
        }
        totalValue += asset.fiat_value;
        totalValueChange += (asset.fiat_value * price.change_24h) / 100;
      });
      fiatValue.value = totalValue;
      fiatValue.value_change = totalValueChange;
      fiatValue.value_change_percentage = (totalValueChange * 100) / totalValue;

      walletAssets.fiat_value = fiatValue;
      wallets[wallet_id] = walletAssets;
    });
});
