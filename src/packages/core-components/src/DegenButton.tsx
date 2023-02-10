import {GestureResponderEvent, StyleSheet, Text} from 'react-native';
import React from 'react';
import {Colors, DegenButtonStyle, FontWeight} from '@degenwallet/styles';
import {Touchable} from '@degenwallet/core-components';

export interface DegenButtonProps {
  title: string;
  style: DegenButtonStyle;
  disabled?: boolean;
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
        disabled={this.props.disabled}
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
