import { LOAD_HOTSPOTS } from '../actions/types';

const INITIAL_STATE = {
  markers: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_HOTSPOTS:
      return {
        ...state,
        markers: action.payload
      };
    default:
      return state;
  }
};
