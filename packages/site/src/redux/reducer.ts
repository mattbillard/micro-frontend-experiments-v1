import { Reducer } from 'redux';

import { MicroFrontendMode } from '../constants';
import {
  UPDATE_USERNAME,
  UPDATE_APP_AND_NAV_DEFINITIONS,
  UPDATE_GOLDEN_LAYOUT_CONFIG,
  UPDATE_SETTINGS,
} from '../redux';
import { IAppAndNavDefinitions } from '../types';

export interface IContainerAppReducerState {
  appAndNavDefinitions?: IAppAndNavDefinitions;
  goldenLayoutConfig: any;
  settings:
    | any
    | {
        isIframe: boolean;
        isShadow: boolean;
        mode: MicroFrontendMode;
        showHints: boolean;
        showSettingsMenu: boolean;
        showUserMenu: boolean;
      };
  username?: string;
}

const initialState: IContainerAppReducerState = {
  appAndNavDefinitions: undefined,
  goldenLayoutConfig: undefined,
  settings: undefined,
  username: undefined,
};

export const containerAppReducer: Reducer<IContainerAppReducerState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case UPDATE_USERNAME: {
      const { username } = action;

      return {
        ...state,
        username,
      };
    }

    case UPDATE_APP_AND_NAV_DEFINITIONS: {
      const { appAndNavDefinitions } = action;

      return {
        ...state,
        appAndNavDefinitions,
      };
    }

    case UPDATE_GOLDEN_LAYOUT_CONFIG: {
      const { goldenLayoutConfig } = action;
      const newGoldenLayoutConfig = { ...goldenLayoutConfig };

      return {
        ...state,
        goldenLayoutConfig: newGoldenLayoutConfig,
      };
    }

    case UPDATE_SETTINGS: {
      const { settings } = action;
      const newSettings = { ...settings };

      return {
        ...state,
        settings: newSettings,
      };
    }

    default:
      return state;
  }
};
