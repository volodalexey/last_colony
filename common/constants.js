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
  };

module.exports = {NODE_ENV, CACHE_ENV};