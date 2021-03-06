import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  StyleSheet,
  Alert,
  AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Expo, { Permissions, Location } from 'expo';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';

import LoginForm from './components/LoginForm';
import { ACCESS_TOKEN } from '../../actions/types';

class LoginScreen extends Component {
  state = {
    isLoading: false,
    email: '',
    password: ''
  };

  // async componentDidMount() {
  //   const token = await this.getToken();
  //   if (token) {
  //     Actions.main({ type: 'replace' });
  //   }
  // }

  async storeToken(accessToken) {
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
    } catch (error) {
      throw error;
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

  _handleSubmit = async () => {
    if (this.props.error) {
      if (this.props.error.code === 401) {
        Alert.alert(`Email and password don't match. `);
        this.setState({ isLoading: false });
        return;
      }
    }
    await this.storeToken(this.props.user.token);
    this.setState({ isLoading: false });
    Actions.main({ type: 'replace' });
  };

  render() {
    return (
      <LoginForm
        {...this.props}
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
      //if everything matches dispatch login action to be catched from the watcher
      const { email, password } = this.state;
      console.log('===============');
      console.log('[LoginScreen]data to be sent to the server:', {
        email,
        password
      });
      console.log('===============');
      await this.props.login({ email, password });

      this._handleSubmit();
    }
  }
}

const mapStoreToProps = store => {
  return {
    user: store.auth.user,
    error: store.auth.error
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
