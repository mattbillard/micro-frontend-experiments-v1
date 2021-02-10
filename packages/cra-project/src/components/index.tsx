export * from './components';
import { CraApp, exportRemoteComponent } from './components';

import './styles/index.css';

export default CraApp;

exportRemoteComponent(CraApp);
