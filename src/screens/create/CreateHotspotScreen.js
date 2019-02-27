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
    value: 30,
    image: null,
    isLoading: false
  };

  componentWillReceiveProps(nextProps) {
    console.log('===============');
    console.log('nextProps:', nextProps);
    console.log('===============');
    if (!nextProps.creation) {
      if (nextProps.cancelled) {
        this.setState({
          message: '',
          value: 30,
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
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      aspect: 1,
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });
    if (!cancelled) {
      this.setState({
        image: uri
      });
      //save image to the store as hotspot's file
      this.props.saveImage(uri);
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
    const { cancelled, uri } = await ImagePicker.launchCameraAsync({
      aspect: 1,
      allowsEditing: true
    });
    if (!cancelled) {
      this.setState({
        image: uri
      });
      //save image to the store as hotspot's file
      this.props.saveImage(uri);
    }
  };

  _renderImage = () => {
    if (this.props.image) {
      return (
        <Image
          source={{ uri: this.props.image }}
          style={{ width: 164, height: 164 }}
        />
      );
    }
    return (
      <Image
        source={require('../../../assets/icons/add-image.png')}
        style={{ width: 164, height: 164, borderRadius: 5 }}
      />
    );
  };

  _saveImage = async () => {
    const { image } = this.state;
    if (image) {
      //and also upload it to the db collection as seperate file, for user's gallery
      const userId = '5c539c398b7c1126bcfd984d';
      await this.props.uploadImage(userId, image);
    }
    this._postMessage();
  };

  _postMessage = async () => {
    //will also add user later, hardcode it for now
    const { region, image, user } = this.props;
    const { value, message } = this.state;
    //post message to the map
    this.props.createHotspot({
      loc: { coordinates: [region.latitude, region.longitude] },
      file: {
        uri: image === undefined ? null : image
      },
      text: message,
      user: {
        id: user.info._id,
        username: user.info.username,
        avatar: user.info.avatar
      },
      validity: value
    });
    //refresh screen and redirect after successful post
    this.setState({
      message: '',
      image: null,
      value: 30,
      isLoading: false
    });
    this.props.flushImage();
    //reload the hotspots, to refresh the homescreen
    await this.props.loadHotspots(this.props.region);
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
    //if no errors, verify and post
    Alert.alert(
      'Create Hotspot?',
      'If you agree press "OK" and your message will be posted!',
      [
        { text: 'OK', onPress: () => this._saveImage() },
        {
          text: 'Cancel',
          onPress: () => this.props.cancelCreation(),
          style: 'cancel'
        }
      ],
      { cancelable: true }
    );
  };

  _onCancel = async () => {
    //reload the hotspots, to refresh the homescreen
    await this.props.loadHotspots(this.props.region);
    //do some canceling
    this.props.cancelCreation(true);
    this.props.cancelCreation(false);
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
    user: store.auth.user,
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
    loadHotspots: bindActionCreators(actions.loadHotspots, dispatch),
    saveImage: bindActionCreators(actions.saveImage, dispatch),
    uploadImage: bindActionCreators(actions.uploadImage, dispatch),
    flushImage: bindActionCreators(actions.flushImage, dispatch),
    cancelCreation: bindActionCreators(actions.cancelCreation, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateHotspotScreen);
