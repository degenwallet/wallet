import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/core';
import {Asset, Chain} from '@magicwallet/chain-types';
import {Wallet} from '@magicwallet/types';

export {Screen} from './screens';
export {ScreenNavigator} from './navigator';
export {Theme, HeaderOptions} from './style';

export const RootStack = createNativeStackNavigator<RootStackParamList>();
export const SettingsStack = createNativeStackNavigator<RootStackParamList>();
export const SelectAssetStack = createNativeStackNavigator<RootStackParamList>();

export type ScreenNavigationProp<T extends keyof RootStackParamList> = NativeStackNavigationProp<RootStackParamList, T>;

export type ScreenRouteProp<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>;

export type Props<T extends keyof RootStackParamList> = {
  route: ScreenRouteProp<T>;
  navigation: ScreenNavigationProp<T>;
};

export type RootStackParamList = {
  WelcomeScreen: undefined;
  ImportWalletScreen: undefined;
  CoinScreen: {
    asset: Asset;
  };
  WalletScreen: undefined;
  ReceiveScreen: {
    asset: Asset;
  };
  BuyCryptoScreen: {
    asset: Asset;
  };
  SelectAssetScreen: {
    type: SelectAssetType;
  };
  // Settings
  SettingsScreen: undefined;
  WalletsScreen: undefined;
  AboutUsScreen: undefined;
  CurrencyScreen: undefined;
  CommunityScreen: undefined;
  SelectChainScreen: {chain: Chain; selectChain: (chain: Chain) => void};
  WalletDetailsScreen: {wallet: Wallet};
};

export enum SelectAssetType {
  RECEIVE = 'RECEIVE',
  BUY = 'BUY',
}
