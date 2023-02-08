import {Asset} from '@degenwallet/chain-types';
import {AssetResources, GetAssetResource} from '../../../../assets/asset-resource';
import {FiatValue, fromBigNumber, Price} from '@degenwallet/types';
import {createReducer} from '@reduxjs/toolkit';
import {
  assetsAddToList,
  assetsDefaultUpdate,
  assetsFiatTotalUpdate,
  assetsFiatUpdate,
  assetsPriceUpdate,
  walletBalancesUpdate,
} from '../actions/assets_actions';

export type AssetBalanceValues = {
  balance: string;
  fiat_value: number;
};

export type WalletAssetsMap = {
  [key: string]: WalletValues;
};

export type AssetsBalancesStore = {[key: string]: AssetBalanceValues};

export type WalletValues = {
  fiat_value: FiatValue;
  assets: AssetsBalancesStore;
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

const InitialWalletState = {
  assets: {},
  fiat_value: {
    value: 0,
    value_change: 0,
    value_change_percentage: 0,
  },
};

export const AssetsReducer = createReducer(INITIAL_STATE, builder => {
  builder
    .addCase(assetsAddToList, (state, action) => {
      return {
        ...state,
        generic_list: Object.fromEntries(action.payload.map(asset => [asset.asset, asset])),
      };
    })
    .addCase(assetsDefaultUpdate, (state, action) => {
      const wallet: WalletValues = state.wallets[action.payload.walletId] || InitialWalletState;
      action.payload.assets.forEach(value => {
        if (wallet.assets[value]) {
          wallet.assets[value] = {
            balance: '',
            fiat_value: 0,
          };
        }
      });
      state.wallets[action.payload.walletId] = wallet;
    })
    .addCase(walletBalancesUpdate, (state, action) => {
      state.wallets[action.payload.walletId].assets = action.payload.assets;
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
