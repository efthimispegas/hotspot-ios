import { SAVE_IMAGE } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_IMAGE:
      return {
        ...state,
        image: action.payload
      };
    default:
      return state;
  }
};
