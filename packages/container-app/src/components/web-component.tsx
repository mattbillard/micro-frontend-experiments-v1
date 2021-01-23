import * as React from 'react';
import { useEffect, useRef } from 'react';
import { connect, useSelector, Provider } from 'react-redux';
import { IStoreState } from '../redux';

declare const window: any;

interface IWebComponentProps {
  url: string;
}

export const WebComponent = (props: IWebComponentProps) => {
  const ref = useRef(null);
  const { isShadow } = useSelector((state: IStoreState) => state.containerAppReducer.settings);
  const className = isShadow === true ? 'shadow-component' : 'web-component';

  useEffect(() => {
    init(ref, props, isShadow);
  }, []);

  return (
    <div ref={ref} className={className}></div>
  )
}

const init = async (ref, props, isShadow) => {
  // const { url } = props;
  const url = props.glContainer?._config?.componentState?.url || '/micro-app';

  // Fetch HTML
  var res = await fetch(url);
  var text = await res.text();

  // Create shadow DOM to encapsulate CSS. Append new HTML
  let shadowRoot;
  if (isShadow) {
    shadowRoot = ref.current!.attachShadow({ mode: 'open' });
  }
  const context = shadowRoot ? shadowRoot : ref.current;
  context.innerHTML = text;

  // Recreate script tags or browser will ignore them
  const oldScripts = context.querySelectorAll('script'); // @ts-ignore
  [...oldScripts].forEach(oldScript => { 
    var newScript = document.createElement('script');
    newScript.text = oldScript.text; // @ts-ignore
    Object.values({...oldScript.attributes}).map((attr: any) => {
      newScript.setAttribute(attr.name, attr.value);
    })

    const parent = oldScript.parentNode;
    oldScript.remove();
    parent.appendChild(newScript);
  });

  context.props = props;
}
