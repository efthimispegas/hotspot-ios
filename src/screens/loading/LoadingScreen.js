import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  Dimensions
} from 'react-native';
import { Colors } from '../../common';

const LoadingScreen = () => {
  return (
    <View style={styles.loading}>
      {/* <ActivityIndicator size="large" /> */}
      <Image
        source={require('../../../assets/gifs/loading.gif')}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.whiteColor
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
});

export default LoadingScreen;
