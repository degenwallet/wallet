import {AssetImageViewSource} from '../AssetImageViewSource';
import {Asset, Chain, ChainList} from '@degenwallet/chain-types';

describe('test source', () => {
  const source = new AssetImageViewSource();

  test('token asset', () => {
    expect(source.source(new Asset(Chain.ETHEREUM, '0x123'))).toBeFalsy();
  });

  test.each(ChainList)('chain (%s) exist default image source', chain => {
    expect(source.source(new Asset(chain))).toBeTruthy();
  });
});
