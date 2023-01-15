import React from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {Props, Screen, SelectAssetType} from '@magicwallet/navigation';
import {Colors} from '@magicwallet/styles';
import {AssetListItem} from '@magicwallet/views';
import {GetAssetsSelector} from '../../../core/selectors/assets-selectors';
import {useAppSelector} from '../../../core/hooks';
import {GetCurrentWallet} from '../../../core/selectors/wallets-selectors';
import {Asset} from '@magicwallet/chain-types';

export const SelectAssetScreen: React.FC<Props<Screen.SELECT_ASSET>> = ({route, navigation}) => {
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
