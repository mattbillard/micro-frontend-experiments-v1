(function () {
  myLayout.registerComponent('columnChart', function (container, state) {
    defaultConfig = {
      title: {
        text: 'Relative Performance',
        style: { 'color': '#555', 'fontSize': '14px' }
      },
      legend: { enabled: false },
      credits: { enabled: false },
      plotOptions: {
  
      },
      xAxis: {
        categories: ['Q1', 'Q2', 'Q3', 'Q4'],
        gridLineColor: '#3A3A3A',
        lineColor: '#3A3A3A',
        tickColor: '#3A3A3A'
      },
      yAxis: {
        min: 0,
        title: { text: null },
        labels: { enabled: false },
        gridLineColor: '#3A3A3A',
        lineColor: '#3A3A3A',
        tickColor: '#3A3A3A'
      },
      series: [{
        color: '#444',
        borderWidth: 0,
        name: 'rel. performance',
        data: [49.9, 71.5, 26, 33]
      }],
      chart: {
        renderTo: container.getElement()[0],
        type: 'column',
        backgroundColor: '#222'
      }
    };
  
    return new ChartComponent(container, 'share', defaultConfig);
  });
})();
