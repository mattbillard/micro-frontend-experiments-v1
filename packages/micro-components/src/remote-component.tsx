export * from './components';
import { MicroAppRouter } from './components';

declare const window: any;
const exportRemoteComponent = (name: string, component) => {
  window.microComponents = {
    getComponent: () => component
  } 
}

exportRemoteComponent('microComponents', MicroAppRouter);
