import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';

class SplashScreen extends Component {
  componentDidMount() {
    console.log('===============');
    console.log('[OnboardingLogo]: \n', this.props);
    console.log('===============');
    this._checkAuth();
  }

  _checkAuth = () => {
    setTimeout(() => {
      //not Actions.welcome();
      //use replace when you don't want the transision efect
      Actions.replace('welcome');
    }, 1500);
  };
  render() {
    return (
      <ImageBackground
        source={require('../../../assets/hotspot-splash.png')}
        style={styles.mainContainer}
      />
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
    fontFamily: 'montserratMed',
    fontSize: 28,
    color: 'white',
    alignSelf: 'center'
  }
});
