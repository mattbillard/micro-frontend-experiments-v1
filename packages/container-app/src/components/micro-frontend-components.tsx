import * as React from 'react';
import { connect, IStoreState, useSelector, Provider } from 'react-redux';
import { store } from '../redux';

import {
  IframeComponent,
  LazyImportComponent,
  WebComponent,
} from '../components';

// export const MicroFrontEndComponent = (props) => {
//   const { mode } = useSelector((state: IStoreState) => state.containerAppReducer.settings);
//   // const mode = 'IMP_MODE';
//   console.log('....props', props);

//   return (
//     <>
//       {/* {mode === 'IFRAME_MODE' && <IframeComponent {...props} />} */}
//       {/* {mode === 'WC_MODE' && <WebComponent {...props} />} */}
//       {/* {mode === 'IMP_MODE' && <LazyImportComponent {...props} />} */}
//       {/* {mode === 'IMP_MODE' && <LazyImportComponent />} */}
//       {mode === 'IMP_MODE' && <LazyImportComponent key={props.url} />}
//     </>
//   );
// };

export class MicroFrontEndComponentView extends React.Component {
  render () {
    const mode = this.props.mode;
    console.log('....props', this.props);
  
    return (
      <>
        {mode === 'IFRAME_MODE' && <IframeComponent {...this.props} />}
        {mode === 'WC_MODE' && <WebComponent {...this.props} />}
        {mode === 'IMP_MODE' && <LazyImportComponent {...this.props} />}
      </>
    );
    }
}

const mapStateToProps = (state: IStoreState, ownProps) => ({
  ...ownProps,
  mode: state.containerAppReducer.settings.mode,
});
const mapDispatchToProps = (dispatch) => ({
  dispatch,
});
export const MicroFrontEndComponent = connect(mapStateToProps,mapDispatchToProps)(MicroFrontEndComponentView);
