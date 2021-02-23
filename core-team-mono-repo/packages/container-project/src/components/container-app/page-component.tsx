import * as React from 'react';
import { useRouteMatch } from 'react-router-dom';

import { MicroFrontendModeSwitch } from '../../components';
import { definitionUtils } from '../../utils';

interface IPageComponentProps {
}

export const PageComponent = (props: IPageComponentProps) => {
  const setTitle = (title) => document.title = title;
  const setChildUrl = (url) => { /* noop */ };

  const routeMatch = useRouteMatch();
  const { params } = routeMatch;
  const parentUrl = `/${params[0]}`;

  const featureDefinition = definitionUtils.getFileDefinitionFromUrl(parentUrl);
  const navItem = definitionUtils.getNavItemFromUrl(parentUrl);
  const childUrl = navItem!.childUrl;

  const newProps = { ...props, setTitle, setChildUrl, childUrl, featureDefinition }

  return (
    <div className="page-component">
      <MicroFrontendModeSwitch {...newProps} />
    </div>
  )
}
