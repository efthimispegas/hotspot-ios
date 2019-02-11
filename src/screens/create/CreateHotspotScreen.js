import React, { Component } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Alert,
  Slider
} from 'react-native';
import { connect } from 'react-redux';

import { Colors, Button } from '../../common';

class CreateHotspotScreen extends Component {
  state = {
    city: '',
    country: '',
    message: '',
    value: 15
  };

  componentDidMount() {
    console.log('===============');
    console.log('[CreateHotspotScreen] state:\n', this.state);
    console.log('===============');
    console.log('===============');
    console.log('[CreateHotspotScreen] props:\n', this.props);
    console.log('===============');
  }

  _onPress = () => {
    this._verifyCreation();
  };

  _postMessage = () => {
    const { value, message, city, country } = this.state;
    const { position } = this.props;
    //post message to the map
    const res = hotspotApi.createHotspot({
      validity: value,
      text: message,
      loc: {
        lat: position.latitude,
        lng: position.longitude
      },
      city,
      country: country ? country : 'Greece',
      user: {
        id: '5c54b1a4231ce64440d8292f',
        username: 'Pot',
        file: ''
      }
    });
    //refresh screen
    this.setState({
      lat: '',
      lng: '',
      message: '',
      value: 15
    });
    //redirect after successfull post
    this.props.navigator.pop();
  };

  _verifyCreation() {
    Alert.alert(
      'Create Hotspot?',
      'If you agree press "OK" and your message will be posted!',
      [
        { text: 'OK', onPress: () => this._postMessage() },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        }
      ],
      { cancelable: true }
    );
  }

  render() {
    console.log('===============');
    console.log('[CreateHotspotScreen]:\n', this.props);
    console.log('===============');
    return (
      <View style={styles.container}>
        <View style={styles.optionsContainer}>
          <Text style={styles.text}>Options</Text>
        </View>

        <View style={styles.messageContainer}>
          <View style={styles.titleBox}>
            <Text style={styles.message}>Your Message:</Text>
          </View>
          <View style={styles.locationBox}>
            <TextInput
              placeholder="City"
              onChangeText={city => this.setState({ city })}
              style={styles.input}
              value={this.state.city}
            />
            <TextInput
              placeholder="Greece"
              onChangeText={country => this.setState({ country })}
              style={styles.input}
              value={this.state.country}
            />
          </View>
          <View style={styles.messageBox}>
            <TextInput
              placeholder="Add message..."
              onChangeText={message => this.setState({ message })}
              style={styles.input}
              value={this.state.message}
              multiline={true}
            />
          </View>
        </View>

        <View style={styles.sliderContainer}>
          <View style={styles.titleBox}>
            <Text style={styles.message}>Validity of your message</Text>
            <Slider
              value={30}
              minimumValue={1}
              maximumValue={60}
              step={1}
              thumbTintColor={Colors.greyColor}
              minimumTrackTintColor={Colors.hotspotColor}
              onValueChange={value => this.setState({ value })}
              onSlidingComplete={value =>
                Alert.alert(
                  'Validity of your message:',
                  `${value} minute${value > 1 ? 's' : ''}`
                )
              }
            />
            <Text style={styles.message}>{this.state.value}</Text>
          </View>
        </View>

        <View style={styles.imageContainer}>
          <Text style={styles.text}> Choose image</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button name="save" onPress={this._onPress} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20
  },
  optionsContainer: {
    flex: 0.08,
    backgroundColor: Colors.hotspotColor,
    paddingHorizontal: 10,
    paddingVertical: 2,
    justifyContent: 'center'
  },
  text: {
    backgroundColor: Colors.whiteColor,
    textAlign: 'center'
  },
  messageContainer: {
    backgroundColor: Colors.violetColor,
    paddingHorizontal: 10,
    paddingVertical: 2,
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
    paddingVertical: 7,
    backgroundColor: Colors.whiteColor
  },
  message: {
    backgroundColor: Colors.whiteColor,
    textAlign: 'center',
    fontFamily: 'montserratLight',
    fontSize: 20
  },
  imageContainer: {
    backgroundColor: Colors.orangeColor1,
    paddingHorizontal: 10,
    paddingVertical: 2,
    justifyContent: 'center'
  },
  sliderContainer: {
    backgroundColor: Colors.pinkColor,
    paddingHorizontal: 10,
    paddingVertical: 2,
    justifyContent: 'center'
  },
  buttonContainer: {
    flex: 0.2,
    backgroundColor: Colors.greyColor,
    paddingHorizontal: 10,
    paddingVertical: 2,
    justifyContent: 'center'
  }
});

const mapStateToProps = ({ reducer }) => ({ data } = reducer);

const dispatchStateToProps = dispatch => {
  return {
    createHotspot: dispatch => dispatch(createHotspot())
  };
};

export default connect(
  null,
  null
)(CreateHotspotScreen);
