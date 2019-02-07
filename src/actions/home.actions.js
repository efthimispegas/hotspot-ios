import { Location } from 'expo';
import {
  UPDATE_LOCATION,
  UPDATE_LOCATION_SUCCESS,
  UPDATE_LOCATION_ERROR
} from './types';
import update from 'react-addons-update';

//-----------------------
//action creators
//-----------------------

export function updateLocation() {
  return async dispatch => {
    dispatch({ type: UPDATE_LOCATION });
    try {
      //get user's current location, returns a Promise
      const { coords } = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
        timeout: 20000
      });
      return dispatch(updateLocationSuccess(coords));
    } catch (e) {
      console.log(e);
      return dispatch(updateLocationError(e));
    }
  };
}

//-----------------------
//action handlers
//-----------------------
function updateLocationError(error) {
  return {
    type: UPDATE_LOCATION_ERROR
  };
}

function updateLocationSuccess(location) {
  return {
    type: UPDATE_LOCATION_SUCCESS,
    location
  };
}
