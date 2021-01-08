import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import * as Highcharts from 'highcharts';

export const ChartComponent = (props) => {
  const ref = useRef(null);
  const [chart, setChart] = useState();

  const {
    config,
    name,
  } = props;

  useEffect(() => {
    config.chart.renderTo = ref.current;
    const chart = new Highcharts.Chart(config);
    setChart(chart);
  }, []);

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
