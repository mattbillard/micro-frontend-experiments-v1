import * as React from 'react';
import { useState } from 'react';
import { BrowserRouter, Link, Redirect, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import { createBrowserHistory } from "history";

const customHistory = createBrowserHistory();

import { 
  GoldenLayoutComponent,
  IframeComponent,
  WebComponent 
} from './';

interface IPageComponentProps {
}

export const PageComponent = (props: IPageComponentProps) => {
  let { params, path, url } = useRouteMatch();
  const mode = localStorage.mode || 'IFRAME_MODE';

  return (
    <div style={{width:'100vw',height:'100vh',position:'relative'}}>
      {mode === 'IFRAME_MODE' && <IframeComponent url={`/${params[0]}`} />}
      {mode === 'WC_MODE' && <WebComponent url={`/${params[0]}`} />}
    </div>
  )
}
