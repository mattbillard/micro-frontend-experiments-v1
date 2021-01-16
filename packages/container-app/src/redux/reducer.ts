import { Reducer } from 'redux';
import {
  LOAD_SETTINGS,
  SAVE_GOLDEN_LAYOUT_CONFIG,
  SET_SETTING,
} from './actions';

export interface IContainerAppReducerState {
  goldenLayoutConfig: any;
  settings?: {
    isShadow: boolean;
    mode: string;
    showHints: boolean;
    showSettings: boolean;
  }
}

const initialState: IContainerAppReducerState = {
  goldenLayoutConfig: [],
  // settings: localStorage.settings ? JSON.parse(localStorage.settings) : {
  //   isShadow: false,
  //   mode: 'IMP_MODE',
  //   showHints: false,
  //   showSettings: false,
  // }
  settings: undefined,
};

export const containerAppReducer: Reducer<IContainerAppReducerState> = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SETTINGS: {
      const { settings } = action;

      return {
        ...state,
        settings,
      };
    }

    case SAVE_GOLDEN_LAYOUT_CONFIG: {
      const { goldenLayoutConfig } = action;

      // TODO: move to actions
      localStorage.setItem('goldenLayoutConfig', JSON.stringify(goldenLayoutConfig));

      return {
        ...state,
        goldenLayoutConfig,
      };
    }

    case SET_SETTING: {
      const { settings } = action;
      const newSettings = { ...settings };

      return {
        ...state,
        settings: newSettings,
      }
    }

    default:
      return state;
  }
}
