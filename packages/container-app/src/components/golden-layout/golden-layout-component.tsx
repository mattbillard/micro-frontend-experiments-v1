import * as React from 'react';

import { MicroFrontendModeSwitch } from '../../components';
import { featureDefinitions } from '../../constants';

// GoldenLayout only works with class components
export class GoldenLayoutComponent extends React.Component<any, any> {
  render () {
    const setTitle = ((title) => this.props.glContainer.setTitle(title));
    const setChildUrl = ((childUrl) => {
      const state = {
        childUrl,
        featureId,
      };
      this.props.glContainer.setState(state);
    });

    const featureId = this.props.glContainer._config.componentState?.featureId || 'microAppFeatureId'; // TODO: fix
    const childUrl = this.props.glContainer._config.componentState?.childUrl || '/micro-app'; // TODO: fix
    const featureDefinition = featureDefinitions[featureId];

    const newProps = { ...this.props, setTitle, setChildUrl, childUrl, featureDefinition };
  
    return (
      <MicroFrontendModeSwitch {...newProps} />
    );
  }
}
