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
})({"aFETT":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _asyncToGeneratorMjs = require("@swc/helpers/src/_async_to_generator.mjs");
var _asyncToGeneratorMjsDefault = parcelHelpers.interopDefault(_asyncToGeneratorMjs);
var _objectSpreadMjs = require("@swc/helpers/src/_object_spread.mjs");
var _objectSpreadMjsDefault = parcelHelpers.interopDefault(_objectSpreadMjs);
var _slicedToArrayMjs = require("@swc/helpers/src/_sliced_to_array.mjs");
var _slicedToArrayMjsDefault = parcelHelpers.interopDefault(_slicedToArrayMjs);
var _regeneratorRuntime = require("regenerator-runtime");
var _regeneratorRuntimeDefault = parcelHelpers.interopDefault(_regeneratorRuntime);
var _runtimeMessage = require("./RuntimeMessage");
var _textareaDev = require("./textareaDev");
var _textareaDevDefault = parcelHelpers.interopDefault(_textareaDev);
var _v2V3Abstractions = require("./v2-v3-abstractions");
var currentlyEnriched = new WeakMap();
function enrichWithIndentation(textArea) {
    // remove any past enrichment
    removeIndentationEnrichment(textArea);
    var listener = (0, _textareaDevDefault.default)((storageState === null || storageState === void 0 ? void 0 : storageState.numberOfSpacesPerTab) || 4);
    currentlyEnriched.set(textArea, listener);
    textArea.addEventListener("keydown", listener, true);
}
function removeIndentationEnrichment(textArea) {
    var prexistingListener = currentlyEnriched.get(textArea);
    if (prexistingListener !== undefined) {
        textArea.removeEventListener("keydown", prexistingListener, true);
        currentlyEnriched.delete(textArea);
    }
}
function nodeIsElement(node) {
    return node.nodeType === Node.ELEMENT_NODE;
}
/**
 * Restore the initial attributes to a TextArea after we remove the overlay
 */ function restoreInitialAttributes(textArea) {
    var initialAttributes = textAreas.get(textArea);
    if (!initialAttributes) {
        console.warn("Tried to remove initial attributes from text area, but textarea not found in map");
        return;
    }
    if (initialAttributes["aria-description"] === null) textArea.removeAttribute("aria-description");
    else textArea.setAttribute("aria-description", initialAttributes["aria-description"]);
    if (initialAttributes.spellcheck === null) textArea.removeAttribute("spellcheck");
    else textArea.setAttribute("spellcheck", initialAttributes.spellcheck);
}
/**
 * Capture the initial (relevant) attrbiutes from a text area before we apply the overlay
 */ function getInitialAttributes(textArea) {
    var existingAriaDescription = textArea.getAttribute("aria-description");
    var existingSpellcheck = textArea.getAttribute("spellcheck");
    return {
        "aria-description": existingAriaDescription,
        spellcheck: existingSpellcheck
    };
}
var textAreas = new Map();
// Initialize all the text areas we see after load
document.querySelectorAll("textarea").forEach(function(preexistingTextArea) {
    textAreas.set(preexistingTextArea, getInitialAttributes(preexistingTextArea));
});
function removeOverlay(textArea, removePermenantly) {
    textArea.removeEventListener("click", handleOverlayClick);
    textArea.removeEventListener("keydown", handleOverlayKeyDown);
    if (removePermenantly) {
        var stateUpdate = {
            welcomeMessageDismissed: true
        };
        (0, _v2V3Abstractions.compatibleStorage).sync.set(stateUpdate);
    }
    textArea.classList.remove("stack-overflow-indentation-plus-plus-welcome-overlay");
    restoreInitialAttributes(textArea);
}
function handleOverlayKeyDown(event) {
    removeOverlay(this, true);
    this.removeEventListener("click", handleOverlayClick);
}
function handleOverlayClick(event) {
    removeOverlay(this, true);
    this.removeEventListener("keydown", handleOverlayKeyDown);
}
var domObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        var node = mutation.target;
        if (nodeIsElement(node)) {
            var newTextElements = Array.from(node.querySelectorAll("textarea"));
            newTextElements.forEach(function(newTextArea) {
                // blacklist comments, for now. We may want to whitelist other stuff instead, later
                var isComment = newTextArea.name === "comment" || newTextArea.placeholder === "Use comments to ask for clarification or add more information. Avoid answering questions in comments." || newTextArea.closest("comment-form");
                if (!isComment) textAreas.set(newTextArea, getInitialAttributes(newTextArea));
            });
            if (newTextElements.length > 0) applyDomModifications(storageState);
        }
    });
});
function applyDomModifications(existingState) {
    // tell the background runner that we're active, so it can change the badge text
    (0, _runtimeMessage.sendTypedMessage)({
        type: "set_active",
        text: existingState.functionalityDisabled ? "off" : "on"
    });
    textAreas.forEach(function(initialAttributes, textArea) {
        if (existingState.functionalityDisabled) {
            removeIndentationEnrichment(textArea);
            removeOverlay(textArea, false);
            textArea.classList.remove("stack-exchange-indendation-plus-plus-bordered");
        } else {
            // not disabled, so we apply all our modification based on other settings
            if (existingState.welcomeMessageDismissed) removeOverlay(textArea, false);
            else {
                textArea.classList.add("stack-overflow-indentation-plus-plus-welcome-overlay");
                // store various settings, spellcheck and aria 
                textArea.spellcheck = false;
                // Might not be needed, as the background would likely be ignored by screen readers
                // TODO: find if this is a useful accessibility setting, or useless/detrimental
                textArea.setAttribute("aria-description", "Textarea with an overlay welcome message from the Stack Overflow ++ extension. Any keyboard or mouse interaction will permanently dismiss this overlay. Overlay contains an image with text that welcomes you to the extension, instructs you that tabbing will indent one or more lines and shift-tabbing will de-indent, and notes that you can use the extension's toolbar action to change various settings (such as the number of spaces per tab). Interact to dismiss, and I hope you enjoy the extension!");
                // each listener will fire once, and when fired will remove the other listner that wasn't fired
                textArea.addEventListener("click", handleOverlayClick, {
                    once: true
                });
                textArea.addEventListener("keydown", handleOverlayKeyDown, {
                    once: true
                });
            }
            var _textAreaBorderEnabled;
            if ((_textAreaBorderEnabled = existingState.textAreaBorderEnabled) !== null && _textAreaBorderEnabled !== void 0 ? _textAreaBorderEnabled : true) textArea.classList.add("stack-exchange-indendation-plus-plus-bordered");
            else textArea.classList.remove("stack-exchange-indendation-plus-plus-bordered");
            enrichWithIndentation(textArea);
        }
    });
}
/**
 * Utility function to add CSS in multiple passes.
 * @param {string} styleString
 */ function addStyle(styleString) {
    var style = document.createElement("style");
    style.textContent = styleString;
    document.head.append(style);
}
// it seems like for manifest 3, the bundler automatically gets the url on `require`, but only gives the file path for manifest 2. Strange.
var compatibleGetURL = function(pathOrUrl) {
    return typeof browser === "undefined" ? pathOrUrl : browser.runtime.getURL(pathOrUrl);
};
var textAreaOverlayUrl = compatibleGetURL(require("../images/textAreaOverlay.png"));
var textAreaOverlayHoverUrl = compatibleGetURL(require("../images/textAreaOverlayHovered.png"));
// we need to get the image url from the runtime, so we can't define this in our css file
// instead, we just inject it into the head
// we add both images in the background-image, but the later will be hidden by the gradient
// however, this enforces it gets loaded, so that when we hover later this is no delay
addStyle("\n  textarea.stack-overflow-indentation-plus-plus-welcome-overlay, textarea.stack-overflow-indentation-plus-plus-welcome-overlay:focus {\n    background-image: url(".concat(textAreaOverlayUrl, "), linear-gradient(to right, #a8c0ff, #3f2b96), url(").concat(textAreaOverlayHoverUrl, ");\n    color: transparent;\n    background-repeat:no-repeat;\n    background-position: center center;\n    cursor: pointer;\n  }\n  \n  textarea.stack-overflow-indentation-plus-plus-welcome-overlay:hover {\n    background-image: url(").concat(textAreaOverlayHoverUrl, "), linear-gradient(to right, #a8c0ff, #3f2b96);\n  } \n"));
// TODO: centralize defaults for here and popup
var storageState = {};
function setup() {
    return _setup.apply(this, arguments);
}
function _setup() {
    _setup = /**
 * Get inital state
 * 
 * apply all modificiations to the dom (hook into textareas for indentation, add border, potentially add overlay, or remove any of these)
 * 
 * listen to any changes of sync storage
 *    * and reapply dom modifications
 * 
 * observe new text areas added
 *    * and reapply dom modifications
 */ (0, _asyncToGeneratorMjsDefault.default)((0, _regeneratorRuntimeDefault.default).mark(function _callee() {
        var initialStorageState;
        return (0, _regeneratorRuntimeDefault.default).wrap(function _callee$(_ctx) {
            while(1)switch(_ctx.prev = _ctx.next){
                case 0:
                    _ctx.next = 2;
                    return (0, _v2V3Abstractions.compatibleStorage).sync.get();
                case 2:
                    initialStorageState = _ctx.sent;
                    storageState = initialStorageState;
                    applyDomModifications(storageState);
                    (0, _v2V3Abstractions.compatibleStorage).onChanged.addListener(function(changes, area) {
                        if (area !== "sync") // we only care about sync state. storage.sync.onChanged doesn't exist for the "browser" object
                        return;
                        var allChanges = {};
                        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                        try {
                            for(var _iterator = Object.entries(changes)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                                var _value = (0, _slicedToArrayMjsDefault.default)(_step.value, 2), property = _value[0], change = _value[1];
                                allChanges[property] = change.newValue;
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally{
                            try {
                                if (!_iteratorNormalCompletion && _iterator.return != null) {
                                    _iterator.return();
                                }
                            } finally{
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }
                        storageState = (0, _objectSpreadMjsDefault.default)({}, storageState, allChanges);
                        applyDomModifications(storageState);
                    });
                    // observe the document document body for changes. We could probably observe a smaller portion of the page,
                    // but this will catch all changes and Stack Overflow isn't a highly dynamic page so the cost is cheap
                    domObserver.observe(document.body, {
                        childList: true,
                        subtree: true
                    });
                case 7:
                case "end":
                    return _ctx.stop();
            }
        }, _callee);
    }));
    return _setup.apply(this, arguments);
}
setup();

},{"@swc/helpers/src/_async_to_generator.mjs":"bNubM","@swc/helpers/src/_object_spread.mjs":"7Mxgs","@swc/helpers/src/_sliced_to_array.mjs":"eYCgk","regenerator-runtime":"lrsUx","./RuntimeMessage":"1HaHJ","./textareaDev":"arJpu","./v2-v3-abstractions":"7o4s8","../images/textAreaOverlay.png":"gtcfx","../images/textAreaOverlayHovered.png":"8qOV3","@parcel/transformer-js/src/esmodule-helpers.js":"gTclZ"}],"bNubM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) resolve(value);
    else Promise.resolve(value).then(_next, _throw);
}
function _asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
exports.default = _asyncToGenerator;

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

},{}],"7Mxgs":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _definePropertyMjs = require("./_define_property.mjs");
var _definePropertyMjsDefault = parcelHelpers.interopDefault(_definePropertyMjs);
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
        ownKeys.forEach(function(key) {
            (0, _definePropertyMjsDefault.default)(target, key, source[key]);
        });
    }
    return target;
}
exports.default = _objectSpread;

},{"./_define_property.mjs":"8qId2","@parcel/transformer-js/src/esmodule-helpers.js":"gTclZ"}],"8qId2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _defineProperty(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}
exports.default = _defineProperty;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gTclZ"}],"eYCgk":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _arrayWithHolesMjs = require("./_array_with_holes.mjs");
var _arrayWithHolesMjsDefault = parcelHelpers.interopDefault(_arrayWithHolesMjs);
var _iterableToArrayMjs = require("./_iterable_to_array.mjs");
var _iterableToArrayMjsDefault = parcelHelpers.interopDefault(_iterableToArrayMjs);
var _nonIterableRestMjs = require("./_non_iterable_rest.mjs");
var _nonIterableRestMjsDefault = parcelHelpers.interopDefault(_nonIterableRestMjs);
var _unsupportedIterableToArrayMjs = require("./_unsupported_iterable_to_array.mjs");
var _unsupportedIterableToArrayMjsDefault = parcelHelpers.interopDefault(_unsupportedIterableToArrayMjs);
function _slicedToArray(arr, i) {
    return (0, _arrayWithHolesMjsDefault.default)(arr) || (0, _iterableToArrayMjsDefault.default)(arr, i) || (0, _unsupportedIterableToArrayMjsDefault.default)(arr, i) || (0, _nonIterableRestMjsDefault.default)();
}
exports.default = _slicedToArray;

},{"./_array_with_holes.mjs":"3jKxR","./_iterable_to_array.mjs":"c2tJL","./_non_iterable_rest.mjs":"3GDCs","./_unsupported_iterable_to_array.mjs":"fVQ70","@parcel/transformer-js/src/esmodule-helpers.js":"gTclZ"}],"3jKxR":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
exports.default = _arrayWithHoles;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gTclZ"}],"c2tJL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
exports.default = _iterableToArray;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gTclZ"}],"3GDCs":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
exports.default = _nonIterableRest;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gTclZ"}],"fVQ70":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _arrayLikeToArrayMjs = require("./_array_like_to_array.mjs");
var _arrayLikeToArrayMjsDefault = parcelHelpers.interopDefault(_arrayLikeToArrayMjs);
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return (0, _arrayLikeToArrayMjsDefault.default)(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return (0, _arrayLikeToArrayMjsDefault.default)(o, minLen);
}
exports.default = _unsupportedIterableToArray;

},{"./_array_like_to_array.mjs":"h0FuX","@parcel/transformer-js/src/esmodule-helpers.js":"gTclZ"}],"h0FuX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
exports.default = _arrayLikeToArray;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gTclZ"}],"lrsUx":[function(require,module,exports) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var runtime = function(exports) {
    "use strict";
    var define = function define(obj, key, value) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
        return obj[key];
    };
    var wrap = function wrap(innerFn, outerFn, self, tryLocsList) {
        // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
        var generator = Object.create(protoGenerator.prototype);
        var context = new Context(tryLocsList || []);
        // The ._invoke method unifies the implementations of the .next,
        // .throw, and .return methods.
        defineProperty(generator, "_invoke", {
            value: makeInvokeMethod(innerFn, self, context)
        });
        return generator;
    };
    var tryCatch = // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
        try {
            return {
                type: "normal",
                arg: fn.call(obj, arg)
            };
        } catch (err) {
            return {
                type: "throw",
                arg: err
            };
        }
    };
    var Generator = // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {};
    var GeneratorFunction = function GeneratorFunction() {};
    var GeneratorFunctionPrototype = function GeneratorFunctionPrototype() {};
    var defineIteratorMethods = // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
        [
            "next",
            "throw",
            "return"
        ].forEach(function(method) {
            define(prototype, method, function(arg) {
                return this._invoke(method, arg);
            });
        });
    };
    var AsyncIterator = function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
            var record = tryCatch(generator[method], generator, arg);
            if (record.type === "throw") reject(record.arg);
            else {
                var result = record.arg;
                var value = result.value;
                if (value && typeof value === "object" && hasOwn.call(value, "__await")) return PromiseImpl.resolve(value.__await).then(function(value) {
                    invoke("next", value, resolve, reject);
                }, function(err) {
                    invoke("throw", err, resolve, reject);
                });
                return PromiseImpl.resolve(value).then(function(unwrapped) {
                    // When a yielded Promise is resolved, its final value becomes
                    // the .value of the Promise<{value,done}> result for the
                    // current iteration.
                    result.value = unwrapped;
                    resolve(result);
                }, function(error) {
                    // If a rejected Promise was yielded, throw the rejection back
                    // into the async generator function so it can be handled there.
                    return invoke("throw", error, resolve, reject);
                });
            }
        }
        var previousPromise;
        function enqueue(method, arg) {
            function callInvokeWithMethodAndArg() {
                return new PromiseImpl(function(resolve, reject) {
                    invoke(method, arg, resolve, reject);
                });
            }
            return previousPromise = // If enqueue has been called before, then we want to wait until
            // all previous Promises have been resolved before calling invoke,
            // so that results are always delivered in the correct order. If
            // enqueue has not been called before, then it is important to
            // call invoke immediately, without waiting on a callback to fire,
            // so that the async generator function has the opportunity to do
            // any necessary setup in a predictable way. This predictability
            // is why the Promise constructor synchronously invokes its
            // executor callback, and why async functions synchronously
            // execute code before the first await. Since we implement simple
            // async functions in terms of async generators, it is especially
            // important to get this right, even though it requires care.
            previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
        // Define the unified helper method that is used to implement .next,
        // .throw, and .return (see defineIteratorMethods).
        defineProperty(this, "_invoke", {
            value: enqueue
        });
    };
    var makeInvokeMethod = function makeInvokeMethod(innerFn, self, context) {
        var state = GenStateSuspendedStart;
        return function invoke(method, arg) {
            if (state === GenStateExecuting) throw new Error("Generator is already running");
            if (state === GenStateCompleted) {
                if (method === "throw") throw arg;
                // Be forgiving, per 25.3.3.3.3 of the spec:
                // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
                return doneResult();
            }
            context.method = method;
            context.arg = arg;
            while(true){
                var delegate = context.delegate;
                if (delegate) {
                    var delegateResult = maybeInvokeDelegate(delegate, context);
                    if (delegateResult) {
                        if (delegateResult === ContinueSentinel) continue;
                        return delegateResult;
                    }
                }
                if (context.method === "next") // Setting context._sent for legacy support of Babel's
                // function.sent implementation.
                context.sent = context._sent = context.arg;
                else if (context.method === "throw") {
                    if (state === GenStateSuspendedStart) {
                        state = GenStateCompleted;
                        throw context.arg;
                    }
                    context.dispatchException(context.arg);
                } else if (context.method === "return") context.abrupt("return", context.arg);
                state = GenStateExecuting;
                var record = tryCatch(innerFn, self, context);
                if (record.type === "normal") {
                    // If an exception is thrown from innerFn, we leave state ===
                    // GenStateExecuting and loop back for another invocation.
                    state = context.done ? GenStateCompleted : GenStateSuspendedYield;
                    if (record.arg === ContinueSentinel) continue;
                    return {
                        value: record.arg,
                        done: context.done
                    };
                } else if (record.type === "throw") {
                    state = GenStateCompleted;
                    // Dispatch the exception by looping back around to the
                    // context.dispatchException(context.arg) call above.
                    context.method = "throw";
                    context.arg = record.arg;
                }
            }
        };
    };
    var pushTryEntry = function pushTryEntry(locs) {
        var entry = {
            tryLoc: locs[0]
        };
        if (1 in locs) entry.catchLoc = locs[1];
        if (2 in locs) {
            entry.finallyLoc = locs[2];
            entry.afterLoc = locs[3];
        }
        this.tryEntries.push(entry);
    };
    var resetTryEntry = function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal";
        delete record.arg;
        entry.completion = record;
    };
    var Context = function Context(tryLocsList) {
        // The root entry object (effectively a try statement without a catch
        // or a finally block) gives us a place to store values thrown from
        // locations where there is no enclosing try statement.
        this.tryEntries = [
            {
                tryLoc: "root"
            }
        ];
        tryLocsList.forEach(pushTryEntry, this);
        this.reset(true);
    };
    var values = function values(iterable) {
        if (iterable) {
            var iteratorMethod = iterable[iteratorSymbol];
            if (iteratorMethod) return iteratorMethod.call(iterable);
            if (typeof iterable.next === "function") return iterable;
            if (!isNaN(iterable.length)) {
                var i = -1, next = function next() {
                    while(++i < iterable.length)if (hasOwn.call(iterable, i)) {
                        next.value = iterable[i];
                        next.done = false;
                        return next;
                    }
                    next.value = undefined;
                    next.done = true;
                    return next;
                };
                return next.next = next;
            }
        }
        // Return an iterator with no values.
        return {
            next: doneResult
        };
    };
    var doneResult = function doneResult() {
        return {
            value: undefined,
            done: true
        };
    };
    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var defineProperty = Object.defineProperty || function(obj, key, desc) {
        obj[key] = desc.value;
    };
    var undefined; // More compressible than void 0.
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    try {
        // IE 8 has a broken Object.defineProperty that only works on DOM objects.
        define({}, "");
    } catch (err) {
        define = function define(obj, key, value) {
            return obj[key] = value;
        };
    }
    exports.wrap = wrap;
    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";
    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};
    // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function() {
        return this;
    });
    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = GeneratorFunctionPrototype;
    defineProperty(Gp, "constructor", {
        value: GeneratorFunctionPrototype,
        configurable: true
    });
    defineProperty(GeneratorFunctionPrototype, "constructor", {
        value: GeneratorFunction,
        configurable: true
    });
    GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction");
    exports.isGeneratorFunction = function(genFun) {
        var ctor = typeof genFun === "function" && genFun.constructor;
        return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };
    exports.mark = function(genFun) {
        if (Object.setPrototypeOf) Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
        else {
            genFun.__proto__ = GeneratorFunctionPrototype;
            define(genFun, toStringTagSymbol, "GeneratorFunction");
        }
        genFun.prototype = Object.create(Gp);
        return genFun;
    };
    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.
    exports.awrap = function(arg) {
        return {
            __await: arg
        };
    };
    defineIteratorMethods(AsyncIterator.prototype);
    define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
        return this;
    });
    exports.AsyncIterator = AsyncIterator;
    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        if (PromiseImpl === void 0) PromiseImpl = Promise;
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
        return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
         : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
        });
    };
    // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.
    function maybeInvokeDelegate(delegate, context) {
        var method = delegate.iterator[context.method];
        if (method === undefined) {
            // A .throw or .return when the delegate iterator has no .throw
            // method always terminates the yield* loop.
            context.delegate = null;
            if (context.method === "throw") {
                // Note: ["return"] must be used for ES3 parsing compatibility.
                if (delegate.iterator["return"]) {
                    // If the delegate iterator has a return method, give it a
                    // chance to clean up.
                    context.method = "return";
                    context.arg = undefined;
                    maybeInvokeDelegate(delegate, context);
                    if (context.method === "throw") // If maybeInvokeDelegate(context) changed context.method from
                    // "return" to "throw", let that override the TypeError below.
                    return ContinueSentinel;
                }
                context.method = "throw";
                context.arg = new TypeError("The iterator does not provide a 'throw' method");
            }
            return ContinueSentinel;
        }
        var record = tryCatch(method, delegate.iterator, context.arg);
        if (record.type === "throw") {
            context.method = "throw";
            context.arg = record.arg;
            context.delegate = null;
            return ContinueSentinel;
        }
        var info = record.arg;
        if (!info) {
            context.method = "throw";
            context.arg = new TypeError("iterator result is not an object");
            context.delegate = null;
            return ContinueSentinel;
        }
        if (info.done) {
            // Assign the result of the finished delegate to the temporary
            // variable specified by delegate.resultName (see delegateYield).
            context[delegate.resultName] = info.value;
            // Resume execution at the desired location (see delegateYield).
            context.next = delegate.nextLoc;
            // If context.method was "throw" but the delegate handled the
            // exception, let the outer generator proceed normally. If
            // context.method was "next", forget context.arg since it has been
            // "consumed" by the delegate iterator. If context.method was
            // "return", allow the original .return call to continue in the
            // outer generator.
            if (context.method !== "return") {
                context.method = "next";
                context.arg = undefined;
            }
        } else // Re-yield the result returned by the delegate method.
        return info;
        // The delegate iterator is finished, so forget it and continue with
        // the outer generator.
        context.delegate = null;
        return ContinueSentinel;
    }
    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);
    define(Gp, toStringTagSymbol, "Generator");
    // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.
    define(Gp, iteratorSymbol, function() {
        return this;
    });
    define(Gp, "toString", function() {
        return "[object Generator]";
    });
    exports.keys = function(val) {
        var object = Object(val);
        var keys = [];
        for(var key in object)keys.push(key);
        keys.reverse();
        // Rather than returning an object with a next method, we keep
        // things simple and return the next function itself.
        return function next() {
            while(keys.length){
                var key = keys.pop();
                if (key in object) {
                    next.value = key;
                    next.done = false;
                    return next;
                }
            }
            // To avoid creating an additional object, we just hang the .value
            // and .done properties off the next function object itself. This
            // also ensures that the minifier will not anonymize the function.
            next.done = true;
            return next;
        };
    };
    exports.values = values;
    Context.prototype = {
        constructor: Context,
        reset: function reset(skipTempReset) {
            this.prev = 0;
            this.next = 0;
            // Resetting context._sent for legacy support of Babel's
            // function.sent implementation.
            this.sent = this._sent = undefined;
            this.done = false;
            this.delegate = null;
            this.method = "next";
            this.arg = undefined;
            this.tryEntries.forEach(resetTryEntry);
            if (!skipTempReset) {
                for(var name in this)// Not sure about the optimal order of these conditions:
                if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) this[name] = undefined;
            }
        },
        stop: function stop() {
            this.done = true;
            var rootEntry = this.tryEntries[0];
            var rootRecord = rootEntry.completion;
            if (rootRecord.type === "throw") throw rootRecord.arg;
            return this.rval;
        },
        dispatchException: function dispatchException(exception) {
            var handle = function handle(loc, caught) {
                record.type = "throw";
                record.arg = exception;
                context.next = loc;
                if (caught) {
                    // If the dispatched exception was caught by a catch block,
                    // then let that catch block handle the exception normally.
                    context.method = "next";
                    context.arg = undefined;
                }
                return !!caught;
            };
            if (this.done) throw exception;
            var context = this;
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                var record = entry.completion;
                if (entry.tryLoc === "root") // Exception thrown outside of any try block that could handle
                // it, so set the completion value of the entire function to
                // throw the exception.
                return handle("end");
                if (entry.tryLoc <= this.prev) {
                    var hasCatch = hasOwn.call(entry, "catchLoc");
                    var hasFinally = hasOwn.call(entry, "finallyLoc");
                    if (hasCatch && hasFinally) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, true);
                        else if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    } else if (hasCatch) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, true);
                    } else if (hasFinally) {
                        if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    } else throw new Error("try statement without catch or finally");
                }
            }
        },
        abrupt: function abrupt(type, arg) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                    var finallyEntry = entry;
                    break;
                }
            }
            if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) // Ignore the finally entry if control is not jumping to a
            // location outside the try/catch block.
            finallyEntry = null;
            var record = finallyEntry ? finallyEntry.completion : {};
            record.type = type;
            record.arg = arg;
            if (finallyEntry) {
                this.method = "next";
                this.next = finallyEntry.finallyLoc;
                return ContinueSentinel;
            }
            return this.complete(record);
        },
        complete: function complete(record, afterLoc) {
            if (record.type === "throw") throw record.arg;
            if (record.type === "break" || record.type === "continue") this.next = record.arg;
            else if (record.type === "return") {
                this.rval = this.arg = record.arg;
                this.method = "return";
                this.next = "end";
            } else if (record.type === "normal" && afterLoc) this.next = afterLoc;
            return ContinueSentinel;
        },
        finish: function finish(finallyLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.finallyLoc === finallyLoc) {
                    this.complete(entry.completion, entry.afterLoc);
                    resetTryEntry(entry);
                    return ContinueSentinel;
                }
            }
        },
        "catch": function(tryLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc === tryLoc) {
                    var record = entry.completion;
                    if (record.type === "throw") {
                        var thrown = record.arg;
                        resetTryEntry(entry);
                    }
                    return thrown;
                }
            }
            // The context.catch method must only be called with a location
            // argument that corresponds to a known catch block.
            throw new Error("illegal catch attempt");
        },
        delegateYield: function delegateYield(iterable, resultName, nextLoc) {
            this.delegate = {
                iterator: values(iterable),
                resultName: resultName,
                nextLoc: nextLoc
            };
            if (this.method === "next") // Deliberately forget the last sent value so that we don't
            // accidentally pass it on to the delegate.
            this.arg = undefined;
            return ContinueSentinel;
        }
    };
    // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.
    return exports;
}(module.exports);
try {
    regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, in modern engines
    // we can explicitly access globalThis. In older engines we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    if (typeof globalThis === "object") globalThis.regeneratorRuntime = runtime;
    else Function("r", "regeneratorRuntime = r")(runtime);
}

},{}],"1HaHJ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "sendTypedMessage", function() {
    return sendTypedMessage;
});
var sendTypedMessage = function(message) {
    return typeof browser === "undefined" ? chrome.runtime.sendMessage(message) : browser.runtime.sendMessage(message);
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gTclZ"}],"arJpu":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function textareaDev(tabLength) {
    // todo: consider checking for e.target.tagName == 'TEXTAREA' (which used to be there), or add stronger typing to e
    return function inner(e) {
        var TAB_CHAR = " ".repeat(tabLength), selectionDelta = 0, selectedText, selectionStart, selectionEnd, allText;
        if (e.key === "Tab") {
            e.stopPropagation();
            e.preventDefault();
            selectionStart = this.selectionStart;
            selectionEnd = this.selectionEnd;
            selectedText = this.value.substring(selectionStart, selectionEnd);
            allText = this.value;
            if (~selectedText.indexOf("\n")) {
                if (e.shiftKey) {
                    selectedText = selectedText.split("\n").map(function(el) {
                        if (el.substr(0, TAB_CHAR.length) == TAB_CHAR) return el.substr(4);
                        return el;
                    }).join("\n");
                    this.value = allText.substr(0, selectionStart) + selectedText + allText.substr(selectionEnd);
                } else {
                    selectedText = selectedText.split("\n").map(function(el) {
                        return TAB_CHAR + el;
                    }).join("\n");
                    this.value = allText.substr(0, selectionStart) + selectedText + allText.substr(selectionEnd);
                }
                this.selectionStart = selectionStart;
                this.selectionEnd = selectionStart + selectedText.length;
            } else {
                if (e.shiftKey) {
                    if (allText.substr(selectionStart - TAB_CHAR.length, TAB_CHAR.length) == TAB_CHAR) {
                        this.value = allText.substr(0, selectionStart - TAB_CHAR.length) + allText.substr(selectionEnd);
                        selectionDelta = -TAB_CHAR.length;
                    }
                } else {
                    this.value = allText.substr(0, selectionStart) + TAB_CHAR + allText.substr(selectionEnd);
                    selectionDelta = TAB_CHAR.length;
                }
                this.selectionStart = this.selectionEnd = selectionStart + selectionDelta;
            }
        }
    };
}
exports.default = textareaDev;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gTclZ"}],"7o4s8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "compatibleStorage", function() {
    return compatibleStorage;
});
var compatibleStorage = typeof browser === "undefined" ? chrome.storage : browser.storage;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gTclZ"}],"gtcfx":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("6Fsm8") + "textAreaOverlay.cd42263b.png";

},{"./helpers/bundle-url":"dxGhe"}],"dxGhe":[function(require,module,exports) {
"use strict";
var bundleURL = {};
function getBundleURLCached(id) {
    var value = bundleURL[id];
    if (!value) {
        value = getBundleURL();
        bundleURL[id] = value;
    }
    return value;
}
function getBundleURL() {
    try {
        throw new Error();
    } catch (err) {
        var matches = ("" + err.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);
        if (matches) // The first two stack frames will be this function and getBundleURLCached.
        // Use the 3rd one, which will be a runtime in the original bundle.
        return getBaseURL(matches[2]);
    }
    return "/";
}
function getBaseURL(url) {
    return ("" + url).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/, "$1") + "/";
} // TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.
function getOrigin(url) {
    var matches = ("" + url).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^/]+/);
    if (!matches) throw new Error("Origin not found");
    return matches[0];
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;

},{}],"8qOV3":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("6Fsm8") + "textAreaOverlayHovered.8911dca8.png";

},{"./helpers/bundle-url":"dxGhe"}]},["aFETT"], "aFETT", "parcelRequire2f33")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7QUFBQSxpREFBb0Q7QUFFcEQsMkNBQXdDOztBQUV4Qyx1REFBb0U7QUFFcEUsSUFBTSxpQkFBaUIsR0FBd0YsSUFBSSxPQUFPLEVBQUU7QUFFNUgsU0FBUyxxQkFBcUIsQ0FBQyxRQUE2QixFQUFFO0lBRTFELDZCQUE2QjtJQUM3QiwyQkFBMkIsQ0FBQyxRQUFRLENBQUM7SUFFckMsSUFBTSxRQUFRLEdBQUcsQ0FBQSxHQUFBLDJCQUFXLENBQUEsQ0FBQyxDQUFBLFlBQVksYUFBWixZQUFZLFdBQXNCLEdBQWxDLEtBQUEsQ0FBa0MsR0FBbEMsWUFBWSxDQUFFLG9CQUFvQixDQUFBLElBQUksQ0FBQyxDQUFDO0lBQ3JFLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDO0lBRXpDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQztDQUN2RDtBQUVELFNBQVMsMkJBQTJCLENBQUMsUUFBNkIsRUFBRTtJQUVoRSxJQUFNLGtCQUFrQixHQUFHLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7SUFFMUQsSUFBRyxrQkFBa0IsS0FBSyxTQUFTLEVBQUU7UUFDakMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLENBQUM7UUFDakUsaUJBQWlCLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztLQUNyQztDQUNKO0FBRUQsU0FBUyxhQUFhLENBQUMsSUFBVSxFQUFtQjtJQUNoRCxPQUFPLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQTtDQUM3QztBQUVELHFGQUVHLENBQ0gsU0FBUyx3QkFBd0IsQ0FBQyxRQUE2QixFQUFFO0lBRTdELElBQU0saUJBQWlCLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7SUFFakQsSUFBRyxDQUFDLGlCQUFpQixFQUFFO1FBQ25CLE9BQU8sQ0FBQyxJQUFJLENBQUMsa0ZBQWtGLENBQUM7UUFDaEcsT0FBTTtLQUNUO0lBRUQsSUFBRyxpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLElBQUksRUFDN0MsUUFBUSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQztTQUU1QyxRQUFRLENBQUMsWUFBWSxDQUFDLGtCQUFrQixFQUFFLGlCQUFpQixDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFHcEYsSUFBRyxpQkFBaUIsQ0FBQyxVQUFVLEtBQUssSUFBSSxFQUNwQyxRQUFRLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQztTQUV0QyxRQUFRLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxpQkFBaUIsQ0FBQyxVQUFVLENBQUM7Q0FFeEU7QUFFRCxtR0FFRyxDQUNILFNBQVMsb0JBQW9CLENBQUMsUUFBNkIsRUFBNEI7SUFFbkYsSUFBTSx1QkFBdUIsR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDO0lBQ3pFLElBQU0sa0JBQWtCLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUM7SUFFOUQsT0FBTztRQUFDLGtCQUFrQixFQUFFLHVCQUF1QjtRQUFFLFVBQVUsRUFBRSxrQkFBa0I7S0FBQyxDQUFBO0NBQ3ZGO0FBT0QsSUFBTSxTQUFTLEdBQXVELElBQUksR0FBRyxFQUFFO0FBRS9FLGtEQUFrRDtBQUNsRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQUEsbUJBQW1CLEVBQUk7SUFDakUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxvQkFBb0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0NBQ2hGLENBQUM7QUFFRixTQUFTLGFBQWEsQ0FBQyxRQUE2QixFQUFFLGlCQUEwQixFQUFFO0lBRTlFLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsa0JBQWtCLENBQUM7SUFDekQsUUFBUSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxvQkFBb0IsQ0FBQztJQUU3RCxJQUFHLGlCQUFpQixFQUFFO1FBRWxCLElBQU0sV0FBVyxHQUEwQjtZQUN2Qyx1QkFBdUIsRUFBRSxJQUFJO1NBQ2hDO1FBRUQsQ0FBQSxHQUFBLG1DQUFPLENBQUEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQztLQUNoQztJQUVELFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLHNEQUFzRCxDQUFDO0lBQ2pGLHdCQUF3QixDQUFDLFFBQVEsQ0FBQztDQUNyQztBQUVELFNBQVMsb0JBQW9CLENBQTRCLEtBQW9CLEVBQUU7SUFDM0UsYUFBYSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7SUFDekIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQztDQUN4RDtBQUVELFNBQVMsa0JBQWtCLENBQTRCLEtBQWlCLEVBQUU7SUFDdEUsYUFBYSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7SUFDekIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxvQkFBb0IsQ0FBQztDQUM1RDtBQUVELElBQUksV0FBVyxHQUFHLElBQUksZ0JBQWdCLENBQUMsU0FBVSxTQUFTLEVBQUU7SUFFeEQsU0FBUyxDQUFDLE9BQU8sQ0FBRSxTQUFBLFFBQVEsRUFBSTtRQUUzQixJQUFNLElBQUksR0FBRyxRQUFRLENBQUMsTUFBTTtRQUU1QixJQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNwQixJQUFNLGVBQWUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxBQUFDO1lBRXRFLGVBQWUsQ0FBQyxPQUFPLENBQUMsU0FBQSxXQUFXLEVBQUk7Z0JBRW5DLG1GQUFtRjtnQkFDbkYsSUFBTSxTQUFTLEdBQ1gsV0FBVyxDQUFDLElBQUksS0FBSyxTQUFTLElBQzNCLFdBQVcsQ0FBQyxXQUFXLEtBQUssdUdBQXVHLElBQ25JLFdBQVcsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDO2dCQUUxQyxJQUFHLENBQUMsU0FBUyxFQUNULFNBQVMsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBR3BFLENBQUM7WUFFRixJQUFHLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUN6QixxQkFBcUIsQ0FBQyxZQUFZLENBQUM7U0FFMUM7S0FDSixDQUFDLENBQUM7Q0FDTixDQUFDLEFBQUM7QUFFSCxTQUFTLHFCQUFxQixDQUFDLGFBQTJCLEVBQUU7SUFFeEQsZ0ZBQWdGO0lBQ2hGLENBQUEsR0FBQSxnQ0FBZ0IsQ0FBQSxDQUFDO1FBQUMsSUFBSSxFQUFFLFlBQVk7UUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLHFCQUFxQixHQUFHLEtBQUssR0FBRyxJQUFJO0tBQUMsQ0FBQztJQUVoRyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQUMsaUJBQWlCLEVBQUUsUUFBUSxFQUFLO1FBRy9DLElBQUcsYUFBYSxDQUFDLHFCQUFxQixFQUFFO1lBQ3BDLDJCQUEyQixDQUFDLFFBQVEsQ0FBQztZQUNyQyxhQUFhLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQztZQUM5QixRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQywrQ0FBK0MsQ0FBQztTQUM3RSxNQUFNO1lBRUgseUVBQXlFO1lBRXpFLElBQUcsYUFBYSxDQUFDLHVCQUF1QixFQUNwQyxhQUFhLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQztpQkFDM0I7Z0JBRUgsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsc0RBQXNELENBQUM7Z0JBRTlFLCtDQUErQztnQkFDL0MsUUFBUSxDQUFDLFVBQVUsR0FBRyxLQUFLO2dCQUUzQixtRkFBbUY7Z0JBQ25GLCtFQUErRTtnQkFDL0UsUUFBUSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxrZkFJcUMsQ0FBQztnQkFHaEYsK0ZBQStGO2dCQUMvRixRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFO29CQUFDLElBQUksRUFBRSxJQUFJO2lCQUFDLENBQUM7Z0JBQ3BFLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsb0JBQW9CLEVBQUU7b0JBQUMsSUFBSSxFQUFFLElBQUk7aUJBQUMsQ0FBQzthQUMzRTtnQkFFRSxzQkFBbUM7WUFBdEMsSUFBRyxDQUFBLHNCQUFtQyxHQUFuQyxhQUFhLENBQUMscUJBQXFCLGNBQW5DLHNCQUFtQyxjQUFuQyxzQkFBbUMsR0FBSSxJQUFJLEVBQzFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLCtDQUErQyxDQUFDO2lCQUV2RSxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQywrQ0FBK0MsQ0FBQztZQUc5RSxxQkFBcUIsQ0FBQyxRQUFRLENBQUM7U0FDbEM7S0FFSixDQUFDO0NBRUw7QUFFRCw0RkFHRyxDQUNILFNBQVMsUUFBUSxDQUFDLFdBQW1CLEVBQUU7SUFDbkMsSUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQUFBQztJQUM5QyxLQUFLLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztJQUNoQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUMvQjtBQUVELDJJQUEySTtBQUMzSSxJQUFNLGdCQUFnQixHQUFHLFNBQUMsU0FBaUI7V0FBSyxPQUFPLE9BQU8sS0FBSyxXQUFXLEdBQUcsU0FBUyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztDQUFBO0FBRTlILElBQU0sa0JBQWtCLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLCtCQUErQixDQUFDLENBQUM7QUFDckYsSUFBTSx1QkFBdUIsR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsc0NBQXNDLENBQUMsQ0FBQztBQUVqRyx5RkFBeUY7QUFDekYsMkNBQTJDO0FBQzNDLDJGQUEyRjtBQUMzRixzRkFBc0Y7QUFDdEYsUUFBUSxDQUFDLEFBQUMsc0tBRWdCLENBQTJFLE1BQXVCLENBQWhHLGtCQUFrQixFQUFDLHNEQUFvRCxDQUEwQixDQVFqRyxNQUF1QixDQVJrRCx1QkFBdUIsRUFBQyw0T0FRbkcsQ0FBMEIsQ0FBQSxNQUVwRCxDQUY0Qix1QkFBdUIsRUFBQyx5REFFcEQsQ0FBQyxDQUFDO0FBRUYsK0NBQStDO0FBQy9DLElBQUksWUFBWSxHQUFpQixFQUFFO1NBYXBCLEtBQUs7V0FBTCxNQUFLOztTQUFMLE1BQUs7SUFBTCxNQUFLLEdBWHBCLGdWQVVHLENBQ0gsc0ZBQUEsbUJBQXVCO1lBRWIsbUJBQW1COzs7OzsyQkFBUyxDQUFBLEdBQUEsbUNBQU8sQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7O29CQUE5QyxtQkFBbUIsWUFBMkIsQ0FBQTtvQkFDcEQsWUFBWSxHQUFHLG1CQUFtQjtvQkFFbEMscUJBQXFCLENBQUMsWUFBWSxDQUFDO29CQUVuQyxDQUFBLEdBQUEsbUNBQU8sQ0FBQSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsU0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFLO3dCQUU3QyxJQUFHLElBQUksS0FBSyxNQUFNLEVBQ2QsK0ZBQStGO3dCQUMvRixPQUFNO3dCQUdWLElBQU0sVUFBVSxHQUEwQixFQUFFOzRCQUV2Qyx5QkFBd0IsU0FBeEIsaUJBQXdCLFVBQXhCLGNBQXdCOzs0QkFBN0IsUUFBSyxTQUF3QixHQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLHFCQUFuRCxLQUF3QixJQUF4Qix5QkFBd0IsSUFBeEIsS0FBd0IsR0FBeEIsU0FBd0IsZ0JBQXhCLHlCQUF3QjtnQ0FBeEIsbURBQUEsS0FBd0IsWUFBakIsUUFBUSxZQUFBLEVBQUUsTUFBTSxZQUFBLEFBQUM7Z0NBQ3pCLFVBQVUsQ0FBQyxRQUFRLENBQXVCLEdBQUcsQUFBQyxNQUFNLENBQVMsUUFBUTs2QkFDeEU7OzRCQUZJLGlCQUF3Qjs0QkFBeEIsY0FBd0I7OztxQ0FBeEIseUJBQXdCLElBQXhCLFNBQXdCO29DQUF4QixTQUF3Qjs7O29DQUF4QixpQkFBd0I7MENBQXhCLGNBQXdCOzs7O3dCQUk3QixZQUFZLEdBQUkseUNBQUksWUFBWSxFQUFLLFVBQVUsQ0FBQyxBQUFDO3dCQUNqRCxxQkFBcUIsQ0FBQyxZQUFZLENBQUM7cUJBQ3RDLENBQUM7b0JBRUYsMkdBQTJHO29CQUMzRyxzR0FBc0c7b0JBQ3RHLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRTt3QkFBQyxTQUFTLEVBQUUsSUFBSTt3QkFBRSxPQUFPLEVBQUUsSUFBSTtxQkFBQyxDQUFDLENBQUM7Ozs7OztLQUN4RSxFQUFBO1dBM0JjLE1BQUs7O0FBNkJwQixLQUFLLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNVFQOztBQUFBLFNBQVMsa0JBQWtCLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFO0lBQ3pFLElBQUk7UUFDRixJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEFBQUM7UUFDekIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQUFBQztLQUN4QixDQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2QsT0FBTztLQUNSO0lBRUQsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUNYLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUVmLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztDQUU5QztBQUVjLFNBQVMsaUJBQWlCLENBQUMsRUFBRSxFQUFFO0lBQzVDLE9BQU8sV0FBWTtRQUNqQixJQUFJLElBQUksR0FBRyxJQUFJLEVBQ2IsSUFBSSxHQUFHLFNBQVMsQUFBQztRQUNuQixPQUFPLElBQUksT0FBTyxDQUFDLFNBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtZQUM1QyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQUFBQztZQUUvQixTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUU7Z0JBQ3BCLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ3hFO1lBRUQsU0FBUyxNQUFNLENBQUMsR0FBRyxFQUFFO2dCQUNuQixrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQzthQUN2RTtZQUVELEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNsQixDQUFDLENBQUM7S0FDSixDQUFDO0NBQ0g7a0JBbEJ1QixpQkFBaUI7OztBQ2hCekMsT0FBTyxDQUFDLGNBQWMsR0FBRyxTQUFVLENBQUMsRUFBRTtJQUNwQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxHQUFHLENBQUMsR0FBRztRQUFDLE9BQU8sRUFBRSxDQUFDO0tBQUMsQ0FBQztDQUM3QyxDQUFDO0FBRUYsT0FBTyxDQUFDLGlCQUFpQixHQUFHLFNBQVUsQ0FBQyxFQUFFO0lBQ3ZDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFLFlBQVksRUFBRTtRQUFDLEtBQUssRUFBRSxJQUFJO0tBQUMsQ0FBQyxDQUFDO0NBQ3ZELENBQUM7QUFFRixPQUFPLENBQUMsU0FBUyxHQUFHLFNBQVUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUMxQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFVLEdBQUcsRUFBRTtRQUN6QyxJQUFJLEdBQUcsS0FBSyxTQUFTLElBQUksR0FBRyxLQUFLLFlBQVksSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUN2RSxPQUFPO1FBR1QsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO1lBQy9CLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLEdBQUcsRUFBRSxTQUFMLEdBQUcsR0FBYztnQkFDZixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNwQjtTQUNGLENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0NBQ2IsQ0FBQztBQUVGLE9BQU8sQ0FBQyxNQUFNLEdBQUcsU0FBVSxJQUFJLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRTtJQUM5QyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUU7UUFDcEMsVUFBVSxFQUFFLElBQUk7UUFDaEIsR0FBRyxFQUFFLEdBQUc7S0FDVCxDQUFDLENBQUM7Q0FDSixDQUFDOzs7QUM5QkY7O0FBQUEsMERBQW9EOztBQUVyQyxTQUFTLGFBQWEsQ0FBQyxNQUFNLEVBQUU7SUFDNUMsSUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUU7UUFDekMsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxBQUFDO1FBQ3RELElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEFBQUM7UUFFbEMsSUFBSSxPQUFPLE1BQU0sQ0FBQyxxQkFBcUIsS0FBSyxVQUFVLEVBQ3BELE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBVSxHQUFHLEVBQUU7WUFDbEYsT0FBTyxNQUFNLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQztTQUNoRSxDQUFDLENBQUMsQ0FBQztRQUdOLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBVSxHQUFHLEVBQUU7WUFDN0IsQ0FBQSxHQUFBLGlDQUFjLENBQUEsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQzFDLENBQUMsQ0FBQztLQUNKO0lBRUQsT0FBTyxNQUFNLENBQUM7Q0FDZjtrQkFqQnVCLGFBQWE7OztBQ0ZyQzs7QUFBZSxTQUFTLGVBQWUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRTtJQUN2RCxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQ1osTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFO1FBQzlCLEtBQUssRUFBRSxLQUFLO1FBQ1osVUFBVSxFQUFFLElBQUk7UUFDaEIsWUFBWSxFQUFFLElBQUk7UUFDbEIsUUFBUSxFQUFFLElBQUk7S0FDZixDQUFDLENBQUM7U0FFSCxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO0lBR25CLE9BQU8sR0FBRyxDQUFDO0NBQ1o7a0JBYnVCLGVBQWU7OztBQ0F2Qzs7QUFBQSwyREFBcUQ7O0FBQ3JELDZEQUE0RDs7QUFDNUQsNkRBQXVEOztBQUN2RCxvRkFBOEU7O0FBRS9ELFNBQVMsY0FBYyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUU7SUFDN0MsT0FBTyxDQUFBLEdBQUEsaUNBQWMsQ0FBQSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUEsR0FBQSxrQ0FBb0IsQ0FBQSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFBLEdBQUEsNkNBQTBCLENBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQSxHQUFBLGtDQUFlLENBQUEsRUFBRSxDQUFDO0NBQ3ZIO2tCQUZ1QixjQUFjOzs7QUNMdEM7O0FBQWUsU0FBUyxlQUFlLENBQUMsR0FBRyxFQUFFO0lBQzNDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxPQUFPLEdBQUcsQ0FBQztDQUNwQztrQkFGdUIsZUFBZTs7O0FDQXZDOztBQUFlLFNBQVMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFO0lBQzdDLElBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxJQUFJLEVBQUUsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQzNIO2tCQUZ1QixnQkFBZ0I7OztBQ0F4Qzs7QUFBZSxTQUFTLGdCQUFnQixHQUFHO0lBQ3pDLE1BQU0sSUFBSSxTQUFTLENBQUMsNElBQTRJLENBQUMsQ0FBQztDQUNuSztrQkFGdUIsZ0JBQWdCOzs7QUNBeEM7O0FBQUEsZ0VBQTJEOztBQUU1QyxTQUFTLDJCQUEyQixDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUU7SUFDN0QsSUFBSSxDQUFDLENBQUMsRUFBRSxPQUFPO0lBQ2YsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLEVBQUUsT0FBTyxDQUFBLEdBQUEsbUNBQWlCLENBQUEsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDL0QsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEFBQUM7SUFDdkQsSUFBSSxDQUFDLEtBQUssUUFBUSxJQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO0lBQzVELElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLEtBQUssS0FBSyxFQUFFLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyRCxJQUFJLENBQUMsS0FBSyxXQUFXLElBQUksMkNBQTJDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDekUsT0FBTyxDQUFBLEdBQUEsbUNBQWlCLENBQUEsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7Q0FDdkM7a0JBUnVCLDJCQUEyQjs7O0FDRm5EOztBQUFlLFNBQVMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRTtJQUNsRCxJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7SUFDdEQsSUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RSxPQUFPLElBQUksQ0FBQztDQUNiO2tCQUp1QixpQkFBaUI7OztBQ0F6Qzs7Ozs7R0FLRyxDQUVILElBQUksT0FBTyxHQUFJLFNBQVUsT0FBTyxFQUFFO0lBQ2hDLFlBQVksQ0FBQztRQVdKLE1BQU0sR0FBZixTQUFTLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRTtRQUMvQixNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUU7WUFDOUIsS0FBSyxFQUFFLEtBQUs7WUFDWixVQUFVLEVBQUUsSUFBSTtZQUNoQixZQUFZLEVBQUUsSUFBSTtZQUNsQixRQUFRLEVBQUUsSUFBSTtTQUNmLENBQUMsQ0FBQztRQUNILE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2pCO1FBVVEsSUFBSSxHQUFiLFNBQVMsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRTtRQUNqRCx5R0FBeUc7UUFDekcsSUFBSSxjQUFjLEdBQUcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxTQUFTLFlBQVksU0FBUyxHQUFHLE9BQU8sR0FBRyxTQUFTLEFBQUM7UUFDN0YsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEFBQUM7UUFDeEQsSUFBSSxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQyxBQUFDO1FBRTdDLGdFQUFnRTtRQUNoRSwrQkFBK0I7UUFDL0IsY0FBYyxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUU7WUFBRSxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUM7U0FBRSxDQUFDLENBQUM7UUFFMUYsT0FBTyxTQUFTLENBQUM7S0FDbEI7UUFhUSxRQUFRLEdBVmpCLHFFQUFxRTtJQUNyRSxxRUFBcUU7SUFDckUsa0VBQWtFO0lBQ2xFLG1FQUFtRTtJQUNuRSxzRUFBc0U7SUFDdEUsc0VBQXNFO0lBQ3RFLHVFQUF1RTtJQUN2RSxxRUFBcUU7SUFDckUsc0VBQXNFO0lBQ3RFLG1FQUFtRTtJQUNuRSxTQUFTLFFBQVEsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTtRQUM5QixJQUFJO1lBQ0YsT0FBTztnQkFBRSxJQUFJLEVBQUUsUUFBUTtnQkFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2FBQUUsQ0FBQztTQUNuRCxDQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osT0FBTztnQkFBRSxJQUFJLEVBQUUsT0FBTztnQkFBRSxHQUFHLEVBQUUsR0FBRzthQUFFLENBQUM7U0FDcEM7S0FDRjtRQWVRLFNBQVMsR0FKbEIsa0VBQWtFO0lBQ2xFLHdFQUF3RTtJQUN4RSxvRUFBb0U7SUFDcEUsMkRBQTJEO0lBQzNELFNBQVMsU0FBUyxHQUFHLEVBQUU7UUFDZCxpQkFBaUIsR0FBMUIsU0FBUyxpQkFBaUIsR0FBRyxFQUFFO1FBQ3RCLDBCQUEwQixHQUFuQyxTQUFTLDBCQUEwQixHQUFHLEVBQUU7UUFvQy9CLHFCQUFxQixHQUY5QixvRUFBb0U7SUFDcEUsMkRBQTJEO0lBQzNELFNBQVMscUJBQXFCLENBQUMsU0FBUyxFQUFFO1FBQ3hDO1lBQUMsTUFBTTtZQUFFLE9BQU87WUFBRSxRQUFRO1NBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxNQUFNLEVBQUU7WUFDbkQsTUFBTSxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsU0FBUyxHQUFHLEVBQUU7Z0JBQ3RDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDbEMsQ0FBQyxDQUFDO1NBQ0osQ0FBQyxDQUFDO0tBQ0o7UUErQlEsYUFBYSxHQUF0QixTQUFTLGFBQWEsQ0FBQyxTQUFTLEVBQUUsV0FBVyxFQUFFO1FBQzdDLFNBQVMsTUFBTSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRTtZQUM1QyxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFNBQVMsRUFBRSxHQUFHLENBQUMsQUFBQztZQUN6RCxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUN6QixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNkO2dCQUNMLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLEFBQUM7Z0JBQ3hCLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLEFBQUM7Z0JBQ3pCLElBQUksS0FBSyxJQUNMLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLEVBQy9CLE9BQU8sV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxFQUFFO29CQUM3RCxNQUFNLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7aUJBQ3hDLEVBQUUsU0FBUyxHQUFHLEVBQUU7b0JBQ2YsTUFBTSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2lCQUN2QyxDQUFDLENBQUM7Z0JBR0wsT0FBTyxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLFNBQVMsRUFBRTtvQkFDekQsOERBQThEO29CQUM5RCx5REFBeUQ7b0JBQ3pELHFCQUFxQjtvQkFDckIsTUFBTSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7b0JBQ3pCLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDakIsRUFBRSxTQUFTLEtBQUssRUFBRTtvQkFDakIsOERBQThEO29CQUM5RCxnRUFBZ0U7b0JBQ2hFLE9BQU8sTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2lCQUNoRCxDQUFDLENBQUM7YUFDSjtTQUNGO1FBRUQsSUFBSSxlQUFlLEFBQUM7UUFFcEIsU0FBUyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtZQUM1QixTQUFTLDBCQUEwQixHQUFHO2dCQUNwQyxPQUFPLElBQUksV0FBVyxDQUFDLFNBQVMsT0FBTyxFQUFFLE1BQU0sRUFBRTtvQkFDL0MsTUFBTSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2lCQUN0QyxDQUFDLENBQUM7YUFDSjtZQUVELE9BQU8sZUFBZSxHQUNwQixnRUFBZ0U7WUFDaEUsa0VBQWtFO1lBQ2xFLGdFQUFnRTtZQUNoRSw4REFBOEQ7WUFDOUQsa0VBQWtFO1lBQ2xFLGlFQUFpRTtZQUNqRSxnRUFBZ0U7WUFDaEUsMkRBQTJEO1lBQzNELDJEQUEyRDtZQUMzRCxpRUFBaUU7WUFDakUsaUVBQWlFO1lBQ2pFLDZEQUE2RDtZQUM3RCxlQUFlLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FDcEMsMEJBQTBCLEVBQzFCLDJEQUEyRDtZQUMzRCwrQkFBK0I7WUFDL0IsMEJBQTBCLENBQzNCLEdBQUcsMEJBQTBCLEVBQUUsQ0FBQztTQUNwQztRQUVELG9FQUFvRTtRQUNwRSxtREFBbUQ7UUFDbkQsY0FBYyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUU7WUFBRSxLQUFLLEVBQUUsT0FBTztTQUFFLENBQUMsQ0FBQztLQUNyRDtRQTBCUSxnQkFBZ0IsR0FBekIsU0FBUyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtRQUNoRCxJQUFJLEtBQUssR0FBRyxzQkFBc0IsQUFBQztRQUVuQyxPQUFPLFNBQVMsTUFBTSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7WUFDbEMsSUFBSSxLQUFLLEtBQUssaUJBQWlCLEVBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQztZQUdsRCxJQUFJLEtBQUssS0FBSyxpQkFBaUIsRUFBRTtnQkFDL0IsSUFBSSxNQUFNLEtBQUssT0FBTyxFQUNwQixNQUFNLEdBQUcsQ0FBQztnQkFHWiw0Q0FBNEM7Z0JBQzVDLDRFQUE0RTtnQkFDNUUsT0FBTyxVQUFVLEVBQUUsQ0FBQzthQUNyQjtZQUVELE9BQU8sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBQ3hCLE9BQU8sQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBRWxCLE1BQU8sSUFBSSxDQUFFO2dCQUNYLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLEFBQUM7Z0JBQ2hDLElBQUksUUFBUSxFQUFFO29CQUNaLElBQUksY0FBYyxHQUFHLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQUFBQztvQkFDNUQsSUFBSSxjQUFjLEVBQUU7d0JBQ2xCLElBQUksY0FBYyxLQUFLLGdCQUFnQixFQUFFLFNBQVM7d0JBQ2xELE9BQU8sY0FBYyxDQUFDO3FCQUN2QjtpQkFDRjtnQkFFRCxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssTUFBTSxFQUMzQixzREFBc0Q7Z0JBQ3RELGdDQUFnQztnQkFDaEMsT0FBTyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7cUJBRXRDLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxPQUFPLEVBQUU7b0JBQ3JDLElBQUksS0FBSyxLQUFLLHNCQUFzQixFQUFFO3dCQUNwQyxLQUFLLEdBQUcsaUJBQWlCLENBQUM7d0JBQzFCLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztxQkFDbkI7b0JBRUQsT0FBTyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFFeEMsTUFBTSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssUUFBUSxFQUNwQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBR3hDLEtBQUssR0FBRyxpQkFBaUIsQ0FBQztnQkFFMUIsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLEFBQUM7Z0JBQzlDLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7b0JBQzVCLDZEQUE2RDtvQkFDN0QsMERBQTBEO29CQUMxRCxLQUFLLEdBQUcsT0FBTyxDQUFDLElBQUksR0FDaEIsaUJBQWlCLEdBQ2pCLHNCQUFzQixDQUFDO29CQUUzQixJQUFJLE1BQU0sQ0FBQyxHQUFHLEtBQUssZ0JBQWdCLEVBQ2pDLFNBQVM7b0JBR1gsT0FBTzt3QkFDTCxLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUc7d0JBQ2pCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtxQkFDbkIsQ0FBQztpQkFFSCxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7b0JBQ2xDLEtBQUssR0FBRyxpQkFBaUIsQ0FBQztvQkFDMUIsdURBQXVEO29CQUN2RCxxREFBcUQ7b0JBQ3JELE9BQU8sQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO29CQUN6QixPQUFPLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7aUJBQzFCO2FBQ0Y7U0FDRixDQUFDO0tBQ0g7UUF3R1EsWUFBWSxHQUFyQixTQUFTLFlBQVksQ0FBQyxJQUFJLEVBQUU7UUFDMUIsSUFBSSxLQUFLLEdBQUc7WUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUFFLEFBQUM7UUFFaEMsSUFBSSxDQUFDLElBQUksSUFBSSxFQUNYLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRzNCLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRTtZQUNiLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzFCO1FBRUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDN0I7UUFFUSxhQUFhLEdBQXRCLFNBQVMsYUFBYSxDQUFDLEtBQUssRUFBRTtRQUM1QixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsVUFBVSxJQUFJLEVBQUUsQUFBQztRQUNwQyxNQUFNLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztRQUN2QixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDbEIsS0FBSyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7S0FDM0I7UUFFUSxPQUFPLEdBQWhCLFNBQVMsT0FBTyxDQUFDLFdBQVcsRUFBRTtRQUM1QixxRUFBcUU7UUFDckUsbUVBQW1FO1FBQ25FLHVEQUF1RDtRQUN2RCxJQUFJLENBQUMsVUFBVSxHQUFHO1lBQUM7Z0JBQUUsTUFBTSxFQUFFLE1BQU07YUFBRTtTQUFDLENBQUM7UUFDdkMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNsQjtRQThCUSxNQUFNLEdBQWYsU0FBUyxNQUFNLENBQUMsUUFBUSxFQUFFO1FBQ3hCLElBQUksUUFBUSxFQUFFO1lBQ1osSUFBSSxjQUFjLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxBQUFDO1lBQzlDLElBQUksY0FBYyxFQUNoQixPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFHdkMsSUFBSSxPQUFPLFFBQVEsQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUNyQyxPQUFPLFFBQVEsQ0FBQztZQUdsQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDM0IsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksR0FBRyxTQUFTLElBQUksR0FBRztvQkFDakMsTUFBTyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUMxQixJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFO3dCQUM1QixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDekIsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7d0JBQ2xCLE9BQU8sSUFBSSxDQUFDO3FCQUNiO29CQUdILElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO29CQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFakIsT0FBTyxJQUFJLENBQUM7aUJBQ2IsQUFBQztnQkFFRixPQUFPLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2FBQ3pCO1NBQ0Y7UUFFRCxxQ0FBcUM7UUFDckMsT0FBTztZQUFFLElBQUksRUFBRSxVQUFVO1NBQUUsQ0FBQztLQUM3QjtRQUdRLFVBQVUsR0FBbkIsU0FBUyxVQUFVLEdBQUc7UUFDcEIsT0FBTztZQUFFLEtBQUssRUFBRSxTQUFTO1lBQUUsSUFBSSxFQUFFLElBQUk7U0FBRSxDQUFDO0tBQ3pDO0lBbmdCRCxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsU0FBUyxBQUFDO0lBQzFCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxjQUFjLEFBQUM7SUFDL0IsSUFBSSxjQUFjLEdBQUcsTUFBTSxDQUFDLGNBQWMsSUFBSSxTQUFVLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFO1FBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7S0FBRSxBQUFDO0lBQ25HLElBQUksU0FBUyxBQUFDLEVBQUMsaUNBQWlDO0lBQ2hELElBQUksT0FBTyxHQUFHLE9BQU8sTUFBTSxLQUFLLFVBQVUsR0FBRyxNQUFNLEdBQUcsRUFBRSxBQUFDO0lBQ3pELElBQUksY0FBYyxHQUFHLE9BQU8sQ0FBQyxRQUFRLElBQUksWUFBWSxBQUFDO0lBQ3RELElBQUksbUJBQW1CLEdBQUcsT0FBTyxDQUFDLGFBQWEsSUFBSSxpQkFBaUIsQUFBQztJQUNyRSxJQUFJLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxXQUFXLElBQUksZUFBZSxBQUFDO0lBVy9ELElBQUk7UUFDRiwwRUFBMEU7UUFDMUUsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUNoQixDQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1osTUFBTSxHQUFHLFNBQVQsTUFBTSxDQUFZLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFO1lBQ2pDLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztTQUN6QixDQUFDO0tBQ0g7SUFjRCxPQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQW9CcEIsSUFBSSxzQkFBc0IsR0FBRyxnQkFBZ0IsQUFBQztJQUM5QyxJQUFJLHNCQUFzQixHQUFHLGdCQUFnQixBQUFDO0lBQzlDLElBQUksaUJBQWlCLEdBQUcsV0FBVyxBQUFDO0lBQ3BDLElBQUksaUJBQWlCLEdBQUcsV0FBVyxBQUFDO0lBRXBDLGdFQUFnRTtJQUNoRSxpREFBaUQ7SUFDakQsSUFBSSxnQkFBZ0IsR0FBRyxFQUFFLEFBQUM7SUFVMUIsbUVBQW1FO0lBQ25FLDZCQUE2QjtJQUM3QixJQUFJLGlCQUFpQixHQUFHLEVBQUUsQUFBQztJQUMzQixNQUFNLENBQUMsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLFdBQVk7UUFDcEQsT0FBTyxJQUFJLENBQUM7S0FDYixDQUFDLENBQUM7SUFFSCxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsY0FBYyxBQUFDO0lBQ3JDLElBQUksdUJBQXVCLEdBQUcsUUFBUSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQUFBQztJQUN6RSxJQUFJLHVCQUF1QixJQUN2Qix1QkFBdUIsS0FBSyxFQUFFLElBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsY0FBYyxDQUFDLEVBQ3RELG9FQUFvRTtJQUNwRSxtQkFBbUI7SUFDbkIsaUJBQWlCLEdBQUcsdUJBQXVCLENBQUM7SUFHOUMsSUFBSSxFQUFFLEdBQUcsMEJBQTBCLENBQUMsU0FBUyxHQUMzQyxTQUFTLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQUFBQztJQUN6RCxpQkFBaUIsQ0FBQyxTQUFTLEdBQUcsMEJBQTBCLENBQUM7SUFDekQsY0FBYyxDQUFDLEVBQUUsRUFBRSxhQUFhLEVBQUU7UUFBRSxLQUFLLEVBQUUsMEJBQTBCO1FBQUUsWUFBWSxFQUFFLElBQUk7S0FBRSxDQUFDLENBQUM7SUFDN0YsY0FBYyxDQUNaLDBCQUEwQixFQUMxQixhQUFhLEVBQ2I7UUFBRSxLQUFLLEVBQUUsaUJBQWlCO1FBQUUsWUFBWSxFQUFFLElBQUk7S0FBRSxDQUNqRCxDQUFDO0lBQ0YsaUJBQWlCLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FDcEMsMEJBQTBCLEVBQzFCLGlCQUFpQixFQUNqQixtQkFBbUIsQ0FDcEIsQ0FBQztJQVlGLE9BQU8sQ0FBQyxtQkFBbUIsR0FBRyxTQUFTLE1BQU0sRUFBRTtRQUM3QyxJQUFJLElBQUksR0FBRyxPQUFPLE1BQU0sS0FBSyxVQUFVLElBQUksTUFBTSxDQUFDLFdBQVcsQUFBQztRQUM5RCxPQUFPLElBQUksR0FDUCxJQUFJLEtBQUssaUJBQWlCLElBQzFCLGdFQUFnRTtRQUNoRSxxQ0FBcUM7UUFDcEMsQ0FBQSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUEsS0FBTSxtQkFBbUIsR0FDdkQsS0FBSyxDQUFDO0tBQ1gsQ0FBQztJQUVGLE9BQU8sQ0FBQyxJQUFJLEdBQUcsU0FBUyxNQUFNLEVBQUU7UUFDOUIsSUFBSSxNQUFNLENBQUMsY0FBYyxFQUN2QixNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO2FBQ3JEO1lBQ0wsTUFBTSxDQUFDLFNBQVMsR0FBRywwQkFBMEIsQ0FBQztZQUM5QyxNQUFNLENBQUMsTUFBTSxFQUFFLGlCQUFpQixFQUFFLG1CQUFtQixDQUFDLENBQUM7U0FDeEQ7UUFDRCxNQUFNLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDckMsT0FBTyxNQUFNLENBQUM7S0FDZixDQUFDO0lBRUYscUVBQXFFO0lBQ3JFLG9FQUFvRTtJQUNwRSx1RUFBdUU7SUFDdkUsdUJBQXVCO0lBQ3ZCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsU0FBUyxHQUFHLEVBQUU7UUFDNUIsT0FBTztZQUFFLE9BQU8sRUFBRSxHQUFHO1NBQUUsQ0FBQztLQUN6QixDQUFDO0lBcUVGLHFCQUFxQixDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMvQyxNQUFNLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxtQkFBbUIsRUFBRSxXQUFZO1FBQy9ELE9BQU8sSUFBSSxDQUFDO0tBQ2IsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7SUFFdEMsNkRBQTZEO0lBQzdELHFFQUFxRTtJQUNyRSw2Q0FBNkM7SUFDN0MsT0FBTyxDQUFDLEtBQUssR0FBRyxTQUFTLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUU7UUFDekUsSUFBSSxXQUFXLEtBQUssS0FBSyxDQUFDLEVBQUUsV0FBVyxHQUFHLE9BQU8sQ0FBQztRQUVsRCxJQUFJLElBQUksR0FBRyxJQUFJLGFBQWEsQ0FDMUIsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFdBQVcsQ0FBQyxFQUN6QyxXQUFXLENBQ1osQUFBQztRQUVGLE9BQU8sT0FBTyxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxHQUN2QyxJQUFJLENBQUMsdURBQXVEO1dBQzVELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxNQUFNLEVBQUU7WUFDaEMsT0FBTyxNQUFNLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2pELENBQUMsQ0FBQztLQUNSLENBQUM7SUFnRkYscUVBQXFFO0lBQ3JFLGdFQUFnRTtJQUNoRSxxRUFBcUU7SUFDckUsd0VBQXdFO0lBQ3hFLFNBQVMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRTtRQUM5QyxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQUFBQztRQUMvQyxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDeEIsK0RBQStEO1lBQy9ELDRDQUE0QztZQUM1QyxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUV4QixJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssT0FBTyxFQUFFO2dCQUM5QiwrREFBK0Q7Z0JBQy9ELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtvQkFDL0IsMERBQTBEO29CQUMxRCxzQkFBc0I7b0JBQ3RCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDO29CQUMxQixPQUFPLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQztvQkFDeEIsbUJBQW1CLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUV2QyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssT0FBTyxFQUM1Qiw4REFBOEQ7b0JBQzlELDhEQUE4RDtvQkFDOUQsT0FBTyxnQkFBZ0IsQ0FBQztpQkFFM0I7Z0JBRUQsT0FBTyxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUM7Z0JBQ3pCLE9BQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSSxTQUFTLENBQ3pCLGdEQUFnRCxDQUFDLENBQUM7YUFDckQ7WUFFRCxPQUFPLGdCQUFnQixDQUFDO1NBQ3pCO1FBRUQsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQUFBQztRQUU5RCxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO1lBQzNCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO1lBQ3pCLE9BQU8sQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUN6QixPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUN4QixPQUFPLGdCQUFnQixDQUFDO1NBQ3pCO1FBRUQsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLEdBQUcsQUFBQztRQUV0QixJQUFJLENBQUUsSUFBSSxFQUFFO1lBQ1YsT0FBTyxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUM7WUFDekIsT0FBTyxDQUFDLEdBQUcsR0FBRyxJQUFJLFNBQVMsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1lBQ2hFLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLE9BQU8sZ0JBQWdCLENBQUM7U0FDekI7UUFFRCxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDYiw4REFBOEQ7WUFDOUQsaUVBQWlFO1lBQ2pFLE9BQU8sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUUxQyxnRUFBZ0U7WUFDaEUsT0FBTyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDO1lBRWhDLDZEQUE2RDtZQUM3RCwwREFBMEQ7WUFDMUQsa0VBQWtFO1lBQ2xFLDZEQUE2RDtZQUM3RCwrREFBK0Q7WUFDL0QsbUJBQW1CO1lBQ25CLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxRQUFRLEVBQUU7Z0JBQy9CLE9BQU8sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO2dCQUN4QixPQUFPLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQzthQUN6QjtTQUVGLE1BQ0MsdURBQXVEO1FBQ3ZELE9BQU8sSUFBSSxDQUFDO1FBR2Qsb0VBQW9FO1FBQ3BFLHVCQUF1QjtRQUN2QixPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUN4QixPQUFPLGdCQUFnQixDQUFDO0tBQ3pCO0lBRUQsaUVBQWlFO0lBQ2pFLGtDQUFrQztJQUNsQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUUxQixNQUFNLENBQUMsRUFBRSxFQUFFLGlCQUFpQixFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBRTNDLDBFQUEwRTtJQUMxRSw2RUFBNkU7SUFDN0UsNkVBQTZFO0lBQzdFLDhFQUE4RTtJQUM5RSwyRUFBMkU7SUFDM0UsTUFBTSxDQUFDLEVBQUUsRUFBRSxjQUFjLEVBQUUsV0FBVztRQUNwQyxPQUFPLElBQUksQ0FBQztLQUNiLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLFdBQVc7UUFDaEMsT0FBTyxvQkFBb0IsQ0FBQztLQUM3QixDQUFDLENBQUM7SUFpQ0gsT0FBTyxDQUFDLElBQUksR0FBRyxTQUFTLEdBQUcsRUFBRTtRQUMzQixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLEFBQUM7UUFDekIsSUFBSSxJQUFJLEdBQUcsRUFBRSxBQUFDO1FBQ2QsSUFBSyxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFakIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRWYsOERBQThEO1FBQzlELHFEQUFxRDtRQUNyRCxPQUFPLFNBQVMsSUFBSSxHQUFHO1lBQ3JCLE1BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBRTtnQkFDbEIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxBQUFDO2dCQUNyQixJQUFJLEdBQUcsSUFBSSxNQUFNLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO29CQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztvQkFDbEIsT0FBTyxJQUFJLENBQUM7aUJBQ2I7YUFDRjtZQUVELGtFQUFrRTtZQUNsRSxpRUFBaUU7WUFDakUsa0VBQWtFO1lBQ2xFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLE9BQU8sSUFBSSxDQUFDO1NBQ2IsQ0FBQztLQUNILENBQUM7SUFvQ0YsT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFNeEIsT0FBTyxDQUFDLFNBQVMsR0FBRztRQUNsQixXQUFXLEVBQUUsT0FBTztRQUVwQixLQUFLLEVBQUUsU0FBUCxLQUFLLENBQVcsYUFBYSxFQUFFO1lBQzdCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1lBQ2QsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7WUFDZCx3REFBd0Q7WUFDeEQsZ0NBQWdDO1lBQ2hDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7WUFDbkMsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7WUFDbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFFckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDckIsSUFBSSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUM7WUFFckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFdkMsSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDbEIsSUFBSyxJQUFJLElBQUksSUFBSSxJQUFJLENBQ25CLHdEQUF3RDtnQkFDeEQsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQ3ZCLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDO2FBRzVCO1NBQ0Y7UUFFRCxJQUFJLEVBQUUsU0FBTixJQUFJLEdBQWE7WUFDZixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUVqQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxBQUFDO1lBQ25DLElBQUksVUFBVSxHQUFHLFNBQVMsQ0FBQyxVQUFVLEFBQUM7WUFDdEMsSUFBSSxVQUFVLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFDN0IsTUFBTSxVQUFVLENBQUMsR0FBRyxDQUFDO1lBR3ZCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztTQUNsQjtRQUVELGlCQUFpQixFQUFFLFNBQW5CLGlCQUFpQixDQUFXLFNBQVMsRUFBRTtnQkFNNUIsTUFBTSxHQUFmLFNBQVMsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUU7Z0JBQzNCLE1BQU0sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO2dCQUN0QixNQUFNLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQztnQkFDdkIsT0FBTyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7Z0JBRW5CLElBQUksTUFBTSxFQUFFO29CQUNWLDJEQUEyRDtvQkFDM0QsMkRBQTJEO29CQUMzRCxPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztvQkFDeEIsT0FBTyxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUM7aUJBQ3pCO2dCQUVELE9BQU8sQ0FBQyxDQUFFLE1BQU0sQ0FBQzthQUNsQjtZQWxCRCxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQ1gsTUFBTSxTQUFTLENBQUM7WUFHbEIsSUFBSSxPQUFPLEdBQUcsSUFBSSxBQUFDO1lBZ0JuQixJQUFLLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFFO2dCQUNwRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxBQUFDO2dCQUMvQixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsVUFBVSxBQUFDO2dCQUU5QixJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssTUFBTSxFQUN6Qiw4REFBOEQ7Z0JBQzlELDREQUE0RDtnQkFDNUQsdUJBQXVCO2dCQUN2QixPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFHdkIsSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7b0JBQzdCLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxBQUFDO29CQUM5QyxJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsQUFBQztvQkFFbEQsSUFBSSxRQUFRLElBQUksVUFBVSxFQUFFO3dCQUMxQixJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFDNUIsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQzs2QkFDL0IsSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxVQUFVLEVBQ3JDLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztxQkFHbkMsTUFBTSxJQUFJLFFBQVEsRUFBRTt3QkFDbkIsSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQzVCLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7cUJBR3ZDLE1BQU0sSUFBSSxVQUFVLEVBQUU7d0JBQ3JCLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsVUFBVSxFQUM5QixPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7cUJBR25DLE1BQ0MsTUFBTSxJQUFJLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO2lCQUU3RDthQUNGO1NBQ0Y7UUFFRCxNQUFNLEVBQUUsU0FBUixNQUFNLENBQVcsSUFBSSxFQUFFLEdBQUcsRUFBRTtZQUMxQixJQUFLLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFFO2dCQUNwRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxBQUFDO2dCQUMvQixJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLElBQUksSUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLElBQ2hDLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLFVBQVUsRUFBRTtvQkFDaEMsSUFBSSxZQUFZLEdBQUcsS0FBSyxBQUFDO29CQUN6QixNQUFNO2lCQUNQO2FBQ0Y7WUFFRCxJQUFJLFlBQVksSUFDWCxDQUFBLElBQUksS0FBSyxPQUFPLElBQ2hCLElBQUksS0FBSyxVQUFVLENBQUEsSUFDcEIsWUFBWSxDQUFDLE1BQU0sSUFBSSxHQUFHLElBQzFCLEdBQUcsSUFBSSxZQUFZLENBQUMsVUFBVSxFQUNoQywwREFBMEQ7WUFDMUQsd0NBQXdDO1lBQ3hDLFlBQVksR0FBRyxJQUFJLENBQUM7WUFHdEIsSUFBSSxNQUFNLEdBQUcsWUFBWSxHQUFHLFlBQVksQ0FBQyxVQUFVLEdBQUcsRUFBRSxBQUFDO1lBQ3pELE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ25CLE1BQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBRWpCLElBQUksWUFBWSxFQUFFO2dCQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztnQkFDckIsSUFBSSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUMsVUFBVSxDQUFDO2dCQUNwQyxPQUFPLGdCQUFnQixDQUFDO2FBQ3pCO1lBRUQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzlCO1FBRUQsUUFBUSxFQUFFLFNBQVYsUUFBUSxDQUFXLE1BQU0sRUFBRSxRQUFRLEVBQUU7WUFDbkMsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFDekIsTUFBTSxNQUFNLENBQUMsR0FBRyxDQUFDO1lBR25CLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxPQUFPLElBQ3ZCLE1BQU0sQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUM1QixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7aUJBQ2xCLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7Z0JBQ25DLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDO2dCQUNsQyxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7YUFDbkIsTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUFJLFFBQVEsRUFDN0MsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7WUFHdkIsT0FBTyxnQkFBZ0IsQ0FBQztTQUN6QjtRQUVELE1BQU0sRUFBRSxTQUFSLE1BQU0sQ0FBVyxVQUFVLEVBQUU7WUFDM0IsSUFBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBRTtnQkFDcEQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQUFBQztnQkFDL0IsSUFBSSxLQUFLLENBQUMsVUFBVSxLQUFLLFVBQVUsRUFBRTtvQkFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDaEQsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNyQixPQUFPLGdCQUFnQixDQUFDO2lCQUN6QjthQUNGO1NBQ0Y7UUFFRCxPQUFPLEVBQUUsU0FBUyxNQUFNLEVBQUU7WUFDeEIsSUFBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBRTtnQkFDcEQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQUFBQztnQkFDL0IsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFBRTtvQkFDM0IsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLFVBQVUsQUFBQztvQkFDOUIsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTt3QkFDM0IsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsQUFBQzt3QkFDeEIsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUN0QjtvQkFDRCxPQUFPLE1BQU0sQ0FBQztpQkFDZjthQUNGO1lBRUQsK0RBQStEO1lBQy9ELG9EQUFvRDtZQUNwRCxNQUFNLElBQUksS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7U0FDMUM7UUFFRCxhQUFhLEVBQUUsU0FBZixhQUFhLENBQVcsUUFBUSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUU7WUFDckQsSUFBSSxDQUFDLFFBQVEsR0FBRztnQkFDZCxRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQztnQkFDMUIsVUFBVSxFQUFFLFVBQVU7Z0JBQ3RCLE9BQU8sRUFBRSxPQUFPO2FBQ2pCLENBQUM7WUFFRixJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssTUFBTSxFQUN4QiwyREFBMkQ7WUFDM0QsMkNBQTJDO1lBQzNDLElBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDO1lBR3ZCLE9BQU8sZ0JBQWdCLENBQUM7U0FDekI7S0FDRixDQUFDO0lBRUYsc0VBQXNFO0lBQ3RFLHdFQUF3RTtJQUN4RSx3RUFBd0U7SUFDeEUsb0VBQW9FO0lBQ3BFLE9BQU8sT0FBTyxDQUFDO0NBRWhCLENBSzhCLE1BQU0sQ0FBQyxPQUFPLENBQzVDLEFBQUMsQUFBQztBQUVILElBQUk7SUFDRixrQkFBa0IsR0FBRyxPQUFPLENBQUM7Q0FDOUIsQ0FBQyxPQUFPLG9CQUFvQixFQUFFO0lBQzdCLGlFQUFpRTtJQUNqRSx3RUFBd0U7SUFDeEUseUVBQXlFO0lBQ3pFLHNFQUFzRTtJQUN0RSx3RUFBd0U7SUFDeEUsd0VBQXdFO0lBQ3hFLHVFQUF1RTtJQUN2RSx1RUFBdUU7SUFDdkUsd0VBQXdFO0lBQ3hFLHFFQUFxRTtJQUNyRSxJQUFJLE9BQU8sVUFBVSxLQUFLLFFBQVEsRUFDaEMsVUFBVSxDQUFDLGtCQUFrQixHQUFHLE9BQU8sQ0FBQztTQUV4QyxRQUFRLENBQUMsR0FBRyxFQUFFLHdCQUF3QixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7Q0FFcEQ7OztBQ3R2QkQ7OztXQU1hLGdCQUFnQjs7QUFBdEIsSUFBTSxnQkFBZ0IsR0FBRyxTQUFDLE9BQXVCO1dBQ3BELEFBQUMsT0FBTyxPQUFPLEtBQUssV0FBVyxHQUN6QixNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FDbkMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDO0NBQUE7OztBQ0s5Qzs7QUFxQmUsU0FBUyxXQUFXLENBQUMsU0FBMEIsRUFBRTtJQUU1RCxtSEFBbUg7SUFDbkgsT0FBTyxTQUFTLEtBQUssQ0FBNEIsQ0FBZ0IsRUFBRTtRQUUvRCxJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUNoQyxjQUFjLEdBQUcsQ0FBQyxFQUNsQixZQUFZLEFBQVEsRUFDcEIsY0FBYyxBQUFRLEVBQ3RCLFlBQVksQUFBUSxFQUNwQixPQUFPLEFBQVEsQUFBQztRQUVwQixJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssS0FBSyxFQUFFO1lBQ2pCLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUNwQixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7WUFFbkIsY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7WUFDckMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDakMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxZQUFZLENBQUMsQ0FBQztZQUNsRSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUVyQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDN0IsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFO29CQUNaLFlBQVksR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsRUFBRTt3QkFDckQsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDbEUsT0FBTyxFQUFFLENBQUM7cUJBQ2IsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFFZCxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxHQUFHLFlBQVksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO2lCQUNoRyxNQUFNO29CQUNILFlBQVksR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsRUFBRTt3QkFBRSxPQUFPLFFBQVEsR0FBRyxFQUFFLENBQUE7cUJBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDOUYsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxjQUFjLENBQUMsR0FBRyxZQUFZLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztpQkFDaEc7Z0JBRUQsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxZQUFZLEdBQUcsY0FBYyxHQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7YUFDMUQsTUFBTTtnQkFDSCxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQ1Y7b0JBQUEsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsR0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxRQUFRLEVBQUU7d0JBQzdFLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsY0FBYyxHQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO3dCQUM5RixjQUFjLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO3FCQUNyQztpQkFBQSxNQUNFO29CQUNILElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsY0FBYyxDQUFDLEdBQUcsUUFBUSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBQ3pGLGNBQWMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO2lCQUNwQztnQkFFRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsY0FBYyxHQUFHLGNBQWMsQ0FBQzthQUM3RTtTQUNKO0tBRUosQ0FBQTtDQUNKO2tCQXBEdUIsV0FBVzs7O0FDOUJuQzs7O1dBQWEsaUJBQWlCOztBQUF2QixJQUFNLGlCQUFpQixHQUEyQixBQUFDLE9BQU8sT0FBTyxLQUFLLFdBQVcsR0FBSSxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPOzs7QUNONUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsK0NBQStDLENBQUM7OztBQ0F6SCxZQUFZLENBQUM7QUFFYixJQUFJLFNBQVMsR0FBRyxFQUFFLEFBQUM7QUFFbkIsU0FBUyxrQkFBa0IsQ0FBQyxFQUFFLEVBQUU7SUFDOUIsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQyxBQUFDO0lBRTFCLElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDVixLQUFLLEdBQUcsWUFBWSxFQUFFLENBQUM7UUFDdkIsU0FBUyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQztLQUN2QjtJQUVELE9BQU8sS0FBSyxDQUFDO0NBQ2Q7QUFFRCxTQUFTLFlBQVksR0FBRztJQUN0QixJQUFJO1FBQ0YsTUFBTSxJQUFJLEtBQUssRUFBRSxDQUFDO0tBQ25CLENBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixJQUFJLE9BQU8sR0FBRyxBQUFDLENBQUEsRUFBRSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUEsQ0FBRSxLQUFLLG9FQUFvRSxBQUFDO1FBRXpHLElBQUksT0FBTyxFQUNULDJFQUEyRTtRQUMzRSxtRUFBbUU7UUFDbkUsT0FBTyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FFakM7SUFFRCxPQUFPLEdBQUcsQ0FBQztDQUNaO0FBRUQsU0FBUyxVQUFVLENBQUMsR0FBRyxFQUFFO0lBQ3ZCLE9BQU8sQUFBQyxDQUFBLEVBQUUsR0FBRyxHQUFHLENBQUEsQ0FBRSxPQUFPLDRFQUE0RSxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7Q0FDbEgsQ0FBQyxrRkFBa0Y7QUFHcEYsU0FBUyxTQUFTLENBQUMsR0FBRyxFQUFFO0lBQ3RCLElBQUksT0FBTyxHQUFHLEFBQUMsQ0FBQSxFQUFFLEdBQUcsR0FBRyxDQUFBLENBQUUsS0FBSyxpRUFBaUUsQUFBQztJQUVoRyxJQUFJLENBQUMsT0FBTyxFQUNWLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUd0QyxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNuQjtBQUVELE9BQU8sQ0FBQyxZQUFZLEdBQUcsa0JBQWtCLENBQUM7QUFDMUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7QUFDaEMsT0FBTyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7OztBQ2hEOUIsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsc0RBQXNELENBQUMiLCJzb3VyY2VzIjpbInNyYy9jb250ZW50X3NjcmlwdC50cyIsIm5vZGVfbW9kdWxlcy9Ac3djL2hlbHBlcnMvc3JjL19hc3luY190b19nZW5lcmF0b3IubWpzIiwibm9kZV9tb2R1bGVzL0BwYXJjZWwvdHJhbnNmb3JtZXItanMvc3JjL2VzbW9kdWxlLWhlbHBlcnMuanMiLCJub2RlX21vZHVsZXMvQHN3Yy9oZWxwZXJzL3NyYy9fb2JqZWN0X3NwcmVhZC5tanMiLCJub2RlX21vZHVsZXMvQHN3Yy9oZWxwZXJzL3NyYy9fZGVmaW5lX3Byb3BlcnR5Lm1qcyIsIm5vZGVfbW9kdWxlcy9Ac3djL2hlbHBlcnMvc3JjL19zbGljZWRfdG9fYXJyYXkubWpzIiwibm9kZV9tb2R1bGVzL0Bzd2MvaGVscGVycy9zcmMvX2FycmF5X3dpdGhfaG9sZXMubWpzIiwibm9kZV9tb2R1bGVzL0Bzd2MvaGVscGVycy9zcmMvX2l0ZXJhYmxlX3RvX2FycmF5Lm1qcyIsIm5vZGVfbW9kdWxlcy9Ac3djL2hlbHBlcnMvc3JjL19ub25faXRlcmFibGVfcmVzdC5tanMiLCJub2RlX21vZHVsZXMvQHN3Yy9oZWxwZXJzL3NyYy9fdW5zdXBwb3J0ZWRfaXRlcmFibGVfdG9fYXJyYXkubWpzIiwibm9kZV9tb2R1bGVzL0Bzd2MvaGVscGVycy9zcmMvX2FycmF5X2xpa2VfdG9fYXJyYXkubWpzIiwibm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsInNyYy9SdW50aW1lTWVzc2FnZS50cyIsInNyYy90ZXh0YXJlYURldi50cyIsInNyYy92Mi12My1hYnN0cmFjdGlvbnMudHMiLCJub2RlX21vZHVsZXMvQHBhcmNlbC9ydW50aW1lLWpzL2xpYi9ydW50aW1lLTYyOThlZDM5ZTI4ZjI0MzkuanMiLCJub2RlX21vZHVsZXMvQHBhcmNlbC9ydW50aW1lLWpzL2xpYi9oZWxwZXJzL2J1bmRsZS11cmwuanMiLCJub2RlX21vZHVsZXMvQHBhcmNlbC9ydW50aW1lLWpzL2xpYi9ydW50aW1lLTE3OTFmNzg4YzAyOGJmNDAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2VuZFR5cGVkTWVzc2FnZSB9IGZyb20gXCIuL1J1bnRpbWVNZXNzYWdlXCI7XHJcbmltcG9ydCBTdG9yYWdlTW9kYWwgZnJvbSBcIi4vU3RvcmFnZU1vZGFsXCI7XHJcbmltcG9ydCB0ZXh0YXJlYURldiBmcm9tIFwiLi90ZXh0YXJlYURldlwiO1xyXG5cclxuaW1wb3J0IHsgY29tcGF0aWJsZVN0b3JhZ2UgYXMgc3RvcmFnZSB9IGZyb20gXCIuL3YyLXYzLWFic3RyYWN0aW9uc1wiO1xyXG5cclxuY29uc3QgY3VycmVudGx5RW5yaWNoZWQ6IFdlYWtNYXA8SFRNTFRleHRBcmVhRWxlbWVudCwgKHRoaXM6IEhUTUxUZXh0QXJlYUVsZW1lbnQsIGU6IEtleWJvYXJkRXZlbnQpID0+IHZvaWQ+ID0gbmV3IFdlYWtNYXAoKVxyXG5cclxuZnVuY3Rpb24gZW5yaWNoV2l0aEluZGVudGF0aW9uKHRleHRBcmVhOiBIVE1MVGV4dEFyZWFFbGVtZW50KSB7XHJcblxyXG4gICAgLy8gcmVtb3ZlIGFueSBwYXN0IGVucmljaG1lbnRcclxuICAgIHJlbW92ZUluZGVudGF0aW9uRW5yaWNobWVudCh0ZXh0QXJlYSlcclxuXHJcbiAgICBjb25zdCBsaXN0ZW5lciA9IHRleHRhcmVhRGV2KHN0b3JhZ2VTdGF0ZT8ubnVtYmVyT2ZTcGFjZXNQZXJUYWIgfHwgNClcclxuICAgIGN1cnJlbnRseUVucmljaGVkLnNldCh0ZXh0QXJlYSwgbGlzdGVuZXIpXHJcblxyXG4gICAgdGV4dEFyZWEuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgbGlzdGVuZXIsIHRydWUpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZUluZGVudGF0aW9uRW5yaWNobWVudCh0ZXh0QXJlYTogSFRNTFRleHRBcmVhRWxlbWVudCkge1xyXG4gICAgXHJcbiAgICBjb25zdCBwcmV4aXN0aW5nTGlzdGVuZXIgPSBjdXJyZW50bHlFbnJpY2hlZC5nZXQodGV4dEFyZWEpXHJcblxyXG4gICAgaWYocHJleGlzdGluZ0xpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0ZXh0QXJlYS5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBwcmV4aXN0aW5nTGlzdGVuZXIsIHRydWUpXHJcbiAgICAgICAgY3VycmVudGx5RW5yaWNoZWQuZGVsZXRlKHRleHRBcmVhKVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBub2RlSXNFbGVtZW50KG5vZGU6IE5vZGUpOiBub2RlIGlzIEVsZW1lbnQge1xyXG4gICAgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXN0b3JlIHRoZSBpbml0aWFsIGF0dHJpYnV0ZXMgdG8gYSBUZXh0QXJlYSBhZnRlciB3ZSByZW1vdmUgdGhlIG92ZXJsYXlcclxuICovXHJcbmZ1bmN0aW9uIHJlc3RvcmVJbml0aWFsQXR0cmlidXRlcyh0ZXh0QXJlYTogSFRNTFRleHRBcmVhRWxlbWVudCkge1xyXG5cclxuICAgIGNvbnN0IGluaXRpYWxBdHRyaWJ1dGVzID0gdGV4dEFyZWFzLmdldCh0ZXh0QXJlYSlcclxuXHJcbiAgICBpZighaW5pdGlhbEF0dHJpYnV0ZXMpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oXCJUcmllZCB0byByZW1vdmUgaW5pdGlhbCBhdHRyaWJ1dGVzIGZyb20gdGV4dCBhcmVhLCBidXQgdGV4dGFyZWEgbm90IGZvdW5kIGluIG1hcFwiKVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIGlmKGluaXRpYWxBdHRyaWJ1dGVzW1wiYXJpYS1kZXNjcmlwdGlvblwiXSA9PT0gbnVsbCkge1xyXG4gICAgICAgIHRleHRBcmVhLnJlbW92ZUF0dHJpYnV0ZShcImFyaWEtZGVzY3JpcHRpb25cIilcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGV4dEFyZWEuc2V0QXR0cmlidXRlKFwiYXJpYS1kZXNjcmlwdGlvblwiLCBpbml0aWFsQXR0cmlidXRlc1tcImFyaWEtZGVzY3JpcHRpb25cIl0pXHJcbiAgICB9XHJcblxyXG4gICAgaWYoaW5pdGlhbEF0dHJpYnV0ZXMuc3BlbGxjaGVjayA9PT0gbnVsbCkge1xyXG4gICAgICAgIHRleHRBcmVhLnJlbW92ZUF0dHJpYnV0ZShcInNwZWxsY2hlY2tcIilcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGV4dEFyZWEuc2V0QXR0cmlidXRlKFwic3BlbGxjaGVja1wiLCBpbml0aWFsQXR0cmlidXRlcy5zcGVsbGNoZWNrKVxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogQ2FwdHVyZSB0aGUgaW5pdGlhbCAocmVsZXZhbnQpIGF0dHJiaXV0ZXMgZnJvbSBhIHRleHQgYXJlYSBiZWZvcmUgd2UgYXBwbHkgdGhlIG92ZXJsYXlcclxuICovXHJcbmZ1bmN0aW9uIGdldEluaXRpYWxBdHRyaWJ1dGVzKHRleHRBcmVhOiBIVE1MVGV4dEFyZWFFbGVtZW50KTogSW5pdGFsVGV4dEFyZWFBdHRyaWJ1dGVzIHtcclxuICAgIFxyXG4gICAgY29uc3QgZXhpc3RpbmdBcmlhRGVzY3JpcHRpb24gPSB0ZXh0QXJlYS5nZXRBdHRyaWJ1dGUoXCJhcmlhLWRlc2NyaXB0aW9uXCIpXHJcbiAgICBjb25zdCBleGlzdGluZ1NwZWxsY2hlY2sgPSB0ZXh0QXJlYS5nZXRBdHRyaWJ1dGUoXCJzcGVsbGNoZWNrXCIpXHJcblxyXG4gICAgcmV0dXJuIHtcImFyaWEtZGVzY3JpcHRpb25cIjogZXhpc3RpbmdBcmlhRGVzY3JpcHRpb24sIHNwZWxsY2hlY2s6IGV4aXN0aW5nU3BlbGxjaGVja31cclxufVxyXG5cclxuaW50ZXJmYWNlIEluaXRhbFRleHRBcmVhQXR0cmlidXRlcyB7XHJcbiAgICBcImFyaWEtZGVzY3JpcHRpb25cIjogc3RyaW5nIHwgbnVsbFxyXG4gICAgc3BlbGxjaGVjazogc3RyaW5nIHwgbnVsbFxyXG59XHJcblxyXG5jb25zdCB0ZXh0QXJlYXM6IE1hcDxIVE1MVGV4dEFyZWFFbGVtZW50LCBJbml0YWxUZXh0QXJlYUF0dHJpYnV0ZXM+ID0gbmV3IE1hcCgpXHJcblxyXG4vLyBJbml0aWFsaXplIGFsbCB0aGUgdGV4dCBhcmVhcyB3ZSBzZWUgYWZ0ZXIgbG9hZFxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwidGV4dGFyZWFcIikuZm9yRWFjaChwcmVleGlzdGluZ1RleHRBcmVhID0+IHtcclxuICAgIHRleHRBcmVhcy5zZXQocHJlZXhpc3RpbmdUZXh0QXJlYSwgZ2V0SW5pdGlhbEF0dHJpYnV0ZXMocHJlZXhpc3RpbmdUZXh0QXJlYSkpXHJcbn0pXHJcblxyXG5mdW5jdGlvbiByZW1vdmVPdmVybGF5KHRleHRBcmVhOiBIVE1MVGV4dEFyZWFFbGVtZW50LCByZW1vdmVQZXJtZW5hbnRseTogYm9vbGVhbikge1xyXG5cclxuICAgIHRleHRBcmVhLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVPdmVybGF5Q2xpY2spXHJcbiAgICB0ZXh0QXJlYS5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBoYW5kbGVPdmVybGF5S2V5RG93bilcclxuXHJcbiAgICBpZihyZW1vdmVQZXJtZW5hbnRseSkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IHN0YXRlVXBkYXRlOiBQYXJ0aWFsPFN0b3JhZ2VNb2RhbD4gPSB7XHJcbiAgICAgICAgICAgIHdlbGNvbWVNZXNzYWdlRGlzbWlzc2VkOiB0cnVlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdG9yYWdlLnN5bmMuc2V0KHN0YXRlVXBkYXRlKVxyXG4gICAgfVxyXG5cclxuICAgIHRleHRBcmVhLmNsYXNzTGlzdC5yZW1vdmUoXCJzdGFjay1vdmVyZmxvdy1pbmRlbnRhdGlvbi1wbHVzLXBsdXMtd2VsY29tZS1vdmVybGF5XCIpXHJcbiAgICByZXN0b3JlSW5pdGlhbEF0dHJpYnV0ZXModGV4dEFyZWEpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhhbmRsZU92ZXJsYXlLZXlEb3duKHRoaXM6IEhUTUxUZXh0QXJlYUVsZW1lbnQsIGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICByZW1vdmVPdmVybGF5KHRoaXMsIHRydWUpXHJcbiAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVPdmVybGF5Q2xpY2spXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhhbmRsZU92ZXJsYXlDbGljayh0aGlzOiBIVE1MVGV4dEFyZWFFbGVtZW50LCBldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgcmVtb3ZlT3ZlcmxheSh0aGlzLCB0cnVlKVxyXG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBoYW5kbGVPdmVybGF5S2V5RG93bilcclxufVxyXG5cclxudmFyIGRvbU9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9ucykge1xyXG5cclxuICAgIG11dGF0aW9ucy5mb3JFYWNoKCBtdXRhdGlvbiA9PiB7XHJcblxyXG4gICAgICAgIGNvbnN0IG5vZGUgPSBtdXRhdGlvbi50YXJnZXRcclxuXHJcbiAgICAgICAgaWYobm9kZUlzRWxlbWVudChub2RlKSkge1xyXG4gICAgICAgICAgICBjb25zdCBuZXdUZXh0RWxlbWVudHMgPSBBcnJheS5mcm9tKG5vZGUucXVlcnlTZWxlY3RvckFsbChcInRleHRhcmVhXCIpKTtcclxuXHJcbiAgICAgICAgICAgIG5ld1RleHRFbGVtZW50cy5mb3JFYWNoKG5ld1RleHRBcmVhID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBibGFja2xpc3QgY29tbWVudHMsIGZvciBub3cuIFdlIG1heSB3YW50IHRvIHdoaXRlbGlzdCBvdGhlciBzdHVmZiBpbnN0ZWFkLCBsYXRlclxyXG4gICAgICAgICAgICAgICAgY29uc3QgaXNDb21tZW50ID1cclxuICAgICAgICAgICAgICAgICAgICBuZXdUZXh0QXJlYS5uYW1lID09PSBcImNvbW1lbnRcIlxyXG4gICAgICAgICAgICAgICAgICAgIHx8IG5ld1RleHRBcmVhLnBsYWNlaG9sZGVyID09PSBcIlVzZSBjb21tZW50cyB0byBhc2sgZm9yIGNsYXJpZmljYXRpb24gb3IgYWRkIG1vcmUgaW5mb3JtYXRpb24uIEF2b2lkIGFuc3dlcmluZyBxdWVzdGlvbnMgaW4gY29tbWVudHMuXCJcclxuICAgICAgICAgICAgICAgICAgICB8fCBuZXdUZXh0QXJlYS5jbG9zZXN0KFwiY29tbWVudC1mb3JtXCIpXHJcblxyXG4gICAgICAgICAgICAgICAgaWYoIWlzQ29tbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHRBcmVhcy5zZXQobmV3VGV4dEFyZWEsIGdldEluaXRpYWxBdHRyaWJ1dGVzKG5ld1RleHRBcmVhKSlcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBpZihuZXdUZXh0RWxlbWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgYXBwbHlEb21Nb2RpZmljYXRpb25zKHN0b3JhZ2VTdGF0ZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGFwcGx5RG9tTW9kaWZpY2F0aW9ucyhleGlzdGluZ1N0YXRlOiBTdG9yYWdlTW9kYWwpIHtcclxuXHJcbiAgICAvLyB0ZWxsIHRoZSBiYWNrZ3JvdW5kIHJ1bm5lciB0aGF0IHdlJ3JlIGFjdGl2ZSwgc28gaXQgY2FuIGNoYW5nZSB0aGUgYmFkZ2UgdGV4dFxyXG4gICAgc2VuZFR5cGVkTWVzc2FnZSh7dHlwZTogXCJzZXRfYWN0aXZlXCIsIHRleHQ6IGV4aXN0aW5nU3RhdGUuZnVuY3Rpb25hbGl0eURpc2FibGVkID8gXCJvZmZcIiA6IFwib25cIn0pXHJcblxyXG4gICAgdGV4dEFyZWFzLmZvckVhY2goKGluaXRpYWxBdHRyaWJ1dGVzLCB0ZXh0QXJlYSkgPT4ge1xyXG5cclxuXHJcbiAgICAgICAgaWYoZXhpc3RpbmdTdGF0ZS5mdW5jdGlvbmFsaXR5RGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgcmVtb3ZlSW5kZW50YXRpb25FbnJpY2htZW50KHRleHRBcmVhKVxyXG4gICAgICAgICAgICByZW1vdmVPdmVybGF5KHRleHRBcmVhLCBmYWxzZSlcclxuICAgICAgICAgICAgdGV4dEFyZWEuY2xhc3NMaXN0LnJlbW92ZShcInN0YWNrLWV4Y2hhbmdlLWluZGVuZGF0aW9uLXBsdXMtcGx1cy1ib3JkZXJlZFwiKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAvLyBub3QgZGlzYWJsZWQsIHNvIHdlIGFwcGx5IGFsbCBvdXIgbW9kaWZpY2F0aW9uIGJhc2VkIG9uIG90aGVyIHNldHRpbmdzXHJcblxyXG4gICAgICAgICAgICBpZihleGlzdGluZ1N0YXRlLndlbGNvbWVNZXNzYWdlRGlzbWlzc2VkKSB7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVPdmVybGF5KHRleHRBcmVhLCBmYWxzZSlcclxuICAgICAgICAgICAgfSBlbHNlIHsgLy8gZmlyc3QgdGltZSBhZnRlciBpbnN0YWxsXHJcblxyXG4gICAgICAgICAgICAgICAgdGV4dEFyZWEuY2xhc3NMaXN0LmFkZChcInN0YWNrLW92ZXJmbG93LWluZGVudGF0aW9uLXBsdXMtcGx1cy13ZWxjb21lLW92ZXJsYXlcIilcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gc3RvcmUgdmFyaW91cyBzZXR0aW5ncywgc3BlbGxjaGVjayBhbmQgYXJpYSBcclxuICAgICAgICAgICAgICAgIHRleHRBcmVhLnNwZWxsY2hlY2sgPSBmYWxzZVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIE1pZ2h0IG5vdCBiZSBuZWVkZWQsIGFzIHRoZSBiYWNrZ3JvdW5kIHdvdWxkIGxpa2VseSBiZSBpZ25vcmVkIGJ5IHNjcmVlbiByZWFkZXJzXHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBmaW5kIGlmIHRoaXMgaXMgYSB1c2VmdWwgYWNjZXNzaWJpbGl0eSBzZXR0aW5nLCBvciB1c2VsZXNzL2RldHJpbWVudGFsXHJcbiAgICAgICAgICAgICAgICB0ZXh0QXJlYS5zZXRBdHRyaWJ1dGUoXCJhcmlhLWRlc2NyaXB0aW9uXCIsIFwiVGV4dGFyZWEgd2l0aCBhbiBvdmVybGF5IHdlbGNvbWUgbWVzc2FnZSBmcm9tIHRoZSBTdGFjayBPdmVyZmxvdyArKyBleHRlbnNpb24uXCIgKyBcclxuICAgICAgICAgICAgICAgIFwiIEFueSBrZXlib2FyZCBvciBtb3VzZSBpbnRlcmFjdGlvbiB3aWxsIHBlcm1hbmVudGx5IGRpc21pc3MgdGhpcyBvdmVybGF5LiBPdmVybGF5IGNvbnRhaW5zIGFuIGltYWdlIHdpdGggdGV4dCB0aGF0XCIgK1xyXG4gICAgICAgICAgICAgICAgXCIgd2VsY29tZXMgeW91IHRvIHRoZSBleHRlbnNpb24sIGluc3RydWN0cyB5b3UgdGhhdCB0YWJiaW5nIHdpbGwgaW5kZW50IG9uZSBvciBtb3JlIGxpbmVzIGFuZCBzaGlmdC10YWJiaW5nIHdpbGwgZGUtaW5kZW50LFwiICtcclxuICAgICAgICAgICAgICAgIFwiIGFuZCBub3RlcyB0aGF0IHlvdSBjYW4gdXNlIHRoZSBleHRlbnNpb24ncyB0b29sYmFyIGFjdGlvbiB0byBjaGFuZ2UgdmFyaW91cyBzZXR0aW5ncyAoc3VjaCBhcyB0aGUgbnVtYmVyXCIgK1xyXG4gICAgICAgICAgICAgICAgXCIgb2Ygc3BhY2VzIHBlciB0YWIpLiBJbnRlcmFjdCB0byBkaXNtaXNzLCBhbmQgSSBob3BlIHlvdSBlbmpveSB0aGUgZXh0ZW5zaW9uIVwiKVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBlYWNoIGxpc3RlbmVyIHdpbGwgZmlyZSBvbmNlLCBhbmQgd2hlbiBmaXJlZCB3aWxsIHJlbW92ZSB0aGUgb3RoZXIgbGlzdG5lciB0aGF0IHdhc24ndCBmaXJlZFxyXG4gICAgICAgICAgICAgICAgdGV4dEFyZWEuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZU92ZXJsYXlDbGljaywge29uY2U6IHRydWV9KVxyXG4gICAgICAgICAgICAgICAgdGV4dEFyZWEuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgaGFuZGxlT3ZlcmxheUtleURvd24sIHtvbmNlOiB0cnVlfSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoZXhpc3RpbmdTdGF0ZS50ZXh0QXJlYUJvcmRlckVuYWJsZWQgPz8gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGV4dEFyZWEuY2xhc3NMaXN0LmFkZChcInN0YWNrLWV4Y2hhbmdlLWluZGVuZGF0aW9uLXBsdXMtcGx1cy1ib3JkZXJlZFwiKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGV4dEFyZWEuY2xhc3NMaXN0LnJlbW92ZShcInN0YWNrLWV4Y2hhbmdlLWluZGVuZGF0aW9uLXBsdXMtcGx1cy1ib3JkZXJlZFwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBlbnJpY2hXaXRoSW5kZW50YXRpb24odGV4dEFyZWEpXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pXHJcbiAgICBcclxufVxyXG5cclxuLyoqXHJcbiAqIFV0aWxpdHkgZnVuY3Rpb24gdG8gYWRkIENTUyBpbiBtdWx0aXBsZSBwYXNzZXMuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHlsZVN0cmluZ1xyXG4gKi9cclxuZnVuY3Rpb24gYWRkU3R5bGUoc3R5bGVTdHJpbmc6IHN0cmluZykge1xyXG4gICAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xyXG4gICAgc3R5bGUudGV4dENvbnRlbnQgPSBzdHlsZVN0cmluZztcclxuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kKHN0eWxlKTtcclxufVxyXG5cclxuLy8gaXQgc2VlbXMgbGlrZSBmb3IgbWFuaWZlc3QgMywgdGhlIGJ1bmRsZXIgYXV0b21hdGljYWxseSBnZXRzIHRoZSB1cmwgb24gYHJlcXVpcmVgLCBidXQgb25seSBnaXZlcyB0aGUgZmlsZSBwYXRoIGZvciBtYW5pZmVzdCAyLiBTdHJhbmdlLlxyXG5jb25zdCBjb21wYXRpYmxlR2V0VVJMID0gKHBhdGhPclVybDogc3RyaW5nKSA9PiB0eXBlb2YgYnJvd3NlciA9PT0gXCJ1bmRlZmluZWRcIiA/IHBhdGhPclVybCA6IGJyb3dzZXIucnVudGltZS5nZXRVUkwocGF0aE9yVXJsKVxyXG5cclxuY29uc3QgdGV4dEFyZWFPdmVybGF5VXJsID0gY29tcGF0aWJsZUdldFVSTChyZXF1aXJlKFwiLi4vaW1hZ2VzL3RleHRBcmVhT3ZlcmxheS5wbmdcIikpXHJcbmNvbnN0IHRleHRBcmVhT3ZlcmxheUhvdmVyVXJsID0gY29tcGF0aWJsZUdldFVSTChyZXF1aXJlKFwiLi4vaW1hZ2VzL3RleHRBcmVhT3ZlcmxheUhvdmVyZWQucG5nXCIpKVxyXG5cclxuLy8gd2UgbmVlZCB0byBnZXQgdGhlIGltYWdlIHVybCBmcm9tIHRoZSBydW50aW1lLCBzbyB3ZSBjYW4ndCBkZWZpbmUgdGhpcyBpbiBvdXIgY3NzIGZpbGVcclxuLy8gaW5zdGVhZCwgd2UganVzdCBpbmplY3QgaXQgaW50byB0aGUgaGVhZFxyXG4vLyB3ZSBhZGQgYm90aCBpbWFnZXMgaW4gdGhlIGJhY2tncm91bmQtaW1hZ2UsIGJ1dCB0aGUgbGF0ZXIgd2lsbCBiZSBoaWRkZW4gYnkgdGhlIGdyYWRpZW50XHJcbi8vIGhvd2V2ZXIsIHRoaXMgZW5mb3JjZXMgaXQgZ2V0cyBsb2FkZWQsIHNvIHRoYXQgd2hlbiB3ZSBob3ZlciBsYXRlciB0aGlzIGlzIG5vIGRlbGF5XHJcbmFkZFN0eWxlKGBcclxuICB0ZXh0YXJlYS5zdGFjay1vdmVyZmxvdy1pbmRlbnRhdGlvbi1wbHVzLXBsdXMtd2VsY29tZS1vdmVybGF5LCB0ZXh0YXJlYS5zdGFjay1vdmVyZmxvdy1pbmRlbnRhdGlvbi1wbHVzLXBsdXMtd2VsY29tZS1vdmVybGF5OmZvY3VzIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgke3RleHRBcmVhT3ZlcmxheVVybH0pLCBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICNhOGMwZmYsICMzZjJiOTYpLCB1cmwoJHt0ZXh0QXJlYU92ZXJsYXlIb3ZlclVybH0pO1xyXG4gICAgY29sb3I6IHRyYW5zcGFyZW50O1xyXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6bm8tcmVwZWF0O1xyXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICB9XHJcbiAgXHJcbiAgdGV4dGFyZWEuc3RhY2stb3ZlcmZsb3ctaW5kZW50YXRpb24tcGx1cy1wbHVzLXdlbGNvbWUtb3ZlcmxheTpob3ZlciB7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHt0ZXh0QXJlYU92ZXJsYXlIb3ZlclVybH0pLCBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICNhOGMwZmYsICMzZjJiOTYpO1xyXG4gIH0gXHJcbmApXHJcblxyXG4vLyBUT0RPOiBjZW50cmFsaXplIGRlZmF1bHRzIGZvciBoZXJlIGFuZCBwb3B1cFxyXG5sZXQgc3RvcmFnZVN0YXRlOiBTdG9yYWdlTW9kYWwgPSB7fVxyXG5cclxuLyoqXHJcbiAqIEdldCBpbml0YWwgc3RhdGVcclxuICogXHJcbiAqIGFwcGx5IGFsbCBtb2RpZmljaWF0aW9ucyB0byB0aGUgZG9tIChob29rIGludG8gdGV4dGFyZWFzIGZvciBpbmRlbnRhdGlvbiwgYWRkIGJvcmRlciwgcG90ZW50aWFsbHkgYWRkIG92ZXJsYXksIG9yIHJlbW92ZSBhbnkgb2YgdGhlc2UpXHJcbiAqIFxyXG4gKiBsaXN0ZW4gdG8gYW55IGNoYW5nZXMgb2Ygc3luYyBzdG9yYWdlXHJcbiAqICAgICogYW5kIHJlYXBwbHkgZG9tIG1vZGlmaWNhdGlvbnNcclxuICogXHJcbiAqIG9ic2VydmUgbmV3IHRleHQgYXJlYXMgYWRkZWRcclxuICogICAgKiBhbmQgcmVhcHBseSBkb20gbW9kaWZpY2F0aW9uc1xyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gc2V0dXAoKSB7XHJcblxyXG4gICAgY29uc3QgaW5pdGlhbFN0b3JhZ2VTdGF0ZSA9IGF3YWl0IHN0b3JhZ2Uuc3luYy5nZXQoKVxyXG4gICAgc3RvcmFnZVN0YXRlID0gaW5pdGlhbFN0b3JhZ2VTdGF0ZVxyXG5cclxuICAgIGFwcGx5RG9tTW9kaWZpY2F0aW9ucyhzdG9yYWdlU3RhdGUpXHJcblxyXG4gICAgc3RvcmFnZS5vbkNoYW5nZWQuYWRkTGlzdGVuZXIoKGNoYW5nZXMsIGFyZWEpID0+IHtcclxuXHJcbiAgICAgICAgaWYoYXJlYSAhPT0gXCJzeW5jXCIpIHtcclxuICAgICAgICAgICAgLy8gd2Ugb25seSBjYXJlIGFib3V0IHN5bmMgc3RhdGUuIHN0b3JhZ2Uuc3luYy5vbkNoYW5nZWQgZG9lc24ndCBleGlzdCBmb3IgdGhlIFwiYnJvd3NlclwiIG9iamVjdFxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBjb25zdCBhbGxDaGFuZ2VzOiBQYXJ0aWFsPFN0b3JhZ2VNb2RhbD4gPSB7fVxyXG4gICAgXHJcbiAgICAgICAgZm9yIChjb25zdCBbcHJvcGVydHksIGNoYW5nZV0gb2YgT2JqZWN0LmVudHJpZXMoY2hhbmdlcykpIHtcclxuICAgICAgICAgICAgYWxsQ2hhbmdlc1twcm9wZXJ0eSBhcyBrZXlvZiBTdG9yYWdlTW9kYWxdID0gKGNoYW5nZSBhcyBhbnkpLm5ld1ZhbHVlXHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgc3RvcmFnZVN0YXRlID0gKHsuLi5zdG9yYWdlU3RhdGUsIC4uLmFsbENoYW5nZXN9KVxyXG4gICAgICAgIGFwcGx5RG9tTW9kaWZpY2F0aW9ucyhzdG9yYWdlU3RhdGUpXHJcbiAgICB9KVxyXG5cclxuICAgIC8vIG9ic2VydmUgdGhlIGRvY3VtZW50IGRvY3VtZW50IGJvZHkgZm9yIGNoYW5nZXMuIFdlIGNvdWxkIHByb2JhYmx5IG9ic2VydmUgYSBzbWFsbGVyIHBvcnRpb24gb2YgdGhlIHBhZ2UsXHJcbiAgICAvLyBidXQgdGhpcyB3aWxsIGNhdGNoIGFsbCBjaGFuZ2VzIGFuZCBTdGFjayBPdmVyZmxvdyBpc24ndCBhIGhpZ2hseSBkeW5hbWljIHBhZ2Ugc28gdGhlIGNvc3QgaXMgY2hlYXBcclxuICAgIGRvbU9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuYm9keSwge2NoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZX0pO1xyXG59XHJcblxyXG5zZXR1cCgpIiwiZnVuY3Rpb24gYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBrZXksIGFyZykge1xuICB0cnkge1xuICAgIHZhciBpbmZvID0gZ2VuW2tleV0oYXJnKTtcbiAgICB2YXIgdmFsdWUgPSBpbmZvLnZhbHVlO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlamVjdChlcnJvcik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGluZm8uZG9uZSkge1xuICAgIHJlc29sdmUodmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihfbmV4dCwgX3Rocm93KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXN5bmNUb0dlbmVyYXRvcihmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciBnZW4gPSBmbi5hcHBseShzZWxmLCBhcmdzKTtcblxuICAgICAgZnVuY3Rpb24gX25leHQodmFsdWUpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcIm5leHRcIiwgdmFsdWUpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBfdGhyb3coZXJyKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJ0aHJvd1wiLCBlcnIpO1xuICAgICAgfVxuXG4gICAgICBfbmV4dCh1bmRlZmluZWQpO1xuICAgIH0pO1xuICB9O1xufVxuIiwiZXhwb3J0cy5pbnRlcm9wRGVmYXVsdCA9IGZ1bmN0aW9uIChhKSB7XG4gIHJldHVybiBhICYmIGEuX19lc01vZHVsZSA/IGEgOiB7ZGVmYXVsdDogYX07XG59O1xuXG5leHBvcnRzLmRlZmluZUludGVyb3BGbGFnID0gZnVuY3Rpb24gKGEpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGEsICdfX2VzTW9kdWxlJywge3ZhbHVlOiB0cnVlfSk7XG59O1xuXG5leHBvcnRzLmV4cG9ydEFsbCA9IGZ1bmN0aW9uIChzb3VyY2UsIGRlc3QpIHtcbiAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBpZiAoa2V5ID09PSAnZGVmYXVsdCcgfHwga2V5ID09PSAnX19lc01vZHVsZScgfHwgZGVzdC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRlc3QsIGtleSwge1xuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gc291cmNlW2tleV07XG4gICAgICB9LFxuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gZGVzdDtcbn07XG5cbmV4cG9ydHMuZXhwb3J0ID0gZnVuY3Rpb24gKGRlc3QsIGRlc3ROYW1lLCBnZXQpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRlc3QsIGRlc3ROYW1lLCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGdldCxcbiAgfSk7XG59O1xuIiwiaW1wb3J0IGRlZmluZVByb3BlcnR5IGZyb20gJy4vX2RlZmluZV9wcm9wZXJ0eS5tanMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfb2JqZWN0U3ByZWFkKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHt9O1xuICAgIHZhciBvd25LZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcblxuICAgIGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgb3duS2V5cyA9IG93bktleXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKS5maWx0ZXIoZnVuY3Rpb24gKHN5bSkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIHN5bSkuZW51bWVyYWJsZTtcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBvd25LZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG4iLCJpbXBvcnQgYXJyYXlXaXRoSG9sZXMgZnJvbSAnLi9fYXJyYXlfd2l0aF9ob2xlcy5tanMnO1xuaW1wb3J0IGl0ZXJhYmxlVG9BcnJheUxpbWl0IGZyb20gJy4vX2l0ZXJhYmxlX3RvX2FycmF5Lm1qcyc7XG5pbXBvcnQgbm9uSXRlcmFibGVSZXN0IGZyb20gJy4vX25vbl9pdGVyYWJsZV9yZXN0Lm1qcyc7XG5pbXBvcnQgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkgZnJvbSAnLi9fdW5zdXBwb3J0ZWRfaXRlcmFibGVfdG9fYXJyYXkubWpzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7XG4gIHJldHVybiBhcnJheVdpdGhIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBub25JdGVyYWJsZVJlc3QoKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXkoaXRlcikge1xuICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBpdGVyW1N5bWJvbC5pdGVyYXRvcl0gIT0gbnVsbCB8fCBpdGVyW1wiQEBpdGVyYXRvclwiXSAhPSBudWxsKSByZXR1cm4gQXJyYXkuZnJvbShpdGVyKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn1cbiIsImltcG9ydCBfYXJyYXlMaWtlVG9BcnJheSBmcm9tICcuL19hcnJheV9saWtlX3RvX2FycmF5Lm1qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHtcbiAgaWYgKCFvKSByZXR1cm47XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG4gIHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtcbiAgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTtcbiAgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obik7XG4gIGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKVxuICAgIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHtcbiAgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgYXJyMltpXSA9IGFycltpXTtcbiAgcmV0dXJuIGFycjI7XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbnZhciBydW50aW1lID0gKGZ1bmN0aW9uIChleHBvcnRzKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBPcCA9IE9iamVjdC5wcm90b3R5cGU7XG4gIHZhciBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5IHx8IGZ1bmN0aW9uIChvYmosIGtleSwgZGVzYykgeyBvYmpba2V5XSA9IGRlc2MudmFsdWU7IH07XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbCA6IHt9O1xuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuICB2YXIgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiO1xuICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuXG4gIGZ1bmN0aW9uIGRlZmluZShvYmosIGtleSwgdmFsdWUpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBvYmpba2V5XTtcbiAgfVxuICB0cnkge1xuICAgIC8vIElFIDggaGFzIGEgYnJva2VuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSB0aGF0IG9ubHkgd29ya3Mgb24gRE9NIG9iamVjdHMuXG4gICAgZGVmaW5lKHt9LCBcIlwiKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZGVmaW5lID0gZnVuY3Rpb24ob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgICByZXR1cm4gb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQgYW5kIG91dGVyRm4ucHJvdG90eXBlIGlzIGEgR2VuZXJhdG9yLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG5cbiAgICAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuICAgIGRlZmluZVByb3BlcnR5KGdlbmVyYXRvciwgXCJfaW52b2tlXCIsIHsgdmFsdWU6IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkgfSk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIGV4cG9ydHMud3JhcCA9IHdyYXA7XG5cbiAgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJub3JtYWxcIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJ0aHJvd1wiLCBhcmc6IGVyciB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcblxuICAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcblxuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuXG4gIC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgLy8gZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBpdC5cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIGRlZmluZShJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIGlmIChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJlxuICAgICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmXG4gICAgICBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9XG4gICAgR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgZGVmaW5lUHJvcGVydHkoR3AsIFwiY29uc3RydWN0b3JcIiwgeyB2YWx1ZTogR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9KTtcbiAgZGVmaW5lUHJvcGVydHkoXG4gICAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsXG4gICAgXCJjb25zdHJ1Y3RvclwiLFxuICAgIHsgdmFsdWU6IEdlbmVyYXRvckZ1bmN0aW9uLCBjb25maWd1cmFibGU6IHRydWUgfVxuICApO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IGRlZmluZShcbiAgICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSxcbiAgICB0b1N0cmluZ1RhZ1N5bWJvbCxcbiAgICBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgKTtcblxuICAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICBkZWZpbmUocHJvdG90eXBlLCBtZXRob2QsIGZ1bmN0aW9uKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yXG4gICAgICA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8XG4gICAgICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgICAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gIH07XG5cbiAgZXhwb3J0cy5tYXJrID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgICBkZWZpbmUoZ2VuRnVuLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JGdW5jdGlvblwiKTtcbiAgICB9XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07XG5cbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cbiAgZXhwb3J0cy5hd3JhcCA9IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB7IF9fYXdhaXQ6IGFyZyB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yLCBQcm9taXNlSW1wbCkge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSAmJlxuICAgICAgICAgICAgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAvLyBJZiBhIHJlamVjdGVkIFByb21pc2Ugd2FzIHlpZWxkZWQsIHRocm93IHRoZSByZWplY3Rpb24gYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgaGFuZGxlZCB0aGVyZS5cbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlSW1wbChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID1cbiAgICAgICAgLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKFxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLFxuICAgICAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAgICAgLy8gaW52b2NhdGlvbnMgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnXG4gICAgICAgICkgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH1cblxuICAgIC8vIERlZmluZSB0aGUgdW5pZmllZCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbXBsZW1lbnQgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG4gICAgZGVmaW5lUHJvcGVydHkodGhpcywgXCJfaW52b2tlXCIsIHsgdmFsdWU6IGVucXVldWUgfSk7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuICBkZWZpbmUoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUsIGFzeW5jSXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG4gIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCwgUHJvbWlzZUltcGwpIHtcbiAgICBpZiAoUHJvbWlzZUltcGwgPT09IHZvaWQgMCkgUHJvbWlzZUltcGwgPSBQcm9taXNlO1xuXG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpLFxuICAgICAgUHJvbWlzZUltcGxcbiAgICApO1xuXG4gICAgcmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKVxuICAgICAgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICAgICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgY29udGV4dC5hcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdO1xuICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gQSAudGhyb3cgb3IgLnJldHVybiB3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gLnRocm93XG4gICAgICAvLyBtZXRob2QgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIC8vIE5vdGU6IFtcInJldHVyblwiXSBtdXN0IGJlIHVzZWQgZm9yIEVTMyBwYXJzaW5nIGNvbXBhdGliaWxpdHkuXG4gICAgICAgIGlmIChkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXSkge1xuICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIC8vIElmIG1heWJlSW52b2tlRGVsZWdhdGUoY29udGV4dCkgY2hhbmdlZCBjb250ZXh0Lm1ldGhvZCBmcm9tXG4gICAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG5cbiAgICBpZiAoISBpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAvLyBBc3NpZ24gdGhlIHJlc3VsdCBvZiB0aGUgZmluaXNoZWQgZGVsZWdhdGUgdG8gdGhlIHRlbXBvcmFyeVxuICAgICAgLy8gdmFyaWFibGUgc3BlY2lmaWVkIGJ5IGRlbGVnYXRlLnJlc3VsdE5hbWUgKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlO1xuXG4gICAgICAvLyBSZXN1bWUgZXhlY3V0aW9uIGF0IHRoZSBkZXNpcmVkIGxvY2F0aW9uIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jO1xuXG4gICAgICAvLyBJZiBjb250ZXh0Lm1ldGhvZCB3YXMgXCJ0aHJvd1wiIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGVcbiAgICAgIC8vIGV4Y2VwdGlvbiwgbGV0IHRoZSBvdXRlciBnZW5lcmF0b3IgcHJvY2VlZCBub3JtYWxseS4gSWZcbiAgICAgIC8vIGNvbnRleHQubWV0aG9kIHdhcyBcIm5leHRcIiwgZm9yZ2V0IGNvbnRleHQuYXJnIHNpbmNlIGl0IGhhcyBiZWVuXG4gICAgICAvLyBcImNvbnN1bWVkXCIgYnkgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yLiBJZiBjb250ZXh0Lm1ldGhvZCB3YXNcbiAgICAgIC8vIFwicmV0dXJuXCIsIGFsbG93IHRoZSBvcmlnaW5hbCAucmV0dXJuIGNhbGwgdG8gY29udGludWUgaW4gdGhlXG4gICAgICAvLyBvdXRlciBnZW5lcmF0b3IuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmUteWllbGQgdGhlIHJlc3VsdCByZXR1cm5lZCBieSB0aGUgZGVsZWdhdGUgbWV0aG9kLlxuICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxuXG4gICAgLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIGRlZmluZShHcCwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yXCIpO1xuXG4gIC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgZGVmaW5lKEdwLCBpdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pO1xuXG4gIGRlZmluZShHcCwgXCJ0b1N0cmluZ1wiLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBleHBvcnRzLmtleXMgPSBmdW5jdGlvbih2YWwpIHtcbiAgICB2YXIgb2JqZWN0ID0gT2JqZWN0KHZhbCk7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAga2V5cy5yZXZlcnNlKCk7XG5cbiAgICAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSwgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0LnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG5cbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG4gICAgcmV0dXJuIHsgbmV4dDogZG9uZVJlc3VsdCB9O1xuICB9XG4gIGV4cG9ydHMudmFsdWVzID0gdmFsdWVzO1xuXG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICB9XG5cbiAgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG5cbiAgICByZXNldDogZnVuY3Rpb24oc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7XG4gICAgICAvLyBSZXNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO1xuXG4gICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmXG4gICAgICAgICAgICAgIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmXG4gICAgICAgICAgICAgICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcblxuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcblxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbihleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmVjb3JkLnR5cGUgPSBcInRocm93XCI7XG4gICAgICAgIHJlY29yZC5hcmcgPSBleGNlcHRpb247XG4gICAgICAgIGNvbnRleHQubmV4dCA9IGxvYztcblxuICAgICAgICBpZiAoY2F1Z2h0KSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRpc3BhdGNoZWQgZXhjZXB0aW9uIHdhcyBjYXVnaHQgYnkgYSBjYXRjaCBibG9jayxcbiAgICAgICAgICAvLyB0aGVuIGxldCB0aGF0IGNhdGNoIGJsb2NrIGhhbmRsZSB0aGUgZXhjZXB0aW9uIG5vcm1hbGx5LlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gISEgY2F1Z2h0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb24gdGhyb3duIG91dHNpZGUgb2YgYW55IHRyeSBibG9jayB0aGF0IGNvdWxkIGhhbmRsZVxuICAgICAgICAgIC8vIGl0LCBzbyBzZXQgdGhlIGNvbXBsZXRpb24gdmFsdWUgb2YgdGhlIGVudGlyZSBmdW5jdGlvbiB0b1xuICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIik7XG4gICAgICAgICAgdmFyIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuXG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uKHR5cGUsIGFyZykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmXG4gICAgICAgICAgICB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiZcbiAgICAgICAgICAodHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgIHR5cGUgPT09IFwiY29udGludWVcIikgJiZcbiAgICAgICAgICBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJlxuICAgICAgICAgIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICB9LFxuXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgcmVjb3JkLnR5cGUgPT09IFwiY29udGludWVcIikge1xuICAgICAgICB0aGlzLm5leHQgPSByZWNvcmQuYXJnO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICB0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG5cbiAgICBmaW5pc2g6IGZ1bmN0aW9uKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24odHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAvLyBhcmd1bWVudCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEga25vd24gY2F0Y2ggYmxvY2suXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcblxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndFxuICAgICAgICAvLyBhY2NpZGVudGFsbHkgcGFzcyBpdCBvbiB0byB0aGUgZGVsZWdhdGUuXG4gICAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07XG5cbiAgLy8gUmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZVxuICAvLyBvciBub3QsIHJldHVybiB0aGUgcnVudGltZSBvYmplY3Qgc28gdGhhdCB3ZSBjYW4gZGVjbGFyZSB0aGUgdmFyaWFibGVcbiAgLy8gcmVnZW5lcmF0b3JSdW50aW1lIGluIHRoZSBvdXRlciBzY29wZSwgd2hpY2ggYWxsb3dzIHRoaXMgbW9kdWxlIHRvIGJlXG4gIC8vIGluamVjdGVkIGVhc2lseSBieSBgYmluL3JlZ2VuZXJhdG9yIC0taW5jbHVkZS1ydW50aW1lIHNjcmlwdC5qc2AuXG4gIHJldHVybiBleHBvcnRzO1xuXG59KFxuICAvLyBJZiB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGUsIHVzZSBtb2R1bGUuZXhwb3J0c1xuICAvLyBhcyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIG5hbWVzcGFjZS4gT3RoZXJ3aXNlIGNyZWF0ZSBhIG5ldyBlbXB0eVxuICAvLyBvYmplY3QuIEVpdGhlciB3YXksIHRoZSByZXN1bHRpbmcgb2JqZWN0IHdpbGwgYmUgdXNlZCB0byBpbml0aWFsaXplXG4gIC8vIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgdmFyaWFibGUgYXQgdGhlIHRvcCBvZiB0aGlzIGZpbGUuXG4gIHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgPyBtb2R1bGUuZXhwb3J0cyA6IHt9XG4pKTtcblxudHJ5IHtcbiAgcmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbn0gY2F0Y2ggKGFjY2lkZW50YWxTdHJpY3RNb2RlKSB7XG4gIC8vIFRoaXMgbW9kdWxlIHNob3VsZCBub3QgYmUgcnVubmluZyBpbiBzdHJpY3QgbW9kZSwgc28gdGhlIGFib3ZlXG4gIC8vIGFzc2lnbm1lbnQgc2hvdWxkIGFsd2F5cyB3b3JrIHVubGVzcyBzb21ldGhpbmcgaXMgbWlzY29uZmlndXJlZC4gSnVzdFxuICAvLyBpbiBjYXNlIHJ1bnRpbWUuanMgYWNjaWRlbnRhbGx5IHJ1bnMgaW4gc3RyaWN0IG1vZGUsIGluIG1vZGVybiBlbmdpbmVzXG4gIC8vIHdlIGNhbiBleHBsaWNpdGx5IGFjY2VzcyBnbG9iYWxUaGlzLiBJbiBvbGRlciBlbmdpbmVzIHdlIGNhbiBlc2NhcGVcbiAgLy8gc3RyaWN0IG1vZGUgdXNpbmcgYSBnbG9iYWwgRnVuY3Rpb24gY2FsbC4gVGhpcyBjb3VsZCBjb25jZWl2YWJseSBmYWlsXG4gIC8vIGlmIGEgQ29udGVudCBTZWN1cml0eSBQb2xpY3kgZm9yYmlkcyB1c2luZyBGdW5jdGlvbiwgYnV0IGluIHRoYXQgY2FzZVxuICAvLyB0aGUgcHJvcGVyIHNvbHV0aW9uIGlzIHRvIGZpeCB0aGUgYWNjaWRlbnRhbCBzdHJpY3QgbW9kZSBwcm9ibGVtLiBJZlxuICAvLyB5b3UndmUgbWlzY29uZmlndXJlZCB5b3VyIGJ1bmRsZXIgdG8gZm9yY2Ugc3RyaWN0IG1vZGUgYW5kIGFwcGxpZWQgYVxuICAvLyBDU1AgdG8gZm9yYmlkIEZ1bmN0aW9uLCBhbmQgeW91J3JlIG5vdCB3aWxsaW5nIHRvIGZpeCBlaXRoZXIgb2YgdGhvc2VcbiAgLy8gcHJvYmxlbXMsIHBsZWFzZSBkZXRhaWwgeW91ciB1bmlxdWUgcHJlZGljYW1lbnQgaW4gYSBHaXRIdWIgaXNzdWUuXG4gIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gXCJvYmplY3RcIikge1xuICAgIGdsb2JhbFRoaXMucmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbiAgfSBlbHNlIHtcbiAgICBGdW5jdGlvbihcInJcIiwgXCJyZWdlbmVyYXRvclJ1bnRpbWUgPSByXCIpKHJ1bnRpbWUpO1xuICB9XG59XG4iLCJcclxudHlwZSBSdW50aW1lTWVzc2FnZSA9IHtcclxuICAgIHR5cGU6IFwic2V0X2FjdGl2ZVwiLFxyXG4gICAgdGV4dDogXCJvblwiIHwgXCJvZmZcIlxyXG59XHJcblxyXG4vLyB1c2UgYnJvd3NlciBpZiBpdCBleGlzdHMgKGluZGljYXRpbmcgd2UncmUgcnVubmluZyBpbiBtYW5pZmVzdCB2MiBpbiBmaXJlZm94KSwgb3RoZXJ3aXNlIHVzZSBjaHJvbWUgKGZvciB2MylcclxuZXhwb3J0IGNvbnN0IHNlbmRUeXBlZE1lc3NhZ2UgPSAobWVzc2FnZTogUnVudGltZU1lc3NhZ2UpID0+IFxyXG4gICAgKHR5cGVvZiBicm93c2VyID09PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgID8gY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UobWVzc2FnZSlcclxuICAgICAgICA6IGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZShtZXNzYWdlKVxyXG4gICAgICAgIFxyXG5leHBvcnQgZGVmYXVsdCBSdW50aW1lTWVzc2FnZSIsIi8qKlxyXG4gKiBUaGlzIGlzIHNvdXJjZWQgZnJvbSBhIGNvZGVwZW4gKGh0dHBzOi8vY29kZXBlbi5pby9NZUJlaU0vcGVuL29ncm1CUC8pIGJ5IE1hcmNvIEJvbmVsbGkgKGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS91c2Vycy8zODg5NDQ5KVxyXG4gKiBcclxuICogSSBkaXNjb3ZlcmVkIGl0IGluIHRoaXMgbWV0YSBzdGFjayBvdmVyZmxvdyBwb3N0OiBodHRwczovL21ldGEuc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzI5MDAyNi9tYXJrZG93bi1lZGl0b3ItaW5kZW50LWFuZC1vdXRkZW50LWZ1bmN0aW9uYWxpdHlcclxuICogXHJcbiAqIEluIHRoYXQgcG9zdCwgTWFyY28gc3RhdGVzOlxyXG4gKiA+IEl0J3MganVzdCBzaXh0eSBsaW5lcyBvZiBjb2RlIHNvIEkgZG9uJ3Qgc2VlIHRoZSBuZWVkIG9mIGFueSBjb3B5cmlnaHQvbGljZW5zZS9hdHRyaWJ1dGlvbiwgXHJcbiAqID4gSSBqdXN0IHdhbnRlZCB0byBzaGFyZSBpdCB3aXRoIG15IGZlbGxvdyBwcm9ncmFtbWVycyBoZXJlIG9uIFN0YWNrIE92ZXJmbG93IDopXHJcbiAqIFxyXG4gKiBJbiB0aGF0IHNwaXJpdCwgdGhpcyBmaWxlIGlzIG9mZmljYWxseSB1bmxpY2Vuc2VkLCB0aG91Z2ggSSBoYXZlIG1hZGUgc29tZSBtb2RpZmljYXRpb25zICh0aGUgcmVzdCBvZiB0aGlzIHJlcG8gaXMgTUlUIGxpY2Vuc2VkKS5cclxuICogSG93ZXZlciwgaWYgeW91IHVzZSBpdCwgcGxlYXNlIGF0dHJpYnV0ZSBNYXJjbywgYW5kIG9wdGlvbmFsbHkgbWUgaWYgeW91IHVzZSB0aGUgbW9kaWZpY2F0aW9ucy5cclxuICogXHJcbiAqIFRoYW5rcyBNYXJjbyFcclxuICovXHJcblxyXG5pbXBvcnQgeyBJbnRSYW5nZSB9IGZyb20gXCIuL1R5cGVIZWxwZXJzXCI7XHJcblxyXG4vKioqKioqKioqKioqICBPcmlnaW5hbCBOb3RpY2UsIHNvbWUgYXNwZWN0cyBvdXRkYXRlZCAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqIFRpdGxlOiBUZXh0YXJlYSBkZXZlbG9wZXIgVEFCIGtleSAoYmV0YSlcclxuICogQXV0aG9yOiBNYXJjbyBCb25lbGxpIChodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vdXNlcnMvMzg4OTQ0OSlcclxuICpcclxuICogRGVzY3JpcHRpb246XHJcbiAqICAgRW5hYmxlcyBleHRlbmRlZCBUQUIgZnVuY3Rpb25hbGl0eSBvbiB0ZXh0YXJlYXMgb2YgdGhlIGN1cnJlbnQgcGFnZSBmb3IgaW5kZW50aW5nL2RlZGVudGluZyBzaW5nbGUvbXVsdGlwbGUgbGluZXMuXHJcbiAqICAgVGhlIGRlZmF1bHQgaW5kZW50YXRpb24gaXMgNCBzcGFjZXMgKFwiICAgIFwiKTsgY2hhbmdlIHRoZSB2YXIgVEFCX0NIQVIgaWYgeW91IHdhbnQgdG8gdXNlIGFub3RoZXIgVEFCIGRlbGltaXRlci5cclxuICogICBPcmlnaW5hbGx5IGRldmVsb3BlZCBmb3IgU3RhY2sgT3ZlcmZsb3cgTWFya2Rvd24gZWRpdG9yLlxyXG4gKlxyXG4gKiBJbXBsZW1lbnRhdGlvbjpcclxuICogICBVc2UgJ2VsZW1lbnQuZW5hYmxlVGV4dGFyZWFEZXYoKScgdG8gZW5hYmxlIHRoZSBmZWF0dXJlIGZvciBhbGwgdGhlIHRleHRhcmVhcyBpbnNpZGUgdGhlIGVsZW1lbnQgKGluY2x1ZGluZyB0aGUgZWxlbWVudCBpdHNlbGYpLlxyXG4gKiAgIFVzZSAnZWxlbWVudC5kaXNhYmxlVGV4dGFyZWFEZXYoKScgdG8gZGlzYWJsZSB0aGUgcHJldmlvdXNseSBlbmFibGVkIGZlYXR1cmUuXHJcbiAqXHJcbiAqIFVzYWdlOlxyXG4gKiAgIFNpbmdsZSBsaW5lOiBwbGFjZSB0aGUgY3Vyc29yIHdoZXJlIHlvdSB3YW50IGFuZCBwcmVzcyBbVEFCXSB0byBhZGQgYSB0YWIgY2hhcmFjdGVyLCBvciBbU0hJRlRdK1tUQUJdIHRvIHJlbW92ZSBhIHByZXZpb3VzbHkgaW5zZXJ0ZWQgdGFiIGNoYXJhY3RlciAoYmVmb3JlIHRoZSBjYXJldCBwb3NpdGlvbikuXHJcbiAqICAgTXVsdGkgbGluZTogc2VsZWN0IG11bHRpcGxlIGxpbmVzIG9mIGNvZGUgYW5kIHByZXNzIFtUQUJdIHRvIGFkZCBhIHRhYiBjaGFyYWN0ZXIgYXQgdGhlIGJlZ2lubmluZyBvZiBlYWNoIGxpbmUsIG9yIFtTSElGVF0rW1RBQl0gdG8gcmVtb3ZlIHByZXZpb3VzbHkgaW5zZXJ0ZWQgdGFiIGNoYXJhY3RlcnMuXHJcbiAqXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRleHRhcmVhRGV2KHRhYkxlbmd0aDogSW50UmFuZ2U8MSwgMTI+KSB7XHJcbiAgICBcclxuICAgIC8vIHRvZG86IGNvbnNpZGVyIGNoZWNraW5nIGZvciBlLnRhcmdldC50YWdOYW1lID09ICdURVhUQVJFQScgKHdoaWNoIHVzZWQgdG8gYmUgdGhlcmUpLCBvciBhZGQgc3Ryb25nZXIgdHlwaW5nIHRvIGVcclxuICAgIHJldHVybiBmdW5jdGlvbiBpbm5lcih0aGlzOiBIVE1MVGV4dEFyZWFFbGVtZW50LCBlOiBLZXlib2FyZEV2ZW50KSB7XHJcblxyXG4gICAgICAgIGxldCBUQUJfQ0hBUiA9ICcgJy5yZXBlYXQodGFiTGVuZ3RoKSxcclxuICAgICAgICAgICAgc2VsZWN0aW9uRGVsdGEgPSAwLCAvLyBub3Qgc3VyZSBhYm91dCB0aGUgbmFtZSBvZiB0aGlzLCB3YXMgXCJkc1wiIGJlZm9yZVxyXG4gICAgICAgICAgICBzZWxlY3RlZFRleHQ6IHN0cmluZyxcclxuICAgICAgICAgICAgc2VsZWN0aW9uU3RhcnQ6IG51bWJlcixcclxuICAgICAgICAgICAgc2VsZWN0aW9uRW5kOiBudW1iZXIsXHJcbiAgICAgICAgICAgIGFsbFRleHQ6IHN0cmluZztcclxuXHJcbiAgICAgICAgaWYgKGUua2V5ID09PSBcIlRhYlwiKSB7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIHNlbGVjdGlvblN0YXJ0ID0gdGhpcy5zZWxlY3Rpb25TdGFydDtcclxuICAgICAgICAgICAgc2VsZWN0aW9uRW5kID0gdGhpcy5zZWxlY3Rpb25FbmQ7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkVGV4dCA9IHRoaXMudmFsdWUuc3Vic3RyaW5nKHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQpO1xyXG4gICAgICAgICAgICBhbGxUZXh0ID0gdGhpcy52YWx1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmICh+c2VsZWN0ZWRUZXh0LmluZGV4T2YoJ1xcbicpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS5zaGlmdEtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkVGV4dCA9IHNlbGVjdGVkVGV4dC5zcGxpdCgnXFxuJykubWFwKGZ1bmN0aW9uKGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbC5zdWJzdHIoMCxUQUJfQ0hBUi5sZW5ndGgpID09IFRBQl9DSEFSKSByZXR1cm4gZWwuc3Vic3RyKDQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuam9pbignXFxuJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSBhbGxUZXh0LnN1YnN0cigwLCBzZWxlY3Rpb25TdGFydCkgKyBzZWxlY3RlZFRleHQgKyBhbGxUZXh0LnN1YnN0cihzZWxlY3Rpb25FbmQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFRleHQgPSBzZWxlY3RlZFRleHQuc3BsaXQoJ1xcbicpLm1hcChmdW5jdGlvbihlbCkgeyByZXR1cm4gVEFCX0NIQVIgKyBlbCB9KS5qb2luKCdcXG4nKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gYWxsVGV4dC5zdWJzdHIoMCwgc2VsZWN0aW9uU3RhcnQpICsgc2VsZWN0ZWRUZXh0ICsgYWxsVGV4dC5zdWJzdHIoc2VsZWN0aW9uRW5kKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvblN0YXJ0ID0gc2VsZWN0aW9uU3RhcnQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvblN0YXJ0K3NlbGVjdGVkVGV4dC5sZW5ndGg7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS5zaGlmdEtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhbGxUZXh0LnN1YnN0cihzZWxlY3Rpb25TdGFydC1UQUJfQ0hBUi5sZW5ndGgsIFRBQl9DSEFSLmxlbmd0aCkgPT0gVEFCX0NIQVIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IGFsbFRleHQuc3Vic3RyKDAsIHNlbGVjdGlvblN0YXJ0LVRBQl9DSEFSLmxlbmd0aCkgKyBhbGxUZXh0LnN1YnN0cihzZWxlY3Rpb25FbmQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25EZWx0YSA9IC1UQUJfQ0hBUi5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gYWxsVGV4dC5zdWJzdHIoMCwgc2VsZWN0aW9uU3RhcnQpICsgVEFCX0NIQVIgKyBhbGxUZXh0LnN1YnN0cihzZWxlY3Rpb25FbmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbkRlbHRhID0gVEFCX0NIQVIubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uU3RhcnQgPSB0aGlzLnNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvblN0YXJ0ICsgc2VsZWN0aW9uRGVsdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICBcclxuICAgIH1cclxufVxyXG4iLCJcclxuLyoqXHJcbiAqIHdlYmV4dGVuc2lvbi1wb2x5ZmlsbCBkb2Vzbid0IHdvcmsgZm9yIG1hbmlmZXN0IHYzLCBzbyB3ZSBwcm94eSB0byB0aGUgdW5kZXJseWluZyBcImJyb3dzZXJcIiBvciBcImNocm9tZVwiIG9iamVjdHNcclxuICogXHJcbiAqIGNocm9tZS5zdG9yYWdlIHNlZW1zIGxpa2UgYSBzdXBlcnNldCBvZiBicm93c2VyIHN0b3JhZ2UsIHRob3VnaCBpdCdzIGRlZmluaXRlbHkgcG9zc2libGUgdGhleSBoYXZlIGRpZmZlcmVudCBzZW1hbnRpY3NcclxuICovXHJcbmV4cG9ydCBjb25zdCBjb21wYXRpYmxlU3RvcmFnZTogdHlwZW9mIGJyb3dzZXIuc3RvcmFnZSA9ICh0eXBlb2YgYnJvd3NlciA9PT0gXCJ1bmRlZmluZWRcIikgPyBjaHJvbWUuc3RvcmFnZSA6IGJyb3dzZXIuc3RvcmFnZVxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vaGVscGVycy9idW5kbGUtdXJsJykuZ2V0QnVuZGxlVVJMKCc2RnNtOCcpICsgXCJ0ZXh0QXJlYU92ZXJsYXkuSEFTSF9SRUZfMzFhZTRmYjE2NzMxYjk4YS5wbmdcIjsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGJ1bmRsZVVSTCA9IHt9O1xuXG5mdW5jdGlvbiBnZXRCdW5kbGVVUkxDYWNoZWQoaWQpIHtcbiAgdmFyIHZhbHVlID0gYnVuZGxlVVJMW2lkXTtcblxuICBpZiAoIXZhbHVlKSB7XG4gICAgdmFsdWUgPSBnZXRCdW5kbGVVUkwoKTtcbiAgICBidW5kbGVVUkxbaWRdID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGdldEJ1bmRsZVVSTCgpIHtcbiAgdHJ5IHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgdmFyIG1hdGNoZXMgPSAoJycgKyBlcnIuc3RhY2spLm1hdGNoKC8oaHR0cHM/fGZpbGV8ZnRwfChjaHJvbWV8bW96fHNhZmFyaS13ZWIpLWV4dGVuc2lvbik6XFwvXFwvW14pXFxuXSsvZyk7XG5cbiAgICBpZiAobWF0Y2hlcykge1xuICAgICAgLy8gVGhlIGZpcnN0IHR3byBzdGFjayBmcmFtZXMgd2lsbCBiZSB0aGlzIGZ1bmN0aW9uIGFuZCBnZXRCdW5kbGVVUkxDYWNoZWQuXG4gICAgICAvLyBVc2UgdGhlIDNyZCBvbmUsIHdoaWNoIHdpbGwgYmUgYSBydW50aW1lIGluIHRoZSBvcmlnaW5hbCBidW5kbGUuXG4gICAgICByZXR1cm4gZ2V0QmFzZVVSTChtYXRjaGVzWzJdKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gJy8nO1xufVxuXG5mdW5jdGlvbiBnZXRCYXNlVVJMKHVybCkge1xuICByZXR1cm4gKCcnICsgdXJsKS5yZXBsYWNlKC9eKCg/Omh0dHBzP3xmaWxlfGZ0cHwoY2hyb21lfG1venxzYWZhcmktd2ViKS1leHRlbnNpb24pOlxcL1xcLy4rKVxcL1teL10rJC8sICckMScpICsgJy8nO1xufSAvLyBUT0RPOiBSZXBsYWNlIHVzZXMgd2l0aCBgbmV3IFVSTCh1cmwpLm9yaWdpbmAgd2hlbiBpZTExIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQuXG5cblxuZnVuY3Rpb24gZ2V0T3JpZ2luKHVybCkge1xuICB2YXIgbWF0Y2hlcyA9ICgnJyArIHVybCkubWF0Y2goLyhodHRwcz98ZmlsZXxmdHB8KGNocm9tZXxtb3p8c2FmYXJpLXdlYiktZXh0ZW5zaW9uKTpcXC9cXC9bXi9dKy8pO1xuXG4gIGlmICghbWF0Y2hlcykge1xuICAgIHRocm93IG5ldyBFcnJvcignT3JpZ2luIG5vdCBmb3VuZCcpO1xuICB9XG5cbiAgcmV0dXJuIG1hdGNoZXNbMF07XG59XG5cbmV4cG9ydHMuZ2V0QnVuZGxlVVJMID0gZ2V0QnVuZGxlVVJMQ2FjaGVkO1xuZXhwb3J0cy5nZXRCYXNlVVJMID0gZ2V0QmFzZVVSTDtcbmV4cG9ydHMuZ2V0T3JpZ2luID0gZ2V0T3JpZ2luOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9oZWxwZXJzL2J1bmRsZS11cmwnKS5nZXRCdW5kbGVVUkwoJzZGc204JykgKyBcInRleHRBcmVhT3ZlcmxheUhvdmVyZWQuSEFTSF9SRUZfNTMyMDFkMjE5MjI0NWEzOS5wbmdcIjsiXSwibmFtZXMiOltdLCJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudF9zY3JpcHQuSEFTSF9SRUZfNGRhYzkxNTJjYTQ2ZjdmYy5qcy5tYXAifQ==
