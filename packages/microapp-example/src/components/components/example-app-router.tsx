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
  ExampleAppNavigation,
  PieChart,
  Spiral,
  StockChart,
  StockGrid,
  TitleText,
} from '../components';

import '../styles/index.less';

const RouterSwitch = (props: IMicroAppProps) => {
  const DEFAULT_URL = '/example-url/title-text';
  const { childUrl = DEFAULT_URL, showHints } = props;
  const redirectUrl = childUrl === '/example-url' ? DEFAULT_URL : childUrl;

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
          <Route path="/example-url/spiral" render={(routeProps) => <Spiral />} />
          <Route path="/example-url/stock-chart" render={(routeProps) => <StockChart />} />
          <Route path="/example-url/stock-grid" render={(routeProps) => <StockGrid />} />
          <Route path="/example-url/title-text" render={(routeProps) => <TitleText />} />
          <Redirect from="/*" to={redirectUrl} />
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
