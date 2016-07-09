var Inferno = require('inferno'),
  InfernoDOM = require('inferno-dom'),
  CreateClass = require('inferno-create-class'),
  InfernoRouter = require('./abstract_router'),
  Router = InfernoRouter.Router,
  Route = InfernoRouter.Route,
  routeTo = InfernoRouter.routeTo,
  browserHistory = InfernoRouter.browserHistory;

var Navigation = CreateClass({
  render: function() {
    return <div>HELLO FROM NAVIGATION</div>
  }
});
// <Router history={ browserHistory }>
InfernoDOM.render((
  <Router history={ browserHistory }>
    <Route path="/" component={ Navigation } />
  </Router>
), document.body);