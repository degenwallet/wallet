import {createSelector} from '@reduxjs/toolkit';
import {AppState} from '@degenwallet/store';

export const GetCurrencySelector = createSelector(
  (state: AppState) => state.settings,
  settings => {
    return settings.currency;
  },
);
