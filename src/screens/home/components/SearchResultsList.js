import React from 'react';
import { Text, StyleSheet, Dimensions } from 'react-native';
import { List, ListItem, View, Left, Body } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../../common';

const SearchResultsList = ({}) => (
  <View style={styles.searchResultsWrapper}>
    <List>
      {/* dataArray
      renderRow={item => ( */}
      <View>
        <ListItem onPress={() => console.log('pressed')} button avatar>
          <Left style={styles.leftContainer}>
            <MaterialIcons style={styles.leftIcon} name="location-on" />
          </Left>
          <Body>
            <Text style={styles.primaryText}>Agios Antonios</Text>
            <Text style={styles.secondaryText}>
              Athens, Northwest district, 12132
            </Text>
          </Body>
        </ListItem>
        <ListItem onPress={() => console.log('pressed')} button avatar>
          <Left style={styles.leftContainer}>
            <MaterialIcons style={styles.leftIcon} name="location-on" />
          </Left>
          <Body>
            <Text style={styles.primaryText}>Agios Antonios</Text>
            <Text style={styles.secondaryText}>
              Athens, Northwest district, 12132
            </Text>
          </Body>
        </ListItem>
      </View>
      {/* )} */}
      {/* /> */}
    </List>
  </View>
);

const styles = StyleSheet.create({
  searchResultsWrapper: {
    top: 60,
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

export default SearchResultsList;
