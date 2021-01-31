import * as React from 'react';
import { Suspense, useEffect, useRef, useState } from 'react';

export const LazyImportComponent = (props) => {
  const OtherComponent = React.lazy(() => import('micro-components'));
  // require('micro-components/index.css'); // This leaks outside of shadowDOM

  return (
    <>
      <link rel="stylesheet" href="/micro-components/index.css"/> {/* Make sure CSS is loaded by time async JS is loaded  */}
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent {...props} />
      </Suspense>
    </>
  );
}
