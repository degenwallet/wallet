import {createReducer} from '@reduxjs/toolkit';
import {Currency} from '@degenwallet/types';
import {setCurrency} from '../actions/settings_actions';
import {AppDispatch} from '../../core/store';

interface SettingsState {
  currency: string;
}

const INITIAL_STATE: SettingsState = {
  currency: String(Currency.USD),
};

export const settingsSetCurrency = (currency: string) => async (dispatch: AppDispatch) => {
  return dispatch(setCurrency(currency));
};

export const SettingsReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setCurrency, (state, action) => {
    return {
      ...state,
      currency: action.payload,
    };
  });
});
