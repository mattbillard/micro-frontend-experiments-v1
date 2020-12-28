import * as React from 'react';
import { useState } from 'react';
import { BrowserRouter, Link, Redirect, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import { createBrowserHistory } from "history";

const customHistory = createBrowserHistory();

import { GoldenLayoutComponent } from './golden-layout-component';
import { IframeComponent } from './iframe-component';
import { WebComponent } from './web-component';

interface IPageComponentProps {
}

// export const PageComponent = (props: IPageComponentProps) => {
//   let { topicId } = useParams();

//   return (
//     // <IframeComponent url={`/micro-app/${topicId}`} />
//     <IframeComponent url={topicId} />
//   )
// }


export const PageComponent = (props: IPageComponentProps) => {
  let { params, path, url } = useRouteMatch();

  return (
    <div style={{width:'100vw',height:'100vh',position:'relative'}}>
      <IframeComponent url={`/${params[0]}`} />
      {/* <WebComponent url={`/${params[0]}`} /> */}
    </div>
  )
}
