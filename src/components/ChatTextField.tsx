import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

interface ChatTextFieldProps {
    placeholder: string;
    isSecure?: boolean;
    onTextChange: Function;
    value?: string;
    multiline?: boolean;
    numberOfLines?: number;
    maxLength?: number;
    style: any;
}


const components: React.FC<ChatTextFieldProps> = ({ placeholder, isSecure, onTextChange, value, style}) => {
    return (
        <View>
            <TextInput
                placeholder={placeholder}
                autoCapitalize='none'
                secureTextEntry={isSecure}
                onChangeText={(text) => onTextChange(text)}
                value={value}
                style={style}
            />
      </View>
  );
}


export default components;