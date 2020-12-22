import * as React from 'react';
import { useRef, useState } from 'react';

interface IIframeComponentProps {
  url: string;
}

export const IframeComponent = (props: IIframeComponentProps) => {
  const ref = useRef(null);
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();

  const handleOnload = () => {
    const iframe = ref.current;
    const iframeWindow = iframe.contentWindow;
    const iframeDocument = iframe.contentDocument;
    const iframeHtmlTag = iframeDocument.body.parentNode;

    const resizeObserver = new iframeWindow.ResizeObserver(entries => {
      const elem = entries[0].target;
      setWidth(elem.offsetWidth);
      setHeight(elem.offsetHeight);
    });
    resizeObserver.observe(iframeHtmlTag);
  }

  return (
    <iframe 
      ref={ref} 
      src={props.url} 
      onLoad={handleOnload}
      style={{width:width, height:height}}
    ></iframe>
  )
}

