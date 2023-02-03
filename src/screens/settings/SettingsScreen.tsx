import React from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {Screen} from '../../navigation';
import {Colors, DefaultStyles} from '@degenwallet/styles';
import {FormListItem} from '@degenwallet/views';
import {useAppSelector} from '@degenwallet/store';
import {FormListImageType} from '@degenwallet/views/src/form/FormListItem';
import {RouteProp} from '@react-navigation/core';
import {SettingsScreenParamList} from '../../navigation/SettingsStack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {GetCurrentWallet} from '../../core/selectors/wallets-selectors';

export type Props = {
  route: RouteProp<SettingsScreenParamList, Screen.SETTINGS>;
  navigation: NativeStackNavigationProp<SettingsScreenParamList, Screen.SETTINGS>;
};

export const SettingsScreen: React.FC<Props> = ({navigation}) => {
  const state = useAppSelector(s => s);
  //const currency = GetCurrencySelector(state);
  const currentWallet = GetCurrentWallet(state);

  const items: {
    title: string;
    subtitle?: string;
    onPress: () => void;
  }[] = [
    {
      title: 'Wallets',
      onPress: () => {
        navigation.navigate(Screen.WALLETS);
      },
      subtitle: currentWallet.name,
    },
    // {
    //   title: 'Currency',
    //   onPress: () => {
    //     navigation.navigate(Screen.CURRENCY);
    //   },
    //   subtitle: currency,
    // },
    {
      title: 'About Us',
      onPress: () => {
        navigation.navigate(Screen.ABOUT_US);
      },
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={DefaultStyles.list}
        data={items}
        renderItem={({item}) => (
          <FormListItem
            title={item.title}
            subtitle={item.subtitle}
            onPress={item.onPress}
            rightImage={FormListImageType.chevron}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
  },
});
