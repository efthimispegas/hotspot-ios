import { combineReducers } from 'redux';

import auth from './auth.reducer';
import nav from './nav.reducer';
import location from './location.reducer';
import home from './home.reducer';
import menu from './menu.reducer';
import hotspots from './hotspot.reducer';
import gallery from './gallery.reducer';

export default combineReducers({
  auth,
  nav,
  location,
  home,
  menu,
  hotspots,
  gallery
});
