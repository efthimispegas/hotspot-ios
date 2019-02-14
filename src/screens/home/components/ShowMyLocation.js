import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { Colors } from '../../../common';

const ShowMyLocation = ({ getMyLocation, region }) => {
  const _handlePressIn = () => {
    getMyLocation(true);
  };
  const _handlePressOut = () => {
    setTimeout(() => {
      getMyLocation(false);
    }, 1000);
  };

  return (
    <View style={styles.buttonWrapper}>
      <TouchableOpacity onPressIn={_handlePressIn} onPressOut={_handlePressOut}>
        <Image
          source={require('../../../../assets/icons/findmylocation.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    position: 'absolute',
    top: Dimensions.get('window').height - 80,
    right: Dimensions.get('window').width - 80,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.whiteColor
  },
  button: {}
});

export default ShowMyLocation;
