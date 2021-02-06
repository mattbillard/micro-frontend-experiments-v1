import * as React from 'react';

import { GoldenLayoutNavigation, MicroFrontendModeSwitch } from '../../components';
import { featureDefinitions } from '../../constants';

// GoldenLayout only works with class components
export class GoldenLayoutComponent extends React.Component<any, any> {
  constructor(props) {
    super(props);
    const featureId = this.props.glContainer._config.componentState?.featureId;
    const childUrl = this.props.glContainer._config.componentState?.childUrl;
    this.state = { 
      childUrl,
      featureId,
    };
  }

  setTitle = ((title) => this.props.glContainer.setTitle(title));

  setChildUrl = ((childUrl) => {
    const state = {
      childUrl,
      featureId: this.state.featureId,
    };
    this.props.glContainer.setState(state);
  });

  navigateToMicroApp = (featureId, childUrl) => {
    const state = {
      featureId,
      childUrl,
    }
    this.props.glContainer.setState(state, childUrl);
    this.setState({ childUrl, featureId });
  }

  render () {
    const { navigateToMicroApp, setChildUrl, setTitle } = this;
    const { childUrl, featureId } = this.state;

    if (!featureId || !childUrl) {
      return <GoldenLayoutNavigation featureId={featureId} navigateToMicroApp={navigateToMicroApp} />
    }

    const featureDefinition = featureDefinitions[featureId];

    const newProps = { ...this.props, setTitle, setChildUrl, childUrl, featureDefinition };
  
    return (
      <MicroFrontendModeSwitch {...newProps} />
    );
  }
}
