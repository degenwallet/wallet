import React from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {Colors} from '@degenwallet/styles';
import {AssetListItem} from '@degenwallet/views';
import {GetAssetsSelector} from '../../../core/selectors/assets-selectors';
import {useAppSelector} from '@degenwallet/store';
import {GetCurrentWallet} from '../../../core/selectors/wallets-selectors';
import {Asset} from '@degenwallet/chain-types';
import {RouteProp} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Screen, SelectAssetType} from '../../../navigation';
import {WalletStackParamList} from '../../../navigation/WalletStack';

export type Props = {
  route: RouteProp<WalletStackParamList, Screen.SELECT_ASSET>;
  navigation: NativeStackNavigationProp<WalletStackParamList, Screen.SELECT_ASSET>;
};

export const SelectAssetScreen: React.FC<Props> = ({route, navigation}) => {
  const {type} = route.params;
  const state = useAppSelector(s => s);
  const currentWallet = GetCurrentWallet(state);
  const assets = GetAssetsSelector(state, currentWallet);

  const handlePress = (assetType: SelectAssetType, asset: Asset) => {
    switch (assetType) {
      case SelectAssetType.BUY:
        navigation.navigate(Screen.BUY_CRYPTO, {
          asset: asset,
        });
        break;
      case SelectAssetType.RECEIVE:
        navigation.navigate(Screen.RECEIVE, {
          asset: asset,
        });
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={assets}
        renderItem={({item}) => (
          <AssetListItem
            asset={item}
            onPress={() => {
              handlePress(type, item.asset);
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
