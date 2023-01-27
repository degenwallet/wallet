import {combineReducers} from 'redux';

import wallets from './reducers/wallets';
import {AssetsReducer, SettingsReducer} from '@degenwallet/redux';

export default combineReducers({
  wallets,
  settings: SettingsReducer,
  assets: AssetsReducer,
});
