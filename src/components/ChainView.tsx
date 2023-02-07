import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Asset, AssetImageFormatter, Chain} from '@degenwallet/chain-types';
import {AssetsEndpoints} from '@degenwallet/config';
import {Colors} from '@degenwallet/styles';
import {Touchable} from '@degenwallet/core-components';
import {GetAssetResource} from '../assets/asset-resource';

export interface ChainViewProps {
  chain: Chain;
  onPress?: () => void;
}

export class ChainView extends React.Component<ChainViewProps> {
  imageFormatter = new AssetImageFormatter(AssetsEndpoints);

  render() {
    return (
      <Touchable style={styles.touch} onPress={this.props.onPress}>
        <View style={styles.container}>
          <FastImage style={styles.logo} source={{uri: this.imageFormatter.urlForChain(this.props.chain)}} />
          <Text style={styles.title}>{GetAssetResource(new Asset(this.props.chain))?.name}</Text>
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'stretch',
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
    alignSelf: 'center',
    width: 44,
    height: 44,
    margin: 12,
    borderRadius: 22,
  },
  title: {
    alignSelf: 'center',
    color: Colors.WHITE,
  },
});
