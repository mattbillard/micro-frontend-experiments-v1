import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as jsCookie from 'js-cookie';

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
  const { showHints } = useSelector((state: IStoreState) => state.containerAppReducer.settings);
  const className = showHints ? 'show-hints' : '';
  const username = jsCookie.get('username');

  if (!username) {
    return (
      <LoginPage />
    );
  }

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


