import {combineReducers} from 'redux';
import {AssetsReducer, SettingsReducer, WalletsReducer} from '@degenwallet/redux';

export default combineReducers({
  wallets: WalletsReducer,
  settings: SettingsReducer,
  assets: AssetsReducer,
});
