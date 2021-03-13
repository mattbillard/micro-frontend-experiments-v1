import { xhrService } from '../services';
import { definitionUtils } from '../utils';

export const UPDATE_USERNAME = 'UPDATE_USERNAME';
export const UPDATE_APP_AND_NAV_DEFINITIONS = 'UPDATE_APP_AND_NAV_DEFINITIONS';
export const UPDATE_GOLDEN_LAYOUT_CONFIG = 'UPDATE_GOLDEN_LAYOUT_CONFIG';
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';

export const loadAppAndNavDefinitions = () => async (dispatch) => {
  const appAndNavDefinitions = await xhrService.getAppAndNavDefinitions();
  // TODO: probably clearer to initialize elsewhere
  definitionUtils.init(appAndNavDefinitions);
  dispatch({ type: UPDATE_APP_AND_NAV_DEFINITIONS, appAndNavDefinitions });
};

export const saveGoldenLayoutConfig = (goldenLayoutConfig) => async (dispatch) => {
  xhrService.saveGoldenLayoutConfig(goldenLayoutConfig);
  dispatch(updateGoldenLayoutConfig(goldenLayoutConfig));
};

export const loadInitialGoldenLayoutConfig = () => async (dispatch) => {
  const goldenLayoutConfig = await xhrService.getGoldenLayoutConfig();
  dispatch(updateGoldenLayoutConfig(goldenLayoutConfig));
};

export const updateGoldenLayoutConfig = (goldenLayoutConfig) => {
  return { type: UPDATE_GOLDEN_LAYOUT_CONFIG, goldenLayoutConfig };
};

export const loadInitialSettings = () => async (dispatch) => {
  const settings = await xhrService.getSettings();
  dispatch(updateSettings(settings));
};

export const updateSettings = (settings) => {
  return { type: UPDATE_SETTINGS, settings };
};

export const patchSettings = (partialSettings) => async (dispatch, getState) => {
  const { settings } = getState().containerAppReducer;
  const updatedSettings = {
    ...settings,
    ...partialSettings,
  };

  xhrService.saveSettings(updatedSettings);
  dispatch(updateSettings(updatedSettings));
};

export const updateUsername = (username) => {
  return { type: UPDATE_USERNAME, username };
};
