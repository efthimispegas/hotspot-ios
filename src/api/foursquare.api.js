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
        return res.json();
      })
      .then(data => {
        console.log('===============');
        console.log('data retured by foursquare:', data);
        console.log('===============');
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
        console.log('===============');
        console.log('[Foursquare]:', data);
        console.log('===============');
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

  async fetchRecommendations(endpoint) {
    const result = await fetch(endpoint)
      .then(fetch.throwErrors)
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log('===============');
        console.log('[Foursquare]:', data);
        console.log('===============');
        if (data.response.groups) {
          return {
            recommendations: data.response.groups.reduce(
              (all, group) => all.concat(group ? group.items : []),
              []
            ),
            headerLocation: data.response.headerLocation,
            last4sqCall: new Date()
          };
        }
      })
      .catch(err => {
        Alert.alert(
          'Error!',
          'We could not connect to the network. Please, try again. If you think this is not a network problem contact us.'
        );
        throw new Error(err);
      });
    return result;
  }
}

export const Foursquare = new FoursquareApi();
