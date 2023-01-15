import {MMKV} from 'react-native-mmkv';
import {Storage} from 'redux-persist';

const storage = new MMKV({
  id: 'redux_state',
  // TODO: Use value from keychain in the future. Since it's a shared storage, not critical for now
  encryptionKey: 'degen-wallet-key',
});

export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};
