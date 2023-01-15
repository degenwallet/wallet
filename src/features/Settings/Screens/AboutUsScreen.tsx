import React from 'react';
import {FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Props, Screen} from '@degenwallet/navigation';
import {Colors, DefaultStyles, FontWeight} from '@degenwallet/styles';
import {FormListItem} from '@degenwallet/views';
import DeviceInfo from 'react-native-device-info';
import { DISPLAY_NAME, WEBSITE } from "@degenwallet/config";

export const AboutUsScreen: React.FC<Props<Screen.ABOUT_US>> = ({navigation}) => {
  const items: {
    title: string;
    onPress: () => void;
  }[] = [
    {
      title: 'Community & Support',
      onPress: () => {
        navigation.navigate(Screen.COMMUNITY);
      },
    },
    {
      title: 'Terms of Services',
      onPress: () => {
        Linking.openURL(WEBSITE + '/terms').then(r => r);
      },
    },
    {
      title: 'Privacy Policy',
      onPress: () => {
        Linking.openURL(WEBSITE + '/privacy').then(r => r);
      },
    },
    {
      title: 'View Source Code',
      onPress: () => {
        Linking.openURL('https://github.com/degenwallet/wallet').then(r => r);
      },
    },
    {
      title: 'Visit Website',
      onPress: () => {
        Linking.openURL(WEBSITE).then(r => r);
      },
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={DefaultStyles.list}
        data={items}
        renderItem={({item}) => <FormListItem title={item.title} onPress={item.onPress} />}
        ListHeaderComponent={
          <View style={styles.header}>
            <Image style={styles.logo} source={require('../../../assets/images/logo.png')} />
            <Text style={styles.name}>{DISPLAY_NAME}</Text>
            <Text style={styles.version}>
              Version {DeviceInfo.getVersion()} ({DeviceInfo.getBuildNumber()})
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
  },
  header: {
    margin: 32,
    alignItems: 'center',
  },
  logo: {
    height: 64,
    width: 64,
    borderRadius: 32,
  },
  name: {
    marginTop: 12,
    color: Colors.WHITE,
    fontWeight: FontWeight.SEMI_BOLD,
    fontSize: 26,
  },
  version: {
    marginTop: 6,
    color: Colors.GRAY,
  },
});
