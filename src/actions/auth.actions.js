import {
  REGISTER,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_ERROR
} from './types';

//-----------------------
//action creators
//-----------------------

//now we create the actionCreator that is going to
//dispatch an action to the auth reducer
export function login(token) {
  return async dispatch => {
    dispatch({ type: LOGIN });
    try {
      //here we will await the res of the query in the db for the token
      //and if we find the user we will login
      return dispatch(loginSuccess(data));
    } catch (e) {
      return dispatch(loginError(e));
    }
  };
}

export function signup(token) {
  return async dispatch => {
    dispatch({ type: REGISTER });
    try {
      //here we will await the creation of the user in the db
      //and if everything is successful we signup
      return dispatch(loginSuccess(data));
    } catch (e) {
      return dispatch(loginError(e));
    }
  };
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
function loginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    user: data.user
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
function signupSuccess(data) {
  return {
    type: REGISTER_SUCCESS,
    user: data.user
  };
}

function signupError(error) {
  return {
    type: REGISTER_ERROR,
    error
  };
}
