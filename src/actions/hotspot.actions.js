import { LOAD_HOTSPOTS, CREATE_HOTSPOT, CANCEL_HOTSPOT } from './types';
import { Hotspot } from '../api';

export function loadHotspots(coords) {
  return async dispatch => {
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
    const markers = hotspots.map((hotspot, index) => {
      return {
        lat: hotspot.loc.coordinates[0],
        lng: hotspot.loc.coordinates[1],
        title: `Hotspot - ${index + 1}`,
        subtitle: hotspot.description,
        text: hotspot.text,
        size: hotspot.marker_size
      };
    });
    dispatch({ type: LOAD_HOTSPOTS, payload: markers });
  };
}

export function createHotspot(args) {
  return async dispatch => {
    const { data } = await Hotspot.createHotspot(args);
    dispatch({ type: CREATE_HOTSPOT, payload: data });
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
