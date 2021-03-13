import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { SettingsMenu } from '../../components';
import { IStoreState, setSetting } from '../../redux';

import './top-bar.less';

declare const window: any;

export const Navigation = () => {
  const { showSettings } = useSelector(
    (state: IStoreState) => state.containerAppReducer.settings,
  );
  const appAndNavDefinitions = useSelector(
    (state: IStoreState) => state.containerAppReducer,
  ).appAndNavDefinitions!;
  const dispatch = useDispatch();
  const isOpenFin = !!window.fin;

  const toggleShowSettings = () => {
    dispatch(setSetting('showSettings', !showSettings));
  };

  return (
    <div className="navigation">
      <div className="nav-links">
        {!isOpenFin && <span className="brand">MattFin</span>}
        {appAndNavDefinitions.nav.map((navItem) => (
          <Link key={navItem.parentUrl} to={navItem.parentUrl}>
            {navItem.text}
          </Link>
        ))}
        {/* TODO: move to feature defs? */}
        <Link to="/site-url/golden-layout">Golden</Link>
      </div>

      <div>
        <a href="#" onClick={toggleShowSettings}>
          Settings
        </a>
        {showSettings && (
          <SettingsMenu toggleShowSettings={toggleShowSettings} />
        )}
      </div>
    </div>
  );
};
