import { Reducer } from 'redux';
import {
  SAVE_GOLDEN_LAYOUT_CONFIG,
} from './actions';

export interface IContainerAppReducerState {
  goldenLayoutConfig: any;
}

const initialState: IContainerAppReducerState = {
  goldenLayoutConfig: [],
};

export const containerAppReducer: Reducer<IContainerAppReducerState> = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_GOLDEN_LAYOUT_CONFIG:
      const { goldenLayoutConfig } = action;
      
      const config = JSON.stringify(goldenLayoutConfig);
      localStorage.setItem('goldenLayoutConfig', config);

      return {
        ...state,
        goldenLayoutConfig,
      };

    default:
      return state;
  }
}
