import {combineReducers} from 'redux';

import wallets from './reducers/wallets';
import settings from './reducers/settings';
import {AssetsReducer} from '../redux/reducers/assets';

export default combineReducers({
  wallets,
  settings,
  assets: AssetsReducer,
});
