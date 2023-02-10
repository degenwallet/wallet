import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Screen} from '../../../navigation';
import {Colors, DegenButtonStyle, Spacing} from '@degenwallet/styles';
import {DegenButton} from '@degenwallet/views';
import {walletsAddWallet} from '@degenwallet/redux';
import {useAppDispatch, useAppSelector} from '@degenwallet/store';
import {Asset, Chain} from '@degenwallet/chain-types';
import {ChainView} from '../../../components/ChainView';
import {AnyAddress} from '@degenwallet/react-native-wallet-core/lib/typescript/address';
import {TWAsset} from '@degenwallet/market-provider/src/providers/trustwallet/TWAsset';
import {Formik, FormikProps} from 'formik';
import {FormTextField} from '@degenwallet/core-components';
import * as Yup from 'yup';
import {walletName} from '../../../core/selectors/wallets-selectors';
import {GetAssetResource} from '../../../assets/asset-resource';
import {RouteProp} from '@react-navigation/core';
import {OnboardingStackParamList} from '../../../navigation/OnboardingStack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {WalletStackParamList} from '../../../navigation/WalletStack';

import {Account, WalletType} from '@degenwallet/types';

export type Props = {
  route: RouteProp<OnboardingStackParamList, Screen.IMPORT_WALLET>;
  navigation: NativeStackNavigationProp<OnboardingStackParamList & WalletStackParamList, Screen.IMPORT_WALLET>;
};

export const ImportWalletScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(s => s.wallets.wallets);
  const initialChain = Chain.BNB_CHAIN;
  const defaultName = (name: string, chain: Chain) => {
    const walletsCount = state.filter(wallet => wallet.accounts[0].chain === chain).length;
    const assetResource = GetAssetResource(new Asset(chain))!;
    return walletName(assetResource, walletsCount);
  };

  const handleSubmit = async (name: string, chain: Chain, address: string) => {
    const walletName = name.length === 0 ? defaultName(name, chain) : name;

    dispatch(
      walletsAddWallet({name: walletName, type: WalletType.SINGLE, accounts: [new Account(chain, address)]}),
    ).then(_ => {
      navigation.navigate(Screen.WALLET);
    });
  };

  const isValidAddress = async (chain: Chain, address: string) => {
    const coin = TWAsset.coinFromChain(chain);
    return await AnyAddress.validateAddress(address, coin);
  };

  type Values = {
    chain: Chain;
    name: string;
    address: string;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{chain: initialChain, name: '', address: ''}}
        validationSchema={Yup.object().shape({
          name: Yup.string(),
          address: Yup.string()
            .required()
            .test('address validation', 'Invalid address', async (value, context) => {
              return await isValidAddress(context.parent.chain, value || '');
            }),
        })}
        onSubmit={values => {
          handleSubmit(values.name, values.chain, values.address).then(r => r);
        }}>
        {(props: FormikProps<Values>) => (
          <View style={styles.form}>
            <ChainView
              chain={props.values.chain}
              onPress={() => {
                navigation.navigate(Screen.SELECT_CHAIN, {
                  chain: props.values.chain,
                  selectChain: chain => {
                    props.setFieldValue('chain', chain);
                  },
                });
              }}
            />
            <FormTextField
              editable
              autoCapitalize={'none'}
              autoCorrect={false}
              style={styles.input_name}
              onChangeText={props.handleChange('name')}
              value={props.values.name}
              onTouchStart={_ => {
                props.setFieldTouched('name');
              }}
              placeholder="Name"
              keyboardType="default"
              enablesReturnKeyAutomatically={true}
              placeholderTextColor={Colors.DARK_GRAY}
              error={props.touched.name && props.errors.name ? props.errors.name : ''}
            />
            <FormTextField
              editable
              autoCapitalize={'none'}
              autoCorrect={false}
              style={styles.input}
              onChangeText={props.handleChange('address')}
              onTouchStart={_ => {
                props.setFieldTouched('address');
              }}
              value={props.values.address}
              placeholder="Enter an address"
              keyboardType="default"
              enablesReturnKeyAutomatically={true}
              placeholderTextColor={Colors.DARK_GRAY}
              error={props.touched.address && props.errors.address ? props.errors.address : ''}
            />
            <View style={styles.footer}>
              <DegenButton
                style={DegenButtonStyle.normal}
                title={'Import Wallet'}
                onPress={_ => props.handleSubmit()}
              />
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  form: {
    flex: 1,
    flexDirection: 'column',
    padding: 16,
  },
  input_name: {
    color: Colors.WHITE,
    height: 44,
    marginVertical: Spacing.screen.padding / 2,
    borderWidth: 0.5,
    borderColor: Colors.LIGHT_BLACK,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  input: {
    color: Colors.WHITE,
    height: 44,
    marginVertical: Spacing.screen.padding / 2,
    borderWidth: 0.5,
    borderColor: Colors.LIGHT_BLACK,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
});
