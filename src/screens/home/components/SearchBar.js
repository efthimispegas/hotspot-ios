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
// import GoogleAutocomplete from 'react-native-places-autocomplete';

import { Colors } from '../../../common';
import { API_KEY } from '../../../config';
import { toggleSearchSuggestionsList } from '../../../actions';

const baseUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?';
const FOURSQUARE_ENDPOINT = 'https://api.foursquare.com/v2/venues/explore';
const API_DEBOUNCE_TIME = 2000;

const SearchBar = props => {
  const {
    region,
    getSearchInput,
    getSearchSuggestions,
    selectedVenue,
    input
  } = props;
  const { latitude, longitude } = region;

  const _handleChangeText = input => {
    getSearchInput(input);
    getSearchSuggestions(input, 'Athens', region);
  };

  const _handleClearSearch = () => {
    getSearchInput('');
    toggleSearchSuggestionsList();
  };

  const _renderButton = text => {
    if (text.length !== 0) {
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
          onChangeText={input => _handleChangeText(input)}
          onFocus={() => toggleSearchSuggestionsList()}
          value={input}
        />
        <View style={styles.buttonWrapper}>{_renderButton(input)}</View>
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
    color: Colors.hotspotColor,
    backgroundColor: Colors.whiteColor
  },
  buttonWrapper: {
    flex: 0.1,
    alignItems: 'center'
    // backgroundColor: Colors.greenColor
  }
});

export default SearchBar;
