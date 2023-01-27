import React from 'react';
import {Image, Text, TextInput, View} from 'react-native';
import {TextInputProps} from 'react-native/Libraries/Components/TextInput/TextInput';
import {Colors} from '@degenwallet/styles';

export interface FormTextFieldProps extends TextInputProps {
  error?: string;
}

export const FormTextField: React.FC<FormTextFieldProps> = props => {
  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <TextInput {...props} />
      {props.error && (
        <View style={{flex: 1, flexDirection: 'row', padding: 4}}>
          <Image style={{height: 12, width: 12, margin: 4}} source={require('../../../../assets/images/error.png')} />
          <Text style={{color: Colors.RED}}>{props.error}</Text>
        </View>
      )}
    </View>
  );
};
