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





export const IframeComponent = (props: IIframeComponentProps) => {
  const ref = useRef(null);
  const { url } = props;

  useEffect(() => {
    ref.current.props = props;
  }, []);

  return (
    <iframe ref={ref} src={url}></iframe>
  )  
}


// /**
//  * Experiment with sourceDoc. It works but is unnecessarily complicated. Maybe also slower.
//  */
// export const IframeComponent = (props: IIframeComponentProps) => {
//   const ref = useRef(null);
//   const [srcDoc, setSrcDoc] = useState<string>();

//   useEffect(() => {
//     init(ref, props, setSrcDoc);
//   }, []);

//   return (
//     <iframe ref={ref} srcDoc={srcDoc}></iframe>
//   )  
// }

// const init = async (ref, props, setSrcDoc) => {
//   const { url } = props;
//   var res = await fetch(url);
//   var text = await res.text();
//   setSrcDoc(text);
//   ref.current.props = props;
// };






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

