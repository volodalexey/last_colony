const action_constants = require('../constants/action_constants');

function inputUsername(username) {
  return {type: action_constants.INPUT_USERNAME, username}
}
function inputPassword(password) {
  return {type: action_constants.INPUT_PASSWORD, password}
}
function pendingCredentials(pending, invalid) {
  return {type: action_constants.PENDING_CREDENTIALS, pending, invalid}
}
function invalidCredentials(pending, invalid) {
  return {type: action_constants.INVALID_CREDENTIALS, pending, invalid}
}
function loggedInCredentials(logged_in_credentials) {
  return {type: action_constants.LOGGED_IN_CREDENTIALS, logged_in_credentials}
}

module.exports = {
  inputUsername,
  inputPassword,
  pendingCredentials,
  invalidCredentials,
  loggedInCredentials
};