import {Chain, Asset, AssetImageFormatter} from '@degenwallet/chain-types';

const nativeAsset = new Asset(Chain.BNB_CHAIN, '');
const tokenAsset = new Asset(Chain.BNB_CHAIN, 'ZEC-93E');

it('test correct url', () => {
  const formatter = new AssetImageFormatter('http://endpoint');

  expect(formatter.url(nativeAsset)).toBe('http://endpoint/blockchains/binance/info/logo.png');
  expect(formatter.url(tokenAsset)).toBe('http://endpoint/blockchains/binance/assets/ZEC-93E/logo.png');
});
