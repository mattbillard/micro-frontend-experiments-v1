import ReactDOM from 'react-dom';
import { exportRemoteComponent } from '@company/shared-tools';
export * from './components';
import { CraApp } from './components';

import './styles/index.css';

// Needed for dynamic import() / React.lazy()
export default CraApp;

// Needed for remote components
exportRemoteComponent(CraApp, ReactDOM);

