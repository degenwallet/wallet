import {createAction} from '@reduxjs/toolkit';
import {withPayloadType} from './index';
import {WalletType} from '@degenwallet/types';
import {Chain} from '@degenwallet/chain-types';

export const addWallet = createAction('wallets.add', withPayloadType<AddWallet>());
export const removeWallet = createAction('wallets.remove', withPayloadType<string>());
export const selectWallet = createAction('wallets.select', withPayloadType<string>());
export const renameWallet = createAction('wallets.rename', withPayloadType<RenameWallet>());

export type Account = {
  chain: Chain;
  address: string;
};

export type AddWallet = {
  name: string;
  type: WalletType;
  accounts: [Account];
};

export type Wallet = {
  id: string;
  name: string;
  type: WalletType;
  accounts: [Account];
};

export type RenameWallet = {
  wallet_id: string;
  name: string;
};
