import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as jsCookie from 'js-cookie';

import {
  SettingsMenu,
} from '../components';

interface INavigationProps {
}

export const Navigation = (props: INavigationProps) => {
  const [showSettings, setShowSettings] = useState<boolean>(localStorage.showSettings === 'true');

  const logout = () => {
    jsCookie.remove('username');
    window.location.reload();
  }

  const toggleShowSettings = () => {
    setShowSettings(!showSettings);
    localStorage.showSettings = !showSettings;
  }

  return (
    <div>
      <div style={{ float: 'right' }}>
        <a href="#" onClick={toggleShowSettings}>Settings</a> |
            {showSettings && <SettingsMenu toggleShowSettings={toggleShowSettings} />}
        <a href="#" onClick={logout}>Logout</a>
      </div>

      <Link to='/container/golden-layout'>Golden</Link> |
      <Link to='/container/page/micro-app/golden-spiral'>Spiral</Link> |
      <Link to='/container/page/micro-app/golden-text'>Text</Link> |
      <Link to='/container/page/micro-app/stock-grid'>StockGrid</Link> |
      <Link to='/container/page/micro-app/column-chart'>ColumnChart</Link> |
      <Link to='/container/page/micro-app/pie-chart'>PieChart</Link> |
      <Link to='/container/page/micro-app/stock-chart'>StockChart</Link> |
    </div>
  )
}
