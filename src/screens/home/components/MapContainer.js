import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, {
  Marker,
  Callout,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT
} from 'react-native-maps';

import { Colors } from '../../../common';
import SearchBar from './SearchBar';
import SearchSuggestionsList from './SearchSuggestionsList';

const x1 = require('../../../../assets/flames/1.png');
const x2 = require('../../../../assets/flames/2.png');
const x3 = require('../../../../assets/flames/3.png');
const x4 = require('../../../../assets/flames/4.png');
const flames = [x1, x2, x3, x4];

const MapContainer = ({
  input,
  suggestions,
  getSearchInput,
  getSearchSuggestions,
  getSelectedVenue,
  toggleSearchSuggestionsList,
  region,
  selectedVenue,
  state,
  _onRegionChange,
  _onRegionChangeComplete,
  _handleMarkerPress
}) => {
  const { currentPosition, mapRegion, markers } = state;
  //check whether there's a selected address if not assign empty obj
  console.log('===============');
  console.log('suggestions:', suggestions);
  console.log('===============');

  return (
    <View style={styles.mainContainer}>
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: currentPosition.latitude,
          latitudeDelta: 0,
          longitude: currentPosition.longitude,
          longitudeDelta: 0.018
        }}
        region={mapRegion}
        onRegionChange={_onRegionChange}
        onRegionChangeComplete={_onRegionChangeComplete}
        showsUserLocation={true}
        followsUserLocation={true}
        style={styles.mapContainer}
      >
        {markers.map((marker, id) => (
          <Marker
            key={id}
            coordinate={{ latitude: marker.lat, longitude: marker.lng }}
            title={marker.title}
            image={flames[marker.size]}
          >
            <Callout onPress={() => _handleMarkerPress(marker)}>
              <Text style={styles.text}>{marker.title}</Text>
            </Callout>
          </Marker>
        ))}
        {/* here I will add the selected address marker as follows:
          {selectedAddress &&
            ...
          }
        */}
      </MapView>
      <SearchBar
        input={input || ''}
        region={region}
        getSearchInput={getSearchInput}
        getSearchSuggestions={getSearchSuggestions}
        getSelectedVenue={getSelectedVenue}
        selectedVenue={selectedVenue || {}}
        toggleSearchSuggestionsList={toggleSearchSuggestionsList}
      />
      {suggestions && (
        <SearchSuggestionsList
          suggestions={suggestions}
          getSelectedVenue={getSelectedVenue}
          toggleSearchSuggestionsList={toggleSearchSuggestionsList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject
  }
});

export default MapContainer;
