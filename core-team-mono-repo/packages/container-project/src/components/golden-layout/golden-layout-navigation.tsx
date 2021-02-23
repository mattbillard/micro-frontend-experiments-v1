import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { IStoreState } from '../../redux';

export const GoldenLayoutNavigation = (props) => {
  const [appId, setAppId] = useState();
  const appAndNavDefinitions = useSelector((state: IStoreState) => state.containerAppReducer).appAndNavDefinitions!;

  const navigate = (event, newAppId, childUrl) => {
    event.preventDefault();

    if (!appId) {
      setAppId(newAppId);
    } else {
      props.navigateToMicroApp(childUrl);
    }
  }

  // Step 1: choosing appId
  let links;
  if (!appId) {
    links = Object.values(appAndNavDefinitions.apps)
      .map((featureDefinition) => {
        const { id, text } = featureDefinition;
        const childUrl = undefined;
        return { childUrl, appId: id, text };
      });

  // Step 2: choosing childUrl
  } else {
    links = appAndNavDefinitions.nav
      .filter(navItem => navItem.appId === appId)
      .map(navItem => {
        const { childUrl, text } = navItem;
        return { childUrl, appId, text }
      });
  }

  return (
    <div className='golden-layout-navigation'>
      {links.map((link) => {
        const { childUrl, appId, text } = link;
        return (
          <a key={text} href="#" onClick={(event) => navigate(event, appId, childUrl)}>{text}</a>
        )
      })}
    </div>
  );
}
