export interface IAppDefinition {
  baseUrl: string;
  id: string;
  initApp: string;
  text: string;
  urlComponentCss: string[];
  urlComponentJs: string[];
}

export interface INavDefinition {
  appId: string;
  parentUrl: string;
  text: string;
}

export interface IAppAndNavDefinitions {
  apps: {
    [appId: string]: IAppDefinition;
  };
  nav: INavDefinition[];
}
