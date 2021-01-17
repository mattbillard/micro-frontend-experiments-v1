import * as React from 'react';
import { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import * as jsCookie from 'js-cookie';

import { loadInitialSettings } from '../redux';

import {
  GoldenLayoutComponent,
  Navigation,
  PageComponent,
} from '../components';
import { 
  IStoreState,
  updateSettings,
} from '../redux';
import { wsService } from '../services';

interface IContainerRouterProps {
}

export const ContainerRouter = (props: IContainerRouterProps) => {
  // TODO: login should be more realistic: XHR to server. Create cookie. Also whoami XHR
  const username = jsCookie.get('username');
  const settings = useSelector((state: IStoreState) => state.containerAppReducer.settings);
  const dispatch = useDispatch();

  useEffect(() => {
    wsService.connect(handleWsMessage);
    dispatch(loadInitialSettings());
  }, []);

  const handleWsMessage = (wsMsgObj) => {
    switch (wsMsgObj.action) {
      case 'UPDATE_SETTINGS':
        const { payload } = wsMsgObj;
        dispatch(updateSettings(payload))
        break;
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
          <Route path="/container/golden-layout" component={GoldenLayoutComponent} />
          <Route path="/container/page/*" component={PageComponent} />
          <Redirect from="/*" to="/container/golden-layout" />
        </Switch>
      </BrowserRouter>
    </div>
  )
}


