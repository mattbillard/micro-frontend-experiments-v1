import React from 'react';
import { Provider } from 'react-redux';
import jsCookie from 'js-cookie';

import '@company/core-team-shared-tools/src/styles/index.less';
import './container-app.less';

import { ContainerRouter, LoginPage, OpenFinWindowBar } from '../../components';
import { store } from '../../redux';

export const ContainerApp = () => {
  const username = jsCookie.get('username');

  if (!username) {
    return <LoginPage />;
  }

  return (
    <Provider store={store}>
      <OpenFinWindowBar />
      <ContainerRouter />
    </Provider>
  );
};
