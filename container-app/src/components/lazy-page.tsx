import * as React from 'react';
import { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Link, Redirect, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import { createBrowserHistory } from "history";
import loadable from '@loadable/component';

const customHistory = createBrowserHistory();

import { GoldenLayoutComponent } from './golden-layout-component';
import { IframeComponent } from './iframe-component';
import { WebComponent } from './web-component';

interface ILazyPageProps {
}

// WORKS
// TODO: try loading JS from a URL. Will need to adjust parcel exports
const OtherComponent = React.lazy(() => import('../../../micro-app/src/components/golden-text'));

export const LazyPage = (props: ILazyPageProps) => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}



// DOES NOT WORK
// export const LazyPage = (props: ILazyPageProps) => {
//   const [hasLoaded, setHasLoaded] = useState<boolean>(false);
//   const [OtherComponent, setOtherComponent] = useState();

//   useEffect(() => {
//     import('../../../micro-app/src/components/golden-text').then((result) => {
//       console.log(result.default);
//       setOtherComponent(result.default);
//       setHasLoaded(true);
//     })
//   }, []);

//   if (!hasLoaded) {
//   // if (!OtherComponent) {
//     return null;
//   }

//   return (
//     <div>
//       <Suspense fallback={<div>Loading...</div>}>
//         {/* <OtherComponent /> */}
//         {OtherComponent()}
//       </Suspense>
//     </div>
//   );
// }



// WORKS
// const OtherComponent = loadable(() => import('../../../micro-app/src/components/golden-text'))
// export const LazyPage = () => {
//   return (
//     <div>
//       <OtherComponent />
//     </div>
//   )
// }



// WORKS
// export const LazyPage = (props: ILazyPageProps) => {
//   const OtherComponent = loadable(() => import('../../../micro-app/src/components/golden-text'))
//   return (
//     <div>
//       <Suspense fallback={<div>Loading...</div>}>
//         <OtherComponent />
//       </Suspense>
//     </div>
//   );
// }


// // DOES NOT WORK 
// export const LazyPage = (props: ILazyPageProps) => {
//   let { params, path, url } = useRouteMatch();

//   // TODO: this seems to want to fetch it from a URL
//   const filePath = `../../../micro-app/src/components/${params[0]}`;
//   console.log('....params[0]: ', params[0]);
//   console.log('....filePath: ', filePath);
//   const OtherComponent = loadable(() => import(filePath));


//   return (
//     <div>
//       <Suspense fallback={<div>Loading...</div>}>
//         <OtherComponent />
//         {/* {OtherComponent()} */}
//       </Suspense>
//     </div>
//   );
// }
