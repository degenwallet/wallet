import {createSelector} from '@reduxjs/toolkit';
import {AppState} from '../store';
import {AssetResource} from '../../assets/asset-resource';
import {Wallet} from '@magicwallet/types';
import {Chain} from '@magicwallet/chain-types';

const getWallet = (state: AppState, wallet_id: string) => state.wallets.wallets.find(el => el.id === wallet_id)!;
const getWalletAccount = (state: AppState, value: {wallet: Wallet; chain: Chain}) => {
  return value;
};

export const getWalletsSelector = createSelector(
  (state: AppState) => state.wallets.wallets,
  items => {
    return items.map(item => {
      return {
        name: item.name,
        wallet: item,
      };
    });
  },
);

export const GetCurrentWallet = createSelector(
  (state: AppState) => state.wallets,
  wallets => {
    return wallets.wallets.find(wallet => wallet.id === wallets.current)!;
  },
);

export const GetCurrentWalletAccount = createSelector(getWalletAccount, value => {
  return value.wallet.accounts.find(account => account.chain === value.chain)!;
});

export const getWalletSelector = createSelector(getWallet, wallet => {
  return wallet;
});

export const walletName = (assetResource: AssetResource, numberOfWallets: number): string => {
  return `${assetResource.name} Wallet #${numberOfWallets + 1}`;
};
