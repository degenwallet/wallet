import React from 'react';
import FastImage from 'react-native-fast-image';
import {Image, ImageSourcePropType, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {Colors} from '@degenwallet/styles';
import {Touchable} from '@degenwallet/core-components';

export class FormListItemProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  image?: ImageSourcePropType;
  imageUri?: string;
  style?: ViewStyle;
  rightImage?: FormListImageType;
  onRightPress?: () => void;
}

export enum FormListImageType {
  chevron = 1,
  info,
}

export class FormListItem extends React.Component<FormListItemProps> {
  getRightImage(type: FormListImageType): ImageSourcePropType {
    switch (type) {
      case FormListImageType.chevron:
        return require('./assets/chevron.png');
      case FormListImageType.info:
        return require('./assets/info.png');
    }
  }

  render() {
    const paddingLeft = this.props.subtitle !== undefined ? 0 : 16;
    const rightImage = this.getRightImage(this.props.rightImage || FormListImageType.chevron);

    return (
      <Touchable style={{...styles.touch, ...this.props.style}} onPress={this.props.onPress}>
        <View style={{...styles.container, ...this.props.style}}>
          {this.props.image ? (
            <View style={styles.image_container}>
              {this.props.imageUri ? (
                <FastImage style={styles.image} source={{uri: this.props.imageUri}} />
              ) : (
                <Image style={styles.image} source={this.props.image} />
              )}
            </View>
          ) : undefined}
          <View style={styles.text_container}>
            <Text style={styles.title}>{this.props.title}</Text>
            <Text style={styles.subtitle}>{this.props.subtitle}</Text>
          </View>
          {this.props.rightImage ? (
            <Touchable
              style={{...styles.touch, ...styles.right_container, ...this.props.style, paddingLeft: paddingLeft}}
              onPress={this.props.onRightPress}>
              <Image style={styles.right_container_image} source={rightImage} />
            </Touchable>
          ) : undefined}
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: Colors.LIGHT_BLACK,
    minHeight: 54,
  },
  touch: {
    borderRadius: 6,
    marginVertical: 6,
    backgroundColor: Colors.LIGHT_BLACK,
  },
  text_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingLeft: 12,
    paddingRight: 10,
  },
  image_container: {
    justifyContent: 'center',
    marginLeft: 12,
  },
  image: {
    height: 32,
    width: 32,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.WHITE,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.GRAY,
    textAlign: 'right',
  },
  right_container: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 16,
  },
  right_container_image: {
    height: 12,
    width: 12,
  },
});
