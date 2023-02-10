import React from 'react';
import {Asset, AssetImageFormatter, Chain} from '@degenwallet/chain-types';
import {AssetsEndpoints} from '@degenwallet/config';
import {GetAssetResource} from '../assets/asset-resource';
import {FormListItem} from '@degenwallet/views';
import {FormListImageType} from '@degenwallet/views/src/form/FormListItem';

export interface ChainViewProps {
  chain: Chain;
  onPress?: () => void;
}

export class ChainView extends React.Component<ChainViewProps> {
  imageFormatter = new AssetImageFormatter(AssetsEndpoints);

  render() {
    return (
      <FormListItem
        title={GetAssetResource(new Asset(this.props.chain))?.name ?? ''}
        image={{uri: this.imageFormatter.urlForChain(this.props.chain)}}
        onPress={this.props.onPress}
        rightImage={FormListImageType.chevron}
      />
    );
  }
}
