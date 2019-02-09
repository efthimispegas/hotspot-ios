import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';

import rootReducer from '../reducers';
import { AppNavigator } from '../routes/Navigator';

const loggerMiddleware = createLogger({ diff: true, collapsed: true });
const navMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
);
//create our middlewares array that we will finally
//use to create the store
const middleware = [navMiddleware, thunkMiddleware, loggerMiddleware];

export const ReduxNavigator = reduxifyNavigator(AppNavigator, 'root');

//configure store
export default createStore(
  rootReducer,
  undefined,
  compose(applyMiddleware(...middleware))
);
