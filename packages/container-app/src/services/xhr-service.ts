import axios from 'axios';

import {
  DEFAULT_GOLDEN_LAYOUT_CONFIG,
  DEFAULT_SETTINGS,
} from '../constants';

export const getGoldenLayoutConfig = async () => {
  const response = await axios.get('/api/golden-layout-config');
  return response.data;
}

export const saveGoldenLayoutConfig = async (goldenLayoutConfig) => {
  return axios.post('/api/golden-layout-config', goldenLayoutConfig);
}




export const getSettings = async () => {
  const response = await axios.get('/api/settings');
  return response.data || DEFAULT_SETTINGS;
}

export const saveSettings = async (settings) => {
  return axios.post('/api/settings', settings);
}
