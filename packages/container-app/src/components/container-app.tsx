import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as jsCookie from 'js-cookie';

import { configureStore } from '../redux';

import {
  GoldenLayoutComponent,
  LoginPage,
  Navigation,
  PageComponent,
} from '../components';

const store = configureStore();

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
      <Provider store={store}>
        <BrowserRouter>
          <Navigation />
          <Switch>
            <Route path="/container/golden-layout" component={GoldenLayoutComponent} />
            <Route path="/container/page/*" component={PageComponent} />
            <Redirect from="/*" to="/container/golden-layout" />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  )
}


