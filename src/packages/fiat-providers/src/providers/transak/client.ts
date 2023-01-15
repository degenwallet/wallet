import {Quote, quoteSymbolSplit, Response} from './model';
import {QuoteRequest} from '../../model';
import {fetchJSON} from '@degenwallet/client';

// documentation: https://docs.transak.com/

export class Client {
  readonly api_key: string;
  readonly url = 'https://api.transak.com';
  readonly redirectURL = 'https://global.transak.com';

  constructor(api_key: string) {
    this.api_key = api_key;
  }

  getQuote(quoteRequest: QuoteRequest): Promise<Response<Quote>> {
    const {symbol, network} = quoteSymbolSplit(quoteRequest.cryptoCurrency);
    const params = new URLSearchParams({
      ipAddress: quoteRequest.ipAddress,
      cryptoCurrency: symbol,
      fiatCurrency: quoteRequest.fiatCurrency,
      fiatAmount: String(quoteRequest.amount),
      network: network,
      isBuyOrSell: 'buy',
    });
    const url = `${this.url}/api/v2/currencies/price?`;
    return fetchJSON<Response<Quote>>(url + params);
  }
}
