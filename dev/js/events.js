var listen = require('./listen'),
  store = require('./store'),
  actions = require('./actions');

module.exports = {
  onCanvasMounted: function() {
    console.log('onCanvasMounted')
  }
};