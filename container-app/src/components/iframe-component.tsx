import * as React from 'react';
import { useRef, useState } from 'react';

interface IIframeComponentProps {
  url: string;
}

export const IframeComponent = (props: IIframeComponentProps) => {
  const ref = useRef(null);
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();

  const setSize = (elem) => {
      setWidth(elem.offsetWidth);
      setHeight(elem.offsetHeight);
      // setWidth(elem.scrollWidth);
      // setHeight(elem.scrollHeight);    
  }

  const handleOnload = () => {
    const iframe = ref.current;
    const iframeWindow = iframe.contentWindow;
    const iframeDocument = iframe.contentDocument;
    const iframeHtmlTag = iframeDocument.body.parentNode;
    // const iframeHtmlTag = iframeDocument.body;

    const resizeObserver = new iframeWindow.ResizeObserver(entries => setSize(entries[0].target));
    resizeObserver.observe(iframeHtmlTag);

    // iframeWindow.addEventListener('resize', console.log);
  }

  return (
    <iframe 
      ref={ref} 
      src={props.url} 
      onLoad={handleOnload}
      // style={{width:width, height:height}}
      style={{height:height}}
    ></iframe>
  )
}

