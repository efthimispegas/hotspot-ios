import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../common';
import FloatingActionButton from './components/FloatingActionButton';

class TestScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FloatingActionButton />
      </View>
    );
  }
}
export default TestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.faintHotspotColor
  }
});
