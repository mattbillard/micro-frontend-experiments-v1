import * as React from 'react';
import { Suspense } from 'react';

interface ILazyImportComponentProps {
}

// TODO: figure out how to export react components from a project
// Maybe try '@loadable/component' package again
export const LazyImportComponent = (props: ILazyImportComponentProps) => {
  // const OtherComponent = React.lazy(() => import('./micro-components'));
  
  return (
    <div className="lazy-import">
      <Suspense fallback={<div>Loading...</div>}>
        {/* <OtherComponent {...props} /> */}
      </Suspense>
    </div>
  );
}
