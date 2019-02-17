import {
  REGISTER,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_ERROR,
  LOGIN_BASIC,
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
    dispatch({ type: LOGIN_BASIC });
    try {
      //here we will await the res of the query in the db for the token
      const response = await User.login(user);
      console.log('===============');
      console.log('response:', response);
      console.log('===============');
      //and if we find the user we will login
      // return dispatch(loginSuccess(data));
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
  return {
    type: REGISTER,
    payload: user
  };
  // return async dispatch => {
  //   dispatch({ type: REGISTER });
  //   try {
  //     //here we will await the creation of the user in the db
  //     //and if everything is successful we signup
  //     return dispatch(loginSuccess(data));
  //   } catch (e) {
  //     return dispatch(loginError(e));
  //   }
  // };
}

export function logout() {
  return async dispatch => {
    dispatch({ type });
    try {
      //here we will await the release of the session token
      //and then we will logout
      return {
        type: LOGOUT
      };
    } catch (e) {
      return {
        type: LOGOUT_ERROR,
        error
      };
    }
  };
}

//-----------------------
//action handlers
//-----------------------

//create the functionality that checks if the login was
//successful or if there is an console.error();
function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    payload: user
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
function signupSuccess() {
  return {
    type: REGISTER_SUCCESS,
    user: data.user
  };
}

function signupError() {
  return {
    type: REGISTER_ERROR
  };
}
