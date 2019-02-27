import {
  LOAD_COMMENTS_ERROR,
  LOAD_COMMENTS_SUCCESS,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_ERROR
} from './types';
import { Hotspot } from '../api';

export function loadComments(userId, hotspotId) {
  return async dispatch => {
    try {
      const data = await Hotspot.fetchHotspotComments(userId, hotspotId);
      dispatch({ type: LOAD_COMMENTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: LOAD_COMMENTS_ERROR, error });
    }
  };
}

export function createComment(userId, hotspotId, newComment) {
  return async dispatch => {
    try {
      const { comment } = await Hotspot.createHotspotComment(
        userId,
        hotspotId,
        newComment
      );
      dispatch({ type: CREATE_COMMENT_SUCCESS, payload: comment });
    } catch (error) {
      dispatch({ type: CREATE_COMMENT_ERROR, error });
    }
  };
}
