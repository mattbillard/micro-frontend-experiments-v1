import axios from 'axios';

export const LOAD_SETTINGS =  'LOAD_SETTINGS';
export const SAVE_GOLDEN_LAYOUT_CONFIG =  'SAVE_GOLDEN_LAYOUT_CONFIG';
export const SET_SETTING =  'SET_SETTING';

export const saveGoldenLayoutConfig = (goldenLayoutConfig) => async (dispatch) => {
  // const url = `/api/......`;
  // const response = await axios.get(url);
  dispatch({ type: SAVE_GOLDEN_LAYOUT_CONFIG, goldenLayoutConfig});
}

export const loadSettings = () => (dispatch) => {
  setTimeout(() => {
    const settings = localStorage.settings ? JSON.parse(localStorage.settings) : {
      isShadow: false,
      mode: 'IMP_MODE',
      showHints: false,
      showSettings: false,
    };

    dispatch({ type: LOAD_SETTINGS, settings });
  }, 500);
}

export const setSetting = (key, value) => (dispatch, getState) => {
  const { settings } = getState().containerAppReducer;
  settings[key] = value;

  setTimeout(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
    dispatch({ type: SET_SETTING, settings });
  }, 500);
}
