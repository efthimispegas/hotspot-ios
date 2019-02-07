import { UPDATE_LOCATION } from './types';

//---------------------
// Action Creators
//---------------------
export function updateLocation(location) {
  return {
    type: UPDATE_LOCATION,
    payload: location
  };
}
