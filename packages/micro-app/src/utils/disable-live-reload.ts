// CODE FROM: https://blog.iansinnott.com/how-to-disable-live-reload-in-create-react-app/
// Disable live reload because it crashes proxy
export const forceDisableLiveReload = () => {
  const WS = window.WebSocket;
  function DevWebSocket (s: any) { 
    return s.includes("sockjs-node") ? {} : new WS(s);
  };
  // @ts-ignore
  window.WebSocket = DevWebSocket;
}
