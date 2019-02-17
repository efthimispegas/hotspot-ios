import {
  REGISTER,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_ERROR,
  LOGIN_LOCAL,
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
    dispatch({ type: LOGIN_LOCAL });
    try {
      //here we will await the res of the query in the db for the token
      const data = await User.login(user);
      //and if we find the user we will login
      return dispatch(loginSuccess(data));
    } catch (e) {
      return dispatch(loginError(e));
    }
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

export function signup(user) {
  return async dispatch => {
    dispatch({ type: REGISTER });
    try {
      //here we will await the creation of the user in the db
      const data = await User.register(user);
      //and if everything is successful we signup
      return dispatch(signupSuccess(data));
    } catch (e) {
      return dispatch(signupError(e));
    }
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}

//-----------------------
//action handlers
//-----------------------

//create the functionality that checks if the login was
//successful or if there is an error
function loginSuccess({ token, user }) {
  return {
    type: LOGIN_SUCCESS,
    payload: { token, user }
  };
}

function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error
  };
}

//create the functionality that checks if the signup
//was succesfull or if there was an error
function signupSuccess({ token, user }) {
  return {
    type: REGISTER_SUCCESS,
    payload: { token, user }
  };
}

function signupError(e) {
  return {
    type: REGISTER_ERROR,
    error: e
  };
}
