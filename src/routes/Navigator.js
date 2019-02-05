import React, { Component } from 'react';
import { Text, View, Platform, StyleSheet } from 'react-native';
import {
  Router,
  Scene,
  Actions,
  Reducer,
  Drawer,
  ActionConst,
  Overlay,
  Modal,
  Stack,
  Lightbox,
  Tabs
} from 'react-native-router-flux';
import { StackViewStyleInterpolator } from 'react-navigation-stack';

import {
  SignUpScreen,
  Intro,
  HomeScreen,
  ARScreen,
  LoginScreen
} from '../screens';
import { DrawerContent, MenuIcon } from '../utils';
import { Colors } from '../common';
import { Icon } from 'expo';

const stateHandler = (prevState, newState, action) => {
  console.log('onStateChange: ACTION:', action);
};

const transitionConfig = () => ({
  screenInterpolator: StackViewStyleInterpolator.forFadeFromBottomAndroid
});
const currentPosition = async () => {
  const res = await navigator.geolocation.getCurrentPosition(
    position => {
      return position;
    },
    err => {
      throw err;
    }
  );
  return res;
};

class AppNavigator extends Component {
  render() {
    return (
      <Router onStateChange={stateHandler} sceneStyle={styles.scene}>
        <Overlay key="overlay">
          <Modal key="modal" hideNavBar transitionConfig={transitionConfig}>
            <Lightbox key="lightbox">
              <Stack key="root" titleStyle={{ alignSelf: 'center' }} hideNavBar>
                <Scene hideNavBar panHandlers={null}>
                  <Tabs
                    key="authTabBar"
                    routeName="tabbar"
                    legacy={true}
                    swipeEnabled
                    showLabel={true}
                    labelStyle={styles.labelStyle}
                    tabBarStyle={styles.tabBarStyle}
                    activeTintColor="rgba(255, 187, 51, 0.794)"
                    inactiveBackgroundColor="rgba(255, 187, 51, 0.794)"
                    activeBackgroundColor={Colors.whiteColor}
                    inactiveTintColor={Colors.whiteColor}
                  >
                    <Scene
                      hideNavBar
                      panHandlers={null}
                      key="register"
                      component={SignUpScreen}
                      title="Register"
                      rightTitle="Login"
                      onRight={() => alert('Right Button pressed!')}
                    />
                    <Scene
                      hideNavBar
                      panHandlers={null}
                      key="login"
                      component={LoginScreen}
                      title="Login"
                      back={true}
                      backTitle="Register"
                      onBack={() => alert('Left Button pressed!')}
                    />
                  </Tabs>
                  <Stack hideNavBar>
                    <Scene key="home" component={HomeScreen} title="Home" />
                    <Scene key="ar" component={ARScreen} title="AR Camera" />
                  </Stack>
                </Scene>
              </Stack>
            </Lightbox>
          </Modal>
        </Overlay>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scene: {
    backgroundColor: '#F5FCFF',
    shadowOpacity: 2,
    shadowRadius: 3
  },
  labelStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    paddingBottom: 8,
    fontFamily: 'montserrat',
    // backgroundColor: Colors.violetColor,
    fontSize: 20
  },
  tabBarStyle: {
    // height: 0,
    marginTop: 16,
    borderTop: 0,
    borderTopColor: Colors.whiteColor,
    borderRightColor: Colors.greyColor,
    backgroundColor: Colors.hotspotColor
  }
});

export default AppNavigator;
