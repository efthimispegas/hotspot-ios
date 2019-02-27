import { GET_RECOMMENDATIONS, CLEAR_RECOMMENDATIONS } from './types';
import { recommendationQuery } from '../../helpers';
import { Foursquare } from '../api/foursquare.api';
import { explore4sq } from '../config';

export function fetchRecommendations(region, lookingFor) {
  return async dispatch => {
    console.log('===============');
    console.log('region:', region);
    console.log('===============');
    const query = recommendationQuery(region, lookingFor);
    const endpoint = `${explore4sq}?${query}`;
    const recommendations = await Foursquare.fetchRecommendations(endpoint);

    dispatch({ type: GET_RECOMMENDATIONS, payload: recommendations });
    return {
      type: GET_RECOMMENDATIONS,
      payload: recommendations
    };
  };
}
export function clearRecommendations() {
  return {
    type: CLEAR_RECOMMENDATIONS
  };
}
