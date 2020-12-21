import * as React from 'react';

interface Props {
}

class MicroApp extends React.Component<Props> {
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

export default MicroApp;
