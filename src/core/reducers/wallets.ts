import {Dispatch} from 'redux';
import {Chain} from '@magicwallet/chain-types';
import {WalletType} from '@magicwallet/types';

type AddNewWallet = {
  name: string;
  type: WalletType;
  accounts: [Account];
};

type Account = {
  chain: Chain;
  address: string;
};

type Wallet = {
  id: string;
  name: string;
  type: WalletType;
  accounts: [Account];
};

interface WalletsState {
  current: string;
  current_index: number;
  wallets: Wallet[];
}

const INITIAL_STATE: WalletsState = {
  current: '',
  current_index: 1,
  wallets: [],
};

enum ACTION {
  ADD_WALLET = 'wallets.add',
  SELECT_WALLET = 'wallets.select',
  DELETE_WALLET = 'wallets.delete',
  RENAME_WALLET = 'wallets.rename',
}

interface WalletsStateAddAWallet {
  type: typeof ACTION.ADD_WALLET;
  payload: AddNewWallet;
}

interface WalletsStateDeleteWallet {
  type: typeof ACTION.DELETE_WALLET;
  payload: {wallet_id: string};
}

interface WalletsStateSelectWallet {
  type: typeof ACTION.SELECT_WALLET;
  payload: Wallet;
}

interface WalletsStateRenameWallet {
  type: typeof ACTION.RENAME_WALLET;
  payload: {wallet: Wallet; name: string};
}

type WalletsStateUpdateAction =
  | WalletsStateAddAWallet
  | WalletsStateDeleteWallet
  | WalletsStateSelectWallet
  | WalletsStateRenameWallet;

export const walletsAddWallet =
  (name: string, chain: Chain, address: string) => async (dispatch: Dispatch<WalletsStateAddAWallet>) => {
    return dispatch({
      type: ACTION.ADD_WALLET,
      payload: {
        name,
        type: WalletType.SINGLE,
        accounts: [{chain: chain, address: address}],
      },
    });
  };

export const walletsDeleteWallet = (wallet_id: string) => async (dispatch: Dispatch<WalletsStateDeleteWallet>) => {
  return dispatch({
    type: ACTION.DELETE_WALLET,
    payload: {wallet_id},
  });
};

export const walletsSelectWallet = (wallet: Wallet) => async (dispatch: Dispatch<WalletsStateSelectWallet>) => {
  return dispatch({
    type: ACTION.SELECT_WALLET,
    payload: wallet,
  });
};

export const walletsRenameWallet =
  (wallet: Wallet, name: string) => async (dispatch: Dispatch<WalletsStateRenameWallet>) => {
    return dispatch({
      type: ACTION.RENAME_WALLET,
      payload: {wallet, name},
    });
  };

export default (state = INITIAL_STATE, action: WalletsStateUpdateAction) => {
  switch (action.type) {
    case ACTION.ADD_WALLET: {
      const new_current_index = state.current_index + 1;
      const wallet = {
        id: new_current_index.toString(),
        type: action.payload.type,
        name: action.payload.name,
        accounts: action.payload.accounts,
      };
      return {
        ...state,
        current: wallet.id,
        current_index: new_current_index,
        wallets: [...state.wallets, wallet],
      };
    }
    case ACTION.SELECT_WALLET: {
      return {
        ...state,
        current: action.payload.id,
      };
    }
    case ACTION.DELETE_WALLET: {
      return {
        ...state,
        current: state.wallets[0].id,
        wallets: [...state.wallets.filter(el => el.id !== action.payload.wallet_id)],
      };
    }
    case ACTION.RENAME_WALLET:
      const wallets = state.wallets;
      const walletIndex = wallets.findIndex(el => el.id === action.payload.wallet.id);
      const wallet = wallets[walletIndex];
      wallet.name = action.payload.name;
      wallets[walletIndex] = wallet;
      return {
        ...state,
        wallets: wallets,
      };
    default:
      return state;
  }
};
