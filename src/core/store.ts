import reducers from './reducers';
import {configureStore} from '@reduxjs/toolkit';
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist';
import {reduxStorage} from './storage';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {Middleware} from 'redux';

const persistConfig = {
  key: 'root_v11',
  storage: reduxStorage,
  version: 1,
};

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
