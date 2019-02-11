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
import { connect } from 'react-redux';

import {
  SignUpScreen,
  HomeScreen,
  ARScreen,
  LoginScreen,
  WelcomeScreen,
  SplashScreen,
  CreateHotspotScreen,
  MessageScreen,
  SettingsScreen,
  ProfileScreen
} from '../screens';
import { Colors } from '../common';

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
    borderTopWidth: 0,
    borderTopColor: Colors.whiteColor,
    borderRightColor: Colors.greyColor,
    backgroundColor: Colors.hotspotColor
  }
});

const transitionConfig = () => ({
  screenInterpolator: StackViewStyleInterpolator.forFadeFromBottomAndroid
});

export const AppNavigator = Actions.create(
  <Router sceneStyle={styles.scene} hideNavBar>
    <Overlay key="overlay">
      <Modal key="modal" hideNavBar transitionConfig={transitionConfig}>
        <Lightbox key="lightbox">
          <Stack key="root" titleStyle={{ alignSelf: 'center' }} hideNavBar>
            <Scene key="auth">
              <Scene
                key="welcome"
                component={WelcomeScreen}
                title="Welcome"
                hideNavBar
                initial
              />

              <Scene hideNavBar panHandlers={null}>
                <Tabs
                  key="authTabBar"
                  routeName="tabbar"
                  legacy={true}
                  swipeEnabled
                  showLabel={true}
                  labelStyle={styles.labelStyle}
                  tabBarStyle={styles.tabBarStyle}
                  inactiveTintColor="rgba(255, 187, 51, 0.794)"
                  activeBackgroundColor="rgba(255, 187, 51, 0.794)"
                  inactiveBackgroundColor={Colors.whiteColor}
                  activeTintColor={Colors.whiteColor}
                >
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
                  <Scene
                    hideNavBar
                    panHandlers={null}
                    key="register"
                    component={SignUpScreen}
                    title="Register"
                    rightTitle="Login"
                    onRight={() => alert('Right Button pressed!')}
                  />
                </Tabs>
              </Scene>
            </Scene>
            <Stack key="main">
              <Scene
                key="home"
                swipeEnabled={false}
                hideTabBar={false}
                hideNavBar={true}
                headerLayoutPreset="center"
              >
                <Scene
                  type={ActionConst.RESET}
                  swipeEnabled={false}
                  navTransparent={true}
                  hideNavBar={true}
                  back={false}
                  key="map"
                  title="" //I dont want it to show the title
                  component={HomeScreen}
                />
                <Scene
                  swipeEnabled={false}
                  hideTabBar
                  key="ar"
                  component={ARScreen}
                  title="AR Camera"
                />
                <Scene
                  swipeEnabled={false}
                  hideTabBar
                  key="add"
                  component={CreateHotspotScreen}
                  title="Add new hotspot"
                />
                <Scene
                  swipeEnabled={false}
                  hideTabBar
                  key="pm"
                  component={MessageScreen}
                  title="Messages"
                />
                <Scene
                  swipeEnabled={false}
                  hideTabBar
                  key="profile"
                  component={ProfileScreen}
                  title="Profile"
                />
                <Scene
                  swipeEnabled={false}
                  hideTabBar
                  key="settings"
                  component={SettingsScreen}
                  title="Settings"
                />
              </Scene>
            </Stack>
          </Stack>
        </Lightbox>
      </Modal>
    </Overlay>
  </Router>
);

const mapStateToProps = state => {
  return {
    state: state.nav
  };
};

export const ReduxRouter = connect(mapStateToProps)(Router);
