import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { Container } from 'native-base';
import { Colors } from '../../common';
import { Location } from 'expo';
import MapView, { Marker, Callout } from 'react-native-maps';
import geolib from 'geolib';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LoadingScreen from '../loading/LoadingScreen';
import MapContainer from './components/MapContainer';
import { Hotspot } from '../../api';
import * as actions from '../../actions'; //we import it as * to use it later in the bindActionCreators()
import { Actions } from 'react-native-router-flux';

//we bind the functions to this component's instance because if not,
//the variables in each function will not refer to the component but to the window

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.watchID = null;
    this.state = {
      isFirstLoad: true,
      currentPosition: 'unknown',
      lastPosition: 'unknown',
      mapRegion: undefined,
      mapRegionInput: undefined,
      isLoading: true,
      selectedVenue: null,
      error: null
    };
  }
  async componentDidMount() {
    this._getMarkers();
    this.setState({ isFirstLoad: false });
  }

  //determines whether a change in props or state should trigger a re-render
  //returns true or false correspondingly
  async shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.hotspots !== this.props.hotspots ||
      nextState.currentPosition !== this.state.currentPosition ||
      nextState.selectedVenue !== this.state.selectedVenue ||
      nextProps.input !== this.props.input ||
      nextProps.suggestions !== this.props.suggestions ||
      nextProps.recommendations !== this.props.recommendations ||
      nextProps.showMyLocation !== this.props.showMyLocation
    ) {
      return true;
    }
    return false;
  }

  //called when component may be receiving new props, make sure to check nextProps and existing state
  componentWillReceiveProps(nextProps) {
    //create an array with the selected venue(s) and
    //change the state to re-render with the venues
    let venues = [];
    if (
      nextProps.isVenueSelected &&
      nextProps.isVenueSelected !== undefined &&
      this.state.selectedVenue !== [] &&
      this.state.selectedVenue !== nextProps.selectedVenue
    ) {
      if (nextProps.selectedVenue.length > 1)
        venues = [...nextProps.selectedVenue];
      else venues = nextProps.selectedVenue;
      this.setState({ selectedVenue: venues });
    }
    // console.log('===============');
    // console.log('venues to be rendered in next re-render:', venues);
    // console.log('===============');
    let hotspots = [];
    //here we will check if the hotspots change, to re-render
  }

  async _getMarkers() {
    try {
      //get user's current location, returns a Promise
      const { coords } = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
        timeout: 20000,
        timeInterval: 1000
      });

      //if coords were returned then
      //fetch hotspots within radius from the server
      if (coords) {
        this.props.updateLocation(coords);
        //load hotspots to the specific coords
        await this.props.loadHotspots(coords);
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
          isFirstLoad: false,
          annotations: this.props.hotspots,
          currentPosition: {
            latitude: coords.latitude,
            longitude: coords.longitude
          }
        });
      }
    } catch (e) {
      console.log('ERROR', e.message);
      Alert.alert(
        'Error!',
        'Network connection failed.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => Actions.reset('overlay')
          }
        ]
        // { cancelable: true }
      );
      throw new Error(e.message);
    }
  }

  _onRegionChange = mapRegionInput => {
    this.setState({ mapRegionInput });
  };

  _onRegionChangeComplete = mapRegionInput => {
    this.setState({
      mapRegionInput
    });
    if (this.props.last4sqCall && this.props.last4sqCall !== null) {
      //fetch recommendations for the region that is shown now
      //only if there has been a request
      this.props.fetchRecommendations(mapRegionInput, this.props.lookingFor);
    }
    //when the region changes, reload
    this.props.loadHotspots(mapRegionInput);
  };

  _handleMarkerPress = marker => {
    console.log('===============');
    console.log('marker:\n', marker.nativeEvent);
    console.log('===============');
  };
  _handleVenuePress = venue => {
    console.log('===============');
    console.log('venue:\n', venue);
    console.log('===============');
  };

  render() {
    if (this.state.isLoading) {
      return <LoadingScreen />;
    }
    // console.log('===============');
    // console.log('[HomeScreen] props:', this.props);
    // console.log('===============');
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <MapContainer
          {...this.props}
          state={this.state}
          _onRegionChange={this._onRegionChange}
          _onRegionChangeComplete={this._onRegionChangeComplete}
          _handleMarkerPress={this._handleMarkerPress}
          _handleVenuePress={this._handleVenuePress}
        />
      </TouchableWithoutFeedback>
    );
  }

  componentWillUnmount() {
    this.watchID.remove();
  }
}

const mapStoreToProps = store => {
  return {
    hotspots: store.hotspots.markers,
    token: null, //<-------------------------fill them
    region: store.location.region,
    showMyLocation: store.location.showMyLocation,
    input: store.home.input,
    suggestions: store.home.suggestions,
    selectedVenue: store.home.selectedVenue,
    isVenueSelected: store.home.isVenueSelected,
    lookingFor: store.menu.lookingFor,
    recommendations: store.menu.recommendations,
    last4sqCall: store.menu.last4sqCall
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadHotspots: bindActionCreators(actions.loadHotspots, dispatch), //<---------------------
    openHotspot: null, //<----------------------fill them
    updateLocation: bindActionCreators(actions.updateLocation, dispatch),
    getMyLocation: bindActionCreators(actions.getMyLocation, dispatch),
    getSearchInput: bindActionCreators(actions.getSearchInput, dispatch),
    clearSearchInput: bindActionCreators(actions.clearSearchInput, dispatch),
    getSearchSuggestions: bindActionCreators(
      actions.getSearchSuggestions,
      dispatch
    ),
    toggleSearchSuggestionsList: bindActionCreators(
      actions.toggleSearchSuggestionsList,
      dispatch
    ),
    getSelectedVenue: bindActionCreators(actions.getSelectedVenue, dispatch),
    fetchRecommendations: bindActionCreators(
      actions.fetchRecommendations,
      dispatch
    ),
    clearRecommendations: bindActionCreators(
      actions.clearRecommendations,
      dispatch
    )
  };
};

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(HomeScreen);
