import { GET_RECOMMENDATIONS, CLEAR_RECOMMENDATIONS } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_RECOMMENDATIONS:
      return {
        headerLocation: action.payload.headerLocation,
        recommendations: action.payload.recommendations,
        last4sqCall: action.payload.last4sqCall
      };
    case CLEAR_RECOMMENDATIONS:
      return {
        recommendations: null,
        last4sqCall: null
      };
    default:
      return state;
  }
};
