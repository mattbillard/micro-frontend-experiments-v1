// @ts-nocheck
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import * as Highcharts from 'highcharts';

export const ChartComponent = (props) => {
  const ref = useRef(null);
  const chartRef = useRef(null);

  const {
    config,
    name,
  } = props;

  useEffect(() => {
    config.chart.renderTo = ref.current;
    const chart = new Highcharts.Chart(config);
    chartRef.current = chart;

    const resizeObserver = new ResizeObserver(entries => resize());
    resizeObserver.observe(ref.current);
  }, []);

  const resize = () => {
    chartRef.current.reflow();
    // const { width, height } = ref.current.getBoundingClientRect();
    // chartRef.current.setSize(width, height);
  }

  return (
    <div ref={ref} className="chart-component"></div>
  );
}



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
