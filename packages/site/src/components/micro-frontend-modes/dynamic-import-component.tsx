import React, { Suspense } from 'react';
import { IMicroFrontEndComponent } from '../../types';

/**
 * NOTES
 * Dynamic imports (e.g. import() and React.lazy()) are probably the most common way to stitch together large React apps
 * Their advantage is they speed up load times by allow code splitting meaning the browser only loads parts of the app when necessary
 * Their huge disadvantage is that the parent app must process all the child apps code when it builds itself
 * This means as your project expands and you double the number of micro apps, your build time for the parent doubles
 * Obviously not scaleable
 * RemoteComponents are a much better solution offering the best of everything: both fast load times and fast build times
 */
export const DynamicImportComponent = (props: IMicroFrontEndComponent) => {
  const {
    appDefinition: { id: appId, urlComponentCss },
  } = props;
  const lazyImport = dynamicImports[appId];
  const OtherComponent = React.lazy(lazyImport);

  return (
    <>
      {urlComponentCss.map((cssUrl) => (
        <link rel="stylesheet" key={cssUrl} href={cssUrl} />
      ))}
      {/* NOTE: CSS needs to be here so it doesn't leak outside ShadowDOM. Make sure CSS is loaded by time async JS is loaded  */}
      <Suspense fallback={<div>Loading...</div>}>
        {OtherComponent && <OtherComponent {...props} />}
      </Suspense>
    </>
  );
};

/**
 * NOTES
 * It would make more sense for these to be in the app-and-nav-definitions.json
 * but that file is JSON served from the router and these are JavaScript code.
 */
const dynamicImports = {
  craAppId: () => import('@company/microapp-cra'),
  exampleAppId: () => import('@company/microapp-example'),
};
