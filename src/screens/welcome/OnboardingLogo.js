import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import { Button, Colors } from '../../common';

class OnboardingLogo extends Component {
  render() {
    return (
      <View style={styles.welcomeMainContainer}>
        <View style={styles.welcomeTitleContainer}>
          <Text style={styles.welcomeTitleText}>Welcome to Hotspot .</Text>
        </View>
        <Image
          source={require('../../../assets/images/welcome1.png')}
          style={styles.imageContainer}
        />
        <View style={styles.welcomeBottomContainer}>
          <View style={styles.welcomeSubtitleContainer}>
            <Text style={styles.welcomeSubtitle1Text}>
              See where the fun is before going out.
            </Text>
            <Text style={styles.welcomeSubtitle2Text}>So simple.</Text>
          </View>
          <View style={styles.signUpButtonContainer}>
            <Button name="Check it out!" onPress={() => console.log('Join!')} />
          </View>
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
    marginTop: 100, //<---- delete
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
  },
  signUpButtonContainer: {
    alignItems: 'stretch',
    marginTop: 100,
    marginBottom: 10
  },
  signInButtonContainer: {
    alignItems: 'stretch',
    marginTop: 10
  }
});
