import { exportRemoteComponent } from '@company/core-team-shared-tools';
export * from './components';
import { CraApp } from './components';

import './styles/index.css';

// Needed for dynamic import() / React.lazy()
export default CraApp;

// Needed for remote components
exportRemoteComponent(CraApp);
