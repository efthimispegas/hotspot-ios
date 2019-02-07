import { service as axios } from '../api';

const fakeUserId = '5c54b1a4231ce64440d8292f';
class UserApi {
  constructor() {
    this.userId = fakeUserId;
    this.path = `/users/${this.userId}`;
  }

  async fetchUsers() {
    try {
      //make an axios call to somewhere
      const res = await axios.get('somewhere');
      console.log('===============');
      console.log('data returned by axios:\n', res);
      console.log('===============');
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async login(args) {
    try {
      //make an axios call to my server
      const res = await axios.post(`/users/login`, args);
      console.log('===============');
      console.log('data returned by axios:\n', res);
      console.log('===============');
      return res;
    } catch (e) {
      throw new Error(e);
    }
  }

  async createHotspotComment(args) {
    try {
      const response = await axios.post(`${this.path}/new`, args);
      return response;
    } catch (e) {
      throw e;
    }
  }
}

export const User = new UserApi();
