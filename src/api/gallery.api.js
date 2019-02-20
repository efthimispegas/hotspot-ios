import axios from 'axios';
import { domainUrl } from '../config/domainUrl';

axios.defaults.baseURL = domainUrl;
// axios.defaults.headers.common['Authorization'] = '<AUTH_TOKEN>';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// const fakeUserId = '5c54b1a4231ce64440d8292f';
class GalleryApi {
  constructor() {
    this.getPath = userId => `/users/${userId}/gallery`;
  }

  async imageUpload(userId, file) {
    try {
      const { data } = await axios.post(`${this.getPath(userId)}/upload`, file);
      console.log('===============');
      console.log('data from axios:', data);
      console.log('===============');
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async fetchUserGallery(userId) {
    try {
      //make an axios call to somewhere
      const { data } = await axios.get(`${this.getPath(userId)}`);
      console.log('===============');
      console.log('data returned by axios:\n', data);
      console.log('===============');
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }
}

export const Gallery = new GalleryApi();
