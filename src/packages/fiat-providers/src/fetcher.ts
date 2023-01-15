import {QuoteResult} from './model';
import {FiatProvider} from './fiat-provider';
import {Asset} from '@degenwallet/chain-types';
import {Mapper} from './mapper';
import {NetworkInfo} from 'react-native-network-info';

export class QuoteFetcher {
  providers: Array<FiatProvider>;

  constructor(providers: Array<FiatProvider>) {
    this.providers = providers;
  }

  async getQuote(fiatCurrency: string, asset: Asset, amount: number, address: string): Promise<QuoteResult[]> {
    const ipAddress = await this.getIPAddress();
    // TODO: Add is eligible method to check if asset and Ip address valid, then request a quote.
    // Currently doing check inside GetQuote.

    return Promise.all(
      this.providers
        .flatMap(provider => {
          const cryptoCurrency = Mapper.getSymbol(asset, provider.name);
          if (cryptoCurrency !== undefined) {
            return provider
              .getQuote({
                cryptoCurrency: cryptoCurrency,
                fiatCurrency: fiatCurrency,
                amount: amount,
                address: address,
                ipAddress: ipAddress,
              })
              .catch(err => {
                console.log(`${provider.name}, symbol: ${cryptoCurrency} error: `, err);
              });
          }
        })
        .filter((quote): quote is Promise<QuoteResult> => Boolean(quote)),
    )
      .then(quotes => {
        return quotes
          .filter(quote => quote !== undefined)
          .filter(quote => quote.quote.cryptoAmount > 0)
          .sort((q1, q2) => q1.quote.cryptoAmount - q2.quote.cryptoAmount);
      })
      .then(quotes => {
        if (quotes.length === 0) {
          return Promise.reject('No quotes available');
        }
        return quotes;
      });
  }

  async getIPAddress(): Promise<string> {
    if (__DEV__) {
      // In debug mode we can return Brazil IP address
      return Promise.resolve('1.178.47.255');
    }
    const ip = await NetworkInfo.getIPV4Address();
    if (ip === null) {
      return Promise.reject('IP address unknown');
    }
    return Promise.resolve(ip);
  }
}
