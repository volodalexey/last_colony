const
  React = require('react'),
  connect = require('react-redux').connect,
  browserHistory = require('react-router').browserHistory,
  PATH = require('../../common/constants').PATH,
  login_actions = require('../js/actions/login_actions');

let input_username, input_password;

const LoginCredentials = (props) => {
  return <div className="wrap-login-form">
    <form onSubmit={props.onSubmit} className="login-form">
      <div className="title">
        <span>Login</span>
      </div>
      <input value={props.username} placeholder="Login" onChange={props.handleChangeUsername}
             ref={node => {
               input_username = node
             }} className={props.invalid_credentials ? 'border-red' : ''}/>
      <input value={props.password} type="password" placeholder="Password" onChange={props.handleChangePassword}
             ref={node => {
               input_password = node
             }}/>
      <button type="submit" disabled={props.pending_credentials ? 'disabled' : null}>
        Login
      </button>
    </form>
  </div>
};

const mapStateToProps = (state) => {
  return {
    username: state.username,
    password: state.password,
    pending_credentials: state.pending_credentials,
    invalid_credentials: state.invalid_credentials
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (event) => {
      event.preventDefault();
      dispatch(login_actions.pendingCredentials(true, false));
      // fetch('/login/credentials',
      //   {
      //     method: 'POST',
      //     headers: {'Content-Type': 'application/json'},
      //     body: JSON.stringify({username: input_username.value, password: input_password.value})
      //   })
      //   .then(response => {
      //     if (!response.ok) {
      //       throw Error(response.json());
      //     }
      //     return response.json();
      //   })
      //   .then(result => {
      //     dispatch(login_actions.pendingCredentials(false, false));
      //     dispatch(login_actions.loggedInCredentials(true));
      //     // browserHistory.push('/code');
      //   })
      //   .catch(err => {
      //     dispatch(login_actions.pendingCredentials(false, true));
      //   });
      setTimeout(() => {
        dispatch(login_actions.pendingCredentials(false, false));
        dispatch(login_actions.loggedInCredentials(true));
        browserHistory.push(PATH.MENU);
      }, 500);
    },
    handleChangeUsername: (event) => {
      dispatch(login_actions.inputUsername(event.target.value))
    },
    handleChangePassword: (event) => {
      dispatch(login_actions.inputPassword(event.target.value))
    }
  }
};

const WrappedLoginCredentials = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginCredentials);

module.exports = WrappedLoginCredentials;