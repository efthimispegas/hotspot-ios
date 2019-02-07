import { combineReducers } from 'redux';

import event from './a-reducer';
import nav from './nav.reducer';
import location from './location.reducer';

export default combineReducers({
  event,
  nav,
  location
});
