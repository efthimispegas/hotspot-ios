import { Platform } from 'react-native';

let url;

/**
 * Because of genymotion we need to change the url here
 * based on which OS we operate on
 * (more info: http://stackoverflow.com/questions/5528850/how-to-connect-localhost-in-android-emulator )
 */
if (Platform.OS !== 'ios') {
  url = 'http://10.0.3.2:3000/api';
} else {
  url = 'http://192.168.10.39:3000/api';
  // url = 'http://172.20.10.5:3000/api';
}

export const domainUrl = url;

export const suggest4sq =
  'https://api.foursquare.com/v2/venues/suggestcompletion';

export const venue4sq = 'https://api.foursquare.com/v2/venues/';

export const explore4sq = 'https://api.foursquare.com/v2/venues/explore';
