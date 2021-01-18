
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
              type: 'react-component',
              component: 'MicroFrontEndComponent',
              props: {
                // key: '/micro-app/stock-grid',
                url: '/micro-app/stock-grid',
              },
            },
            {
              type: 'row',
              content: [
                {
                  title: 'Golden',
                  type: 'react-component',
                  component: 'MicroFrontEndComponent',
                  props: {
                    // key: '/micro-app/golden-spiral',
                    url: '/micro-app/golden-spiral',
                  },
                  width: 30,
                },
                {
                  title: 'Layout',
                  type: 'react-component',
                  component: 'MicroFrontEndComponent',
                  props: {
                    // key: '/micro-app/golden-text',
                    url: '/micro-app/golden-text',
                  },
                },
              ]
            },
            {
              type: 'stack',
              content: [
                {
                  title: 'Acme, inc.',
                  type: 'react-component',
                  component: 'MicroFrontEndComponent',
                  props: {
                    // key: '/micro-app/stock-chart',
                    url: '/micro-app/stock-chart',
                  },
                  componentState: {
                    companyName: 'Stock X'
                  },
                },
                {
                  title: 'LexCorp plc.',
                  type: 'react-component',
                  component: 'MicroFrontEndComponent',
                  props: {
                    // key: '/micro-app/stock-chart',
                    url: '/micro-app/stock-chart',
                  },
                  componentState: { companyName: 'Stock Y' },
                },
                {
                  title: 'Springshield plc.',
                  type: 'react-component',
                  component: 'MicroFrontEndComponent',
                  props: {
                    // key: '/micro-app/stock-chart',
                    url: '/micro-app/stock-chart',
                  },
                  componentState: { companyName: 'Stock Z' },
                }
              ]
            }
          ]
        },
        {
          width: 20,
          type: 'column',
          content: [
            {
              title: 'Performance',
              type: 'react-component',
              component: 'MicroFrontEndComponent',
              props: {
                // key: '/micro-app/column-chart',
                url: '/micro-app/column-chart',
              },
            },
            {
              title: 'Market',
              type: 'react-component',
              component: 'MicroFrontEndComponent',
              props: {
                // key: '/micro-app/pie-chart',
                url: '/micro-app/pie-chart',
              },
              height: 40,
            }
          ]
        }
      ]
    }
  ]
};

export const DEFAULT_SETTINGS = {
  isShadow: false,
  mode: 'IMP_MODE',
  showHints: false,
  showSettings: false,
};
