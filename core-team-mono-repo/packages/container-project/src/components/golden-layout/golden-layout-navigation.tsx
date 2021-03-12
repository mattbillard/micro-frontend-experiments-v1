import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { IStoreState } from '../../redux';

import './golden-layout-navigation.less';

export interface ILink {
  appId: string;
  childUrl?: string;
  text: string;
}

export interface IGoldenLayoutNavigation {
  navigateToMicroApp: (childUrl: string) => void;
}

export const GoldenLayoutNavigation = (props: IGoldenLayoutNavigation) => {
  const [appId, setAppId] = useState<string>();
  const appAndNavDefinitions = useSelector(
    (state: IStoreState) => state.containerAppReducer,
  ).appAndNavDefinitions!;

  const navigate = (
    event: React.MouseEvent,
    newAppId: string,
    childUrl: string,
  ) => {
    event.preventDefault();

    if (!appId) {
      setAppId(newAppId);
    } else {
      props.navigateToMicroApp(childUrl);
    }
  };

  // Step 1: choosing appId
  let links: ILink[];
  if (!appId) {
    links = Object.values(appAndNavDefinitions.apps).map((appDefinition) => {
      const { id, text } = appDefinition;
      const childUrl = undefined;
      return { childUrl, appId: id, text };
    });

    // Step 2: choosing childUrl
  } else {
    links = appAndNavDefinitions.nav
      .filter((navItem) => navItem.appId === appId)
      .map((navItem) => {
        const { childUrl, text } = navItem;
        return { childUrl, appId, text };
      });
  }

  return (
    <div className="golden-layout-navigation">
      {links.map((link) => {
        const { childUrl, appId, text } = link;
        return (
          <a
            key={text}
            href="#"
            onClick={(event) => navigate(event, appId, childUrl!)}
          >
            {text}
          </a>
        );
      })}
    </div>
  );
};
