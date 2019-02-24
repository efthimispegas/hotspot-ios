import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';

import SplashScreen from './SplashScreen';
import { Button, Colors, Spinner } from '../../common';
import { ACCESS_TOKEN } from '../../actions/types';

class WelcomeScreen extends Component {
  state = {
    isLoading: true,
    //starting point of button's state (we don't see it)
    opacity: new Animated.Value(0),
    position: new Animated.Value(0)
  };

  async componentDidMount() {
    const token = await this.getToken();
    console.log('===============');
    console.log('[WelcomeScreen]:', token);
    console.log('===============');
    if (token) {
      this.props.getUser(token);
      Actions.main({ type: 'replace' });
      return;
    } else {
      this.setState({ isLoading: false });
      this._addOpacityAnimation();
      this._addTransitionAnimation();
    }
  }

  async getToken() {
    try {
      const token = await AsyncStorage.getItem(ACCESS_TOKEN);
      return token;
    } catch (error) {
      throw error;
    }
  }

  _addOpacityAnimation = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 2000
    }).start();
  };

  _addTransitionAnimation = () => {
    Animated.timing(this.state.position, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true
    }).start();
  };

  render() {
    if (this.state.isLoading) {
      return (
        <Image
          source={require('../../../assets/splash.png')}
          style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
        />
      );
    }
    const { opacity, position } = this.state;
    const translateTitle = position.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 0]
    });
    const translateSubtitle = position.interpolate({
      inputRange: [0, 1],
      outputRange: [-45, 0]
    });
    const translateStreet = position.interpolate({
      inputRange: [0, 1],
      outputRange: [-36, 0]
    });
    return (
      <View style={styles.welcomeMainContainer}>
        <Animated.View
          style={[
            styles.welcomeTitleContainer,
            { transform: [{ translateY: translateTitle }] }
          ]}
        >
          <Text style={styles.welcomeTitleText}>Welcome to Hotspot .</Text>
        </Animated.View>

        <Animated.View
          style={{
            opacity,
            flex: 0.5,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Image
            source={require('../../../assets/images/hotspot-logo.png')}
            style={styles.hotspotLogo}
          />
        </Animated.View>

        <Animated.Image
          source={require('../../../assets/images/street.png')}
          style={[
            styles.imageContainer,
            { transform: [{ translateY: translateStreet }] }
          ]}
        />

        <View style={styles.welcomeBottomContainer}>
          <Animated.View
            style={[
              styles.welcomeSubtitleContainer,
              { transform: [{ translateY: translateSubtitle }] }
            ]}
          >
            <Text style={styles.welcomeSubtitle1Text}>
              See where the fun is before going out.
            </Text>
            <Text style={styles.welcomeSubtitle2Text}>So simple.</Text>
          </Animated.View>

          <Animated.View style={[styles.buttonContainer, { opacity }]}>
            <Button name="Get started!" onPress={() => Actions.register()} />
          </Animated.View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcomeMainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.hotspotColor
  },
  welcomeTitleContainer: {
    marginTop: 100,
    marginBottom: 30,
    marginHorizontal: 20
  },
  welcomeTitleText: {
    fontFamily: 'montserratLight',
    fontSize: 28,
    color: 'white',
    alignSelf: 'center'
  },
  imageContainer: {
    height: '8%',
    width: '100%',
    resizeMode: 'stretch'
  },

  hotspotLogoContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  hotspotLogo: {
    marginTop: 10,
    height: 180,
    width: 180
  },
  welcomeBottomContainer: {
    marginHorizontal: 20
  },
  welcomeSubtitleContainer: {
    marginTop: 10
  },
  welcomeSubtitle1Text: {
    fontFamily: 'montserratLight',
    fontSize: 14,
    color: 'white',
    alignSelf: 'center'
  },
  welcomeSubtitle2Text: {
    fontFamily: 'montserratLightItalic',
    fontSize: 14,
    color: 'white',
    alignSelf: 'center'
  },
  buttonContainer: {
    alignItems: 'stretch',
    marginTop: 69,
    marginBottom: 10
  },
  signInButtonContainer: {
    alignItems: 'stretch',
    marginTop: 10
  }
});

const mapStoreToProps = store => {
  return {
    user: null //<------------------
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: bindActionCreators(actions.getUser, dispatch)
  };
};
export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(WelcomeScreen);
