import React from 'react';
import {
  BrowserRouter,
  MemoryRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { IMicroAppProps } from '@company/core-team-shared-tools';

import {
  ColumnChart,
  GoldenSpiral,
  GoldenText,
  MicroNavigation,
  PieChart,
  StockChart,
  StockGrid,
} from '../components';

import '../styles/index.less';

const RouterSwitch = (props: IMicroAppProps) => {
  const { childUrl, showHints } = props;

  // prettier-ignore
  return (
    <div className="micro-app-router flex-rows">
      {showHints !== false && 
        <div className="micro-nav">
          <MicroNavigation {...props} />
        </div>
      }
      <div className="micro-app-content">
        <Switch>
          <Route path="/micro-url/column-chart" render={(routeProps) => <ColumnChart />} />
          <Route path="/micro-url/pie-chart" render={(routeProps) => <PieChart />} />
          <Route path="/micro-url/golden-spiral" render={(routeProps) => <GoldenSpiral />} />
          <Route path="/micro-url/stock-chart" render={(routeProps) => <StockChart />} />
          <Route path="/micro-url/stock-grid" render={(routeProps) => <StockGrid />} />
          <Route path="/micro-url/golden-text" render={(routeProps) => <GoldenText />} />
          <Redirect from="/*" to={childUrl || '/micro-url/golden-text'} />
        </Switch>
      </div>
    </div>
  )
};

export const MicroAppRouter = (props: IMicroAppProps) => {
  const isIframe = window.parent !== window;
  const hasUrlProp = !!props.childUrl;

  // Need to use MemoryRouter when in GoldenLayout b/c otherwise navigating a pane would navigate the parent app's URL
  // prettier-ignore
  return (
    isIframe || !hasUrlProp ? 
      <BrowserRouter><RouterSwitch {...props} /></BrowserRouter> :
      <MemoryRouter><RouterSwitch {...props}/></MemoryRouter>
  );
};
