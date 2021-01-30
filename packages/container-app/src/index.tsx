import * as React from 'react';
import * as ReactDOM from "react-dom";

import { ContainerApp } from './components';
// import { forceDisableLiveReload } from './utils';

// forceDisableLiveReload();

var mountNode = document.getElementById("container-app");
ReactDOM.render(<ContainerApp />, mountNode);
