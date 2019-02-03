import React, { Component } from 'react';
import { AppLoading } from 'expo';
import { StyleSheet, Text, View } from 'react-native';
import { fontAssets } from './helpers';
import { Provider } from 'react-redux';

import Root from './src/Root';

export default class App extends Component {
  state = {
    fontLoaded: false
  };

  componentWillMount() {
    this._loadAssetAsync();
  }

  async _loadAssetAsync() {
    await Promise.all(fontAssets);

    this.setState({
      fontLoaded: true
    });
  }

  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading />;
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
