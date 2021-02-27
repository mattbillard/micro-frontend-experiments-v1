export const CONTAINER_ID = 'layout-container'; // This is the ID into which OpenFin loads GoldenLayout     
window.addEventListener('DOMContentLoaded', async () => {
  // Initialize OpenFin GoldenLayout
  await fin.Platform.Layout.init({containerId: CONTAINER_ID});
  
  const win = fin.me;
  var options = await win.getOptions();
  console.log('This is platform-window', win, options);
  // fin.me.showDeveloperTools();
});
