import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { List, ListItem, Left, Button, Body, Right, Switch } from 'native-base';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';

import { User } from '../../api';
import { Colors, Spinner, CustomNavBar } from '../../common';
import ProfileLst from './components/ProfileList';
import Gallery from './components/Gallery';

class ProfileScreen extends Component {
  state = {
    user: null,
    public: true
  };

  componentDidMount() {
    this._getUser();
  }

  _getUser = async () => {
    //hardcode id for now
    const { user } = await User.fetchUser('5c539c398b7c1126bcfd984d');
    await this.props.loadGallery('5c539c398b7c1126bcfd984d');
    this.setState({ user });
  };

  async _handleValueChange(value) {
    this.setState({ public: value });
  }

  render() {
    const { user } = this.state;
    if (!user) {
      return <Spinner size="large" />;
    }
    console.log('===============');
    console.log('[ProfileScreen]:', this.state);
    console.log('===============');
    return (
      <View>
        <CustomNavBar
          title="Profile"
          leftTitle="Back"
          rightTitle="Edit"
          onLeft={Actions.pop}
          onRight={() => Actions.edit()}
          margins={{ marginLeft: 105, marginRight: 100 }}
          textColor={{ color: Colors.whiteColor }}
          backgroundColor={{ backgroundColor: Colors.hotspotColor }}
        />
        <ScrollView>
          <ProfileLst
            state={this.state}
            user={user}
            _handleValueChange={this._handleValueChange}
          />
          <Gallery {...this.props} />
        </ScrollView>
      </View>
    );
  }
}

const mapStoreToProps = store => {
  return {
    user: null, //<---------------fill this when auth is running
    gallery: store.gallery.collection
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadGallery: bindActionCreators(actions.getUserGallery, dispatch)
  };
};

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(ProfileScreen);
