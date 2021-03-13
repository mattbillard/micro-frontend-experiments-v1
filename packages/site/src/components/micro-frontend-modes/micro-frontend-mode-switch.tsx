import React from 'react';
import { useSelector } from 'react-redux';
import ReactShadow from 'react-shadow'; // TODO: consider "declarative shadowDom" once browsers standardize it

import {
  IframeComponent,
  IframePortal,
  InjectWholeAppHtmlComponent,
  DynamicImportComponent,
  RemoteComponent,
} from '../../components';
import { MicroFrontendMode } from '../../constants';
import { IStoreState } from '../../redux';
import { IMicroFrontEndComponent } from '../../types';

import './micro-frontend-mode-switch.less';

export const MicroFrontendModeSwitch = (props: IMicroFrontEndComponent) => {
  const {
    settings: { isIframe, isShadow, mode, showHints },
  } = useSelector((state: IStoreState) => state.containerAppReducer);
  const { appDefinition } = props;
  const childUrl = props.childUrl || appDefinition.defaultChildUrl!;
  const newProps = { ...props, childUrl, appDefinition, showHints };

  let className;
  let MicroFrontendType;
  switch (mode) {
    case MicroFrontendMode.Iframe:
      className = 'iframe-component';
      MicroFrontendType = IframeComponent;
      break;
    case MicroFrontendMode.InjectWholeAppHtml:
      className = 'inject-whole-app-html-component';
      MicroFrontendType = InjectWholeAppHtmlComponent;
      break;
    case MicroFrontendMode.DynamicImport:
      className = 'lazy-import-component';
      MicroFrontendType = DynamicImportComponent;
      break;
    case MicroFrontendMode.RemoteComponent:
      className = 'remote-component';
      MicroFrontendType = RemoteComponent;
      break;
  }

  return isIframe ? (
    <div className={`micro-frontend-mode-switch ${className}`}>
      <IframePortal>
        <MicroFrontendType {...newProps} />
      </IframePortal>
    </div>
  ) : isShadow ? (
    <ReactShadow.div
      className={`micro-frontend-mode-switch ${className} shadow-dom`}
    >
      <MicroFrontendType {...newProps} />
    </ReactShadow.div>
  ) : (
    <div className={`micro-frontend-mode-switch ${className}`}>
      <MicroFrontendType {...newProps} />
    </div>
  );
};
