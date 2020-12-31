import * as React from 'react';
import { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Link, Redirect, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import { createBrowserHistory } from "history";
import loadable from '@loadable/component';

const customHistory = createBrowserHistory();

import { GoldenLayoutComponent } from './golden-layout-component';
import { IframeComponent } from './iframe-component';
import { WebComponent } from './web-component';

interface ILazyImportComponentProps {
}

export const LazyImportComponent = (props: ILazyImportComponentProps) => {
  const OtherComponent = React.lazy(() => import('./micro-components-src/components/micro-app'));
  // const OtherComponent = loadable(() => import('./micro-components-src/components/micro-app'));
  let { url } = props
  console.log('....url', url);
  
  return (
    <div className="lazy-import">
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent url={url} />
      </Suspense>
    </div>
  );
}
