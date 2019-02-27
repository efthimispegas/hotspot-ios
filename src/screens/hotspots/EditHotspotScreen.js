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
import EditHotspotForm from './components/EditHotspotForm';
import { validateCreationForm, renderImage } from '../../../helpers';

class EditHotspotScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      prevvHotspot: props.hotspot,
      nextHotspot: {
        message: null,
        value: null,
        image: null
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('===============');
    console.log('[Edit Hotspot] nextProps:', nextProps);
    console.log('===============');
    if (!nextProps.updates) {
      if (nextProps.cancelled) {
        this.setState({
          message: '',
          value: 30,
          image: null,
          isLoading: false
        });
        Actions.pop();
      }
    } else {
      //updates were made
      console.log('===============');
      console.log('[Edit hotspot] updates made:', nextProps.updates);
      console.log('===============');
    }
  }

  _handleChangeMessage = message => {
    this.setState({
      ...this.state,
      nextHotspot: { ...this.state.nextHotspot, message }
    });
  };
  _handleChangeSlider = value => {
    this.setState({
      ...this.state,
      nextHotspot: { ...this.state.nextHotspot, value }
    });
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
        ...this.state,
        nextHotspot: {
          ...this.state.nextHotspot,
          image: uri
        }
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
        ...this.state,
        nextHotspot: {
          ...this.state.nextHotspot,
          image: uri
        }
      });
      //save image to the store as hotspot's file
      this.props.saveImage(uri);
    }
  };

  _renderImage = () => {
    if (this.state.nextHotspot.image) {
      return (
        <Image
          source={{ uri: this.state.nextHotspot.image }}
          style={{ width: 164, height: 164 }}
        />
      );
    } else {
      if (typeof this.state.prevvHotspot.file.uri === 'string') {
        return (
          <Image
            source={{ uri: this.state.prevvHotspot.file.uri }}
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
    }
  };

  _saveImage = async () => {
    const { image } = this.state.nextHotspot;
    if (image) {
      //and also upload it to the db collection as seperate file, for user's gallery
      const userId = this.props.user._id;
      await this.props.uploadImage(userId, image);
    }
    this._checkNotEmpty();
  };

  _checkNotEmpty() {
    let { message, value, image } = this.state.nextHotspot;
    if (message === '' || message === null) {
      message = this.state.prevvHotspot.text;
    }
    if (value === '' || value === null) {
      value = this.state.prevvHotspot.validity;
    }
    if (image === null) {
      image = this.state.prevvHotspot.file.uri;
    }
    this.setState({
      ...this.state,
      nextHotspot: {
        message,
        value,
        image
      }
    });

    this._postMessage({
      message,
      value,
      image
    });
  }

  _postMessage = async nextHotspot => {
    const { user } = this.props;
    const args = {
      file: {
        uri: nextHotspot.image
      },
      text: nextHotspot.message,
      user: {
        id: user._id,
        username: user.username,
        avatar: user.avatar
      },
      validity: nextHotspot.value
    };
    const hotspotId = this.state.prevvHotspot._id;
    //update message
    this.props.updateHotspot(hotspotId, args);
    //reload user's hotspots, with the updated one
    await this.props.loadUserHotspots(this.props.user._id);
    Actions.pop();
  };

  _onSave = () => {
    this.setState({ isLoading: true });
    const error = validateCreationForm(this.state.nextHotspot);
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
        ...this.state,
        nextHotspot: {
          image: null,
          message: null,
          value: 15
        }
      });
      return;
    }
    //if no errors, verify and post
    Alert.alert(
      'Update Hotspot?',
      'If you agree press "OK" and your message will be updated!',
      [
        { text: 'OK', onPress: () => this._saveImage() },
        {
          text: 'Cancel',
          onPress: () => this._onCancel(),
          style: 'cancel'
        }
      ],
      { cancelable: true }
    );
  };

  render() {
    console.log('===============');
    console.log('[EditHotspot] state:', this.state);
    console.log('===============');
    console.log('===============');
    console.log('[EditHotspot] props:', this.props);
    console.log('===============');
    return (
      <View style={{ flex: 1, backgroundColor: Colors.hotspotColor }}>
        <CustomNavBar
          title="Edit hotspot"
          leftTitle="Cancel"
          rightTitle="Save"
          onLeft={Actions.pop}
          onRight={this._onSave}
          margins={{ marginLeft: 56, marginRight: 72 }}
          textColor={{ color: Colors.hotspotColor }}
          backgroundColor={{ backgroundColor: Colors.whiteColor }}
        />
        <EditHotspotForm
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
    user: store.auth.user.info,
    region: store.location.region,
    hotspots: store.hotspots.markers,
    updates: store.hotspots.updates,
    cancelled: store.hotspots.cancelled
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateHotspot: bindActionCreators(actions.updateHotspot, dispatch),
    loadUserHotspots: bindActionCreators(actions.loadUserHotspots, dispatch),
    saveImage: bindActionCreators(actions.saveImage, dispatch),
    uploadImage: bindActionCreators(actions.uploadImage, dispatch),
    cancelUpdate: bindActionCreators(actions.cancelCreation, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditHotspotScreen);
