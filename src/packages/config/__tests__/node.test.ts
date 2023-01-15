import {Node} from '../src/node';
import {Chain, ChainList} from '@degenwallet/chain-types';
import Nodes from '../src/nodes.json';

describe('test node exist in nodes list', () => {
  expect(Node.primary(Chain.BNB_CHAIN)).toBe(Nodes.bnb_chain[0]);
  expect(Node.primary(Chain.ETHEREUM)).toBe(Nodes.ethereum[0]);
  expect(Node.primary(Chain.BSC_CHAIN)).toBe(Nodes.smartchain[0]);

  test.each(ChainList)('chain (%s) node exist in nodes list', chain => {
    expect(Node.primary(chain)).toBeTruthy();
  });
});
