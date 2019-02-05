import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Animated } from 'react-native';

import { Button, Colors } from '../../common';
import { Actions } from 'react-native-router-flux';

class WelcomeScreen extends Component {
  componentDidMount() {
    // this._checkAuth();
  }

  _checkAuth = () => {
    setTimeout(() => {
      Actions.login();
    }, 1500);
  };

  render() {
    return (
      <View style={styles.welcomeMainContainer}>
        <Animated.View style={styles.welcomeTitleContainer}>
          <Text style={styles.welcomeTitleText}>Welcome to Hotspot .</Text>
        </Animated.View>

        <Animated.View style={styles.hotspotLogoContainer}>
          <Image
            source={require('../../../assets/images/hotspot-logo.png')}
            style={styles.hotspotLogo}
          />
        </Animated.View>

        <Animated.Image
          //----> require('../../../assets/images/welcome2.png')
          source={require('../../../assets/images/street.png')}
          style={styles.imageContainer}
        />

        <View style={styles.welcomeBottomContainer}>
          <Animated.View style={styles.welcomeSubtitleContainer}>
            <Text style={styles.welcomeSubtitle1Text}>
              See where the fun is before going out.
            </Text>
            <Text style={styles.welcomeSubtitle2Text}>So simple.</Text>
          </Animated.View>

          <Animated.View style={styles.buttonContainer}>
            <Button
              name="Check it out!"
              onPress={() => Actions.replace('onboarding')}
            />
          </Animated.View>
        </View>
      </View>
    );
  }
}
export default WelcomeScreen;

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
    fontFamily: 'montserratMed',
    fontSize: 28,
    color: 'white',
    alignSelf: 'center'
  },
  imageContainer: {
    height: '8%', //<---- set to 28%
    width: '100%',
    resizeMode: 'stretch'
  },

  hotspotLogoContainer: {
    flex: 0.5,
    // backgroundColor: Colors.violetColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  hotspotLogo: {
    marginTop: 10,
    // backgroundColor: Colors.pinkColor,
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
    fontFamily: 'montserratMed',
    fontSize: 14,
    color: 'white',
    alignSelf: 'center'
  },
  welcomeSubtitle2Text: {
    fontFamily: 'montserratMedItalic',
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
