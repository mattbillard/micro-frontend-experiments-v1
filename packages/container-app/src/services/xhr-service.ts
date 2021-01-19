import axios from 'axios';

import {
  DEFAULT_GOLDEN_LAYOUT_CONFIG,
  DEFAULT_SETTINGS,
} from '../constants';

export const getGoldenLayoutConfig = async () => {
  // return DEFAULT_GOLDEN_LAYOUT_CONFIG;
  
  const response = await axios.get('/api/golden-layout-config');
  const goldenLayoutConfig = response.data || DEFAULT_GOLDEN_LAYOUT_CONFIG;
  return goldenLayoutConfig;
}

export const saveGoldenLayoutConfig = async (goldenLayoutConfig) => {
  return axios.post('/api/golden-layout-config', goldenLayoutConfig);
}




export const getSettings = async () => {
  const response = await axios.get('/api/settings');
  const settings = response.data || DEFAULT_SETTINGS;
  return settings;
}

export const saveSettings = async (settings) => {
  return axios.post('/api/settings', settings);
}
