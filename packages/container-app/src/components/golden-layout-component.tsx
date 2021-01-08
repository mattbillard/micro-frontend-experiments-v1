import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import * as ReactDOM from "react-dom";
import $ from 'jquery';
import { useDispatch, useSelector } from "react-redux";
import { debounce } from 'lodash-es';

// Golden Layout needs these
declare const window: any;
window.React = React;
window.ReactDOM = ReactDOM;
window.$ = $;
window.jQuery = $;

const GoldenLayout = require('golden-layout');
import 'golden-layout/src/css/goldenlayout-base.css';
import 'golden-layout/src/css/goldenlayout-dark-theme.css';

import { MicroFrontEndComponent } from '../components';
import { saveGoldenLayoutConfig } from '../redux';

interface IGoldenLayoutComponentProps {
}

export const GoldenLayoutComponent = (props: IGoldenLayoutComponentProps) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const myLayoutRef = useRef(null);

  useEffect(() => {
    const onResize = () => redrawDebounced(ref, myLayoutRef);

    setTimeout(() => {
      init(ref);
      window.addEventListener('resize', onResize);
    })

    return () => window.removeEventListener('resize', onResize);
  }, []);

  const init = (ref) => {
    const savedConfig = localStorage.getItem('goldenLayoutConfig');
    const config = savedConfig ? JSON.parse(savedConfig) : defaultConfig;

    const myLayout = new GoldenLayout(config, ref.current);
    myLayout.registerComponent('MicroFrontEndComponent', MicroFrontEndComponent);

    initAutoSave(myLayout);
    myLayout.init();
    myLayoutRef.current = myLayout;
    window.myLayout = myLayout;
  }

  const initAutoSave = (myLayout) => {
    myLayout.on('stateChanged', () => {
      // const config = myLayout.toConfig();
      // localStorage.setItem('goldenLayoutConfig', JSON.stringify(config));
      const config = myLayout.toConfig();
      dispatch(saveGoldenLayoutConfig(config));
    });
  }

  return (
    <div ref={ref} className="golden-layout-container"></div>
  )
}

const redraw = (ref, myLayoutRef) => {
  const container = ref.current;
  const myLayout = myLayoutRef.current;
  var { width, height } = container!.getBoundingClientRect();
  myLayout!.updateSize(width, height);
}
const redrawDebounced = debounce(redraw, 250);


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
              props: {
                // key: '/micro-app/stock-grid',
                url: '/micro-app/stock-grid',
              },
            },
            {
              type: 'row',
              content: [
                {
                  title: 'Golden',
                  type: 'react-component',
                  component: 'MicroFrontEndComponent',
                  props: {
                    // key: '/micro-app/golden-spiral',
                    url: '/micro-app/golden-spiral',
                  },
                  width: 30,
                },
                {
                  title: 'Layout',
                  type: 'react-component',
                  component: 'MicroFrontEndComponent',
                  props: {
                    // key: '/micro-app/golden-text',
                    url: '/micro-app/golden-text',
                  },
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
                  props: {
                    // key: '/micro-app/stock-chart',
                    url: '/micro-app/stock-chart',
                  },
                  componentState: {
                    companyName: 'Stock X'
                  },
                },
                {
                  title: 'LexCorp plc.',
                  type: 'react-component',
                  component: 'MicroFrontEndComponent',
                  props: {
                    // key: '/micro-app/stock-chart',
                    url: '/micro-app/stock-chart',
                  },
                  componentState: { companyName: 'Stock Y' },
                },
                {
                  title: 'Springshield plc.',
                  type: 'react-component',
                  component: 'MicroFrontEndComponent',
                  props: {
                    // key: '/micro-app/stock-chart',
                    url: '/micro-app/stock-chart',
                  },
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
              props: {
                // key: '/micro-app/column-chart',
                url: '/micro-app/column-chart',
              },
            },
            {
              title: 'Market',
              type: 'react-component',
              component: 'MicroFrontEndComponent',
              props: {
                // key: '/micro-app/pie-chart',
                url: '/micro-app/pie-chart',
              },
              height: 40,
            }
          ]
        }
      ]
    }
  ]
};
