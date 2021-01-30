import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as jsCookie from 'js-cookie';

import { MicroFrontendMode } from '../../constants';
import { IStoreState, setSetting } from '../../redux';

interface ISettingsMenuProps {
  toggleShowSettings: () => void;
}

export const SettingsMenu = (props: ISettingsMenuProps) => {
  const username = jsCookie.get('username');
  const { toggleShowSettings } = props;
  const dispatch = useDispatch();
  const { isShadow, mode, showHints } = useSelector((state: IStoreState) => state.containerAppReducer.settings);

  const handleChangeSetting = (key, value, reload = false) => {
    dispatch(setSetting(key, value));

    if (reload) {
      setTimeout(() => window.location.reload(), 100);
    }
  }

  const logout = () => {
    toggleShowSettings();
    setTimeout(() => {
      jsCookie.remove('username');
      window.location.reload();
    })
  }

  return (
    <div className="settings-menu">
      <div>
        <div>
          Username: {username}
        </div>
        <div>
          Mode: {mode}
        </div>
        <ul>
          <li><a onClick={() => handleChangeSetting('mode', MicroFrontendMode.Iframe)}>{MicroFrontendMode.Iframe}</a></li>
          <li>
            <a onClick={() => handleChangeSetting('mode', MicroFrontendMode.InjectWholeApp)}>{MicroFrontendMode.InjectWholeApp}</a> |
            <a onClick={() => handleChangeSetting('isShadow', !isShadow, true)}>{String(isShadow)}</a>
          </li>
          <li><a onClick={() => handleChangeSetting('mode', MicroFrontendMode.LazyLoad)}>{MicroFrontendMode.LazyLoad}</a></li>
          <li><a onClick={() => handleChangeSetting('mode', MicroFrontendMode.RemoteComponent)}>{MicroFrontendMode.RemoteComponent}</a></li>
        </ul>
      </div>
      <div>
        Show hints: 
        <a onClick={() => handleChangeSetting('showHints', !showHints)}>{String(showHints)}</a>
      </div>
      <div>
        <br/>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  )
}
