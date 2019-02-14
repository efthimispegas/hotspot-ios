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
    if (Actions.currentScene === 'profile') {
      return (
        <TouchableOpacity
          onPress={Actions.pop}
          style={[styles.navBarItem, { paddingLeft: 15 }]}
        >
          <Text style={styles.buttontext}>Back</Text>
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
    const marginLeft = Actions.currentScene === 'edit' ? 30 : 0;
    return (
      <View
        style={[
          styles.navBarItem,
          {
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            marginLeft
          }
        ]}
      >
        <Text style={styles.navBarTitle}>{this.props.title}</Text>
      </View>
    );
  }

  _renderRight() {
    if (Actions.currentScene === 'profile2') {
      return (
        <TouchableOpacity
          onPress={() => Actions.edit()}
          style={[
            styles.navBarItem,
            {
              alignItems: 'flex-end',
              paddingRight: 15
              // backgroundColor: 'green'
            }
          ]}
        >
          <Text style={styles.buttontext}>Edit</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        onPress={() => this._handleDone()}
        style={[
          styles.navBarItem,
          { alignItems: 'flex-end', paddingRight: 15, flex: 0.5 }
        ]}
      >
        <Text style={styles.buttontext}>Done</Text>
      </TouchableOpacity>
    );
  }

  async _handleDone() {
    //this will be the _handleDone that will be
    //passed to the props from the screen
  }

  render() {
    return (
      <View style={[styles.container]}>
        {this._renderLeft()}
        {this._renderMiddle()}
        {this._renderRight()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingTop: 20,
    backgroundColor: Colors.hotspotColor
  },
  navBarItem: {
    // flex: 1,
    justifyContent: 'center',
    color: Colors.whiteColor
  },
  navBarTitle: {
    color: Colors.whiteColor,
    fontSize: 20,
    fontWeight: 'bold'
  },
  buttontext: {
    color: Colors.whiteColor,
    fontSize: 18
  }
});
