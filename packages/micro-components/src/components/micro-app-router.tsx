import * as React from 'react';
import { BrowserRouter, Link, MemoryRouter, Redirect, Route, Switch } from "react-router-dom";

import { 
  ColumnChart,
  GoldenSpiral,
  GoldenText,
  StockGrid,
  PieChart,
  StockChart,
  TextTester,
} from '../components';

import "../styles/flex-box.less";
import "../styles/golden-apps.css";
import "../styles/micro-app.less";

const TheSwitch = (props) => {
  const { url } = props;
  const showHints = localStorage.showHints === 'true' ? true : false;

  return (
    <div className="micro-app-router flex-rows">
      {showHints && 
        <div>
          <Link to='/micro-app/golden-spiral'>Spiral</Link> |
          <Link to='/micro-app/golden-text'>Text</Link> |
          <Link to='/micro-app/stock-grid'>StockGrid</Link> |
          <Link to='/micro-app/column-chart'>ColumnChart</Link> |
          <Link to='/micro-app/pie-chart'>PieChart</Link> |
          <Link to='/micro-app/stock-chart'>StockChart</Link> |
        </div>
      }
      <div className="micro-app-content">
        <Switch>
          <Route path="/micro-app/column-chart" component={ColumnChart} />
          <Route path="/micro-app/pie-chart" component={PieChart} />
          <Route path="/micro-app/golden-spiral" component={GoldenSpiral} />
          <Route path="/micro-app/stock-chart" component={StockChart} />
          <Route path="/micro-app/stock-grid" component={StockGrid} />
          <Route path="/micro-app/golden-text" component={GoldenText} />
          <Route path="/micro-app" component={TextTester} />
          <Redirect from="/*" to={url || '/micro-app'} />
        </Switch>
      </div>
    </div>
  )
}

export const MicroAppRouter = (props) => {
  const { url } = props;
  const isIframe = window.parent !== window;

  return (
    isIframe ? 
      <BrowserRouter><TheSwitch url={url} /></BrowserRouter> :
      <MemoryRouter><TheSwitch url={url}/></MemoryRouter>
  );
}

export default MicroAppRouter;
