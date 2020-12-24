(function () {
  myLayout.registerComponent('gl-text', function (container, state) {
    container
      .getElement()
      .append(
        '<div class="gl-text">' +
        '<div>' +
        '<h1>GoldenLayout</h1>' +
        '<h3>a multi-screen layout manager for webapps</h3>' +
        '</div>' +
        '</div>'
      );
  });
})();
