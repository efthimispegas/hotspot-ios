import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry
}) => {
  const { inputStyle, labelStyle, containerStyle } = styles;
  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        style={inputStyle}
        autoCorrect={false}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 0,
    fontSize: 18,
    lineHeight: 23,
    flex: 5
  },
  labelStyle: {
    fontSize: 17,
    fontWeight: '300',
    fontStyle: 'italic',
    color: 'lightgrey',
    paddingLeft: 20,
    flex: 2
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export { Input };
