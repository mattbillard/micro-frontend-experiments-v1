export const microAppFeatureDefinition = {
  id: 'microAppFeatureId',
  text: 'Micro App',
  defaultChildUrl: '/micro-url',
 
  // iframe-component and inject-whole-app-component
  initApp: 'microAppInit', // TODO: should I go back to an object like window.microApp.init?
 
  // lazy-import-component and remote-component // TODO: URLSs should be array 
  lazyImport: () => import('micro-project'),
  urlComponentCss: '/micro-components/index.css',
  urlComponentJs: '/micro-components/index.js',
};

export const craAppFeatureDefinition = {
  id: 'craAppFeatureId',
  text: 'Create React App',
  defaultChildUrl: '/cra-url',
  initApp: 'craAppInit',
  lazyImport: () => import('cra-project'),
  urlComponentCss: '/cra-components/index.css',
  urlComponentJs: '/cra-components/index.js',
};

export const featureDefinitions = {
  'craAppFeatureId': craAppFeatureDefinition,
  'microAppFeatureId': microAppFeatureDefinition,
};

export const appNav = [
  // {
  //   text: 'Micro App',
  //   parentUrl: '/container-url/micro-url',
  //   childUrl: '/micro-url',
  //   featureId: 'microAppFeatureId',
  //   featureDefinition: microAppFeatureDefinition
  // },
  {
    text: 'Text',
    parentUrl: '/container-url/micro-url/golden-text',
    childUrl: '/micro-url/golden-text',
    featureId: 'microAppFeatureId',
    featureDefinition: microAppFeatureDefinition
  },
  {
    text: 'Spiral',
    parentUrl: '/container-url/micro-url/golden-spiral',
    childUrl: '/micro-url/golden-spiral',
    featureId: 'microAppFeatureId',
    featureDefinition: microAppFeatureDefinition
  },
  {
    text: 'StockGrid',
    parentUrl: '/container-url/micro-url/stock-grid',
    childUrl: '/micro-url/stock-grid',
    featureId: 'microAppFeatureId',
    featureDefinition: microAppFeatureDefinition
  },
  {
    text: 'ColumnChart',
    parentUrl: '/container-url/micro-url/column-chart',
    childUrl: '/micro-url/column-chart',
    featureId: 'microAppFeatureId',
    featureDefinition: microAppFeatureDefinition
  },
  {
    text: 'PieChart',
    parentUrl: '/container-url/micro-url/pie-chart',
    childUrl: '/micro-url/pie-chart',
    featureId: 'microAppFeatureId',
    featureDefinition: microAppFeatureDefinition
  },
  {
    text: 'StockChart',
    parentUrl: '/container-url/micro-url/stock-chart',
    childUrl: '/micro-url/stock-chart',
    featureId: 'microAppFeatureId',
    featureDefinition: microAppFeatureDefinition
  },
  {
    text: 'Create React App',
    parentUrl: '/container-url/cra-url',
    childUrl: '/cra-url',
    featureId: 'craAppFeatureId',
    featureDefinition: craAppFeatureDefinition
  },
];
