const
  reflect = require('../reflect'),
  messages = {
    $CANVAS_NOT_SUPPORTED: `Ваш браузер не поддерживает HTML5 канвас тэг`,
    $SINGLE_PLAYER: `Один игрок`,
    $CHANGE_LOCALE: `Изменить локализацию`,
    $LOGIN: `Логин`,
    $WELCOME: `Привет {name}, у вас {unreadCount, number} {unreadCount, plural,
                      one {message}
                      other {messages}
                    }`
  },
  keys = reflect(messages);

module.exports = {
  messages,
  keys
};