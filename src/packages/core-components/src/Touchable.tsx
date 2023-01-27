import {Platform, TouchableHighlight, TouchableNativeFeedback, View} from 'react-native';
import React from 'react';

export const Touchable = (props: any) => {
  switch (Platform.OS) {
    case 'android':
      return (
        <TouchableNativeFeedback disabled={props.disabled} useForeground onPress={props.onPress}>
          <View style={{...props.style, overflow: 'hidden'}}>{props.children}</View>
        </TouchableNativeFeedback>
      );
    default:
      return (
        <TouchableHighlight
          disabled={props.disabled}
          style={props.style}
          onPress={props.onPress}
          underlayColor={props.underlayColor}>
          {props.children}
        </TouchableHighlight>
      );
  }
};
