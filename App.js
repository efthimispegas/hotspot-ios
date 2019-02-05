import React, { Component } from 'react';
import { AppLoading, Asset } from 'expo';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { fontAssets, ImageAssets } from './helpers';
import { Provider } from 'react-redux';

import Root from './src/Root';
import { LoadingScreen, Intro } from './src/screens';

export default class App extends Component {
  state = {
    isLoadingComplete: false
  };

  componentWillMount() {
    this._loadAssetAsync();
  }

  async _loadAssetAsync() {
    await Promise.all([fontAssets, ImageAssets]);

    this.setState({
      isLoadingComplete: true
    });
  }

  render() {
    if (!this.state.isLoadingComplete) {
      return <LoadingScreen />;
    }
    return (
      <View style={{ flex: 1 }}>
        <Root />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
