webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	const PATH = __webpack_require__(3).PATH,
	      React = __webpack_require__(4),
	      ReactDOM = __webpack_require__(37),
	      ReactRouter = __webpack_require__(175),
	      Router = ReactRouter.Router,
	      Route = ReactRouter.Route,
	      createStore = __webpack_require__(231).createStore,
	      Provider = __webpack_require__(246).Provider,
	      Less = __webpack_require__(259),
	      reducer = __webpack_require__(261),

	// components
	Locale = __webpack_require__(263),
	      LoginCredentials = __webpack_require__(291),
	      SinglePlayer = __webpack_require__(293),
	      Menu = __webpack_require__(294);

	let store = createStore(reducer);

	const checkOnlyLoggedInRedirect = (nextState, replace) => {
	  let state = store.getState();
	  if (!state.logged_in_credentials) {
	    replace(PATH._LOGIN);
	  }
	},
	      checkLoggedInRedirect = (nextState, replace) => {
	  let state = store.getState();
	  if (state.logged_in_credentials) {
	    replace(PATH._MENU);
	  } else {
	    replace(PATH._LOGIN);
	  }
	};

	ReactDOM.render(React.createElement(
	  Provider,
	  { store: store },
	  React.createElement(
	    Locale,
	    null,
	    React.createElement(
	      Router,
	      { history: ReactRouter.browserHistory },
	      React.createElement(Route, { path: '/', onEnter: checkLoggedInRedirect }),
	      React.createElement(
	        Route,
	        { path: '/' },
	        React.createElement(Route, { path: PATH.LOGIN, component: LoginCredentials }),
	        React.createElement(Route, { path: PATH.MENU, component: Menu, onEnter: checkOnlyLoggedInRedirect }),
	        React.createElement(
	          Route,
	          { path: PATH.GAME, onEnter: checkOnlyLoggedInRedirect },
	          React.createElement(Route, { path: PATH.SINGLE_PLAYER, component: SinglePlayer })
	        )
	      ),
	      React.createElement(Route, { path: '*', onEnter: checkLoggedInRedirect })
	    )
	  )
	), document.querySelector('[data-role="app"]'));

/***/ },

/***/ 3:
/***/ function(module, exports) {

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
	  },
	  LOCALE = {
	    EN: 'en',
	    RU: 'ru'
	  };

	module.exports = {
	  NODE_ENV,
	  CACHE_ENV,
	  PATH,
	  LOCALE
	};

/***/ },

/***/ 259:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 261:
/***/ function(module, exports, __webpack_require__) {

	const
	  LOCALE = __webpack_require__(3).LOCALE,
	  action_constants = __webpack_require__(262),
	  INITIAL_STATE = {
	    locale: LOCALE.EN,
	    username: '',
	    password: '',
	    pending_credentials: false,
	    invalid_credentials: false,
	    logged_in_credentials: false
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
	      state.logged_in_credentials = action.logged_in_credentials;
	      return Object.assign({}, state);

	    case action_constants.CHANGE_LOCALE:
	      state.locale = action.locale;
	      return Object.assign({}, state);
	    default:
	      return state;
	  }
	};

	module.exports = reducer;

/***/ },

/***/ 262:
/***/ function(module, exports) {

	const
	  INPUT_USERNAME = 'INPUT_USERNAME',
	  INPUT_PASSWORD = 'INPUT_PASSWORD',
	  PENDING_CREDENTIALS = 'PENDING_CREDENTIALS',
	  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
	  LOGGED_IN_CREDENTIALS = 'LOGGED_IN_CREDENTIALS',
	  CHANGE_LOCALE = 'CHANGE_LOCALE';

	module.exports = {
	  INPUT_USERNAME,
	  INPUT_PASSWORD,
	  PENDING_CREDENTIALS,
	  INVALID_CREDENTIALS,
	  LOGGED_IN_CREDENTIALS,
	  CHANGE_LOCALE
	};

/***/ },

/***/ 263:
/***/ function(module, exports, __webpack_require__) {

	const LOCALE = __webpack_require__(3).LOCALE,
	      React = __webpack_require__(4),
	      connect = __webpack_require__(246).connect,
	      ReactIntl = __webpack_require__(264),
	      IntlProvider = ReactIntl.IntlProvider,
	      addLocaleData = ReactIntl.addLocaleData,
	      en = __webpack_require__(287),
	      ru = __webpack_require__(288),
	      en_messages = __webpack_require__(289).messages,
	      ru_messages = __webpack_require__(290).messages,
	      messages_dic = {
	  [LOCALE.EN]: en_messages,
	  [LOCALE.RU]: ru_messages
	};

	addLocaleData([...en, ...ru]);

	const Locale = props => {
	  return React.createElement(
	    IntlProvider,
	    { locale: props.locale, messages: props.messages },
	    props.children
	  );
	};

	const mapStateToProps = state => {
	  return {
	    locale: state.locale,
	    messages: messages_dic[state.locale]
	  };
	};

	const mapDispatchToProps = dispatch => {
	  return {};
	};

	const WrappedMenu = connect(mapStateToProps, mapDispatchToProps)(Locale);

	module.exports = WrappedMenu;

/***/ },

