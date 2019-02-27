import {
  LOAD_COMMENTS_SUCCESS,
  LOAD_COMMENTS_ERROR,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_ERROR
} from '../actions/types';

const INITIAL_STATE = {
  data: false,
  newComment: false,
  error: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_COMMENTS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: false
      };
    case LOAD_COMMENTS_ERROR:
      return {
        ...state,
        data: false,
        error: action.error
      };
    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        newComment: action.payload,
        error: false
      };
    case CREATE_COMMENT_ERROR:
      return {
        ...state,
        newComment: false,
        error: action.error
      };
    default:
      return state;
  }
};
