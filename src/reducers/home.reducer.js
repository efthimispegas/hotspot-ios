import {
  GET_SEARCH_INPUT,
  GET_SEARCH_SUGGESTIONS,
  TOGGLE_SEARCH_LIST,
  GET_SELECTED_VENUE,
  GET_GENERAL_VENUES,
  CLEAR_SEARCH_INPUT,
  CLEAR_SELECTED_VENUE
} from '../actions/types';
import update from 'react-addons-update';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SEARCH_INPUT:
      return update(state, {
        input: { $set: action.payload }
      });
    case CLEAR_SEARCH_INPUT:
      return update(state, {
        input: { $set: undefined }
      });
    case GET_SEARCH_SUGGESTIONS:
      return update(state, {
        suggestions: { $set: action.payload }
      });
    case TOGGLE_SEARCH_LIST:
      return update(state, {
        suggestions: { $set: {} }
      });
    case GET_SELECTED_VENUE:
      return update(state, {
        isVenueSelected: { $set: true },
        selectedVenue: { $set: action.payload }
      });
    case CLEAR_SELECTED_VENUE:
      return update(state, {
        isVenueSelected: { $set: false },
        selectedVenue: { $set: null }
      });
    case GET_GENERAL_VENUES:
      return update(state, {
        isVenueSelected: { $set: true },
        selectedVenue: { $set: action.payload }
      });
    default:
      return {
        ...state
      };
  }
};
