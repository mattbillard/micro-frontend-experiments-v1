import * as React from 'react';
import * as ReactDOM from "react-dom";
import $ from 'jquery';
import { connect, Provider } from 'react-redux';
import { debounce, isEqual } from 'lodash-es';

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
import { IStoreState, saveGoldenLayoutConfig, store } from '../redux';

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
    this.init();
    window.addEventListener('resize', this.redrawDebounced);
  }

  componentDidUpdate = (prevProps) => {
    if (isEqual(this.myLayout.toConfig(), this.props.goldenLayoutConfig) === false) {
      console.log('Golden Layout: redraw');
      this.myLayout.destroy();
      this.init();
    }
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.redrawDebounced);
  }

  init = () => {
    const config = this.props.goldenLayoutConfig;
    const container = this.ref.current;

    this.myLayout = new GoldenLayout(config, container);
    this.myLayout.registerComponent('MicroFrontEndComponent', this.withStore(MicroFrontEndComponent));

    setTimeout(() => {
      this.myLayout.init();

      setTimeout(() => {
        this.myLayout.on('stateChanged', this.saveConfigDebounced);
      });
    })
  }

  redraw = (ref, myLayoutRef) => {
    const container = this.ref.current;
    var { width, height } = container!.getBoundingClientRect();
    this.myLayout!.updateSize(width, height);
  }
  redrawDebounced = debounce(this.redraw, 250);

  saveConfig = () => {
    if (isEqual(this.myLayout.toConfig(), this.props.goldenLayoutConfig) === false) {
      console.log('Golden Layout: save');
      const config = this.myLayout.toConfig();
      this.props.dispatch(saveGoldenLayoutConfig(config));
    }
  }
  saveConfigDebounced = debounce(this.saveConfig, 1000);

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
  goldenLayoutConfig: state.containerAppReducer.goldenLayoutConfig
});
export const GoldenLayoutComponent = connect(mapStateToProps,mapDispatchToProps)(GoldenLayoutComponentView);
