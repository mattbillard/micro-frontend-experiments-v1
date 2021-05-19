declare const window: any;

export const exportRemoteComponent = (component, ReactDOM) => {
  window.remoteComponent = component;
  window.ReactDOM2 = ReactDOM;
};
