(function () {
  myLayout.registerComponent('fibonacci-spiral', function (container, state) {
    container
      .getElement()
      .append('<div class="fibonacci-spiral"></div>');
  });
})();
