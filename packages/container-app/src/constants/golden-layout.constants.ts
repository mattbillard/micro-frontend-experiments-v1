
export const DEFAULT_MINIMAL_GOLDEN_LAYOUT_CONFIG = {
  // TODO: keep? Explore more?
  settings: {
    selectionEnabled: true
  },
  content: [
    {
      title: 'Golden',
      type: 'react-component',
      component: 'GoldenLayoutComponent',
      componentState: {
        featureId: 'microAppFeatureId',
        childUrl: '/micro-app/golden-spiral',
      },
    }
  ]
};

export const DEFAULT_GOLDEN_LAYOUT_CONFIG = {
  // TODO: keep? Explore more?
  settings: {
    selectionEnabled: true
  },
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
              component: 'GoldenLayoutComponent',
              componentState: {
                featureId: 'microAppFeatureId',
                childUrl: '/micro-app/stock-grid',
              },
            },
            {
              type: 'row',
              content: [
                {
                  title: 'Golden',
                  type: 'react-component',
                  component: 'GoldenLayoutComponent',
                  componentState: {
                    featureId: 'microAppFeatureId',
                    childUrl: '/micro-app/golden-spiral',
                  },
                  width: 30,
                },
                {
                  title: 'Layout',
                  type: 'react-component',
                  component: 'GoldenLayoutComponent',
                  componentState: {
                    featureId: 'microAppFeatureId',
                    childUrl: '/micro-app/golden-text',
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
                  component: 'GoldenLayoutComponent',
                  componentState: {
                    featureId: 'microAppFeatureId',
                    childUrl: '/micro-app/stock-chart',
                  },
                  componentcomponentState: {
                    companyName: 'Stock X'
                  },
                },
                {
                  title: 'LexCorp plc.',
                  type: 'react-component',
                  component: 'GoldenLayoutComponent',
                  componentState: {
                    featureId: 'microAppFeatureId',
                    childUrl: '/micro-app/stock-chart',
                  },
                  componentcomponentState: { companyName: 'Stock Y' },
                },
                {
                  title: 'Springshield plc.',
                  type: 'react-component',
                  component: 'GoldenLayoutComponent',
                  componentState: {
                    featureId: 'microAppFeatureId',
                    childUrl: '/micro-app/stock-chart',
                  },
                  componentcomponentState: { companyName: 'Stock Z' },
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
              component: 'GoldenLayoutComponent',
              componentState: {
                featureId: 'microAppFeatureId',
                childUrl: '/micro-app/column-chart',
              },
            },
            {
              title: 'Market',
              type: 'react-component',
              component: 'GoldenLayoutComponent',
              componentState: {
                featureId: 'microAppFeatureId',
                childUrl: '/micro-app/pie-chart',
              },
              height: 40,
            }
          ]
        }
      ]
    }
  ]
};