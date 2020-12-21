import * as React from 'react';
import { IframeComponent } from './iframe-component';
import { WebComponent } from './web-component';

interface IContainerAppProps {
}

export class ContainerApp extends React.Component<IContainerAppProps> {
  render() {
    const url = '/micro-app/index.html';

    return (
      <div className="container">
        <h1>Container App</h1>
        <div className="row">
          <div>
            <h1>Iframe</h1>
            <IframeComponent url={url} />
          </div>
          <div>
            <h1>WebComponent</h1>
            <WebComponent url={url} />
          </div>
        </div>
      </div>
    )
  }
}
