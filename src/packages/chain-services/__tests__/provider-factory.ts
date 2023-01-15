import {ChainList} from '@degenwallet/chain-types';
import {ProviderFactory} from '../src/provider-factory';

it('map return assets list correctly', () => {
  const providers = ProviderFactory.setup();

  ChainList.forEach(chain => {
    expect(providers.get(chain)).toBeTruthy();
  });
});
