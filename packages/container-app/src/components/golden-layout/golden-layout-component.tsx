import * as React from 'react';
import { connect, useSelector, Provider } from 'react-redux';

import {
  MicroFrontendModeSwitch,
} from '../../components';
import { IStoreState, store } from '../../redux';

// GoldenLayout only works with class components
export class GoldenLayoutComponent extends React.Component<any, any> {
  render () {
    const url = this.props.glContainer._config.componentState?.url || '/micro-app'; // TODO: fix
    const setTitle = ((title) => this.props.glContainer.setTitle(title));
    const setState = ((state) => this.props.glContainer.setState(state));
    const newProps = { ...this.props, setTitle, setState, url };
  
    return (
      <MicroFrontendModeSwitch {...newProps} />
    );
  }
}
