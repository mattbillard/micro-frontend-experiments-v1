declare const window: any;

export const exportRemoteComponent = (name: string, component) => {
  window.microComponents = {
    getComponent: () => component
  } 
}
