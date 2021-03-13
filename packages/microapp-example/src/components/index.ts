import { exportRemoteComponent } from '@company/shared-tools';

export * from './components';
import { ExampleAppRouter } from './components';

// Needed for dynamic import() / React.lazy()
export default ExampleAppRouter;

// Needed for remote components
exportRemoteComponent(ExampleAppRouter);
