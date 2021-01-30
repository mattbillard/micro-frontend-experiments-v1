export * from './components';
import { MicroAppRouter } from './components';

export default MicroAppRouter;

try {
  // @ts-ignore
  RemoteComponent = MicroAppRouter;
} catch (err) {
}
