import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Keyboard
} from 'react-native';
import { InputGroup } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../../../common';

const SearchBar = ({}) => {
  return (
    <View style={styles.searchBar}>
      <TouchableOpacity onPress={() => Keyboard.dismiss()}>
        <Image
          style={styles.searchIcon}
          resizeMode="contain"
          source={require('../../../../assets/icons/search.png')}
        />
      </TouchableOpacity>
      <InputGroup style={styles.inputGroup}>
        <TextInput
          placeholder="Search a hotspot..."
          placeholderTextColor={Colors.darkGreyColor}
          selectionColor={Colors.hotspotColor}
          style={styles.inputSearch}
        />
        <View style={styles.buttonWrapper}>
          <TouchableOpacity onPress={() => Keyboard.dismiss()}>
            <Ionicons
              name="ios-close-circle"
              size={20}
              color={Colors.lightGreyColor}
            />
          </TouchableOpacity>
        </View>
      </InputGroup>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    top: 20,
    position: 'absolute',
    width: Dimensions.get('window').width, //get screens full width
    height: 40,
    paddingHorizontal: 10,
    // backgroundColor: Colors.pinkColor,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  inputGroup: {
    flex: 1,
    paddingVertical: 5,
    // backgroundColor: Colors.violetColor,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: Colors.hotspotColor,
    borderRadius: 30,
    justifyContent: 'space-between'
  },
  searchIcon: {
    width: 30,
    height: 30
    // backgroundColor: Colors.greenColor
  },
  inputSearch: {
    flex: 0.8,
    fontFamily: 'montserratLight',
    fontSize: 20,
    paddingRight: 5,
    paddingLeft: 0,
    lineHeight: 20,
    color: Colors.hotspotColor
    // backgroundColor: Colors.whiteColor
  },
  buttonWrapper: {
    flex: 0.1,
    alignItems: 'center'
    // backgroundColor: Colors.greenColor
  }
});

export default SearchBar;
