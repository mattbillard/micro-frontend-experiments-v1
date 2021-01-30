import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { connect, useSelector, Provider } from 'react-redux';
import { IStoreState } from '../../redux';

declare const window: any;

export const InjectWholeAppHtmlComponent = (props) => {
  const ref = useRef(null);

  useEffect(() => {
    init(ref, props);
  }, []);  

  useEffect(() => {
    window.microApp?.init(ref.current, props);
  }, [props])

  return (
    <div ref={ref}></div>
  )
}

const init = async (ref, props) => {
  const { url } = props;

  // Fetch HTML
  var res = await fetch(url);
  var text = await res.text();

  const context = ref.current;
  context.innerHTML = text;

  // Recreate script tags or browser will ignore them
  const oldScripts = context.querySelectorAll('script'); // @ts-ignore
  [...oldScripts].forEach(oldScript => { 
    var newScript = document.createElement('script');
    newScript.text = oldScript.text; // @ts-ignore
    Object.values({...oldScript.attributes}).map((attr: any) => {
      newScript.setAttribute(attr.name, attr.value);
    })

    newScript.onload = () => window.microApp?.init(context, props);

    const parent = oldScript.parentNode;
    oldScript.remove();
    parent.appendChild(newScript);
  });

  // context.props = props;
  ref.current.props = props;
}



// export const InjectWholeAppHtmlComponent = (props) => {
//   const ref = useRef(null);
//   const className = isShadow === true ? 'shadow-component' : 'web-component';

//   useEffect(() => {
//     init(ref, props, isShadow);
//   }, []);  

//   useEffect(() => {
//     const context = ref.current.shadowRoot ? ref.current.shadowRoot : ref.current;
//     window.microApp?.init(context, props);
//   }, [props])

//   return (
//     <div ref={ref} className={className}></div>
//   )
// }

// const init = async (ref, props, isShadow) => {
//   const { url } = props;

//   // Fetch HTML
//   var res = await fetch(url);
//   var text = await res.text();

//   // Create shadow DOM to encapsulate CSS. Append new HTML
//   let shadowRoot;
//   if (isShadow) {
//     shadowRoot = ref.current!.attachShadow({ mode: 'open' });
//   }
//   const context = shadowRoot ? shadowRoot : ref.current;
//   context.innerHTML = text;

//   // Recreate script tags or browser will ignore them
//   const oldScripts = context.querySelectorAll('script'); // @ts-ignore
//   [...oldScripts].forEach(oldScript => { 
//     var newScript = document.createElement('script');
//     newScript.text = oldScript.text; // @ts-ignore
//     Object.values({...oldScript.attributes}).map((attr: any) => {
//       newScript.setAttribute(attr.name, attr.value);
//     })

//     newScript.onload = () => window.microApp?.init(context, props);

//     const parent = oldScript.parentNode;
//     oldScript.remove();
//     parent.appendChild(newScript);
//   });

//   // context.props = props;
//   ref.current.props = props;
// }
