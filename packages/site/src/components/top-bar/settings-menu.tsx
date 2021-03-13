import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jsCookie from 'js-cookie';

import { MicroFrontendMode } from '../../constants';
import { IStoreState, setSetting } from '../../redux';

interface ISettingsMenuProps {
  toggleShowSettings: () => void;
}

export const SettingsMenu = (props: ISettingsMenuProps) => {
  const username = jsCookie.get('username');
  const { toggleShowSettings } = props;
  const dispatch = useDispatch();
  const { isIframe, isShadow, mode, showHints } = useSelector(
    (state: IStoreState) => state.containerAppReducer.settings,
  );

  const handleChangeSetting = (key: string, value: any, reload = false) => {
    dispatch(setSetting(key, value));

    if (reload) {
      setTimeout(() => window.location.reload(), 100);
    }
  };

  const logout = () => {
    toggleShowSettings();
    setTimeout(() => {
      jsCookie.remove('username');
      window.location.reload();
    });
  };

  // prettier-ignore
  return (
    <div className="settings-menu">
      <div>
        <div>
          Username: {username} <br/><br/>
          Mode: {mode} <br/>
          CSS Encapsulation: <a onClick={() => handleChangeSetting('isShadow', !isShadow)}>{String(isShadow)}</a><br/>
          {/* Iframe Encapsulation: <a onClick={() => handleChangeSetting('isIframe', !isIframe)}>{String(isIframe)}</a><br/> */}
        </div>
        <ul>
          <li><a onClick={() => handleChangeSetting('mode', MicroFrontendMode.LazyImport)}>Dynamic import()</a></li>
          <li><a onClick={() => handleChangeSetting('mode', MicroFrontendMode.Iframe)}>Iframe</a></li>
          <li><a onClick={() => handleChangeSetting('mode', MicroFrontendMode.InjectWholeAppHtml)}>Inject App HTML</a></li>
          <li><a onClick={() => handleChangeSetting('mode', MicroFrontendMode.RemoteComponent)}>Component From URL</a></li>
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
};
