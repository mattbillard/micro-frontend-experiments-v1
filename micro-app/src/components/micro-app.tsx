import * as React from 'react';
import { useState } from 'react';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';

import { GoldenSpiral } from './golden-spiral';
import { TextTester } from './text-tester';

import "../styles/styles.less";
import "../styles/golden-micro-app-styles.css";

export const MicroApp = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/micro-app/spiral" component={GoldenSpiral} />
        <Route path="/micro-app" component={TextTester} />
        {/* <Redirect from="/*" to="/micro-app" /> */}
      </Switch>
    </BrowserRouter>
  );
}
