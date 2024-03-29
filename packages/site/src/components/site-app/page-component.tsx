import React from 'react';
import { RouteProps, useHistory, useRouteMatch } from 'react-router-dom';

import { MicroFrontendModeSwitch } from '../../components';
import { definitionUtils } from '../../utils';

export interface IPageComponentProps {
}

export const PageComponent = (props: IPageComponentProps) => {
  const history = useHistory();
  const setTitle = (title: string) => (document.title = title);
  const setUrl = (url: string) => {
    const newUrl = `/site-url${url}`;
    history.push(newUrl);
  };

  const routeMatch = useRouteMatch();
  const { params } = routeMatch;
  const childUrl = `/${params[0]}`;

  const appDefinition = definitionUtils.getAppDefinitionFromUrl(childUrl)!;
  const newProps = { ...props, setTitle, setUrl, childUrl, appDefinition };

  return (
    <div className="page-component">
      <MicroFrontendModeSwitch key={appDefinition.id} {...newProps} />
    </div>
  );
};
