import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

interface TextFieldProps {
    placeholder: string;
    isSecure?: boolean;
    onTextChange: Function;
    value?: string;
    multiline?: boolean;
    numberOfLines?: number;
    maxLength?: number;
}


const components: React.FC<TextFieldProps> = ({ placeholder, isSecure, onTextChange, value}) => {
    return (
        <View style={styles.container}>
            <TextInput
                placeholder={placeholder}
                autoCapitalize='none'
                secureTextEntry={isSecure}
                onChangeText={(text) => onTextChange(text)}
                style={styles.textField}
                value={value}
            />
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        borderRadius: 20,
        borderColor: '#4D368A',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        marginLeft: 10,
        marginRight: 10,
        paddingRight: 10,
        paddingLeft: 20,
        // width: '100%'
    },
    
    textField: {
        flex: 1,
        width: '100%',
        height: 50,
        fontSize: 20,
        color: '#000'
    },
    otpTextField: {
        flex: 1,
        width: 320,
        height: 50,
        fontSize: 30,
        color: '#000',
        textAlign: 'center'
    }
})

export default components;