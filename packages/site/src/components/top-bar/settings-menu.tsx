import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MicroFrontendMode } from '../../constants';
import { IStoreState, patchSettings } from '../../redux';

interface ISettingsMenuProps {}

export const SettingsMenu = (props: ISettingsMenuProps) => {
  const dispatch = useDispatch();
  const { isIframe, isShadow, mode, showHints } = useSelector(
    (state: IStoreState) => state.containerAppReducer.settings,
  );

  const handleChangeSetting = (key: string, value: any, reload = false) => {
    dispatch(patchSettings({ [key]: value }));

    if (reload) {
      setTimeout(() => window.location.reload(), 100);
    }
  };

  // prettier-ignore
  return (
    <div className="dropdown-menu settings-menu">
      <div>
        <div>
          <h3>Try Me!</h3>
          <strong>Micro Frontend Mode: </strong> 
          {mode} <br/>
        </div>
        <ol>
          <li>
            <a onClick={() => handleChangeSetting('mode', MicroFrontendMode.DynamicImport)}>
              <strong>Dynamic import()</strong> <br/>
              Standard/most common solution
            </a>
          </li>
          <li>
            <a onClick={() => handleChangeSetting('mode', MicroFrontendMode.Iframe)}>
              <strong>Iframe</strong> <br/>
              Easiest/oldest solution
            </a>
          </li>
          <li>
            <a onClick={() => handleChangeSetting('mode', MicroFrontendMode.InjectWholeAppHtml)}>
              <strong>Inject Whole App HTML</strong> <br/>
              Innovative/weird solution
            </a>
          </li>
          <li>
            <a onClick={() => handleChangeSetting('mode', MicroFrontendMode.RemoteComponent)}>
              <strong>Load "Remote Component" From URL</strong> <br/>
              Best solution
            </a>
          </li>
        </ol>
      </div>
      <div>
        <strong>More Options</strong><br/>
        <ul>
          <li>
            ShadowDOM CSS Encapsulation: <a onClick={() => handleChangeSetting('isShadow', !isShadow)}>{String(isShadow)}</a><br/>
          </li>
          {/* <li>
            Iframe Encapsulation: <a onClick={() => handleChangeSetting('isIframe', !isIframe)}>{String(isIframe)}</a><br/>
          </li> */}
          <li>
            Show Hints: <a onClick={() => handleChangeSetting('showHints', !showHints)}>{String(showHints)}</a>
          </li>
        </ul>
      </div>
    </div>
  )
};
