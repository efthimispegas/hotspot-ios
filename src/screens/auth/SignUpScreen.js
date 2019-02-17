import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import Expo, { Permissions, Location, AR } from 'expo';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';

import SignUpForm from './components/SignUpForm';

class SignUpScreen extends Component {
  state = {
    username: '',
    email: '',
    city: '',
    gender: 'male',
    picker: 'key0',
    birthday: null,
    password1: '',
    password2: '',
    isLoading: false,
    isDatePickerVisible: false
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

  _showDatePicker = () => {
    this.setState({ isDatePickerVisible: true });
  };

  _hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false });
  };

  _handleDatePicked = birthday => {
    console.log('===============');
    console.log('date:', birthday);
    console.log('===============');
    this.setState({ birthday });
    this._hideDatePicker();
  };

  _checkBirthday(value) {
    const { birthday } = this.state;
    if (birthday) {
      return moment(birthday)
        .format('DD[-]MM[-]YYYY')
        .toString();
    }
    return 'Choose your birthday';
  }
  _checkGender = value => {
    if (value === 'key0') {
      this.setState({ picker: value, gender: 'male' });
      return;
    }
    this.setState({ picker: value, gender: 'female' });
  };

  _handleSubmit = () => {
    this.setState({ isLoading: false });
    console.log('===============');
    console.log('[SignUpScreen] new user:', this.state);
    console.log('===============');
    Actions.main({ type: 'replace' });
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
        _checkBirthday={this._checkBirthday.bind(this)}
        _checkGender={this._checkGender.bind(this)}
        _handleDatePicked={this._handleDatePicked.bind(this)}
        _showDatePicker={this._showDatePicker.bind(this)}
        _hideDatePicker={this._hideDatePicker.bind(this)}
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
      this.setState({ isLoading: false });
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
      this.setState({ isLoading: false });
    } else {
      //then submit form and store the user's current location
      this._handleSubmit();
    }
  }
}

const mapStoreToProps = store => {
  return {
    authStatus: null,
    user: null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    basicSignup: null //bindActionCreators(actions.basicSignup, dispatch)
  };
};

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(SignUpScreen);
