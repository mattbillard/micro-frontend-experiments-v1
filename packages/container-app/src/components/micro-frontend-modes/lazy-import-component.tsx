import * as React from 'react';
import { Suspense, useEffect, useRef, useState } from 'react';
// import loadable from '@loadable/component';

export const LazyImportComponent = (props) => {
  const { featureDefinition: { lazyImport, urlComponentCss } } = props;
  const OtherComponent =  React.lazy(lazyImport);

  return (
    <>
      <link rel="stylesheet" href={urlComponentCss}/> {/* Putting CSS here so it doesn't leak outside ShadowDOM. Make sure CSS is loaded by time async JS is loaded  */}
      <Suspense fallback={<div>Loading...</div>}>
        {OtherComponent && <OtherComponent {...props} />}
      </Suspense>
    </>
  );
}



// export const LazyImportComponent = (props) => {
//   // const { featureDefinition: { initApp, urlApp } } = props;
//   const ref = useRef<any>();
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   useEffect(() => {
//     (async () => {
//       ref.current = React.lazy(() => import('micro-components'));
//       // require('micro-components/index.css'); // This leaks outside of shadowDOM
//       setIsLoading(false);
//     })();
//   }, []);

//   if (isLoading) {
//     return (
//       <div>Loading...</div>
//     );
//   }

//   const OtherComponent = ref.current;

//   return (
//     <>
//       <link rel="stylesheet" href="/micro-components/index.css"/> {/* Putting CSS here so it doesn't leak outside ShadowDOM. Make sure CSS is loaded by time async JS is loaded  */}
//       <Suspense fallback={<div>Loading...</div>}>
//         {OtherComponent && <OtherComponent {...props} />}
//       </Suspense>
//     </>
//   );
// }



// TODO: figure out how React.Lazy takes a module and turns it into a component
// const result = React.lazy(async() => { 
//   const mod = await import('micro-components')
//   debugger;
//   return mod;
// });
// debugger;

// const result = await import('micro-components');
// debugger;
