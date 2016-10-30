const
  action_constants = require('../constants/action_constants'),
  INITIAL_STATE = {
    credentials: {
      invalid: false,
      pending: false
    },
    username: '',
    password: '',
    pending_credentials: false,
    invalid_credentials: false,
    logged_in: false
  };

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case action_constants.INPUT_USERNAME:
      state.username = action.username;
      return Object.assign({}, state);
    case action_constants.INPUT_PASSWORD:
      state.password = action.password;
      return Object.assign({}, state);
    case action_constants.PENDING_CREDENTIALS:
      state.pending_credentials = action.pending;
      return Object.assign({}, state);
    case action_constants.INVALID_CREDENTIALS:
      state.invalid_credentials = action.invalid;
      return Object.assign({}, state);
    case action_constants.LOGGED_IN_CREDENTIALS:
      state.logged_in = action.logged_in;
      return Object.assign({}, state);
    default:
      return state;
  }
};

module.exports = reducer;