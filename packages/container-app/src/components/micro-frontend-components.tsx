import * as React from 'react';
import { connect, useSelector, Provider } from 'react-redux';

import {
  IframeComponent,
  LazyImportComponent,
  WebComponent,
} from '../components';
import { IStoreState, store } from '../redux';

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

// GoldenLayout only works with class components
export class MicroFrontEndComponentView extends React.Component {
  render () {
    const url = this.props.url || this.props.glContainer._config.componentState?.url || '/micro-app';
    const setTitle = this.props.setTitle || ((title) => this.props.glContainer.setTitle(title));
    const setState = this.props.setState || ((state) => this.props.glContainer.setState(state));
    const newProps = { ...this.props, setTitle, setState, url };

    // @ts-ignore
    const { mode } = this.props;
  
    return (
      <>
        {/* @ts-ignore */}
        {mode === 'IFRAME_MODE' && <IframeComponent {...newProps} />}
        {/* @ts-ignore */}
        {mode === 'WC_MODE' && <WebComponent key={url} {...newProps} />}
        {mode === 'IMP_MODE' && <LazyImportComponent {...newProps} />}
      </>
    );
    }
}

const mapStateToProps = (state: IStoreState, ownProps) => ({
  ...ownProps,
  mode: state.containerAppReducer.settings.mode,
  showHints: state.containerAppReducer.settings.showHints,
});
const mapDispatchToProps = (dispatch) => ({
  dispatch,
});
export const MicroFrontEndComponent = connect(mapStateToProps, mapDispatchToProps)(MicroFrontEndComponentView);
