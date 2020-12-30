declare const window: any;

import * as React from 'react';
import { useEffect, useRef } from 'react';
import * as ReactDOM from "react-dom";
window.React = React;
window.ReactDOM = ReactDOM;


import $ from 'jquery';
window.$ = $;
window.jQuery = $;


const GoldenLayout = require('golden-layout');
import 'golden-layout/src/css/goldenlayout-base.css';
import 'golden-layout/src/css/goldenlayout-dark-theme.css';

import '../styles/golden-layout-component.css';

import { 
  IframeComponent, 
  LazyImportComponent,
  WebComponent, 
} from './';

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
                props: { url: '/micro-app/stock-grid' },
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
                    props: { url: '/micro-app/golden-spiral' },
                    width: 30,
                  },
                  {
                    title: 'Layout',
                    // type: 'component',
                    // componentName: 'gl-text',
                    type: 'react-component',
                    component: 'MicroFrontEndComponent',
                    props: { url: '/micro-app/golden-text' },
                  },
                  // {
                  //   title: 'React Component',
                  //   type: 'react-component',
                  //   component: 'MicroFrontEndComponent',
                  //   props: { url: '/micro-app' },
                  // }
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
                    props: { url: '/micro-app/stock-chart' },
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
                    props: { url: '/micro-app/stock-chart' },
                    componentState: { companyName: 'Stock Y' },
                  },
                  {
                    title: 'Springshield plc.',
                    // type: 'component',
                    // componentName: 'stockChart',
                    type: 'react-component',
                    component: 'MicroFrontEndComponent',
                    props: { url: '/micro-app/stock-chart' },
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
                props: { url: '/micro-app/column-chart' },
              },
              {
                title: 'Market',
                // type: 'component',
                // componentName: 'pieChart',
                type: 'react-component',
                component: 'MicroFrontEndComponent',
                props: { url: '/micro-app/pie-chart' },
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



  const mode = localStorage.mode || 'IFRAME_MODE';  
  class MicroFrontEndComponent extends React.Component {
    render() { 
      return (
        <>
          {mode === 'IFRAME_MODE' && <IframeComponent {...this.props} />}
          {mode === 'WC_MODE' && <WebComponent {...this.props} />}
          {mode === 'IMP_MODE' && <LazyImportComponent {...this.props} />}
        </>
      );
    }
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