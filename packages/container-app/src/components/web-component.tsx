import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { connect, useSelector, Provider } from 'react-redux';
import { IStoreState } from '../redux';

declare const window: any;

interface IWebComponentProps {
  url: string;
}

let count = 0;

export const WebComponent = (props: IWebComponentProps) => {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const ref = useRef(null);
  const { isShadow } = useSelector((state: IStoreState) => state.containerAppReducer.settings);
  const className = isShadow === true ? 'shadow-component' : 'web-component';

  useEffect(() => {
    init(ref, props, isShadow);
    setIsInitialized(true);
  }, []);  

  // TODO: cleaner to use a class component with componentDidUpdate
  // useEffect(() => {
  //   if (isInitialized) {
  //     console.log('....updateProps');
  //     window.MicroApp.updateProps(props);
  //   }
  // }, [props]);
  useEffect(() => {
    ref.current.props = props;
  }, [props])

  return (
    <div ref={ref} className={className} count={count++}></div>
    // <div ref={ref} className={`${className} ${count++}`}></div>
  )
}

const init = async (ref, props, isShadow) => {
  const { url } = props;

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

  // context.props = props;
  ref.current.props = props;
}
