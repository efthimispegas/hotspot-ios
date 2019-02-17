import React, { Component } from 'react';
import { AppLoading, Asset, SplashScreen } from 'expo';
import { StyleSheet, Text, View, Image } from 'react-native';
import { fontAssets, imageAssets } from './helpers';
import { Provider } from 'react-redux';

import { ReduxRouter } from './src/routes/Navigator';
import store, { ReduxNavigator } from './src/store';
import { Colors } from './src/common';

export default class App extends Component {
  state = {
    isSplashReady: false,
    isAppReady: false
  };

  _loadSplashResourcesAsync = async () => {
    const gif = require('./assets/splash.png');
    return Asset.fromModule(gif).downloadAsync();
  };

  _cacheResourcesAsync = async () => {
    SplashScreen.hide();
    const result = await Promise.all([fontAssets, imageAssets]);
    this.setState({ isAppReady: true });
  };

  render() {
    if (!this.state.isSplashReady) {
      return (
        <AppLoading
          startAsync={this._loadSplashResourcesAsync}
          onFinish={() => this.setState({ isSplashReady: true })}
          onError={console.warn}
          autoHideSplash={false}
        />
      );
    }
    if (!this.state.isAppReady) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.hotspotColor
          }}
        >
          <Image
            source={require('./assets/splash.png')}
            onLoad={this._cacheResourcesAsync}
          />
        </View>
      );
    }
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <ReduxRouter navigator={ReduxNavigator} />
        </View>
      </Provider>
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
