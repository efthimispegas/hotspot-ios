import { Location } from 'expo';
import update from 'react-addons-update';
import { Dimensions } from 'react-native';
// import GooglePlaces from 'react-native-google-places';

import { venueQuery, venuesQuery } from '../../helpers';

import {
  GET_SEARCH_INPUT,
  CLEAR_SEARCH_INPUT,
  TOGGLE_SEARCH_LIST,
  GET_SEARCH_SUGGESTIONS,
  GET_SELECTED_VENUE,
  GET_GENERAL_VENUES
} from './types';
import { Foursquare } from '../api/foursquare.api';
import { suggest4sq, venue4sq } from '../config';

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

export function clearSearchInput() {
  return {
    type: CLEAR_SEARCH_INPUT
  };
}

//I need to persist state for the suggestions because
//when it rerenders suggestions becomes {}
export function getSearchSuggestions(nearby, region, isGeneral) {
  //nearby will be user's city
  return async (dispatch, store) => {
    const input = store().home.input;
    const query = venuesQuery(region, nearby, input);
    const suggestions = await Foursquare.fetchVenuesSuggestions(
      `${suggest4sq}?${query}`
    );
    if (isGeneral) {
      dispatch({ type: GET_GENERAL_VENUES, payload: suggestions });
    } else {
      dispatch({ type: GET_SEARCH_SUGGESTIONS, payload: suggestions });
    }
  };
}

export function getSelectedVenue(id) {
  return async dispatch => {
    const query = venueQuery();
    const venue = await Foursquare.lookUpPlaceByID(`${venue4sq}${id}?${query}`);
    dispatch({ type: GET_SELECTED_VENUE, payload: venue });
  };
}

export function toggleSearchSuggestionsList() {
  return {
    type: TOGGLE_SEARCH_LIST
  };
}
