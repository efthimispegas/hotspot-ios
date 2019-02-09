import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SearchBar from './components/SearchBar';
import { Colors } from '../../common';
import SearchResultsList from './components/SearchPredictionsList';

class TestScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SearchBar />
        <SearchResultsList />
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
