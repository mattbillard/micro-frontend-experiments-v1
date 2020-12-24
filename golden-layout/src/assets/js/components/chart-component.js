(function () {
  window.ChartComponent = function (container, name, chartConfig) {
    this._highChartsConfig = chartConfig;
    this._container = container;
    this._name = name;
    this._chart = null;
  
    this._container.on('open', this._createChart.bind(this));
  };
  
  ChartComponent.prototype._createChart = function () {
    this._chart = new Highcharts.Chart(this._highChartsConfig);
    this._bindContainerEvents();
  };
  
  ChartComponent.prototype._bindContainerEvents = function () {
    this._container.on('resize', this._setSize.bind(this));
    this._container.on('destroy', this._chart.destroy.bind(this._chart));
  };
  
  ChartComponent.prototype._setSize = function () {
    this._chart.setSize(this._container.width, this._container.height);
  };
})();
