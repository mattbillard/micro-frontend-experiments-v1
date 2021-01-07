import * as React from 'react';
import { useState } from 'react';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";
import * as jsCookie from 'js-cookie';

const customHistory = createBrowserHistory();

import {
  GoldenLayoutComponent,
  LoginPage,
  PageComponent,
  SettingsMenu,
} from '../components';

interface IContainerAppProps {
}

export const ContainerApp = (props: IContainerAppProps) => {
  const [showSettings, setShowSettings] = useState<boolean>(localStorage.showSettings === 'true');
  const showHints = localStorage.showHints === 'true' ? true : false;
  const className = showHints ? 'show-hints' : '';
  const username = jsCookie.get('username');

  const logout = () => {
    jsCookie.remove('username');
    window.location.reload();
  }

  const toggleShowSettings = ()  => {
    setShowSettings(!showSettings);
    localStorage.showSettings = !showSettings;
  }

  if (!username) {
    return (
      <LoginPage />
    );
  }

  return (
    <div className={className}>
      <BrowserRouter history={customHistory}>
        <div>
          <div style={{float:'right'}}>
            <a href="#" onClick={toggleShowSettings}>Settings</a> | 
            {showSettings && <SettingsMenu toggleShowSettings={toggleShowSettings} />}
            <a href="#" onClick={logout}>Logout</a>
          </div>

          <Link to='/container/golden-layout'>Golden</Link> |
          <Link to='/container/page/micro-app/golden-spiral'>Spiral</Link> |
          <Link to='/container/page/micro-app/golden-text'>Text</Link> |
          <Link to='/container/page/micro-app/stock-grid'>StockGrid</Link> |
          <Link to='/container/page/micro-app/column-chart'>ColumnChart</Link> |
          <Link to='/container/page/micro-app/pie-chart'>PieChart</Link> |
          <Link to='/container/page/micro-app/stock-chart'>StockChart</Link> |
        </div>

        <Switch>
          <Route path="/container/golden-layout" component={GoldenLayoutComponent} />
          <Route path="/container/page/*" component={PageComponent} />
          <Redirect from="/*" to="/container/golden-layout" />
        </Switch>
      </BrowserRouter>
    </div>
  )
}
