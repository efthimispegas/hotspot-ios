import {
  CANCEL_HOTSPOT,
  LOAD_HOTSPOTS_SUCCESS,
  CREATE_HOTSPOT_SUCCESS,
  LOAD_HOTSPOTS_ERROR,
  CREATE_HOTSPOT_ERROR,
  LOAD_USER_HOTSPOTS_SUCCESS,
  LOAD_USER_HOTSPOTS_ERROR
} from '../actions/types';

const INITIAL_STATE = {
  markers: null,
  myHotspots: null,
  creation: false,
  cancelled: false,
  error: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_HOTSPOTS_SUCCESS:
      return {
        ...state,
        markers: action.payload,
        error: false
      };
    case LOAD_HOTSPOTS_ERROR:
      return {
        ...state,
        markers: null,
        error: action.error
      };
    case LOAD_USER_HOTSPOTS_SUCCESS:
      return {
        ...state,
        myHotspots: action.payload,
        error: false
      };
    case LOAD_USER_HOTSPOTS_ERROR:
      return {
        ...state,
        myHotspots: null,
        error: action.error
      };
    case CREATE_HOTSPOT_SUCCESS:
      return {
        ...state,
        creation: action.payload,
        error: false
      };
    case CREATE_HOTSPOT_ERROR:
      return {
        ...state,
        creation: false,
        cancelled: false,
        error: action.error
      };
    case CANCEL_HOTSPOT:
      return {
        ...state,
        creation: false,
        cancelled: action.payload,
        error: false
      };
    default:
      return {
        ...state
      };
  }
};
