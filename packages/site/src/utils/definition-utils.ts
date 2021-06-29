import { IAppAndNavDefinitions, IAppDefinition } from '../types';

let _appAndNavDefinitions: IAppAndNavDefinitions;

export const init = (appAndNavDefinitions: IAppAndNavDefinitions) => {
  _appAndNavDefinitions = appAndNavDefinitions;
};

export const getAppDefinitionFromUrl = (childUrl: string) => {
  return Object.values(_appAndNavDefinitions.apps).find((appDefinition: IAppDefinition) =>
    childUrl.startsWith(appDefinition.baseUrl),
  );
};

export const getNavItemFromUrl = (url: string) => {
  return _appAndNavDefinitions.nav.find((navItem) => navItem.parentUrl.includes(url));
};
