import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Image
} from 'react-native';

import { Colors, ButtonWithIcon, Button } from '../../../common';

const SignUpForm = ({
  state,
  _handleChangeEmail,
  _handleChangeUsername,
  _handleChangePassword1,
  _handleChangePassword2,
  _handleDone
}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
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
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.hotspotColor,
    paddingHorizontal: 20,
    paddingTop: 70
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
