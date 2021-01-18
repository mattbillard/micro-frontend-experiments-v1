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
    const config = this.props.goldenLayoutConfig;

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
      // @ts-ignore
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
  goldenLayoutConfig: state.containerAppReducer.goldenLayoutConfig
});
export const GoldenLayoutComponent = connect(mapStateToProps,mapDispatchToProps)(GoldenLayoutComponentView);
