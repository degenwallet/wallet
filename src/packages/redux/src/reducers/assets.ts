import {AssetResources, GetAssetResource} from '../../../../assets/asset-resource';
import {FiatValue, fromBigNumber, Price} from '@degenwallet/types';
import {createReducer} from '@reduxjs/toolkit';
import {
  assetsAddToList,
  assetsDefaultUpdate,
  assetsPriceUpdate,
  updateFiat,
  walletBalancesUpdate,
} from '../actions/assets_actions';
import {Asset} from '@degenwallet/chain-types';

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
      const wallet = state.wallets[action.payload.walletId];
      const prices = state.prices;
      wallet.assets = action.payload.assets;
      state.wallets[action.payload.walletId] = fiatController(wallet, prices);
    })
    .addCase(assetsPriceUpdate, (state, action) => {
      const prices = {...action.payload, ...state.prices};
      Object.keys(state.wallets).forEach(walletId => {
        state.wallets[walletId] = fiatController(state.wallets[walletId], prices);
      });
      state.prices = prices;
    })
    .addCase(updateFiat, (state, action) => {
      const prices = state.prices;
      const wallet = state.wallets[action.payload];
      state.wallets[action.payload] = fiatController(wallet, prices);
    });
});

const fiatController = (wallet: WalletValues, prices: {[key: string]: Price}) => {
  let totalValue = 0;
  let totalValueChange = 0;
  Object.keys(wallet.assets).forEach(assetId => {
    const assetResource = GetAssetResource(Asset.fromID(assetId))!;
    if (assetResource === undefined) {
      return;
    }
    const price = prices[assetId] || 0;
    const balance = fromBigNumber(BigInt(wallet.assets[assetId].balance), assetResource.decimals);
    const fiatValue = price.price * balance;
    wallet.assets[assetId].fiat_value = fiatValue;
    totalValue += fiatValue;
    totalValueChange += (fiatValue * price.change_24h) / 100;
  });
  wallet.fiat_value = {
    value: totalValue,
    value_change: totalValueChange,
    value_change_percentage: (totalValueChange * 100) / totalValue,
  };
  return wallet;
};
