import axios from 'axios';
import { domainUrl } from '../config/domainUrl';

axios.defaults.baseURL = domainUrl;
// axios.defaults.headers.common['Authorization'] = '<AUTH_TOKEN>';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//hardcode a hotspot id from my db for now
const fakeHotspotId = '5c54b08d231ce64440d8292a';

//in the constructor I can define the class props that will be passed later to it
//(e.g. const hotspot = new HotspotApi(userId, hotspotId, commentId))
class HotspotApi {
  constructor() {
    this.hotspotId = fakeHotspotId;
    this.path = `/hotspots`;
  }

  /** [Not used anymore...] */
  async fetchHotspots(position) {
    try {
      console.log('===============');
      console.log('[HotspotApi]\nposition:\n', position);
      console.log('===============');
      //now we just return all the hotspots
      //next steps: use the users position to limit the returned hotspots
      const { data } = await axios.get(this.path);
      console.log('===============');
      console.log('data returned by axios:\n', data);
      console.log('===============');
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async fetchHotspotsWithinRadius(region) {
    const query = `lat=${region.latitude}&lng=${region.longitude}`;

    try {
      //now we just return all the hotspots
      //next steps: use the users position to limit the returned hotspots
      const { data } = await axios.get(`${this.path}/radius?${query}`);
      console.log('===============');
      console.log('data returned by axios:\n', data);
      console.log('===============');
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async createHotspot(args) {
    try {
      // console.log('===============');
      // console.log('[HotspotApi] create hotspot with args:', args);
      // console.log('===============');
      const response = await axios.post(`${this.path}/new`, args);
      // console.log('===============');
      // console.log('[HotspotApi] response:', response);
      // console.log('===============');
      return response;
    } catch (e) {
      throw new Error(e);
    }
  }

  async fetchHotspotComments(userId, hotspotId) {
    try {
      const { data } = await axios.get(
        `/${userId}${this.path}/${hotspotId}/comments`
      );
      console.log('===============');
      console.log('data returned by axios:\n', data);
      console.log('===============');

      return data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async createHotspotComment(userId, hotspotId, args) {
    try {
      const { data } = await axios.post(
        `/${userId}${this.path}/${hotspotId}/comments/new`,
        args
      );
      console.log('===============');
      console.log('data returned from axios:', data);
      console.log('===============');

      return data;
    } catch (e) {
      throw new Error(e);
    }
  }
}

export const Hotspot = new HotspotApi();
