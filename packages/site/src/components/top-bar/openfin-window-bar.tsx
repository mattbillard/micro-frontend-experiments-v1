import React from 'react';

declare const window: any;

/**
 * NOTES:
 * Code from: https://github.com/openfin/platform-api-project-seed/blob/master/js/title-bar.js
 * If we use openfin-config-easiest.json, we need to provide our own top bar for the window
 * OpenFin seems to inject the CSS necessary to make this work into the head tag of the window
 */

export const OpenFinWindowBar = () => {
  if (!window.fin) {
    return null;
  }

  return (
    <div id="title-bar">
      <div className="title-bar-draggable">{/* <div id="title">MattFin</div> */}</div>
      <div id="buttons-wrapper">
        <div
          className="button"
          title="Minimize Window"
          id="minimize-button"
          onClick={() => window.fin.me.minimize()}
        ></div>
        <div
          className="button"
          title="Maximize Window"
          id="expand-button"
          onClick={() => maxOrRestore()}
        ></div>
        <div
          className="button"
          title="Close Window"
          id="close-button"
          onClick={() => window.fin.me.close()}
        ></div>
      </div>
    </div>
  );
};

const maxOrRestore = async () => {
  if ((await window.fin.me.getState()) === 'normal') {
    return await window.fin.me.maximize();
  } else {
    return window.fin.me.restore();
  }
};
