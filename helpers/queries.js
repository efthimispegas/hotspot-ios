import { stringify as queryString } from 'query-string';
import { Image } from 'react-native';
import { CLIENT_ID, CLIENT_SECRET } from '../src/config';

export const venuesQuery = ({ latitude, longitude }, nearby, query) => {
  return queryString({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    v: 20190120,
    ll: `${latitude},${longitude}`,
    near: nearby,
    limit: 20,
    query
  });
};

export const venueQuery = () => {
  return queryString({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    v: 20190120
  });
};

export const recommendationQuery = ({ latitude, longitude }, lookingFor) => {
  return queryString({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    v: 20180323,
    ll: `${latitude},${longitude}`,
    section: lookingFor,
    limit: 10,
    openNow: 1,
    venuePhotos: 1
  });
};
