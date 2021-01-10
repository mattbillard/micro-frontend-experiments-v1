import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { IStoreState, setSetting } from '../redux';

interface ISettingsMenuProps {
  toggleShowSettings: () => void;
}

export const SettingsMenu = (props: ISettingsMenuProps) => {
  const { toggleShowSettings } = props;
  const dispatch = useDispatch();
  const { isShadow, mode, showHints } = useSelector((state: IStoreState) => state.containerAppReducer.settings);

  const handleChangeSetting = (key, value) => {
    dispatch(setSetting(key, value));
  }

  const clearLocalStorage = () => {
    localStorage.clear();
  }

  return (
    <div className="settings-menu">
      <div>
        Mode: {mode} {isShadow}
        <ul>
          <li><a onClick={() => handleChangeSetting('mode', 'IFRAME_MODE')}>Iframes</a></li>
          <li>
            <a onClick={() => handleChangeSetting('mode', 'WC_MODE')}>Web Component</a> |
            <a href="" onClick={() => handleChangeSetting('isShadow', !isShadow)}>{String(isShadow)}</a>
          </li>
          <li><a onClick={() => handleChangeSetting('mode', 'IMP_MODE')}>Import</a></li>
        </ul>
      </div>
      <div>
        Show hints: 
        <a onClick={() => handleChangeSetting('showHints', !showHints)}>{String(showHints)}</a>
      </div>
      <div>
        <a href="" onClick={clearLocalStorage}>Clear localStorage</a>
      </div>
      <div>
        <br/>
        <button onClick={toggleShowSettings}>OK</button>
      </div>
    </div>
  )
}
