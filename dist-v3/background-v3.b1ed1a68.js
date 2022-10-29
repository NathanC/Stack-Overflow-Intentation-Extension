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
})({"lCCoz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function handleMessage(message, sender) {
    // no need for this check now, but no harm having it in case we add other types later
    if (message.type === "set_active") {
        var ref, ref1;
        var color = message.text === "off" ? "#ff0000" : "#1a5276";
        // const textColor = message.text === "off" ? "#000" : "#fff"
        // chrome automatically sets the text color based on the backround color
        chrome.action.setBadgeBackgroundColor({
            color: color,
            tabId: (ref = sender.tab) === null || ref === void 0 ? void 0 : ref.id
        });
        chrome.action.setBadgeText({
            text: message.text,
            tabId: (ref1 = sender.tab) === null || ref1 === void 0 ? void 0 : ref1.id
        });
    }
}
chrome.runtime.onMessage.addListener(handleMessage);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"glzl4"}],"glzl4":[function(require,module,exports) {
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

},{}]},["lCCoz"], "lCCoz", "parcelRequire2f33")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVFBOztBQUVBLFNBQVMsYUFBYSxDQUFDLE9BQXVCLEVBQUUsTUFBb0MsRUFBRTtJQUVsRixxRkFBcUY7SUFDckYsSUFBRyxPQUFPLENBQUMsSUFBSSxLQUFLLFlBQVksRUFBRTtZQU04QixHQUFVLEVBQ2YsSUFBVTtRQUxqRSxJQUFNLEtBQUssR0FBTyxPQUFPLENBQUMsSUFBSSxLQUFLLEtBQUssR0FBRyxTQUFTLEdBQUcsU0FBUztRQUNoRSw2REFBNkQ7UUFFN0Qsd0VBQXdFO1FBQ3hFLE1BQU0sQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUM7WUFBQyxLQUFLLEVBQUUsS0FBSztZQUFFLEtBQUssRUFBRSxDQUFBLEdBQVUsR0FBVixNQUFNLENBQUMsR0FBRyxjQUFWLEdBQVUsV0FBSSxHQUFkLEtBQUEsQ0FBYyxHQUFkLEdBQVUsQ0FBRSxFQUFFO1NBQUMsQ0FBQztRQUM1RSxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQztZQUFDLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtZQUFFLEtBQUssRUFBRSxDQUFBLElBQVUsR0FBVixNQUFNLENBQUMsR0FBRyxjQUFWLElBQVUsV0FBSSxHQUFkLEtBQUEsQ0FBYyxHQUFkLElBQVUsQ0FBRSxFQUFFO1NBQUMsQ0FBQztLQUMxRTtDQUNKO0FBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQzs7O0FDeEJuRCxPQUFPLENBQUMsY0FBYyxHQUFHLFNBQVUsQ0FBQyxFQUFFO0lBQ3BDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxHQUFHO1FBQUMsT0FBTyxFQUFFLENBQUM7S0FBQyxDQUFDO0NBQzdDLENBQUM7QUFFRixPQUFPLENBQUMsaUJBQWlCLEdBQUcsU0FBVSxDQUFDLEVBQUU7SUFDdkMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxFQUFFO1FBQUMsS0FBSyxFQUFFLElBQUk7S0FBQyxDQUFDLENBQUM7Q0FDdkQsQ0FBQztBQUVGLE9BQU8sQ0FBQyxTQUFTLEdBQUcsU0FBVSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVUsR0FBRyxFQUFFO1FBQ3pDLElBQUksR0FBRyxLQUFLLFNBQVMsSUFBSSxHQUFHLEtBQUssWUFBWSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQ3ZFLE9BQU87UUFHVCxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7WUFDL0IsVUFBVSxFQUFFLElBQUk7WUFDaEIsR0FBRyxFQUFFLFNBQUwsR0FBRyxHQUFjO2dCQUNmLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3BCO1NBQ0YsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7Q0FDYixDQUFDO0FBRUYsT0FBTyxDQUFDLE1BQU0sR0FBRyxTQUFVLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFO0lBQzlDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRTtRQUNwQyxVQUFVLEVBQUUsSUFBSTtRQUNoQixHQUFHLEVBQUUsR0FBRztLQUNULENBQUMsQ0FBQztDQUNKLENBQUMiLCJzb3VyY2VzIjpbInNyYy9iYWNrZ3JvdW5kLXYzLnRzIiwibm9kZV9tb2R1bGVzL0BwYXJjZWwvdHJhbnNmb3JtZXItanMvc3JjL2VzbW9kdWxlLWhlbHBlcnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIFRoaXMgaXMgdG8gc3VwcG9ydCBtYW5pZmVzdCB2Mywgd2hpY2ggcmVxdWlyZXNcclxuICogc2VydmljZSB3b3JrZXJzIGluc3RlYWQgb2YgYmFja2dyb3VuZCBzY3JpcHRzLlxyXG4gKiBcclxuICogU2luY2UgdGhpcyBpcyBvbmx5IGZvciB2Mywgd2UnbGwgZGlyZWN0bHkgdXNlIHRoZSBcImNocm9tZVwiIG9iamVjdCBoZXJlLlxyXG4gKi9cclxuXHJcblxyXG5pbXBvcnQgUnVudGltZU1lc3NhZ2UgZnJvbSBcIi4vUnVudGltZU1lc3NhZ2VcIjtcclxuXHJcbmZ1bmN0aW9uIGhhbmRsZU1lc3NhZ2UobWVzc2FnZTogUnVudGltZU1lc3NhZ2UsIHNlbmRlcjogY2hyb21lLnJ1bnRpbWUuTWVzc2FnZVNlbmRlcikge1xyXG5cclxuICAgIC8vIG5vIG5lZWQgZm9yIHRoaXMgY2hlY2sgbm93LCBidXQgbm8gaGFybSBoYXZpbmcgaXQgaW4gY2FzZSB3ZSBhZGQgb3RoZXIgdHlwZXMgbGF0ZXJcclxuICAgIGlmKG1lc3NhZ2UudHlwZSA9PT0gXCJzZXRfYWN0aXZlXCIpIHtcclxuXHJcbiAgICAgICAgY29uc3QgY29sb3IgPSAgICAgbWVzc2FnZS50ZXh0ID09PSBcIm9mZlwiID8gXCIjZmYwMDAwXCIgOiBcIiMxYTUyNzZcIlxyXG4gICAgICAgIC8vIGNvbnN0IHRleHRDb2xvciA9IG1lc3NhZ2UudGV4dCA9PT0gXCJvZmZcIiA/IFwiIzAwMFwiIDogXCIjZmZmXCJcclxuXHJcbiAgICAgICAgLy8gY2hyb21lIGF1dG9tYXRpY2FsbHkgc2V0cyB0aGUgdGV4dCBjb2xvciBiYXNlZCBvbiB0aGUgYmFja3JvdW5kIGNvbG9yXHJcbiAgICAgICAgY2hyb21lLmFjdGlvbi5zZXRCYWRnZUJhY2tncm91bmRDb2xvcih7Y29sb3I6IGNvbG9yLCB0YWJJZDogc2VuZGVyLnRhYj8uaWR9KVxyXG4gICAgICAgIGNocm9tZS5hY3Rpb24uc2V0QmFkZ2VUZXh0KHt0ZXh0OiBtZXNzYWdlLnRleHQsIHRhYklkOiBzZW5kZXIudGFiPy5pZH0pICBcclxuICAgIH1cclxufVxyXG5cclxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGhhbmRsZU1lc3NhZ2UpXHJcblxyXG4gIiwiZXhwb3J0cy5pbnRlcm9wRGVmYXVsdCA9IGZ1bmN0aW9uIChhKSB7XG4gIHJldHVybiBhICYmIGEuX19lc01vZHVsZSA/IGEgOiB7ZGVmYXVsdDogYX07XG59O1xuXG5leHBvcnRzLmRlZmluZUludGVyb3BGbGFnID0gZnVuY3Rpb24gKGEpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGEsICdfX2VzTW9kdWxlJywge3ZhbHVlOiB0cnVlfSk7XG59O1xuXG5leHBvcnRzLmV4cG9ydEFsbCA9IGZ1bmN0aW9uIChzb3VyY2UsIGRlc3QpIHtcbiAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBpZiAoa2V5ID09PSAnZGVmYXVsdCcgfHwga2V5ID09PSAnX19lc01vZHVsZScgfHwgZGVzdC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRlc3QsIGtleSwge1xuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gc291cmNlW2tleV07XG4gICAgICB9LFxuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gZGVzdDtcbn07XG5cbmV4cG9ydHMuZXhwb3J0ID0gZnVuY3Rpb24gKGRlc3QsIGRlc3ROYW1lLCBnZXQpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRlc3QsIGRlc3ROYW1lLCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGdldCxcbiAgfSk7XG59O1xuIl0sIm5hbWVzIjpbXSwidmVyc2lvbiI6MywiZmlsZSI6ImJhY2tncm91bmQtdjMuSEFTSF9SRUZfN2VkOTY0YmVlM2IyZjRkZC5qcy5tYXAifQ==
