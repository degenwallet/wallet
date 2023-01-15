import {Chain} from '@degenwallet/chain-types';
import {Asset} from '../src/asset';
import {AssetType} from '../src/asset-type';

const nativeAsset = new Asset(Chain.BNB_CHAIN, '');
const tokenAsset = new Asset(Chain.BNB_CHAIN, 'ZEC-93E');

it('test correct id', () => {
  expect(nativeAsset.getId()).toBe('binance');
  expect(tokenAsset.getId()).toBe('binance_ZEC-93E');
});

it('test correct type', () => {
  expect(nativeAsset.getType()).toBe(AssetType.NATIVE);
  expect(tokenAsset.getType()).toBe(AssetType.TOKEN);
});

it('test from id', () => {
  expect(Asset.fromID('binance').getId()).toBe('binance');
  expect(Asset.fromID('binance_ETH-1C9').getId()).toBe('binance_ETH-1C9');
  expect(Asset.fromID('ethereum').getId()).toBe('ethereum');
});
