import update from 'react-addons-update';
import { Dimensions } from 'react-native';
import { UPDATE_LOCATION } from '../actions/types';

//initial state of my reducer is an empty object
const INITIAL_STATE = {
  region: {}
};

//calculate the appropriate delta params according
//to the dimensions of the screen
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_LOCATION:
      return {
        region: {
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }
      };
    default:
      return {
        ...state
      };
  }
};
