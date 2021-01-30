import * as React from 'react';
import { Suspense, useEffect, useRef, useState } from 'react';

export const LazyImportComponent = (props) => {
  const OtherComponent = React.lazy(() => import('micro-components'));
  require('micro-components/dist/index.css');

  return (
    <div className="lazy-import">
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent {...props} />
      </Suspense>
    </div>
  );
}
