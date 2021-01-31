import * as React from 'react';
import { Suspense, useEffect, useRef, useState } from 'react';
// import loadable from '@loadable/component';
// const requireFromWeb = require('require-from-web')
// const OtherComponent = require('micro-components'); 
// import { RemoteComponent } from '@paciolan/remote-component';
// import { createLoadRemoteModule } from "@paciolan/remote-module-loader"

// declare const window: any;

export const RemoteComponent = (props) => {
  const url = props.url.replace('/micro-app', '') || '/index';
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef<any>();

  useEffect(() => {
    (async () => {
      const res = await fetch(`/micro-components${url}.js`)
      const text = await res.text();

      let RemoteComponent;
      eval(text);
      ref.current = RemoteComponent;

      setIsLoading(false);
    })()
  }, []);

  if (isLoading) {
    return (
      <>
        <div>Loading...</div>
        <link href={`/micro-components${url}.css`} rel="stylesheet" /> {/* Make sure CSS is loaded by time async JS is loaded  */}
      </>
    )
  }

  const LoadedComponent = ref.current!;

  return (
    <>
      {<LoadedComponent {...props} />}
      <link href={`/micro-components${url}.css`} rel="stylesheet" />
    </>
  )
}


// const OtherComponent = React.lazy(() => import('micro-components'));
// require('micro-components/dist/main.css');

// const OtherComponent = React.lazy(async () => {
//   debugger;
//   const result = await import('micro-components/src');
//   debugger;
//   return result;
// });
// require('micro-components/src/styles/index.less');

// export const RemoteComponent = (props) => {

//   return (
//     <div className="lazy-import">
//       <Suspense fallback={<div>Loading...</div>}>
//         <OtherComponent {...props} />
//       </Suspense>
//     </div>
//   );
// }



// /**
//  * Error: Cannot find module 'http'
//  */
// export const RemoteComponent = (props) => {
//   const url = "https://raw.githubusercontent.com/Paciolan/remote-component/master/examples/remote-components/HelloWorld.js";
//   const HelloWorld = ({ name }) => <RemoteComponent url={url} name={name} />;
//   return (
//     <div className="lazy-import">
//       <HelloWorld name="Remote" />
//     </div>
//   );
// }


// // /**
// //  * Error: Cannot find module 'http'
// //  */
// const main = async() => {
//   const loadRemoteModule = createLoadRemoteModule()
//   const myModule = await loadRemoteModule("https://raw.githubusercontent.com/Paciolan/remote-component/master/examples/remote-components/HelloWorld.js")
//   const value = myModule.default()
//   console.log({ value })
// }
// main()
// export const RemoteComponent = (props) => {
//   return (
//     <div className="lazy-import">
//       test
//     </div>
//   );
// }




// /**
//  * WORKS but not better than React.Lazy 
//  * From: https://loadable-components.com/docs/loadable-vs-react-lazy/
//  */
// export const RemoteComponent = (props) => {
//   const AsyncPage = loadable(props => import(`micro-components`))
//   return (
//     <div className="lazy-import">
//       <AsyncPage {...props} />
//     </div>
//   );
// }


// /**
//  * None of this worked but top one complained the least
//  */
// fetch('/micro-components/dist/index.js').then(res => res.text()).then(text => eval(text));
// // const LoadedModule = loadable(() => fetch('/micro-components/dist/index.js').then(res => res.text()));
// // const LoadedModule = loadable(() => fetch('/micro-components/src/components/golden-text.tsx').then(res => res.text()));
// // const LoadedModule = loadable(() => fetch('/micro-components/src/components/car.js').then(res => res.text()));
// export const RemoteComponent = (props) => {
//   return (
//     <div className="lazy-import">
//       {/* <LoadedModule {...props} /> */}
//       hi
//     </div>
//   );
// }



// /**
//  * Works but not useful 
//  * From: https://reactjs.org/docs/jsx-in-depth.html
//  */
// export const RemoteComponent = (props) => {
//   // return React.createElement('div', {}, 'test');

//   return (
//     <div>
//       test 
//       {React.createElement('div', {}, 'test')}
//     </div>
//   )
// }



