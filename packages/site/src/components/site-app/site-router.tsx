import React, { Dispatch, useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';

import { GlPopout, GoldenLayout, PageComponent, TopBar } from '../../components';
import {
  IStoreState,
  loadAppAndNavDefinitions,
  loadInitialSettings,
  updateGoldenLayoutConfig,
  updateSettings,
} from '../../redux';
import { wsService } from '../../services';
import { IWsMsgObj } from '../../types';

export const SiteRouter = () => {
  const { appAndNavDefinitions, goldenLayoutConfig, settings } = useSelector(
    (state: IStoreState) => state.containerAppReducer,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      // Init WebSockets
      sessionStorage.windowId = nanoid(); // Used by WebSocket server to identify each client and so it knows not to send updates to the window that just messaged it
      wsService.connect((wsMsgObj: IWsMsgObj) => handleWsMessage(wsMsgObj, dispatch));

      // Load initial data
      dispatch(loadAppAndNavDefinitions());
      dispatch(loadInitialSettings());
    })();
  }, []);

  if (!settings || !appAndNavDefinitions) {
    return <div>Loading...</div>;
  }

  const { showHints } = settings;
  const className = showHints ? 'site-router flex-rows show-hints' : 'site-router flex-rows'; // TODO: clean up

  // prettier-ignore
  return (
      <div className={className}>
        <BrowserRouter>
          <TopBar />
          <Switch>
            <Route path="/site-url/golden-layout/popout/*" component={GlPopout} />
            <Route path="/site-url/golden-layout" component={GoldenLayout} />
            <Route path="/site-url/*" component={PageComponent} />
            <Redirect from="/*" to="/site-url/example-url/title-text" />
          </Switch>
        </BrowserRouter>
      </div>
    );
};

const handleWsMessage = (wsMsgObj: IWsMsgObj, dispatch: Dispatch<any>) => {
  switch (wsMsgObj.action) {
    case 'UPDATE_GOLDEN_LAYOUT_CONFIG': {
      const { payload } = wsMsgObj;
      dispatch(updateGoldenLayoutConfig(payload));
      break;
    }

    case 'UPDATE_SETTINGS': {
      const { payload } = wsMsgObj;
      dispatch(updateSettings(payload));
      break;
    }
  }
};
