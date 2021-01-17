import axios from 'axios';

const DEFAULT_SETTINGS = {
  isShadow: false,
  mode: 'IMP_MODE',
  showHints: false,
  showSettings: false,
};

export const getSettings = async () => {
  const response = await axios.get('/api/settings');
  const settings = response.data || DEFAULT_SETTINGS;
  return settings;
}

export const saveSettings = async (settings) => {
  return axios.post('/api/settings', settings);
}
