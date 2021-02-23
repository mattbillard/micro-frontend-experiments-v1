
let _appAndNavDefinitions;
export const init = (appAndNavDefinitions) => {
  _appAndNavDefinitions = appAndNavDefinitions;
}

export const getNavItemFromUrl = (parentUrl) => {
  return _appAndNavDefinitions.nav.find(navItem => navItem.parentUrl.includes(parentUrl));
}

export const getFileDefinitionFromUrl = (parentUrl) => {
  const navItem = getNavItemFromUrl(parentUrl);
  const featureDefinition = _appAndNavDefinitions.apps[navItem!.appId];
  return featureDefinition;
}