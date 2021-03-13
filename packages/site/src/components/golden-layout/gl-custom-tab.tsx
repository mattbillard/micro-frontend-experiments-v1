import React from 'react';
import { v4 as uuid } from 'uuid';
import { IGlComponentProps as IGlComponentProps } from '../../types';

import { goldenLayoutUtils } from '../../utils';

declare const window: any;

window.popups = [];

// If window closes
window.addEventListener('beforeunload', () => {
  // If it has child popup windows, close all of them
  window.popups.forEach((popup: Window) => popup.close());

  // Else if it's a child window, go back to parent
  goldenLayoutUtils.popBack();
});

// Make it easier to open OpenFin windows by overwriting window.open
if (window.fin) {
  overwriteWindowOpen();
}

export const GlCustomTab = (props: IGlComponentProps) => {
  return (
    <div className="golden-layout-custom-tab">
      <ul className="lm_controls">
        <li
          className="lm_popout"
          title="open in new window"
          onClick={(event) => openWin(event, props)}
        ></li>
      </ul>
    </div>
  );
};

const openWin = (event: React.MouseEvent, props: IGlComponentProps) => {
  const { glContainer } = props;

  const title = glContainer._config.title;
  const url = `/site-url/golden-layout/popout${glContainer._config.componentState?.childUrl}`;
  const width = glContainer.width;
  const height = glContainer.height + 20; // Make taller to accomodate browser's titlebar
  const top = event.clientY;
  const left = event.clientX;

  const obj = { top, left, width, height };
  const specs = Object.entries(obj)
    .map(([key, value]) => `${key}=${value}`)
    .join(',');

  glContainer.close();
  const newWin = window.open(url, '_blank', specs);
  window.popups.push(newWin);

  setTimeout(() => {
    const document = newWin.document || newWin.contentWindow.document; // Chrome or OpenFin
    document.title = title;
  }, 1000);
};

function overwriteWindowOpen() {
  window.open = (url: string, name: string = '', specs: string = '') => {
    // Open fin wants a unique name
    if (name?.charAt(0) === '_') {
      name = uuid();
    }

    const obj: any = {};
    specs.split(',').forEach((str: string) => {
      const [key, val] = str.trim().split('=');
      obj[key] = val;
    });

    const defaultWidth = obj.width ? parseInt(obj.width) : 600;
    const defaultHeight = obj.height ? parseInt(obj.height) : 400;

    const win = new window.fin.desktop.Window(
      { name, url, defaultWidth, defaultHeight },
      () => {
        win.show();

        if (obj.top || obj.left) {
          const top = obj.top ? parseInt(obj.top) : 20;
          const left = obj.left ? parseInt(obj.left) : 20;
          win.moveTo(left, top);
        }
      },
      console.error,
    );

    return win;
  };
}
