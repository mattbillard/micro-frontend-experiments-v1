import * as React from 'react';
import * as ReactDOM from "react-dom";
import { ContainerApp } from './components';
import { forceDisableLiveReload } from './utils';
import "./styles/styles.less";

forceDisableLiveReload();

var mountNode = document.getElementById("container-app");
ReactDOM.render(<ContainerApp />, mountNode);
