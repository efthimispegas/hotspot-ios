import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React from 'react';

import { Colors } from './Colors';

class CustomNavBar extends React.Component {
  _renderLeft() {
    return (
      <TouchableOpacity
        onPress={this.props.onLeft}
        style={[styles.navBarItem, { paddingLeft: 15 }]}
      >
        <Text style={[styles.buttontext, this.props.textColor]}>
          {this.props.leftTitle}
        </Text>
      </TouchableOpacity>
    );
  }
  _renderRight() {
    return (
      <TouchableOpacity
        onPress={this.props.onRight}
        style={[styles.navBarItem, { paddingRight: 15 }]}
      >
        <Text style={[styles.buttontext, this.props.textColor]}>
          {this.props.rightTitle}
        </Text>
      </TouchableOpacity>
    );
  }

  _renderMiddle() {
    return (
      <View style={[styles.navBarItem, this.props.margins]}>
        <Text style={[styles.navBarTitle, this.props.textColor]}>
          {this.props.title}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={[styles.container, this.props.backgroundColor]}>
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
    justifyContent: 'flex-start',
    paddingTop: 20
  },
  navBarItem: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  navBarTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  buttontext: {
    fontSize: 18
  }
});

export { CustomNavBar };
