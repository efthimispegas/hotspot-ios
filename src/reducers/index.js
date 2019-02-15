import { combineReducers } from 'redux';

import nav from './nav.reducer';
import location from './location.reducer';
import home from './home.reducer';
import menu from './menu.reducer';
import hotspots from './hotspot.reducer';

export default combineReducers({
  nav,
  location,
  home,
  menu,
  hotspots
});
