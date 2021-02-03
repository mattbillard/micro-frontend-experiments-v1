import * as React from 'react';

// import { exportRemoteComponent } from './remote-component';

import '../styles/golden-spiral.css';

export const GoldenSpiral = () => {
  return (
    <div className="fibonacci-spiral"></div>
  );
}

export default GoldenSpiral;

// try {
//   // @ts-ignore
//   RemoteComponent = GoldenSpiral;
// } catch (err) {
// }

// exportRemoteComponent('microComponents', GoldenSpiral);
