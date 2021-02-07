import * as React from 'react';
import { useRouteMatch } from 'react-router-dom';

import { MicroFrontendModeSwitch } from '../../components';
import { appNav } from '../../constants';

interface IPageComponentProps {
}

export const PageComponent = (props: IPageComponentProps) => {
  const setTitle = (title) => document.title = title;
  const setChildUrl = (url) => { /* noop */ };

  const routeMatch = useRouteMatch();
  const { params } = routeMatch;
  const parentUrl = `/${params[0]}`;

  const navItem = appNav.find(navItem => navItem.parentUrl.includes(parentUrl));
  const featureDefinition = navItem!.featureDefinition;
  const childUrl = navItem!.childUrl;

  const newProps = { ...props, setTitle, setChildUrl, childUrl, featureDefinition }

  return (
    <div className="page-component">
      <MicroFrontendModeSwitch {...newProps} />
    </div>
  )
}
