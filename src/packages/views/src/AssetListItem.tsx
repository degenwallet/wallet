import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AssetItem} from '@degenwallet/chain-types';
import {Colors} from '@degenwallet/styles';
import {Touchable} from '@degenwallet/core-components';
import {format, fromBigNumber} from '@degenwallet/types';
import {FiatBalanceFormatter} from './fiat-balance-formatter';
import {FontWeight} from '@degenwallet/styles/src/font-weight';
import {AssetImageView} from '../../../components/AssetImageView';

export interface AssetListItemProps {
  asset: AssetItem;
  onPress?: () => void;
}

export class AssetListItem extends React.Component<AssetListItemProps> {
  fiatFormatter = new FiatBalanceFormatter();

  render() {
    const asset = this.props.asset;
    const price = asset.balance.price?.price || 0;
    const priceChange = asset.balance.price?.change_24h || 0;
    const isPriceAvailable = price !== 0;
    return (
      <Touchable style={styles.touch} onPress={this.props.onPress}>
        <View style={styles.container}>
          <View style={styles.left}>
            <AssetImageView asset={asset.asset} style={styles.logo} />
            <View style={styles.title_container}>
              <Text numberOfLines={1} style={styles.title}>
                {asset.info.name}
              </Text>
              {isPriceAvailable ? (
                <View style={styles.price_container}>
                  <Text style={styles.price_value}>{this.fiatFormatter.fiatValue(price)}</Text>
                  <Text
                    style={{
                      ...styles.price_change,
                      color: priceChange >= 0 ? Colors.GREEN : Colors.RED,
                    }}>
                    {this.fiatFormatter.fiatValueChangePercentage(priceChange)}
                  </Text>
                </View>
              ) : (
                <View />
              )}
            </View>
          </View>
          <View style={styles.right}>
            <Text style={styles.balance}>
              {format(fromBigNumber(asset.balance.available, asset.info.decimals))}
              <Text numberOfLines={1} style={styles.symbol}>
                {' '}
                {asset.info.symbol}
              </Text>
            </Text>
          </View>
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    borderRadius: 12,
    backgroundColor: Colors.LIGHT_BLACK,
  },
  touch: {
    borderRadius: 12,
    margin: 12,
    marginVertical: 6,
    backgroundColor: Colors.LIGHT_BLACK,
  },
  logo: {
    width: 44,
    height: 44,
    margin: 12,
    borderRadius: 22,
  },
  title: {
    textAlign: 'left',
    color: Colors.WHITE,
    fontWeight: FontWeight.SEMI_BOLD,
  },
  symbol: {
    textAlign: 'left',
    color: Colors.WHITE,
  },
  balance: {
    alignSelf: 'center',
    padding: 12,
    color: Colors.WHITE,
  },
  title_container: {
    alignSelf: 'center',
    flexDirection: 'column',
  },
  price_container: {
    marginTop: 2,
    flexDirection: 'row',
  },
  price_value: {
    color: Colors.DARK_GRAY,
    fontSize: 13,
    fontWeight: FontWeight.SEMI_BOLD,
  },
  price_change: {
    marginLeft: 4,
    fontSize: 13,
    fontWeight: FontWeight.SEMI_BOLD,
  },
  right: {
    alignSelf: 'center',
  },
  left: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
});
