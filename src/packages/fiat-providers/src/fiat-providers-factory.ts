import {MERCURYO_WIDGET_ID, MOONPAY_API_KEY, RAMP_API_KEY, TRANSAK_API_KEY} from '@degenwallet/config';
import {FiatProvider} from './fiat-provider';
import {TransakProvider} from './providers/transak';
import {RampProvider} from './providers/ramp';
import {MoonPayProvider} from './providers/moonpay';
import {MercuryoProvider} from './providers/mercuryo';

export class FiatProvidersFactory {
  static new(): Array<FiatProvider> {
    return [
      new MercuryoProvider(MERCURYO_WIDGET_ID),
      new MoonPayProvider(MOONPAY_API_KEY),
      new RampProvider(RAMP_API_KEY),
      new TransakProvider(TRANSAK_API_KEY),
    ];
  }
}
