import {
  LOAD_HOTSPOTS,
  CREATE_HOTSPOT,
  CANCEL_HOTSPOT
} from '../actions/types';

const INITIAL_STATE = {
  markers: null,
  creation: false,
  cancelled: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_HOTSPOTS:
      return {
        ...state,
        markers: action.payload
      };
    case CREATE_HOTSPOT:
      //handle the creation in HomeScreen
      return {
        ...state,
        creation: action.payload
      };
    case CANCEL_HOTSPOT:
      //handle the creation in HomeScreen
      return {
        ...state,
        creation: false,
        cancelled: true
      };
    default:
      return {
        ...state
      };
  }
};
