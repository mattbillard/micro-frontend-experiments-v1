import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect, useRef } from 'react';
import { IMicroFrontEndComponent } from '../../types';

declare const window: any;

/**
 * NOTE
 * Loads a react component from a JS script from a URL
 * Best solution found. Fastest
 *
 * Inserting a script tag is much more efficient than XHR to get JS
 * Because script tags are cached, the request is only made once
 * Result: Golden Layout with 8 components is 1mb vs 8mb for first load and less than half the time
 */
export const RemoteComponent = (props: IMicroFrontEndComponent) => {
  const {
    appDefinition: { urlComponentCss, urlComponentJs },
  } = props;
  const mountRef = useRef<HTMLDivElement>(null);
  const componentRef = useRef<any>();

  useEffect(() => {
    const div = mountRef.current;

    // After all scripts are loaded, render component
    const resolves: any[] = [];
    const promises = urlComponentJs.map((_item, idx) => new Promise(resolve => resolves[idx] = resolve));
    Promise.all(promises).then(onAllScriptsLoaded);

    // Inject all scripts
    urlComponentJs.forEach((jsUrl: string, idx: number) => {
      // Need to manually recreate the script or Chrome will not actually fetch and execute its code
      const script = document.createElement('script');
      script.src = jsUrl;
      script.onload = resolves[idx];
      div!.after(script);
    })
  }, []);

  // If props change, rerender
  useEffect(() => {
    if (componentRef.current) {
      renderChild();
    }
  }, [props]);

  const onAllScriptsLoaded = () => {
    componentRef.current = window.remoteComponent;
    delete window.remoteComponent;
    renderChild();
  }

  const renderChild = () => {
    const Component = componentRef.current;
    ReactDOM.render(<Component {...props} />, mountRef.current);
  };

  return (
    <>
      <div ref={mountRef} className="remote-root"></div>
      {urlComponentCss.map((cssUrl) => (
        <link rel="stylesheet" key={cssUrl} href={cssUrl} />
      ))}
    </>
  );
};
