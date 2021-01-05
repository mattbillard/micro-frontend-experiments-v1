import * as React from 'react';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";

const customHistory = createBrowserHistory();

import {
  GoldenLayoutComponent,
  IframeComponent,
  PageComponent,
  WebComponent,
} from '../components';

interface ISettingsMenuProps {
  toggleShowSettings: () => void;
}

export const SettingsMenu = (props: ISettingsMenuProps) => {
  const { toggleShowSettings } = props;
  const mode = localStorage.mode || 'IFRAME_MODE';
  const isShadow = localStorage.isShadow === 'true' ? true : false;
  const showHints = localStorage.showHints === 'true' ? true : false;

  const clearLocalStorage = () => {
    localStorage.clear();
  }

  const setMode = (newMode: string) => {
    localStorage.mode = newMode;
  }

  const toggleShadow = () => {
    localStorage.isShadow = !isShadow;
  }

  const toggleShowHints = () => {
    localStorage.showHints = !showHints;
  }


  return (
    <div className="settings-menu">
      <div>
        Mode: {mode} {isShadow}
        <ul>
          <li><a href="" onClick={() => setMode('IFRAME_MODE')}>Iframes</a></li>
          <li>
            <a href="" onClick={() => setMode('WC_MODE')}>Web Component</a> |
            <a href="" onClick={toggleShadow}>{String(isShadow)}</a>
          </li>
          <li><a href="" onClick={() => setMode('IMP_MODE')}>Import</a></li>
        </ul>
      </div>
      <div>
        Show hints: 
        <a href="" onClick={toggleShowHints}>{String(showHints)}</a>
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
