import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  StyleSheet,
  Alert
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Expo, { Permissions, Location } from 'expo';

import LoginForm from './components/LoginForm';

class LoginScreen extends Component {
  state = {
    isLoading: false,
    username: '',
    password: '',
    email: ''
  };

  _handleChangePassword = password => {
    this.setState({ password });
  };
  _handleChangeUsername = username => {
    this.setState({ username });
  };

  _handleDone = () => {
    this.setState({ isLoading: true });
    this._enableServicesAsync();
  };

  _handleSubmit = () => {
    Actions.main({ type: 'replace' });
  };
  render() {
    return (
      <LoginForm
        state={this.state}
        _handleChangePassword={this._handleChangePassword.bind(this)}
        _handleChangeUsername={this._handleChangeUsername.bind(this)}
        _handleDone={this._handleDone.bind(this)}
      />
    );
  }

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
export default LoginScreen;

const styles = StyleSheet.create({});
