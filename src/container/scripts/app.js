const ContainerApp = (props) => {
  return (
    <div className="container">
      <h1>Container App</h1>
      <div className="row">
        <div>
          <MicroIframe />
        </div>
        <div>
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

const MicroWebComponent = (props) => {
  return (
    <div>
      <h1>Micro WebComponent</h1>
    </div>
  )
}

ReactDOM.render(<ContainerApp />, document.getElementById('root'));
