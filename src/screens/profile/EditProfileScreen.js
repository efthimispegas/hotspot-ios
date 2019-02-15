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
import { FontAwesome, Ionicons, Foundation } from '@expo/vector-icons';
import DatePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { User } from '../../api';
import { Colors, Spinner } from '../../common';
import CustomNavBar from './components/CustomNavBar';

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
    isDatePickerVisible: false
  };

  componentDidMount() {
    this._getUser();
  }

  _getUser = async () => {
    //hardcode id for now
    const { user } = await User.fetchUser('5c539c398b7c1126bcfd984d');
    if (user.gender === 'male') {
      this.setState({ ...this.state, prevvUser: user, picker: 'key0' });
      return;
    }
    this.setState({ ...this.state, prevvUser: user, picker: 'key1' });
  };

  _showDatePicker = () => {
    this.setState({ isDatePickerVisible: true });
  };

  _hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false });
  };

  _handleDatePicked = birthday => {
    console.log('===============');
    console.log('date:', birthday);
    console.log('===============');
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
    return prevvUser.birthday;
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
    //submit form
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
        <CustomNavBar title="Edit your profile" />
        <KeyboardAwareScrollView>
          <View style={styles.container}>
            <View style={styles.picture}>
              <TouchableOpacity onPress={() => console.log('imagepicker')}>
                <Image
                  source={require('../../../assets/icons/user.png')}
                  style={{ width: 100, height: 100 }}
                />
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

export default EditProfileScreen;
