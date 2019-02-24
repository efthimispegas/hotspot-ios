import axios from 'axios';
import { domainUrl } from '../config/domainUrl';
import ErrorHandler from './error.api';

axios.defaults.baseURL = domainUrl;
// axios.defaults.headers.common['Authorization'] = '<AUTH_TOKEN>';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// const fakeUserId = '5c54b1a4231ce64440d8292f';
class UserApi {
  constructor() {
    this.getPath = userId => `/users/${userId}`;
  }

  async fetchUser(access_token) {
    try {
      //make an axios call to somewhere
      const { data } = await axios.post('/verify', { access_token });
      console.log('===============');
      console.log('data returned by axios:\n', data);
      console.log('===============');
      return data;
    } catch (e) {
      throw new ErrorHandler(e.message).error;
    }
  }

  async register(args) {
    try {
      //make an axios call to my server
      const { data } = await axios.post('/register', args);
      console.log('===============');
      console.log('data from axios:', data);
      console.log('===============');
      return data;
    } catch (e) {
      throw new ErrorHandler(e.message).error;
    }
  }
  async login(args) {
    try {
      //make an axios call to my server
      const { data } = await axios.post('/login', args);
      console.log('===============');
      console.log('data returned by axios:\n', data);
      console.log('===============');
      return data;
    } catch (e) {
      throw new ErrorHandler(e.message).error;
    }
  }

  async updateUser(nextUser) {
    try {
      const { data } = await axios.put(
        `${this.getPath(nextUser._id)}/edit`,
        nextUser
      );
      console.log('===============');
      console.log('data returned by axios:', data);
      console.log('===============');

      return data;
    } catch (e) {
      throw new ErrorHandler(e.message).error;
    }
  }
}

export const User = new UserApi();
