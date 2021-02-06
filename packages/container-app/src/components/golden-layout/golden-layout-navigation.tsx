import * as React from 'react';
import { useState } from 'react';
import { featureDefinitions, appNav } from '../../constants';

export const GoldenLayoutNavigation = (props) => {
  const { featureId } = props;

  const navigate = (event, featureId, childUrl) => {
    event.preventDefault();
    props.navigateToMicroApp(featureId, childUrl);
  }

  // Step 1: choosing featureId
  let links;
  if (!featureId) {
    links = Object.values(featureDefinitions)
      .map((featureDefinition) => {
        const { id, text } = featureDefinition;
        const childUrl = undefined;
        return { childUrl, featureId: id, text };
      });

  // Step 2: choosing childUrl
  } else {
    links = appNav
      .filter(navItem => navItem.featureId === featureId)
      .map(navItem => {
        const { childUrl, text } = navItem;
        return { childUrl, featureId, text }
      });
  }

  return (
    <div className='golden-layout-navigation'>
      {links.map((link) => {
        const { childUrl, featureId, text } = link;
        return (
          <a key={text} href="#" onClick={(event) => navigate(event, featureId, childUrl)}>{text}</a>
        )
      })}
    </div>
  );
}
