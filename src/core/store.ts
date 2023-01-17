import reducers from './reducers';
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist';
import {reduxStorage} from './storage';

const persistConfig = {
  key: 'root_v11',
  storage: reduxStorage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const middlewares = getDefaultMiddleware({
  // https://github.com/reduxjs/redux-toolkit/issues/415
  //serializableCheck: false,
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
  immutableCheck: false,
});
if (__DEV__) {
  // TODO: Flipper
  // const createDebugger = require('redux-flipper').default;
  // middlewares.push(createDebugger());
}

export const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewares,
});
export const persistor = persistStore(store);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
