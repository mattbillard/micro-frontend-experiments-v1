import * as React from 'react';
import { connect, useDispatch, useSelector, Provider } from 'react-redux';

import {
  IframeComponent,
  LazyImportComponent,
  WebComponent,
} from '../../components';
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
      {mode === 'IFRAME_MODE' && <IframeComponent {...props} />}
      {mode === 'WC_MODE' && <WebComponent key={url} {...props} />}
      {mode === 'IMP_MODE' && <LazyImportComponent key={url} {...props} />}
    </>
  );
}
