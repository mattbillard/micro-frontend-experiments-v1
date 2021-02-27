import * as React from 'react';
import { Provider } from 'react-redux';
import * as jsCookie from 'js-cookie';
import { nanoid } from 'nanoid'
import ReactShadow from 'react-shadow'; // TODO: consider "declarative shadowDom" once browsers standardize it

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
  OpenFinWindowBar,
} from '../../components';
import { store } from '../../redux';

// TODO: probably move to a service
sessionStorage.windowId = nanoid();

declare const window: any;
if (window.fin) {
  (async() => {
    window.fin.me.showDeveloperTools();
  })()
}

export const ContainerApp = () => {
  const username = jsCookie.get('username');

  if (!username) {
    return (
      <>
        <OpenFinWindowBar />
        <LoginPage />
      </>
    );
  }
  
  return (
    <Provider store={store}>
      <OpenFinWindowBar />
      <ContainerRouter />
    </Provider>
  )
  
  // // To see if app breaks when in a shadowDom. Noteably, stylesheet link tag needs to be inside shadowDom
  // return (
  //   <ReactShadow.div>
  //     <link href="/container-url/main.css" rel="stylesheet"></link>
  //     <Provider store={store}>
  //       <ContainerRouter />
  //     </Provider>
  //   </ReactShadow.div>
  // )
}


