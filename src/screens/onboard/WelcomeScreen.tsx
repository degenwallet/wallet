import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Colors, FontWeight, DegenButtonStyle} from '@degenwallet/styles';
import {DegenButton} from '@degenwallet/core-components/src/DegenButton';
import {DISPLAY_NAME} from '@degenwallet/config';
import {RouteProp} from '@react-navigation/core';
import {OnboardingStackParamList} from '../../navigation/OnboardingStack';
import {Screen} from '../../navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {WalletStackParamList} from '../../navigation/WalletStack';

export type Props = {
  route: RouteProp<OnboardingStackParamList, Screen.WELCOME>;
  navigation: NativeStackNavigationProp<OnboardingStackParamList & WalletStackParamList, Screen.WELCOME>;
};

export const WelcomeScreen: React.FC<Props> = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.headerImage} source={require('../../assets/images/logo.png')} />
        <Text style={styles.headerTitle}>{DISPLAY_NAME}</Text>
        <Text style={styles.headerDescription}>Experience the magic of DeFi & NTFs</Text>
      </View>
      <View style={styles.footer}>
        <DegenButton
          style={DegenButtonStyle.normal}
          title={'Create a new wallet'}
          onPress={() => navigation.navigate(Screen.IMPORT_WALLET)}
        />
        <View style={{margin: 10}} />
        <DegenButton
          style={DegenButtonStyle.light}
          title={'I already have a wallet'}
          onPress={() => navigation.navigate(Screen.IMPORT_WALLET)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: FontWeight.SEMI_BOLD,
    color: Colors.WHITE,
    marginTop: 20,
  },
  headerImage: {
    marginTop: 24,
    height: 86,
    width: 86,
    borderRadius: 43,
  },
  headerDescription: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.GRAY,
    marginTop: 20,
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  footerButton: {
    margin: 12,
  },
});
