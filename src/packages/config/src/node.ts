import {Chain} from '@degenwallet/chain-types';
import Nodes from './nodes.json';

export class Node {
  static primary(chain: Chain): string {
    switch (chain) {
      case Chain.BNB_CHAIN:
        return Nodes.bnb_chain[0];
      case Chain.SOLANA:
        return Nodes.solana[0];
      case Chain.ETHEREUM:
        return Nodes.ethereum[0];
      case Chain.BSC_CHAIN:
        return Nodes.smartchain[0];
      case Chain.APTOS:
        return Nodes.aptos[0];
      case Chain.POLYGON:
        return Nodes.polygon[0];
      case Chain.COSMOS:
        return Nodes.cosmos[0];
      case Chain.OSMOSIS:
        return Nodes.osmosis[0];
      case Chain.ARBITRUM:
        return Nodes.arbitrum[0];
      case Chain.BITCOIN:
        throw new Error();
    }
  }
}
