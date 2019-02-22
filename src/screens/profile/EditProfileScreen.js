import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Alert
} from 'react-native';
import { List, ListItem, Left, Button, Body, Right, Picker } from 'native-base';
import { Permissions, ImagePicker, Camera } from 'expo';
import { FontAwesome, Ionicons, Foundation } from '@expo/vector-icons';
import DatePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';

import { User } from '../../api';
import { Colors, Spinner, CustomNavBar } from '../../common';

class EditProfileScreen extends Component {
  //implemet the a-reducer logic -> when i navigate from profile to edit
  //make sure to pass the user data (gender,username,email,city etc) along
  state = {
    prevvUser: null,
    nextUser: {
      email: null,
      password: null,
      confirmPassword: null,
      username: null,
      fullname: null,
      gender: null,
      city: null,
      birthday: null
    },
    picker: 'key0',
    isDatePickerVisible: false,
    picture: null
  };

  componentDidMount() {
    const { user } = this.props;
    if (user.gender === 'male') {
      this.setState({ ...this.state, prevvUser: user, picker: 'key0' });
      return;
    }
    this.setState({ ...this.state, prevvUser: user, picker: 'key1' });
  }

  openCameraRoll = async () => {
    const { status, permissions } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    if (status === 'denied') {
      alert('Hotspot needs permissions to access Camera Roll');
      return;
    }
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      aspect: 1,
      allowsEditing: true
    });
    this.setState({ picture: uri });
  };

  openCamera = async () => {
    const { status, permissions } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
      Permissions.CAMERA
    );
    if (status === 'denied') {
      alert('Hotspot needs permissions to access your Camera');
      return;
    }
    const { cancelled, uri } = await ImagePicker.launchCameraAsync({
      allowsEditing: false
    });
    this.setState({
      picture: uri
    });
  };

  renderImage = () => {
    if (this.state.picture) {
      return (
        <Image
          source={{ uri: this.state.picture }}
          style={{ width: 60, height: 60, borderRadius: 30 }}
        />
      );
    }
    return (
      <Image
        source={require('../../../assets/icons/user.png')}
        style={{ width: 60, height: 60 }}
      />
    );
  };

  _showDatePicker = () => {
    this.setState({ isDatePickerVisible: true });
  };

  _hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false });
  };

  _handleDatePicked = birthday => {
    this.setState({
      ...this.state,
      nextUser: { ...this.state.nextUser, birthday }
    });
    this._hideDatePicker();
  };

  _checkBirthday(prevvUser) {
    const { birthday } = this.state.nextUser;
    if (birthday) {
      return moment(birthday).format('DD[-]MM[-]YYYY');
    }
    return moment(prevvUser.birthday).format('DD[-]MM[-]YYYY');
  }

  _checkPasswordMatch = () => {
    const { password, confirmPassword } = this.state.nextUser;

    if (password !== confirmPassword) {
      Alert.alert(
        "Passwords don't match!",
        'Make sure you enter the same password in both fields!'
      );
      this.setState({
        ...this.state,
        nextUser: {
          ...this.state.nextUser,
          password: null,
          confirmPassword: null
        }
      });
      return;
    }
    //make sure to check if the new email is taken
  };

  _handleDone = () => {
    //also a-reducer logic -> create an action
  };

  render() {
    const { prevvUser } = this.state;
    if (!prevvUser) {
      return <Spinner size="large" />;
    }
    console.log('===============');
    console.log('[EditProfileScreen]:', this.state);
    console.log('===============');
    return (
      <View>
        <CustomNavBar
          title="Edit your profile"
          leftTitle="Cancel"
          rightTitle="Done"
          onLeft={Actions.pop}
          onRight={this._handleDone}
          margins={{ marginLeft: 50, marginRight: 50 }}
          textColor={{ color: Colors.whiteColor }}
          backgroundColor={{ backgroundColor: Colors.hotspotColor }}
        />
        <KeyboardAwareScrollView>
          <View style={styles.container}>
            <View style={styles.picture}>
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    'Set a Profile picture',
                    'Choose a photo from Camera Roll, or take a new one.',
                    [
                      { text: 'Camera Roll', onPress: this.openCameraRoll },
                      { text: 'Take picture', onPress: this.openCamera }
                    ]
                  )
                }
              >
                {this.renderImage()}
              </TouchableOpacity>
            </View>
            <View style={styles.settings}>
              <List>
                <ListItem itemDivider>
                  <Text style={styles.separator}>ACCOUNT INFO</Text>
                </ListItem>
                <ListItem icon>
                  <Left>
                    <Button
                      active={false}
                      style={{ backgroundColor: Colors.hotspotColor }}
                    >
                      <FontAwesome
                        name="transgender"
                        size={24}
                        color={Colors.whiteColor}
                      />
                    </Button>
                  </Left>
                  <Body>
                    <Text style={styles.listItem}>Gender</Text>
                  </Body>
                  <Right>
                    <Picker
                      mode="dropdown"
                      placeholder="Select you gender"
                      textStyle={{ color: Colors.lightGreyColor }}
                      itemTextStyle={{ color: Colors.hotspotColor }}
                      headerStyle={{ backgroundColor: Colors.hotspotColor }}
                      headerBackButtonText="Cancel"
                      headerBackButtonTextStyle={{ color: Colors.whiteColor }}
                      headerTitleStyle={{
                        color: Colors.whiteColor,
                        fontSize: 20,
                        fontWeight: 'bold'
                      }}
                      selectedValue={this.state.picker}
                      onValueChange={value =>
                        this.setState({
                          ...this.state,
                          nextUser: {
                            ...this.state.nextUser,
                            gender: value === 'key0' ? 'male' : 'female'
                          },
                          picker: value
                        })
                      }
                    >
                      <Picker.Item label="male" value="key0" />
                      <Picker.Item label="female" value="key1" />
                    </Picker>
                  </Right>
                </ListItem>
                <ListItem icon>
                  <Left>
                    <Button
                      active={false}
                      style={{ backgroundColor: Colors.hotspotColor }}
                    >
                      <Ionicons
                        name="ios-person"
                        size={24}
                        color={Colors.whiteColor}
                      />
                    </Button>
                  </Left>
                  <Body>
                    <Text style={styles.listItem}>Username</Text>
                  </Body>
                  <Right>
                    <TextInput
                      textContentType="username"
                      placeholder={prevvUser.username}
                      selectionColor={Colors.hotspotColor}
                      value={this.state.nextUser.username}
                      onChangeText={username =>
                        this.setState({
                          ...this.state,
                          nextUser: { ...this.state.nextUser, username }
                        })
                      }
                      style={styles.input}
                    />
                  </Right>
                </ListItem>
                <ListItem icon>
                  <Left>
                    <Button
                      active={false}
                      style={{ backgroundColor: Colors.hotspotColor }}
                    >
                      <Foundation
                        name="at-sign"
                        size={24}
                        color={Colors.whiteColor}
                      />
                    </Button>
                  </Left>
                  <Body>
                    <Text style={styles.listItem}>New email</Text>
                  </Body>
                  <Right>
                    <TextInput
                      keyboardType="email-address"
                      placeholder="Your new email"
                      selectionColor={Colors.hotspotColor}
                      value={this.state.nextUser.email}
                      style={styles.input}
                      onChangeText={email =>
                        this.setState({
                          ...this.state,
                          nextUser: { ...this.state.nextUser, email }
                        })
                      }
                    />
                  </Right>
                </ListItem>
                <ListItem icon>
                  <Left>
                    <Button
                      active={false}
                      style={{ backgroundColor: Colors.hotspotColor }}
                    >
                      <Ionicons
                        name="ios-lock"
                        size={24}
                        color={Colors.whiteColor}
                      />
                    </Button>
                  </Left>
                  <Body>
                    <Text style={styles.listItem}>New password</Text>
                  </Body>
                  <Right>
                    <TextInput
                      secureTextEntry={true}
                      placeholder="supersecretpassword"
                      selectionColor={Colors.hotspotColor}
                      value={this.state.nextUser.password}
                      style={styles.input}
                      onChangeText={password =>
                        this.setState({
                          ...this.state,
                          nextUser: { ...this.state.nextUser, password }
                        })
                      }
                    />
                  </Right>
                </ListItem>
                <ListItem icon>
                  <Left />
                  <Body>
                    <Text style={styles.listItem} />
                  </Body>
                  <Right>
                    <TextInput
                      secureTextEntry={true}
                      placeholder="Confirm password"
                      selectionColor={Colors.hotspotColor}
                      value={this.state.nextUser.confirmPassword}
                      style={styles.input}
                      onChangeText={confirmPassword =>
                        this.setState({
                          ...this.state,
                          nextUser: { ...this.state.nextUser, confirmPassword }
                        })
                      }
                      onBlur={this._checkPasswordMatch}
                    />
                  </Right>
                </ListItem>
                <ListItem icon>
                  <Left>
                    <Button
                      active={false}
                      style={{ backgroundColor: Colors.hotspotColor }}
                    >
                      <Ionicons
                        name="ios-information-circle-outline"
                        size={24}
                        color={Colors.whiteColor}
                      />
                    </Button>
                  </Left>
                  <Body>
                    <Text style={styles.listItem}>Full name</Text>
                  </Body>
                  <Right>
                    <TextInput
                      textContentType="familyName"
                      placeholder={
                        prevvUser.fullname
                          ? prevvUser.fullname
                          : 'Enter your full name'
                      }
                      selectionColor={Colors.hotspotColor}
                      value={this.state.nextUser.fullname}
                      style={styles.input}
                      onChangeText={fullname =>
                        this.setState({
                          ...this.state,
                          nextUser: { ...this.state.nextUser, fullname }
                        })
                      }
                    />
                  </Right>
                </ListItem>
                <ListItem icon>
                  <Left />
                  <Body>
                    <Text style={styles.listItem}>Birthday</Text>
                  </Body>
                  <Right>
                    <Button transparent onPress={this._showDatePicker}>
                      <Text style={styles.input}>
                        {this._checkBirthday(prevvUser)}
                      </Text>
                    </Button>
                  </Right>
                </ListItem>
                <ListItem icon>
                  <Left>
                    <Button
                      active={false}
                      style={{ backgroundColor: Colors.hotspotColor }}
                    >
                      <Ionicons
                        name="md-home"
                        size={24}
                        color={Colors.whiteColor}
                      />
                    </Button>
                  </Left>
                  <Body>
                    <Text style={styles.listItem}>City</Text>
                  </Body>
                  <Right>
                    <TextInput
                      textContentType="location"
                      placeholder={prevvUser.city}
                      selectionColor={Colors.hotspotColor}
                      value={this.state.nextUser.city}
                      onChangeText={city =>
                        this.setState({
                          ...this.state,
                          nextUser: { ...this.state.nextUser, city }
                        })
                      }
                      style={styles.input}
                    />
                  </Right>
                </ListItem>
              </List>
            </View>
            <DatePicker
              mode="date"
              isVisible={this.state.isDatePickerVisible}
              onCancel={this._hideDatePicker}
              cancelTextStyle={{ color: Colors.redColor, fontWeight: '400' }}
              onConfirm={this._handleDatePicked}
              titleIOS="Choose your birthday"
              titleStyle={{ color: Colors.hotspotColor, fontSize: 16 }}
              confirmTextIOS="Set Birthday"
              confirmTextStyle={{
                flex: 1,
                justifyContent: 'center',
                paddingTop: 15,
                backgroundColor: Colors.hotspotColor,
                color: Colors.whiteColor,
                fontWeight: '500'
              }}
              date={new Date(prevvUser.birthday)}
            />
            <View style={{ height: 100 }} />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center'
  },
  picture: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30
  },
  separator: {
    fontSize: 12,
    color: Colors.lightGreyColor
  },
  listItem: {
    color: Colors.darkGreyColor,
    fontSize: 16
  },
  input: {
    fontSize: 16,
    color: Colors.hotspotColor,
    marginRight: 15
  }
});

const mapStoreToProps = store => {
  return {
    user: store.auth.user.info
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUserProfile: null //<--------------------------
  };
};

export default connect(mapStoreToProps)(EditProfileScreen);
