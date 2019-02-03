import React, { Component } from 'react';
import { View, Text, StyleSheet, NavigatorIOS } from 'react-native';
import { SignUpScreen } from '../screens';

class AppNavigator extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{ component: SignUpScreen, title: 'Register' }}
        translucent={false}
        style={styles.mainContainer}
      />
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  }
});

export default AppNavigator;
