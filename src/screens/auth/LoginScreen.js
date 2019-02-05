import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, Colors } from '../../common';

class LoginScreen extends Component {
  _handlePress = () => {
    Actions.welcome();
  };
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.text}>LoginScreen</Text>
        </View>

        <View style={styles.bottomContainer}>
          <Button name="Back to Welcome" onPress={this._handlePress} />
        </View>
      </View>
    );
  }
}
export default LoginScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.hotspotColor,
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  topContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomContainer: {
    flex: 0.5
  },
  text: {
    fontFamily: 'montserrat',
    fontSize: 20,
    color: Colors.whiteColor
  }
});
