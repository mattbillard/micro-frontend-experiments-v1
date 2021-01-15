import * as React from 'react';
import { Suspense } from 'react';
// import loadable from '@loadable/component';

// import 'micro-components/dist/main.css'

interface ILazyImportComponentProps {
}

let bool = true;

// TODO: figure out how to export react components from a project
// Maybe try '@loadable/component' package again
export const LazyImportComponent = (props: ILazyImportComponentProps) => {
  const OtherComponent = React.lazy(() => import('micro-components'));
  require('micro-components/dist/main.css');
  
  // const OtherComponent = React.lazy(() => import('micro-components/src'));
  // require('micro-components/src/styles/index.less');


  // const lazyUrl = '/micro-components/dist/index.js';
  // const OtherComponent = loadable(() => import(lazyUrl));

  
  // console.log('....props', props);
  // const OtherComponent = 
  //   bool === true ? require('micro-components/src/components/golden-text').default :
  //   require('micro-components/src/components/text-tester').default;
  // console.log('....OtherComponent', OtherComponent);
  // require('micro-components/src/styles/index.less');
  // bool = !bool;

    
  // console.log('....props', props);
  // const path = props.url.replace('/micro-app/', 'micro-components/src/components/')
  // console.log('....path', path);
  // require(path).default;
  // console.log('....OtherComponent', OtherComponent);
  // require('micro-components/src/styles/index.less');
  // bool = !bool;

    

  


  return (
    <div className="lazy-import">
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent {...props} />
      </Suspense>
    </div>
  );
}
