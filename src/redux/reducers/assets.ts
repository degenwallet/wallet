import {Asset, AssetBalance} from '@degenwallet/chain-types';
import {AssetResource, AssetResources, GetAssetResource} from '../../assets/asset-resource';
import {AssetPrice, FiatValue, fromBigNumber, Price, Wallet} from '@degenwallet/types';
import {createReducer} from '@reduxjs/toolkit';
import {
  assetsBalancesUpdate,
  assetsFiatTotalUpdate,
  assetsFiatUpdate,
  assetsGenericUpdate,
  assetsPriceUpdate,
} from '../actions/assets_actions';
import {AppDispatch} from '../../core/store';

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

export const assetAddToList = (assets: AssetResource[]) => {
  return async (dispatch: AppDispatch) => {
    return dispatch(assetsGenericUpdate(assets));
  };
};

export const balancesUpdate = (wallet: Wallet, balances: AssetBalance[]) => {
  return async (dispatch: AppDispatch) => {
    const balancesMap: BalancesMap = Object.fromEntries(
      balances.map(balance => [balance.asset.getId(), balance.available.toString(10)]),
    );
    return dispatch(assetsBalancesUpdate({wallet_id: wallet.id, balances: balancesMap}));
  };
};

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

export const marketUpdatePrices = (prices: AssetPrice[]) => async (dispatch: AppDispatch) => {
  return dispatch(assetsPriceUpdate(mapPricesToMap(prices)));
};

export const marketUpdateAssetFiatValue =
  (wallet_id: string, prices: AssetPrice[]) => async (dispatch: AppDispatch) => {
    return dispatch(assetsFiatUpdate({wallet_id, prices: mapPricesToMap(prices)}));
  };

export const marketUpdateTotalFiatValue = (wallet_id: string) => async (dispatch: AppDispatch) => {
  return dispatch(assetsFiatTotalUpdate({wallet_id}));
};

export const AssetsReducer = createReducer(INITIAL_STATE, builder => {
  builder
    .addCase(assetsGenericUpdate, (state, action) => {
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
