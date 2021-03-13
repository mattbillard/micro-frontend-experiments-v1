// TODO: some of these seem very useful
export const goldenLayoutsettings = {
  // blockedPopoutsThrowError: false,
  // closePopoutsOnUnload: false,
  // constrainDragToContainer: false,
  // hasHeaders: false,
  // popoutWholeStack: true,
  // reorderEnabled: false,
  // selectionEnabled: true,
  showCloseIcon: false, // Seems confusing to have a close icon for each tab and for the row
  // showMaximiseIcon: false,
  showPopoutIcon: false, // Implemented my b/c it doens't work well with React. Also it doesn't make sense that the icon is located at the top right instead of on the tab that it pops out
};

export const getDefaultNewGoldenLayoutComponent = () => {
  return {
    title: 'New Tab',
    type: 'component',
    componentName: 'ReactWrapperComponent',
    // NOTE: there didn't seem to be a way to customize Golden-Layout's tabs and use their react components.
    // Solution: build my own wrapper around react components
    // type: 'react-component',
    // component: 'GoldenLayoutComponent',
  };
};

export const DEFAULT_MINIMAL_GOLDEN_LAYOUT_CONFIG = {
  content: [
    {
      title: 'Golden',
      type: 'component',
      componentName: 'ReactWrapperComponent',
      componentState: {
        childUrl: '/example-url/spiral',
      },
    },
  ],
};

export const DEFAULT_TWO_COLUMN_GOLDEN_LAYOUT_CONFIG = {
  content: [
    {
      type: 'row',
      content: [
        {
          width: 80,
          type: 'column',
          content: [
            {
              type: 'row',
              content: [
                {
                  title: 'Golden',
                  type: 'component',
                  componentName: 'ReactWrapperComponent',
                  componentState: {
                    childUrl: '/example-url/title-text',
                  },
                },
                {
                  title: 'Layout',
                  type: 'component',
                  componentName: 'ReactWrapperComponent',
                  componentState: {
                    childUrl: '/example-url/spiral',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const DEFAULT_GOLDEN_LAYOUT_CONFIG = {
  content: [
    {
      type: 'row',
      content: [
        {
          width: 80,
          type: 'column',
          content: [
            {
              title: 'Fnts 100',
              type: 'component',
              componentName: 'ReactWrapperComponent',
              componentState: {
                childUrl: '/example-url/stock-grid',
              },
            },
            {
              type: 'row',
              content: [
                {
                  title: 'Golden',
                  type: 'component',
                  componentName: 'ReactWrapperComponent',
                  componentState: {
                    childUrl: '/example-url/spiral',
                  },
                  width: 30,
                },
                {
                  title: 'Layout',
                  type: 'component',
                  componentName: 'ReactWrapperComponent',
                  componentState: {
                    childUrl: '/example-url/title-text',
                  },
                },
              ],
            },
            {
              type: 'stack',
              content: [
                {
                  title: 'Acme, inc.',
                  type: 'component',
                  componentName: 'ReactWrapperComponent',
                  componentState: {
                    childUrl: '/example-url/stock-chart',
                  },
                  componentcomponentState: {
                    companyName: 'Stock X',
                  },
                },
                {
                  title: 'LexCorp plc.',
                  type: 'component',
                  componentName: 'ReactWrapperComponent',
                  componentState: {
                    childUrl: '/example-url/stock-chart',
                  },
                  componentcomponentState: { companyName: 'Stock Y' },
                },
                {
                  title: 'Springshield plc.',
                  type: 'component',
                  componentName: 'ReactWrapperComponent',
                  componentState: {
                    childUrl: '/example-url/stock-chart',
                  },
                  componentcomponentState: { companyName: 'Stock Z' },
                },
              ],
            },
          ],
        },
        {
          width: 20,
          type: 'column',
          content: [
            {
              title: 'Performance',
              type: 'component',
              componentName: 'ReactWrapperComponent',
              componentState: {
                childUrl: '/example-url/column-chart',
              },
            },
            {
              title: 'Market',
              type: 'component',
              componentName: 'ReactWrapperComponent',
              componentState: {
                childUrl: '/example-url/pie-chart',
              },
              height: 40,
            },
          ],
        },
      ],
    },
  ],
};
