import React from 'react';

import {
  HomeScreen,
  CreateHotspotScreen,
  SignUpScreen,
  ARScreen,
  Intro,
  WelcomeScreen
} from './screens';
import AppNavigator from './routes/Navigator';

const Root = () => {
  return <AppNavigator />;
};

export default Root;
