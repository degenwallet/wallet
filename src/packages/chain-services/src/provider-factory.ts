import {Chain} from '@degenwallet/chain-types';
import {
  ChainProvider,
  ChainProviderAptos,
  ChainProviderBNBChain,
  ChainProviderCosmos,
  ChainProviderEVM,
  ChainProviderSolana,
  Denom,
} from '@degenwallet/chain-providers';
import {Node} from '@degenwallet/config';

export class ProviderFactory {
  static setup(): Map<Chain, ChainProvider> {
    const providers = new Map<Chain, ChainProvider>();
    providers.set(Chain.BNB_CHAIN, new ChainProviderBNBChain(Node.primary(Chain.BNB_CHAIN), Chain.BNB_CHAIN));
    providers.set(Chain.ETHEREUM, new ChainProviderEVM(Node.primary(Chain.ETHEREUM), Chain.ETHEREUM));
    providers.set(Chain.BSC_CHAIN, new ChainProviderEVM(Node.primary(Chain.BSC_CHAIN), Chain.BSC_CHAIN));
    providers.set(
      Chain.APTOS,
      new ChainProviderAptos({
        url: Node.primary(Chain.APTOS),
      }),
    );
    providers.set(Chain.POLYGON, new ChainProviderEVM(Node.primary(Chain.POLYGON), Chain.POLYGON));
    providers.set(Chain.ARBITRUM, new ChainProviderEVM(Node.primary(Chain.ARBITRUM), Chain.ARBITRUM));
    providers.set(Chain.SOLANA, new ChainProviderSolana(Node.primary(Chain.SOLANA), Chain.SOLANA));
    providers.set(Chain.COSMOS, new ChainProviderCosmos(Node.primary(Chain.COSMOS), Chain.COSMOS, Denom.COSMOS));
    providers.set(Chain.OSMOSIS, new ChainProviderCosmos(Node.primary(Chain.OSMOSIS), Chain.OSMOSIS, Denom.OSMOSIS));

    return providers;
  }
}
