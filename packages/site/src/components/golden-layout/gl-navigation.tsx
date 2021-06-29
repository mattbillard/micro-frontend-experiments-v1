import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { IStoreState } from '../../redux';

import './gl-navigation.less';

export interface ILink {
  appId: string;
  childUrl?: string;
  text: string;
}

export interface IGlNavigation {
  navigateToMicroApp: (childUrl: string) => void;
}

export const GlNavigation = (props: IGlNavigation) => {
  const appAndNavDefinitions = useSelector((state: IStoreState) => state.containerAppReducer)
    .appAndNavDefinitions!;

  const navigate = (event: React.MouseEvent, childUrl: string) => {
    event.preventDefault();
    props.navigateToMicroApp(childUrl);
  };

  const links = Object.values(appAndNavDefinitions.apps).map((appDefinition) => {
    const { baseUrl, appName: text } = appDefinition;
    const childUrl = baseUrl;
    return { childUrl, text };
  });

  return (
    <div className="golden-layout-navigation">
      {links.map((link) => {
        const { childUrl, text } = link;
        return (
          <a key={text} href="#" onClick={(event) => navigate(event, childUrl)}>
            {text}
          </a>
        );
      })}
    </div>
  );
};
