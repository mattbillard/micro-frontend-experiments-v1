import * as React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter, Link, MemoryRouter, Redirect, Route, StaticRouter, Switch, useHistory } from "react-router-dom";
import { createBrowserHistory } from "history";

const customHistory = createBrowserHistory();

import { 
  ColumnChart,
  GoldenSpiral,
  GoldenText,
  StockGrid,
  PieChart,
  StockChart,
  TextTester,
} from './';

import "../styles/styles.less";
import "../styles/golden-micro-app-styles.css";

const TheSwitch = () => {
  const history = useHistory();

  useEffect(() => {
    // history.push('/micro-app/column-chart');
  }, [])

  return (
    <Switch>
      <Route path="/micro-app/column-chart" component={ColumnChart} />
      <Route path="/micro-app/pie-chart" component={PieChart} />
      <Route path="/micro-app/spiral" component={GoldenSpiral} />
      <Route path="/micro-app/stock-chart" component={StockChart} />
      <Route path="/micro-app/stock-grid" component={StockGrid} />
      <Route path="/micro-app/text" component={GoldenText} />
      <Route path="/micro-app" component={TextTester} />
      <Route path="/*" component={TextTester} />
      {/* <Redirect from="/*" to="/micro-app" /> */}
    </Switch>
  )
}

export const MicroApp = () => {
  return (
    <BrowserRouter><TheSwitch /></BrowserRouter>
    // <BrowserRouter history={customHistory}><TheSwitch /></BrowserRouter>
    // <MemoryRouter><TheSwitch /></MemoryRouter>
    // <MemoryRouter history={customHistory}><TheSwitch /></MemoryRouter>
  );
}
