import {Chain} from '@degenwallet/chain-types';

export class Account {
  chain: Chain;
  address: string;

  constructor(chain: Chain, address: string) {
    this.chain = chain;
    this.address = address;
  }
}
