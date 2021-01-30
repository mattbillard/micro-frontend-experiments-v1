import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as jsCookie from 'js-cookie';
import { useDispatch, useSelector } from "react-redux";

import {
  SettingsMenu,
} from '../../components';
import { IStoreState, setSetting } from '../../redux';

interface INavigationProps {
}

export const Navigation = (props: INavigationProps) => {
  const { showSettings } = useSelector((state: IStoreState) => state.containerAppReducer.settings);
  const dispatch = useDispatch();

  const toggleShowSettings = () => {
    dispatch(setSetting('showSettings', !showSettings));
  }

  return (
    <div className="navigation">
      <div className="nav-links">
        <span className="brand">
          MattFin
        </span>
        <Link to='/container/golden-layout'>Golden</Link>
        <Link to='/container/page/micro-app/golden-spiral'>Spiral</Link>
        <Link to='/container/page/micro-app/golden-text'>Text</Link>
        <Link to='/container/page/micro-app/stock-grid'>StockGrid</Link>
        <Link to='/container/page/micro-app/column-chart'>ColumnChart</Link>
        <Link to='/container/page/micro-app/pie-chart'>PieChart</Link>
        <Link to='/container/page/micro-app/stock-chart'>StockChart</Link>
      </div>

      <div>
        <a href="#" onClick={toggleShowSettings}>Settings</a>
          {showSettings && <SettingsMenu toggleShowSettings={toggleShowSettings} />}
      </div>
    </div>
  )
}
