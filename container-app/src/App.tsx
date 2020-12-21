import * as React from 'react';
import { IframeComponent } from './iframe-component';
import { ShadowComponent } from './shadow-component';

interface Props {
   name: string;
}

class App extends React.Component<Props> {
  render() {
    // const url = '/micro-app/for-template.html';
    const url = '/micro-app/index.html';

    return (
      <div className="container">
        <h1>Container App</h1>
        <div className="row">
          <div>
            <h1>Iframe</h1>
            <IframeComponent />
          </div>
          <div>
            <h1>WebComponent</h1>
            <ShadowComponent url={url} />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
