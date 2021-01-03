import * as React from 'react';
// import { useRef, useState } from 'react';

interface IIframeComponentProps {
  url: string;
}

// TODO: clean up
export const IframeComponent = (props: IIframeComponentProps) => {
  // const ref = useRef(null);
  // const [height, setHeight] = useState<number>();

  // const setSize = (elem) => {
  //     setHeight(elem.offsetHeight);
  //     // setHeight(elem.scrollHeight);    
  // }

  // const handleOnload = () => {
  //   const iframe = ref.current;
  //   const iframeWindow = iframe.contentWindow;
  //   const iframeDocument = iframe.contentDocument;
  //   const iframeHtmlTag = iframeDocument.body.parentNode;

  //   const resizeObserver = new iframeWindow.ResizeObserver(entries => setSize(entries[0].target));
  //   resizeObserver.observe(iframeHtmlTag);

  //   // iframeWindow.addEventListener('resize', console.log);
  // }

  return (
    <iframe 
      // ref={ref} 
      src={props.url} 
      // onLoad={handleOnload}
      // style={{height:height}}
      style={{width:'100%',height:'100%'}} // TODO
    ></iframe>
  )
}

