import { Alert } from 'react-native';
import { venue4sq } from '../config';
//in the constructor I can define the class props that will be passed later to it
//(e.g. const hotspot = new Foursquare(userId, hotspotId, commentId))
class FoursquareApi {
  async fetchVenuesSuggestions(endpoint) {
    // console.log('===============');
    // console.log('[FoursquareAPi]:', endpoint);
    // console.log('===============');

    const res = await fetch(endpoint)
      .then(fetch.throwErrors)
      .then(res => {
        // console.log('===============');
        // console.log('res:', JSON.stringify(res));
        // console.log('===============');
        return res.json();
      })
      .then(data => {
        if (data.response.minivenues) {
          return {
            suggestions: data.response.minivenues
          };
        }
      })
      .catch(error => {
        throw new Error(error);
      });
    if (res) return res.suggestions;
  }

  async lookUpPlaceByID(endpoint) {
    // console.log('===============');
    // console.log('[FoursquareAPi]:', endpoint);
    // console.log('===============');

    const res = await fetch(endpoint)
      .then(fetch.throwErrors)
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data.response.venue) {
          return {
            venue: data.response.venue
          };
        }
      })
      .catch(error => {
        throw new Error(error);
      });
    return res.venue;
  }
}

export const Foursquare = new FoursquareApi();
