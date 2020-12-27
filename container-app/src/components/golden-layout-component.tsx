declare const window: any;

import * as React from 'react';
import { useEffect, useRef } from 'react';
import * as ReactDOM from "react-dom";
window.React = React;
window.ReactDOM = ReactDOM;


import $ from 'jquery';
window.$ = $;
window.jQuery = $;

// import * as Highcharts from 'highcharts';
// import Slick from 'slickgrid-es6';

const GoldenLayout = require('golden-layout');
import 'golden-layout/src/css/goldenlayout-base.css';
import 'golden-layout/src/css/goldenlayout-dark-theme.css';

import '../styles/golden-layout-component.css';

import { IframeComponent } from './iframe-component';
import { IframeComponent2 } from './iframe-component2';
import { WebComponent } from './web-component';
import { WebComponent2 } from './web-component2';

const init = function () {

  const defaultConfig = {
    content: [
      {
        type: 'row',
        content: [
          {
            width: 80,
            type: 'column',
            content: [
              {
                title: 'Fnts 100',
                // type: 'component',
                // componentName: 'stockGrid',
                type: 'react-component',
                component: 'MicroFrontEndComponent',
                props: { url: '/micro-app/index.html' },
              },
              {
                type: 'row',
                content: [
                  {
                    title: 'Golden',
                    // type: 'component',
                    // componentName: 'fibonacci-spiral',
                    type: 'react-component',
                    component: 'MicroFrontEndComponent',
                    props: { url: '/micro-app/index.html' },
                    width: 30,
                  },
                  {
                    title: 'Layout',
                    // type: 'component',
                    // componentName: 'gl-text',
                    type: 'react-component',
                    component: 'MicroFrontEndComponent',
                    props: { url: '/micro-app/index.html' },
                  },
                  {
                    title: 'React Component',
                    type: 'react-component',
                    component: 'MicroFrontEndComponent',
                    props: { url: '/micro-app/index.html' },
                  }
                ]
              },
              {
                type: 'stack',
                content: [
                  {
                    title: 'Acme, inc.',
                    // type: 'component',
                    // componentName: 'stockChart',
                    type: 'react-component',
                    component: 'MicroFrontEndComponent',
                    props: { url: '/micro-app/index.html' },
                    componentState: {
                      companyName: 'Stock X'
                    },
                  },
                  {
                    title: 'LexCorp plc.',
                    // type: 'component',
                    // componentName: 'stockChart',
                    type: 'react-component',
                    component: 'MicroFrontEndComponent',
                    props: { url: '/micro-app/index.html' },
                    componentState: { companyName: 'Stock Y' },
                  },
                  {
                    title: 'Springshield plc.',
                    // type: 'component',
                    // componentName: 'stockChart',
                    type: 'react-component',
                    component: 'MicroFrontEndComponent',
                    props: { url: '/micro-app/index.html' },
                    componentState: { companyName: 'Stock Z' },
                  }
                ]
              }
            ]
          },
          {
            width: 20,
            type: 'column',
            content: [
              {
                title: 'Performance',
                // type: 'component',
                // componentName: 'columnChart',
                type: 'react-component',
                component: 'MicroFrontEndComponent',
                props: { url: '/micro-app/index.html' },
              },
              {
                title: 'Market',
                // type: 'component',
                // componentName: 'pieChart',
                type: 'react-component',
                component: 'MicroFrontEndComponent',
                props: { url: '/micro-app/index.html' },
                height: 40,
              }
            ]
          }
        ]
      }
    ]
  };
  
  // const savedState = localStorage.getItem('savedState');
  // const config = savedState ? JSON.parse(savedState) : defaultConfig;
  const config = defaultConfig;

  const myLayout = new GoldenLayout(config, '#exampleLayoutContainer');
  window.myLayout = myLayout;



  // myLayout.registerComponent('MicroFrontEndComponent', IframeComponent2);
  // myLayout.registerComponent('MicroFrontEndComponent', WebComponent2);

  class MicroFrontEndComponent extends React.Component {
    // render() { return (<IframeComponent {...this.props} />) }
    render() { return (<div style={{width:'100%',height:'100%',overflow:'auto',}}><WebComponent {...this.props} /></div>) }
  };
  myLayout.registerComponent('MicroFrontEndComponent', MicroFrontEndComponent);




  myLayout.on('stateChanged', function () {
    const state = JSON.stringify(myLayout.toConfig());
    localStorage.setItem('savedState', state);
  });

  myLayout.init();
}





interface IGoldenLayoutComponentProps {
}

export const GoldenLayoutComponent = (props: IGoldenLayoutComponentProps) => {
  useEffect(() => {
    setTimeout(() => {
      init();
    })
  }, []);

  // TODO: use ref
  return (
    <div id="exampleLayoutContainer"></div>
  )
}