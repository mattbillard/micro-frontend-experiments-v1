// @ts-nocheck
import * as React from 'react';
import { useState } from 'react';

// import { exportRemoteComponent } from './remote-component';

// import { ChartComponent } from '../components';
import { ChartComponent } from './chart-component';

export const StockChart = () => {
  let data = [],
    config,
    i,
    time = (new Date()).getTime() - 30758400000, // 1 Year in MS
    value = Math.random() * 1000;

  for (i = 0; i < 100; i++) {
    value *= 0.9 + (Math.random() * 0.2);
    time += 86400000; // 1 Day in ms
    data.push([time, parseFloat(value.toFixed(2))]);
  }

  config = {
    title: null,
    legend: { enabled: false },
    credits: { enabled: false },
    plotOptions: { line: { marker: { enabled: false } } },
    xAxis: { type: 'datetime', gridLineColor: '#3A3A3A', lineColor: '#3A3A3A', tickColor: '#3A3A3A' },
    yAxis: { title: 'Price in USD', gridLineColor: '#3A3A3A' },
    series: [{
      color: '#555',
      name: 'Close price',
      data: data
    }],
    chart: {
      renderTo: undefined,
      marginBottom: 28,
      marginTop: 15,
      backgroundColor: '#222'
    }
  };

  return (
    <ChartComponent config={config} />
  );
}

export default StockChart;

// try {
//   // @ts-ignore
//   RemoteComponent = StockChart;
// } catch (err) {
// }

// exportRemoteComponent('microComponents', StockChart);
