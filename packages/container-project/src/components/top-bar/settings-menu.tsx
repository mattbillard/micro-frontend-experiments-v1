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
          Username: {username} <br/><br/>
          Mode: {mode} <br/>
          ShadowDOM: <a onClick={() => handleChangeSetting('isShadow', !isShadow)}>{String(isShadow)}</a>
        </div>
        <ul>
          <li><a onClick={() => handleChangeSetting('mode', MicroFrontendMode.Iframe)}>{MicroFrontendMode.Iframe}</a></li>
          <li><a onClick={() => handleChangeSetting('mode', MicroFrontendMode.InjectWholeAppHtml)}>{MicroFrontendMode.InjectWholeAppHtml}</a></li>
          <li><a onClick={() => handleChangeSetting('mode', MicroFrontendMode.LazyImport)}>{MicroFrontendMode.LazyImport}</a></li>
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
