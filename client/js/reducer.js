var constants = require('../json/constants.json');

module.exports = function(state, action) {
  switch (action.type) {
    case constants.INIT:
      return state;
      break;
    default:
      return state;
  }
};