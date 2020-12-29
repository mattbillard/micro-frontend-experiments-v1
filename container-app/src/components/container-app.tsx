import * as React from 'react';
import { useState } from 'react';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";

const customHistory = createBrowserHistory();

import {
  GoldenLayoutComponent,
  IframeComponent,
  LazyPage,
  PageComponent,
  WebComponent,
} from './';

interface IContainerAppProps {
}

// export const ContainerApp = (props: IContainerAppProps) => {
//   const [count, setCount] = useState<number>(1);

//   const url = '/micro-app/index.html';
//   // const url = '/create-react-app';

//   return (
//     <div className="container">
//       <h1>Container App</h1>
//       <div>
//         <button onClick={() => setCount(count - 1)}> - </button>
//         <button onClick={() => setCount(count + 1)}> + </button>
//       </div>

//       {([...new Array(count)]).map((val, idx) => {
//         return (
//           // <div key={idx} className="">
//           <div key={idx} className="row">
//             <div>
//               <h1>Iframe</h1>
//               <IframeComponent url={url} />
//             </div>
//             <div>
//               <h1>WebComponent</h1>
//               <WebComponent url={url} />
//             </div>
//           </div>
//         )
//       })}
//     </div>
//   )
// }


export const ContainerApp = (props: IContainerAppProps) => {
  const mode = localStorage.mode || 'IFRAME_MODE';

  const toggleMode = () => {
    const newMode = mode === 'IFRAME_MODE' ? 'WC_MODE' : 'IFRAME_MODE'
    localStorage.mode = newMode;
  }

  return (
    <BrowserRouter history={customHistory}>
      <div>
        {/* <a href="#" style={{float:'right'}} onClick={() => setIsIframeMode(!isIframeMode)}>{isIframeMode ? 'Iframe' : 'WebComponent'}</a> */}
        <a href="" style={{float:'right'}} onClick={toggleMode}>
          {mode}
        </a>
        <Link to='/container/golden-layout'>Golden</Link> |
        <Link to='/container/page/micro-app/spiral'>Spiral</Link> |
        <Link to='/container/page/micro-app/text'>Text</Link> |
        <Link to='/container/page/micro-app/stock-grid'>StockGrid</Link> |
        <Link to='/container/page/micro-app/column-chart'>ColumnChart</Link> |
        <Link to='/container/page/micro-app/pie-chart'>PieChart</Link> |
        <Link to='/container/page/micro-app/stock-chart'>StockChart</Link> |
      </div>

      {/* EXERPIMENTS WITH LAZY LOADING. DOESN'T WORK WELL B/C MICRO-APP NEEDS TO SET REACT+REACT-DOM AS EXTERNAL */}
      {/* <div>
        <Link to='/container/lazy/golden-spiral'>Spiral</Link> |
        <Link to='/container/lazy/golden-text'>Text</Link> |
        <Link to='/container/lazy/stock-grid'>StockGrid</Link> |
        <Link to='/container/lazy/column-chart'>ColumnChart</Link> |
        <Link to='/container/lazy/pie-chart'>PieChart</Link> |
        <Link to='/container/lazy/stock-chart'>StockChart</Link> |
      </div> */}

      <Switch>
        <Route path="/container/golden-layout" component={GoldenLayoutComponent} />
        <Route path="/container/lazy/*" component={LazyPage} />
        <Route path="/container/page/*" component={PageComponent} />
        <Redirect from="/*" to="/container/golden-layout" />
      </Switch>
    </BrowserRouter>
  )
}
