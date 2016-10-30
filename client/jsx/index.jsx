"use strict";
const
  React = require('react'),
  ReactDOM = require('react-dom'),
  ReactRouter = require('react-router'),
  Router = ReactRouter.Router,
  Route = ReactRouter.Route,
  createStore = require('redux').createStore,
  Provider = require('react-redux').Provider,
  Less = require('../less/index.less'),
  reducer = require('../js/reducers/index_reducer'),
  // components
  LoginCredentials = require('./login_credentials'),
  noMatchRedirect = function(nextState, replace) {
    replace('/');
  };

let store = createStore(reducer);

ReactDOM.render((
  <Provider store={store}>
    <Router history={ReactRouter.browserHistory}>
      <Route path="/" component={LoginCredentials}/>
      <Route path="*" onEnter={noMatchRedirect}/>
    </Router>
  </Provider>
), document.querySelector('[data-role="app"]'));