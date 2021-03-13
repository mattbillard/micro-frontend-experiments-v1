import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import jsCookie from 'js-cookie';

import { SiteRouter, LoginPage, OpenFinWindowBar } from '../../components';
import { IStoreState, store, updateUsername } from '../../redux';

import '@company/shared-tools/src/styles/index.less';
import './site-app.less';

declare const window: any;

// OpenFin - show debugger
// window.fin?.me.showDeveloperTools();

export const SiteAppView = () => {
  const dispatch = useDispatch();
  const usernameCookie = jsCookie.get('username'); // Mock login
  const { username } = useSelector(
    (state: IStoreState) => state.containerAppReducer,
  );

  useEffect(() => {
    dispatch(updateUsername(usernameCookie));
  }, []);

  if (!username) {
    return <LoginPage />;
  }

  return (
    <>
      <OpenFinWindowBar />
      <SiteRouter />
    </>
  );
};

export const SiteApp = () => {
  return (
    <Provider store={store}>
      <SiteAppView />
    </Provider>
  );
};
