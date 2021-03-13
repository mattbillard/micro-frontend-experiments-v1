import React, { useEffect, useRef } from 'react';
import { IMicroFrontEndComponent } from '../../types';

declare const window: any;

/**
 * NOTES
 * This is admittedly a very innovative but strange way I invented...
 * Perhaps the easiest way to add an entire micro app into another with no iframe and relatively few changes required
 *
 * An XHR is done to get an HTML document
 * The div's innerHTML is set to the result
 * Chrome strips out the <html> tags and a few others for you
 * We then tell the child app to initialize
 * It results in something kind of like an iframe in that you get an entire app inside... but without the sandbox aspect of an iframe
 *
 * Assessment: strange, unique, slightly faster than an iframe, no DOM issolation, but not as good as remote components
 */
export const InjectWholeAppHtmlComponent = (props: IMicroFrontEndComponent) => {
  const ref = useRef(null);
  const {
    appDefinition: { initApp },
  } = props;

  useEffect(() => {
    init(ref, props, renderChild);
  }, []);

  useEffect(() => {
    renderChild();
  }, [props]);

  const renderChild = () => {
    if (window[initApp]) {
      window[initApp](ref.current, props);
    }
  };

  return <div ref={ref}></div>;
};

const init = async (
  ref: any,
  props: IMicroFrontEndComponent,
  renderChild: () => void,
) => {
  const { childUrl } = props;

  // Fetch HTML
  var res = await fetch(childUrl);
  var text = await res.text();

  const context = ref!.current!;
  context.innerHTML = text;

  // Recreate script tags or browser will ignore them
  const oldScripts = context.querySelectorAll('script'); // @ts-ignore
  [...oldScripts].forEach((oldScript) => {
    var newScript = document.createElement('script');
    newScript.text = oldScript.text; // @ts-ignore
    Object.values({ ...oldScript.attributes }).map((attr: any) => {
      newScript.setAttribute(attr.name, attr.value);
    });

    newScript.onload = renderChild;

    const parent = oldScript.parentNode;
    oldScript.remove();
    parent.appendChild(newScript);
  });
};
