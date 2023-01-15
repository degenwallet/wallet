import {ColorValue} from 'react-native';
import {Colors} from './colors';

export enum MagicButtonStyle {
  normal,
  light,
  destruction,
}

export enum MagicButtonSize {
  SMALL,
  NORMAL,
  LARGE,
}

export class SetStyle {
  underlayColor: ColorValue;
  backgroundColor: ColorValue;

  constructor(underlayColor: ColorValue, backgroundColor: ColorValue) {
    this.underlayColor = underlayColor;
    this.backgroundColor = backgroundColor;
  }
}

export namespace MagicButtonStyle {
  export function getStyle(style: MagicButtonStyle): SetStyle {
    switch (style) {
      case MagicButtonStyle.normal:
        return new SetStyle(Colors.LIGHT_BLACK, Colors.BLUE);
      case MagicButtonStyle.light:
        return new SetStyle(Colors.BLACK, Colors.LIGHT_BLACK);
      case MagicButtonStyle.destruction:
        return new SetStyle(Colors.RED_DARK, Colors.RED);
    }
  }
}
