import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  AsyncStorage
} from 'react-native';
import Expo, { Permissions, Location, AR, ImagePicker } from 'expo';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';

import SignUpForm from './components/SignUpForm';
import { validateInput } from '../../../helpers';
import { Colors } from '../../common';
import { ACCESS_TOKEN } from '../../actions/types';

class SignUpScreen extends Component {
  state = {
    picture: null,
    username: null,
    fullname: null,
    email: null,
    city: null,
    gender: 'male',
    picker: 'key0',
    birthday: null,
    password1: null,
    password2: null,
    isLoading: false,
    isDatePickerVisible: false,
    errors: {
      email: null,
      username: null,
      password: null,
      fullname: null
    }
  };

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

  openCameraRoll = async () => {
    const { status, permissions } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    if (status === 'denied') {
      alert('Hotspot needs permissions to access Camera Roll');
      return;
    }
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      aspect: 1,
      allowsEditing: true
    });
    this.setState({ picture: uri });
  };

  openCamera = async () => {
    const { status, permissions } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
      Permissions.CAMERA
    );
    if (status === 'denied') {
      alert('Hotspot needs permissions to access your Camera');
      return;
    }
    const { cancelled, uri } = await ImagePicker.launchCameraAsync({
      allowsEditing: false
    });
    this.setState({
      picture: uri
    });
  };

  renderImage = () => {
    if (this.state.picture) {
      return (
        <Image
          source={{ uri: this.state.picture }}
          style={{ width: 60, height: 60, borderRadius: 30 }}
        />
      );
    }
    return (
      <Image
        source={require('../../../assets/icons/user-unknown.png')}
        style={{ width: 60, height: 60 }}
      />
    );
  };

  _handleChangeFullname = fullname => {
    this.setState({ fullname });
  };
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

  _showDatePicker = () => {
    this.setState({ isDatePickerVisible: true });
  };

  _hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false });
  };

  _handleDatePicked = birthday => {
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

  _handleDone = () => {
    this.setState({ isLoading: true });
    this._confirmPasswordMatch();
  };

  _confirmPasswordMatch = () => {
    const { password1, password2 } = this.state;

    if (password1 !== password2) {
      Alert.alert(
        "Passwords don't match!",
        'Make sure you enter the same password in both fields!'
      );
      this.setState({ isLoading: false });
      return;
    }
    this._confirmNotEmpty();
  };

  _confirmNotEmpty = () => {
    const { username, email, password1, fullname, city, birthday } = this.state;
    if (
      username === null ||
      username === '' ||
      email === null ||
      email === '' ||
      password1 === null ||
      password1 === '' ||
      fullname === null ||
      fullname === '' ||
      city === null ||
      city === '' ||
      birthday === null
    ) {
      Alert.alert('Not so fast...🤔', 'All fields are required');
      this.setState({ isLoading: false });
      return;
    }
    this._enableServicesAsync();
  };

  _validateField = (type, input, requiredLength) => {
    if (Actions.currentScene === '_register') {
      const errors = validateInput(type, input, requiredLength);

      if (type === 'email') {
        this.setState({
          ...this.state,
          errors: { ...this.state.errors, email: errors }
        });
      } else if (type === 'password') {
        this.setState({
          ...this.state,
          errors: { ...this.state.errors, password: errors }
        });
      } else if (type === 'fullname') {
        this.setState({
          ...this.state,
          errors: { ...this.state.errors, fullname: errors }
        });
      } else if (type === 'username') {
        this.setState({
          ...this.state,
          errors: { ...this.state.errors, username: errors }
        });
      }
    }
  };

  _handleSubmit = async () => {
    if (this.props.error) {
      if (this.props.error.code === 403) {
        Alert.alert(`Email ${this.props.error.message}`);
        this.setState({ isLoading: false });
        return;
      }
    }
    await this.storeToken(this.props.user.token);
    this.setState({ isLoading: false });
    Actions.main({ type: 'replace' });
  };

  render() {
    console.log('===============');
    console.log('[SignUpScreen]state:', this.state);
    console.log('===============');
    return (
      <View
        style={{
          backgroundColor: Colors.hotspotColor,
          ...StyleSheet.absoluteFill
        }}
      >
        <SignUpForm
          {...this.props}
          state={this.state}
          openCamera={this.openCamera.bind(this)}
          openCameraRoll={this.openCameraRoll.bind(this)}
          renderImage={this.renderImage.bind(this)}
          _handleChangePassword1={this._handleChangePassword1.bind(this)}
          _handleChangePassword2={this._handleChangePassword2.bind(this)}
          _handleChangeEmail={this._handleChangeEmail.bind(this)}
          _handleChangeCity={this._handleChangeCity.bind(this)}
          _handleChangeUsername={this._handleChangeUsername.bind(this)}
          _handleChangeFullname={this._handleChangeFullname.bind(this)}
          _checkBirthday={this._checkBirthday.bind(this)}
          _checkGender={this._checkGender.bind(this)}
          _handleDatePicked={this._handleDatePicked.bind(this)}
          _showDatePicker={this._showDatePicker.bind(this)}
          _hideDatePicker={this._hideDatePicker.bind(this)}
          _validateField={this._validateField.bind(this)}
          _handleDone={this._handleDone.bind(this)}
        />
      </View>
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
      //do some validations
      const { email, password, username, fullname } = this.state.errors;
      if (
        email === null &&
        username === null &&
        fullname === null &&
        password === null
      ) {
        //send the user info to the server
        const user = {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password1,
          fullname: this.state.fullname,
          city: this.state.city,
          gender: this.state.gender,
          birthday: this.state.birthday,
          avatar: this.state.picture
        };
        console.log('===============');
        console.log('[SignUpScreen]user to be sent to the server:', user);
        console.log('===============');
        // if everything matches, signup
        await this.props.signup(user);

        this._handleSubmit();
      }
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
    signup: bindActionCreators(actions.signup, dispatch)
  };
};

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(SignUpScreen);
