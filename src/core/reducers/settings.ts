import {Dispatch} from 'redux';
import {Currency} from '@degenwallet/types';

const DefaultCurrency = Currency.USD;

interface SettingsState {
  currency: string;
}

const INITIAL_STATE: SettingsState = {
  currency: String(DefaultCurrency),
};

enum ACTION {
  CHANGE_CURRENCY = 'settings.change_currency',
}

// actions

interface SettingsChangeCurrency {
  type: typeof ACTION.CHANGE_CURRENCY;
  payload: string;
}

type SettingsStateAction = SettingsChangeCurrency;

export const settingsChangeCurrency = (currency: string) => async (dispatch: Dispatch<SettingsChangeCurrency>) => {
  return dispatch({
    type: ACTION.CHANGE_CURRENCY,
    payload: currency,
  });
};

export default (state = INITIAL_STATE, action: SettingsStateAction) => {
  switch (action.type) {
    case ACTION.CHANGE_CURRENCY: {
      return {
        ...state,
        currency: action.payload,
      };
    }
    default:
      return state;
  }
};
