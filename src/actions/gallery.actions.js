import {
  UPLOAD_IMAGE,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_ERROR,
  SAVE_IMAGE,
  FLUSH_IMAGE,
  GET_USER_GALLERY_ERROR,
  GET_USER_GALLERY_SUCESS
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
    try {
      const file = {
        uri,
        user_id: userId
      };
      const response = await Gallery.imageUpload(userId, file);

      return dispatch({ type: UPLOAD_IMAGE_SUCCESS, payload: response });
    } catch (error) {
      return dispatch({ type: UPLOAD_IMAGE_ERROR, error });
    }
  };
}

export function getUserGallery(userId) {
  return async dispatch => {
    try {
      const { gallery } = await Gallery.fetchUserGallery(userId);
      dispatch({ type: GET_USER_GALLERY_SUCESS, payload: gallery });
    } catch (error) {
      return dispatch({ type: GET_USER_GALLERY_ERROR, error });
    }
  };
}

export function flushImage() {
  return { type: FLUSH_IMAGE };
}
