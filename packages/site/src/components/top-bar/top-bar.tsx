import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import jsCookie from 'js-cookie';

import { SettingsMenu, UserMenu } from '../../components';
import { IStoreState, patchSettings } from '../../redux';

import './top-bar.less';

declare const window: any;

export const TopBar = () => {
  const username = jsCookie.get('username');
  const { showSettingsMenu, showUserMenu } = useSelector(
    (state: IStoreState) => state.containerAppReducer.settings,
  );
  const appAndNavDefinitions = useSelector((state: IStoreState) => state.containerAppReducer)
    .appAndNavDefinitions!;
  const dispatch = useDispatch();
  const isOpenFin = !!window.fin;

  const toggleSettingsMenu = () => {
    dispatch(
      patchSettings({
        showSettingsMenu: !showSettingsMenu,
        showUserMenu: false,
      }),
    );
  };

  const toggleUserMenu = () => {
    dispatch(
      patchSettings({
        showSettingsMenu: false,
        showUserMenu: !showUserMenu,
      }),
    );
  };

  return (
    <div className="navigation">
      <div className="nav-links">
        {!isOpenFin && <span className="brand">MattFin</span>}
        {appAndNavDefinitions.nav.map((navItem) => (
          <Link key={navItem.parentUrl} to={navItem.parentUrl}>
            {navItem.navItemText}
          </Link>
        ))}
        <Link to="/site-url/golden-layout">Golden Layout</Link>
      </div>

      <div className="menu-container">
        <a href="#" onClick={toggleSettingsMenu}>
          Settings
        </a>
        {showSettingsMenu && <SettingsMenu />}
        <a href="#" onClick={toggleUserMenu}>
          {username}
        </a>
        {showUserMenu && <UserMenu toggleUserMenu={toggleUserMenu} />}
      </div>
    </div>
  );
};
