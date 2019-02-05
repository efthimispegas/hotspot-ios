import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import { Button, Colors } from '../../common';
import { Actions } from 'react-native-router-flux';

class OnboardingLogo extends Component {
  componentDidMount() {
    console.log('===============');
    console.log('[OnboardingLogo]: \n', this.props);
    console.log('===============');
    this._checkAuth();
  }

  _checkAuth = () => {
    setTimeout(() => {
      // Actions.welcome();
      Actions.replace('welcome');
    }, 1500);
  };

<<<<<<< HEAD:src/screens/welcome/OnboardingLogo.js
=======
class OnboardingLogo extends Component {
>>>>>>> 90d6ee9af269ae2de405f80e02dabd73c79b06e1:src/screens/welcome/OnboardingLogo.js
  render() {
    return (
      <View style={styles.welcomeMainContainer}>
        <View style={styles.welcomeTitleContainer}>
          <Text style={styles.welcomeTitleText}>Welcome to Hotspot .</Text>
        </View>
        <Image
          source={require('../../../assets/images/street.png')}
          style={styles.imageContainer}
        />
        <View style={styles.welcomeBottomContainer}>
          <View style={styles.welcomeSubtitleContainer}>
            <Text style={styles.welcomeSubtitle1Text}>
              See where the fun is before going out.
            </Text>
            <Text style={styles.welcomeSubtitle2Text}>So simple.</Text>
          </View>
<<<<<<< HEAD:src/screens/welcome/OnboardingLogo.js
=======
          <View style={styles.signUpButtonContainer}>
            <Button name="Check it out!" onPress={() => console.log('Join!')} />
          </View>
>>>>>>> 90d6ee9af269ae2de405f80e02dabd73c79b06e1:src/screens/welcome/OnboardingLogo.js
        </View>
      </View>
    );
  }
}
export default OnboardingLogo;

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
    marginTop: 134, //<---- delete
    height: '8%', //<---- set to 28%
    width: '100%',
    resizeMode: 'stretch'
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
  }
});
