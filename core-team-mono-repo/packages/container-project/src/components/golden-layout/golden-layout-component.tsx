import * as React from 'react';
import { useState } from 'react';
import { Provider } from "react-redux";

import { GoldenLayoutNavigation, MicroFrontendModeSwitch } from '../../components';
import { store } from '../../redux';
import { definitionUtils } from '../../utils';

export const GoldenLayoutComponentView = (props) => {
  const _childUrl = props.glContainer._config.componentState?.childUrl;
  const [state, setState] = useState({ childUrl:_childUrl});

  const setTitle = ((title) => props.glContainer.setTitle(title)); // TODO: fix
  const setChildUrl = ((childUrl) => {
    const state = { childUrl };
    props.glContainer.setState(state);
  });

  const navigateToMicroApp = (childUrl) => {
    const state = { childUrl };
    props.glContainer.setState(state, childUrl);
    setState({ childUrl });
  }

  const { childUrl } = state;

  if (!childUrl) {
    return <GoldenLayoutNavigation navigateToMicroApp={navigateToMicroApp} />
  }

  const featureDefinition = definitionUtils.getFileDefinitionFromUrl(childUrl);
  const newProps = { ...props, setTitle, setChildUrl, childUrl, featureDefinition };

  return (
    <MicroFrontendModeSwitch {...newProps} />
  );
}

// GoldenLayout only works with class components
export class GoldenLayoutComponent extends React.Component<any, any> {
  render () {
    return (
      // Add contexts like store because Goldenlayout does not pass them down
      <Provider store={store}>
        <GoldenLayoutComponentView {...this.props} />
      </Provider>
    );
  }
}
