export interface IAppDefinition {
  defaultChildUrl: string;
  id: string;
  initApp: string;
  // lazyImport: string;
  text: string;
  urlComponentCss: string;
  urlComponentJs: string;
}

export interface INavDefinition {
  appId: string;
  childUrl: string;
  isVisible?: boolean;
  parentUrl: string;
  text: string;
}

export interface IAppAndNavDefinitions {
  apps: {
    [appId: string]: IAppDefinition;
  };
  nav: INavDefinition[];
}
