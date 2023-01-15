import {FiatProvider, ProviderName} from '../../fiat-provider';
import {Client} from './client';
import {QuoteData, QuoteRequest, QuoteResult} from '../../model';
import {Quote} from './model';

export class RampProvider implements FiatProvider {
  client: Client;

  constructor(api_key: string) {
    this.client = new Client(api_key);
  }

  name = ProviderName.RAMP;

  getQuote(quoteRequest: QuoteRequest): Promise<QuoteResult> {
    return this.client.getQuote(quoteRequest).then(quote => {
      return new QuoteResult({
        provider: this.name,
        quote: this.createQuote(quote),
        redirectURL: this.createRedirectURL(quoteRequest),
      });
    });
  }

  createQuote(quote: Quote): QuoteData {
    return new QuoteData(
      quote.CARD_PAYMENT.fiatCurrency,
      quote.CARD_PAYMENT.cryptoAmount,
      quote.CARD_PAYMENT.fiatValue,
      quote.CARD_PAYMENT.fiatValue,
      Number(quote.asset.price.USD),
      0,
    );
  }

  createRedirectURL(quoteRequest: QuoteRequest): string {
    const params = new URLSearchParams({
      swapAsset: quoteRequest.cryptoCurrency,
      defaultAsset: quoteRequest.cryptoCurrency,
      fiatCurrency: quoteRequest.fiatCurrency,
      fiatValue: String(quoteRequest.amount),
      hostAppName: 'Degen Wallet',
      hostApiKey: this.client.api_key,
      userAddress: quoteRequest.address,
    }).toString();

    return `${this.client.redirectURL}/?` + params.toString();
  }
}
