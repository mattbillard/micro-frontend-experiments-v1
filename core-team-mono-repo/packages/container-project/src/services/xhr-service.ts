import axios from 'axios';

import { DEFAULT_SETTINGS } from '../constants';

export const getAppAndNavDefinitions = async () => {
  const response = await axios.get(
    '/cdn/app-and-nav-definitions/app-and-nav-definitions.json',
  );
  return response.data;
};

export const getGoldenLayoutConfig = async () => {
  const response = await axios.get('/api/golden-layout-config');
  return response.data;
};

export const saveGoldenLayoutConfig = async (goldenLayoutConfig) => {
  const payload = {
    goldenLayoutConfig,
    windowId: sessionStorage.windowId,
  };
  return axios.post('/api/golden-layout-config', payload);
};

export const getSettings = async () => {
  const response = await axios.get('/api/settings');
  return response.data || DEFAULT_SETTINGS;
};

export const saveSettings = async (settings) => {
  const payload = {
    settings,
    windowId: sessionStorage.windowId,
  };
  return axios.post('/api/settings', payload);
};
