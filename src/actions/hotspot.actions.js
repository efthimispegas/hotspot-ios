import {
  LOAD_HOTSPOTS,
  LOAD_HOTSPOTS_SUCCESS,
  LOAD_HOTSPOTS_ERROR,
  CREATE_HOTSPOT,
  CREATE_HOTSPOT_SUCCESS,
  CREATE_HOTSPOT_ERROR,
  CANCEL_HOTSPOT,
  LOAD_USER_HOTSPOTS_ERROR,
  LOAD_USER_HOTSPOTS_SUCCESS,
  EDIT_HOTSPOT_SUCCESS,
  EDIT_HOTSPOT_ERROR,
  DELETE_HOTSPOT_SUCCESS,
  DELETE_HOTSPOT_ERROR
} from './types';
import { Hotspot } from '../api';

export function loadHotspots(coords, token) {
  return async dispatch => {
    try {
      let { hotspots } = await Hotspot.fetchHotspotsWithinRadius(coords, token); //will refactor later, with (coords, token)
      //adjust the marker's size according to the views_count
      hotspots.forEach((hotspot, index) => {
        if (hotspot.views_count < 10) {
          hotspot.marker_size = 1;
        } else if (hotspot.views_count < 20) {
          hotspot.marker_size = 2;
        } else if (hotspot.views_count < 50) {
          hotspot.marker_size = 3;
        } else {
          hotspot.marker_size = 4;
        }
      });
      //produce the marker's attributes and forward them to the map
      const markers = hotspots.map(hotspot => {
        const uri = hotspot.file.uri === undefined ? false : hotspot.file.uri;
        const file = uri ? { uri, type: hotspot.file.type } : false;
        return {
          ...hotspot,
          coordinates: {
            latitude: hotspot.loc.coordinates[0],
            longitude: hotspot.loc.coordinates[1]
          },
          file,
          size: hotspot.marker_size
        };
      });
      return dispatch({ type: LOAD_HOTSPOTS_SUCCESS, payload: markers });
    } catch (error) {
      return dispatch({ type: LOAD_HOTSPOTS_ERROR, error });
    }
  };
}

export function createHotspot(args) {
  return async dispatch => {
    try {
      const { hotspot } = await Hotspot.createHotspot(args);
      dispatch({ type: CREATE_HOTSPOT_SUCCESS, payload: hotspot });
    } catch (error) {
      return dispatch({ type: CREATE_HOTSPOT_ERROR, error });
    }
  };
}

export function updateHotspot(hotspotId, args) {
  return async dispatch => {
    try {
      const { hotspot } = await Hotspot.editHotspot(hotspotId, args);
      dispatch({ type: EDIT_HOTSPOT_SUCCESS, payload: hotspot });
    } catch (error) {
      return dispatch({ type: EDIT_HOTSPOT_ERROR, error });
    }
  };
}

export function deleteHotspot(hotspotId) {
  return async dispatch => {
    try {
      const { success } = await Hotspot.deleteHotspot(hotspotId);
      dispatch({ type: DELETE_HOTSPOT_SUCCESS, payload: success });
    } catch (error) {
      return dispatch({ type: DELETE_HOTSPOT_ERROR, error });
    }
  };
}

export function create3DHotspot(hotspot) {
  return async dispatch => {
    const { data } = await Hotspot.createHotspot(hotspot);
    dispatch({ type: CREATE_HOTSPOT, payload: data });
  };
}

export function cancelCreation(cancelled) {
  return { type: CANCEL_HOTSPOT, payload: cancelled };
}

export function loadUserHotspots(userId) {
  return async dispatch => {
    try {
      const { docs } = await Hotspot.fetchUserHotspots(userId);
      dispatch({ type: LOAD_USER_HOTSPOTS_SUCCESS, payload: docs });
    } catch (error) {
      return dispatch({ type: LOAD_USER_HOTSPOTS_ERROR, error });
    }
  };
}
