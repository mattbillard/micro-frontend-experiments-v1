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

const TheSwitch = (props) => {
  // const history = useHistory();

  // useEffect(() => {
  //   // history.push('/micro-app/column-chart');
  //   const { url } = props;
  //   url && history.push(url);
  // }, [])

  return (
    <div>
      <div>
        <Link to='/micro-app/spiral'>Spiral</Link> |
        <Link to='/micro-app/text'>Text</Link> |
        <Link to='/micro-app/stock-grid'>StockGrid</Link> |
        <Link to='/micro-app/column-chart'>ColumnChart</Link> |
        <Link to='/micro-app/pie-chart'>PieChart</Link> |
        <Link to='/micro-app/stock-chart'>StockChart</Link> |
      </div>
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
    </div>
  )
}

export const MicroApp = (props) => {
  // const history = useHistory();
  // console.log('...props', props)

  // useEffect(() => {
  //   // history.push('/micro-app/column-chart');
  //   const { url } = props;
  //   url && history.push(url);
  // }, [])

  return (
    // <h1>MicroApp</h1>
    <BrowserRouter><TheSwitch /></BrowserRouter>
    // <BrowserRouter history={customHistory}><TheSwitch /></BrowserRouter>
    // <MemoryRouter><TheSwitch /></MemoryRouter>
    // <MemoryRouter history={customHistory}><TheSwitch /></MemoryRouter>
    // <BrowserRouter>
    //   <Switch>
    //     <Route path="/micro-app/column-chart" component={ColumnChart} />
    //     <Route path="/micro-app/pie-chart" component={PieChart} />
    //     <Route path="/micro-app/spiral" component={GoldenSpiral} />
    //     <Route path="/micro-app/stock-chart" component={StockChart} />
    //     <Route path="/micro-app/stock-grid" component={StockGrid} />
    //     <Route path="/micro-app/text" component={GoldenText} />
    //     <Route path="/micro-app" component={TextTester} />
    //     <Route path="/*" component={TextTester} />
    //     {/* <Redirect from="/*" to="/micro-app" /> */}
    //   </Switch>
    // </BrowserRouter>
  );
}

export default MicroApp;
