import axios from 'axios';
import { domainUrl } from '../config/domainUrl';

axios.defaults.baseURL = domainUrl;
// axios.defaults.headers.common['Authorization'] = '<AUTH_TOKEN>';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// const fakeUserId = '5c54b1a4231ce64440d8292f';
class UserApi {
  constructor() {
    this.path = `/users`;
  }

  async fetchUser(userId) {
    try {
      //make an axios call to somewhere
      const { data } = await axios.get(`${this.path}/${userId}`);
      console.log('===============');
      console.log('data returned by axios:\n', data);
      console.log('===============');
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async register(args) {
    try {
      //make an axios call to my server
      const { data } = await axios.post(`/register`, args);
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }
  async login(args) {
    try {
      //make an axios call to my server
      const { data } = await axios.post(`/login`, args);
      console.log('===============');
      console.log('data returned by axios:\n', data);
      console.log('===============');
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateUser(nextUser) {
    try {
      const { data } = await axios.post(
        `${this.path}/${nextUser._id}/update`,
        nextUser
      );
      console.log('===============');
      console.log('data returned by axios:', data);
      console.log('===============');
    } catch (e) {
      throw new Error(e);
    }
  }
}

export const User = new UserApi();