/***/ 264:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*
	 * Copyright 2016, Yahoo Inc.
	 * Copyrights licensed under the New BSD License.
	 * See the accompanying LICENSE file for terms.
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', { value: true });

	function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

	var allLocaleData = _interopDefault(__webpack_require__(265));
	var IntlMessageFormat = _interopDefault(__webpack_require__(266));
	var IntlRelativeFormat = _interopDefault(__webpack_require__(276));
	var React = __webpack_require__(4);
	var React__default = _interopDefault(React);
	var invariant = _interopDefault(__webpack_require__(283));
	var memoizeIntlConstructor = _interopDefault(__webpack_require__(284));

	// GENERATED FILE
	var defaultLocaleData = { "locale": "en", "pluralRuleFunction": function pluralRuleFunction(n, ord) {
	    var s = String(n).split("."),
	        v0 = !s[1],
	        t0 = Number(s[0]) == n,
	        n10 = t0 && s[0].slice(-1),
	        n100 = t0 && s[0].slice(-2);if (ord) return n10 == 1 && n100 != 11 ? "one" : n10 == 2 && n100 != 12 ? "two" : n10 == 3 && n100 != 13 ? "few" : "other";return n == 1 && v0 ? "one" : "other";
	  }, "fields": { "year": { "displayName": "year", "relative": { "0": "this year", "1": "next year", "-1": "last year" }, "relativeTime": { "future": { "one": "in {0} year", "other": "in {0} years" }, "past": { "one": "{0} year ago", "other": "{0} years ago" } } }, "month": { "displayName": "month", "relative": { "0": "this month", "1": "next month", "-1": "last month" }, "relativeTime": { "future": { "one": "in {0} month", "other": "in {0} months" }, "past": { "one": "{0} month ago", "other": "{0} months ago" } } }, "day": { "displayName": "day", "relative": { "0": "today", "1": "tomorrow", "-1": "yesterday" }, "relativeTime": { "future": { "one": "in {0} day", "other": "in {0} days" }, "past": { "one": "{0} day ago", "other": "{0} days ago" } } }, "hour": { "displayName": "hour", "relativeTime": { "future": { "one": "in {0} hour", "other": "in {0} hours" }, "past": { "one": "{0} hour ago", "other": "{0} hours ago" } } }, "minute": { "displayName": "minute", "relativeTime": { "future": { "one": "in {0} minute", "other": "in {0} minutes" }, "past": { "one": "{0} minute ago", "other": "{0} minutes ago" } } }, "second": { "displayName": "second", "relative": { "0": "now" }, "relativeTime": { "future": { "one": "in {0} second", "other": "in {0} seconds" }, "past": { "one": "{0} second ago", "other": "{0} seconds ago" } } } } };

	/*
	 * Copyright 2015, Yahoo Inc.
	 * Copyrights licensed under the New BSD License.
	 * See the accompanying LICENSE file for terms.
	 */

	function addLocaleData() {
	    var data = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

	    var locales = Array.isArray(data) ? data : [data];

	    locales.forEach(function (localeData) {
	        if (localeData && localeData.locale) {
	            IntlMessageFormat.__addLocaleData(localeData);
	            IntlRelativeFormat.__addLocaleData(localeData);
	        }
	    });
	}

	function hasLocaleData(locale) {
	    var localeParts = (locale || '').split('-');

	    while (localeParts.length > 0) {
	        if (hasIMFAndIRFLocaleData(localeParts.join('-'))) {
	            return true;
	        }

	        localeParts.pop();
	    }

	    return false;
	}

	function hasIMFAndIRFLocaleData(locale) {
	    var normalizedLocale = locale && locale.toLowerCase();

	    return !!(IntlMessageFormat.__localeData__[normalizedLocale] && IntlRelativeFormat.__localeData__[normalizedLocale]);
	}

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	  return typeof obj;
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
	};

	var jsx = function () {
	  var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7;
	  return function createRawReactElement(type, props, key, children) {
	    var defaultProps = type && type.defaultProps;
	    var childrenLength = arguments.length - 3;

	    if (!props && childrenLength !== 0) {
	      props = {};
	    }

	    if (props && defaultProps) {
	      for (var propName in defaultProps) {
	        if (props[propName] === void 0) {
	          props[propName] = defaultProps[propName];
	        }
	      }
	    } else if (!props) {
	      props = defaultProps || {};
	    }

	    if (childrenLength === 1) {
	      props.children = children;
	    } else if (childrenLength > 1) {
	      var childArray = Array(childrenLength);

	      for (var i = 0; i < childrenLength; i++) {
	        childArray[i] = arguments[i + 3];
	      }

	      props.children = childArray;
	    }

	    return {
	      $$typeof: REACT_ELEMENT_TYPE,
	      type: type,
	      key: key === undefined ? null : '' + key,
	      ref: null,
	      props: props,
	      _owner: null
	    };
	  };
	}();

	var asyncToGenerator = function (fn) {
	  return function () {
	    var gen = fn.apply(this, arguments);
	    return new Promise(function (resolve, reject) {
	      function step(key, arg) {
	        try {
	          var info = gen[key](arg);
	          var value = info.value;
	        } catch (error) {
	          reject(error);
	          return;
	        }

	        if (info.done) {
	          resolve(value);
	        } else {
	          return Promise.resolve(value).then(function (value) {
	            return step("next", value);
	          }, function (err) {
	            return step("throw", err);
	          });
	        }
	      }

	      return step("next");
	    });
	  };
	};

	var classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	var createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

	var defineEnumerableProperties = function (obj, descs) {
	  for (var key in descs) {
	    var desc = descs[key];
	    desc.configurable = desc.enumerable = true;
	    if ("value" in desc) desc.writable = true;
	    Object.defineProperty(obj, key, desc);
	  }

	  return obj;
	};

	var defaults = function (obj, defaults) {
	  var keys = Object.getOwnPropertyNames(defaults);

	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    var value = Object.getOwnPropertyDescriptor(defaults, key);

	    if (value && value.configurable && obj[key] === undefined) {
	      Object.defineProperty(obj, key, value);
	    }
	  }

	  return obj;
	};

	var defineProperty = function (obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

	var get = function get(object, property, receiver) {
	  if (object === null) object = Function.prototype;
	  var desc = Object.getOwnPropertyDescriptor(object, property);

	  if (desc === undefined) {
	    var parent = Object.getPrototypeOf(object);

	    if (parent === null) {
	      return undefined;
	    } else {
	      return get(parent, property, receiver);
	    }
	  } else if ("value" in desc) {
	    return desc.value;
	  } else {
	    var getter = desc.get;

	    if (getter === undefined) {
	      return undefined;
	    }

	    return getter.call(receiver);
	  }
	};

	var inherits = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	};

	var _instanceof = function (left, right) {
	  if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
	    return right[Symbol.hasInstance](left);
	  } else {
	    return left instanceof right;
	  }
	};

	var interopRequireDefault = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	};

	var interopRequireWildcard = function (obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};

	    if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }

	    newObj.default = obj;
	    return newObj;
	  }
	};

	var newArrowCheck = function (innerThis, boundThis) {
	  if (innerThis !== boundThis) {
	    throw new TypeError("Cannot instantiate an arrow function");
	  }
	};

	var objectDestructuringEmpty = function (obj) {
	  if (obj == null) throw new TypeError("Cannot destructure undefined");
	};

	var objectWithoutProperties = function (obj, keys) {
	  var target = {};

	  for (var i in obj) {
	    if (keys.indexOf(i) >= 0) continue;
	    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	    target[i] = obj[i];
	  }

	  return target;
	};

	var possibleConstructorReturn = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && (typeof call === "object" || typeof call === "function") ? call : self;
	};

	var selfGlobal = typeof global === "undefined" ? self : global;

	var set = function set(object, property, value, receiver) {
	  var desc = Object.getOwnPropertyDescriptor(object, property);

	  if (desc === undefined) {
	    var parent = Object.getPrototypeOf(object);

	    if (parent !== null) {
	      set(parent, property, value, receiver);
	    }
	  } else if ("value" in desc && desc.writable) {
	    desc.value = value;
	  } else {
	    var setter = desc.set;

	    if (setter !== undefined) {
	      setter.call(receiver, value);
	    }
	  }

	  return value;
	};

	var slicedToArray = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;

	    try {
	      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);

	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }

	    return _arr;
	  }

	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if (Symbol.iterator in Object(arr)) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();

	var slicedToArrayLoose = function (arr, i) {
	  if (Array.isArray(arr)) {
	    return arr;
	  } else if (Symbol.iterator in Object(arr)) {
	    var _arr = [];

	    for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
	      _arr.push(_step.value);

	      if (i && _arr.length === i) break;
	    }

	    return _arr;
	  } else {
	    throw new TypeError("Invalid attempt to destructure non-iterable instance");
	  }
	};

	var taggedTemplateLiteral = function (strings, raw) {
	  return Object.freeze(Object.defineProperties(strings, {
	    raw: {
	      value: Object.freeze(raw)
	    }
	  }));
	};

	var taggedTemplateLiteralLoose = function (strings, raw) {
	  strings.raw = raw;
	  return strings;
	};

	var temporalRef = function (val, name, undef) {
	  if (val === undef) {
	    throw new ReferenceError(name + " is not defined - temporal dead zone");
	  } else {
	    return val;
	  }
	};

	var temporalUndefined = {};

	var toArray = function (arr) {
	  return Array.isArray(arr) ? arr : Array.from(arr);
	};

	var toConsumableArray = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

	    return arr2;
	  } else {
	    return Array.from(arr);
	  }
	};



	var babelHelpers$1 = Object.freeze({
	  jsx: jsx,
	  asyncToGenerator: asyncToGenerator,
	  classCallCheck: classCallCheck,
	  createClass: createClass,
	  defineEnumerableProperties: defineEnumerableProperties,
	  defaults: defaults,
	  defineProperty: defineProperty,
	  get: get,
	  inherits: inherits,
	  interopRequireDefault: interopRequireDefault,
	  interopRequireWildcard: interopRequireWildcard,
	  newArrowCheck: newArrowCheck,
	  objectDestructuringEmpty: objectDestructuringEmpty,
	  objectWithoutProperties: objectWithoutProperties,
	  possibleConstructorReturn: possibleConstructorReturn,
	  selfGlobal: selfGlobal,
	  set: set,
	  slicedToArray: slicedToArray,
	  slicedToArrayLoose: slicedToArrayLoose,
	  taggedTemplateLiteral: taggedTemplateLiteral,
	  taggedTemplateLiteralLoose: taggedTemplateLiteralLoose,
	  temporalRef: temporalRef,
	  temporalUndefined: temporalUndefined,
	  toArray: toArray,
	  toConsumableArray: toConsumableArray,
	  typeof: _typeof,
	  extends: _extends,
	  instanceof: _instanceof
	});

	/*
	 * Copyright 2015, Yahoo Inc.
	 * Copyrights licensed under the New BSD License.
	 * See the accompanying LICENSE file for terms.
	 */

	var bool = React.PropTypes.bool;
	var number = React.PropTypes.number;
	var string = React.PropTypes.string;
	var func = React.PropTypes.func;
	var object = React.PropTypes.object;
	var oneOf = React.PropTypes.oneOf;
	var shape = React.PropTypes.shape;


	var intlConfigPropTypes = {
	    locale: string,
	    formats: object,
	    messages: object,

	    defaultLocale: string,
	    defaultFormats: object
	};

	var intlFormatPropTypes = {
	    formatDate: func.isRequired,
	    formatTime: func.isRequired,
	    formatRelative: func.isRequired,
	    formatNumber: func.isRequired,
	    formatPlural: func.isRequired,
	    formatMessage: func.isRequired,
	    formatHTMLMessage: func.isRequired
	};

	var intlShape = shape(babelHelpers$1['extends']({}, intlConfigPropTypes, intlFormatPropTypes, {
	    formatters: object,
	    now: func.isRequired
	}));

	var messageDescriptorPropTypes = {
	    id: string.isRequired,
	    description: string,
	    defaultMessage: string
	};

	var dateTimeFormatPropTypes = {
	    localeMatcher: oneOf(['best fit', 'lookup']),
	    formatMatcher: oneOf(['basic', 'best fit']),

	    timeZone: string,
	    hour12: bool,

	    weekday: oneOf(['narrow', 'short', 'long']),
	    era: oneOf(['narrow', 'short', 'long']),
	    year: oneOf(['numeric', '2-digit']),
	    month: oneOf(['numeric', '2-digit', 'narrow', 'short', 'long']),
	    day: oneOf(['numeric', '2-digit']),
	    hour: oneOf(['numeric', '2-digit']),
	    minute: oneOf(['numeric', '2-digit']),
	    second: oneOf(['numeric', '2-digit']),
	    timeZoneName: oneOf(['short', 'long'])
	};

	var numberFormatPropTypes = {
	    localeMatcher: oneOf(['best fit', 'lookup']),

	    style: oneOf(['decimal', 'currency', 'percent']),
	    currency: string,
	    currencyDisplay: oneOf(['symbol', 'code', 'name']),
	    useGrouping: bool,

	    minimumIntegerDigits: number,
	    minimumFractionDigits: number,
	    maximumFractionDigits: number,
	    minimumSignificantDigits: number,
	    maximumSignificantDigits: number
	};

	var relativeFormatPropTypes = {
	    style: oneOf(['best fit', 'numeric']),
	    units: oneOf(['second', 'minute', 'hour', 'day', 'month', 'year'])
	};

	var pluralFormatPropTypes = {
	    style: oneOf(['cardinal', 'ordinal'])
	};

	/*
	HTML escaping and shallow-equals implementations are the same as React's
	(on purpose.) Therefore, it has the following Copyright and Licensing:

	Copyright 2013-2014, Facebook, Inc.
	All rights reserved.

	This source code is licensed under the BSD-style license found in the LICENSE
	file in the root directory of React's source tree.
	*/

	var intlConfigPropNames = Object.keys(intlConfigPropTypes);

	var ESCAPED_CHARS = {
	    '&': '&amp;',
	    '>': '&gt;',
	    '<': '&lt;',
	    '"': '&quot;',
	    '\'': '&#x27;'
	};

	var UNSAFE_CHARS_REGEX = /[&><"']/g;

	function escape(str) {
	    return ('' + str).replace(UNSAFE_CHARS_REGEX, function (match) {
	        return ESCAPED_CHARS[match];
	    });
	}

	function filterProps(props, whitelist) {
	    var defaults = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	    return whitelist.reduce(function (filtered, name) {
	        if (props.hasOwnProperty(name)) {
	            filtered[name] = props[name];
	        } else if (defaults.hasOwnProperty(name)) {
	            filtered[name] = defaults[name];
	        }

	        return filtered;
	    }, {});
	}

	function invariantIntlContext() {
	    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var intl = _ref.intl;

	    invariant(intl, '[React Intl] Could not find required `intl` object. ' + '<IntlProvider> needs to exist in the component ancestry.');
	}

	function shallowEquals(objA, objB) {
	    if (objA === objB) {
	        return true;
	    }

	    if ((typeof objA === 'undefined' ? 'undefined' : babelHelpers$1['typeof'](objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : babelHelpers$1['typeof'](objB)) !== 'object' || objB === null) {
	        return false;
	    }

	    var keysA = Object.keys(objA);
	    var keysB = Object.keys(objB);

	    if (keysA.length !== keysB.length) {
	        return false;
	    }

	    // Test for A's keys different from B.
	    var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
	    for (var i = 0; i < keysA.length; i++) {
	        if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
	            return false;
	        }
	    }

	    return true;
	}

	function shouldIntlComponentUpdate(_ref2, nextProps, nextState) {
	    var props = _ref2.props;
	    var state = _ref2.state;
	    var _ref2$context = _ref2.context;
	    var context = _ref2$context === undefined ? {} : _ref2$context;
	    var nextContext = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	    var _context$intl = context.intl;
	    var intl = _context$intl === undefined ? {} : _context$intl;
	    var _nextContext$intl = nextContext.intl;
	    var nextIntl = _nextContext$intl === undefined ? {} : _nextContext$intl;


	    return !shallowEquals(nextProps, props) || !shallowEquals(nextState, state) || !(nextIntl === intl || shallowEquals(filterProps(nextIntl, intlConfigPropNames), filterProps(intl, intlConfigPropNames)));
	}

	/*
	 * Copyright 2015, Yahoo Inc.
	 * Copyrights licensed under the New BSD License.
	 * See the accompanying LICENSE file for terms.
	 */

	// Inspired by react-redux's `connect()` HOC factory function implementation:
	// https://github.com/rackt/react-redux

	function getDisplayName(Component) {
	    return Component.displayName || Component.name || 'Component';
	}

	function injectIntl(WrappedComponent) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	    var _options$intlPropName = options.intlPropName;
	    var intlPropName = _options$intlPropName === undefined ? 'intl' : _options$intlPropName;
	    var _options$withRef = options.withRef;
	    var withRef = _options$withRef === undefined ? false : _options$withRef;

	    var InjectIntl = function (_Component) {
	        inherits(InjectIntl, _Component);

	        function InjectIntl(props, context) {
	            classCallCheck(this, InjectIntl);

	            var _this = possibleConstructorReturn(this, (InjectIntl.__proto__ || Object.getPrototypeOf(InjectIntl)).call(this, props, context));

	            invariantIntlContext(context);
	            return _this;
	        }

	        createClass(InjectIntl, [{
	            key: 'getWrappedInstance',
	            value: function getWrappedInstance() {
	                invariant(withRef, '[React Intl] To access the wrapped instance, ' + 'the `{withRef: true}` option must be set when calling: ' + '`injectIntl()`');

	                return this.refs.wrappedInstance;
	            }
	        }, {
	            key: 'render',
	            value: function render() {
	                return React__default.createElement(WrappedComponent, babelHelpers$1['extends']({}, this.props, defineProperty({}, intlPropName, this.context.intl), {
	                    ref: withRef ? 'wrappedInstance' : null
	                }));
	            }
	        }]);
	        return InjectIntl;
	    }(React.Component);

	    InjectIntl.displayName = 'InjectIntl(' + getDisplayName(WrappedComponent) + ')';

	    InjectIntl.contextTypes = {
	        intl: intlShape
	    };

	    InjectIntl.WrappedComponent = WrappedComponent;

	    return InjectIntl;
	}

	/*
	 * Copyright 2015, Yahoo Inc.
	 * Copyrights licensed under the New BSD License.
	 * See the accompanying LICENSE file for terms.
	 */

	function defineMessages(messageDescriptors) {
	  // This simply returns what's passed-in because it's meant to be a hook for
	  // babel-plugin-react-intl.
	  return messageDescriptors;
	}

	/*
	 * Copyright 2015, Yahoo Inc.
	 * Copyrights licensed under the New BSD License.
	 * See the accompanying LICENSE file for terms.
	 */

	// This is a "hack" until a proper `intl-pluralformat` package is created.

	function resolveLocale(locales) {
	    // IntlMessageFormat#_resolveLocale() does not depend on `this`.
	    return IntlMessageFormat.prototype._resolveLocale(locales);
	}

	function findPluralFunction(locale) {
	    // IntlMessageFormat#_findPluralFunction() does not depend on `this`.
	    return IntlMessageFormat.prototype._findPluralRuleFunction(locale);
	}

	var IntlPluralFormat = function IntlPluralFormat(locales) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	    classCallCheck(this, IntlPluralFormat);

	    var useOrdinal = options.style === 'ordinal';
	    var pluralFn = findPluralFunction(resolveLocale(locales));

	    this.format = function (value) {
	        return pluralFn(value, useOrdinal);
	    };
	};

	/*
	 * Copyright 2015, Yahoo Inc.
	 * Copyrights licensed under the New BSD License.
	 * See the accompanying LICENSE file for terms.
	 */

	var DATE_TIME_FORMAT_OPTIONS = Object.keys(dateTimeFormatPropTypes);
	var NUMBER_FORMAT_OPTIONS = Object.keys(numberFormatPropTypes);
	var RELATIVE_FORMAT_OPTIONS = Object.keys(relativeFormatPropTypes);
	var PLURAL_FORMAT_OPTIONS = Object.keys(pluralFormatPropTypes);

	var RELATIVE_FORMAT_THRESHOLDS = {
	    second: 60, // seconds to minute
	    minute: 60, // minutes to hour
	    hour: 24, // hours to day
	    day: 30, // days to month
	    month: 12 };

	function updateRelativeFormatThresholds(newThresholds) {
	    var thresholds = IntlRelativeFormat.thresholds;
	    thresholds.second = newThresholds.second;
	    thresholds.minute = newThresholds.minute;
	    thresholds.hour = newThresholds.hour;
	    thresholds.day = newThresholds.day;
	    thresholds.month = newThresholds.month;
	}

	function getNamedFormat(formats, type, name) {
	    var format = formats && formats[type] && formats[type][name];
	    if (format) {
	        return format;
	    }

	    if (true) {
	        console.error('[React Intl] No ' + type + ' format named: ' + name);
	    }
	}

	function formatDate(config, state, value) {
	    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	    var locale = config.locale;
	    var formats = config.formats;
	    var format = options.format;


	    var date = new Date(value);
	    var defaults = format && getNamedFormat(formats, 'date', format);
	    var filteredOptions = filterProps(options, DATE_TIME_FORMAT_OPTIONS, defaults);

	    try {
	        return state.getDateTimeFormat(locale, filteredOptions).format(date);
	    } catch (e) {
	        if (true) {
	            console.error('[React Intl] Error formatting date.\n' + e);
	        }
	    }

	    return String(date);
	}

	function formatTime(config, state, value) {
	    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	    var locale = config.locale;
	    var formats = config.formats;
	    var format = options.format;


	    var date = new Date(value);
	    var defaults = format && getNamedFormat(formats, 'time', format);
	    var filteredOptions = filterProps(options, DATE_TIME_FORMAT_OPTIONS, defaults);

	    if (!filteredOptions.hour && !filteredOptions.minute && !filteredOptions.second) {
	        // Add default formatting options if hour, minute, or second isn't defined.
	        filteredOptions = babelHelpers$1['extends']({}, filteredOptions, { hour: 'numeric', minute: 'numeric' });
	    }

	    try {
	        return state.getDateTimeFormat(locale, filteredOptions).format(date);
	    } catch (e) {
	        if (true) {
	            console.error('[React Intl] Error formatting time.\n' + e);
	        }
	    }

	    return String(date);
	}

	function formatRelative(config, state, value) {
	    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	    var locale = config.locale;
	    var formats = config.formats;
	    var format = options.format;


	    var date = new Date(value);
	    var now = new Date(options.now);
	    var defaults = format && getNamedFormat(formats, 'relative', format);
	    var filteredOptions = filterProps(options, RELATIVE_FORMAT_OPTIONS, defaults);

	    // Capture the current threshold values, then temporarily override them with
	    // specific values just for this render.
	    var oldThresholds = babelHelpers$1['extends']({}, IntlRelativeFormat.thresholds);
	    updateRelativeFormatThresholds(RELATIVE_FORMAT_THRESHOLDS);

	    try {
	        return state.getRelativeFormat(locale, filteredOptions).format(date, {
	            now: isFinite(now) ? now : state.now()
	        });
	    } catch (e) {
	        if (true) {
	            console.error('[React Intl] Error formatting relative time.\n' + e);
	        }
	    } finally {
	        updateRelativeFormatThresholds(oldThresholds);
	    }

	    return String(date);
	}

	function formatNumber(config, state, value) {
	    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	    var locale = config.locale;
	    var formats = config.formats;
	    var format = options.format;


	    var defaults = format && getNamedFormat(formats, 'number', format);
	    var filteredOptions = filterProps(options, NUMBER_FORMAT_OPTIONS, defaults);

	    try {
	        return state.getNumberFormat(locale, filteredOptions).format(value);
	    } catch (e) {
	        if (true) {
	            console.error('[React Intl] Error formatting number.\n' + e);
	        }
	    }

	    return String(value);
	}

	function formatPlural(config, state, value) {
	    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	    var locale = config.locale;


	    var filteredOptions = filterProps(options, PLURAL_FORMAT_OPTIONS);

	    try {
	        return state.getPluralFormat(locale, filteredOptions).format(value);
	    } catch (e) {
	        if (true) {
	            console.error('[React Intl] Error formatting plural.\n' + e);
	        }
	    }

	    return 'other';
	}

	function formatMessage(config, state) {
	    var messageDescriptor = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	    var values = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	    var locale = config.locale;
	    var formats = config.formats;
	    var messages = config.messages;
	    var defaultLocale = config.defaultLocale;
	    var defaultFormats = config.defaultFormats;
	    var id = messageDescriptor.id;
	    var defaultMessage = messageDescriptor.defaultMessage;

	    // `id` is a required field of a Message Descriptor.

	    invariant(id, '[React Intl] An `id` must be provided to format a message.');

	    var message = messages && messages[id];
	    var hasValues = Object.keys(values).length > 0;

	    // Avoid expensive message formatting for simple messages without values. In
	    // development messages will always be formatted in case of missing values.
	    if (!hasValues && ("development") === 'production') {
	        return message || defaultMessage || id;
	    }

	    var formattedMessage = void 0;

	    if (message) {
	        try {
	            var formatter = state.getMessageFormat(message, locale, formats);

	            formattedMessage = formatter.format(values);
	        } catch (e) {
	            if (true) {
	                console.error('[React Intl] Error formatting message: "' + id + '" for locale: "' + locale + '"' + (defaultMessage ? ', using default message as fallback.' : '') + ('\n' + e));
	            }
	        }
	    } else {
	        if (true) {
	            // This prevents warnings from littering the console in development
	            // when no `messages` are passed into the <IntlProvider> for the
	            // default locale, and a default message is in the source.
	            if (!defaultMessage || locale && locale.toLowerCase() !== defaultLocale.toLowerCase()) {

	                console.error('[React Intl] Missing message: "' + id + '" for locale: "' + locale + '"' + (defaultMessage ? ', using default message as fallback.' : ''));
	            }
	        }
	    }

	    if (!formattedMessage && defaultMessage) {
	        try {
	            var _formatter = state.getMessageFormat(defaultMessage, defaultLocale, defaultFormats);

	            formattedMessage = _formatter.format(values);
	        } catch (e) {
	            if (true) {
	                console.error('[React Intl] Error formatting the default message for: "' + id + '"' + ('\n' + e));
	            }
	        }
	    }

	    if (!formattedMessage) {
	        if (true) {
	            console.error('[React Intl] Cannot format message: "' + id + '", ' + ('using message ' + (message || defaultMessage ? 'source' : 'id') + ' as fallback.'));
	        }
	    }

	    return formattedMessage || message || defaultMessage || id;
	}

	function formatHTMLMessage(config, state, messageDescriptor) {
	    var rawValues = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	    // Process all the values before they are used when formatting the ICU
	    // Message string. Since the formatted message might be injected via
	    // `innerHTML`, all String-based values need to be HTML-escaped.
	    var escapedValues = Object.keys(rawValues).reduce(function (escaped, name) {
	        var value = rawValues[name];
	        escaped[name] = typeof value === 'string' ? escape(value) : value;
	        return escaped;
	    }, {});

	    return formatMessage(config, state, messageDescriptor, escapedValues);
	}



	var format = Object.freeze({
	    formatDate: formatDate,
	    formatTime: formatTime,
	    formatRelative: formatRelative,
	    formatNumber: formatNumber,
	    formatPlural: formatPlural,
	    formatMessage: formatMessage,
	    formatHTMLMessage: formatHTMLMessage
	});

	/*
	 * Copyright 2015, Yahoo Inc.
	 * Copyrights licensed under the New BSD License.
	 * See the accompanying LICENSE file for terms.
	 */

	var intlConfigPropNames$1 = Object.keys(intlConfigPropTypes);
	var intlFormatPropNames = Object.keys(intlFormatPropTypes);

	// These are not a static property on the `IntlProvider` class so the intl
	// config values can be inherited from an <IntlProvider> ancestor.
	var defaultProps = {
	    formats: {},
	    messages: {},

	    defaultLocale: 'en',
	    defaultFormats: {}
	};

	var IntlProvider = function (_Component) {
	    inherits(IntlProvider, _Component);

	    function IntlProvider(props, context) {
	        classCallCheck(this, IntlProvider);

	        var _this = possibleConstructorReturn(this, (IntlProvider.__proto__ || Object.getPrototypeOf(IntlProvider)).call(this, props, context));

	        invariant(typeof Intl !== 'undefined', '[React Intl] The `Intl` APIs must be available in the runtime, ' + 'and do not appear to be built-in. An `Intl` polyfill should be loaded.\n' + 'See: http://formatjs.io/guides/runtime-environments/');

	        var intlContext = context.intl;

	        // Used to stabilize time when performing an initial rendering so that
	        // all relative times use the same reference "now" time.

	        var initialNow = void 0;
	        if (isFinite(props.initialNow)) {
	            initialNow = Number(props.initialNow);
	        } else {
	            // When an `initialNow` isn't provided via `props`, look to see an
	            // <IntlProvider> exists in the ancestry and call its `now()`
	            // function to propagate its value for "now".
	            initialNow = intlContext ? intlContext.now() : Date.now();
	        }

	        // Creating `Intl*` formatters is expensive. If there's a parent
	        // `<IntlProvider>`, then its formatters will be used. Otherwise, this
	        // memoize the `Intl*` constructors and cache them for the lifecycle of
	        // this IntlProvider instance.

	        var _ref = intlContext || {};

	        var _ref$formatters = _ref.formatters;
	        var formatters = _ref$formatters === undefined ? {
	            getDateTimeFormat: memoizeIntlConstructor(Intl.DateTimeFormat),
	            getNumberFormat: memoizeIntlConstructor(Intl.NumberFormat),
	            getMessageFormat: memoizeIntlConstructor(IntlMessageFormat),
	            getRelativeFormat: memoizeIntlConstructor(IntlRelativeFormat),
	            getPluralFormat: memoizeIntlConstructor(IntlPluralFormat)
	        } : _ref$formatters;


	        _this.state = babelHelpers$1['extends']({}, formatters, {

	            // Wrapper to provide stable "now" time for initial render.
	            now: function now() {
	                return _this._didDisplay ? Date.now() : initialNow;
	            }
	        });
	        return _this;
	    }

	    createClass(IntlProvider, [{
	        key: 'getConfig',
	        value: function getConfig() {
	            var intlContext = this.context.intl;

	            // Build a whitelisted config object from `props`, defaults, and
	            // `context.intl`, if an <IntlProvider> exists in the ancestry.

	            var config = filterProps(this.props, intlConfigPropNames$1, intlContext);

	            // Apply default props. This must be applied last after the props have
	            // been resolved and inherited from any <IntlProvider> in the ancestry.
	            // This matches how React resolves `defaultProps`.
	            for (var propName in defaultProps) {
	                if (config[propName] === undefined) {
	                    config[propName] = defaultProps[propName];
	                }
	            }

	            if (!hasLocaleData(config.locale)) {
	                var _config = config;
	                var locale = _config.locale;
	                var defaultLocale = _config.defaultLocale;
	                var defaultFormats = _config.defaultFormats;


	                if (true) {
	                    console.error('[React Intl] Missing locale data for locale: "' + locale + '". ' + ('Using default locale: "' + defaultLocale + '" as fallback.'));
	                }

	                // Since there's no registered locale data for `locale`, this will
	                // fallback to the `defaultLocale` to make sure things can render.
	                // The `messages` are overridden to the `defaultProps` empty object
	                // to maintain referential equality across re-renders. It's assumed
	                // each <FormattedMessage> contains a `defaultMessage` prop.
	                config = babelHelpers$1['extends']({}, config, {
	                    locale: defaultLocale,
	                    formats: defaultFormats,
	                    messages: defaultProps.messages
	                });
	            }

	            return config;
	        }
	    }, {
	        key: 'getBoundFormatFns',
	        value: function getBoundFormatFns(config, state) {
	            return intlFormatPropNames.reduce(function (boundFormatFns, name) {
	                boundFormatFns[name] = format[name].bind(null, config, state);
	                return boundFormatFns;
	            }, {});
	        }
	    }, {
	        key: 'getChildContext',
	        value: function getChildContext() {
	            var config = this.getConfig();

	            // Bind intl factories and current config to the format functions.
	            var boundFormatFns = this.getBoundFormatFns(config, this.state);

	            var _state = this.state;
	            var now = _state.now;
	            var formatters = objectWithoutProperties(_state, ['now']);


	            return {
	                intl: babelHelpers$1['extends']({}, config, boundFormatFns, {
	                    formatters: formatters,
	                    now: now
	                })
	            };
	        }
	    }, {
	        key: 'shouldComponentUpdate',
	        value: function shouldComponentUpdate() {
	            for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
	                next[_key] = arguments[_key];
	            }

	            return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this._didDisplay = true;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.Children.only(this.props.children);
	        }
	    }]);
	    return IntlProvider;
	}(React.Component);

	IntlProvider.displayName = 'IntlProvider';

	IntlProvider.contextTypes = {
	    intl: intlShape
	};

	IntlProvider.childContextTypes = {
	    intl: intlShape.isRequired
	};

	IntlProvider.propTypes = babelHelpers$1['extends']({}, intlConfigPropTypes, {
	    children: React.PropTypes.element.isRequired,
	    initialNow: React.PropTypes.any
	});

	/*
	 * Copyright 2015, Yahoo Inc.
	 * Copyrights licensed under the New BSD License.
	 * See the accompanying LICENSE file for terms.
	 */

	var FormattedDate = function (_Component) {
	    inherits(FormattedDate, _Component);

	    function FormattedDate(props, context) {
	        classCallCheck(this, FormattedDate);

	        var _this = possibleConstructorReturn(this, (FormattedDate.__proto__ || Object.getPrototypeOf(FormattedDate)).call(this, props, context));

	        invariantIntlContext(context);
	        return _this;
	    }

	    createClass(FormattedDate, [{
	        key: 'shouldComponentUpdate',
	        value: function shouldComponentUpdate() {
	            for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
	                next[_key] = arguments[_key];
	            }

	            return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var formatDate = this.context.intl.formatDate;
	            var _props = this.props;
	            var value = _props.value;
	            var children = _props.children;


	            var formattedDate = formatDate(value, this.props);

	            if (typeof children === 'function') {
	                return children(formattedDate);
	            }

	            return React__default.createElement(
	                'span',
	                null,
	                formattedDate
	            );
	        }
	    }]);
	    return FormattedDate;
	}(React.Component);

	FormattedDate.displayName = 'FormattedDate';

	FormattedDate.contextTypes = {
	    intl: intlShape
	};

	FormattedDate.propTypes = babelHelpers$1['extends']({}, dateTimeFormatPropTypes, {
	    value: React.PropTypes.any.isRequired,
	    format: React.PropTypes.string,
	    children: React.PropTypes.func
	});

	/*
	 * Copyright 2015, Yahoo Inc.
	 * Copyrights licensed under the New BSD License.
	 * See the accompanying LICENSE file for terms.
	 */

	var FormattedTime = function (_Component) {
	    inherits(FormattedTime, _Component);

	    function FormattedTime(props, context) {
	        classCallCheck(this, FormattedTime);

	        var _this = possibleConstructorReturn(this, (FormattedTime.__proto__ || Object.getPrototypeOf(FormattedTime)).call(this, props, context));

	        invariantIntlContext(context);
	        return _this;
	    }

	    createClass(FormattedTime, [{
	        key: 'shouldComponentUpdate',
	        value: function shouldComponentUpdate() {
	            for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
	                next[_key] = arguments[_key];
	            }

	            return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var formatTime = this.context.intl.formatTime;
	            var _props = this.props;
	            var value = _props.value;
	            var children = _props.children;


	            var formattedTime = formatTime(value, this.props);

	            if (typeof children === 'function') {
	                return children(formattedTime);
	            }

	            return React__default.createElement(
	                'span',
	                null,
	                formattedTime
	            );
	        }
	    }]);
	    return FormattedTime;
	}(React.Component);

	FormattedTime.displayName = 'FormattedTime';

	FormattedTime.contextTypes = {
	    intl: intlShape
	};

	FormattedTime.propTypes = babelHelpers$1['extends']({}, dateTimeFormatPropTypes, {
	    value: React.PropTypes.any.isRequired,
	    format: React.PropTypes.string,
	    children: React.PropTypes.func
	});

	/*
	 * Copyright 2015, Yahoo Inc.
	 * Copyrights licensed under the New BSD License.
	 * See the accompanying LICENSE file for terms.
	 */

	var SECOND = 1000;
	var MINUTE = 1000 * 60;
	var HOUR = 1000 * 60 * 60;
	var DAY = 1000 * 60 * 60 * 24;

	// The maximum timer delay value is a 32-bit signed integer.
	// See: https://mdn.io/setTimeout
	var MAX_TIMER_DELAY = 2147483647;

	function selectUnits(delta) {
	    var absDelta = Math.abs(delta);

	    if (absDelta < MINUTE) {
	        return 'second';
	    }

	    if (absDelta < HOUR) {
	        return 'minute';
	    }

	    if (absDelta < DAY) {
	        return 'hour';
	    }

	    // The maximum scheduled delay will be measured in days since the maximum
	    // timer delay is less than the number of milliseconds in 25 days.
	    return 'day';
	}

	function getUnitDelay(units) {
	    switch (units) {
	        case 'second':
	            return SECOND;
	        case 'minute':
	            return MINUTE;
	        case 'hour':
	            return HOUR;
	        case 'day':
	            return DAY;
	        default:
	            return MAX_TIMER_DELAY;
	    }
	}

	function isSameDate(a, b) {
	    if (a === b) {
	        return true;
	    }

	    var aTime = new Date(a).getTime();
	    var bTime = new Date(b).getTime();

	    return isFinite(aTime) && isFinite(bTime) && aTime === bTime;
	}

	var FormattedRelative = function (_Component) {
	    inherits(FormattedRelative, _Component);

	    function FormattedRelative(props, context) {
	        classCallCheck(this, FormattedRelative);

	        var _this = possibleConstructorReturn(this, (FormattedRelative.__proto__ || Object.getPrototypeOf(FormattedRelative)).call(this, props, context));

	        invariantIntlContext(context);

	        var now = isFinite(props.initialNow) ? Number(props.initialNow) : context.intl.now();

	        // `now` is stored as state so that `render()` remains a function of
	        // props + state, instead of accessing `Date.now()` inside `render()`.
	        _this.state = { now: now };
	        return _this;
	    }

	    createClass(FormattedRelative, [{
	        key: 'scheduleNextUpdate',
	        value: function scheduleNextUpdate(props, state) {
	            var _this2 = this;

	            var updateInterval = props.updateInterval;

	            // If the `updateInterval` is falsy, including `0`, then auto updates
	            // have been turned off, so we bail and skip scheduling an update.

	            if (!updateInterval) {
	                return;
	            }

	            var time = new Date(props.value).getTime();
	            var delta = time - state.now;
	            var units = props.units || selectUnits(delta);

	            var unitDelay = getUnitDelay(units);
	            var unitRemainder = Math.abs(delta % unitDelay);

	            // We want the largest possible timer delay which will still display
	            // accurate information while reducing unnecessary re-renders. The delay
	            // should be until the next "interesting" moment, like a tick from
	            // "1 minute ago" to "2 minutes ago" when the delta is 120,000ms.
	            var delay = delta < 0 ? Math.max(updateInterval, unitDelay - unitRemainder) : Math.max(updateInterval, unitRemainder);

	            clearTimeout(this._timer);

	            this._timer = setTimeout(function () {
	                _this2.setState({ now: _this2.context.intl.now() });
	            }, delay);
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.scheduleNextUpdate(this.props, this.state);
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(_ref) {
	            var nextValue = _ref.value;

	            // When the `props.value` date changes, `state.now` needs to be updated,
	            // and the next update can be rescheduled.
	            if (!isSameDate(nextValue, this.props.value)) {
	                this.setState({ now: this.context.intl.now() });
	            }
	        }
	    }, {
	        key: 'shouldComponentUpdate',
	        value: function shouldComponentUpdate() {
	            for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
	                next[_key] = arguments[_key];
	            }

	            return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
	        }
	    }, {
	        key: 'componentWillUpdate',
	        value: function componentWillUpdate(nextProps, nextState) {
	            this.scheduleNextUpdate(nextProps, nextState);
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            clearTimeout(this._timer);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var formatRelative = this.context.intl.formatRelative;
	            var _props = this.props;
	            var value = _props.value;
	            var children = _props.children;


	            var formattedRelative = formatRelative(value, babelHelpers$1['extends']({}, this.props, this.state));

	            if (typeof children === 'function') {
	                return children(formattedRelative);
	            }

	            return React__default.createElement(
	                'span',
	                null,
	                formattedRelative
	            );
	        }
	    }]);
	    return FormattedRelative;
	}(React.Component);

	FormattedRelative.displayName = 'FormattedRelative';

	FormattedRelative.contextTypes = {
	    intl: intlShape
	};

	FormattedRelative.propTypes = babelHelpers$1['extends']({}, relativeFormatPropTypes, {
	    value: React.PropTypes.any.isRequired,
	    format: React.PropTypes.string,
	    updateInterval: React.PropTypes.number,
	    initialNow: React.PropTypes.any,
	    children: React.PropTypes.func
	});

	FormattedRelative.defaultProps = {
	    updateInterval: 1000 * 10
	};

	/*
	 * Copyright 2015, Yahoo Inc.
	 * Copyrights licensed under the New BSD License.
	 * See the accompanying LICENSE file for terms.
	 */

	var FormattedNumber = function (_Component) {
	    inherits(FormattedNumber, _Component);

	    function FormattedNumber(props, context) {
	        classCallCheck(this, FormattedNumber);

	        var _this = possibleConstructorReturn(this, (FormattedNumber.__proto__ || Object.getPrototypeOf(FormattedNumber)).call(this, props, context));

	        invariantIntlContext(context);
	        return _this;
	    }

	    createClass(FormattedNumber, [{
	        key: 'shouldComponentUpdate',
	        value: function shouldComponentUpdate() {
	            for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
	                next[_key] = arguments[_key];
	            }

	            return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var formatNumber = this.context.intl.formatNumber;
	            var _props = this.props;
	            var value = _props.value;
	            var children = _props.children;


	            var formattedNumber = formatNumber(value, this.props);

	            if (typeof children === 'function') {
	                return children(formattedNumber);
	            }

	            return React__default.createElement(
	                'span',
	                null,
	                formattedNumber
	            );
	        }
	    }]);
	    return FormattedNumber;
	}(React.Component);

	FormattedNumber.displayName = 'FormattedNumber';

	FormattedNumber.contextTypes = {
	    intl: intlShape
	};

	FormattedNumber.propTypes = babelHelpers$1['extends']({}, numberFormatPropTypes, {
	    value: React.PropTypes.any.isRequired,
	    format: React.PropTypes.string,
	    children: React.PropTypes.func
	});

	/*
	 * Copyright 2015, Yahoo Inc.
	 * Copyrights licensed under the New BSD License.
	 * See the accompanying LICENSE file for terms.
	 */

	var FormattedPlural = function (_Component) {
	    inherits(FormattedPlural, _Component);

	    function FormattedPlural(props, context) {
	        classCallCheck(this, FormattedPlural);

	        var _this = possibleConstructorReturn(this, (FormattedPlural.__proto__ || Object.getPrototypeOf(FormattedPlural)).call(this, props, context));

	        invariantIntlContext(context);
	        return _this;
	    }

	    createClass(FormattedPlural, [{
	        key: 'shouldComponentUpdate',
	        value: function shouldComponentUpdate() {
	            for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
	                next[_key] = arguments[_key];
	            }

	            return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var formatPlural = this.context.intl.formatPlural;
	            var _props = this.props;
	            var value = _props.value;
	            var other = _props.other;
	            var children = _props.children;


	            var pluralCategory = formatPlural(value, this.props);
	            var formattedPlural = this.props[pluralCategory] || other;

	            if (typeof children === 'function') {
	                return children(formattedPlural);
	            }

	            return React__default.createElement(
	                'span',
	                null,
	                formattedPlural
	            );
	        }
	    }]);
	    return FormattedPlural;
	}(React.Component);

	FormattedPlural.displayName = 'FormattedPlural';

	FormattedPlural.contextTypes = {
	    intl: intlShape
	};

	FormattedPlural.propTypes = babelHelpers$1['extends']({}, pluralFormatPropTypes, {
	    value: React.PropTypes.any.isRequired,

	    other: React.PropTypes.node.isRequired,
	    zero: React.PropTypes.node,
	    one: React.PropTypes.node,
	    two: React.PropTypes.node,
	    few: React.PropTypes.node,
	    many: React.PropTypes.node,

	    children: React.PropTypes.func
	});

	FormattedPlural.defaultProps = {
	    style: 'cardinal'
	};

	/*
	 * Copyright 2015, Yahoo Inc.
	 * Copyrights licensed under the New BSD License.
	 * See the accompanying LICENSE file for terms.
	 */

	var FormattedMessage = function (_Component) {
	    inherits(FormattedMessage, _Component);

	    function FormattedMessage(props, context) {
	        classCallCheck(this, FormattedMessage);

	        var _this = possibleConstructorReturn(this, (FormattedMessage.__proto__ || Object.getPrototypeOf(FormattedMessage)).call(this, props, context));

	        invariantIntlContext(context);
	        return _this;
	    }

	    createClass(FormattedMessage, [{
	        key: 'shouldComponentUpdate',
	        value: function shouldComponentUpdate(nextProps) {
	            var values = this.props.values;
	            var nextValues = nextProps.values;


	            if (!shallowEquals(nextValues, values)) {
	                return true;
	            }

	            // Since `values` has already been checked, we know they're not
	            // different, so the current `values` are carried over so the shallow
	            // equals comparison on the other props isn't affected by the `values`.
	            var nextPropsToCheck = babelHelpers$1['extends']({}, nextProps, {
	                values: values
	            });

	            for (var _len = arguments.length, next = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	                next[_key - 1] = arguments[_key];
	            }

	            return shouldIntlComponentUpdate.apply(undefined, [this, nextPropsToCheck].concat(next));
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var formatMessage = this.context.intl.formatMessage;
	            var _props = this.props;
	            var id = _props.id;
	            var description = _props.description;
	            var defaultMessage = _props.defaultMessage;
	            var values = _props.values;
	            var tagName = _props.tagName;
	            var children = _props.children;


	            var tokenDelimiter = void 0;
	            var tokenizedValues = void 0;
	            var elements = void 0;

	            var hasValues = values && Object.keys(values).length > 0;
	            if (hasValues) {
	                (function () {
	                    // Creates a token with a random UID that should not be guessable or
	                    // conflict with other parts of the `message` string.
	                    var uid = Math.floor(Math.random() * 0x10000000000).toString(16);

	                    var generateToken = function () {
	                        var counter = 0;
	                        return function () {
	                            return 'ELEMENT-' + uid + '-' + (counter += 1);
	                        };
	                    }();

	                    // Splitting with a delimiter to support IE8. When using a regex
	                    // with a capture group IE8 does not include the capture group in
	                    // the resulting array.
	                    tokenDelimiter = '@__' + uid + '__@';
	                    tokenizedValues = {};
	                    elements = {};

	                    // Iterates over the `props` to keep track of any React Element
	                    // values so they can be represented by the `token` as a placeholder
	                    // when the `message` is formatted. This allows the formatted
	                    // message to then be broken-up into parts with references to the
	                    // React Elements inserted back in.
	                    Object.keys(values).forEach(function (name) {
	                        var value = values[name];

	                        if (React.isValidElement(value)) {
	                            var token = generateToken();
	                            tokenizedValues[name] = tokenDelimiter + token + tokenDelimiter;
	                            elements[token] = value;
	                        } else {
	                            tokenizedValues[name] = value;
	                        }
	                    });
	                })();
	            }

	            var descriptor = { id: id, description: description, defaultMessage: defaultMessage };
	            var formattedMessage = formatMessage(descriptor, tokenizedValues || values);

	            var nodes = void 0;

	            var hasElements = elements && Object.keys(elements).length > 0;
	            if (hasElements) {
	                // Split the message into parts so the React Element values captured
	                // above can be inserted back into the rendered message. This
	                // approach allows messages to render with React Elements while
	                // keeping React's virtual diffing working properly.
	                nodes = formattedMessage.split(tokenDelimiter).filter(function (part) {
	                    return !!part;
	                }).map(function (part) {
	                    return elements[part] || part;
	                });
	            } else {
	                nodes = [formattedMessage];
	            }

	            if (typeof children === 'function') {
	                return children.apply(undefined, toConsumableArray(nodes));
	            }

	            return React.createElement.apply(undefined, [tagName, null].concat(toConsumableArray(nodes)));
	        }
	    }]);
	    return FormattedMessage;
	}(React.Component);

	FormattedMessage.displayName = 'FormattedMessage';

	FormattedMessage.contextTypes = {
	    intl: intlShape
	};

	FormattedMessage.propTypes = babelHelpers$1['extends']({}, messageDescriptorPropTypes, {
	    values: React.PropTypes.object,
	    tagName: React.PropTypes.string,
	    children: React.PropTypes.func
	});

	FormattedMessage.defaultProps = {
	    values: {},
	    tagName: 'span'
	};

	/*
	 * Copyright 2015, Yahoo Inc.
	 * Copyrights licensed under the New BSD License.
	 * See the accompanying LICENSE file for terms.
	 */

	var FormattedHTMLMessage = function (_Component) {
	    inherits(FormattedHTMLMessage, _Component);

	    function FormattedHTMLMessage(props, context) {
	        classCallCheck(this, FormattedHTMLMessage);

	        var _this = possibleConstructorReturn(this, (FormattedHTMLMessage.__proto__ || Object.getPrototypeOf(FormattedHTMLMessage)).call(this, props, context));

	        invariantIntlContext(context);
	        return _this;
	    }

	    createClass(FormattedHTMLMessage, [{
	        key: 'shouldComponentUpdate',
	        value: function shouldComponentUpdate(nextProps) {
	            var values = this.props.values;
	            var nextValues = nextProps.values;


	            if (!shallowEquals(nextValues, values)) {
	                return true;
	            }

	            // Since `values` has already been checked, we know they're not
	            // different, so the current `values` are carried over so the shallow
	            // equals comparison on the other props isn't affected by the `values`.
	            var nextPropsToCheck = babelHelpers$1['extends']({}, nextProps, {
	                values: values
	            });

	            for (var _len = arguments.length, next = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	                next[_key - 1] = arguments[_key];
	            }

	            return shouldIntlComponentUpdate.apply(undefined, [this, nextPropsToCheck].concat(next));
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var formatHTMLMessage = this.context.intl.formatHTMLMessage;
	            var _props = this.props;
	            var id = _props.id;
	            var description = _props.description;
	            var defaultMessage = _props.defaultMessage;
	            var rawValues = _props.values;
	            var tagName = _props.tagName;
	            var children = _props.children;


	            var descriptor = { id: id, description: description, defaultMessage: defaultMessage };
	            var formattedHTMLMessage = formatHTMLMessage(descriptor, rawValues);

	            if (typeof children === 'function') {
	                return children(formattedHTMLMessage);
	            }

	            // Since the message presumably has HTML in it, we need to set
	            // `innerHTML` in order for it to be rendered and not escaped by React.
	            // To be safe, all string prop values were escaped when formatting the
	            // message. It is assumed that the message is not UGC, and came from the
	            // developer making it more like a template.
	            //
	            // Note: There's a perf impact of using this component since there's no
	            // way for React to do its virtual DOM diffing.
	            return React.createElement(tagName, {
	                dangerouslySetInnerHTML: {
	                    __html: formattedHTMLMessage
	                }
	            });
	        }
	    }]);
	    return FormattedHTMLMessage;
	}(React.Component);

	FormattedHTMLMessage.displayName = 'FormattedHTMLMessage';

	FormattedHTMLMessage.contextTypes = {
	    intl: intlShape
	};

	FormattedHTMLMessage.propTypes = babelHelpers$1['extends']({}, messageDescriptorPropTypes, {
	    values: React.PropTypes.object,
	    tagName: React.PropTypes.string,
	    children: React.PropTypes.func
	});

	FormattedHTMLMessage.defaultProps = {
	    values: {},
	    tagName: 'span'
	};

	/*
	 * Copyright 2015, Yahoo Inc.
	 * Copyrights licensed under the New BSD License.
	 * See the accompanying LICENSE file for terms.
	 */

	addLocaleData(defaultLocaleData);

	/*
	 * Copyright 2015, Yahoo Inc.
	 * Copyrights licensed under the New BSD License.
	 * See the accompanying LICENSE file for terms.
	 */

	addLocaleData(allLocaleData);

	exports.addLocaleData = addLocaleData;
	exports.intlShape = intlShape;
	exports.injectIntl = injectIntl;
	exports.defineMessages = defineMessages;
	exports.IntlProvider = IntlProvider;
	exports.FormattedDate = FormattedDate;
	exports.FormattedTime = FormattedTime;
	exports.FormattedRelative = FormattedRelative;
	exports.FormattedNumber = FormattedNumber;
	exports.FormattedPlural = FormattedPlural;
	exports.FormattedMessage = FormattedMessage;
	exports.FormattedHTMLMessage = FormattedHTMLMessage;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 265:
