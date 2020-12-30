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

// // WORKS
// // TODO: try loading JS from a URL. Will need to adjust parcel exports
// // import { TextTester as OtherComponent } from 'micro-app/src/components/text-tester';
// // import OtherComponent from '../../node_modules/micro-app';
// export const LazyPage = (props: ILazyPageProps) => {
//   // const OtherComponent = React.lazy(() => import('../../../micro-app/src/components/golden-text'));
//   // const OtherComponent = React.lazy(() => import('./text-tester'));
//   // const OtherComponent = React.lazy(() => import('micro-app/src/components/text-tester'));
//   // const OtherComponent = React.lazy(() => import('./micro-app-components/text-tester'));
//   const OtherComponent = loadable(() => import('./micro-app-components/text-tester'));

//   return (
//     <div>
//       <Suspense fallback={<div>Loading...</div>}>
//         <OtherComponent />
//       </Suspense>
//     </div>
//   );
// }



// // DOES NOT WORK
// // const OtherComponent = React.lazy(() => import('../../../micro-app/src/components/golden-text'));
// const OtherComponent = React.lazy(() => import('../../../micro-app/src/components/micro-app'));

// export const LazyPage = (props: ILazyPageProps) => {
//   let { params, path, url } = useRouteMatch();
//   const theUrl = `/micro-app/${params[0]}`;
//   console.log('....theUrl', theUrl);

//   return (
//     <div>
//       <Suspense fallback={<div>Loading...</div>}>
//         <OtherComponent url={theUrl} />
//       </Suspense>
//     </div>
//   );
// }



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
export const LazyPage = (props: ILazyPageProps) => {
  // const OtherComponent = loadable(() => import('../../../micro-app/src/components/golden-text'))
  // const OtherComponent = loadable(() => import('../../../micro-app/src/components/micro-app'))
  const OtherComponent = loadable(() => import('./micro-app-components/micro-app'));
  let { params, path, url } = useRouteMatch();
  const theUrl = `/micro-app/${params[0]}`;
  console.log('....theUrl', theUrl);
  
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent url={theUrl} />
      </Suspense>
    </div>
  );
}



// // DOES NOT WORK
// export const LazyPage = (props: ILazyPageProps) => {
//   // const OtherComponent = loadable(() => import('../../../micro-app/src/components/micro-app'))
//   let { params, path, url } = useRouteMatch();
//   const filePath = `./micro-app-components/${params[0]}`;
//   console.log('....theUrl', filePath);

//   const OtherComponent = loadable(() => import(filePath))
  
//   return (
//     <div>
//       <Suspense fallback={<div>Loading...</div>}>
//         <OtherComponent url={filePath} />
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
