const
  ENV_KEYS = {
    DEVELOPMENT: 'DEVELOPMENT',
    PRODUCTION: 'PRODUCTION',
    CACHE: 'CACHE'
  },
  NODE_ENV = {
    [ENV_KEYS.DEVELOPMENT]: 'development',
    [ENV_KEYS.PRODUCTION]: 'production'
  },
  CACHE_ENV = {
    [ENV_KEYS.CACHE]: 'cache'
  },
  SLASH = '/',
  LOGIN = 'login',
  MENU = 'menu',
  GAME = 'game',
  SINGLE_PLAYER = 'single_player',
  PATH = {
    LOGIN: LOGIN,
    _LOGIN: SLASH + LOGIN,
    MENU: MENU,
    _MENU: SLASH + MENU,
    GAME: GAME,
    _GAME: SLASH + GAME,
    SINGLE_PLAYER: SINGLE_PLAYER,
    _SINGLE_PLAYER: SLASH + SINGLE_PLAYER,
    GAME_SINGLE_PLAYER: GAME + SLASH + SINGLE_PLAYER,
    _GAME_SINGLE_PLAYER: SLASH + GAME + SLASH + SINGLE_PLAYER,
  };

module.exports = {
  NODE_ENV,
  CACHE_ENV,
  PATH
};