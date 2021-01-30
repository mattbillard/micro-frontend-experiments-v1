import * as React from 'react';
import { Provider } from 'react-redux';
import * as jsCookie from 'js-cookie';

import "../../styles/flex-box.less";
import "../../styles/scroll-bars.less";
import "../../styles/container-app.less";

// // TODO: figure out if it's better to provide this for all micro-apps or expect them to provide their own
// import * as Highcharts from 'highcharts';
// import Slick from 'slickgrid-es6';
// declare const window: any;
// window.Highcharts = Highcharts;
// window.Slick = Slick;

import {
  ContainerRouter,
  LoginPage,
} from '../../components';
import { store } from '../../redux';

interface IContainerAppProps {
}

export const ContainerApp = (props: IContainerAppProps) => {
  const username = jsCookie.get('username');

  if (!username) {
    return (
      <LoginPage />
    );
  }
  
  return (
    <Provider store={store}>
      <ContainerRouter />
    </Provider>
  )
}


