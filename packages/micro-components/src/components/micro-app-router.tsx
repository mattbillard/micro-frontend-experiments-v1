import * as React from 'react';
import { BrowserRouter, Link, MemoryRouter, Redirect, Route, Switch } from "react-router-dom";

import { 
  ColumnChart,
  GoldenSpiral,
  GoldenText,
  MicroNavigation,
  MicroTableOfContents,
  PieChart,
  StockChart,
  StockGrid,
  TextTester,
} from '../components';

import "../styles/index.less"; 

const TheSwitch = (props) => {
  const { showHints } = props;
  const url = props.glContainer?._config?.componentState?.url;

  return (
    <div className="micro-app-router flex-rows">
      {showHints && 
        <div className="micro-nav">
          <MicroNavigation {...props} />
        </div>
      }
      <div className="micro-app-content">
        <Switch>
          <Route path="/micro-app/column-chart" render={(routeProps) => <ColumnChart {...routeProps} {...props} />} />
          <Route path="/micro-app/pie-chart" render={(routeProps) => <PieChart {...routeProps} {...props} />} />
          <Route path="/micro-app/golden-spiral" render={(routeProps) => <GoldenSpiral {...routeProps} {...props} />} />
          <Route path="/micro-app/stock-chart" render={(routeProps) => <StockChart {...routeProps} {...props} />} />
          <Route path="/micro-app/stock-grid" render={(routeProps) => <StockGrid {...routeProps} {...props} />} />
          <Route path="/micro-app/golden-text" render={(routeProps) => <GoldenText {...routeProps} {...props} />} />
          <Route path="/micro-app/text-tester" render={(routeProps) => <TextTester {...routeProps} {...props} />} />
          <Route path="/micro-app" render={(routeProps) => <MicroTableOfContents {...routeProps} {...props} />} />
          <Redirect from="/*" to={url || '/micro-app'} />
        </Switch>
      </div>
    </div>
  )
}

export const MicroAppRouter = (props) => {
  const isIframe = window.parent !== window;

  return (
    isIframe ? 
      <BrowserRouter><TheSwitch {...props} /></BrowserRouter> :
      <MemoryRouter><TheSwitch {...props}/></MemoryRouter>
  );
}

export default MicroAppRouter;
