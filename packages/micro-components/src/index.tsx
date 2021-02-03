export * from './components';
import { MicroAppRouter, exportRemoteComponent } from './components';

export default MicroAppRouter;

// try {
//   // @ts-ignore
//   RemoteComponent = MicroAppRouter;
// } catch (err) {
// }

exportRemoteComponent('microComponents', MicroAppRouter);
