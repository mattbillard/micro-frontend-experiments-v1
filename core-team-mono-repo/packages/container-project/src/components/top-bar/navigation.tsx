import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as jsCookie from 'js-cookie';
import { useDispatch, useSelector } from "react-redux";

import {
  SettingsMenu,
} from '../../components';
import { IStoreState, setSetting } from '../../redux';

declare const window: any;

export const Navigation = () => {
  const { showSettings } = useSelector((state: IStoreState) => state.containerAppReducer.settings);
  const appAndNavDefinitions = useSelector((state: IStoreState) => state.containerAppReducer).appAndNavDefinitions!;
  const dispatch = useDispatch();
  const isOpenFin = !!window.fin;

  const toggleShowSettings = () => {
    dispatch(setSetting('showSettings', !showSettings));
  }

  return (
    <div className="navigation">
      <div className="nav-links">
        {!isOpenFin && 
          <span className="brand">MattFin</span>
        }
        {/* TODO: move to feature defs? */}
        <Link to='/container-url/golden-layout'>Golden</Link>
        {appAndNavDefinitions.nav.map(navItem => (
          <Link key={navItem.parentUrl} to={navItem.parentUrl}>{navItem.text}</Link>
        ))}
      </div>

      <div>
        <a href="#" onClick={toggleShowSettings}>Settings</a>
        {showSettings && <SettingsMenu toggleShowSettings={toggleShowSettings} />}
      </div>
    </div>
  )
}
