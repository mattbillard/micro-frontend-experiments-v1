import * as React from 'react';

import { 
  IframeComponent, 
  LazyImportComponent,
  WebComponent, 
} from '../components';

export class MicroFrontEndComponent extends React.Component {
  render() { 
    const mode = localStorage.mode || 'IFRAME_MODE';  
    
    return (
      <>
        {mode === 'IFRAME_MODE' && <IframeComponent {...this.props} />}
        {mode === 'WC_MODE' && <WebComponent {...this.props} />}
        {mode === 'IMP_MODE' && <LazyImportComponent {...this.props} />}
      </>
    );
  }
};