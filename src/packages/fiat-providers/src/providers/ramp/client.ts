import {GetQuote, Quote} from './model';
import {ProviderError, QuoteRequest} from '../../model';
import {Assets} from '../transak/model';
import {fetchJSON} from '@degenwallet/client';

// documentation: https://docs.ramp.network/rest-api-v3-reference

export class Client {
  readonly api_key: string;
  readonly url = 'https://api-instant.ramp.network';
  readonly redirectURL = 'https://buy.ramp.network';

  constructor(api_key: string) {
    this.api_key = api_key;
  }

  async getQuote(quoteRequest: QuoteRequest): Promise<Quote> {
    const assets = await this.getAssets(quoteRequest.ipAddress);
    if (assets.assets.find(el => el.symbol === quoteRequest.cryptoCurrency) === undefined) {
      return Promise.reject(ProviderError.UNSUPPORTED_LOCATION);
    }

    const params: GetQuote = {
      cryptoAssetSymbol: quoteRequest.cryptoCurrency,
      fiatCurrency: quoteRequest.fiatCurrency,
      fiatValue: quoteRequest.amount,
    };
    const url = `${this.url}/api/host-api/v3/onramp/quote/all?hostApiKey=${this.api_key}`;

    return fetchJSON<Quote>(url, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getAssets(ipAddress: string) {
    const params = new URLSearchParams({
      omitHidden: String('true'),
      onlyEnabled: String('true'),
      userIp: ipAddress,
    });
    const url = `${this.url}/api/host-api/assets?` + params;
    return fetchJSON<Assets>(url);
  }
}
