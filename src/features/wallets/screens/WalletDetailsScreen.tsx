import React from 'react';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import {Props, Screen} from '@magicwallet/navigation';
import {Colors, MagicButtonStyle, Spacing} from '@magicwallet/styles';
import {MagicButton} from '@magicwallet/views';
import {walletsDeleteWallet, walletsRenameWallet} from '../../../core/reducers/wallets';
import {useAppDispatch, useAppSelector} from '../../../core/hooks';
import {getWalletSelector} from '../../../core/selectors/wallets-selectors';
import {Wallet} from '@magicwallet/types';

export const WalletDetailsScreen: React.FC<Props<Screen.WALLET_DETAILS>> = ({navigation, route}) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(s => s);
  const wallet = getWalletSelector(state, route.params.wallet.id);
  const [name, onChangeName] = React.useState(wallet.name);

  const handleSubmit = (text: string) => {
    onChangeName(text);
    console.log('Name changed to: ', text);
    return dispatch(walletsRenameWallet(wallet, name));
  };

  const handleDelete = (w: Wallet) => {
    //Is there a better way to handle wallet deletion?
    navigation.goBack();
    navigation.goBack();
    navigation.pop();
    dispatch(walletsDeleteWallet(w.id)).then(r => r);
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
        <MagicButton style={MagicButtonStyle.destruction} title={'Delete Wallet'} onPress={_ => handleDelete(wallet)} />
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
