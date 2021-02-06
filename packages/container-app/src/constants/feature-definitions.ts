export const microAppFeatureDefinition = {
  id: 'microAppFeatureId',
  text: 'Micro App',
  defaultChildUrl: '/micro-app',
 
  // iframe-component and inject-whole-app-component
  initApp: 'microAppInit', // TODO: should I go back to an object like window.microApp.init?
 
  // lazy-import-component and remote-component // TODO: URLSs should be array 
  lazyImport: () => import('micro-components'),
  urlComponentCss: '/micro-components/index.css',
  urlComponentJs: '/micro-components/index.js',
};

export const featureDefinitions = {
  'microAppFeatureId': microAppFeatureDefinition,
};

export const appNav = [
  // {
  //   text: 'Micro App',
  //   parentUrl: '/container/page/micro-project',
  //   childUrl: '/micro-app',
  //   featureId: 'microAppFeatureId',
  //   featureDefinition: microAppFeatureDefinition
  // },
  {
    text: 'Text',
    parentUrl: '/container/page/micro-project/golden-text',
    childUrl: '/micro-app/golden-text',
    featureId: 'microAppFeatureId',
    featureDefinition: microAppFeatureDefinition
  },
  {
    text: 'Spiral',
    parentUrl: '/container/page/micro-project/golden-spiral',
    childUrl: '/micro-app/golden-spiral',
    featureId: 'microAppFeatureId',
    featureDefinition: microAppFeatureDefinition
  },
  {
    text: 'StockGrid',
    parentUrl: '/container/page/micro-project/stock-grid',
    childUrl: '/micro-app/stock-grid',
    featureId: 'microAppFeatureId',
    featureDefinition: microAppFeatureDefinition
  },
  {
    text: 'ColumnChart',
    parentUrl: '/container/page/micro-project/column-chart',
    childUrl: '/micro-app/column-chart',
    featureId: 'microAppFeatureId',
    featureDefinition: microAppFeatureDefinition
  },
  {
    text: 'PieChart',
    parentUrl: '/container/page/micro-project/pie-chart',
    childUrl: '/micro-app/pie-chart',
    featureId: 'microAppFeatureId',
    featureDefinition: microAppFeatureDefinition
  },
  {
    text: 'StockChart',
    parentUrl: '/container/page/micro-project/stock-chart',
    childUrl: '/micro-app/stock-chart',
    featureId: 'microAppFeatureId',
    featureDefinition: microAppFeatureDefinition
  },
];
