import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_DEFAULT } from 'react-native-maps';

import { Colors } from '../../../common';

const x1 = require('../../../../assets/flames/1.png');
const x2 = require('../../../../assets/flames/2.png');
const x3 = require('../../../../assets/flames/3.png');
const x4 = require('../../../../assets/flames/4.png');
const flames = [x1, x2, x3, x4];

const MapContainer = ({
  state,
  _onRegionChange,
  _onRegionChangeComplete,
  _handleMarkerPress
}) => {
  const { dimensions, currentPosition, mapRegion, markers } = state;
  return (
    <View style={{ width: dimensions.width, height: dimensions.height }}>
      <MapView
        provider={PROVIDER_DEFAULT}
        initialRegion={{
          latitude: currentPosition.latitude,
          longitude: currentPosition.longitude,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221
        }}
        region={mapRegion}
        onRegionChange={_onRegionChange}
        onRegionChangeComplete={_onRegionChangeComplete}
        showsUserLocation={true}
        followsUserLocation={true}
        style={[
          styles.mapContainer,
          { width: dimensions.width, height: dimensions.height }
        ]}
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
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.eggWhiteColor
  },
  mapContainer: {},
  top: {
    flex: 1,
    backgroundColor: Colors.orangeColor1
  }
});

export default MapContainer;
