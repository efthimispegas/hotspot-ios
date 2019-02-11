import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import ActionButton from 'react-native-action-button';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from '../../../common';
import { BlurView } from 'expo';
import Entypo from '@expo/vector-icons/Entypo';

class FloatingActionButton extends Component {
  _renderFabIcon(active) {
    if (!active) {
      return <AntDesign name="plus" size={32} color="white" />;
    }
    if (active) {
      return <AntDesign name="plus" size={32} color="white" />;
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
          size={68}
          buttonColor={Colors.hotspotColor}
          backgroundTappable={false}
          verticalOrientation="up"
          position="center"
          offsetX={0}
          style={{ left: 90 }}
        >
          <ActionButton.Item
            buttonColor={Colors.hotspotColor}
            onPress={() => console.log('notes tapped!')}
          >
            <Entypo name="camera" size={32} color="white" />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor={Colors.hotspotColor}
            onPress={() => {}}
          >
            <Ionicons name="md-create" size={32} color="white" />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor={Colors.hotspotColor}
            onPress={() => {}}
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
