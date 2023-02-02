import {Colors} from '@degenwallet/styles';
import {DefaultTheme} from '@react-navigation/native';

export const enum Screen {
  Splash = 'SplashScreen',
  WELCOME = 'WelcomeScreen',
  WALLET = 'WalletScreen',
  COIN = 'CoinScreen',
  IMPORT_WALLET = 'ImportWalletScreen',
  RECEIVE = 'ReceiveScreen',
  BUY_CRYPTO = 'BuyCryptoScreen',
  SETTINGS = 'SettingsScreen',
  WALLETS = 'WalletsScreen',
  WALLET_DETAILS = 'WalletDetailsScreen',
  ABOUT_US = 'AboutUsScreen',
  SELECT_ASSET = 'SelectAssetScreen',
  SELECT_CHAIN = 'SelectChainScreen',
  CURRENCY = 'CurrencyScreen',
  COMMUNITY = 'CommunityScreen',
  WALLET_STACK = 'WalletStack',
  SETTINGS_STACK = 'SettingsStack',
  ONBOARDING_STACK = 'OnboardingStack',
}

export enum SelectAssetType {
  RECEIVE = 'RECEIVE',
  BUY = 'BUY',
}

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
