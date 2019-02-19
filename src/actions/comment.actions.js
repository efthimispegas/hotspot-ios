import {
  LOAD_COMMENTS,
  LOAD_COMMENTS_ERROR,
  LOAD_COMMENTS_SUCCESS,
  CREATE_COMMENT,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_ERROR
} from './types';
import { Hotspot } from '../api';

export function loadComments(userId, hotspotId) {
  return async dispatch => {
    dispatch({ type: LOAD_COMMENTS });

    try {
      const data = await Hotspot.fetchHotspotComments(userId, hotspotId);
      dispatch(loadCommentsSuccess(data));
    } catch (error) {
      dispatch(loadCommentsError(error));
    }
  };
}

export function createComment(newComment, hotspotId) {
  return async dispatch => {
    dispatch({ type: CREATE_COMMENT });

    try {
      const userId = newComment.user.id;
      const { comment } = await Hotspot.createHotspotComment(
        userId,
        hotspotId,
        newComment
      );
      dispatch(createCommentSuccess(comment));
    } catch (error) {
      dispatch(createCommentError(error));
    }
  };
}

//-----------------------
//action handlers
//-----------------------

//SUCCESS case handlers
function loadCommentsSuccess(data) {
  return {
    type: LOAD_COMMENTS_SUCCESS,
    payload: data
  };
}

function createCommentSuccess(data) {
  return {
    type: CREATE_COMMENT_SUCCESS,
    payload: data
  };
}

//ERROR case handlers
function loadCommentsError(error) {
  return {
    type: LOAD_COMMENTS_ERROR,
    error
  };
}

function createCommentError(error) {
  return {
    type: CREATE_COMMENT_ERROR,
    error
  };
}
