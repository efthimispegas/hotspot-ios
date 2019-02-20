import React, { Component } from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';

const WIDTH = Dimensions.get('window').width;

export default class GalleryImage extends Component {
  render() {
    return <Image source={this.props.source} style={styles.image} />;
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: null,
    alignSelf: 'stretch'
  }
});
