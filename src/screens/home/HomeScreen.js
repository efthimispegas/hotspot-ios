import React, { Component } from 'react';
import { Location } from 'expo';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Alert } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { connect } from 'react-redux';

import { Colors, HeaderComponent } from '../../common';
import LoadingScreen from '../loading/LoadingScreen';
import HotspotApi from '../../api/hotspot.api';

const x1 = require('../../../assets/flames/1.png');
const x2 = require('../../../assets/flames/2.png');
const x3 = require('../../../assets/flames/3.png');
const x4 = require('../../../assets/flames/4.png');
const flames = [x1, x2, x3, x4];

const hotspotApi = new HotspotApi();

//we bind the functions to this component's instance because if not,
//the variables in each function will not refer to the component but to the window

class HomeScreen extends Component {
  static propTypes = {};
  state = {
    currentPosition: undefined,
    mapRegion: undefined,
    mapRegionInput: {},
    annotations: [],
    markers: [],
    isLoading: true
  };
  async componentDidMount() {
    console.log('===============');
    console.log('[HomeScreen] state:\n', this.state);
    console.log('===============');
    console.log('===============');
    console.log('[HomeScreen] props:\n', this.props);
    console.log('===============');
    const { coords } = await Location.getCurrentPositionAsync();
    //fetch current user's hotspots from the server
    let data = await hotspotApi.fetchHotspots(this.props.position);
    data.hotspots.forEach((hotspot, index) => {
      const views_count = Math.floor(Math.random() * 3);
      hotspot.views_count = views_count;
    });
    //update the state
    this.setState({
      isLoading: false,
      annotations: data,
      currentPosition: coords
    });
  }

  _onRegionChange = mapRegionInput => {
    this.setState({ mapRegionInput });
  };

  _onRegionChangeComplete = mapRegionInput => {
    this.setState({
      mapRegionInput
      // annotations: this._getMarkers(),
    });
    const markers = this.state.annotations.hotspots.map((hotspot, index) => {
      const marker = {
        lat: hotspot.loc.lat,
        lng: hotspot.loc.lng,
        title: `Hotspot - ${index + 1}`,
        subtitle: hotspot.description,
        text: hotspot.text,
        size: hotspot.views_count
      };
      // console.log('===============');
      // console.log('marker created:\n', marker);
      // console.log('===============');
      return marker;
    });

    // console.log('===============');
    // console.log('map result:\n', marker);
    // console.log('===============');
    this.setState({ markers });
  };

  _handleMarkerPress = marker => {
    console.log('===============');
    console.log('marker:\n', marker);
    console.log('===============');
  };

  render() {
    if (this.state.isLoading) {
      return <LoadingScreen />;
    }
    return (
      <MapView
        initialRegion={{
          latitude: this.state.currentPosition.latitude,
          longitude: this.state.currentPosition.longitude,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221
        }}
        region={this.state.mapRegion}
        onRegionChange={this._onRegionChange.bind(this)}
        onRegionChangeComplete={this._onRegionChangeComplete.bind(this)}
        showsUserLocation={true}
        followsUserLocation={true}
        style={styles.mapContainer}
      >
        {this.state.markers.map((marker, id) => (
          <Marker
            key={id}
            coordinate={{ latitude: marker.lat, longitude: marker.lng }}
            title={marker.title}
            image={flames[marker.size]}
          >
            <Callout onPress={() => this._handleMarkerPress(marker)}>
              <Text style={styles.text}>{marker.title}</Text>
            </Callout>
          </Marker>
        ))}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.eggWhiteColor
  },
  mapContainer: {
    flex: 1
  },
  top: {
    flex: 1,
    backgroundColor: Colors.orangeColor1
  },
  screenTitle: {
    fontFamily: 'montserrat',
    fontSize: 20,
    fontWeight: '600',
    color: 'white'
  },
  bottom: {
    flex: 0.4
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    fontFamily: 'montserrat',
    fontSize: 14
  }
});

const mapStateToProps = state => {
  return {
    myHotspots: state.home.myHotspots
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMyHotspots: () => dispatch(fetchMyHotspots())
  };
};

export default HomeScreen;
