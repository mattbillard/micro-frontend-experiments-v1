import { Reducer } from 'redux';
import {
  SAVE_GOLDEN_LAYOUT_CONFIG,
  SET_SETTING,
} from './actions';

export interface IContainerAppReducerState {
  goldenLayoutConfig: any;
  settings: {
    isShadow: boolean;
    mode: string;
    showHints: boolean;
    showSettings: boolean;
  }
}

const initialState: IContainerAppReducerState = {
  goldenLayoutConfig: [],
  settings: localStorage.settings ? JSON.parse(localStorage.settings) : {
    isShadow: false,
    mode: 'IFRAME_MODE',
    showHints: false,
    showSettings: false,
  }
};

export const containerAppReducer: Reducer<IContainerAppReducerState> = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_GOLDEN_LAYOUT_CONFIG: {
      const { goldenLayoutConfig } = action;

      localStorage.setItem('goldenLayoutConfig', JSON.stringify(goldenLayoutConfig));

      return {
        ...state,
        goldenLayoutConfig,
      };
    }

    case SET_SETTING: {
      const { key, value } = action;
      const newSettings = { ...state.settings };
      newSettings[key] = value;

      localStorage.setItem('settings', JSON.stringify(newSettings));

      return {
        ...state,
        settings: newSettings,
      }
    }

    default:
      return state;
  }
}
