import * as React from 'react';
import { Suspense } from 'react';
import loadable from '@loadable/component';
// const requireFromWeb = require('require-from-web')
// const OtherComponent = require('micro-components'); 

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


  // const url = 'https://unpkg.com/jformat@1.0.4/index.js'
  // requireFromWeb(url).then(format => {
  //   const text = format('Forever {Python}', {Python: 'JavaScript'})
  //   console.log(text) // Forever JavaScript
  // })
  // let OtherComponent;
  // if (!OtherComponent) {
  //   return null;
  // }
    

  // // const url = 'https://unpkg.com/jformat@1.0.4/index.js'
  // const url = 'https://localhost:8080/micro-components/dist/index.js'
  // let OtherComponent = loadable(() => fetch(url).then(res => res.text()));
  // console.log('....OtherComponent', OtherComponent);
  // // let OtherComponent;
  // if (!OtherComponent) {
  //   return null;
  // }



  return (
    <div className="lazy-import">
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent {...props} />
      </Suspense>
    </div>
  );
}
