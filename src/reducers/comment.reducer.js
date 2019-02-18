import {LOAD_COMMENTS_SUCCESS, LOAD_COMMENTS_ERROR} from '../actions/types'

const INITIAL_STATE = {
  data: false,
  error: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_COMMENTS_SUCCESS:
      return {
        data: action.payload,
        error: false
      };
    case LOAD_COMMENTS_ERROR:
      return {
        data: false,
        error: action.error
      };
    default:
      return state;
  }
}