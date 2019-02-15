import React, { Component } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Alert,
  Slider,
  Image
} from 'react-native';
import { Permissions, ImagePicker, Camera } from 'expo';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Colors, Button, Spinner } from '../../common';
import CreateHotspotForm from './components/CreateHotspotForm';
import { validateCreationForm } from '../../../helpers';
import CustomNavBar from './components/CustomNavBar';

class CreateHotspotScreen extends Component {
  state = {
    city: '',
    country: '',
    message: '',
    value: 15,
    picture: null,
    isLoading: false
  };

  componentDidMount() {
    console.log('===============');
    console.log('[CreateHotspotScreen] state:\n', this.state);
    console.log('===============');
    console.log('===============');
    console.log('[CreateHotspotScreen] props:\n', this.props);
    console.log('===============');
  }

  _handleChangeMessage = message => {
    this.setState({ message });
  };
  _handleChangeSlider = value => {
    this.setState({ value });
  };

  _openCameraRoll = async () => {
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

  _openCamera = async () => {
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

  _renderImage = () => {
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
        source={require('../../../assets/icons/add-image.png')}
        style={{ width: 128, height: 128, borderRadius: 5 }}
      />
    );
  };

  _postMessage = () => {
    const { value, message, city, country } = this.state;
    console.log('===============');
    console.log('[Create]:', this.state);
    console.log('===============');
    console.log('===============');
    console.log('this.props:', this.props);
    console.log('===============');
    // const { position } = this.props;
    //post message to the map
    // const res = hotspotApi.createHotspot({
    //   validity: value,
    //   text: message,
    //   loc: {
    //     lat: position.latitude,
    //     lng: position.longitude
    //   },
    //   city,
    //   country: country ? country : 'Greece',
    //   user: {
    //     id: '5c54b1a4231ce64440d8292f',
    //     username: 'Pot',
    //     file: ''
    //   }
    // });
    //refresh screen
    // this.setState({
    //   lat: '',
    //   lng: '',
    //   message: '',
    //   value: 15
    // });
    //redirect after successfull post
    //this.setState({ isLoading: false })
    // this.props.navigator.pop();
  };

  _onSave = () => {
    this.setState({ isLoading: true });
    const error = validateCreationForm(this.state);
    if (error) {
      Alert.alert(
        'Oops...',
        `${error}`,
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          }
        ],
        { cancelable: true }
      );
      this.setState({
        isLoading: false,
        message: null,
        value: 15
      });
      return;
    }
    Alert.alert(
      'Create Hotspot?',
      'If you agree press "OK" and your message will be posted!',
      [
        { text: 'OK', onPress: () => this._postMessage() },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        }
      ],
      { cancelable: true }
    );
  };

  render() {
    console.log('===============');
    console.log('[CreateHotspotScreen]:\n', this.props);
    console.log('===============');
    // if (this.state.isLoading) {
    //   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //     <Spinner size="large" />
    //   </View>;
    // }
    return (
      <View style={{ flex: 1, backgroundColor: Colors.hotspotColor }}>
        <CustomNavBar title="Add a hotspot" />
        <CreateHotspotForm
          _handleChangeSlider={this._handleChangeSlider.bind(this)}
          _handleChangeMessage={this._handleChangeMessage.bind(this)}
          _onSave={this._onSave.bind(this)}
          _openCamera={this._openCamera.bind(this)}
          _openCameraRoll={this._openCameraRoll.bind(this)}
          _renderImage={this._renderImage.bind(this)}
          state={this.state}
        />
      </View>
    );
  }
}

const mapStateToProps = store => {
  return {
    region: store.location.region,
    hotspots: null //<------------------- fill them
  };
};

const dispatchStateToProps = dispatch => {
  return {
    // createHotspot: bindActionCreators() <-------------
  };
};

export default connect(
  null,
  null
)(CreateHotspotScreen);
