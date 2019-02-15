import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Colors } from '../../../common';
import { User } from '../../../api';

export default class CustomNavBar extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

  _renderLeft() {
    if (Actions.currentScene === 'add') {
      return (
        <TouchableOpacity
          onPress={Actions.pop}
          style={[styles.navBarItem, { paddingLeft: 15 }]}
        >
          <Text style={styles.buttontext}>Cancel</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        onPress={Actions.pop}
        style={[styles.navBarItem, { paddingLeft: 15 }]}
      >
        <Text style={styles.buttontext}>Cancel</Text>
      </TouchableOpacity>
    );
  }

  _renderMiddle() {
    return (
      <View
        style={[
          styles.navBarItem,
          {
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor: 'red',
            marginLeft: 50
          }
        ]}
      >
        <Text style={styles.navBarTitle}>{this.props.title}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={[styles.container]}>
        {this._renderLeft()}
        {this._renderMiddle()}
        {/* {this._renderRight()} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
    backgroundColor: Colors.whiteColor
  },
  navBarItem: {
    // backgroundColor: 'blue',
    justifyContent: 'center',
    color: Colors.hotspotColor
  },
  navBarTitle: {
    color: Colors.hotspotColor,
    fontSize: 20,
    fontWeight: 'bold'
  },
  buttontext: {
    color: Colors.hotspotColor,
    fontSize: 18
  }
});
