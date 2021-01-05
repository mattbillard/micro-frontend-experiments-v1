import * as React from 'react';
import { useState } from 'react';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";

const customHistory = createBrowserHistory();

import {
  GoldenLayoutComponent,
  PageComponent,
  SettingsMenu,
} from '../components';

interface IContainerAppProps {
}

export const ContainerApp = (props: IContainerAppProps) => {
  const [showSettings, setShowSettings] = useState<boolean>(localStorage.showSettings === 'true');
  const showHints = localStorage.showHints === 'true' || false;
  const className = showHints ? 'show-hints' : '';

  const toggleShowSettings = ()  => {
    setShowSettings(!showSettings);
    localStorage.showSettings = !showSettings;
  }

  return (
    <div className={className}>
      <BrowserRouter history={customHistory}>
        <div>
          <div style={{float:'right'}}>
            <a href="#" onClick={toggleShowSettings}>Settings</a>
            {showSettings && <SettingsMenu toggleShowSettings={toggleShowSettings} />}
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
