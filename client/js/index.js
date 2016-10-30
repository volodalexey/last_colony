var React = require('react'),
  reactDOM = require('inferno-dom'),
  Canvas = require('./canvas'),
  events = require('./events'),
  Less = require('../less/index.less');

InfernoDOM.render((
  <Canvas onCanvasMounted={events.onCanvasMounted} />
), document.querySelector('[data-role="app"]'));