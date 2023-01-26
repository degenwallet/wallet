import {combineReducers} from 'redux';

import wallets from './reducers/wallets';
import {AssetsReducer} from '../redux/reducers/assets';
import {SettingsReducer} from '../redux/reducers/settings';

export default combineReducers({
  wallets,
  settings: SettingsReducer,
  assets: AssetsReducer,
});
