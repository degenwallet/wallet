import {Asset} from './asset';
import {Price} from '@degenwallet/types';

export class AssetBalance {
  asset: Asset;
  available: BigInt;

  constructor(asset: Asset, available: BigInt) {
    this.asset = asset;
    this.available = available;
  }

  total(): string {
    // TODO: Combine all values into one
    return this.available.toString(10);
  }
}
export class AssetBalanceFiat {
  asset: Asset;
  available: BigInt;
  fiatValue: number;
  price?: Price;

  constructor(asset: Asset, available: BigInt, fiatValue: number, price?: Price) {
    this.asset = asset;
    this.available = available;
    this.fiatValue = fiatValue;
    this.price = price;
  }

  total(): string {
    // TODO: Combine all values into one
    return this.available.toString(10);
  }
}
