import * as React from 'react';
import { Suspense } from 'react';
// import loadable from '@loadable/component';

// import 'micro-components/dist/main.css'

interface ILazyImportComponentProps {
}

// TODO: figure out how to export react components from a project
// Maybe try '@loadable/component' package again
export const LazyImportComponent = (props: ILazyImportComponentProps) => {
  const OtherComponent = React.lazy(() => import('micro-components'));
  require('micro-components/dist/main.css');
 
  // const lazyUrl = '/micro-components/dist/index.js';
  // const OtherComponent = loadable(() => import(lazyUrl));
  
  return (
    <div className="lazy-import">
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent {...props} />
      </Suspense>
    </div>
  );
}
