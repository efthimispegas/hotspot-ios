import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Title, H1, H2, H3 } from 'native-base';
import { Marker, Callout } from 'react-native-maps';
import { getMarkerImage, getVenueCategory } from '../../../../helpers';

const CustomMarker = ({ isGeneral, selectedVenue, _handleVenuePress, img }) => {
  if (!isGeneral) {
    return (
      <Marker
        key={selectedVenue.id}
        coordinate={{
          latitude: selectedVenue.location.lat,
          longitude: selectedVenue.location.lng
        }}
        title={selectedVenue.name}
        image={getMarkerImage('category', getVenueCategory(selectedVenue))}
      >
        <Callout onPress={_handleVenuePress}>
          <Title>{selectedVenue.name}</Title>
          <Text>
            {selectedVenue.location.formattedAddress[0]
              ? `${selectedVenue.location.formattedAddress[0]}`
              : null}
            {selectedVenue.location.formattedAddress[1]
              ? `, ${selectedVenue.location.formattedAddress[1]}`
              : null}
          </Text>
        </Callout>
      </Marker>
    );
  }
  return (
    <Marker
      key={selectedVenue.id}
      coordinate={{
        latitude: selectedVenue.location.lat,
        longitude: selectedVenue.location.lng
      }}
      title={selectedVenue.name}
      image={img}
    >
      <Callout onPress={_handleVenuePress}>
        <Title>{selectedVenue.name}</Title>
        <Text>
          {selectedVenue.location.address
            ? `${selectedVenue.location.address}`
            : null}
          {selectedVenue.location.city
            ? `, ${selectedVenue.location.city}`
            : null}
        </Text>
      </Callout>
    </Marker>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default CustomMarker;
