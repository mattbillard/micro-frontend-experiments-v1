import * as React from 'react';
import { useState } from 'react';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";

const customHistory = createBrowserHistory();

import {
  GoldenLayoutComponent,
  IframeComponent,
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


// export const ContainerApp = (props: IContainerAppProps) => {
//   return (
//     <div className="container">
//       <GoldenLayoutComponent />
//     </div>
//   )
// }


export const ContainerApp = (props: IContainerAppProps) => {
  return (
    <BrowserRouter history={customHistory}>
      <div>
        <Link to='/container/golden-layout'>Golden</Link> |
        <Link to='/container/micro-app/spiral'>Spiral</Link> |
        <Link to='/container/micro-app/text'>Text</Link> |
        <Link to='/container/micro-app/stock-grid'>StockGrid</Link> |
        <Link to='/container/micro-app/stock-chart'>StockChart</Link> |
      </div>
      {/* <BrowserRouter> */}
      <Switch>
        <Route path="/container/golden-layout" component={GoldenLayoutComponent} />
        {/* <Route path="/container/:topicId" component={PageComponent} /> */}
        <Route path="/container/*" component={PageComponent} />
        <Redirect from="/*" to="/container/golden-layout" />
      </Switch>
    </BrowserRouter>
  )
}
