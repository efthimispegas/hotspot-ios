import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { BlurView, AR } from 'expo';
import ActionButton from 'react-native-action-button';
import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../actions';

import { Colors } from '../../../common';
import { renderProfilePicture } from '../../../../helpers';

class FloatingActionButton extends Component {
  _renderFabIcon(active) {
    if (!active) {
      return (
        <Image
          source={require('../../../../assets/icons/plus.png')}
          style={{ width: 38, height: 38 }}
        />
      );
    }
    if (active) {
      return (
        <Image
          source={require('../../../../assets/icons/plus.png')}
          style={{ width: 38, height: 38 }}
        />
      );
    }
  }
  render() {
    const { user } = this.props;
    const image = (
      <Image source={require('../../../../assets/icons/user-no-outline.png')} />
    );
    return (
      <View style={[styles.container, { flex: 1, backgroundColor: '#f3f3f3' }]}>
        {/* Rest of the app comes ABOVE the action button component !*/}
        <ActionButton
          renderIcon={this._renderFabIcon}
          btnOutRange={Colors.lightGreyColor}
          backdrop={<BlurView />}
          size={74}
          buttonColor={Colors.hotspotColor}
          backgroundTappable={false}
          verticalOrientation="up"
          position="center"
          offsetX={10}
          style={{ left: 90 }}
        >
          <ActionButton.Item
            buttonColor={Colors.hotspotColor}
            onPress={() => Actions.profile()}
            size={58}
          >
            {renderProfilePicture(user.info.avatar, image, {
              width: 60,
              height: 60,
              borderRadius: 30
            })}
          </ActionButton.Item>

          <ActionButton.Item
            buttonColor={Colors.hotspotColor}
            onPress={() => this._handleARCamera()}
            size={58}
          >
            <Entypo name="camera" size={32} color="white" />
          </ActionButton.Item>

          <ActionButton.Item
            buttonColor={Colors.hotspotColor}
            onPress={() => Actions.add()}
            size={58}
          >
            <Ionicons name="md-create" size={32} color="white" />
          </ActionButton.Item>

          <ActionButton.Item
            buttonColor={Colors.hotspotColor}
            onPress={() => Actions.hotspots()}
            size={58}
          >
            <AntDesign name="message1" size={32} color="white" />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }

  _handleARCamera = () => {
    if (!AR.isAvailable()) {
      Alert.alert(
        'Entering a unique experience!',
        'In order to present to you the AR feature you need to have a version of iOS 11 or higher.',
        [{ text: 'OK', onPress: () => this.props.nav.pop() }],
        { cancelable: true }
      );
    }
    Actions.ar();
  };
}

const styles = StyleSheet.create({
  container: {
    top: Dimensions.get('window').height - 140
  }
});

const mapStoreToProps = store => {
  return {
    user: store.auth.user
  };
};

export default connect(mapStoreToProps)(FloatingActionButton);
