import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList
} from 'react-native';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';

import { API_KEY } from '../../../config/apiKey';
import { Colors } from '../../../common';
import LocationItem from './LocationItem';

class SearchBox extends Component {
  state = {
    location: ''
  };
  render() {
    return (
      <View style={styles.mainContainer}>
        <GoogleAutoComplete apiKey={API_KEY} debounce={300} minLength={3}>
          {({
            inputValue,
            handleTextChange,
            locationResults,
            fetchDetails
          }) => (
            <React.Fragment>
              {console.log('===============\n', locationResults)}
              <View style={styles.input}>
                <TextInput
                  style={styles.text}
                  selectionColor={Colors.hotspotColor}
                  placeholder="Search a hotspot..."
                  onChangeText={handleTextChange}
                  value={inputValue}
                />
              </View>
              <ScrollView style={[styles.listContainer, { maxHeight: 100 }]}>
                {locationResults.map((item, id) => {
                  console.log(item);
                  return <LocationItem {...item} key={String(i)} />;
                })}
              </ScrollView>
            </React.Fragment>
          )}
        </GoogleAutoComplete>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: 300,
    marginTop: 10,
    borderWidth: 0.6,
    borderRadius: 30,
    borderColor: Colors.faintWhiteColor,
    paddingHorizontal: 16,
    backgroundColor: Colors.faintWhiteColor
  },
  text: {
    fontFamily: 'montserratExtraLight',
    fontSize: 16,
    color: Colors.darkGreyColor
  },
  listContainer: {
    marginTop: 20,
    backgroundColor: Colors.faintedWhiteColor
  }
});

export default SearchBox;