/***/ function(module, exports) {

	/* (ignored) */

/***/ },

/***/ 266:
/***/ function(module, exports, __webpack_require__) {

	/* jshint node:true */

	'use strict';

	var IntlMessageFormat = __webpack_require__(267)['default'];

	// Add all locale data to `IntlMessageFormat`. This module will be ignored when
	// bundling for the browser with Browserify/Webpack.
	__webpack_require__(275);

	// Re-export `IntlMessageFormat` as the CommonJS default exports with all the
	// locale data registered, and with English set as the default locale. Define
	// the `default` prop for use with other compiled ES6 Modules.
	exports = module.exports = IntlMessageFormat;
	exports['default'] = exports;


/***/ },

/***/ 267:
/***/ function(module, exports, __webpack_require__) {

	/* jslint esnext: true */

	"use strict";
	var src$core$$ = __webpack_require__(268), src$en$$ = __webpack_require__(274);

	src$core$$["default"].__addLocaleData(src$en$$["default"]);
	src$core$$["default"].defaultLocale = 'en';

	exports["default"] = src$core$$["default"];

	//# sourceMappingURL=main.js.map

/***/ },

/***/ 268:
/***/ function(module, exports, __webpack_require__) {

	/*
	Copyright (c) 2014, Yahoo! Inc. All rights reserved.
	Copyrights licensed under the New BSD License.
	See the accompanying LICENSE file for terms.
	*/

	/* jslint esnext: true */

	"use strict";
	var src$utils$$ = __webpack_require__(269), src$es5$$ = __webpack_require__(270), src$compiler$$ = __webpack_require__(271), intl$messageformat$parser$$ = __webpack_require__(272);
	exports["default"] = MessageFormat;

	// -- MessageFormat --------------------------------------------------------

	function MessageFormat(message, locales, formats) {
	    // Parse string messages into an AST.
	    var ast = typeof message === 'string' ?
	            MessageFormat.__parse(message) : message;

	    if (!(ast && ast.type === 'messageFormatPattern')) {
	        throw new TypeError('A message must be provided as a String or AST.');
	    }

	    // Creates a new object with the specified `formats` merged with the default
	    // formats.
	    formats = this._mergeFormats(MessageFormat.formats, formats);

	    // Defined first because it's used to build the format pattern.
	    src$es5$$.defineProperty(this, '_locale',  {value: this._resolveLocale(locales)});

	    // Compile the `ast` to a pattern that is highly optimized for repeated
	    // `format()` invocations. **Note:** This passes the `locales` set provided
	    // to the constructor instead of just the resolved locale.
	    var pluralFn = this._findPluralRuleFunction(this._locale);
	    var pattern  = this._compilePattern(ast, locales, formats, pluralFn);

	    // "Bind" `format()` method to `this` so it can be passed by reference like
	    // the other `Intl` APIs.
	    var messageFormat = this;
	    this.format = function (values) {
	        return messageFormat._format(pattern, values);
	    };
	}

	// Default format options used as the prototype of the `formats` provided to the
	// constructor. These are used when constructing the internal Intl.NumberFormat
	// and Intl.DateTimeFormat instances.
	src$es5$$.defineProperty(MessageFormat, 'formats', {
	    enumerable: true,

	    value: {
	        number: {
	            'currency': {
	                style: 'currency'
	            },

	            'percent': {
	                style: 'percent'
	            }
	        },

	        date: {
	            'short': {
	                month: 'numeric',
	                day  : 'numeric',
	                year : '2-digit'
	            },

	            'medium': {
	                month: 'short',
	                day  : 'numeric',
	                year : 'numeric'
	            },

	            'long': {
	                month: 'long',
	                day  : 'numeric',
	                year : 'numeric'
	            },

	            'full': {
	                weekday: 'long',
	                month  : 'long',
	                day    : 'numeric',
	                year   : 'numeric'
	            }
	        },

	        time: {
	            'short': {
	                hour  : 'numeric',
	                minute: 'numeric'
	            },

	            'medium':  {
	                hour  : 'numeric',
	                minute: 'numeric',
	                second: 'numeric'
	            },

	            'long': {
	                hour        : 'numeric',
	                minute      : 'numeric',
	                second      : 'numeric',
	                timeZoneName: 'short'
	            },

	            'full': {
	                hour        : 'numeric',
	                minute      : 'numeric',
	                second      : 'numeric',
	                timeZoneName: 'short'
	            }
	        }
	    }
	});

	// Define internal private properties for dealing with locale data.
	src$es5$$.defineProperty(MessageFormat, '__localeData__', {value: src$es5$$.objCreate(null)});
	src$es5$$.defineProperty(MessageFormat, '__addLocaleData', {value: function (data) {
	    if (!(data && data.locale)) {
	        throw new Error(
	            'Locale data provided to IntlMessageFormat is missing a ' +
	            '`locale` property'
	        );
	    }

	    MessageFormat.__localeData__[data.locale.toLowerCase()] = data;
	}});

	// Defines `__parse()` static method as an exposed private.
	src$es5$$.defineProperty(MessageFormat, '__parse', {value: intl$messageformat$parser$$["default"].parse});

	// Define public `defaultLocale` property which defaults to English, but can be
	// set by the developer.
	src$es5$$.defineProperty(MessageFormat, 'defaultLocale', {
	    enumerable: true,
	    writable  : true,
	    value     : undefined
	});

	MessageFormat.prototype.resolvedOptions = function () {
	    // TODO: Provide anything else?
	    return {
	        locale: this._locale
	    };
	};

	MessageFormat.prototype._compilePattern = function (ast, locales, formats, pluralFn) {
	    var compiler = new src$compiler$$["default"](locales, formats, pluralFn);
	    return compiler.compile(ast);
	};

	MessageFormat.prototype._findPluralRuleFunction = function (locale) {
	    var localeData = MessageFormat.__localeData__;
	    var data       = localeData[locale.toLowerCase()];

	    // The locale data is de-duplicated, so we have to traverse the locale's
	    // hierarchy until we find a `pluralRuleFunction` to return.
	    while (data) {
	        if (data.pluralRuleFunction) {
	            return data.pluralRuleFunction;
	        }

	        data = data.parentLocale && localeData[data.parentLocale.toLowerCase()];
	    }

	    throw new Error(
	        'Locale data added to IntlMessageFormat is missing a ' +
	        '`pluralRuleFunction` for :' + locale
	    );
	};

	MessageFormat.prototype._format = function (pattern, values) {
	    var result = '',
	        i, len, part, id, value;

	    for (i = 0, len = pattern.length; i < len; i += 1) {
	        part = pattern[i];

	        // Exist early for string parts.
	        if (typeof part === 'string') {
	            result += part;
	            continue;
	        }

	        id = part.id;

	        // Enforce that all required values are provided by the caller.
	        if (!(values && src$utils$$.hop.call(values, id))) {
	            throw new Error('A value must be provided for: ' + id);
	        }

	        value = values[id];

	        // Recursively format plural and select parts' option — which can be a
	        // nested pattern structure. The choosing of the option to use is
	        // abstracted-by and delegated-to the part helper object.
	        if (part.options) {
	            result += this._format(part.getOption(value), values);
	        } else {
	            result += part.format(value);
	        }
	    }

	    return result;
	};

	MessageFormat.prototype._mergeFormats = function (defaults, formats) {
	    var mergedFormats = {},
	        type, mergedType;

	    for (type in defaults) {
	        if (!src$utils$$.hop.call(defaults, type)) { continue; }

	        mergedFormats[type] = mergedType = src$es5$$.objCreate(defaults[type]);

	        if (formats && src$utils$$.hop.call(formats, type)) {
	            src$utils$$.extend(mergedType, formats[type]);
	        }
	    }

	    return mergedFormats;
	};

	MessageFormat.prototype._resolveLocale = function (locales) {
	    if (typeof locales === 'string') {
	        locales = [locales];
	    }

	    // Create a copy of the array so we can push on the default locale.
	    locales = (locales || []).concat(MessageFormat.defaultLocale);

	    var localeData = MessageFormat.__localeData__;
	    var i, len, localeParts, data;

	    // Using the set of locales + the default locale, we look for the first one
	    // which that has been registered. When data does not exist for a locale, we
	    // traverse its ancestors to find something that's been registered within
	    // its hierarchy of locales. Since we lack the proper `parentLocale` data
	    // here, we must take a naive approach to traversal.
	    for (i = 0, len = locales.length; i < len; i += 1) {
	        localeParts = locales[i].toLowerCase().split('-');

	        while (localeParts.length) {
	            data = localeData[localeParts.join('-')];
	            if (data) {
	                // Return the normalized locale string; e.g., we return "en-US",
	                // instead of "en-us".
	                return data.locale;
	            }

	            localeParts.pop();
	        }
	    }

	    var defaultLocale = locales.pop();
	    throw new Error(
	        'No locale data has been added to IntlMessageFormat for: ' +
	        locales.join(', ') + ', or the default locale: ' + defaultLocale
	    );
	};

	//# sourceMappingURL=core.js.map

/***/ },

