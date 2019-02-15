import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, CameraRoll } from 'react-native';
import { ImagePicker, Permissions, Icon } from 'expo';

import { Colors, Button } from '../../common';
import Ionicons from '@expo/vector-icons/Ionicons';

class TestScreen extends Component {
  state = {
    picture: null
  };

  _selectPicture = async () => {
    await Permissions.getAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      aspect: 1,
      allowsEditing: true
    });
    this.setState({ picture: uri });
  };

  _takePicure = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { cancelled, uri } = await ImagePicker.launchCameraAsync({
      allowsEditing: false
    });
    this.setState({
      picture: uri
    });
  };

  renderImage = () => {
    if (this.state.picture) {
      return <Image source={{ uri: this.state.picture }} />;
    }
    return <Ionicons name="ios-person" size={32} />;
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderImage()}
        <View style={styles.row}>
          <Button onPress={this._selectPicture} name="Gallery" />
          <Button onPress={this._takePicure} name="Camera" />
        </View>
      </View>
    );
  }
}
export default TestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.faintHotspotColor
  },
  row: {
    margin: 20
  }
});
