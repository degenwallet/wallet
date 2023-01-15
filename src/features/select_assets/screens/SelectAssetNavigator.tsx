import * as React from 'react';
import {HeaderOptions, Screen, SelectAssetStack, SelectAssetType} from '@degenwallet/navigation';
import {BuyCryptoScreen, ReceiveScreen, SelectAssetScreen} from '../../../core/screens';
import {Image, Platform, TouchableOpacity} from 'react-native';

export const SelectAssetNavigator: () => React.ReactElement = () => {
  const title = (type: SelectAssetType) => {
    switch (type) {
      case SelectAssetType.BUY:
        return 'Buy';
      case SelectAssetType.RECEIVE:
        return 'Receive';
    }
  };

  return (
    <SelectAssetStack.Navigator>
      <SelectAssetStack.Screen
        name={Screen.SELECT_ASSET}
        component={SelectAssetScreen}
        options={({navigation, route}) => ({
          ...HeaderOptions,
          title: title(route.params.type),
          headerLeft: () =>
            Platform.OS === 'ios' ? (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image style={{height: 32, width: 32}} source={require('../../../assets/images/close.png')} />
              </TouchableOpacity>
            ) : undefined,
        })}
      />
      <SelectAssetStack.Screen
        name={Screen.RECEIVE}
        component={ReceiveScreen}
        options={({route}) => ({
          ...HeaderOptions,
          title: 'Receive ' + route.params.asset.chain,
        })}
      />
      <SelectAssetStack.Screen
        name={Screen.BUY_CRYPTO}
        component={BuyCryptoScreen}
        options={({route}) => ({
          ...HeaderOptions,
          title: 'Buy ' + route.params.asset.chain,
        })}
      />
    </SelectAssetStack.Navigator>
  );
};
