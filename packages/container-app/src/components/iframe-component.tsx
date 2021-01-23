import * as React from 'react';
import { memo, useEffect, useRef, useState } from 'react';
// import { useRef, useState } from 'react';

interface IIframeComponentProps {
  url: string;
}

// TODO: clean up


// export const IframeComponent = (props: IIframeComponentProps) => {
//   // const ref = useRef(null);
//   // const [height, setHeight] = useState<number>();

//   // const setSize = (elem) => {
//   //     setHeight(elem.offsetHeight);
//   //     // setHeight(elem.scrollHeight);    
//   // }

//   // const handleOnload = () => {
//   //   const iframe = ref.current;
//   //   const iframeWindow = iframe.contentWindow;
//   //   const iframeDocument = iframe.contentDocument;
//   //   const iframeHtmlTag = iframeDocument.body.parentNode;

//   //   const resizeObserver = new iframeWindow.ResizeObserver(entries => setSize(entries[0].target));
//   //   resizeObserver.observe(iframeHtmlTag);

//   //   // iframeWindow.addEventListener('resize', console.log);
//   // }

//   return (
//     <iframe 
//       // ref={ref} 
//       src={props.url} 
//       // onLoad={handleOnload}
//       // style={{height:height}}
//     ></iframe>
//   )
// }




// export const IframeComponent = (props: IIframeComponentProps) => {
//   const url = props.glContainer?._config?.componentState?.url || '/micro-app';

//   return (
//     <iframe src={url}></iframe>
//   )  
// }






export const IframeComponent = (props: IIframeComponentProps) => {
  const ref = useRef(null);
  // const [srcDoc, setSrcDoc] = useState<string>();

  useEffect(() => {
    init(ref, props);
  }, []);

  return (
    // <iframe srcDoc={srcDoc}></iframe>
    <iframe ref={ref}></iframe>
  )  
}

const init = async (ref, props) => {
  const url = props.glContainer?._config?.componentState?.url || '/micro-app';

  var res = await fetch(url);
  var text = await res.text();

  var context = document.createElement('div');
  context.innerHTML = text;

  // Recreate script tags or browser will ignore them
  const oldScripts = context.querySelectorAll('script'); // @ts-ignore
  [...oldScripts].forEach(oldScript => { 
    var newScript = document.createElement('script');
    newScript.text = oldScript.text; // @ts-ignore
    Object.values({...oldScript.attributes}).map((attr: any) => {
      newScript.setAttribute(attr.name, attr.value);
    })

    /**
     * TODO: 
     * - Won't work for multiple scripts. Needs to be promise.all
     * - Also need to register/look up which micro app to initialize 
     */
    newScript.onload = () => ref.current.contentWindow.MicroApp.init(context, props);

    const parent = oldScript.parentNode;
    oldScript.remove();
    parent.appendChild(newScript);
  });

  ref.current.contentDocument.body.append(context);
};






// export const IframeComponent = memo((props: IIframeComponentProps) => {
//   return (
//     <iframe src={props.url}></iframe>
//   )  
// })




// export class IframeComponent extends React.PureComponent {
//   render () {
//     return (
//       <iframe src={props.url}></iframe>
//     )  
//   }
// }


// export class IframeComponent extends React.Component {
//   shouldComponentUpdate(prevProps, nextProps) {
//     console.log(prevProps?.url, nextProps?.url);
    
//     if (!nextProps) {
//       return true;
//     }

//     return prevProps.url !== nextProps.url;
//   }

//   render () {
//     return (
//       <iframe src={props.url}></iframe>
//     )  
//   }
// }

