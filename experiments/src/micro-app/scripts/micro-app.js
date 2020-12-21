console.log('....micro-app.js')

class MicroApp extends React.Component {
  state = {
    rows: []
  }

  addRow = () => {
    const rows = [...this.state.rows, 'Lorem ipsum dolor sit amet'];
    this.setState({ rows });
  };

  render () {
    const { rows } = this.state;

    return (
      <div>
        <h1>Micro App</h1>
        <button onClick={this.addRow}>Add Row</button>
        <div>
          {rows.map((row, idx) => <p key={idx}>{row}</p>)}
        </div>
      </div>
    );
  }
}

const elem = document.getElementById('micro-app');
if (elem) {
  ReactDOM.render(<MicroApp />, elem);
}

function bootstrap() {
  console.log('....inside bootstrap');
  const elem = document.getElementById('micro-app');
  ReactDOM.render(<MicroApp />, elem);
}
function bootstrap2() {
  console.log('....inside bootstrap');
  const elem = document.querySelector('.micro-web-component').shadowRoot.querySelector('#micro-app');
  ReactDOM.render(<MicroApp />, elem);
}

// function initFooBar(context) {
//   const elem = context.querySelector('foo-bar');
//   ReactDOM.render(<MicroApp />, elem);
// }

function initFooBar(elem) {
  ReactDOM.render(<MicroApp />, elem);
}

function initFooBar2(context) {
  const elem = context.querySelector('#micro-app');
  ReactDOM.render(<MicroApp />, elem);
}
