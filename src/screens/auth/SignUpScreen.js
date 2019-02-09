import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import Expo, { Permissions, Location, AR } from 'expo';
import { Actions } from 'react-native-router-flux';

import SignUpForm from './components/SignUpForm';

class SignUpScreen extends Component {
  state = {
    username: '',
    email: '',
    city: '',
    password1: '',
    password2: '',
    isLoading: false
  };

  componentDidMount() {}

  _handleChangeEmail = email => {
    this.setState({ email });
  };
  _handleChangePassword1 = password1 => {
    this.setState({ password1 });
  };
  _handleChangePassword2 = password2 => {
    this.setState({ password2 });
  };

  _handleChangeUsername = username => {
    this.setState({ username });
  };

  _handleChangeCity = city => {
    this.setState({ city });
  };

  _handleDone = () => {
    this._confirmPasswordMatch();
  };

  _confirmPasswordMatch = () => {
    const { password1, password2 } = this.state;

    if (password1 !== password2) {
      Alert.alert('Try again', 'Please make sure your passwords match!');
      return;
    } else {
      //passwords is match
      this.setState({ isLoading: true });
      this._enableServicesAsync();
    }
  };

  _handleSubmit = () => {
    Actions.main({ type: 'replace' });
  };

  _handleARCamera = () => {
    if (!AR.isAvailable()) {
      Alert.alert(
        'Entering a unique experience!',
        'In order to present to you the AR feature you need to have a version of iOS 11 or higher.',
        [{ text: 'OK', onPress: () => this.props.navigator.pop() }],
        { cancelable: true }
      );
    }
    this._askCameraPermissionsAsync();
  };

  _askCameraPermissionsAsync = async () => {
    const { status, permissions } = await Permissions.askAsync(
      Permissions.CAMERA
    );
    if (status === 'denied') {
      Alert.alert(
        'Oh, bummer...',
        "Can't do anything without permission. Allow Hotspot to use your Camera to proceed."
      );
    } else {
      this.props.navigator.push({
        title: 'AR Camera',
        component: ARScreen
      });
    }
  };

  render() {
    return (
      <SignUpForm
        state={this.state}
        _handleChangePassword1={this._handleChangePassword1.bind(this)}
        _handleChangePassword2={this._handleChangePassword2.bind(this)}
        _handleChangeEmail={this._handleChangeEmail.bind(this)}
        _handleChangeCity={this._handleChangeCity.bind(this)}
        _handleChangeUsername={this._handleChangeUsername.bind(this)}
        _handleDone={this._handleDone.bind(this)}
      />
    );
  }

  /**
   * Permissions for Location must be performed individually
   * on iOS for the process to complete and return successfully
   * */

  async _enableServicesAsync() {
    //check whether location services is enabled on the client device
    if (!(await Location.hasServicesEnabledAsync())) {
      //prompt user to enable Location Services to use the app
      Alert.alert(
        'Hmm, houston we have a problem!',
        'Looks like you have Location Services disabled. To continue you must enable it.'
      );
    } else {
      this._askLocationPermissionsAsync();
    }
  }

  async _askLocationPermissionsAsync() {
    const { status, permissions } = await Permissions.askAsync(
      Permissions.LOCATION
    );
    //check if permission to use location is granted
    if (status === 'denied') {
      Alert.alert(
        'Access Denied!',
        'Hotspot requires permission to use your current location'
      );
    } else {
      this.setState({ isLoading: false });

      //then submit form and store the user's current location
      this._handleSubmit();
    }
  }
}

export default SignUpScreen;
