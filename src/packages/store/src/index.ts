import {configureStore, Middleware} from '@reduxjs/toolkit';
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {combineReducers} from 'redux';
import {AssetsReducer, SettingsReducer} from '@degenwallet/redux';
import {MMKVStorage} from './MMKVStorage';
import wallets from '../../../core/reducers/wallets';

const persistConfig = {
  key: 'root_v11',
  storage: MMKVStorage,
  version: 1,
};

export const reducers = combineReducers({
  wallets,
  settings: SettingsReducer,
  assets: AssetsReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const middlewares: Middleware<any>[] = [];
if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

export const store = configureStore({
  reducer: persistedReducer,
  middleware: defaultMiddleware =>
    defaultMiddleware({
      // https://github.com/reduxjs/redux-toolkit/issues/415
      //serializableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: false,
    }).concat(middlewares),
  devTools: __DEV__,
});
export const persistor = persistStore(store);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
