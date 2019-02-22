import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  Alert,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { Button as NativeButton, Picker } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';
import DatePicker from 'react-native-modal-datetime-picker';

import { Colors, ButtonWithIcon, Button } from '../../../common';
import { Divider } from 'react-native-elements';

const SignUpForm = ({
  state,
  openCamera,
  openCameraRoll,
  renderImage,
  _handleChangeEmail,
  _handleChangeCity,
  _handleChangeUsername,
  _handleChangeFullname,
  _handleChangePassword1,
  _handleChangePassword2,
  _handleDatePicked,
  _showDatePicker,
  _hideDatePicker,
  _checkBirthday,
  _checkGender,
  _validateField,
  _handleDone
}) => {
  return (
    <KeyboardAwareScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.picture}>
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                'Set a Profile picture',
                'Choose a photo from Camera Roll, or take a new one.',
                [
                  { text: 'Camera Roll', onPress: openCameraRoll },
                  { text: 'Take picture', onPress: openCamera }
                ]
              )
            }
          >
            {renderImage()}
          </TouchableOpacity>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            placeholder="Username"
            enablesReturnKeyAutomatically
            autoCapitalize="none"
            selectionColor={Colors.hotspotColor}
            onChangeText={username => _handleChangeUsername(username)}
            value={state.username}
            onBlur={() => _validateField('username', state.username, 3)}
            style={styles.input}
          />
          {state.errors.username !== null ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{state.errors.username}</Text>
            </View>
          ) : null}
          <TextInput
            placeholder="Email"
            enablesReturnKeyAutomatically
            autoCapitalize="none"
            selectionColor={Colors.hotspotColor}
            onChangeText={email => _handleChangeEmail(email)}
            onBlur={() => _validateField('email', state.email, null)}
            value={state.email}
            style={styles.input}
            keyboardType="email-address"
          />
          {state.errors.email !== null ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{state.errors.email}</Text>
            </View>
          ) : null}

          <TextInput
            placeholder="Password"
            enablesReturnKeyAutomatically
            selectionColor={Colors.hotspotColor}
            onChangeText={password1 => _handleChangePassword1(password1)}
            onBlur={() => _validateField('password', state.password1, 6)}
            value={state.password1}
            secureTextEntry={true}
            style={styles.input}
          />
          {state.errors.password !== null ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{state.errors.password}</Text>
            </View>
          ) : null}

          <TextInput
            placeholder="Confirm password"
            enablesReturnKeyAutomatically
            selectionColor={Colors.hotspotColor}
            onChangeText={password2 => _handleChangePassword2(password2)}
            value={state.password2}
            secureTextEntry={true}
            style={styles.input}
          />

          <TextInput
            placeholder="Full name"
            autoCapitalize="words"
            selectionColor={Colors.hotspotColor}
            onChangeText={fullname => _handleChangeFullname(fullname)}
            onBlur={() => _validateField('fullname', state.fullname, null)}
            value={state.fullname}
            style={styles.input}
          />
          {state.errors.fullname !== null ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{state.errors.fullname}</Text>
            </View>
          ) : null}

          <TextInput
            placeholder="City"
            selectionColor={Colors.hotspotColor}
            onChangeText={city => _handleChangeCity(city)}
            value={state.city}
            style={styles.input}
          />

          <NativeButton
            transparent
            onPress={_showDatePicker}
            style={[
              styles.input,
              { width: Dimensions.get('window').width - 40 }
            ]}
          >
            <TextInput
              editable={false}
              placeholder={_checkBirthday()}
              placeholderTextColor={
                state.birthday != null
                  ? Colors.hotspotColor
                  : Colors.lightGreyColor
              }
              style={styles.input}
              value={() => _checkBirthday()}
            />
          </NativeButton>
          <TouchableOpacity style={[styles.input, { paddingVertical: 0 }]}>
            <Picker
              mode="dropdown"
              placeholder="Select you gender"
              textStyle={{
                flex: 1,
                color: Colors.hotspotColor,
                fontFamily: 'montserrat'
              }}
              itemTextStyle={{
                color: Colors.hotspotColor,
                fontFamily: 'montserrat'
              }}
              headerStyle={{
                backgroundColor: Colors.hotspotColor,
                fontFamily: 'montserrat'
              }}
              headerBackButtonText="Cancel"
              headerBackButtonTextStyle={{ color: Colors.whiteColor }}
              headerTitleStyle={{
                color: Colors.whiteColor,
                fontSize: 20,
                fontWeight: 'bold'
              }}
              selectedValue={state.picker}
              onValueChange={_checkGender}
            >
              <Picker.Item label="male" value="key0" />
              <Picker.Item label="female" value="key1" />
            </Picker>
          </TouchableOpacity>

          <View style={styles.formButton}>
            <Button
              isLoading={state.isLoading}
              name="Done"
              onPress={_handleDone}
            />
          </View>
        </View>

        <View style={styles.divider}>
          <Divider style={{ backgroundColor: Colors.whiteColor, width: 120 }} />
          <Text
            style={{
              fontStyle: 'italic',
              color: Colors.whiteColor,
              marginHorizontal: 10,
              fontSize: 18
            }}
          >
            OR
          </Text>
          <Divider style={{ backgroundColor: Colors.whiteColor, width: 120 }} />
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.facebookButton}>
            <ButtonWithIcon
              buttonName="Sign Up with facebook"
              iconType="FontAwesome"
              iconName="facebook"
              iconStyle={{ color: Colors.facebookColor }}
              onPress={() => console.log('facebook')}
            />
          </View>
          <View style={styles.googleButton}>
            <ButtonWithIcon
              buttonName="Sign Up with google"
              iconType="AntDesign"
              iconName="google"
              iconStyle={{ color: Colors.googleColor }}
              onPress={() => console.log('google')}
            />
          </View>
        </View>
        <DatePicker
          mode="date"
          isVisible={state.isDatePickerVisible}
          onCancel={_hideDatePicker}
          cancelTextStyle={{ color: Colors.redColor, fontWeight: '400' }}
          onConfirm={_handleDatePicked}
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
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.hotspotColor,
    paddingHorizontal: 20,
    paddingTop: 20
  },
  picture: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  },
  formContainer: {
    flex: 1,
    backgroundColor: Colors.violetColor
  },
  formButton: {
    marginTop: 30,
    marginBottom: 10
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
  errorContainer: {
    flex: 1,
    backgroundColor: Colors.pinkColor,
    paddingBottom: 10
  },
  errorText: {
    flex: 1,
    color: Colors.redColor,
    fontFamily: 'montserrat',
    fontSize: 15,
    marginLeft: 10
  },
  divider: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20
  },
  bottomContainer: {
    // backgroundColor: Colors.violetColor,
    paddingVertical: 20
  },
  facebookButton: {
    alignSelf: 'stretch',
    marginBottom: 10
  },
  googleButton: {
    alignSelf: 'stretch',
    marginTop: 10
  },
  disabled: {}
});

export default SignUpForm;
