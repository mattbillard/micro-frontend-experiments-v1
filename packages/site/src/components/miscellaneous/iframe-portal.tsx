import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export interface IIframePortalProps {
  children: React.ReactNode;
  className?: string;
  matchHeight?: boolean;
}

/**
 * An experiment
 * Wraps children in an iframe that grows to height of children
 * An easy way to sandbox stuff
 *
 * Caution: doesn't work well with remoteComponent and injectAppComponent
 */
export const IframePortal = (props: IIframePortalProps) => {
  const ref = useRef<HTMLIFrameElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [height, setHeight] = useState<number>();

  const handleOnload = () => {
    if (props.matchHeight) {
      const iframe = ref.current!;
      const iframeWindow = iframe.contentWindow;
      const iframeDocument = iframe.contentDocument!;
      const iframeHtmlDoc = iframeDocument.body.parentNode;

      // @ts-ignore
      const resizeObserver = new iframeWindow.ResizeObserver((entries) =>
        setSize(entries[0].target),
      );
      resizeObserver.observe(iframeHtmlDoc);
    }

    setIsLoaded(true);
  };

  const setSize = (elem: HTMLElement) => {
    setHeight(elem.offsetHeight);
    // setHeight(elem.scrollHeight);
  };

  return (
    <>
      <iframe
        ref={ref}
        srcDoc="" // This is necessary to trigger onLoad
        onLoad={handleOnload}
        className={`iframe-portal ${props.className || ''}`}
        style={{ height: height }}
      />
      {isLoaded && createPortal(props.children, ref.current!.contentDocument!.body)}
    </>
  );
};
