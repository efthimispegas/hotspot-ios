import { UPDATE_LOCATION } from '../actions/types';

//initial state of my reducer is an empty array
const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_LOCATION:
      return {
        location: action.payload.location
      };
    default:
      return {
        ...state
      };
  }
};
