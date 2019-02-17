import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CustomNavBar, Colors } from '../../common';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class PrivateMessageScreen extends Component {
  render() {
    return (
      <View style={{ backgroundColor: Colors.whiteColor }}>
        <CustomNavBar
          title="Private Message"
          leftTitle="Back"
          rightTitle={null}
          onLeft={Actions.pop}
          onRight={null}
          margins={{ marginLeft: 54 }}
          textColor={{ color: Colors.whiteColor }}
          backgroundColor={{ backgroundColor: Colors.hotspotColor }}
        />
        <KeyboardAwareScrollView>
          <Text>Message</Text>
        </KeyboardAwareScrollView>
        <Text>PrivateMessageScreen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default PrivateMessageScreen;
