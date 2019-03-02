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
  HotspotListScreen,
  StatisticsScreen,
  ProfileScreen,
  EditProfileScreen,
  CommentsScreen,
  EditHotspotScreen
} from '../screens';
import { Colors } from '../common';
import DrawerContent from './components/DrawerContent';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scene: {
    backgroundColor: Colors.whiteColor,
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
    fontSize: 20
  },
  tabBarStyle: {
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
            <Scene key="auth" gesturesEnabled={false}>
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
                  tabStyle={{ shadowOpacity: 1, shadowRadius: 1 }}
                >
                  <Scene
                    key="register"
                    hideNavBar
                    panHandlers={null}
                    component={SignUpScreen}
                    title="Register"
                    rightTitle="Login"
                    onRight={() => alert('Right Button pressed!')}
                  />
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
                </Tabs>
              </Scene>
            </Scene>
            <Stack key="main">
              <Drawer
                key="drawer"
                hideNavBar
                contentComponent={DrawerContent}
                drawerIcon={
                  <Image source={require('../../assets/icons/location.png')} />
                }
                drawerPosition="left"
                drawerWidth={260}
                onExit={() => {}}
                onEnter={() => {}}
              >
                <Scene
                  key="map"
                  gesturesEnabled={false}
                  swipeEnabled={false}
                  navTransparent={true}
                  hideNavBar={true}
                  back={false}
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
                gesturesEnabled={false}
                back
                hideTabBar
                hideNavBar
                component={CreateHotspotScreen}
                title="Add new hotspot"
              />
              <Scene
                key="edit_hotspot"
                swipeEnabled={false}
                gesturesEnabled={false}
                back
                hideTabBar
                hideNavBar
                component={EditHotspotScreen}
                title="Edit hotspot"
              />
              <Scene
                key="hotspots"
                gesturesEnabled={false}
                hideTabBar
                hideNavBar
                component={HotspotListScreen}
                title="My Hotspots"
              />
              <Scene
                key="comments"
                hideTabBar
                hideNavBar
                component={CommentsScreen}
                title="Comments"
                style={styles.scene}
              />
              <Scene
                key="profile"
                title="Profile"
                hideTabBar
                hideNavBar
                back={true}
                swipeEnabled={true}
                gesturesEnabled={true}
                component={ProfileScreen}
                type={ActionConst.PUSH}
              />

              <Scene
                key="edit"
                gesturesEnabled={false}
                title="Edit your Profile"
                hideTabBar
                hideNavBar
                swipeEnabled={false}
                component={EditProfileScreen}
                type={ActionConst.PUSH}
              />

              <Scene
                key="stats"
                swipeEnabled={false}
                hideTabBar
                hideNavBar
                component={StatisticsScreen}
                title="Statistics"
              />
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
