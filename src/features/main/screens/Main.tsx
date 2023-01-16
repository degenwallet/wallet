import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {HeaderOptions, RootStack, Screen, ScreenNavigator, SettingsStack, Theme} from '@degenwallet/navigation';
import {Image, Platform, TouchableOpacity} from 'react-native';
import {
  BuyCryptoScreen,
  CoinScreen,
  ImportWalletScreen,
  ReceiveScreen,
  SelectChainScreen,
  WalletScreen,
  WelcomeScreen,
} from '../../../core/screens';
import {useAppSelector} from '../../../core/hooks';
import {SettingsNavigator} from '../../settings/screens/SettingsStack';
import {SelectAssetNavigator} from '../../select_assets/screens/SelectAssetNavigator';

export const Main: () => React.ReactElement = () => {
  const state = useAppSelector(s => s);

  //console.log('AppWrap before state', state);

  const isSignedIn = state.wallets.wallets.length > 0;

  return (
    <NavigationContainer theme={Theme}>
      <RootStack.Navigator>
        <RootStack.Group>
          {!isSignedIn ? (
            <RootStack.Screen
              name={Screen.WELCOME}
              component={WelcomeScreen}
              options={{
                ...HeaderOptions,
                title: '',
              }}
            />
          ) : (
            <RootStack.Group>
              <RootStack.Screen
                name={Screen.WALLET}
                component={WalletScreen}
                options={({navigation}) => ({
                  ...HeaderOptions,
                  title: 'Wallet',
                  headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.navigate(ScreenNavigator.SETTINGS)}>
                      <Image
                        style={{height: 32, width: 32, marginRight: 10}}
                        source={require('../../../assets/images/more.png')}
                      />
                    </TouchableOpacity>
                  ),
                })}
              />
              <RootStack.Screen
                // @ts-ignore
                name={ScreenNavigator.SETTINGS}
                component={SettingsNavigator}
                options={({}) => ({
                  ...HeaderOptions,
                  headerShown: false,
                  presentation: 'modal',
                })}
              />
              <RootStack.Screen
                // @ts-ignore
                name={ScreenNavigator.SELECT_ASSET}
                component={SelectAssetNavigator}
                options={({}) => ({
                  ...HeaderOptions,
                  headerShown: false,
                  presentation: 'modal',
                })}
              />
              <RootStack.Screen
                name={Screen.RECEIVE}
                component={ReceiveScreen}
                options={({route, navigation}) => ({
                  ...HeaderOptions,
                  title: 'Receive ' + route.params.asset.chain,
                  presentation: 'modal',
                  headerLeft: () =>
                    Platform.OS === 'ios' ? (
                      <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image style={{height: 32, width: 32}} source={require('../../../assets/images/close.png')} />
                      </TouchableOpacity>
                    ) : undefined,
                })}
              />
              <RootStack.Screen
                name={Screen.BUY_CRYPTO}
                component={BuyCryptoScreen}
                options={({route, navigation}) => ({
                  ...HeaderOptions,
                  title: 'Buy ' + route.params.asset.chain,
                  presentation: 'modal',
                  headerLeft: () =>
                    Platform.OS === 'ios' ? (
                      <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image style={{height: 32, width: 32}} source={require('../../../assets/images/close.png')} />
                      </TouchableOpacity>
                    ) : undefined,
                })}
              />
            </RootStack.Group>
            // User is signed in
          )}
          <RootStack.Screen
            name={Screen.IMPORT_WALLET}
            component={ImportWalletScreen}
            navigationKey={String(state.wallets.wallets.length)}
            options={{
              ...HeaderOptions,
              title: 'Import Wallet',
            }}
          />
          <RootStack.Screen
            name={Screen.COIN}
            component={CoinScreen}
            options={({route}) => ({
              ...HeaderOptions,
              title: route.params.asset.chain + ': ' + route.params.asset.token_id,
            })}
          />
          <SettingsStack.Screen
            name={Screen.SELECT_CHAIN}
            component={SelectChainScreen}
            options={({}) => ({
              ...HeaderOptions,
              title: 'Select Chain',
            })}
          />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
