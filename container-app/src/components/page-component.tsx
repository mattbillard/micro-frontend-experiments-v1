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

  return (
    <div style={{width:'100vw',height:'100vh',position:'relative'}}>
      <IframeComponent url={`/${params[0]}`} />
      {/* <WebComponent url={`/${params[0]}`} /> */}
    </div>
  )
}
