import FiatCryptoAssociations from './fiat_crypto_associations.json';
import {ProviderName} from './fiat-provider';
import {Asset} from '@degenwallet/chain-types';

const fiatCryptoAssociations: {[key: string]: MapperItem[]} = FiatCryptoAssociations;

export class MapperItem {
  provider: string;
  symbol: string;
}

export class Mapper {
  static getSymbol(asset: Asset, provider: ProviderName): string | undefined {
    const assetList = fiatCryptoAssociations[asset.getId()];
    return assetList?.find(item => item.provider === provider)?.symbol;
  }

  static getAssetsList(): string[] {
    return Object.keys(fiatCryptoAssociations);
  }
}
