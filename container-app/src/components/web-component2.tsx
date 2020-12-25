import * as React from 'react';
import { useEffect, useRef } from 'react';

interface IWebComponent2Props {
  url: string;
}

export class WebComponent2 extends React.Component<IWebComponent2Props> {
  ref = undefined;

  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    init(this.ref.current, this.props.url);
  }

  render()  {
    return (
      <div ref={this.ref}></div>
    )
  }
}

const init = async (refCurrent, url: string) => {
  // Fetch HTML
  var res = await fetch(url);
  var text = await res.text();

  // Create shadow DOM to encapsulate CSS. Append new HTML
  // const shadowRoot = refCurrent!.attachShadow({ mode: 'open' });
  const context = (typeof shadowRoot !== 'undefined') ? shadowRoot : refCurrent;
  context.innerHTML = text;

  // Recreate script tags or browser will ignore them
  const oldScripts = context.querySelectorAll('script'); // @ts-ignore
  [...oldScripts].forEach(oldScript => { 
    var newScript = document.createElement('script');
    newScript.text = oldScript.text; // @ts-ignore
    Object.values({...oldScript.attributes}).map((attr) => {
      newScript.setAttribute(attr.name, attr.value);
    })
    const parent = oldScript.parentNode;
    oldScript.remove();
    parent.appendChild(newScript);
  });
}
