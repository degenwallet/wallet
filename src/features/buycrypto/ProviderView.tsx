import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {Colors, Spacing} from '@magicwallet/styles';
import {QuoteResult} from '@magicwallet/fiat-providers';
import {FormListItem} from '@magicwallet/views';
import {AssetItem} from '@magicwallet/chain-types';
import {round} from '@magicwallet/types';

class ProviderViewProps {
  quotes: Array<QuoteResult>;
  quoteError: boolean;
  assetItem: AssetItem;
}

export class ProviderView extends React.Component<ProviderViewProps> {
  render() {
    const {quotes, assetItem, quoteError} = this.props;
    if (quoteError) {
      return <Text style={styles.error_text}>Not available</Text>;
    }
    if (quotes.length === 0) {
      return (
        <View style={styles.indicator_container}>
          <ActivityIndicator />
        </View>
      );
    }
    const quote = quotes[0];
    return (
      <View style={styles.info_container}>
        <FormListItem title={'Provider'} subtitle={quote.provider} style={styles.info_item} isChevronHidden={true} />
        <FormListItem
          title={'Rate'}
          subtitle={`1 ${assetItem.info.symbol} ≈ ${round(quote.quote.rate, 4)}`}
          style={styles.info_item}
          isChevronHidden={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  info_container: {
    overflow: 'hidden',
    backgroundColor: Colors.BLACK,
    borderRadius: 8,
    marginTop: Spacing.screen.padding,
    marginHorizontal: 8,
  },
  info_item: {
    marginVertical: 0,
    margin: 0,
    padding: 0,
    borderRadius: 0,
  },
  indicator_container: {
    padding: 30,
  },
  error_text: {
    color: Colors.GRAY,
    fontSize: 16,
    textAlign: 'center',
    padding: 30,
  },
});
