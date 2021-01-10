import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { IStoreState, Provider, useSelector } from 'react-redux';
import * as jsCookie from 'js-cookie';

import { store } from '../redux';

import {
  ContainerRouter
} from '../components';


interface IContainerAppProps {
}

export const ContainerApp = (props: IContainerAppProps) => {
  return (
    <Provider store={store}>
      <ContainerRouter />
    </Provider>
  )
}


