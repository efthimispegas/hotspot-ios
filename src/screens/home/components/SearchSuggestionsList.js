import React from 'react';
import { Text, StyleSheet, Dimensions, Keyboard, Image } from 'react-native';
import { List, ListItem, View, Left, Body } from 'native-base';
import _ from 'lodash';

import { Colors } from '../../../common';

const SearchSuggestionsList = ({
  input,
  suggestions,
  getSelectedVenue,
  toggleSearchSuggestionsList,
  clearSearchInput
}) => {
  function handleSelectedVenue(placeId) {
    getSelectedVenue(placeId);
    toggleSearchSuggestionsList();
    clearSearchInput();
  }
  if (input.length > 3 && _.isArrayLikeObject(suggestions)) {
    return (
      <View style={styles.searchResultsWrapper}>
        <List
          onScroll={() => Keyboard.dismiss()}
          dataArray={suggestions}
          renderRow={suggestion => (
            <View key={suggestion.id}>
              <ListItem
                activeOpacity={0.9}
                onPress={() => handleSelectedVenue(suggestion.id)}
                button
                avatar
              >
                <Left style={styles.leftContainer}>
                  <Image
                    source={require('../../../../assets/icons/location-on.png')}
                    style={{ width: 24, height: 24 }}
                  />
                </Left>
                <Body>
                  <Text style={styles.primaryText}>{suggestion.name}</Text>
                  <Text style={styles.secondaryText}>
                    {suggestion.location.address
                      ? suggestion.location.address
                      : null}
                    {suggestion.location.city
                      ? `, ${suggestion.location.city}`
                      : null}
                    {suggestion.location.postalCode
                      ? `, ${suggestion.location.postalCode}`
                      : null}
                  </Text>
                </Body>
              </ListItem>
            </View>
          )}
        />
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  searchResultsWrapper: {
    top: 65,
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    paddingHorizontal: 10,
    backgroundColor: Colors.faintWhiteColor
  },
  primaryText: {
    fontFamily: 'montserratBold',
    fontWeight: 'bold',
    color: Colors.blackColor
  },
  secondaryText: {
    fontFamily: 'montserratLightItalic',
    color: Colors.darkGreyColor
  },
  leftContainer: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    borderLeftColor: Colors.darkGreyColor
  },
  leftIcon: {
    fontSize: 20,
    color: Colors.darkGreyColor
  },
  distance: {
    fontSize: 12
  },
  noResults: {
    alignSelf: 'center',
    fontFamily: 'montserratItalic',
    fontSize: 22,
    color: Colors.blackColor
  }
});

export default SearchSuggestionsList;
