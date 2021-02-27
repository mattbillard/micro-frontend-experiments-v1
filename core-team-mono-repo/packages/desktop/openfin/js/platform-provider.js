(async () => {
  await fin.Platform.init();
  window.fin.me.showDeveloperTools();
  console.log('This is provider.html');

  const platform = await fin.Platform.getCurrent();
  const win = await platform.createWindow({
    accelerator: { // Allow common Chromium key commands. (Very poorly named)
      devtools: true,
      reload: true,
      reloadIgnoringCache: true,
      zoom: true,
    },
    defaultCentered: true,
    url: 'http://localhost:5555/openfin/platform-window.html',
    layout: {
      settings: {
        hasHeaders: false, // Hide GoldenLayout tabs
      },
      content: [{
        type: 'stack',
        content: [{
          type: 'component',
          componentName: 'view',
          componentState: {
            name: 'my-new-test-view',
            url: 'http://localhost:8080'
          }
        }]
      }]
    }
  });
})()
