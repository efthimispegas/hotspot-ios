import {
  UPLOAD_IMAGE,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_ERROR,
  SAVE_IMAGE,
  FLUSH_IMAGE
} from './types';
import { Gallery } from '../api';

export function saveImage(uri) {
  return {
    type: SAVE_IMAGE,
    payload: uri
  };
}

export function uploadImage(userId, uri) {
  return async dispatch => {
    dispatch({ type: UPLOAD_IMAGE });

    try {
      const file = {
        uri,
        user_id: userId
      };
      const response = await Gallery.imageUpload(userId, file);

      return dispatch(uploadImageSuccess(response));
    } catch (error) {
      return dispatch(uploadImageError(error));
    }
  };
}

export function flushImage() {
  return { type: FLUSH_IMAGE };
}

//-----------------------
//action handlers
//-----------------------

//SUCCESS case handlers
function uploadImageSuccess(data) {
  return {
    type: UPLOAD_IMAGE_SUCCESS,
    payload: data
  };
}

//ERROR case handlers
function uploadImageError(error) {
  return {
    type: UPLOAD_IMAGE_SUCCESS,
    error
  };
}
