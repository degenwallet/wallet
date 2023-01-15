import React from 'react';
import {FlatList, ImageSourcePropType, Linking, SafeAreaView, StyleSheet} from 'react-native';
import {Props, Screen} from '@degenwallet/navigation';
import {Colors, DefaultStyles} from '@degenwallet/styles';
import {FormListItem} from '@degenwallet/views';

export const CommunityScreen: React.FC<Props<Screen.COMMUNITY>> = ({}) => {
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
