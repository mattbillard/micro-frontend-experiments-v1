const ContainerApp = (props) => {
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

class MicroWebComponent extends React.Component {
  componentDidMount() {
    (async() => {
      var res = await fetch(`/src/micro-app/for-template.html`)
      var text = await res.text();
      const template = document.createElement('template');
      template.innerHTML = text;
      console.log(template);

      root3
        // .attachShadow({ mode: 'open' })
        // .appendChild(template.content);
        .innerHTML = template.innerHTML;

      bootstrap();
    })();


  //   (async() => {
  //     var res = await fetch(`/src/micro-app/for-template.html`)
  //     var text = await res.text();
  //     const template = document.createElement('template');
  //     template.innerHTML = text;

  //     root3
  //       .attachShadow({ mode: 'open' })
  //       .appendChild(template.content);
  //       // .innerHTML = template.innerHTML;

  //       // var script = document.createElement( 'script' );
  //       // script.type = 'text/javascript';
  //       // // script.type = 'text/babel';
  //       // script.src = '/src/micro-app/scripts/micro-app.js';
  //       // root3.appendChild(script);
  //   })();


    // (async() => {
    //   var res = await fetch(`/src/micro-app/for-template.html`)
    //   var text = await res.text();
    //   root3.innerHTML = text;
    // })();


    // (async() => {
    //   var res = await fetch(`/src/micro-app/for-template.html`)
    //   var text = await res.text();
    //   const template = document.createElement('template');
    //   template.innerHTML = text;

    //   var div = document.createElement('div');
    //   div.innerHTML = template.innerHTML;
    //   [...div.children].forEach((child) => root3.appendChild(child));
    // })();


    // (async() => {
    //   console.log(myTemplate);
    //   root3.appendChild(myTemplate.content);
    // })();
  }

  render () {
    return (
      <div className="micro-web-component">
        <div id="root3">...</div>
      </div>
    )
  }
}

ReactDOM.render(<ContainerApp />, document.getElementById('root'));
