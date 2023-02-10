import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Asset} from '@degenwallet/chain-types';
import {WalletScreen} from '../screens/wallet/WalletScreen';
import {ReceiveScreen} from '../screens/wallet/ReceiveScreen';
import {Image, Platform, TouchableOpacity} from 'react-native';
import * as React from 'react';
import {BuyCryptoScreen} from '../screens/wallet/BuyCryptoScreen';
import {SelectAssetScreen} from '../screens/wallet/SelectAssetScreen';
import {HeaderOptions, Screen, SelectAssetType} from './index';

export type WalletStackParamList = {
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
};

const Stack = createNativeStackNavigator<WalletStackParamList>();

export const WalletStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Screen.WALLET}
        component={WalletScreen}
        options={({navigation}) => ({
          ...HeaderOptions,
          title: 'Wallet',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate(Screen.SETTINGS_STACK)}>
              <Image style={{height: 32, width: 32, marginRight: 10}} source={require('../assets/images/more.png')} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name={Screen.RECEIVE}
        component={ReceiveScreen}
        options={({route, navigation}) => ({
          ...HeaderOptions,
          title: 'Receive ' + route.params.asset.chain,
          presentation: 'modal',
          headerLeft: () =>
            Platform.OS === 'ios' ? (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image style={{height: 32, width: 32}} source={require('../assets/images/close.png')} />
              </TouchableOpacity>
            ) : undefined,
        })}
      />
      <Stack.Screen
        name={Screen.BUY_CRYPTO}
        component={BuyCryptoScreen}
        options={({route, navigation}) => ({
          ...HeaderOptions,
          title: 'Buy ' + route.params.asset.chain,
          presentation: 'modal',
          headerLeft: () =>
            Platform.OS === 'ios' ? (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image style={{height: 32, width: 32}} source={require('../assets/images/close.png')} />
              </TouchableOpacity>
            ) : undefined,
        })}
      />
      <Stack.Screen
        name={Screen.SELECT_ASSET}
        component={SelectAssetScreen}
        options={({navigation, route}) => ({
          ...HeaderOptions,
          title: selectAssetScreenTitle(route.params.type),
          presentation: 'modal',
          headerLeft: () =>
            Platform.OS === 'ios' ? (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image style={{height: 32, width: 32}} source={require('../assets/images/close.png')} />
              </TouchableOpacity>
            ) : undefined,
        })}
      />
    </Stack.Navigator>
  );
};

const selectAssetScreenTitle = (type: SelectAssetType) => {
  switch (type) {
    case SelectAssetType.BUY:
      return 'Buy';
    case SelectAssetType.RECEIVE:
      return 'Receive';
  }
};
