import React from 'react';
import ReactDOM from 'react-dom';
import { debounce } from 'lodash-es';

// Golden Layout needs these
import $ from 'jquery';
declare const window: any;
window.React = React;
window.ReactDOM = ReactDOM;
window.$ = $;
window.jQuery = $;
const GoldenLayout = require('golden-layout');
import 'golden-layout/src/css/goldenlayout-base.css';
import 'golden-layout/src/css/goldenlayout-dark-theme.css';

import { getDefaultNewGoldenLayoutComponent } from '../../constants';
import { GoldenLayoutComponent, GoldenLayoutCustomTab } from '../../components';
import {
  IGoldenLayoutComponentProps,
  GoldenLayoutConfig,
  IGoldenLayoutTab,
  IGoldenLayoutConfigContent,
  IGoldenLayoutComponentState,
} from '../../types';

export interface IGoldenLayoutContainerProps {
  goldenLayoutConfig: GoldenLayoutConfig;
  dispatchSaveGoldenLayout: (config: GoldenLayoutConfig) => void;
}

export interface IGoldenLayoutContainerState {}

export class GoldenLayoutContainer extends React.Component<
  IGoldenLayoutContainerProps,
  any
> {
  myLayout: GoldenLayoutConfig;
  ref = React.createRef<HTMLDivElement>();

  constructor(props: IGoldenLayoutContainerProps) {
    super(props);
  }

  componentDidMount = () => {
    this.init();

    // Allows components we've popped out to come back
    window.addNewGoldenLayoutComponent = (
      componentState: IGoldenLayoutComponentState,
    ) => {
      this.addNewComponent(undefined, componentState);
      this.saveConfig();
    };

    // Resize to fit window
    window.addEventListener('resize', this.updateSizeDebounced);
    return () => window.removeEventListener('resize', this.updateSizeDebounced);
  };

  componentDidUpdate = (prevProps: IGoldenLayoutContainerProps) => {
    if (prevProps.goldenLayoutConfig !== this.props.goldenLayoutConfig) {
      const myLayout = this.myLayout;
      if (!myLayout.isInitialised) {
        return;
      }

      const currentConfig = myLayout.toConfig();
      const goldenLayoutConfig = this.props.goldenLayoutConfig;
      const isEqual =
        JSON.stringify(currentConfig) === JSON.stringify(goldenLayoutConfig);

      // Reinit
      if (!isEqual) {
        console.log('Golden Layout: redraw');
        myLayout.destroy();
        this.init();
      }
    }
  };

  addNewComponent = (
    event?: React.MouseEvent,
    componentState?: IGoldenLayoutComponentState,
  ) => {
    event?.preventDefault();

    // Figure out where to put new component
    let addTo = this.myLayout.root;
    while (
      addTo.contentItems &&
      addTo.contentItems[0] &&
      addTo.contentItems[0].type !== 'component'
    ) {
      addTo = addTo.contentItems[0];
    }

    // If componentState is specified, use it
    const newComponent = getDefaultNewGoldenLayoutComponent();
    if (componentState) {
      // @ts-ignore
      newComponent.componentState = componentState;
    }

    addTo.addChild(newComponent);
  };

  init = () => {
    const goldenLayoutConfig = this.props.goldenLayoutConfig;
    const container = this.ref.current!;

    fixActiveItemIndex(goldenLayoutConfig.content);

    const myLayout = new GoldenLayout(goldenLayoutConfig, container);
    this.myLayout = myLayout;
    window.myLayout = myLayout; // Useful for debugging

    // myLayout.registerComponent('GoldenLayoutComponent', GoldenLayoutComponent);
    myLayout.registerComponent('ReactWrapperComponent', ReactWrapperComponent);

    setTimeout(() => {
      myLayout.init();
      // dispatch(updateGoldenLayoutConfig(myLayout.toConfig()));
      myLayout.on('stateChanged', this.saveConfigDebounced);
    });
  };

  saveConfig = () => {
    const myLayout = this.myLayout;

    const currentConfig = myLayout.toConfig();
    const isEqual =
      JSON.stringify(currentConfig) ===
      JSON.stringify(this.props.goldenLayoutConfig);

    if (!isEqual) {
      console.log('Golden Layout: save');
      this.props.dispatchSaveGoldenLayout(currentConfig);
    }
  };
  saveConfigDebounced = debounce(this.saveConfig, 1000);

  updateSize = () => {
    const myLayout = this.myLayout;
    const container = this.ref.current as any;
    var { width, height } = container!.getBoundingClientRect();
    myLayout.updateSize(width, height);
  };
  updateSizeDebounced = debounce(this.updateSize, 250);

  render = () => {
    return (
      <div className="golden-layout-container flex-rows">
        <div className="golden-layout-toolbar">
          <a onClick={(event) => this.addNewComponent(event)}>Add +</a>
        </div>
        <div ref={this.ref} className="golden-layout-div"></div>
      </div>
    );
  };
}

/**
 * PROBLEM: when deleting lots of panes, GoldenLayout doesn't recalculate activeItemIndex properly
 * SOLUTION: if activeItemIndex >= number of children in array, fix it
 */
const fixActiveItemIndex = (content: IGoldenLayoutConfigContent[]) => {
  content.forEach((item) => {
    const { activeItemIndex } = item;
    if (activeItemIndex >= item.content?.length) {
      item.activeItemIndex = 0;
    }

    if (item.content) {
      fixActiveItemIndex(item.content);
    }
  });
};

/**
 * PROBLEM: Golden Layout doesn't allow both React components and customized tabs
 * SOLUTION: reimplement Golden Layout's react-component
 */
const ReactWrapperComponent = (
  glContainer: any,
  componentState: IGoldenLayoutComponentState,
) => {
  const glEventHub = glContainer.layoutManager.eventHub;
  const props: IGoldenLayoutComponentProps = { glContainer, glEventHub };

  // Custom tab
  glContainer.on('tab', (tab: IGoldenLayoutTab) => {
    const elem = document.createElement('div');
    tab.element.find('.lm_title').after(elem);
    ReactDOM.render(<GoldenLayoutCustomTab {...props} />, elem);
  });

  setTimeout(() => {
    const elem = glContainer.getElement()[0];
    ReactDOM.render(<GoldenLayoutComponent {...props} />, elem);
  });
};
