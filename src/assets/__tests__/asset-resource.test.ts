import {GetAssetResource, GetAssetResources} from '../asset-resource';
import {Asset, AssetType, Chain, ChainList} from '@degenwallet/chain-types';

describe('test asset exist in asset resource', () => {
  test('token asset', () => {
    expect(GetAssetResource(new Asset(Chain.BNB_CHAIN, 'BTCB-1DE'))).toBeTruthy();
    expect(GetAssetResource(new Asset(Chain.BNB_CHAIN, 'false'))).toBeFalsy();
  });

  test.each(ChainList)('asset chain (%s) exist in asset resource', chain => {
    expect(GetAssetResource(new Asset(chain))).toBeTruthy();
  });

  test.each(ChainList)('chain (%s) exist in asset resource', chain => {
    const list = GetAssetResources(chain);
    expect(list).toBeTruthy();
    expect(list.assets[chain].type).toBe(AssetType.NATIVE);
  });
});
