const ContainerApp = (props) => {
  return (
    <div className="container">
      <h1>Container App</h1>
      <div className="row">
        <div>
          <h1>Iframe</h1>
          <MicroIframe />
        </div>
        <div>
          <h1>WebComponent</h1>
          <MicroWebComponent />
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

// class MicroWebComponent extends React.Component {
//   state = {
//     html: ''
//   }

//   componentDidMount() {
//     // (async() => {
//     //   var res = await fetch(`/src/micro-app/for-template.html`)
//     //   var text = await res.text();
//     //   const template = document.createElement('template');
//     //   template.innerHTML = text;
//     //   console.log(template);

//     //   root3
//     //     // .attachShadow({ mode: 'open' })
//     //     // .appendChild(template.content);
//     //     .innerHTML = template.innerHTML;

//     //   bootstrap();
//     // })();


//   //   (async() => {
//   //     var res = await fetch(`/src/micro-app/for-template.html`)
//   //     var text = await res.text();
//   //     const template = document.createElement('template');
//   //     template.innerHTML = text;

//   //     root3
//   //       .attachShadow({ mode: 'open' })
//   //       .appendChild(template.content);
//   //       // .innerHTML = template.innerHTML;

//   //       // var script = document.createElement( 'script' );
//   //       // script.type = 'text/javascript';
//   //       // // script.type = 'text/babel';
//   //       // script.src = '/src/micro-app/scripts/micro-app.js';
//   //       // root3.appendChild(script);
//   //   })();


//     // (async() => {
//     //   var res = await fetch(`/src/micro-app/for-template.html`)
//     //   var text = await res.text();
//     //   root3.innerHTML = text;
//     // })();


//     // (async() => {
//     //   var res = await fetch(`/src/micro-app/for-template.html`)
//     //   var text = await res.text();
//     //   const template = document.createElement('template');
//     //   template.innerHTML = text;

//     //   var div = document.createElement('div');
//     //   div.innerHTML = template.innerHTML;
//     //   [...div.children].forEach((child) => root3.appendChild(child));
//     // })();


//     // (async() => {
//     //   console.log(myTemplate);
//     //   root3.appendChild(myTemplate.content);
//     // })();
//   }

//   render () {
//     return (
//       <div className="micro-web-component">
//         <div id="root3" >...</div>
//       </div>
//     )
//   }
// }


// class MicroWebComponent extends React.Component {
//   state = {
//     html: ''
//   }

//   componentDidMount() {
//     (async() => {
//       var res = await fetch(`/src/micro-app/for-template.html`)
//       var text = await res.text();
//       this.setState({ html: text });
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


class MicroWebComponent extends React.Component {
  state = {
    html: ''
  }

  // componentDidMount() {
  //   (async() => {
  //     var res = await fetch(`/src/micro-app/manifest.json`);
  //     var json = await res.json();
  //     const { initialize, scriptSrc, tagName } = json;
      
  //     const html = `<${tagName} />`;
  //     this.setState({ html }, () => {
  //       const context = document.querySelector('.micro-web-component');
  //       const script = document.createElement('script');
  //       script.src = scriptSrc;
  //       script.type = 'text/babel';
  //       script.onLoad = window[initialize](context);
  //       document.body.appendChild(script);
  //     });
  //   })();
  // }

  // componentDidMount() {
  //   (async() => {
  //     const html = `<foo-bar />`;
  //     this.setState({ html }, () => {
  //       initFooBar();
  //     });
  //   })();
  // }

  componentDidMount() {
    (async() => {
      var res = await fetch(`/src/micro-app/manifest.json`);
      var json = await res.json();
      const { initialize, scriptSrc, tagName } = json;
      
      const elem = document.createElement(tagName);
      const ref = document.querySelector('.micro-web-component');
      const shadowRoot = ref.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(elem);

      const script = document.createElement('script');
      script.src = scriptSrc;
      script.type = 'text/babel';
      script.onLoad = window[initialize](shadowRoot);
      document.body.appendChild(script);
    })();
  }

  render () {
    return (
      <div className="micro-web-component">
        <div id="root3" dangerouslySetInnerHTML={{ __html: this.state.html }}></div>
      </div>
    )
  }
}

ReactDOM.render(<ContainerApp />, document.getElementById('root'));
