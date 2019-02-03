import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View } from 'native-base';
import { Colors } from './Colors';
import { Spinner } from './Spinner';

class Button extends Component {
  render() {
    const { button, buttonText, textContainer } = styles;
    const { onPress, name, isLoading } = this.props;
    return (
      <TouchableOpacity style={button} onPress={onPress}>
        {isLoading ? (
          <Spinner size="small" />
        ) : (
          <View style={textContainer}>
            <Text style={buttonText}>{name}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: 7
  },
  textContainer: {
    alignSelf: 'center'
  },
  buttonText: {
    fontFamily: 'montserrat',
    color: Colors.hotspotColor,
    fontSize: 18,
    width: '100%',
    height: 25,
    alignSelf: 'center'
  }
});

export { Button };
