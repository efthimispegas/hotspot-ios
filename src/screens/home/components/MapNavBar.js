import React, { Component } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';

import { Colors } from '../../../common';
import SearchBox from './SearchBox';

class MapNavBar extends Component {
  _renderLeft() {
    return (
      <TouchableOpacity
        onPress={() => console.log('Search button pressed')}
        style={[styles.navBarItem, { paddingLeft: 5, paddingRight: 10 }]}
      >
        <Ionicons name="ios-search" size={32} color={Colors.hotspotColor} />
      </TouchableOpacity>
    );
  }

  _renderMiddle() {
    return (
      <View style={styles.navBarItem}>
        <SearchBox />
      </View>
    );
  }

  _renderRight() {
    return (
      <View
        style={[
          styles.navBarItem,
          { flexDirection: 'row', justifyContent: 'flex-end' }
        ]}
      >
        <TouchableOpacity
          onPress={() => console.log('Share')}
          style={{ paddingRight: 10 }}
        >
          <Image
            style={{ width: 30, height: 50 }}
            resizeMode="contain"
            source={{
              uri:
                'https://cdn3.iconfinder.com/data/icons/glypho-free/64/share-512.png'
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log('Search')}
          style={{ paddingRight: 10 }}
        >
          <Image
            style={{ width: 30, height: 50 }}
            resizeMode="contain"
            source={{
              uri:
                'https://maxcdn.icons8.com/Share/icon/p1em/Very_Basic//search1600.png'
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.navContainer}>
        {this._renderLeft()}
        {this._renderMiddle()}
        {/* {this._renderRight()} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navContainer: {
    flex: 1,
    // height: 64, //<--- give it a height if you want it to be visible
    flexDirection: 'row',
    // backgroundColor: Colors.pinkColor,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  navBarSearchItem: {
    flex: 0.15,
    color: Colors.hotspotColor
  }
});

export default MapNavBar;
