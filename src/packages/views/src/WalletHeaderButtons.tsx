import React from 'react';
import {StyleSheet, View} from 'react-native';
import {DegenButtonStyle} from '@degenwallet/styles';
import {DegenButton} from '@degenwallet/core-components/src/DegenButton';

export enum WalletHeaderAction {
  RECEIVE = 'RECEIVE',
  BUY = 'BUY',
}

export interface AssetListItemProps {
  onPress: (type: WalletHeaderAction) => void;
}

export class WalletHeaderButtons extends React.Component<AssetListItemProps> {
  render() {
    return (
      <View style={styles.container}>
        <DegenButton
          title={'Receive'}
          style={DegenButtonStyle.normal}
          onPress={_ => this.props.onPress(WalletHeaderAction.RECEIVE)}
        />
        <View style={{padding: 10}} />
        <DegenButton
          title={'Buy'}
          style={DegenButtonStyle.normal}
          onPress={_ => this.props.onPress(WalletHeaderAction.BUY)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});
