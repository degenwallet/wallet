import {BuyRate, Country, Data} from './model';
import {ProviderError, QuoteRequest} from '../../model';
import {fetchJSON} from '@degenwallet/client';

// documentation: https://widget.mercuryo.io/docs.html

export class Client {
  readonly widget_id: string;
  readonly url = 'https://api.mercuryo.io';
  readonly redirectURL = 'https://exchange.mercuryo.io';

  constructor(widget_id: string) {
    this.widget_id = widget_id;
  }

  async getQuote(quoteRequest: QuoteRequest): Promise<Data<BuyRate>> {
    const checkIp = await this.getCheckIpAddress(quoteRequest.ipAddress);
    if (checkIp.data.enabled === false) {
      return Promise.reject(ProviderError.UNSUPPORTED_LOCATION);
    }

    const params = new URLSearchParams({
      from: quoteRequest.fiatCurrency,
      to: quoteRequest.cryptoCurrency,
      amount: String(quoteRequest.amount),
      widget_id: this.widget_id,
    });
    return fetchJSON<Data<BuyRate>>(`${this.url}/v1.6/widget/buy/rate?` + params);
  }

  getCheckIpAddress(ipAddress: string) {
    const params = new URLSearchParams({
      ip: ipAddress,
    });
    return fetchJSON<Data<Country>>(`${this.url}/v1.6/public/data-by-ip?` + params);
  }
}
