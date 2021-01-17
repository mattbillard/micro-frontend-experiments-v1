import * as React from 'react';
import { Provider } from 'react-redux';
import * as jsCookie from 'js-cookie';

import {
  ContainerRouter,
  LoginPage,
} from '../components';
import { store } from '../redux';

interface IContainerAppProps {
}

export const ContainerApp = (props: IContainerAppProps) => {
  const username = jsCookie.get('username');

  if (!username) {
    return (
      <LoginPage />
    );
  }
  
  return (
    <Provider store={store}>
      <ContainerRouter />
    </Provider>
  )
}


