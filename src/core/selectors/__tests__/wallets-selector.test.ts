import {walletName} from '../wallets-selectors';
import {AssetResource} from '../../../assets/asset-resource';

it('test wallet name', () => {
  expect(walletName({name: 'Solana'} as AssetResource, 0)).toBe('Solana Wallet #1');
  expect(walletName({name: 'BNB'} as AssetResource, 1)).toBe('BNB Wallet #2');
});
