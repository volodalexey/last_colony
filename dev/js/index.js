var Inferno = require('inferno'),
  InfernoDOM = require('inferno-dom'),
  Canvas = require('./canvas'),
  events = require('./events');

InfernoDOM.render((
  <Canvas onCanvasMounted={events.onCanvasMounted} />
), document.querySelector('[data-role="app"]'));