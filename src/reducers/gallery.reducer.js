import {
  SAVE_IMAGE,
  FLUSH_IMAGE,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_ERROR,
  GET_USER_GALLERY_SUCESS,
  GET_USER_GALLERY_ERROR
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_IMAGE:
      return {
        ...state,
        image: action.payload
      };
    case UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        message: action.payload
      };
    case UPLOAD_IMAGE_ERROR:
      return {
        ...state,
        error: action.error
      };
    case GET_USER_GALLERY_SUCESS:
      return {
        ...state,
        collection: action.payload,
        error: false
      };
    case GET_USER_GALLERY_ERROR:
      return {
        ...state,
        collection: null,
        error: action.error
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
