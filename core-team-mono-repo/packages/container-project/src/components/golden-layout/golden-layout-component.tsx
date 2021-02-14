import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { GoldenLayoutNavigation, MicroFrontendModeSwitch } from '../../components';
import { IStoreState } from '../../redux';

export const GoldenLayoutComponentView = (props) => {
  const _appId = props.glContainer._config.componentState?.appId;
  const _childUrl = props.glContainer._config.componentState?.childUrl;
  const [state, setState] = useState({ appId:_appId, childUrl:_childUrl});
  const appAndNavDefinitions = useSelector((state: IStoreState) => state.containerAppReducer).appAndNavDefinitions!;

  const setTitle = ((title) => props.glContainer.setTitle(title));
  const setChildUrl = ((childUrl) => {
    const state = { childUrl, appId };
    props.glContainer.setState(state);
  });

  const navigateToMicroApp = (appId, childUrl) => {
    const state = { appId, childUrl };
    props.glContainer.setState(state, childUrl);
    setState({ childUrl, appId });
  }

  const { appId, childUrl } = state;

  if (!appId || !childUrl) {
    return <GoldenLayoutNavigation appId={appId} navigateToMicroApp={navigateToMicroApp} />
  }

  const featureDefinition = appAndNavDefinitions.apps[appId];
  const newProps = { ...props, setTitle, setChildUrl, childUrl, featureDefinition };

  return (
    <MicroFrontendModeSwitch {...newProps} />
  );
}

// GoldenLayout only works with class components
export class GoldenLayoutComponent extends React.Component<any, any> {
  render () {
    return (
      <GoldenLayoutComponentView {...this.props} />
    );
  }
}
