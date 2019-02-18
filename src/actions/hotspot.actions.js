import {
  LOAD_HOTSPOTS,
  LOAD_HOTSPOTS_SUCCESS,
  LOAD_HOTSPOTS_ERROR,
  CREATE_HOTSPOT,
  CREATE_HOTSPOT_SUCCESS,
  CREATE_HOTSPOT_ERROR,
  CANCEL_HOTSPOT
} from './types';
import { Hotspot } from '../api';

export function loadHotspots(coords) {
  return async dispatch => {
    dispatch({ type: LOAD_HOTSPOTS });

    try {
      let { hotspots } = await Hotspot.fetchHotspotsWithinRadius(coords); //will refactor later, with (coords, token)
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
      return dispatch(loadHotspotsSuccess(markers));
    } catch (error) {
      return dispatch(loadHotspotsError(error));
    }
  };
}

export function createHotspot(args) {
  return async dispatch => {
    dispatch({ type: CREATE_HOTSPOT });
    try {
      const { data } = await Hotspot.createHotspot(args);
      dispatch(createHotspotSuccess(data));
    } catch (error) {
      return dispatch(createHotspotError(error));
    }
  };
}

export function create3DHotspot(hotspot) {
  return async dispatch => {
    const { data } = await Hotspot.createHotspot(hotspot);
    dispatch({ type: CREATE_HOTSPOT, payload: data });
  };
}

export function cancelCreation() {
  return { type: CANCEL_HOTSPOT };
}

//-----------------------
//action handlers
//-----------------------

//SUCCESS case handlers
function loadHotspotsSuccess(markers) {
  return {
    type: LOAD_HOTSPOTS_SUCCESS,
    payload: markers
  };
}

function createHotspotSuccess(data) {
  return {
    type: CREATE_HOTSPOT_SUCCESS,
    payload: data
  };
}

//ERROR case handlers
function loadHotspotsError(error) {
  return {
    type: LOAD_HOTSPOTS_ERROR,
    error
  };
}
function createHotspotError(error) {
  return {
    type: CREATE_HOTSPOTS_ERROR,
    error
  };
}
