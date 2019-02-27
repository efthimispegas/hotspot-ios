import { UPDATE_LOCATION, SHOW_MY_LOCATION } from './types';

//---------------------
// Action Creators
//---------------------
export function updateLocation(payload) {
  return {
    type: UPDATE_LOCATION,
    payload
  };
}

export function getMyLocation(payload) {
  return {
    type: SHOW_MY_LOCATION,
    payload
  };
}
