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
import { InputGroup, Input } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
// import GoogleAutocomplete from 'react-native-places-autocomplete';

import { Colors } from '../../../common';

const DEBOUNCE_TIME = 1000;

const SearchBar = props => {
  const {
    region,
    getSearchInput,
    clearSearchInput,
    getSearchSuggestions,
    toggleSearchSuggestionsList,
    input
  } = props;
  const { latitude, longitude } = region;

  function _handleChangeText(input) {
    getSearchInput(input);

    if (input.length >= 4) {
      setTimeout(() => {
        getSearchSuggestions('Athens', region, false);
      }, DEBOUNCE_TIME);
    }
  }

  const _renderCloseButton = () => {
    if (input) {
      return (
        <TouchableOpacity onPress={_handleClearSearch}>
          <Ionicons
            name="ios-close-circle"
            size={20}
            color={Colors.lightGreyColor}
          />
        </TouchableOpacity>
      );
    } else {
      return;
    }
  };

  const _handleClearSearch = () => {
    clearSearchInput();
    toggleSearchSuggestionsList();
  };

  //if search button is pressed we show the all the suggestions
  const _renderSearchButton = () => {
    if (input) {
      return (
        <TouchableOpacity onPress={() => _handleSearchAll()}>
          <Image
            style={styles.searchIcon}
            resizeMode="contain"
            source={require('../../../../assets/icons/search.png')}
          />
        </TouchableOpacity>
      );
    } else {
      return;
    }
  };

  const _handleSearchAll = () => {
    Keyboard.dismiss();
    getSearchSuggestions('Athens', region, true);
    clearSearchInput();
    toggleSearchSuggestionsList();
  };

  return (
    <View style={styles.searchBar}>
      {_renderSearchButton()}
      <InputGroup style={styles.inputGroup}>
        <TextInput
          placeholder="Search a hotspot..."
          placeholderTextColor={Colors.darkGreyColor}
          selectionColor={Colors.hotspotColor}
          style={styles.inputSearch}
          onChangeText={_handleChangeText}
          onFocus={() => toggleSearchSuggestionsList()}
          value={input}
        />
        <View style={styles.buttonWrapper}>{_renderCloseButton()}</View>
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
    height: 45,
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
    flex: 1,
    alignSelf: 'baseline',
    fontFamily: 'montserratLight',
    fontSize: 20,
    paddingRight: 5,
    paddingLeft: 5,
    lineHeight: 25,
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
