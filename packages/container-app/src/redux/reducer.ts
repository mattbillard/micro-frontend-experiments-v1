import { Reducer } from 'redux';
import {
  UPDATE_SETTINGS,
  SAVE_GOLDEN_LAYOUT_CONFIG,
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
    case SAVE_GOLDEN_LAYOUT_CONFIG: {
      const { goldenLayoutConfig } = action;

      // TODO: move to actions
      localStorage.setItem('goldenLayoutConfig', JSON.stringify(goldenLayoutConfig));

      return {
        ...state,
        goldenLayoutConfig,
      };
    }

    case UPDATE_SETTINGS: {
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
