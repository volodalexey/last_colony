var createVNode = require('inferno').createVNode,
  CreateClass = require('inferno-create-class');

function isNull(obj) {
  return obj === null;
}

var ASYNC_STATUS = {
  pending: 'pending',
  fulfilled: 'fulfilled',
  rejected: 'rejected'
};

var Route = CreateClass({
  async: function() {
    var this$1 = this;

    var async = this.props.async;

    if (async) {
      this.setState({
        async: {status: ASYNC_STATUS.pending}
      });
      async(this.props.params).then(function(value) {
        this$1.setState({
          async: {
            status: ASYNC_STATUS.fulfilled,
            value: value
          }
        });
      }, this.reject).catch(this.reject);
    }
  },

  reject: function(value) {
    this.setState({
      async: {
        status: ASYNC_STATUS.rejected,
        value: value
      }
    });
  },

  componentWillReceiveProps: function() {
    this.async();
  },

  componentWillMount: function() {
    this.async();
  },

  render: function() {
    var ref = this.props;
    var component = ref.component;
    var params = ref.params;

    return createVNode().setTag(component).setAttrs({params: params, async: this.state.async});
  }
});

var EMPTY$1 = {};

function segmentize(url) {
  return strip(url).split('/');
}

function strip(url) {
  return url.replace(/(^\/+|\/+$)/g, '');
}

function convertToHashbang(url) {
  if (url.indexOf('#') === -1) {
    url = '/';
  } else {
    var splitHashUrl = url.split('#!');
    splitHashUrl.shift();
    url = splitHashUrl.join('');
  }
  return url;
}

// Thanks goes to Preact for this function: https://github.com/developit/preact-router/blob/master/src/util.js#L4
function exec(url, route, opts) {
  if (opts === void 0) opts = EMPTY$1;

  var reg = /(?:\?([^#]*))?(#.*)?$/,
    c = url.match(reg),
    matches = {},
    ret;
  if (c && c[1]) {
    var p = c[1].split('&');
    for (var i = 0; i < p.length; i++) {
      var r = p[i].split('=');
      matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
    }
  }
  url = segmentize(url.replace(reg, ''));
  route = segmentize(route || '');
  var max = Math.max(url.length, route.length);
  var hasWildcard = false;

  for (var i$1 = 0; i$1 < max; i$1++) {
    if (route[i$1] && route[i$1].charAt(0) === ':') {
      var param = route[i$1].replace(/(^\:|[+*?]+$)/g, ''),
        flags = (route[i$1].match(/[+*?]+$/) || EMPTY$1)[0] || '',
        plus = ~flags.indexOf('+'),
        star = ~flags.indexOf('*'),
        val = url[i$1] || '';
      if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
        ret = false;
        break;
      }
      matches[param] = decodeURIComponent(val);
      if (plus || star) {
        matches[param] = url.slice(i$1).map(decodeURIComponent).join('/');
        break;
      }
    }
    else if (route[i$1] !== url[i$1] && !hasWildcard) {
      if (route[i$1] === '*' && route.length === i$1 + 1) {
        hasWildcard = true;
      } else {
        ret = false;
        break;
      }
    }
  }
  if (opts.default !== true && ret === false) {
    return false;
  }
  return matches;
}

function pathRankSort(a, b) {
  var aAttr = a.attrs || EMPTY$1,
    bAttr = b.attrs || EMPTY$1;
  var diff = rank(bAttr.path) - rank(aAttr.path);
  return diff || (bAttr.path.length - aAttr.path.length);
}

function rank(url) {
  return (strip(url).match(/\/+/g) || '').length;
}

var Router = CreateClass({
  getChildContext: function() {
    return {
      history: this.props.history,
      hashbang: this.props.hashbang
    };
  },
  componentWillMount: function() {
    this.props.history.addRouter(this);
  },
  componentWillUnmount: function() {
    this.props.history.removeRouter(this);
  },
  routeTo: function(url) {
    this._didRoute = false;
    this.setState({url: url});
    return this._didRoute;
  },
  render: function() {
    var children = toArray(this.props.children);
    var url = this.props.url || this.state.url;
    var wrapperComponent = this.props.component;
    var hashbang = this.props.hashbang;

    return handleRoutes(children, url, hashbang, wrapperComponent, '');
  }
});

function toArray(children) {
  return Array.isArray(children) ? children : (children ? [children] : children);
}

function handleRoutes(routes, url, hashbang, wrapperComponent, lastPath) {
  routes.sort(pathRankSort);

  for (var i = 0; i < routes.length; i++) {
    var route = routes[i];
    var ref = route.attrs;
    var path = ref.path;
    var fullPath = lastPath + path;
    var params = exec(hashbang ? convertToHashbang(url) : url, fullPath);
    var children = toArray(route.children);

    if (children) {
      var subRoute = handleRoutes(children, url, hashbang, wrapperComponent, fullPath);

      if (!isNull(subRoute)) {
        return subRoute;
      }
    }
    if (params) {
      if (wrapperComponent) {
        return createVNode().setTag(wrapperComponent).setChildren(route).setAttrs({
          params: params
        });
      }
      return route.setAttrs(Object.assign({}, {params: params}, route.attrs));
    }
  }
  return !lastPath && wrapperComponent ? createVNode().setTag(wrapperComponent) : null;
}

function Link(ref, ref$1) {
  var to = ref.to;
  var children = ref.children;
  var hashbang = ref$1.hashbang;
  var history = ref$1.history;

  return (createVNode().setAttrs({
    href: hashbang ? history.getHashbangRoot() + convertToHashbang('#!' + to) : to
  }).setTag('a').setChildren(children));
}

var routers = [];

function getCurrentUrl() {
  var url = typeof location !== 'undefined' ? location : EMPTY;

  return ("" + (url.pathname || '') + (url.search || '') + (url.hash || ''));
}

function getHashbangRoot() {
  var url = typeof location !== 'undefined' ? location : EMPTY;

  return ("" + (url.protocol + '//' || '') + (url.host || '') + (url.pathname || '') + (url.search || '') + "#!");
}

function routeTo(url) {
  var didRoute = false;
  for (var i = 0; i < routers.length; i++) {
    if (routers[i].routeTo(url) === true) {
      didRoute = true;
    }
  }
  return didRoute;
}

// if (isBrowser) {
//   window.addEventListener('popstate', function () { return routeTo(getCurrentUrl()); });
// }

var browserHistory = {
  addRouter: function addRouter(router) {
    routers.push(router);
  },
  removeRouter: function removeRouter(router) {
    routers.splice(routers.indexOf(router), 1);
  },
  getCurrentUrl: getCurrentUrl,
  getHashbangRoot: getHashbangRoot
};

module.exports = {
  Route: Route,
  Router: Router,
  Link: Link,
  browserHistory: browserHistory
};