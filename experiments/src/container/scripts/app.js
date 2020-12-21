const ContainerApp = (props) => {
  const url = '/src/micro-app/for-template.html';

  return (
    <div className="container">
      <h1>Container App</h1>
      <div className="row">
        {/* <div>
          <h1>Iframe</h1>
          <MicroIframe />
        </div> */}
        <div>
          <h1>WebComponent</h1>
          <MicroWebComponent url={url} />
        </div>
      </div>
    </div>
  )
}

const MicroIframe = (props) => {
  return (
    <iframe src="../micro-app/micro-app.html"></iframe>
  )
}

class MicroWebComponent extends React.Component {
  componentDidMount() {
    (async() => {
      var res = await fetch(this.props.url); // TODO: pass in URL as props
      var text = await res.text();

      const container = document.createElement('div');
      container.innerHTML = text;

      const ref = document.querySelector('.micro-web-component'); // TODO: use React ref
      const shadowRoot = ref.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(container);
      // ref.appendChild(container);

      // const scripts = container.querySelectorAll('script');
      // [...scripts].forEach(script => shadowRoot.append(script));

      setTimeout(() => {
        const scripts = container.querySelectorAll('script');
        [...scripts].forEach(script => {
          var scriptTag = document.createElement('script');
          Object.values({...script.attributes}).map((attr) => {
            // console.log(attr.name, attr.value);
            scriptTag[attr.name] = attr.value;
          })
          scriptTag.text = script.text;
          window.scriptTag = scriptTag;
          // document.body.appendChild(scriptTag);
          shadowRoot.appendChild(scriptTag);
        });
      })

      // TODO: search through text and recreate script tags in root body. See if Chrome will load them
      // TODO: template should have its own bootstrap script
      // initFooBar2(container);
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



// class MicroWebComponent extends React.Component {
//   state = {
//     html: ''
//   }

//   componentDidMount() {
//     (async() => {
//       var res = await fetch(`/src/micro-app/for-template.html`)  // TODO: pass in URL as props
//       var text = await res.text();
//       this.setState({ html: text }, () => {
//         bootstrap();
//       });
//     })();
//   }

//   render () {
//     return (
//       <div className="micro-web-component">
//         <div id="root3" dangerouslySetInnerHTML={{ __html: this.state.html }}></div>
//       </div>
//     )
//   }
// }


// class MicroWebComponent extends React.Component {
//   componentDidMount() {
//     (async() => {
//       var res = await fetch(`/src/micro-app/manifest.json`);  // TODO: pass in URL as props
//       var json = await res.json();
//       const { initialize, scriptSrc, tagName } = json;

//       // const useShadow = true;
//       const useShadow = false;
      
//       let root;
//       const elem = document.createElement(tagName);
//       const ref = document.querySelector('.micro-web-component'); // TODO: use React ref
//       if (useShadow) {
//         const shadowRoot = ref.attachShadow({ mode: 'open' });
//         shadowRoot.appendChild(elem);
//         root = shadowRoot.querySelector('foo-bar');
//       } else {
//         ref.appendChild(elem);
//         root = elem;
//       }

//       const script = document.createElement('script');
//       script.src = scriptSrc;
//       script.type = 'text/babel';
//       script.onLoad = window[initialize](root);
//       document.body.appendChild(script);
//     })();
//   }

//   render () {
//     return (
//       <div className="micro-web-component">
//         {/* <div id="root3" dangerouslySetInnerHTML={{ __html: this.state.html }}></div> */}
//         ...
//       </div>
//     )
//   }
// }

ReactDOM.render(<ContainerApp />, document.getElementById('root'));
