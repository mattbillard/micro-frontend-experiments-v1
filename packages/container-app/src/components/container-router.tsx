import * as React from 'react';
import { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import * as jsCookie from 'js-cookie';

import { loadSettings } from '../redux';

import {
  GoldenLayoutComponent,
  LoginPage,
  Navigation,
  PageComponent,
} from '../components';
import { IStoreState } from '../redux';

interface IContainerRouterProps {
}

export const ContainerRouter = (props: IContainerRouterProps) => {
  const username = jsCookie.get('username');
  
  if (!username) {
    return (
      <LoginPage />
    );
  }
  
  const settings = useSelector((state: IStoreState) => state.containerAppReducer.settings);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSettings());
  }, []);

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


