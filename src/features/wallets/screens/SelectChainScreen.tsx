import React from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {Props, Screen} from '@degenwallet/navigation';
import {Colors, Spacing} from '@degenwallet/styles';
import {ChainList} from '@degenwallet/chain-types';
import {ChainView} from '../ChainView';

export const SelectChainScreen: React.FC<Props<Screen.SELECT_CHAIN>> = ({route, navigation}) => {
  const chains = ChainList;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={{paddingHorizontal: Spacing.screen.padding / 2}}
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
