import React, { Component } from 'react';
import { AppLoading, Asset } from 'expo';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { fontAssets, ImageAssets } from './helpers';
import { Provider } from 'react-redux';

import { LoadingScreen, Intro } from './src/screens';
import { ReduxRouter } from './src/routes/Navigator';
import store, { ReduxNavigator } from './src/store';

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
    //set a substantial delay of 400ms because the fonts haven't finished
    //loading before the state is set to isLoadingComplete : true
    setTimeout(() => this.setState({ isLoadingComplete: true }), 600);
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
