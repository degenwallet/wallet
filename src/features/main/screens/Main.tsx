import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useAppSelector} from '@degenwallet/store';
import {OnboardingStack} from '../../../navigation/OnboardingStack';
import {WalletStack} from '../../../navigation/WalletStack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SettingsStack} from '../../../navigation/SettingsStack';
import {Screen, Theme} from '../../../navigation';

export type AppStackParamList = {
  OnboardingStack: undefined;
  SettingsStack: undefined;
  WalletStack: undefined;
};

const RootStack = createNativeStackNavigator<AppStackParamList>();
export const Main = (): JSX.Element => {
  const isOnboarded = useAppSelector(state => state.wallets.wallets.length > 0);
  return (
    <NavigationContainer theme={Theme}>
      <RootStack.Navigator
        initialRouteName={isOnboarded ? Screen.WALLET_STACK : Screen.ONBOARDING_STACK}
        screenOptions={{headerShown: false}}>
        {!isOnboarded && <RootStack.Screen name={Screen.ONBOARDING_STACK} component={OnboardingStack} />}
        {isOnboarded && (
          <>
            <RootStack.Screen name={Screen.WALLET_STACK} component={WalletStack} />
            <RootStack.Screen name={Screen.SETTINGS_STACK} component={SettingsStack} />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
