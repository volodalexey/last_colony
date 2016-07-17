var createStore = require('./create_store'),
  reducer = require('./reducer');

var
  initialState = require('./initial_state'),
  store = createStore(reducer, initialState);

module.exports = store;