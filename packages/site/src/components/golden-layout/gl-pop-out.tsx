import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import { MicroFrontendModeSwitch } from '../../components';
import { IMicroFrontEndComponent } from '../../types';
import { definitionUtils, goldenLayoutUtils } from '../../utils';

export const GlPopout = (props: IMicroFrontEndComponent) => {
  const setTitle = (title: string) => (document.title = title);
  const setUrl = (url: string) => {
    /* noop */
  };

  const routeMatch = useRouteMatch();
  const { params } = routeMatch;
  const parentUrl = `/${params[0]}`;

  const appDefinition = definitionUtils.getAppDefinitionFromUrl(parentUrl)!;
  const navItem = definitionUtils.getNavItemFromUrl(parentUrl);
  const childUrl = navItem!.childUrl;

  const newProps = { ...props, setTitle, setUrl, childUrl, appDefinition };

  return (
    <div>
      <div className="lm_popin" title="pop in" onClick={goldenLayoutUtils.popBack}>
        <div className="lm_icon"></div>
        <div className="lm_bg"></div>
      </div>

      <MicroFrontendModeSwitch {...newProps} />

      {/* TODO: do this better if we keep the popouts */}
      <style>{`
        .navigation { 
          display: none; 
        }
      `}</style>
    </div>
  );
};
