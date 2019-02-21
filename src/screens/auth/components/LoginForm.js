import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard
} from 'react-native';

import { Button, Colors } from '../../../common';

const LoginForm = ({
  _handleChangePassword,
  _handleChangeEmail,
  _handleDone,
  state
}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={styles.mainContainer}>
      <View style={styles.formContainer}>
        <View>
          <TextInput
            keyboardType="email-address"
            autoFocus
            autoCapitalize="none"
            placeholder="Email"
            selectionColor={Colors.hotspotColor}
            onChangeText={email => _handleChangeEmail(email)}
            value={state.email}
            style={styles.input}
          />
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Errors will go here</Text>
          </View>
          <TextInput
            placeholder="Password"
            selectionColor={Colors.hotspotColor}
            onChangeText={password => _handleChangePassword(password)}
            value={state.password}
            secureTextEntry={true}
            style={styles.input}
          />
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Errors will go here</Text>
          </View>
          <View style={styles.formButton}>
            <Button
              isLoading={state.isLoading}
              name="Done"
              onPress={_handleDone}
            />
          </View>
        </View>
      </View>
    </View>
  </TouchableWithoutFeedback>
);

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
    flex: 1
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
    backgroundColor: Colors.pinkColor,
    paddingBottom: 10
  },
  errorText: {
    color: Colors.redColor,
    fontFamily: 'montserrat',
    fontSize: 15,
    marginLeft: 10
  }
});

export default LoginForm;
