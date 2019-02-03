import axios from 'axios';
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
  url = 'http://192.168.10.7:3000/api/';
}

axios.defaults.baseURL = url;

const fakeHotspotId = '5c54b08d231ce64440d8292a';

class HotspotApi {
  constructor() {
    this.hotspotId = fakeHotspotId;
    this.path = `/hotspots/${this.hotspotId}/comments`;
  }

  async fetchHotspots(position) {
    try {
      console.log('===============');
      console.log('[HotspotApi]\npostion:\n', position);
      console.log('===============');
      const { data } = await axios.get('/hotspots');
      console.log('===============');
      console.log('data returned by axios:\n', data);
      console.log('===============');
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async fetchHotspotComments() {
    try {
      const { data } = await axios.get(this.path);
      return data;
    } catch (e) {
      throw e;
    }
  }

  async createHotspot(args) {
    try {
      console.log('===============');
      console.log('args given:\n', args);
      console.log('===============');
      const response = await axios.post(`/hotspots/new`, args);
      return response;
    } catch (e) {
      throw e;
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

export default HotspotApi;
