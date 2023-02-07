import {Asset, AssetType, Chain} from '@degenwallet/chain-types';
import {ImageRequireSource} from 'react-native';

export class AssetImageViewSource {
  source(asset: Asset): ImageRequireSource | undefined {
    if (asset.getType() === AssetType.NATIVE) {
      switch (asset.chain) {
        case Chain.ETHEREUM:
          return require('../assets/images/chains/binance.png');
        case Chain.BNB_CHAIN:
          return require('../assets/images/chains/binance.png');
        case Chain.APTOS:
          return require('../assets/images/chains/aptos.png');
        case Chain.ARBITRUM:
          return require('../assets/images/chains/arbitrum.png');
        case Chain.COSMOS:
          return require('../assets/images/chains/cosmos.png');
        case Chain.OSMOSIS:
          return require('../assets/images/chains/osmosis.png');
        case Chain.POLYGON:
          return require('../assets/images/chains/polygon.png');
        case Chain.BSC_CHAIN:
          return require('../assets/images/chains/smartchain.png');
        case Chain.SOLANA:
          return require('../assets/images/chains/solana.png');
      }
    }
    return undefined;
  }
}
