import * as React from 'react';
import * as ReactDOM from "react-dom";
import $ from 'jquery';
import { connect, IStoreState, Provider } from 'react-redux';
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
import { saveGoldenLayoutConfig, store } from '../redux';

interface IGoldenLayoutComponentProps {
}

export class GoldenLayoutComponentView extends React.Component {
  myLayout;
  ref;

  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount = () => {
    const savedConfig = localStorage.getItem('goldenLayoutConfig');
    const config = savedConfig ? JSON.parse(savedConfig) : defaultConfig;

    const myLayout = this.myLayout = new GoldenLayout(config, this.ref.current);
    myLayout.registerComponent('MicroFrontEndComponent', this.withStore(MicroFrontEndComponent));

    this.initAutoSave(myLayout);
    setTimeout(() => myLayout.init())

    window.addEventListener('resize', this.redrawDebounced);
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.redrawDebounced);
  }

  initAutoSave = (myLayout) => {
    myLayout.on('stateChanged', () => {
      const config = myLayout.toConfig();
      this.props.dispatch(saveGoldenLayoutConfig(config));
    });
  }

  redraw = (ref, myLayoutRef) => {
    const container = this.ref.current;
    var { width, height } = container!.getBoundingClientRect();
    this.myLayout!.updateSize(width, height);
  }
  redrawDebounced = debounce(this.redraw, 250);

  // Add contexts like store because Goldenlayout does not pass them down
  withStore = (Component) => {
    return class WithStore extends React.Component {
      render () {
        return (
          <Provider store={store}>
            <Component {...this.props} />
          </Provider>
        )
      }
    }
  }

  render() {
    return (
      <div ref={this.ref} className="golden-layout-container"></div>
    )
  } 
}

const mapDispatchToProps = (dispatch) => ({
  dispatch
});
const mapStateToProps = (state: IStoreState) => ({
  // sample: state.sample
});
export const GoldenLayoutComponent = connect(mapStateToProps,mapDispatchToProps)(GoldenLayoutComponentView);


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
