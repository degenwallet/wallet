import React from 'react';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import {Colors, DegenButtonStyle, Spacing} from '@degenwallet/styles';
import {DegenButton} from '@degenwallet/views';
import {useAppDispatch, useAppSelector} from '@degenwallet/store';

import {getWalletSelector} from '../../../core/selectors/wallets-selectors';
import {Wallet} from '@degenwallet/types';
import {walletsRemoveWallet, walletsRenameWallet} from '@degenwallet/redux';
import {RouteProp} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SettingsScreenParamList} from '../../../navigation/SettingsStack';
import {Screen} from '../../../navigation';

export type Props = {
  route: RouteProp<SettingsScreenParamList, Screen.WALLET_DETAILS>;
  navigation: NativeStackNavigationProp<SettingsScreenParamList, Screen.WALLET_DETAILS>;
};

export const WalletDetailsScreen: React.FC<Props> = ({navigation, route}) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(s => s);
  const wallet = getWalletSelector(state, route.params.wallet.id);
  const [name, onChangeName] = React.useState(wallet.name);

  const handleSubmit = (text: string) => {
    onChangeName(text);
    console.log('Name changed to: ', text);
    return dispatch(walletsRenameWallet(wallet.id, name));
  };

  const handleDelete = (w: Wallet) => {
    //Is there a better way to handle wallet deletion?
    navigation.goBack();
    navigation.goBack();
    navigation.pop();
    dispatch(walletsRemoveWallet(w.id)).then(r => r);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        editable={false}
        style={styles.input_name}
        onChangeText={handleSubmit}
        value={name}
        placeholder="Name"
        keyboardType="default"
        enablesReturnKeyAutomatically={true}
        placeholderTextColor={Colors.DARK_GRAY}
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: Colors.BLACK,
          padding: Spacing.screen.padding,
        }}>
        <DegenButton style={DegenButtonStyle.destruction} title={'Delete Wallet'} onPress={_ => handleDelete(wallet)} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
  },
  //TODO: Same style as on import wallet, how do you make this shared between both screens?
  input_name: {
    color: Colors.WHITE,
    height: 44,
    margin: 12,
    borderWidth: 0.5,
    borderColor: Colors.LIGHT_BLACK,
    padding: Spacing.screen.padding,
    borderRadius: 6,
  },
});
