import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as jsCookie from 'js-cookie';
import { useDispatch, useSelector } from "react-redux";

import {
  SettingsMenu,
} from '../../components';
import { appNav } from '../../constants';
import { IStoreState, setSetting } from '../../redux';

interface INavigationProps {
}

export const Navigation = (props: INavigationProps) => {
  const { showSettings } = useSelector((state: IStoreState) => state.containerAppReducer.settings);
  const dispatch = useDispatch();

  const toggleShowSettings = () => {
    dispatch(setSetting('showSettings', !showSettings));
  }

  return (
    <div className="navigation">
      <div className="nav-links">
        <span className="brand">
          MattFin
        </span>
        {/* TODO: move to feature defs? */}
        <Link to='/container-url/golden-layout'>Golden</Link>
        {appNav.map(navItem => (
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
