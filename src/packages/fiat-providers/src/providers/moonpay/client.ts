import {BuyQuote, IpAddressCheck} from './model';
import {ProviderError, QuoteRequest} from '../../model';
import {fetchJSON} from '@degenwallet/client';

// documentation: https://dashboard.moonpay.com/api_reference/client_side_api

export class Client {
  readonly api_key: string;
  readonly url = 'https://api.moonpay.com';
  readonly redirectURL = 'https://buy.moonpay.com';

  constructor(api_key: string) {
    this.api_key = api_key;
  }

  async getQuote(quoteRequest: QuoteRequest): Promise<BuyQuote> {
    const ipCheck = await this.getCheckIpAddress(quoteRequest.ipAddress);
    if (!ipCheck.isAllowed && !ipCheck.isBuyAllowed) {
      return Promise.reject(ProviderError.UNSUPPORTED_LOCATION);
    }

    const params = new URLSearchParams({
      apiKey: this.api_key,
      baseCurrencyCode: quoteRequest.fiatCurrency.toLowerCase(),
      baseCurrencyAmount: String(quoteRequest.amount),
      extraFeePercentage: String(1),
      areFeesIncluded: String(true),
    });
    const url = `${this.url}/v3/currencies/${quoteRequest.cryptoCurrency.toLowerCase()}/buy_quote?` + params;

    return fetchJSON<BuyQuote>(url);
  }

  getCheckIpAddress(ipAddress: string) {
    const params = new URLSearchParams({
      apiKey: this.api_key,
      ip: ipAddress,
    });
    return fetchJSON<IpAddressCheck>(`${this.url}/v3/ip_address/?` + params);
  }
}
