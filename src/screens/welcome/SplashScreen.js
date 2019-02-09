import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';

class SplashScreen extends Component {
  componentDidMount() {
    this._setDelay();
  }

  _setDelay = () => {
    setTimeout(() => {
      //not Actions.welcome();
      //use replace when you don't want the transision efect
      Actions.replace('welcome');
    }, 3000);
  };
  render() {
    return (
      <ImageBackground
        source={require('../../../assets/splash.png')}
        style={styles.mainContainer}
      >
        <View style={styles.welcomeTitleContainer}>
          <Text style={styles.welcomeTitleText}>Welcome to Hotspot .</Text>
        </View>
        <View style={styles.welcomeSubtitleContainer}>
          <Text style={styles.welcomeSubtitle1Text}>
            See where the fun is before going out.
          </Text>
          <Text style={styles.welcomeSubtitle2Text}>So simple.</Text>
        </View>
      </ImageBackground>
    );
  }
}

export default SplashScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  welcomeTitleContainer: {
    marginTop: 200,
    marginBottom: 30,
    marginHorizontal: 20
  },
  welcomeTitleText: {
    fontFamily: 'montserratLight',
    fontSize: 28,
    color: 'white',
    alignSelf: 'center'
  },
  welcomeSubtitleContainer: {
    marginTop: 60
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
  }
});
