export interface IAppDefinition {
  baseUrl: string;
  id: string;
  initApp: string;
  appName: string;
  urlComponentCss: string[];
  urlComponentJs: string[];
}

export interface INavDefinition {
  appId: string;
  parentUrl: string;
  navItemText: string;
}

export interface IAppAndNavDefinitions {
  apps: {
    [appId: string]: IAppDefinition;
  };
  nav: INavDefinition[];
}
