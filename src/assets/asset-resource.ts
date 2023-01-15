import {Asset, Chain} from '@degenwallet/chain-types';

export type AssetResourcesList = {
  assets: AssetResources;
};
export type AssetResources = {[key: string]: AssetResource};
export type AssetResource = {
  asset: string;
  name: string;
  symbol: string;
  decimals: number;
  type: string; // Replace with AssetType
  info: {
    is_buy_available: boolean;
  };
};

export function GetAssetResource(asset: Asset): AssetResource | undefined {
  return GetAssetResources(asset.chain).assets[asset.getId()];
}

export function GetAssetResources(chain: Chain): AssetResourcesList {
  switch (chain) {
    case Chain.BNB_CHAIN:
      return require('./chains/binance.json');
    case Chain.ETHEREUM:
      return require('./chains/ethereum.json');
    case Chain.SOLANA:
      return require('./chains/solana.json');
    case Chain.APTOS:
      return require('./chains/aptos.json');
    case Chain.ARBITRUM:
      return require('./chains/arbitrum.json');
    case Chain.BSC_CHAIN:
      return require('./chains/smartchain.json');
    case Chain.COSMOS:
      return require('./chains/cosmos.json');
    case Chain.OSMOSIS:
      return require('./chains/osmosis.json');
    case Chain.POLYGON:
      return require('./chains/polygon.json');
    case Chain.BITCOIN:
      return require('./chains/bitcoin.json');
  }
}