/***/ 269:
/***/ function(module, exports) {

	/*
	Copyright (c) 2014, Yahoo! Inc. All rights reserved.
	Copyrights licensed under the New BSD License.
	See the accompanying LICENSE file for terms.
	*/

	/* jslint esnext: true */

	"use strict";
	exports.extend = extend;
	var hop = Object.prototype.hasOwnProperty;

	function extend(obj) {
	    var sources = Array.prototype.slice.call(arguments, 1),
	        i, len, source, key;

	    for (i = 0, len = sources.length; i < len; i += 1) {
	        source = sources[i];
	        if (!source) { continue; }

	        for (key in source) {
	            if (hop.call(source, key)) {
	                obj[key] = source[key];
	            }
	        }
	    }

	    return obj;
	}
	exports.hop = hop;

	//# sourceMappingURL=utils.js.map

/***/ },

/***/ 270:
/***/ function(module, exports, __webpack_require__) {

	/*
	Copyright (c) 2014, Yahoo! Inc. All rights reserved.
	Copyrights licensed under the New BSD License.
	See the accompanying LICENSE file for terms.
	*/

	/* jslint esnext: true */

	"use strict";
	var src$utils$$ = __webpack_require__(269);

	// Purposely using the same implementation as the Intl.js `Intl` polyfill.
	// Copyright 2013 Andy Earnshaw, MIT License

	var realDefineProp = (function () {
	    try { return !!Object.defineProperty({}, 'a', {}); }
	    catch (e) { return false; }
	})();

	var es3 = !realDefineProp && !Object.prototype.__defineGetter__;

	var defineProperty = realDefineProp ? Object.defineProperty :
	        function (obj, name, desc) {

	    if ('get' in desc && obj.__defineGetter__) {
	        obj.__defineGetter__(name, desc.get);
	    } else if (!src$utils$$.hop.call(obj, name) || 'value' in desc) {
	        obj[name] = desc.value;
	    }
	};

	var objCreate = Object.create || function (proto, props) {
	    var obj, k;

	    function F() {}
	    F.prototype = proto;
	    obj = new F();

	    for (k in props) {
	        if (src$utils$$.hop.call(props, k)) {
	            defineProperty(obj, k, props[k]);
	        }
	    }

	    return obj;
	};
	exports.defineProperty = defineProperty, exports.objCreate = objCreate;

	//# sourceMappingURL=es5.js.map

/***/ },