// /**
//  * WORKS but not very useful 
//  */
// let SimpleComponent;
// (async() => {
//   // const res = await fetch('/01-react-remote-component-demo/build/simpleComponent2.js')
//   // const text = await res.text();
//   // const text = `window.SimpleComponent = React.createElement('div', {className: 'sidebar'}, 'This is SimpleComponent')`;
//   const text = `SimpleComponent = React.createElement('div', {className: 'sidebar'}, 'This is SimpleComponent')`;
//   console.log('....text', text);
//   eval(text);
// })()

// export const RemoteComponent = (props) => {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     setTimeout(() => { 
//       console.log('....setIsLoading')
//       setIsLoading(false);
//     }, 1000);
//   }, []);

//   if (isLoading) {
//     return <div>Loading...</div>
//   }

//   return (
//     <div>
//       {/* @ts-ignore */}
//       {SimpleComponent}
//     </div>
//   )
// }



// /**
//  * DID NOT WORK
//  * Trying to get this working: https://stackoverflow.com/questions/33225951/evaling-code-with-jsx-syntax-in-it
//  */
// export const RemoteComponent = (props) => {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     setTimeout(() => { 
//       console.log('....setIsLoading')

//       const jsCode = window.Babel.transform(`window.SimpleComponent = () => (<div>Now with Babel</div>)`);
//       console.log('....jsCode', jsCode);
//       eval(jsCode.code);
//       // debugger;    

//       setIsLoading(false);
//     }, 1000);
//   }, []);

//   if (isLoading) {
//     return <div>Loading...</div>
//   }

//   return (
//     <div>
//       {/* @ts-ignore */}
//       {SimpleComponent}
//     </div>
//   )
// }




// /**
//  * Didn't work
//  */
// // const Other = loadable(() => import('micro-components'));
// // const Other = loadable(() => fetch('/micro-components/dist/index.js').then(res => res.text()))
// const Other = loadable(() => fetch('/micro-components/src/components/car3.js').then(res => res.text()))

// export const RemoteComponent = (props) => {
//  const [isLoading, setIsLoading] = useState(true);

//  useEffect(() => {
//    setTimeout(() => { 
//      console.log('....setIsLoading')
//      setIsLoading(false);
//    }, 1000);
//  }, []);

//  if (isLoading) {
//    return <div>Loading...</div>
//  }

//  return (
//    <div>
//      {/* @ts-ignore */}
//      {<Other />}
//    </div>
//  )
// }











// let bool = true;

// // TODO: figure out how to export react components from a project
// // Maybe try '@loadable/component' package again
// export const RemoteComponent = (props: IRemoteComponentProps) => {
//   // const OtherComponent = React.lazy(() => import('micro-components'));
//   // require('micro-components/dist/main.css');
  
//   const OtherComponent = React.lazy(() => import('micro-components/src'));
//   require('micro-components/src/styles/index.less');


//   // const lazyUrl = '/micro-components/dist/index.js';
//   // const OtherComponent = loadable(() => import(lazyUrl));

  
//   // console.log('....props', props);
//   // const OtherComponent = 
//   //   bool === true ? require('micro-components/src/components/golden-text').default :
//   //   require('micro-components/src/components/text-tester').default;
//   // console.log('....OtherComponent', OtherComponent);
//   // require('micro-components/src/styles/index.less');
//   // bool = !bool;

    
//   // console.log('....props', props);
//   // const path = props.url.replace('/micro-app/', 'micro-components/src/components/')
//   // console.log('....path', path);
//   // require(path).default;
//   // console.log('....OtherComponent', OtherComponent);
//   // require('micro-components/src/styles/index.less');
//   // bool = !bool;


//   // const url = 'https://unpkg.com/jformat@1.0.4/index.js'
//   // requireFromWeb(url).then(format => {
//   //   const text = format('Forever {Python}', {Python: 'JavaScript'})
//   //   console.log(text) // Forever JavaScript
//   // })
//   // let OtherComponent;
//   // if (!OtherComponent) {
//   //   return null;
//   // }
    

//   // // const url = 'https://unpkg.com/jformat@1.0.4/index.js'
//   // const url = 'https://localhost:8080/micro-components/dist/index.js'
//   // let OtherComponent = loadable(() => fetch(url).then(res => res.text()));
//   // console.log('....OtherComponent', OtherComponent);
//   // // let OtherComponent;
//   // if (!OtherComponent) {
//   //   return null;
//   // }



//   return (
//     <div className="lazy-import">
//       <Suspense fallback={<div>Loading...</div>}>
//         <OtherComponent {...props} />
//       </Suspense>
//     </div>
//   );
// }
