import React, { useEffect, useRef } from 'react';
import Highcharts, { Options } from 'highcharts';

import '../styles/chart-component.less';

export interface IChartComponentProps {
  config: Options;
}

export const ChartComponent = (props: IChartComponentProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);

  const { config } = props;

  useEffect(() => {
    config.chart!.renderTo = ref.current!;
    const chart = new Highcharts.Chart(config);
    chartRef.current = chart;

    // @ts-ignore
    const resizeObserver = new ResizeObserver((entries) => resize());
    resizeObserver.observe(ref.current);
  }, []);

  const resize = () => {
    chartRef.current.reflow();
  };

  return <div ref={ref} className="chart-component"></div>;
};

// TODO: use highcharts-react-official
// import * as React from 'react';
// import { useEffect, useRef, useState } from 'react';
// import * as Highcharts from 'highcharts';
// import { default as HighchartsReact } from 'highcharts-react-official';

// export const ChartComponent = (props) => {
//   const { config } = props;

//   return (
//     <div className="chart-component flex-rows">
//       <HighchartsReact
//         highcharts={Highcharts}
//         options={config}
//         containerProps={{
//           className:"XXXX"
//         }}
//       />
//     </div>
//   );
// }
