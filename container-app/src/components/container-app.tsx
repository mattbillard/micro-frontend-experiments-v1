import * as React from 'react';
import { useState } from 'react';
import { IframeComponent } from './iframe-component';
import { WebComponent } from './web-component';

interface IContainerAppProps {
}

export const ContainerApp = (props: IContainerAppProps) => {
  const [count, setCount] = useState<number>(1);

  const url = '/micro-app/index.html';
  // const url = '/create-react-app';

  return (
    <div className="container">
      <h1>Container App</h1>
      <div>
        <button onClick={() => setCount(count - 1)}> - </button>
        <button onClick={() => setCount(count + 1)}> + </button>
      </div>

      {([...new Array(count)]).map((val, idx) => {
        return (
          <div key={idx} className="row">
            <div>
              <h1>Iframe</h1>
              <IframeComponent url={url} />
            </div>
            <div>
              <h1>WebComponent</h1>
              <WebComponent url={url} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
