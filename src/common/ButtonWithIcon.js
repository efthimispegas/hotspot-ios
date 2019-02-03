import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

import { Colors } from './Colors';

class ButtonWithIcon extends Component {
  render() {
    const {
      button,
      buttonText,
      itemsContainer,
      textContainer,
      iconContainer
    } = styles;
    const { onPress, buttonName, iconName, iconType, iconStyle } = this.props;
    return (
      <TouchableOpacity style={button} onPress={onPress}>
        <View style={iconStyle}>
          <Icon type={iconType} name={iconName} style={iconStyle} />
        </View>
        <View>
          <Text style={buttonText}>{buttonName}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: 7
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

export { ButtonWithIcon };
