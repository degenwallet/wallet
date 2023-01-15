import React from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {Props, Screen} from '@magicwallet/navigation';
import {Colors, DefaultStyles} from '@magicwallet/styles';
import {FormListItem} from '@magicwallet/views';
import {useAppDispatch, useAppSelector} from '../../../core/hooks';
import {getWalletsSelector} from '../../../core/selectors/wallets-selectors';
import {Wallet} from '@magicwallet/types';
import {walletsSelectWallet} from '../../../core/reducers/wallets';
import {FormListImageType} from '@magicwallet/views/src/form/FormListItem';

export const WalletsScreen: React.FC<Props<Screen.WALLETS>> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(s => s);
  const wallets = getWalletsSelector(state);

  const handleSelect = (wallet: Wallet) => {
    //Is there a better way to handle wallet deletion?
    navigation.goBack();
    navigation.pop();
    dispatch(walletsSelectWallet(wallet)).then(r => r);
  };

  const handleDetails = (wallet: Wallet) => {
    navigation.navigate(Screen.WALLET_DETAILS, {wallet: wallet});
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={DefaultStyles.list}
        data={wallets}
        renderItem={({item}) => (
          <FormListItem
            title={item.name}
            onPress={() => {
              handleSelect(item.wallet);
            }}
            rightImage={FormListImageType.info}
            onRightPress={() => {
              handleDetails(item.wallet);
            }}
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
