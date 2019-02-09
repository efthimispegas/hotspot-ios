import {
  GET_SEARCH_INPUT,
  GET_SEARCH_SUGGESTIONS,
  TOGGLE_SEARCH_LIST,
  GET_SELECTED_VENUE
} from '../actions/types';
import update from 'react-addons-update';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SEARCH_INPUT:
      const { key, value } = action.payload;
      return update(state, {
        input: { $set: action.payload }
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
        selectedVenue: { $set: action.payload }
      });
    default:
      return state;
  }
};
