import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { GoldenLayoutContainer } from '../../components';
import {
  goldenLayoutsettings,
  DEFAULT_GOLDEN_LAYOUT_CONFIG,
  DEFAULT_TWO_COLUMN_GOLDEN_LAYOUT_CONFIG,
  DEFAULT_MINIMAL_GOLDEN_LAYOUT_CONFIG,
} from '../../constants';
import { IStoreState, saveGoldenLayoutConfig, updateGoldenLayoutConfig, } from '../../redux';
import { xhrService } from '../../services';


export const GoldenLayoutWrapper = (props) => {
  const { goldenLayoutConfig } = useSelector((state: IStoreState) => state.containerAppReducer);
  const dispatch = useDispatch();
  const dispatchSaveGoldenLayout = (config) => dispatch(saveGoldenLayoutConfig(config));

  useEffect(() => {
    (async () => {
      const initialConfig = await xhrService.getGoldenLayoutConfig() || DEFAULT_GOLDEN_LAYOUT_CONFIG;
      // const initialConfig = await xhrService.getGoldenLayoutConfig() || DEFAULT_MINIMAL_GOLDEN_LAYOUT_CONFIG;
      // const initialConfig = DEFAULT_GOLDEN_LAYOUT_CONFIG;
      // const initialConfig = DEFAULT_TWO_COLUMN_GOLDEN_LAYOUT_CONFIG;
      // const initialConfig = DEFAULT_MINIMAL_GOLDEN_LAYOUT_CONFIG;

      // @ts-ignore
      initialConfig.settings = goldenLayoutsettings; // These should never be saved. The app should determine these
      
      dispatch(updateGoldenLayoutConfig(initialConfig));
    })()
  }, [])

  if (!goldenLayoutConfig) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <GoldenLayoutContainer goldenLayoutConfig={goldenLayoutConfig} dispatchSaveGoldenLayout={dispatchSaveGoldenLayout} />
  )
}