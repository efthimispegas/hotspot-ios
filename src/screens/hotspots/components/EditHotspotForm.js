import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Slider,
  Image,
  Keyboard
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Colors, Button, DebouncedOpacity } from '../../../common';

const EditHotspotForm = ({
  state,
  _handleChangeMessage,
  _handleChangeSlider,
  _openCamera,
  _openCameraRoll,
  _renderImage
}) => {
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={styles.messageContainer}>
          <View style={[styles.titleBox, { marginBottom: 20 }]}>
            <Text style={styles.text}>Edit your Message:</Text>
          </View>

          <View style={styles.messageBox}>
            <TextInput
              placeholder={state.prevvHotspot.text}
              onChangeText={_handleChangeMessage}
              style={styles.input}
              value={state.nextHotspot.message}
              multiline={true}
            />
          </View>
        </View>

        <View style={styles.sliderContainer}>
          <View style={[styles.titleBox, { marginVertical: 20 }]}>
            <Text style={styles.text}>Change validity</Text>
            <Slider
              value={state.prevvHotspot.validity}
              minimumValue={1}
              maximumValue={60}
              step={5}
              thumbTintColor={Colors.greyColor}
              minimumTrackTintColor={Colors.whiteColor}
              onValueChange={_handleChangeSlider}
              onSlidingComplete={value =>
                Alert.alert(
                  'New validity of your message:',
                  `${value} minute${value > 1 ? 's' : ''}`
                )
              }
            />
            <Text style={styles.text}>
              {state.nextHotspot.value !== null
                ? state.nextHotspot.value
                : state.prevvHotspot.validity}
            </Text>
          </View>
        </View>

        <View style={styles.imageContainer}>
          <Text style={styles.text}> Edit image</Text>
          <View style={styles.picture}>
            <DebouncedOpacity
              onPress={() =>
                Alert.alert(
                  'Change the photo of your message',
                  'Choose a photo from Camera Roll, or take a new one.',
                  [
                    { text: 'Camera Roll', onPress: _openCameraRoll },
                    { text: 'Take picture', onPress: _openCamera },
                    {
                      text: 'Cancel',
                      style: 'cancel',
                      onPress: () => console.log('cancel')
                    }
                  ],
                  { cancelable: true }
                )
              }
            >
              {_renderImage()}
            </DebouncedOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: Colors.hotspotColor
  },
  optionsContainer: {
    flex: 0.08,
    backgroundColor: Colors.hotspotColor,
    paddingHorizontal: 10,
    paddingVertical: 2,
    justifyContent: 'center'
  },
  messageContainer: {
    flex: 0.3,
    // backgroundColor: Colors.violetColor,
    paddingHorizontal: 10,
    paddingVertical: 20,
    justifyContent: 'center'
  },
  input: {
    fontSize: 18,
    fontFamily: 'montserrat',
    color: Colors.hotspotColor,
    marginVertical: 2,
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: 15,
    backgroundColor: Colors.whiteColor
  },
  text: {
    color: Colors.whiteColor,
    textAlign: 'center',
    fontFamily: 'montserratLight',
    fontSize: 20
  },
  imageContainer: {
    // backgroundColor: Colors.orangeColor1,
    paddingVertical: 15,
    justifyContent: 'center'
  },
  picture: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15
  },
  sliderContainer: {
    // backgroundColor: Colors.pinkColor,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'center'
  }
});

export default EditHotspotForm;
