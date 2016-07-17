var Inferno = require('inferno'),
  CreateClass = require('inferno-create-class');

var Canvas = CreateClass({
  initialize: function() {
    var refs = this.refs, props = this.props,
      canvasElement = refs.canvasElement;
    if (canvasElement) {
      var onCanvasMounted;
      if (onCanvasMounted = props.onCanvasMounted) {
        setTimeout(function() {
          onCanvasMounted(canvasElement)
        }, 0)
      }
    }
  },
  componentDidMount: function() {
    this.initialize()
  },
  render: function() {
    return <canvas ref="canvasElement"></canvas>
  }
});

module.exports = Canvas;