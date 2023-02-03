import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {WelcomeScreen} from '../screens/onboard/WelcomeScreen';
import {ImportWalletScreen} from '../features/wallets/screens/ImportWalletScreen';
import * as React from 'react';
import {Chain} from '@degenwallet/chain-types';
import {SelectChainScreen} from '../features/wallets/screens/SelectChainScreen';
import {HeaderOptions, Screen} from './index';

export type OnboardingStackParamList = {
  WelcomeScreen: undefined;
  ImportWalletScreen: undefined;
  SelectChainScreen: {chain: Chain; selectChain: (chain: Chain) => void};
};

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export const OnboardingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={Screen.WELCOME} component={WelcomeScreen} />
      <Stack.Screen name={Screen.IMPORT_WALLET} component={ImportWalletScreen} />
      <Stack.Screen
        name={Screen.SELECT_CHAIN}
        component={SelectChainScreen}
        options={({}) => ({
          ...HeaderOptions,
          title: 'Select Chain',
          presentation: 'modal',
        })}
      />
    </Stack.Navigator>
  );
};
