import axios from 'axios';

export const SAVE_GOLDEN_LAYOUT_CONFIG =  'SAVE_GOLDEN_LAYOUT_CONFIG';

export const saveGoldenLayoutConfig = (goldenLayoutConfig) => async (dispatch) => {
  // const url = `/api/......`;
  // const response = await axios.get(url);
  dispatch({ type: SAVE_GOLDEN_LAYOUT_CONFIG, goldenLayoutConfig});
}
