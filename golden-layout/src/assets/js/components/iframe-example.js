(function () {
  myLayout.registerComponent('iframe-example', function (container, state) {
    container
      .getElement()
      .append('<iframe src="https://localhost:8080/micro-app/index.html" style="border:0; width:100%; height:100%;"></iframe>');
  });
})();
