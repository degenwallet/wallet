import React, {useEffect} from 'react';
import {Alert, SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import {Props, Screen} from '@degenwallet/navigation';
import {Colors, DegenButtonStyle} from '@degenwallet/styles';
import {DegenButton} from '@degenwallet/views';
import {walletsAddWallet} from '../../../core/reducers/wallets';
import {useAppDispatch, useAppSelector} from '../../../core/hooks';
import {Asset, Chain} from '@degenwallet/chain-types';
import {ChainView} from '../ChainView';
import {GetAssetResource} from '../../../assets/asset-resource';
import {walletName} from '../../../core/selectors/wallets-selectors';
import {AnyAddress} from '@degenwallet/react-native-wallet-core/lib/typescript/address';
import {TWAsset} from '@degenwallet/market-provider/src/providers/trustwallet/TWAsset';

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

  const handleSubmit = async (name: string, chain: Chain, address: string) => {
    const coin = TWAsset.coinFromChain(chain);

    //TODO: Add form validation UI, this is a temp hack to test Wallet Core.
    const isValid = await AnyAddress.validateAddress(address, coin);
    if (!isValid) {
      Alert.alert('Invalid Address', '', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]);
      return;
    }

    dispatch(walletsAddWallet(name, chain, address)).then(_ => {
      navigation.navigate(Screen.WALLET);
    });
  };

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
        <DegenButton
          style={DegenButtonStyle.normal}
          title={'Import Wallet'}
          onPress={() => {
            handleSubmit(name, selectedChain, value).then(r => r);
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
