import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_LOCAL_SUCCESS,
  LOGIN_LOCAL_ERROR,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  LOGOUT,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR
} from '../actions/types';

const INITIAL_STATE = {
  user: false,
  isLoggedIn: false,
  error: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: { info: action.payload.info, token: action.payload.token },
        isLoggedIn: true,
        error: false
      };
    case REGISTER_ERROR:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        error: action.error
      };
    case LOGIN_LOCAL_SUCCESS:
      return {
        ...state,
        user: { info: action.payload.info, token: action.payload.token },
        isLoggedIn: true,
        error: false
      };
    case LOGIN_LOCAL_ERROR:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        error: action.error
      };
    case GET_USER_SUCCESS:
      //we exchanged token for user info
      return {
        ...state,
        user: { ...state.user, info: action.payload },
        isLoggedIn: true
      };
    case GET_USER_ERROR:
      return {
        ...state,
        error: action.error
      };
    case UPDATE_USER_SUCCESS:
      //we exchanged token for user info
      return {
        ...state,
        user: { ...state.user, info: action.payload },
        isLoggedIn: true
      };
    case UPDATE_USER_ERROR:
      return {
        ...state,
        error: action.error
      };
    case LOGOUT:
      return {
        ...state,
        user: { info: null },
        isLoggedIn: false,
        error: false
      };
    default:
      return state;
  }
};
