import { IAppAndNavDefinitions, IAppDefinition } from '../types';

let _appAndNavDefinitions: IAppAndNavDefinitions;

export const init = (appAndNavDefinitions: IAppAndNavDefinitions) => {
  _appAndNavDefinitions = appAndNavDefinitions;
};

export const getAppDefinitionFromUrl = (url: string) => {
  return Object.values(
    _appAndNavDefinitions.apps,
  ).find((appDefinition: IAppDefinition) =>
    url.includes(appDefinition.baseUrl),
  );
};

export const getNavItemFromUrl = (url: string) => {
  return _appAndNavDefinitions.nav.find((navItem) =>
    navItem.parentUrl.includes(url),
  );
};
