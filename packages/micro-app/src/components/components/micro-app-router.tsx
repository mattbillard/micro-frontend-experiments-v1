import * as React from 'react';
import { BrowserRouter, Link, MemoryRouter, Redirect, Route, Switch } from "react-router-dom";

import { 
  ColumnChart,
  GoldenSpiral,
  GoldenText,
  MicroNavigation,
  PieChart,
  StockChart,
  StockGrid,
  TextTester,
} from '../components';

import "../styles/index.less"; 

const TheSwitch = (props) => {
  // console.log('....props', props);
  const { childUrl, showHints } = props;

  return (
    <div className="micro-app-router flex-rows">
      {showHints !== false && 
        <div className="micro-nav">
          <MicroNavigation {...props} />
        </div>
      }
      <div className="micro-app-content">
        <Switch>
          <Route path="/micro-url/column-chart" render={(routeProps) => <ColumnChart {...routeProps} {...props} />} />
          <Route path="/micro-url/pie-chart" render={(routeProps) => <PieChart {...routeProps} {...props} />} />
          <Route path="/micro-url/golden-spiral" render={(routeProps) => <GoldenSpiral {...routeProps} {...props} />} />
          <Route path="/micro-url/stock-chart" render={(routeProps) => <StockChart {...routeProps} {...props} />} />
          <Route path="/micro-url/stock-grid" render={(routeProps) => <StockGrid {...routeProps} {...props} />} />
          <Route path="/micro-url/golden-text" render={(routeProps) => <GoldenText {...routeProps} {...props} />} />
          <Route path="/micro-url/text-tester" render={(routeProps) => <TextTester {...routeProps} {...props} />} />
          <Redirect from="/*" to={childUrl || '/micro-url'} />
        </Switch>
      </div>
    </div>
  )
}

export const MicroAppRouter = (props) => {
  const isIframe = window.parent !== window;
  const hasUrlProp = !!props.childUrl;

  return (
    isIframe || !hasUrlProp ? 
      <BrowserRouter><TheSwitch {...props} /></BrowserRouter> :
      <MemoryRouter><TheSwitch {...props}/></MemoryRouter>
  );
}

export default MicroAppRouter;
