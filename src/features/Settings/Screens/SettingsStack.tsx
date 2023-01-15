import * as React from 'react';
import {HeaderOptions, RootStack, Screen, SettingsStack} from '@magicwallet/navigation';
import {
  AboutUsScreen,
  CommunityScreen,
  CurrencyScreen,
  ImportWalletScreen,
  SelectChainScreen,
  SettingsScreen,
  WalletDetailsScreen,
  WalletsScreen,
} from '../../../core/screens';
import {Image, Platform, TouchableOpacity} from 'react-native';

export const SettingsNavigator: () => React.ReactElement = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name={Screen.SETTINGS}
        component={SettingsScreen}
        options={({navigation}) => ({
          ...HeaderOptions,
          title: 'Settings',
          headerLeft: () =>
            Platform.OS === 'ios' ? (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image style={{height: 32, width: 32}} source={require('../../../assets/images/close.png')} />
              </TouchableOpacity>
            ) : undefined,
        })}
      />
      <SettingsStack.Screen
        name={Screen.WALLETS}
        component={WalletsScreen}
        options={({navigation}) => ({
          ...HeaderOptions,
          title: 'Wallets',
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate(Screen.IMPORT_WALLET)}>
              <Image style={{height: 32, width: 32}} source={require('../../../assets/images/add.png')} />
            </TouchableOpacity>
          ),
        })}
      />
      <SettingsStack.Screen
        name={Screen.ABOUT_US}
        component={AboutUsScreen}
        options={({}) => ({
          ...HeaderOptions,
          title: 'About Us',
        })}
      />
      <RootStack.Screen
        name={Screen.IMPORT_WALLET}
        component={ImportWalletScreen}
        options={{
          ...HeaderOptions,
          title: 'Import Wallet',
        }}
      />
      <SettingsStack.Screen
        name={Screen.CURRENCY}
        component={CurrencyScreen}
        options={({}) => ({
          ...HeaderOptions,
          title: 'Currency',
        })}
      />
      <SettingsStack.Screen
        name={Screen.COMMUNITY}
        component={CommunityScreen}
        options={({}) => ({
          ...HeaderOptions,
          title: 'Community & Support',
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
      <SettingsStack.Screen
        name={Screen.WALLET_DETAILS}
        component={WalletDetailsScreen}
        options={({}) => ({
          ...HeaderOptions,
          title: 'Wallet Info',
        })}
      />
    </SettingsStack.Navigator>
  );
};
