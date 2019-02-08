import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Keyboard,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';
import { Container } from 'native-base';
import { Colors } from '../../common';
import { Location } from 'expo';
import MapView, { Marker, Callout } from 'react-native-maps';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LoadingScreen from '../loading/LoadingScreen';
import MapContainer from './components/MapContainer';
import { Hotspot } from '../../api';
import * as locationActions from '../../actions'; //we import it as * to use it later in the bindActionCreators()
import * as homeActions from '../../actions';

//we bind the functions to this component's instance because if not,
//the variables in each function will not refer to the component but to the window

//hardcode a hotspot id from my db for now
const fakeHotspotId = '5c54b08d231ce64440d8292a';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.watchID = null;
    this.state = {
      currentPosition: 'unknown',
      lastPosition: 'unknown',
      mapRegion: undefined,
      mapRegionInput: {},
      annotations: [],
      markers: [],
      isLoading: true,
      dimensions: {
        height: null,
        width: null
      }
    };
  }
  async componentDidMount() {
    try {
      //get the device dimensions to display the map correctly
      const { height, width } = Dimensions.get('window');
      //get user's current location, returns a Promise
      const { coords } = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
        timeout: 20000,
        timeInterval: 1000
      });
      //if coords were returned then
      //fetch current user's hotspots from the server
      if (coords) {
        let data = await Hotspot.fetchHotspots(this.props.position); //<----here we will refactor later, with loadHotspots(position, token) action
        this.props.updateLocation(coords); ////<----and we also need to call updateLocation(coords) action here [X]
        //for now we apply a views_count property to each hotspot to
        //adjust the marker's size later according to the views_count
        data.hotspots.forEach((hotspot, index) => {
          const views_count = Math.floor(Math.random() * 3);
          hotspot.views_count = views_count;
        });
        //watch last position, when the promise is resolved returns remove() function
        //then we can clear watch by calling this.watchID.remove()
        this.watchID = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 1000,
            distanceInterval: 25
          },
          ({ coords }) => {
            this.setState({
              lastPosition: {
                latitude: coords.latitude,
                longitude: coords.longitude
              }
            });
          }
        );
        this.setState({
          isLoading: false,
          annotations: data,
          currentPosition: {
            latitude: coords.latitude,
            longitude: coords.longitude
          },
          dimensions: { height, width }
        });
      }
    } catch (e) {
      console.log('ERROR', e);
      throw new Error(e);
    }
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
    console.log('===============');
    console.log('[HomeScreen] state:\n', this.state);
    console.log('===============');
    console.log('===============');
    console.log('[HomeScreen] props:\n', this.props);
    console.log('===============');
    if (this.state.isLoading) {
      return <LoadingScreen />;
    }
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <MapContainer
          getSearchInput={null}
          state={this.state}
          _onRegionChange={this._onRegionChange.bind(this)}
          _onRegionChangeComplete={this._onRegionChangeComplete.bind(this)}
          _handleMarkerPress={this._handleMarkerPress.bind(this)}
        />
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.eggWhiteColor
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

const mapStoreToProps = store => {
  return {
    hotspots: null,
    token: null,
    location: store.location
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadHotspots: null,
    openHotspot: null,
    updateLocation: bindActionCreators(
      locationActions.updateLocation,
      dispatch
    ), //same as writing updateLocation: dispatch => dispatch(updateLocation())
    searchInput: bindActionCreators(homeActions, dispatch)
  };
};

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(HomeScreen);
