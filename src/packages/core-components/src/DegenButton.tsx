import {GestureResponderEvent, StyleSheet, Text} from 'react-native';
import React from 'react';
import {Colors, FontWeight, DegenButtonStyle} from '@degenwallet/styles';
import {Touchable} from '@degenwallet/core-components';

export interface DegenButtonProps {
  title: string;
  style: DegenButtonStyle;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

export class DegenButton extends React.Component<DegenButtonProps> {
  render() {
    let buttonStyle = DegenButtonStyle.getStyle(this.props.style);
    return (
      <Touchable
        style={{
          ...styles.container,
          backgroundColor: buttonStyle.backgroundColor,
        }}
        underlayColor={buttonStyle.underlayColor}
        onPress={this.props.onPress}>
        <Text style={styles.title}>{this.props.title}</Text>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 15,
    //width: 260,
  },
  title: {
    fontSize: 16,
    fontWeight: FontWeight.SEMI_BOLD,
    color: Colors.WHITE,
    textAlign: 'center',
  },
});
