import { LOAD_HOTSPOTS, CREATE_HOTSPOT } from '../actions/types';

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
    case CREATE_HOTSPOT:
      return {
        ...state,
        creation: action.paylaod
      };
    default:
      return state;
  }
};
