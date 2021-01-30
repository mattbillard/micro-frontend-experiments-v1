import * as React from 'react';

import '../styles/golden-text.css';

export const GoldenText = () => {
  return (
    <div className="gl-text">
      <div>
        <h1>GoldenLayout</h1>
        <h3>a multi-screen layout manager for webapps</h3>
      </div>
    </div>
  );
}

export default GoldenText;

try {
  // @ts-ignore
  RemoteComponent = GoldenText;
} catch (err) {
}