/***/ 271:
/***/ function(module, exports) {

	/*
	Copyright (c) 2014, Yahoo! Inc. All rights reserved.
	Copyrights licensed under the New BSD License.
	See the accompanying LICENSE file for terms.
	*/

	/* jslint esnext: true */

	"use strict";
	exports["default"] = Compiler;

	function Compiler(locales, formats, pluralFn) {
	    this.locales  = locales;
	    this.formats  = formats;
	    this.pluralFn = pluralFn;
	}

	Compiler.prototype.compile = function (ast) {
	    this.pluralStack        = [];
	    this.currentPlural      = null;
	    this.pluralNumberFormat = null;

	    return this.compileMessage(ast);
	};

	Compiler.prototype.compileMessage = function (ast) {
	    if (!(ast && ast.type === 'messageFormatPattern')) {
	        throw new Error('Message AST is not of type: "messageFormatPattern"');
	    }

	    var elements = ast.elements,
	        pattern  = [];

	    var i, len, element;

	    for (i = 0, len = elements.length; i < len; i += 1) {
	        element = elements[i];

	        switch (element.type) {
	            case 'messageTextElement':
	                pattern.push(this.compileMessageText(element));
	                break;

	            case 'argumentElement':
	                pattern.push(this.compileArgument(element));
	                break;

	            default:
	                throw new Error('Message element does not have a valid type');
	        }
	    }

	    return pattern;
	};

	Compiler.prototype.compileMessageText = function (element) {
	    // When this `element` is part of plural sub-pattern and its value contains
	    // an unescaped '#', use a `PluralOffsetString` helper to properly output
	    // the number with the correct offset in the string.
	    if (this.currentPlural && /(^|[^\\])#/g.test(element.value)) {
	        // Create a cache a NumberFormat instance that can be reused for any
	        // PluralOffsetString instance in this message.
	        if (!this.pluralNumberFormat) {
	            this.pluralNumberFormat = new Intl.NumberFormat(this.locales);
	        }

	        return new PluralOffsetString(
	                this.currentPlural.id,
	                this.currentPlural.format.offset,
	                this.pluralNumberFormat,
	                element.value);
	    }

	    // Unescape the escaped '#'s in the message text.
	    return element.value.replace(/\\#/g, '#');
	};

	Compiler.prototype.compileArgument = function (element) {
	    var format = element.format;

	    if (!format) {
	        return new StringFormat(element.id);
	    }

	    var formats  = this.formats,
	        locales  = this.locales,
	        pluralFn = this.pluralFn,
	        options;

	    switch (format.type) {
	        case 'numberFormat':
	            options = formats.number[format.style];
	            return {
	                id    : element.id,
	                format: new Intl.NumberFormat(locales, options).format
	            };

	        case 'dateFormat':
	            options = formats.date[format.style];
	            return {
	                id    : element.id,
	                format: new Intl.DateTimeFormat(locales, options).format
	            };

	        case 'timeFormat':
	            options = formats.time[format.style];
	            return {
	                id    : element.id,
	                format: new Intl.DateTimeFormat(locales, options).format
	            };

	        case 'pluralFormat':
	            options = this.compileOptions(element);
	            return new PluralFormat(
	                element.id, format.ordinal, format.offset, options, pluralFn
	            );

	        case 'selectFormat':
	            options = this.compileOptions(element);
	            return new SelectFormat(element.id, options);

	        default:
	            throw new Error('Message element does not have a valid format type');
	    }
	};

	Compiler.prototype.compileOptions = function (element) {
	    var format      = element.format,
	        options     = format.options,
	        optionsHash = {};

	    // Save the current plural element, if any, then set it to a new value when
	    // compiling the options sub-patterns. This conforms the spec's algorithm
	    // for handling `"#"` syntax in message text.
	    this.pluralStack.push(this.currentPlural);
	    this.currentPlural = format.type === 'pluralFormat' ? element : null;

	    var i, len, option;

	    for (i = 0, len = options.length; i < len; i += 1) {
	        option = options[i];

	        // Compile the sub-pattern and save it under the options's selector.
	        optionsHash[option.selector] = this.compileMessage(option.value);
	    }

	    // Pop the plural stack to put back the original current plural value.
	    this.currentPlural = this.pluralStack.pop();

	    return optionsHash;
	};

	// -- Compiler Helper Classes --------------------------------------------------

	function StringFormat(id) {
	    this.id = id;
	}

	StringFormat.prototype.format = function (value) {
	    if (!value) {
	        return '';
	    }

	    return typeof value === 'string' ? value : String(value);
	};

	function PluralFormat(id, useOrdinal, offset, options, pluralFn) {
	    this.id         = id;
	    this.useOrdinal = useOrdinal;
	    this.offset     = offset;
	    this.options    = options;
	    this.pluralFn   = pluralFn;
	}

	PluralFormat.prototype.getOption = function (value) {
	    var options = this.options;

	    var option = options['=' + value] ||
	            options[this.pluralFn(value - this.offset, this.useOrdinal)];

	    return option || options.other;
	};

	function PluralOffsetString(id, offset, numberFormat, string) {
	    this.id           = id;
	    this.offset       = offset;
	    this.numberFormat = numberFormat;
	    this.string       = string;
	}

	PluralOffsetString.prototype.format = function (value) {
	    var number = this.numberFormat.format(value - this.offset);

	    return this.string
	            .replace(/(^|[^\\])#/g, '$1' + number)
	            .replace(/\\#/g, '#');
	};

	function SelectFormat(id, options) {
	    this.id      = id;
	    this.options = options;
	}

	SelectFormat.prototype.getOption = function (value) {
	    var options = this.options;
	    return options[value] || options.other;
	};

	//# sourceMappingURL=compiler.js.map

/***/ },

/***/ 272:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports = module.exports = __webpack_require__(273)['default'];
	exports['default'] = exports;


/***/ },

/***/ 273:
/***/ function(module, exports) {

	"use strict";

	exports["default"] = (function() {
	  /*
	   * Generated by PEG.js 0.8.0.
	   *
	   * http://pegjs.majda.cz/
	   */

	  function peg$subclass(child, parent) {
	    function ctor() { this.constructor = child; }
	    ctor.prototype = parent.prototype;
	    child.prototype = new ctor();
	  }

	  function SyntaxError(message, expected, found, offset, line, column) {
	    this.message  = message;
	    this.expected = expected;
	    this.found    = found;
	    this.offset   = offset;
	    this.line     = line;
	    this.column   = column;

	    this.name     = "SyntaxError";
	  }

	  peg$subclass(SyntaxError, Error);

	  function parse(input) {
	    var options = arguments.length > 1 ? arguments[1] : {},

	        peg$FAILED = {},

	        peg$startRuleFunctions = { start: peg$parsestart },
	        peg$startRuleFunction  = peg$parsestart,

	        peg$c0 = [],
	        peg$c1 = function(elements) {
	                return {
	                    type    : 'messageFormatPattern',
	                    elements: elements
	                };
	            },
	        peg$c2 = peg$FAILED,
	        peg$c3 = function(text) {
	                var string = '',
	                    i, j, outerLen, inner, innerLen;

	                for (i = 0, outerLen = text.length; i < outerLen; i += 1) {
	                    inner = text[i];

	                    for (j = 0, innerLen = inner.length; j < innerLen; j += 1) {
	                        string += inner[j];
	                    }
	                }

	                return string;
	            },
	        peg$c4 = function(messageText) {
	                return {
	                    type : 'messageTextElement',
	                    value: messageText
	                };
	            },
	        peg$c5 = /^[^ \t\n\r,.+={}#]/,
	        peg$c6 = { type: "class", value: "[^ \\t\\n\\r,.+={}#]", description: "[^ \\t\\n\\r,.+={}#]" },
	        peg$c7 = "{",
	        peg$c8 = { type: "literal", value: "{", description: "\"{\"" },
	        peg$c9 = null,
	        peg$c10 = ",",
	        peg$c11 = { type: "literal", value: ",", description: "\",\"" },
	        peg$c12 = "}",
	        peg$c13 = { type: "literal", value: "}", description: "\"}\"" },
	        peg$c14 = function(id, format) {
	                return {
	                    type  : 'argumentElement',
	                    id    : id,
	                    format: format && format[2]
	                };
	            },
	        peg$c15 = "number",
	        peg$c16 = { type: "literal", value: "number", description: "\"number\"" },
	        peg$c17 = "date",
	        peg$c18 = { type: "literal", value: "date", description: "\"date\"" },
	        peg$c19 = "time",
	        peg$c20 = { type: "literal", value: "time", description: "\"time\"" },
	        peg$c21 = function(type, style) {
	                return {
	                    type : type + 'Format',
	                    style: style && style[2]
	                };
	            },
	        peg$c22 = "plural",
	        peg$c23 = { type: "literal", value: "plural", description: "\"plural\"" },
	        peg$c24 = function(pluralStyle) {
	                return {
	                    type   : pluralStyle.type,
	                    ordinal: false,
	                    offset : pluralStyle.offset || 0,
	                    options: pluralStyle.options
	                };
	            },
	        peg$c25 = "selectordinal",
	        peg$c26 = { type: "literal", value: "selectordinal", description: "\"selectordinal\"" },
	        peg$c27 = function(pluralStyle) {
	                return {
	                    type   : pluralStyle.type,
	                    ordinal: true,
	                    offset : pluralStyle.offset || 0,
	                    options: pluralStyle.options
	                }
	            },
	        peg$c28 = "select",
	        peg$c29 = { type: "literal", value: "select", description: "\"select\"" },
	        peg$c30 = function(options) {
	                return {
	                    type   : 'selectFormat',
	                    options: options
	                };
	            },
	        peg$c31 = "=",
	        peg$c32 = { type: "literal", value: "=", description: "\"=\"" },
	        peg$c33 = function(selector, pattern) {
	                return {
	                    type    : 'optionalFormatPattern',
	                    selector: selector,
	                    value   : pattern
	                };
	            },
	        peg$c34 = "offset:",
	        peg$c35 = { type: "literal", value: "offset:", description: "\"offset:\"" },
	        peg$c36 = function(number) {
	                return number;
	            },
	        peg$c37 = function(offset, options) {
	                return {
	                    type   : 'pluralFormat',
	                    offset : offset,
	                    options: options
	                };
	            },
	        peg$c38 = { type: "other", description: "whitespace" },
	        peg$c39 = /^[ \t\n\r]/,
	        peg$c40 = { type: "class", value: "[ \\t\\n\\r]", description: "[ \\t\\n\\r]" },
	        peg$c41 = { type: "other", description: "optionalWhitespace" },
	        peg$c42 = /^[0-9]/,
	        peg$c43 = { type: "class", value: "[0-9]", description: "[0-9]" },
	        peg$c44 = /^[0-9a-f]/i,
	        peg$c45 = { type: "class", value: "[0-9a-f]i", description: "[0-9a-f]i" },
	        peg$c46 = "0",
	        peg$c47 = { type: "literal", value: "0", description: "\"0\"" },
	        peg$c48 = /^[1-9]/,
	        peg$c49 = { type: "class", value: "[1-9]", description: "[1-9]" },
	        peg$c50 = function(digits) {
	            return parseInt(digits, 10);
	        },
	        peg$c51 = /^[^{}\\\0-\x1F \t\n\r]/,
	        peg$c52 = { type: "class", value: "[^{}\\\\\\0-\\x1F \\t\\n\\r]", description: "[^{}\\\\\\0-\\x1F \\t\\n\\r]" },
	        peg$c53 = "\\\\",
	        peg$c54 = { type: "literal", value: "\\\\", description: "\"\\\\\\\\\"" },
	        peg$c55 = function() { return '\\'; },
	        peg$c56 = "\\#",
	        peg$c57 = { type: "literal", value: "\\#", description: "\"\\\\#\"" },
	        peg$c58 = function() { return '\\#'; },
	        peg$c59 = "\\{",
	        peg$c60 = { type: "literal", value: "\\{", description: "\"\\\\{\"" },
	        peg$c61 = function() { return '\u007B'; },
	        peg$c62 = "\\}",
	        peg$c63 = { type: "literal", value: "\\}", description: "\"\\\\}\"" },
	        peg$c64 = function() { return '\u007D'; },
	        peg$c65 = "\\u",
	        peg$c66 = { type: "literal", value: "\\u", description: "\"\\\\u\"" },
	        peg$c67 = function(digits) {
	                return String.fromCharCode(parseInt(digits, 16));
	            },
	        peg$c68 = function(chars) { return chars.join(''); },

	        peg$currPos          = 0,
	        peg$reportedPos      = 0,
	        peg$cachedPos        = 0,
	        peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
	        peg$maxFailPos       = 0,
	        peg$maxFailExpected  = [],
	        peg$silentFails      = 0,

	        peg$result;

	    if ("startRule" in options) {
	      if (!(options.startRule in peg$startRuleFunctions)) {
	        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
	      }

	      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
	    }

	    function text() {
	      return input.substring(peg$reportedPos, peg$currPos);
	    }

	    function offset() {
	      return peg$reportedPos;
	    }

	    function line() {
	      return peg$computePosDetails(peg$reportedPos).line;
	    }

	    function column() {
	      return peg$computePosDetails(peg$reportedPos).column;
	    }

	    function expected(description) {
	      throw peg$buildException(
	        null,
	        [{ type: "other", description: description }],
	        peg$reportedPos
	      );
	    }

	    function error(message) {
	      throw peg$buildException(message, null, peg$reportedPos);
	    }

	    function peg$computePosDetails(pos) {
	      function advance(details, startPos, endPos) {
	        var p, ch;

	        for (p = startPos; p < endPos; p++) {
	          ch = input.charAt(p);
	          if (ch === "\n") {
	            if (!details.seenCR) { details.line++; }
	            details.column = 1;
	            details.seenCR = false;
	          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
	            details.line++;
	            details.column = 1;
	            details.seenCR = true;
	          } else {
	            details.column++;
	            details.seenCR = false;
	          }
	        }
	      }

	      if (peg$cachedPos !== pos) {
	        if (peg$cachedPos > pos) {
	          peg$cachedPos = 0;
	          peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
	        }
	        advance(peg$cachedPosDetails, peg$cachedPos, pos);
	        peg$cachedPos = pos;
	      }

	      return peg$cachedPosDetails;
	    }

	    function peg$fail(expected) {
	      if (peg$currPos < peg$maxFailPos) { return; }

	      if (peg$currPos > peg$maxFailPos) {
	        peg$maxFailPos = peg$currPos;
	        peg$maxFailExpected = [];
	      }

	      peg$maxFailExpected.push(expected);
	    }

	    function peg$buildException(message, expected, pos) {
	      function cleanupExpected(expected) {
	        var i = 1;

	        expected.sort(function(a, b) {
	          if (a.description < b.description) {
	            return -1;
	          } else if (a.description > b.description) {
	            return 1;
	          } else {
	            return 0;
	          }
	        });

	        while (i < expected.length) {
	          if (expected[i - 1] === expected[i]) {
	            expected.splice(i, 1);
	          } else {
	            i++;
	          }
	        }
	      }

	      function buildMessage(expected, found) {
	        function stringEscape(s) {
	          function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

	          return s
	            .replace(/\\/g,   '\\\\')
	            .replace(/"/g,    '\\"')
	            .replace(/\x08/g, '\\b')
	            .replace(/\t/g,   '\\t')
	            .replace(/\n/g,   '\\n')
	            .replace(/\f/g,   '\\f')
	            .replace(/\r/g,   '\\r')
	            .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
	            .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
	            .replace(/[\u0180-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
	            .replace(/[\u1080-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
	        }

	        var expectedDescs = new Array(expected.length),
	            expectedDesc, foundDesc, i;

	        for (i = 0; i < expected.length; i++) {
	          expectedDescs[i] = expected[i].description;
	        }

	        expectedDesc = expected.length > 1
	          ? expectedDescs.slice(0, -1).join(", ")
	              + " or "
	              + expectedDescs[expected.length - 1]
	          : expectedDescs[0];

	        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

	        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
	      }

	      var posDetails = peg$computePosDetails(pos),
	          found      = pos < input.length ? input.charAt(pos) : null;

	      if (expected !== null) {
	        cleanupExpected(expected);
	      }

	      return new SyntaxError(
	        message !== null ? message : buildMessage(expected, found),
	        expected,
	        found,
	        pos,
	        posDetails.line,
	        posDetails.column
	      );
	    }

	    function peg$parsestart() {
	      var s0;

	      s0 = peg$parsemessageFormatPattern();

	      return s0;
	    }

	    function peg$parsemessageFormatPattern() {
	      var s0, s1, s2;

	      s0 = peg$currPos;
	      s1 = [];
	      s2 = peg$parsemessageFormatElement();
	      while (s2 !== peg$FAILED) {
	        s1.push(s2);
	        s2 = peg$parsemessageFormatElement();
	      }
	      if (s1 !== peg$FAILED) {
	        peg$reportedPos = s0;
	        s1 = peg$c1(s1);
	      }
	      s0 = s1;

	      return s0;
	    }

	    function peg$parsemessageFormatElement() {
	      var s0;

	      s0 = peg$parsemessageTextElement();
	      if (s0 === peg$FAILED) {
	        s0 = peg$parseargumentElement();
	      }

	      return s0;
	    }

	    function peg$parsemessageText() {
	      var s0, s1, s2, s3, s4, s5;

	      s0 = peg$currPos;
	      s1 = [];
	      s2 = peg$currPos;
	      s3 = peg$parse_();
	      if (s3 !== peg$FAILED) {
	        s4 = peg$parsechars();
	        if (s4 !== peg$FAILED) {
	          s5 = peg$parse_();
	          if (s5 !== peg$FAILED) {
	            s3 = [s3, s4, s5];
	            s2 = s3;
	          } else {
	            peg$currPos = s2;
	            s2 = peg$c2;
	          }
	        } else {
	          peg$currPos = s2;
	          s2 = peg$c2;
	        }
	      } else {
	        peg$currPos = s2;
	        s2 = peg$c2;
	      }
	      if (s2 !== peg$FAILED) {
	        while (s2 !== peg$FAILED) {
	          s1.push(s2);
	          s2 = peg$currPos;
	          s3 = peg$parse_();
	          if (s3 !== peg$FAILED) {
	            s4 = peg$parsechars();
	            if (s4 !== peg$FAILED) {
	              s5 = peg$parse_();
	              if (s5 !== peg$FAILED) {
	                s3 = [s3, s4, s5];
	                s2 = s3;
	              } else {
	                peg$currPos = s2;
	                s2 = peg$c2;
	              }
	            } else {
	              peg$currPos = s2;
	              s2 = peg$c2;
	            }
	          } else {
	            peg$currPos = s2;
	            s2 = peg$c2;
	          }
	        }
	      } else {
	        s1 = peg$c2;
	      }
	      if (s1 !== peg$FAILED) {
	        peg$reportedPos = s0;
	        s1 = peg$c3(s1);
	      }
	      s0 = s1;
	      if (s0 === peg$FAILED) {
	        s0 = peg$currPos;
	        s1 = peg$parsews();
	        if (s1 !== peg$FAILED) {
	          s1 = input.substring(s0, peg$currPos);
	        }
	        s0 = s1;
	      }

	      return s0;
	    }

	    function peg$parsemessageTextElement() {
	      var s0, s1;

	      s0 = peg$currPos;
	      s1 = peg$parsemessageText();
	      if (s1 !== peg$FAILED) {
	        peg$reportedPos = s0;
	        s1 = peg$c4(s1);
	      }
	      s0 = s1;

	      return s0;
	    }

	    function peg$parseargument() {
	      var s0, s1, s2;

	      s0 = peg$parsenumber();
	      if (s0 === peg$FAILED) {
	        s0 = peg$currPos;
	        s1 = [];
	        if (peg$c5.test(input.charAt(peg$currPos))) {
	          s2 = input.charAt(peg$currPos);
	          peg$currPos++;
	        } else {
	          s2 = peg$FAILED;
	          if (peg$silentFails === 0) { peg$fail(peg$c6); }
	        }
	        if (s2 !== peg$FAILED) {
	          while (s2 !== peg$FAILED) {
	            s1.push(s2);
	            if (peg$c5.test(input.charAt(peg$currPos))) {
	              s2 = input.charAt(peg$currPos);
	              peg$currPos++;
	            } else {
	              s2 = peg$FAILED;
	              if (peg$silentFails === 0) { peg$fail(peg$c6); }
	            }
	          }
	        } else {
	          s1 = peg$c2;
	        }
	        if (s1 !== peg$FAILED) {
	          s1 = input.substring(s0, peg$currPos);
	        }
	        s0 = s1;
	      }

	      return s0;
	    }

	    function peg$parseargumentElement() {
	      var s0, s1, s2, s3, s4, s5, s6, s7, s8;

	      s0 = peg$currPos;
	      if (input.charCodeAt(peg$currPos) === 123) {
	        s1 = peg$c7;
	        peg$currPos++;
	      } else {
	        s1 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c8); }
	      }
	      if (s1 !== peg$FAILED) {
	        s2 = peg$parse_();
	        if (s2 !== peg$FAILED) {
	          s3 = peg$parseargument();
	          if (s3 !== peg$FAILED) {
	            s4 = peg$parse_();
	            if (s4 !== peg$FAILED) {
	              s5 = peg$currPos;
	              if (input.charCodeAt(peg$currPos) === 44) {
	                s6 = peg$c10;
	                peg$currPos++;
	              } else {
	                s6 = peg$FAILED;
	                if (peg$silentFails === 0) { peg$fail(peg$c11); }
	              }
	              if (s6 !== peg$FAILED) {
	                s7 = peg$parse_();
	                if (s7 !== peg$FAILED) {
	                  s8 = peg$parseelementFormat();
	                  if (s8 !== peg$FAILED) {
	                    s6 = [s6, s7, s8];
	                    s5 = s6;
	                  } else {
	                    peg$currPos = s5;
	                    s5 = peg$c2;
	                  }
	                } else {
	                  peg$currPos = s5;
	                  s5 = peg$c2;
	                }
	              } else {
	                peg$currPos = s5;
	                s5 = peg$c2;
	              }
	              if (s5 === peg$FAILED) {
	                s5 = peg$c9;
	              }
	              if (s5 !== peg$FAILED) {
	                s6 = peg$parse_();
	                if (s6 !== peg$FAILED) {
	                  if (input.charCodeAt(peg$currPos) === 125) {
	                    s7 = peg$c12;
	                    peg$currPos++;
	                  } else {
	                    s7 = peg$FAILED;
	                    if (peg$silentFails === 0) { peg$fail(peg$c13); }
	                  }
	                  if (s7 !== peg$FAILED) {
	                    peg$reportedPos = s0;
	                    s1 = peg$c14(s3, s5);
	                    s0 = s1;
	                  } else {
	                    peg$currPos = s0;
	                    s0 = peg$c2;
	                  }
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$c2;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$c2;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$c2;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$c2;
	          }
	        } else {
	          peg$currPos = s0;
	          s0 = peg$c2;
	        }
	      } else {
	        peg$currPos = s0;
	        s0 = peg$c2;
	      }

	      return s0;
	    }

	    function peg$parseelementFormat() {
	      var s0;

	      s0 = peg$parsesimpleFormat();
	      if (s0 === peg$FAILED) {
	        s0 = peg$parsepluralFormat();
	        if (s0 === peg$FAILED) {
	          s0 = peg$parseselectOrdinalFormat();
	          if (s0 === peg$FAILED) {
	            s0 = peg$parseselectFormat();
	          }
	        }
	      }

	      return s0;
	    }

	    function peg$parsesimpleFormat() {
	      var s0, s1, s2, s3, s4, s5, s6;

	      s0 = peg$currPos;
	      if (input.substr(peg$currPos, 6) === peg$c15) {
	        s1 = peg$c15;
	        peg$currPos += 6;
	      } else {
	        s1 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c16); }
	      }
	      if (s1 === peg$FAILED) {
	        if (input.substr(peg$currPos, 4) === peg$c17) {
	          s1 = peg$c17;
	          peg$currPos += 4;
	        } else {
	          s1 = peg$FAILED;
	          if (peg$silentFails === 0) { peg$fail(peg$c18); }
	        }
	        if (s1 === peg$FAILED) {
	          if (input.substr(peg$currPos, 4) === peg$c19) {
	            s1 = peg$c19;
	            peg$currPos += 4;
	          } else {
	            s1 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c20); }
	          }
	        }
	      }
	      if (s1 !== peg$FAILED) {
	        s2 = peg$parse_();
	        if (s2 !== peg$FAILED) {
	          s3 = peg$currPos;
	          if (input.charCodeAt(peg$currPos) === 44) {
	            s4 = peg$c10;
	            peg$currPos++;
	          } else {
	            s4 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c11); }
	          }
	          if (s4 !== peg$FAILED) {
	            s5 = peg$parse_();
	            if (s5 !== peg$FAILED) {
	              s6 = peg$parsechars();
	              if (s6 !== peg$FAILED) {
	                s4 = [s4, s5, s6];
	                s3 = s4;
	              } else {
	                peg$currPos = s3;
	                s3 = peg$c2;
	              }
	            } else {
	              peg$currPos = s3;
	              s3 = peg$c2;
	            }
	          } else {
	            peg$currPos = s3;
	            s3 = peg$c2;
	          }
	          if (s3 === peg$FAILED) {
	            s3 = peg$c9;
	          }
	          if (s3 !== peg$FAILED) {
	            peg$reportedPos = s0;
	            s1 = peg$c21(s1, s3);
	            s0 = s1;
	          } else {
	            peg$currPos = s0;
	            s0 = peg$c2;
	          }
	        } else {
	          peg$currPos = s0;
	          s0 = peg$c2;
	        }
	      } else {
	        peg$currPos = s0;
	        s0 = peg$c2;
	      }

	      return s0;
	    }

	    function peg$parsepluralFormat() {
	      var s0, s1, s2, s3, s4, s5;

	      s0 = peg$currPos;
	      if (input.substr(peg$currPos, 6) === peg$c22) {
	        s1 = peg$c22;
	        peg$currPos += 6;
	      } else {
	        s1 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c23); }
	      }
	      if (s1 !== peg$FAILED) {
	        s2 = peg$parse_();
	        if (s2 !== peg$FAILED) {
	          if (input.charCodeAt(peg$currPos) === 44) {
	            s3 = peg$c10;
	            peg$currPos++;
	          } else {
	            s3 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c11); }
	          }
	          if (s3 !== peg$FAILED) {
	            s4 = peg$parse_();
	            if (s4 !== peg$FAILED) {
	              s5 = peg$parsepluralStyle();
	              if (s5 !== peg$FAILED) {
	                peg$reportedPos = s0;
	                s1 = peg$c24(s5);
	                s0 = s1;
	              } else {
	                peg$currPos = s0;
	                s0 = peg$c2;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$c2;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$c2;
	          }
	        } else {
	          peg$currPos = s0;
	          s0 = peg$c2;
	        }
	      } else {
	        peg$currPos = s0;
	        s0 = peg$c2;
	      }

	      return s0;
	    }

	    function peg$parseselectOrdinalFormat() {
	      var s0, s1, s2, s3, s4, s5;

	      s0 = peg$currPos;
	      if (input.substr(peg$currPos, 13) === peg$c25) {
	        s1 = peg$c25;
	        peg$currPos += 13;
	      } else {
	        s1 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c26); }
	      }
	      if (s1 !== peg$FAILED) {
	        s2 = peg$parse_();
	        if (s2 !== peg$FAILED) {
	          if (input.charCodeAt(peg$currPos) === 44) {
	            s3 = peg$c10;
	            peg$currPos++;
	          } else {
	            s3 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c11); }
	          }
	          if (s3 !== peg$FAILED) {
	            s4 = peg$parse_();
	            if (s4 !== peg$FAILED) {
	              s5 = peg$parsepluralStyle();
	              if (s5 !== peg$FAILED) {
	                peg$reportedPos = s0;
	                s1 = peg$c27(s5);
	                s0 = s1;
	              } else {
	                peg$currPos = s0;
	                s0 = peg$c2;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$c2;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$c2;
	          }
	        } else {
	          peg$currPos = s0;
	          s0 = peg$c2;
	        }
	      } else {
	        peg$currPos = s0;
	        s0 = peg$c2;
	      }

	      return s0;
	    }

	    function peg$parseselectFormat() {
	      var s0, s1, s2, s3, s4, s5, s6;

	      s0 = peg$currPos;
	      if (input.substr(peg$currPos, 6) === peg$c28) {
	        s1 = peg$c28;
	        peg$currPos += 6;
	      } else {
	        s1 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c29); }
	      }
	      if (s1 !== peg$FAILED) {
	        s2 = peg$parse_();
	        if (s2 !== peg$FAILED) {
	          if (input.charCodeAt(peg$currPos) === 44) {
	            s3 = peg$c10;
	            peg$currPos++;
	          } else {
	            s3 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c11); }
	          }
	          if (s3 !== peg$FAILED) {
	            s4 = peg$parse_();
	            if (s4 !== peg$FAILED) {
	              s5 = [];
	              s6 = peg$parseoptionalFormatPattern();
	              if (s6 !== peg$FAILED) {
	                while (s6 !== peg$FAILED) {
	                  s5.push(s6);
	                  s6 = peg$parseoptionalFormatPattern();
	                }
	              } else {
	                s5 = peg$c2;
	              }
	              if (s5 !== peg$FAILED) {
	                peg$reportedPos = s0;
	                s1 = peg$c30(s5);
	                s0 = s1;
	              } else {
	                peg$currPos = s0;
	                s0 = peg$c2;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$c2;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$c2;
	          }
	        } else {
	          peg$currPos = s0;
	          s0 = peg$c2;
	        }
	      } else {
	        peg$currPos = s0;
	        s0 = peg$c2;
	      }

	      return s0;
	    }

	    function peg$parseselector() {
	      var s0, s1, s2, s3;

	      s0 = peg$currPos;
	      s1 = peg$currPos;
	      if (input.charCodeAt(peg$currPos) === 61) {
	        s2 = peg$c31;
	        peg$currPos++;
	      } else {
	        s2 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c32); }
	      }
	      if (s2 !== peg$FAILED) {
	        s3 = peg$parsenumber();
	        if (s3 !== peg$FAILED) {
	          s2 = [s2, s3];
	          s1 = s2;
	        } else {
	          peg$currPos = s1;
	          s1 = peg$c2;
	        }
	      } else {
	        peg$currPos = s1;
	        s1 = peg$c2;
	      }
	      if (s1 !== peg$FAILED) {
	        s1 = input.substring(s0, peg$currPos);
	      }
	      s0 = s1;
	      if (s0 === peg$FAILED) {
	        s0 = peg$parsechars();
	      }

	      return s0;
	    }

	    function peg$parseoptionalFormatPattern() {
	      var s0, s1, s2, s3, s4, s5, s6, s7, s8;

	      s0 = peg$currPos;
	      s1 = peg$parse_();
	      if (s1 !== peg$FAILED) {
	        s2 = peg$parseselector();
	        if (s2 !== peg$FAILED) {
	          s3 = peg$parse_();
	          if (s3 !== peg$FAILED) {
	            if (input.charCodeAt(peg$currPos) === 123) {
	              s4 = peg$c7;
	              peg$currPos++;
	            } else {
	              s4 = peg$FAILED;
	              if (peg$silentFails === 0) { peg$fail(peg$c8); }
	            }
	            if (s4 !== peg$FAILED) {
	              s5 = peg$parse_();
	              if (s5 !== peg$FAILED) {
	                s6 = peg$parsemessageFormatPattern();
	                if (s6 !== peg$FAILED) {
	                  s7 = peg$parse_();
	                  if (s7 !== peg$FAILED) {
	                    if (input.charCodeAt(peg$currPos) === 125) {
	                      s8 = peg$c12;
	                      peg$currPos++;
	                    } else {
	                      s8 = peg$FAILED;
	                      if (peg$silentFails === 0) { peg$fail(peg$c13); }
	                    }
	                    if (s8 !== peg$FAILED) {
	                      peg$reportedPos = s0;
	                      s1 = peg$c33(s2, s6);
	                      s0 = s1;
	                    } else {
	                      peg$currPos = s0;
	                      s0 = peg$c2;
	                    }
	                  } else {
	                    peg$currPos = s0;
	                    s0 = peg$c2;
	                  }
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$c2;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$c2;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$c2;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$c2;
	          }
	        } else {
	          peg$currPos = s0;
	          s0 = peg$c2;
	        }
	      } else {
	        peg$currPos = s0;
	        s0 = peg$c2;
	      }

	      return s0;
	    }

	    function peg$parseoffset() {
	      var s0, s1, s2, s3;

	      s0 = peg$currPos;
	      if (input.substr(peg$currPos, 7) === peg$c34) {
	        s1 = peg$c34;
	        peg$currPos += 7;
	      } else {
	        s1 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c35); }
	      }
	      if (s1 !== peg$FAILED) {
	        s2 = peg$parse_();
	        if (s2 !== peg$FAILED) {
	          s3 = peg$parsenumber();
	          if (s3 !== peg$FAILED) {
	            peg$reportedPos = s0;
	            s1 = peg$c36(s3);
	            s0 = s1;
	          } else {
	            peg$currPos = s0;
	            s0 = peg$c2;
	          }
	        } else {
	          peg$currPos = s0;
	          s0 = peg$c2;
	        }
	      } else {
	        peg$currPos = s0;
	        s0 = peg$c2;
	      }

	      return s0;
	    }

	    function peg$parsepluralStyle() {
	      var s0, s1, s2, s3, s4;

	      s0 = peg$currPos;
	      s1 = peg$parseoffset();
	      if (s1 === peg$FAILED) {
	        s1 = peg$c9;
	      }
	      if (s1 !== peg$FAILED) {
	        s2 = peg$parse_();
	        if (s2 !== peg$FAILED) {
	          s3 = [];
	          s4 = peg$parseoptionalFormatPattern();
	          if (s4 !== peg$FAILED) {
	            while (s4 !== peg$FAILED) {
	              s3.push(s4);
	              s4 = peg$parseoptionalFormatPattern();
	            }
	          } else {
	            s3 = peg$c2;
	          }
	          if (s3 !== peg$FAILED) {
	            peg$reportedPos = s0;
	            s1 = peg$c37(s1, s3);
	            s0 = s1;
	          } else {
	            peg$currPos = s0;
	            s0 = peg$c2;
	          }
	        } else {
	          peg$currPos = s0;
	          s0 = peg$c2;
	        }
	      } else {
	        peg$currPos = s0;
	        s0 = peg$c2;
	      }

	      return s0;
	    }

	    function peg$parsews() {
	      var s0, s1;

	      peg$silentFails++;
	      s0 = [];
	      if (peg$c39.test(input.charAt(peg$currPos))) {
	        s1 = input.charAt(peg$currPos);
	        peg$currPos++;
	      } else {
	        s1 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c40); }
	      }
	      if (s1 !== peg$FAILED) {
	        while (s1 !== peg$FAILED) {
	          s0.push(s1);
	          if (peg$c39.test(input.charAt(peg$currPos))) {
	            s1 = input.charAt(peg$currPos);
	            peg$currPos++;
	          } else {
	            s1 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c40); }
	          }
	        }
	      } else {
	        s0 = peg$c2;
	      }
	      peg$silentFails--;
	      if (s0 === peg$FAILED) {
	        s1 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c38); }
	      }

	      return s0;
	    }

	    function peg$parse_() {
	      var s0, s1, s2;

	      peg$silentFails++;
	      s0 = peg$currPos;
	      s1 = [];
	      s2 = peg$parsews();
	      while (s2 !== peg$FAILED) {
	        s1.push(s2);
	        s2 = peg$parsews();
	      }
	      if (s1 !== peg$FAILED) {
	        s1 = input.substring(s0, peg$currPos);
	      }
	      s0 = s1;
	      peg$silentFails--;
	      if (s0 === peg$FAILED) {
	        s1 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c41); }
	      }

	      return s0;
	    }

	    function peg$parsedigit() {
	      var s0;

	      if (peg$c42.test(input.charAt(peg$currPos))) {
	        s0 = input.charAt(peg$currPos);
	        peg$currPos++;
	      } else {
	        s0 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c43); }
	      }

	      return s0;
	    }

	    function peg$parsehexDigit() {
	      var s0;

	      if (peg$c44.test(input.charAt(peg$currPos))) {
	        s0 = input.charAt(peg$currPos);
	        peg$currPos++;
	      } else {
	        s0 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c45); }
	      }

	      return s0;
	    }

	    function peg$parsenumber() {
	      var s0, s1, s2, s3, s4, s5;

	      s0 = peg$currPos;
	      if (input.charCodeAt(peg$currPos) === 48) {
	        s1 = peg$c46;
	        peg$currPos++;
	      } else {
	        s1 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c47); }
	      }
	      if (s1 === peg$FAILED) {
	        s1 = peg$currPos;
	        s2 = peg$currPos;
	        if (peg$c48.test(input.charAt(peg$currPos))) {
	          s3 = input.charAt(peg$currPos);
	          peg$currPos++;
	        } else {
	          s3 = peg$FAILED;
	          if (peg$silentFails === 0) { peg$fail(peg$c49); }
	        }
	        if (s3 !== peg$FAILED) {
	          s4 = [];
	          s5 = peg$parsedigit();
	          while (s5 !== peg$FAILED) {
	            s4.push(s5);
	            s5 = peg$parsedigit();
	          }
	          if (s4 !== peg$FAILED) {
	            s3 = [s3, s4];
	            s2 = s3;
	          } else {
	            peg$currPos = s2;
	            s2 = peg$c2;
	          }
	        } else {
	          peg$currPos = s2;
	          s2 = peg$c2;
	        }
	        if (s2 !== peg$FAILED) {
	          s2 = input.substring(s1, peg$currPos);
	        }
	        s1 = s2;
	      }
	      if (s1 !== peg$FAILED) {
	        peg$reportedPos = s0;
	        s1 = peg$c50(s1);
	      }
	      s0 = s1;

	      return s0;
	    }

	    function peg$parsechar() {
	      var s0, s1, s2, s3, s4, s5, s6, s7;

	      if (peg$c51.test(input.charAt(peg$currPos))) {
	        s0 = input.charAt(peg$currPos);
	        peg$currPos++;
	      } else {
	        s0 = peg$FAILED;
	        if (peg$silentFails === 0) { peg$fail(peg$c52); }
	      }
	      if (s0 === peg$FAILED) {
	        s0 = peg$currPos;
	        if (input.substr(peg$currPos, 2) === peg$c53) {
	          s1 = peg$c53;
	          peg$currPos += 2;
	        } else {
	          s1 = peg$FAILED;
	          if (peg$silentFails === 0) { peg$fail(peg$c54); }
	        }
	        if (s1 !== peg$FAILED) {
	          peg$reportedPos = s0;
	          s1 = peg$c55();
	        }
	        s0 = s1;
	        if (s0 === peg$FAILED) {
	          s0 = peg$currPos;
	          if (input.substr(peg$currPos, 2) === peg$c56) {
	            s1 = peg$c56;
	            peg$currPos += 2;
	          } else {
	            s1 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c57); }
	          }
	          if (s1 !== peg$FAILED) {
	            peg$reportedPos = s0;
	            s1 = peg$c58();
	          }
	          s0 = s1;
	          if (s0 === peg$FAILED) {
	            s0 = peg$currPos;
	            if (input.substr(peg$currPos, 2) === peg$c59) {
	              s1 = peg$c59;
	              peg$currPos += 2;
	            } else {
	              s1 = peg$FAILED;
	              if (peg$silentFails === 0) { peg$fail(peg$c60); }
	            }
	            if (s1 !== peg$FAILED) {
	              peg$reportedPos = s0;
	              s1 = peg$c61();
	            }
	            s0 = s1;
	            if (s0 === peg$FAILED) {
	              s0 = peg$currPos;
	              if (input.substr(peg$currPos, 2) === peg$c62) {
	                s1 = peg$c62;
	                peg$currPos += 2;
	              } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) { peg$fail(peg$c63); }
	              }
	              if (s1 !== peg$FAILED) {
	                peg$reportedPos = s0;
	                s1 = peg$c64();
	              }
	              s0 = s1;
	              if (s0 === peg$FAILED) {
	                s0 = peg$currPos;
	                if (input.substr(peg$currPos, 2) === peg$c65) {
	                  s1 = peg$c65;
	                  peg$currPos += 2;
	                } else {
	                  s1 = peg$FAILED;
	                  if (peg$silentFails === 0) { peg$fail(peg$c66); }
	                }
	                if (s1 !== peg$FAILED) {
	                  s2 = peg$currPos;
	                  s3 = peg$currPos;
	                  s4 = peg$parsehexDigit();
	                  if (s4 !== peg$FAILED) {
	                    s5 = peg$parsehexDigit();
	                    if (s5 !== peg$FAILED) {
	                      s6 = peg$parsehexDigit();
	                      if (s6 !== peg$FAILED) {
	                        s7 = peg$parsehexDigit();
	                        if (s7 !== peg$FAILED) {
	                          s4 = [s4, s5, s6, s7];
	                          s3 = s4;
	                        } else {
	                          peg$currPos = s3;
	                          s3 = peg$c2;
	                        }
	                      } else {
	                        peg$currPos = s3;
	                        s3 = peg$c2;
	                      }
	                    } else {
	                      peg$currPos = s3;
	                      s3 = peg$c2;
	                    }
	                  } else {
	                    peg$currPos = s3;
	                    s3 = peg$c2;
	                  }
	                  if (s3 !== peg$FAILED) {
	                    s3 = input.substring(s2, peg$currPos);
	                  }
	                  s2 = s3;
	                  if (s2 !== peg$FAILED) {
	                    peg$reportedPos = s0;
	                    s1 = peg$c67(s2);
	                    s0 = s1;
	                  } else {
	                    peg$currPos = s0;
	                    s0 = peg$c2;
	                  }
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$c2;
	                }
	              }
	            }
	          }
	        }
	      }

	      return s0;
	    }

	    function peg$parsechars() {
	      var s0, s1, s2;

	      s0 = peg$currPos;
	      s1 = [];
	      s2 = peg$parsechar();
	      if (s2 !== peg$FAILED) {
	        while (s2 !== peg$FAILED) {
	          s1.push(s2);
	          s2 = peg$parsechar();
	        }
	      } else {
	        s1 = peg$c2;
	      }
	      if (s1 !== peg$FAILED) {
	        peg$reportedPos = s0;
	        s1 = peg$c68(s1);
	      }
	      s0 = s1;

	      return s0;
	    }

	    peg$result = peg$startRuleFunction();

	    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
	      return peg$result;
	    } else {
	      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
	        peg$fail({ type: "end", description: "end of input" });
	      }

	      throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
	    }
	  }

	  return {
	    SyntaxError: SyntaxError,
	    parse:       parse
	  };
	})();

	//# sourceMappingURL=parser.js.map

