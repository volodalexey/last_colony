const action_constants = require('../constants/action_constants');

function changeLocale(locale) {
  return {type: action_constants.CHANGE_LOCALE, locale}
}

module.exports = {
  changeLocale
};