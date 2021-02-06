import * as React from 'react';
import { useState } from 'react';

// import { exportRemoteComponent } from './remote-component';

// import { ChartComponent } from '../components';
import { ChartComponent } from './chart-component';

export const PieChart = () => {
  const config = {
    title: {
      text: 'Market Share',
      style: { 'color': '#555', 'fontSize': '14px' }
    },
    legend: { enabled: false },
    credits: { enabled: false },
    plotOptions: {
      pie: {
        colors: ['#4A4A4A', '#444444', '#3A3A3A'],
        allowPointSelect: true,
        cursor: 'pointer',
        borderColor: '#111',
        dataLabels: { enabled: false },
        tooltip: {
          headerFormat: '<span style="font-size: 10px">Market Share</span><br/>',
          pointFormat: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    xAxis: { type: 'datetime', gridLineColor: '#3A3A3A', lineColor: '#3A3A3A', tickColor: '#3A3A3A' },
    yAxis: { title: 'Price in USD', gridLineColor: '#3A3A3A' },
    series: [{
      type: 'pie',
      name: 'market share',
      data: [
        ['Competitor A', 45.0],
        ['Competitor B', 26.8],
        {
          name: 'us',
          y: 12.8,
          sliced: true,
          selected: true
        },
        ['Competitor C', 8.5],
        ['Competitor D', 4],
        ['Competitor E', 3.9]
      ]
    }],
    chart: {
      renderTo: undefined,
      backgroundColor: '#222'
    }
  };

  return (
    <ChartComponent config={config} />
  );
}

export default PieChart;

// try {
//   // @ts-ignore
//   RemoteComponent = PieChart;
// } catch (err) {
// }

// exportRemoteComponent(PieChart);
