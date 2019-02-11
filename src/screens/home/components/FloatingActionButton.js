import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { BlurView } from 'expo';
import ActionButton from 'react-native-action-button';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { Actions } from 'react-native-router-flux';

import { Colors } from '../../../common';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

class FloatingActionButton extends Component {
  _renderFabIcon(active) {
    if (!active) {
      return <AntDesign name="plus" size={46} color="white" />;
    }
    if (active) {
      return <AntDesign name="plus" size={46} color="white" />;
    }
  }
  render() {
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
            <MaterialIcons name="account-circle" size={32} color="white" />
          </ActionButton.Item>

          <ActionButton.Item
            buttonColor={Colors.hotspotColor}
            onPress={() => Actions.ar()}
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
            onPress={() => Actions.pm()}
            size={58}
          >
            <AntDesign name="message1" size={32} color="white" />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    top: Dimensions.get('window').height - 140
  }
});

export default FloatingActionButton;
