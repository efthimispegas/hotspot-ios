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
    // this._loadAssetsAsync();
  }

  async _loadAssetsAsync() {
    await Promise.all([fontAssets, ImageAssets]);
  }

  _handleFinishLoading = () => {
    //set a substantial delay of 80ms because the fonts haven't finished
    //loading before the state is set to isLoadingComplete : true
    setTimeout(() => this.setState({ isLoadingComplete: true }), 80);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
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
