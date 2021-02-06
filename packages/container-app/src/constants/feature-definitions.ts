export const microFeatureDefinition = {
  id: 'microFeature',
 
  // iframe-component and inject-whole-app-component
  initApp: 'microAppInit', // TODO: should I go back to an object like window.microApp.init?
 
  // lazy-import-component and remote-component // TODO: URLSs should be array 
  lazyImport: () => import('micro-components'),
  urlComponentCss: '/micro-components/index.css',
  urlComponentJs: '/micro-components/index.js',
};

export const featureDefinitions = {
  microFeature: microFeatureDefinition,
};

export const appNav = [
  {
    text: 'Micro App',
    url: '/container/page/micro-app',
    featureId: 'microFeature',
    featureDefinition: microFeatureDefinition
  },
  {
    text: 'Text',
    url: '/container/page/micro-app/golden-text',
    featureId: 'microFeature',
    featureDefinition: microFeatureDefinition
  },
  {
    text: 'Spiral',
    url: '/container/page/micro-app/golden-spiral',
    featureId: 'microFeature',
    featureDefinition: microFeatureDefinition
  },
  {
    text: 'StockGrid',
    url: '/container/page/micro-app/stock-grid',
    featureId: 'microFeature',
    featureDefinition: microFeatureDefinition
  },
  {
    text: 'ColumnChart',
    url: '/container/page/micro-app/column-chart',
    featureId: 'microFeature',
    featureDefinition: microFeatureDefinition
  },
  {
    text: 'PieChart',
    url: '/container/page/micro-app/pie-chart',
    featureId: 'microFeature',
    featureDefinition: microFeatureDefinition
  },
  {
    text: 'StockChart',
    url: '/container/page/micro-app/stock-chart',
    featureId: 'microFeature',
    featureDefinition: microFeatureDefinition
  },
];
