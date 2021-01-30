import * as React from 'react';
import { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import * as jsCookie from 'js-cookie';

import {
  GoldenLayoutContainer,
  Navigation,
  PageComponent,
} from '../components';
import {
  DEFAULT_SETTINGS,
} from '../constants';
import { 
  IStoreState,
  loadInitialGoldenLayoutConfig,
  loadInitialSettings,
  updateGoldenLayoutConfig,
  updateSettings,
} from '../redux';
import { 
  xhrService,
  wsService,
} from '../services';

interface IContainerRouterProps {
}

export const ContainerRouter = (props: IContainerRouterProps) => {
  // TODO: login should be more realistic: XHR to server. Create cookie. Also whoami XHR
  const username = jsCookie.get('username');
  const { 
    goldenLayoutConfig, 
    settings,
  } = useSelector((state: IStoreState) => state.containerAppReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      wsService.connect(handleWsMessage);
  
      // Load initial data
      dispatch(loadInitialSettings());

      // Load initial data
      // const settings = await xhrService.getSettings() || DEFAULT_SETTINGS;
      // dispatch(updateSettings(settings));
    })();
  }, []);

  const handleWsMessage = (wsMsgObj) => {
    if (!document.hasFocus()) {
      return;
    }
    
    switch (wsMsgObj.action) {
      case 'UPDATE_GOLDEN_LAYOUT_CONFIG': {
        const { payload } = wsMsgObj;
        dispatch(updateGoldenLayoutConfig(payload))
        break;
      }

      case 'UPDATE_SETTINGS': {
        const { payload } = wsMsgObj;
        dispatch(updateSettings(payload))
        break;
      }
    }
  }

  if (!settings) {
    return (
      <div>Loading...</div>
    )
  }
  
  const { showHints } = settings;
  const className = showHints ? 'show-hints' : '';

  return (
    <div className={className}>
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route path="/container/golden-layout" component={GoldenLayoutContainer} />
          <Route path="/container/page/*" component={PageComponent} />
          <Redirect from="/*" to="/container/golden-layout" />
        </Switch>
      </BrowserRouter>
    </div>
  )
}


