import axios from 'axios';
import { domainUrl } from '../config/domainUrl';

axios.defaults.baseURL = domainUrl;
// axios.defaults.headers.common['Authorization'] = '<AUTH_TOKEN>';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//in the constructor I can define the class props that will be passed later to it
//(e.g. const hotspot = new HotspotApi(userId, hotspotId, commentId))
class StatsApi {
  constructor() {
    this.path = '/stats';
  }

  async getTotalUsers() {
    try {
      const { data } = await axios.get(`${this.path}/users`);
      return data;
    } catch (e) {
      throw e;
    }
  }
  async getTotalHotspots() {
    try {
      const { data } = await axios.get(`${this.path}/hotspots`);
      return data;
    } catch (e) {
      throw e;
    }
  }
  async getTotalComments() {
    try {
      const { data } = await axios.get(`${this.path}/comments`);
      return data;
    } catch (e) {
      throw e;
    }
  }
  async getTotalViews() {
    try {
      const { data } = await axios.get(`${this.path}/views`);
      return data;
    } catch (e) {
      throw e;
    }
  }

  async getUserTotalHotspots(userId) {
    try {
      const { data } = await axios.get(`${this.path}/${userId}/hotspots`);
      return data;
    } catch (e) {
      throw e;
    }
  }
  async getUserTotalComments(userId) {
    try {
      const { data } = await axios.get(`${this.path}/${userId}/comments`);
      return data;
    } catch (e) {
      throw e;
    }
  }

  async getGenderRatio(userId) {
    try {
      const { data } = await axios.get(`${this.path}/${userId}/ratio`);
      return data;
    } catch (e) {
      throw e;
    }
  }
}

export const Stats = new StatsApi();
