import React, { Suspense } from 'react';
import { IMicroFrontEndComponent } from '../../types';

// TODO: add a note why these are here
const lazyImports = {
  microAppId: () => import('@company/micro-team-micro-project'),
  craAppId: () => import('@company/micro-team-cra-project'),
};

export const LazyImportComponent = (props: IMicroFrontEndComponent) => {
  const {
    appDefinition: { id: appId, urlComponentCss },
  } = props;
  const lazyImport = lazyImports[appId];
  const OtherComponent = React.lazy(lazyImport);

  return (
    <>
      <link rel="stylesheet" href={urlComponentCss} />{' '}
      {/* NOTE: CSS needs to be here so it doesn't leak outside ShadowDOM. Make sure CSS is loaded by time async JS is loaded  */}
      <Suspense fallback={<div>Loading...</div>}>
        {OtherComponent && <OtherComponent {...props} />}
      </Suspense>
    </>
  );
};
