import {Asset} from '@degenwallet/chain-types';

export class Prices {
  currency: string;
  prices: Price[];

  constructor(currency: string, prices: Price[]) {
    this.currency = currency;
    this.prices = prices;
  }
}

export class Price {
  asset: Asset;
  change_24h: number;
  price: number;

  constructor(asset: Asset, change_24h: number, price: number) {
    this.asset = asset;
    this.change_24h = change_24h;
    this.price = price;
  }
}
