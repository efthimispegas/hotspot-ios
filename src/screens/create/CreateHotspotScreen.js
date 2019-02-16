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
import { Permissions, ImagePicker } from 'expo';
import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';

import { Colors, CustomNavBar } from '../../common';
import CreateHotspotForm from './components/CreateHotspotForm';
import { validateCreationForm } from '../../../helpers';

class CreateHotspotScreen extends Component {
  state = {
    message: '',
    value: 15,
    image: null,
    isLoading: false
  };

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if (!nextProps.creation) {
      if (nextProps.cancelled) {
        this.setState({
          message: '',
          value: 15,
          image: null,
          isLoading: false
        });
        nextProps.flushImage();
        Actions.pop();
      }
    }
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
    const meta = await ImagePicker.launchImageLibraryAsync({
      aspect: 1,
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true
    });
    const { cancelled, uri } = meta;
    console.log('===============');
    console.log('meta:', meta);
    console.log('===============');
    if (!cancelled) {
      this.setState({
        image: uri
      });
      this.props.saveImage(meta);
    }
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
    const { cancelled, uri } = meta;
    console.log('===============');
    console.log('meta:', meta);
    console.log('===============');
    if (!cancelled) {
      this.setState({
        image: uri
      });
      this.props.saveImage(meta);
    }
  };

  _renderImage = () => {
    if (this.props.image) {
      return (
        <Image
          source={{ uri: this.props.image.uri }}
          style={{ width: 128, height: 128 }}
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
    //will also add user later, hardcode it for now
    const { region, image } = this.props;
    const { value, message } = this.state;
    //post message to the map
    this.props.createHotspot({
      loc: { coordinates: [region.latitude, region.longitude] },
      file: image === undefined ? {} : image,
      text: message,
      user: { id: '5c539c398b7c1126bcfd984d', username: 'mikediamond' },
      validity: value
    });
    //refresh screen and redirect after successful post
    this.setState({
      lat: '',
      lng: '',
      message: '',
      image: null,
      value: 15,
      isLoading: false
    });
    //flush the data, since they've been sent to the db
    this.props.flushImage();
    Actions.pop();
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
          onPress: () => this.props.cancelCreation(),
          style: 'cancel'
        }
      ],
      { cancelable: true }
    );
  };

  _onCancel = () => {
    //do some canceling
    this.props.cancelCreation();
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.hotspotColor }}>
        <CustomNavBar
          title="Add a hotspot"
          leftTitle="Cancel"
          rightTitle="Save"
          onLeft={this._onCancel}
          onRight={this._onSave}
          margins={{ marginLeft: 50, marginRight: 68 }}
          textColor={{ color: Colors.hotspotColor }}
          backgroundColor={{ backgroundColor: Colors.whiteColor }}
        />
        <CreateHotspotForm
          _handleChangeSlider={this._handleChangeSlider.bind(this)}
          _handleChangeMessage={this._handleChangeMessage.bind(this)}
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
    hotspots: store.hotspots.markers,
    image: store.gallery.image,
    creation: store.hotspots.creation,
    cancelled: store.hotspots.cancelled
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createHotspot: bindActionCreators(actions.createHotspot, dispatch),
    saveImage: bindActionCreators(actions.saveImage, dispatch),
    flushImage: bindActionCreators(actions.flushImage, dispatch),
    cancelCreation: bindActionCreators(actions.cancelCreation, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateHotspotScreen);
