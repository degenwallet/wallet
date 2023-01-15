import {Dispatch} from 'redux';
import {Asset, AssetBalance} from '@degenwallet/chain-types';
import {AssetResource, AssetResources, GetAssetResource} from '../../assets/asset-resource';
import {AssetPrice, FiatValue, fromBigNumber, Price, Wallet} from '@degenwallet/types';

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

type AssetsPriceMap = {[key: string]: Price};

const INITIAL_STATE: AssetsState = {
  generic_list: {},
  wallets: {},
  prices: {},
};

enum ACTION {
  UPDATE_BALANCES = 'assets.balances.update',
  UPDATE_GENERIC_LIST = 'assets.list.generic.update',
  UPDATE_PRICES = 'assets.prices.update',
  UPDATE_ASSETS_FIAT_VALUE = 'assets.fiat.update.value',
  UPDATE_ASSETS_TOTAL_FIAT_VALUE = 'assets.fiat.total.update.value',
}

interface AssetsUpdate {
  type: typeof ACTION.UPDATE_BALANCES;
  payload: {wallet_id: string; balances: BalancesMap};
}

interface AssetsUpdateList {
  type: typeof ACTION.UPDATE_GENERIC_LIST;
  payload: AssetResource[];
}

interface AssetsUpdatePrices {
  type: typeof ACTION.UPDATE_PRICES;
  payload: AssetsPriceMap;
}

interface AssetsUpdateAssetsFiatValue {
  type: typeof ACTION.UPDATE_ASSETS_FIAT_VALUE;
  payload: {wallet_id: string; prices: AssetsPriceMap};
}

interface AssetsUpdateTotalFiatValue {
  type: typeof ACTION.UPDATE_ASSETS_TOTAL_FIAT_VALUE;
  payload: {wallet_id: string};
}

type AssetsStateAction =
  | AssetsUpdate
  | AssetsUpdateList
  | AssetsUpdatePrices
  | AssetsUpdateAssetsFiatValue
  | AssetsUpdateTotalFiatValue;

export const assetAddToList = (assets: AssetResource[]) => async (dispatch: Dispatch<AssetsUpdateList>) => {
  return dispatch({
    type: ACTION.UPDATE_GENERIC_LIST,
    payload: assets,
  });
};

export const assetsBalancesUpdate =
  (wallet: Wallet, balances: AssetBalance[]) => async (dispatch: Dispatch<AssetsUpdate>) => {
    const balancesMap: BalancesMap = Object.fromEntries(
      balances.map(balance => [balance.asset.getId(), balance.available.toString(10)]),
    );

    return dispatch({
      type: ACTION.UPDATE_BALANCES,
      payload: {wallet_id: wallet.id, balances: balancesMap},
    });
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

export const marketUpdatePrices = (prices: AssetPrice[]) => async (dispatch: Dispatch<AssetsUpdatePrices>) => {
  return dispatch({
    type: ACTION.UPDATE_PRICES,
    payload: mapPricesToMap(prices),
  });
};

export const marketUpdateAssetFiatValue =
  (wallet_id: string, prices: AssetPrice[]) => async (dispatch: Dispatch<AssetsUpdateAssetsFiatValue>) => {
    return dispatch({
      type: ACTION.UPDATE_ASSETS_FIAT_VALUE,
      payload: {wallet_id, prices: mapPricesToMap(prices)},
    });
  };

export const marketUpdateTotalFiatValue =
  (wallet_id: string) => async (dispatch: Dispatch<AssetsUpdateTotalFiatValue>) => {
    return dispatch({
      type: ACTION.UPDATE_ASSETS_TOTAL_FIAT_VALUE,
      payload: {wallet_id},
    });
  };

export default (state = INITIAL_STATE, action: AssetsStateAction) => {
  switch (action.type) {
    case ACTION.UPDATE_GENERIC_LIST: {
      const list = state.generic_list || {};
      action.payload.forEach(asset => {
        list[asset.asset] = asset;
      });
      return {
        ...state,
        generic_list: list,
      };
    }
    case ACTION.UPDATE_BALANCES: {
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
      return {
        ...state,
        wallets: wallets,
      };
    }
    case ACTION.UPDATE_PRICES: {
      return {
        ...state,
        prices: {...action.payload, ...state.prices},
      };
    }
    case ACTION.UPDATE_ASSETS_FIAT_VALUE: {
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

      return {
        ...state,
        wallets: wallets,
      };
    }
    case ACTION.UPDATE_ASSETS_TOTAL_FIAT_VALUE:
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

      return {
        ...state,
        wallets: wallets,
      };
    default:
      return state;
  }
};
