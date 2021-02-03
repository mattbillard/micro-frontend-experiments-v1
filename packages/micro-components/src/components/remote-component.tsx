declare const window: any;

export const exportRemoteComponent = (name: string, component) => {
  window.remoteComponent = component;
}
