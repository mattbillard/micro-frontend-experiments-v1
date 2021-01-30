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

import { GoldenLayoutComponent } from '../components';
import {
  DEFAULT_GOLDEN_LAYOUT_CONFIG,
  DEFAULT_MINIMAL_GOLDEN_LAYOUT_CONFIG,
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

interface IGoldenLayoutContainerProps {
}

export class GoldenLayoutContainerView extends React.Component {
  myLayout;
  ref;

  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount = () => {
    (async () => {
      const goldenLayoutConfig = await xhrService.getGoldenLayoutConfig() || DEFAULT_GOLDEN_LAYOUT_CONFIG;
      // const goldenLayoutConfig = await xhrService.getGoldenLayoutConfig() || DEFAULT_MINIMAL_GOLDEN_LAYOUT_CONFIG;
      // const goldenLayoutConfig = DEFAULT_GOLDEN_LAYOUT_CONFIG;
      // const goldenLayoutConfig = DEFAULT_MINIMAL_GOLDEN_LAYOUT_CONFIG;
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

    fixActiveItemIndex(config.content);
    // console.log('...done', JSON.stringify(config, null, '  '));

    this.myLayout = new GoldenLayout(config, container);
    this.myLayout.registerComponent('GoldenLayoutComponent', this.withStore(GoldenLayoutComponent));
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
      window.myLayout = this.myLayout;
    }
  }
  saveConfigDebounced = debounce(this.saveConfig, 1000);

  addNewComponent = (event) => {
    event.preventDefault();

    var newItemConfig = {
      title: 'New Tab',
      type: 'react-component',
      component: 'GoldenLayoutComponent',
    };

    let addTo = this.myLayout.root;
    while (addTo.contentItems && addTo.contentItems[0] && addTo.contentItems[0].type !== 'component') {
      addTo = addTo.contentItems[0];
    }
    addTo.addChild(newItemConfig);
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
export const GoldenLayoutContainer = connect(mapStateToProps, mapDispatchToProps)(GoldenLayoutContainerView);


/**
 * PROBLEM: when deleting lots of panes, GoldenLayout doesn't recalculate activeItemIndex properly
 * SOLUTION: if activeItemIndex >= number of children in array, fix it
 */
const fixActiveItemIndex = (content) => {
  content.forEach(item => {
    const { activeItemIndex } = item;
    if (activeItemIndex >= item.content?.length) {
      item.activeItemIndex = 0;
    }

    if (item.content) {
      fixActiveItemIndex(item.content);
    }
  })
}