/***/ },

/***/ 274:
/***/ function(module, exports) {

	// GENERATED FILE
	"use strict";
	exports["default"] = {"locale":"en","pluralRuleFunction":function (n,ord){var s=String(n).split("."),v0=!s[1],t0=Number(s[0])==n,n10=t0&&s[0].slice(-1),n100=t0&&s[0].slice(-2);if(ord)return n10==1&&n100!=11?"one":n10==2&&n100!=12?"two":n10==3&&n100!=13?"few":"other";return n==1&&v0?"one":"other"}};

	//# sourceMappingURL=en.js.map

/***/ },

/***/ 275:
/***/ function(module, exports) {

	/* (ignored) */

/***/ },

/***/ 276:
/***/ function(module, exports, __webpack_require__) {

	/* jshint node:true */

	'use strict';

	var IntlRelativeFormat = __webpack_require__(277)['default'];

	// Add all locale data to `IntlRelativeFormat`. This module will be ignored when
	// bundling for the browser with Browserify/Webpack.
	__webpack_require__(282);

	// Re-export `IntlRelativeFormat` as the CommonJS default exports with all the
	// locale data registered, and with English set as the default locale. Define
	// the `default` prop for use with other compiled ES6 Modules.
	exports = module.exports = IntlRelativeFormat;
	exports['default'] = exports;


/***/ },

