import React, { useEffect, useRef } from 'react';
import { IMicroFrontEndComponent } from '../../types';

/**
 * NOTES:
 * Other experiments
 * - Parent watches iframe content and resizes iframe tag's height to fit
 * - Child app watches parent for prop changes. (Current way of parent telling child app to rerender is better.)
 *
 * Iframe srcDoc attribute is interesting but didn't find a use for it
 */
export const IframeComponent = (props: IMicroFrontEndComponent) => {
  const ref = useRef<HTMLIFrameElement>(null);
  const {
    appDefinition: { initApp },
    childUrl,
  } = props;

  useEffect(() => {
    renderChild();
  }, [props]);

  const renderChild = () => {
    const iframe = ref.current!;
    const contentDocument = iframe.contentDocument;
    const contentWindow = iframe.contentWindow;
    if (contentWindow && contentWindow[initApp]) {
      contentWindow[initApp](contentDocument, props);
    }
  };

  return (
    <iframe
      ref={ref}
      src={childUrl}
      className="iframe-component"
      onLoad={renderChild}
    ></iframe>
  );
};
