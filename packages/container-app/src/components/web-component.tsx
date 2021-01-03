import * as React from 'react';
import { useEffect, useRef } from 'react';

interface IWebComponentProps {
  url: string;
}

export const WebComponent = (props: IWebComponentProps) => {
  const { url } = props;
  const ref = useRef(null);
  const isShadow = localStorage.isShadow || 'false';
  const className = isShadow === 'true' ? 'shadow-component' : 'web-component';

  useEffect(() => {
    init(ref.current, url);
  }, []);

  return (
    <div ref={ref} className={className}></div>
  )
}

const init = async (refCurrent, url: string) => {
  const isShadow = localStorage.isShadow || 'false';
  
  // Fetch HTML
  var res = await fetch(url);
  var text = await res.text();

  // Create shadow DOM to encapsulate CSS. Append new HTML
  let shadowRoot;
  if (isShadow === 'true') {
    shadowRoot = refCurrent!.attachShadow({ mode: 'open' });
  }
  const context = shadowRoot ? shadowRoot : refCurrent;
  context.innerHTML = text;

  // Recreate script tags or browser will ignore them
  const oldScripts = context.querySelectorAll('script'); // @ts-ignore
  [...oldScripts].forEach(oldScript => { 
    var newScript = document.createElement('script');
    newScript.text = oldScript.text; // @ts-ignore
    Object.values({...oldScript.attributes}).map((attr) => {
      newScript.setAttribute(attr.name, attr.value);
    })

    /**
     * TODO: 
     * - Won't work for multiple scripts. Needs to be promise.all
     * - Also need to register/look up which micro app to initialize 
     */
    newScript.onload = () => window.MicroApp.init(context, url);

    const parent = oldScript.parentNode;
    oldScript.remove();
    parent.appendChild(newScript);
  });
}
