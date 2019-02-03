import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

const Spinner = ({ size }) => {
  const { spinner } = styles;
  return (
    <View style={spinner}>
      <ActivityIndicator size={size || 'large'} />
    </View>
  );
};

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export { Spinner };
