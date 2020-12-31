// require('./components/golden-layout-component');


import * as React from 'react';
import * as ReactDOM from "react-dom";

import { GoldenLayoutComponent } from './components/golden-layout-component';

var mountNode = document.getElementById("container-app");
ReactDOM.render(<GoldenLayoutComponent />, mountNode);

