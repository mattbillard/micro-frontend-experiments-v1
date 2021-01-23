import * as React from 'react';
import { BrowserRouter, Link, MemoryRouter, Redirect, Route, Switch } from "react-router-dom";

import { 
  ColumnChart,
  GoldenSpiral,
  GoldenText,
  MicroTableOfContents,
  PieChart,
  StockChart,
  StockGrid,
  TextTester,
} from '../components';

import "../styles/index.less"; 

const TheSwitch = (props) => {
  // console.log('....this.props', props);
  // const { showHints, url } = props;
  // const { 
  //   showHints,
  //   glContainer,
  // } = props;
  // const { url } = glContainer.getState();
  const { showHints } = props;
  const url = props.glContainer?._config?.componentState?.url;

  const updateTitle = (event, text) => {
    event.preventDefault();
    props.glContainer.setTitle(text);
  }

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
          <a href="#" onClick={(event) => updateTitle(event, 'hey')}>Test</a>
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
