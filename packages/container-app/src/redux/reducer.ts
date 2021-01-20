import { Reducer } from 'redux';
import {
  UPDATE_GOLDEN_LAYOUT_CONFIG,
  UPDATE_SETTINGS,
} from './actions';

// TODO: types
export interface IContainerAppReducerState {
  goldenLayoutConfig: any;
  settings: any | {
    isShadow: boolean;
    mode: string;
    showHints: boolean;
    showSettings: boolean;
  };
}

const initialState: IContainerAppReducerState = {
  goldenLayoutConfig: undefined,
  settings: undefined,
};

export const containerAppReducer: Reducer<IContainerAppReducerState> = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_GOLDEN_LAYOUT_CONFIG: {
      const { goldenLayoutConfig } = action;
      const newGoldenLayoutConfig = { ...goldenLayoutConfig };

      return {
        ...state,
        goldenLayoutConfig: newGoldenLayoutConfig,
      }
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
