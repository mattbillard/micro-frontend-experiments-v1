import * as React from 'react';
import { useRouteMatch } from 'react-router-dom';

import { MicroFrontendModeSwitch } from '../../components';
import { definitionUtils, goldenLayoutUtils } from '../../utils';

export const GoldenLayoutPopout = (props) => {
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
    <div>
      <div className="lm_popin" title="pop in" onClick={goldenLayoutUtils.popBack}>
        <div className="lm_icon"></div>
        <div className="lm_bg"></div>
      </div>

      <MicroFrontendModeSwitch {...newProps} />

      {/* TODO: do this better if we keep the popouts */}
      <style>{`
        .navigation{ 
          display: none; 
        }
      `}</style>
    </div>
  )
}
