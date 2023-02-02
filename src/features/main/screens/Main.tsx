import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppState, useAppSelector} from '@degenwallet/store';
import {OnboardingStack} from '../../../navigation/OnboardingStack';
import {WalletStack} from '../../../navigation/WalletStack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SettingsStack} from '../../../navigation/SettingsStack';
import {Screen, Theme} from '../../../navigation';
import {shallowEqual} from 'react-redux';
import {createSelector} from '@reduxjs/toolkit';

export type AppStackParamList = {
  OnboardingStack: undefined;
  SettingsStack: undefined;
  WalletStack: undefined;
};

const RootStack = createNativeStackNavigator<AppStackParamList>();

export const onboardSelector = createSelector(
  (state: AppState) => state.wallets,
  wallets => wallets,
);

export const Main = (): JSX.Element => {
  // const wallets = useAppSelector(state => state.wallets.wallets, shallowEqual);
  const state = useAppSelector(state => state);
  const wallets = onboardSelector(state);
  const isOnboarded = wallets.wallets.length > 0;
  console.log('AppWrap before state', state);
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
