import React from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {Props, Screen} from '@degenwallet/navigation';
import {Colors, DefaultStyles} from '@degenwallet/styles';
import {FormListItem} from '@degenwallet/views';
import {useAppDispatch, useAppSelector} from '../../../core/store';
import {getWalletsSelector} from '../../../core/selectors/wallets-selectors';
import {Wallet} from '@degenwallet/types';
import {walletsSelectWallet} from '@degenwallet/redux';
import {FormListImageType} from '@degenwallet/views/src/form/FormListItem';

export const WalletsScreen: React.FC<Props<Screen.WALLETS>> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(s => s);
  const wallets = getWalletsSelector(state);

  const handleSelect = (wallet: Wallet) => {
    //Is there a better way to handle wallet deletion?
    navigation.goBack();
    navigation.pop();
    dispatch(walletsSelectWallet(wallet));
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
