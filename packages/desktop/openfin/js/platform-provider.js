(async () => {
  await fin.Platform.init();
  // window.fin.me.showDeveloperTools();
  console.log('This is platform-provider.js');

  const platform = await fin.Platform.getCurrent();
  const win = await platform.createWindow({
    // Allow common Chromium key commands. (Very poorly named)
    accelerator: {
      devtools: true,
      reload: true,
      reloadIgnoringCache: true,
      zoom: true,
    },
    defaultCentered: true,
    defaultWidth: 800,
    defaultHeight: 600,
    url: 'http://localhost:8080/openfin/platform-window.html',
    layout: {
      settings: {
        hasHeaders: true, // Hide GoldenLayout tabs
      },
      content: [
        {
          type: 'stack',
          content: [
            {
              type: 'component',
              componentName: 'view',
              componentState: {
                name: 'my-new-test-view1',
                url: 'http://localhost:8080',
              },
            },
            {
              type: 'component',
              componentName: 'view',
              componentState: {
                name: 'my-new-test-view2',
                url: 'http://localhost:8080/site-url/example-url',
              },
            },
            {
              type: 'component',
              componentName: 'view',
              componentState: {
                name: 'my-new-test-view3',
                url: 'http://localhost:8080/site-url/cra-url',
              },
            },
          ],
        },
      ],
    },
  });
})();
