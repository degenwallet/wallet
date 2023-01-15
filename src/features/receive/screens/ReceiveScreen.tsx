import React, {useEffect} from 'react';
import {SafeAreaView, Share, StyleSheet, Text, View} from 'react-native';
import {Props, Screen} from '@magicwallet/navigation';
import {Colors, MagicButtonStyle} from '@magicwallet/styles';
import QRCode from 'react-native-qrcode-svg';
import {MagicButton, Touchable} from '@magicwallet/core-components';
import Clipboard from '@react-native-clipboard/clipboard';
import {useAppSelector} from '../../../core/hooks';
import {GetAssetSelector, GetAssetTitle} from '../../../core/selectors/assets-selectors';
import {GetCurrentWallet, GetCurrentWalletAccount} from '../../../core/selectors/wallets-selectors';
import {AssetTypeList} from '@magicwallet/chain-types';

export const ReceiveScreen: React.FC<Props<Screen.RECEIVE>> = ({navigation, route}) => {
  const state = useAppSelector(s => s);
  const currentWallet = GetCurrentWallet(state);
  const currentAccount = GetCurrentWalletAccount(state, {
    wallet: currentWallet,
    chain: route.params.asset.chain,
  });
  const asset = GetAssetSelector(state, {
    asset: route.params.asset,
    wallet: currentWallet,
  });

  const onShare = async (address: string) => {
    await Share.share({
      message: address,
    });
  };

  useEffect(() => {
    navigation.setOptions({title: GetAssetTitle(asset.info)});
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.qr_container}>
        <View style={styles.qr_code}>
          <QRCode value={currentAccount.address} size={220} />
        </View>
        <View style={styles.address_container}>
          <Text numberOfLines={1} style={styles.address_text} ellipsizeMode={'middle'}>
            {currentAccount.address}
          </Text>
          <Touchable
            style={styles.address_copy_button}
            onPress={(_: any) => {
              Clipboard.setString(currentAccount.address);
            }}>
            <Text style={styles.address_copy_button_text}>Copy</Text>
          </Touchable>
        </View>
        <Text style={styles.info_text}>
          This address can only be used to receive compatible tokens on{' '}
          {AssetTypeList.types(asset.asset.chain).join(',')} {asset.info.name} network.
        </Text>
      </View>

      <View style={styles.share}>
        <MagicButton
          title={'Share address'}
          style={MagicButtonStyle.normal}
          onPress={_ => onShare(currentAccount.address)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.BLACK,
  },
  qr_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qr_code: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#FFF',
    overflow: 'hidden',
  },
  address_container: {
    flexDirection: 'row',
    marginTop: 24,
    minWidth: 240,
    maxWidth: 320,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: Colors.VERY_LIGHT_BLACK,
    padding: 8,
    backgroundColor: Colors.DARK_BLACK,
  },
  address_text: {
    padding: 8,
    color: Colors.WHITE,
    fontSize: 16,
    flexShrink: 1,
    alignContent: 'center',
  },
  address_copy_button: {
    padding: 8,
    borderRadius: 6,
  },
  address_copy_button_text: {
    color: Colors.WHITE,
    fontSize: 16,
  },
  share: {
    marginBottom: 20,
  },
  info_text: {
    maxWidth: '80%',
    color: Colors.DARK_GRAY,
    textAlign: 'center',
    fontSize: 15,
    padding: 16,
  },
});
