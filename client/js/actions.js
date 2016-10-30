var constants = require('../json/constants.json');
module.exports = {
  init: function() {
    return {
      type: constants.INIT
    }
  }
};