import React from 'react';

import {
  HomeScreen,
  CreateHotspotScreen,
  SignUpScreen,
  ARScreen
} from './screens';
import AppNavigator from './routes/Navigator';

const Root = () => {
  return <AppNavigator />;
};

export default Root;
