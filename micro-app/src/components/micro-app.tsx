import * as React from 'react';
import { useState } from 'react';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';

import { 
  GoldenSpiral,
  GoldenText,
  StockChart
  TextTester,
} from './';

import "../styles/styles.less";
import "../styles/golden-micro-app-styles.css";

export const MicroApp = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/micro-app/spiral" component={GoldenSpiral} />
        <Route path="/micro-app/stock-chart" component={StockChart} />
        <Route path="/micro-app/text" component={GoldenText} />
        <Route path="/micro-app" component={TextTester} />
        {/* <Redirect from="/*" to="/micro-app" /> */}
      </Switch>
    </BrowserRouter>
  );
}
