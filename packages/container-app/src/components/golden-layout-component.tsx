declare const window: any;

import * as React from 'react';
import { useEffect, useRef } from 'react';
import * as ReactDOM from "react-dom";
import $ from 'jquery';

// Golden Layout needs these
window.React = React;
window.ReactDOM = ReactDOM;
window.$ = $;
window.jQuery = $;

const GoldenLayout = require('golden-layout');
import 'golden-layout/src/css/goldenlayout-base.css';
import 'golden-layout/src/css/goldenlayout-dark-theme.css';

import { MicroFrontEndComponent } from '../components';

interface IGoldenLayoutComponentProps {
}

export const GoldenLayoutComponent = (props: IGoldenLayoutComponentProps) => {
  const ref = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      init(ref);
    })
  }, []);

  return (
    <div ref={ref} className="golden-layout-container"></div>
  )
}

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
              type: 'react-component',
              component: 'MicroFrontEndComponent',
              props: { url: '/micro-app/stock-grid' },
            },
            {
              type: 'row',
              content: [
                {
                  title: 'Golden',
                  type: 'react-component',
                  component: 'MicroFrontEndComponent',
                  props: { url: '/micro-app/golden-spiral' },
                  width: 30,
                },
                {
                  title: 'Layout',
                  type: 'react-component',
                  component: 'MicroFrontEndComponent',
                  props: { url: '/micro-app/golden-text' },
                },
              ]
            },
            {
              type: 'stack',
              content: [
                {
                  title: 'Acme, inc.',
                  type: 'react-component',
                  component: 'MicroFrontEndComponent',
                  props: { url: '/micro-app/stock-chart' },
                  componentState: {
                    companyName: 'Stock X'
                  },
                },
                {
                  title: 'LexCorp plc.',
                  type: 'react-component',
                  component: 'MicroFrontEndComponent',
                  props: { url: '/micro-app/stock-chart' },
                  componentState: { companyName: 'Stock Y' },
                },
                {
                  title: 'Springshield plc.',
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
              type: 'react-component',
              component: 'MicroFrontEndComponent',
              props: { url: '/micro-app/column-chart' },
            },
            {
              title: 'Market',
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

const init = (ref) => {
  // const savedState = localStorage.getItem('savedState');
  // const config = savedState ? JSON.parse(savedState) : defaultConfig;
  const config = defaultConfig;

  const myLayout = new GoldenLayout(config, ref.current);
  myLayout.registerComponent('MicroFrontEndComponent', MicroFrontEndComponent);

  initAutoSave(myLayout);
  myLayout.init();
}

const initAutoSave = (myLayout) => {
  myLayout.on('stateChanged', function () {
    const state = JSON.stringify(myLayout.toConfig());
    localStorage.setItem('savedState', state);
  });
}
