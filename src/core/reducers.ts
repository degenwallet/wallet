import {combineReducers} from 'redux';

import wallets from './reducers/wallets';
import {AssetsReducer} from '@degenwallet/redux/src';
import {SettingsReducer} from '@degenwallet/redux/src';

export default combineReducers({
  wallets,
  settings: SettingsReducer,
  assets: AssetsReducer,
});
