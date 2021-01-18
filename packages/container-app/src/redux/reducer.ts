import { Reducer } from 'redux';
import {
  UPDATE_GOLDEN_LAYOUT_CONFIG,
  UPDATE_SETTINGS,
  SAVE_GOLDEN_LAYOUT_CONFIG,
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
    case SAVE_GOLDEN_LAYOUT_CONFIG: {
      const { goldenLayoutConfig } = action;

      // TODO: move to actions
      localStorage.setItem('goldenLayoutConfig', JSON.stringify(goldenLayoutConfig));

      return {
        ...state,
        goldenLayoutConfig,
      };
    }

    case UPDATE_GOLDEN_LAYOUT_CONFIG: {
      // console.log('....updateGoldenLayoutConfig: reducer');
      const { goldenLayoutConfig } = action;
      // const newGoldenLayoutConfig = { ...goldenLayoutConfig };
      const newGoldenLayoutConfig = JSON.parse(JSON.stringify(goldenLayoutConfig));

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
