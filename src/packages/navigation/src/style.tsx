import {DefaultTheme} from '@react-navigation/native';
import {Colors} from '@degenwallet/styles';

export const HeaderOptions = {
  headerTitleStyle: {
    color: Colors.WHITE,
  },
  backgroundColor: Colors.BLACK,
  headerTintColor: Colors.WHITE,
  headerStyle: {
    backgroundColor: Colors.BLACK,
  },
};

export const Theme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.BLACK,
    background: '#000',
    card: Colors.BLACK,
    border: Colors.BLACK,
    notification: Colors.BLACK,
  },
};
