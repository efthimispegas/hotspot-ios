import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { Button as NativeButton, Picker } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';
import DatePicker from 'react-native-modal-datetime-picker';

import { Colors, ButtonWithIcon, Button } from '../../../common';

const SignUpForm = ({
  state,
  _handleChangeEmail,
  _handleChangeCity,
  _handleChangeUsername,
  _handleChangePassword1,
  _handleChangePassword2,
  _handleDatePicked,
  _showDatePicker,
  _hideDatePicker,
  _checkBirthday,
  _checkGender,
  _handleDone
}) => {
  return (
    <KeyboardAwareScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.formContainer}>
          <View>
            <TextInput
              placeholder="Username"
              selectionColor={Colors.hotspotColor}
              onChangeText={username => _handleChangeUsername(username)}
              value={state.username}
              style={styles.input}
            />

            <TextInput
              placeholder="Email"
              selectionColor={Colors.hotspotColor}
              onChangeText={email => _handleChangeEmail(email)}
              value={state.email}
              style={styles.input}
              keyboardType="email-address"
            />

            <TextInput
              placeholder="Password"
              selectionColor={Colors.hotspotColor}
              onChangeText={password1 => _handleChangePassword1(password1)}
              value={state.password1}
              secureTextEntry={true}
              style={styles.input}
            />

            <TextInput
              placeholder="Confirm password"
              selectionColor={Colors.hotspotColor}
              onChangeText={password2 => _handleChangePassword2(password2)}
              value={state.password2}
              secureTextEntry={true}
              style={styles.input}
            />

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
                style={styles.input}
                value={_checkBirthday}
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
        </View>

        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Errors will go here</Text>
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.facebookButton}>
            <ButtonWithIcon
              buttonName="Sign Up with facebook"
              iconType="FontAwesome"
              iconName="facebook"
              iconStyle={{ color: '#3b5998' }}
              onPress={() => console.log('facebook')}
            />
          </View>
          <View style={styles.googleButton}>
            <ButtonWithIcon
              buttonName="Sign Up with google"
              iconType="AntDesign"
              iconName="google"
              iconStyle={{ color: '#db3236' }}
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
    paddingTop: 50
  },
  imageContainer: {
    width: '21%',
    height: '75%',
    resizeMode: 'stretch',
    marginTop: 20
  },
  formContainer: {
    // backgroundColor: Colors.violetColor
  },
  formButton: {
    marginTop: 30
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
    // backgroundColor: Colors.pinkColor
  },
  errorText: {
    color: Colors.redColor,
    fontFamily: 'montserrat',
    fontSize: 15,
    marginLeft: 20
  },
  bottomContainer: {
    // backgroundColor: Colors.violetColor,
    paddingVertical: 20,
    marginTop: 120
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
