import {Chain, ChainList} from '@degenwallet/chain-types';

it('test ChainList', () => {
  expect(ChainList).toStrictEqual([
    Chain.BNB_CHAIN,
    Chain.ETHEREUM,
    Chain.BSC_CHAIN,
    Chain.APTOS,
    Chain.POLYGON,
    Chain.SOLANA,
    Chain.COSMOS,
    Chain.OSMOSIS,
    Chain.ARBITRUM,
  ]);
});
