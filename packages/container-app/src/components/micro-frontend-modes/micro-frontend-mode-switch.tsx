import * as React from 'react';
import { connect, useDispatch, useSelector, Provider } from 'react-redux';
import ReactShadow from 'react-shadow'; // TODO: consider "declarative shadowDom" once browsers standardize it

import {
  IframeComponent,
  InjectWholeAppHtmlComponent,
  LazyImportComponent,
  RemoteComponent,
} from '../../components';
import { appNav, MicroFrontendMode, } from '../../constants';
import { IStoreState, store } from '../../redux';

interface IMicroFrontEndComponent {
  url: string;
  setState: (state: any) => void;
  setTitle: (title: string) => void;
}

export const MicroFrontendModeSwitch = (props: IMicroFrontEndComponent) =>{
  const { settings: { isShadow, mode, showHints, } } = useSelector((state: IStoreState) => state.containerAppReducer);
  const { url } = props;
  
  const navItem = appNav.find(navItem => navItem.url.includes(url));
  const featureDefinition = navItem.featureDefinition;

  const newProps = {...props, featureDefinition, showHints };

  
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
    case MicroFrontendMode.LazyImport:
      className = 'lazy-import-component';
      MicroFrontendType = LazyImportComponent;
      break;
    case MicroFrontendMode.RemoteComponent:
      className = 'remote-component';
      MicroFrontendType = RemoteComponent;
      break;
  }

  return (
    isShadow ? (
        <ReactShadow.div className={`micro-frontend-switch ${className} shadow-dom`}>
          <MicroFrontendType key={url} className={className} {...newProps} />
        </ReactShadow.div>
      ) : (
        <div className={`micro-frontend-switch ${className}`}>
          <MicroFrontendType key={url} className={className} {...newProps} />
        </div>
      )
  );
}
