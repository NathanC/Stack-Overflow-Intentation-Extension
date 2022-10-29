// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"jJH9H":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function handleMessage(message, sender) {
    // no need for this check now, but no harm having it in case we add other types later
    if (message.type === "set_active") {
        var ref, ref1, ref2;
        var color = message.text === "off" ? "#ff0000" : "#1a5276";
        var textColor = message.text === "off" ? "#000" : "#fff";
        browser.browserAction.setBadgeTextColor({
            color: textColor,
            tabId: (ref = sender.tab) === null || ref === void 0 ? void 0 : ref.id
        });
        browser.browserAction.setBadgeBackgroundColor({
            color: color,
            tabId: (ref1 = sender.tab) === null || ref1 === void 0 ? void 0 : ref1.id
        });
        browser.browserAction.setBadgeText({
            text: message.text,
            tabId: (ref2 = sender.tab) === null || ref2 === void 0 ? void 0 : ref2.id
        });
    }
}
browser.runtime.onMessage.addListener(handleMessage);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gTclZ"}],"gTclZ":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function get() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}]},["jJH9H"], "jJH9H", "parcelRequire2f33")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQUUsR0FBRztLQUNULENBQUMsQ0FBQztDQUNKLENBQUMiLCJzb3VyY2VzIjpbInNyYy9iYWNrZ3JvdW5kLXYyLnRzIiwibm9kZV9tb2R1bGVzL0BwYXJjZWwvdHJhbnNmb3JtZXItanMvc3JjL2VzbW9kdWxlLWhlbHBlcnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJ1bnRpbWVNZXNzYWdlIGZyb20gXCIuL1J1bnRpbWVNZXNzYWdlXCI7XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVNZXNzYWdlKG1lc3NhZ2U6IFJ1bnRpbWVNZXNzYWdlLCBzZW5kZXI6IGJyb3dzZXIucnVudGltZS5NZXNzYWdlU2VuZGVyKSB7XHJcblxyXG4gICAgLy8gbm8gbmVlZCBmb3IgdGhpcyBjaGVjayBub3csIGJ1dCBubyBoYXJtIGhhdmluZyBpdCBpbiBjYXNlIHdlIGFkZCBvdGhlciB0eXBlcyBsYXRlclxyXG4gICAgaWYobWVzc2FnZS50eXBlID09PSBcInNldF9hY3RpdmVcIikge1xyXG5cclxuICAgICAgICBjb25zdCBjb2xvciA9ICAgICBtZXNzYWdlLnRleHQgPT09IFwib2ZmXCIgPyBcIiNmZjAwMDBcIiA6IFwiIzFhNTI3NlwiXHJcbiAgICAgICAgY29uc3QgdGV4dENvbG9yID0gbWVzc2FnZS50ZXh0ID09PSBcIm9mZlwiID8gXCIjMDAwXCIgOiBcIiNmZmZcIlxyXG5cclxuICAgICAgICBicm93c2VyLmJyb3dzZXJBY3Rpb24uc2V0QmFkZ2VUZXh0Q29sb3Ioe2NvbG9yOiB0ZXh0Q29sb3IsIHRhYklkOiBzZW5kZXIudGFiPy5pZH0pXHJcbiAgICAgICAgYnJvd3Nlci5icm93c2VyQWN0aW9uLnNldEJhZGdlQmFja2dyb3VuZENvbG9yKHtjb2xvcjogY29sb3IsIHRhYklkOiBzZW5kZXIudGFiPy5pZH0pXHJcbiAgICAgICAgYnJvd3Nlci5icm93c2VyQWN0aW9uLnNldEJhZGdlVGV4dCh7dGV4dDogbWVzc2FnZS50ZXh0LCB0YWJJZDogc2VuZGVyLnRhYj8uaWR9KSAgICBcclxuICAgIH1cclxufVxyXG5cclxuYnJvd3Nlci5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihoYW5kbGVNZXNzYWdlKVxyXG4iLCJleHBvcnRzLmludGVyb3BEZWZhdWx0ID0gZnVuY3Rpb24gKGEpIHtcbiAgcmV0dXJuIGEgJiYgYS5fX2VzTW9kdWxlID8gYSA6IHtkZWZhdWx0OiBhfTtcbn07XG5cbmV4cG9ydHMuZGVmaW5lSW50ZXJvcEZsYWcgPSBmdW5jdGlvbiAoYSkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYSwgJ19fZXNNb2R1bGUnLCB7dmFsdWU6IHRydWV9KTtcbn07XG5cbmV4cG9ydHMuZXhwb3J0QWxsID0gZnVuY3Rpb24gKHNvdXJjZSwgZGVzdCkge1xuICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIGlmIChrZXkgPT09ICdkZWZhdWx0JyB8fCBrZXkgPT09ICdfX2VzTW9kdWxlJyB8fCBkZXN0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZGVzdCwga2V5LCB7XG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2Vba2V5XTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBkZXN0O1xufTtcblxuZXhwb3J0cy5leHBvcnQgPSBmdW5jdGlvbiAoZGVzdCwgZGVzdE5hbWUsIGdldCkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZGVzdCwgZGVzdE5hbWUsIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZ2V0LFxuICB9KTtcbn07XG4iXSwibmFtZXMiOltdLCJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC12Mi5IQVNIX1JFRl8zNjE3ZjE0ZTM2Yjg2N2NlLmpzLm1hcCJ9
