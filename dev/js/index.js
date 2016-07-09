var Inferno = require('inferno'),
  InfernoDOM = require('inferno-dom'),
  CreateClass = require('inferno-create-class');

var Navigation = CreateClass({
  render: function() {
    return <div>HELLO FROM NAVIGATION</div>
  }
});

InfernoDOM.render(<Navigation state={{}} />, document.body);