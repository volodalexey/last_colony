"use strict";
const
  PATH = require('../../common/constants').PATH,
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
  Menu = require('./menu');

let store = createStore(reducer);

const
  checkOnlyLoggedInRedirect = (nextState, replace) => {
    let state = store.getState();
    if (!state.logged_in_credentials) {
      replace(PATH.LOGIN);
    }
  },
  checkLoggedInRedirect = (nextState, replace) => {
    let state = store.getState();
    if (state.logged_in_credentials) {
      replace(PATH.MENU);
    } else {
      replace(PATH.LOGIN);
    }
  };

ReactDOM.render((
  <Provider store={store}>
    <Router history={ReactRouter.browserHistory}>
      <Route path="/" onEnter={checkLoggedInRedirect}/>
      <Route path="/">
        <Route path="login" component={LoginCredentials} />
        <Route path="menu" component={Menu} onEnter={checkOnlyLoggedInRedirect}/>
      </Route>
      <Route path="*" onEnter={checkLoggedInRedirect}/>
    </Router>
  </Provider>
), document.querySelector('[data-role="app"]'));