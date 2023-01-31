import React from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {Colors} from '@degenwallet/styles';
import {ChainList} from '@degenwallet/chain-types';
import {ChainView} from '../ChainView';
import {RouteProp} from '@react-navigation/core';
import {OnboardingStackParamList} from '../../../navigation/OnboardingStack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Screen} from '../../../navigation';

export type Props = {
  route: RouteProp<OnboardingStackParamList, Screen.SELECT_CHAIN>;
  navigation: NativeStackNavigationProp<OnboardingStackParamList, Screen.SELECT_CHAIN>;
};

export const SelectChainScreen: React.FC<Props> = ({route, navigation}) => {
  const chains = ChainList;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={chains}
        renderItem={({item}) => (
          <ChainView
            chain={item}
            onPress={() => {
              route.params.selectChain(item);
              navigation.pop();
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
