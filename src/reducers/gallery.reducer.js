import { SAVE_IMAGE, FLUSH_IMAGE } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_IMAGE:
      return {
        ...state,
        image: action.payload
      };
    case FLUSH_IMAGE:
      return {
        ...state,
        image: false
      };
    default:
      return state;
  }
};
