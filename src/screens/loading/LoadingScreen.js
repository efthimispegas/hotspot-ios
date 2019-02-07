import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Colors } from '../../common';

const LoadingScreen = ({ onFinish }) => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.hotspotColor
  }
});

export default LoadingScreen;
