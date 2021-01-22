import * as React from 'react';
import * as ReactDOM from "react-dom";
import $ from 'jquery';
import { connect, Provider } from 'react-redux';
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
import {
  DEFAULT_GOLDEN_LAYOUT_CONFIG,
  DEFAULT_SETTINGS,
} from '../constants';
import { 
  IStoreState,
  saveGoldenLayoutConfig,
  updateGoldenLayoutConfig,
  store 
} from '../redux';
import { 
  xhrService,
} from '../services';

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
    (async () => {
      const goldenLayoutConfig = await xhrService.getGoldenLayoutConfig() || DEFAULT_GOLDEN_LAYOUT_CONFIG;
      // const goldenLayoutConfig = DEFAULT_GOLDEN_LAYOUT_CONFIG;
      this.init(goldenLayoutConfig);
      window.addEventListener('resize', this.redrawDebounced);
    })();
  }

  componentDidUpdate = (prevProps) => {
    const { goldenLayoutConfig } = this.props;
    const isEqual = JSON.stringify(this.myLayout.toConfig()) === JSON.stringify(goldenLayoutConfig);

    if (!isEqual) {
      console.log('Golden Layout: redraw');
      this.myLayout.destroy();
      this.init(goldenLayoutConfig);
    }
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.redrawDebounced);
  }

  init = (config) => {
    const container = this.ref.current;

    this.myLayout = new GoldenLayout(config, container);
    this.myLayout.registerComponent('MicroFrontEndComponent', this.withStore(MicroFrontEndComponent));
    window.myLayout = this.myLayout;

    setTimeout(() => {
      this.myLayout.init();

      console.log('Golden Layout: updating redux')
      this.props.dispatch(updateGoldenLayoutConfig(this.myLayout.toConfig()));

      this.myLayout.on('stateChanged', this.saveConfigDebounced);
    })
  }

  redraw = (ref, myLayoutRef) => {
    const container = this.ref.current;
    var { width, height } = container!.getBoundingClientRect();
    this.myLayout!.updateSize(width, height);
  }
  redrawDebounced = debounce(this.redraw, 250);

  saveConfig = () => {
    const isEqual = JSON.stringify(this.myLayout.toConfig()) === JSON.stringify(this.props.goldenLayoutConfig);
    if (!isEqual) {
      console.log('Golden Layout: save');
      const config = this.myLayout.toConfig();
      this.props.dispatch(saveGoldenLayoutConfig(config));
    }
  }
  saveConfigDebounced = debounce(this.saveConfig, 1000);

  addNewComponent = (event) => {
    event.preventDefault();

    var newItemConfig = {
      title: 'New Item',
      type: 'react-component',
      component: 'MicroFrontEndComponent',
      props: {
      },
    };
  
    this.myLayout.root.contentItems[0].addChild(newItemConfig);
  }

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
      <div className="golden-layout">
        <div className="golden-layout-toolbar">
          <a onClick={this.addNewComponent}>Add +</a>
        </div>
        <div ref={this.ref} className="golden-layout-container"></div>
      </div>
    )
  } 
}

const mapStateToProps = (state: IStoreState) => ({
  goldenLayoutConfig: state.containerAppReducer.goldenLayoutConfig
});
const mapDispatchToProps = (dispatch) => ({
  dispatch
});
// const mapDispatchToProps = {
//   dispatch
// };
export const GoldenLayoutComponent = connect(mapStateToProps, mapDispatchToProps)(GoldenLayoutComponentView);
