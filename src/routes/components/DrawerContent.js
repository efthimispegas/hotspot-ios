import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  ViewPropTypes,
  TouchableOpacity
} from 'react-native';
import { Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions';
import { Colors, CardSection } from '../../common';

const API_DEBOUNCE_TIME = 2000;

class DrawerContent extends Component {
  static propTypes = {
    name: PropTypes.string,
    sceneStyle: ViewPropTypes.style,
    title: PropTypes.string
  };

  static contextTypes = {
    drawer: PropTypes.object
  };

  state = {
    position: null,
    region: null,
    mapRegion: undefined,
    gpsAccuracy: null,
    recommendations: [],
    lookingFor: null,
    headerLocation: null,
    last4sqCall: null
  };

  onTopicSelect(lookingFor) {
    if (!this.shouldFetchVenues(lookingFor)) {
      return;
    }

    this.props.fetchRecommendations(this.props.region, lookingFor);
    Actions.drawerClose();
  }

  shouldFetchVenues(lookingFor) {
    if (this.props.last4sqCall) {
      let { last4sqCall } = this.props;
      return (
        lookingFor != this.props.lookingFor ||
        last4sqCall === null ||
        new Date() - last4sqCall > API_DEBOUNCE_TIME
      );
    } else {
      //this will happen the first time the app loads
      let last4sqCall = null;
      return (
        lookingFor != this.props.lookingFor ||
        last4sqCall === null ||
        new Date() - last4sqCall > API_DEBOUNCE_TIME
      );
    }
  }

  onClearPress = () => {
    this.props.clearRecommendations();
    this.props.clearSelectedVenue();
    Actions.drawerClose();
  };

  render() {
    return (
      <View style={styles.drawerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>What's the mood?</Text>
        </View>

        <View style={styles.topicsContainer}>
          <Button
            transparent
            style={styles.topic}
            onPress={() => this.onTopicSelect('coffee')}
          >
            <Ionicons name="ios-cafe" size={32} color={Colors.hotspotColor} />
            <Text style={styles.name}>C o f f e e</Text>
          </Button>

          <Button
            transparent
            style={styles.topic}
            onPress={() => this.onTopicSelect('food')}
          >
            <Ionicons
              name="ios-restaurant"
              size={32}
              color={Colors.hotspotColor}
            />
            <Text style={[styles.name, { paddingStart: 10 }]}>F o o d</Text>
          </Button>

          <Button
            transparent
            style={styles.topic}
            onPress={() => this.onTopicSelect('drink')}
          >
            <Entypo name="drink" size={32} color={Colors.hotspotColor} />
            <Text style={styles.name}>D r i n k s</Text>
          </Button>

          <Button
            transparent
            style={styles.topic}
            onPress={() => this.onTopicSelect('shopping')}
          >
            <FontAwesome
              name="shopping-bag"
              size={32}
              color={Colors.hotspotColor}
            />
            <Text style={styles.name}>S h o p p i n g</Text>
          </Button>

          <Button
            transparent
            style={styles.topic}
            onPress={() => this.onTopicSelect('sights')}
          >
            <Entypo name="location" size={32} color={Colors.hotspotColor} />
            <Text style={styles.name}>S i g h t s</Text>
          </Button>

          <Button
            transparent
            style={styles.topic}
            onPress={() => this.onTopicSelect('arts')}
          >
            <Ionicons
              name="ios-color-palette"
              size={32}
              color={Colors.hotspotColor}
            />
            <Text style={[styles.name, { paddingStart: 10 }]}>A r t s</Text>
          </Button>

          <Button transparent onPress={this.onClearPress} style={styles.topic}>
            <Text style={styles.reset}>Clear</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: Colors.lightGreyColor,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 0,
    borderColor: Colors.hotspotColor
  },
  titleContainer: {
    backgroundColor: Colors.pinkColor,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: StyleSheet.hairlineWidt,
    borderBottomColor: Colors.hotspotColor
  },
  title: {
    fontFamily: 'montserrat',
    fontSize: 22,
    color: Colors.hotspotColor
  },
  topicsContainer: {
    flex: 1,
    paddingHorizontal: 20
  },
  topic: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10
  },
  name: {
    fontFamily: 'montserrat',
    fontSize: 18,
    color: Colors.hotspotColor,
    marginLeft: 50
  },
  reset: {
    fontFamily: 'montserrat',
    fontSize: 18,
    color: Colors.hotspotColor,
    marginTop: 10,
    marginLeft: 85
  }
});

const mapStoreToProps = store => {
  return {
    region: store.location.region,
    lookingFor: store.menu.lookingFor,
    // last4sqCall: store.menu.recommendations.last4sqCall,
    recommendations: store.menu.recommendations
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchRecommendations: bindActionCreators(
      actions.fetchRecommendations,
      dispatch
    ),
    clearRecommendations: bindActionCreators(
      actions.clearRecommendations,
      dispatch
    ),
    clearSelectedVenue: bindActionCreators(actions.clearSelectedVenue, dispatch)
  };
};

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(DrawerContent);
