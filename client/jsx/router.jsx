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
  Locale = require('./locale'),
  LoginCredentials = require('./login_credentials'),
  SinglePlayer = require('./single_player'),
  Menu = require('./menu');

let store = createStore(reducer);

const
  checkOnlyLoggedInRedirect = (nextState, replace) => {
    let state = store.getState();
    if (!state.logged_in_credentials) {
      replace(PATH._LOGIN);
    }
  },
  checkLoggedInRedirect = (nextState, replace) => {
    let state = store.getState();
    if (state.logged_in_credentials) {
      replace(PATH._MENU);
    } else {
      replace(PATH._LOGIN);
    }
  };

ReactDOM.render((
  <Provider store={store}>
    <Locale>
      <Router history={ReactRouter.browserHistory}>
        <Route path="/" onEnter={checkLoggedInRedirect}/>
        <Route path="/">
          <Route path={PATH.LOGIN} component={LoginCredentials} />
          <Route path={PATH.MENU} component={Menu} onEnter={checkOnlyLoggedInRedirect}/>
          <Route path={PATH.GAME} onEnter={checkOnlyLoggedInRedirect}>
            <Route path={PATH.SINGLE_PLAYER} component={SinglePlayer} />
          </Route>
        </Route>
        <Route path="*" onEnter={checkLoggedInRedirect}/>
      </Router>
    </Locale>
  </Provider>
), document.querySelector('[data-role="app"]'));