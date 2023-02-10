import React, {useEffect, useState} from 'react';
import {Linking, SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import {Colors, DegenButtonStyle, FontWeight} from '@degenwallet/styles';
import {FiatProvidersFactory, QuoteFetcher, QuoteResult} from '@degenwallet/fiat-providers';
import {DegenButton} from '@degenwallet/views';
import {useAppSelector} from '@degenwallet/store';
import {BuyButtons} from '../../components/BuyButtons';
import {ProviderView} from '../../components/ProviderView';
import {round} from '@degenwallet/types';
import {RouteProp} from '@react-navigation/core';
import {WalletStackParamList} from '../../navigation/WalletStack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Screen} from '../../navigation';
import {GetCurrencySelector} from '../../core/selectors/settings-selectors';
import {GetCurrentWallet, GetCurrentWalletAccount} from '../../core/selectors/wallets-selectors';
import {GetAssetSelector, GetAssetTitle} from '../../core/selectors/assets-selectors';

export type Props = {
  route: RouteProp<WalletStackParamList, Screen.BUY_CRYPTO>;
  navigation: NativeStackNavigationProp<WalletStackParamList, Screen.BUY_CRYPTO>;
};

export const BuyCryptoScreen: React.FC<Props> = ({route, navigation}) => {
  const {asset} = route.params;
  const state = useAppSelector(s => s);
  const quoteFetcher = new QuoteFetcher(FiatProvidersFactory.new());
  const currency = GetCurrencySelector(state);
  const [quotes, setQuotes] = useState(Array<QuoteResult>);
  const [quoteError, setQuoteError] = useState(false);
  const [currentAmount, onChangeCurrentAmount] = React.useState(100);
  const currentWallet = GetCurrentWallet(state);
  const currentAccount = GetCurrentWalletAccount(state, {
    wallet: currentWallet,
    chain: asset.chain,
  });
  const assetItem = GetAssetSelector(state, {
    asset: route.params.asset,
    wallet: currentWallet,
  });

  useEffect(() => {
    navigation.setOptions({title: GetAssetTitle(assetItem.info)});
  });

  useEffect(() => {
    setQuotes([]);
    setQuoteError(false);
    quoteFetcher
      .getQuote(currency, assetItem.asset, currentAmount, currentAccount.address)
      .then(result => {
        setQuotes(result);
        console.log('quotes: ', result.length, result);
        setQuoteError(false);
      })
      .catch(_ => {
        setQuoteError(true);
      });
  }, [currentAmount]);

  const buyAction = function (quote: QuoteResult) {
    const url = quote.redirectURL;
    Linking.openURL(url).then(console.log);
  };

  const inputBuy = function (buyAmount: number) {
    onChangeCurrentAmount(buyAmount);
  };

  const quote = quotes[0];
  const disabled = quotes.length === 0;

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={styles.container}>
        <View style={styles.input_container}>
          <Text style={styles.input_symbol}>$</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => onChangeCurrentAmount(parseFloat(text))}
            value={String(currentAmount)}
            keyboardType="number-pad"
            autoFocus={true}
            caretHidden={true}
            editable={false}
          />
        </View>

        <Text style={styles.output}>
          {quote ? `${round(quote.quote.cryptoAmount, 4)} ${assetItem.info.symbol}` : ' '}
        </Text>
        <BuyButtons
          amounts={[
            [50, 100, 150],
            [250, 500, 1000],
          ]}
          onPress={buyAmount => inputBuy(buyAmount)}
        />
        <ProviderView quotes={quotes} quoteError={quoteError} assetItem={assetItem} />
      </View>
      <View style={styles.button_container}>
        <DegenButton
          onPress={_ => buyAction(quote)}
          title={`Buy ${assetItem.info.symbol}`}
          style={DegenButtonStyle.normal}
          disabled={disabled}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.BLACK,
  },
  container: {
    marginHorizontal: 16,
  },
  input_container: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  input: {
    fontSize: 56,
    fontWeight: FontWeight.SEMI_BOLD,
    color: Colors.WHITE,
  },
  input_symbol: {
    fontSize: 50,
    fontWeight: FontWeight.SEMI_BOLD,
    color: Colors.WHITE,
  },
  output: {
    color: Colors.GRAY,
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 16,
    fontWeight: FontWeight.SEMI_BOLD,
  },
  button_container: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 40,
    marginHorizontal: 16,
  },
});
