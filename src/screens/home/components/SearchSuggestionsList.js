import React from 'react';
import { Text, StyleSheet, Dimensions, Keyboard } from 'react-native';
import { List, ListItem, View, Left, Body } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../../common';

const SearchSuggestionsList = ({
  suggestions,
  getSelectedVenue,
  toggleSearchSuggestionsList
}) => {
  function handleSelectedVenue(placeId) {
    getSelectedVenue(placeId);
    toggleSearchSuggestionsList();
  }

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
                <MaterialIcons style={styles.leftIcon} name="location-on" />
              </Left>
              <Body>
                <Text style={styles.primaryText}>{suggestion.name}</Text>
                <Text style={styles.secondaryText}>
                  {suggestion.location.address}
                  {suggestion.location.crossStreet ? ',' : ''}
                  {suggestion.location.crossStreet}
                  {suggestion.location.postalCode ? ',' : ''}
                  {suggestion.location.postalCode}
                </Text>
              </Body>
            </ListItem>
          </View>
        )}
      />
    </View>
  );
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
  }
});

export default SearchSuggestionsList;
