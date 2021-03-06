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

import {
  CustomHotspotMarker,
  CustomVenueMarker,
  SearchBar,
  SearchSuggestionsList,
  ShowMyLocation,
  FloatingActionButton
} from './';
import { getVenueCategory, getMarkerImage } from '../../../../helpers';

const MapContainer = ({
  input,
  hotspots,
  user,
  suggestions,
  recommendations,
  getSearchInput,
  clearSearchInput,
  getSearchSuggestions,
  getSelectedVenue,
  toggleSearchSuggestionsList,
  region,
  getMyLocation,
  showMyLocation,
  state,
  _onRegionChange,
  _onRegionChangeComplete,
  _handleMarkerPress,
  _handleVenuePress
}) => {
  const { currentPosition, markers, selectedVenue } = state;
  let { mapRegion } = state;

  //if the "show my location" button is pressed
  //we reset the mapview to show the user's location
  if (showMyLocation) {
    mapRegion = {
      latitude: currentPosition.latitude,
      latitudeDelta: 0.00922 * 0.8,
      longitude: currentPosition.longitude,
      longitudeDelta: 0.00421
    };
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.mainContainer}>
        <MapView
          provider={PROVIDER_DEFAULT}
          initialRegion={{
            latitude: currentPosition.latitude,
            latitudeDelta: 0.00922 * 0.8,
            longitude: currentPosition.longitude,
            longitudeDelta: 0.00421
          }}
          region={mapRegion}
          onRegionChange={_onRegionChange}
          onRegionChangeComplete={_onRegionChangeComplete}
          showsUserLocation={true}
          showsCompass={false}
          followsUserLocation={false}
          style={styles.mapContainer}
        >
          {/* Here we map the hotspots */}
          {hotspots.map(marker => {
            return (
              <CustomHotspotMarker
                key={marker._id}
                hotspot={marker}
                user={user.info}
                _handleMarkerPress={_handleMarkerPress}
              />
            );
          })}
          {/* Here we show the single selected venue */}
          {selectedVenue !== null && !_.isArrayLikeObject(selectedVenue) && (
            <CustomVenueMarker
              selectedVenue={selectedVenue}
              _handleVenuePress={_handleVenuePress}
              isGeneral={false}
              img={null}
            />
          )}
          {/* Here we map the general selected venues */}
          {_.isArrayLikeObject(selectedVenue) &&
            selectedVenue.map(venue => {
              const categoryId = getVenueCategory(venue);
              const img = getMarkerImage('category', categoryId);
              return (
                <CustomVenueMarker
                  key={venue.id}
                  selectedVenue={venue}
                  _handleVenuePress={_handleVenuePress}
                  isGeneral={true}
                  img={img}
                />
              );
            })}
          {/* Here we map the menu recommendations */}
          {recommendations &&
            _.isArrayLikeObject(recommendations) &&
            recommendations.map(({ venue }) => {
              const categoryId = getVenueCategory(venue);
              const img = getMarkerImage('category', categoryId);
              return (
                <CustomVenueMarker
                  key={venue.id}
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
        <ShowMyLocation getMyLocation={getMyLocation} region={region} />
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
