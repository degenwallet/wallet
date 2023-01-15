import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Props, Screen} from '@magicwallet/navigation';
import {Colors} from '@magicwallet/styles';
import {WalletHeader, WalletHeaderAction} from '@magicwallet/views/src/WalletHeader';
import {
  GetAssetSelector,
  GetAssetTitle,
  GetAssetTotalFiatValueSelector,
} from '../../../core/selectors/assets-selectors';
import {useAppSelector} from '../../../core/hooks';
import {GetCurrentWallet} from '../../../core/selectors/wallets-selectors';

export const CoinScreen: React.FC<Props<Screen.COIN>> = ({route, navigation}) => {
  const {asset} = route.params;
  const state = useAppSelector(s => s);
  const currentWallet = GetCurrentWallet(state);
  const assetItem = GetAssetSelector(state, {
    asset: asset,
    wallet: currentWallet,
  });
  const fiatValue = GetAssetTotalFiatValueSelector(state, {
    wallet: currentWallet,
    asset,
  });

  const headerAction = function (action: WalletHeaderAction) {
    switch (action) {
      case WalletHeaderAction.RECEIVE:
        navigation.navigate(Screen.RECEIVE, {
          asset: asset,
        });
        break;
      case WalletHeaderAction.BUY:
        navigation.navigate(Screen.BUY_CRYPTO, {asset: asset});
        break;
    }
  };

  useEffect(() => {
    navigation.setOptions({title: GetAssetTitle(assetItem.info)});
  });

  return (
    <SafeAreaView style={styles.container}>
      <WalletHeader fiatValue={fiatValue} onPress={headerAction} />
      <View style={styles.header}>
        <Text>{asset.chain}</Text>
        <Text>{asset.token_id}</Text>
        <Text>Balance: {assetItem.balance.total()}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
