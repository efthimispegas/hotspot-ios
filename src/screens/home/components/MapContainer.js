import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import MapView, {
  Marker,
  Callout,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT
} from 'react-native-maps';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import SearchBar from './SearchBar';
import SearchSuggestionsList from './SearchSuggestionsList';
import { getVenueCategory, getMarkerImage } from '../../../../helpers';
import CustomMarker from './CustomMarker';
import FloatingActionButton from './FloatingActionButton';

const MapContainer = ({
  input,
  suggestions,
  getSearchInput,
  clearSearchInput,
  getSearchSuggestions,
  getSelectedVenue,
  toggleSearchSuggestionsList,
  region,
  state,
  _onRegionChange,
  _onRegionChangeComplete,
  _handleMarkerPress,
  _handleVenuePress
}) => {
  const { currentPosition, mapRegion, markers, selectedVenue } = state;

  if (!_.isArrayLikeObject(selectedVenue)) {
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.mainContainer}>
        <MapView
          provider={PROVIDER_DEFAULT}
          initialRegion={{
            latitude: currentPosition.latitude,
            latitudeDelta: 0.223,
            longitude: currentPosition.longitude,
            longitudeDelta: 0.04
          }}
          region={mapRegion}
          onRegionChange={_onRegionChange}
          onRegionChangeComplete={_onRegionChangeComplete}
          showsUserLocation={true}
          // followsUserLocation={true}
          style={styles.mapContainer}
        >
          {markers.map((marker, id) => {
            return (
              <Marker
                key={id}
                coordinate={{ latitude: marker.lat, longitude: marker.lng }}
                title={marker.title}
                image={getMarkerImage('flame', marker.size)}
              >
                <Callout onPress={_handleMarkerPress}>
                  <Text style={styles.text}>{marker.title}</Text>
                </Callout>
              </Marker>
            );
          })}
          {selectedVenue !== null && !_.isArrayLikeObject(selectedVenue) && (
            <CustomMarker
              selectedVenue={selectedVenue}
              _handleVenuePress={_handleVenuePress}
              isGeneral={false}
              img={null}
            />
          )}

          {_.isArrayLikeObject(selectedVenue) &&
            selectedVenue.map(venue => {
              const categoryId = getVenueCategory(venue);
              const img = getMarkerImage('category', categoryId);
              return (
                <CustomMarker
                  selectedVenue={venue}
                  _handleVenuePress={_handleVenuePress}
                  isGeneral={true}
                  img={img}
                />
              );
            })}
        </MapView>
        <SearchBar
          input={input}
          region={region}
          getSearchInput={getSearchInput}
          clearSearchInput={clearSearchInput}
          getSearchSuggestions={getSearchSuggestions}
          toggleSearchSuggestionsList={toggleSearchSuggestionsList}
        />
        {input !== undefined && input !== '' && (
          <SearchSuggestionsList
            input={input}
            suggestions={suggestions}
            getSelectedVenue={getSelectedVenue}
            toggleSearchSuggestionsList={toggleSearchSuggestionsList}
            clearSearchInput={clearSearchInput}
          />
        )}
        <FloatingActionButton />
      </View>
    </TouchableWithoutFeedback>
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
