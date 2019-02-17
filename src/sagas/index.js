import { takeEvery, put, call, fork, select } from 'redux-saga/effects';
import {
  LOGIN_BASIC,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FACEBOOK,
  LOGIN_GOOGLE
} from '../actions/types';

/** Workers */
export function* loginAsync({ payload }) {
  yield put({
    type: LOGIN_SUCCESS,
    payload
  });
}

/** Watchers */
export function* watchLogin() {
  yield takeEvery(LOGIN_BASIC, loginAsync);
}
