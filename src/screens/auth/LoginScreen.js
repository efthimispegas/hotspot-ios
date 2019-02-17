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

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';

import LoginForm from './components/LoginForm';

class LoginScreen extends Component {
  state = {
    isLoading: false,
    email: '',
    password: ''
  };

  componentWillReceiveProps(nextProps) {
    //whenever the login action is catched, and we have the confirmation
    //that the user isLoggedIn, submit
    if (nextProps.user) {
      if (nextProps.user.isLoggedIn) {
        console.log('===============');
        console.log('[ComponentWillReceiveProps]:', nextProps.user);
        console.log('===============');
        this._handleSubmit();
      }
    }
  }

  _handleChangePassword = password => {
    this.setState({ password });
  };
  _handleChangeEmail = email => {
    this.setState({ email });
  };

  _handleDone = () => {
    this.setState({ isLoading: true });
    this._enableServicesAsync();
  };

  _handleSubmit = () => {
    this.setState({ isLoading: false });
    Actions.main({ type: 'replace' }, this.props.user);
  };
  render() {
    return (
      <LoginForm
        state={this.state}
        _handleChangePassword={this._handleChangePassword.bind(this)}
        _handleChangeEmail={this._handleChangeEmail.bind(this)}
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
      this.setState({ isLoading: false });
    } else {
      //then dispatch login action to be catched from the watcher
      const { email, password } = this.state;
      this.props.login({ email, password });
    }
  }
}

const mapStoreToProps = store => {
  return {
    user: store.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: bindActionCreators(actions.login, dispatch)
  };
};

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(LoginScreen);
