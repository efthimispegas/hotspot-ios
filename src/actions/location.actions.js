import { UPDATE_LOCATION } from './types';

//---------------------
// Action Creators
//---------------------
export function updateLocation(payload) {
  return {
    type: UPDATE_LOCATION,
    payload
  };
}