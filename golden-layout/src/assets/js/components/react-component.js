var TestComponent = React.createClass({
  render: function () {
    return (<h1>{this.props.label}</h1>)
  }
});

myLayout.registerComponent('testComponent', TestComponent);
