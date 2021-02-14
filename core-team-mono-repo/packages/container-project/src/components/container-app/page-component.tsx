import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from 'react-router-dom';

import { MicroFrontendModeSwitch } from '../../components';
import { IStoreState } from '../../redux';

interface IPageComponentProps {
}

export const PageComponent = (props: IPageComponentProps) => {
  const appAndNavDefinitions = useSelector((state: IStoreState) => state.containerAppReducer).appAndNavDefinitions!;
  const setTitle = (title) => document.title = title;
  const setChildUrl = (url) => { /* noop */ };

  const routeMatch = useRouteMatch();
  const { params } = routeMatch;
  const parentUrl = `/${params[0]}`;

  const navItem = appAndNavDefinitions.nav.find(navItem => navItem.parentUrl.includes(parentUrl));
  const featureDefinition = appAndNavDefinitions.apps[navItem!.appId];
  const childUrl = navItem!.childUrl;

  const newProps = { ...props, setTitle, setChildUrl, childUrl, featureDefinition }

  return (
    <div className="page-component">
      <MicroFrontendModeSwitch {...newProps} />
    </div>
  )
}
