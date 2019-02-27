import update from 'react-addons-update';
import { Dimensions } from 'react-native';
import { UPDATE_LOCATION, SHOW_MY_LOCATION } from '../actions/types';

//initial state of my reducer is an empty object
const INITIAL_STATE = {
  region: {},
  showMyLocation: false
};

//calculate the appropriate delta params according
//to the dimensions of the screen
const { width, height } = Dimensions.get('window');

const LATITUDE_DELTA = 0.00922 * 0.8;
const LONGITUDE_DELTA = 0.00421;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_LOCATION:
      return {
        ...state,
        region: {
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }
      };
    case SHOW_MY_LOCATION:
      return {
        ...state,
        showMyLocation: action.payload
      };
    default:
      return {
        ...state
      };
  }
};
