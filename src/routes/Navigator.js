import React, { Component } from 'react';
import { Text, View, Platform, StyleSheet, Image } from 'react-native';
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
  CreateHotspotScreen,
  MessageScreen,
  SettingsScreen,
  ProfileScreen,
  EditProfileScreen
} from '../screens';
import { Colors } from '../common';
import DrawerContent from './components/DrawerContent';
import CustomNavBar from '../screens/profile/components/CustomNavBar';

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
  },
  profileTitle: {
    color: Colors.whiteColor
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
                    key="login"
                    hideNavBar
                    panHandlers={null}
                    component={LoginScreen}
                    title="Login"
                    back={true}
                    backTitle="Register"
                    onBack={() => alert('Left Button pressed!')}
                  />
                  <Scene
                    key="register"
                    hideNavBar
                    panHandlers={null}
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
                <Drawer
                  key="drawer"
                  hideNavBar
                  contentComponent={DrawerContent}
                  drawerIcon={
                    <Image
                      source={require('../../assets/icons/location.png')}
                    />
                  }
                  drawerPosition="left"
                  drawerWidth={260}
                  onExit={() => {}}
                  onEnter={() => {}}
                >
                  <Scene
                    key="map"
                    type={ActionConst.RESET}
                    swipeEnabled={false}
                    navTransparent={true}
                    hideNavBar={true}
                    back={false}
                    title="" //I dont want it to show the title
                    component={HomeScreen}
                  />
                </Drawer>
                <Scene
                  key="ar"
                  swipeEnabled={false}
                  hideTabBar
                  component={ARScreen}
                  title="AR Camera"
                />
                <Scene
                  key="add"
                  swipeEnabled={false}
                  hideTabBar
                  hideNavBar={false}
                  component={CreateHotspotScreen}
                  title="Add new hotspot"
                />
                <Scene
                  key="pm"
                  swipeEnabled={false}
                  hideTabBar
                  hideNavBar={false}
                  component={MessageScreen}
                  title="Messages"
                />

                <Scene
                  key="profile"
                  title="Profile"
                  hideTabBar
                  hideNavBar
                  // navBar={CustomNavBar}
                  component={ProfileScreen}
                />

                <Scene
                  key="edit"
                  title="Edit your Profile"
                  hideTabBar
                  hideNavBar
                  swipeEnabled={false}
                  // navBar={CustomNavBar}
                  component={EditProfileScreen}
                  type={ActionConst.RESET}
                />

                <Scene
                  key="settings"
                  swipeEnabled={false}
                  hideTabBar
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
