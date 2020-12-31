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
    // <div ref={ref} style={{width:'100vw',height:'100vh'}}></div>
    <div ref={ref}></div>
  );
}