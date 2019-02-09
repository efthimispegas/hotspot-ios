import { combineReducers } from 'redux';

import event from './a-reducer';
import nav from './nav.reducer';
import location from './location.reducer';
import home from './home.reducer';

export default combineReducers({
  event,
  nav,
  location,
  home
});
