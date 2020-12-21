import * as React from 'react';

interface IWebComponentProps {
  url: string;
}

export class WebComponent extends React.Component<IWebComponentProps> {
  componentDidMount() {
    (async() => {
      var res = await fetch(this.props.url); // TODO: pass in URL as props
      var text = await res.text();

      const container = document.createElement('div');
      container.innerHTML = text;

      const ref = document.querySelector('.micro-web-component'); // TODO: use React ref
      const shadowRoot = ref.attachShadow({ mode: 'open' });

      const context = (typeof shadowRoot !== 'undefined') ? shadowRoot : ref;
      context.appendChild(container);

      setTimeout(() => {
        const scripts = container.querySelectorAll('script');        
        [...scripts].forEach(script => {
          var scriptTag = document.createElement('script');
          Object.values({...script.attributes}).map((attr) => {
            console.log(attr.name, attr.value);
            scriptTag[attr.name] = attr.value;
          })
          scriptTag.text = script.text;
          console.log(scriptTag);

          script.remove();
          context.appendChild(scriptTag);
        });
      })
    })();
  }

  render () {
    return (
      <div className="micro-web-component">
        ...
      </div>
    )
  }
}
