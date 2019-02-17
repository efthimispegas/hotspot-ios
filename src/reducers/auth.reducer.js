import { LOGIN_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  user: false,
  isLoggedIn: false,
  token: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        user: action.payload,
        isLoggedIn: true,
        token: null
      };
    default:
      return state;
  }
};
