import React from 'react';
import {FlatList, ImageSourcePropType, Linking, SafeAreaView, StyleSheet} from 'react-native';
import {Colors, DefaultStyles} from '@degenwallet/styles';
import {FormListItem} from '@degenwallet/views';
import {RouteProp} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SettingsScreenParamList} from '../../../navigation/SettingsStack';
import {Screen} from '../../../navigation';

export type Props = {
  route: RouteProp<SettingsScreenParamList, Screen.COMMUNITY>;
  navigation: NativeStackNavigationProp<SettingsScreenParamList, Screen.COMMUNITY>;
};

export const CommunityScreen: React.FC<Props> = ({}) => {
  const items: {
    title: string;
    onPress: () => void;
    image?: ImageSourcePropType;
  }[] = [
    {
      title: 'Twitter',
      onPress: () => {
        Linking.openURL('https://twitter.com/DegenWalletApp').then(r => r);
      },
      image: require('../../../assets/images/social/twitter.png'),
    },
    {
      title: 'Telegram',
      onPress: () => {
        Linking.openURL('https://t.me/DegenWalletApp').then(r => r);
      },
      image: require('../../../assets/images/social/telegram.png'),
    },
    {
      title: 'Reddit',
      onPress: () => {
        Linking.openURL('https://www.reddit.com/r/DegenWallet').then(r => r);
      },
      image: require('../../../assets/images/social/reddit.png'),
    },
    {
      title: 'GitHub',
      onPress: () => {
        Linking.openURL('https://github.com/degenwallet').then(r => r);
      },
      image: require('../../../assets/images/social/github.png'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={DefaultStyles.list}
        data={items}
        renderItem={({item}) => <FormListItem title={item.title} onPress={item.onPress} image={item.image} />}
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
