import {Asset, Chain} from '@degenwallet/chain-types';

export class TWAsset {
  coin: number;
  token_id: string;

  constructor(coin: number, token_id: string) {
    this.coin = coin;
    this.token_id = token_id;
  }

  static toTWAsset(asset: Asset): TWAsset {
    const coin = TWAsset.coinFromChain(asset.chain);
    return new TWAsset(coin, asset.token_id);
  }

  static toAsset(asset: TWAsset): Asset {
    const chain = TWAsset.chainFromCoin(asset.coin);
    return new Asset(chain, asset.token_id);
  }

  static fromId(id: string): TWAsset {
    const parts = id.split('_');
    //TODO
    if (parts.length === 0) {
      // crash
    }
    const coin = parseFloat(parts[0].substring(1));
    if (parts.length === 1) {
      return new TWAsset(coin, '');
    }
    const token_id = parts[1].substring(1);
    return new TWAsset(coin, token_id);
  }

  getId() {
    if (this.token_id.length > 0) {
      return 'c' + String(this.coin) + '_t' + this.token_id;
    }
    return 'c' + String(this.coin);
  }

  static chainFromCoin(coin: number): Chain {
    switch (coin) {
      case 60:
        return Chain.ETHEREUM;
      case 637:
        return Chain.APTOS;
      case 714:
        return Chain.BNB_CHAIN;
      case 20000714:
        return Chain.BSC_CHAIN;
      case 966:
        return Chain.POLYGON;
      case 501:
        return Chain.SOLANA;
      case 118:
        return Chain.COSMOS;
      case 10000118:
        return Chain.OSMOSIS;
      case 10042221:
        return Chain.ARBITRUM;
      default:
        throw new Error();
    }
  }

  static coinFromChain(chain: Chain): number {
    switch (chain) {
      case Chain.BITCOIN:
        return 0;
      case Chain.ETHEREUM:
        return 60;
      case Chain.APTOS:
        return 637;
      case Chain.BNB_CHAIN:
        return 714;
      case Chain.BSC_CHAIN:
        return 20000714;
      case Chain.POLYGON:
        return 966;
      case Chain.SOLANA:
        return 501;
      case Chain.COSMOS:
        return 118;
      case Chain.OSMOSIS:
        return 10000118;
      case Chain.ARBITRUM:
        return 10042221;
    }
  }
}
