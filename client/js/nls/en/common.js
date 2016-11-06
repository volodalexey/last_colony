const
  reflect = require('../reflect'),
  messages = {
    $CANVAS_NOT_SUPPORTED: `Your browser doesn't support the HTML5 CANVAS tag`,
    $SINGLE_PLAYER: `Single player`,
    $CHANGE_LOCALE: `Change locale`,
    $LOGIN: `Login`,
    $WELCOME: `Hello {name}, you have {unreadCount, number} {unreadCount, plural,
                        one {message}
                        other {messages}
                      }`
  },
  keys = reflect(messages);

module.exports = {
  messages,
  keys
};