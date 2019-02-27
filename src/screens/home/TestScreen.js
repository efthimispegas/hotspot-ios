import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Permissions } from 'expo-permissions';
import { Camera } from 'expo-camera';
import { Icon } from 'expo';
import {
  launchCameraAsync,
  launchImageLibraryAsync
} from 'expo/build/ImagePicker/ImagePicker';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Button } from '../../common';

class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    hasCameraRollPermission: null,
    uri: null
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
  }
  takePicture = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    const { cancelled, uri } = await launchCameraAsync({
      allowsEditing: false
    });
    this.setState({ uri });
  };

  openGallery = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    console.log(status);
    const { cancelled, uri } = await launchImageLibraryAsync({
      aspect: 1,
      allowsEditing: true
    });
    console.log(uri);
    this.setState({
      uri
    });
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {this.state.uri === null ? (
          <Ionicons name="ios-person" size={40} />
        ) : (
          <Image
            source={{ uri: this.state.uri }}
            style={{ width: 60, height: 60, borderRadius: 30 }}
          />
        )}
        <Button name="Gallery" onPress={this.openGallery} />
        <Button name="Camera" onPress={this.takePicture} />
      </View>
    );
  }
}

export default CameraExample;
