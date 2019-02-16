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

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../actions';

import { Colors } from '../../../common';
import { User } from '../../../api';

class CustomNavBar extends React.Component {
  _renderLeft() {
    return (
      <TouchableOpacity
        onPress={Actions.pop}
        style={[styles.navBarItem, { paddingLeft: 15 }]}
      >
        <Text style={styles.buttontext}>Back</Text>
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
    backgroundColor: Colors.hotspotColor
  },
  navBarItem: {
    // backgroundColor: 'blue',
    justifyContent: 'center',
    color: Colors.whiteColor
  },
  navBarTitle: {
    color: Colors.whiteColor,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 30
  },
  buttontext: {
    color: Colors.whiteColor,
    fontSize: 18
  }
});

const mapStoreToProps = store => {
  return {
    creation: store.hotspots.creation,
    cancelled: store.hotspots.cancelled
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cancelCreation: bindActionCreators(actions.cancelCreation, dispatch),
    flushImage: bindActionCreators(actions.flushImage, dispatch)
  };
};

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(CustomNavBar);
