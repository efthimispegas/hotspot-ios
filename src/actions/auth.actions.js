import {
  REGISTER,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  LOGIN_LOCAL_SUCCESS,
  LOGIN_LOCAL_ERROR,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  LOGIN_FACEBOOK,
  LOGIN_GOOGLE
} from './types';
import { User } from '../api';

//-----------------------
//action creators
//-----------------------

//now we create the actionCreator that is going to
//dispatch an action to the auth reducer
export function login(user) {
  //refactor later with token
  return async dispatch => {
    try {
      //here we will await the res of the query in the db for the token
      const { token, info } = await User.login(user);
      //and if we find the user we will login
      return dispatch({ type: LOGIN_LOCAL_SUCCESS, payload: { token, info } });
    } catch (error) {
      return dispatch({ type: LOGIN_LOCAL_ERROR, error });
    }
  };
}

export function signup(user) {
  return async dispatch => {
    try {
      //here we will await the creation of the user in the db
      const { token, info } = await User.register(user);
      //and if everything is successful we signup
      return dispatch({ type: REGISTER_SUCCESS, payload: { token, info } });
    } catch (error) {
      return dispatch({ type: REGISTER_ERROR, error });
    }
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}

export function loginFacebook(user) {
  return {
    type: LOGIN_FACEBOOK,
    payload: user
  };
}

export function loginGoogle(user) {
  return {
    type: LOGIN_GOOGLE,
    payload: user
  };
}
