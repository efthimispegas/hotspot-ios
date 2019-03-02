import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  AsyncStorage
} from 'react-native';
import { List, ListItem, Left, Button, Body, Right, Switch } from 'native-base';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';

import { Colors, Spinner, CustomNavBar } from '../../common';
import ProfileLst from './components/ProfileList';
import Gallery from './components/Gallery';
import { ACCESS_TOKEN } from '../../actions/types';

class ProfileScreen extends Component {
  state = {
    isLoading: true,
    user: null
  };

  async componentDidMount() {
    if (this.props.user.info !== null && this.props.isLoggedIn) {
      this.setState({ user: this.props.user.info });
      this._getUserGallery(this.props.user.info);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user.info !== nextProps.user.info && nextProps.isLoggedIn) {
      this.setState({ user: nextProps.user.info });
    }
    if (!nextProps.isLoggedIn) {
      this.setState({ isLoading: true });
    }
  }

  _getUserGallery = async user => {
    await this.props.loadGallery(user._id);
    this.setState({ isLoading: false });
  };

  _handleLogout = async () => {
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN);
      await this.props.logout();
      Actions.auth({ type: 'replace' });
    } catch (error) {
      throw error;
    }
  };

  render() {
    if (this.state.isLoading) {
      return <Spinner size="large" />;
    }
    console.log('===============');
    console.log('[ProfileScreen] state:', this.state);
    console.log('===============');
    return (
      <View>
        <CustomNavBar
          title="Profile"
          leftTitle="Back"
          rightTitle="Edit"
          onLeft={Actions.pop}
          onRight={() => Actions.edit()}
          margins={{ marginLeft: 105, marginRight: 110 }}
          textColor={{ color: Colors.whiteColor }}
          backgroundColor={{ backgroundColor: Colors.hotspotColor }}
        />
        <ScrollView>
          <ProfileLst {...this.state} _handleLogout={this._handleLogout} />
          <Gallery {...this.props} />
        </ScrollView>
      </View>
    );
  }
}

const mapStoreToProps = store => {
  return {
    user: store.auth.user,
    isLoggedIn: store.auth.isLoggedIn,
    gallery: store.gallery.collection
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: bindActionCreators(actions.getUser, dispatch),
    loadGallery: bindActionCreators(actions.getUserGallery, dispatch),
    logout: bindActionCreators(actions.logout, dispatch)
  };
};

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(ProfileScreen);
