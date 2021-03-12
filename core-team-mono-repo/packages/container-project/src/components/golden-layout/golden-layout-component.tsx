import React, { useState } from 'react';
import { Provider } from 'react-redux';

import {
  GoldenLayoutNavigation,
  MicroFrontendModeSwitch,
} from '../../components';
import { store } from '../../redux';
import { IGoldenLayoutComponentProps } from '../../types';
import { definitionUtils } from '../../utils';

export const GoldenLayoutComponentView = (
  props: IGoldenLayoutComponentProps,
) => {
  const _childUrl = props.glContainer._config.componentState?.childUrl;
  const [state, setState] = useState({ childUrl: _childUrl });

  const setTitle = (title: string) => props.glContainer.setTitle(title); // TODO: fix
  const setUrl = (childUrl: string) => {
    const state = { childUrl };
    props.glContainer.setState(state);
  };

  const navigateToMicroApp = (childUrl: string) => {
    const state = { childUrl };
    props.glContainer.setState(state, childUrl);
    setState({ childUrl });
  };

  const { childUrl } = state;

  if (!childUrl) {
    return <GoldenLayoutNavigation navigateToMicroApp={navigateToMicroApp} />;
  }

  const appDefinition = definitionUtils.getAppDefinitionFromUrl(childUrl)!;
  const newProps = { ...props, setTitle, setUrl, childUrl, appDefinition };

  return <MicroFrontendModeSwitch {...newProps} />;
};

// GoldenLayout only works with class components // TODO: not sure that is true now that I wrote my own react component adapter
export class GoldenLayoutComponent extends React.Component<
  IGoldenLayoutComponentProps,
  {}
> {
  render() {
    return (
      // Add contexts like store because Goldenlayout does not pass them down
      <Provider store={store}>
        <GoldenLayoutComponentView {...this.props} />
      </Provider>
    );
  }
}
