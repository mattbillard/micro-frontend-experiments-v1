import React from 'react';
import {
  BrowserRouter,
  MemoryRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { IMicroAppProps } from '@company/shared-tools';

import {
  ColumnChart,
  GoldenSpiral,
  GoldenText,
  ExampleAppNavigation,
  PieChart,
  StockChart,
  StockGrid,
} from '../components';

import '../styles/index.less';

const RouterSwitch = (props: IMicroAppProps) => {
  const { childUrl, showHints } = props;

  // prettier-ignore
  return (
    <div className="example-app-router flex-rows">
      {showHints !== false && 
        <div className="example-app-nav">
          <ExampleAppNavigation {...props} />
        </div>
      }
      <div className="example-app-content">
        <Switch>
          <Route path="/example-url/column-chart" render={(routeProps) => <ColumnChart />} />
          <Route path="/example-url/pie-chart" render={(routeProps) => <PieChart />} />
          <Route path="/example-url/golden-spiral" render={(routeProps) => <GoldenSpiral />} />
          <Route path="/example-url/stock-chart" render={(routeProps) => <StockChart />} />
          <Route path="/example-url/stock-grid" render={(routeProps) => <StockGrid />} />
          <Route path="/example-url/golden-text" render={(routeProps) => <GoldenText />} />
          <Redirect from="/*" to={childUrl || '/example-url/golden-text'} />
        </Switch>
      </div>
    </div>
  )
};

export const ExampleAppRouter = (props: IMicroAppProps) => {
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
