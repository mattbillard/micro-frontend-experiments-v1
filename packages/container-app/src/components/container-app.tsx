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

interface IContainerAppProps {
}

export const ContainerApp = (props: IContainerAppProps) => {
  const mode = localStorage.mode || 'IFRAME_MODE';
  const isShadow = localStorage.isShadow || 'false';

  const toggleMode = () => {
    const newMode = 
      mode === 'IFRAME_MODE' ? 'WC_MODE' : 
      mode === 'WC_MODE' ? 'IMP_MODE' : 
      'IFRAME_MODE'
    localStorage.mode = newMode;
  }
  const toggleShadow = () => {
    localStorage.isShadow = isShadow === 'true' ? 'false' : 'true';
  }

  return (
    <BrowserRouter history={customHistory}>
      <div>
        <div style={{float:'right'}}>
          <a href="" onClick={toggleMode}>{mode}</a> | 
          {mode === 'WC_MODE' && <a href="" onClick={toggleShadow}>{String(isShadow)}</a>}
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
  )
}
