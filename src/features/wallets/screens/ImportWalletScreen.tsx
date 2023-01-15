import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import {Props, Screen} from '@magicwallet/navigation';
import {Colors, MagicButtonStyle} from '@magicwallet/styles';
import {MagicButton} from '@magicwallet/views';
import {walletsAddWallet} from '../../../core/reducers/wallets';
import {useAppDispatch, useAppSelector} from '../../../core/hooks';
import {Asset, Chain} from '@magicwallet/chain-types';
import {ChainView} from '../ChainView';
import {GetAssetResource} from '../../../assets/asset-resource';
import {walletName} from '../../../core/selectors/wallets-selectors';

export const ImportWalletScreen: React.FC<Props<Screen.IMPORT_WALLET>> = ({navigation}) => {
  const [name, onChangeName] = React.useState('');
  const [value, onChangeText] = React.useState('');
  const [selectedChain, onChangeSelectedChain] = React.useState(Chain.BNB_CHAIN);

  const dispatch = useAppDispatch();
  const state = useAppSelector(s => s.wallets.wallets);

  useEffect(() => {
    const walletsCount = state.filter(wallet => wallet.accounts[0].chain === selectedChain).length;
    const assetResource = GetAssetResource(new Asset(selectedChain))!;
    onChangeName(walletName(assetResource, walletsCount));
  }, [selectedChain]);

  return (
    <SafeAreaView style={styles.container}>
      <ChainView
        chain={selectedChain}
        onPress={() => {
          navigation.navigate(Screen.SELECT_CHAIN, {
            chain: selectedChain,
            selectChain: chain => onChangeSelectedChain(chain),
          });
        }}
      />
      <TextInput
        editable
        style={styles.input_name}
        onChangeText={onChangeName}
        value={name}
        placeholder="Name"
        keyboardType="default"
        enablesReturnKeyAutomatically={true}
        placeholderTextColor={Colors.DARK_GRAY}
      />
      <TextInput
        editable
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        placeholder="Enter an address"
        keyboardType="default"
        placeholderTextColor={Colors.DARK_GRAY}
      />
      <View style={styles.footer}>
        <MagicButton
          style={MagicButtonStyle.normal}
          title={'Import Wallet'}
          onPress={() => {
            dispatch(walletsAddWallet(name, selectedChain, value)).then(_ => {
              navigation.navigate(Screen.WALLET);
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  input_name: {
    color: Colors.WHITE,
    height: 44,
    margin: 12,
    borderWidth: 0.5,
    borderColor: Colors.LIGHT_BLACK,
    padding: 12,
    borderRadius: 6,
  },
  input: {
    color: Colors.WHITE,
    height: 80,
    margin: 12,
    borderWidth: 0.5,
    borderColor: Colors.LIGHT_BLACK,
    padding: 12,
    borderRadius: 6,
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
});