/***/ 277:
/***/ function(module, exports, __webpack_require__) {

	/* jslint esnext: true */

	"use strict";
	var src$core$$ = __webpack_require__(278), src$en$$ = __webpack_require__(281);

	src$core$$["default"].__addLocaleData(src$en$$["default"]);
	src$core$$["default"].defaultLocale = 'en';

	exports["default"] = src$core$$["default"];

	//# sourceMappingURL=main.js.map

/***/ },

/***/ 278:
/***/ function(module, exports, __webpack_require__) {

	/*
	Copyright (c) 2014, Yahoo! Inc. All rights reserved.
	Copyrights licensed under the New BSD License.
	See the accompanying LICENSE file for terms.
	*/

	/* jslint esnext: true */

	"use strict";
	var intl$messageformat$$ = __webpack_require__(266), src$diff$$ = __webpack_require__(279), src$es5$$ = __webpack_require__(280);
	exports["default"] = RelativeFormat;

	// -----------------------------------------------------------------------------

	var FIELDS = ['second', 'minute', 'hour', 'day', 'month', 'year'];
	var STYLES = ['best fit', 'numeric'];

	// -- RelativeFormat -----------------------------------------------------------

	function RelativeFormat(locales, options) {
	    options = options || {};

	    // Make a copy of `locales` if it's an array, so that it doesn't change
	    // since it's used lazily.
	    if (src$es5$$.isArray(locales)) {
	        locales = locales.concat();
	    }

	    src$es5$$.defineProperty(this, '_locale', {value: this._resolveLocale(locales)});
	    src$es5$$.defineProperty(this, '_options', {value: {
	        style: this._resolveStyle(options.style),
	        units: this._isValidUnits(options.units) && options.units
	    }});

	    src$es5$$.defineProperty(this, '_locales', {value: locales});
	    src$es5$$.defineProperty(this, '_fields', {value: this._findFields(this._locale)});
	    src$es5$$.defineProperty(this, '_messages', {value: src$es5$$.objCreate(null)});

	    // "Bind" `format()` method to `this` so it can be passed by reference like
	    // the other `Intl` APIs.
	    var relativeFormat = this;
	    this.format = function format(date, options) {
	        return relativeFormat._format(date, options);
	    };
	}

	// Define internal private properties for dealing with locale data.
	src$es5$$.defineProperty(RelativeFormat, '__localeData__', {value: src$es5$$.objCreate(null)});
	src$es5$$.defineProperty(RelativeFormat, '__addLocaleData', {value: function (data) {
	    if (!(data && data.locale)) {
	        throw new Error(
	            'Locale data provided to IntlRelativeFormat is missing a ' +
	            '`locale` property value'
	        );
	    }

	    RelativeFormat.__localeData__[data.locale.toLowerCase()] = data;

	    // Add data to IntlMessageFormat.
	    intl$messageformat$$["default"].__addLocaleData(data);
	}});

	// Define public `defaultLocale` property which can be set by the developer, or
	// it will be set when the first RelativeFormat instance is created by
	// leveraging the resolved locale from `Intl`.
	src$es5$$.defineProperty(RelativeFormat, 'defaultLocale', {
	    enumerable: true,
	    writable  : true,
	    value     : undefined
	});

	// Define public `thresholds` property which can be set by the developer, and
	// defaults to relative time thresholds from moment.js.
	src$es5$$.defineProperty(RelativeFormat, 'thresholds', {
	    enumerable: true,

	    value: {
	        second: 45,  // seconds to minute
	        minute: 45,  // minutes to hour
	        hour  : 22,  // hours to day
	        day   : 26,  // days to month
	        month : 11   // months to year
	    }
	});

	RelativeFormat.prototype.resolvedOptions = function () {
	    return {
	        locale: this._locale,
	        style : this._options.style,
	        units : this._options.units
	    };
	};

	RelativeFormat.prototype._compileMessage = function (units) {
	    // `this._locales` is the original set of locales the user specified to the
	    // constructor, while `this._locale` is the resolved root locale.
	    var locales        = this._locales;
	    var resolvedLocale = this._locale;

	    var field        = this._fields[units];
	    var relativeTime = field.relativeTime;
	    var future       = '';
	    var past         = '';
	    var i;

	    for (i in relativeTime.future) {
	        if (relativeTime.future.hasOwnProperty(i)) {
	            future += ' ' + i + ' {' +
	                relativeTime.future[i].replace('{0}', '#') + '}';
	        }
	    }

	    for (i in relativeTime.past) {
	        if (relativeTime.past.hasOwnProperty(i)) {
	            past += ' ' + i + ' {' +
	                relativeTime.past[i].replace('{0}', '#') + '}';
	        }
	    }

	    var message = '{when, select, future {{0, plural, ' + future + '}}' +
	                                 'past {{0, plural, ' + past + '}}}';

	    // Create the synthetic IntlMessageFormat instance using the original
	    // locales value specified by the user when constructing the the parent
	    // IntlRelativeFormat instance.
	    return new intl$messageformat$$["default"](message, locales);
	};

	RelativeFormat.prototype._getMessage = function (units) {
	    var messages = this._messages;

	    // Create a new synthetic message based on the locale data from CLDR.
	    if (!messages[units]) {
	        messages[units] = this._compileMessage(units);
	    }

	    return messages[units];
	};

	RelativeFormat.prototype._getRelativeUnits = function (diff, units) {
	    var field = this._fields[units];

	    if (field.relative) {
	        return field.relative[diff];
	    }
	};

	RelativeFormat.prototype._findFields = function (locale) {
	    var localeData = RelativeFormat.__localeData__;
	    var data       = localeData[locale.toLowerCase()];

	    // The locale data is de-duplicated, so we have to traverse the locale's
	    // hierarchy until we find `fields` to return.
	    while (data) {
	        if (data.fields) {
	            return data.fields;
	        }

	        data = data.parentLocale && localeData[data.parentLocale.toLowerCase()];
	    }

	    throw new Error(
	        'Locale data added to IntlRelativeFormat is missing `fields` for :' +
	        locale
	    );
	};

	RelativeFormat.prototype._format = function (date, options) {
	    var now = options && options.now !== undefined ? options.now : src$es5$$.dateNow();

	    if (date === undefined) {
	        date = now;
	    }

	    // Determine if the `date` and optional `now` values are valid, and throw a
	    // similar error to what `Intl.DateTimeFormat#format()` would throw.
	    if (!isFinite(now)) {
	        throw new RangeError(
	            'The `now` option provided to IntlRelativeFormat#format() is not ' +
	            'in valid range.'
	        );
	    }

	    if (!isFinite(date)) {
	        throw new RangeError(
	            'The date value provided to IntlRelativeFormat#format() is not ' +
	            'in valid range.'
	        );
	    }

	    var diffReport  = src$diff$$["default"](now, date);
	    var units       = this._options.units || this._selectUnits(diffReport);
	    var diffInUnits = diffReport[units];

	    if (this._options.style !== 'numeric') {
	        var relativeUnits = this._getRelativeUnits(diffInUnits, units);
	        if (relativeUnits) {
	            return relativeUnits;
	        }
	    }

	    return this._getMessage(units).format({
	        '0' : Math.abs(diffInUnits),
	        when: diffInUnits < 0 ? 'past' : 'future'
	    });
	};

	RelativeFormat.prototype._isValidUnits = function (units) {
	    if (!units || src$es5$$.arrIndexOf.call(FIELDS, units) >= 0) {
	        return true;
	    }

	    if (typeof units === 'string') {
	        var suggestion = /s$/.test(units) && units.substr(0, units.length - 1);
	        if (suggestion && src$es5$$.arrIndexOf.call(FIELDS, suggestion) >= 0) {
	            throw new Error(
	                '"' + units + '" is not a valid IntlRelativeFormat `units` ' +
	                'value, did you mean: ' + suggestion
	            );
	        }
	    }

	    throw new Error(
	        '"' + units + '" is not a valid IntlRelativeFormat `units` value, it ' +
	        'must be one of: "' + FIELDS.join('", "') + '"'
	    );
	};

	RelativeFormat.prototype._resolveLocale = function (locales) {
	    if (typeof locales === 'string') {
	        locales = [locales];
	    }

	    // Create a copy of the array so we can push on the default locale.
	    locales = (locales || []).concat(RelativeFormat.defaultLocale);

	    var localeData = RelativeFormat.__localeData__;
	    var i, len, localeParts, data;

	    // Using the set of locales + the default locale, we look for the first one
	    // which that has been registered. When data does not exist for a locale, we
	    // traverse its ancestors to find something that's been registered within
	    // its hierarchy of locales. Since we lack the proper `parentLocale` data
	    // here, we must take a naive approach to traversal.
	    for (i = 0, len = locales.length; i < len; i += 1) {
	        localeParts = locales[i].toLowerCase().split('-');

	        while (localeParts.length) {
	            data = localeData[localeParts.join('-')];
	            if (data) {
	                // Return the normalized locale string; e.g., we return "en-US",
	                // instead of "en-us".
	                return data.locale;
	            }

	            localeParts.pop();
	        }
	    }

	    var defaultLocale = locales.pop();
	    throw new Error(
	        'No locale data has been added to IntlRelativeFormat for: ' +
	        locales.join(', ') + ', or the default locale: ' + defaultLocale
	    );
	};

	RelativeFormat.prototype._resolveStyle = function (style) {
	    // Default to "best fit" style.
	    if (!style) {
	        return STYLES[0];
	    }

	    if (src$es5$$.arrIndexOf.call(STYLES, style) >= 0) {
	        return style;
	    }

	    throw new Error(
	        '"' + style + '" is not a valid IntlRelativeFormat `style` value, it ' +
	        'must be one of: "' + STYLES.join('", "') + '"'
	    );
	};

	RelativeFormat.prototype._selectUnits = function (diffReport) {
	    var i, l, units;

	    for (i = 0, l = FIELDS.length; i < l; i += 1) {
	        units = FIELDS[i];

	        if (Math.abs(diffReport[units]) < RelativeFormat.thresholds[units]) {
	            break;
	        }
	    }

	    return units;
	};

	//# sourceMappingURL=core.js.map

/***/ },

/***/ 279:
/***/ function(module, exports) {

	/*
	Copyright (c) 2014, Yahoo! Inc. All rights reserved.
	Copyrights licensed under the New BSD License.
	See the accompanying LICENSE file for terms.
	*/

	/* jslint esnext: true */

	"use strict";

	var round = Math.round;

	function daysToYears(days) {
	    // 400 years have 146097 days (taking into account leap year rules)
	    return days * 400 / 146097;
	}

	exports["default"] = function (from, to) {
	    // Convert to ms timestamps.
	    from = +from;
	    to   = +to;

	    var millisecond = round(to - from),
	        second      = round(millisecond / 1000),
	        minute      = round(second / 60),
	        hour        = round(minute / 60),
	        day         = round(hour / 24),
	        week        = round(day / 7);

	    var rawYears = daysToYears(day),
	        month    = round(rawYears * 12),
	        year     = round(rawYears);

	    return {
	        millisecond: millisecond,
	        second     : second,
	        minute     : minute,
	        hour       : hour,
	        day        : day,
	        week       : week,
	        month      : month,
	        year       : year
	    };
	};

	//# sourceMappingURL=diff.js.map

/***/ },

/***/ 280:
/***/ function(module, exports) {

	/*
	Copyright (c) 2014, Yahoo! Inc. All rights reserved.
	Copyrights licensed under the New BSD License.
	See the accompanying LICENSE file for terms.
	*/

	/* jslint esnext: true */

	"use strict";

	// Purposely using the same implementation as the Intl.js `Intl` polyfill.
	// Copyright 2013 Andy Earnshaw, MIT License

	var hop = Object.prototype.hasOwnProperty;
	var toString = Object.prototype.toString;

	var realDefineProp = (function () {
	    try { return !!Object.defineProperty({}, 'a', {}); }
	    catch (e) { return false; }
	})();

	var es3 = !realDefineProp && !Object.prototype.__defineGetter__;

	var defineProperty = realDefineProp ? Object.defineProperty :
	        function (obj, name, desc) {

	    if ('get' in desc && obj.__defineGetter__) {
	        obj.__defineGetter__(name, desc.get);
	    } else if (!hop.call(obj, name) || 'value' in desc) {
	        obj[name] = desc.value;
	    }
	};

	var objCreate = Object.create || function (proto, props) {
	    var obj, k;

	    function F() {}
	    F.prototype = proto;
	    obj = new F();

	    for (k in props) {
	        if (hop.call(props, k)) {
	            defineProperty(obj, k, props[k]);
	        }
	    }

	    return obj;
	};

	var arrIndexOf = Array.prototype.indexOf || function (search, fromIndex) {
	    /*jshint validthis:true */
	    var arr = this;
	    if (!arr.length) {
	        return -1;
	    }

	    for (var i = fromIndex || 0, max = arr.length; i < max; i++) {
	        if (arr[i] === search) {
	            return i;
	        }
	    }

	    return -1;
	};

	var isArray = Array.isArray || function (obj) {
	    return toString.call(obj) === '[object Array]';
	};

	var dateNow = Date.now || function () {
	    return new Date().getTime();
	};
	exports.defineProperty = defineProperty, exports.objCreate = objCreate, exports.arrIndexOf = arrIndexOf, exports.isArray = isArray, exports.dateNow = dateNow;

	//# sourceMappingURL=es5.js.map

/***/ },

/***/ 281:
/***/ function(module, exports) {

	// GENERATED FILE
	"use strict";
	exports["default"] = {"locale":"en","pluralRuleFunction":function (n,ord){var s=String(n).split("."),v0=!s[1],t0=Number(s[0])==n,n10=t0&&s[0].slice(-1),n100=t0&&s[0].slice(-2);if(ord)return n10==1&&n100!=11?"one":n10==2&&n100!=12?"two":n10==3&&n100!=13?"few":"other";return n==1&&v0?"one":"other"},"fields":{"year":{"displayName":"year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"one":"in {0} year","other":"in {0} years"},"past":{"one":"{0} year ago","other":"{0} years ago"}}},"month":{"displayName":"month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"one":"in {0} month","other":"in {0} months"},"past":{"one":"{0} month ago","other":"{0} months ago"}}},"day":{"displayName":"day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"one":"in {0} day","other":"in {0} days"},"past":{"one":"{0} day ago","other":"{0} days ago"}}},"hour":{"displayName":"hour","relativeTime":{"future":{"one":"in {0} hour","other":"in {0} hours"},"past":{"one":"{0} hour ago","other":"{0} hours ago"}}},"minute":{"displayName":"minute","relativeTime":{"future":{"one":"in {0} minute","other":"in {0} minutes"},"past":{"one":"{0} minute ago","other":"{0} minutes ago"}}},"second":{"displayName":"second","relative":{"0":"now"},"relativeTime":{"future":{"one":"in {0} second","other":"in {0} seconds"},"past":{"one":"{0} second ago","other":"{0} seconds ago"}}}}};

	//# sourceMappingURL=en.js.map

/***/ },

/***/ 282:
/***/ function(module, exports) {

	/* (ignored) */

/***/ },

/***/ 283:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (true) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;


/***/ },

/***/ 284:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports = module.exports = __webpack_require__(285)['default'];
	exports['default'] = exports;


/***/ },

/***/ 285:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var src$es5$$ = __webpack_require__(286);
	exports["default"] = createFormatCache;

	// -----------------------------------------------------------------------------

	function createFormatCache(FormatConstructor) {
	    var cache = src$es5$$.objCreate(null);

	    return function () {
	        var args    = Array.prototype.slice.call(arguments);
	        var cacheId = getCacheId(args);
	        var format  = cacheId && cache[cacheId];

	        if (!format) {
	            format = new (src$es5$$.bind.apply(FormatConstructor, [null].concat(args)))();

	            if (cacheId) {
	                cache[cacheId] = format;
	            }
	        }

	        return format;
	    };
	}

	// -- Utilities ----------------------------------------------------------------

	function getCacheId(inputs) {
	    // When JSON is not available in the runtime, we will not create a cache id.
	    if (typeof JSON === 'undefined') { return; }

	    var cacheId = [];

	    var i, len, input;

	    for (i = 0, len = inputs.length; i < len; i += 1) {
	        input = inputs[i];

	        if (input && typeof input === 'object') {
	            cacheId.push(orderedProps(input));
	        } else {
	            cacheId.push(input);
	        }
	    }

	    return JSON.stringify(cacheId);
	}

	function orderedProps(obj) {
	    var props = [],
	        keys  = [];

	    var key, i, len, prop;

	    for (key in obj) {
	        if (obj.hasOwnProperty(key)) {
	            keys.push(key);
	        }
	    }

	    var orderedKeys = keys.sort();

	    for (i = 0, len = orderedKeys.length; i < len; i += 1) {
	        key  = orderedKeys[i];
	        prop = {};

	        prop[key] = obj[key];
	        props[i]  = prop;
	    }

	    return props;
	}

	//# sourceMappingURL=memoizer.js.map

/***/ },

