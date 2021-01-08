import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";
import * as jsCookie from 'js-cookie';

const customHistory = createBrowserHistory();

import {
  GoldenLayoutComponent,
  LoginPage,
  Navigation,
  PageComponent,
} from '../components';

interface IContainerAppProps {
}

export const ContainerApp = (props: IContainerAppProps) => {
  const showHints = localStorage.showHints === 'true' ? true : false;
  const className = showHints ? 'show-hints' : '';
  const username = jsCookie.get('username');

  if (!username) {
    return (
      <LoginPage />
    );
  }

  return (
    <div className={className}>
      <BrowserRouter history={customHistory}>
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
