import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../common';

class LocationItem extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Text>{this.props.description}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    height: 32,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.hotspotColor,
    justifyContent: 'center'
  }
});

export default LocationItem;
