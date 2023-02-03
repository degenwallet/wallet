import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SettingsScreen} from '../screens/settings/SettingsScreen';
import {Image, Platform, TouchableOpacity} from 'react-native';
import {WalletsScreen} from '../features/wallets/screens/WalletsScreen';
import {AboutUsScreen} from '../screens/settings/AboutUsScreen';
import {CurrencyScreen} from '../screens/settings/CurrencyScreen';
import {CommunityScreen} from '../screens/settings/CommunityScreen';
import {WalletDetailsScreen} from '../features/wallets/screens/WalletDetailsScreen';
import * as React from 'react';
import {Chain} from '@degenwallet/chain-types';
import {Wallet} from '@degenwallet/types';
import {HeaderOptions, Screen} from './index';
import {OnboardingStack} from './OnboardingStack';

export type SettingsScreenParamList = {
  SettingsScreen: undefined;
  WalletsScreen: undefined;
  AboutUsScreen: undefined;
  CurrencyScreen: undefined;
  CommunityScreen: undefined;
  SelectChainScreen: {chain: Chain; selectChain: (chain: Chain) => void};
  WalletDetailsScreen: {wallet: Wallet};
  OnboardingStack: undefined;
};

const Stack = createNativeStackNavigator<SettingsScreenParamList>();

export const SettingsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Screen.SETTINGS}
        component={SettingsScreen}
        options={({navigation}) => ({
          ...HeaderOptions,
          title: 'Settings',
          headerLeft: () =>
            Platform.OS === 'ios' ? (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image style={{height: 32, width: 32}} source={require('../assets/images/close.png')} />
              </TouchableOpacity>
            ) : undefined,
        })}
      />
      <Stack.Screen
        name={Screen.WALLETS}
        component={WalletsScreen}
        options={({navigation}) => ({
          ...HeaderOptions,
          title: 'Wallets',
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate(Screen.ONBOARDING_STACK)}>
              <Image style={{height: 32, width: 32}} source={require('../assets/images/add.png')} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name={Screen.ABOUT_US}
        component={AboutUsScreen}
        options={({}) => ({
          ...HeaderOptions,
          title: 'About Us',
        })}
      />
      <Stack.Screen
        name={Screen.CURRENCY}
        component={CurrencyScreen}
        options={({}) => ({
          ...HeaderOptions,
          title: 'Currency',
        })}
      />
      <Stack.Screen
        name={Screen.COMMUNITY}
        component={CommunityScreen}
        options={({}) => ({
          ...HeaderOptions,
          title: 'Community & Support',
        })}
      />
      <Stack.Screen
        name={Screen.WALLET_DETAILS}
        component={WalletDetailsScreen}
        options={({}) => ({
          ...HeaderOptions,
          title: 'Wallet Info',
        })}
      />
      <Stack.Screen name={Screen.ONBOARDING_STACK} component={OnboardingStack} />
    </Stack.Navigator>
  );
};
