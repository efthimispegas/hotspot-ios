import { Location } from 'expo';
import { GET_SEARCH_INPUT, TOGGLE_SEARCH_LIST } from './types';
import update from 'react-addons-update';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

//-----------------------
//action creators
//-----------------------

export function getSearchInput(payload) {
  return {
    type: GET_SEARCH_INPUT,
    payload
  };
}

export function toggleSearchResultsList(payload) {
  return {
    type: TOGGLE_SEARCH_LIST,
    payload
  };
}

export function getAddressPredictions() {}

export function getSelectedAddress(payload) {}
