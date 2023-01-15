import {MMKV} from 'react-native-mmkv';

export const storageGlobal = new MMKV({
  id: 'global',
  // TODO: Use value from keychain in the future. Since it's a shared storage, not critical for now
  encryptionKey: 'degen_password',
});
