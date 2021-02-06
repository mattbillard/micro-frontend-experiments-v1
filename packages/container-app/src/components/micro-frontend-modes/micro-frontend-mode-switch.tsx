import * as React from 'react';
import { connect, useDispatch, useSelector, Provider } from 'react-redux';
import ReactShadow from 'react-shadow'; // TODO: consider "declarative shadowDom" once browsers standardize it

import {
  IframeComponent,
  InjectWholeAppHtmlComponent,
  LazyImportComponent,
  RemoteComponent,
} from '../../components';
import { MicroFrontendMode, } from '../../constants';
import { IStoreState, store } from '../../redux';

interface IMicroFrontEndComponent {
  childUrl: string;
  featureDefinition: any; // TODO: type
  setChildUrl: (url: string) => void;
  setTitle: (title: string) => void;
}

export const MicroFrontendModeSwitch = (props: IMicroFrontEndComponent) =>{
  const { settings: { isShadow, mode, showHints, } } = useSelector((state: IStoreState) => state.containerAppReducer);
  const { featureDefinition } = props;  
  const childUrl = props.childUrl || featureDefinition.defaultChildUrl;
  const newProps = {...props, childUrl, featureDefinition, showHints };
  
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
          <MicroFrontendType key={childUrl} className={className} {...newProps} />
        </ReactShadow.div>
      ) : (
        <div className={`micro-frontend-switch ${className}`}>
          <MicroFrontendType key={childUrl} className={className} {...newProps} />
        </div>
      )
  );
}
