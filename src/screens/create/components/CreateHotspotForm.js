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

import { Colors, Button } from '../../../common';

const CreateHotspotForm = ({
  state,
  _handleChangeMessage,
  _handleChangeSlider,
  _onSave,
  _openCamera,
  _openCameraRoll,
  _renderImage
}) => {
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={styles.messageContainer}>
          <View style={[styles.titleBox, { marginBottom: 20 }]}>
            <Text style={styles.text}>Your Message:</Text>
          </View>

          <View style={styles.messageBox}>
            <TextInput
              placeholder="Add message..."
              onChangeText={_handleChangeMessage}
              style={styles.input}
              value={state.message}
              multiline={true}
            />
          </View>
        </View>

        <View style={styles.sliderContainer}>
          <View style={[styles.titleBox, { marginVertical: 20 }]}>
            <Text style={styles.text}>Validity of your message</Text>
            <Slider
              value={30}
              minimumValue={1}
              maximumValue={60}
              step={1}
              thumbTintColor={Colors.greyColor}
              minimumTrackTintColor={Colors.whiteColor}
              onValueChange={_handleChangeSlider}
              onSlidingComplete={value =>
                Alert.alert(
                  'Validity of your message:',
                  `${value} minute${value > 1 ? 's' : ''}`
                )
              }
            />
            <Text style={styles.text}>{state.value}</Text>
          </View>
        </View>

        <View style={styles.imageContainer}>
          <Text style={styles.text}> Choose image</Text>
          <View style={styles.picture}>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Add a photo to your message',
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
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button name="Create" onPress={_onSave} isLoading={state.isLoading} />
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
  },
  buttonContainer: {
    flex: 0.2,
    // backgroundColor: Colors.greyColor,
    paddingHorizontal: 10,
    paddingVertical: 2,
    justifyContent: 'center'
  }
});

export default CreateHotspotForm;
