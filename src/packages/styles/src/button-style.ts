import {ColorValue} from 'react-native';
import {Colors} from './colors';

export enum DegenButtonStyle {
  normal,
  light,
  destruction,
}

export enum DegenButtonSize {
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

export namespace DegenButtonStyle {
  export function getStyle(style: DegenButtonStyle): SetStyle {
    switch (style) {
      case DegenButtonStyle.normal:
        return new SetStyle(Colors.LIGHT_BLACK, Colors.BLUE);
      case DegenButtonStyle.light:
        return new SetStyle(Colors.BLACK, Colors.LIGHT_BLACK);
      case DegenButtonStyle.destruction:
        return new SetStyle(Colors.RED_DARK, Colors.RED);
    }
  }
}
