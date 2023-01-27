import {createReducer} from '@reduxjs/toolkit';
import {AddWallet, addWallet, removeWallet, renameWallet, selectWallet, Wallet} from '../actions/wallets_actions';
import {AppDispatch} from '../../../../core/store';

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

export const walletsAddWallet = (wallet: AddWallet) => async (dispatch: AppDispatch) => {
  return dispatch(addWallet(wallet));
};

export const walletsRemoveWallet = (wallet_id: string) => async (dispatch: AppDispatch) => {
  return dispatch(removeWallet(wallet_id));
};

export const walletsSelectWallet = (wallet_id: string) => async (dispatch: AppDispatch) => {
  return dispatch(selectWallet(wallet_id));
};

export const walletsRenameWallet = (wallet_id: string, name: string) => async (dispatch: AppDispatch) => {
  return dispatch(renameWallet({wallet_id, name}));
};

export const WalletsReducer = createReducer(INITIAL_STATE, builder => {
  builder
    .addCase(addWallet, (state, action) => {
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
    })
    .addCase(removeWallet, (state, action) => {
      return {
        ...state,
        current: state.wallets[0].id,
        wallets: [...state.wallets.filter(el => el.id !== action.payload)],
      };
    })
    .addCase(selectWallet, (state, action) => {
      return {
        ...state,
        current: action.payload,
      };
    })
    .addCase(renameWallet, (state, action) => {
      const wallets = state.wallets;
      const walletIndex = wallets.findIndex(el => el.id === action.payload.wallet_id);
      const wallet = wallets[walletIndex];
      wallet.name = action.payload.name;
      wallets[walletIndex] = wallet;
      return {
        ...state,
        wallets: wallets,
      };
    });
});
