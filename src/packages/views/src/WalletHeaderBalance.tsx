import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, FontWeight} from '@degenwallet/styles';
import {FiatBalanceFormatter} from '@degenwallet/views';

export interface WalletHeaderBalanceProps {
  value: number;
  value_change: number;
  value_change_percentage: number;
}

export class WalletHeaderBalance extends React.Component<WalletHeaderBalanceProps> {
  formatter = new FiatBalanceFormatter();

  render() {
    const positiveChange = this.props.value_change > 0;

    return (
      <View style={styles.container}>
        <Text style={styles.balance}>{this.formatter.fiatValue(this.props.value)}</Text>
        <View
          style={{
            ...styles.balance_change,
          }}>
          <Text
            style={{
              ...styles.balance_change_value_text,
              color: positiveChange ? Colors.GREEN : Colors.RED,
            }}>
            {this.formatter.fiatValueChange(this.props.value_change)}
          </Text>
          <View
            style={{
              backgroundColor: positiveChange ? Colors.GREEN_DARK : Colors.RED_DARK,
              ...styles.balance_change_percent,
            }}>
            <Text
              style={{
                ...styles.balance_change_percent_text,
                color: positiveChange ? Colors.GREEN : Colors.RED,
              }}>
              {this.formatter.fiatValueChangePercentage(this.props.value_change_percentage)}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'stretch',
    marginTop: 8,
    margin: 16,
  },
  balance: {
    textAlign: 'center',
    fontSize: 34,
    fontWeight: FontWeight.SEMI_BOLD,
    color: Colors.WHITE,
  },
  balance_change: {
    flexDirection: 'row',
    alignSelf: 'center',
    padding: 6,
  },
  balance_change_value_text: {
    fontWeight: FontWeight.SEMI_BOLD,
    color: Colors.WHITE,
    padding: 6,
    fontSize: 17,
  },
  balance_change_percent: {
    padding: 6,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  balance_change_percent_text: {
    fontWeight: FontWeight.SEMI_BOLD,
    fontSize: 17,
    borderRadius: 12,
  },
});
