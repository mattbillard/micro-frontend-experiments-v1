import { exportRemoteComponent } from '@company/core-team-shared-tools';

export * from './components';
import { MicroAppRouter } from './components';

// Needed for dynamic import() / React.lazy()
export default MicroAppRouter;

// Needed for remote components
exportRemoteComponent(MicroAppRouter);
