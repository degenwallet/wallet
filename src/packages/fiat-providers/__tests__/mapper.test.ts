import {Mapper} from '../src/mapper';
import {ProviderName} from '../src/fiat-provider';
import {Asset, Chain} from '@degenwallet/chain-types';

it('map elements correctly', () => {
  expect(Mapper.getSymbol(new Asset(Chain.BNB_CHAIN, ''), ProviderName.MOONPAY)).toBe('bnb');
  expect(Mapper.getSymbol(new Asset(Chain.BSC_CHAIN, ''), ProviderName.MERCURYO)).toBe('BNB');
  expect(Mapper.getSymbol(new Asset(Chain.BITCOIN, ''), ProviderName.MERCURYO)).toBe('BTC');
});

it('map return assets list correctly', () => {
  expect(Mapper.getAssetsList()[0]).toBe('bitcoin');
  expect(Mapper.getAssetsList()).toBeTruthy();
});
