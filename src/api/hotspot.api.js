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

  /**   Hotspots    */

  async fetchUserHotspots(userId) {
    try {
      //we just return all the user's hotspots
      const { data } = await axios.get(`/users/${userId}${this.path}`);
      console.log('===============');
      console.log('data returned by axios:\n', data);
      console.log('===============');
      return data;
    } catch (e) {
      throw e;
    }
  }

  async fetchAllUserHotspots(userId) {
    try {
      //we just return all the user's hotspots
      const { data } = await axios.get(`/users/${userId}${this.path}/all`);
      console.log('===============');
      console.log('data returned by axios:\n', data);
      console.log('===============');
      return data.myHotspots;
    } catch (e) {
      throw e;
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
      throw e;
    }
  }

  async createHotspot(args) {
    try {
      // console.log('===============');
      // console.log('[HotspotApi] create hotspot with args:', args);
      // console.log('===============');
      const { data } = await axios.post(`${this.path}/new`, args);
      console.log('===============');
      console.log('[Axios]data return from create hotspot call:', data);
      console.log('===============');
      return data;
    } catch (e) {
      throw e;
    }
  }

  async editHotspot(hotspotId, args) {
    try {
      const { data } = await axios.put(`${this.path}/${hotspotId}/edit`, args);
      console.log('===============');
      console.log('[Axios] data returned from editHotspot call:', data);
      console.log('===============');

      return data;
    } catch (e) {
      throw e;
    }
  }

  async deleteHotspot(hotspotId) {
    try {
      const { data } = await axios.delete(`${this.path}/${hotspotId}/delete`);
      console.log('===============');
      console.log('[Axios] data returned from deleteHotspot call:', data);
      console.log('===============');

      return data;
    } catch (e) {
      throw e;
    }
  }

  async deleteExpiredHotspots() {
    try {
      const { data } = await axios.delete(`${this.path}/expired`);
      console.log('===============');
      console.log('[Axios] data returned from deleteExpired call:', data);
      console.log('===============');

      return data;
    } catch (e) {
      throw e;
    }
  }

  async showMoreHotspots(page, limit, userId) {
    try {
      const query = `page=${page}&limit=${limit}`;
      const { data } = await axios.get(`users/${userId}${this.path}?${query}`);
      console.log('===============');
      console.log('[Axios] data returned from showMoreHotspots call:', data);
      console.log('===============');

      return data;
    } catch (e) {
      throw e;
    }
  }

  /**  Comments    */

  async fetchHotspotComments(userId, hotspotId) {
    try {
      const { data } = await axios.get(
        `/${userId}${this.path}/${hotspotId}/comments`
      );
      console.log('===============');
      console.log('[Axios] data returned from getHotspotComments: \n', data);
      console.log('===============');

      return data;
    } catch (e) {
      throw e;
    }
  }

  async createHotspotComment(userId, hotspotId, args) {
    try {
      const { data } = await axios.post(
        `/${userId}${this.path}/${hotspotId}/comments/new`,
        args
      );
      console.log('===============');
      console.log('[Axios] data returned from CreateHotspotComment:', data);
      console.log('===============');

      return data;
    } catch (e) {
      throw e;
    }
  }

  async showMoreComments(page, limit, userId, hotspotId) {
    try {
      const query = `page=${page}&limit=${limit}`;
      const { data } = await axios.get(
        `/${userId}${this.path}/${hotspotId}/comments?${query}`
      );
      console.log('===============');
      console.log('[Axios] data returned from showMoreComments call:', data);
      console.log('===============');

      return data;
    } catch (e) {
      throw e;
    }
  }
}

export const Hotspot = new HotspotApi();
