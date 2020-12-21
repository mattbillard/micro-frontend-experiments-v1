import * as React from 'react';
import * as ReactDOM from "react-dom";

import { ContainerApp } from './components/container-app';
import "./styles/styles.less";

var mountNode = document.getElementById("app");
ReactDOM.render(<ContainerApp />, mountNode);
