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

import { Colors, Spinner, CustomNavBar } from '../../common';
import { renderProfilePicture, validateInput } from '../../../helpers';

class EditProfileScreen extends Component {
  //implemet the a-reducer logic -> when i navigate from profile to edit
  //make sure to pass the user data (gender,username,email,city etc) along
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      prevvUser: this.props.user,
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
      picture: null,
      errors: {
        email: null,
        username: null,
        password: null,
        fullname: null
      }
    };
  }
  componentDidMount() {
    console.log('===============');
    console.log('[ComponentDidMoutb]prevvSUer:', this.state.prevvUser);
    console.log('===============');
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
    } else {
      return renderProfilePicture(this.props.user.avatar, null, {
        width: 60,
        height: 60,
        borderRadius: 30
      });
    }
  };

  renderSpinner = () => {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Spinner />
        </View>
      );
    }
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

  _handleDone = () => {
    this.setState({ isLoading: true });
    this._checkPasswordMatch();
  };

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
        },
        isLoading: false
      });
      return;
    }
    this._confirmNotEmpty();
  };

  //modify this to check whether a field hasn't changed,
  //to revert it back to prevvUser value
  _confirmNotEmpty = async () => {
    let {
      username,
      email,
      password,
      fullname,
      city,
      birthday,
      gender
    } = this.state.nextUser;
    let { avatar } = this.state.prevvUser;
    if (username === null || username === '') {
      username = this.state.prevvUser.username;
    }
    if (fullname === null || fullname === '') {
      fullname = this.state.prevvUser.fullname;
    }
    if (email === null || email === '') {
      email = this.state.prevvUser.email;
    }
    if (password === null || password === '') {
      password = this.state.prevvUser.password;
    }
    if (city === null || city === '') {
      city = this.state.prevvUser.city;
    }
    if (birthday === null || birthday === '') {
      birthday = this.state.prevvUser.birthday;
    }
    if (gender === null || gender === '') {
      gender = this.state.prevvUser.gender;
    }
    if (this.state.picture !== null) {
      avatar['uri'] = this.state.picture;
    }
    const nextUser = {
      public: this.state.prevvUser.public,
      username,
      fullname,
      email,
      password,
      city,
      birthday,
      gender,
      avatar,
      _id: this.state.prevvUser._id
    };
    console.log('===============');
    console.log('updates for the user:', nextUser);
    console.log('===============');
    this.setState({
      ...this.state,
      nextUser
    });
    await this.props.updateUserProfile(nextUser);
    this._handleSubmit(nextUser);
  };

  _handleSubmit = async nextUser => {
    this.setState({ isLoading: false });
    if (this.props.error) {
      if (this.props.error.code === 403) {
        Alert.alert(`Email ${this.props.error.message}`);
        this.setState({
          ...this.state,
          nextUser: {
            email: null,
            password: null,
            confirmPassword: null,
            username: null,
            fullname: null,
            gender: null,
            city: null,
            birthday: null
          }
        });
        return;
      }
    }
    Actions.pop();
  };

  _validateField = (type, input, requiredLength) => {
    //if input hasn't change don't throw error
    if (input === null || input === '') {
      return;
    }
    const errors = validateInput(type, input, requiredLength);

    if (type === 'email') {
      this.setState({
        ...this.state,
        errors: { ...this.state.errors, email: errors }
      });
    } else if (type === 'password') {
      this.setState({
        ...this.state,
        errors: { ...this.state.errors, password: errors }
      });
    } else if (type === 'fullname') {
      this.setState({
        ...this.state,
        errors: { ...this.state.errors, fullname: errors }
      });
    } else if (type === 'username') {
      this.setState({
        ...this.state,
        errors: { ...this.state.errors, username: errors }
      });
    }
  };

  render() {
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
        {this.renderSpinner()}
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
                      placeholder={this.state.prevvUser.username}
                      enablesReturnKeyAutomatically
                      autoCapitalize="none"
                      selectionColor={Colors.hotspotColor}
                      value={this.state.nextUser.username}
                      onChangeText={username =>
                        this.setState({
                          ...this.state,
                          nextUser: { ...this.state.nextUser, username }
                        })
                      }
                      onBlur={() =>
                        this._validateField(
                          'username',
                          this.state.nextUser.username,
                          3
                        )
                      }
                      style={styles.input}
                    />
                  </Right>
                </ListItem>
                {this.state.errors.username !== null ? (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>
                      {this.state.errors.username}
                    </Text>
                  </View>
                ) : null}
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
                      autoCapitalize="none"
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
                      onBlur={() =>
                        this._validateField('email', this.state.nextUser.email)
                      }
                    />
                  </Right>
                </ListItem>
                {this.state.errors.email !== null ? (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>
                      {this.state.errors.email}
                    </Text>
                  </View>
                ) : null}
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
                      onBlur={() =>
                        this._validateField(
                          'password',
                          this.state.nextUser.password,
                          6
                        )
                      }
                    />
                  </Right>
                </ListItem>
                {this.state.errors.password !== null ? (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>
                      {this.state.errors.password}
                    </Text>
                  </View>
                ) : null}
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
                        this.state.prevvUser.fullname
                          ? this.state.prevvUser.fullname
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
                      onBlur={() =>
                        this._validateField(
                          'fullname',
                          this.state.nextUser.fullname
                        )
                      }
                    />
                  </Right>
                </ListItem>
                {this.state.errors.fullname !== null ? (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>
                      {this.state.errors.fullname}
                    </Text>
                  </View>
                ) : null}
                <ListItem icon>
                  <Left />
                  <Body>
                    <Text style={styles.listItem}>Birthday</Text>
                  </Body>
                  <Right>
                    <Button transparent onPress={this._showDatePicker}>
                      <Text style={styles.input}>
                        {this._checkBirthday(this.state.prevvUser)}
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
                      placeholder={this.state.prevvUser.city}
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
              date={new Date(this.state.prevvUser.birthday)}
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
  },

  errorContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingBottom: 5,
    paddingRight: 20
  },
  errorText: {
    flex: 1,
    color: Colors.redColor,
    fontStyle: 'italic',
    fontSize: 15,
    marginLeft: 10
  }
});

const mapStoreToProps = store => {
  return {
    user: store.auth.user.info,
    error: store.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUserProfile: bindActionCreators(actions.updateProfile, dispatch)
  };
};

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(EditProfileScreen);
