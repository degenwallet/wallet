import {Asset, AssetImageFormatter} from '@degenwallet/chain-types';
import React from 'react';
import {AssetsEndpoints} from '@degenwallet/config';
import FastImage, {ImageStyle} from 'react-native-fast-image';
import {StyleProp} from 'react-native';
import {AssetImageViewSource} from './AssetImageViewSource';

export interface AssetImageViewProps {
  asset: Asset;
  style: StyleProp<ImageStyle>;
}

export class AssetImageView extends React.Component<AssetImageViewProps> {
  imageFormatter = new AssetImageFormatter(AssetsEndpoints);
  imageSource = new AssetImageViewSource();

  render() {
    return (
      <FastImage
        style={this.props.style}
        defaultSource={this.imageSource.source(this.props.asset)}
        source={{uri: this.imageFormatter.url(this.props.asset)}}
      />
    );
  }
}