/***/ 286:
/***/ function(module, exports) {

	"use strict";
	/*
	Copyright (c) 2014, Yahoo! Inc. All rights reserved.
	Copyrights licensed under the New BSD License.
	See the accompanying LICENSE file for terms.
	*/

	/* jslint esnext: true */

	// Function.prototype.bind implementation from Mozilla Developer Network:
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Polyfill

	var bind = Function.prototype.bind || function (oThis) {
	    if (typeof this !== 'function') {
	      // closest thing possible to the ECMAScript 5
	      // internal IsCallable function
	      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
	    }

	    var aArgs   = Array.prototype.slice.call(arguments, 1),
	        fToBind = this,
	        fNOP    = function() {},
	        fBound  = function() {
	          return fToBind.apply(this instanceof fNOP
	                 ? this
	                 : oThis,
	                 aArgs.concat(Array.prototype.slice.call(arguments)));
	        };

	    if (this.prototype) {
	      // native functions don't have a prototype
	      fNOP.prototype = this.prototype;
	    }
	    fBound.prototype = new fNOP();

	    return fBound;
	};

	// Purposely using the same implementation as the Intl.js `Intl` polyfill.
	// Copyright 2013 Andy Earnshaw, MIT License

	var hop = Object.prototype.hasOwnProperty;

	var realDefineProp = (function () {
	    try { return !!Object.defineProperty({}, 'a', {}); }
	    catch (e) { return false; }
	})();

	var es3 = !realDefineProp && !Object.prototype.__defineGetter__;

	var defineProperty = realDefineProp ? Object.defineProperty :
	        function (obj, name, desc) {

	    if ('get' in desc && obj.__defineGetter__) {
	        obj.__defineGetter__(name, desc.get);
	    } else if (!hop.call(obj, name) || 'value' in desc) {
	        obj[name] = desc.value;
	    }
	};

	var objCreate = Object.create || function (proto, props) {
	    var obj, k;

	    function F() {}
	    F.prototype = proto;
	    obj = new F();

	    for (k in props) {
	        if (hop.call(props, k)) {
	            defineProperty(obj, k, props[k]);
	        }
	    }

	    return obj;
	};

	exports.bind = bind, exports.defineProperty = defineProperty, exports.objCreate = objCreate;

	//# sourceMappingURL=es5.js.map

/***/ },

/***/ 287:
/***/ function(module, exports, __webpack_require__) {

	!function(e,a){ true?module.exports=a():"function"==typeof define&&define.amd?define(a):(e.ReactIntlLocaleData=e.ReactIntlLocaleData||{},e.ReactIntlLocaleData.en=a())}(this,function(){"use strict";var e=[{locale:"en",pluralRuleFunction:function(e,a){var n=String(e).split("."),l=!n[1],o=Number(n[0])==e,t=o&&n[0].slice(-1),r=o&&n[0].slice(-2);return a?1==t&&11!=r?"one":2==t&&12!=r?"two":3==t&&13!=r?"few":"other":1==e&&l?"one":"other"},fields:{year:{displayName:"year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{one:"in {0} year",other:"in {0} years"},past:{one:"{0} year ago",other:"{0} years ago"}}},month:{displayName:"month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{one:"in {0} month",other:"in {0} months"},past:{one:"{0} month ago",other:"{0} months ago"}}},day:{displayName:"day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{one:"in {0} day",other:"in {0} days"},past:{one:"{0} day ago",other:"{0} days ago"}}},hour:{displayName:"hour",relativeTime:{future:{one:"in {0} hour",other:"in {0} hours"},past:{one:"{0} hour ago",other:"{0} hours ago"}}},minute:{displayName:"minute",relativeTime:{future:{one:"in {0} minute",other:"in {0} minutes"},past:{one:"{0} minute ago",other:"{0} minutes ago"}}},second:{displayName:"second",relative:{0:"now"},relativeTime:{future:{one:"in {0} second",other:"in {0} seconds"},past:{one:"{0} second ago",other:"{0} seconds ago"}}}}},{locale:"en-001",parentLocale:"en"},{locale:"en-150",parentLocale:"en-001"},{locale:"en-AG",parentLocale:"en-001"},{locale:"en-AI",parentLocale:"en-001"},{locale:"en-AS",parentLocale:"en"},{locale:"en-AT",parentLocale:"en-150"},{locale:"en-AU",parentLocale:"en-001"},{locale:"en-BB",parentLocale:"en-001"},{locale:"en-BE",parentLocale:"en-001"},{locale:"en-BI",parentLocale:"en"},{locale:"en-BM",parentLocale:"en-001"},{locale:"en-BS",parentLocale:"en-001"},{locale:"en-BW",parentLocale:"en-001"},{locale:"en-BZ",parentLocale:"en-001"},{locale:"en-CA",parentLocale:"en-001"},{locale:"en-CC",parentLocale:"en-001"},{locale:"en-CH",parentLocale:"en-150"},{locale:"en-CK",parentLocale:"en-001"},{locale:"en-CM",parentLocale:"en-001"},{locale:"en-CX",parentLocale:"en-001"},{locale:"en-CY",parentLocale:"en-001"},{locale:"en-DE",parentLocale:"en-150"},{locale:"en-DG",parentLocale:"en-001"},{locale:"en-DK",parentLocale:"en-150"},{locale:"en-DM",parentLocale:"en-001"},{locale:"en-Dsrt",pluralRuleFunction:function(e,a){return"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"en-ER",parentLocale:"en-001"},{locale:"en-FI",parentLocale:"en-150"},{locale:"en-FJ",parentLocale:"en-001"},{locale:"en-FK",parentLocale:"en-001"},{locale:"en-FM",parentLocale:"en-001"},{locale:"en-GB",parentLocale:"en-001"},{locale:"en-GD",parentLocale:"en-001"},{locale:"en-GG",parentLocale:"en-001"},{locale:"en-GH",parentLocale:"en-001"},{locale:"en-GI",parentLocale:"en-001"},{locale:"en-GM",parentLocale:"en-001"},{locale:"en-GU",parentLocale:"en"},{locale:"en-GY",parentLocale:"en-001"},{locale:"en-HK",parentLocale:"en-001"},{locale:"en-IE",parentLocale:"en-001"},{locale:"en-IL",parentLocale:"en-001"},{locale:"en-IM",parentLocale:"en-001"},{locale:"en-IN",parentLocale:"en-001"},{locale:"en-IO",parentLocale:"en-001"},{locale:"en-JE",parentLocale:"en-001"},{locale:"en-JM",parentLocale:"en-001"},{locale:"en-KE",parentLocale:"en-001"},{locale:"en-KI",parentLocale:"en-001"},{locale:"en-KN",parentLocale:"en-001"},{locale:"en-KY",parentLocale:"en-001"},{locale:"en-LC",parentLocale:"en-001"},{locale:"en-LR",parentLocale:"en-001"},{locale:"en-LS",parentLocale:"en-001"},{locale:"en-MG",parentLocale:"en-001"},{locale:"en-MH",parentLocale:"en"},{locale:"en-MO",parentLocale:"en-001"},{locale:"en-MP",parentLocale:"en"},{locale:"en-MS",parentLocale:"en-001"},{locale:"en-MT",parentLocale:"en-001"},{locale:"en-MU",parentLocale:"en-001"},{locale:"en-MW",parentLocale:"en-001"},{locale:"en-MY",parentLocale:"en-001"},{locale:"en-NA",parentLocale:"en-001"},{locale:"en-NF",parentLocale:"en-001"},{locale:"en-NG",parentLocale:"en-001"},{locale:"en-NL",parentLocale:"en-150"},{locale:"en-NR",parentLocale:"en-001"},{locale:"en-NU",parentLocale:"en-001"},{locale:"en-NZ",parentLocale:"en-001"},{locale:"en-PG",parentLocale:"en-001"},{locale:"en-PH",parentLocale:"en-001"},{locale:"en-PK",parentLocale:"en-001"},{locale:"en-PN",parentLocale:"en-001"},{locale:"en-PR",parentLocale:"en"},{locale:"en-PW",parentLocale:"en-001"},{locale:"en-RW",parentLocale:"en-001"},{locale:"en-SB",parentLocale:"en-001"},{locale:"en-SC",parentLocale:"en-001"},{locale:"en-SD",parentLocale:"en-001"},{locale:"en-SE",parentLocale:"en-150"},{locale:"en-SG",parentLocale:"en-001"},{locale:"en-SH",parentLocale:"en-001"},{locale:"en-SI",parentLocale:"en-150"},{locale:"en-SL",parentLocale:"en-001"},{locale:"en-SS",parentLocale:"en-001"},{locale:"en-SX",parentLocale:"en-001"},{locale:"en-SZ",parentLocale:"en-001"},{locale:"en-Shaw",pluralRuleFunction:function(e,a){return"other"},fields:{year:{displayName:"Year",relative:{0:"this year",1:"next year","-1":"last year"},relativeTime:{future:{other:"+{0} y"},past:{other:"-{0} y"}}},month:{displayName:"Month",relative:{0:"this month",1:"next month","-1":"last month"},relativeTime:{future:{other:"+{0} m"},past:{other:"-{0} m"}}},day:{displayName:"Day",relative:{0:"today",1:"tomorrow","-1":"yesterday"},relativeTime:{future:{other:"+{0} d"},past:{other:"-{0} d"}}},hour:{displayName:"Hour",relativeTime:{future:{other:"+{0} h"},past:{other:"-{0} h"}}},minute:{displayName:"Minute",relativeTime:{future:{other:"+{0} min"},past:{other:"-{0} min"}}},second:{displayName:"Second",relative:{0:"now"},relativeTime:{future:{other:"+{0} s"},past:{other:"-{0} s"}}}}},{locale:"en-TC",parentLocale:"en-001"},{locale:"en-TK",parentLocale:"en-001"},{locale:"en-TO",parentLocale:"en-001"},{locale:"en-TT",parentLocale:"en-001"},{locale:"en-TV",parentLocale:"en-001"},{locale:"en-TZ",parentLocale:"en-001"},{locale:"en-UG",parentLocale:"en-001"},{locale:"en-UM",parentLocale:"en"},{locale:"en-US",parentLocale:"en"},{locale:"en-VC",parentLocale:"en-001"},{locale:"en-VG",parentLocale:"en-001"},{locale:"en-VI",parentLocale:"en"},{locale:"en-VU",parentLocale:"en-001"},{locale:"en-WS",parentLocale:"en-001"},{locale:"en-ZA",parentLocale:"en-001"},{locale:"en-ZM",parentLocale:"en-001"},{locale:"en-ZW",parentLocale:"en-001"}];return e});

/***/ },

/***/ 288:
/***/ function(module, exports, __webpack_require__) {

	!function(e,a){ true?module.exports=a():"function"==typeof define&&define.amd?define(a):(e.ReactIntlLocaleData=e.ReactIntlLocaleData||{},e.ReactIntlLocaleData.ru=a())}(this,function(){"use strict";var e=[{locale:"ru",pluralRuleFunction:function(e,a){var t=String(e).split("."),r=t[0],o=!t[1],n=r.slice(-1),l=r.slice(-2);return a?"other":o&&1==n&&11!=l?"one":o&&n>=2&&n<=4&&(l<12||l>14)?"few":o&&0==n||o&&n>=5&&n<=9||o&&l>=11&&l<=14?"many":"other"},fields:{year:{displayName:"год",relative:{0:"в этом году",1:"в следующем году","-1":"в прошлом году"},relativeTime:{future:{one:"через {0} год",few:"через {0} года",many:"через {0} лет",other:"через {0} года"},past:{one:"{0} год назад",few:"{0} года назад",many:"{0} лет назад",other:"{0} года назад"}}},month:{displayName:"месяц",relative:{0:"в этом месяце",1:"в следующем месяце","-1":"в прошлом месяце"},relativeTime:{future:{one:"через {0} месяц",few:"через {0} месяца",many:"через {0} месяцев",other:"через {0} месяца"},past:{one:"{0} месяц назад",few:"{0} месяца назад",many:"{0} месяцев назад",other:"{0} месяца назад"}}},day:{displayName:"день",relative:{0:"сегодня",1:"завтра",2:"послезавтра","-2":"позавчера","-1":"вчера"},relativeTime:{future:{one:"через {0} день",few:"через {0} дня",many:"через {0} дней",other:"через {0} дней"},past:{one:"{0} день назад",few:"{0} дня назад",many:"{0} дней назад",other:"{0} дня назад"}}},hour:{displayName:"час",relativeTime:{future:{one:"через {0} час",few:"через {0} часа",many:"через {0} часов",other:"через {0} часа"},past:{one:"{0} час назад",few:"{0} часа назад",many:"{0} часов назад",other:"{0} часа назад"}}},minute:{displayName:"минута",relativeTime:{future:{one:"через {0} минуту",few:"через {0} минуты",many:"через {0} минут",other:"через {0} минуты"},past:{one:"{0} минуту назад",few:"{0} минуты назад",many:"{0} минут назад",other:"{0} минуты назад"}}},second:{displayName:"секунда",relative:{0:"сейчас"},relativeTime:{future:{one:"через {0} секунду",few:"через {0} секунды",many:"через {0} секунд",other:"через {0} секунды"},past:{one:"{0} секунду назад",few:"{0} секунды назад",many:"{0} секунд назад",other:"{0} секунды назад"}}}}},{locale:"ru-BY",parentLocale:"ru"},{locale:"ru-KG",parentLocale:"ru"},{locale:"ru-KZ",parentLocale:"ru"},{locale:"ru-MD",parentLocale:"ru"},{locale:"ru-UA",parentLocale:"ru"}];return e});

/***/ },

/***/ 289:
/***/ function(module, exports) {

	const
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
	  keys = Object.keys(messages);

	module.exports = {
	  messages,
	  keys
	};

/***/ },

/***/ 290:
/***/ function(module, exports) {

	const
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
	  keys = Object.keys(messages);

	module.exports = {
	  messages,
	  keys
	};

/***/ },

/***/ 291:
/***/ function(module, exports, __webpack_require__) {

	const React = __webpack_require__(4),
	      connect = __webpack_require__(246).connect,
	      browserHistory = __webpack_require__(175).browserHistory,
	      PATH = __webpack_require__(3).PATH,
	      login_actions = __webpack_require__(292),
	      FormattedMessage = __webpack_require__(264).FormattedMessage,
	      en_keys = __webpack_require__(289).keys;

	let input_username, input_password;

	const LoginCredentials = props => {
	  return React.createElement(
	    'div',
	    { className: 'wrap-login-form' },
	    React.createElement(
	      'form',
	      { onSubmit: props.onSubmit, className: 'login-form' },
	      React.createElement(
	        'div',
	        { className: 'title' },
	        React.createElement(FormattedMessage, { id: en_keys.$LOGIN })
	      ),
	      React.createElement('input', { value: props.username, placeholder: 'Login', onChange: props.handleChangeUsername,
	        ref: node => {
	          input_username = node;
	        }, className: props.invalid_credentials ? 'border-red' : '' }),
	      React.createElement('input', { value: props.password, type: 'password', placeholder: 'Password', onChange: props.handleChangePassword,
	        ref: node => {
	          input_password = node;
	        } }),
	      React.createElement(
	        'button',
	        { type: 'submit', disabled: props.pending_credentials ? 'disabled' : null },
	        React.createElement(FormattedMessage, { id: en_keys.$LOGIN })
	      )
	    )
	  );
	};

	const mapStateToProps = state => {
	  return {
	    username: state.username,
	    password: state.password,
	    pending_credentials: state.pending_credentials,
	    invalid_credentials: state.invalid_credentials
	  };
	};

	const mapDispatchToProps = dispatch => {
	  return {
	    onSubmit: event => {
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
	        browserHistory.push(PATH._MENU);
	      }, 500);
	    },
	    handleChangeUsername: event => {
	      dispatch(login_actions.inputUsername(event.target.value));
	    },
	    handleChangePassword: event => {
	      dispatch(login_actions.inputPassword(event.target.value));
	    }
	  };
	};

	const WrappedLoginCredentials = connect(mapStateToProps, mapDispatchToProps)(LoginCredentials);

	module.exports = WrappedLoginCredentials;

/***/ },

/***/ 292:
/***/ function(module, exports, __webpack_require__) {

	const action_constants = __webpack_require__(262);

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

/***/ },

/***/ 293:
/***/ function(module, exports, __webpack_require__) {

	const PATH = __webpack_require__(3).PATH,
	      React = __webpack_require__(4),
	      FormattedMessage = __webpack_require__(264).FormattedMessage,
	      en_keys = __webpack_require__(289).keys;

	// const engine = require('../js/game/engine');

	class SinglePlayer extends React.Component {

	  constructor() {
	    super();
	    // this._handleClick = this._handleClick.bind(this);
	  }

	  componentDidMount() {
	    // engine.init();
	    // context = canvas.getContext('2d');
	  }

	  componentWillUnmount() {}

	  render() {
	    return React.createElement(
	      'div',
	      { className: 'canvas-wrapper' },
	      React.createElement(
	        'canvas',
	        { ref: node => {
	            this.game_foreground_canvas = node;
	          } },
	        React.createElement(FormattedMessage, { id: en_keys.$CANVAS_NOT_SUPPORTED })
	      ),
	      React.createElement(
	        'canvas',
	        { ref: node => {
	            this.game_background_canvas = node;
	          } },
	        React.createElement(FormattedMessage, { id: en_keys.$CANVAS_NOT_SUPPORTED })
	      ),
	      'Single Player'
	    );
	  }
	}

	module.exports = SinglePlayer;

/***/ },

/***/ 294:
/***/ function(module, exports, __webpack_require__) {

	const constants = __webpack_require__(3),
	      PATH = constants.PATH,
	      LOCALE = constants.LOCALE,
	      React = __webpack_require__(4),
	      Link = __webpack_require__(175).Link,
	      connect = __webpack_require__(246).connect,
	      basic_actions = __webpack_require__(295),
	      FormattedMessage = __webpack_require__(264).FormattedMessage,
	      en_keys = __webpack_require__(289).keys;

	const Menu = props => {
	  return React.createElement(
	    'div',
	    null,
	    React.createElement(FormattedMessage, {
	      id: en_keys.$WELCOME,
	      values: { name: React.createElement(
	          'b',
	          null,
	          'Bob'
	        ), unreadCount: 100 }
	    }),
	    React.createElement(
	      'button',
	      { type: 'button', onClick: props.handleChangeLocale },
	      React.createElement(FormattedMessage, { id: en_keys.$CHANGE_LOCALE })
	    ),
	    React.createElement(
	      'ul',
	      null,
	      React.createElement(
	        'li',
	        null,
	        React.createElement(
	          Link,
	          { to: PATH._GAME_SINGLE_PLAYER },
	          React.createElement(FormattedMessage, { id: en_keys.$SINGLE_PLAYER })
	        )
	      )
	    )
	  );
	};

	const mapStateToProps = state => {
	  return {};
	};

	const mapDispatchToProps = dispatch => {
	  return {
	    handleChangeLocale: () => {
	      dispatch(basic_actions.changeLocale(LOCALE.RU));
	    }
	  };
	};

	const WrappedMenu = connect(mapStateToProps, mapDispatchToProps)(Menu);

	module.exports = WrappedMenu;

/***/ },

/***/ 295:
/***/ function(module, exports, __webpack_require__) {

	const action_constants = __webpack_require__(262);

	function changeLocale(locale) {
	  return {type: action_constants.CHANGE_LOCALE, locale}
	}

	module.exports = {
	  changeLocale
	};

/***/ }

});