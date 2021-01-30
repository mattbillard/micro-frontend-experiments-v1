import * as React from 'react';
import { connect, useDispatch, useSelector, Provider } from 'react-redux';

import {
  IframeComponent,
  InjectWholeAppComponent,
  LazyImportComponent,
  RemoteComponent,
} from '../../components';
import { MicroFrontendMode, } from '../../constants';
import { IStoreState, store } from '../../redux';

interface IMicroFrontEndComponent {
  url: string;
  setState: (state: any) => void;
  setTitle: (title: string) => void;
}

export const MicroFrontendModeSwitch = (props: IMicroFrontEndComponent) =>{
  const { settings: { mode } } = useSelector((state: IStoreState) => state.containerAppReducer);
  const { url } = props;

  return (
    <>
      {mode === MicroFrontendMode.Iframe && <IframeComponent {...props} />}
      {mode === MicroFrontendMode.InjectWholeApp && <InjectWholeAppComponent key={url} {...props} />}
      {mode === MicroFrontendMode.LazyLoad && <LazyImportComponent key={url} {...props} />}
      {mode === MicroFrontendMode.RemoteComponent && <RemoteComponent key={url} {...props} />}
    </>
  );
}
