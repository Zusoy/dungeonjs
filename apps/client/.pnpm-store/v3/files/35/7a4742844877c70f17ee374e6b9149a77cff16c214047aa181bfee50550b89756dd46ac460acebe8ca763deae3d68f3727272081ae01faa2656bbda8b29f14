"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/tailwindcss/src/css/preflight.css
var preflight_default;
var init_preflight = __esm({
  "node_modules/tailwindcss/src/css/preflight.css"() {
    preflight_default = '*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:theme("borderColor.DEFAULT",currentColor)}:before,:after{--tw-content: ""}html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:theme("fontFamily.sans",ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji");font-feature-settings:theme("fontFamily.sans[1].fontFeatureSettings",normal);font-variation-settings:theme("fontFamily.sans[1].fontVariationSettings",normal)}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:theme("fontFamily.mono",ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace);font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::placeholder,textarea::placeholder{opacity:1;color:theme("colors.gray.400",#9ca3af)}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}\n';
  }
});

// src/stubs/fs.ts
var fs_exports = {};
__export(fs_exports, {
  default: () => fs_default
});
var fs_default;
var init_fs = __esm({
  "src/stubs/fs.ts"() {
    init_preflight();
    fs_default = {
      readFileSync: () => preflight_default
    };
  }
});

// node_modules/@alloc/quick-lru/index.js
var require_quick_lru = __commonJS({
  "node_modules/@alloc/quick-lru/index.js"(exports, module2) {
    "use strict";
    var QuickLRU = class {
      constructor(options = {}) {
        if (!(options.maxSize && options.maxSize > 0)) {
          throw new TypeError("`maxSize` must be a number greater than 0");
        }
        if (typeof options.maxAge === "number" && options.maxAge === 0) {
          throw new TypeError("`maxAge` must be a number greater than 0");
        }
        this.maxSize = options.maxSize;
        this.maxAge = options.maxAge || Infinity;
        this.onEviction = options.onEviction;
        this.cache = /* @__PURE__ */ new Map();
        this.oldCache = /* @__PURE__ */ new Map();
        this._size = 0;
      }
      _emitEvictions(cache2) {
        if (typeof this.onEviction !== "function") {
          return;
        }
        for (const [key, item] of cache2) {
          this.onEviction(key, item.value);
        }
      }
      _deleteIfExpired(key, item) {
        if (typeof item.expiry === "number" && item.expiry <= Date.now()) {
          if (typeof this.onEviction === "function") {
            this.onEviction(key, item.value);
          }
          return this.delete(key);
        }
        return false;
      }
      _getOrDeleteIfExpired(key, item) {
        const deleted = this._deleteIfExpired(key, item);
        if (deleted === false) {
          return item.value;
        }
      }
      _getItemValue(key, item) {
        return item.expiry ? this._getOrDeleteIfExpired(key, item) : item.value;
      }
      _peek(key, cache2) {
        const item = cache2.get(key);
        return this._getItemValue(key, item);
      }
      _set(key, value2) {
        this.cache.set(key, value2);
        this._size++;
        if (this._size >= this.maxSize) {
          this._size = 0;
          this._emitEvictions(this.oldCache);
          this.oldCache = this.cache;
          this.cache = /* @__PURE__ */ new Map();
        }
      }
      _moveToRecent(key, item) {
        this.oldCache.delete(key);
        this._set(key, item);
      }
      *_entriesAscending() {
        for (const item of this.oldCache) {
          const [key, value2] = item;
          if (!this.cache.has(key)) {
            const deleted = this._deleteIfExpired(key, value2);
            if (deleted === false) {
              yield item;
            }
          }
        }
        for (const item of this.cache) {
          const [key, value2] = item;
          const deleted = this._deleteIfExpired(key, value2);
          if (deleted === false) {
            yield item;
          }
        }
      }
      get(key) {
        if (this.cache.has(key)) {
          const item = this.cache.get(key);
          return this._getItemValue(key, item);
        }
        if (this.oldCache.has(key)) {
          const item = this.oldCache.get(key);
          if (this._deleteIfExpired(key, item) === false) {
            this._moveToRecent(key, item);
            return item.value;
          }
        }
      }
      set(key, value2, { maxAge = this.maxAge === Infinity ? void 0 : Date.now() + this.maxAge } = {}) {
        if (this.cache.has(key)) {
          this.cache.set(key, {
            value: value2,
            maxAge
          });
        } else {
          this._set(key, { value: value2, expiry: maxAge });
        }
      }
      has(key) {
        if (this.cache.has(key)) {
          return !this._deleteIfExpired(key, this.cache.get(key));
        }
        if (this.oldCache.has(key)) {
          return !this._deleteIfExpired(key, this.oldCache.get(key));
        }
        return false;
      }
      peek(key) {
        if (this.cache.has(key)) {
          return this._peek(key, this.cache);
        }
        if (this.oldCache.has(key)) {
          return this._peek(key, this.oldCache);
        }
      }
      delete(key) {
        const deleted = this.cache.delete(key);
        if (deleted) {
          this._size--;
        }
        return this.oldCache.delete(key) || deleted;
      }
      clear() {
        this.cache.clear();
        this.oldCache.clear();
        this._size = 0;
      }
      resize(newSize) {
        if (!(newSize && newSize > 0)) {
          throw new TypeError("`maxSize` must be a number greater than 0");
        }
        const items = [...this._entriesAscending()];
        const removeCount = items.length - newSize;
        if (removeCount < 0) {
          this.cache = new Map(items);
          this.oldCache = /* @__PURE__ */ new Map();
          this._size = items.length;
        } else {
          if (removeCount > 0) {
            this._emitEvictions(items.slice(0, removeCount));
          }
          this.oldCache = new Map(items.slice(removeCount));
          this.cache = /* @__PURE__ */ new Map();
          this._size = 0;
        }
        this.maxSize = newSize;
      }
      *keys() {
        for (const [key] of this) {
          yield key;
        }
      }
      *values() {
        for (const [, value2] of this) {
          yield value2;
        }
      }
      *[Symbol.iterator]() {
        for (const item of this.cache) {
          const [key, value2] = item;
          const deleted = this._deleteIfExpired(key, value2);
          if (deleted === false) {
            yield [key, value2.value];
          }
        }
        for (const item of this.oldCache) {
          const [key, value2] = item;
          if (!this.cache.has(key)) {
            const deleted = this._deleteIfExpired(key, value2);
            if (deleted === false) {
              yield [key, value2.value];
            }
          }
        }
      }
      *entriesDescending() {
        let items = [...this.cache];
        for (let i = items.length - 1; i >= 0; --i) {
          const item = items[i];
          const [key, value2] = item;
          const deleted = this._deleteIfExpired(key, value2);
          if (deleted === false) {
            yield [key, value2.value];
          }
        }
        items = [...this.oldCache];
        for (let i = items.length - 1; i >= 0; --i) {
          const item = items[i];
          const [key, value2] = item;
          if (!this.cache.has(key)) {
            const deleted = this._deleteIfExpired(key, value2);
            if (deleted === false) {
              yield [key, value2.value];
            }
          }
        }
      }
      *entriesAscending() {
        for (const [key, value2] of this._entriesAscending()) {
          yield [key, value2.value];
        }
      }
      get size() {
        if (!this._size) {
          return this.oldCache.size;
        }
        let oldCacheSize = 0;
        for (const key of this.oldCache.keys()) {
          if (!this.cache.has(key)) {
            oldCacheSize++;
          }
        }
        return Math.min(this._size + oldCacheSize, this.maxSize);
      }
    };
    module2.exports = QuickLRU;
  }
});

// src/stubs/picocolors.ts
var picocolors_exports = {};
__export(picocolors_exports, {
  default: () => picocolors_default
});
var picocolors_default;
var init_picocolors = __esm({
  "src/stubs/picocolors.ts"() {
    picocolors_default = {
      yellow: (input) => input
    };
  }
});

// (disabled):node_modules/tailwindcss/node_modules/postcss/lib/terminal-highlight
var require_terminal_highlight = __commonJS({
  "(disabled):node_modules/tailwindcss/node_modules/postcss/lib/terminal-highlight"() {
  }
});

// node_modules/tailwindcss/node_modules/postcss/lib/css-syntax-error.js
var require_css_syntax_error = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss/lib/css-syntax-error.js"(exports, module2) {
    "use strict";
    var pico = (init_picocolors(), __toCommonJS(picocolors_exports));
    var terminalHighlight = require_terminal_highlight();
    var CssSyntaxError3 = class extends Error {
      constructor(message, line, column, source, file, plugin3) {
        super(message);
        this.name = "CssSyntaxError";
        this.reason = message;
        if (file) {
          this.file = file;
        }
        if (source) {
          this.source = source;
        }
        if (plugin3) {
          this.plugin = plugin3;
        }
        if (typeof line !== "undefined" && typeof column !== "undefined") {
          if (typeof line === "number") {
            this.line = line;
            this.column = column;
          } else {
            this.line = line.line;
            this.column = line.column;
            this.endLine = column.line;
            this.endColumn = column.column;
          }
        }
        this.setMessage();
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, CssSyntaxError3);
        }
      }
      setMessage() {
        this.message = this.plugin ? this.plugin + ": " : "";
        this.message += this.file ? this.file : "<css input>";
        if (typeof this.line !== "undefined") {
          this.message += ":" + this.line + ":" + this.column;
        }
        this.message += ": " + this.reason;
      }
      showSourceCode(color2) {
        if (!this.source)
          return "";
        let css = this.source;
        if (color2 == null)
          color2 = pico.isColorSupported;
        if (terminalHighlight) {
          if (color2)
            css = terminalHighlight(css);
        }
        let lines = css.split(/\r?\n/);
        let start = Math.max(this.line - 3, 0);
        let end = Math.min(this.line + 2, lines.length);
        let maxWidth = String(end).length;
        let mark, aside;
        if (color2) {
          let { bold, gray, red } = pico.createColors(true);
          mark = (text) => bold(red(text));
          aside = (text) => gray(text);
        } else {
          mark = aside = (str) => str;
        }
        return lines.slice(start, end).map((line, index3) => {
          let number2 = start + 1 + index3;
          let gutter = " " + (" " + number2).slice(-maxWidth) + " | ";
          if (number2 === this.line) {
            let spacing = aside(gutter.replace(/\d/g, " ")) + line.slice(0, this.column - 1).replace(/[^\t]/g, " ");
            return mark(">") + aside(gutter) + line + "\n " + spacing + mark("^");
          }
          return " " + aside(gutter) + line;
        }).join("\n");
      }
      toString() {
        let code = this.showSourceCode();
        if (code) {
          code = "\n\n" + code + "\n";
        }
        return this.name + ": " + this.message + code;
      }
    };
    module2.exports = CssSyntaxError3;
    CssSyntaxError3.default = CssSyntaxError3;
  }
});

// node_modules/tailwindcss/node_modules/postcss/lib/symbols.js
var require_symbols = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss/lib/symbols.js"(exports, module2) {
    "use strict";
    module2.exports.isClean = Symbol("isClean");
    module2.exports.my = Symbol("my");
  }
});

// node_modules/tailwindcss/node_modules/postcss/lib/stringifier.js
var require_stringifier = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss/lib/stringifier.js"(exports, module2) {
    "use strict";
    var DEFAULT_RAW = {
      after: "\n",
      beforeClose: "\n",
      beforeComment: "\n",
      beforeDecl: "\n",
      beforeOpen: " ",
      beforeRule: "\n",
      colon: ": ",
      commentLeft: " ",
      commentRight: " ",
      emptyBody: "",
      indent: "    ",
      semicolon: false
    };
    function capitalize(str) {
      return str[0].toUpperCase() + str.slice(1);
    }
    var Stringifier = class {
      constructor(builder) {
        this.builder = builder;
      }
      atrule(node, semicolon) {
        let name = "@" + node.name;
        let params = node.params ? this.rawValue(node, "params") : "";
        if (typeof node.raws.afterName !== "undefined") {
          name += node.raws.afterName;
        } else if (params) {
          name += " ";
        }
        if (node.nodes) {
          this.block(node, name + params);
        } else {
          let end = (node.raws.between || "") + (semicolon ? ";" : "");
          this.builder(name + params + end, node);
        }
      }
      beforeAfter(node, detect) {
        let value2;
        if (node.type === "decl") {
          value2 = this.raw(node, null, "beforeDecl");
        } else if (node.type === "comment") {
          value2 = this.raw(node, null, "beforeComment");
        } else if (detect === "before") {
          value2 = this.raw(node, null, "beforeRule");
        } else {
          value2 = this.raw(node, null, "beforeClose");
        }
        let buf = node.parent;
        let depth = 0;
        while (buf && buf.type !== "root") {
          depth += 1;
          buf = buf.parent;
        }
        if (value2.includes("\n")) {
          let indent = this.raw(node, null, "indent");
          if (indent.length) {
            for (let step = 0; step < depth; step++)
              value2 += indent;
          }
        }
        return value2;
      }
      block(node, start) {
        let between = this.raw(node, "between", "beforeOpen");
        this.builder(start + between + "{", node, "start");
        let after;
        if (node.nodes && node.nodes.length) {
          this.body(node);
          after = this.raw(node, "after");
        } else {
          after = this.raw(node, "after", "emptyBody");
        }
        if (after)
          this.builder(after);
        this.builder("}", node, "end");
      }
      body(node) {
        let last = node.nodes.length - 1;
        while (last > 0) {
          if (node.nodes[last].type !== "comment")
            break;
          last -= 1;
        }
        let semicolon = this.raw(node, "semicolon");
        for (let i = 0; i < node.nodes.length; i++) {
          let child = node.nodes[i];
          let before = this.raw(child, "before");
          if (before)
            this.builder(before);
          this.stringify(child, last !== i || semicolon);
        }
      }
      comment(node) {
        let left = this.raw(node, "left", "commentLeft");
        let right = this.raw(node, "right", "commentRight");
        this.builder("/*" + left + node.text + right + "*/", node);
      }
      decl(node, semicolon) {
        let between = this.raw(node, "between", "colon");
        let string = node.prop + between + this.rawValue(node, "value");
        if (node.important) {
          string += node.raws.important || " !important";
        }
        if (semicolon)
          string += ";";
        this.builder(string, node);
      }
      document(node) {
        this.body(node);
      }
      raw(node, own, detect) {
        let value2;
        if (!detect)
          detect = own;
        if (own) {
          value2 = node.raws[own];
          if (typeof value2 !== "undefined")
            return value2;
        }
        let parent = node.parent;
        if (detect === "before") {
          if (!parent || parent.type === "root" && parent.first === node) {
            return "";
          }
          if (parent && parent.type === "document") {
            return "";
          }
        }
        if (!parent)
          return DEFAULT_RAW[detect];
        let root3 = node.root();
        if (!root3.rawCache)
          root3.rawCache = {};
        if (typeof root3.rawCache[detect] !== "undefined") {
          return root3.rawCache[detect];
        }
        if (detect === "before" || detect === "after") {
          return this.beforeAfter(node, detect);
        } else {
          let method = "raw" + capitalize(detect);
          if (this[method]) {
            value2 = this[method](root3, node);
          } else {
            root3.walk((i) => {
              value2 = i.raws[own];
              if (typeof value2 !== "undefined")
                return false;
            });
          }
        }
        if (typeof value2 === "undefined")
          value2 = DEFAULT_RAW[detect];
        root3.rawCache[detect] = value2;
        return value2;
      }
      rawBeforeClose(root3) {
        let value2;
        root3.walk((i) => {
          if (i.nodes && i.nodes.length > 0) {
            if (typeof i.raws.after !== "undefined") {
              value2 = i.raws.after;
              if (value2.includes("\n")) {
                value2 = value2.replace(/[^\n]+$/, "");
              }
              return false;
            }
          }
        });
        if (value2)
          value2 = value2.replace(/\S/g, "");
        return value2;
      }
      rawBeforeComment(root3, node) {
        let value2;
        root3.walkComments((i) => {
          if (typeof i.raws.before !== "undefined") {
            value2 = i.raws.before;
            if (value2.includes("\n")) {
              value2 = value2.replace(/[^\n]+$/, "");
            }
            return false;
          }
        });
        if (typeof value2 === "undefined") {
          value2 = this.raw(node, null, "beforeDecl");
        } else if (value2) {
          value2 = value2.replace(/\S/g, "");
        }
        return value2;
      }
      rawBeforeDecl(root3, node) {
        let value2;
        root3.walkDecls((i) => {
          if (typeof i.raws.before !== "undefined") {
            value2 = i.raws.before;
            if (value2.includes("\n")) {
              value2 = value2.replace(/[^\n]+$/, "");
            }
            return false;
          }
        });
        if (typeof value2 === "undefined") {
          value2 = this.raw(node, null, "beforeRule");
        } else if (value2) {
          value2 = value2.replace(/\S/g, "");
        }
        return value2;
      }
      rawBeforeOpen(root3) {
        let value2;
        root3.walk((i) => {
          if (i.type !== "decl") {
            value2 = i.raws.between;
            if (typeof value2 !== "undefined")
              return false;
          }
        });
        return value2;
      }
      rawBeforeRule(root3) {
        let value2;
        root3.walk((i) => {
          if (i.nodes && (i.parent !== root3 || root3.first !== i)) {
            if (typeof i.raws.before !== "undefined") {
              value2 = i.raws.before;
              if (value2.includes("\n")) {
                value2 = value2.replace(/[^\n]+$/, "");
              }
              return false;
            }
          }
        });
        if (value2)
          value2 = value2.replace(/\S/g, "");
        return value2;
      }
      rawColon(root3) {
        let value2;
        root3.walkDecls((i) => {
          if (typeof i.raws.between !== "undefined") {
            value2 = i.raws.between.replace(/[^\s:]/g, "");
            return false;
          }
        });
        return value2;
      }
      rawEmptyBody(root3) {
        let value2;
        root3.walk((i) => {
          if (i.nodes && i.nodes.length === 0) {
            value2 = i.raws.after;
            if (typeof value2 !== "undefined")
              return false;
          }
        });
        return value2;
      }
      rawIndent(root3) {
        if (root3.raws.indent)
          return root3.raws.indent;
        let value2;
        root3.walk((i) => {
          let p = i.parent;
          if (p && p !== root3 && p.parent && p.parent === root3) {
            if (typeof i.raws.before !== "undefined") {
              let parts = i.raws.before.split("\n");
              value2 = parts[parts.length - 1];
              value2 = value2.replace(/\S/g, "");
              return false;
            }
          }
        });
        return value2;
      }
      rawSemicolon(root3) {
        let value2;
        root3.walk((i) => {
          if (i.nodes && i.nodes.length && i.last.type === "decl") {
            value2 = i.raws.semicolon;
            if (typeof value2 !== "undefined")
              return false;
          }
        });
        return value2;
      }
      rawValue(node, prop) {
        let value2 = node[prop];
        let raw = node.raws[prop];
        if (raw && raw.value === value2) {
          return raw.raw;
        }
        return value2;
      }
      root(node) {
        this.body(node);
        if (node.raws.after)
          this.builder(node.raws.after);
      }
      rule(node) {
        this.block(node, this.rawValue(node, "selector"));
        if (node.raws.ownSemicolon) {
          this.builder(node.raws.ownSemicolon, node, "end");
        }
      }
      stringify(node, semicolon) {
        if (!this[node.type]) {
          throw new Error(
            "Unknown AST node type " + node.type + ". Maybe you need to change PostCSS stringifier."
          );
        }
        this[node.type](node, semicolon);
      }
    };
    module2.exports = Stringifier;
    Stringifier.default = Stringifier;
  }
});

// node_modules/tailwindcss/node_modules/postcss/lib/stringify.js
var require_stringify = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss/lib/stringify.js"(exports, module2) {
    "use strict";
    var Stringifier = require_stringifier();
    function stringify3(node, builder) {
      let str = new Stringifier(builder);
      str.stringify(node);
    }
    module2.exports = stringify3;
    stringify3.default = stringify3;
  }
});

// node_modules/tailwindcss/node_modules/postcss/lib/node.js
var require_node = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss/lib/node.js"(exports, module2) {
    "use strict";
    var { isClean, my } = require_symbols();
    var CssSyntaxError3 = require_css_syntax_error();
    var Stringifier = require_stringifier();
    var stringify3 = require_stringify();
    function cloneNode(obj, parent) {
      let cloned = new obj.constructor();
      for (let i in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, i)) {
          continue;
        }
        if (i === "proxyCache")
          continue;
        let value2 = obj[i];
        let type = typeof value2;
        if (i === "parent" && type === "object") {
          if (parent)
            cloned[i] = parent;
        } else if (i === "source") {
          cloned[i] = value2;
        } else if (Array.isArray(value2)) {
          cloned[i] = value2.map((j) => cloneNode(j, cloned));
        } else {
          if (type === "object" && value2 !== null)
            value2 = cloneNode(value2);
          cloned[i] = value2;
        }
      }
      return cloned;
    }
    var Node3 = class {
      constructor(defaults3 = {}) {
        this.raws = {};
        this[isClean] = false;
        this[my] = true;
        for (let name in defaults3) {
          if (name === "nodes") {
            this.nodes = [];
            for (let node of defaults3[name]) {
              if (typeof node.clone === "function") {
                this.append(node.clone());
              } else {
                this.append(node);
              }
            }
          } else {
            this[name] = defaults3[name];
          }
        }
      }
      addToError(error) {
        error.postcssNode = this;
        if (error.stack && this.source && /\n\s{4}at /.test(error.stack)) {
          let s = this.source;
          error.stack = error.stack.replace(
            /\n\s{4}at /,
            `$&${s.input.from}:${s.start.line}:${s.start.column}$&`
          );
        }
        return error;
      }
      after(add) {
        this.parent.insertAfter(this, add);
        return this;
      }
      assign(overrides = {}) {
        for (let name in overrides) {
          this[name] = overrides[name];
        }
        return this;
      }
      before(add) {
        this.parent.insertBefore(this, add);
        return this;
      }
      cleanRaws(keepBetween) {
        delete this.raws.before;
        delete this.raws.after;
        if (!keepBetween)
          delete this.raws.between;
      }
      clone(overrides = {}) {
        let cloned = cloneNode(this);
        for (let name in overrides) {
          cloned[name] = overrides[name];
        }
        return cloned;
      }
      cloneAfter(overrides = {}) {
        let cloned = this.clone(overrides);
        this.parent.insertAfter(this, cloned);
        return cloned;
      }
      cloneBefore(overrides = {}) {
        let cloned = this.clone(overrides);
        this.parent.insertBefore(this, cloned);
        return cloned;
      }
      error(message, opts = {}) {
        if (this.source) {
          let { end, start } = this.rangeBy(opts);
          return this.source.input.error(
            message,
            { column: start.column, line: start.line },
            { column: end.column, line: end.line },
            opts
          );
        }
        return new CssSyntaxError3(message);
      }
      getProxyProcessor() {
        return {
          get(node, prop) {
            if (prop === "proxyOf") {
              return node;
            } else if (prop === "root") {
              return () => node.root().toProxy();
            } else {
              return node[prop];
            }
          },
          set(node, prop, value2) {
            if (node[prop] === value2)
              return true;
            node[prop] = value2;
            if (prop === "prop" || prop === "value" || prop === "name" || prop === "params" || prop === "important" || prop === "text") {
              node.markDirty();
            }
            return true;
          }
        };
      }
      markDirty() {
        if (this[isClean]) {
          this[isClean] = false;
          let next = this;
          while (next = next.parent) {
            next[isClean] = false;
          }
        }
      }
      next() {
        if (!this.parent)
          return void 0;
        let index3 = this.parent.index(this);
        return this.parent.nodes[index3 + 1];
      }
      positionBy(opts, stringRepresentation) {
        let pos = this.source.start;
        if (opts.index) {
          pos = this.positionInside(opts.index, stringRepresentation);
        } else if (opts.word) {
          stringRepresentation = this.toString();
          let index3 = stringRepresentation.indexOf(opts.word);
          if (index3 !== -1)
            pos = this.positionInside(index3, stringRepresentation);
        }
        return pos;
      }
      positionInside(index3, stringRepresentation) {
        let string = stringRepresentation || this.toString();
        let column = this.source.start.column;
        let line = this.source.start.line;
        for (let i = 0; i < index3; i++) {
          if (string[i] === "\n") {
            column = 1;
            line += 1;
          } else {
            column += 1;
          }
        }
        return { column, line };
      }
      prev() {
        if (!this.parent)
          return void 0;
        let index3 = this.parent.index(this);
        return this.parent.nodes[index3 - 1];
      }
      get proxyOf() {
        return this;
      }
      rangeBy(opts) {
        let start = {
          column: this.source.start.column,
          line: this.source.start.line
        };
        let end = this.source.end ? {
          column: this.source.end.column + 1,
          line: this.source.end.line
        } : {
          column: start.column + 1,
          line: start.line
        };
        if (opts.word) {
          let stringRepresentation = this.toString();
          let index3 = stringRepresentation.indexOf(opts.word);
          if (index3 !== -1) {
            start = this.positionInside(index3, stringRepresentation);
            end = this.positionInside(index3 + opts.word.length, stringRepresentation);
          }
        } else {
          if (opts.start) {
            start = {
              column: opts.start.column,
              line: opts.start.line
            };
          } else if (opts.index) {
            start = this.positionInside(opts.index);
          }
          if (opts.end) {
            end = {
              column: opts.end.column,
              line: opts.end.line
            };
          } else if (opts.endIndex) {
            end = this.positionInside(opts.endIndex);
          } else if (opts.index) {
            end = this.positionInside(opts.index + 1);
          }
        }
        if (end.line < start.line || end.line === start.line && end.column <= start.column) {
          end = { column: start.column + 1, line: start.line };
        }
        return { end, start };
      }
      raw(prop, defaultType) {
        let str = new Stringifier();
        return str.raw(this, prop, defaultType);
      }
      remove() {
        if (this.parent) {
          this.parent.removeChild(this);
        }
        this.parent = void 0;
        return this;
      }
      replaceWith(...nodes) {
        if (this.parent) {
          let bookmark = this;
          let foundSelf = false;
          for (let node of nodes) {
            if (node === this) {
              foundSelf = true;
            } else if (foundSelf) {
              this.parent.insertAfter(bookmark, node);
              bookmark = node;
            } else {
              this.parent.insertBefore(bookmark, node);
            }
          }
          if (!foundSelf) {
            this.remove();
          }
        }
        return this;
      }
      root() {
        let result = this;
        while (result.parent && result.parent.type !== "document") {
          result = result.parent;
        }
        return result;
      }
      toJSON(_, inputs) {
        let fixed = {};
        let emitInputs = inputs == null;
        inputs = inputs || /* @__PURE__ */ new Map();
        let inputsNextIndex = 0;
        for (let name in this) {
          if (!Object.prototype.hasOwnProperty.call(this, name)) {
            continue;
          }
          if (name === "parent" || name === "proxyCache")
            continue;
          let value2 = this[name];
          if (Array.isArray(value2)) {
            fixed[name] = value2.map((i) => {
              if (typeof i === "object" && i.toJSON) {
                return i.toJSON(null, inputs);
              } else {
                return i;
              }
            });
          } else if (typeof value2 === "object" && value2.toJSON) {
            fixed[name] = value2.toJSON(null, inputs);
          } else if (name === "source") {
            let inputId = inputs.get(value2.input);
            if (inputId == null) {
              inputId = inputsNextIndex;
              inputs.set(value2.input, inputsNextIndex);
              inputsNextIndex++;
            }
            fixed[name] = {
              end: value2.end,
              inputId,
              start: value2.start
            };
          } else {
            fixed[name] = value2;
          }
        }
        if (emitInputs) {
          fixed.inputs = [...inputs.keys()].map((input) => input.toJSON());
        }
        return fixed;
      }
      toProxy() {
        if (!this.proxyCache) {
          this.proxyCache = new Proxy(this, this.getProxyProcessor());
        }
        return this.proxyCache;
      }
      toString(stringifier = stringify3) {
        if (stringifier.stringify)
          stringifier = stringifier.stringify;
        let result = "";
        stringifier(this, (i) => {
          result += i;
        });
        return result;
      }
      warn(result, text, opts) {
        let data = { node: this };
        for (let i in opts)
          data[i] = opts[i];
        return result.warn(text, data);
      }
    };
    module2.exports = Node3;
    Node3.default = Node3;
  }
});

// node_modules/tailwindcss/node_modules/postcss/lib/declaration.js
var require_declaration = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss/lib/declaration.js"(exports, module2) {
    "use strict";
    var Node3 = require_node();
    var Declaration3 = class extends Node3 {
      constructor(defaults3) {
        if (defaults3 && typeof defaults3.value !== "undefined" && typeof defaults3.value !== "string") {
          defaults3 = { ...defaults3, value: String(defaults3.value) };
        }
        super(defaults3);
        this.type = "decl";
      }
      get variable() {
        return this.prop.startsWith("--") || this.prop[0] === "$";
      }
    };
    module2.exports = Declaration3;
    Declaration3.default = Declaration3;
  }
});

// (disabled):node_modules/source-map-js/source-map.js
var require_source_map = __commonJS({
  "(disabled):node_modules/source-map-js/source-map.js"() {
  }
});

// src/stubs/path.ts
var path_exports = {};
__export(path_exports, {
  join: () => join
});
var join;
var init_path = __esm({
  "src/stubs/path.ts"() {
    join = () => "";
  }
});

// src/stubs/url.ts
var url_exports = {};
__export(url_exports, {
  default: () => url_default
});
var url_default;
var init_url = __esm({
  "src/stubs/url.ts"() {
    url_default = null;
  }
});

// node_modules/tailwindcss/node_modules/nanoid/non-secure/index.cjs
var require_non_secure = __commonJS({
  "node_modules/tailwindcss/node_modules/nanoid/non-secure/index.cjs"(exports, module2) {
    var urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
    var customAlphabet = (alphabet, defaultSize = 21) => {
      return (size = defaultSize) => {
        let id = "";
        let i = size;
        while (i--) {
          id += alphabet[Math.random() * alphabet.length | 0];
        }
        return id;
      };
    };
    var nanoid = (size = 21) => {
      let id = "";
      let i = size;
      while (i--) {
        id += urlAlphabet[Math.random() * 64 | 0];
      }
      return id;
    };
    module2.exports = { nanoid, customAlphabet };
  }
});

// node_modules/tailwindcss/node_modules/postcss/lib/previous-map.js
var require_previous_map = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss/lib/previous-map.js"(exports, module2) {
    "use strict";
    var { SourceMapConsumer, SourceMapGenerator } = require_source_map();
    var { existsSync, readFileSync } = (init_fs(), __toCommonJS(fs_exports));
    var { dirname, join: join2 } = (init_path(), __toCommonJS(path_exports));
    function fromBase64(str) {
      if (Buffer) {
        return Buffer.from(str, "base64").toString();
      } else {
        return window.atob(str);
      }
    }
    var PreviousMap = class {
      constructor(css, opts) {
        if (opts.map === false)
          return;
        this.loadAnnotation(css);
        this.inline = this.startWith(this.annotation, "data:");
        let prev = opts.map ? opts.map.prev : void 0;
        let text = this.loadMap(opts.from, prev);
        if (!this.mapFile && opts.from) {
          this.mapFile = opts.from;
        }
        if (this.mapFile)
          this.root = dirname(this.mapFile);
        if (text)
          this.text = text;
      }
      consumer() {
        if (!this.consumerCache) {
          this.consumerCache = new SourceMapConsumer(this.text);
        }
        return this.consumerCache;
      }
      decodeInline(text) {
        let baseCharsetUri = /^data:application\/json;charset=utf-?8;base64,/;
        let baseUri = /^data:application\/json;base64,/;
        let charsetUri = /^data:application\/json;charset=utf-?8,/;
        let uri = /^data:application\/json,/;
        if (charsetUri.test(text) || uri.test(text)) {
          return decodeURIComponent(text.substr(RegExp.lastMatch.length));
        }
        if (baseCharsetUri.test(text) || baseUri.test(text)) {
          return fromBase64(text.substr(RegExp.lastMatch.length));
        }
        let encoding = text.match(/data:application\/json;([^,]+),/)[1];
        throw new Error("Unsupported source map encoding " + encoding);
      }
      getAnnotationURL(sourceMapString) {
        return sourceMapString.replace(/^\/\*\s*# sourceMappingURL=/, "").trim();
      }
      isMap(map) {
        if (typeof map !== "object")
          return false;
        return typeof map.mappings === "string" || typeof map._mappings === "string" || Array.isArray(map.sections);
      }
      loadAnnotation(css) {
        let comments = css.match(/\/\*\s*# sourceMappingURL=/gm);
        if (!comments)
          return;
        let start = css.lastIndexOf(comments.pop());
        let end = css.indexOf("*/", start);
        if (start > -1 && end > -1) {
          this.annotation = this.getAnnotationURL(css.substring(start, end));
        }
      }
      loadFile(path) {
        this.root = dirname(path);
        if (existsSync(path)) {
          this.mapFile = path;
          return readFileSync(path, "utf-8").toString().trim();
        }
      }
      loadMap(file, prev) {
        if (prev === false)
          return false;
        if (prev) {
          if (typeof prev === "string") {
            return prev;
          } else if (typeof prev === "function") {
            let prevPath = prev(file);
            if (prevPath) {
              let map = this.loadFile(prevPath);
              if (!map) {
                throw new Error(
                  "Unable to load previous source map: " + prevPath.toString()
                );
              }
              return map;
            }
          } else if (prev instanceof SourceMapConsumer) {
            return SourceMapGenerator.fromSourceMap(prev).toString();
          } else if (prev instanceof SourceMapGenerator) {
            return prev.toString();
          } else if (this.isMap(prev)) {
            return JSON.stringify(prev);
          } else {
            throw new Error(
              "Unsupported previous source map format: " + prev.toString()
            );
          }
        } else if (this.inline) {
          return this.decodeInline(this.annotation);
        } else if (this.annotation) {
          let map = this.annotation;
          if (file)
            map = join2(dirname(file), map);
          return this.loadFile(map);
        }
      }
      startWith(string, start) {
        if (!string)
          return false;
        return string.substr(0, start.length) === start;
      }
      withContent() {
        return !!(this.consumer().sourcesContent && this.consumer().sourcesContent.length > 0);
      }
    };
    module2.exports = PreviousMap;
    PreviousMap.default = PreviousMap;
  }
});

// node_modules/tailwindcss/node_modules/postcss/lib/input.js
var require_input = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss/lib/input.js"(exports, module2) {
    "use strict";
    var { SourceMapConsumer, SourceMapGenerator } = require_source_map();
    var { fileURLToPath, pathToFileURL } = (init_url(), __toCommonJS(url_exports));
    var { isAbsolute, resolve } = (init_path(), __toCommonJS(path_exports));
    var { nanoid } = require_non_secure();
    var terminalHighlight = require_terminal_highlight();
    var CssSyntaxError3 = require_css_syntax_error();
    var PreviousMap = require_previous_map();
    var fromOffsetCache = Symbol("fromOffsetCache");
    var sourceMapAvailable = Boolean(SourceMapConsumer && SourceMapGenerator);
    var pathAvailable = Boolean(resolve && isAbsolute);
    var Input3 = class {
      constructor(css, opts = {}) {
        if (css === null || typeof css === "undefined" || typeof css === "object" && !css.toString) {
          throw new Error(`PostCSS received ${css} instead of CSS string`);
        }
        this.css = css.toString();
        if (this.css[0] === "\uFEFF" || this.css[0] === "\uFFFE") {
          this.hasBOM = true;
          this.css = this.css.slice(1);
        } else {
          this.hasBOM = false;
        }
        if (opts.from) {
          if (!pathAvailable || /^\w+:\/\//.test(opts.from) || isAbsolute(opts.from)) {
            this.file = opts.from;
          } else {
            this.file = resolve(opts.from);
          }
        }
        if (pathAvailable && sourceMapAvailable) {
          let map = new PreviousMap(this.css, opts);
          if (map.text) {
            this.map = map;
            let file = map.consumer().file;
            if (!this.file && file)
              this.file = this.mapResolve(file);
          }
        }
        if (!this.file) {
          this.id = "<input css " + nanoid(6) + ">";
        }
        if (this.map)
          this.map.file = this.from;
      }
      error(message, line, column, opts = {}) {
        let result, endLine, endColumn;
        if (line && typeof line === "object") {
          let start = line;
          let end = column;
          if (typeof start.offset === "number") {
            let pos = this.fromOffset(start.offset);
            line = pos.line;
            column = pos.col;
          } else {
            line = start.line;
            column = start.column;
          }
          if (typeof end.offset === "number") {
            let pos = this.fromOffset(end.offset);
            endLine = pos.line;
            endColumn = pos.col;
          } else {
            endLine = end.line;
            endColumn = end.column;
          }
        } else if (!column) {
          let pos = this.fromOffset(line);
          line = pos.line;
          column = pos.col;
        }
        let origin = this.origin(line, column, endLine, endColumn);
        if (origin) {
          result = new CssSyntaxError3(
            message,
            origin.endLine === void 0 ? origin.line : { column: origin.column, line: origin.line },
            origin.endLine === void 0 ? origin.column : { column: origin.endColumn, line: origin.endLine },
            origin.source,
            origin.file,
            opts.plugin
          );
        } else {
          result = new CssSyntaxError3(
            message,
            endLine === void 0 ? line : { column, line },
            endLine === void 0 ? column : { column: endColumn, line: endLine },
            this.css,
            this.file,
            opts.plugin
          );
        }
        result.input = { column, endColumn, endLine, line, source: this.css };
        if (this.file) {
          if (pathToFileURL) {
            result.input.url = pathToFileURL(this.file).toString();
          }
          result.input.file = this.file;
        }
        return result;
      }
      get from() {
        return this.file || this.id;
      }
      fromOffset(offset) {
        let lastLine, lineToIndex;
        if (!this[fromOffsetCache]) {
          let lines = this.css.split("\n");
          lineToIndex = new Array(lines.length);
          let prevIndex = 0;
          for (let i = 0, l = lines.length; i < l; i++) {
            lineToIndex[i] = prevIndex;
            prevIndex += lines[i].length + 1;
          }
          this[fromOffsetCache] = lineToIndex;
        } else {
          lineToIndex = this[fromOffsetCache];
        }
        lastLine = lineToIndex[lineToIndex.length - 1];
        let min = 0;
        if (offset >= lastLine) {
          min = lineToIndex.length - 1;
        } else {
          let max2 = lineToIndex.length - 2;
          let mid;
          while (min < max2) {
            mid = min + (max2 - min >> 1);
            if (offset < lineToIndex[mid]) {
              max2 = mid - 1;
            } else if (offset >= lineToIndex[mid + 1]) {
              min = mid + 1;
            } else {
              min = mid;
              break;
            }
          }
        }
        return {
          col: offset - lineToIndex[min] + 1,
          line: min + 1
        };
      }
      mapResolve(file) {
        if (/^\w+:\/\//.test(file)) {
          return file;
        }
        return resolve(this.map.consumer().sourceRoot || this.map.root || ".", file);
      }
      origin(line, column, endLine, endColumn) {
        if (!this.map)
          return false;
        let consumer = this.map.consumer();
        let from = consumer.originalPositionFor({ column, line });
        if (!from.source)
          return false;
        let to;
        if (typeof endLine === "number") {
          to = consumer.originalPositionFor({ column: endColumn, line: endLine });
        }
        let fromUrl;
        if (isAbsolute(from.source)) {
          fromUrl = pathToFileURL(from.source);
        } else {
          fromUrl = new URL(
            from.source,
            this.map.consumer().sourceRoot || pathToFileURL(this.map.mapFile)
          );
        }
        let result = {
          column: from.column,
          endColumn: to && to.column,
          endLine: to && to.line,
          line: from.line,
          url: fromUrl.toString()
        };
        if (fromUrl.protocol === "file:") {
          if (fileURLToPath) {
            result.file = fileURLToPath(fromUrl);
          } else {
            throw new Error(`file: protocol is not available in this PostCSS build`);
          }
        }
        let source = consumer.sourceContentFor(from.source);
        if (source)
          result.source = source;
        return result;
      }
      toJSON() {
        let json = {};
        for (let name of ["hasBOM", "css", "file", "id"]) {
          if (this[name] != null) {
            json[name] = this[name];
          }
        }
        if (this.map) {
          json.map = { ...this.map };
          if (json.map.consumerCache) {
            json.map.consumerCache = void 0;
          }
        }
        return json;
      }
    };
    module2.exports = Input3;
    Input3.default = Input3;
    if (terminalHighlight && terminalHighlight.registerInput) {
      terminalHighlight.registerInput(Input3);
    }
  }
});

// node_modules/tailwindcss/node_modules/postcss/lib/map-generator.js
var require_map_generator = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss/lib/map-generator.js"(exports, module2) {
    "use strict";
    var { SourceMapConsumer, SourceMapGenerator } = require_source_map();
    var { dirname, relative, resolve, sep } = (init_path(), __toCommonJS(path_exports));
    var { pathToFileURL } = (init_url(), __toCommonJS(url_exports));
    var Input3 = require_input();
    var sourceMapAvailable = Boolean(SourceMapConsumer && SourceMapGenerator);
    var pathAvailable = Boolean(dirname && resolve && relative && sep);
    var MapGenerator = class {
      constructor(stringify3, root3, opts, cssString) {
        this.stringify = stringify3;
        this.mapOpts = opts.map || {};
        this.root = root3;
        this.opts = opts;
        this.css = cssString;
        this.usesFileUrls = !this.mapOpts.from && this.mapOpts.absolute;
      }
      addAnnotation() {
        let content;
        if (this.isInline()) {
          content = "data:application/json;base64," + this.toBase64(this.map.toString());
        } else if (typeof this.mapOpts.annotation === "string") {
          content = this.mapOpts.annotation;
        } else if (typeof this.mapOpts.annotation === "function") {
          content = this.mapOpts.annotation(this.opts.to, this.root);
        } else {
          content = this.outputFile() + ".map";
        }
        let eol = "\n";
        if (this.css.includes("\r\n"))
          eol = "\r\n";
        this.css += eol + "/*# sourceMappingURL=" + content + " */";
      }
      applyPrevMaps() {
        for (let prev of this.previous()) {
          let from = this.toUrl(this.path(prev.file));
          let root3 = prev.root || dirname(prev.file);
          let map;
          if (this.mapOpts.sourcesContent === false) {
            map = new SourceMapConsumer(prev.text);
            if (map.sourcesContent) {
              map.sourcesContent = map.sourcesContent.map(() => null);
            }
          } else {
            map = prev.consumer();
          }
          this.map.applySourceMap(map, from, this.toUrl(this.path(root3)));
        }
      }
      clearAnnotation() {
        if (this.mapOpts.annotation === false)
          return;
        if (this.root) {
          let node;
          for (let i = this.root.nodes.length - 1; i >= 0; i--) {
            node = this.root.nodes[i];
            if (node.type !== "comment")
              continue;
            if (node.text.indexOf("# sourceMappingURL=") === 0) {
              this.root.removeChild(i);
            }
          }
        } else if (this.css) {
          this.css = this.css.replace(/(\n)?\/\*#[\S\s]*?\*\/$/gm, "");
        }
      }
      generate() {
        this.clearAnnotation();
        if (pathAvailable && sourceMapAvailable && this.isMap()) {
          return this.generateMap();
        } else {
          let result = "";
          this.stringify(this.root, (i) => {
            result += i;
          });
          return [result];
        }
      }
      generateMap() {
        if (this.root) {
          this.generateString();
        } else if (this.previous().length === 1) {
          let prev = this.previous()[0].consumer();
          prev.file = this.outputFile();
          this.map = SourceMapGenerator.fromSourceMap(prev);
        } else {
          this.map = new SourceMapGenerator({ file: this.outputFile() });
          this.map.addMapping({
            generated: { column: 0, line: 1 },
            original: { column: 0, line: 1 },
            source: this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>"
          });
        }
        if (this.isSourcesContent())
          this.setSourcesContent();
        if (this.root && this.previous().length > 0)
          this.applyPrevMaps();
        if (this.isAnnotation())
          this.addAnnotation();
        if (this.isInline()) {
          return [this.css];
        } else {
          return [this.css, this.map];
        }
      }
      generateString() {
        this.css = "";
        this.map = new SourceMapGenerator({ file: this.outputFile() });
        let line = 1;
        let column = 1;
        let noSource = "<no source>";
        let mapping = {
          generated: { column: 0, line: 0 },
          original: { column: 0, line: 0 },
          source: ""
        };
        let lines, last;
        this.stringify(this.root, (str, node, type) => {
          this.css += str;
          if (node && type !== "end") {
            mapping.generated.line = line;
            mapping.generated.column = column - 1;
            if (node.source && node.source.start) {
              mapping.source = this.sourcePath(node);
              mapping.original.line = node.source.start.line;
              mapping.original.column = node.source.start.column - 1;
              this.map.addMapping(mapping);
            } else {
              mapping.source = noSource;
              mapping.original.line = 1;
              mapping.original.column = 0;
              this.map.addMapping(mapping);
            }
          }
          lines = str.match(/\n/g);
          if (lines) {
            line += lines.length;
            last = str.lastIndexOf("\n");
            column = str.length - last;
          } else {
            column += str.length;
          }
          if (node && type !== "start") {
            let p = node.parent || { raws: {} };
            let childless = node.type === "decl" || node.type === "atrule" && !node.nodes;
            if (!childless || node !== p.last || p.raws.semicolon) {
              if (node.source && node.source.end) {
                mapping.source = this.sourcePath(node);
                mapping.original.line = node.source.end.line;
                mapping.original.column = node.source.end.column - 1;
                mapping.generated.line = line;
                mapping.generated.column = column - 2;
                this.map.addMapping(mapping);
              } else {
                mapping.source = noSource;
                mapping.original.line = 1;
                mapping.original.column = 0;
                mapping.generated.line = line;
                mapping.generated.column = column - 1;
                this.map.addMapping(mapping);
              }
            }
          }
        });
      }
      isAnnotation() {
        if (this.isInline()) {
          return true;
        }
        if (typeof this.mapOpts.annotation !== "undefined") {
          return this.mapOpts.annotation;
        }
        if (this.previous().length) {
          return this.previous().some((i) => i.annotation);
        }
        return true;
      }
      isInline() {
        if (typeof this.mapOpts.inline !== "undefined") {
          return this.mapOpts.inline;
        }
        let annotation = this.mapOpts.annotation;
        if (typeof annotation !== "undefined" && annotation !== true) {
          return false;
        }
        if (this.previous().length) {
          return this.previous().some((i) => i.inline);
        }
        return true;
      }
      isMap() {
        if (typeof this.opts.map !== "undefined") {
          return !!this.opts.map;
        }
        return this.previous().length > 0;
      }
      isSourcesContent() {
        if (typeof this.mapOpts.sourcesContent !== "undefined") {
          return this.mapOpts.sourcesContent;
        }
        if (this.previous().length) {
          return this.previous().some((i) => i.withContent());
        }
        return true;
      }
      outputFile() {
        if (this.opts.to) {
          return this.path(this.opts.to);
        } else if (this.opts.from) {
          return this.path(this.opts.from);
        } else {
          return "to.css";
        }
      }
      path(file) {
        if (file.indexOf("<") === 0)
          return file;
        if (/^\w+:\/\//.test(file))
          return file;
        if (this.mapOpts.absolute)
          return file;
        let from = this.opts.to ? dirname(this.opts.to) : ".";
        if (typeof this.mapOpts.annotation === "string") {
          from = dirname(resolve(from, this.mapOpts.annotation));
        }
        file = relative(from, file);
        return file;
      }
      previous() {
        if (!this.previousMaps) {
          this.previousMaps = [];
          if (this.root) {
            this.root.walk((node) => {
              if (node.source && node.source.input.map) {
                let map = node.source.input.map;
                if (!this.previousMaps.includes(map)) {
                  this.previousMaps.push(map);
                }
              }
            });
          } else {
            let input = new Input3(this.css, this.opts);
            if (input.map)
              this.previousMaps.push(input.map);
          }
        }
        return this.previousMaps;
      }
      setSourcesContent() {
        let already = {};
        if (this.root) {
          this.root.walk((node) => {
            if (node.source) {
              let from = node.source.input.from;
              if (from && !already[from]) {
                already[from] = true;
                let fromUrl = this.usesFileUrls ? this.toFileUrl(from) : this.toUrl(this.path(from));
                this.map.setSourceContent(fromUrl, node.source.input.css);
              }
            }
          });
        } else if (this.css) {
          let from = this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>";
          this.map.setSourceContent(from, this.css);
        }
      }
      sourcePath(node) {
        if (this.mapOpts.from) {
          return this.toUrl(this.mapOpts.from);
        } else if (this.usesFileUrls) {
          return this.toFileUrl(node.source.input.from);
        } else {
          return this.toUrl(this.path(node.source.input.from));
        }
      }
      toBase64(str) {
        if (Buffer) {
          return Buffer.from(str).toString("base64");
        } else {
          return window.btoa(unescape(encodeURIComponent(str)));
        }
      }
      toFileUrl(path) {
        if (pathToFileURL) {
          return pathToFileURL(path).toString();
        } else {
          throw new Error(
            "`map.absolute` option is not available in this PostCSS build"
          );
        }
      }
      toUrl(path) {
        if (sep === "\\") {
          path = path.replace(/\\/g, "/");
        }
        return encodeURI(path).replace(/[#?]/g, encodeURIComponent);
      }
    };
    module2.exports = MapGenerator;
  }
});

// node_modules/tailwindcss/node_modules/postcss/lib/comment.js
var require_comment = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss/lib/comment.js"(exports, module2) {
    "use strict";
    var Node3 = require_node();
    var Comment3 = class extends Node3 {
      constructor(defaults3) {
        super(defaults3);
        this.type = "comment";
      }
    };
    module2.exports = Comment3;
    Comment3.default = Comment3;
  }
});

// node_modules/tailwindcss/node_modules/postcss/lib/container.js
var require_container = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss/lib/container.js"(exports, module2) {
    "use strict";
    var { isClean, my } = require_symbols();
    var Declaration3 = require_declaration();
    var Comment3 = require_comment();
    var Node3 = require_node();
    var parse5;
    var Rule3;
    var AtRule3;
    var Root3;
    function cleanSource(nodes) {
      return nodes.map((i) => {
        if (i.nodes)
          i.nodes = cleanSource(i.nodes);
        delete i.source;
        return i;
      });
    }
    function markDirtyUp(node) {
      node[isClean] = false;
      if (node.proxyOf.nodes) {
        for (let i of node.proxyOf.nodes) {
          markDirtyUp(i);
        }
      }
    }
    var Container3 = class extends Node3 {
      append(...children) {
        for (let child of children) {
          let nodes = this.normalize(child, this.last);
          for (let node of nodes)
            this.proxyOf.nodes.push(node);
        }
        this.markDirty();
        return this;
      }
      cleanRaws(keepBetween) {
        super.cleanRaws(keepBetween);
        if (this.nodes) {
          for (let node of this.nodes)
            node.cleanRaws(keepBetween);
        }
      }
      each(callback) {
        if (!this.proxyOf.nodes)
          return void 0;
        let iterator = this.getIterator();
        let index3, result;
        while (this.indexes[iterator] < this.proxyOf.nodes.length) {
          index3 = this.indexes[iterator];
          result = callback(this.proxyOf.nodes[index3], index3);
          if (result === false)
            break;
          this.indexes[iterator] += 1;
        }
        delete this.indexes[iterator];
        return result;
      }
      every(condition) {
        return this.nodes.every(condition);
      }
      get first() {
        if (!this.proxyOf.nodes)
          return void 0;
        return this.proxyOf.nodes[0];
      }
      getIterator() {
        if (!this.lastEach)
          this.lastEach = 0;
        if (!this.indexes)
          this.indexes = {};
        this.lastEach += 1;
        let iterator = this.lastEach;
        this.indexes[iterator] = 0;
        return iterator;
      }
      getProxyProcessor() {
        return {
          get(node, prop) {
            if (prop === "proxyOf") {
              return node;
            } else if (!node[prop]) {
              return node[prop];
            } else if (prop === "each" || typeof prop === "string" && prop.startsWith("walk")) {
              return (...args) => {
                return node[prop](
                  ...args.map((i) => {
                    if (typeof i === "function") {
                      return (child, index3) => i(child.toProxy(), index3);
                    } else {
                      return i;
                    }
                  })
                );
              };
            } else if (prop === "every" || prop === "some") {
              return (cb) => {
                return node[prop](
                  (child, ...other) => cb(child.toProxy(), ...other)
                );
              };
            } else if (prop === "root") {
              return () => node.root().toProxy();
            } else if (prop === "nodes") {
              return node.nodes.map((i) => i.toProxy());
            } else if (prop === "first" || prop === "last") {
              return node[prop].toProxy();
            } else {
              return node[prop];
            }
          },
          set(node, prop, value2) {
            if (node[prop] === value2)
              return true;
            node[prop] = value2;
            if (prop === "name" || prop === "params" || prop === "selector") {
              node.markDirty();
            }
            return true;
          }
        };
      }
      index(child) {
        if (typeof child === "number")
          return child;
        if (child.proxyOf)
          child = child.proxyOf;
        return this.proxyOf.nodes.indexOf(child);
      }
      insertAfter(exist, add) {
        let existIndex = this.index(exist);
        let nodes = this.normalize(add, this.proxyOf.nodes[existIndex]).reverse();
        existIndex = this.index(exist);
        for (let node of nodes)
          this.proxyOf.nodes.splice(existIndex + 1, 0, node);
        let index3;
        for (let id in this.indexes) {
          index3 = this.indexes[id];
          if (existIndex < index3) {
            this.indexes[id] = index3 + nodes.length;
          }
        }
        this.markDirty();
        return this;
      }
      insertBefore(exist, add) {
        let existIndex = this.index(exist);
        let type = existIndex === 0 ? "prepend" : false;
        let nodes = this.normalize(add, this.proxyOf.nodes[existIndex], type).reverse();
        existIndex = this.index(exist);
        for (let node of nodes)
          this.proxyOf.nodes.splice(existIndex, 0, node);
        let index3;
        for (let id in this.indexes) {
          index3 = this.indexes[id];
          if (existIndex <= index3) {
            this.indexes[id] = index3 + nodes.length;
          }
        }
        this.markDirty();
        return this;
      }
      get last() {
        if (!this.proxyOf.nodes)
          return void 0;
        return this.proxyOf.nodes[this.proxyOf.nodes.length - 1];
      }
      normalize(nodes, sample) {
        if (typeof nodes === "string") {
          nodes = cleanSource(parse5(nodes).nodes);
        } else if (Array.isArray(nodes)) {
          nodes = nodes.slice(0);
          for (let i of nodes) {
            if (i.parent)
              i.parent.removeChild(i, "ignore");
          }
        } else if (nodes.type === "root" && this.type !== "document") {
          nodes = nodes.nodes.slice(0);
          for (let i of nodes) {
            if (i.parent)
              i.parent.removeChild(i, "ignore");
          }
        } else if (nodes.type) {
          nodes = [nodes];
        } else if (nodes.prop) {
          if (typeof nodes.value === "undefined") {
            throw new Error("Value field is missed in node creation");
          } else if (typeof nodes.value !== "string") {
            nodes.value = String(nodes.value);
          }
          nodes = [new Declaration3(nodes)];
        } else if (nodes.selector) {
          nodes = [new Rule3(nodes)];
        } else if (nodes.name) {
          nodes = [new AtRule3(nodes)];
        } else if (nodes.text) {
          nodes = [new Comment3(nodes)];
        } else {
          throw new Error("Unknown node type in node creation");
        }
        let processed = nodes.map((i) => {
          if (!i[my])
            Container3.rebuild(i);
          i = i.proxyOf;
          if (i.parent)
            i.parent.removeChild(i);
          if (i[isClean])
            markDirtyUp(i);
          if (typeof i.raws.before === "undefined") {
            if (sample && typeof sample.raws.before !== "undefined") {
              i.raws.before = sample.raws.before.replace(/\S/g, "");
            }
          }
          i.parent = this.proxyOf;
          return i;
        });
        return processed;
      }
      prepend(...children) {
        children = children.reverse();
        for (let child of children) {
          let nodes = this.normalize(child, this.first, "prepend").reverse();
          for (let node of nodes)
            this.proxyOf.nodes.unshift(node);
          for (let id in this.indexes) {
            this.indexes[id] = this.indexes[id] + nodes.length;
          }
        }
        this.markDirty();
        return this;
      }
      push(child) {
        child.parent = this;
        this.proxyOf.nodes.push(child);
        return this;
      }
      removeAll() {
        for (let node of this.proxyOf.nodes)
          node.parent = void 0;
        this.proxyOf.nodes = [];
        this.markDirty();
        return this;
      }
      removeChild(child) {
        child = this.index(child);
        this.proxyOf.nodes[child].parent = void 0;
        this.proxyOf.nodes.splice(child, 1);
        let index3;
        for (let id in this.indexes) {
          index3 = this.indexes[id];
          if (index3 >= child) {
            this.indexes[id] = index3 - 1;
          }
        }
        this.markDirty();
        return this;
      }
      replaceValues(pattern2, opts, callback) {
        if (!callback) {
          callback = opts;
          opts = {};
        }
        this.walkDecls((decl3) => {
          if (opts.props && !opts.props.includes(decl3.prop))
            return;
          if (opts.fast && !decl3.value.includes(opts.fast))
            return;
          decl3.value = decl3.value.replace(pattern2, callback);
        });
        this.markDirty();
        return this;
      }
      some(condition) {
        return this.nodes.some(condition);
      }
      walk(callback) {
        return this.each((child, i) => {
          let result;
          try {
            result = callback(child, i);
          } catch (e) {
            throw child.addToError(e);
          }
          if (result !== false && child.walk) {
            result = child.walk(callback);
          }
          return result;
        });
      }
      walkAtRules(name, callback) {
        if (!callback) {
          callback = name;
          return this.walk((child, i) => {
            if (child.type === "atrule") {
              return callback(child, i);
            }
          });
        }
        if (name instanceof RegExp) {
          return this.walk((child, i) => {
            if (child.type === "atrule" && name.test(child.name)) {
              return callback(child, i);
            }
          });
        }
        return this.walk((child, i) => {
          if (child.type === "atrule" && child.name === name) {
            return callback(child, i);
          }
        });
      }
      walkComments(callback) {
        return this.walk((child, i) => {
          if (child.type === "comment") {
            return callback(child, i);
          }
        });
      }
      walkDecls(prop, callback) {
        if (!callback) {
          callback = prop;
          return this.walk((child, i) => {
            if (child.type === "decl") {
              return callback(child, i);
            }
          });
        }
        if (prop instanceof RegExp) {
          return this.walk((child, i) => {
            if (child.type === "decl" && prop.test(child.prop)) {
              return callback(child, i);
            }
          });
        }
        return this.walk((child, i) => {
          if (child.type === "decl" && child.prop === prop) {
            return callback(child, i);
          }
        });
      }
      walkRules(selector, callback) {
        if (!callback) {
          callback = selector;
          return this.walk((child, i) => {
            if (child.type === "rule") {
              return callback(child, i);
            }
          });
        }
        if (selector instanceof RegExp) {
          return this.walk((child, i) => {
            if (child.type === "rule" && selector.test(child.selector)) {
              return callback(child, i);
            }
          });
        }
        return this.walk((child, i) => {
          if (child.type === "rule" && child.selector === selector) {
            return callback(child, i);
          }
        });
      }
    };
    Container3.registerParse = (dependant) => {
      parse5 = dependant;
    };
    Container3.registerRule = (dependant) => {
      Rule3 = dependant;
    };
    Container3.registerAtRule = (dependant) => {
      AtRule3 = dependant;
    };
    Container3.registerRoot = (dependant) => {
      Root3 = dependant;
    };
    module2.exports = Container3;
    Container3.default = Container3;
    Container3.rebuild = (node) => {
      if (node.type === "atrule") {
        Object.setPrototypeOf(node, AtRule3.prototype);
      } else if (node.type === "rule") {
        Object.setPrototypeOf(node, Rule3.prototype);
      } else if (node.type === "decl") {
        Object.setPrototypeOf(node, Declaration3.prototype);
      } else if (node.type === "comment") {
        Object.setPrototypeOf(node, Comment3.prototype);
      } else if (node.type === "root") {
        Object.setPrototypeOf(node, Root3.prototype);
      }
      node[my] = true;
      if (node.nodes) {
        node.nodes.forEach((child) => {
          Container3.rebuild(child);
        });
      }
    };
  }
});

// node_modules/tailwindcss/node_modules/postcss/lib/document.js
var require_document = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss/lib/document.js"(exports, module2) {
    "use strict";
    var Container3 = require_container();
    var LazyResult;
    var Processor3;
    var Document3 = class extends Container3 {
      constructor(defaults3) {
        super({ type: "document", ...defaults3 });
        if (!this.nodes) {
          this.nodes = [];
        }
      }
      toResult(opts = {}) {
        let lazy = new LazyResult(new Processor3(), this, opts);
        return lazy.stringify();
      }
    };
    Document3.registerLazyResult = (dependant) => {
      LazyResult = dependant;
    };
    Document3.registerProcessor = (dependant) => {
      Processor3 = dependant;
    };
    module2.exports = Document3;
    Document3.default = Document3;
  }
});

// node_modules/tailwindcss/node_modules/postcss/lib/warn-once.js
var require_warn_once = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss/lib/warn-once.js"(exports, module2) {
    "use strict";
    var printed = {};
    module2.exports = function warnOnce(message) {
      if (printed[message])
        return;
      printed[message] = true;
      if (typeof console !== "undefined" && console.warn) {
        console.warn(message);
      }
    };
  }
});

// node_modules/tailwindcss/node_modules/postcss/lib/warning.js
var require_warning = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss/lib/warning.js"(exports, module2) {
    "use strict";
    var Warning3 = class {
      constructor(text, opts = {}) {
        this.type = "warning";
        this.text = text;
        if (opts.node && opts.node.source) {
          let range = opts.node.rangeBy(opts);
          this.line = range.start.line;
          this.column = range.start.column;
          this.endLine = range.end.line;
          this.endColumn = range.end.column;
        }
        for (let opt in opts)
          this[opt] = opts[opt];
      }
      toString() {
        if (this.node) {
          return this.node.error(this.text, {
            index: this.index,
            plugin: this.plugin,
            word: this.word
          }).message;
        }
        if (this.plugin) {
          return this.plugin + ": " + this.text;
        }
        return this.text;
      }
    };
    module2.exports = Warning3;
    Warning3.default = Warning3;
  }
});

// node_modules/tailwindcss/node_modules/postcss/lib/result.js
var require_result = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss/lib/result.js"(exports, module2) {
    "use strict";
    var Warning3 = require_warning();
    var Result3 = class {
      constructor(processor, root3, opts) {
        this.processor = processor;
        this.messages = [];
        this.root = root3;
        this.opts = opts;
        this.css = void 0;
        this.map = void 0;
      }
      get content() {
        return this.css;
      }
      toString() {
        return this.css;
      }
      warn(text, opts = {}) {
        if (!opts.plugin) {
          if (this.lastPlugin && this.lastPlugin.postcssPlugin) {
            opts.plugin = this.lastPlugin.postcssPlugin;
          }
        }
        let warning = new Warning3(text, opts);
        this.messages.push(warning);
        return warning;
      }
      warnings() {
        return this.messages.filter((i) => i.type === "warning");
      }
    };
    module2.exports = Result3;
    Result3.default = Result3;
  }
});

// node_modules/tailwindcss/node_modules/postcss/lib/tokenize.js
var require_tokenize = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss/lib/tokenize.js"(exports, module2) {
    "use strict";
    var SINGLE_QUOTE = "'".charCodeAt(0);
    var DOUBLE_QUOTE = '"'.charCodeAt(0);
    var BACKSLASH = "\\".charCodeAt(0);
    var SLASH = "/".charCodeAt(0);
    var NEWLINE = "\n".charCodeAt(0);
    var SPACE3 = " ".charCodeAt(0);
    var FEED = "\f".charCodeAt(0);
    var TAB = "	".charCodeAt(0);
    var CR = "\r".charCodeAt(0);
    var OPEN_SQUARE = "[".charCodeAt(0);
    var CLOSE_SQUARE = "]".charCodeAt(0);
    var OPEN_PARENTHESES = "(".charCodeAt(0);
    var CLOSE_PARENTHESES = ")".charCodeAt(0);
    var OPEN_CURLY = "{".charCodeAt(0);
    var CLOSE_CURLY = "}".charCodeAt(0);
    var SEMICOLON = ";".charCodeAt(0);
    var ASTERISK = "*".charCodeAt(0);
    var COLON = ":".charCodeAt(0);
    var AT = "@".charCodeAt(0);
    var RE_AT_END = /[\t\n\f\r "#'()/;[\\\]{}]/g;
    var RE_WORD_END = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g;
    var RE_BAD_BRACKET = /.[\n"'(/\\]/;
    var RE_HEX_ESCAPE = /[\da-f]/i;
    module2.exports = function tokenizer(input, options = {}) {
      let css = input.css.valueOf();
      let ignore = options.ignoreErrors;
      let code, next, quote, content, escape2;
      let escaped, escapePos, prev, n, currentToken;
      let length2 = css.length;
      let pos = 0;
      let buffer = [];
      let returned = [];
      function position2() {
        return pos;
      }
      function unclosed(what) {
        throw input.error("Unclosed " + what, pos);
      }
      function endOfFile() {
        return returned.length === 0 && pos >= length2;
      }
      function nextToken(opts) {
        if (returned.length)
          return returned.pop();
        if (pos >= length2)
          return;
        let ignoreUnclosed = opts ? opts.ignoreUnclosed : false;
        code = css.charCodeAt(pos);
        switch (code) {
          case NEWLINE:
          case SPACE3:
          case TAB:
          case CR:
          case FEED: {
            next = pos;
            do {
              next += 1;
              code = css.charCodeAt(next);
            } while (code === SPACE3 || code === NEWLINE || code === TAB || code === CR || code === FEED);
            currentToken = ["space", css.slice(pos, next)];
            pos = next - 1;
            break;
          }
          case OPEN_SQUARE:
          case CLOSE_SQUARE:
          case OPEN_CURLY:
          case CLOSE_CURLY:
          case COLON:
          case SEMICOLON:
          case CLOSE_PARENTHESES: {
            let controlChar = String.fromCharCode(code);
            currentToken = [controlChar, controlChar, pos];
            break;
          }
          case OPEN_PARENTHESES: {
            prev = buffer.length ? buffer.pop()[1] : "";
            n = css.charCodeAt(pos + 1);
            if (prev === "url" && n !== SINGLE_QUOTE && n !== DOUBLE_QUOTE && n !== SPACE3 && n !== NEWLINE && n !== TAB && n !== FEED && n !== CR) {
              next = pos;
              do {
                escaped = false;
                next = css.indexOf(")", next + 1);
                if (next === -1) {
                  if (ignore || ignoreUnclosed) {
                    next = pos;
                    break;
                  } else {
                    unclosed("bracket");
                  }
                }
                escapePos = next;
                while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
                  escapePos -= 1;
                  escaped = !escaped;
                }
              } while (escaped);
              currentToken = ["brackets", css.slice(pos, next + 1), pos, next];
              pos = next;
            } else {
              next = css.indexOf(")", pos + 1);
              content = css.slice(pos, next + 1);
              if (next === -1 || RE_BAD_BRACKET.test(content)) {
                currentToken = ["(", "(", pos];
              } else {
                currentToken = ["brackets", content, pos, next];
                pos = next;
              }
            }
            break;
          }
          case SINGLE_QUOTE:
          case DOUBLE_QUOTE: {
            quote = code === SINGLE_QUOTE ? "'" : '"';
            next = pos;
            do {
              escaped = false;
              next = css.indexOf(quote, next + 1);
              if (next === -1) {
                if (ignore || ignoreUnclosed) {
                  next = pos + 1;
                  break;
                } else {
                  unclosed("string");
                }
              }
              escapePos = next;
              while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
                escapePos -= 1;
                escaped = !escaped;
              }
            } while (escaped);
            currentToken = ["string", css.slice(pos, next + 1), pos, next];
            pos = next;
            break;
          }
          case AT: {
            RE_AT_END.lastIndex = pos + 1;
            RE_AT_END.test(css);
            if (RE_AT_END.lastIndex === 0) {
              next = css.length - 1;
            } else {
              next = RE_AT_END.lastIndex - 2;
            }
            currentToken = ["at-word", css.slice(pos, next + 1), pos, next];
            pos = next;
            break;
          }
          case BACKSLASH: {
            next = pos;
            escape2 = true;
            while (css.charCodeAt(next + 1) === BACKSLASH) {
              next += 1;
              escape2 = !escape2;
            }
            code = css.charCodeAt(next + 1);
            if (escape2 && code !== SLASH && code !== SPACE3 && code !== NEWLINE && code !== TAB && code !== CR && code !== FEED) {
              next += 1;
              if (RE_HEX_ESCAPE.test(css.charAt(next))) {
                while (RE_HEX_ESCAPE.test(css.charAt(next + 1))) {
                  next += 1;
                }
                if (css.charCodeAt(next + 1) === SPACE3) {
                  next += 1;
                }
              }
            }
            currentToken = ["word", css.slice(pos, next + 1), pos, next];
            pos = next;
            break;
          }
          default: {
            if (code === SLASH && css.charCodeAt(pos + 1) === ASTERISK) {
              next = css.indexOf("*/", pos + 2) + 1;
              if (next === 0) {
                if (ignore || ignoreUnclosed) {
                  next = css.length;
                } else {
                  unclosed("comment");
                }
              }
              currentToken = ["comment", css.slice(pos, next + 1), pos, next];
              pos = next;
            } else {
              RE_WORD_END.lastIndex = pos + 1;
              RE_WORD_END.test(css);
              if (RE_WORD_END.lastIndex === 0) {
                next = css.length - 1;
              } else {
                next = RE_WORD_END.lastIndex - 2;
              }
              currentToken = ["word", css.slice(pos, next + 1), pos, next];
              buffer.push(currentToken);
              pos = next;
            }
            break;
          }
        }
        pos++;
        return currentToken;
      }
      function back(token) {
        returned.push(token);
      }
      return {
        back,
        endOfFile,
        nextToken,
        position: position2
      };
    };
  }
});

// node_modules/tailwindcss/node_modules/postcss/lib/at-rule.js
var require_at_rule = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss/lib/at-rule.js"(exports, module2) {
    "use strict";
    var Container3 = require_container();
    var AtRule3 = class extends Container3 {
      constructor(defaults3) {
        super(defaults3);
        this.type = "atrule";
      }
      append(...children) {
        if (!this.proxyOf.nodes)
          this.nodes = [];
        return super.append(...children);
      }
      prepend(...children) {
        if (!this.proxyOf.nodes)
          this.nodes = [];
        return super.prepend(...children);
      }
    };
    module2.exports = AtRule3;
    AtRule3.default = AtRule3;
    Container3.registerAtRule(AtRule3);
  }
});

// node_modules/tailwindcss/node_modules/postcss/lib/root.js
var require_root = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss/lib/root.js"(exports, module2) {
    "use strict";
    var Container3 = require_container();
    var LazyResult;
    var Processor3;
    var Root3 = class extends Container3 {
      constructor(defaults3) {
        super(defaults3);
        this.type = "root";
        if (!this.nodes)
          this.nodes = [];
      }
      normalize(child, sample, type) {
        let nodes = super.normalize(child);
        if (sample) {
          if (type === "prepend") {
            if (this.nodes.length > 1) {
              sample.raws.before = this.nodes[1].raws.before;
            } else {
              delete sample.raws.before;
            }
          } else if (this.first !== sample) {
            for (let node of nodes) {
              node.raws.before = sample.raws.before;
            }
          }
        }
        return nodes;
      }
      removeChild(child, ignore) {
        let index3 = this.index(child);
        if (!ignore && index3 === 0 && this.nodes.length > 1) {
          this.nodes[1].raws.before = this.nodes[index3].raws.before;
        }
        return super.removeChild(child);
      }
      toResult(opts = {}) {
        let lazy = new LazyResult(new Processor3(), this, opts);
        return lazy.stringify();
      }
    };
    Root3.registerLazyResult = (dependant) => {
      LazyResult = dependant;
    };
    Root3.registerProcessor = (dependant) => {
      Processor3 = dependant;
    };
    module2.exports = Root3;
    Root3.default = Root3;
    Container3.registerRoot(Root3);
  }
});

// node_modules/tailwindcss/node_modules/postcss/lib/list.js
var require_list = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss/lib/list.js"(exports, module2) {
    "use strict";
    var list4 = {
      comma(string) {
        return list4.split(string, [","], true);
      },
      space(string) {
        let spaces = [" ", "\n", "	"];
        return list4.split(string, spaces);
      },
      split(string, separators, last) {
        let array = [];
        let current = "";
        let split = false;
        let func = 0;
        let inQuote = false;
        let prevQuote = "";
        let escape2 = false;
        for (let letter of string) {
          if (escape2) {
            escape2 = false;
          } else if (letter === "\\") {
            escape2 = true;
          } else if (inQuote) {
            if (letter === prevQuote) {
              inQuote = false;
            }
          } else if (letter === '"' || letter === "'") {
            inQuote = true;
            prevQuote = letter;
          } else if (letter === "(") {
            func += 1;
          } else if (letter === ")") {
            if (func > 0)
              func -= 1;
          } else if (func === 0) {
            if (separators.includes(letter))
              split = true;
          }
          if (split) {
            if (current !== "")
              array.push(current.trim());
            current = "";
            split = false;
          } else {
            current += letter;
          }
        }
        if (last || current !== "")
          array.push(current.trim());
        return array;
      }
    };
    module2.exports = list4;
    list4.default = list4;
  }
});

// node_modules/tailwindcss/node_modules/postcss/lib/rule.js
var require_rule = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss/lib/rule.js"(exports, module2) {
    "use strict";
    var Container3 = require_container();
    var list4 = require_list();
    var Rule3 = class extends Container3 {
      constructor(defaults3) {
        super(defaults3);
        this.type = "rule";
        if (!this.nodes)
          this.nodes = [];
      }
      get selectors() {
        return list4.comma(this.selector);
      }
      set selectors(values) {
        let match = this.selector ? this.selector.match(/,\s*/) : null;
        let sep = match ? match[0] : "," + this.raw("between", "beforeOpen");
        this.selector = values.join(sep);
      }
    };
    module2.exports = Rule3;
    Rule3.default = Rule3;
    Container3.registerRule(Rule3);
  }
});

// node_modules/tailwindcss/node_modules/postcss/lib/parser.js
var require_parser = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss/lib/parser.js"(exports, module2) {
    "use strict";
    var Declaration3 = require_declaration();
    var tokenizer = require_tokenize();
    var Comment3 = require_comment();
    var AtRule3 = require_at_rule();
    var Root3 = require_root();
    var Rule3 = require_rule();
    var SAFE_COMMENT_NEIGHBOR = {
      empty: true,
      space: true
    };
    function findLastWithPosition(tokens) {
      for (let i = tokens.length - 1; i >= 0; i--) {
        let token = tokens[i];
        let pos = token[3] || token[2];
        if (pos)
          return pos;
      }
    }
    var Parser = class {
      constructor(input) {
        this.input = input;
        this.root = new Root3();
        this.current = this.root;
        this.spaces = "";
        this.semicolon = false;
        this.customProperty = false;
        this.createTokenizer();
        this.root.source = { input, start: { column: 1, line: 1, offset: 0 } };
      }
      atrule(token) {
        let node = new AtRule3();
        node.name = token[1].slice(1);
        if (node.name === "") {
          this.unnamedAtrule(node, token);
        }
        this.init(node, token[2]);
        let type;
        let prev;
        let shift;
        let last = false;
        let open = false;
        let params = [];
        let brackets = [];
        while (!this.tokenizer.endOfFile()) {
          token = this.tokenizer.nextToken();
          type = token[0];
          if (type === "(" || type === "[") {
            brackets.push(type === "(" ? ")" : "]");
          } else if (type === "{" && brackets.length > 0) {
            brackets.push("}");
          } else if (type === brackets[brackets.length - 1]) {
            brackets.pop();
          }
          if (brackets.length === 0) {
            if (type === ";") {
              node.source.end = this.getPosition(token[2]);
              node.source.end.offset++;
              this.semicolon = true;
              break;
            } else if (type === "{") {
              open = true;
              break;
            } else if (type === "}") {
              if (params.length > 0) {
                shift = params.length - 1;
                prev = params[shift];
                while (prev && prev[0] === "space") {
                  prev = params[--shift];
                }
                if (prev) {
                  node.source.end = this.getPosition(prev[3] || prev[2]);
                  node.source.end.offset++;
                }
              }
              this.end(token);
              break;
            } else {
              params.push(token);
            }
          } else {
            params.push(token);
          }
          if (this.tokenizer.endOfFile()) {
            last = true;
            break;
          }
        }
        node.raws.between = this.spacesAndCommentsFromEnd(params);
        if (params.length) {
          node.raws.afterName = this.spacesAndCommentsFromStart(params);
          this.raw(node, "params", params);
          if (last) {
            token = params[params.length - 1];
            node.source.end = this.getPosition(token[3] || token[2]);
            node.source.end.offset++;
            this.spaces = node.raws.between;
            node.raws.between = "";
          }
        } else {
          node.raws.afterName = "";
          node.params = "";
        }
        if (open) {
          node.nodes = [];
          this.current = node;
        }
      }
      checkMissedSemicolon(tokens) {
        let colon = this.colon(tokens);
        if (colon === false)
          return;
        let founded = 0;
        let token;
        for (let j = colon - 1; j >= 0; j--) {
          token = tokens[j];
          if (token[0] !== "space") {
            founded += 1;
            if (founded === 2)
              break;
          }
        }
        throw this.input.error(
          "Missed semicolon",
          token[0] === "word" ? token[3] + 1 : token[2]
        );
      }
      colon(tokens) {
        let brackets = 0;
        let token, type, prev;
        for (let [i, element] of tokens.entries()) {
          token = element;
          type = token[0];
          if (type === "(") {
            brackets += 1;
          }
          if (type === ")") {
            brackets -= 1;
          }
          if (brackets === 0 && type === ":") {
            if (!prev) {
              this.doubleColon(token);
            } else if (prev[0] === "word" && prev[1] === "progid") {
              continue;
            } else {
              return i;
            }
          }
          prev = token;
        }
        return false;
      }
      comment(token) {
        let node = new Comment3();
        this.init(node, token[2]);
        node.source.end = this.getPosition(token[3] || token[2]);
        node.source.end.offset++;
        let text = token[1].slice(2, -2);
        if (/^\s*$/.test(text)) {
          node.text = "";
          node.raws.left = text;
          node.raws.right = "";
        } else {
          let match = text.match(/^(\s*)([^]*\S)(\s*)$/);
          node.text = match[2];
          node.raws.left = match[1];
          node.raws.right = match[3];
        }
      }
      createTokenizer() {
        this.tokenizer = tokenizer(this.input);
      }
      decl(tokens, customProperty) {
        let node = new Declaration3();
        this.init(node, tokens[0][2]);
        let last = tokens[tokens.length - 1];
        if (last[0] === ";") {
          this.semicolon = true;
          tokens.pop();
        }
        node.source.end = this.getPosition(
          last[3] || last[2] || findLastWithPosition(tokens)
        );
        node.source.end.offset++;
        while (tokens[0][0] !== "word") {
          if (tokens.length === 1)
            this.unknownWord(tokens);
          node.raws.before += tokens.shift()[1];
        }
        node.source.start = this.getPosition(tokens[0][2]);
        node.prop = "";
        while (tokens.length) {
          let type = tokens[0][0];
          if (type === ":" || type === "space" || type === "comment") {
            break;
          }
          node.prop += tokens.shift()[1];
        }
        node.raws.between = "";
        let token;
        while (tokens.length) {
          token = tokens.shift();
          if (token[0] === ":") {
            node.raws.between += token[1];
            break;
          } else {
            if (token[0] === "word" && /\w/.test(token[1])) {
              this.unknownWord([token]);
            }
            node.raws.between += token[1];
          }
        }
        if (node.prop[0] === "_" || node.prop[0] === "*") {
          node.raws.before += node.prop[0];
          node.prop = node.prop.slice(1);
        }
        let firstSpaces = [];
        let next;
        while (tokens.length) {
          next = tokens[0][0];
          if (next !== "space" && next !== "comment")
            break;
          firstSpaces.push(tokens.shift());
        }
        this.precheckMissedSemicolon(tokens);
        for (let i = tokens.length - 1; i >= 0; i--) {
          token = tokens[i];
          if (token[1].toLowerCase() === "!important") {
            node.important = true;
            let string = this.stringFrom(tokens, i);
            string = this.spacesFromEnd(tokens) + string;
            if (string !== " !important")
              node.raws.important = string;
            break;
          } else if (token[1].toLowerCase() === "important") {
            let cache2 = tokens.slice(0);
            let str = "";
            for (let j = i; j > 0; j--) {
              let type = cache2[j][0];
              if (str.trim().indexOf("!") === 0 && type !== "space") {
                break;
              }
              str = cache2.pop()[1] + str;
            }
            if (str.trim().indexOf("!") === 0) {
              node.important = true;
              node.raws.important = str;
              tokens = cache2;
            }
          }
          if (token[0] !== "space" && token[0] !== "comment") {
            break;
          }
        }
        let hasWord = tokens.some((i) => i[0] !== "space" && i[0] !== "comment");
        if (hasWord) {
          node.raws.between += firstSpaces.map((i) => i[1]).join("");
          firstSpaces = [];
        }
        this.raw(node, "value", firstSpaces.concat(tokens), customProperty);
        if (node.value.includes(":") && !customProperty) {
          this.checkMissedSemicolon(tokens);
        }
      }
      doubleColon(token) {
        throw this.input.error(
          "Double colon",
          { offset: token[2] },
          { offset: token[2] + token[1].length }
        );
      }
      emptyRule(token) {
        let node = new Rule3();
        this.init(node, token[2]);
        node.selector = "";
        node.raws.between = "";
        this.current = node;
      }
      end(token) {
        if (this.current.nodes && this.current.nodes.length) {
          this.current.raws.semicolon = this.semicolon;
        }
        this.semicolon = false;
        this.current.raws.after = (this.current.raws.after || "") + this.spaces;
        this.spaces = "";
        if (this.current.parent) {
          this.current.source.end = this.getPosition(token[2]);
          this.current.source.end.offset++;
          this.current = this.current.parent;
        } else {
          this.unexpectedClose(token);
        }
      }
      endFile() {
        if (this.current.parent)
          this.unclosedBlock();
        if (this.current.nodes && this.current.nodes.length) {
          this.current.raws.semicolon = this.semicolon;
        }
        this.current.raws.after = (this.current.raws.after || "") + this.spaces;
        this.root.source.end = this.getPosition(this.tokenizer.position());
      }
      freeSemicolon(token) {
        this.spaces += token[1];
        if (this.current.nodes) {
          let prev = this.current.nodes[this.current.nodes.length - 1];
          if (prev && prev.type === "rule" && !prev.raws.ownSemicolon) {
            prev.raws.ownSemicolon = this.spaces;
            this.spaces = "";
          }
        }
      }
      getPosition(offset) {
        let pos = this.input.fromOffset(offset);
        return {
          column: pos.col,
          line: pos.line,
          offset
        };
      }
      init(node, offset) {
        this.current.push(node);
        node.source = {
          input: this.input,
          start: this.getPosition(offset)
        };
        node.raws.before = this.spaces;
        this.spaces = "";
        if (node.type !== "comment")
          this.semicolon = false;
      }
      other(start) {
        let end = false;
        let type = null;
        let colon = false;
        let bracket = null;
        let brackets = [];
        let customProperty = start[1].startsWith("--");
        let tokens = [];
        let token = start;
        while (token) {
          type = token[0];
          tokens.push(token);
          if (type === "(" || type === "[") {
            if (!bracket)
              bracket = token;
            brackets.push(type === "(" ? ")" : "]");
          } else if (customProperty && colon && type === "{") {
            if (!bracket)
              bracket = token;
            brackets.push("}");
          } else if (brackets.length === 0) {
            if (type === ";") {
              if (colon) {
                this.decl(tokens, customProperty);
                return;
              } else {
                break;
              }
            } else if (type === "{") {
              this.rule(tokens);
              return;
            } else if (type === "}") {
              this.tokenizer.back(tokens.pop());
              end = true;
              break;
            } else if (type === ":") {
              colon = true;
            }
          } else if (type === brackets[brackets.length - 1]) {
            brackets.pop();
            if (brackets.length === 0)
              bracket = null;
          }
          token = this.tokenizer.nextToken();
        }
        if (this.tokenizer.endOfFile())
          end = true;
        if (brackets.length > 0)
          this.unclosedBracket(bracket);
        if (end && colon) {
          if (!customProperty) {
            while (tokens.length) {
              token = tokens[tokens.length - 1][0];
              if (token !== "space" && token !== "comment")
                break;
              this.tokenizer.back(tokens.pop());
            }
          }
          this.decl(tokens, customProperty);
        } else {
          this.unknownWord(tokens);
        }
      }
      parse() {
        let token;
        while (!this.tokenizer.endOfFile()) {
          token = this.tokenizer.nextToken();
          switch (token[0]) {
            case "space":
              this.spaces += token[1];
              break;
            case ";":
              this.freeSemicolon(token);
              break;
            case "}":
              this.end(token);
              break;
            case "comment":
              this.comment(token);
              break;
            case "at-word":
              this.atrule(token);
              break;
            case "{":
              this.emptyRule(token);
              break;
            default:
              this.other(token);
              break;
          }
        }
        this.endFile();
      }
      precheckMissedSemicolon() {
      }
      raw(node, prop, tokens, customProperty) {
        let token, type;
        let length2 = tokens.length;
        let value2 = "";
        let clean = true;
        let next, prev;
        for (let i = 0; i < length2; i += 1) {
          token = tokens[i];
          type = token[0];
          if (type === "space" && i === length2 - 1 && !customProperty) {
            clean = false;
          } else if (type === "comment") {
            prev = tokens[i - 1] ? tokens[i - 1][0] : "empty";
            next = tokens[i + 1] ? tokens[i + 1][0] : "empty";
            if (!SAFE_COMMENT_NEIGHBOR[prev] && !SAFE_COMMENT_NEIGHBOR[next]) {
              if (value2.slice(-1) === ",") {
                clean = false;
              } else {
                value2 += token[1];
              }
            } else {
              clean = false;
            }
          } else {
            value2 += token[1];
          }
        }
        if (!clean) {
          let raw = tokens.reduce((all, i) => all + i[1], "");
          node.raws[prop] = { raw, value: value2 };
        }
        node[prop] = value2;
      }
      rule(tokens) {
        tokens.pop();
        let node = new Rule3();
        this.init(node, tokens[0][2]);
        node.raws.between = this.spacesAndCommentsFromEnd(tokens);
        this.raw(node, "selector", tokens);
        this.current = node;
      }
      spacesAndCommentsFromEnd(tokens) {
        let lastTokenType;
        let spaces = "";
        while (tokens.length) {
          lastTokenType = tokens[tokens.length - 1][0];
          if (lastTokenType !== "space" && lastTokenType !== "comment")
            break;
          spaces = tokens.pop()[1] + spaces;
        }
        return spaces;
      }
      spacesAndCommentsFromStart(tokens) {
        let next;
        let spaces = "";
        while (tokens.length) {
          next = tokens[0][0];
          if (next !== "space" && next !== "comment")
            break;
          spaces += tokens.shift()[1];
        }
        return spaces;
      }
      spacesFromEnd(tokens) {
        let lastTokenType;
        let spaces = "";
        while (tokens.length) {
          lastTokenType = tokens[tokens.length - 1][0];
          if (lastTokenType !== "space")
            break;
          spaces = tokens.pop()[1] + spaces;
        }
        return spaces;
      }
      stringFrom(tokens, from) {
        let result = "";
        for (let i = from; i < tokens.length; i++) {
          result += tokens[i][1];
        }
        tokens.splice(from, tokens.length - from);
        return result;
      }
      unclosedBlock() {
        let pos = this.current.source.start;
        throw this.input.error("Unclosed block", pos.line, pos.column);
      }
      unclosedBracket(bracket) {
        throw this.input.error(
          "Unclosed bracket",
          { offset: bracket[2] },
          { offset: bracket[2] + 1 }
        );
      }
      unexpectedClose(token) {
        throw this.input.error(
          "Unexpected }",
          { offset: token[2] },
          { offset: token[2] + 1 }
        );
      }
      unknownWord(tokens) {
        throw this.input.error(
          "Unknown word",
          { offset: tokens[0][2] },
          { offset: tokens[0][2] + tokens[0][1].length }
        );
      }
      unnamedAtrule(node, token) {
        throw this.input.error(
          "At-rule without name",
          { offset: token[2] },
          { offset: token[2] + token[1].length }
        );
      }
    };
    module2.exports = Parser;
  }
});

// node_modules/tailwindcss/node_modules/postcss/lib/parse.js
var require_parse = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss/lib/parse.js"(exports, module2) {
    "use strict";
    var Container3 = require_container();
    var Parser = require_parser();
    var Input3 = require_input();
    function parse5(css, opts) {
      let input = new Input3(css, opts);
      let parser5 = new Parser(input);
      try {
        parser5.parse();
      } catch (e) {
        if (true) {
          if (e.name === "CssSyntaxError" && opts && opts.from) {
            if (/\.scss$/i.test(opts.from)) {
              e.message += "\nYou tried to parse SCSS with the standard CSS parser; try again with the postcss-scss parser";
            } else if (/\.sass/i.test(opts.from)) {
              e.message += "\nYou tried to parse Sass with the standard CSS parser; try again with the postcss-sass parser";
            } else if (/\.less$/i.test(opts.from)) {
              e.message += "\nYou tried to parse Less with the standard CSS parser; try again with the postcss-less parser";
            }
          }
        }
        throw e;
      }
      return parser5.root;
    }
    module2.exports = parse5;
    parse5.default = parse5;
    Container3.registerParse(parse5);
  }
});

// node_modules/tailwindcss/node_modules/postcss/lib/lazy-result.js
var require_lazy_result = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss/lib/lazy-result.js"(exports, module2) {
    "use strict";
    var { isClean, my } = require_symbols();
    var MapGenerator = require_map_generator();
    var stringify3 = require_stringify();
    var Container3 = require_container();
    var Document3 = require_document();
    var warnOnce = require_warn_once();
    var Result3 = require_result();
    var parse5 = require_parse();
    var Root3 = require_root();
    var TYPE_TO_CLASS_NAME = {
      atrule: "AtRule",
      comment: "Comment",
      decl: "Declaration",
      document: "Document",
      root: "Root",
      rule: "Rule"
    };
    var PLUGIN_PROPS = {
      AtRule: true,
      AtRuleExit: true,
      Comment: true,
      CommentExit: true,
      Declaration: true,
      DeclarationExit: true,
      Document: true,
      DocumentExit: true,
      Once: true,
      OnceExit: true,
      postcssPlugin: true,
      prepare: true,
      Root: true,
      RootExit: true,
      Rule: true,
      RuleExit: true
    };
    var NOT_VISITORS = {
      Once: true,
      postcssPlugin: true,
      prepare: true
    };
    var CHILDREN = 0;
    function isPromise(obj) {
      return typeof obj === "object" && typeof obj.then === "function";
    }
    function getEvents(node) {
      let key = false;
      let type = TYPE_TO_CLASS_NAME[node.type];
      if (node.type === "decl") {
        key = node.prop.toLowerCase();
      } else if (node.type === "atrule") {
        key = node.name.toLowerCase();
      }
      if (key && node.append) {
        return [
          type,
          type + "-" + key,
          CHILDREN,
          type + "Exit",
          type + "Exit-" + key
        ];
      } else if (key) {
        return [type, type + "-" + key, type + "Exit", type + "Exit-" + key];
      } else if (node.append) {
        return [type, CHILDREN, type + "Exit"];
      } else {
        return [type, type + "Exit"];
      }
    }
    function toStack(node) {
      let events;
      if (node.type === "document") {
        events = ["Document", CHILDREN, "DocumentExit"];
      } else if (node.type === "root") {
        events = ["Root", CHILDREN, "RootExit"];
      } else {
        events = getEvents(node);
      }
      return {
        eventIndex: 0,
        events,
        iterator: 0,
        node,
        visitorIndex: 0,
        visitors: []
      };
    }
    function cleanMarks(node) {
      node[isClean] = false;
      if (node.nodes)
        node.nodes.forEach((i) => cleanMarks(i));
      return node;
    }
    var postcss3 = {};
    var LazyResult = class {
      constructor(processor, css, opts) {
        this.stringified = false;
        this.processed = false;
        let root3;
        if (typeof css === "object" && css !== null && (css.type === "root" || css.type === "document")) {
          root3 = cleanMarks(css);
        } else if (css instanceof LazyResult || css instanceof Result3) {
          root3 = cleanMarks(css.root);
          if (css.map) {
            if (typeof opts.map === "undefined")
              opts.map = {};
            if (!opts.map.inline)
              opts.map.inline = false;
            opts.map.prev = css.map;
          }
        } else {
          let parser5 = parse5;
          if (opts.syntax)
            parser5 = opts.syntax.parse;
          if (opts.parser)
            parser5 = opts.parser;
          if (parser5.parse)
            parser5 = parser5.parse;
          try {
            root3 = parser5(css, opts);
          } catch (error) {
            this.processed = true;
            this.error = error;
          }
          if (root3 && !root3[my]) {
            Container3.rebuild(root3);
          }
        }
        this.result = new Result3(processor, root3, opts);
        this.helpers = { ...postcss3, postcss: postcss3, result: this.result };
        this.plugins = this.processor.plugins.map((plugin3) => {
          if (typeof plugin3 === "object" && plugin3.prepare) {
            return { ...plugin3, ...plugin3.prepare(this.result) };
          } else {
            return plugin3;
          }
        });
      }
      async() {
        if (this.error)
          return Promise.reject(this.error);
        if (this.processed)
          return Promise.resolve(this.result);
        if (!this.processing) {
          this.processing = this.runAsync();
        }
        return this.processing;
      }
      catch(onRejected) {
        return this.async().catch(onRejected);
      }
      get content() {
        return this.stringify().content;
      }
      get css() {
        return this.stringify().css;
      }
      finally(onFinally) {
        return this.async().then(onFinally, onFinally);
      }
      getAsyncError() {
        throw new Error("Use process(css).then(cb) to work with async plugins");
      }
      handleError(error, node) {
        let plugin3 = this.result.lastPlugin;
        try {
          if (node)
            node.addToError(error);
          this.error = error;
          if (error.name === "CssSyntaxError" && !error.plugin) {
            error.plugin = plugin3.postcssPlugin;
            error.setMessage();
          } else if (plugin3.postcssVersion) {
            if (true) {
              let pluginName = plugin3.postcssPlugin;
              let pluginVer = plugin3.postcssVersion;
              let runtimeVer = this.result.processor.version;
              let a = pluginVer.split(".");
              let b = runtimeVer.split(".");
              if (a[0] !== b[0] || parseInt(a[1]) > parseInt(b[1])) {
                console.error(
                  "Unknown error from PostCSS plugin. Your current PostCSS version is " + runtimeVer + ", but " + pluginName + " uses " + pluginVer + ". Perhaps this is the source of the error below."
                );
              }
            }
          }
        } catch (err) {
          if (console && console.error)
            console.error(err);
        }
        return error;
      }
      get map() {
        return this.stringify().map;
      }
      get messages() {
        return this.sync().messages;
      }
      get opts() {
        return this.result.opts;
      }
      prepareVisitors() {
        this.listeners = {};
        let add = (plugin3, type, cb) => {
          if (!this.listeners[type])
            this.listeners[type] = [];
          this.listeners[type].push([plugin3, cb]);
        };
        for (let plugin3 of this.plugins) {
          if (typeof plugin3 === "object") {
            for (let event in plugin3) {
              if (!PLUGIN_PROPS[event] && /^[A-Z]/.test(event)) {
                throw new Error(
                  `Unknown event ${event} in ${plugin3.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`
                );
              }
              if (!NOT_VISITORS[event]) {
                if (typeof plugin3[event] === "object") {
                  for (let filter in plugin3[event]) {
                    if (filter === "*") {
                      add(plugin3, event, plugin3[event][filter]);
                    } else {
                      add(
                        plugin3,
                        event + "-" + filter.toLowerCase(),
                        plugin3[event][filter]
                      );
                    }
                  }
                } else if (typeof plugin3[event] === "function") {
                  add(plugin3, event, plugin3[event]);
                }
              }
            }
          }
        }
        this.hasListener = Object.keys(this.listeners).length > 0;
      }
      get processor() {
        return this.result.processor;
      }
      get root() {
        return this.sync().root;
      }
      async runAsync() {
        this.plugin = 0;
        for (let i = 0; i < this.plugins.length; i++) {
          let plugin3 = this.plugins[i];
          let promise = this.runOnRoot(plugin3);
          if (isPromise(promise)) {
            try {
              await promise;
            } catch (error) {
              throw this.handleError(error);
            }
          }
        }
        this.prepareVisitors();
        if (this.hasListener) {
          let root3 = this.result.root;
          while (!root3[isClean]) {
            root3[isClean] = true;
            let stack = [toStack(root3)];
            while (stack.length > 0) {
              let promise = this.visitTick(stack);
              if (isPromise(promise)) {
                try {
                  await promise;
                } catch (e) {
                  let node = stack[stack.length - 1].node;
                  throw this.handleError(e, node);
                }
              }
            }
          }
          if (this.listeners.OnceExit) {
            for (let [plugin3, visitor] of this.listeners.OnceExit) {
              this.result.lastPlugin = plugin3;
              try {
                if (root3.type === "document") {
                  let roots = root3.nodes.map(
                    (subRoot) => visitor(subRoot, this.helpers)
                  );
                  await Promise.all(roots);
                } else {
                  await visitor(root3, this.helpers);
                }
              } catch (e) {
                throw this.handleError(e);
              }
            }
          }
        }
        this.processed = true;
        return this.stringify();
      }
      runOnRoot(plugin3) {
        this.result.lastPlugin = plugin3;
        try {
          if (typeof plugin3 === "object" && plugin3.Once) {
            if (this.result.root.type === "document") {
              let roots = this.result.root.nodes.map(
                (root3) => plugin3.Once(root3, this.helpers)
              );
              if (isPromise(roots[0])) {
                return Promise.all(roots);
              }
              return roots;
            }
            return plugin3.Once(this.result.root, this.helpers);
          } else if (typeof plugin3 === "function") {
            return plugin3(this.result.root, this.result);
          }
        } catch (error) {
          throw this.handleError(error);
        }
      }
      stringify() {
        if (this.error)
          throw this.error;
        if (this.stringified)
          return this.result;
        this.stringified = true;
        this.sync();
        let opts = this.result.opts;
        let str = stringify3;
        if (opts.syntax)
          str = opts.syntax.stringify;
        if (opts.stringifier)
          str = opts.stringifier;
        if (str.stringify)
          str = str.stringify;
        let map = new MapGenerator(str, this.result.root, this.result.opts);
        let data = map.generate();
        this.result.css = data[0];
        this.result.map = data[1];
        return this.result;
      }
      get [Symbol.toStringTag]() {
        return "LazyResult";
      }
      sync() {
        if (this.error)
          throw this.error;
        if (this.processed)
          return this.result;
        this.processed = true;
        if (this.processing) {
          throw this.getAsyncError();
        }
        for (let plugin3 of this.plugins) {
          let promise = this.runOnRoot(plugin3);
          if (isPromise(promise)) {
            throw this.getAsyncError();
          }
        }
        this.prepareVisitors();
        if (this.hasListener) {
          let root3 = this.result.root;
          while (!root3[isClean]) {
            root3[isClean] = true;
            this.walkSync(root3);
          }
          if (this.listeners.OnceExit) {
            if (root3.type === "document") {
              for (let subRoot of root3.nodes) {
                this.visitSync(this.listeners.OnceExit, subRoot);
              }
            } else {
              this.visitSync(this.listeners.OnceExit, root3);
            }
          }
        }
        return this.result;
      }
      then(onFulfilled, onRejected) {
        if (true) {
          if (!("from" in this.opts)) {
            warnOnce(
              "Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning."
            );
          }
        }
        return this.async().then(onFulfilled, onRejected);
      }
      toString() {
        return this.css;
      }
      visitSync(visitors, node) {
        for (let [plugin3, visitor] of visitors) {
          this.result.lastPlugin = plugin3;
          let promise;
          try {
            promise = visitor(node, this.helpers);
          } catch (e) {
            throw this.handleError(e, node.proxyOf);
          }
          if (node.type !== "root" && node.type !== "document" && !node.parent) {
            return true;
          }
          if (isPromise(promise)) {
            throw this.getAsyncError();
          }
        }
      }
      visitTick(stack) {
        let visit = stack[stack.length - 1];
        let { node, visitors } = visit;
        if (node.type !== "root" && node.type !== "document" && !node.parent) {
          stack.pop();
          return;
        }
        if (visitors.length > 0 && visit.visitorIndex < visitors.length) {
          let [plugin3, visitor] = visitors[visit.visitorIndex];
          visit.visitorIndex += 1;
          if (visit.visitorIndex === visitors.length) {
            visit.visitors = [];
            visit.visitorIndex = 0;
          }
          this.result.lastPlugin = plugin3;
          try {
            return visitor(node.toProxy(), this.helpers);
          } catch (e) {
            throw this.handleError(e, node);
          }
        }
        if (visit.iterator !== 0) {
          let iterator = visit.iterator;
          let child;
          while (child = node.nodes[node.indexes[iterator]]) {
            node.indexes[iterator] += 1;
            if (!child[isClean]) {
              child[isClean] = true;
              stack.push(toStack(child));
              return;
            }
          }
          visit.iterator = 0;
          delete node.indexes[iterator];
        }
        let events = visit.events;
        while (visit.eventIndex < events.length) {
          let event = events[visit.eventIndex];
          visit.eventIndex += 1;
          if (event === CHILDREN) {
            if (node.nodes && node.nodes.length) {
              node[isClean] = true;
              visit.iterator = node.getIterator();
            }
            return;
          } else if (this.listeners[event]) {
            visit.visitors = this.listeners[event];
            return;
          }
        }
        stack.pop();
      }
      walkSync(node) {
        node[isClean] = true;
        let events = getEvents(node);
        for (let event of events) {
          if (event === CHILDREN) {
            if (node.nodes) {
              node.each((child) => {
                if (!child[isClean])
                  this.walkSync(child);
              });
            }
          } else {
            let visitors = this.listeners[event];
            if (visitors) {
              if (this.visitSync(visitors, node.toProxy()))
                return;
            }
          }
        }
      }
      warnings() {
        return this.sync().warnings();
      }
    };
    LazyResult.registerPostcss = (dependant) => {
      postcss3 = dependant;
    };
    module2.exports = LazyResult;
    LazyResult.default = LazyResult;
    Root3.registerLazyResult(LazyResult);
    Document3.registerLazyResult(LazyResult);
  }
});

// node_modules/tailwindcss/node_modules/postcss/lib/no-work-result.js
var require_no_work_result = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss/lib/no-work-result.js"(exports, module2) {
    "use strict";
    var MapGenerator = require_map_generator();
    var stringify3 = require_stringify();
    var warnOnce = require_warn_once();
    var parse5 = require_parse();
    var Result3 = require_result();
    var NoWorkResult = class {
      constructor(processor, css, opts) {
        css = css.toString();
        this.stringified = false;
        this._processor = processor;
        this._css = css;
        this._opts = opts;
        this._map = void 0;
        let root3;
        let str = stringify3;
        this.result = new Result3(this._processor, root3, this._opts);
        this.result.css = css;
        let self = this;
        Object.defineProperty(this.result, "root", {
          get() {
            return self.root;
          }
        });
        let map = new MapGenerator(str, root3, this._opts, css);
        if (map.isMap()) {
          let [generatedCSS, generatedMap] = map.generate();
          if (generatedCSS) {
            this.result.css = generatedCSS;
          }
          if (generatedMap) {
            this.result.map = generatedMap;
          }
        }
      }
      async() {
        if (this.error)
          return Promise.reject(this.error);
        return Promise.resolve(this.result);
      }
      catch(onRejected) {
        return this.async().catch(onRejected);
      }
      get content() {
        return this.result.css;
      }
      get css() {
        return this.result.css;
      }
      finally(onFinally) {
        return this.async().then(onFinally, onFinally);
      }
      get map() {
        return this.result.map;
      }
      get messages() {
        return [];
      }
      get opts() {
        return this.result.opts;
      }
      get processor() {
        return this.result.processor;
      }
      get root() {
        if (this._root) {
          return this._root;
        }
        let root3;
        let parser5 = parse5;
        try {
          root3 = parser5(this._css, this._opts);
        } catch (error) {
          this.error = error;
        }
        if (this.error) {
          throw this.error;
        } else {
          this._root = root3;
          return root3;
        }
      }
      get [Symbol.toStringTag]() {
        return "NoWorkResult";
      }
      sync() {
        if (this.error)
          throw this.error;
        return this.result;
      }
      then(onFulfilled, onRejected) {
        if (true) {
          if (!("from" in this._opts)) {
            warnOnce(
              "Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning."
            );
          }
        }
        return this.async().then(onFulfilled, onRejected);
      }
      toString() {
        return this._css;
      }
      warnings() {
        return [];
      }
    };
    module2.exports = NoWorkResult;
    NoWorkResult.default = NoWorkResult;
  }
});

// node_modules/tailwindcss/node_modules/postcss/lib/processor.js
var require_processor = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss/lib/processor.js"(exports, module2) {
    "use strict";
    var NoWorkResult = require_no_work_result();
    var LazyResult = require_lazy_result();
    var Document3 = require_document();
    var Root3 = require_root();
    var Processor3 = class {
      constructor(plugins = []) {
        this.version = "8.4.29";
        this.plugins = this.normalize(plugins);
      }
      normalize(plugins) {
        let normalized = [];
        for (let i of plugins) {
          if (i.postcss === true) {
            i = i();
          } else if (i.postcss) {
            i = i.postcss;
          }
          if (typeof i === "object" && Array.isArray(i.plugins)) {
            normalized = normalized.concat(i.plugins);
          } else if (typeof i === "object" && i.postcssPlugin) {
            normalized.push(i);
          } else if (typeof i === "function") {
            normalized.push(i);
          } else if (typeof i === "object" && (i.parse || i.stringify)) {
            if (true) {
              throw new Error(
                "PostCSS syntaxes cannot be used as plugins. Instead, please use one of the syntax/parser/stringifier options as outlined in your PostCSS runner documentation."
              );
            }
          } else {
            throw new Error(i + " is not a PostCSS plugin");
          }
        }
        return normalized;
      }
      process(css, opts = {}) {
        if (this.plugins.length === 0 && typeof opts.parser === "undefined" && typeof opts.stringifier === "undefined" && typeof opts.syntax === "undefined") {
          return new NoWorkResult(this, css, opts);
        } else {
          return new LazyResult(this, css, opts);
        }
      }
      use(plugin3) {
        this.plugins = this.plugins.concat(this.normalize([plugin3]));
        return this;
      }
    };
    module2.exports = Processor3;
    Processor3.default = Processor3;
    Root3.registerProcessor(Processor3);
    Document3.registerProcessor(Processor3);
  }
});

// node_modules/tailwindcss/node_modules/postcss/lib/fromJSON.js
var require_fromJSON = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss/lib/fromJSON.js"(exports, module2) {
    "use strict";
    var Declaration3 = require_declaration();
    var PreviousMap = require_previous_map();
    var Comment3 = require_comment();
    var AtRule3 = require_at_rule();
    var Input3 = require_input();
    var Root3 = require_root();
    var Rule3 = require_rule();
    function fromJSON3(json, inputs) {
      if (Array.isArray(json))
        return json.map((n) => fromJSON3(n));
      let { inputs: ownInputs, ...defaults3 } = json;
      if (ownInputs) {
        inputs = [];
        for (let input of ownInputs) {
          let inputHydrated = { ...input, __proto__: Input3.prototype };
          if (inputHydrated.map) {
            inputHydrated.map = {
              ...inputHydrated.map,
              __proto__: PreviousMap.prototype
            };
          }
          inputs.push(inputHydrated);
        }
      }
      if (defaults3.nodes) {
        defaults3.nodes = json.nodes.map((n) => fromJSON3(n, inputs));
      }
      if (defaults3.source) {
        let { inputId, ...source } = defaults3.source;
        defaults3.source = source;
        if (inputId != null) {
          defaults3.source.input = inputs[inputId];
        }
      }
      if (defaults3.type === "root") {
        return new Root3(defaults3);
      } else if (defaults3.type === "decl") {
        return new Declaration3(defaults3);
      } else if (defaults3.type === "rule") {
        return new Rule3(defaults3);
      } else if (defaults3.type === "comment") {
        return new Comment3(defaults3);
      } else if (defaults3.type === "atrule") {
        return new AtRule3(defaults3);
      } else {
        throw new Error("Unknown node type: " + json.type);
      }
    }
    module2.exports = fromJSON3;
    fromJSON3.default = fromJSON3;
  }
});

// node_modules/tailwindcss/node_modules/postcss/lib/postcss.js
var require_postcss = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss/lib/postcss.js"(exports, module2) {
    "use strict";
    var CssSyntaxError3 = require_css_syntax_error();
    var Declaration3 = require_declaration();
    var LazyResult = require_lazy_result();
    var Container3 = require_container();
    var Processor3 = require_processor();
    var stringify3 = require_stringify();
    var fromJSON3 = require_fromJSON();
    var Document3 = require_document();
    var Warning3 = require_warning();
    var Comment3 = require_comment();
    var AtRule3 = require_at_rule();
    var Result3 = require_result();
    var Input3 = require_input();
    var parse5 = require_parse();
    var list4 = require_list();
    var Rule3 = require_rule();
    var Root3 = require_root();
    var Node3 = require_node();
    function postcss3(...plugins) {
      if (plugins.length === 1 && Array.isArray(plugins[0])) {
        plugins = plugins[0];
      }
      return new Processor3(plugins);
    }
    postcss3.plugin = function plugin3(name, initializer) {
      let warningPrinted = false;
      function creator(...args) {
        if (console && console.warn && !warningPrinted) {
          warningPrinted = true;
          console.warn(
            name + ": postcss.plugin was deprecated. Migration guide:\nhttps://evilmartians.com/chronicles/postcss-8-plugin-migration"
          );
          if (process.env.LANG && process.env.LANG.startsWith("cn")) {
            console.warn(
              name + ": \u91CC\u9762 postcss.plugin \u88AB\u5F03\u7528. \u8FC1\u79FB\u6307\u5357:\nhttps://www.w3ctech.com/topic/2226"
            );
          }
        }
        let transformer = initializer(...args);
        transformer.postcssPlugin = name;
        transformer.postcssVersion = new Processor3().version;
        return transformer;
      }
      let cache2;
      Object.defineProperty(creator, "postcss", {
        get() {
          if (!cache2)
            cache2 = creator();
          return cache2;
        }
      });
      creator.process = function(css, processOpts, pluginOpts) {
        return postcss3([creator(pluginOpts)]).process(css, processOpts);
      };
      return creator;
    };
    postcss3.stringify = stringify3;
    postcss3.parse = parse5;
    postcss3.fromJSON = fromJSON3;
    postcss3.list = list4;
    postcss3.comment = (defaults3) => new Comment3(defaults3);
    postcss3.atRule = (defaults3) => new AtRule3(defaults3);
    postcss3.decl = (defaults3) => new Declaration3(defaults3);
    postcss3.rule = (defaults3) => new Rule3(defaults3);
    postcss3.root = (defaults3) => new Root3(defaults3);
    postcss3.document = (defaults3) => new Document3(defaults3);
    postcss3.CssSyntaxError = CssSyntaxError3;
    postcss3.Declaration = Declaration3;
    postcss3.Container = Container3;
    postcss3.Processor = Processor3;
    postcss3.Document = Document3;
    postcss3.Comment = Comment3;
    postcss3.Warning = Warning3;
    postcss3.AtRule = AtRule3;
    postcss3.Result = Result3;
    postcss3.Input = Input3;
    postcss3.Rule = Rule3;
    postcss3.Root = Root3;
    postcss3.Node = Node3;
    LazyResult.registerPostcss(postcss3);
    module2.exports = postcss3;
    postcss3.default = postcss3;
  }
});

// node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/util/unesc.js
var require_unesc = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/util/unesc.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = unesc;
    function gobbleHex(str) {
      var lower = str.toLowerCase();
      var hex = "";
      var spaceTerminated = false;
      for (var i = 0; i < 6 && lower[i] !== void 0; i++) {
        var code = lower.charCodeAt(i);
        var valid = code >= 97 && code <= 102 || code >= 48 && code <= 57;
        spaceTerminated = code === 32;
        if (!valid) {
          break;
        }
        hex += lower[i];
      }
      if (hex.length === 0) {
        return void 0;
      }
      var codePoint = parseInt(hex, 16);
      var isSurrogate = codePoint >= 55296 && codePoint <= 57343;
      if (isSurrogate || codePoint === 0 || codePoint > 1114111) {
        return ["\uFFFD", hex.length + (spaceTerminated ? 1 : 0)];
      }
      return [String.fromCodePoint(codePoint), hex.length + (spaceTerminated ? 1 : 0)];
    }
    var CONTAINS_ESCAPE = /\\/;
    function unesc(str) {
      var needToProcess = CONTAINS_ESCAPE.test(str);
      if (!needToProcess) {
        return str;
      }
      var ret = "";
      for (var i = 0; i < str.length; i++) {
        if (str[i] === "\\") {
          var gobbled = gobbleHex(str.slice(i + 1, i + 7));
          if (gobbled !== void 0) {
            ret += gobbled[0];
            i += gobbled[1];
            continue;
          }
          if (str[i + 1] === "\\") {
            ret += "\\";
            i++;
            continue;
          }
          if (str.length === i + 1) {
            ret += str[i];
          }
          continue;
        }
        ret += str[i];
      }
      return ret;
    }
    module2.exports = exports.default;
  }
});

// node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/util/getProp.js
var require_getProp = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/util/getProp.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = getProp;
    function getProp(obj) {
      for (var _len = arguments.length, props = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        props[_key - 1] = arguments[_key];
      }
      while (props.length > 0) {
        var prop = props.shift();
        if (!obj[prop]) {
          return void 0;
        }
        obj = obj[prop];
      }
      return obj;
    }
    module2.exports = exports.default;
  }
});

// node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/util/ensureObject.js
var require_ensureObject = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/util/ensureObject.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = ensureObject;
    function ensureObject(obj) {
      for (var _len = arguments.length, props = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        props[_key - 1] = arguments[_key];
      }
      while (props.length > 0) {
        var prop = props.shift();
        if (!obj[prop]) {
          obj[prop] = {};
        }
        obj = obj[prop];
      }
    }
    module2.exports = exports.default;
  }
});

// node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/util/stripComments.js
var require_stripComments = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/util/stripComments.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = stripComments;
    function stripComments(str) {
      var s = "";
      var commentStart = str.indexOf("/*");
      var lastEnd = 0;
      while (commentStart >= 0) {
        s = s + str.slice(lastEnd, commentStart);
        var commentEnd = str.indexOf("*/", commentStart + 2);
        if (commentEnd < 0) {
          return s;
        }
        lastEnd = commentEnd + 2;
        commentStart = str.indexOf("/*", lastEnd);
      }
      s = s + str.slice(lastEnd);
      return s;
    }
    module2.exports = exports.default;
  }
});

// node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/util/index.js
var require_util = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/util/index.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.unesc = exports.stripComments = exports.getProp = exports.ensureObject = void 0;
    var _unesc = _interopRequireDefault(require_unesc());
    exports.unesc = _unesc["default"];
    var _getProp = _interopRequireDefault(require_getProp());
    exports.getProp = _getProp["default"];
    var _ensureObject = _interopRequireDefault(require_ensureObject());
    exports.ensureObject = _ensureObject["default"];
    var _stripComments = _interopRequireDefault(require_stripComments());
    exports.stripComments = _stripComments["default"];
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
  }
});

// node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/selectors/node.js
var require_node2 = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/selectors/node.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = void 0;
    var _util = require_util();
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    var cloneNode = function cloneNode2(obj, parent) {
      if (typeof obj !== "object" || obj === null) {
        return obj;
      }
      var cloned = new obj.constructor();
      for (var i in obj) {
        if (!obj.hasOwnProperty(i)) {
          continue;
        }
        var value2 = obj[i];
        var type = typeof value2;
        if (i === "parent" && type === "object") {
          if (parent) {
            cloned[i] = parent;
          }
        } else if (value2 instanceof Array) {
          cloned[i] = value2.map(function(j) {
            return cloneNode2(j, cloned);
          });
        } else {
          cloned[i] = cloneNode2(value2, cloned);
        }
      }
      return cloned;
    };
    var Node3 = /* @__PURE__ */ function() {
      function Node4(opts) {
        if (opts === void 0) {
          opts = {};
        }
        Object.assign(this, opts);
        this.spaces = this.spaces || {};
        this.spaces.before = this.spaces.before || "";
        this.spaces.after = this.spaces.after || "";
      }
      var _proto = Node4.prototype;
      _proto.remove = function remove() {
        if (this.parent) {
          this.parent.removeChild(this);
        }
        this.parent = void 0;
        return this;
      };
      _proto.replaceWith = function replaceWith() {
        if (this.parent) {
          for (var index3 in arguments) {
            this.parent.insertBefore(this, arguments[index3]);
          }
          this.remove();
        }
        return this;
      };
      _proto.next = function next() {
        return this.parent.at(this.parent.index(this) + 1);
      };
      _proto.prev = function prev() {
        return this.parent.at(this.parent.index(this) - 1);
      };
      _proto.clone = function clone(overrides) {
        if (overrides === void 0) {
          overrides = {};
        }
        var cloned = cloneNode(this);
        for (var name in overrides) {
          cloned[name] = overrides[name];
        }
        return cloned;
      };
      _proto.appendToPropertyAndEscape = function appendToPropertyAndEscape(name, value2, valueEscaped) {
        if (!this.raws) {
          this.raws = {};
        }
        var originalValue = this[name];
        var originalEscaped = this.raws[name];
        this[name] = originalValue + value2;
        if (originalEscaped || valueEscaped !== value2) {
          this.raws[name] = (originalEscaped || originalValue) + valueEscaped;
        } else {
          delete this.raws[name];
        }
      };
      _proto.setPropertyAndEscape = function setPropertyAndEscape(name, value2, valueEscaped) {
        if (!this.raws) {
          this.raws = {};
        }
        this[name] = value2;
        this.raws[name] = valueEscaped;
      };
      _proto.setPropertyWithoutEscape = function setPropertyWithoutEscape(name, value2) {
        this[name] = value2;
        if (this.raws) {
          delete this.raws[name];
        }
      };
      _proto.isAtPosition = function isAtPosition(line, column) {
        if (this.source && this.source.start && this.source.end) {
          if (this.source.start.line > line) {
            return false;
          }
          if (this.source.end.line < line) {
            return false;
          }
          if (this.source.start.line === line && this.source.start.column > column) {
            return false;
          }
          if (this.source.end.line === line && this.source.end.column < column) {
            return false;
          }
          return true;
        }
        return void 0;
      };
      _proto.stringifyProperty = function stringifyProperty(name) {
        return this.raws && this.raws[name] || this[name];
      };
      _proto.valueToString = function valueToString() {
        return String(this.stringifyProperty("value"));
      };
      _proto.toString = function toString() {
        return [this.rawSpaceBefore, this.valueToString(), this.rawSpaceAfter].join("");
      };
      _createClass(Node4, [{
        key: "rawSpaceBefore",
        get: function get() {
          var rawSpace = this.raws && this.raws.spaces && this.raws.spaces.before;
          if (rawSpace === void 0) {
            rawSpace = this.spaces && this.spaces.before;
          }
          return rawSpace || "";
        },
        set: function set(raw) {
          (0, _util.ensureObject)(this, "raws", "spaces");
          this.raws.spaces.before = raw;
        }
      }, {
        key: "rawSpaceAfter",
        get: function get() {
          var rawSpace = this.raws && this.raws.spaces && this.raws.spaces.after;
          if (rawSpace === void 0) {
            rawSpace = this.spaces.after;
          }
          return rawSpace || "";
        },
        set: function set(raw) {
          (0, _util.ensureObject)(this, "raws", "spaces");
          this.raws.spaces.after = raw;
        }
      }]);
      return Node4;
    }();
    exports["default"] = Node3;
    module2.exports = exports.default;
  }
});

// node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/selectors/types.js
var require_types = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/selectors/types.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.UNIVERSAL = exports.TAG = exports.STRING = exports.SELECTOR = exports.ROOT = exports.PSEUDO = exports.NESTING = exports.ID = exports.COMMENT = exports.COMBINATOR = exports.CLASS = exports.ATTRIBUTE = void 0;
    var TAG = "tag";
    exports.TAG = TAG;
    var STRING = "string";
    exports.STRING = STRING;
    var SELECTOR = "selector";
    exports.SELECTOR = SELECTOR;
    var ROOT = "root";
    exports.ROOT = ROOT;
    var PSEUDO = "pseudo";
    exports.PSEUDO = PSEUDO;
    var NESTING = "nesting";
    exports.NESTING = NESTING;
    var ID = "id";
    exports.ID = ID;
    var COMMENT = "comment";
    exports.COMMENT = COMMENT;
    var COMBINATOR = "combinator";
    exports.COMBINATOR = COMBINATOR;
    var CLASS = "class";
    exports.CLASS = CLASS;
    var ATTRIBUTE = "attribute";
    exports.ATTRIBUTE = ATTRIBUTE;
    var UNIVERSAL = "universal";
    exports.UNIVERSAL = UNIVERSAL;
  }
});

// node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/selectors/container.js
var require_container2 = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/selectors/container.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = void 0;
    var _node = _interopRequireDefault(require_node2());
    var types2 = _interopRequireWildcard(require_types());
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache2 = _getRequireWildcardCache(nodeInterop);
      if (cache2 && cache2.has(obj)) {
        return cache2.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache2) {
        cache2.set(obj, newObj);
      }
      return newObj;
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _createForOfIteratorHelperLoose(o, allowArrayLike) {
      var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
      if (it)
        return (it = it.call(o)).next.bind(it);
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it)
          o = it;
        var i = 0;
        return function() {
          if (i >= o.length)
            return { done: true };
          return { done: false, value: o[i++] };
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    var Container3 = /* @__PURE__ */ function(_Node) {
      _inheritsLoose(Container4, _Node);
      function Container4(opts) {
        var _this;
        _this = _Node.call(this, opts) || this;
        if (!_this.nodes) {
          _this.nodes = [];
        }
        return _this;
      }
      var _proto = Container4.prototype;
      _proto.append = function append(selector) {
        selector.parent = this;
        this.nodes.push(selector);
        return this;
      };
      _proto.prepend = function prepend(selector) {
        selector.parent = this;
        this.nodes.unshift(selector);
        return this;
      };
      _proto.at = function at(index3) {
        return this.nodes[index3];
      };
      _proto.index = function index3(child) {
        if (typeof child === "number") {
          return child;
        }
        return this.nodes.indexOf(child);
      };
      _proto.removeChild = function removeChild(child) {
        child = this.index(child);
        this.at(child).parent = void 0;
        this.nodes.splice(child, 1);
        var index3;
        for (var id in this.indexes) {
          index3 = this.indexes[id];
          if (index3 >= child) {
            this.indexes[id] = index3 - 1;
          }
        }
        return this;
      };
      _proto.removeAll = function removeAll() {
        for (var _iterator = _createForOfIteratorHelperLoose(this.nodes), _step; !(_step = _iterator()).done; ) {
          var node = _step.value;
          node.parent = void 0;
        }
        this.nodes = [];
        return this;
      };
      _proto.empty = function empty() {
        return this.removeAll();
      };
      _proto.insertAfter = function insertAfter(oldNode, newNode) {
        newNode.parent = this;
        var oldIndex = this.index(oldNode);
        this.nodes.splice(oldIndex + 1, 0, newNode);
        newNode.parent = this;
        var index3;
        for (var id in this.indexes) {
          index3 = this.indexes[id];
          if (oldIndex <= index3) {
            this.indexes[id] = index3 + 1;
          }
        }
        return this;
      };
      _proto.insertBefore = function insertBefore(oldNode, newNode) {
        newNode.parent = this;
        var oldIndex = this.index(oldNode);
        this.nodes.splice(oldIndex, 0, newNode);
        newNode.parent = this;
        var index3;
        for (var id in this.indexes) {
          index3 = this.indexes[id];
          if (index3 <= oldIndex) {
            this.indexes[id] = index3 + 1;
          }
        }
        return this;
      };
      _proto._findChildAtPosition = function _findChildAtPosition(line, col) {
        var found = void 0;
        this.each(function(node) {
          if (node.atPosition) {
            var foundChild = node.atPosition(line, col);
            if (foundChild) {
              found = foundChild;
              return false;
            }
          } else if (node.isAtPosition(line, col)) {
            found = node;
            return false;
          }
        });
        return found;
      };
      _proto.atPosition = function atPosition(line, col) {
        if (this.isAtPosition(line, col)) {
          return this._findChildAtPosition(line, col) || this;
        } else {
          return void 0;
        }
      };
      _proto._inferEndPosition = function _inferEndPosition() {
        if (this.last && this.last.source && this.last.source.end) {
          this.source = this.source || {};
          this.source.end = this.source.end || {};
          Object.assign(this.source.end, this.last.source.end);
        }
      };
      _proto.each = function each(callback) {
        if (!this.lastEach) {
          this.lastEach = 0;
        }
        if (!this.indexes) {
          this.indexes = {};
        }
        this.lastEach++;
        var id = this.lastEach;
        this.indexes[id] = 0;
        if (!this.length) {
          return void 0;
        }
        var index3, result;
        while (this.indexes[id] < this.length) {
          index3 = this.indexes[id];
          result = callback(this.at(index3), index3);
          if (result === false) {
            break;
          }
          this.indexes[id] += 1;
        }
        delete this.indexes[id];
        if (result === false) {
          return false;
        }
      };
      _proto.walk = function walk(callback) {
        return this.each(function(node, i) {
          var result = callback(node, i);
          if (result !== false && node.length) {
            result = node.walk(callback);
          }
          if (result === false) {
            return false;
          }
        });
      };
      _proto.walkAttributes = function walkAttributes(callback) {
        var _this2 = this;
        return this.walk(function(selector) {
          if (selector.type === types2.ATTRIBUTE) {
            return callback.call(_this2, selector);
          }
        });
      };
      _proto.walkClasses = function walkClasses(callback) {
        var _this3 = this;
        return this.walk(function(selector) {
          if (selector.type === types2.CLASS) {
            return callback.call(_this3, selector);
          }
        });
      };
      _proto.walkCombinators = function walkCombinators(callback) {
        var _this4 = this;
        return this.walk(function(selector) {
          if (selector.type === types2.COMBINATOR) {
            return callback.call(_this4, selector);
          }
        });
      };
      _proto.walkComments = function walkComments(callback) {
        var _this5 = this;
        return this.walk(function(selector) {
          if (selector.type === types2.COMMENT) {
            return callback.call(_this5, selector);
          }
        });
      };
      _proto.walkIds = function walkIds(callback) {
        var _this6 = this;
        return this.walk(function(selector) {
          if (selector.type === types2.ID) {
            return callback.call(_this6, selector);
          }
        });
      };
      _proto.walkNesting = function walkNesting(callback) {
        var _this7 = this;
        return this.walk(function(selector) {
          if (selector.type === types2.NESTING) {
            return callback.call(_this7, selector);
          }
        });
      };
      _proto.walkPseudos = function walkPseudos(callback) {
        var _this8 = this;
        return this.walk(function(selector) {
          if (selector.type === types2.PSEUDO) {
            return callback.call(_this8, selector);
          }
        });
      };
      _proto.walkTags = function walkTags(callback) {
        var _this9 = this;
        return this.walk(function(selector) {
          if (selector.type === types2.TAG) {
            return callback.call(_this9, selector);
          }
        });
      };
      _proto.walkUniversals = function walkUniversals(callback) {
        var _this10 = this;
        return this.walk(function(selector) {
          if (selector.type === types2.UNIVERSAL) {
            return callback.call(_this10, selector);
          }
        });
      };
      _proto.split = function split(callback) {
        var _this11 = this;
        var current = [];
        return this.reduce(function(memo, node, index3) {
          var split2 = callback.call(_this11, node);
          current.push(node);
          if (split2) {
            memo.push(current);
            current = [];
          } else if (index3 === _this11.length - 1) {
            memo.push(current);
          }
          return memo;
        }, []);
      };
      _proto.map = function map(callback) {
        return this.nodes.map(callback);
      };
      _proto.reduce = function reduce(callback, memo) {
        return this.nodes.reduce(callback, memo);
      };
      _proto.every = function every(callback) {
        return this.nodes.every(callback);
      };
      _proto.some = function some(callback) {
        return this.nodes.some(callback);
      };
      _proto.filter = function filter(callback) {
        return this.nodes.filter(callback);
      };
      _proto.sort = function sort(callback) {
        return this.nodes.sort(callback);
      };
      _proto.toString = function toString() {
        return this.map(String).join("");
      };
      _createClass(Container4, [{
        key: "first",
        get: function get() {
          return this.at(0);
        }
      }, {
        key: "last",
        get: function get() {
          return this.at(this.length - 1);
        }
      }, {
        key: "length",
        get: function get() {
          return this.nodes.length;
        }
      }]);
      return Container4;
    }(_node["default"]);
    exports["default"] = Container3;
    module2.exports = exports.default;
  }
});

// node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/selectors/root.js
var require_root2 = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/selectors/root.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = void 0;
    var _container = _interopRequireDefault(require_container2());
    var _types = require_types();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    var Root3 = /* @__PURE__ */ function(_Container) {
      _inheritsLoose(Root4, _Container);
      function Root4(opts) {
        var _this;
        _this = _Container.call(this, opts) || this;
        _this.type = _types.ROOT;
        return _this;
      }
      var _proto = Root4.prototype;
      _proto.toString = function toString() {
        var str = this.reduce(function(memo, selector) {
          memo.push(String(selector));
          return memo;
        }, []).join(",");
        return this.trailingComma ? str + "," : str;
      };
      _proto.error = function error(message, options) {
        if (this._error) {
          return this._error(message, options);
        } else {
          return new Error(message);
        }
      };
      _createClass(Root4, [{
        key: "errorGenerator",
        set: function set(handler) {
          this._error = handler;
        }
      }]);
      return Root4;
    }(_container["default"]);
    exports["default"] = Root3;
    module2.exports = exports.default;
  }
});

// node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/selectors/selector.js
var require_selector = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/selectors/selector.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = void 0;
    var _container = _interopRequireDefault(require_container2());
    var _types = require_types();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    var Selector = /* @__PURE__ */ function(_Container) {
      _inheritsLoose(Selector2, _Container);
      function Selector2(opts) {
        var _this;
        _this = _Container.call(this, opts) || this;
        _this.type = _types.SELECTOR;
        return _this;
      }
      return Selector2;
    }(_container["default"]);
    exports["default"] = Selector;
    module2.exports = exports.default;
  }
});

// node_modules/cssesc/cssesc.js
var require_cssesc = __commonJS({
  "node_modules/cssesc/cssesc.js"(exports, module2) {
    "use strict";
    var object = {};
    var hasOwnProperty = object.hasOwnProperty;
    var merge = function merge2(options, defaults3) {
      if (!options) {
        return defaults3;
      }
      var result = {};
      for (var key in defaults3) {
        result[key] = hasOwnProperty.call(options, key) ? options[key] : defaults3[key];
      }
      return result;
    };
    var regexAnySingleEscape = /[ -,\.\/:-@\[-\^`\{-~]/;
    var regexSingleEscape = /[ -,\.\/:-@\[\]\^`\{-~]/;
    var regexExcessiveSpaces = /(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g;
    var cssesc = function cssesc2(string, options) {
      options = merge(options, cssesc2.options);
      if (options.quotes != "single" && options.quotes != "double") {
        options.quotes = "single";
      }
      var quote = options.quotes == "double" ? '"' : "'";
      var isIdentifier = options.isIdentifier;
      var firstChar = string.charAt(0);
      var output = "";
      var counter = 0;
      var length2 = string.length;
      while (counter < length2) {
        var character = string.charAt(counter++);
        var codePoint = character.charCodeAt();
        var value2 = void 0;
        if (codePoint < 32 || codePoint > 126) {
          if (codePoint >= 55296 && codePoint <= 56319 && counter < length2) {
            var extra = string.charCodeAt(counter++);
            if ((extra & 64512) == 56320) {
              codePoint = ((codePoint & 1023) << 10) + (extra & 1023) + 65536;
            } else {
              counter--;
            }
          }
          value2 = "\\" + codePoint.toString(16).toUpperCase() + " ";
        } else {
          if (options.escapeEverything) {
            if (regexAnySingleEscape.test(character)) {
              value2 = "\\" + character;
            } else {
              value2 = "\\" + codePoint.toString(16).toUpperCase() + " ";
            }
          } else if (/[\t\n\f\r\x0B]/.test(character)) {
            value2 = "\\" + codePoint.toString(16).toUpperCase() + " ";
          } else if (character == "\\" || !isIdentifier && (character == '"' && quote == character || character == "'" && quote == character) || isIdentifier && regexSingleEscape.test(character)) {
            value2 = "\\" + character;
          } else {
            value2 = character;
          }
        }
        output += value2;
      }
      if (isIdentifier) {
        if (/^-[-\d]/.test(output)) {
          output = "\\-" + output.slice(1);
        } else if (/\d/.test(firstChar)) {
          output = "\\3" + firstChar + " " + output.slice(1);
        }
      }
      output = output.replace(regexExcessiveSpaces, function($0, $1, $2) {
        if ($1 && $1.length % 2) {
          return $0;
        }
        return ($1 || "") + $2;
      });
      if (!isIdentifier && options.wrap) {
        return quote + output + quote;
      }
      return output;
    };
    cssesc.options = {
      "escapeEverything": false,
      "isIdentifier": false,
      "quotes": "single",
      "wrap": false
    };
    cssesc.version = "3.0.0";
    module2.exports = cssesc;
  }
});

// node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/selectors/className.js
var require_className = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/selectors/className.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = void 0;
    var _cssesc = _interopRequireDefault(require_cssesc());
    var _util = require_util();
    var _node = _interopRequireDefault(require_node2());
    var _types = require_types();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    var ClassName = /* @__PURE__ */ function(_Node) {
      _inheritsLoose(ClassName2, _Node);
      function ClassName2(opts) {
        var _this;
        _this = _Node.call(this, opts) || this;
        _this.type = _types.CLASS;
        _this._constructed = true;
        return _this;
      }
      var _proto = ClassName2.prototype;
      _proto.valueToString = function valueToString() {
        return "." + _Node.prototype.valueToString.call(this);
      };
      _createClass(ClassName2, [{
        key: "value",
        get: function get() {
          return this._value;
        },
        set: function set(v) {
          if (this._constructed) {
            var escaped = (0, _cssesc["default"])(v, {
              isIdentifier: true
            });
            if (escaped !== v) {
              (0, _util.ensureObject)(this, "raws");
              this.raws.value = escaped;
            } else if (this.raws) {
              delete this.raws.value;
            }
          }
          this._value = v;
        }
      }]);
      return ClassName2;
    }(_node["default"]);
    exports["default"] = ClassName;
    module2.exports = exports.default;
  }
});

// node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/selectors/comment.js
var require_comment2 = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/selectors/comment.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = void 0;
    var _node = _interopRequireDefault(require_node2());
    var _types = require_types();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    var Comment3 = /* @__PURE__ */ function(_Node) {
      _inheritsLoose(Comment4, _Node);
      function Comment4(opts) {
        var _this;
        _this = _Node.call(this, opts) || this;
        _this.type = _types.COMMENT;
        return _this;
      }
      return Comment4;
    }(_node["default"]);
    exports["default"] = Comment3;
    module2.exports = exports.default;
  }
});

// node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/selectors/id.js
var require_id = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/selectors/id.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = void 0;
    var _node = _interopRequireDefault(require_node2());
    var _types = require_types();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    var ID = /* @__PURE__ */ function(_Node) {
      _inheritsLoose(ID2, _Node);
      function ID2(opts) {
        var _this;
        _this = _Node.call(this, opts) || this;
        _this.type = _types.ID;
        return _this;
      }
      var _proto = ID2.prototype;
      _proto.valueToString = function valueToString() {
        return "#" + _Node.prototype.valueToString.call(this);
      };
      return ID2;
    }(_node["default"]);
    exports["default"] = ID;
    module2.exports = exports.default;
  }
});

// node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/selectors/namespace.js
var require_namespace = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/selectors/namespace.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = void 0;
    var _cssesc = _interopRequireDefault(require_cssesc());
    var _util = require_util();
    var _node = _interopRequireDefault(require_node2());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    var Namespace = /* @__PURE__ */ function(_Node) {
      _inheritsLoose(Namespace2, _Node);
      function Namespace2() {
        return _Node.apply(this, arguments) || this;
      }
      var _proto = Namespace2.prototype;
      _proto.qualifiedName = function qualifiedName(value2) {
        if (this.namespace) {
          return this.namespaceString + "|" + value2;
        } else {
          return value2;
        }
      };
      _proto.valueToString = function valueToString() {
        return this.qualifiedName(_Node.prototype.valueToString.call(this));
      };
      _createClass(Namespace2, [{
        key: "namespace",
        get: function get() {
          return this._namespace;
        },
        set: function set(namespace) {
          if (namespace === true || namespace === "*" || namespace === "&") {
            this._namespace = namespace;
            if (this.raws) {
              delete this.raws.namespace;
            }
            return;
          }
          var escaped = (0, _cssesc["default"])(namespace, {
            isIdentifier: true
          });
          this._namespace = namespace;
          if (escaped !== namespace) {
            (0, _util.ensureObject)(this, "raws");
            this.raws.namespace = escaped;
          } else if (this.raws) {
            delete this.raws.namespace;
          }
        }
      }, {
        key: "ns",
        get: function get() {
          return this._namespace;
        },
        set: function set(namespace) {
          this.namespace = namespace;
        }
      }, {
        key: "namespaceString",
        get: function get() {
          if (this.namespace) {
            var ns = this.stringifyProperty("namespace");
            if (ns === true) {
              return "";
            } else {
              return ns;
            }
          } else {
            return "";
          }
        }
      }]);
      return Namespace2;
    }(_node["default"]);
    exports["default"] = Namespace;
    module2.exports = exports.default;
  }
});

// node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/selectors/tag.js
var require_tag = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/selectors/tag.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = void 0;
    var _namespace = _interopRequireDefault(require_namespace());
    var _types = require_types();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    var Tag = /* @__PURE__ */ function(_Namespace) {
      _inheritsLoose(Tag2, _Namespace);
      function Tag2(opts) {
        var _this;
        _this = _Namespace.call(this, opts) || this;
        _this.type = _types.TAG;
        return _this;
      }
      return Tag2;
    }(_namespace["default"]);
    exports["default"] = Tag;
    module2.exports = exports.default;
  }
});

// node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/selectors/string.js
var require_string = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/selectors/string.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = void 0;
    var _node = _interopRequireDefault(require_node2());
    var _types = require_types();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    var String2 = /* @__PURE__ */ function(_Node) {
      _inheritsLoose(String3, _Node);
      function String3(opts) {
        var _this;
        _this = _Node.call(this, opts) || this;
        _this.type = _types.STRING;
        return _this;
      }
      return String3;
    }(_node["default"]);
    exports["default"] = String2;
    module2.exports = exports.default;
  }
});

// node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/selectors/pseudo.js
var require_pseudo = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/selectors/pseudo.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = void 0;
    var _container = _interopRequireDefault(require_container2());
    var _types = require_types();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    var Pseudo = /* @__PURE__ */ function(_Container) {
      _inheritsLoose(Pseudo2, _Container);
      function Pseudo2(opts) {
        var _this;
        _this = _Container.call(this, opts) || this;
        _this.type = _types.PSEUDO;
        return _this;
      }
      var _proto = Pseudo2.prototype;
      _proto.toString = function toString() {
        var params = this.length ? "(" + this.map(String).join(",") + ")" : "";
        return [this.rawSpaceBefore, this.stringifyProperty("value"), params, this.rawSpaceAfter].join("");
      };
      return Pseudo2;
    }(_container["default"]);
    exports["default"] = Pseudo;
    module2.exports = exports.default;
  }
});

// node_modules/util-deprecate/browser.js
var require_browser = __commonJS({
  "node_modules/util-deprecate/browser.js"(exports, module2) {
    module2.exports = deprecate;
    function deprecate(fn, msg) {
      if (config("noDeprecation")) {
        return fn;
      }
      var warned = false;
      function deprecated() {
        if (!warned) {
          if (config("throwDeprecation")) {
            throw new Error(msg);
          } else if (config("traceDeprecation")) {
            console.trace(msg);
          } else {
            console.warn(msg);
          }
          warned = true;
        }
        return fn.apply(this, arguments);
      }
      return deprecated;
    }
    function config(name) {
      try {
        if (!global.localStorage)
          return false;
      } catch (_) {
        return false;
      }
      var val = global.localStorage[name];
      if (null == val)
        return false;
      return String(val).toLowerCase() === "true";
    }
  }
});

// node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/selectors/attribute.js
var require_attribute = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/selectors/attribute.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = void 0;
    exports.unescapeValue = unescapeValue;
    var _cssesc = _interopRequireDefault(require_cssesc());
    var _unesc = _interopRequireDefault(require_unesc());
    var _namespace = _interopRequireDefault(require_namespace());
    var _types = require_types();
    var _CSSESC_QUOTE_OPTIONS;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    var deprecate = require_browser();
    var WRAPPED_IN_QUOTES = /^('|")([^]*)\1$/;
    var warnOfDeprecatedValueAssignment = deprecate(function() {
    }, "Assigning an attribute a value containing characters that might need to be escaped is deprecated. Call attribute.setValue() instead.");
    var warnOfDeprecatedQuotedAssignment = deprecate(function() {
    }, "Assigning attr.quoted is deprecated and has no effect. Assign to attr.quoteMark instead.");
    var warnOfDeprecatedConstructor = deprecate(function() {
    }, "Constructing an Attribute selector with a value without specifying quoteMark is deprecated. Note: The value should be unescaped now.");
    function unescapeValue(value2) {
      var deprecatedUsage = false;
      var quoteMark = null;
      var unescaped = value2;
      var m = unescaped.match(WRAPPED_IN_QUOTES);
      if (m) {
        quoteMark = m[1];
        unescaped = m[2];
      }
      unescaped = (0, _unesc["default"])(unescaped);
      if (unescaped !== value2) {
        deprecatedUsage = true;
      }
      return {
        deprecatedUsage,
        unescaped,
        quoteMark
      };
    }
    function handleDeprecatedContructorOpts(opts) {
      if (opts.quoteMark !== void 0) {
        return opts;
      }
      if (opts.value === void 0) {
        return opts;
      }
      warnOfDeprecatedConstructor();
      var _unescapeValue = unescapeValue(opts.value), quoteMark = _unescapeValue.quoteMark, unescaped = _unescapeValue.unescaped;
      if (!opts.raws) {
        opts.raws = {};
      }
      if (opts.raws.value === void 0) {
        opts.raws.value = opts.value;
      }
      opts.value = unescaped;
      opts.quoteMark = quoteMark;
      return opts;
    }
    var Attribute = /* @__PURE__ */ function(_Namespace) {
      _inheritsLoose(Attribute2, _Namespace);
      function Attribute2(opts) {
        var _this;
        if (opts === void 0) {
          opts = {};
        }
        _this = _Namespace.call(this, handleDeprecatedContructorOpts(opts)) || this;
        _this.type = _types.ATTRIBUTE;
        _this.raws = _this.raws || {};
        Object.defineProperty(_this.raws, "unquoted", {
          get: deprecate(function() {
            return _this.value;
          }, "attr.raws.unquoted is deprecated. Call attr.value instead."),
          set: deprecate(function() {
            return _this.value;
          }, "Setting attr.raws.unquoted is deprecated and has no effect. attr.value is unescaped by default now.")
        });
        _this._constructed = true;
        return _this;
      }
      var _proto = Attribute2.prototype;
      _proto.getQuotedValue = function getQuotedValue(options) {
        if (options === void 0) {
          options = {};
        }
        var quoteMark = this._determineQuoteMark(options);
        var cssescopts = CSSESC_QUOTE_OPTIONS[quoteMark];
        var escaped = (0, _cssesc["default"])(this._value, cssescopts);
        return escaped;
      };
      _proto._determineQuoteMark = function _determineQuoteMark(options) {
        return options.smart ? this.smartQuoteMark(options) : this.preferredQuoteMark(options);
      };
      _proto.setValue = function setValue(value2, options) {
        if (options === void 0) {
          options = {};
        }
        this._value = value2;
        this._quoteMark = this._determineQuoteMark(options);
        this._syncRawValue();
      };
      _proto.smartQuoteMark = function smartQuoteMark(options) {
        var v = this.value;
        var numSingleQuotes = v.replace(/[^']/g, "").length;
        var numDoubleQuotes = v.replace(/[^"]/g, "").length;
        if (numSingleQuotes + numDoubleQuotes === 0) {
          var escaped = (0, _cssesc["default"])(v, {
            isIdentifier: true
          });
          if (escaped === v) {
            return Attribute2.NO_QUOTE;
          } else {
            var pref = this.preferredQuoteMark(options);
            if (pref === Attribute2.NO_QUOTE) {
              var quote = this.quoteMark || options.quoteMark || Attribute2.DOUBLE_QUOTE;
              var opts = CSSESC_QUOTE_OPTIONS[quote];
              var quoteValue = (0, _cssesc["default"])(v, opts);
              if (quoteValue.length < escaped.length) {
                return quote;
              }
            }
            return pref;
          }
        } else if (numDoubleQuotes === numSingleQuotes) {
          return this.preferredQuoteMark(options);
        } else if (numDoubleQuotes < numSingleQuotes) {
          return Attribute2.DOUBLE_QUOTE;
        } else {
          return Attribute2.SINGLE_QUOTE;
        }
      };
      _proto.preferredQuoteMark = function preferredQuoteMark(options) {
        var quoteMark = options.preferCurrentQuoteMark ? this.quoteMark : options.quoteMark;
        if (quoteMark === void 0) {
          quoteMark = options.preferCurrentQuoteMark ? options.quoteMark : this.quoteMark;
        }
        if (quoteMark === void 0) {
          quoteMark = Attribute2.DOUBLE_QUOTE;
        }
        return quoteMark;
      };
      _proto._syncRawValue = function _syncRawValue() {
        var rawValue = (0, _cssesc["default"])(this._value, CSSESC_QUOTE_OPTIONS[this.quoteMark]);
        if (rawValue === this._value) {
          if (this.raws) {
            delete this.raws.value;
          }
        } else {
          this.raws.value = rawValue;
        }
      };
      _proto._handleEscapes = function _handleEscapes(prop, value2) {
        if (this._constructed) {
          var escaped = (0, _cssesc["default"])(value2, {
            isIdentifier: true
          });
          if (escaped !== value2) {
            this.raws[prop] = escaped;
          } else {
            delete this.raws[prop];
          }
        }
      };
      _proto._spacesFor = function _spacesFor(name) {
        var attrSpaces = {
          before: "",
          after: ""
        };
        var spaces = this.spaces[name] || {};
        var rawSpaces = this.raws.spaces && this.raws.spaces[name] || {};
        return Object.assign(attrSpaces, spaces, rawSpaces);
      };
      _proto._stringFor = function _stringFor(name, spaceName, concat) {
        if (spaceName === void 0) {
          spaceName = name;
        }
        if (concat === void 0) {
          concat = defaultAttrConcat;
        }
        var attrSpaces = this._spacesFor(spaceName);
        return concat(this.stringifyProperty(name), attrSpaces);
      };
      _proto.offsetOf = function offsetOf(name) {
        var count = 1;
        var attributeSpaces = this._spacesFor("attribute");
        count += attributeSpaces.before.length;
        if (name === "namespace" || name === "ns") {
          return this.namespace ? count : -1;
        }
        if (name === "attributeNS") {
          return count;
        }
        count += this.namespaceString.length;
        if (this.namespace) {
          count += 1;
        }
        if (name === "attribute") {
          return count;
        }
        count += this.stringifyProperty("attribute").length;
        count += attributeSpaces.after.length;
        var operatorSpaces = this._spacesFor("operator");
        count += operatorSpaces.before.length;
        var operator = this.stringifyProperty("operator");
        if (name === "operator") {
          return operator ? count : -1;
        }
        count += operator.length;
        count += operatorSpaces.after.length;
        var valueSpaces = this._spacesFor("value");
        count += valueSpaces.before.length;
        var value2 = this.stringifyProperty("value");
        if (name === "value") {
          return value2 ? count : -1;
        }
        count += value2.length;
        count += valueSpaces.after.length;
        var insensitiveSpaces = this._spacesFor("insensitive");
        count += insensitiveSpaces.before.length;
        if (name === "insensitive") {
          return this.insensitive ? count : -1;
        }
        return -1;
      };
      _proto.toString = function toString() {
        var _this2 = this;
        var selector = [this.rawSpaceBefore, "["];
        selector.push(this._stringFor("qualifiedAttribute", "attribute"));
        if (this.operator && (this.value || this.value === "")) {
          selector.push(this._stringFor("operator"));
          selector.push(this._stringFor("value"));
          selector.push(this._stringFor("insensitiveFlag", "insensitive", function(attrValue, attrSpaces) {
            if (attrValue.length > 0 && !_this2.quoted && attrSpaces.before.length === 0 && !(_this2.spaces.value && _this2.spaces.value.after)) {
              attrSpaces.before = " ";
            }
            return defaultAttrConcat(attrValue, attrSpaces);
          }));
        }
        selector.push("]");
        selector.push(this.rawSpaceAfter);
        return selector.join("");
      };
      _createClass(Attribute2, [{
        key: "quoted",
        get: function get() {
          var qm = this.quoteMark;
          return qm === "'" || qm === '"';
        },
        set: function set(value2) {
          warnOfDeprecatedQuotedAssignment();
        }
      }, {
        key: "quoteMark",
        get: function get() {
          return this._quoteMark;
        },
        set: function set(quoteMark) {
          if (!this._constructed) {
            this._quoteMark = quoteMark;
            return;
          }
          if (this._quoteMark !== quoteMark) {
            this._quoteMark = quoteMark;
            this._syncRawValue();
          }
        }
      }, {
        key: "qualifiedAttribute",
        get: function get() {
          return this.qualifiedName(this.raws.attribute || this.attribute);
        }
      }, {
        key: "insensitiveFlag",
        get: function get() {
          return this.insensitive ? "i" : "";
        }
      }, {
        key: "value",
        get: function get() {
          return this._value;
        },
        set: function set(v) {
          if (this._constructed) {
            var _unescapeValue2 = unescapeValue(v), deprecatedUsage = _unescapeValue2.deprecatedUsage, unescaped = _unescapeValue2.unescaped, quoteMark = _unescapeValue2.quoteMark;
            if (deprecatedUsage) {
              warnOfDeprecatedValueAssignment();
            }
            if (unescaped === this._value && quoteMark === this._quoteMark) {
              return;
            }
            this._value = unescaped;
            this._quoteMark = quoteMark;
            this._syncRawValue();
          } else {
            this._value = v;
          }
        }
      }, {
        key: "insensitive",
        get: function get() {
          return this._insensitive;
        },
        set: function set(insensitive) {
          if (!insensitive) {
            this._insensitive = false;
            if (this.raws && (this.raws.insensitiveFlag === "I" || this.raws.insensitiveFlag === "i")) {
              this.raws.insensitiveFlag = void 0;
            }
          }
          this._insensitive = insensitive;
        }
      }, {
        key: "attribute",
        get: function get() {
          return this._attribute;
        },
        set: function set(name) {
          this._handleEscapes("attribute", name);
          this._attribute = name;
        }
      }]);
      return Attribute2;
    }(_namespace["default"]);
    exports["default"] = Attribute;
    Attribute.NO_QUOTE = null;
    Attribute.SINGLE_QUOTE = "'";
    Attribute.DOUBLE_QUOTE = '"';
    var CSSESC_QUOTE_OPTIONS = (_CSSESC_QUOTE_OPTIONS = {
      "'": {
        quotes: "single",
        wrap: true
      },
      '"': {
        quotes: "double",
        wrap: true
      }
    }, _CSSESC_QUOTE_OPTIONS[null] = {
      isIdentifier: true
    }, _CSSESC_QUOTE_OPTIONS);
    function defaultAttrConcat(attrValue, attrSpaces) {
      return "" + attrSpaces.before + attrValue + attrSpaces.after;
    }
  }
});

// node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/selectors/universal.js
var require_universal = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/selectors/universal.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = void 0;
    var _namespace = _interopRequireDefault(require_namespace());
    var _types = require_types();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    var Universal = /* @__PURE__ */ function(_Namespace) {
      _inheritsLoose(Universal2, _Namespace);
      function Universal2(opts) {
        var _this;
        _this = _Namespace.call(this, opts) || this;
        _this.type = _types.UNIVERSAL;
        _this.value = "*";
        return _this;
      }
      return Universal2;
    }(_namespace["default"]);
    exports["default"] = Universal;
    module2.exports = exports.default;
  }
});

// node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/selectors/combinator.js
var require_combinator = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/selectors/combinator.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = void 0;
    var _node = _interopRequireDefault(require_node2());
    var _types = require_types();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    var Combinator = /* @__PURE__ */ function(_Node) {
      _inheritsLoose(Combinator2, _Node);
      function Combinator2(opts) {
        var _this;
        _this = _Node.call(this, opts) || this;
        _this.type = _types.COMBINATOR;
        return _this;
      }
      return Combinator2;
    }(_node["default"]);
    exports["default"] = Combinator;
    module2.exports = exports.default;
  }
});

// node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/selectors/nesting.js
var require_nesting = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/selectors/nesting.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = void 0;
    var _node = _interopRequireDefault(require_node2());
    var _types = require_types();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    var Nesting = /* @__PURE__ */ function(_Node) {
      _inheritsLoose(Nesting2, _Node);
      function Nesting2(opts) {
        var _this;
        _this = _Node.call(this, opts) || this;
        _this.type = _types.NESTING;
        _this.value = "&";
        return _this;
      }
      return Nesting2;
    }(_node["default"]);
    exports["default"] = Nesting;
    module2.exports = exports.default;
  }
});

// node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/sortAscending.js
var require_sortAscending = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/sortAscending.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = sortAscending;
    function sortAscending(list4) {
      return list4.sort(function(a, b) {
        return a - b;
      });
    }
    module2.exports = exports.default;
  }
});

// node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/tokenTypes.js
var require_tokenTypes = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/tokenTypes.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.word = exports.tilde = exports.tab = exports.str = exports.space = exports.slash = exports.singleQuote = exports.semicolon = exports.plus = exports.pipe = exports.openSquare = exports.openParenthesis = exports.newline = exports.greaterThan = exports.feed = exports.equals = exports.doubleQuote = exports.dollar = exports.cr = exports.comment = exports.comma = exports.combinator = exports.colon = exports.closeSquare = exports.closeParenthesis = exports.caret = exports.bang = exports.backslash = exports.at = exports.asterisk = exports.ampersand = void 0;
    var ampersand = 38;
    exports.ampersand = ampersand;
    var asterisk = 42;
    exports.asterisk = asterisk;
    var at = 64;
    exports.at = at;
    var comma = 44;
    exports.comma = comma;
    var colon = 58;
    exports.colon = colon;
    var semicolon = 59;
    exports.semicolon = semicolon;
    var openParenthesis = 40;
    exports.openParenthesis = openParenthesis;
    var closeParenthesis = 41;
    exports.closeParenthesis = closeParenthesis;
    var openSquare = 91;
    exports.openSquare = openSquare;
    var closeSquare = 93;
    exports.closeSquare = closeSquare;
    var dollar = 36;
    exports.dollar = dollar;
    var tilde = 126;
    exports.tilde = tilde;
    var caret = 94;
    exports.caret = caret;
    var plus = 43;
    exports.plus = plus;
    var equals = 61;
    exports.equals = equals;
    var pipe = 124;
    exports.pipe = pipe;
    var greaterThan = 62;
    exports.greaterThan = greaterThan;
    var space = 32;
    exports.space = space;
    var singleQuote = 39;
    exports.singleQuote = singleQuote;
    var doubleQuote = 34;
    exports.doubleQuote = doubleQuote;
    var slash = 47;
    exports.slash = slash;
    var bang = 33;
    exports.bang = bang;
    var backslash = 92;
    exports.backslash = backslash;
    var cr = 13;
    exports.cr = cr;
    var feed = 12;
    exports.feed = feed;
    var newline = 10;
    exports.newline = newline;
    var tab = 9;
    exports.tab = tab;
    var str = singleQuote;
    exports.str = str;
    var comment3 = -1;
    exports.comment = comment3;
    var word = -2;
    exports.word = word;
    var combinator = -3;
    exports.combinator = combinator;
  }
});

// node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/tokenize.js
var require_tokenize2 = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/tokenize.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.FIELDS = void 0;
    exports["default"] = tokenize;
    var t = _interopRequireWildcard(require_tokenTypes());
    var _unescapable;
    var _wordDelimiters;
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache2 = _getRequireWildcardCache(nodeInterop);
      if (cache2 && cache2.has(obj)) {
        return cache2.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache2) {
        cache2.set(obj, newObj);
      }
      return newObj;
    }
    var unescapable = (_unescapable = {}, _unescapable[t.tab] = true, _unescapable[t.newline] = true, _unescapable[t.cr] = true, _unescapable[t.feed] = true, _unescapable);
    var wordDelimiters = (_wordDelimiters = {}, _wordDelimiters[t.space] = true, _wordDelimiters[t.tab] = true, _wordDelimiters[t.newline] = true, _wordDelimiters[t.cr] = true, _wordDelimiters[t.feed] = true, _wordDelimiters[t.ampersand] = true, _wordDelimiters[t.asterisk] = true, _wordDelimiters[t.bang] = true, _wordDelimiters[t.comma] = true, _wordDelimiters[t.colon] = true, _wordDelimiters[t.semicolon] = true, _wordDelimiters[t.openParenthesis] = true, _wordDelimiters[t.closeParenthesis] = true, _wordDelimiters[t.openSquare] = true, _wordDelimiters[t.closeSquare] = true, _wordDelimiters[t.singleQuote] = true, _wordDelimiters[t.doubleQuote] = true, _wordDelimiters[t.plus] = true, _wordDelimiters[t.pipe] = true, _wordDelimiters[t.tilde] = true, _wordDelimiters[t.greaterThan] = true, _wordDelimiters[t.equals] = true, _wordDelimiters[t.dollar] = true, _wordDelimiters[t.caret] = true, _wordDelimiters[t.slash] = true, _wordDelimiters);
    var hex = {};
    var hexChars = "0123456789abcdefABCDEF";
    for (i = 0; i < hexChars.length; i++) {
      hex[hexChars.charCodeAt(i)] = true;
    }
    var i;
    function consumeWord(css, start) {
      var next = start;
      var code;
      do {
        code = css.charCodeAt(next);
        if (wordDelimiters[code]) {
          return next - 1;
        } else if (code === t.backslash) {
          next = consumeEscape(css, next) + 1;
        } else {
          next++;
        }
      } while (next < css.length);
      return next - 1;
    }
    function consumeEscape(css, start) {
      var next = start;
      var code = css.charCodeAt(next + 1);
      if (unescapable[code]) {
      } else if (hex[code]) {
        var hexDigits = 0;
        do {
          next++;
          hexDigits++;
          code = css.charCodeAt(next + 1);
        } while (hex[code] && hexDigits < 6);
        if (hexDigits < 6 && code === t.space) {
          next++;
        }
      } else {
        next++;
      }
      return next;
    }
    var FIELDS = {
      TYPE: 0,
      START_LINE: 1,
      START_COL: 2,
      END_LINE: 3,
      END_COL: 4,
      START_POS: 5,
      END_POS: 6
    };
    exports.FIELDS = FIELDS;
    function tokenize(input) {
      var tokens = [];
      var css = input.css.valueOf();
      var _css = css, length2 = _css.length;
      var offset = -1;
      var line = 1;
      var start = 0;
      var end = 0;
      var code, content, endColumn, endLine, escaped, escapePos, last, lines, next, nextLine, nextOffset, quote, tokenType;
      function unclosed(what, fix) {
        if (input.safe) {
          css += fix;
          next = css.length - 1;
        } else {
          throw input.error("Unclosed " + what, line, start - offset, start);
        }
      }
      while (start < length2) {
        code = css.charCodeAt(start);
        if (code === t.newline) {
          offset = start;
          line += 1;
        }
        switch (code) {
          case t.space:
          case t.tab:
          case t.newline:
          case t.cr:
          case t.feed:
            next = start;
            do {
              next += 1;
              code = css.charCodeAt(next);
              if (code === t.newline) {
                offset = next;
                line += 1;
              }
            } while (code === t.space || code === t.newline || code === t.tab || code === t.cr || code === t.feed);
            tokenType = t.space;
            endLine = line;
            endColumn = next - offset - 1;
            end = next;
            break;
          case t.plus:
          case t.greaterThan:
          case t.tilde:
          case t.pipe:
            next = start;
            do {
              next += 1;
              code = css.charCodeAt(next);
            } while (code === t.plus || code === t.greaterThan || code === t.tilde || code === t.pipe);
            tokenType = t.combinator;
            endLine = line;
            endColumn = start - offset;
            end = next;
            break;
          case t.asterisk:
          case t.ampersand:
          case t.bang:
          case t.comma:
          case t.equals:
          case t.dollar:
          case t.caret:
          case t.openSquare:
          case t.closeSquare:
          case t.colon:
          case t.semicolon:
          case t.openParenthesis:
          case t.closeParenthesis:
            next = start;
            tokenType = code;
            endLine = line;
            endColumn = start - offset;
            end = next + 1;
            break;
          case t.singleQuote:
          case t.doubleQuote:
            quote = code === t.singleQuote ? "'" : '"';
            next = start;
            do {
              escaped = false;
              next = css.indexOf(quote, next + 1);
              if (next === -1) {
                unclosed("quote", quote);
              }
              escapePos = next;
              while (css.charCodeAt(escapePos - 1) === t.backslash) {
                escapePos -= 1;
                escaped = !escaped;
              }
            } while (escaped);
            tokenType = t.str;
            endLine = line;
            endColumn = start - offset;
            end = next + 1;
            break;
          default:
            if (code === t.slash && css.charCodeAt(start + 1) === t.asterisk) {
              next = css.indexOf("*/", start + 2) + 1;
              if (next === 0) {
                unclosed("comment", "*/");
              }
              content = css.slice(start, next + 1);
              lines = content.split("\n");
              last = lines.length - 1;
              if (last > 0) {
                nextLine = line + last;
                nextOffset = next - lines[last].length;
              } else {
                nextLine = line;
                nextOffset = offset;
              }
              tokenType = t.comment;
              line = nextLine;
              endLine = nextLine;
              endColumn = next - nextOffset;
            } else if (code === t.slash) {
              next = start;
              tokenType = code;
              endLine = line;
              endColumn = start - offset;
              end = next + 1;
            } else {
              next = consumeWord(css, start);
              tokenType = t.word;
              endLine = line;
              endColumn = next - offset;
            }
            end = next + 1;
            break;
        }
        tokens.push([
          tokenType,
          line,
          start - offset,
          endLine,
          endColumn,
          start,
          end
        ]);
        if (nextOffset) {
          offset = nextOffset;
          nextOffset = null;
        }
        start = end;
      }
      return tokens;
    }
  }
});

// node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/parser.js
var require_parser2 = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/parser.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = void 0;
    var _root = _interopRequireDefault(require_root2());
    var _selector = _interopRequireDefault(require_selector());
    var _className = _interopRequireDefault(require_className());
    var _comment = _interopRequireDefault(require_comment2());
    var _id = _interopRequireDefault(require_id());
    var _tag = _interopRequireDefault(require_tag());
    var _string = _interopRequireDefault(require_string());
    var _pseudo = _interopRequireDefault(require_pseudo());
    var _attribute = _interopRequireWildcard(require_attribute());
    var _universal = _interopRequireDefault(require_universal());
    var _combinator = _interopRequireDefault(require_combinator());
    var _nesting = _interopRequireDefault(require_nesting());
    var _sortAscending = _interopRequireDefault(require_sortAscending());
    var _tokenize = _interopRequireWildcard(require_tokenize2());
    var tokens = _interopRequireWildcard(require_tokenTypes());
    var types2 = _interopRequireWildcard(require_types());
    var _util = require_util();
    var _WHITESPACE_TOKENS;
    var _Object$assign;
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache2 = _getRequireWildcardCache(nodeInterop);
      if (cache2 && cache2.has(obj)) {
        return cache2.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache2) {
        cache2.set(obj, newObj);
      }
      return newObj;
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    var WHITESPACE_TOKENS = (_WHITESPACE_TOKENS = {}, _WHITESPACE_TOKENS[tokens.space] = true, _WHITESPACE_TOKENS[tokens.cr] = true, _WHITESPACE_TOKENS[tokens.feed] = true, _WHITESPACE_TOKENS[tokens.newline] = true, _WHITESPACE_TOKENS[tokens.tab] = true, _WHITESPACE_TOKENS);
    var WHITESPACE_EQUIV_TOKENS = Object.assign({}, WHITESPACE_TOKENS, (_Object$assign = {}, _Object$assign[tokens.comment] = true, _Object$assign));
    function tokenStart(token) {
      return {
        line: token[_tokenize.FIELDS.START_LINE],
        column: token[_tokenize.FIELDS.START_COL]
      };
    }
    function tokenEnd(token) {
      return {
        line: token[_tokenize.FIELDS.END_LINE],
        column: token[_tokenize.FIELDS.END_COL]
      };
    }
    function getSource(startLine, startColumn, endLine, endColumn) {
      return {
        start: {
          line: startLine,
          column: startColumn
        },
        end: {
          line: endLine,
          column: endColumn
        }
      };
    }
    function getTokenSource(token) {
      return getSource(token[_tokenize.FIELDS.START_LINE], token[_tokenize.FIELDS.START_COL], token[_tokenize.FIELDS.END_LINE], token[_tokenize.FIELDS.END_COL]);
    }
    function getTokenSourceSpan(startToken, endToken) {
      if (!startToken) {
        return void 0;
      }
      return getSource(startToken[_tokenize.FIELDS.START_LINE], startToken[_tokenize.FIELDS.START_COL], endToken[_tokenize.FIELDS.END_LINE], endToken[_tokenize.FIELDS.END_COL]);
    }
    function unescapeProp(node, prop) {
      var value2 = node[prop];
      if (typeof value2 !== "string") {
        return;
      }
      if (value2.indexOf("\\") !== -1) {
        (0, _util.ensureObject)(node, "raws");
        node[prop] = (0, _util.unesc)(value2);
        if (node.raws[prop] === void 0) {
          node.raws[prop] = value2;
        }
      }
      return node;
    }
    function indexesOf(array, item) {
      var i = -1;
      var indexes = [];
      while ((i = array.indexOf(item, i + 1)) !== -1) {
        indexes.push(i);
      }
      return indexes;
    }
    function uniqs() {
      var list4 = Array.prototype.concat.apply([], arguments);
      return list4.filter(function(item, i) {
        return i === list4.indexOf(item);
      });
    }
    var Parser = /* @__PURE__ */ function() {
      function Parser2(rule3, options) {
        if (options === void 0) {
          options = {};
        }
        this.rule = rule3;
        this.options = Object.assign({
          lossy: false,
          safe: false
        }, options);
        this.position = 0;
        this.css = typeof this.rule === "string" ? this.rule : this.rule.selector;
        this.tokens = (0, _tokenize["default"])({
          css: this.css,
          error: this._errorGenerator(),
          safe: this.options.safe
        });
        var rootSource = getTokenSourceSpan(this.tokens[0], this.tokens[this.tokens.length - 1]);
        this.root = new _root["default"]({
          source: rootSource
        });
        this.root.errorGenerator = this._errorGenerator();
        var selector = new _selector["default"]({
          source: {
            start: {
              line: 1,
              column: 1
            }
          }
        });
        this.root.append(selector);
        this.current = selector;
        this.loop();
      }
      var _proto = Parser2.prototype;
      _proto._errorGenerator = function _errorGenerator() {
        var _this = this;
        return function(message, errorOptions) {
          if (typeof _this.rule === "string") {
            return new Error(message);
          }
          return _this.rule.error(message, errorOptions);
        };
      };
      _proto.attribute = function attribute() {
        var attr = [];
        var startingToken = this.currToken;
        this.position++;
        while (this.position < this.tokens.length && this.currToken[_tokenize.FIELDS.TYPE] !== tokens.closeSquare) {
          attr.push(this.currToken);
          this.position++;
        }
        if (this.currToken[_tokenize.FIELDS.TYPE] !== tokens.closeSquare) {
          return this.expected("closing square bracket", this.currToken[_tokenize.FIELDS.START_POS]);
        }
        var len = attr.length;
        var node = {
          source: getSource(startingToken[1], startingToken[2], this.currToken[3], this.currToken[4]),
          sourceIndex: startingToken[_tokenize.FIELDS.START_POS]
        };
        if (len === 1 && !~[tokens.word].indexOf(attr[0][_tokenize.FIELDS.TYPE])) {
          return this.expected("attribute", attr[0][_tokenize.FIELDS.START_POS]);
        }
        var pos = 0;
        var spaceBefore = "";
        var commentBefore = "";
        var lastAdded = null;
        var spaceAfterMeaningfulToken = false;
        while (pos < len) {
          var token = attr[pos];
          var content = this.content(token);
          var next = attr[pos + 1];
          switch (token[_tokenize.FIELDS.TYPE]) {
            case tokens.space:
              spaceAfterMeaningfulToken = true;
              if (this.options.lossy) {
                break;
              }
              if (lastAdded) {
                (0, _util.ensureObject)(node, "spaces", lastAdded);
                var prevContent = node.spaces[lastAdded].after || "";
                node.spaces[lastAdded].after = prevContent + content;
                var existingComment = (0, _util.getProp)(node, "raws", "spaces", lastAdded, "after") || null;
                if (existingComment) {
                  node.raws.spaces[lastAdded].after = existingComment + content;
                }
              } else {
                spaceBefore = spaceBefore + content;
                commentBefore = commentBefore + content;
              }
              break;
            case tokens.asterisk:
              if (next[_tokenize.FIELDS.TYPE] === tokens.equals) {
                node.operator = content;
                lastAdded = "operator";
              } else if ((!node.namespace || lastAdded === "namespace" && !spaceAfterMeaningfulToken) && next) {
                if (spaceBefore) {
                  (0, _util.ensureObject)(node, "spaces", "attribute");
                  node.spaces.attribute.before = spaceBefore;
                  spaceBefore = "";
                }
                if (commentBefore) {
                  (0, _util.ensureObject)(node, "raws", "spaces", "attribute");
                  node.raws.spaces.attribute.before = spaceBefore;
                  commentBefore = "";
                }
                node.namespace = (node.namespace || "") + content;
                var rawValue = (0, _util.getProp)(node, "raws", "namespace") || null;
                if (rawValue) {
                  node.raws.namespace += content;
                }
                lastAdded = "namespace";
              }
              spaceAfterMeaningfulToken = false;
              break;
            case tokens.dollar:
              if (lastAdded === "value") {
                var oldRawValue = (0, _util.getProp)(node, "raws", "value");
                node.value += "$";
                if (oldRawValue) {
                  node.raws.value = oldRawValue + "$";
                }
                break;
              }
            case tokens.caret:
              if (next[_tokenize.FIELDS.TYPE] === tokens.equals) {
                node.operator = content;
                lastAdded = "operator";
              }
              spaceAfterMeaningfulToken = false;
              break;
            case tokens.combinator:
              if (content === "~" && next[_tokenize.FIELDS.TYPE] === tokens.equals) {
                node.operator = content;
                lastAdded = "operator";
              }
              if (content !== "|") {
                spaceAfterMeaningfulToken = false;
                break;
              }
              if (next[_tokenize.FIELDS.TYPE] === tokens.equals) {
                node.operator = content;
                lastAdded = "operator";
              } else if (!node.namespace && !node.attribute) {
                node.namespace = true;
              }
              spaceAfterMeaningfulToken = false;
              break;
            case tokens.word:
              if (next && this.content(next) === "|" && attr[pos + 2] && attr[pos + 2][_tokenize.FIELDS.TYPE] !== tokens.equals && !node.operator && !node.namespace) {
                node.namespace = content;
                lastAdded = "namespace";
              } else if (!node.attribute || lastAdded === "attribute" && !spaceAfterMeaningfulToken) {
                if (spaceBefore) {
                  (0, _util.ensureObject)(node, "spaces", "attribute");
                  node.spaces.attribute.before = spaceBefore;
                  spaceBefore = "";
                }
                if (commentBefore) {
                  (0, _util.ensureObject)(node, "raws", "spaces", "attribute");
                  node.raws.spaces.attribute.before = commentBefore;
                  commentBefore = "";
                }
                node.attribute = (node.attribute || "") + content;
                var _rawValue = (0, _util.getProp)(node, "raws", "attribute") || null;
                if (_rawValue) {
                  node.raws.attribute += content;
                }
                lastAdded = "attribute";
              } else if (!node.value && node.value !== "" || lastAdded === "value" && !(spaceAfterMeaningfulToken || node.quoteMark)) {
                var _unescaped = (0, _util.unesc)(content);
                var _oldRawValue = (0, _util.getProp)(node, "raws", "value") || "";
                var oldValue = node.value || "";
                node.value = oldValue + _unescaped;
                node.quoteMark = null;
                if (_unescaped !== content || _oldRawValue) {
                  (0, _util.ensureObject)(node, "raws");
                  node.raws.value = (_oldRawValue || oldValue) + content;
                }
                lastAdded = "value";
              } else {
                var insensitive = content === "i" || content === "I";
                if ((node.value || node.value === "") && (node.quoteMark || spaceAfterMeaningfulToken)) {
                  node.insensitive = insensitive;
                  if (!insensitive || content === "I") {
                    (0, _util.ensureObject)(node, "raws");
                    node.raws.insensitiveFlag = content;
                  }
                  lastAdded = "insensitive";
                  if (spaceBefore) {
                    (0, _util.ensureObject)(node, "spaces", "insensitive");
                    node.spaces.insensitive.before = spaceBefore;
                    spaceBefore = "";
                  }
                  if (commentBefore) {
                    (0, _util.ensureObject)(node, "raws", "spaces", "insensitive");
                    node.raws.spaces.insensitive.before = commentBefore;
                    commentBefore = "";
                  }
                } else if (node.value || node.value === "") {
                  lastAdded = "value";
                  node.value += content;
                  if (node.raws.value) {
                    node.raws.value += content;
                  }
                }
              }
              spaceAfterMeaningfulToken = false;
              break;
            case tokens.str:
              if (!node.attribute || !node.operator) {
                return this.error("Expected an attribute followed by an operator preceding the string.", {
                  index: token[_tokenize.FIELDS.START_POS]
                });
              }
              var _unescapeValue = (0, _attribute.unescapeValue)(content), unescaped = _unescapeValue.unescaped, quoteMark = _unescapeValue.quoteMark;
              node.value = unescaped;
              node.quoteMark = quoteMark;
              lastAdded = "value";
              (0, _util.ensureObject)(node, "raws");
              node.raws.value = content;
              spaceAfterMeaningfulToken = false;
              break;
            case tokens.equals:
              if (!node.attribute) {
                return this.expected("attribute", token[_tokenize.FIELDS.START_POS], content);
              }
              if (node.value) {
                return this.error('Unexpected "=" found; an operator was already defined.', {
                  index: token[_tokenize.FIELDS.START_POS]
                });
              }
              node.operator = node.operator ? node.operator + content : content;
              lastAdded = "operator";
              spaceAfterMeaningfulToken = false;
              break;
            case tokens.comment:
              if (lastAdded) {
                if (spaceAfterMeaningfulToken || next && next[_tokenize.FIELDS.TYPE] === tokens.space || lastAdded === "insensitive") {
                  var lastComment = (0, _util.getProp)(node, "spaces", lastAdded, "after") || "";
                  var rawLastComment = (0, _util.getProp)(node, "raws", "spaces", lastAdded, "after") || lastComment;
                  (0, _util.ensureObject)(node, "raws", "spaces", lastAdded);
                  node.raws.spaces[lastAdded].after = rawLastComment + content;
                } else {
                  var lastValue = node[lastAdded] || "";
                  var rawLastValue = (0, _util.getProp)(node, "raws", lastAdded) || lastValue;
                  (0, _util.ensureObject)(node, "raws");
                  node.raws[lastAdded] = rawLastValue + content;
                }
              } else {
                commentBefore = commentBefore + content;
              }
              break;
            default:
              return this.error('Unexpected "' + content + '" found.', {
                index: token[_tokenize.FIELDS.START_POS]
              });
          }
          pos++;
        }
        unescapeProp(node, "attribute");
        unescapeProp(node, "namespace");
        this.newNode(new _attribute["default"](node));
        this.position++;
      };
      _proto.parseWhitespaceEquivalentTokens = function parseWhitespaceEquivalentTokens(stopPosition) {
        if (stopPosition < 0) {
          stopPosition = this.tokens.length;
        }
        var startPosition = this.position;
        var nodes = [];
        var space = "";
        var lastComment = void 0;
        do {
          if (WHITESPACE_TOKENS[this.currToken[_tokenize.FIELDS.TYPE]]) {
            if (!this.options.lossy) {
              space += this.content();
            }
          } else if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.comment) {
            var spaces = {};
            if (space) {
              spaces.before = space;
              space = "";
            }
            lastComment = new _comment["default"]({
              value: this.content(),
              source: getTokenSource(this.currToken),
              sourceIndex: this.currToken[_tokenize.FIELDS.START_POS],
              spaces
            });
            nodes.push(lastComment);
          }
        } while (++this.position < stopPosition);
        if (space) {
          if (lastComment) {
            lastComment.spaces.after = space;
          } else if (!this.options.lossy) {
            var firstToken = this.tokens[startPosition];
            var lastToken = this.tokens[this.position - 1];
            nodes.push(new _string["default"]({
              value: "",
              source: getSource(firstToken[_tokenize.FIELDS.START_LINE], firstToken[_tokenize.FIELDS.START_COL], lastToken[_tokenize.FIELDS.END_LINE], lastToken[_tokenize.FIELDS.END_COL]),
              sourceIndex: firstToken[_tokenize.FIELDS.START_POS],
              spaces: {
                before: space,
                after: ""
              }
            }));
          }
        }
        return nodes;
      };
      _proto.convertWhitespaceNodesToSpace = function convertWhitespaceNodesToSpace(nodes, requiredSpace) {
        var _this2 = this;
        if (requiredSpace === void 0) {
          requiredSpace = false;
        }
        var space = "";
        var rawSpace = "";
        nodes.forEach(function(n) {
          var spaceBefore = _this2.lossySpace(n.spaces.before, requiredSpace);
          var rawSpaceBefore = _this2.lossySpace(n.rawSpaceBefore, requiredSpace);
          space += spaceBefore + _this2.lossySpace(n.spaces.after, requiredSpace && spaceBefore.length === 0);
          rawSpace += spaceBefore + n.value + _this2.lossySpace(n.rawSpaceAfter, requiredSpace && rawSpaceBefore.length === 0);
        });
        if (rawSpace === space) {
          rawSpace = void 0;
        }
        var result = {
          space,
          rawSpace
        };
        return result;
      };
      _proto.isNamedCombinator = function isNamedCombinator(position2) {
        if (position2 === void 0) {
          position2 = this.position;
        }
        return this.tokens[position2 + 0] && this.tokens[position2 + 0][_tokenize.FIELDS.TYPE] === tokens.slash && this.tokens[position2 + 1] && this.tokens[position2 + 1][_tokenize.FIELDS.TYPE] === tokens.word && this.tokens[position2 + 2] && this.tokens[position2 + 2][_tokenize.FIELDS.TYPE] === tokens.slash;
      };
      _proto.namedCombinator = function namedCombinator() {
        if (this.isNamedCombinator()) {
          var nameRaw = this.content(this.tokens[this.position + 1]);
          var name = (0, _util.unesc)(nameRaw).toLowerCase();
          var raws = {};
          if (name !== nameRaw) {
            raws.value = "/" + nameRaw + "/";
          }
          var node = new _combinator["default"]({
            value: "/" + name + "/",
            source: getSource(this.currToken[_tokenize.FIELDS.START_LINE], this.currToken[_tokenize.FIELDS.START_COL], this.tokens[this.position + 2][_tokenize.FIELDS.END_LINE], this.tokens[this.position + 2][_tokenize.FIELDS.END_COL]),
            sourceIndex: this.currToken[_tokenize.FIELDS.START_POS],
            raws
          });
          this.position = this.position + 3;
          return node;
        } else {
          this.unexpected();
        }
      };
      _proto.combinator = function combinator() {
        var _this3 = this;
        if (this.content() === "|") {
          return this.namespace();
        }
        var nextSigTokenPos = this.locateNextMeaningfulToken(this.position);
        if (nextSigTokenPos < 0 || this.tokens[nextSigTokenPos][_tokenize.FIELDS.TYPE] === tokens.comma) {
          var nodes = this.parseWhitespaceEquivalentTokens(nextSigTokenPos);
          if (nodes.length > 0) {
            var last = this.current.last;
            if (last) {
              var _this$convertWhitespa = this.convertWhitespaceNodesToSpace(nodes), space = _this$convertWhitespa.space, rawSpace = _this$convertWhitespa.rawSpace;
              if (rawSpace !== void 0) {
                last.rawSpaceAfter += rawSpace;
              }
              last.spaces.after += space;
            } else {
              nodes.forEach(function(n) {
                return _this3.newNode(n);
              });
            }
          }
          return;
        }
        var firstToken = this.currToken;
        var spaceOrDescendantSelectorNodes = void 0;
        if (nextSigTokenPos > this.position) {
          spaceOrDescendantSelectorNodes = this.parseWhitespaceEquivalentTokens(nextSigTokenPos);
        }
        var node;
        if (this.isNamedCombinator()) {
          node = this.namedCombinator();
        } else if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.combinator) {
          node = new _combinator["default"]({
            value: this.content(),
            source: getTokenSource(this.currToken),
            sourceIndex: this.currToken[_tokenize.FIELDS.START_POS]
          });
          this.position++;
        } else if (WHITESPACE_TOKENS[this.currToken[_tokenize.FIELDS.TYPE]]) {
        } else if (!spaceOrDescendantSelectorNodes) {
          this.unexpected();
        }
        if (node) {
          if (spaceOrDescendantSelectorNodes) {
            var _this$convertWhitespa2 = this.convertWhitespaceNodesToSpace(spaceOrDescendantSelectorNodes), _space = _this$convertWhitespa2.space, _rawSpace = _this$convertWhitespa2.rawSpace;
            node.spaces.before = _space;
            node.rawSpaceBefore = _rawSpace;
          }
        } else {
          var _this$convertWhitespa3 = this.convertWhitespaceNodesToSpace(spaceOrDescendantSelectorNodes, true), _space2 = _this$convertWhitespa3.space, _rawSpace2 = _this$convertWhitespa3.rawSpace;
          if (!_rawSpace2) {
            _rawSpace2 = _space2;
          }
          var spaces = {};
          var raws = {
            spaces: {}
          };
          if (_space2.endsWith(" ") && _rawSpace2.endsWith(" ")) {
            spaces.before = _space2.slice(0, _space2.length - 1);
            raws.spaces.before = _rawSpace2.slice(0, _rawSpace2.length - 1);
          } else if (_space2.startsWith(" ") && _rawSpace2.startsWith(" ")) {
            spaces.after = _space2.slice(1);
            raws.spaces.after = _rawSpace2.slice(1);
          } else {
            raws.value = _rawSpace2;
          }
          node = new _combinator["default"]({
            value: " ",
            source: getTokenSourceSpan(firstToken, this.tokens[this.position - 1]),
            sourceIndex: firstToken[_tokenize.FIELDS.START_POS],
            spaces,
            raws
          });
        }
        if (this.currToken && this.currToken[_tokenize.FIELDS.TYPE] === tokens.space) {
          node.spaces.after = this.optionalSpace(this.content());
          this.position++;
        }
        return this.newNode(node);
      };
      _proto.comma = function comma() {
        if (this.position === this.tokens.length - 1) {
          this.root.trailingComma = true;
          this.position++;
          return;
        }
        this.current._inferEndPosition();
        var selector = new _selector["default"]({
          source: {
            start: tokenStart(this.tokens[this.position + 1])
          }
        });
        this.current.parent.append(selector);
        this.current = selector;
        this.position++;
      };
      _proto.comment = function comment3() {
        var current = this.currToken;
        this.newNode(new _comment["default"]({
          value: this.content(),
          source: getTokenSource(current),
          sourceIndex: current[_tokenize.FIELDS.START_POS]
        }));
        this.position++;
      };
      _proto.error = function error(message, opts) {
        throw this.root.error(message, opts);
      };
      _proto.missingBackslash = function missingBackslash() {
        return this.error("Expected a backslash preceding the semicolon.", {
          index: this.currToken[_tokenize.FIELDS.START_POS]
        });
      };
      _proto.missingParenthesis = function missingParenthesis() {
        return this.expected("opening parenthesis", this.currToken[_tokenize.FIELDS.START_POS]);
      };
      _proto.missingSquareBracket = function missingSquareBracket() {
        return this.expected("opening square bracket", this.currToken[_tokenize.FIELDS.START_POS]);
      };
      _proto.unexpected = function unexpected() {
        return this.error("Unexpected '" + this.content() + "'. Escaping special characters with \\ may help.", this.currToken[_tokenize.FIELDS.START_POS]);
      };
      _proto.unexpectedPipe = function unexpectedPipe() {
        return this.error("Unexpected '|'.", this.currToken[_tokenize.FIELDS.START_POS]);
      };
      _proto.namespace = function namespace() {
        var before = this.prevToken && this.content(this.prevToken) || true;
        if (this.nextToken[_tokenize.FIELDS.TYPE] === tokens.word) {
          this.position++;
          return this.word(before);
        } else if (this.nextToken[_tokenize.FIELDS.TYPE] === tokens.asterisk) {
          this.position++;
          return this.universal(before);
        }
        this.unexpectedPipe();
      };
      _proto.nesting = function nesting() {
        if (this.nextToken) {
          var nextContent = this.content(this.nextToken);
          if (nextContent === "|") {
            this.position++;
            return;
          }
        }
        var current = this.currToken;
        this.newNode(new _nesting["default"]({
          value: this.content(),
          source: getTokenSource(current),
          sourceIndex: current[_tokenize.FIELDS.START_POS]
        }));
        this.position++;
      };
      _proto.parentheses = function parentheses() {
        var last = this.current.last;
        var unbalanced = 1;
        this.position++;
        if (last && last.type === types2.PSEUDO) {
          var selector = new _selector["default"]({
            source: {
              start: tokenStart(this.tokens[this.position - 1])
            }
          });
          var cache2 = this.current;
          last.append(selector);
          this.current = selector;
          while (this.position < this.tokens.length && unbalanced) {
            if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.openParenthesis) {
              unbalanced++;
            }
            if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.closeParenthesis) {
              unbalanced--;
            }
            if (unbalanced) {
              this.parse();
            } else {
              this.current.source.end = tokenEnd(this.currToken);
              this.current.parent.source.end = tokenEnd(this.currToken);
              this.position++;
            }
          }
          this.current = cache2;
        } else {
          var parenStart = this.currToken;
          var parenValue = "(";
          var parenEnd;
          while (this.position < this.tokens.length && unbalanced) {
            if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.openParenthesis) {
              unbalanced++;
            }
            if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.closeParenthesis) {
              unbalanced--;
            }
            parenEnd = this.currToken;
            parenValue += this.parseParenthesisToken(this.currToken);
            this.position++;
          }
          if (last) {
            last.appendToPropertyAndEscape("value", parenValue, parenValue);
          } else {
            this.newNode(new _string["default"]({
              value: parenValue,
              source: getSource(parenStart[_tokenize.FIELDS.START_LINE], parenStart[_tokenize.FIELDS.START_COL], parenEnd[_tokenize.FIELDS.END_LINE], parenEnd[_tokenize.FIELDS.END_COL]),
              sourceIndex: parenStart[_tokenize.FIELDS.START_POS]
            }));
          }
        }
        if (unbalanced) {
          return this.expected("closing parenthesis", this.currToken[_tokenize.FIELDS.START_POS]);
        }
      };
      _proto.pseudo = function pseudo() {
        var _this4 = this;
        var pseudoStr = "";
        var startingToken = this.currToken;
        while (this.currToken && this.currToken[_tokenize.FIELDS.TYPE] === tokens.colon) {
          pseudoStr += this.content();
          this.position++;
        }
        if (!this.currToken) {
          return this.expected(["pseudo-class", "pseudo-element"], this.position - 1);
        }
        if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.word) {
          this.splitWord(false, function(first, length2) {
            pseudoStr += first;
            _this4.newNode(new _pseudo["default"]({
              value: pseudoStr,
              source: getTokenSourceSpan(startingToken, _this4.currToken),
              sourceIndex: startingToken[_tokenize.FIELDS.START_POS]
            }));
            if (length2 > 1 && _this4.nextToken && _this4.nextToken[_tokenize.FIELDS.TYPE] === tokens.openParenthesis) {
              _this4.error("Misplaced parenthesis.", {
                index: _this4.nextToken[_tokenize.FIELDS.START_POS]
              });
            }
          });
        } else {
          return this.expected(["pseudo-class", "pseudo-element"], this.currToken[_tokenize.FIELDS.START_POS]);
        }
      };
      _proto.space = function space() {
        var content = this.content();
        if (this.position === 0 || this.prevToken[_tokenize.FIELDS.TYPE] === tokens.comma || this.prevToken[_tokenize.FIELDS.TYPE] === tokens.openParenthesis || this.current.nodes.every(function(node) {
          return node.type === "comment";
        })) {
          this.spaces = this.optionalSpace(content);
          this.position++;
        } else if (this.position === this.tokens.length - 1 || this.nextToken[_tokenize.FIELDS.TYPE] === tokens.comma || this.nextToken[_tokenize.FIELDS.TYPE] === tokens.closeParenthesis) {
          this.current.last.spaces.after = this.optionalSpace(content);
          this.position++;
        } else {
          this.combinator();
        }
      };
      _proto.string = function string() {
        var current = this.currToken;
        this.newNode(new _string["default"]({
          value: this.content(),
          source: getTokenSource(current),
          sourceIndex: current[_tokenize.FIELDS.START_POS]
        }));
        this.position++;
      };
      _proto.universal = function universal(namespace) {
        var nextToken = this.nextToken;
        if (nextToken && this.content(nextToken) === "|") {
          this.position++;
          return this.namespace();
        }
        var current = this.currToken;
        this.newNode(new _universal["default"]({
          value: this.content(),
          source: getTokenSource(current),
          sourceIndex: current[_tokenize.FIELDS.START_POS]
        }), namespace);
        this.position++;
      };
      _proto.splitWord = function splitWord(namespace, firstCallback) {
        var _this5 = this;
        var nextToken = this.nextToken;
        var word = this.content();
        while (nextToken && ~[tokens.dollar, tokens.caret, tokens.equals, tokens.word].indexOf(nextToken[_tokenize.FIELDS.TYPE])) {
          this.position++;
          var current = this.content();
          word += current;
          if (current.lastIndexOf("\\") === current.length - 1) {
            var next = this.nextToken;
            if (next && next[_tokenize.FIELDS.TYPE] === tokens.space) {
              word += this.requiredSpace(this.content(next));
              this.position++;
            }
          }
          nextToken = this.nextToken;
        }
        var hasClass = indexesOf(word, ".").filter(function(i) {
          var escapedDot = word[i - 1] === "\\";
          var isKeyframesPercent = /^\d+\.\d+%$/.test(word);
          return !escapedDot && !isKeyframesPercent;
        });
        var hasId = indexesOf(word, "#").filter(function(i) {
          return word[i - 1] !== "\\";
        });
        var interpolations = indexesOf(word, "#{");
        if (interpolations.length) {
          hasId = hasId.filter(function(hashIndex) {
            return !~interpolations.indexOf(hashIndex);
          });
        }
        var indices = (0, _sortAscending["default"])(uniqs([0].concat(hasClass, hasId)));
        indices.forEach(function(ind, i) {
          var index3 = indices[i + 1] || word.length;
          var value2 = word.slice(ind, index3);
          if (i === 0 && firstCallback) {
            return firstCallback.call(_this5, value2, indices.length);
          }
          var node;
          var current2 = _this5.currToken;
          var sourceIndex = current2[_tokenize.FIELDS.START_POS] + indices[i];
          var source = getSource(current2[1], current2[2] + ind, current2[3], current2[2] + (index3 - 1));
          if (~hasClass.indexOf(ind)) {
            var classNameOpts = {
              value: value2.slice(1),
              source,
              sourceIndex
            };
            node = new _className["default"](unescapeProp(classNameOpts, "value"));
          } else if (~hasId.indexOf(ind)) {
            var idOpts = {
              value: value2.slice(1),
              source,
              sourceIndex
            };
            node = new _id["default"](unescapeProp(idOpts, "value"));
          } else {
            var tagOpts = {
              value: value2,
              source,
              sourceIndex
            };
            unescapeProp(tagOpts, "value");
            node = new _tag["default"](tagOpts);
          }
          _this5.newNode(node, namespace);
          namespace = null;
        });
        this.position++;
      };
      _proto.word = function word(namespace) {
        var nextToken = this.nextToken;
        if (nextToken && this.content(nextToken) === "|") {
          this.position++;
          return this.namespace();
        }
        return this.splitWord(namespace);
      };
      _proto.loop = function loop() {
        while (this.position < this.tokens.length) {
          this.parse(true);
        }
        this.current._inferEndPosition();
        return this.root;
      };
      _proto.parse = function parse5(throwOnParenthesis) {
        switch (this.currToken[_tokenize.FIELDS.TYPE]) {
          case tokens.space:
            this.space();
            break;
          case tokens.comment:
            this.comment();
            break;
          case tokens.openParenthesis:
            this.parentheses();
            break;
          case tokens.closeParenthesis:
            if (throwOnParenthesis) {
              this.missingParenthesis();
            }
            break;
          case tokens.openSquare:
            this.attribute();
            break;
          case tokens.dollar:
          case tokens.caret:
          case tokens.equals:
          case tokens.word:
            this.word();
            break;
          case tokens.colon:
            this.pseudo();
            break;
          case tokens.comma:
            this.comma();
            break;
          case tokens.asterisk:
            this.universal();
            break;
          case tokens.ampersand:
            this.nesting();
            break;
          case tokens.slash:
          case tokens.combinator:
            this.combinator();
            break;
          case tokens.str:
            this.string();
            break;
          case tokens.closeSquare:
            this.missingSquareBracket();
          case tokens.semicolon:
            this.missingBackslash();
          default:
            this.unexpected();
        }
      };
      _proto.expected = function expected(description, index3, found) {
        if (Array.isArray(description)) {
          var last = description.pop();
          description = description.join(", ") + " or " + last;
        }
        var an = /^[aeiou]/.test(description[0]) ? "an" : "a";
        if (!found) {
          return this.error("Expected " + an + " " + description + ".", {
            index: index3
          });
        }
        return this.error("Expected " + an + " " + description + ', found "' + found + '" instead.', {
          index: index3
        });
      };
      _proto.requiredSpace = function requiredSpace(space) {
        return this.options.lossy ? " " : space;
      };
      _proto.optionalSpace = function optionalSpace(space) {
        return this.options.lossy ? "" : space;
      };
      _proto.lossySpace = function lossySpace(space, required) {
        if (this.options.lossy) {
          return required ? " " : "";
        } else {
          return space;
        }
      };
      _proto.parseParenthesisToken = function parseParenthesisToken(token) {
        var content = this.content(token);
        if (token[_tokenize.FIELDS.TYPE] === tokens.space) {
          return this.requiredSpace(content);
        } else {
          return content;
        }
      };
      _proto.newNode = function newNode(node, namespace) {
        if (namespace) {
          if (/^ +$/.test(namespace)) {
            if (!this.options.lossy) {
              this.spaces = (this.spaces || "") + namespace;
            }
            namespace = true;
          }
          node.namespace = namespace;
          unescapeProp(node, "namespace");
        }
        if (this.spaces) {
          node.spaces.before = this.spaces;
          this.spaces = "";
        }
        return this.current.append(node);
      };
      _proto.content = function content(token) {
        if (token === void 0) {
          token = this.currToken;
        }
        return this.css.slice(token[_tokenize.FIELDS.START_POS], token[_tokenize.FIELDS.END_POS]);
      };
      _proto.locateNextMeaningfulToken = function locateNextMeaningfulToken(startPosition) {
        if (startPosition === void 0) {
          startPosition = this.position + 1;
        }
        var searchPosition = startPosition;
        while (searchPosition < this.tokens.length) {
          if (WHITESPACE_EQUIV_TOKENS[this.tokens[searchPosition][_tokenize.FIELDS.TYPE]]) {
            searchPosition++;
            continue;
          } else {
            return searchPosition;
          }
        }
        return -1;
      };
      _createClass(Parser2, [{
        key: "currToken",
        get: function get() {
          return this.tokens[this.position];
        }
      }, {
        key: "nextToken",
        get: function get() {
          return this.tokens[this.position + 1];
        }
      }, {
        key: "prevToken",
        get: function get() {
          return this.tokens[this.position - 1];
        }
      }]);
      return Parser2;
    }();
    exports["default"] = Parser;
    module2.exports = exports.default;
  }
});

// node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/processor.js
var require_processor2 = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/processor.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = void 0;
    var _parser = _interopRequireDefault(require_parser2());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var Processor3 = /* @__PURE__ */ function() {
      function Processor4(func, options) {
        this.func = func || function noop() {
        };
        this.funcRes = null;
        this.options = options;
      }
      var _proto = Processor4.prototype;
      _proto._shouldUpdateSelector = function _shouldUpdateSelector(rule3, options) {
        if (options === void 0) {
          options = {};
        }
        var merged = Object.assign({}, this.options, options);
        if (merged.updateSelector === false) {
          return false;
        } else {
          return typeof rule3 !== "string";
        }
      };
      _proto._isLossy = function _isLossy(options) {
        if (options === void 0) {
          options = {};
        }
        var merged = Object.assign({}, this.options, options);
        if (merged.lossless === false) {
          return true;
        } else {
          return false;
        }
      };
      _proto._root = function _root(rule3, options) {
        if (options === void 0) {
          options = {};
        }
        var parser5 = new _parser["default"](rule3, this._parseOptions(options));
        return parser5.root;
      };
      _proto._parseOptions = function _parseOptions(options) {
        return {
          lossy: this._isLossy(options)
        };
      };
      _proto._run = function _run(rule3, options) {
        var _this = this;
        if (options === void 0) {
          options = {};
        }
        return new Promise(function(resolve, reject) {
          try {
            var root3 = _this._root(rule3, options);
            Promise.resolve(_this.func(root3)).then(function(transform) {
              var string = void 0;
              if (_this._shouldUpdateSelector(rule3, options)) {
                string = root3.toString();
                rule3.selector = string;
              }
              return {
                transform,
                root: root3,
                string
              };
            }).then(resolve, reject);
          } catch (e) {
            reject(e);
            return;
          }
        });
      };
      _proto._runSync = function _runSync(rule3, options) {
        if (options === void 0) {
          options = {};
        }
        var root3 = this._root(rule3, options);
        var transform = this.func(root3);
        if (transform && typeof transform.then === "function") {
          throw new Error("Selector processor returned a promise to a synchronous call.");
        }
        var string = void 0;
        if (options.updateSelector && typeof rule3 !== "string") {
          string = root3.toString();
          rule3.selector = string;
        }
        return {
          transform,
          root: root3,
          string
        };
      };
      _proto.ast = function ast(rule3, options) {
        return this._run(rule3, options).then(function(result) {
          return result.root;
        });
      };
      _proto.astSync = function astSync(rule3, options) {
        return this._runSync(rule3, options).root;
      };
      _proto.transform = function transform(rule3, options) {
        return this._run(rule3, options).then(function(result) {
          return result.transform;
        });
      };
      _proto.transformSync = function transformSync(rule3, options) {
        return this._runSync(rule3, options).transform;
      };
      _proto.process = function process2(rule3, options) {
        return this._run(rule3, options).then(function(result) {
          return result.string || result.root.toString();
        });
      };
      _proto.processSync = function processSync(rule3, options) {
        var result = this._runSync(rule3, options);
        return result.string || result.root.toString();
      };
      return Processor4;
    }();
    exports["default"] = Processor3;
    module2.exports = exports.default;
  }
});

// node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/selectors/constructors.js
var require_constructors = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/selectors/constructors.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.universal = exports.tag = exports.string = exports.selector = exports.root = exports.pseudo = exports.nesting = exports.id = exports.comment = exports.combinator = exports.className = exports.attribute = void 0;
    var _attribute = _interopRequireDefault(require_attribute());
    var _className = _interopRequireDefault(require_className());
    var _combinator = _interopRequireDefault(require_combinator());
    var _comment = _interopRequireDefault(require_comment2());
    var _id = _interopRequireDefault(require_id());
    var _nesting = _interopRequireDefault(require_nesting());
    var _pseudo = _interopRequireDefault(require_pseudo());
    var _root = _interopRequireDefault(require_root2());
    var _selector = _interopRequireDefault(require_selector());
    var _string = _interopRequireDefault(require_string());
    var _tag = _interopRequireDefault(require_tag());
    var _universal = _interopRequireDefault(require_universal());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var attribute = function attribute2(opts) {
      return new _attribute["default"](opts);
    };
    exports.attribute = attribute;
    var className = function className2(opts) {
      return new _className["default"](opts);
    };
    exports.className = className;
    var combinator = function combinator2(opts) {
      return new _combinator["default"](opts);
    };
    exports.combinator = combinator;
    var comment3 = function comment4(opts) {
      return new _comment["default"](opts);
    };
    exports.comment = comment3;
    var id = function id2(opts) {
      return new _id["default"](opts);
    };
    exports.id = id;
    var nesting = function nesting2(opts) {
      return new _nesting["default"](opts);
    };
    exports.nesting = nesting;
    var pseudo = function pseudo2(opts) {
      return new _pseudo["default"](opts);
    };
    exports.pseudo = pseudo;
    var root3 = function root4(opts) {
      return new _root["default"](opts);
    };
    exports.root = root3;
    var selector = function selector2(opts) {
      return new _selector["default"](opts);
    };
    exports.selector = selector;
    var string = function string2(opts) {
      return new _string["default"](opts);
    };
    exports.string = string;
    var tag = function tag2(opts) {
      return new _tag["default"](opts);
    };
    exports.tag = tag;
    var universal = function universal2(opts) {
      return new _universal["default"](opts);
    };
    exports.universal = universal;
  }
});

// node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/selectors/guards.js
var require_guards = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/selectors/guards.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.isComment = exports.isCombinator = exports.isClassName = exports.isAttribute = void 0;
    exports.isContainer = isContainer;
    exports.isIdentifier = void 0;
    exports.isNamespace = isNamespace;
    exports.isNesting = void 0;
    exports.isNode = isNode;
    exports.isPseudo = void 0;
    exports.isPseudoClass = isPseudoClass;
    exports.isPseudoElement = isPseudoElement2;
    exports.isUniversal = exports.isTag = exports.isString = exports.isSelector = exports.isRoot = void 0;
    var _types = require_types();
    var _IS_TYPE;
    var IS_TYPE = (_IS_TYPE = {}, _IS_TYPE[_types.ATTRIBUTE] = true, _IS_TYPE[_types.CLASS] = true, _IS_TYPE[_types.COMBINATOR] = true, _IS_TYPE[_types.COMMENT] = true, _IS_TYPE[_types.ID] = true, _IS_TYPE[_types.NESTING] = true, _IS_TYPE[_types.PSEUDO] = true, _IS_TYPE[_types.ROOT] = true, _IS_TYPE[_types.SELECTOR] = true, _IS_TYPE[_types.STRING] = true, _IS_TYPE[_types.TAG] = true, _IS_TYPE[_types.UNIVERSAL] = true, _IS_TYPE);
    function isNode(node) {
      return typeof node === "object" && IS_TYPE[node.type];
    }
    function isNodeType(type, node) {
      return isNode(node) && node.type === type;
    }
    var isAttribute = isNodeType.bind(null, _types.ATTRIBUTE);
    exports.isAttribute = isAttribute;
    var isClassName = isNodeType.bind(null, _types.CLASS);
    exports.isClassName = isClassName;
    var isCombinator = isNodeType.bind(null, _types.COMBINATOR);
    exports.isCombinator = isCombinator;
    var isComment = isNodeType.bind(null, _types.COMMENT);
    exports.isComment = isComment;
    var isIdentifier = isNodeType.bind(null, _types.ID);
    exports.isIdentifier = isIdentifier;
    var isNesting = isNodeType.bind(null, _types.NESTING);
    exports.isNesting = isNesting;
    var isPseudo = isNodeType.bind(null, _types.PSEUDO);
    exports.isPseudo = isPseudo;
    var isRoot2 = isNodeType.bind(null, _types.ROOT);
    exports.isRoot = isRoot2;
    var isSelector = isNodeType.bind(null, _types.SELECTOR);
    exports.isSelector = isSelector;
    var isString = isNodeType.bind(null, _types.STRING);
    exports.isString = isString;
    var isTag = isNodeType.bind(null, _types.TAG);
    exports.isTag = isTag;
    var isUniversal = isNodeType.bind(null, _types.UNIVERSAL);
    exports.isUniversal = isUniversal;
    function isPseudoElement2(node) {
      return isPseudo(node) && node.value && (node.value.startsWith("::") || node.value.toLowerCase() === ":before" || node.value.toLowerCase() === ":after" || node.value.toLowerCase() === ":first-letter" || node.value.toLowerCase() === ":first-line");
    }
    function isPseudoClass(node) {
      return isPseudo(node) && !isPseudoElement2(node);
    }
    function isContainer(node) {
      return !!(isNode(node) && node.walk);
    }
    function isNamespace(node) {
      return isAttribute(node) || isTag(node);
    }
  }
});

// node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/selectors/index.js
var require_selectors = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/selectors/index.js"(exports) {
    "use strict";
    exports.__esModule = true;
    var _types = require_types();
    Object.keys(_types).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _types[key])
        return;
      exports[key] = _types[key];
    });
    var _constructors = require_constructors();
    Object.keys(_constructors).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _constructors[key])
        return;
      exports[key] = _constructors[key];
    });
    var _guards = require_guards();
    Object.keys(_guards).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _guards[key])
        return;
      exports[key] = _guards[key];
    });
  }
});

// node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/index.js
var require_dist = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss-selector-parser/dist/index.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = void 0;
    var _processor = _interopRequireDefault(require_processor2());
    var selectors = _interopRequireWildcard(require_selectors());
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache2 = _getRequireWildcardCache(nodeInterop);
      if (cache2 && cache2.has(obj)) {
        return cache2.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache2) {
        cache2.set(obj, newObj);
      }
      return newObj;
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var parser5 = function parser6(processor) {
      return new _processor["default"](processor);
    };
    Object.assign(parser5, selectors);
    delete parser5.__esModule;
    var _default = parser5;
    exports["default"] = _default;
    module2.exports = exports.default;
  }
});

// node_modules/tailwindcss/node_modules/postcss-nested/index.js
var require_postcss_nested = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss-nested/index.js"(exports, module2) {
    var { Rule: Rule3, AtRule: AtRule3 } = require_postcss();
    var parser5 = require_dist();
    function parse5(rawSelector, rule3) {
      let nodes;
      try {
        parser5((parsed) => {
          nodes = parsed;
        }).processSync(rawSelector);
      } catch (e) {
        if (rawSelector.includes(":")) {
          throw rule3 ? rule3.error("Missed semicolon") : e;
        } else {
          throw rule3 ? rule3.error(e.message) : e;
        }
      }
      return nodes.at(0);
    }
    function interpolateAmpInSelector(nodes, parent) {
      let replaced = false;
      nodes.each((node) => {
        if (node.type === "nesting") {
          let clonedParent = parent.clone({});
          if (node.value !== "&") {
            node.replaceWith(
              parse5(node.value.replace("&", clonedParent.toString()))
            );
          } else {
            node.replaceWith(clonedParent);
          }
          replaced = true;
        } else if ("nodes" in node && node.nodes) {
          if (interpolateAmpInSelector(node, parent)) {
            replaced = true;
          }
        }
      });
      return replaced;
    }
    function mergeSelectors(parent, child) {
      let merged = [];
      parent.selectors.forEach((sel) => {
        let parentNode = parse5(sel, parent);
        child.selectors.forEach((selector) => {
          if (!selector) {
            return;
          }
          let node = parse5(selector, child);
          let replaced = interpolateAmpInSelector(node, parentNode);
          if (!replaced) {
            node.prepend(parser5.combinator({ value: " " }));
            node.prepend(parentNode.clone({}));
          }
          merged.push(node.toString());
        });
      });
      return merged;
    }
    function breakOut(child, after) {
      let prev = child.prev();
      after.after(child);
      while (prev && prev.type === "comment") {
        let nextPrev = prev.prev();
        after.after(prev);
        prev = nextPrev;
      }
      return child;
    }
    function createFnAtruleChilds(bubble) {
      return function atruleChilds(rule3, atrule, bubbling, mergeSels = bubbling) {
        let children = [];
        atrule.each((child) => {
          if (child.type === "rule" && bubbling) {
            if (mergeSels) {
              child.selectors = mergeSelectors(rule3, child);
            }
          } else if (child.type === "atrule" && child.nodes) {
            if (bubble[child.name]) {
              atruleChilds(rule3, child, mergeSels);
            } else if (atrule[rootRuleMergeSel] !== false) {
              children.push(child);
            }
          } else {
            children.push(child);
          }
        });
        if (bubbling) {
          if (children.length) {
            let clone = rule3.clone({ nodes: [] });
            for (let child of children) {
              clone.append(child);
            }
            atrule.prepend(clone);
          }
        }
      };
    }
    function pickDeclarations(selector, declarations, after) {
      let parent = new Rule3({
        selector,
        nodes: []
      });
      parent.append(declarations);
      after.after(parent);
      return parent;
    }
    function atruleNames(defaults3, custom) {
      let list4 = {};
      for (let name of defaults3) {
        list4[name] = true;
      }
      if (custom) {
        for (let name of custom) {
          list4[name.replace(/^@/, "")] = true;
        }
      }
      return list4;
    }
    function parseRootRuleParams(params) {
      params = params.trim();
      let braceBlock = params.match(/^\((.*)\)$/);
      if (!braceBlock) {
        return { type: "basic", selector: params };
      }
      let bits = braceBlock[1].match(/^(with(?:out)?):(.+)$/);
      if (bits) {
        let allowlist = bits[1] === "with";
        let rules = Object.fromEntries(
          bits[2].trim().split(/\s+/).map((name) => [name, true])
        );
        if (allowlist && rules.all) {
          return { type: "noop" };
        }
        let escapes = (rule3) => !!rules[rule3];
        if (rules.all) {
          escapes = () => true;
        } else if (allowlist) {
          escapes = (rule3) => rule3 === "all" ? false : !rules[rule3];
        }
        return {
          type: "withrules",
          escapes
        };
      }
      return { type: "unknown" };
    }
    function getAncestorRules(leaf) {
      let lineage = [];
      let parent = leaf.parent;
      while (parent && parent instanceof AtRule3) {
        lineage.push(parent);
        parent = parent.parent;
      }
      return lineage;
    }
    function unwrapRootRule(rule3) {
      let escapes = rule3[rootRuleEscapes];
      if (!escapes) {
        rule3.after(rule3.nodes);
      } else {
        let nodes = rule3.nodes;
        let topEscaped;
        let topEscapedIdx = -1;
        let breakoutLeaf;
        let breakoutRoot;
        let clone;
        let lineage = getAncestorRules(rule3);
        lineage.forEach((parent, i) => {
          if (escapes(parent.name)) {
            topEscaped = parent;
            topEscapedIdx = i;
            breakoutRoot = clone;
          } else {
            let oldClone = clone;
            clone = parent.clone({ nodes: [] });
            oldClone && clone.append(oldClone);
            breakoutLeaf = breakoutLeaf || clone;
          }
        });
        if (!topEscaped) {
          rule3.after(nodes);
        } else if (!breakoutRoot) {
          topEscaped.after(nodes);
        } else {
          let leaf = breakoutLeaf;
          leaf.append(nodes);
          topEscaped.after(breakoutRoot);
        }
        if (rule3.next() && topEscaped) {
          let restRoot;
          lineage.slice(0, topEscapedIdx + 1).forEach((parent, i, arr) => {
            let oldRoot = restRoot;
            restRoot = parent.clone({ nodes: [] });
            oldRoot && restRoot.append(oldRoot);
            let nextSibs = [];
            let _child = arr[i - 1] || rule3;
            let next = _child.next();
            while (next) {
              nextSibs.push(next);
              next = next.next();
            }
            restRoot.append(nextSibs);
          });
          restRoot && (breakoutRoot || nodes[nodes.length - 1]).after(restRoot);
        }
      }
      rule3.remove();
    }
    var rootRuleMergeSel = Symbol("rootRuleMergeSel");
    var rootRuleEscapes = Symbol("rootRuleEscapes");
    function normalizeRootRule(rule3) {
      let { params } = rule3;
      let { type, selector, escapes } = parseRootRuleParams(params);
      if (type === "unknown") {
        throw rule3.error(
          `Unknown @${rule3.name} parameter ${JSON.stringify(params)}`
        );
      }
      if (type === "basic" && selector) {
        let selectorBlock = new Rule3({ selector, nodes: rule3.nodes });
        rule3.removeAll();
        rule3.append(selectorBlock);
      }
      rule3[rootRuleEscapes] = escapes;
      rule3[rootRuleMergeSel] = escapes ? !escapes("all") : type === "noop";
    }
    var hasRootRule = Symbol("hasRootRule");
    module2.exports = (opts = {}) => {
      let bubble = atruleNames(
        ["media", "supports", "layer", "container"],
        opts.bubble
      );
      let atruleChilds = createFnAtruleChilds(bubble);
      let unwrap = atruleNames(
        [
          "document",
          "font-face",
          "keyframes",
          "-webkit-keyframes",
          "-moz-keyframes"
        ],
        opts.unwrap
      );
      let rootRuleName = (opts.rootRuleName || "at-root").replace(/^@/, "");
      let preserveEmpty = opts.preserveEmpty;
      return {
        postcssPlugin: "postcss-nested",
        Once(root3) {
          root3.walkAtRules(rootRuleName, (node) => {
            normalizeRootRule(node);
            root3[hasRootRule] = true;
          });
        },
        Rule(rule3) {
          let unwrapped = false;
          let after = rule3;
          let copyDeclarations = false;
          let declarations = [];
          rule3.each((child) => {
            if (child.type === "rule") {
              if (declarations.length) {
                after = pickDeclarations(rule3.selector, declarations, after);
                declarations = [];
              }
              copyDeclarations = true;
              unwrapped = true;
              child.selectors = mergeSelectors(rule3, child);
              after = breakOut(child, after);
            } else if (child.type === "atrule") {
              if (declarations.length) {
                after = pickDeclarations(rule3.selector, declarations, after);
                declarations = [];
              }
              if (child.name === rootRuleName) {
                unwrapped = true;
                atruleChilds(rule3, child, true, child[rootRuleMergeSel]);
                after = breakOut(child, after);
              } else if (bubble[child.name]) {
                copyDeclarations = true;
                unwrapped = true;
                atruleChilds(rule3, child, true);
                after = breakOut(child, after);
              } else if (unwrap[child.name]) {
                copyDeclarations = true;
                unwrapped = true;
                atruleChilds(rule3, child, false);
                after = breakOut(child, after);
              } else if (copyDeclarations) {
                declarations.push(child);
              }
            } else if (child.type === "decl" && copyDeclarations) {
              declarations.push(child);
            }
          });
          if (declarations.length) {
            after = pickDeclarations(rule3.selector, declarations, after);
          }
          if (unwrapped && preserveEmpty !== true) {
            rule3.raws.semicolon = true;
            if (rule3.nodes.length === 0)
              rule3.remove();
          }
        },
        RootExit(root3) {
          if (root3[hasRootRule]) {
            root3.walkAtRules(rootRuleName, unwrapRootRule);
            root3[hasRootRule] = false;
          }
        }
      };
    };
    module2.exports.postcss = true;
  }
});

// node_modules/camelcase-css/index-es5.js
var require_index_es5 = __commonJS({
  "node_modules/camelcase-css/index-es5.js"(exports, module2) {
    "use strict";
    var pattern2 = /-(\w|$)/g;
    var callback = function callback2(dashChar, char) {
      return char.toUpperCase();
    };
    var camelCaseCSS = function camelCaseCSS2(property) {
      property = property.toLowerCase();
      if (property === "float") {
        return "cssFloat";
      } else if (property.charCodeAt(0) === 45 && property.charCodeAt(1) === 109 && property.charCodeAt(2) === 115 && property.charCodeAt(3) === 45) {
        return property.substr(1).replace(pattern2, callback);
      } else {
        return property.replace(pattern2, callback);
      }
    };
    module2.exports = camelCaseCSS;
  }
});

// node_modules/tailwindcss/node_modules/postcss-js/objectifier.js
var require_objectifier = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss-js/objectifier.js"(exports, module2) {
    var camelcase = require_index_es5();
    var UNITLESS = {
      boxFlex: true,
      boxFlexGroup: true,
      columnCount: true,
      flex: true,
      flexGrow: true,
      flexPositive: true,
      flexShrink: true,
      flexNegative: true,
      fontWeight: true,
      lineClamp: true,
      lineHeight: true,
      opacity: true,
      order: true,
      orphans: true,
      tabSize: true,
      widows: true,
      zIndex: true,
      zoom: true,
      fillOpacity: true,
      strokeDashoffset: true,
      strokeOpacity: true,
      strokeWidth: true
    };
    function atRule3(node) {
      if (typeof node.nodes === "undefined") {
        return true;
      } else {
        return process2(node);
      }
    }
    function process2(node) {
      let name;
      let result = {};
      node.each((child) => {
        if (child.type === "atrule") {
          name = "@" + child.name;
          if (child.params)
            name += " " + child.params;
          if (typeof result[name] === "undefined") {
            result[name] = atRule3(child);
          } else if (Array.isArray(result[name])) {
            result[name].push(atRule3(child));
          } else {
            result[name] = [result[name], atRule3(child)];
          }
        } else if (child.type === "rule") {
          let body = process2(child);
          if (result[child.selector]) {
            for (let i in body) {
              result[child.selector][i] = body[i];
            }
          } else {
            result[child.selector] = body;
          }
        } else if (child.type === "decl") {
          if (child.prop[0] === "-" && child.prop[1] === "-") {
            name = child.prop;
          } else if (child.parent && child.parent.selector === ":export") {
            name = child.prop;
          } else {
            name = camelcase(child.prop);
          }
          let value2 = child.value;
          if (!isNaN(child.value) && UNITLESS[name]) {
            value2 = parseFloat(child.value);
          }
          if (child.important)
            value2 += " !important";
          if (typeof result[name] === "undefined") {
            result[name] = value2;
          } else if (Array.isArray(result[name])) {
            result[name].push(value2);
          } else {
            result[name] = [result[name], value2];
          }
        }
      });
      return result;
    }
    module2.exports = process2;
  }
});

// node_modules/tailwindcss/node_modules/postcss-js/parser.js
var require_parser3 = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss-js/parser.js"(exports, module2) {
    var postcss3 = require_postcss();
    var IMPORTANT = /\s*!important\s*$/i;
    var UNITLESS = {
      "box-flex": true,
      "box-flex-group": true,
      "column-count": true,
      "flex": true,
      "flex-grow": true,
      "flex-positive": true,
      "flex-shrink": true,
      "flex-negative": true,
      "font-weight": true,
      "line-clamp": true,
      "line-height": true,
      "opacity": true,
      "order": true,
      "orphans": true,
      "tab-size": true,
      "widows": true,
      "z-index": true,
      "zoom": true,
      "fill-opacity": true,
      "stroke-dashoffset": true,
      "stroke-opacity": true,
      "stroke-width": true
    };
    function dashify(str) {
      return str.replace(/([A-Z])/g, "-$1").replace(/^ms-/, "-ms-").toLowerCase();
    }
    function decl3(parent, name, value2) {
      if (value2 === false || value2 === null)
        return;
      if (!name.startsWith("--")) {
        name = dashify(name);
      }
      if (typeof value2 === "number") {
        if (value2 === 0 || UNITLESS[name]) {
          value2 = value2.toString();
        } else {
          value2 += "px";
        }
      }
      if (name === "css-float")
        name = "float";
      if (IMPORTANT.test(value2)) {
        value2 = value2.replace(IMPORTANT, "");
        parent.push(postcss3.decl({ prop: name, value: value2, important: true }));
      } else {
        parent.push(postcss3.decl({ prop: name, value: value2 }));
      }
    }
    function atRule3(parent, parts, value2) {
      let node = postcss3.atRule({ name: parts[1], params: parts[3] || "" });
      if (typeof value2 === "object") {
        node.nodes = [];
        parse5(value2, node);
      }
      parent.push(node);
    }
    function parse5(obj, parent) {
      let name, value2, node;
      for (name in obj) {
        value2 = obj[name];
        if (value2 === null || typeof value2 === "undefined") {
          continue;
        } else if (name[0] === "@") {
          let parts = name.match(/@(\S+)(\s+([\W\w]*)\s*)?/);
          if (Array.isArray(value2)) {
            for (let i of value2) {
              atRule3(parent, parts, i);
            }
          } else {
            atRule3(parent, parts, value2);
          }
        } else if (Array.isArray(value2)) {
          for (let i of value2) {
            decl3(parent, name, i);
          }
        } else if (typeof value2 === "object") {
          node = postcss3.rule({ selector: name });
          parse5(value2, node);
          parent.push(node);
        } else {
          decl3(parent, name, value2);
        }
      }
    }
    module2.exports = function(obj) {
      let root3 = postcss3.root();
      parse5(obj, root3);
      return root3;
    };
  }
});

// node_modules/tailwindcss/node_modules/postcss-js/process-result.js
var require_process_result = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss-js/process-result.js"(exports, module2) {
    var objectify3 = require_objectifier();
    module2.exports = function processResult(result) {
      if (console && console.warn) {
        result.warnings().forEach((warn2) => {
          let source = warn2.plugin || "PostCSS";
          console.warn(source + ": " + warn2.text);
        });
      }
      return objectify3(result.root);
    };
  }
});

// node_modules/tailwindcss/node_modules/postcss-js/async.js
var require_async = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss-js/async.js"(exports, module2) {
    var postcss3 = require_postcss();
    var processResult = require_process_result();
    var parse5 = require_parser3();
    module2.exports = function async3(plugins) {
      let processor = postcss3(plugins);
      return async (input) => {
        let result = await processor.process(input, {
          parser: parse5,
          from: void 0
        });
        return processResult(result);
      };
    };
  }
});

// node_modules/tailwindcss/node_modules/postcss-js/sync.js
var require_sync = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss-js/sync.js"(exports, module2) {
    var postcss3 = require_postcss();
    var processResult = require_process_result();
    var parse5 = require_parser3();
    module2.exports = function(plugins) {
      let processor = postcss3(plugins);
      return (input) => {
        let result = processor.process(input, { parser: parse5, from: void 0 });
        return processResult(result);
      };
    };
  }
});

// node_modules/tailwindcss/node_modules/postcss-js/index.js
var require_postcss_js = __commonJS({
  "node_modules/tailwindcss/node_modules/postcss-js/index.js"(exports, module2) {
    var objectify3 = require_objectifier();
    var parse5 = require_parser3();
    var async3 = require_async();
    var sync3 = require_sync();
    module2.exports = {
      objectify: objectify3,
      parse: parse5,
      async: async3,
      sync: sync3
    };
  }
});

// node_modules/dlv/dist/dlv.umd.js
var require_dlv_umd = __commonJS({
  "node_modules/dlv/dist/dlv.umd.js"(exports, module2) {
    !function(t, n) {
      "object" == typeof exports && "undefined" != typeof module2 ? module2.exports = function(t2, n2, e, i, o) {
        for (n2 = n2.split ? n2.split(".") : n2, i = 0; i < n2.length; i++)
          t2 = t2 ? t2[n2[i]] : o;
        return t2 === o ? e : t2;
      } : "function" == typeof define && define.amd ? define(function() {
        return function(t2, n2, e, i, o) {
          for (n2 = n2.split ? n2.split(".") : n2, i = 0; i < n2.length; i++)
            t2 = t2 ? t2[n2[i]] : o;
          return t2 === o ? e : t2;
        };
      }) : t.dlv = function(t2, n2, e, i, o) {
        for (n2 = n2.split ? n2.split(".") : n2, i = 0; i < n2.length; i++)
          t2 = t2 ? t2[n2[i]] : o;
        return t2 === o ? e : t2;
      };
    }(exports);
  }
});

// node_modules/didyoumean/didYouMean-1.2.1.js
var require_didYouMean_1_2_1 = __commonJS({
  "node_modules/didyoumean/didYouMean-1.2.1.js"(exports, module2) {
    (function() {
      "use strict";
      function didYouMean2(str, list4, key) {
        if (!str)
          return null;
        if (!didYouMean2.caseSensitive) {
          str = str.toLowerCase();
        }
        var thresholdRelative = didYouMean2.threshold === null ? null : didYouMean2.threshold * str.length, thresholdAbsolute = didYouMean2.thresholdAbsolute, winningVal;
        if (thresholdRelative !== null && thresholdAbsolute !== null)
          winningVal = Math.min(thresholdRelative, thresholdAbsolute);
        else if (thresholdRelative !== null)
          winningVal = thresholdRelative;
        else if (thresholdAbsolute !== null)
          winningVal = thresholdAbsolute;
        else
          winningVal = null;
        var winner, candidate, testCandidate, val, i, len = list4.length;
        for (i = 0; i < len; i++) {
          candidate = list4[i];
          if (key) {
            candidate = candidate[key];
          }
          if (!candidate) {
            continue;
          }
          if (!didYouMean2.caseSensitive) {
            testCandidate = candidate.toLowerCase();
          } else {
            testCandidate = candidate;
          }
          val = getEditDistance(str, testCandidate, winningVal);
          if (winningVal === null || val < winningVal) {
            winningVal = val;
            if (key && didYouMean2.returnWinningObject)
              winner = list4[i];
            else
              winner = candidate;
            if (didYouMean2.returnFirstMatch)
              return winner;
          }
        }
        return winner || didYouMean2.nullResultValue;
      }
      didYouMean2.threshold = 0.4;
      didYouMean2.thresholdAbsolute = 20;
      didYouMean2.caseSensitive = false;
      didYouMean2.nullResultValue = null;
      didYouMean2.returnWinningObject = null;
      didYouMean2.returnFirstMatch = false;
      if (typeof module2 !== "undefined" && module2.exports) {
        module2.exports = didYouMean2;
      } else {
        window.didYouMean = didYouMean2;
      }
      var MAX_INT = Math.pow(2, 32) - 1;
      function getEditDistance(a, b, max2) {
        max2 = max2 || max2 === 0 ? max2 : MAX_INT;
        var lena = a.length;
        var lenb = b.length;
        if (lena === 0)
          return Math.min(max2 + 1, lenb);
        if (lenb === 0)
          return Math.min(max2 + 1, lena);
        if (Math.abs(lena - lenb) > max2)
          return max2 + 1;
        var matrix = [], i, j, colMin, minJ, maxJ;
        for (i = 0; i <= lenb; i++) {
          matrix[i] = [i];
        }
        for (j = 0; j <= lena; j++) {
          matrix[0][j] = j;
        }
        for (i = 1; i <= lenb; i++) {
          colMin = MAX_INT;
          minJ = 1;
          if (i > max2)
            minJ = i - max2;
          maxJ = lenb + 1;
          if (maxJ > max2 + i)
            maxJ = max2 + i;
          for (j = 1; j <= lena; j++) {
            if (j < minJ || j > maxJ) {
              matrix[i][j] = max2 + 1;
            } else {
              if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
              } else {
                matrix[i][j] = Math.min(
                  matrix[i - 1][j - 1] + 1,
                  Math.min(
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                  )
                );
              }
            }
            if (matrix[i][j] < colMin)
              colMin = matrix[i][j];
          }
          if (colMin > max2)
            return max2 + 1;
        }
        return matrix[lenb][lena];
      }
    })();
  }
});

// node_modules/tailwindcss/src/value-parser/parse.js
var require_parse2 = __commonJS({
  "node_modules/tailwindcss/src/value-parser/parse.js"(exports, module2) {
    var openParentheses = "(".charCodeAt(0);
    var closeParentheses = ")".charCodeAt(0);
    var singleQuote = "'".charCodeAt(0);
    var doubleQuote = '"'.charCodeAt(0);
    var backslash = "\\".charCodeAt(0);
    var slash = "/".charCodeAt(0);
    var comma = ",".charCodeAt(0);
    var colon = ":".charCodeAt(0);
    var star = "*".charCodeAt(0);
    var uLower = "u".charCodeAt(0);
    var uUpper = "U".charCodeAt(0);
    var plus = "+".charCodeAt(0);
    var isUnicodeRange = /^[a-f0-9?-]+$/i;
    module2.exports = function(input) {
      var tokens = [];
      var value2 = input;
      var next, quote, prev, token, escape2, escapePos, whitespacePos, parenthesesOpenPos;
      var pos = 0;
      var code = value2.charCodeAt(pos);
      var max2 = value2.length;
      var stack = [{ nodes: tokens }];
      var balanced = 0;
      var parent;
      var name = "";
      var before = "";
      var after = "";
      while (pos < max2) {
        if (code <= 32) {
          next = pos;
          do {
            next += 1;
            code = value2.charCodeAt(next);
          } while (code <= 32);
          token = value2.slice(pos, next);
          prev = tokens[tokens.length - 1];
          if (code === closeParentheses && balanced) {
            after = token;
          } else if (prev && prev.type === "div") {
            prev.after = token;
            prev.sourceEndIndex += token.length;
          } else if (code === comma || code === colon || code === slash && value2.charCodeAt(next + 1) !== star && (!parent || parent && parent.type === "function" && false)) {
            before = token;
          } else {
            tokens.push({
              type: "space",
              sourceIndex: pos,
              sourceEndIndex: next,
              value: token
            });
          }
          pos = next;
        } else if (code === singleQuote || code === doubleQuote) {
          next = pos;
          quote = code === singleQuote ? "'" : '"';
          token = {
            type: "string",
            sourceIndex: pos,
            quote
          };
          do {
            escape2 = false;
            next = value2.indexOf(quote, next + 1);
            if (~next) {
              escapePos = next;
              while (value2.charCodeAt(escapePos - 1) === backslash) {
                escapePos -= 1;
                escape2 = !escape2;
              }
            } else {
              value2 += quote;
              next = value2.length - 1;
              token.unclosed = true;
            }
          } while (escape2);
          token.value = value2.slice(pos + 1, next);
          token.sourceEndIndex = token.unclosed ? next : next + 1;
          tokens.push(token);
          pos = next + 1;
          code = value2.charCodeAt(pos);
        } else if (code === slash && value2.charCodeAt(pos + 1) === star) {
          next = value2.indexOf("*/", pos);
          token = {
            type: "comment",
            sourceIndex: pos,
            sourceEndIndex: next + 2
          };
          if (next === -1) {
            token.unclosed = true;
            next = value2.length;
            token.sourceEndIndex = next;
          }
          token.value = value2.slice(pos + 2, next);
          tokens.push(token);
          pos = next + 2;
          code = value2.charCodeAt(pos);
        } else if ((code === slash || code === star) && parent && parent.type === "function" && true) {
          token = value2[pos];
          tokens.push({
            type: "word",
            sourceIndex: pos - before.length,
            sourceEndIndex: pos + token.length,
            value: token
          });
          pos += 1;
          code = value2.charCodeAt(pos);
        } else if (code === slash || code === comma || code === colon) {
          token = value2[pos];
          tokens.push({
            type: "div",
            sourceIndex: pos - before.length,
            sourceEndIndex: pos + token.length,
            value: token,
            before,
            after: ""
          });
          before = "";
          pos += 1;
          code = value2.charCodeAt(pos);
        } else if (openParentheses === code) {
          next = pos;
          do {
            next += 1;
            code = value2.charCodeAt(next);
          } while (code <= 32);
          parenthesesOpenPos = pos;
          token = {
            type: "function",
            sourceIndex: pos - name.length,
            value: name,
            before: value2.slice(parenthesesOpenPos + 1, next)
          };
          pos = next;
          if (name === "url" && code !== singleQuote && code !== doubleQuote) {
            next -= 1;
            do {
              escape2 = false;
              next = value2.indexOf(")", next + 1);
              if (~next) {
                escapePos = next;
                while (value2.charCodeAt(escapePos - 1) === backslash) {
                  escapePos -= 1;
                  escape2 = !escape2;
                }
              } else {
                value2 += ")";
                next = value2.length - 1;
                token.unclosed = true;
              }
            } while (escape2);
            whitespacePos = next;
            do {
              whitespacePos -= 1;
              code = value2.charCodeAt(whitespacePos);
            } while (code <= 32);
            if (parenthesesOpenPos < whitespacePos) {
              if (pos !== whitespacePos + 1) {
                token.nodes = [
                  {
                    type: "word",
                    sourceIndex: pos,
                    sourceEndIndex: whitespacePos + 1,
                    value: value2.slice(pos, whitespacePos + 1)
                  }
                ];
              } else {
                token.nodes = [];
              }
              if (token.unclosed && whitespacePos + 1 !== next) {
                token.after = "";
                token.nodes.push({
                  type: "space",
                  sourceIndex: whitespacePos + 1,
                  sourceEndIndex: next,
                  value: value2.slice(whitespacePos + 1, next)
                });
              } else {
                token.after = value2.slice(whitespacePos + 1, next);
                token.sourceEndIndex = next;
              }
            } else {
              token.after = "";
              token.nodes = [];
            }
            pos = next + 1;
            token.sourceEndIndex = token.unclosed ? next : pos;
            code = value2.charCodeAt(pos);
            tokens.push(token);
          } else {
            balanced += 1;
            token.after = "";
            token.sourceEndIndex = pos + 1;
            tokens.push(token);
            stack.push(token);
            tokens = token.nodes = [];
            parent = token;
          }
          name = "";
        } else if (closeParentheses === code && balanced) {
          pos += 1;
          code = value2.charCodeAt(pos);
          parent.after = after;
          parent.sourceEndIndex += after.length;
          after = "";
          balanced -= 1;
          stack[stack.length - 1].sourceEndIndex = pos;
          stack.pop();
          parent = stack[balanced];
          tokens = parent.nodes;
        } else {
          next = pos;
          do {
            if (code === backslash) {
              next += 1;
            }
            next += 1;
            code = value2.charCodeAt(next);
          } while (next < max2 && !(code <= 32 || code === singleQuote || code === doubleQuote || code === comma || code === colon || code === slash || code === openParentheses || code === star && parent && parent.type === "function" && true || code === slash && parent.type === "function" && true || code === closeParentheses && balanced));
          token = value2.slice(pos, next);
          if (openParentheses === code) {
            name = token;
          } else if ((uLower === token.charCodeAt(0) || uUpper === token.charCodeAt(0)) && plus === token.charCodeAt(1) && isUnicodeRange.test(token.slice(2))) {
            tokens.push({
              type: "unicode-range",
              sourceIndex: pos,
              sourceEndIndex: next,
              value: token
            });
          } else {
            tokens.push({
              type: "word",
              sourceIndex: pos,
              sourceEndIndex: next,
              value: token
            });
          }
          pos = next;
        }
      }
      for (pos = stack.length - 1; pos; pos -= 1) {
        stack[pos].unclosed = true;
        stack[pos].sourceEndIndex = value2.length;
      }
      return stack[0].nodes;
    };
  }
});

// node_modules/tailwindcss/src/value-parser/walk.js
var require_walk = __commonJS({
  "node_modules/tailwindcss/src/value-parser/walk.js"(exports, module2) {
    module2.exports = function walk(nodes, cb, bubble) {
      var i, max2, node, result;
      for (i = 0, max2 = nodes.length; i < max2; i += 1) {
        node = nodes[i];
        if (!bubble) {
          result = cb(node, i, nodes);
        }
        if (result !== false && node.type === "function" && Array.isArray(node.nodes)) {
          walk(node.nodes, cb, bubble);
        }
        if (bubble) {
          cb(node, i, nodes);
        }
      }
    };
  }
});

// node_modules/tailwindcss/src/value-parser/stringify.js
var require_stringify2 = __commonJS({
  "node_modules/tailwindcss/src/value-parser/stringify.js"(exports, module2) {
    function stringifyNode(node, custom) {
      var type = node.type;
      var value2 = node.value;
      var buf;
      var customResult;
      if (custom && (customResult = custom(node)) !== void 0) {
        return customResult;
      } else if (type === "word" || type === "space") {
        return value2;
      } else if (type === "string") {
        buf = node.quote || "";
        return buf + value2 + (node.unclosed ? "" : buf);
      } else if (type === "comment") {
        return "/*" + value2 + (node.unclosed ? "" : "*/");
      } else if (type === "div") {
        return (node.before || "") + value2 + (node.after || "");
      } else if (Array.isArray(node.nodes)) {
        buf = stringify3(node.nodes, custom);
        if (type !== "function") {
          return buf;
        }
        return value2 + "(" + (node.before || "") + buf + (node.after || "") + (node.unclosed ? "" : ")");
      }
      return value2;
    }
    function stringify3(nodes, custom) {
      var result, i;
      if (Array.isArray(nodes)) {
        result = "";
        for (i = nodes.length - 1; ~i; i -= 1) {
          result = stringifyNode(nodes[i], custom) + result;
        }
        return result;
      }
      return stringifyNode(nodes, custom);
    }
    module2.exports = stringify3;
  }
});

// node_modules/tailwindcss/src/value-parser/unit.js
var require_unit = __commonJS({
  "node_modules/tailwindcss/src/value-parser/unit.js"(exports, module2) {
    var minus = "-".charCodeAt(0);
    var plus = "+".charCodeAt(0);
    var dot = ".".charCodeAt(0);
    var exp = "e".charCodeAt(0);
    var EXP = "E".charCodeAt(0);
    function likeNumber(value2) {
      var code = value2.charCodeAt(0);
      var nextCode;
      if (code === plus || code === minus) {
        nextCode = value2.charCodeAt(1);
        if (nextCode >= 48 && nextCode <= 57) {
          return true;
        }
        var nextNextCode = value2.charCodeAt(2);
        if (nextCode === dot && nextNextCode >= 48 && nextNextCode <= 57) {
          return true;
        }
        return false;
      }
      if (code === dot) {
        nextCode = value2.charCodeAt(1);
        if (nextCode >= 48 && nextCode <= 57) {
          return true;
        }
        return false;
      }
      if (code >= 48 && code <= 57) {
        return true;
      }
      return false;
    }
    module2.exports = function(value2) {
      var pos = 0;
      var length2 = value2.length;
      var code;
      var nextCode;
      var nextNextCode;
      if (length2 === 0 || !likeNumber(value2)) {
        return false;
      }
      code = value2.charCodeAt(pos);
      if (code === plus || code === minus) {
        pos++;
      }
      while (pos < length2) {
        code = value2.charCodeAt(pos);
        if (code < 48 || code > 57) {
          break;
        }
        pos += 1;
      }
      code = value2.charCodeAt(pos);
      nextCode = value2.charCodeAt(pos + 1);
      if (code === dot && nextCode >= 48 && nextCode <= 57) {
        pos += 2;
        while (pos < length2) {
          code = value2.charCodeAt(pos);
          if (code < 48 || code > 57) {
            break;
          }
          pos += 1;
        }
      }
      code = value2.charCodeAt(pos);
      nextCode = value2.charCodeAt(pos + 1);
      nextNextCode = value2.charCodeAt(pos + 2);
      if ((code === exp || code === EXP) && (nextCode >= 48 && nextCode <= 57 || (nextCode === plus || nextCode === minus) && nextNextCode >= 48 && nextNextCode <= 57)) {
        pos += nextCode === plus || nextCode === minus ? 3 : 2;
        while (pos < length2) {
          code = value2.charCodeAt(pos);
          if (code < 48 || code > 57) {
            break;
          }
          pos += 1;
        }
      }
      return {
        number: value2.slice(0, pos),
        unit: value2.slice(pos)
      };
    };
  }
});

// node_modules/tailwindcss/src/value-parser/index.js
var require_value_parser = __commonJS({
  "node_modules/tailwindcss/src/value-parser/index.js"(exports, module2) {
    var parse5 = require_parse2();
    var walk = require_walk();
    var stringify3 = require_stringify2();
    function ValueParser(value2) {
      if (this instanceof ValueParser) {
        this.nodes = parse5(value2);
        return this;
      }
      return new ValueParser(value2);
    }
    ValueParser.prototype.toString = function() {
      return Array.isArray(this.nodes) ? stringify3(this.nodes) : "";
    };
    ValueParser.prototype.walk = function(cb, bubble) {
      walk(this.nodes, cb, bubble);
      return this;
    };
    ValueParser.unit = require_unit();
    ValueParser.walk = walk;
    ValueParser.stringify = stringify3;
    module2.exports = ValueParser;
  }
});

// node_modules/tailwindcss/stubs/config.full.js
var require_config_full = __commonJS({
  "node_modules/tailwindcss/stubs/config.full.js"(exports, module2) {
    module2.exports = {
      content: [],
      presets: [],
      darkMode: "media",
      theme: {
        accentColor: ({ theme }) => ({
          ...theme("colors"),
          auto: "auto"
        }),
        animation: {
          none: "none",
          spin: "spin 1s linear infinite",
          ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
          pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          bounce: "bounce 1s infinite"
        },
        aria: {
          busy: 'busy="true"',
          checked: 'checked="true"',
          disabled: 'disabled="true"',
          expanded: 'expanded="true"',
          hidden: 'hidden="true"',
          pressed: 'pressed="true"',
          readonly: 'readonly="true"',
          required: 'required="true"',
          selected: 'selected="true"'
        },
        aspectRatio: {
          auto: "auto",
          square: "1 / 1",
          video: "16 / 9"
        },
        backdropBlur: ({ theme }) => theme("blur"),
        backdropBrightness: ({ theme }) => theme("brightness"),
        backdropContrast: ({ theme }) => theme("contrast"),
        backdropGrayscale: ({ theme }) => theme("grayscale"),
        backdropHueRotate: ({ theme }) => theme("hueRotate"),
        backdropInvert: ({ theme }) => theme("invert"),
        backdropOpacity: ({ theme }) => theme("opacity"),
        backdropSaturate: ({ theme }) => theme("saturate"),
        backdropSepia: ({ theme }) => theme("sepia"),
        backgroundColor: ({ theme }) => theme("colors"),
        backgroundImage: {
          none: "none",
          "gradient-to-t": "linear-gradient(to top, var(--tw-gradient-stops))",
          "gradient-to-tr": "linear-gradient(to top right, var(--tw-gradient-stops))",
          "gradient-to-r": "linear-gradient(to right, var(--tw-gradient-stops))",
          "gradient-to-br": "linear-gradient(to bottom right, var(--tw-gradient-stops))",
          "gradient-to-b": "linear-gradient(to bottom, var(--tw-gradient-stops))",
          "gradient-to-bl": "linear-gradient(to bottom left, var(--tw-gradient-stops))",
          "gradient-to-l": "linear-gradient(to left, var(--tw-gradient-stops))",
          "gradient-to-tl": "linear-gradient(to top left, var(--tw-gradient-stops))"
        },
        backgroundOpacity: ({ theme }) => theme("opacity"),
        backgroundPosition: {
          bottom: "bottom",
          center: "center",
          left: "left",
          "left-bottom": "left bottom",
          "left-top": "left top",
          right: "right",
          "right-bottom": "right bottom",
          "right-top": "right top",
          top: "top"
        },
        backgroundSize: {
          auto: "auto",
          cover: "cover",
          contain: "contain"
        },
        blur: {
          0: "0",
          none: "0",
          sm: "4px",
          DEFAULT: "8px",
          md: "12px",
          lg: "16px",
          xl: "24px",
          "2xl": "40px",
          "3xl": "64px"
        },
        borderColor: ({ theme }) => ({
          ...theme("colors"),
          DEFAULT: theme("colors.gray.200", "currentColor")
        }),
        borderOpacity: ({ theme }) => theme("opacity"),
        borderRadius: {
          none: "0px",
          sm: "0.125rem",
          DEFAULT: "0.25rem",
          md: "0.375rem",
          lg: "0.5rem",
          xl: "0.75rem",
          "2xl": "1rem",
          "3xl": "1.5rem",
          full: "9999px"
        },
        borderSpacing: ({ theme }) => ({
          ...theme("spacing")
        }),
        borderWidth: {
          DEFAULT: "1px",
          0: "0px",
          2: "2px",
          4: "4px",
          8: "8px"
        },
        boxShadow: {
          sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
          DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
          md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
          xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
          "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
          inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
          none: "none"
        },
        boxShadowColor: ({ theme }) => theme("colors"),
        brightness: {
          0: "0",
          50: ".5",
          75: ".75",
          90: ".9",
          95: ".95",
          100: "1",
          105: "1.05",
          110: "1.1",
          125: "1.25",
          150: "1.5",
          200: "2"
        },
        caretColor: ({ theme }) => theme("colors"),
        colors: ({ colors }) => ({
          inherit: colors.inherit,
          current: colors.current,
          transparent: colors.transparent,
          black: colors.black,
          white: colors.white,
          slate: colors.slate,
          gray: colors.gray,
          zinc: colors.zinc,
          neutral: colors.neutral,
          stone: colors.stone,
          red: colors.red,
          orange: colors.orange,
          amber: colors.amber,
          yellow: colors.yellow,
          lime: colors.lime,
          green: colors.green,
          emerald: colors.emerald,
          teal: colors.teal,
          cyan: colors.cyan,
          sky: colors.sky,
          blue: colors.blue,
          indigo: colors.indigo,
          violet: colors.violet,
          purple: colors.purple,
          fuchsia: colors.fuchsia,
          pink: colors.pink,
          rose: colors.rose
        }),
        columns: {
          auto: "auto",
          1: "1",
          2: "2",
          3: "3",
          4: "4",
          5: "5",
          6: "6",
          7: "7",
          8: "8",
          9: "9",
          10: "10",
          11: "11",
          12: "12",
          "3xs": "16rem",
          "2xs": "18rem",
          xs: "20rem",
          sm: "24rem",
          md: "28rem",
          lg: "32rem",
          xl: "36rem",
          "2xl": "42rem",
          "3xl": "48rem",
          "4xl": "56rem",
          "5xl": "64rem",
          "6xl": "72rem",
          "7xl": "80rem"
        },
        container: {},
        content: {
          none: "none"
        },
        contrast: {
          0: "0",
          50: ".5",
          75: ".75",
          100: "1",
          125: "1.25",
          150: "1.5",
          200: "2"
        },
        cursor: {
          auto: "auto",
          default: "default",
          pointer: "pointer",
          wait: "wait",
          text: "text",
          move: "move",
          help: "help",
          "not-allowed": "not-allowed",
          none: "none",
          "context-menu": "context-menu",
          progress: "progress",
          cell: "cell",
          crosshair: "crosshair",
          "vertical-text": "vertical-text",
          alias: "alias",
          copy: "copy",
          "no-drop": "no-drop",
          grab: "grab",
          grabbing: "grabbing",
          "all-scroll": "all-scroll",
          "col-resize": "col-resize",
          "row-resize": "row-resize",
          "n-resize": "n-resize",
          "e-resize": "e-resize",
          "s-resize": "s-resize",
          "w-resize": "w-resize",
          "ne-resize": "ne-resize",
          "nw-resize": "nw-resize",
          "se-resize": "se-resize",
          "sw-resize": "sw-resize",
          "ew-resize": "ew-resize",
          "ns-resize": "ns-resize",
          "nesw-resize": "nesw-resize",
          "nwse-resize": "nwse-resize",
          "zoom-in": "zoom-in",
          "zoom-out": "zoom-out"
        },
        divideColor: ({ theme }) => theme("borderColor"),
        divideOpacity: ({ theme }) => theme("borderOpacity"),
        divideWidth: ({ theme }) => theme("borderWidth"),
        dropShadow: {
          sm: "0 1px 1px rgb(0 0 0 / 0.05)",
          DEFAULT: ["0 1px 2px rgb(0 0 0 / 0.1)", "0 1px 1px rgb(0 0 0 / 0.06)"],
          md: ["0 4px 3px rgb(0 0 0 / 0.07)", "0 2px 2px rgb(0 0 0 / 0.06)"],
          lg: ["0 10px 8px rgb(0 0 0 / 0.04)", "0 4px 3px rgb(0 0 0 / 0.1)"],
          xl: ["0 20px 13px rgb(0 0 0 / 0.03)", "0 8px 5px rgb(0 0 0 / 0.08)"],
          "2xl": "0 25px 25px rgb(0 0 0 / 0.15)",
          none: "0 0 #0000"
        },
        fill: ({ theme }) => ({
          none: "none",
          ...theme("colors")
        }),
        flex: {
          1: "1 1 0%",
          auto: "1 1 auto",
          initial: "0 1 auto",
          none: "none"
        },
        flexBasis: ({ theme }) => ({
          auto: "auto",
          ...theme("spacing"),
          "1/2": "50%",
          "1/3": "33.333333%",
          "2/3": "66.666667%",
          "1/4": "25%",
          "2/4": "50%",
          "3/4": "75%",
          "1/5": "20%",
          "2/5": "40%",
          "3/5": "60%",
          "4/5": "80%",
          "1/6": "16.666667%",
          "2/6": "33.333333%",
          "3/6": "50%",
          "4/6": "66.666667%",
          "5/6": "83.333333%",
          "1/12": "8.333333%",
          "2/12": "16.666667%",
          "3/12": "25%",
          "4/12": "33.333333%",
          "5/12": "41.666667%",
          "6/12": "50%",
          "7/12": "58.333333%",
          "8/12": "66.666667%",
          "9/12": "75%",
          "10/12": "83.333333%",
          "11/12": "91.666667%",
          full: "100%"
        }),
        flexGrow: {
          0: "0",
          DEFAULT: "1"
        },
        flexShrink: {
          0: "0",
          DEFAULT: "1"
        },
        fontFamily: {
          sans: [
            "ui-sans-serif",
            "system-ui",
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            '"Noto Sans"',
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
            '"Noto Color Emoji"'
          ],
          serif: ["ui-serif", "Georgia", "Cambria", '"Times New Roman"', "Times", "serif"],
          mono: [
            "ui-monospace",
            "SFMono-Regular",
            "Menlo",
            "Monaco",
            "Consolas",
            '"Liberation Mono"',
            '"Courier New"',
            "monospace"
          ]
        },
        fontSize: {
          xs: ["0.75rem", { lineHeight: "1rem" }],
          sm: ["0.875rem", { lineHeight: "1.25rem" }],
          base: ["1rem", { lineHeight: "1.5rem" }],
          lg: ["1.125rem", { lineHeight: "1.75rem" }],
          xl: ["1.25rem", { lineHeight: "1.75rem" }],
          "2xl": ["1.5rem", { lineHeight: "2rem" }],
          "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
          "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
          "5xl": ["3rem", { lineHeight: "1" }],
          "6xl": ["3.75rem", { lineHeight: "1" }],
          "7xl": ["4.5rem", { lineHeight: "1" }],
          "8xl": ["6rem", { lineHeight: "1" }],
          "9xl": ["8rem", { lineHeight: "1" }]
        },
        fontWeight: {
          thin: "100",
          extralight: "200",
          light: "300",
          normal: "400",
          medium: "500",
          semibold: "600",
          bold: "700",
          extrabold: "800",
          black: "900"
        },
        gap: ({ theme }) => theme("spacing"),
        gradientColorStops: ({ theme }) => theme("colors"),
        gradientColorStopPositions: {
          "0%": "0%",
          "5%": "5%",
          "10%": "10%",
          "15%": "15%",
          "20%": "20%",
          "25%": "25%",
          "30%": "30%",
          "35%": "35%",
          "40%": "40%",
          "45%": "45%",
          "50%": "50%",
          "55%": "55%",
          "60%": "60%",
          "65%": "65%",
          "70%": "70%",
          "75%": "75%",
          "80%": "80%",
          "85%": "85%",
          "90%": "90%",
          "95%": "95%",
          "100%": "100%"
        },
        grayscale: {
          0: "0",
          DEFAULT: "100%"
        },
        gridAutoColumns: {
          auto: "auto",
          min: "min-content",
          max: "max-content",
          fr: "minmax(0, 1fr)"
        },
        gridAutoRows: {
          auto: "auto",
          min: "min-content",
          max: "max-content",
          fr: "minmax(0, 1fr)"
        },
        gridColumn: {
          auto: "auto",
          "span-1": "span 1 / span 1",
          "span-2": "span 2 / span 2",
          "span-3": "span 3 / span 3",
          "span-4": "span 4 / span 4",
          "span-5": "span 5 / span 5",
          "span-6": "span 6 / span 6",
          "span-7": "span 7 / span 7",
          "span-8": "span 8 / span 8",
          "span-9": "span 9 / span 9",
          "span-10": "span 10 / span 10",
          "span-11": "span 11 / span 11",
          "span-12": "span 12 / span 12",
          "span-full": "1 / -1"
        },
        gridColumnEnd: {
          auto: "auto",
          1: "1",
          2: "2",
          3: "3",
          4: "4",
          5: "5",
          6: "6",
          7: "7",
          8: "8",
          9: "9",
          10: "10",
          11: "11",
          12: "12",
          13: "13"
        },
        gridColumnStart: {
          auto: "auto",
          1: "1",
          2: "2",
          3: "3",
          4: "4",
          5: "5",
          6: "6",
          7: "7",
          8: "8",
          9: "9",
          10: "10",
          11: "11",
          12: "12",
          13: "13"
        },
        gridRow: {
          auto: "auto",
          "span-1": "span 1 / span 1",
          "span-2": "span 2 / span 2",
          "span-3": "span 3 / span 3",
          "span-4": "span 4 / span 4",
          "span-5": "span 5 / span 5",
          "span-6": "span 6 / span 6",
          "span-full": "1 / -1"
        },
        gridRowEnd: {
          auto: "auto",
          1: "1",
          2: "2",
          3: "3",
          4: "4",
          5: "5",
          6: "6",
          7: "7"
        },
        gridRowStart: {
          auto: "auto",
          1: "1",
          2: "2",
          3: "3",
          4: "4",
          5: "5",
          6: "6",
          7: "7"
        },
        gridTemplateColumns: {
          none: "none",
          1: "repeat(1, minmax(0, 1fr))",
          2: "repeat(2, minmax(0, 1fr))",
          3: "repeat(3, minmax(0, 1fr))",
          4: "repeat(4, minmax(0, 1fr))",
          5: "repeat(5, minmax(0, 1fr))",
          6: "repeat(6, minmax(0, 1fr))",
          7: "repeat(7, minmax(0, 1fr))",
          8: "repeat(8, minmax(0, 1fr))",
          9: "repeat(9, minmax(0, 1fr))",
          10: "repeat(10, minmax(0, 1fr))",
          11: "repeat(11, minmax(0, 1fr))",
          12: "repeat(12, minmax(0, 1fr))"
        },
        gridTemplateRows: {
          none: "none",
          1: "repeat(1, minmax(0, 1fr))",
          2: "repeat(2, minmax(0, 1fr))",
          3: "repeat(3, minmax(0, 1fr))",
          4: "repeat(4, minmax(0, 1fr))",
          5: "repeat(5, minmax(0, 1fr))",
          6: "repeat(6, minmax(0, 1fr))"
        },
        height: ({ theme }) => ({
          auto: "auto",
          ...theme("spacing"),
          "1/2": "50%",
          "1/3": "33.333333%",
          "2/3": "66.666667%",
          "1/4": "25%",
          "2/4": "50%",
          "3/4": "75%",
          "1/5": "20%",
          "2/5": "40%",
          "3/5": "60%",
          "4/5": "80%",
          "1/6": "16.666667%",
          "2/6": "33.333333%",
          "3/6": "50%",
          "4/6": "66.666667%",
          "5/6": "83.333333%",
          full: "100%",
          screen: "100vh",
          min: "min-content",
          max: "max-content",
          fit: "fit-content"
        }),
        hueRotate: {
          0: "0deg",
          15: "15deg",
          30: "30deg",
          60: "60deg",
          90: "90deg",
          180: "180deg"
        },
        inset: ({ theme }) => ({
          auto: "auto",
          ...theme("spacing"),
          "1/2": "50%",
          "1/3": "33.333333%",
          "2/3": "66.666667%",
          "1/4": "25%",
          "2/4": "50%",
          "3/4": "75%",
          full: "100%"
        }),
        invert: {
          0: "0",
          DEFAULT: "100%"
        },
        keyframes: {
          spin: {
            to: {
              transform: "rotate(360deg)"
            }
          },
          ping: {
            "75%, 100%": {
              transform: "scale(2)",
              opacity: "0"
            }
          },
          pulse: {
            "50%": {
              opacity: ".5"
            }
          },
          bounce: {
            "0%, 100%": {
              transform: "translateY(-25%)",
              animationTimingFunction: "cubic-bezier(0.8,0,1,1)"
            },
            "50%": {
              transform: "none",
              animationTimingFunction: "cubic-bezier(0,0,0.2,1)"
            }
          }
        },
        letterSpacing: {
          tighter: "-0.05em",
          tight: "-0.025em",
          normal: "0em",
          wide: "0.025em",
          wider: "0.05em",
          widest: "0.1em"
        },
        lineHeight: {
          none: "1",
          tight: "1.25",
          snug: "1.375",
          normal: "1.5",
          relaxed: "1.625",
          loose: "2",
          3: ".75rem",
          4: "1rem",
          5: "1.25rem",
          6: "1.5rem",
          7: "1.75rem",
          8: "2rem",
          9: "2.25rem",
          10: "2.5rem"
        },
        listStyleType: {
          none: "none",
          disc: "disc",
          decimal: "decimal"
        },
        listStyleImage: {
          none: "none"
        },
        margin: ({ theme }) => ({
          auto: "auto",
          ...theme("spacing")
        }),
        lineClamp: {
          1: "1",
          2: "2",
          3: "3",
          4: "4",
          5: "5",
          6: "6"
        },
        maxHeight: ({ theme }) => ({
          ...theme("spacing"),
          none: "none",
          full: "100%",
          screen: "100vh",
          min: "min-content",
          max: "max-content",
          fit: "fit-content"
        }),
        maxWidth: ({ theme, breakpoints }) => ({
          none: "none",
          0: "0rem",
          xs: "20rem",
          sm: "24rem",
          md: "28rem",
          lg: "32rem",
          xl: "36rem",
          "2xl": "42rem",
          "3xl": "48rem",
          "4xl": "56rem",
          "5xl": "64rem",
          "6xl": "72rem",
          "7xl": "80rem",
          full: "100%",
          min: "min-content",
          max: "max-content",
          fit: "fit-content",
          prose: "65ch",
          ...breakpoints(theme("screens"))
        }),
        minHeight: {
          0: "0px",
          full: "100%",
          screen: "100vh",
          min: "min-content",
          max: "max-content",
          fit: "fit-content"
        },
        minWidth: {
          0: "0px",
          full: "100%",
          min: "min-content",
          max: "max-content",
          fit: "fit-content"
        },
        objectPosition: {
          bottom: "bottom",
          center: "center",
          left: "left",
          "left-bottom": "left bottom",
          "left-top": "left top",
          right: "right",
          "right-bottom": "right bottom",
          "right-top": "right top",
          top: "top"
        },
        opacity: {
          0: "0",
          5: "0.05",
          10: "0.1",
          20: "0.2",
          25: "0.25",
          30: "0.3",
          40: "0.4",
          50: "0.5",
          60: "0.6",
          70: "0.7",
          75: "0.75",
          80: "0.8",
          90: "0.9",
          95: "0.95",
          100: "1"
        },
        order: {
          first: "-9999",
          last: "9999",
          none: "0",
          1: "1",
          2: "2",
          3: "3",
          4: "4",
          5: "5",
          6: "6",
          7: "7",
          8: "8",
          9: "9",
          10: "10",
          11: "11",
          12: "12"
        },
        outlineColor: ({ theme }) => theme("colors"),
        outlineOffset: {
          0: "0px",
          1: "1px",
          2: "2px",
          4: "4px",
          8: "8px"
        },
        outlineWidth: {
          0: "0px",
          1: "1px",
          2: "2px",
          4: "4px",
          8: "8px"
        },
        padding: ({ theme }) => theme("spacing"),
        placeholderColor: ({ theme }) => theme("colors"),
        placeholderOpacity: ({ theme }) => theme("opacity"),
        ringColor: ({ theme }) => ({
          DEFAULT: theme("colors.blue.500", "#3b82f6"),
          ...theme("colors")
        }),
        ringOffsetColor: ({ theme }) => theme("colors"),
        ringOffsetWidth: {
          0: "0px",
          1: "1px",
          2: "2px",
          4: "4px",
          8: "8px"
        },
        ringOpacity: ({ theme }) => ({
          DEFAULT: "0.5",
          ...theme("opacity")
        }),
        ringWidth: {
          DEFAULT: "3px",
          0: "0px",
          1: "1px",
          2: "2px",
          4: "4px",
          8: "8px"
        },
        rotate: {
          0: "0deg",
          1: "1deg",
          2: "2deg",
          3: "3deg",
          6: "6deg",
          12: "12deg",
          45: "45deg",
          90: "90deg",
          180: "180deg"
        },
        saturate: {
          0: "0",
          50: ".5",
          100: "1",
          150: "1.5",
          200: "2"
        },
        scale: {
          0: "0",
          50: ".5",
          75: ".75",
          90: ".9",
          95: ".95",
          100: "1",
          105: "1.05",
          110: "1.1",
          125: "1.25",
          150: "1.5"
        },
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1536px"
        },
        scrollMargin: ({ theme }) => ({
          ...theme("spacing")
        }),
        scrollPadding: ({ theme }) => theme("spacing"),
        sepia: {
          0: "0",
          DEFAULT: "100%"
        },
        skew: {
          0: "0deg",
          1: "1deg",
          2: "2deg",
          3: "3deg",
          6: "6deg",
          12: "12deg"
        },
        space: ({ theme }) => ({
          ...theme("spacing")
        }),
        spacing: {
          px: "1px",
          0: "0px",
          0.5: "0.125rem",
          1: "0.25rem",
          1.5: "0.375rem",
          2: "0.5rem",
          2.5: "0.625rem",
          3: "0.75rem",
          3.5: "0.875rem",
          4: "1rem",
          5: "1.25rem",
          6: "1.5rem",
          7: "1.75rem",
          8: "2rem",
          9: "2.25rem",
          10: "2.5rem",
          11: "2.75rem",
          12: "3rem",
          14: "3.5rem",
          16: "4rem",
          20: "5rem",
          24: "6rem",
          28: "7rem",
          32: "8rem",
          36: "9rem",
          40: "10rem",
          44: "11rem",
          48: "12rem",
          52: "13rem",
          56: "14rem",
          60: "15rem",
          64: "16rem",
          72: "18rem",
          80: "20rem",
          96: "24rem"
        },
        stroke: ({ theme }) => ({
          none: "none",
          ...theme("colors")
        }),
        strokeWidth: {
          0: "0",
          1: "1",
          2: "2"
        },
        supports: {},
        data: {},
        textColor: ({ theme }) => theme("colors"),
        textDecorationColor: ({ theme }) => theme("colors"),
        textDecorationThickness: {
          auto: "auto",
          "from-font": "from-font",
          0: "0px",
          1: "1px",
          2: "2px",
          4: "4px",
          8: "8px"
        },
        textIndent: ({ theme }) => ({
          ...theme("spacing")
        }),
        textOpacity: ({ theme }) => theme("opacity"),
        textUnderlineOffset: {
          auto: "auto",
          0: "0px",
          1: "1px",
          2: "2px",
          4: "4px",
          8: "8px"
        },
        transformOrigin: {
          center: "center",
          top: "top",
          "top-right": "top right",
          right: "right",
          "bottom-right": "bottom right",
          bottom: "bottom",
          "bottom-left": "bottom left",
          left: "left",
          "top-left": "top left"
        },
        transitionDelay: {
          0: "0s",
          75: "75ms",
          100: "100ms",
          150: "150ms",
          200: "200ms",
          300: "300ms",
          500: "500ms",
          700: "700ms",
          1e3: "1000ms"
        },
        transitionDuration: {
          DEFAULT: "150ms",
          0: "0s",
          75: "75ms",
          100: "100ms",
          150: "150ms",
          200: "200ms",
          300: "300ms",
          500: "500ms",
          700: "700ms",
          1e3: "1000ms"
        },
        transitionProperty: {
          none: "none",
          all: "all",
          DEFAULT: "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
          colors: "color, background-color, border-color, text-decoration-color, fill, stroke",
          opacity: "opacity",
          shadow: "box-shadow",
          transform: "transform"
        },
        transitionTimingFunction: {
          DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
          linear: "linear",
          in: "cubic-bezier(0.4, 0, 1, 1)",
          out: "cubic-bezier(0, 0, 0.2, 1)",
          "in-out": "cubic-bezier(0.4, 0, 0.2, 1)"
        },
        translate: ({ theme }) => ({
          ...theme("spacing"),
          "1/2": "50%",
          "1/3": "33.333333%",
          "2/3": "66.666667%",
          "1/4": "25%",
          "2/4": "50%",
          "3/4": "75%",
          full: "100%"
        }),
        width: ({ theme }) => ({
          auto: "auto",
          ...theme("spacing"),
          "1/2": "50%",
          "1/3": "33.333333%",
          "2/3": "66.666667%",
          "1/4": "25%",
          "2/4": "50%",
          "3/4": "75%",
          "1/5": "20%",
          "2/5": "40%",
          "3/5": "60%",
          "4/5": "80%",
          "1/6": "16.666667%",
          "2/6": "33.333333%",
          "3/6": "50%",
          "4/6": "66.666667%",
          "5/6": "83.333333%",
          "1/12": "8.333333%",
          "2/12": "16.666667%",
          "3/12": "25%",
          "4/12": "33.333333%",
          "5/12": "41.666667%",
          "6/12": "50%",
          "7/12": "58.333333%",
          "8/12": "66.666667%",
          "9/12": "75%",
          "10/12": "83.333333%",
          "11/12": "91.666667%",
          full: "100%",
          screen: "100vw",
          min: "min-content",
          max: "max-content",
          fit: "fit-content"
        }),
        willChange: {
          auto: "auto",
          scroll: "scroll-position",
          contents: "contents",
          transform: "transform"
        },
        zIndex: {
          auto: "auto",
          0: "0",
          10: "10",
          20: "20",
          30: "30",
          40: "40",
          50: "50"
        }
      },
      plugins: []
    };
  }
});

// (disabled):node_modules/postcss/lib/terminal-highlight
var require_terminal_highlight2 = __commonJS({
  "(disabled):node_modules/postcss/lib/terminal-highlight"() {
  }
});

// node_modules/postcss/lib/css-syntax-error.js
var require_css_syntax_error2 = __commonJS({
  "node_modules/postcss/lib/css-syntax-error.js"(exports, module2) {
    "use strict";
    var pico = (init_picocolors(), __toCommonJS(picocolors_exports));
    var terminalHighlight = require_terminal_highlight2();
    var CssSyntaxError3 = class extends Error {
      constructor(message, line, column, source, file, plugin3) {
        super(message);
        this.name = "CssSyntaxError";
        this.reason = message;
        if (file) {
          this.file = file;
        }
        if (source) {
          this.source = source;
        }
        if (plugin3) {
          this.plugin = plugin3;
        }
        if (typeof line !== "undefined" && typeof column !== "undefined") {
          if (typeof line === "number") {
            this.line = line;
            this.column = column;
          } else {
            this.line = line.line;
            this.column = line.column;
            this.endLine = column.line;
            this.endColumn = column.column;
          }
        }
        this.setMessage();
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, CssSyntaxError3);
        }
      }
      setMessage() {
        this.message = this.plugin ? this.plugin + ": " : "";
        this.message += this.file ? this.file : "<css input>";
        if (typeof this.line !== "undefined") {
          this.message += ":" + this.line + ":" + this.column;
        }
        this.message += ": " + this.reason;
      }
      showSourceCode(color2) {
        if (!this.source)
          return "";
        let css = this.source;
        if (color2 == null)
          color2 = pico.isColorSupported;
        if (terminalHighlight) {
          if (color2)
            css = terminalHighlight(css);
        }
        let lines = css.split(/\r?\n/);
        let start = Math.max(this.line - 3, 0);
        let end = Math.min(this.line + 2, lines.length);
        let maxWidth = String(end).length;
        let mark, aside;
        if (color2) {
          let { bold, red, gray } = pico.createColors(true);
          mark = (text) => bold(red(text));
          aside = (text) => gray(text);
        } else {
          mark = aside = (str) => str;
        }
        return lines.slice(start, end).map((line, index3) => {
          let number2 = start + 1 + index3;
          let gutter = " " + (" " + number2).slice(-maxWidth) + " | ";
          if (number2 === this.line) {
            let spacing = aside(gutter.replace(/\d/g, " ")) + line.slice(0, this.column - 1).replace(/[^\t]/g, " ");
            return mark(">") + aside(gutter) + line + "\n " + spacing + mark("^");
          }
          return " " + aside(gutter) + line;
        }).join("\n");
      }
      toString() {
        let code = this.showSourceCode();
        if (code) {
          code = "\n\n" + code + "\n";
        }
        return this.name + ": " + this.message + code;
      }
    };
    module2.exports = CssSyntaxError3;
    CssSyntaxError3.default = CssSyntaxError3;
  }
});

// node_modules/postcss/lib/symbols.js
var require_symbols2 = __commonJS({
  "node_modules/postcss/lib/symbols.js"(exports, module2) {
    "use strict";
    module2.exports.isClean = Symbol("isClean");
    module2.exports.my = Symbol("my");
  }
});

// node_modules/postcss/lib/stringifier.js
var require_stringifier2 = __commonJS({
  "node_modules/postcss/lib/stringifier.js"(exports, module2) {
    "use strict";
    var DEFAULT_RAW = {
      colon: ": ",
      indent: "    ",
      beforeDecl: "\n",
      beforeRule: "\n",
      beforeOpen: " ",
      beforeClose: "\n",
      beforeComment: "\n",
      after: "\n",
      emptyBody: "",
      commentLeft: " ",
      commentRight: " ",
      semicolon: false
    };
    function capitalize(str) {
      return str[0].toUpperCase() + str.slice(1);
    }
    var Stringifier = class {
      constructor(builder) {
        this.builder = builder;
      }
      stringify(node, semicolon) {
        if (!this[node.type]) {
          throw new Error(
            "Unknown AST node type " + node.type + ". Maybe you need to change PostCSS stringifier."
          );
        }
        this[node.type](node, semicolon);
      }
      document(node) {
        this.body(node);
      }
      root(node) {
        this.body(node);
        if (node.raws.after)
          this.builder(node.raws.after);
      }
      comment(node) {
        let left = this.raw(node, "left", "commentLeft");
        let right = this.raw(node, "right", "commentRight");
        this.builder("/*" + left + node.text + right + "*/", node);
      }
      decl(node, semicolon) {
        let between = this.raw(node, "between", "colon");
        let string = node.prop + between + this.rawValue(node, "value");
        if (node.important) {
          string += node.raws.important || " !important";
        }
        if (semicolon)
          string += ";";
        this.builder(string, node);
      }
      rule(node) {
        this.block(node, this.rawValue(node, "selector"));
        if (node.raws.ownSemicolon) {
          this.builder(node.raws.ownSemicolon, node, "end");
        }
      }
      atrule(node, semicolon) {
        let name = "@" + node.name;
        let params = node.params ? this.rawValue(node, "params") : "";
        if (typeof node.raws.afterName !== "undefined") {
          name += node.raws.afterName;
        } else if (params) {
          name += " ";
        }
        if (node.nodes) {
          this.block(node, name + params);
        } else {
          let end = (node.raws.between || "") + (semicolon ? ";" : "");
          this.builder(name + params + end, node);
        }
      }
      body(node) {
        let last = node.nodes.length - 1;
        while (last > 0) {
          if (node.nodes[last].type !== "comment")
            break;
          last -= 1;
        }
        let semicolon = this.raw(node, "semicolon");
        for (let i = 0; i < node.nodes.length; i++) {
          let child = node.nodes[i];
          let before = this.raw(child, "before");
          if (before)
            this.builder(before);
          this.stringify(child, last !== i || semicolon);
        }
      }
      block(node, start) {
        let between = this.raw(node, "between", "beforeOpen");
        this.builder(start + between + "{", node, "start");
        let after;
        if (node.nodes && node.nodes.length) {
          this.body(node);
          after = this.raw(node, "after");
        } else {
          after = this.raw(node, "after", "emptyBody");
        }
        if (after)
          this.builder(after);
        this.builder("}", node, "end");
      }
      raw(node, own, detect) {
        let value2;
        if (!detect)
          detect = own;
        if (own) {
          value2 = node.raws[own];
          if (typeof value2 !== "undefined")
            return value2;
        }
        let parent = node.parent;
        if (detect === "before") {
          if (!parent || parent.type === "root" && parent.first === node) {
            return "";
          }
          if (parent && parent.type === "document") {
            return "";
          }
        }
        if (!parent)
          return DEFAULT_RAW[detect];
        let root3 = node.root();
        if (!root3.rawCache)
          root3.rawCache = {};
        if (typeof root3.rawCache[detect] !== "undefined") {
          return root3.rawCache[detect];
        }
        if (detect === "before" || detect === "after") {
          return this.beforeAfter(node, detect);
        } else {
          let method = "raw" + capitalize(detect);
          if (this[method]) {
            value2 = this[method](root3, node);
          } else {
            root3.walk((i) => {
              value2 = i.raws[own];
              if (typeof value2 !== "undefined")
                return false;
            });
          }
        }
        if (typeof value2 === "undefined")
          value2 = DEFAULT_RAW[detect];
        root3.rawCache[detect] = value2;
        return value2;
      }
      rawSemicolon(root3) {
        let value2;
        root3.walk((i) => {
          if (i.nodes && i.nodes.length && i.last.type === "decl") {
            value2 = i.raws.semicolon;
            if (typeof value2 !== "undefined")
              return false;
          }
        });
        return value2;
      }
      rawEmptyBody(root3) {
        let value2;
        root3.walk((i) => {
          if (i.nodes && i.nodes.length === 0) {
            value2 = i.raws.after;
            if (typeof value2 !== "undefined")
              return false;
          }
        });
        return value2;
      }
      rawIndent(root3) {
        if (root3.raws.indent)
          return root3.raws.indent;
        let value2;
        root3.walk((i) => {
          let p = i.parent;
          if (p && p !== root3 && p.parent && p.parent === root3) {
            if (typeof i.raws.before !== "undefined") {
              let parts = i.raws.before.split("\n");
              value2 = parts[parts.length - 1];
              value2 = value2.replace(/\S/g, "");
              return false;
            }
          }
        });
        return value2;
      }
      rawBeforeComment(root3, node) {
        let value2;
        root3.walkComments((i) => {
          if (typeof i.raws.before !== "undefined") {
            value2 = i.raws.before;
            if (value2.includes("\n")) {
              value2 = value2.replace(/[^\n]+$/, "");
            }
            return false;
          }
        });
        if (typeof value2 === "undefined") {
          value2 = this.raw(node, null, "beforeDecl");
        } else if (value2) {
          value2 = value2.replace(/\S/g, "");
        }
        return value2;
      }
      rawBeforeDecl(root3, node) {
        let value2;
        root3.walkDecls((i) => {
          if (typeof i.raws.before !== "undefined") {
            value2 = i.raws.before;
            if (value2.includes("\n")) {
              value2 = value2.replace(/[^\n]+$/, "");
            }
            return false;
          }
        });
        if (typeof value2 === "undefined") {
          value2 = this.raw(node, null, "beforeRule");
        } else if (value2) {
          value2 = value2.replace(/\S/g, "");
        }
        return value2;
      }
      rawBeforeRule(root3) {
        let value2;
        root3.walk((i) => {
          if (i.nodes && (i.parent !== root3 || root3.first !== i)) {
            if (typeof i.raws.before !== "undefined") {
              value2 = i.raws.before;
              if (value2.includes("\n")) {
                value2 = value2.replace(/[^\n]+$/, "");
              }
              return false;
            }
          }
        });
        if (value2)
          value2 = value2.replace(/\S/g, "");
        return value2;
      }
      rawBeforeClose(root3) {
        let value2;
        root3.walk((i) => {
          if (i.nodes && i.nodes.length > 0) {
            if (typeof i.raws.after !== "undefined") {
              value2 = i.raws.after;
              if (value2.includes("\n")) {
                value2 = value2.replace(/[^\n]+$/, "");
              }
              return false;
            }
          }
        });
        if (value2)
          value2 = value2.replace(/\S/g, "");
        return value2;
      }
      rawBeforeOpen(root3) {
        let value2;
        root3.walk((i) => {
          if (i.type !== "decl") {
            value2 = i.raws.between;
            if (typeof value2 !== "undefined")
              return false;
          }
        });
        return value2;
      }
      rawColon(root3) {
        let value2;
        root3.walkDecls((i) => {
          if (typeof i.raws.between !== "undefined") {
            value2 = i.raws.between.replace(/[^\s:]/g, "");
            return false;
          }
        });
        return value2;
      }
      beforeAfter(node, detect) {
        let value2;
        if (node.type === "decl") {
          value2 = this.raw(node, null, "beforeDecl");
        } else if (node.type === "comment") {
          value2 = this.raw(node, null, "beforeComment");
        } else if (detect === "before") {
          value2 = this.raw(node, null, "beforeRule");
        } else {
          value2 = this.raw(node, null, "beforeClose");
        }
        let buf = node.parent;
        let depth = 0;
        while (buf && buf.type !== "root") {
          depth += 1;
          buf = buf.parent;
        }
        if (value2.includes("\n")) {
          let indent = this.raw(node, null, "indent");
          if (indent.length) {
            for (let step = 0; step < depth; step++)
              value2 += indent;
          }
        }
        return value2;
      }
      rawValue(node, prop) {
        let value2 = node[prop];
        let raw = node.raws[prop];
        if (raw && raw.value === value2) {
          return raw.raw;
        }
        return value2;
      }
    };
    module2.exports = Stringifier;
    Stringifier.default = Stringifier;
  }
});

// node_modules/postcss/lib/stringify.js
var require_stringify3 = __commonJS({
  "node_modules/postcss/lib/stringify.js"(exports, module2) {
    "use strict";
    var Stringifier = require_stringifier2();
    function stringify3(node, builder) {
      let str = new Stringifier(builder);
      str.stringify(node);
    }
    module2.exports = stringify3;
    stringify3.default = stringify3;
  }
});

// node_modules/postcss/lib/node.js
var require_node3 = __commonJS({
  "node_modules/postcss/lib/node.js"(exports, module2) {
    "use strict";
    var { isClean, my } = require_symbols2();
    var CssSyntaxError3 = require_css_syntax_error2();
    var Stringifier = require_stringifier2();
    var stringify3 = require_stringify3();
    function cloneNode(obj, parent) {
      let cloned = new obj.constructor();
      for (let i in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, i)) {
          continue;
        }
        if (i === "proxyCache")
          continue;
        let value2 = obj[i];
        let type = typeof value2;
        if (i === "parent" && type === "object") {
          if (parent)
            cloned[i] = parent;
        } else if (i === "source") {
          cloned[i] = value2;
        } else if (Array.isArray(value2)) {
          cloned[i] = value2.map((j) => cloneNode(j, cloned));
        } else {
          if (type === "object" && value2 !== null)
            value2 = cloneNode(value2);
          cloned[i] = value2;
        }
      }
      return cloned;
    }
    var Node3 = class {
      constructor(defaults3 = {}) {
        this.raws = {};
        this[isClean] = false;
        this[my] = true;
        for (let name in defaults3) {
          if (name === "nodes") {
            this.nodes = [];
            for (let node of defaults3[name]) {
              if (typeof node.clone === "function") {
                this.append(node.clone());
              } else {
                this.append(node);
              }
            }
          } else {
            this[name] = defaults3[name];
          }
        }
      }
      error(message, opts = {}) {
        if (this.source) {
          let { start, end } = this.rangeBy(opts);
          return this.source.input.error(
            message,
            { line: start.line, column: start.column },
            { line: end.line, column: end.column },
            opts
          );
        }
        return new CssSyntaxError3(message);
      }
      warn(result, text, opts) {
        let data = { node: this };
        for (let i in opts)
          data[i] = opts[i];
        return result.warn(text, data);
      }
      remove() {
        if (this.parent) {
          this.parent.removeChild(this);
        }
        this.parent = void 0;
        return this;
      }
      toString(stringifier = stringify3) {
        if (stringifier.stringify)
          stringifier = stringifier.stringify;
        let result = "";
        stringifier(this, (i) => {
          result += i;
        });
        return result;
      }
      assign(overrides = {}) {
        for (let name in overrides) {
          this[name] = overrides[name];
        }
        return this;
      }
      clone(overrides = {}) {
        let cloned = cloneNode(this);
        for (let name in overrides) {
          cloned[name] = overrides[name];
        }
        return cloned;
      }
      cloneBefore(overrides = {}) {
        let cloned = this.clone(overrides);
        this.parent.insertBefore(this, cloned);
        return cloned;
      }
      cloneAfter(overrides = {}) {
        let cloned = this.clone(overrides);
        this.parent.insertAfter(this, cloned);
        return cloned;
      }
      replaceWith(...nodes) {
        if (this.parent) {
          let bookmark = this;
          let foundSelf = false;
          for (let node of nodes) {
            if (node === this) {
              foundSelf = true;
            } else if (foundSelf) {
              this.parent.insertAfter(bookmark, node);
              bookmark = node;
            } else {
              this.parent.insertBefore(bookmark, node);
            }
          }
          if (!foundSelf) {
            this.remove();
          }
        }
        return this;
      }
      next() {
        if (!this.parent)
          return void 0;
        let index3 = this.parent.index(this);
        return this.parent.nodes[index3 + 1];
      }
      prev() {
        if (!this.parent)
          return void 0;
        let index3 = this.parent.index(this);
        return this.parent.nodes[index3 - 1];
      }
      before(add) {
        this.parent.insertBefore(this, add);
        return this;
      }
      after(add) {
        this.parent.insertAfter(this, add);
        return this;
      }
      root() {
        let result = this;
        while (result.parent && result.parent.type !== "document") {
          result = result.parent;
        }
        return result;
      }
      raw(prop, defaultType) {
        let str = new Stringifier();
        return str.raw(this, prop, defaultType);
      }
      cleanRaws(keepBetween) {
        delete this.raws.before;
        delete this.raws.after;
        if (!keepBetween)
          delete this.raws.between;
      }
      toJSON(_, inputs) {
        let fixed = {};
        let emitInputs = inputs == null;
        inputs = inputs || /* @__PURE__ */ new Map();
        let inputsNextIndex = 0;
        for (let name in this) {
          if (!Object.prototype.hasOwnProperty.call(this, name)) {
            continue;
          }
          if (name === "parent" || name === "proxyCache")
            continue;
          let value2 = this[name];
          if (Array.isArray(value2)) {
            fixed[name] = value2.map((i) => {
              if (typeof i === "object" && i.toJSON) {
                return i.toJSON(null, inputs);
              } else {
                return i;
              }
            });
          } else if (typeof value2 === "object" && value2.toJSON) {
            fixed[name] = value2.toJSON(null, inputs);
          } else if (name === "source") {
            let inputId = inputs.get(value2.input);
            if (inputId == null) {
              inputId = inputsNextIndex;
              inputs.set(value2.input, inputsNextIndex);
              inputsNextIndex++;
            }
            fixed[name] = {
              inputId,
              start: value2.start,
              end: value2.end
            };
          } else {
            fixed[name] = value2;
          }
        }
        if (emitInputs) {
          fixed.inputs = [...inputs.keys()].map((input) => input.toJSON());
        }
        return fixed;
      }
      positionInside(index3) {
        let string = this.toString();
        let column = this.source.start.column;
        let line = this.source.start.line;
        for (let i = 0; i < index3; i++) {
          if (string[i] === "\n") {
            column = 1;
            line += 1;
          } else {
            column += 1;
          }
        }
        return { line, column };
      }
      positionBy(opts) {
        let pos = this.source.start;
        if (opts.index) {
          pos = this.positionInside(opts.index);
        } else if (opts.word) {
          let index3 = this.toString().indexOf(opts.word);
          if (index3 !== -1)
            pos = this.positionInside(index3);
        }
        return pos;
      }
      rangeBy(opts) {
        let start = {
          line: this.source.start.line,
          column: this.source.start.column
        };
        let end = this.source.end ? {
          line: this.source.end.line,
          column: this.source.end.column + 1
        } : {
          line: start.line,
          column: start.column + 1
        };
        if (opts.word) {
          let index3 = this.toString().indexOf(opts.word);
          if (index3 !== -1) {
            start = this.positionInside(index3);
            end = this.positionInside(index3 + opts.word.length);
          }
        } else {
          if (opts.start) {
            start = {
              line: opts.start.line,
              column: opts.start.column
            };
          } else if (opts.index) {
            start = this.positionInside(opts.index);
          }
          if (opts.end) {
            end = {
              line: opts.end.line,
              column: opts.end.column
            };
          } else if (opts.endIndex) {
            end = this.positionInside(opts.endIndex);
          } else if (opts.index) {
            end = this.positionInside(opts.index + 1);
          }
        }
        if (end.line < start.line || end.line === start.line && end.column <= start.column) {
          end = { line: start.line, column: start.column + 1 };
        }
        return { start, end };
      }
      getProxyProcessor() {
        return {
          set(node, prop, value2) {
            if (node[prop] === value2)
              return true;
            node[prop] = value2;
            if (prop === "prop" || prop === "value" || prop === "name" || prop === "params" || prop === "important" || prop === "text") {
              node.markDirty();
            }
            return true;
          },
          get(node, prop) {
            if (prop === "proxyOf") {
              return node;
            } else if (prop === "root") {
              return () => node.root().toProxy();
            } else {
              return node[prop];
            }
          }
        };
      }
      toProxy() {
        if (!this.proxyCache) {
          this.proxyCache = new Proxy(this, this.getProxyProcessor());
        }
        return this.proxyCache;
      }
      addToError(error) {
        error.postcssNode = this;
        if (error.stack && this.source && /\n\s{4}at /.test(error.stack)) {
          let s = this.source;
          error.stack = error.stack.replace(
            /\n\s{4}at /,
            `$&${s.input.from}:${s.start.line}:${s.start.column}$&`
          );
        }
        return error;
      }
      markDirty() {
        if (this[isClean]) {
          this[isClean] = false;
          let next = this;
          while (next = next.parent) {
            next[isClean] = false;
          }
        }
      }
      get proxyOf() {
        return this;
      }
    };
    module2.exports = Node3;
    Node3.default = Node3;
  }
});

// node_modules/postcss/lib/declaration.js
var require_declaration2 = __commonJS({
  "node_modules/postcss/lib/declaration.js"(exports, module2) {
    "use strict";
    var Node3 = require_node3();
    var Declaration3 = class extends Node3 {
      constructor(defaults3) {
        if (defaults3 && typeof defaults3.value !== "undefined" && typeof defaults3.value !== "string") {
          defaults3 = { ...defaults3, value: String(defaults3.value) };
        }
        super(defaults3);
        this.type = "decl";
      }
      get variable() {
        return this.prop.startsWith("--") || this.prop[0] === "$";
      }
    };
    module2.exports = Declaration3;
    Declaration3.default = Declaration3;
  }
});

// node_modules/nanoid/non-secure/index.cjs
var require_non_secure2 = __commonJS({
  "node_modules/nanoid/non-secure/index.cjs"(exports, module2) {
    var urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
    var customAlphabet = (alphabet, defaultSize = 21) => {
      return (size = defaultSize) => {
        let id = "";
        let i = size;
        while (i--) {
          id += alphabet[Math.random() * alphabet.length | 0];
        }
        return id;
      };
    };
    var nanoid = (size = 21) => {
      let id = "";
      let i = size;
      while (i--) {
        id += urlAlphabet[Math.random() * 64 | 0];
      }
      return id;
    };
    module2.exports = { nanoid, customAlphabet };
  }
});

// node_modules/postcss/lib/previous-map.js
var require_previous_map2 = __commonJS({
  "node_modules/postcss/lib/previous-map.js"(exports, module2) {
    "use strict";
    var { SourceMapConsumer, SourceMapGenerator } = require_source_map();
    var { existsSync, readFileSync } = (init_fs(), __toCommonJS(fs_exports));
    var { dirname, join: join2 } = (init_path(), __toCommonJS(path_exports));
    function fromBase64(str) {
      if (Buffer) {
        return Buffer.from(str, "base64").toString();
      } else {
        return window.atob(str);
      }
    }
    var PreviousMap = class {
      constructor(css, opts) {
        if (opts.map === false)
          return;
        this.loadAnnotation(css);
        this.inline = this.startWith(this.annotation, "data:");
        let prev = opts.map ? opts.map.prev : void 0;
        let text = this.loadMap(opts.from, prev);
        if (!this.mapFile && opts.from) {
          this.mapFile = opts.from;
        }
        if (this.mapFile)
          this.root = dirname(this.mapFile);
        if (text)
          this.text = text;
      }
      consumer() {
        if (!this.consumerCache) {
          this.consumerCache = new SourceMapConsumer(this.text);
        }
        return this.consumerCache;
      }
      withContent() {
        return !!(this.consumer().sourcesContent && this.consumer().sourcesContent.length > 0);
      }
      startWith(string, start) {
        if (!string)
          return false;
        return string.substr(0, start.length) === start;
      }
      getAnnotationURL(sourceMapString) {
        return sourceMapString.replace(/^\/\*\s*# sourceMappingURL=/, "").trim();
      }
      loadAnnotation(css) {
        let comments = css.match(/\/\*\s*# sourceMappingURL=/gm);
        if (!comments)
          return;
        let start = css.lastIndexOf(comments.pop());
        let end = css.indexOf("*/", start);
        if (start > -1 && end > -1) {
          this.annotation = this.getAnnotationURL(css.substring(start, end));
        }
      }
      decodeInline(text) {
        let baseCharsetUri = /^data:application\/json;charset=utf-?8;base64,/;
        let baseUri = /^data:application\/json;base64,/;
        let charsetUri = /^data:application\/json;charset=utf-?8,/;
        let uri = /^data:application\/json,/;
        if (charsetUri.test(text) || uri.test(text)) {
          return decodeURIComponent(text.substr(RegExp.lastMatch.length));
        }
        if (baseCharsetUri.test(text) || baseUri.test(text)) {
          return fromBase64(text.substr(RegExp.lastMatch.length));
        }
        let encoding = text.match(/data:application\/json;([^,]+),/)[1];
        throw new Error("Unsupported source map encoding " + encoding);
      }
      loadFile(path) {
        this.root = dirname(path);
        if (existsSync(path)) {
          this.mapFile = path;
          return readFileSync(path, "utf-8").toString().trim();
        }
      }
      loadMap(file, prev) {
        if (prev === false)
          return false;
        if (prev) {
          if (typeof prev === "string") {
            return prev;
          } else if (typeof prev === "function") {
            let prevPath = prev(file);
            if (prevPath) {
              let map = this.loadFile(prevPath);
              if (!map) {
                throw new Error(
                  "Unable to load previous source map: " + prevPath.toString()
                );
              }
              return map;
            }
          } else if (prev instanceof SourceMapConsumer) {
            return SourceMapGenerator.fromSourceMap(prev).toString();
          } else if (prev instanceof SourceMapGenerator) {
            return prev.toString();
          } else if (this.isMap(prev)) {
            return JSON.stringify(prev);
          } else {
            throw new Error(
              "Unsupported previous source map format: " + prev.toString()
            );
          }
        } else if (this.inline) {
          return this.decodeInline(this.annotation);
        } else if (this.annotation) {
          let map = this.annotation;
          if (file)
            map = join2(dirname(file), map);
          return this.loadFile(map);
        }
      }
      isMap(map) {
        if (typeof map !== "object")
          return false;
        return typeof map.mappings === "string" || typeof map._mappings === "string" || Array.isArray(map.sections);
      }
    };
    module2.exports = PreviousMap;
    PreviousMap.default = PreviousMap;
  }
});

// node_modules/postcss/lib/input.js
var require_input2 = __commonJS({
  "node_modules/postcss/lib/input.js"(exports, module2) {
    "use strict";
    var { SourceMapConsumer, SourceMapGenerator } = require_source_map();
    var { fileURLToPath, pathToFileURL } = (init_url(), __toCommonJS(url_exports));
    var { resolve, isAbsolute } = (init_path(), __toCommonJS(path_exports));
    var { nanoid } = require_non_secure2();
    var terminalHighlight = require_terminal_highlight2();
    var CssSyntaxError3 = require_css_syntax_error2();
    var PreviousMap = require_previous_map2();
    var fromOffsetCache = Symbol("fromOffsetCache");
    var sourceMapAvailable = Boolean(SourceMapConsumer && SourceMapGenerator);
    var pathAvailable = Boolean(resolve && isAbsolute);
    var Input3 = class {
      constructor(css, opts = {}) {
        if (css === null || typeof css === "undefined" || typeof css === "object" && !css.toString) {
          throw new Error(`PostCSS received ${css} instead of CSS string`);
        }
        this.css = css.toString();
        if (this.css[0] === "\uFEFF" || this.css[0] === "\uFFFE") {
          this.hasBOM = true;
          this.css = this.css.slice(1);
        } else {
          this.hasBOM = false;
        }
        if (opts.from) {
          if (!pathAvailable || /^\w+:\/\//.test(opts.from) || isAbsolute(opts.from)) {
            this.file = opts.from;
          } else {
            this.file = resolve(opts.from);
          }
        }
        if (pathAvailable && sourceMapAvailable) {
          let map = new PreviousMap(this.css, opts);
          if (map.text) {
            this.map = map;
            let file = map.consumer().file;
            if (!this.file && file)
              this.file = this.mapResolve(file);
          }
        }
        if (!this.file) {
          this.id = "<input css " + nanoid(6) + ">";
        }
        if (this.map)
          this.map.file = this.from;
      }
      fromOffset(offset) {
        let lastLine, lineToIndex;
        if (!this[fromOffsetCache]) {
          let lines = this.css.split("\n");
          lineToIndex = new Array(lines.length);
          let prevIndex = 0;
          for (let i = 0, l = lines.length; i < l; i++) {
            lineToIndex[i] = prevIndex;
            prevIndex += lines[i].length + 1;
          }
          this[fromOffsetCache] = lineToIndex;
        } else {
          lineToIndex = this[fromOffsetCache];
        }
        lastLine = lineToIndex[lineToIndex.length - 1];
        let min = 0;
        if (offset >= lastLine) {
          min = lineToIndex.length - 1;
        } else {
          let max2 = lineToIndex.length - 2;
          let mid;
          while (min < max2) {
            mid = min + (max2 - min >> 1);
            if (offset < lineToIndex[mid]) {
              max2 = mid - 1;
            } else if (offset >= lineToIndex[mid + 1]) {
              min = mid + 1;
            } else {
              min = mid;
              break;
            }
          }
        }
        return {
          line: min + 1,
          col: offset - lineToIndex[min] + 1
        };
      }
      error(message, line, column, opts = {}) {
        let result, endLine, endColumn;
        if (line && typeof line === "object") {
          let start = line;
          let end = column;
          if (typeof start.offset === "number") {
            let pos = this.fromOffset(start.offset);
            line = pos.line;
            column = pos.col;
          } else {
            line = start.line;
            column = start.column;
          }
          if (typeof end.offset === "number") {
            let pos = this.fromOffset(end.offset);
            endLine = pos.line;
            endColumn = pos.col;
          } else {
            endLine = end.line;
            endColumn = end.column;
          }
        } else if (!column) {
          let pos = this.fromOffset(line);
          line = pos.line;
          column = pos.col;
        }
        let origin = this.origin(line, column, endLine, endColumn);
        if (origin) {
          result = new CssSyntaxError3(
            message,
            origin.endLine === void 0 ? origin.line : { line: origin.line, column: origin.column },
            origin.endLine === void 0 ? origin.column : { line: origin.endLine, column: origin.endColumn },
            origin.source,
            origin.file,
            opts.plugin
          );
        } else {
          result = new CssSyntaxError3(
            message,
            endLine === void 0 ? line : { line, column },
            endLine === void 0 ? column : { line: endLine, column: endColumn },
            this.css,
            this.file,
            opts.plugin
          );
        }
        result.input = { line, column, endLine, endColumn, source: this.css };
        if (this.file) {
          if (pathToFileURL) {
            result.input.url = pathToFileURL(this.file).toString();
          }
          result.input.file = this.file;
        }
        return result;
      }
      origin(line, column, endLine, endColumn) {
        if (!this.map)
          return false;
        let consumer = this.map.consumer();
        let from = consumer.originalPositionFor({ line, column });
        if (!from.source)
          return false;
        let to;
        if (typeof endLine === "number") {
          to = consumer.originalPositionFor({ line: endLine, column: endColumn });
        }
        let fromUrl;
        if (isAbsolute(from.source)) {
          fromUrl = pathToFileURL(from.source);
        } else {
          fromUrl = new URL(
            from.source,
            this.map.consumer().sourceRoot || pathToFileURL(this.map.mapFile)
          );
        }
        let result = {
          url: fromUrl.toString(),
          line: from.line,
          column: from.column,
          endLine: to && to.line,
          endColumn: to && to.column
        };
        if (fromUrl.protocol === "file:") {
          if (fileURLToPath) {
            result.file = fileURLToPath(fromUrl);
          } else {
            throw new Error(`file: protocol is not available in this PostCSS build`);
          }
        }
        let source = consumer.sourceContentFor(from.source);
        if (source)
          result.source = source;
        return result;
      }
      mapResolve(file) {
        if (/^\w+:\/\//.test(file)) {
          return file;
        }
        return resolve(this.map.consumer().sourceRoot || this.map.root || ".", file);
      }
      get from() {
        return this.file || this.id;
      }
      toJSON() {
        let json = {};
        for (let name of ["hasBOM", "css", "file", "id"]) {
          if (this[name] != null) {
            json[name] = this[name];
          }
        }
        if (this.map) {
          json.map = { ...this.map };
          if (json.map.consumerCache) {
            json.map.consumerCache = void 0;
          }
        }
        return json;
      }
    };
    module2.exports = Input3;
    Input3.default = Input3;
    if (terminalHighlight && terminalHighlight.registerInput) {
      terminalHighlight.registerInput(Input3);
    }
  }
});

// node_modules/postcss/lib/map-generator.js
var require_map_generator2 = __commonJS({
  "node_modules/postcss/lib/map-generator.js"(exports, module2) {
    "use strict";
    var { SourceMapConsumer, SourceMapGenerator } = require_source_map();
    var { dirname, resolve, relative, sep } = (init_path(), __toCommonJS(path_exports));
    var { pathToFileURL } = (init_url(), __toCommonJS(url_exports));
    var Input3 = require_input2();
    var sourceMapAvailable = Boolean(SourceMapConsumer && SourceMapGenerator);
    var pathAvailable = Boolean(dirname && resolve && relative && sep);
    var MapGenerator = class {
      constructor(stringify3, root3, opts, cssString) {
        this.stringify = stringify3;
        this.mapOpts = opts.map || {};
        this.root = root3;
        this.opts = opts;
        this.css = cssString;
        this.usesFileUrls = !this.mapOpts.from && this.mapOpts.absolute;
      }
      isMap() {
        if (typeof this.opts.map !== "undefined") {
          return !!this.opts.map;
        }
        return this.previous().length > 0;
      }
      previous() {
        if (!this.previousMaps) {
          this.previousMaps = [];
          if (this.root) {
            this.root.walk((node) => {
              if (node.source && node.source.input.map) {
                let map = node.source.input.map;
                if (!this.previousMaps.includes(map)) {
                  this.previousMaps.push(map);
                }
              }
            });
          } else {
            let input = new Input3(this.css, this.opts);
            if (input.map)
              this.previousMaps.push(input.map);
          }
        }
        return this.previousMaps;
      }
      isInline() {
        if (typeof this.mapOpts.inline !== "undefined") {
          return this.mapOpts.inline;
        }
        let annotation = this.mapOpts.annotation;
        if (typeof annotation !== "undefined" && annotation !== true) {
          return false;
        }
        if (this.previous().length) {
          return this.previous().some((i) => i.inline);
        }
        return true;
      }
      isSourcesContent() {
        if (typeof this.mapOpts.sourcesContent !== "undefined") {
          return this.mapOpts.sourcesContent;
        }
        if (this.previous().length) {
          return this.previous().some((i) => i.withContent());
        }
        return true;
      }
      clearAnnotation() {
        if (this.mapOpts.annotation === false)
          return;
        if (this.root) {
          let node;
          for (let i = this.root.nodes.length - 1; i >= 0; i--) {
            node = this.root.nodes[i];
            if (node.type !== "comment")
              continue;
            if (node.text.indexOf("# sourceMappingURL=") === 0) {
              this.root.removeChild(i);
            }
          }
        } else if (this.css) {
          this.css = this.css.replace(/(\n)?\/\*#[\S\s]*?\*\/$/gm, "");
        }
      }
      setSourcesContent() {
        let already = {};
        if (this.root) {
          this.root.walk((node) => {
            if (node.source) {
              let from = node.source.input.from;
              if (from && !already[from]) {
                already[from] = true;
                let fromUrl = this.usesFileUrls ? this.toFileUrl(from) : this.toUrl(this.path(from));
                this.map.setSourceContent(fromUrl, node.source.input.css);
              }
            }
          });
        } else if (this.css) {
          let from = this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>";
          this.map.setSourceContent(from, this.css);
        }
      }
      applyPrevMaps() {
        for (let prev of this.previous()) {
          let from = this.toUrl(this.path(prev.file));
          let root3 = prev.root || dirname(prev.file);
          let map;
          if (this.mapOpts.sourcesContent === false) {
            map = new SourceMapConsumer(prev.text);
            if (map.sourcesContent) {
              map.sourcesContent = map.sourcesContent.map(() => null);
            }
          } else {
            map = prev.consumer();
          }
          this.map.applySourceMap(map, from, this.toUrl(this.path(root3)));
        }
      }
      isAnnotation() {
        if (this.isInline()) {
          return true;
        }
        if (typeof this.mapOpts.annotation !== "undefined") {
          return this.mapOpts.annotation;
        }
        if (this.previous().length) {
          return this.previous().some((i) => i.annotation);
        }
        return true;
      }
      toBase64(str) {
        if (Buffer) {
          return Buffer.from(str).toString("base64");
        } else {
          return window.btoa(unescape(encodeURIComponent(str)));
        }
      }
      addAnnotation() {
        let content;
        if (this.isInline()) {
          content = "data:application/json;base64," + this.toBase64(this.map.toString());
        } else if (typeof this.mapOpts.annotation === "string") {
          content = this.mapOpts.annotation;
        } else if (typeof this.mapOpts.annotation === "function") {
          content = this.mapOpts.annotation(this.opts.to, this.root);
        } else {
          content = this.outputFile() + ".map";
        }
        let eol = "\n";
        if (this.css.includes("\r\n"))
          eol = "\r\n";
        this.css += eol + "/*# sourceMappingURL=" + content + " */";
      }
      outputFile() {
        if (this.opts.to) {
          return this.path(this.opts.to);
        } else if (this.opts.from) {
          return this.path(this.opts.from);
        } else {
          return "to.css";
        }
      }
      generateMap() {
        if (this.root) {
          this.generateString();
        } else if (this.previous().length === 1) {
          let prev = this.previous()[0].consumer();
          prev.file = this.outputFile();
          this.map = SourceMapGenerator.fromSourceMap(prev);
        } else {
          this.map = new SourceMapGenerator({ file: this.outputFile() });
          this.map.addMapping({
            source: this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>",
            generated: { line: 1, column: 0 },
            original: { line: 1, column: 0 }
          });
        }
        if (this.isSourcesContent())
          this.setSourcesContent();
        if (this.root && this.previous().length > 0)
          this.applyPrevMaps();
        if (this.isAnnotation())
          this.addAnnotation();
        if (this.isInline()) {
          return [this.css];
        } else {
          return [this.css, this.map];
        }
      }
      path(file) {
        if (file.indexOf("<") === 0)
          return file;
        if (/^\w+:\/\//.test(file))
          return file;
        if (this.mapOpts.absolute)
          return file;
        let from = this.opts.to ? dirname(this.opts.to) : ".";
        if (typeof this.mapOpts.annotation === "string") {
          from = dirname(resolve(from, this.mapOpts.annotation));
        }
        file = relative(from, file);
        return file;
      }
      toUrl(path) {
        if (sep === "\\") {
          path = path.replace(/\\/g, "/");
        }
        return encodeURI(path).replace(/[#?]/g, encodeURIComponent);
      }
      toFileUrl(path) {
        if (pathToFileURL) {
          return pathToFileURL(path).toString();
        } else {
          throw new Error(
            "`map.absolute` option is not available in this PostCSS build"
          );
        }
      }
      sourcePath(node) {
        if (this.mapOpts.from) {
          return this.toUrl(this.mapOpts.from);
        } else if (this.usesFileUrls) {
          return this.toFileUrl(node.source.input.from);
        } else {
          return this.toUrl(this.path(node.source.input.from));
        }
      }
      generateString() {
        this.css = "";
        this.map = new SourceMapGenerator({ file: this.outputFile() });
        let line = 1;
        let column = 1;
        let noSource = "<no source>";
        let mapping = {
          source: "",
          generated: { line: 0, column: 0 },
          original: { line: 0, column: 0 }
        };
        let lines, last;
        this.stringify(this.root, (str, node, type) => {
          this.css += str;
          if (node && type !== "end") {
            mapping.generated.line = line;
            mapping.generated.column = column - 1;
            if (node.source && node.source.start) {
              mapping.source = this.sourcePath(node);
              mapping.original.line = node.source.start.line;
              mapping.original.column = node.source.start.column - 1;
              this.map.addMapping(mapping);
            } else {
              mapping.source = noSource;
              mapping.original.line = 1;
              mapping.original.column = 0;
              this.map.addMapping(mapping);
            }
          }
          lines = str.match(/\n/g);
          if (lines) {
            line += lines.length;
            last = str.lastIndexOf("\n");
            column = str.length - last;
          } else {
            column += str.length;
          }
          if (node && type !== "start") {
            let p = node.parent || { raws: {} };
            let childless = node.type === "decl" || node.type === "atrule" && !node.nodes;
            if (!childless || node !== p.last || p.raws.semicolon) {
              if (node.source && node.source.end) {
                mapping.source = this.sourcePath(node);
                mapping.original.line = node.source.end.line;
                mapping.original.column = node.source.end.column - 1;
                mapping.generated.line = line;
                mapping.generated.column = column - 2;
                this.map.addMapping(mapping);
              } else {
                mapping.source = noSource;
                mapping.original.line = 1;
                mapping.original.column = 0;
                mapping.generated.line = line;
                mapping.generated.column = column - 1;
                this.map.addMapping(mapping);
              }
            }
          }
        });
      }
      generate() {
        this.clearAnnotation();
        if (pathAvailable && sourceMapAvailable && this.isMap()) {
          return this.generateMap();
        } else {
          let result = "";
          this.stringify(this.root, (i) => {
            result += i;
          });
          return [result];
        }
      }
    };
    module2.exports = MapGenerator;
  }
});

// node_modules/postcss/lib/comment.js
var require_comment3 = __commonJS({
  "node_modules/postcss/lib/comment.js"(exports, module2) {
    "use strict";
    var Node3 = require_node3();
    var Comment3 = class extends Node3 {
      constructor(defaults3) {
        super(defaults3);
        this.type = "comment";
      }
    };
    module2.exports = Comment3;
    Comment3.default = Comment3;
  }
});

// node_modules/postcss/lib/container.js
var require_container3 = __commonJS({
  "node_modules/postcss/lib/container.js"(exports, module2) {
    "use strict";
    var { isClean, my } = require_symbols2();
    var Declaration3 = require_declaration2();
    var Comment3 = require_comment3();
    var Node3 = require_node3();
    var parse5;
    var Rule3;
    var AtRule3;
    var Root3;
    function cleanSource(nodes) {
      return nodes.map((i) => {
        if (i.nodes)
          i.nodes = cleanSource(i.nodes);
        delete i.source;
        return i;
      });
    }
    function markDirtyUp(node) {
      node[isClean] = false;
      if (node.proxyOf.nodes) {
        for (let i of node.proxyOf.nodes) {
          markDirtyUp(i);
        }
      }
    }
    var Container3 = class extends Node3 {
      push(child) {
        child.parent = this;
        this.proxyOf.nodes.push(child);
        return this;
      }
      each(callback) {
        if (!this.proxyOf.nodes)
          return void 0;
        let iterator = this.getIterator();
        let index3, result;
        while (this.indexes[iterator] < this.proxyOf.nodes.length) {
          index3 = this.indexes[iterator];
          result = callback(this.proxyOf.nodes[index3], index3);
          if (result === false)
            break;
          this.indexes[iterator] += 1;
        }
        delete this.indexes[iterator];
        return result;
      }
      walk(callback) {
        return this.each((child, i) => {
          let result;
          try {
            result = callback(child, i);
          } catch (e) {
            throw child.addToError(e);
          }
          if (result !== false && child.walk) {
            result = child.walk(callback);
          }
          return result;
        });
      }
      walkDecls(prop, callback) {
        if (!callback) {
          callback = prop;
          return this.walk((child, i) => {
            if (child.type === "decl") {
              return callback(child, i);
            }
          });
        }
        if (prop instanceof RegExp) {
          return this.walk((child, i) => {
            if (child.type === "decl" && prop.test(child.prop)) {
              return callback(child, i);
            }
          });
        }
        return this.walk((child, i) => {
          if (child.type === "decl" && child.prop === prop) {
            return callback(child, i);
          }
        });
      }
      walkRules(selector, callback) {
        if (!callback) {
          callback = selector;
          return this.walk((child, i) => {
            if (child.type === "rule") {
              return callback(child, i);
            }
          });
        }
        if (selector instanceof RegExp) {
          return this.walk((child, i) => {
            if (child.type === "rule" && selector.test(child.selector)) {
              return callback(child, i);
            }
          });
        }
        return this.walk((child, i) => {
          if (child.type === "rule" && child.selector === selector) {
            return callback(child, i);
          }
        });
      }
      walkAtRules(name, callback) {
        if (!callback) {
          callback = name;
          return this.walk((child, i) => {
            if (child.type === "atrule") {
              return callback(child, i);
            }
          });
        }
        if (name instanceof RegExp) {
          return this.walk((child, i) => {
            if (child.type === "atrule" && name.test(child.name)) {
              return callback(child, i);
            }
          });
        }
        return this.walk((child, i) => {
          if (child.type === "atrule" && child.name === name) {
            return callback(child, i);
          }
        });
      }
      walkComments(callback) {
        return this.walk((child, i) => {
          if (child.type === "comment") {
            return callback(child, i);
          }
        });
      }
      append(...children) {
        for (let child of children) {
          let nodes = this.normalize(child, this.last);
          for (let node of nodes)
            this.proxyOf.nodes.push(node);
        }
        this.markDirty();
        return this;
      }
      prepend(...children) {
        children = children.reverse();
        for (let child of children) {
          let nodes = this.normalize(child, this.first, "prepend").reverse();
          for (let node of nodes)
            this.proxyOf.nodes.unshift(node);
          for (let id in this.indexes) {
            this.indexes[id] = this.indexes[id] + nodes.length;
          }
        }
        this.markDirty();
        return this;
      }
      cleanRaws(keepBetween) {
        super.cleanRaws(keepBetween);
        if (this.nodes) {
          for (let node of this.nodes)
            node.cleanRaws(keepBetween);
        }
      }
      insertBefore(exist, add) {
        let existIndex = this.index(exist);
        let type = existIndex === 0 ? "prepend" : false;
        let nodes = this.normalize(add, this.proxyOf.nodes[existIndex], type).reverse();
        existIndex = this.index(exist);
        for (let node of nodes)
          this.proxyOf.nodes.splice(existIndex, 0, node);
        let index3;
        for (let id in this.indexes) {
          index3 = this.indexes[id];
          if (existIndex <= index3) {
            this.indexes[id] = index3 + nodes.length;
          }
        }
        this.markDirty();
        return this;
      }
      insertAfter(exist, add) {
        let existIndex = this.index(exist);
        let nodes = this.normalize(add, this.proxyOf.nodes[existIndex]).reverse();
        existIndex = this.index(exist);
        for (let node of nodes)
          this.proxyOf.nodes.splice(existIndex + 1, 0, node);
        let index3;
        for (let id in this.indexes) {
          index3 = this.indexes[id];
          if (existIndex < index3) {
            this.indexes[id] = index3 + nodes.length;
          }
        }
        this.markDirty();
        return this;
      }
      removeChild(child) {
        child = this.index(child);
        this.proxyOf.nodes[child].parent = void 0;
        this.proxyOf.nodes.splice(child, 1);
        let index3;
        for (let id in this.indexes) {
          index3 = this.indexes[id];
          if (index3 >= child) {
            this.indexes[id] = index3 - 1;
          }
        }
        this.markDirty();
        return this;
      }
      removeAll() {
        for (let node of this.proxyOf.nodes)
          node.parent = void 0;
        this.proxyOf.nodes = [];
        this.markDirty();
        return this;
      }
      replaceValues(pattern2, opts, callback) {
        if (!callback) {
          callback = opts;
          opts = {};
        }
        this.walkDecls((decl3) => {
          if (opts.props && !opts.props.includes(decl3.prop))
            return;
          if (opts.fast && !decl3.value.includes(opts.fast))
            return;
          decl3.value = decl3.value.replace(pattern2, callback);
        });
        this.markDirty();
        return this;
      }
      every(condition) {
        return this.nodes.every(condition);
      }
      some(condition) {
        return this.nodes.some(condition);
      }
      index(child) {
        if (typeof child === "number")
          return child;
        if (child.proxyOf)
          child = child.proxyOf;
        return this.proxyOf.nodes.indexOf(child);
      }
      get first() {
        if (!this.proxyOf.nodes)
          return void 0;
        return this.proxyOf.nodes[0];
      }
      get last() {
        if (!this.proxyOf.nodes)
          return void 0;
        return this.proxyOf.nodes[this.proxyOf.nodes.length - 1];
      }
      normalize(nodes, sample) {
        if (typeof nodes === "string") {
          nodes = cleanSource(parse5(nodes).nodes);
        } else if (Array.isArray(nodes)) {
          nodes = nodes.slice(0);
          for (let i of nodes) {
            if (i.parent)
              i.parent.removeChild(i, "ignore");
          }
        } else if (nodes.type === "root" && this.type !== "document") {
          nodes = nodes.nodes.slice(0);
          for (let i of nodes) {
            if (i.parent)
              i.parent.removeChild(i, "ignore");
          }
        } else if (nodes.type) {
          nodes = [nodes];
        } else if (nodes.prop) {
          if (typeof nodes.value === "undefined") {
            throw new Error("Value field is missed in node creation");
          } else if (typeof nodes.value !== "string") {
            nodes.value = String(nodes.value);
          }
          nodes = [new Declaration3(nodes)];
        } else if (nodes.selector) {
          nodes = [new Rule3(nodes)];
        } else if (nodes.name) {
          nodes = [new AtRule3(nodes)];
        } else if (nodes.text) {
          nodes = [new Comment3(nodes)];
        } else {
          throw new Error("Unknown node type in node creation");
        }
        let processed = nodes.map((i) => {
          if (!i[my])
            Container3.rebuild(i);
          i = i.proxyOf;
          if (i.parent)
            i.parent.removeChild(i);
          if (i[isClean])
            markDirtyUp(i);
          if (typeof i.raws.before === "undefined") {
            if (sample && typeof sample.raws.before !== "undefined") {
              i.raws.before = sample.raws.before.replace(/\S/g, "");
            }
          }
          i.parent = this.proxyOf;
          return i;
        });
        return processed;
      }
      getProxyProcessor() {
        return {
          set(node, prop, value2) {
            if (node[prop] === value2)
              return true;
            node[prop] = value2;
            if (prop === "name" || prop === "params" || prop === "selector") {
              node.markDirty();
            }
            return true;
          },
          get(node, prop) {
            if (prop === "proxyOf") {
              return node;
            } else if (!node[prop]) {
              return node[prop];
            } else if (prop === "each" || typeof prop === "string" && prop.startsWith("walk")) {
              return (...args) => {
                return node[prop](
                  ...args.map((i) => {
                    if (typeof i === "function") {
                      return (child, index3) => i(child.toProxy(), index3);
                    } else {
                      return i;
                    }
                  })
                );
              };
            } else if (prop === "every" || prop === "some") {
              return (cb) => {
                return node[prop](
                  (child, ...other) => cb(child.toProxy(), ...other)
                );
              };
            } else if (prop === "root") {
              return () => node.root().toProxy();
            } else if (prop === "nodes") {
              return node.nodes.map((i) => i.toProxy());
            } else if (prop === "first" || prop === "last") {
              return node[prop].toProxy();
            } else {
              return node[prop];
            }
          }
        };
      }
      getIterator() {
        if (!this.lastEach)
          this.lastEach = 0;
        if (!this.indexes)
          this.indexes = {};
        this.lastEach += 1;
        let iterator = this.lastEach;
        this.indexes[iterator] = 0;
        return iterator;
      }
    };
    Container3.registerParse = (dependant) => {
      parse5 = dependant;
    };
    Container3.registerRule = (dependant) => {
      Rule3 = dependant;
    };
    Container3.registerAtRule = (dependant) => {
      AtRule3 = dependant;
    };
    Container3.registerRoot = (dependant) => {
      Root3 = dependant;
    };
    module2.exports = Container3;
    Container3.default = Container3;
    Container3.rebuild = (node) => {
      if (node.type === "atrule") {
        Object.setPrototypeOf(node, AtRule3.prototype);
      } else if (node.type === "rule") {
        Object.setPrototypeOf(node, Rule3.prototype);
      } else if (node.type === "decl") {
        Object.setPrototypeOf(node, Declaration3.prototype);
      } else if (node.type === "comment") {
        Object.setPrototypeOf(node, Comment3.prototype);
      } else if (node.type === "root") {
        Object.setPrototypeOf(node, Root3.prototype);
      }
      node[my] = true;
      if (node.nodes) {
        node.nodes.forEach((child) => {
          Container3.rebuild(child);
        });
      }
    };
  }
});

// node_modules/postcss/lib/document.js
var require_document2 = __commonJS({
  "node_modules/postcss/lib/document.js"(exports, module2) {
    "use strict";
    var Container3 = require_container3();
    var LazyResult;
    var Processor3;
    var Document3 = class extends Container3 {
      constructor(defaults3) {
        super({ type: "document", ...defaults3 });
        if (!this.nodes) {
          this.nodes = [];
        }
      }
      toResult(opts = {}) {
        let lazy = new LazyResult(new Processor3(), this, opts);
        return lazy.stringify();
      }
    };
    Document3.registerLazyResult = (dependant) => {
      LazyResult = dependant;
    };
    Document3.registerProcessor = (dependant) => {
      Processor3 = dependant;
    };
    module2.exports = Document3;
    Document3.default = Document3;
  }
});

// node_modules/postcss/lib/warn-once.js
var require_warn_once2 = __commonJS({
  "node_modules/postcss/lib/warn-once.js"(exports, module2) {
    "use strict";
    var printed = {};
    module2.exports = function warnOnce(message) {
      if (printed[message])
        return;
      printed[message] = true;
      if (typeof console !== "undefined" && console.warn) {
        console.warn(message);
      }
    };
  }
});

// node_modules/postcss/lib/warning.js
var require_warning2 = __commonJS({
  "node_modules/postcss/lib/warning.js"(exports, module2) {
    "use strict";
    var Warning3 = class {
      constructor(text, opts = {}) {
        this.type = "warning";
        this.text = text;
        if (opts.node && opts.node.source) {
          let range = opts.node.rangeBy(opts);
          this.line = range.start.line;
          this.column = range.start.column;
          this.endLine = range.end.line;
          this.endColumn = range.end.column;
        }
        for (let opt in opts)
          this[opt] = opts[opt];
      }
      toString() {
        if (this.node) {
          return this.node.error(this.text, {
            plugin: this.plugin,
            index: this.index,
            word: this.word
          }).message;
        }
        if (this.plugin) {
          return this.plugin + ": " + this.text;
        }
        return this.text;
      }
    };
    module2.exports = Warning3;
    Warning3.default = Warning3;
  }
});

// node_modules/postcss/lib/result.js
var require_result2 = __commonJS({
  "node_modules/postcss/lib/result.js"(exports, module2) {
    "use strict";
    var Warning3 = require_warning2();
    var Result3 = class {
      constructor(processor, root3, opts) {
        this.processor = processor;
        this.messages = [];
        this.root = root3;
        this.opts = opts;
        this.css = void 0;
        this.map = void 0;
      }
      toString() {
        return this.css;
      }
      warn(text, opts = {}) {
        if (!opts.plugin) {
          if (this.lastPlugin && this.lastPlugin.postcssPlugin) {
            opts.plugin = this.lastPlugin.postcssPlugin;
          }
        }
        let warning = new Warning3(text, opts);
        this.messages.push(warning);
        return warning;
      }
      warnings() {
        return this.messages.filter((i) => i.type === "warning");
      }
      get content() {
        return this.css;
      }
    };
    module2.exports = Result3;
    Result3.default = Result3;
  }
});

// node_modules/postcss/lib/tokenize.js
var require_tokenize3 = __commonJS({
  "node_modules/postcss/lib/tokenize.js"(exports, module2) {
    "use strict";
    var SINGLE_QUOTE = "'".charCodeAt(0);
    var DOUBLE_QUOTE = '"'.charCodeAt(0);
    var BACKSLASH = "\\".charCodeAt(0);
    var SLASH = "/".charCodeAt(0);
    var NEWLINE = "\n".charCodeAt(0);
    var SPACE3 = " ".charCodeAt(0);
    var FEED = "\f".charCodeAt(0);
    var TAB = "	".charCodeAt(0);
    var CR = "\r".charCodeAt(0);
    var OPEN_SQUARE = "[".charCodeAt(0);
    var CLOSE_SQUARE = "]".charCodeAt(0);
    var OPEN_PARENTHESES = "(".charCodeAt(0);
    var CLOSE_PARENTHESES = ")".charCodeAt(0);
    var OPEN_CURLY = "{".charCodeAt(0);
    var CLOSE_CURLY = "}".charCodeAt(0);
    var SEMICOLON = ";".charCodeAt(0);
    var ASTERISK = "*".charCodeAt(0);
    var COLON = ":".charCodeAt(0);
    var AT = "@".charCodeAt(0);
    var RE_AT_END = /[\t\n\f\r "#'()/;[\\\]{}]/g;
    var RE_WORD_END = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g;
    var RE_BAD_BRACKET = /.[\n"'(/\\]/;
    var RE_HEX_ESCAPE = /[\da-f]/i;
    module2.exports = function tokenizer(input, options = {}) {
      let css = input.css.valueOf();
      let ignore = options.ignoreErrors;
      let code, next, quote, content, escape2;
      let escaped, escapePos, prev, n, currentToken;
      let length2 = css.length;
      let pos = 0;
      let buffer = [];
      let returned = [];
      function position2() {
        return pos;
      }
      function unclosed(what) {
        throw input.error("Unclosed " + what, pos);
      }
      function endOfFile() {
        return returned.length === 0 && pos >= length2;
      }
      function nextToken(opts) {
        if (returned.length)
          return returned.pop();
        if (pos >= length2)
          return;
        let ignoreUnclosed = opts ? opts.ignoreUnclosed : false;
        code = css.charCodeAt(pos);
        switch (code) {
          case NEWLINE:
          case SPACE3:
          case TAB:
          case CR:
          case FEED: {
            next = pos;
            do {
              next += 1;
              code = css.charCodeAt(next);
            } while (code === SPACE3 || code === NEWLINE || code === TAB || code === CR || code === FEED);
            currentToken = ["space", css.slice(pos, next)];
            pos = next - 1;
            break;
          }
          case OPEN_SQUARE:
          case CLOSE_SQUARE:
          case OPEN_CURLY:
          case CLOSE_CURLY:
          case COLON:
          case SEMICOLON:
          case CLOSE_PARENTHESES: {
            let controlChar = String.fromCharCode(code);
            currentToken = [controlChar, controlChar, pos];
            break;
          }
          case OPEN_PARENTHESES: {
            prev = buffer.length ? buffer.pop()[1] : "";
            n = css.charCodeAt(pos + 1);
            if (prev === "url" && n !== SINGLE_QUOTE && n !== DOUBLE_QUOTE && n !== SPACE3 && n !== NEWLINE && n !== TAB && n !== FEED && n !== CR) {
              next = pos;
              do {
                escaped = false;
                next = css.indexOf(")", next + 1);
                if (next === -1) {
                  if (ignore || ignoreUnclosed) {
                    next = pos;
                    break;
                  } else {
                    unclosed("bracket");
                  }
                }
                escapePos = next;
                while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
                  escapePos -= 1;
                  escaped = !escaped;
                }
              } while (escaped);
              currentToken = ["brackets", css.slice(pos, next + 1), pos, next];
              pos = next;
            } else {
              next = css.indexOf(")", pos + 1);
              content = css.slice(pos, next + 1);
              if (next === -1 || RE_BAD_BRACKET.test(content)) {
                currentToken = ["(", "(", pos];
              } else {
                currentToken = ["brackets", content, pos, next];
                pos = next;
              }
            }
            break;
          }
          case SINGLE_QUOTE:
          case DOUBLE_QUOTE: {
            quote = code === SINGLE_QUOTE ? "'" : '"';
            next = pos;
            do {
              escaped = false;
              next = css.indexOf(quote, next + 1);
              if (next === -1) {
                if (ignore || ignoreUnclosed) {
                  next = pos + 1;
                  break;
                } else {
                  unclosed("string");
                }
              }
              escapePos = next;
              while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
                escapePos -= 1;
                escaped = !escaped;
              }
            } while (escaped);
            currentToken = ["string", css.slice(pos, next + 1), pos, next];
            pos = next;
            break;
          }
          case AT: {
            RE_AT_END.lastIndex = pos + 1;
            RE_AT_END.test(css);
            if (RE_AT_END.lastIndex === 0) {
              next = css.length - 1;
            } else {
              next = RE_AT_END.lastIndex - 2;
            }
            currentToken = ["at-word", css.slice(pos, next + 1), pos, next];
            pos = next;
            break;
          }
          case BACKSLASH: {
            next = pos;
            escape2 = true;
            while (css.charCodeAt(next + 1) === BACKSLASH) {
              next += 1;
              escape2 = !escape2;
            }
            code = css.charCodeAt(next + 1);
            if (escape2 && code !== SLASH && code !== SPACE3 && code !== NEWLINE && code !== TAB && code !== CR && code !== FEED) {
              next += 1;
              if (RE_HEX_ESCAPE.test(css.charAt(next))) {
                while (RE_HEX_ESCAPE.test(css.charAt(next + 1))) {
                  next += 1;
                }
                if (css.charCodeAt(next + 1) === SPACE3) {
                  next += 1;
                }
              }
            }
            currentToken = ["word", css.slice(pos, next + 1), pos, next];
            pos = next;
            break;
          }
          default: {
            if (code === SLASH && css.charCodeAt(pos + 1) === ASTERISK) {
              next = css.indexOf("*/", pos + 2) + 1;
              if (next === 0) {
                if (ignore || ignoreUnclosed) {
                  next = css.length;
                } else {
                  unclosed("comment");
                }
              }
              currentToken = ["comment", css.slice(pos, next + 1), pos, next];
              pos = next;
            } else {
              RE_WORD_END.lastIndex = pos + 1;
              RE_WORD_END.test(css);
              if (RE_WORD_END.lastIndex === 0) {
                next = css.length - 1;
              } else {
                next = RE_WORD_END.lastIndex - 2;
              }
              currentToken = ["word", css.slice(pos, next + 1), pos, next];
              buffer.push(currentToken);
              pos = next;
            }
            break;
          }
        }
        pos++;
        return currentToken;
      }
      function back(token) {
        returned.push(token);
      }
      return {
        back,
        nextToken,
        endOfFile,
        position: position2
      };
    };
  }
});

// node_modules/postcss/lib/at-rule.js
var require_at_rule2 = __commonJS({
  "node_modules/postcss/lib/at-rule.js"(exports, module2) {
    "use strict";
    var Container3 = require_container3();
    var AtRule3 = class extends Container3 {
      constructor(defaults3) {
        super(defaults3);
        this.type = "atrule";
      }
      append(...children) {
        if (!this.proxyOf.nodes)
          this.nodes = [];
        return super.append(...children);
      }
      prepend(...children) {
        if (!this.proxyOf.nodes)
          this.nodes = [];
        return super.prepend(...children);
      }
    };
    module2.exports = AtRule3;
    AtRule3.default = AtRule3;
    Container3.registerAtRule(AtRule3);
  }
});

// node_modules/postcss/lib/root.js
var require_root3 = __commonJS({
  "node_modules/postcss/lib/root.js"(exports, module2) {
    "use strict";
    var Container3 = require_container3();
    var LazyResult;
    var Processor3;
    var Root3 = class extends Container3 {
      constructor(defaults3) {
        super(defaults3);
        this.type = "root";
        if (!this.nodes)
          this.nodes = [];
      }
      removeChild(child, ignore) {
        let index3 = this.index(child);
        if (!ignore && index3 === 0 && this.nodes.length > 1) {
          this.nodes[1].raws.before = this.nodes[index3].raws.before;
        }
        return super.removeChild(child);
      }
      normalize(child, sample, type) {
        let nodes = super.normalize(child);
        if (sample) {
          if (type === "prepend") {
            if (this.nodes.length > 1) {
              sample.raws.before = this.nodes[1].raws.before;
            } else {
              delete sample.raws.before;
            }
          } else if (this.first !== sample) {
            for (let node of nodes) {
              node.raws.before = sample.raws.before;
            }
          }
        }
        return nodes;
      }
      toResult(opts = {}) {
        let lazy = new LazyResult(new Processor3(), this, opts);
        return lazy.stringify();
      }
    };
    Root3.registerLazyResult = (dependant) => {
      LazyResult = dependant;
    };
    Root3.registerProcessor = (dependant) => {
      Processor3 = dependant;
    };
    module2.exports = Root3;
    Root3.default = Root3;
    Container3.registerRoot(Root3);
  }
});

// node_modules/postcss/lib/list.js
var require_list2 = __commonJS({
  "node_modules/postcss/lib/list.js"(exports, module2) {
    "use strict";
    var list4 = {
      split(string, separators, last) {
        let array = [];
        let current = "";
        let split = false;
        let func = 0;
        let inQuote = false;
        let prevQuote = "";
        let escape2 = false;
        for (let letter of string) {
          if (escape2) {
            escape2 = false;
          } else if (letter === "\\") {
            escape2 = true;
          } else if (inQuote) {
            if (letter === prevQuote) {
              inQuote = false;
            }
          } else if (letter === '"' || letter === "'") {
            inQuote = true;
            prevQuote = letter;
          } else if (letter === "(") {
            func += 1;
          } else if (letter === ")") {
            if (func > 0)
              func -= 1;
          } else if (func === 0) {
            if (separators.includes(letter))
              split = true;
          }
          if (split) {
            if (current !== "")
              array.push(current.trim());
            current = "";
            split = false;
          } else {
            current += letter;
          }
        }
        if (last || current !== "")
          array.push(current.trim());
        return array;
      },
      space(string) {
        let spaces = [" ", "\n", "	"];
        return list4.split(string, spaces);
      },
      comma(string) {
        return list4.split(string, [","], true);
      }
    };
    module2.exports = list4;
    list4.default = list4;
  }
});

// node_modules/postcss/lib/rule.js
var require_rule2 = __commonJS({
  "node_modules/postcss/lib/rule.js"(exports, module2) {
    "use strict";
    var Container3 = require_container3();
    var list4 = require_list2();
    var Rule3 = class extends Container3 {
      constructor(defaults3) {
        super(defaults3);
        this.type = "rule";
        if (!this.nodes)
          this.nodes = [];
      }
      get selectors() {
        return list4.comma(this.selector);
      }
      set selectors(values) {
        let match = this.selector ? this.selector.match(/,\s*/) : null;
        let sep = match ? match[0] : "," + this.raw("between", "beforeOpen");
        this.selector = values.join(sep);
      }
    };
    module2.exports = Rule3;
    Rule3.default = Rule3;
    Container3.registerRule(Rule3);
  }
});

// node_modules/postcss/lib/parser.js
var require_parser4 = __commonJS({
  "node_modules/postcss/lib/parser.js"(exports, module2) {
    "use strict";
    var Declaration3 = require_declaration2();
    var tokenizer = require_tokenize3();
    var Comment3 = require_comment3();
    var AtRule3 = require_at_rule2();
    var Root3 = require_root3();
    var Rule3 = require_rule2();
    var SAFE_COMMENT_NEIGHBOR = {
      empty: true,
      space: true
    };
    function findLastWithPosition(tokens) {
      for (let i = tokens.length - 1; i >= 0; i--) {
        let token = tokens[i];
        let pos = token[3] || token[2];
        if (pos)
          return pos;
      }
    }
    var Parser = class {
      constructor(input) {
        this.input = input;
        this.root = new Root3();
        this.current = this.root;
        this.spaces = "";
        this.semicolon = false;
        this.customProperty = false;
        this.createTokenizer();
        this.root.source = { input, start: { offset: 0, line: 1, column: 1 } };
      }
      createTokenizer() {
        this.tokenizer = tokenizer(this.input);
      }
      parse() {
        let token;
        while (!this.tokenizer.endOfFile()) {
          token = this.tokenizer.nextToken();
          switch (token[0]) {
            case "space":
              this.spaces += token[1];
              break;
            case ";":
              this.freeSemicolon(token);
              break;
            case "}":
              this.end(token);
              break;
            case "comment":
              this.comment(token);
              break;
            case "at-word":
              this.atrule(token);
              break;
            case "{":
              this.emptyRule(token);
              break;
            default:
              this.other(token);
              break;
          }
        }
        this.endFile();
      }
      comment(token) {
        let node = new Comment3();
        this.init(node, token[2]);
        node.source.end = this.getPosition(token[3] || token[2]);
        let text = token[1].slice(2, -2);
        if (/^\s*$/.test(text)) {
          node.text = "";
          node.raws.left = text;
          node.raws.right = "";
        } else {
          let match = text.match(/^(\s*)([^]*\S)(\s*)$/);
          node.text = match[2];
          node.raws.left = match[1];
          node.raws.right = match[3];
        }
      }
      emptyRule(token) {
        let node = new Rule3();
        this.init(node, token[2]);
        node.selector = "";
        node.raws.between = "";
        this.current = node;
      }
      other(start) {
        let end = false;
        let type = null;
        let colon = false;
        let bracket = null;
        let brackets = [];
        let customProperty = start[1].startsWith("--");
        let tokens = [];
        let token = start;
        while (token) {
          type = token[0];
          tokens.push(token);
          if (type === "(" || type === "[") {
            if (!bracket)
              bracket = token;
            brackets.push(type === "(" ? ")" : "]");
          } else if (customProperty && colon && type === "{") {
            if (!bracket)
              bracket = token;
            brackets.push("}");
          } else if (brackets.length === 0) {
            if (type === ";") {
              if (colon) {
                this.decl(tokens, customProperty);
                return;
              } else {
                break;
              }
            } else if (type === "{") {
              this.rule(tokens);
              return;
            } else if (type === "}") {
              this.tokenizer.back(tokens.pop());
              end = true;
              break;
            } else if (type === ":") {
              colon = true;
            }
          } else if (type === brackets[brackets.length - 1]) {
            brackets.pop();
            if (brackets.length === 0)
              bracket = null;
          }
          token = this.tokenizer.nextToken();
        }
        if (this.tokenizer.endOfFile())
          end = true;
        if (brackets.length > 0)
          this.unclosedBracket(bracket);
        if (end && colon) {
          if (!customProperty) {
            while (tokens.length) {
              token = tokens[tokens.length - 1][0];
              if (token !== "space" && token !== "comment")
                break;
              this.tokenizer.back(tokens.pop());
            }
          }
          this.decl(tokens, customProperty);
        } else {
          this.unknownWord(tokens);
        }
      }
      rule(tokens) {
        tokens.pop();
        let node = new Rule3();
        this.init(node, tokens[0][2]);
        node.raws.between = this.spacesAndCommentsFromEnd(tokens);
        this.raw(node, "selector", tokens);
        this.current = node;
      }
      decl(tokens, customProperty) {
        let node = new Declaration3();
        this.init(node, tokens[0][2]);
        let last = tokens[tokens.length - 1];
        if (last[0] === ";") {
          this.semicolon = true;
          tokens.pop();
        }
        node.source.end = this.getPosition(
          last[3] || last[2] || findLastWithPosition(tokens)
        );
        while (tokens[0][0] !== "word") {
          if (tokens.length === 1)
            this.unknownWord(tokens);
          node.raws.before += tokens.shift()[1];
        }
        node.source.start = this.getPosition(tokens[0][2]);
        node.prop = "";
        while (tokens.length) {
          let type = tokens[0][0];
          if (type === ":" || type === "space" || type === "comment") {
            break;
          }
          node.prop += tokens.shift()[1];
        }
        node.raws.between = "";
        let token;
        while (tokens.length) {
          token = tokens.shift();
          if (token[0] === ":") {
            node.raws.between += token[1];
            break;
          } else {
            if (token[0] === "word" && /\w/.test(token[1])) {
              this.unknownWord([token]);
            }
            node.raws.between += token[1];
          }
        }
        if (node.prop[0] === "_" || node.prop[0] === "*") {
          node.raws.before += node.prop[0];
          node.prop = node.prop.slice(1);
        }
        let firstSpaces = [];
        let next;
        while (tokens.length) {
          next = tokens[0][0];
          if (next !== "space" && next !== "comment")
            break;
          firstSpaces.push(tokens.shift());
        }
        this.precheckMissedSemicolon(tokens);
        for (let i = tokens.length - 1; i >= 0; i--) {
          token = tokens[i];
          if (token[1].toLowerCase() === "!important") {
            node.important = true;
            let string = this.stringFrom(tokens, i);
            string = this.spacesFromEnd(tokens) + string;
            if (string !== " !important")
              node.raws.important = string;
            break;
          } else if (token[1].toLowerCase() === "important") {
            let cache2 = tokens.slice(0);
            let str = "";
            for (let j = i; j > 0; j--) {
              let type = cache2[j][0];
              if (str.trim().indexOf("!") === 0 && type !== "space") {
                break;
              }
              str = cache2.pop()[1] + str;
            }
            if (str.trim().indexOf("!") === 0) {
              node.important = true;
              node.raws.important = str;
              tokens = cache2;
            }
          }
          if (token[0] !== "space" && token[0] !== "comment") {
            break;
          }
        }
        let hasWord = tokens.some((i) => i[0] !== "space" && i[0] !== "comment");
        if (hasWord) {
          node.raws.between += firstSpaces.map((i) => i[1]).join("");
          firstSpaces = [];
        }
        this.raw(node, "value", firstSpaces.concat(tokens), customProperty);
        if (node.value.includes(":") && !customProperty) {
          this.checkMissedSemicolon(tokens);
        }
      }
      atrule(token) {
        let node = new AtRule3();
        node.name = token[1].slice(1);
        if (node.name === "") {
          this.unnamedAtrule(node, token);
        }
        this.init(node, token[2]);
        let type;
        let prev;
        let shift;
        let last = false;
        let open = false;
        let params = [];
        let brackets = [];
        while (!this.tokenizer.endOfFile()) {
          token = this.tokenizer.nextToken();
          type = token[0];
          if (type === "(" || type === "[") {
            brackets.push(type === "(" ? ")" : "]");
          } else if (type === "{" && brackets.length > 0) {
            brackets.push("}");
          } else if (type === brackets[brackets.length - 1]) {
            brackets.pop();
          }
          if (brackets.length === 0) {
            if (type === ";") {
              node.source.end = this.getPosition(token[2]);
              this.semicolon = true;
              break;
            } else if (type === "{") {
              open = true;
              break;
            } else if (type === "}") {
              if (params.length > 0) {
                shift = params.length - 1;
                prev = params[shift];
                while (prev && prev[0] === "space") {
                  prev = params[--shift];
                }
                if (prev) {
                  node.source.end = this.getPosition(prev[3] || prev[2]);
                }
              }
              this.end(token);
              break;
            } else {
              params.push(token);
            }
          } else {
            params.push(token);
          }
          if (this.tokenizer.endOfFile()) {
            last = true;
            break;
          }
        }
        node.raws.between = this.spacesAndCommentsFromEnd(params);
        if (params.length) {
          node.raws.afterName = this.spacesAndCommentsFromStart(params);
          this.raw(node, "params", params);
          if (last) {
            token = params[params.length - 1];
            node.source.end = this.getPosition(token[3] || token[2]);
            this.spaces = node.raws.between;
            node.raws.between = "";
          }
        } else {
          node.raws.afterName = "";
          node.params = "";
        }
        if (open) {
          node.nodes = [];
          this.current = node;
        }
      }
      end(token) {
        if (this.current.nodes && this.current.nodes.length) {
          this.current.raws.semicolon = this.semicolon;
        }
        this.semicolon = false;
        this.current.raws.after = (this.current.raws.after || "") + this.spaces;
        this.spaces = "";
        if (this.current.parent) {
          this.current.source.end = this.getPosition(token[2]);
          this.current = this.current.parent;
        } else {
          this.unexpectedClose(token);
        }
      }
      endFile() {
        if (this.current.parent)
          this.unclosedBlock();
        if (this.current.nodes && this.current.nodes.length) {
          this.current.raws.semicolon = this.semicolon;
        }
        this.current.raws.after = (this.current.raws.after || "") + this.spaces;
      }
      freeSemicolon(token) {
        this.spaces += token[1];
        if (this.current.nodes) {
          let prev = this.current.nodes[this.current.nodes.length - 1];
          if (prev && prev.type === "rule" && !prev.raws.ownSemicolon) {
            prev.raws.ownSemicolon = this.spaces;
            this.spaces = "";
          }
        }
      }
      getPosition(offset) {
        let pos = this.input.fromOffset(offset);
        return {
          offset,
          line: pos.line,
          column: pos.col
        };
      }
      init(node, offset) {
        this.current.push(node);
        node.source = {
          start: this.getPosition(offset),
          input: this.input
        };
        node.raws.before = this.spaces;
        this.spaces = "";
        if (node.type !== "comment")
          this.semicolon = false;
      }
      raw(node, prop, tokens, customProperty) {
        let token, type;
        let length2 = tokens.length;
        let value2 = "";
        let clean = true;
        let next, prev;
        for (let i = 0; i < length2; i += 1) {
          token = tokens[i];
          type = token[0];
          if (type === "space" && i === length2 - 1 && !customProperty) {
            clean = false;
          } else if (type === "comment") {
            prev = tokens[i - 1] ? tokens[i - 1][0] : "empty";
            next = tokens[i + 1] ? tokens[i + 1][0] : "empty";
            if (!SAFE_COMMENT_NEIGHBOR[prev] && !SAFE_COMMENT_NEIGHBOR[next]) {
              if (value2.slice(-1) === ",") {
                clean = false;
              } else {
                value2 += token[1];
              }
            } else {
              clean = false;
            }
          } else {
            value2 += token[1];
          }
        }
        if (!clean) {
          let raw = tokens.reduce((all, i) => all + i[1], "");
          node.raws[prop] = { value: value2, raw };
        }
        node[prop] = value2;
      }
      spacesAndCommentsFromEnd(tokens) {
        let lastTokenType;
        let spaces = "";
        while (tokens.length) {
          lastTokenType = tokens[tokens.length - 1][0];
          if (lastTokenType !== "space" && lastTokenType !== "comment")
            break;
          spaces = tokens.pop()[1] + spaces;
        }
        return spaces;
      }
      spacesAndCommentsFromStart(tokens) {
        let next;
        let spaces = "";
        while (tokens.length) {
          next = tokens[0][0];
          if (next !== "space" && next !== "comment")
            break;
          spaces += tokens.shift()[1];
        }
        return spaces;
      }
      spacesFromEnd(tokens) {
        let lastTokenType;
        let spaces = "";
        while (tokens.length) {
          lastTokenType = tokens[tokens.length - 1][0];
          if (lastTokenType !== "space")
            break;
          spaces = tokens.pop()[1] + spaces;
        }
        return spaces;
      }
      stringFrom(tokens, from) {
        let result = "";
        for (let i = from; i < tokens.length; i++) {
          result += tokens[i][1];
        }
        tokens.splice(from, tokens.length - from);
        return result;
      }
      colon(tokens) {
        let brackets = 0;
        let token, type, prev;
        for (let [i, element] of tokens.entries()) {
          token = element;
          type = token[0];
          if (type === "(") {
            brackets += 1;
          }
          if (type === ")") {
            brackets -= 1;
          }
          if (brackets === 0 && type === ":") {
            if (!prev) {
              this.doubleColon(token);
            } else if (prev[0] === "word" && prev[1] === "progid") {
              continue;
            } else {
              return i;
            }
          }
          prev = token;
        }
        return false;
      }
      unclosedBracket(bracket) {
        throw this.input.error(
          "Unclosed bracket",
          { offset: bracket[2] },
          { offset: bracket[2] + 1 }
        );
      }
      unknownWord(tokens) {
        throw this.input.error(
          "Unknown word",
          { offset: tokens[0][2] },
          { offset: tokens[0][2] + tokens[0][1].length }
        );
      }
      unexpectedClose(token) {
        throw this.input.error(
          "Unexpected }",
          { offset: token[2] },
          { offset: token[2] + 1 }
        );
      }
      unclosedBlock() {
        let pos = this.current.source.start;
        throw this.input.error("Unclosed block", pos.line, pos.column);
      }
      doubleColon(token) {
        throw this.input.error(
          "Double colon",
          { offset: token[2] },
          { offset: token[2] + token[1].length }
        );
      }
      unnamedAtrule(node, token) {
        throw this.input.error(
          "At-rule without name",
          { offset: token[2] },
          { offset: token[2] + token[1].length }
        );
      }
      precheckMissedSemicolon() {
      }
      checkMissedSemicolon(tokens) {
        let colon = this.colon(tokens);
        if (colon === false)
          return;
        let founded = 0;
        let token;
        for (let j = colon - 1; j >= 0; j--) {
          token = tokens[j];
          if (token[0] !== "space") {
            founded += 1;
            if (founded === 2)
              break;
          }
        }
        throw this.input.error(
          "Missed semicolon",
          token[0] === "word" ? token[3] + 1 : token[2]
        );
      }
    };
    module2.exports = Parser;
  }
});

// node_modules/postcss/lib/parse.js
var require_parse3 = __commonJS({
  "node_modules/postcss/lib/parse.js"(exports, module2) {
    "use strict";
    var Container3 = require_container3();
    var Parser = require_parser4();
    var Input3 = require_input2();
    function parse5(css, opts) {
      let input = new Input3(css, opts);
      let parser5 = new Parser(input);
      try {
        parser5.parse();
      } catch (e) {
        if (true) {
          if (e.name === "CssSyntaxError" && opts && opts.from) {
            if (/\.scss$/i.test(opts.from)) {
              e.message += "\nYou tried to parse SCSS with the standard CSS parser; try again with the postcss-scss parser";
            } else if (/\.sass/i.test(opts.from)) {
              e.message += "\nYou tried to parse Sass with the standard CSS parser; try again with the postcss-sass parser";
            } else if (/\.less$/i.test(opts.from)) {
              e.message += "\nYou tried to parse Less with the standard CSS parser; try again with the postcss-less parser";
            }
          }
        }
        throw e;
      }
      return parser5.root;
    }
    module2.exports = parse5;
    parse5.default = parse5;
    Container3.registerParse(parse5);
  }
});

// node_modules/postcss/lib/lazy-result.js
var require_lazy_result2 = __commonJS({
  "node_modules/postcss/lib/lazy-result.js"(exports, module2) {
    "use strict";
    var { isClean, my } = require_symbols2();
    var MapGenerator = require_map_generator2();
    var stringify3 = require_stringify3();
    var Container3 = require_container3();
    var Document3 = require_document2();
    var warnOnce = require_warn_once2();
    var Result3 = require_result2();
    var parse5 = require_parse3();
    var Root3 = require_root3();
    var TYPE_TO_CLASS_NAME = {
      document: "Document",
      root: "Root",
      atrule: "AtRule",
      rule: "Rule",
      decl: "Declaration",
      comment: "Comment"
    };
    var PLUGIN_PROPS = {
      postcssPlugin: true,
      prepare: true,
      Once: true,
      Document: true,
      Root: true,
      Declaration: true,
      Rule: true,
      AtRule: true,
      Comment: true,
      DeclarationExit: true,
      RuleExit: true,
      AtRuleExit: true,
      CommentExit: true,
      RootExit: true,
      DocumentExit: true,
      OnceExit: true
    };
    var NOT_VISITORS = {
      postcssPlugin: true,
      prepare: true,
      Once: true
    };
    var CHILDREN = 0;
    function isPromise(obj) {
      return typeof obj === "object" && typeof obj.then === "function";
    }
    function getEvents(node) {
      let key = false;
      let type = TYPE_TO_CLASS_NAME[node.type];
      if (node.type === "decl") {
        key = node.prop.toLowerCase();
      } else if (node.type === "atrule") {
        key = node.name.toLowerCase();
      }
      if (key && node.append) {
        return [
          type,
          type + "-" + key,
          CHILDREN,
          type + "Exit",
          type + "Exit-" + key
        ];
      } else if (key) {
        return [type, type + "-" + key, type + "Exit", type + "Exit-" + key];
      } else if (node.append) {
        return [type, CHILDREN, type + "Exit"];
      } else {
        return [type, type + "Exit"];
      }
    }
    function toStack(node) {
      let events;
      if (node.type === "document") {
        events = ["Document", CHILDREN, "DocumentExit"];
      } else if (node.type === "root") {
        events = ["Root", CHILDREN, "RootExit"];
      } else {
        events = getEvents(node);
      }
      return {
        node,
        events,
        eventIndex: 0,
        visitors: [],
        visitorIndex: 0,
        iterator: 0
      };
    }
    function cleanMarks(node) {
      node[isClean] = false;
      if (node.nodes)
        node.nodes.forEach((i) => cleanMarks(i));
      return node;
    }
    var postcss3 = {};
    var LazyResult = class {
      constructor(processor, css, opts) {
        this.stringified = false;
        this.processed = false;
        let root3;
        if (typeof css === "object" && css !== null && (css.type === "root" || css.type === "document")) {
          root3 = cleanMarks(css);
        } else if (css instanceof LazyResult || css instanceof Result3) {
          root3 = cleanMarks(css.root);
          if (css.map) {
            if (typeof opts.map === "undefined")
              opts.map = {};
            if (!opts.map.inline)
              opts.map.inline = false;
            opts.map.prev = css.map;
          }
        } else {
          let parser5 = parse5;
          if (opts.syntax)
            parser5 = opts.syntax.parse;
          if (opts.parser)
            parser5 = opts.parser;
          if (parser5.parse)
            parser5 = parser5.parse;
          try {
            root3 = parser5(css, opts);
          } catch (error) {
            this.processed = true;
            this.error = error;
          }
          if (root3 && !root3[my]) {
            Container3.rebuild(root3);
          }
        }
        this.result = new Result3(processor, root3, opts);
        this.helpers = { ...postcss3, result: this.result, postcss: postcss3 };
        this.plugins = this.processor.plugins.map((plugin3) => {
          if (typeof plugin3 === "object" && plugin3.prepare) {
            return { ...plugin3, ...plugin3.prepare(this.result) };
          } else {
            return plugin3;
          }
        });
      }
      get [Symbol.toStringTag]() {
        return "LazyResult";
      }
      get processor() {
        return this.result.processor;
      }
      get opts() {
        return this.result.opts;
      }
      get css() {
        return this.stringify().css;
      }
      get content() {
        return this.stringify().content;
      }
      get map() {
        return this.stringify().map;
      }
      get root() {
        return this.sync().root;
      }
      get messages() {
        return this.sync().messages;
      }
      warnings() {
        return this.sync().warnings();
      }
      toString() {
        return this.css;
      }
      then(onFulfilled, onRejected) {
        if (true) {
          if (!("from" in this.opts)) {
            warnOnce(
              "Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning."
            );
          }
        }
        return this.async().then(onFulfilled, onRejected);
      }
      catch(onRejected) {
        return this.async().catch(onRejected);
      }
      finally(onFinally) {
        return this.async().then(onFinally, onFinally);
      }
      async() {
        if (this.error)
          return Promise.reject(this.error);
        if (this.processed)
          return Promise.resolve(this.result);
        if (!this.processing) {
          this.processing = this.runAsync();
        }
        return this.processing;
      }
      sync() {
        if (this.error)
          throw this.error;
        if (this.processed)
          return this.result;
        this.processed = true;
        if (this.processing) {
          throw this.getAsyncError();
        }
        for (let plugin3 of this.plugins) {
          let promise = this.runOnRoot(plugin3);
          if (isPromise(promise)) {
            throw this.getAsyncError();
          }
        }
        this.prepareVisitors();
        if (this.hasListener) {
          let root3 = this.result.root;
          while (!root3[isClean]) {
            root3[isClean] = true;
            this.walkSync(root3);
          }
          if (this.listeners.OnceExit) {
            if (root3.type === "document") {
              for (let subRoot of root3.nodes) {
                this.visitSync(this.listeners.OnceExit, subRoot);
              }
            } else {
              this.visitSync(this.listeners.OnceExit, root3);
            }
          }
        }
        return this.result;
      }
      stringify() {
        if (this.error)
          throw this.error;
        if (this.stringified)
          return this.result;
        this.stringified = true;
        this.sync();
        let opts = this.result.opts;
        let str = stringify3;
        if (opts.syntax)
          str = opts.syntax.stringify;
        if (opts.stringifier)
          str = opts.stringifier;
        if (str.stringify)
          str = str.stringify;
        let map = new MapGenerator(str, this.result.root, this.result.opts);
        let data = map.generate();
        this.result.css = data[0];
        this.result.map = data[1];
        return this.result;
      }
      walkSync(node) {
        node[isClean] = true;
        let events = getEvents(node);
        for (let event of events) {
          if (event === CHILDREN) {
            if (node.nodes) {
              node.each((child) => {
                if (!child[isClean])
                  this.walkSync(child);
              });
            }
          } else {
            let visitors = this.listeners[event];
            if (visitors) {
              if (this.visitSync(visitors, node.toProxy()))
                return;
            }
          }
        }
      }
      visitSync(visitors, node) {
        for (let [plugin3, visitor] of visitors) {
          this.result.lastPlugin = plugin3;
          let promise;
          try {
            promise = visitor(node, this.helpers);
          } catch (e) {
            throw this.handleError(e, node.proxyOf);
          }
          if (node.type !== "root" && node.type !== "document" && !node.parent) {
            return true;
          }
          if (isPromise(promise)) {
            throw this.getAsyncError();
          }
        }
      }
      runOnRoot(plugin3) {
        this.result.lastPlugin = plugin3;
        try {
          if (typeof plugin3 === "object" && plugin3.Once) {
            if (this.result.root.type === "document") {
              let roots = this.result.root.nodes.map(
                (root3) => plugin3.Once(root3, this.helpers)
              );
              if (isPromise(roots[0])) {
                return Promise.all(roots);
              }
              return roots;
            }
            return plugin3.Once(this.result.root, this.helpers);
          } else if (typeof plugin3 === "function") {
            return plugin3(this.result.root, this.result);
          }
        } catch (error) {
          throw this.handleError(error);
        }
      }
      getAsyncError() {
        throw new Error("Use process(css).then(cb) to work with async plugins");
      }
      handleError(error, node) {
        let plugin3 = this.result.lastPlugin;
        try {
          if (node)
            node.addToError(error);
          this.error = error;
          if (error.name === "CssSyntaxError" && !error.plugin) {
            error.plugin = plugin3.postcssPlugin;
            error.setMessage();
          } else if (plugin3.postcssVersion) {
            if (true) {
              let pluginName = plugin3.postcssPlugin;
              let pluginVer = plugin3.postcssVersion;
              let runtimeVer = this.result.processor.version;
              let a = pluginVer.split(".");
              let b = runtimeVer.split(".");
              if (a[0] !== b[0] || parseInt(a[1]) > parseInt(b[1])) {
                console.error(
                  "Unknown error from PostCSS plugin. Your current PostCSS version is " + runtimeVer + ", but " + pluginName + " uses " + pluginVer + ". Perhaps this is the source of the error below."
                );
              }
            }
          }
        } catch (err) {
          if (console && console.error)
            console.error(err);
        }
        return error;
      }
      async runAsync() {
        this.plugin = 0;
        for (let i = 0; i < this.plugins.length; i++) {
          let plugin3 = this.plugins[i];
          let promise = this.runOnRoot(plugin3);
          if (isPromise(promise)) {
            try {
              await promise;
            } catch (error) {
              throw this.handleError(error);
            }
          }
        }
        this.prepareVisitors();
        if (this.hasListener) {
          let root3 = this.result.root;
          while (!root3[isClean]) {
            root3[isClean] = true;
            let stack = [toStack(root3)];
            while (stack.length > 0) {
              let promise = this.visitTick(stack);
              if (isPromise(promise)) {
                try {
                  await promise;
                } catch (e) {
                  let node = stack[stack.length - 1].node;
                  throw this.handleError(e, node);
                }
              }
            }
          }
          if (this.listeners.OnceExit) {
            for (let [plugin3, visitor] of this.listeners.OnceExit) {
              this.result.lastPlugin = plugin3;
              try {
                if (root3.type === "document") {
                  let roots = root3.nodes.map(
                    (subRoot) => visitor(subRoot, this.helpers)
                  );
                  await Promise.all(roots);
                } else {
                  await visitor(root3, this.helpers);
                }
              } catch (e) {
                throw this.handleError(e);
              }
            }
          }
        }
        this.processed = true;
        return this.stringify();
      }
      prepareVisitors() {
        this.listeners = {};
        let add = (plugin3, type, cb) => {
          if (!this.listeners[type])
            this.listeners[type] = [];
          this.listeners[type].push([plugin3, cb]);
        };
        for (let plugin3 of this.plugins) {
          if (typeof plugin3 === "object") {
            for (let event in plugin3) {
              if (!PLUGIN_PROPS[event] && /^[A-Z]/.test(event)) {
                throw new Error(
                  `Unknown event ${event} in ${plugin3.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`
                );
              }
              if (!NOT_VISITORS[event]) {
                if (typeof plugin3[event] === "object") {
                  for (let filter in plugin3[event]) {
                    if (filter === "*") {
                      add(plugin3, event, plugin3[event][filter]);
                    } else {
                      add(
                        plugin3,
                        event + "-" + filter.toLowerCase(),
                        plugin3[event][filter]
                      );
                    }
                  }
                } else if (typeof plugin3[event] === "function") {
                  add(plugin3, event, plugin3[event]);
                }
              }
            }
          }
        }
        this.hasListener = Object.keys(this.listeners).length > 0;
      }
      visitTick(stack) {
        let visit = stack[stack.length - 1];
        let { node, visitors } = visit;
        if (node.type !== "root" && node.type !== "document" && !node.parent) {
          stack.pop();
          return;
        }
        if (visitors.length > 0 && visit.visitorIndex < visitors.length) {
          let [plugin3, visitor] = visitors[visit.visitorIndex];
          visit.visitorIndex += 1;
          if (visit.visitorIndex === visitors.length) {
            visit.visitors = [];
            visit.visitorIndex = 0;
          }
          this.result.lastPlugin = plugin3;
          try {
            return visitor(node.toProxy(), this.helpers);
          } catch (e) {
            throw this.handleError(e, node);
          }
        }
        if (visit.iterator !== 0) {
          let iterator = visit.iterator;
          let child;
          while (child = node.nodes[node.indexes[iterator]]) {
            node.indexes[iterator] += 1;
            if (!child[isClean]) {
              child[isClean] = true;
              stack.push(toStack(child));
              return;
            }
          }
          visit.iterator = 0;
          delete node.indexes[iterator];
        }
        let events = visit.events;
        while (visit.eventIndex < events.length) {
          let event = events[visit.eventIndex];
          visit.eventIndex += 1;
          if (event === CHILDREN) {
            if (node.nodes && node.nodes.length) {
              node[isClean] = true;
              visit.iterator = node.getIterator();
            }
            return;
          } else if (this.listeners[event]) {
            visit.visitors = this.listeners[event];
            return;
          }
        }
        stack.pop();
      }
    };
    LazyResult.registerPostcss = (dependant) => {
      postcss3 = dependant;
    };
    module2.exports = LazyResult;
    LazyResult.default = LazyResult;
    Root3.registerLazyResult(LazyResult);
    Document3.registerLazyResult(LazyResult);
  }
});

// node_modules/postcss/lib/no-work-result.js
var require_no_work_result2 = __commonJS({
  "node_modules/postcss/lib/no-work-result.js"(exports, module2) {
    "use strict";
    var MapGenerator = require_map_generator2();
    var stringify3 = require_stringify3();
    var warnOnce = require_warn_once2();
    var parse5 = require_parse3();
    var Result3 = require_result2();
    var NoWorkResult = class {
      constructor(processor, css, opts) {
        css = css.toString();
        this.stringified = false;
        this._processor = processor;
        this._css = css;
        this._opts = opts;
        this._map = void 0;
        let root3;
        let str = stringify3;
        this.result = new Result3(this._processor, root3, this._opts);
        this.result.css = css;
        let self = this;
        Object.defineProperty(this.result, "root", {
          get() {
            return self.root;
          }
        });
        let map = new MapGenerator(str, root3, this._opts, css);
        if (map.isMap()) {
          let [generatedCSS, generatedMap] = map.generate();
          if (generatedCSS) {
            this.result.css = generatedCSS;
          }
          if (generatedMap) {
            this.result.map = generatedMap;
          }
        }
      }
      get [Symbol.toStringTag]() {
        return "NoWorkResult";
      }
      get processor() {
        return this.result.processor;
      }
      get opts() {
        return this.result.opts;
      }
      get css() {
        return this.result.css;
      }
      get content() {
        return this.result.css;
      }
      get map() {
        return this.result.map;
      }
      get root() {
        if (this._root) {
          return this._root;
        }
        let root3;
        let parser5 = parse5;
        try {
          root3 = parser5(this._css, this._opts);
        } catch (error) {
          this.error = error;
        }
        if (this.error) {
          throw this.error;
        } else {
          this._root = root3;
          return root3;
        }
      }
      get messages() {
        return [];
      }
      warnings() {
        return [];
      }
      toString() {
        return this._css;
      }
      then(onFulfilled, onRejected) {
        if (true) {
          if (!("from" in this._opts)) {
            warnOnce(
              "Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning."
            );
          }
        }
        return this.async().then(onFulfilled, onRejected);
      }
      catch(onRejected) {
        return this.async().catch(onRejected);
      }
      finally(onFinally) {
        return this.async().then(onFinally, onFinally);
      }
      async() {
        if (this.error)
          return Promise.reject(this.error);
        return Promise.resolve(this.result);
      }
      sync() {
        if (this.error)
          throw this.error;
        return this.result;
      }
    };
    module2.exports = NoWorkResult;
    NoWorkResult.default = NoWorkResult;
  }
});

// node_modules/postcss/lib/processor.js
var require_processor3 = __commonJS({
  "node_modules/postcss/lib/processor.js"(exports, module2) {
    "use strict";
    var NoWorkResult = require_no_work_result2();
    var LazyResult = require_lazy_result2();
    var Document3 = require_document2();
    var Root3 = require_root3();
    var Processor3 = class {
      constructor(plugins = []) {
        this.version = "8.4.21";
        this.plugins = this.normalize(plugins);
      }
      use(plugin3) {
        this.plugins = this.plugins.concat(this.normalize([plugin3]));
        return this;
      }
      process(css, opts = {}) {
        if (this.plugins.length === 0 && typeof opts.parser === "undefined" && typeof opts.stringifier === "undefined" && typeof opts.syntax === "undefined") {
          return new NoWorkResult(this, css, opts);
        } else {
          return new LazyResult(this, css, opts);
        }
      }
      normalize(plugins) {
        let normalized = [];
        for (let i of plugins) {
          if (i.postcss === true) {
            i = i();
          } else if (i.postcss) {
            i = i.postcss;
          }
          if (typeof i === "object" && Array.isArray(i.plugins)) {
            normalized = normalized.concat(i.plugins);
          } else if (typeof i === "object" && i.postcssPlugin) {
            normalized.push(i);
          } else if (typeof i === "function") {
            normalized.push(i);
          } else if (typeof i === "object" && (i.parse || i.stringify)) {
            if (true) {
              throw new Error(
                "PostCSS syntaxes cannot be used as plugins. Instead, please use one of the syntax/parser/stringifier options as outlined in your PostCSS runner documentation."
              );
            }
          } else {
            throw new Error(i + " is not a PostCSS plugin");
          }
        }
        return normalized;
      }
    };
    module2.exports = Processor3;
    Processor3.default = Processor3;
    Root3.registerProcessor(Processor3);
    Document3.registerProcessor(Processor3);
  }
});

// node_modules/postcss/lib/fromJSON.js
var require_fromJSON2 = __commonJS({
  "node_modules/postcss/lib/fromJSON.js"(exports, module2) {
    "use strict";
    var Declaration3 = require_declaration2();
    var PreviousMap = require_previous_map2();
    var Comment3 = require_comment3();
    var AtRule3 = require_at_rule2();
    var Input3 = require_input2();
    var Root3 = require_root3();
    var Rule3 = require_rule2();
    function fromJSON3(json, inputs) {
      if (Array.isArray(json))
        return json.map((n) => fromJSON3(n));
      let { inputs: ownInputs, ...defaults3 } = json;
      if (ownInputs) {
        inputs = [];
        for (let input of ownInputs) {
          let inputHydrated = { ...input, __proto__: Input3.prototype };
          if (inputHydrated.map) {
            inputHydrated.map = {
              ...inputHydrated.map,
              __proto__: PreviousMap.prototype
            };
          }
          inputs.push(inputHydrated);
        }
      }
      if (defaults3.nodes) {
        defaults3.nodes = json.nodes.map((n) => fromJSON3(n, inputs));
      }
      if (defaults3.source) {
        let { inputId, ...source } = defaults3.source;
        defaults3.source = source;
        if (inputId != null) {
          defaults3.source.input = inputs[inputId];
        }
      }
      if (defaults3.type === "root") {
        return new Root3(defaults3);
      } else if (defaults3.type === "decl") {
        return new Declaration3(defaults3);
      } else if (defaults3.type === "rule") {
        return new Rule3(defaults3);
      } else if (defaults3.type === "comment") {
        return new Comment3(defaults3);
      } else if (defaults3.type === "atrule") {
        return new AtRule3(defaults3);
      } else {
        throw new Error("Unknown node type: " + json.type);
      }
    }
    module2.exports = fromJSON3;
    fromJSON3.default = fromJSON3;
  }
});

// node_modules/postcss/lib/postcss.js
var require_postcss2 = __commonJS({
  "node_modules/postcss/lib/postcss.js"(exports, module2) {
    "use strict";
    var CssSyntaxError3 = require_css_syntax_error2();
    var Declaration3 = require_declaration2();
    var LazyResult = require_lazy_result2();
    var Container3 = require_container3();
    var Processor3 = require_processor3();
    var stringify3 = require_stringify3();
    var fromJSON3 = require_fromJSON2();
    var Document3 = require_document2();
    var Warning3 = require_warning2();
    var Comment3 = require_comment3();
    var AtRule3 = require_at_rule2();
    var Result3 = require_result2();
    var Input3 = require_input2();
    var parse5 = require_parse3();
    var list4 = require_list2();
    var Rule3 = require_rule2();
    var Root3 = require_root3();
    var Node3 = require_node3();
    function postcss3(...plugins) {
      if (plugins.length === 1 && Array.isArray(plugins[0])) {
        plugins = plugins[0];
      }
      return new Processor3(plugins);
    }
    postcss3.plugin = function plugin3(name, initializer) {
      let warningPrinted = false;
      function creator(...args) {
        if (console && console.warn && !warningPrinted) {
          warningPrinted = true;
          console.warn(
            name + ": postcss.plugin was deprecated. Migration guide:\nhttps://evilmartians.com/chronicles/postcss-8-plugin-migration"
          );
          if (process.env.LANG && process.env.LANG.startsWith("cn")) {
            console.warn(
              name + ": \u91CC\u9762 postcss.plugin \u88AB\u5F03\u7528. \u8FC1\u79FB\u6307\u5357:\nhttps://www.w3ctech.com/topic/2226"
            );
          }
        }
        let transformer = initializer(...args);
        transformer.postcssPlugin = name;
        transformer.postcssVersion = new Processor3().version;
        return transformer;
      }
      let cache2;
      Object.defineProperty(creator, "postcss", {
        get() {
          if (!cache2)
            cache2 = creator();
          return cache2;
        }
      });
      creator.process = function(css, processOpts, pluginOpts) {
        return postcss3([creator(pluginOpts)]).process(css, processOpts);
      };
      return creator;
    };
    postcss3.stringify = stringify3;
    postcss3.parse = parse5;
    postcss3.fromJSON = fromJSON3;
    postcss3.list = list4;
    postcss3.comment = (defaults3) => new Comment3(defaults3);
    postcss3.atRule = (defaults3) => new AtRule3(defaults3);
    postcss3.decl = (defaults3) => new Declaration3(defaults3);
    postcss3.rule = (defaults3) => new Rule3(defaults3);
    postcss3.root = (defaults3) => new Root3(defaults3);
    postcss3.document = (defaults3) => new Document3(defaults3);
    postcss3.CssSyntaxError = CssSyntaxError3;
    postcss3.Declaration = Declaration3;
    postcss3.Container = Container3;
    postcss3.Processor = Processor3;
    postcss3.Document = Document3;
    postcss3.Comment = Comment3;
    postcss3.Warning = Warning3;
    postcss3.AtRule = AtRule3;
    postcss3.Result = Result3;
    postcss3.Input = Input3;
    postcss3.Rule = Rule3;
    postcss3.Root = Root3;
    postcss3.Node = Node3;
    LazyResult.registerPostcss(postcss3);
    module2.exports = postcss3;
    postcss3.default = postcss3;
  }
});

// node_modules/extend/index.js
var require_extend = __commonJS({
  "node_modules/extend/index.js"(exports, module2) {
    "use strict";
    var hasOwn = Object.prototype.hasOwnProperty;
    var toStr = Object.prototype.toString;
    var defineProperty = Object.defineProperty;
    var gOPD = Object.getOwnPropertyDescriptor;
    var isArray = function isArray2(arr) {
      if (typeof Array.isArray === "function") {
        return Array.isArray(arr);
      }
      return toStr.call(arr) === "[object Array]";
    };
    var isPlainObject2 = function isPlainObject3(obj) {
      if (!obj || toStr.call(obj) !== "[object Object]") {
        return false;
      }
      var hasOwnConstructor = hasOwn.call(obj, "constructor");
      var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, "isPrototypeOf");
      if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
        return false;
      }
      var key;
      for (key in obj) {
      }
      return typeof key === "undefined" || hasOwn.call(obj, key);
    };
    var setProperty = function setProperty2(target, options) {
      if (defineProperty && options.name === "__proto__") {
        defineProperty(target, options.name, {
          enumerable: true,
          configurable: true,
          value: options.newValue,
          writable: true
        });
      } else {
        target[options.name] = options.newValue;
      }
    };
    var getProperty = function getProperty2(obj, name) {
      if (name === "__proto__") {
        if (!hasOwn.call(obj, name)) {
          return void 0;
        } else if (gOPD) {
          return gOPD(obj, name).value;
        }
      }
      return obj[name];
    };
    module2.exports = function extend() {
      var options, name, src, copy, copyIsArray, clone;
      var target = arguments[0];
      var i = 1;
      var length2 = arguments.length;
      var deep = false;
      if (typeof target === "boolean") {
        deep = target;
        target = arguments[1] || {};
        i = 2;
      }
      if (target == null || typeof target !== "object" && typeof target !== "function") {
        target = {};
      }
      for (; i < length2; ++i) {
        options = arguments[i];
        if (options != null) {
          for (name in options) {
            src = getProperty(target, name);
            copy = getProperty(options, name);
            if (target !== copy) {
              if (deep && copy && (isPlainObject2(copy) || (copyIsArray = isArray(copy)))) {
                if (copyIsArray) {
                  copyIsArray = false;
                  clone = src && isArray(src) ? src : [];
                } else {
                  clone = src && isPlainObject2(src) ? src : {};
                }
                setProperty(target, { name, newValue: extend(deep, clone, copy) });
              } else if (typeof copy !== "undefined") {
                setProperty(target, { name, newValue: copy });
              }
            }
          }
        }
      }
      return target;
    };
  }
});

// node_modules/postcss-css-variables/lib/shallow-clone-node.js
var require_shallow_clone_node = __commonJS({
  "node_modules/postcss-css-variables/lib/shallow-clone-node.js"(exports, module2) {
    var shallowCloneNode = function(obj, parent) {
      var cloned = new obj.constructor();
      Object.keys(obj).forEach(function(i) {
        if (!obj.hasOwnProperty(i)) {
          return;
        }
        var value2 = obj[i];
        var type = typeof value2;
        if (i === "parent" && type === "object") {
          if (parent) {
            cloned[i] = parent;
          }
        } else if (i === "source") {
          cloned[i] = value2;
        } else if (value2 instanceof Array) {
          if (i === "nodes") {
            cloned[i] = [];
          } else {
            cloned[i] = value2.map(function(j) {
              shallowCloneNode(j, cloned);
            });
          }
        } else if (i !== "before" && i !== "after" && i !== "between" && i !== "semicolon") {
          if (type === "object") {
            value2 = shallowCloneNode(value2);
          }
          cloned[i] = value2;
        }
      });
      return cloned;
    };
    module2.exports = shallowCloneNode;
  }
});

// node_modules/balanced-match/index.js
var require_balanced_match = __commonJS({
  "node_modules/balanced-match/index.js"(exports, module2) {
    "use strict";
    module2.exports = balanced;
    function balanced(a, b, str) {
      if (a instanceof RegExp)
        a = maybeMatch(a, str);
      if (b instanceof RegExp)
        b = maybeMatch(b, str);
      var r = range(a, b, str);
      return r && {
        start: r[0],
        end: r[1],
        pre: str.slice(0, r[0]),
        body: str.slice(r[0] + a.length, r[1]),
        post: str.slice(r[1] + b.length)
      };
    }
    function maybeMatch(reg, str) {
      var m = str.match(reg);
      return m ? m[0] : null;
    }
    balanced.range = range;
    function range(a, b, str) {
      var begs, beg, left, right, result;
      var ai = str.indexOf(a);
      var bi = str.indexOf(b, ai + 1);
      var i = ai;
      if (ai >= 0 && bi > 0) {
        if (a === b) {
          return [ai, bi];
        }
        begs = [];
        left = str.length;
        while (i >= 0 && !result) {
          if (i == ai) {
            begs.push(i);
            ai = str.indexOf(a, i + 1);
          } else if (begs.length == 1) {
            result = [begs.pop(), bi];
          } else {
            beg = begs.pop();
            if (beg < left) {
              left = beg;
              right = bi;
            }
            bi = str.indexOf(b, i + 1);
          }
          i = ai < bi && ai >= 0 ? ai : bi;
        }
        if (begs.length) {
          result = [left, right];
        }
      }
      return result;
    }
  }
});

// node_modules/postcss-css-variables/lib/generate-descendant-pieces-from-selector.js
var require_generate_descendant_pieces_from_selector = __commonJS({
  "node_modules/postcss-css-variables/lib/generate-descendant-pieces-from-selector.js"(exports, module2) {
    var RE_SELECTOR_DESCENDANT_SPLIT = /(.*?(?:(?:\([^\)]+\)|\[[^\]]+\]|(?![><+~\s]).)+)(?:(?:(?:\s(?!>>))|(?:\t(?!>>))|(?:\s?>>\s?))(?!\s+))(?![><+~][\s]+?))/;
    var generateDescendantPiecesFromSelector = function(selector) {
      return selector.split(RE_SELECTOR_DESCENDANT_SPLIT).filter(function(piece) {
        if (piece.length > 0) {
          return true;
        }
        return false;
      }).map(function(piece) {
        return piece.trim().replace(/\s*?>>\s*?/g, "");
      });
    };
    module2.exports = generateDescendantPiecesFromSelector;
  }
});

// node_modules/postcss-css-variables/lib/generate-scope-list.js
var require_generate_scope_list = __commonJS({
  "node_modules/postcss-css-variables/lib/generate-scope-list.js"(exports, module2) {
    var generateDescendantPiecesFromSelector = require_generate_descendant_pieces_from_selector();
    var generateScopeList = function(node, includeSelf) {
      includeSelf = includeSelf || false;
      var selectorScopeList = [
        []
      ];
      var currentNodeParent = includeSelf ? node : node.parent;
      while (currentNodeParent) {
        var scopePieces = (currentNodeParent.selectors || []).map(function(selectorPiece) {
          return {
            value: selectorPiece,
            type: "selector"
          };
        });
        if (currentNodeParent.type === "atrule") {
          scopePieces = [].concat(currentNodeParent.params).map(function(param) {
            return {
              value: "@" + currentNodeParent.name + " " + param,
              type: "atrule"
            };
          });
        }
        var branches = (scopePieces.length > 0 ? scopePieces : [1]).map(function() {
          return selectorScopeList.map(function(scopePieces2) {
            return scopePieces2.slice(0);
          });
        });
        scopePieces.forEach(function(scopeObject, index3) {
          branches[index3] = branches[index3].map(function(scopeStringPieces) {
            var descendantPieces = [scopeObject.value];
            if (scopeObject.type === "selector") {
              descendantPieces = generateDescendantPiecesFromSelector(scopeObject.value);
            }
            scopeStringPieces.unshift.apply(scopeStringPieces, descendantPieces);
            return scopeStringPieces;
          });
        });
        selectorScopeList = [];
        branches.forEach(function(branch) {
          selectorScopeList = selectorScopeList.concat(branch);
        });
        currentNodeParent = currentNodeParent.parent;
      }
      return selectorScopeList;
    };
    module2.exports = generateScopeList;
  }
});

// node_modules/escape-string-regexp/index.js
var require_escape_string_regexp = __commonJS({
  "node_modules/escape-string-regexp/index.js"(exports, module2) {
    "use strict";
    var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
    module2.exports = function(str) {
      if (typeof str !== "string") {
        throw new TypeError("Expected a string");
      }
      return str.replace(matchOperatorsRe, "\\$&");
    };
  }
});

// node_modules/postcss-css-variables/lib/is-piece-always-ancestor-selector.js
var require_is_piece_always_ancestor_selector = __commonJS({
  "node_modules/postcss-css-variables/lib/is-piece-always-ancestor-selector.js"(exports, module2) {
    var alwaysAncestorSelector = {
      "*": true,
      ":root": true,
      "html": true
    };
    var isPieceIsAlwaysAncestorSelector = function(piece) {
      return !!alwaysAncestorSelector[piece];
    };
    module2.exports = isPieceIsAlwaysAncestorSelector;
  }
});

// node_modules/postcss-css-variables/lib/generate-direct-descendant-pieces-from-selector.js
var require_generate_direct_descendant_pieces_from_selector = __commonJS({
  "node_modules/postcss-css-variables/lib/generate-direct-descendant-pieces-from-selector.js"(exports, module2) {
    var RE_SELECTOR_DIRECT_DESCENDANT_SPLIT = /(.*?(?:(?:\([^\)]+\)|\[[^\]]+\]|(?!>>|<|\+|~|\s).)+)(?:(?:(?:>(?!>))|(?:\s?>(?!>)\s?))(?!\s+))(?!(?:>>|<|\+|~)[\s]+?))/;
    var generateDirectDescendantPiecesFromSelector = function(selector) {
      return selector.split(RE_SELECTOR_DIRECT_DESCENDANT_SPLIT).filter(function(piece) {
        if (piece.length > 0) {
          return true;
        }
        return false;
      }).map(function(piece) {
        return piece.trim().replace(/\s*?>\s*?/g, "");
      });
    };
    module2.exports = generateDirectDescendantPiecesFromSelector;
  }
});

// node_modules/postcss-css-variables/lib/is-under-scope.js
var require_is_under_scope = __commonJS({
  "node_modules/postcss-css-variables/lib/is-under-scope.js"(exports, module2) {
    var escapeStringRegexp = require_escape_string_regexp();
    var isPieceAlwaysAncestorSelector = require_is_piece_always_ancestor_selector();
    var generateDirectDescendantPiecesFromSelector = require_generate_direct_descendant_pieces_from_selector();
    var RE_AT_RULE_SCOPE_PIECE = /^@.*/;
    var RE_PSEUDO_SELECTOR = /([^\s:]+)((?::|::)[^\s]*?)(\s+|$)/;
    function getScopeMatchResults(nodeScopeList, scopeNodeScopeList) {
      var currentPieceOffset;
      var scopePieceIndex;
      var doesMatchScope = scopeNodeScopeList.some(function(scopeNodeScopePieces) {
        return nodeScopeList.some(function(nodeScopePieces) {
          currentPieceOffset = null;
          var wasEveryPieceFound = true;
          for (scopePieceIndex = 0; scopePieceIndex < scopeNodeScopePieces.length; scopePieceIndex++) {
            var scopePiece = scopeNodeScopePieces[scopePieceIndex];
            var pieceOffset = currentPieceOffset || 0;
            var foundIndex = -1;
            var piecesWeCanMatch = nodeScopePieces.slice(pieceOffset);
            for (var nodeScopePieceIndex = 0; nodeScopePieceIndex < piecesWeCanMatch.length; nodeScopePieceIndex++) {
              var nodeScopePiece = piecesWeCanMatch[nodeScopePieceIndex];
              var overallIndex = pieceOffset + nodeScopePieceIndex;
              if (new RegExp(escapeStringRegexp(scopePiece) + "$").test(nodeScopePiece)) {
                foundIndex = overallIndex;
                break;
              }
              if (isPieceAlwaysAncestorSelector(scopePiece) || isPieceAlwaysAncestorSelector(nodeScopePiece)) {
                foundIndex = overallIndex;
                break;
              }
              var directDescendantPieces = generateDirectDescendantPiecesFromSelector(nodeScopePiece);
              if (directDescendantPieces.length > 1) {
                var ddNodeScopeList = [].concat([directDescendantPieces]);
                var ddScopeList = [].concat([
                  scopeNodeScopePieces.slice(scopePieceIndex).reduce(function(prevScopePieces, scopePiece2) {
                    return prevScopePieces.concat(generateDirectDescendantPiecesFromSelector(scopePiece2));
                  }, [])
                ]);
                var result = getScopeMatchResults(ddNodeScopeList, ddScopeList);
                if (result.doesMatchScope || scopePieceIndex + 1 < scopeNodeScopePieces.length) {
                  foundIndex = overallIndex;
                  scopePieceIndex += result.scopePieceIndex - 1;
                }
                break;
              }
            }
            var isFurther = foundIndex >= pieceOffset;
            currentPieceOffset = foundIndex + 1;
            wasEveryPieceFound = wasEveryPieceFound && isFurther;
            if (!wasEveryPieceFound) {
              break;
            }
          }
          return wasEveryPieceFound;
        });
      });
      return {
        doesMatchScope,
        nodeScopePieceIndex: currentPieceOffset - 1,
        scopePieceIndex
      };
    }
    var stripPseudoSelectorsFromScopeList = function(scopeList) {
      return scopeList.map(function(scopePieces) {
        return scopePieces.map(function(descendantPiece) {
          if (!RE_AT_RULE_SCOPE_PIECE.test(descendantPiece)) {
            return descendantPiece.replace(new RegExp(RE_PSEUDO_SELECTOR.source, "g"), function(whole, baseSelector, pseudo, trailingWhitespace) {
              return baseSelector + trailingWhitespace;
            });
          }
          return descendantPiece;
        });
      });
    };
    var isUnderScope = function(nodeScopeList, scopeNodeScopeList, ignorePseudo) {
      nodeScopeList = stripPseudoSelectorsFromScopeList(nodeScopeList);
      if (ignorePseudo) {
        scopeNodeScopeList = stripPseudoSelectorsFromScopeList(scopeNodeScopeList);
      }
      return getScopeMatchResults(nodeScopeList, scopeNodeScopeList).doesMatchScope;
    };
    isUnderScope.RE_PSEUDO_SELECTOR = RE_PSEUDO_SELECTOR;
    module2.exports = isUnderScope;
  }
});

// node_modules/postcss-css-variables/lib/is-node-under-scope.js
var require_is_node_under_scope = __commonJS({
  "node_modules/postcss-css-variables/lib/is-node-under-scope.js"(exports, module2) {
    var isUnderScope = require_is_under_scope();
    var generateScopeList = require_generate_scope_list();
    var isNodeUnderScope = function(node, scopeNode, ignorePseudo) {
      var nodeScopeList = generateScopeList(node, true);
      var scopeNodeScopeList = generateScopeList(scopeNode, true);
      return isUnderScope(nodeScopeList, scopeNodeScopeList, ignorePseudo);
    };
    module2.exports = isNodeUnderScope;
  }
});

// node_modules/postcss-css-variables/lib/gather-variable-dependencies.js
var require_gather_variable_dependencies = __commonJS({
  "node_modules/postcss-css-variables/lib/gather-variable-dependencies.js"(exports, module2) {
    var gatherVariableDependencies = function(variablesUsed, map, _dependencyVariablesList) {
      _dependencyVariablesList = _dependencyVariablesList || [];
      var hasCircularOrSelfReference = false;
      if (variablesUsed) {
        _dependencyVariablesList = variablesUsed.reduce(function(dependencyVariablesList, variableUsedName) {
          var isVariableInMap = !!map[variableUsedName];
          var doesThisVarHaveCircularOrSelfReference = !isVariableInMap ? false : dependencyVariablesList.some(function(dep) {
            return map[variableUsedName].some(function(mapItem) {
              if (dep === mapItem) {
                return true;
              }
              return false;
            });
          });
          hasCircularOrSelfReference = hasCircularOrSelfReference || doesThisVarHaveCircularOrSelfReference;
          if (isVariableInMap && !hasCircularOrSelfReference) {
            dependencyVariablesList = dependencyVariablesList.concat(map[variableUsedName]);
            (map[variableUsedName] || []).forEach(function(mapItem) {
              var result = gatherVariableDependencies(mapItem.variablesUsed, map, dependencyVariablesList);
              dependencyVariablesList = result.deps;
              hasCircularOrSelfReference = hasCircularOrSelfReference || result.hasCircularOrSelfReference;
            });
          }
          return dependencyVariablesList;
        }, _dependencyVariablesList);
      }
      return {
        deps: _dependencyVariablesList,
        hasCircularOrSelfReference
      };
    };
    module2.exports = gatherVariableDependencies;
  }
});

// node_modules/postcss-css-variables/lib/find-node-ancestor-with-selector.js
var require_find_node_ancestor_with_selector = __commonJS({
  "node_modules/postcss-css-variables/lib/find-node-ancestor-with-selector.js"(exports, module2) {
    var generateScopeList = require_generate_scope_list();
    var findNodeAncestorWithSelector = function(selector, node) {
      var matchingNode;
      var currentNode = node;
      while (currentNode.parent && !matchingNode) {
        var currentNodeScopeList = generateScopeList(currentNode.clone(), true);
        currentNodeScopeList.some(function(scopePieces) {
          return scopePieces.some(function(scopePiece) {
            if (scopePiece === selector) {
              matchingNode = currentNode;
              return true;
            }
            return false;
          });
        });
        currentNode = currentNode.parent;
      }
      return matchingNode;
    };
    module2.exports = findNodeAncestorWithSelector;
  }
});

// node_modules/postcss-css-variables/lib/clone-splice-parent-onto-node-when.js
var require_clone_splice_parent_onto_node_when = __commonJS({
  "node_modules/postcss-css-variables/lib/clone-splice-parent-onto-node-when.js"(exports, module2) {
    var shallowCloneNode = require_shallow_clone_node();
    var cloneSpliceParentOntoNodeWhen = function(node, parent, whenCb) {
      whenCb = whenCb || function() {
        return true;
      };
      var cloneList = [];
      var current = node;
      var isWhenNow = false;
      while (current && !isWhenNow) {
        if (current.type === "decl") {
          cloneList.push(current.clone());
        } else {
          cloneList.push(shallowCloneNode(current));
        }
        isWhenNow = whenCb(current);
        current = current.parent;
      }
      var cloneParentList = [];
      var currentParent = parent;
      while (currentParent) {
        cloneParentList.push(shallowCloneNode(currentParent));
        currentParent = currentParent.parent;
      }
      cloneParentList.forEach(function(parentClone, index3, cloneParentList2) {
        if (index3 + 1 < cloneParentList2.length) {
          parentClone.parent = cloneParentList2[index3 + 1];
        }
      });
      cloneList.forEach(function(clone, index3, cloneList2) {
        if (index3 + 1 < cloneList2.length) {
          clone.parent = cloneList2[index3 + 1];
        } else {
          cloneParentList.slice(-1)[0].parent = current;
          clone.parent = cloneParentList[0];
        }
      });
      return cloneList[0];
    };
    module2.exports = cloneSpliceParentOntoNodeWhen;
  }
});

// node_modules/postcss-css-variables/lib/resolve-value.js
var require_resolve_value = __commonJS({
  "node_modules/postcss-css-variables/lib/resolve-value.js"(exports, module2) {
    var balanced = require_balanced_match();
    var generateScopeList = require_generate_scope_list();
    var isNodeUnderScope = require_is_node_under_scope();
    var gatherVariableDependencies = require_gather_variable_dependencies();
    var findNodeAncestorWithSelector = require_find_node_ancestor_with_selector();
    var cloneSpliceParentOntoNodeWhen = require_clone_splice_parent_onto_node_when();
    var RE_VAR_FUNC = /var\(\s*(--[^,\s)]+)/;
    function toString(value2) {
      return String(value2);
    }
    function balancedVar(value2) {
      var match = balanced("(", ")", value2);
      if (match) {
        if (/(?:^|[^\w-])var$/.test(match.pre)) {
          return {
            pre: match.pre.slice(0, -3),
            body: match.body,
            post: match.post
          };
        } else {
          var bodyMatch = balancedVar(match.body);
          if (bodyMatch) {
            return {
              pre: match.pre + "(" + bodyMatch.pre,
              body: bodyMatch.body,
              post: bodyMatch.post + ")" + match.post
            };
          } else {
            var postMatch = balancedVar(match.post);
            if (postMatch) {
              return {
                pre: match.pre + "(" + match.body + ")" + postMatch.pre,
                body: postMatch.body,
                post: postMatch.post
              };
            }
          }
        }
      }
    }
    var resolveValue2 = function(decl3, map, ignorePseudoScope, _debugIsInternal) {
      var debugIndent = _debugIsInternal ? "	" : "";
      var matchingVarDecl = void 0;
      var resultantValue = toString(decl3.value);
      var warnings = [];
      var variablesUsedInValueMap = {};
      var remainingVariableValue = resultantValue;
      while (matchingVarDecl = balancedVar(remainingVariableValue)) {
        var variableFallbackSplitPieces = matchingVarDecl.body.split(",");
        var variableName = variableFallbackSplitPieces[0].trim();
        variablesUsedInValueMap[variableName] = true;
        remainingVariableValue = (matchingVarDecl.pre || "") + matchingVarDecl.body.replace(variableName, "") + (matchingVarDecl.post || "");
      }
      remainingVariableValue = void 0;
      var variablesUsedInValue = Object.keys(variablesUsedInValueMap);
      var isResultantValueUndefined = false;
      while (matchingVarDecl = balancedVar(resultantValue)) {
        var matchingVarDeclMapItem = void 0;
        var variableFallbackSplitPieces = matchingVarDecl.body.split(",");
        var variableName = variableFallbackSplitPieces[0].trim();
        var fallback = variableFallbackSplitPieces.length > 1 ? variableFallbackSplitPieces.slice(1).join(",").trim() : void 0;
        (map[variableName] || []).forEach(function(varDeclMapItem) {
          var isRoot2 = varDeclMapItem.parent.type === "root" || varDeclMapItem.parent.selectors[0] === ":root";
          var underScope = isNodeUnderScope(decl3.parent, varDeclMapItem.parent);
          var underScsopeIgnorePseudo = isNodeUnderScope(decl3.parent, varDeclMapItem.parent, ignorePseudoScope);
          if (underScsopeIgnorePseudo && (!(matchingVarDeclMapItem || {}).isImportant || varDeclMapItem.isImportant)) {
            matchingVarDeclMapItem = varDeclMapItem;
          }
        });
        var replaceValue = (matchingVarDeclMapItem || {}).calculatedInPlaceValue || function() {
          var fallbackValue = fallback;
          if (fallback) {
            var fallbackDecl = decl3.clone({ parent: decl3.parent, value: fallback });
            fallbackValue = resolveValue2(fallbackDecl, map, false, true).value;
          }
          return fallbackValue;
        }();
        if (matchingVarDeclMapItem !== void 0 && !gatherVariableDependencies(variablesUsedInValue, map).hasCircularOrSelfReference) {
          var varDeclScopeList = generateScopeList(decl3.parent.parent, true);
          var innerMostAtRuleSelector = varDeclScopeList[0].slice(-1)[0];
          var nodeToSpliceParentOnto = findNodeAncestorWithSelector(innerMostAtRuleSelector, matchingVarDeclMapItem.decl.parent);
          var matchingMimicDecl = cloneSpliceParentOntoNodeWhen(matchingVarDeclMapItem.decl, decl3.parent.parent, function(ancestor) {
            return ancestor === nodeToSpliceParentOnto;
          });
          replaceValue = resolveValue2(matchingMimicDecl, map, false, true).value;
        }
        isResultantValueUndefined = replaceValue === void 0;
        if (isResultantValueUndefined) {
          warnings.push(["variable " + variableName + " is undefined and used without a fallback", { node: decl3 }]);
        }
        resultantValue = (matchingVarDecl.pre || "") + replaceValue + (matchingVarDecl.post || "");
      }
      return {
        value: !isResultantValueUndefined ? resultantValue : void 0,
        variablesUsed: variablesUsedInValue,
        warnings
      };
    };
    resolveValue2.RE_VAR_FUNC = RE_VAR_FUNC;
    module2.exports = resolveValue2;
  }
});

// node_modules/postcss-css-variables/lib/resolve-decl.js
var require_resolve_decl = __commonJS({
  "node_modules/postcss-css-variables/lib/resolve-decl.js"(exports, module2) {
    var resolveValue2 = require_resolve_value();
    var generateScopeList = require_generate_scope_list();
    var gatherVariableDependencies = require_gather_variable_dependencies();
    var isUnderScope = require_is_under_scope();
    var isNodeUnderScope = require_is_node_under_scope();
    var shallowCloneNode = require_shallow_clone_node();
    var findNodeAncestorWithSelector = require_find_node_ancestor_with_selector();
    var cloneSpliceParentOntoNodeWhen = require_clone_splice_parent_onto_node_when();
    function eachMapItemDependencyOfDecl(variablesUsedList, map, decl3, cb) {
      variablesUsedList.forEach(function(variableUsedName) {
        gatherVariableDependencies(variablesUsedList, map).deps.forEach(function(mapItem) {
          var mimicDecl;
          if (mapItem.isUnderAtRule) {
            var varDeclScopeList = generateScopeList(mapItem.parent, true);
            var innerMostAtRuleSelector = varDeclScopeList[0].slice(-1)[0];
            var nodeToSpliceParentOnto = findNodeAncestorWithSelector(innerMostAtRuleSelector, decl3.parent);
            var varDeclAtRule = mapItem.parent.parent;
            mimicDecl = cloneSpliceParentOntoNodeWhen(decl3, varDeclAtRule, function(ancestor) {
              return ancestor === nodeToSpliceParentOnto;
            });
          } else if (isUnderScope.RE_PSEUDO_SELECTOR.test(mapItem.parent.selector)) {
            var ruleClone = shallowCloneNode(decl3.parent);
            ruleClone.parent = decl3.parent.parent;
            mimicDecl = decl3.clone();
            ruleClone.append(mimicDecl);
            var lastPseudoSelectorMatches = mapItem.parent.selector.match(new RegExp(isUnderScope.RE_PSEUDO_SELECTOR.source + "$"));
            var lastPseudoSelector = lastPseudoSelectorMatches ? lastPseudoSelectorMatches[2] : "";
            ruleClone.selector += lastPseudoSelector;
          }
          if (mimicDecl && isNodeUnderScope(mimicDecl, mapItem.parent, true)) {
            cb(mimicDecl, mapItem);
          }
        });
      });
    }
    function resolveDecl(decl3, map, shouldPreserve, preserveAtRulesOrder, logResolveValueResult) {
      shouldPreserve = (typeof shouldPreserve === "function" ? shouldPreserve(decl3) : shouldPreserve) || false;
      preserveAtRulesOrder = preserveAtRulesOrder || false;
      var _logResolveValueResult = function(valueResults2) {
        if (logResolveValueResult) {
          logResolveValueResult(valueResults2);
        }
        return valueResults2;
      };
      var valueResults = _logResolveValueResult(resolveValue2(decl3, map));
      var previousAtRuleNode;
      eachMapItemDependencyOfDecl(valueResults.variablesUsed, map, decl3, function(mimicDecl, mapItem) {
        var ruleClone = shallowCloneNode(decl3.parent);
        var declClone = decl3.clone();
        ruleClone.append(declClone);
        let preserveVariable;
        if (typeof shouldPreserve === "function") {
          preserveVariable = shouldPreserve(decl3);
        } else {
          preserveVariable = shouldPreserve;
        }
        if (preserveVariable === true) {
          declClone.cloneAfter();
        }
        declClone.value = _logResolveValueResult(resolveValue2(mimicDecl, map, true)).value;
        if (mapItem.isUnderAtRule) {
          var atRuleNode = shallowCloneNode(mapItem.parent.parent);
          atRuleNode.append(ruleClone);
          var parentAtRuleNode = atRuleNode;
          var currentAtRuleNode = mapItem.parent.parent;
          while (currentAtRuleNode.parent.type === "atrule") {
            var newParentAtRuleNode = shallowCloneNode(currentAtRuleNode.parent);
            newParentAtRuleNode.append(parentAtRuleNode);
            parentAtRuleNode = newParentAtRuleNode;
            currentAtRuleNode = currentAtRuleNode.parent;
          }
          decl3.parent.parent.insertAfter(preserveAtRulesOrder && previousAtRuleNode || decl3.parent, parentAtRuleNode);
          previousAtRuleNode = parentAtRuleNode;
        } else {
          ruleClone.selector = mimicDecl.parent.selector;
          decl3.parent.parent.insertAfter(preserveAtRulesOrder && previousAtRuleNode || decl3.parent, ruleClone);
        }
      });
      if (shouldPreserve === true && decl3.value !== valueResults.value) {
        decl3.cloneAfter();
      }
      if (valueResults.value === void 0) {
        valueResults.value = "undefined";
      }
      decl3.value = valueResults.value;
    }
    module2.exports = resolveDecl;
  }
});

// node_modules/postcss-css-variables/index.js
var require_postcss_css_variables = __commonJS({
  "node_modules/postcss-css-variables/index.js"(exports, module2) {
    var extend = require_extend();
    var shallowCloneNode = require_shallow_clone_node();
    var resolveValue2 = require_resolve_value();
    var resolveDecl = require_resolve_decl();
    var RE_VAR_PROP = /(--(.+))/;
    function eachCssVariableDeclaration(css, cb) {
      css.walkDecls(function(decl3) {
        if (RE_VAR_PROP.test(decl3.prop)) {
          cb(decl3);
        }
      });
    }
    function cleanUpNode(node) {
      var nodeToPossiblyCleanUp = node;
      while (nodeToPossiblyCleanUp && nodeToPossiblyCleanUp.nodes.length <= 0) {
        var nodeToRemove = nodeToPossiblyCleanUp.type !== "root" ? nodeToPossiblyCleanUp : null;
        if (nodeToRemove) {
          nodeToPossiblyCleanUp = nodeToRemove.parent;
          nodeToRemove.remove();
        } else {
          nodeToPossiblyCleanUp = null;
        }
      }
    }
    var defaults3 = {
      preserve: false,
      variables: {},
      preserveInjectedVariables: true,
      preserveAtRulesOrder: false
    };
    module2.exports = (options = {}) => {
      var opts = extend({}, defaults3, options);
      return {
        postcssPlugin: "postcss-css-variables",
        Once(css, { decl: decl3, result, rule: rule3 }) {
          var nodesToRemoveAtEnd = [];
          var injectedDeclsToRemoveAtEnd = [];
          var map = {};
          map = extend(
            map,
            Object.keys(opts.variables).reduce(
              function(prevVariableMap, variableName) {
                var variableEntry = opts.variables[variableName];
                variableName = variableName.slice(0, 2) === "--" ? variableName : "--" + variableName;
                var variableValue = (variableEntry || {}).value || variableEntry;
                var isImportant = (variableEntry || {}).isImportant || false;
                var variableRootRule = rule3({ selector: ":root" });
                css.root().prepend(variableRootRule);
                var varDecl = decl3({
                  prop: variableName,
                  value: variableValue,
                  important: isImportant
                });
                variableRootRule.append(varDecl);
                if (!opts.preserveInjectedVariables) {
                  injectedDeclsToRemoveAtEnd.push(varDecl);
                }
                prevVariableMap[variableName] = (prevVariableMap[variableName] || []).concat({
                  decl: varDecl,
                  prop: variableName,
                  calculatedInPlaceValue: variableValue,
                  isImportant,
                  variablesUsed: [],
                  parent: variableRootRule,
                  isUnderAtRule: false
                });
                return prevVariableMap;
              },
              {}
            )
          );
          var logResolveValueResult = function(valueResult) {
            var warningList = [].concat(valueResult.warnings);
            warningList.forEach(function(warningArgs) {
              warningArgs = [].concat(warningArgs);
              result.warn.apply(result, warningArgs);
            });
            return valueResult;
          };
          eachCssVariableDeclaration(css, function(decl4) {
            var declParentRule = decl4.parent;
            var valueResults = logResolveValueResult(resolveValue2(decl4, map));
            decl4.parent.selectors.forEach(function(selector) {
              var splitOutRule = shallowCloneNode(decl4.parent);
              splitOutRule.selector = selector;
              splitOutRule.parent = decl4.parent.parent;
              var declClone = decl4.clone();
              splitOutRule.append(declClone);
              var prop = decl4.prop;
              map[prop] = (map[prop] || []).concat({
                decl: declClone,
                prop,
                calculatedInPlaceValue: valueResults.value,
                isImportant: decl4.important || false,
                variablesUsed: valueResults.variablesUsed,
                parent: splitOutRule,
                isUnderAtRule: splitOutRule.parent.type === "atrule"
              });
            });
            let preserveDecl;
            if (typeof opts.preserve === "function") {
              preserveDecl = opts.preserve(decl4);
            } else {
              preserveDecl = opts.preserve;
            }
            if (!preserveDecl) {
              decl4.remove();
            } else if (preserveDecl === "computed") {
              decl4.value = valueResults.value;
            }
            if (declParentRule.nodes.length <= 0) {
              nodesToRemoveAtEnd.push(declParentRule);
            }
          });
          var rulesThatHaveDeclarationsWithVariablesList = [];
          css.walk(function(rule4) {
            if (rule4.nodes === void 0)
              return;
            var doesRuleUseVariables = rule4.nodes.some(function(node) {
              if (node.type === "decl") {
                var decl4 = node;
                if (resolveValue2.RE_VAR_FUNC.test(decl4.value) && !RE_VAR_PROP.test(decl4.prop)) {
                  return true;
                }
              }
              return false;
            });
            if (doesRuleUseVariables) {
              rulesThatHaveDeclarationsWithVariablesList.push(rule4);
            }
          });
          rulesThatHaveDeclarationsWithVariablesList.forEach(function(rule4) {
            var rulesToWorkOn = [].concat(rule4);
            if (rule4.type === "rule" && rule4.selectors.length > 1) {
              rulesToWorkOn = rule4.selectors.reverse().map(function(selector) {
                var ruleClone = rule4.cloneAfter();
                ruleClone.selector = selector;
                return ruleClone;
              });
              rule4.remove();
            }
            rulesToWorkOn.forEach(function(ruleToWorkOn) {
              ruleToWorkOn.nodes.slice(0).forEach(function(node) {
                if (node.type === "decl") {
                  var decl4 = node;
                  resolveDecl(
                    decl4,
                    map,
                    opts.preserve,
                    opts.preserveAtRulesOrder,
                    logResolveValueResult
                  );
                }
              });
            });
          });
          nodesToRemoveAtEnd.forEach(cleanUpNode);
          injectedDeclsToRemoveAtEnd.forEach(function(injectedDecl) {
            injectedDecl.remove();
          });
        }
      };
    };
    module2.exports.postcss = true;
  }
});

// node_modules/postcss-js/objectifier.js
var require_objectifier2 = __commonJS({
  "node_modules/postcss-js/objectifier.js"(exports, module2) {
    var camelcase = require_index_es5();
    var UNITLESS = {
      boxFlex: true,
      boxFlexGroup: true,
      columnCount: true,
      flex: true,
      flexGrow: true,
      flexPositive: true,
      flexShrink: true,
      flexNegative: true,
      fontWeight: true,
      lineClamp: true,
      lineHeight: true,
      opacity: true,
      order: true,
      orphans: true,
      tabSize: true,
      widows: true,
      zIndex: true,
      zoom: true,
      fillOpacity: true,
      strokeDashoffset: true,
      strokeOpacity: true,
      strokeWidth: true
    };
    function atRule3(node) {
      if (typeof node.nodes === "undefined") {
        return true;
      } else {
        return process2(node);
      }
    }
    function process2(node) {
      let name;
      let result = {};
      node.each((child) => {
        if (child.type === "atrule") {
          name = "@" + child.name;
          if (child.params)
            name += " " + child.params;
          if (typeof result[name] === "undefined") {
            result[name] = atRule3(child);
          } else if (Array.isArray(result[name])) {
            result[name].push(atRule3(child));
          } else {
            result[name] = [result[name], atRule3(child)];
          }
        } else if (child.type === "rule") {
          let body = process2(child);
          if (result[child.selector]) {
            for (let i in body) {
              result[child.selector][i] = body[i];
            }
          } else {
            result[child.selector] = body;
          }
        } else if (child.type === "decl") {
          if (child.prop[0] === "-" && child.prop[1] === "-") {
            name = child.prop;
          } else {
            name = camelcase(child.prop);
          }
          let value2 = child.value;
          if (!isNaN(child.value) && UNITLESS[name]) {
            value2 = parseFloat(child.value);
          }
          if (child.important)
            value2 += " !important";
          if (typeof result[name] === "undefined") {
            result[name] = value2;
          } else if (Array.isArray(result[name])) {
            result[name].push(value2);
          } else {
            result[name] = [result[name], value2];
          }
        }
      });
      return result;
    }
    module2.exports = process2;
  }
});

// node_modules/postcss-js/parser.js
var require_parser5 = __commonJS({
  "node_modules/postcss-js/parser.js"(exports, module2) {
    var postcss3 = require_postcss2();
    var IMPORTANT = /\s*!important\s*$/i;
    var UNITLESS = {
      "box-flex": true,
      "box-flex-group": true,
      "column-count": true,
      "flex": true,
      "flex-grow": true,
      "flex-positive": true,
      "flex-shrink": true,
      "flex-negative": true,
      "font-weight": true,
      "line-clamp": true,
      "line-height": true,
      "opacity": true,
      "order": true,
      "orphans": true,
      "tab-size": true,
      "widows": true,
      "z-index": true,
      "zoom": true,
      "fill-opacity": true,
      "stroke-dashoffset": true,
      "stroke-opacity": true,
      "stroke-width": true
    };
    function dashify(str) {
      return str.replace(/([A-Z])/g, "-$1").replace(/^ms-/, "-ms-").toLowerCase();
    }
    function decl3(parent, name, value2) {
      if (value2 === false || value2 === null)
        return;
      if (!name.startsWith("--")) {
        name = dashify(name);
      }
      if (typeof value2 === "number") {
        if (value2 === 0 || UNITLESS[name]) {
          value2 = value2.toString();
        } else {
          value2 += "px";
        }
      }
      if (name === "css-float")
        name = "float";
      if (IMPORTANT.test(value2)) {
        value2 = value2.replace(IMPORTANT, "");
        parent.push(postcss3.decl({ prop: name, value: value2, important: true }));
      } else {
        parent.push(postcss3.decl({ prop: name, value: value2 }));
      }
    }
    function atRule3(parent, parts, value2) {
      let node = postcss3.atRule({ name: parts[1], params: parts[3] || "" });
      if (typeof value2 === "object") {
        node.nodes = [];
        parse5(value2, node);
      }
      parent.push(node);
    }
    function parse5(obj, parent) {
      let name, value2, node;
      for (name in obj) {
        value2 = obj[name];
        if (value2 === null || typeof value2 === "undefined") {
          continue;
        } else if (name[0] === "@") {
          let parts = name.match(/@(\S+)(\s+([\W\w]*)\s*)?/);
          if (Array.isArray(value2)) {
            for (let i of value2) {
              atRule3(parent, parts, i);
            }
          } else {
            atRule3(parent, parts, value2);
          }
        } else if (Array.isArray(value2)) {
          for (let i of value2) {
            decl3(parent, name, i);
          }
        } else if (typeof value2 === "object") {
          node = postcss3.rule({ selector: name });
          parse5(value2, node);
          parent.push(node);
        } else {
          decl3(parent, name, value2);
        }
      }
    }
    module2.exports = function(obj) {
      let root3 = postcss3.root();
      parse5(obj, root3);
      return root3;
    };
  }
});

// node_modules/postcss-js/process-result.js
var require_process_result2 = __commonJS({
  "node_modules/postcss-js/process-result.js"(exports, module2) {
    var objectify3 = require_objectifier2();
    module2.exports = function processResult(result) {
      if (console && console.warn) {
        result.warnings().forEach((warn2) => {
          let source = warn2.plugin || "PostCSS";
          console.warn(source + ": " + warn2.text);
        });
      }
      return objectify3(result.root);
    };
  }
});

// node_modules/postcss-js/async.js
var require_async2 = __commonJS({
  "node_modules/postcss-js/async.js"(exports, module2) {
    var postcss3 = require_postcss2();
    var processResult = require_process_result2();
    var parse5 = require_parser5();
    module2.exports = function async3(plugins) {
      let processor = postcss3(plugins);
      return async (input) => {
        let result = await processor.process(input, {
          parser: parse5,
          from: void 0
        });
        return processResult(result);
      };
    };
  }
});

// node_modules/postcss-js/sync.js
var require_sync2 = __commonJS({
  "node_modules/postcss-js/sync.js"(exports, module2) {
    var postcss3 = require_postcss2();
    var processResult = require_process_result2();
    var parse5 = require_parser5();
    module2.exports = function(plugins) {
      let processor = postcss3(plugins);
      return (input) => {
        let result = processor.process(input, { parser: parse5, from: void 0 });
        return processResult(result);
      };
    };
  }
});

// node_modules/postcss-js/index.js
var require_postcss_js2 = __commonJS({
  "node_modules/postcss-js/index.js"(exports, module2) {
    var objectify3 = require_objectifier2();
    var parse5 = require_parser5();
    var async3 = require_async2();
    var sync3 = require_sync2();
    module2.exports = {
      objectify: objectify3,
      parse: parse5,
      async: async3,
      sync: sync3
    };
  }
});

// src/builds/module.ts
var module_exports = {};
__export(module_exports, {
  tailwindToCSS: () => tailwindToCSS,
  twToCSS: () => twToCSS,
  twi: () => twi,
  twj: () => twj
});
module.exports = __toCommonJS(module_exports);

// src/util/format-css.ts
var formatCSS = (css) => ({
  extractCSS(content, nested = false) {
    const propValueRegex = /(?:[\s\r\n]*)?(?<prop>[\w-]+)\s*:\s*(?<value>[^;\r\n]+)/gm;
    let match;
    const props = {};
    while ((match = propValueRegex.exec(content)) !== null) {
      const { prop, value: value2 } = match.groups;
      props[prop] = value2;
    }
    return Object.entries(props).reduce(
      (acc, [prop, value2]) => acc + `${nested ? "	" : ""}${prop}: ${value2}; 
\r`,
      ""
    );
  },
  merge() {
    const blockContentRegex = /(?<=\.)[^{]+\s*\{(?<content>[^{}]*(?:(?<=;)\s*\n\r?[^{}]*)*)\s*\}/gm;
    let matchBlock;
    let blockContent = "";
    while ((matchBlock = blockContentRegex.exec(css)) !== null) {
      const { content } = matchBlock.groups;
      blockContent += content;
    }
    let mergedCSS = this.extractCSS(blockContent);
    const mediaRegex = /(?<media>@media\s*\([^\)]*\))\s*\{(?<content>[^\}]*)\}/gm;
    let matchMedia;
    while ((matchMedia = mediaRegex.exec(css)) !== null) {
      const { media, content } = matchMedia.groups;
      mergedCSS += `
\r${media} {
\r${this.extractCSS(content, true)}}
\r`;
    }
    css = mergedCSS;
    return this;
  },
  removeUndefined() {
    const undefinedPropRegex = /^[^{}]*(?:[.#][a-zA-Z0-9_-]+)[^{]*{[^}]*\b(?:[a-z-]+):\s*undefined\s*;?[^}]*}/gm;
    css = css.replace(undefinedPropRegex, "");
    return this;
  },
  combineMediaQueries() {
    const regex = new RegExp(
      "@media\\s*(?<conditions>\\([^)]+\\))\\s*{(?<content>(?:[^{}]+|{(?:[^{}]+|{[^{}]*})*})+)}",
      "gs"
    );
    const medias = /* @__PURE__ */ new Map();
    const cleanCSS = (cssText) => cssText.replace(regex, (_, conditions, content) => {
      var _a;
      const mediaContent = (_a = medias.get(conditions)) != null ? _a : "";
      medias.set(conditions, mediaContent + cleanCSS(content.trim()));
      cleanCSS(content);
      return "";
    });
    const parts = [];
    parts.push(cleanCSS(css));
    parts.push(...Array.from(medias, ([condition, content]) => `@media${condition}{${content}}`));
    css = parts.join("");
    return this;
  },
  minify() {
    css = css.replace(/\/\*[\s\S]*?\*\//gm, "").replace(/;\s+/gm, ";").replace(/:\s+/gm, ":").replace(/\)\s*{/gm, "){").replace(/\s+\(/gm, "(").replace(/{\s+/gm, "{").replace(/}\s+/gm, "}").replace(/\s*{/gm, "{").replace(/;?\s*}/gm, "}");
    return this;
  },
  fixRGB() {
    const regex = /rgb\(\s*(?<red>\d+)\s*(?<green>\d+)\s*(?<blue>\d+)(?:\s*\/\s*(?<alpha>[\d%.]+))?\s*\)/gm;
    let match;
    while ((match = regex.exec(css)) !== null) {
      const [matchString] = match;
      let { red, green, blue, alpha = 1 } = match.groups;
      css = css.replace(
        matchString,
        `rgb(${red},${green},${blue}${alpha === "1" ? "" : `,${alpha}`})`
      );
    }
    return this;
  },
  removeMediaQueries() {
    css = css.replace(/@media[^\{]+\{[^@]+\}/g, "");
    return this;
  },
  get() {
    return css;
  }
});

// src/stubs/tailwindcss/utils/log.ts
function log() {
}
function dim(input) {
  return input;
}
var log_default = {
  info: log,
  warn: log,
  risk: log
};

// node_modules/tailwindcss/src/lib/normalizeTailwindDirectives.js
function normalizeTailwindDirectives(root3) {
  let tailwindDirectives = /* @__PURE__ */ new Set();
  let layerDirectives = /* @__PURE__ */ new Set();
  let applyDirectives = /* @__PURE__ */ new Set();
  root3.walkAtRules((atRule3) => {
    if (atRule3.name === "apply") {
      applyDirectives.add(atRule3);
    }
    if (atRule3.name === "import") {
      if (atRule3.params === '"tailwindcss/base"' || atRule3.params === "'tailwindcss/base'") {
        atRule3.name = "tailwind";
        atRule3.params = "base";
      } else if (atRule3.params === '"tailwindcss/components"' || atRule3.params === "'tailwindcss/components'") {
        atRule3.name = "tailwind";
        atRule3.params = "components";
      } else if (atRule3.params === '"tailwindcss/utilities"' || atRule3.params === "'tailwindcss/utilities'") {
        atRule3.name = "tailwind";
        atRule3.params = "utilities";
      } else if (atRule3.params === '"tailwindcss/screens"' || atRule3.params === "'tailwindcss/screens'" || atRule3.params === '"tailwindcss/variants"' || atRule3.params === "'tailwindcss/variants'") {
        atRule3.name = "tailwind";
        atRule3.params = "variants";
      }
    }
    if (atRule3.name === "tailwind") {
      if (atRule3.params === "screens") {
        atRule3.params = "variants";
      }
      tailwindDirectives.add(atRule3.params);
    }
    if (["layer", "responsive", "variants"].includes(atRule3.name)) {
      if (["responsive", "variants"].includes(atRule3.name)) {
        log_default.warn(`${atRule3.name}-at-rule-deprecated`, [
          `The \`@${atRule3.name}\` directive has been deprecated in Tailwind CSS v3.0.`,
          `Use \`@layer utilities\` or \`@layer components\` instead.`,
          "https://tailwindcss.com/docs/upgrade-guide#replace-variants-with-layer"
        ]);
      }
      layerDirectives.add(atRule3);
    }
  });
  if (!tailwindDirectives.has("base") || !tailwindDirectives.has("components") || !tailwindDirectives.has("utilities")) {
    for (let rule3 of layerDirectives) {
      if (rule3.name === "layer" && ["base", "components", "utilities"].includes(rule3.params)) {
        if (!tailwindDirectives.has(rule3.params)) {
          throw rule3.error(
            `\`@layer ${rule3.params}\` is used but no matching \`@tailwind ${rule3.params}\` directive is present.`
          );
        }
      } else if (rule3.name === "responsive") {
        if (!tailwindDirectives.has("utilities")) {
          throw rule3.error("`@responsive` is used but `@tailwind utilities` is missing.");
        }
      } else if (rule3.name === "variants") {
        if (!tailwindDirectives.has("utilities")) {
          throw rule3.error("`@variants` is used but `@tailwind utilities` is missing.");
        }
      }
    }
  }
  return { tailwindDirectives, applyDirectives };
}

// node_modules/tailwindcss/src/lib/expandTailwindAtRules.js
init_fs();
var import_quick_lru = __toESM(require_quick_lru());

// node_modules/tailwindcss/package.json
var version = "3.3.3";
var package_default = {
  name: "tailwindcss",
  version,
  description: "A utility-first CSS framework for rapidly building custom user interfaces.",
  license: "MIT",
  main: "lib/index.js",
  types: "types/index.d.ts",
  repository: "https://github.com/tailwindlabs/tailwindcss.git",
  bugs: "https://github.com/tailwindlabs/tailwindcss/issues",
  homepage: "https://tailwindcss.com",
  bin: {
    tailwind: "lib/cli.js",
    tailwindcss: "lib/cli.js"
  },
  tailwindcss: {
    engine: "stable"
  },
  scripts: {
    prebuild: "npm run generate && rimraf lib",
    build: `swc src --out-dir lib --copy-files --config jsc.transform.optimizer.globals.vars.__OXIDE__='"false"'`,
    postbuild: "esbuild lib/cli-peer-dependencies.js --bundle --platform=node --outfile=peers/index.js --define:process.env.CSS_TRANSFORMER_WASM=false",
    "rebuild-fixtures": "npm run build && node -r @swc/register scripts/rebuildFixtures.js",
    style: "eslint .",
    pretest: "npm run generate",
    test: "jest",
    "test:integrations": "npm run test --prefix ./integrations",
    "install:integrations": "node scripts/install-integrations.js",
    "generate:plugin-list": "node -r @swc/register scripts/create-plugin-list.js",
    "generate:types": "node -r @swc/register scripts/generate-types.js",
    generate: "npm run generate:plugin-list && npm run generate:types",
    "release-channel": "node ./scripts/release-channel.js",
    "release-notes": "node ./scripts/release-notes.js",
    prepublishOnly: "npm install --force && npm run build"
  },
  files: [
    "src/*",
    "cli/*",
    "lib/*",
    "peers/*",
    "scripts/*.js",
    "stubs/*",
    "nesting/*",
    "types/**/*",
    "*.d.ts",
    "*.css",
    "*.js"
  ],
  devDependencies: {
    "@swc/cli": "^0.1.62",
    "@swc/core": "^1.3.55",
    "@swc/jest": "^0.2.26",
    "@swc/register": "^0.1.10",
    autoprefixer: "^10.4.14",
    browserslist: "^4.21.5",
    concurrently: "^8.0.1",
    cssnano: "^6.0.0",
    esbuild: "^0.17.18",
    eslint: "^8.39.0",
    "eslint-config-prettier": "^8.8.0",
    "eslint-plugin-prettier": "^4.2.1",
    jest: "^29.5.0",
    "jest-diff": "^29.5.0",
    lightningcss: "1.18.0",
    prettier: "^2.8.8",
    rimraf: "^5.0.0",
    "source-map-js": "^1.0.2",
    turbo: "^1.9.3"
  },
  dependencies: {
    "@alloc/quick-lru": "^5.2.0",
    arg: "^5.0.2",
    chokidar: "^3.5.3",
    didyoumean: "^1.2.2",
    dlv: "^1.1.3",
    "fast-glob": "^3.2.12",
    "glob-parent": "^6.0.2",
    "is-glob": "^4.0.3",
    jiti: "^1.18.2",
    lilconfig: "^2.1.0",
    micromatch: "^4.0.5",
    "normalize-path": "^3.0.0",
    "object-hash": "^3.0.0",
    picocolors: "^1.0.0",
    postcss: "^8.4.23",
    "postcss-import": "^15.1.0",
    "postcss-js": "^4.0.1",
    "postcss-load-config": "^4.0.1",
    "postcss-nested": "^6.0.1",
    "postcss-selector-parser": "^6.0.11",
    resolve: "^1.22.2",
    sucrase: "^3.32.0"
  },
  browserslist: [
    "> 1%",
    "not edge <= 18",
    "not ie 11",
    "not op_mini all"
  ],
  jest: {
    testTimeout: 3e4,
    setupFilesAfterEnv: [
      "<rootDir>/jest/customMatchers.js"
    ],
    testPathIgnorePatterns: [
      "/node_modules/",
      "/integrations/",
      "/standalone-cli/",
      "\\.test\\.skip\\.js$"
    ],
    transformIgnorePatterns: [
      "node_modules/(?!lightningcss)"
    ],
    transform: {
      "\\.js$": "@swc/jest",
      "\\.ts$": "@swc/jest"
    }
  },
  engines: {
    node: ">=14.0.0"
  }
};

// node_modules/tailwindcss/src/lib/sharedState.js
var env = typeof process !== "undefined" ? {
  NODE_ENV: "development",
  DEBUG: resolveDebug(void 0),
  ENGINE: package_default.tailwindcss.engine
} : {
  NODE_ENV: "production",
  DEBUG: false,
  ENGINE: package_default.tailwindcss.engine
};
var contextSourcesMap = /* @__PURE__ */ new Map();
var NOT_ON_DEMAND = new String("*");
var NONE = Symbol("__NONE__");
function resolveDebug(debug) {
  if (debug === void 0) {
    return false;
  }
  if (debug === "true" || debug === "1") {
    return true;
  }
  if (debug === "false" || debug === "0") {
    return false;
  }
  if (debug === "*") {
    return true;
  }
  let debuggers = debug.split(",").map((d) => d.split(":")[0]);
  if (debuggers.includes("-tailwindcss")) {
    return false;
  }
  if (debuggers.includes("tailwindcss")) {
    return true;
  }
  return false;
}

// node_modules/tailwindcss/node_modules/postcss/lib/postcss.mjs
var import_postcss = __toESM(require_postcss(), 1);
var postcss_default = import_postcss.default;
var stringify = import_postcss.default.stringify;
var fromJSON = import_postcss.default.fromJSON;
var plugin = import_postcss.default.plugin;
var parse = import_postcss.default.parse;
var list = import_postcss.default.list;
var document = import_postcss.default.document;
var comment = import_postcss.default.comment;
var atRule = import_postcss.default.atRule;
var rule = import_postcss.default.rule;
var decl = import_postcss.default.decl;
var root = import_postcss.default.root;
var CssSyntaxError = import_postcss.default.CssSyntaxError;
var Declaration = import_postcss.default.Declaration;
var Container = import_postcss.default.Container;
var Processor = import_postcss.default.Processor;
var Document = import_postcss.default.Document;
var Comment = import_postcss.default.Comment;
var Warning = import_postcss.default.Warning;
var AtRule = import_postcss.default.AtRule;
var Result = import_postcss.default.Result;
var Input = import_postcss.default.Input;
var Rule = import_postcss.default.Rule;
var Root = import_postcss.default.Root;
var Node = import_postcss.default.Node;

// node_modules/tailwindcss/src/lib/generateRules.js
var import_postcss_selector_parser6 = __toESM(require_dist());

// node_modules/tailwindcss/src/util/parseObjectStyles.js
var import_postcss_nested = __toESM(require_postcss_nested());

// node_modules/tailwindcss/node_modules/postcss-js/index.mjs
var import_index = __toESM(require_postcss_js(), 1);
var postcss_js_default = import_index.default;
var objectify = import_index.default.objectify;
var parse2 = import_index.default.parse;
var async = import_index.default.async;
var sync = import_index.default.sync;

// node_modules/tailwindcss/src/util/parseObjectStyles.js
function parseObjectStyles(styles) {
  if (!Array.isArray(styles)) {
    return parseObjectStyles([styles]);
  }
  return styles.flatMap((style) => {
    return postcss_default([
      (0, import_postcss_nested.default)({
        bubble: ["screen"]
      })
    ]).process(style, {
      parser: postcss_js_default
    }).root.nodes;
  });
}

// node_modules/tailwindcss/src/util/isPlainObject.js
function isPlainObject(value2) {
  if (Object.prototype.toString.call(value2) !== "[object Object]") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value2);
  return prototype === null || prototype === Object.prototype;
}

// node_modules/tailwindcss/src/util/prefixSelector.js
var import_postcss_selector_parser = __toESM(require_dist());
function prefixSelector_default(prefix3, selector, prependNegative = false) {
  if (prefix3 === "") {
    return selector;
  }
  let ast = typeof selector === "string" ? (0, import_postcss_selector_parser.default)().astSync(selector) : selector;
  ast.walkClasses((classSelector) => {
    let baseClass = classSelector.value;
    let shouldPlaceNegativeBeforePrefix = prependNegative && baseClass.startsWith("-");
    classSelector.value = shouldPlaceNegativeBeforePrefix ? `-${prefix3}${baseClass.slice(1)}` : `${prefix3}${baseClass}`;
  });
  return typeof selector === "string" ? ast.toString() : ast;
}

// node_modules/tailwindcss/src/util/escapeCommas.js
function escapeCommas(className) {
  return className.replace(/\\,/g, "\\2c ");
}

// node_modules/tailwindcss/src/util/colorNames.js
var colorNames_default = {
  aliceblue: [240, 248, 255],
  antiquewhite: [250, 235, 215],
  aqua: [0, 255, 255],
  aquamarine: [127, 255, 212],
  azure: [240, 255, 255],
  beige: [245, 245, 220],
  bisque: [255, 228, 196],
  black: [0, 0, 0],
  blanchedalmond: [255, 235, 205],
  blue: [0, 0, 255],
  blueviolet: [138, 43, 226],
  brown: [165, 42, 42],
  burlywood: [222, 184, 135],
  cadetblue: [95, 158, 160],
  chartreuse: [127, 255, 0],
  chocolate: [210, 105, 30],
  coral: [255, 127, 80],
  cornflowerblue: [100, 149, 237],
  cornsilk: [255, 248, 220],
  crimson: [220, 20, 60],
  cyan: [0, 255, 255],
  darkblue: [0, 0, 139],
  darkcyan: [0, 139, 139],
  darkgoldenrod: [184, 134, 11],
  darkgray: [169, 169, 169],
  darkgreen: [0, 100, 0],
  darkgrey: [169, 169, 169],
  darkkhaki: [189, 183, 107],
  darkmagenta: [139, 0, 139],
  darkolivegreen: [85, 107, 47],
  darkorange: [255, 140, 0],
  darkorchid: [153, 50, 204],
  darkred: [139, 0, 0],
  darksalmon: [233, 150, 122],
  darkseagreen: [143, 188, 143],
  darkslateblue: [72, 61, 139],
  darkslategray: [47, 79, 79],
  darkslategrey: [47, 79, 79],
  darkturquoise: [0, 206, 209],
  darkviolet: [148, 0, 211],
  deeppink: [255, 20, 147],
  deepskyblue: [0, 191, 255],
  dimgray: [105, 105, 105],
  dimgrey: [105, 105, 105],
  dodgerblue: [30, 144, 255],
  firebrick: [178, 34, 34],
  floralwhite: [255, 250, 240],
  forestgreen: [34, 139, 34],
  fuchsia: [255, 0, 255],
  gainsboro: [220, 220, 220],
  ghostwhite: [248, 248, 255],
  gold: [255, 215, 0],
  goldenrod: [218, 165, 32],
  gray: [128, 128, 128],
  green: [0, 128, 0],
  greenyellow: [173, 255, 47],
  grey: [128, 128, 128],
  honeydew: [240, 255, 240],
  hotpink: [255, 105, 180],
  indianred: [205, 92, 92],
  indigo: [75, 0, 130],
  ivory: [255, 255, 240],
  khaki: [240, 230, 140],
  lavender: [230, 230, 250],
  lavenderblush: [255, 240, 245],
  lawngreen: [124, 252, 0],
  lemonchiffon: [255, 250, 205],
  lightblue: [173, 216, 230],
  lightcoral: [240, 128, 128],
  lightcyan: [224, 255, 255],
  lightgoldenrodyellow: [250, 250, 210],
  lightgray: [211, 211, 211],
  lightgreen: [144, 238, 144],
  lightgrey: [211, 211, 211],
  lightpink: [255, 182, 193],
  lightsalmon: [255, 160, 122],
  lightseagreen: [32, 178, 170],
  lightskyblue: [135, 206, 250],
  lightslategray: [119, 136, 153],
  lightslategrey: [119, 136, 153],
  lightsteelblue: [176, 196, 222],
  lightyellow: [255, 255, 224],
  lime: [0, 255, 0],
  limegreen: [50, 205, 50],
  linen: [250, 240, 230],
  magenta: [255, 0, 255],
  maroon: [128, 0, 0],
  mediumaquamarine: [102, 205, 170],
  mediumblue: [0, 0, 205],
  mediumorchid: [186, 85, 211],
  mediumpurple: [147, 112, 219],
  mediumseagreen: [60, 179, 113],
  mediumslateblue: [123, 104, 238],
  mediumspringgreen: [0, 250, 154],
  mediumturquoise: [72, 209, 204],
  mediumvioletred: [199, 21, 133],
  midnightblue: [25, 25, 112],
  mintcream: [245, 255, 250],
  mistyrose: [255, 228, 225],
  moccasin: [255, 228, 181],
  navajowhite: [255, 222, 173],
  navy: [0, 0, 128],
  oldlace: [253, 245, 230],
  olive: [128, 128, 0],
  olivedrab: [107, 142, 35],
  orange: [255, 165, 0],
  orangered: [255, 69, 0],
  orchid: [218, 112, 214],
  palegoldenrod: [238, 232, 170],
  palegreen: [152, 251, 152],
  paleturquoise: [175, 238, 238],
  palevioletred: [219, 112, 147],
  papayawhip: [255, 239, 213],
  peachpuff: [255, 218, 185],
  peru: [205, 133, 63],
  pink: [255, 192, 203],
  plum: [221, 160, 221],
  powderblue: [176, 224, 230],
  purple: [128, 0, 128],
  rebeccapurple: [102, 51, 153],
  red: [255, 0, 0],
  rosybrown: [188, 143, 143],
  royalblue: [65, 105, 225],
  saddlebrown: [139, 69, 19],
  salmon: [250, 128, 114],
  sandybrown: [244, 164, 96],
  seagreen: [46, 139, 87],
  seashell: [255, 245, 238],
  sienna: [160, 82, 45],
  silver: [192, 192, 192],
  skyblue: [135, 206, 235],
  slateblue: [106, 90, 205],
  slategray: [112, 128, 144],
  slategrey: [112, 128, 144],
  snow: [255, 250, 250],
  springgreen: [0, 255, 127],
  steelblue: [70, 130, 180],
  tan: [210, 180, 140],
  teal: [0, 128, 128],
  thistle: [216, 191, 216],
  tomato: [255, 99, 71],
  turquoise: [64, 224, 208],
  violet: [238, 130, 238],
  wheat: [245, 222, 179],
  white: [255, 255, 255],
  whitesmoke: [245, 245, 245],
  yellow: [255, 255, 0],
  yellowgreen: [154, 205, 50]
};

// node_modules/tailwindcss/src/util/color.js
var HEX = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i;
var SHORT_HEX = /^#([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i;
var VALUE = /(?:\d+|\d*\.\d+)%?/;
var SEP = /(?:\s*,\s*|\s+)/;
var ALPHA_SEP = /\s*[,/]\s*/;
var CUSTOM_PROPERTY = /var\(--(?:[^ )]*?)\)/;
var RGB = new RegExp(
  `^(rgba?)\\(\\s*(${VALUE.source}|${CUSTOM_PROPERTY.source})(?:${SEP.source}(${VALUE.source}|${CUSTOM_PROPERTY.source}))?(?:${SEP.source}(${VALUE.source}|${CUSTOM_PROPERTY.source}))?(?:${ALPHA_SEP.source}(${VALUE.source}|${CUSTOM_PROPERTY.source}))?\\s*\\)$`
);
var HSL = new RegExp(
  `^(hsla?)\\(\\s*((?:${VALUE.source})(?:deg|rad|grad|turn)?|${CUSTOM_PROPERTY.source})(?:${SEP.source}(${VALUE.source}|${CUSTOM_PROPERTY.source}))?(?:${SEP.source}(${VALUE.source}|${CUSTOM_PROPERTY.source}))?(?:${ALPHA_SEP.source}(${VALUE.source}|${CUSTOM_PROPERTY.source}))?\\s*\\)$`
);
function parseColor(value2, { loose = false } = {}) {
  var _a, _b, _c;
  if (typeof value2 !== "string") {
    return null;
  }
  value2 = value2.trim();
  if (value2 === "transparent") {
    return { mode: "rgb", color: ["0", "0", "0"], alpha: "0" };
  }
  if (value2 in colorNames_default) {
    return { mode: "rgb", color: colorNames_default[value2].map((v) => v.toString()) };
  }
  let hex = value2.replace(SHORT_HEX, (_, r, g, b, a) => ["#", r, r, g, g, b, b, a ? a + a : ""].join("")).match(HEX);
  if (hex !== null) {
    return {
      mode: "rgb",
      color: [parseInt(hex[1], 16), parseInt(hex[2], 16), parseInt(hex[3], 16)].map(
        (v) => v.toString()
      ),
      alpha: hex[4] ? (parseInt(hex[4], 16) / 255).toString() : void 0
    };
  }
  let match = (_a = value2.match(RGB)) != null ? _a : value2.match(HSL);
  if (match === null) {
    return null;
  }
  let color2 = [match[2], match[3], match[4]].filter(Boolean).map((v) => v.toString());
  if (color2.length === 2 && color2[0].startsWith("var(")) {
    return {
      mode: match[1],
      color: [color2[0]],
      alpha: color2[1]
    };
  }
  if (!loose && color2.length !== 3) {
    return null;
  }
  if (color2.length < 3 && !color2.some((part) => /^var\(.*?\)$/.test(part))) {
    return null;
  }
  return {
    mode: match[1],
    color: color2,
    alpha: (_c = (_b = match[5]) == null ? void 0 : _b.toString) == null ? void 0 : _c.call(_b)
  };
}
function formatColor({ mode, color: color2, alpha }) {
  let hasAlpha = alpha !== void 0;
  if (mode === "rgba" || mode === "hsla") {
    return `${mode}(${color2.join(", ")}${hasAlpha ? `, ${alpha}` : ""})`;
  }
  return `${mode}(${color2.join(" ")}${hasAlpha ? ` / ${alpha}` : ""})`;
}

// node_modules/tailwindcss/src/util/withAlphaVariable.js
function withAlphaValue(color2, alphaValue, defaultValue) {
  if (typeof color2 === "function") {
    return color2({ opacityValue: alphaValue });
  }
  let parsed = parseColor(color2, { loose: true });
  if (parsed === null) {
    return defaultValue;
  }
  return formatColor({ ...parsed, alpha: alphaValue });
}
function withAlphaVariable({ color: color2, property, variable }) {
  let properties = [].concat(property);
  if (typeof color2 === "function") {
    return {
      [variable]: "1",
      ...Object.fromEntries(
        properties.map((p) => {
          return [p, color2({ opacityVariable: variable, opacityValue: `var(${variable})` })];
        })
      )
    };
  }
  const parsed = parseColor(color2);
  if (parsed === null) {
    return Object.fromEntries(properties.map((p) => [p, color2]));
  }
  if (parsed.alpha !== void 0) {
    return Object.fromEntries(properties.map((p) => [p, color2]));
  }
  return {
    [variable]: "1",
    ...Object.fromEntries(
      properties.map((p) => {
        return [p, formatColor({ ...parsed, alpha: `var(${variable})` })];
      })
    )
  };
}

// node_modules/tailwindcss/src/util/splitAtTopLevelOnly.js
function splitAtTopLevelOnly(input, separator) {
  let stack = [];
  let parts = [];
  let lastPos = 0;
  let isEscaped = false;
  for (let idx = 0; idx < input.length; idx++) {
    let char = input[idx];
    if (stack.length === 0 && char === separator[0] && !isEscaped) {
      if (separator.length === 1 || input.slice(idx, idx + separator.length) === separator) {
        parts.push(input.slice(lastPos, idx));
        lastPos = idx + separator.length;
      }
    }
    if (isEscaped) {
      isEscaped = false;
    } else if (char === "\\") {
      isEscaped = true;
    }
    if (char === "(" || char === "[" || char === "{") {
      stack.push(char);
    } else if (char === ")" && stack[stack.length - 1] === "(" || char === "]" && stack[stack.length - 1] === "[" || char === "}" && stack[stack.length - 1] === "{") {
      stack.pop();
    }
  }
  parts.push(input.slice(lastPos));
  return parts;
}

// node_modules/tailwindcss/src/util/parseBoxShadowValue.js
var KEYWORDS = /* @__PURE__ */ new Set(["inset", "inherit", "initial", "revert", "unset"]);
var SPACE = /\ +(?![^(]*\))/g;
var LENGTH = /^-?(\d+|\.\d+)(.*?)$/g;
function parseBoxShadowValue(input) {
  let shadows = splitAtTopLevelOnly(input, ",");
  return shadows.map((shadow2) => {
    let value2 = shadow2.trim();
    let result = { raw: value2 };
    let parts = value2.split(SPACE);
    let seen = /* @__PURE__ */ new Set();
    for (let part of parts) {
      LENGTH.lastIndex = 0;
      if (!seen.has("KEYWORD") && KEYWORDS.has(part)) {
        result.keyword = part;
        seen.add("KEYWORD");
      } else if (LENGTH.test(part)) {
        if (!seen.has("X")) {
          result.x = part;
          seen.add("X");
        } else if (!seen.has("Y")) {
          result.y = part;
          seen.add("Y");
        } else if (!seen.has("BLUR")) {
          result.blur = part;
          seen.add("BLUR");
        } else if (!seen.has("SPREAD")) {
          result.spread = part;
          seen.add("SPREAD");
        }
      } else {
        if (!result.color) {
          result.color = part;
        } else {
          if (!result.unknown)
            result.unknown = [];
          result.unknown.push(part);
        }
      }
    }
    result.valid = result.x !== void 0 && result.y !== void 0;
    return result;
  });
}
function formatBoxShadowValue(shadows) {
  return shadows.map((shadow2) => {
    if (!shadow2.valid) {
      return shadow2.raw;
    }
    return [shadow2.keyword, shadow2.x, shadow2.y, shadow2.blur, shadow2.spread, shadow2.color].filter(Boolean).join(" ");
  }).join(", ");
}

// node_modules/tailwindcss/src/util/dataTypes.js
var cssFunctions = ["min", "max", "clamp", "calc"];
function isCSSFunction(value2) {
  return cssFunctions.some((fn) => new RegExp(`^${fn}\\(.*\\)`).test(value2));
}
var placeholder = "--tw-placeholder";
var placeholderRe = new RegExp(placeholder, "g");
function normalize(value2, isRoot2 = true) {
  if (value2.startsWith("--")) {
    return `var(${value2})`;
  }
  if (value2.includes("url(")) {
    return value2.split(/(url\(.*?\))/g).filter(Boolean).map((part) => {
      if (/^url\(.*?\)$/.test(part)) {
        return part;
      }
      return normalize(part, false);
    }).join("");
  }
  value2 = value2.replace(
    /([^\\])_+/g,
    (fullMatch, characterBefore) => characterBefore + " ".repeat(fullMatch.length - 1)
  ).replace(/^_/g, " ").replace(/\\_/g, "_");
  if (isRoot2) {
    value2 = value2.trim();
  }
  value2 = normalizeMathOperatorSpacing(value2);
  return value2;
}
function normalizeMathOperatorSpacing(value2) {
  return value2.replace(/(calc|min|max|clamp)\(.+\)/g, (match) => {
    let vars = [];
    return match.replace(/var\((--.+?)[,)]/g, (match2, g1) => {
      vars.push(g1);
      return match2.replace(g1, placeholder);
    }).replace(/(-?\d*\.?\d(?!\b-\d.+[,)](?![^+\-/*])\D)(?:%|[a-z]+)?|\))([+\-/*])/g, "$1 $2 ").replace(placeholderRe, () => vars.shift());
  });
}
function url(value2) {
  return value2.startsWith("url(");
}
function number(value2) {
  return !isNaN(Number(value2)) || isCSSFunction(value2);
}
function percentage(value2) {
  return value2.endsWith("%") && number(value2.slice(0, -1)) || isCSSFunction(value2);
}
var lengthUnits = [
  "cm",
  "mm",
  "Q",
  "in",
  "pc",
  "pt",
  "px",
  "em",
  "ex",
  "ch",
  "rem",
  "lh",
  "rlh",
  "vw",
  "vh",
  "vmin",
  "vmax",
  "vb",
  "vi",
  "svw",
  "svh",
  "lvw",
  "lvh",
  "dvw",
  "dvh",
  "cqw",
  "cqh",
  "cqi",
  "cqb",
  "cqmin",
  "cqmax"
];
var lengthUnitsPattern = `(?:${lengthUnits.join("|")})`;
function length(value2) {
  return value2 === "0" || new RegExp(`^[+-]?[0-9]*.?[0-9]+(?:[eE][+-]?[0-9]+)?${lengthUnitsPattern}$`).test(value2) || isCSSFunction(value2);
}
var lineWidths = /* @__PURE__ */ new Set(["thin", "medium", "thick"]);
function lineWidth(value2) {
  return lineWidths.has(value2);
}
function shadow(value2) {
  let parsedShadows = parseBoxShadowValue(normalize(value2));
  for (let parsedShadow of parsedShadows) {
    if (!parsedShadow.valid) {
      return false;
    }
  }
  return true;
}
function color(value2) {
  let colors = 0;
  let result = splitAtTopLevelOnly(value2, "_").every((part) => {
    part = normalize(part);
    if (part.startsWith("var("))
      return true;
    if (parseColor(part, { loose: true }) !== null)
      return colors++, true;
    return false;
  });
  if (!result)
    return false;
  return colors > 0;
}
function image(value2) {
  let images = 0;
  let result = splitAtTopLevelOnly(value2, ",").every((part) => {
    part = normalize(part);
    if (part.startsWith("var("))
      return true;
    if (url(part) || gradient(part) || ["element(", "image(", "cross-fade(", "image-set("].some((fn) => part.startsWith(fn))) {
      images++;
      return true;
    }
    return false;
  });
  if (!result)
    return false;
  return images > 0;
}
var gradientTypes = /* @__PURE__ */ new Set([
  "conic-gradient",
  "linear-gradient",
  "radial-gradient",
  "repeating-conic-gradient",
  "repeating-linear-gradient",
  "repeating-radial-gradient"
]);
function gradient(value2) {
  value2 = normalize(value2);
  for (let type of gradientTypes) {
    if (value2.startsWith(`${type}(`)) {
      return true;
    }
  }
  return false;
}
var validPositions = /* @__PURE__ */ new Set(["center", "top", "right", "bottom", "left"]);
function position(value2) {
  let positions = 0;
  let result = splitAtTopLevelOnly(value2, "_").every((part) => {
    part = normalize(part);
    if (part.startsWith("var("))
      return true;
    if (validPositions.has(part) || length(part) || percentage(part)) {
      positions++;
      return true;
    }
    return false;
  });
  if (!result)
    return false;
  return positions > 0;
}
function familyName(value2) {
  let fonts = 0;
  let result = splitAtTopLevelOnly(value2, ",").every((part) => {
    part = normalize(part);
    if (part.startsWith("var("))
      return true;
    if (part.includes(" ")) {
      if (!/(['"])([^"']+)\1/g.test(part)) {
        return false;
      }
    }
    if (/^\d/g.test(part)) {
      return false;
    }
    fonts++;
    return true;
  });
  if (!result)
    return false;
  return fonts > 0;
}
var genericNames = /* @__PURE__ */ new Set([
  "serif",
  "sans-serif",
  "monospace",
  "cursive",
  "fantasy",
  "system-ui",
  "ui-serif",
  "ui-sans-serif",
  "ui-monospace",
  "ui-rounded",
  "math",
  "emoji",
  "fangsong"
]);
function genericName(value2) {
  return genericNames.has(value2);
}
var absoluteSizes = /* @__PURE__ */ new Set([
  "xx-small",
  "x-small",
  "small",
  "medium",
  "large",
  "x-large",
  "x-large",
  "xxx-large"
]);
function absoluteSize(value2) {
  return absoluteSizes.has(value2);
}
var relativeSizes = /* @__PURE__ */ new Set(["larger", "smaller"]);
function relativeSize(value2) {
  return relativeSizes.has(value2);
}

// node_modules/tailwindcss/src/util/negateValue.js
function negateValue(value2) {
  value2 = `${value2}`;
  if (value2 === "0") {
    return "0";
  }
  if (/^[+-]?(\d+|\d*\.\d+)(e[+-]?\d+)?(%|\w+)?$/.test(value2)) {
    return value2.replace(/^[+-]?/, (sign) => sign === "-" ? "" : "-");
  }
  let numericFunctions = ["var", "calc", "min", "max", "clamp"];
  for (const fn of numericFunctions) {
    if (value2.includes(`${fn}(`)) {
      return `calc(${value2} * -1)`;
    }
  }
}

// node_modules/tailwindcss/src/util/validateFormalSyntax.js
function backgroundSize(value2) {
  let keywordValues = ["cover", "contain"];
  return splitAtTopLevelOnly(value2, ",").every((part) => {
    let sizes = splitAtTopLevelOnly(part, "_").filter(Boolean);
    if (sizes.length === 1 && keywordValues.includes(sizes[0]))
      return true;
    if (sizes.length !== 1 && sizes.length !== 2)
      return false;
    return sizes.every((size) => length(size) || percentage(size) || size === "auto");
  });
}

// node_modules/tailwindcss/src/featureFlags.js
init_picocolors();
var defaults = {
  optimizeUniversalDefaults: false,
  generalizedModifiers: true,
  get disableColorOpacityUtilitiesByDefault() {
    return void 0;
  },
  get relativeContentPathsByDefault() {
    return void 0;
  }
};
var featureFlags = {
  future: [
    "hoverOnlyWhenSupported",
    "respectDefaultRingColorOpacity",
    "disableColorOpacityUtilitiesByDefault",
    "relativeContentPathsByDefault"
  ],
  experimental: [
    "optimizeUniversalDefaults",
    "generalizedModifiers"
  ]
};
function flagEnabled(config, flag) {
  var _a, _b, _c, _d, _e, _f;
  if (featureFlags.future.includes(flag)) {
    return config.future === "all" || ((_c = (_b = (_a = config == null ? void 0 : config.future) == null ? void 0 : _a[flag]) != null ? _b : defaults[flag]) != null ? _c : false);
  }
  if (featureFlags.experimental.includes(flag)) {
    return config.experimental === "all" || ((_f = (_e = (_d = config == null ? void 0 : config.experimental) == null ? void 0 : _d[flag]) != null ? _e : defaults[flag]) != null ? _f : false);
  }
  return false;
}
function experimentalFlagsEnabled(config) {
  var _a;
  if (config.experimental === "all") {
    return featureFlags.experimental;
  }
  return Object.keys((_a = config == null ? void 0 : config.experimental) != null ? _a : {}).filter(
    (flag) => featureFlags.experimental.includes(flag) && config.experimental[flag]
  );
}
function issueFlagNotices(config) {
  if (1 !== void 0) {
    return;
  }
  if (experimentalFlagsEnabled(config).length > 0) {
    let changes = experimentalFlagsEnabled(config).map((s) => picocolors_default.yellow(s)).join(", ");
    log_default.warn("experimental-flags-enabled", [
      `You have enabled experimental features: ${changes}`,
      "Experimental features in Tailwind CSS are not covered by semver, may introduce breaking changes, and can change at any time."
    ]);
  }
}

// node_modules/tailwindcss/src/util/pluginUtils.js
function updateAllClasses(selectors, updateClass) {
  selectors.walkClasses((sel) => {
    sel.value = updateClass(sel.value);
    if (sel.raws && sel.raws.value) {
      sel.raws.value = escapeCommas(sel.raws.value);
    }
  });
}
function resolveArbitraryValue(modifier, validate) {
  if (!isArbitraryValue(modifier)) {
    return void 0;
  }
  let value2 = modifier.slice(1, -1);
  if (!validate(value2)) {
    return void 0;
  }
  return normalize(value2);
}
function asNegativeValue(modifier, lookup = {}, validate) {
  let positiveValue = lookup[modifier];
  if (positiveValue !== void 0) {
    return negateValue(positiveValue);
  }
  if (isArbitraryValue(modifier)) {
    let resolved = resolveArbitraryValue(modifier, validate);
    if (resolved === void 0) {
      return void 0;
    }
    return negateValue(resolved);
  }
}
function asValue(modifier, options = {}, { validate = () => true } = {}) {
  var _a;
  let value2 = (_a = options.values) == null ? void 0 : _a[modifier];
  if (value2 !== void 0) {
    return value2;
  }
  if (options.supportsNegativeValues && modifier.startsWith("-")) {
    return asNegativeValue(modifier.slice(1), options.values, validate);
  }
  return resolveArbitraryValue(modifier, validate);
}
function isArbitraryValue(input) {
  return input.startsWith("[") && input.endsWith("]");
}
function splitUtilityModifier(modifier) {
  let slashIdx = modifier.lastIndexOf("/");
  if (slashIdx === -1 || slashIdx === modifier.length - 1) {
    return [modifier, void 0];
  }
  let arbitrary = isArbitraryValue(modifier);
  if (arbitrary && !modifier.includes("]/[")) {
    return [modifier, void 0];
  }
  return [modifier.slice(0, slashIdx), modifier.slice(slashIdx + 1)];
}
function parseColorFormat(value2) {
  if (typeof value2 === "string" && value2.includes("<alpha-value>")) {
    let oldValue = value2;
    return ({ opacityValue = 1 }) => oldValue.replace("<alpha-value>", opacityValue);
  }
  return value2;
}
function unwrapArbitraryModifier(modifier) {
  return normalize(modifier.slice(1, -1));
}
function asColor(modifier, options = {}, { tailwindConfig = {} } = {}) {
  var _a, _b, _c, _d, _e, _f;
  if (((_a = options.values) == null ? void 0 : _a[modifier]) !== void 0) {
    return parseColorFormat((_b = options.values) == null ? void 0 : _b[modifier]);
  }
  let [color2, alpha] = splitUtilityModifier(modifier);
  if (alpha !== void 0) {
    let normalizedColor = (_d = (_c = options.values) == null ? void 0 : _c[color2]) != null ? _d : isArbitraryValue(color2) ? color2.slice(1, -1) : void 0;
    if (normalizedColor === void 0) {
      return void 0;
    }
    normalizedColor = parseColorFormat(normalizedColor);
    if (isArbitraryValue(alpha)) {
      return withAlphaValue(normalizedColor, unwrapArbitraryModifier(alpha));
    }
    if (((_f = (_e = tailwindConfig.theme) == null ? void 0 : _e.opacity) == null ? void 0 : _f[alpha]) === void 0) {
      return void 0;
    }
    return withAlphaValue(normalizedColor, tailwindConfig.theme.opacity[alpha]);
  }
  return asValue(modifier, options, { validate: color });
}
function asLookupValue(modifier, options = {}) {
  var _a;
  return (_a = options.values) == null ? void 0 : _a[modifier];
}
function guess(validate) {
  return (modifier, options) => {
    return asValue(modifier, options, { validate });
  };
}
var typeMap = {
  any: asValue,
  color: asColor,
  url: guess(url),
  image: guess(image),
  length: guess(length),
  percentage: guess(percentage),
  position: guess(position),
  lookup: asLookupValue,
  "generic-name": guess(genericName),
  "family-name": guess(familyName),
  number: guess(number),
  "line-width": guess(lineWidth),
  "absolute-size": guess(absoluteSize),
  "relative-size": guess(relativeSize),
  shadow: guess(shadow),
  size: guess(backgroundSize)
};
var supportedTypes = Object.keys(typeMap);
function splitAtFirst(input, delim) {
  let idx = input.indexOf(delim);
  if (idx === -1)
    return [void 0, input];
  return [input.slice(0, idx), input.slice(idx + 1)];
}
function coerceValue(types2, modifier, options, tailwindConfig) {
  if (options.values && modifier in options.values) {
    for (let { type } of types2 != null ? types2 : []) {
      let result = typeMap[type](modifier, options, {
        tailwindConfig
      });
      if (result === void 0) {
        continue;
      }
      return [result, type, null];
    }
  }
  if (isArbitraryValue(modifier)) {
    let arbitraryValue = modifier.slice(1, -1);
    let [explicitType, value2] = splitAtFirst(arbitraryValue, ":");
    if (!/^[\w-_]+$/g.test(explicitType)) {
      value2 = arbitraryValue;
    } else if (explicitType !== void 0 && !supportedTypes.includes(explicitType)) {
      return [];
    }
    if (value2.length > 0 && supportedTypes.includes(explicitType)) {
      return [asValue(`[${value2}]`, options), explicitType, null];
    }
  }
  let matches = getMatchingTypes(types2, modifier, options, tailwindConfig);
  for (let match of matches) {
    return match;
  }
  return [];
}
function* getMatchingTypes(types2, rawModifier, options, tailwindConfig) {
  var _a, _b;
  let modifiersEnabled = flagEnabled(tailwindConfig, "generalizedModifiers");
  let [modifier, utilityModifier] = splitUtilityModifier(rawModifier);
  let canUseUtilityModifier = modifiersEnabled && options.modifiers != null && (options.modifiers === "any" || typeof options.modifiers === "object" && (utilityModifier && isArbitraryValue(utilityModifier) || utilityModifier in options.modifiers));
  if (!canUseUtilityModifier) {
    modifier = rawModifier;
    utilityModifier = void 0;
  }
  if (utilityModifier !== void 0 && modifier === "") {
    modifier = "DEFAULT";
  }
  if (utilityModifier !== void 0) {
    if (typeof options.modifiers === "object") {
      let configValue = (_b = (_a = options.modifiers) == null ? void 0 : _a[utilityModifier]) != null ? _b : null;
      if (configValue !== null) {
        utilityModifier = configValue;
      } else if (isArbitraryValue(utilityModifier)) {
        utilityModifier = unwrapArbitraryModifier(utilityModifier);
      }
    }
  }
  for (let { type } of types2 != null ? types2 : []) {
    let result = typeMap[type](modifier, options, {
      tailwindConfig
    });
    if (result === void 0) {
      continue;
    }
    yield [result, type, utilityModifier != null ? utilityModifier : null];
  }
}

// node_modules/tailwindcss/src/util/formatVariantSelector.js
var import_postcss_selector_parser3 = __toESM(require_dist());
var import_unesc = __toESM(require_unesc());

// node_modules/tailwindcss/src/util/escapeClassName.js
var import_postcss_selector_parser2 = __toESM(require_dist());
function escapeClassName(className) {
  var _a, _b;
  let node = import_postcss_selector_parser2.default.className();
  node.value = className;
  return escapeCommas((_b = (_a = node == null ? void 0 : node.raws) == null ? void 0 : _a.value) != null ? _b : node.value);
}

// node_modules/tailwindcss/src/util/pseudoElements.js
var elementProperties = {
  "::after": ["terminal", "jumpable"],
  "::backdrop": ["terminal", "jumpable"],
  "::before": ["terminal", "jumpable"],
  "::cue": ["terminal"],
  "::cue-region": ["terminal"],
  "::first-letter": ["terminal", "jumpable"],
  "::first-line": ["terminal", "jumpable"],
  "::grammar-error": ["terminal"],
  "::marker": ["terminal", "jumpable"],
  "::part": ["terminal", "actionable"],
  "::placeholder": ["terminal", "jumpable"],
  "::selection": ["terminal", "jumpable"],
  "::slotted": ["terminal"],
  "::spelling-error": ["terminal"],
  "::target-text": ["terminal"],
  "::file-selector-button": ["terminal", "actionable"],
  "::deep": ["actionable"],
  "::v-deep": ["actionable"],
  "::ng-deep": ["actionable"],
  ":after": ["terminal", "jumpable"],
  ":before": ["terminal", "jumpable"],
  ":first-letter": ["terminal", "jumpable"],
  ":first-line": ["terminal", "jumpable"],
  __default__: ["terminal", "actionable"]
};
function movePseudos(sel) {
  let [pseudos] = movablePseudos(sel);
  pseudos.forEach(([sel2, pseudo]) => sel2.removeChild(pseudo));
  sel.nodes.push(...pseudos.map(([, pseudo]) => pseudo));
  return sel;
}
function movablePseudos(sel) {
  var _a;
  let buffer = [];
  let lastSeenElement = null;
  for (let node of sel.nodes) {
    if (node.type === "combinator") {
      buffer = buffer.filter(([, node2]) => propertiesForPseudo(node2).includes("jumpable"));
      lastSeenElement = null;
    } else if (node.type === "pseudo") {
      if (isMovablePseudoElement(node)) {
        lastSeenElement = node;
        buffer.push([sel, node, null]);
      } else if (lastSeenElement && isAttachablePseudoClass(node, lastSeenElement)) {
        buffer.push([sel, node, lastSeenElement]);
      } else {
        lastSeenElement = null;
      }
      for (let sub of (_a = node.nodes) != null ? _a : []) {
        let [movable, lastSeenElementInSub] = movablePseudos(sub);
        lastSeenElement = lastSeenElementInSub || lastSeenElement;
        buffer.push(...movable);
      }
    }
  }
  return [buffer, lastSeenElement];
}
function isPseudoElement(node) {
  return node.value.startsWith("::") || elementProperties[node.value] !== void 0;
}
function isMovablePseudoElement(node) {
  return isPseudoElement(node) && propertiesForPseudo(node).includes("terminal");
}
function isAttachablePseudoClass(node, pseudo) {
  if (node.type !== "pseudo")
    return false;
  if (isPseudoElement(node))
    return false;
  return propertiesForPseudo(pseudo).includes("actionable");
}
function propertiesForPseudo(pseudo) {
  var _a;
  return (_a = elementProperties[pseudo.value]) != null ? _a : elementProperties.__default__;
}

// node_modules/tailwindcss/src/util/formatVariantSelector.js
var MERGE = ":merge";
function formatVariantSelector(formats, { context, candidate }) {
  var _a;
  let prefix3 = (_a = context == null ? void 0 : context.tailwindConfig.prefix) != null ? _a : "";
  let parsedFormats = formats.map((format) => {
    let ast = (0, import_postcss_selector_parser3.default)().astSync(format.format);
    return {
      ...format,
      ast: format.respectPrefix ? prefixSelector_default(prefix3, ast) : ast
    };
  });
  let formatAst = import_postcss_selector_parser3.default.root({
    nodes: [
      import_postcss_selector_parser3.default.selector({
        nodes: [import_postcss_selector_parser3.default.className({ value: escapeClassName(candidate) })]
      })
    ]
  });
  for (let { ast } of parsedFormats) {
    ;
    [formatAst, ast] = handleMergePseudo(formatAst, ast);
    ast.walkNesting((nesting) => nesting.replaceWith(...formatAst.nodes[0].nodes));
    formatAst = ast;
  }
  return formatAst;
}
function simpleSelectorForNode(node) {
  let nodes = [];
  while (node.prev() && node.prev().type !== "combinator") {
    node = node.prev();
  }
  while (node && node.type !== "combinator") {
    nodes.push(node);
    node = node.next();
  }
  return nodes;
}
function resortSelector(sel) {
  sel.sort((a, b) => {
    if (a.type === "tag" && b.type === "class") {
      return -1;
    } else if (a.type === "class" && b.type === "tag") {
      return 1;
    } else if (a.type === "class" && b.type === "pseudo" && b.value.startsWith("::")) {
      return -1;
    } else if (a.type === "pseudo" && a.value.startsWith("::") && b.type === "class") {
      return 1;
    }
    return sel.index(a) - sel.index(b);
  });
  return sel;
}
function eliminateIrrelevantSelectors(sel, base) {
  let hasClassesMatchingCandidate = false;
  sel.walk((child) => {
    if (child.type === "class" && child.value === base) {
      hasClassesMatchingCandidate = true;
      return false;
    }
  });
  if (!hasClassesMatchingCandidate) {
    sel.remove();
  }
}
function finalizeSelector(current, formats, { context, candidate, base }) {
  var _a, _b;
  let separator = (_b = (_a = context == null ? void 0 : context.tailwindConfig) == null ? void 0 : _a.separator) != null ? _b : ":";
  base = base != null ? base : candidate.split(new RegExp(`\\${separator}(?![^[]*\\])`)).pop();
  let selector = (0, import_postcss_selector_parser3.default)().astSync(current);
  selector.walkClasses((node) => {
    if (node.raws && node.value.includes(base)) {
      node.raws.value = escapeClassName((0, import_unesc.default)(node.raws.value));
    }
  });
  selector.each((sel) => eliminateIrrelevantSelectors(sel, base));
  let formatAst = Array.isArray(formats) ? formatVariantSelector(formats, { context, candidate }) : formats;
  if (formatAst === null) {
    return selector.toString();
  }
  let simpleStart = import_postcss_selector_parser3.default.comment({ value: "/*__simple__*/" });
  let simpleEnd = import_postcss_selector_parser3.default.comment({ value: "/*__simple__*/" });
  selector.walkClasses((node) => {
    if (node.value !== base) {
      return;
    }
    let parent = node.parent;
    let formatNodes = formatAst.nodes[0].nodes;
    if (parent.nodes.length === 1) {
      node.replaceWith(...formatNodes);
      return;
    }
    let simpleSelector = simpleSelectorForNode(node);
    parent.insertBefore(simpleSelector[0], simpleStart);
    parent.insertAfter(simpleSelector[simpleSelector.length - 1], simpleEnd);
    for (let child of formatNodes) {
      parent.insertBefore(simpleSelector[0], child.clone());
    }
    node.remove();
    simpleSelector = simpleSelectorForNode(simpleStart);
    let firstNode = parent.index(simpleStart);
    parent.nodes.splice(
      firstNode,
      simpleSelector.length,
      ...resortSelector(import_postcss_selector_parser3.default.selector({ nodes: simpleSelector })).nodes
    );
    simpleStart.remove();
    simpleEnd.remove();
  });
  selector.walkPseudos((p) => {
    if (p.value === MERGE) {
      p.replaceWith(p.nodes);
    }
  });
  selector.each((sel) => movePseudos(sel));
  return selector.toString();
}
function handleMergePseudo(selector, format) {
  let merges = [];
  selector.walkPseudos((pseudo) => {
    if (pseudo.value === MERGE) {
      merges.push({
        pseudo,
        value: pseudo.nodes[0].toString()
      });
    }
  });
  format.walkPseudos((pseudo) => {
    if (pseudo.value !== MERGE) {
      return;
    }
    let value2 = pseudo.nodes[0].toString();
    let existing = merges.find((merge) => merge.value === value2);
    if (!existing) {
      return;
    }
    let attachments = [];
    let next = pseudo.next();
    while (next && next.type !== "combinator") {
      attachments.push(next);
      next = next.next();
    }
    let combinator = next;
    existing.pseudo.parent.insertAfter(
      existing.pseudo,
      import_postcss_selector_parser3.default.selector({ nodes: attachments.map((node) => node.clone()) })
    );
    pseudo.remove();
    attachments.forEach((node) => node.remove());
    if (combinator && combinator.type === "combinator") {
      combinator.remove();
    }
  });
  return [selector, format];
}

// node_modules/tailwindcss/src/util/nameClass.js
function asClass(name) {
  return escapeCommas(`.${escapeClassName(name)}`);
}
function nameClass(classPrefix, key) {
  return asClass(formatClass(classPrefix, key));
}
function formatClass(classPrefix, key) {
  if (key === "DEFAULT") {
    return classPrefix;
  }
  if (key === "-" || key === "-DEFAULT") {
    return `-${classPrefix}`;
  }
  if (key.startsWith("-")) {
    return `-${classPrefix}${key}`;
  }
  if (key.startsWith("/")) {
    return `${classPrefix}${key}`;
  }
  return `${classPrefix}-${key}`;
}

// node_modules/tailwindcss/src/lib/setupContextUtils.js
var import_dlv = __toESM(require_dlv_umd());
var import_postcss_selector_parser4 = __toESM(require_dist());

// node_modules/tailwindcss/src/util/transformThemeValue.js
function transformThemeValue(themeSection) {
  if (["fontSize", "outline"].includes(themeSection)) {
    return (value2) => {
      if (typeof value2 === "function")
        value2 = value2({});
      if (Array.isArray(value2))
        value2 = value2[0];
      return value2;
    };
  }
  if (themeSection === "fontFamily") {
    return (value2) => {
      if (typeof value2 === "function")
        value2 = value2({});
      let families = Array.isArray(value2) && isPlainObject(value2[1]) ? value2[0] : value2;
      return Array.isArray(families) ? families.join(", ") : families;
    };
  }
  if ([
    "boxShadow",
    "transitionProperty",
    "transitionDuration",
    "transitionDelay",
    "transitionTimingFunction",
    "backgroundImage",
    "backgroundSize",
    "backgroundColor",
    "cursor",
    "animation"
  ].includes(themeSection)) {
    return (value2) => {
      if (typeof value2 === "function")
        value2 = value2({});
      if (Array.isArray(value2))
        value2 = value2.join(", ");
      return value2;
    };
  }
  if (["gridTemplateColumns", "gridTemplateRows", "objectPosition"].includes(themeSection)) {
    return (value2) => {
      if (typeof value2 === "function")
        value2 = value2({});
      if (typeof value2 === "string")
        value2 = postcss_default.list.comma(value2).join(" ");
      return value2;
    };
  }
  return (value2, opts = {}) => {
    if (typeof value2 === "function") {
      value2 = value2(opts);
    }
    return value2;
  };
}

// node_modules/tailwindcss/src/corePlugins.js
init_fs();
init_path();

// node_modules/tailwindcss/src/util/createUtilityPlugin.js
function createUtilityPlugin(themeKey, utilityVariations = [[themeKey, [themeKey]]], { filterDefault = false, ...options } = {}) {
  let transformValue = transformThemeValue(themeKey);
  return function({ matchUtilities, theme }) {
    var _a;
    for (let utilityVariation of utilityVariations) {
      let group = Array.isArray(utilityVariation[0]) ? utilityVariation : [utilityVariation];
      matchUtilities(
        group.reduce((obj, [classPrefix, properties]) => {
          return Object.assign(obj, {
            [classPrefix]: (value2) => {
              return properties.reduce((obj2, name) => {
                if (Array.isArray(name)) {
                  return Object.assign(obj2, { [name[0]]: name[1] });
                }
                return Object.assign(obj2, { [name]: transformValue(value2) });
              }, {});
            }
          });
        }, {}),
        {
          ...options,
          values: filterDefault ? Object.fromEntries(
            Object.entries((_a = theme(themeKey)) != null ? _a : {}).filter(([modifier]) => modifier !== "DEFAULT")
          ) : theme(themeKey)
        }
      );
    }
  };
}

// node_modules/tailwindcss/src/util/buildMediaQuery.js
function buildMediaQuery(screens) {
  screens = Array.isArray(screens) ? screens : [screens];
  return screens.map((screen) => {
    let values = screen.values.map((screen2) => {
      if (screen2.raw !== void 0) {
        return screen2.raw;
      }
      return [
        screen2.min && `(min-width: ${screen2.min})`,
        screen2.max && `(max-width: ${screen2.max})`
      ].filter(Boolean).join(" and ");
    });
    return screen.not ? `not all and ${values}` : values;
  }).join(", ");
}

// node_modules/tailwindcss/src/util/parseAnimationValue.js
var DIRECTIONS = /* @__PURE__ */ new Set(["normal", "reverse", "alternate", "alternate-reverse"]);
var PLAY_STATES = /* @__PURE__ */ new Set(["running", "paused"]);
var FILL_MODES = /* @__PURE__ */ new Set(["none", "forwards", "backwards", "both"]);
var ITERATION_COUNTS = /* @__PURE__ */ new Set(["infinite"]);
var TIMINGS = /* @__PURE__ */ new Set([
  "linear",
  "ease",
  "ease-in",
  "ease-out",
  "ease-in-out",
  "step-start",
  "step-end"
]);
var TIMING_FNS = ["cubic-bezier", "steps"];
var COMMA = /\,(?![^(]*\))/g;
var SPACE2 = /\ +(?![^(]*\))/g;
var TIME = /^(-?[\d.]+m?s)$/;
var DIGIT = /^(\d+)$/;
function parseAnimationValue(input) {
  let animations = input.split(COMMA);
  return animations.map((animation) => {
    let value2 = animation.trim();
    let result = { value: value2 };
    let parts = value2.split(SPACE2);
    let seen = /* @__PURE__ */ new Set();
    for (let part of parts) {
      if (!seen.has("DIRECTIONS") && DIRECTIONS.has(part)) {
        result.direction = part;
        seen.add("DIRECTIONS");
      } else if (!seen.has("PLAY_STATES") && PLAY_STATES.has(part)) {
        result.playState = part;
        seen.add("PLAY_STATES");
      } else if (!seen.has("FILL_MODES") && FILL_MODES.has(part)) {
        result.fillMode = part;
        seen.add("FILL_MODES");
      } else if (!seen.has("ITERATION_COUNTS") && (ITERATION_COUNTS.has(part) || DIGIT.test(part))) {
        result.iterationCount = part;
        seen.add("ITERATION_COUNTS");
      } else if (!seen.has("TIMING_FUNCTION") && TIMINGS.has(part)) {
        result.timingFunction = part;
        seen.add("TIMING_FUNCTION");
      } else if (!seen.has("TIMING_FUNCTION") && TIMING_FNS.some((f) => part.startsWith(`${f}(`))) {
        result.timingFunction = part;
        seen.add("TIMING_FUNCTION");
      } else if (!seen.has("DURATION") && TIME.test(part)) {
        result.duration = part;
        seen.add("DURATION");
      } else if (!seen.has("DELAY") && TIME.test(part)) {
        result.delay = part;
        seen.add("DELAY");
      } else if (!seen.has("NAME")) {
        result.name = part;
        seen.add("NAME");
      } else {
        if (!result.unknown)
          result.unknown = [];
        result.unknown.push(part);
      }
    }
    return result;
  });
}

// node_modules/tailwindcss/src/util/flattenColorPalette.js
var flattenColorPalette = (colors) => Object.assign(
  {},
  ...Object.entries(colors != null ? colors : {}).flatMap(
    ([color2, values]) => typeof values == "object" ? Object.entries(flattenColorPalette(values)).map(([number2, hex]) => ({
      [color2 + (number2 === "DEFAULT" ? "" : `-${number2}`)]: hex
    })) : [{ [`${color2}`]: values }]
  )
);
var flattenColorPalette_default = flattenColorPalette;

// node_modules/tailwindcss/src/util/toColorValue.js
function toColorValue(maybeFunction) {
  return typeof maybeFunction === "function" ? maybeFunction({}) : maybeFunction;
}

// node_modules/tailwindcss/src/util/normalizeScreens.js
function normalizeScreens(screens, root3 = true) {
  if (Array.isArray(screens)) {
    return screens.map((screen) => {
      if (root3 && Array.isArray(screen)) {
        throw new Error("The tuple syntax is not supported for `screens`.");
      }
      if (typeof screen === "string") {
        return { name: screen.toString(), not: false, values: [{ min: screen, max: void 0 }] };
      }
      let [name, options] = screen;
      name = name.toString();
      if (typeof options === "string") {
        return { name, not: false, values: [{ min: options, max: void 0 }] };
      }
      if (Array.isArray(options)) {
        return { name, not: false, values: options.map((option) => resolveValue(option)) };
      }
      return { name, not: false, values: [resolveValue(options)] };
    });
  }
  return normalizeScreens(Object.entries(screens != null ? screens : {}), false);
}
function isScreenSortable(screen) {
  if (screen.values.length !== 1) {
    return { result: false, reason: "multiple-values" };
  } else if (screen.values[0].raw !== void 0) {
    return { result: false, reason: "raw-values" };
  } else if (screen.values[0].min !== void 0 && screen.values[0].max !== void 0) {
    return { result: false, reason: "min-and-max" };
  }
  return { result: true, reason: null };
}
function compareScreens(type, a, z) {
  let aScreen = toScreen(a, type);
  let zScreen = toScreen(z, type);
  let aSorting = isScreenSortable(aScreen);
  let bSorting = isScreenSortable(zScreen);
  if (aSorting.reason === "multiple-values" || bSorting.reason === "multiple-values") {
    throw new Error(
      "Attempted to sort a screen with multiple values. This should never happen. Please open a bug report."
    );
  } else if (aSorting.reason === "raw-values" || bSorting.reason === "raw-values") {
    throw new Error(
      "Attempted to sort a screen with raw values. This should never happen. Please open a bug report."
    );
  } else if (aSorting.reason === "min-and-max" || bSorting.reason === "min-and-max") {
    throw new Error(
      "Attempted to sort a screen with both min and max values. This should never happen. Please open a bug report."
    );
  }
  let { min: aMin, max: aMax } = aScreen.values[0];
  let { min: zMin, max: zMax } = zScreen.values[0];
  if (a.not)
    [aMin, aMax] = [aMax, aMin];
  if (z.not)
    [zMin, zMax] = [zMax, zMin];
  aMin = aMin === void 0 ? aMin : parseFloat(aMin);
  aMax = aMax === void 0 ? aMax : parseFloat(aMax);
  zMin = zMin === void 0 ? zMin : parseFloat(zMin);
  zMax = zMax === void 0 ? zMax : parseFloat(zMax);
  let [aValue, zValue] = type === "min" ? [aMin, zMin] : [zMax, aMax];
  return aValue - zValue;
}
function toScreen(value2, type) {
  if (typeof value2 === "object") {
    return value2;
  }
  return {
    name: "arbitrary-screen",
    values: [{ [type]: value2 }]
  };
}
function resolveValue({ "min-width": _minWidth, min = _minWidth, max: max2, raw } = {}) {
  return { min, max: max2, raw };
}

// node_modules/tailwindcss/src/util/removeAlphaVariables.js
function removeAlphaVariables(container, toRemove) {
  container.walkDecls((decl3) => {
    if (toRemove.includes(decl3.prop)) {
      decl3.remove();
      return;
    }
    for (let varName of toRemove) {
      if (decl3.value.includes(`/ var(${varName})`)) {
        decl3.value = decl3.value.replace(`/ var(${varName})`, "");
      }
    }
  });
}

// node_modules/tailwindcss/src/corePlugins.js
var variantPlugins = {
  pseudoElementVariants: ({ addVariant }) => {
    addVariant("first-letter", "&::first-letter");
    addVariant("first-line", "&::first-line");
    addVariant("marker", [
      ({ container }) => {
        removeAlphaVariables(container, ["--tw-text-opacity"]);
        return "& *::marker";
      },
      ({ container }) => {
        removeAlphaVariables(container, ["--tw-text-opacity"]);
        return "&::marker";
      }
    ]);
    addVariant("selection", ["& *::selection", "&::selection"]);
    addVariant("file", "&::file-selector-button");
    addVariant("placeholder", "&::placeholder");
    addVariant("backdrop", "&::backdrop");
    addVariant("before", ({ container }) => {
      container.walkRules((rule3) => {
        let foundContent = false;
        rule3.walkDecls("content", () => {
          foundContent = true;
        });
        if (!foundContent) {
          rule3.prepend(postcss_default.decl({ prop: "content", value: "var(--tw-content)" }));
        }
      });
      return "&::before";
    });
    addVariant("after", ({ container }) => {
      container.walkRules((rule3) => {
        let foundContent = false;
        rule3.walkDecls("content", () => {
          foundContent = true;
        });
        if (!foundContent) {
          rule3.prepend(postcss_default.decl({ prop: "content", value: "var(--tw-content)" }));
        }
      });
      return "&::after";
    });
  },
  pseudoClassVariants: ({ addVariant, matchVariant, config, prefix: prefix3 }) => {
    let pseudoVariants = [
      ["first", "&:first-child"],
      ["last", "&:last-child"],
      ["only", "&:only-child"],
      ["odd", "&:nth-child(odd)"],
      ["even", "&:nth-child(even)"],
      "first-of-type",
      "last-of-type",
      "only-of-type",
      [
        "visited",
        ({ container }) => {
          removeAlphaVariables(container, [
            "--tw-text-opacity",
            "--tw-border-opacity",
            "--tw-bg-opacity"
          ]);
          return "&:visited";
        }
      ],
      "target",
      ["open", "&[open]"],
      "default",
      "checked",
      "indeterminate",
      "placeholder-shown",
      "autofill",
      "optional",
      "required",
      "valid",
      "invalid",
      "in-range",
      "out-of-range",
      "read-only",
      "empty",
      "focus-within",
      [
        "hover",
        !flagEnabled(config(), "hoverOnlyWhenSupported") ? "&:hover" : "@media (hover: hover) and (pointer: fine) { &:hover }"
      ],
      "focus",
      "focus-visible",
      "active",
      "enabled",
      "disabled"
    ].map((variant) => Array.isArray(variant) ? variant : [variant, `&:${variant}`]);
    for (let [variantName, state] of pseudoVariants) {
      addVariant(variantName, (ctx) => {
        let result = typeof state === "function" ? state(ctx) : state;
        return result;
      });
    }
    let variants = {
      group: (_, { modifier }) => modifier ? [`:merge(${prefix3(".group")}\\/${escapeClassName(modifier)})`, " &"] : [`:merge(${prefix3(".group")})`, " &"],
      peer: (_, { modifier }) => modifier ? [`:merge(${prefix3(".peer")}\\/${escapeClassName(modifier)})`, " ~ &"] : [`:merge(${prefix3(".peer")})`, " ~ &"]
    };
    for (let [name, fn] of Object.entries(variants)) {
      matchVariant(
        name,
        (value2 = "", extra) => {
          let result = normalize(typeof value2 === "function" ? value2(extra) : value2);
          if (!result.includes("&"))
            result = "&" + result;
          let [a, b] = fn("", extra);
          let start = null;
          let end = null;
          let quotes2 = 0;
          for (let i = 0; i < result.length; ++i) {
            let c = result[i];
            if (c === "&") {
              start = i;
            } else if (c === "'" || c === '"') {
              quotes2 += 1;
            } else if (start !== null && c === " " && !quotes2) {
              end = i;
            }
          }
          if (start !== null && end === null) {
            end = result.length;
          }
          return result.slice(0, start) + a + result.slice(start + 1, end) + b + result.slice(end);
        },
        {
          values: Object.fromEntries(pseudoVariants),
          [INTERNAL_FEATURES]: {
            respectPrefix: false
          }
        }
      );
    }
  },
  directionVariants: ({ addVariant }) => {
    addVariant("ltr", ':is([dir="ltr"] &)');
    addVariant("rtl", ':is([dir="rtl"] &)');
  },
  reducedMotionVariants: ({ addVariant }) => {
    addVariant("motion-safe", "@media (prefers-reduced-motion: no-preference)");
    addVariant("motion-reduce", "@media (prefers-reduced-motion: reduce)");
  },
  darkVariants: ({ config, addVariant }) => {
    let [mode, className = ".dark"] = [].concat(config("darkMode", "media"));
    if (mode === false) {
      mode = "media";
      log_default.warn("darkmode-false", [
        "The `darkMode` option in your Tailwind CSS configuration is set to `false`, which now behaves the same as `media`.",
        "Change `darkMode` to `media` or remove it entirely.",
        "https://tailwindcss.com/docs/upgrade-guide#remove-dark-mode-configuration"
      ]);
    }
    if (mode === "class") {
      addVariant("dark", `:is(${className} &)`);
    } else if (mode === "media") {
      addVariant("dark", "@media (prefers-color-scheme: dark)");
    }
  },
  printVariant: ({ addVariant }) => {
    addVariant("print", "@media print");
  },
  screenVariants: ({ theme, addVariant, matchVariant }) => {
    var _a;
    let rawScreens = (_a = theme("screens")) != null ? _a : {};
    let areSimpleScreens = Object.values(rawScreens).every((v) => typeof v === "string");
    let screens = normalizeScreens(theme("screens"));
    let unitCache = /* @__PURE__ */ new Set([]);
    function units(value2) {
      var _a2, _b;
      return (_b = (_a2 = value2.match(/(\D+)$/)) == null ? void 0 : _a2[1]) != null ? _b : "(none)";
    }
    function recordUnits(value2) {
      if (value2 !== void 0) {
        unitCache.add(units(value2));
      }
    }
    function canUseUnits(value2) {
      recordUnits(value2);
      return unitCache.size === 1;
    }
    for (const screen of screens) {
      for (const value2 of screen.values) {
        recordUnits(value2.min);
        recordUnits(value2.max);
      }
    }
    let screensUseConsistentUnits = unitCache.size <= 1;
    function buildScreenValues(type) {
      return Object.fromEntries(
        screens.filter((screen) => isScreenSortable(screen).result).map((screen) => {
          let { min, max: max2 } = screen.values[0];
          if (type === "min" && min !== void 0) {
            return screen;
          } else if (type === "min" && max2 !== void 0) {
            return { ...screen, not: !screen.not };
          } else if (type === "max" && max2 !== void 0) {
            return screen;
          } else if (type === "max" && min !== void 0) {
            return { ...screen, not: !screen.not };
          }
        }).map((screen) => [screen.name, screen])
      );
    }
    function buildSort(type) {
      return (a, z) => compareScreens(type, a.value, z.value);
    }
    let maxSort = buildSort("max");
    let minSort = buildSort("min");
    function buildScreenVariant(type) {
      return (value2) => {
        if (!areSimpleScreens) {
          log_default.warn("complex-screen-config", [
            "The `min-*` and `max-*` variants are not supported with a `screens` configuration containing objects."
          ]);
          return [];
        } else if (!screensUseConsistentUnits) {
          log_default.warn("mixed-screen-units", [
            "The `min-*` and `max-*` variants are not supported with a `screens` configuration containing mixed units."
          ]);
          return [];
        } else if (typeof value2 === "string" && !canUseUnits(value2)) {
          log_default.warn("minmax-have-mixed-units", [
            "The `min-*` and `max-*` variants are not supported with a `screens` configuration containing mixed units."
          ]);
          return [];
        }
        return [`@media ${buildMediaQuery(toScreen(value2, type))}`];
      };
    }
    matchVariant("max", buildScreenVariant("max"), {
      sort: maxSort,
      values: areSimpleScreens ? buildScreenValues("max") : {}
    });
    let id = "min-screens";
    for (let screen of screens) {
      addVariant(screen.name, `@media ${buildMediaQuery(screen)}`, {
        id,
        sort: areSimpleScreens && screensUseConsistentUnits ? minSort : void 0,
        value: screen
      });
    }
    matchVariant("min", buildScreenVariant("min"), {
      id,
      sort: minSort
    });
  },
  supportsVariants: ({ matchVariant, theme }) => {
    var _a;
    matchVariant(
      "supports",
      (value2 = "") => {
        let check = normalize(value2);
        let isRaw = /^\w*\s*\(/.test(check);
        check = isRaw ? check.replace(/\b(and|or|not)\b/g, " $1 ") : check;
        if (isRaw) {
          return `@supports ${check}`;
        }
        if (!check.includes(":")) {
          check = `${check}: var(--tw)`;
        }
        if (!(check.startsWith("(") && check.endsWith(")"))) {
          check = `(${check})`;
        }
        return `@supports ${check}`;
      },
      { values: (_a = theme("supports")) != null ? _a : {} }
    );
  },
  ariaVariants: ({ matchVariant, theme }) => {
    var _a, _b, _c;
    matchVariant("aria", (value2) => `&[aria-${normalize(value2)}]`, { values: (_a = theme("aria")) != null ? _a : {} });
    matchVariant(
      "group-aria",
      (value2, { modifier }) => modifier ? `:merge(.group\\/${modifier})[aria-${normalize(value2)}] &` : `:merge(.group)[aria-${normalize(value2)}] &`,
      { values: (_b = theme("aria")) != null ? _b : {} }
    );
    matchVariant(
      "peer-aria",
      (value2, { modifier }) => modifier ? `:merge(.peer\\/${modifier})[aria-${normalize(value2)}] ~ &` : `:merge(.peer)[aria-${normalize(value2)}] ~ &`,
      { values: (_c = theme("aria")) != null ? _c : {} }
    );
  },
  dataVariants: ({ matchVariant, theme }) => {
    var _a, _b, _c;
    matchVariant("data", (value2) => `&[data-${normalize(value2)}]`, { values: (_a = theme("data")) != null ? _a : {} });
    matchVariant(
      "group-data",
      (value2, { modifier }) => modifier ? `:merge(.group\\/${modifier})[data-${normalize(value2)}] &` : `:merge(.group)[data-${normalize(value2)}] &`,
      { values: (_b = theme("data")) != null ? _b : {} }
    );
    matchVariant(
      "peer-data",
      (value2, { modifier }) => modifier ? `:merge(.peer\\/${modifier})[data-${normalize(value2)}] ~ &` : `:merge(.peer)[data-${normalize(value2)}] ~ &`,
      { values: (_c = theme("data")) != null ? _c : {} }
    );
  },
  orientationVariants: ({ addVariant }) => {
    addVariant("portrait", "@media (orientation: portrait)");
    addVariant("landscape", "@media (orientation: landscape)");
  },
  prefersContrastVariants: ({ addVariant }) => {
    addVariant("contrast-more", "@media (prefers-contrast: more)");
    addVariant("contrast-less", "@media (prefers-contrast: less)");
  }
};
var cssTransformValue = [
  "translate(var(--tw-translate-x), var(--tw-translate-y))",
  "rotate(var(--tw-rotate))",
  "skewX(var(--tw-skew-x))",
  "skewY(var(--tw-skew-y))",
  "scaleX(var(--tw-scale-x))",
  "scaleY(var(--tw-scale-y))"
].join(" ");
var cssFilterValue = [
  "var(--tw-blur)",
  "var(--tw-brightness)",
  "var(--tw-contrast)",
  "var(--tw-grayscale)",
  "var(--tw-hue-rotate)",
  "var(--tw-invert)",
  "var(--tw-saturate)",
  "var(--tw-sepia)",
  "var(--tw-drop-shadow)"
].join(" ");
var cssBackdropFilterValue = [
  "var(--tw-backdrop-blur)",
  "var(--tw-backdrop-brightness)",
  "var(--tw-backdrop-contrast)",
  "var(--tw-backdrop-grayscale)",
  "var(--tw-backdrop-hue-rotate)",
  "var(--tw-backdrop-invert)",
  "var(--tw-backdrop-opacity)",
  "var(--tw-backdrop-saturate)",
  "var(--tw-backdrop-sepia)"
].join(" ");
var corePlugins = {
  preflight: ({ addBase }) => {
    let preflightStyles = postcss_default.parse(
      fs_default.readFileSync(join("/", "./css/preflight.css"), "utf8")
    );
    addBase([
      postcss_default.comment({
        text: `! tailwindcss v${version} | MIT License | https://tailwindcss.com`
      }),
      ...preflightStyles.nodes
    ]);
  },
  container: (() => {
    function extractMinWidths(breakpoints = []) {
      return breakpoints.flatMap((breakpoint) => breakpoint.values.map((breakpoint2) => breakpoint2.min)).filter((v) => v !== void 0);
    }
    function mapMinWidthsToPadding(minWidths, screens, paddings) {
      if (typeof paddings === "undefined") {
        return [];
      }
      if (!(typeof paddings === "object" && paddings !== null)) {
        return [
          {
            screen: "DEFAULT",
            minWidth: 0,
            padding: paddings
          }
        ];
      }
      let mapping = [];
      if (paddings.DEFAULT) {
        mapping.push({
          screen: "DEFAULT",
          minWidth: 0,
          padding: paddings.DEFAULT
        });
      }
      for (let minWidth of minWidths) {
        for (let screen of screens) {
          for (let { min } of screen.values) {
            if (min === minWidth) {
              mapping.push({ minWidth, padding: paddings[screen.name] });
            }
          }
        }
      }
      return mapping;
    }
    return function({ addComponents, theme }) {
      let screens = normalizeScreens(theme("container.screens", theme("screens")));
      let minWidths = extractMinWidths(screens);
      let paddings = mapMinWidthsToPadding(minWidths, screens, theme("container.padding"));
      let generatePaddingFor = (minWidth) => {
        let paddingConfig = paddings.find((padding) => padding.minWidth === minWidth);
        if (!paddingConfig) {
          return {};
        }
        return {
          paddingRight: paddingConfig.padding,
          paddingLeft: paddingConfig.padding
        };
      };
      let atRules = Array.from(
        new Set(minWidths.slice().sort((a, z) => parseInt(a) - parseInt(z)))
      ).map((minWidth) => ({
        [`@media (min-width: ${minWidth})`]: {
          ".container": {
            "max-width": minWidth,
            ...generatePaddingFor(minWidth)
          }
        }
      }));
      addComponents([
        {
          ".container": Object.assign(
            { width: "100%" },
            theme("container.center", false) ? { marginRight: "auto", marginLeft: "auto" } : {},
            generatePaddingFor(0)
          )
        },
        ...atRules
      ]);
    };
  })(),
  accessibility: ({ addUtilities }) => {
    addUtilities({
      ".sr-only": {
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: "0",
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        borderWidth: "0"
      },
      ".not-sr-only": {
        position: "static",
        width: "auto",
        height: "auto",
        padding: "0",
        margin: "0",
        overflow: "visible",
        clip: "auto",
        whiteSpace: "normal"
      }
    });
  },
  pointerEvents: ({ addUtilities }) => {
    addUtilities({
      ".pointer-events-none": { "pointer-events": "none" },
      ".pointer-events-auto": { "pointer-events": "auto" }
    });
  },
  visibility: ({ addUtilities }) => {
    addUtilities({
      ".visible": { visibility: "visible" },
      ".invisible": { visibility: "hidden" },
      ".collapse": { visibility: "collapse" }
    });
  },
  position: ({ addUtilities }) => {
    addUtilities({
      ".static": { position: "static" },
      ".fixed": { position: "fixed" },
      ".absolute": { position: "absolute" },
      ".relative": { position: "relative" },
      ".sticky": { position: "sticky" }
    });
  },
  inset: createUtilityPlugin(
    "inset",
    [
      ["inset", ["inset"]],
      [
        ["inset-x", ["left", "right"]],
        ["inset-y", ["top", "bottom"]]
      ],
      [
        ["start", ["inset-inline-start"]],
        ["end", ["inset-inline-end"]],
        ["top", ["top"]],
        ["right", ["right"]],
        ["bottom", ["bottom"]],
        ["left", ["left"]]
      ]
    ],
    { supportsNegativeValues: true }
  ),
  isolation: ({ addUtilities }) => {
    addUtilities({
      ".isolate": { isolation: "isolate" },
      ".isolation-auto": { isolation: "auto" }
    });
  },
  zIndex: createUtilityPlugin("zIndex", [["z", ["zIndex"]]], { supportsNegativeValues: true }),
  order: createUtilityPlugin("order", void 0, { supportsNegativeValues: true }),
  gridColumn: createUtilityPlugin("gridColumn", [["col", ["gridColumn"]]]),
  gridColumnStart: createUtilityPlugin("gridColumnStart", [["col-start", ["gridColumnStart"]]]),
  gridColumnEnd: createUtilityPlugin("gridColumnEnd", [["col-end", ["gridColumnEnd"]]]),
  gridRow: createUtilityPlugin("gridRow", [["row", ["gridRow"]]]),
  gridRowStart: createUtilityPlugin("gridRowStart", [["row-start", ["gridRowStart"]]]),
  gridRowEnd: createUtilityPlugin("gridRowEnd", [["row-end", ["gridRowEnd"]]]),
  float: ({ addUtilities }) => {
    addUtilities({
      ".float-right": { float: "right" },
      ".float-left": { float: "left" },
      ".float-none": { float: "none" }
    });
  },
  clear: ({ addUtilities }) => {
    addUtilities({
      ".clear-left": { clear: "left" },
      ".clear-right": { clear: "right" },
      ".clear-both": { clear: "both" },
      ".clear-none": { clear: "none" }
    });
  },
  margin: createUtilityPlugin(
    "margin",
    [
      ["m", ["margin"]],
      [
        ["mx", ["margin-left", "margin-right"]],
        ["my", ["margin-top", "margin-bottom"]]
      ],
      [
        ["ms", ["margin-inline-start"]],
        ["me", ["margin-inline-end"]],
        ["mt", ["margin-top"]],
        ["mr", ["margin-right"]],
        ["mb", ["margin-bottom"]],
        ["ml", ["margin-left"]]
      ]
    ],
    { supportsNegativeValues: true }
  ),
  boxSizing: ({ addUtilities }) => {
    addUtilities({
      ".box-border": { "box-sizing": "border-box" },
      ".box-content": { "box-sizing": "content-box" }
    });
  },
  lineClamp: ({ matchUtilities, addUtilities, theme }) => {
    matchUtilities(
      {
        "line-clamp": (value2) => ({
          overflow: "hidden",
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          "-webkit-line-clamp": `${value2}`
        })
      },
      { values: theme("lineClamp") }
    );
    addUtilities({
      ".line-clamp-none": {
        overflow: "visible",
        display: "block",
        "-webkit-box-orient": "horizontal",
        "-webkit-line-clamp": "none"
      }
    });
  },
  display: ({ addUtilities }) => {
    addUtilities({
      ".block": { display: "block" },
      ".inline-block": { display: "inline-block" },
      ".inline": { display: "inline" },
      ".flex": { display: "flex" },
      ".inline-flex": { display: "inline-flex" },
      ".table": { display: "table" },
      ".inline-table": { display: "inline-table" },
      ".table-caption": { display: "table-caption" },
      ".table-cell": { display: "table-cell" },
      ".table-column": { display: "table-column" },
      ".table-column-group": { display: "table-column-group" },
      ".table-footer-group": { display: "table-footer-group" },
      ".table-header-group": { display: "table-header-group" },
      ".table-row-group": { display: "table-row-group" },
      ".table-row": { display: "table-row" },
      ".flow-root": { display: "flow-root" },
      ".grid": { display: "grid" },
      ".inline-grid": { display: "inline-grid" },
      ".contents": { display: "contents" },
      ".list-item": { display: "list-item" },
      ".hidden": { display: "none" }
    });
  },
  aspectRatio: createUtilityPlugin("aspectRatio", [["aspect", ["aspect-ratio"]]]),
  height: createUtilityPlugin("height", [["h", ["height"]]]),
  maxHeight: createUtilityPlugin("maxHeight", [["max-h", ["maxHeight"]]]),
  minHeight: createUtilityPlugin("minHeight", [["min-h", ["minHeight"]]]),
  width: createUtilityPlugin("width", [["w", ["width"]]]),
  minWidth: createUtilityPlugin("minWidth", [["min-w", ["minWidth"]]]),
  maxWidth: createUtilityPlugin("maxWidth", [["max-w", ["maxWidth"]]]),
  flex: createUtilityPlugin("flex"),
  flexShrink: createUtilityPlugin("flexShrink", [
    ["flex-shrink", ["flex-shrink"]],
    ["shrink", ["flex-shrink"]]
  ]),
  flexGrow: createUtilityPlugin("flexGrow", [
    ["flex-grow", ["flex-grow"]],
    ["grow", ["flex-grow"]]
  ]),
  flexBasis: createUtilityPlugin("flexBasis", [["basis", ["flex-basis"]]]),
  tableLayout: ({ addUtilities }) => {
    addUtilities({
      ".table-auto": { "table-layout": "auto" },
      ".table-fixed": { "table-layout": "fixed" }
    });
  },
  captionSide: ({ addUtilities }) => {
    addUtilities({
      ".caption-top": { "caption-side": "top" },
      ".caption-bottom": { "caption-side": "bottom" }
    });
  },
  borderCollapse: ({ addUtilities }) => {
    addUtilities({
      ".border-collapse": { "border-collapse": "collapse" },
      ".border-separate": { "border-collapse": "separate" }
    });
  },
  borderSpacing: ({ addDefaults, matchUtilities, theme }) => {
    addDefaults("border-spacing", {
      "--tw-border-spacing-x": 0,
      "--tw-border-spacing-y": 0
    });
    matchUtilities(
      {
        "border-spacing": (value2) => {
          return {
            "--tw-border-spacing-x": value2,
            "--tw-border-spacing-y": value2,
            "@defaults border-spacing": {},
            "border-spacing": "var(--tw-border-spacing-x) var(--tw-border-spacing-y)"
          };
        },
        "border-spacing-x": (value2) => {
          return {
            "--tw-border-spacing-x": value2,
            "@defaults border-spacing": {},
            "border-spacing": "var(--tw-border-spacing-x) var(--tw-border-spacing-y)"
          };
        },
        "border-spacing-y": (value2) => {
          return {
            "--tw-border-spacing-y": value2,
            "@defaults border-spacing": {},
            "border-spacing": "var(--tw-border-spacing-x) var(--tw-border-spacing-y)"
          };
        }
      },
      { values: theme("borderSpacing") }
    );
  },
  transformOrigin: createUtilityPlugin("transformOrigin", [["origin", ["transformOrigin"]]]),
  translate: createUtilityPlugin(
    "translate",
    [
      [
        [
          "translate-x",
          [["@defaults transform", {}], "--tw-translate-x", ["transform", cssTransformValue]]
        ],
        [
          "translate-y",
          [["@defaults transform", {}], "--tw-translate-y", ["transform", cssTransformValue]]
        ]
      ]
    ],
    { supportsNegativeValues: true }
  ),
  rotate: createUtilityPlugin(
    "rotate",
    [["rotate", [["@defaults transform", {}], "--tw-rotate", ["transform", cssTransformValue]]]],
    { supportsNegativeValues: true }
  ),
  skew: createUtilityPlugin(
    "skew",
    [
      [
        ["skew-x", [["@defaults transform", {}], "--tw-skew-x", ["transform", cssTransformValue]]],
        ["skew-y", [["@defaults transform", {}], "--tw-skew-y", ["transform", cssTransformValue]]]
      ]
    ],
    { supportsNegativeValues: true }
  ),
  scale: createUtilityPlugin(
    "scale",
    [
      [
        "scale",
        [
          ["@defaults transform", {}],
          "--tw-scale-x",
          "--tw-scale-y",
          ["transform", cssTransformValue]
        ]
      ],
      [
        [
          "scale-x",
          [["@defaults transform", {}], "--tw-scale-x", ["transform", cssTransformValue]]
        ],
        [
          "scale-y",
          [["@defaults transform", {}], "--tw-scale-y", ["transform", cssTransformValue]]
        ]
      ]
    ],
    { supportsNegativeValues: true }
  ),
  transform: ({ addDefaults, addUtilities }) => {
    addDefaults("transform", {
      "--tw-translate-x": "0",
      "--tw-translate-y": "0",
      "--tw-rotate": "0",
      "--tw-skew-x": "0",
      "--tw-skew-y": "0",
      "--tw-scale-x": "1",
      "--tw-scale-y": "1"
    });
    addUtilities({
      ".transform": { "@defaults transform": {}, transform: cssTransformValue },
      ".transform-cpu": {
        transform: cssTransformValue
      },
      ".transform-gpu": {
        transform: cssTransformValue.replace(
          "translate(var(--tw-translate-x), var(--tw-translate-y))",
          "translate3d(var(--tw-translate-x), var(--tw-translate-y), 0)"
        )
      },
      ".transform-none": { transform: "none" }
    });
  },
  animation: ({ matchUtilities, theme, config }) => {
    var _a;
    let prefixName = (name) => escapeClassName(config("prefix") + name);
    let keyframes = Object.fromEntries(
      Object.entries((_a = theme("keyframes")) != null ? _a : {}).map(([key, value2]) => {
        return [key, { [`@keyframes ${prefixName(key)}`]: value2 }];
      })
    );
    matchUtilities(
      {
        animate: (value2) => {
          let animations = parseAnimationValue(value2);
          return [
            ...animations.flatMap((animation) => keyframes[animation.name]),
            {
              animation: animations.map(({ name, value: value3 }) => {
                if (name === void 0 || keyframes[name] === void 0) {
                  return value3;
                }
                return value3.replace(name, prefixName(name));
              }).join(", ")
            }
          ];
        }
      },
      { values: theme("animation") }
    );
  },
  cursor: createUtilityPlugin("cursor"),
  touchAction: ({ addDefaults, addUtilities }) => {
    addDefaults("touch-action", {
      "--tw-pan-x": " ",
      "--tw-pan-y": " ",
      "--tw-pinch-zoom": " "
    });
    let cssTouchActionValue = "var(--tw-pan-x) var(--tw-pan-y) var(--tw-pinch-zoom)";
    addUtilities({
      ".touch-auto": { "touch-action": "auto" },
      ".touch-none": { "touch-action": "none" },
      ".touch-pan-x": {
        "@defaults touch-action": {},
        "--tw-pan-x": "pan-x",
        "touch-action": cssTouchActionValue
      },
      ".touch-pan-left": {
        "@defaults touch-action": {},
        "--tw-pan-x": "pan-left",
        "touch-action": cssTouchActionValue
      },
      ".touch-pan-right": {
        "@defaults touch-action": {},
        "--tw-pan-x": "pan-right",
        "touch-action": cssTouchActionValue
      },
      ".touch-pan-y": {
        "@defaults touch-action": {},
        "--tw-pan-y": "pan-y",
        "touch-action": cssTouchActionValue
      },
      ".touch-pan-up": {
        "@defaults touch-action": {},
        "--tw-pan-y": "pan-up",
        "touch-action": cssTouchActionValue
      },
      ".touch-pan-down": {
        "@defaults touch-action": {},
        "--tw-pan-y": "pan-down",
        "touch-action": cssTouchActionValue
      },
      ".touch-pinch-zoom": {
        "@defaults touch-action": {},
        "--tw-pinch-zoom": "pinch-zoom",
        "touch-action": cssTouchActionValue
      },
      ".touch-manipulation": { "touch-action": "manipulation" }
    });
  },
  userSelect: ({ addUtilities }) => {
    addUtilities({
      ".select-none": { "user-select": "none" },
      ".select-text": { "user-select": "text" },
      ".select-all": { "user-select": "all" },
      ".select-auto": { "user-select": "auto" }
    });
  },
  resize: ({ addUtilities }) => {
    addUtilities({
      ".resize-none": { resize: "none" },
      ".resize-y": { resize: "vertical" },
      ".resize-x": { resize: "horizontal" },
      ".resize": { resize: "both" }
    });
  },
  scrollSnapType: ({ addDefaults, addUtilities }) => {
    addDefaults("scroll-snap-type", {
      "--tw-scroll-snap-strictness": "proximity"
    });
    addUtilities({
      ".snap-none": { "scroll-snap-type": "none" },
      ".snap-x": {
        "@defaults scroll-snap-type": {},
        "scroll-snap-type": "x var(--tw-scroll-snap-strictness)"
      },
      ".snap-y": {
        "@defaults scroll-snap-type": {},
        "scroll-snap-type": "y var(--tw-scroll-snap-strictness)"
      },
      ".snap-both": {
        "@defaults scroll-snap-type": {},
        "scroll-snap-type": "both var(--tw-scroll-snap-strictness)"
      },
      ".snap-mandatory": { "--tw-scroll-snap-strictness": "mandatory" },
      ".snap-proximity": { "--tw-scroll-snap-strictness": "proximity" }
    });
  },
  scrollSnapAlign: ({ addUtilities }) => {
    addUtilities({
      ".snap-start": { "scroll-snap-align": "start" },
      ".snap-end": { "scroll-snap-align": "end" },
      ".snap-center": { "scroll-snap-align": "center" },
      ".snap-align-none": { "scroll-snap-align": "none" }
    });
  },
  scrollSnapStop: ({ addUtilities }) => {
    addUtilities({
      ".snap-normal": { "scroll-snap-stop": "normal" },
      ".snap-always": { "scroll-snap-stop": "always" }
    });
  },
  scrollMargin: createUtilityPlugin(
    "scrollMargin",
    [
      ["scroll-m", ["scroll-margin"]],
      [
        ["scroll-mx", ["scroll-margin-left", "scroll-margin-right"]],
        ["scroll-my", ["scroll-margin-top", "scroll-margin-bottom"]]
      ],
      [
        ["scroll-ms", ["scroll-margin-inline-start"]],
        ["scroll-me", ["scroll-margin-inline-end"]],
        ["scroll-mt", ["scroll-margin-top"]],
        ["scroll-mr", ["scroll-margin-right"]],
        ["scroll-mb", ["scroll-margin-bottom"]],
        ["scroll-ml", ["scroll-margin-left"]]
      ]
    ],
    { supportsNegativeValues: true }
  ),
  scrollPadding: createUtilityPlugin("scrollPadding", [
    ["scroll-p", ["scroll-padding"]],
    [
      ["scroll-px", ["scroll-padding-left", "scroll-padding-right"]],
      ["scroll-py", ["scroll-padding-top", "scroll-padding-bottom"]]
    ],
    [
      ["scroll-ps", ["scroll-padding-inline-start"]],
      ["scroll-pe", ["scroll-padding-inline-end"]],
      ["scroll-pt", ["scroll-padding-top"]],
      ["scroll-pr", ["scroll-padding-right"]],
      ["scroll-pb", ["scroll-padding-bottom"]],
      ["scroll-pl", ["scroll-padding-left"]]
    ]
  ]),
  listStylePosition: ({ addUtilities }) => {
    addUtilities({
      ".list-inside": { "list-style-position": "inside" },
      ".list-outside": { "list-style-position": "outside" }
    });
  },
  listStyleType: createUtilityPlugin("listStyleType", [["list", ["listStyleType"]]]),
  listStyleImage: createUtilityPlugin("listStyleImage", [["list-image", ["listStyleImage"]]]),
  appearance: ({ addUtilities }) => {
    addUtilities({
      ".appearance-none": { appearance: "none" }
    });
  },
  columns: createUtilityPlugin("columns", [["columns", ["columns"]]]),
  breakBefore: ({ addUtilities }) => {
    addUtilities({
      ".break-before-auto": { "break-before": "auto" },
      ".break-before-avoid": { "break-before": "avoid" },
      ".break-before-all": { "break-before": "all" },
      ".break-before-avoid-page": { "break-before": "avoid-page" },
      ".break-before-page": { "break-before": "page" },
      ".break-before-left": { "break-before": "left" },
      ".break-before-right": { "break-before": "right" },
      ".break-before-column": { "break-before": "column" }
    });
  },
  breakInside: ({ addUtilities }) => {
    addUtilities({
      ".break-inside-auto": { "break-inside": "auto" },
      ".break-inside-avoid": { "break-inside": "avoid" },
      ".break-inside-avoid-page": { "break-inside": "avoid-page" },
      ".break-inside-avoid-column": { "break-inside": "avoid-column" }
    });
  },
  breakAfter: ({ addUtilities }) => {
    addUtilities({
      ".break-after-auto": { "break-after": "auto" },
      ".break-after-avoid": { "break-after": "avoid" },
      ".break-after-all": { "break-after": "all" },
      ".break-after-avoid-page": { "break-after": "avoid-page" },
      ".break-after-page": { "break-after": "page" },
      ".break-after-left": { "break-after": "left" },
      ".break-after-right": { "break-after": "right" },
      ".break-after-column": { "break-after": "column" }
    });
  },
  gridAutoColumns: createUtilityPlugin("gridAutoColumns", [["auto-cols", ["gridAutoColumns"]]]),
  gridAutoFlow: ({ addUtilities }) => {
    addUtilities({
      ".grid-flow-row": { gridAutoFlow: "row" },
      ".grid-flow-col": { gridAutoFlow: "column" },
      ".grid-flow-dense": { gridAutoFlow: "dense" },
      ".grid-flow-row-dense": { gridAutoFlow: "row dense" },
      ".grid-flow-col-dense": { gridAutoFlow: "column dense" }
    });
  },
  gridAutoRows: createUtilityPlugin("gridAutoRows", [["auto-rows", ["gridAutoRows"]]]),
  gridTemplateColumns: createUtilityPlugin("gridTemplateColumns", [
    ["grid-cols", ["gridTemplateColumns"]]
  ]),
  gridTemplateRows: createUtilityPlugin("gridTemplateRows", [["grid-rows", ["gridTemplateRows"]]]),
  flexDirection: ({ addUtilities }) => {
    addUtilities({
      ".flex-row": { "flex-direction": "row" },
      ".flex-row-reverse": { "flex-direction": "row-reverse" },
      ".flex-col": { "flex-direction": "column" },
      ".flex-col-reverse": { "flex-direction": "column-reverse" }
    });
  },
  flexWrap: ({ addUtilities }) => {
    addUtilities({
      ".flex-wrap": { "flex-wrap": "wrap" },
      ".flex-wrap-reverse": { "flex-wrap": "wrap-reverse" },
      ".flex-nowrap": { "flex-wrap": "nowrap" }
    });
  },
  placeContent: ({ addUtilities }) => {
    addUtilities({
      ".place-content-center": { "place-content": "center" },
      ".place-content-start": { "place-content": "start" },
      ".place-content-end": { "place-content": "end" },
      ".place-content-between": { "place-content": "space-between" },
      ".place-content-around": { "place-content": "space-around" },
      ".place-content-evenly": { "place-content": "space-evenly" },
      ".place-content-baseline": { "place-content": "baseline" },
      ".place-content-stretch": { "place-content": "stretch" }
    });
  },
  placeItems: ({ addUtilities }) => {
    addUtilities({
      ".place-items-start": { "place-items": "start" },
      ".place-items-end": { "place-items": "end" },
      ".place-items-center": { "place-items": "center" },
      ".place-items-baseline": { "place-items": "baseline" },
      ".place-items-stretch": { "place-items": "stretch" }
    });
  },
  alignContent: ({ addUtilities }) => {
    addUtilities({
      ".content-normal": { "align-content": "normal" },
      ".content-center": { "align-content": "center" },
      ".content-start": { "align-content": "flex-start" },
      ".content-end": { "align-content": "flex-end" },
      ".content-between": { "align-content": "space-between" },
      ".content-around": { "align-content": "space-around" },
      ".content-evenly": { "align-content": "space-evenly" },
      ".content-baseline": { "align-content": "baseline" },
      ".content-stretch": { "align-content": "stretch" }
    });
  },
  alignItems: ({ addUtilities }) => {
    addUtilities({
      ".items-start": { "align-items": "flex-start" },
      ".items-end": { "align-items": "flex-end" },
      ".items-center": { "align-items": "center" },
      ".items-baseline": { "align-items": "baseline" },
      ".items-stretch": { "align-items": "stretch" }
    });
  },
  justifyContent: ({ addUtilities }) => {
    addUtilities({
      ".justify-normal": { "justify-content": "normal" },
      ".justify-start": { "justify-content": "flex-start" },
      ".justify-end": { "justify-content": "flex-end" },
      ".justify-center": { "justify-content": "center" },
      ".justify-between": { "justify-content": "space-between" },
      ".justify-around": { "justify-content": "space-around" },
      ".justify-evenly": { "justify-content": "space-evenly" },
      ".justify-stretch": { "justify-content": "stretch" }
    });
  },
  justifyItems: ({ addUtilities }) => {
    addUtilities({
      ".justify-items-start": { "justify-items": "start" },
      ".justify-items-end": { "justify-items": "end" },
      ".justify-items-center": { "justify-items": "center" },
      ".justify-items-stretch": { "justify-items": "stretch" }
    });
  },
  gap: createUtilityPlugin("gap", [
    ["gap", ["gap"]],
    [
      ["gap-x", ["columnGap"]],
      ["gap-y", ["rowGap"]]
    ]
  ]),
  space: ({ matchUtilities, addUtilities, theme }) => {
    matchUtilities(
      {
        "space-x": (value2) => {
          value2 = value2 === "0" ? "0px" : value2;
          if (void 0) {
            return {
              "& > :not([hidden]) ~ :not([hidden])": {
                "--tw-space-x-reverse": "0",
                "margin-inline-end": `calc(${value2} * var(--tw-space-x-reverse))`,
                "margin-inline-start": `calc(${value2} * calc(1 - var(--tw-space-x-reverse)))`
              }
            };
          }
          return {
            "& > :not([hidden]) ~ :not([hidden])": {
              "--tw-space-x-reverse": "0",
              "margin-right": `calc(${value2} * var(--tw-space-x-reverse))`,
              "margin-left": `calc(${value2} * calc(1 - var(--tw-space-x-reverse)))`
            }
          };
        },
        "space-y": (value2) => {
          value2 = value2 === "0" ? "0px" : value2;
          return {
            "& > :not([hidden]) ~ :not([hidden])": {
              "--tw-space-y-reverse": "0",
              "margin-top": `calc(${value2} * calc(1 - var(--tw-space-y-reverse)))`,
              "margin-bottom": `calc(${value2} * var(--tw-space-y-reverse))`
            }
          };
        }
      },
      { values: theme("space"), supportsNegativeValues: true }
    );
    addUtilities({
      ".space-y-reverse > :not([hidden]) ~ :not([hidden])": { "--tw-space-y-reverse": "1" },
      ".space-x-reverse > :not([hidden]) ~ :not([hidden])": { "--tw-space-x-reverse": "1" }
    });
  },
  divideWidth: ({ matchUtilities, addUtilities, theme }) => {
    matchUtilities(
      {
        "divide-x": (value2) => {
          value2 = value2 === "0" ? "0px" : value2;
          if (void 0) {
            return {
              "& > :not([hidden]) ~ :not([hidden])": {
                "@defaults border-width": {},
                "--tw-divide-x-reverse": "0",
                "border-inline-end-width": `calc(${value2} * var(--tw-divide-x-reverse))`,
                "border-inline-start-width": `calc(${value2} * calc(1 - var(--tw-divide-x-reverse)))`
              }
            };
          }
          return {
            "& > :not([hidden]) ~ :not([hidden])": {
              "@defaults border-width": {},
              "--tw-divide-x-reverse": "0",
              "border-right-width": `calc(${value2} * var(--tw-divide-x-reverse))`,
              "border-left-width": `calc(${value2} * calc(1 - var(--tw-divide-x-reverse)))`
            }
          };
        },
        "divide-y": (value2) => {
          value2 = value2 === "0" ? "0px" : value2;
          return {
            "& > :not([hidden]) ~ :not([hidden])": {
              "@defaults border-width": {},
              "--tw-divide-y-reverse": "0",
              "border-top-width": `calc(${value2} * calc(1 - var(--tw-divide-y-reverse)))`,
              "border-bottom-width": `calc(${value2} * var(--tw-divide-y-reverse))`
            }
          };
        }
      },
      { values: theme("divideWidth"), type: ["line-width", "length", "any"] }
    );
    addUtilities({
      ".divide-y-reverse > :not([hidden]) ~ :not([hidden])": {
        "@defaults border-width": {},
        "--tw-divide-y-reverse": "1"
      },
      ".divide-x-reverse > :not([hidden]) ~ :not([hidden])": {
        "@defaults border-width": {},
        "--tw-divide-x-reverse": "1"
      }
    });
  },
  divideStyle: ({ addUtilities }) => {
    addUtilities({
      ".divide-solid > :not([hidden]) ~ :not([hidden])": { "border-style": "solid" },
      ".divide-dashed > :not([hidden]) ~ :not([hidden])": { "border-style": "dashed" },
      ".divide-dotted > :not([hidden]) ~ :not([hidden])": { "border-style": "dotted" },
      ".divide-double > :not([hidden]) ~ :not([hidden])": { "border-style": "double" },
      ".divide-none > :not([hidden]) ~ :not([hidden])": { "border-style": "none" }
    });
  },
  divideColor: ({ matchUtilities, theme, corePlugins: corePlugins2 }) => {
    matchUtilities(
      {
        divide: (value2) => {
          if (!corePlugins2("divideOpacity")) {
            return {
              ["& > :not([hidden]) ~ :not([hidden])"]: {
                "border-color": toColorValue(value2)
              }
            };
          }
          return {
            ["& > :not([hidden]) ~ :not([hidden])"]: withAlphaVariable({
              color: value2,
              property: "border-color",
              variable: "--tw-divide-opacity"
            })
          };
        }
      },
      {
        values: (({ DEFAULT: _, ...colors }) => colors)(flattenColorPalette_default(theme("divideColor"))),
        type: ["color", "any"]
      }
    );
  },
  divideOpacity: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        "divide-opacity": (value2) => {
          return { [`& > :not([hidden]) ~ :not([hidden])`]: { "--tw-divide-opacity": value2 } };
        }
      },
      { values: theme("divideOpacity") }
    );
  },
  placeSelf: ({ addUtilities }) => {
    addUtilities({
      ".place-self-auto": { "place-self": "auto" },
      ".place-self-start": { "place-self": "start" },
      ".place-self-end": { "place-self": "end" },
      ".place-self-center": { "place-self": "center" },
      ".place-self-stretch": { "place-self": "stretch" }
    });
  },
  alignSelf: ({ addUtilities }) => {
    addUtilities({
      ".self-auto": { "align-self": "auto" },
      ".self-start": { "align-self": "flex-start" },
      ".self-end": { "align-self": "flex-end" },
      ".self-center": { "align-self": "center" },
      ".self-stretch": { "align-self": "stretch" },
      ".self-baseline": { "align-self": "baseline" }
    });
  },
  justifySelf: ({ addUtilities }) => {
    addUtilities({
      ".justify-self-auto": { "justify-self": "auto" },
      ".justify-self-start": { "justify-self": "start" },
      ".justify-self-end": { "justify-self": "end" },
      ".justify-self-center": { "justify-self": "center" },
      ".justify-self-stretch": { "justify-self": "stretch" }
    });
  },
  overflow: ({ addUtilities }) => {
    addUtilities({
      ".overflow-auto": { overflow: "auto" },
      ".overflow-hidden": { overflow: "hidden" },
      ".overflow-clip": { overflow: "clip" },
      ".overflow-visible": { overflow: "visible" },
      ".overflow-scroll": { overflow: "scroll" },
      ".overflow-x-auto": { "overflow-x": "auto" },
      ".overflow-y-auto": { "overflow-y": "auto" },
      ".overflow-x-hidden": { "overflow-x": "hidden" },
      ".overflow-y-hidden": { "overflow-y": "hidden" },
      ".overflow-x-clip": { "overflow-x": "clip" },
      ".overflow-y-clip": { "overflow-y": "clip" },
      ".overflow-x-visible": { "overflow-x": "visible" },
      ".overflow-y-visible": { "overflow-y": "visible" },
      ".overflow-x-scroll": { "overflow-x": "scroll" },
      ".overflow-y-scroll": { "overflow-y": "scroll" }
    });
  },
  overscrollBehavior: ({ addUtilities }) => {
    addUtilities({
      ".overscroll-auto": { "overscroll-behavior": "auto" },
      ".overscroll-contain": { "overscroll-behavior": "contain" },
      ".overscroll-none": { "overscroll-behavior": "none" },
      ".overscroll-y-auto": { "overscroll-behavior-y": "auto" },
      ".overscroll-y-contain": { "overscroll-behavior-y": "contain" },
      ".overscroll-y-none": { "overscroll-behavior-y": "none" },
      ".overscroll-x-auto": { "overscroll-behavior-x": "auto" },
      ".overscroll-x-contain": { "overscroll-behavior-x": "contain" },
      ".overscroll-x-none": { "overscroll-behavior-x": "none" }
    });
  },
  scrollBehavior: ({ addUtilities }) => {
    addUtilities({
      ".scroll-auto": { "scroll-behavior": "auto" },
      ".scroll-smooth": { "scroll-behavior": "smooth" }
    });
  },
  textOverflow: ({ addUtilities }) => {
    addUtilities({
      ".truncate": { overflow: "hidden", "text-overflow": "ellipsis", "white-space": "nowrap" },
      ".overflow-ellipsis": { "text-overflow": "ellipsis" },
      ".text-ellipsis": { "text-overflow": "ellipsis" },
      ".text-clip": { "text-overflow": "clip" }
    });
  },
  hyphens: ({ addUtilities }) => {
    addUtilities({
      ".hyphens-none": { hyphens: "none" },
      ".hyphens-manual": { hyphens: "manual" },
      ".hyphens-auto": { hyphens: "auto" }
    });
  },
  whitespace: ({ addUtilities }) => {
    addUtilities({
      ".whitespace-normal": { "white-space": "normal" },
      ".whitespace-nowrap": { "white-space": "nowrap" },
      ".whitespace-pre": { "white-space": "pre" },
      ".whitespace-pre-line": { "white-space": "pre-line" },
      ".whitespace-pre-wrap": { "white-space": "pre-wrap" },
      ".whitespace-break-spaces": { "white-space": "break-spaces" }
    });
  },
  wordBreak: ({ addUtilities }) => {
    addUtilities({
      ".break-normal": { "overflow-wrap": "normal", "word-break": "normal" },
      ".break-words": { "overflow-wrap": "break-word" },
      ".break-all": { "word-break": "break-all" },
      ".break-keep": { "word-break": "keep-all" }
    });
  },
  borderRadius: createUtilityPlugin("borderRadius", [
    ["rounded", ["border-radius"]],
    [
      ["rounded-s", ["border-start-start-radius", "border-end-start-radius"]],
      ["rounded-e", ["border-start-end-radius", "border-end-end-radius"]],
      ["rounded-t", ["border-top-left-radius", "border-top-right-radius"]],
      ["rounded-r", ["border-top-right-radius", "border-bottom-right-radius"]],
      ["rounded-b", ["border-bottom-right-radius", "border-bottom-left-radius"]],
      ["rounded-l", ["border-top-left-radius", "border-bottom-left-radius"]]
    ],
    [
      ["rounded-ss", ["border-start-start-radius"]],
      ["rounded-se", ["border-start-end-radius"]],
      ["rounded-ee", ["border-end-end-radius"]],
      ["rounded-es", ["border-end-start-radius"]],
      ["rounded-tl", ["border-top-left-radius"]],
      ["rounded-tr", ["border-top-right-radius"]],
      ["rounded-br", ["border-bottom-right-radius"]],
      ["rounded-bl", ["border-bottom-left-radius"]]
    ]
  ]),
  borderWidth: createUtilityPlugin(
    "borderWidth",
    [
      ["border", [["@defaults border-width", {}], "border-width"]],
      [
        ["border-x", [["@defaults border-width", {}], "border-left-width", "border-right-width"]],
        ["border-y", [["@defaults border-width", {}], "border-top-width", "border-bottom-width"]]
      ],
      [
        ["border-s", [["@defaults border-width", {}], "border-inline-start-width"]],
        ["border-e", [["@defaults border-width", {}], "border-inline-end-width"]],
        ["border-t", [["@defaults border-width", {}], "border-top-width"]],
        ["border-r", [["@defaults border-width", {}], "border-right-width"]],
        ["border-b", [["@defaults border-width", {}], "border-bottom-width"]],
        ["border-l", [["@defaults border-width", {}], "border-left-width"]]
      ]
    ],
    { type: ["line-width", "length"] }
  ),
  borderStyle: ({ addUtilities }) => {
    addUtilities({
      ".border-solid": { "border-style": "solid" },
      ".border-dashed": { "border-style": "dashed" },
      ".border-dotted": { "border-style": "dotted" },
      ".border-double": { "border-style": "double" },
      ".border-hidden": { "border-style": "hidden" },
      ".border-none": { "border-style": "none" }
    });
  },
  borderColor: ({ matchUtilities, theme, corePlugins: corePlugins2 }) => {
    matchUtilities(
      {
        border: (value2) => {
          if (!corePlugins2("borderOpacity")) {
            return {
              "border-color": toColorValue(value2)
            };
          }
          return withAlphaVariable({
            color: value2,
            property: "border-color",
            variable: "--tw-border-opacity"
          });
        }
      },
      {
        values: (({ DEFAULT: _, ...colors }) => colors)(flattenColorPalette_default(theme("borderColor"))),
        type: ["color", "any"]
      }
    );
    matchUtilities(
      {
        "border-x": (value2) => {
          if (!corePlugins2("borderOpacity")) {
            return {
              "border-left-color": toColorValue(value2),
              "border-right-color": toColorValue(value2)
            };
          }
          return withAlphaVariable({
            color: value2,
            property: ["border-left-color", "border-right-color"],
            variable: "--tw-border-opacity"
          });
        },
        "border-y": (value2) => {
          if (!corePlugins2("borderOpacity")) {
            return {
              "border-top-color": toColorValue(value2),
              "border-bottom-color": toColorValue(value2)
            };
          }
          return withAlphaVariable({
            color: value2,
            property: ["border-top-color", "border-bottom-color"],
            variable: "--tw-border-opacity"
          });
        }
      },
      {
        values: (({ DEFAULT: _, ...colors }) => colors)(flattenColorPalette_default(theme("borderColor"))),
        type: ["color", "any"]
      }
    );
    matchUtilities(
      {
        "border-s": (value2) => {
          if (!corePlugins2("borderOpacity")) {
            return {
              "border-inline-start-color": toColorValue(value2)
            };
          }
          return withAlphaVariable({
            color: value2,
            property: "border-inline-start-color",
            variable: "--tw-border-opacity"
          });
        },
        "border-e": (value2) => {
          if (!corePlugins2("borderOpacity")) {
            return {
              "border-inline-end-color": toColorValue(value2)
            };
          }
          return withAlphaVariable({
            color: value2,
            property: "border-inline-end-color",
            variable: "--tw-border-opacity"
          });
        },
        "border-t": (value2) => {
          if (!corePlugins2("borderOpacity")) {
            return {
              "border-top-color": toColorValue(value2)
            };
          }
          return withAlphaVariable({
            color: value2,
            property: "border-top-color",
            variable: "--tw-border-opacity"
          });
        },
        "border-r": (value2) => {
          if (!corePlugins2("borderOpacity")) {
            return {
              "border-right-color": toColorValue(value2)
            };
          }
          return withAlphaVariable({
            color: value2,
            property: "border-right-color",
            variable: "--tw-border-opacity"
          });
        },
        "border-b": (value2) => {
          if (!corePlugins2("borderOpacity")) {
            return {
              "border-bottom-color": toColorValue(value2)
            };
          }
          return withAlphaVariable({
            color: value2,
            property: "border-bottom-color",
            variable: "--tw-border-opacity"
          });
        },
        "border-l": (value2) => {
          if (!corePlugins2("borderOpacity")) {
            return {
              "border-left-color": toColorValue(value2)
            };
          }
          return withAlphaVariable({
            color: value2,
            property: "border-left-color",
            variable: "--tw-border-opacity"
          });
        }
      },
      {
        values: (({ DEFAULT: _, ...colors }) => colors)(flattenColorPalette_default(theme("borderColor"))),
        type: ["color", "any"]
      }
    );
  },
  borderOpacity: createUtilityPlugin("borderOpacity", [
    ["border-opacity", ["--tw-border-opacity"]]
  ]),
  backgroundColor: ({ matchUtilities, theme, corePlugins: corePlugins2 }) => {
    matchUtilities(
      {
        bg: (value2) => {
          if (!corePlugins2("backgroundOpacity")) {
            return {
              "background-color": toColorValue(value2)
            };
          }
          return withAlphaVariable({
            color: value2,
            property: "background-color",
            variable: "--tw-bg-opacity"
          });
        }
      },
      { values: flattenColorPalette_default(theme("backgroundColor")), type: ["color", "any"] }
    );
  },
  backgroundOpacity: createUtilityPlugin("backgroundOpacity", [
    ["bg-opacity", ["--tw-bg-opacity"]]
  ]),
  backgroundImage: createUtilityPlugin("backgroundImage", [["bg", ["background-image"]]], {
    type: ["lookup", "image", "url"]
  }),
  gradientColorStops: (() => {
    function transparentTo(value2) {
      return withAlphaValue(value2, 0, "rgb(255 255 255 / 0)");
    }
    return function({ matchUtilities, theme, addDefaults }) {
      addDefaults("gradient-color-stops", {
        "--tw-gradient-from-position": " ",
        "--tw-gradient-via-position": " ",
        "--tw-gradient-to-position": " "
      });
      let options = {
        values: flattenColorPalette_default(theme("gradientColorStops")),
        type: ["color", "any"]
      };
      let positionOptions = {
        values: theme("gradientColorStopPositions"),
        type: ["length", "percentage"]
      };
      matchUtilities(
        {
          from: (value2) => {
            let transparentToValue = transparentTo(value2);
            return {
              "@defaults gradient-color-stops": {},
              "--tw-gradient-from": `${toColorValue(value2)} var(--tw-gradient-from-position)`,
              "--tw-gradient-to": `${transparentToValue} var(--tw-gradient-to-position)`,
              "--tw-gradient-stops": `var(--tw-gradient-from), var(--tw-gradient-to)`
            };
          }
        },
        options
      );
      matchUtilities(
        {
          from: (value2) => {
            return {
              "--tw-gradient-from-position": value2
            };
          }
        },
        positionOptions
      );
      matchUtilities(
        {
          via: (value2) => {
            let transparentToValue = transparentTo(value2);
            return {
              "@defaults gradient-color-stops": {},
              "--tw-gradient-to": `${transparentToValue}  var(--tw-gradient-to-position)`,
              "--tw-gradient-stops": `var(--tw-gradient-from), ${toColorValue(
                value2
              )} var(--tw-gradient-via-position), var(--tw-gradient-to)`
            };
          }
        },
        options
      );
      matchUtilities(
        {
          via: (value2) => {
            return {
              "--tw-gradient-via-position": value2
            };
          }
        },
        positionOptions
      );
      matchUtilities(
        {
          to: (value2) => ({
            "@defaults gradient-color-stops": {},
            "--tw-gradient-to": `${toColorValue(value2)} var(--tw-gradient-to-position)`
          })
        },
        options
      );
      matchUtilities(
        {
          to: (value2) => {
            return {
              "--tw-gradient-to-position": value2
            };
          }
        },
        positionOptions
      );
    };
  })(),
  boxDecorationBreak: ({ addUtilities }) => {
    addUtilities({
      ".decoration-slice": { "box-decoration-break": "slice" },
      ".decoration-clone": { "box-decoration-break": "clone" },
      ".box-decoration-slice": { "box-decoration-break": "slice" },
      ".box-decoration-clone": { "box-decoration-break": "clone" }
    });
  },
  backgroundSize: createUtilityPlugin("backgroundSize", [["bg", ["background-size"]]], {
    type: ["lookup", "length", "percentage", "size"]
  }),
  backgroundAttachment: ({ addUtilities }) => {
    addUtilities({
      ".bg-fixed": { "background-attachment": "fixed" },
      ".bg-local": { "background-attachment": "local" },
      ".bg-scroll": { "background-attachment": "scroll" }
    });
  },
  backgroundClip: ({ addUtilities }) => {
    addUtilities({
      ".bg-clip-border": { "background-clip": "border-box" },
      ".bg-clip-padding": { "background-clip": "padding-box" },
      ".bg-clip-content": { "background-clip": "content-box" },
      ".bg-clip-text": { "background-clip": "text" }
    });
  },
  backgroundPosition: createUtilityPlugin("backgroundPosition", [["bg", ["background-position"]]], {
    type: ["lookup", ["position", { preferOnConflict: true }]]
  }),
  backgroundRepeat: ({ addUtilities }) => {
    addUtilities({
      ".bg-repeat": { "background-repeat": "repeat" },
      ".bg-no-repeat": { "background-repeat": "no-repeat" },
      ".bg-repeat-x": { "background-repeat": "repeat-x" },
      ".bg-repeat-y": { "background-repeat": "repeat-y" },
      ".bg-repeat-round": { "background-repeat": "round" },
      ".bg-repeat-space": { "background-repeat": "space" }
    });
  },
  backgroundOrigin: ({ addUtilities }) => {
    addUtilities({
      ".bg-origin-border": { "background-origin": "border-box" },
      ".bg-origin-padding": { "background-origin": "padding-box" },
      ".bg-origin-content": { "background-origin": "content-box" }
    });
  },
  fill: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        fill: (value2) => {
          return { fill: toColorValue(value2) };
        }
      },
      { values: flattenColorPalette_default(theme("fill")), type: ["color", "any"] }
    );
  },
  stroke: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        stroke: (value2) => {
          return { stroke: toColorValue(value2) };
        }
      },
      { values: flattenColorPalette_default(theme("stroke")), type: ["color", "url", "any"] }
    );
  },
  strokeWidth: createUtilityPlugin("strokeWidth", [["stroke", ["stroke-width"]]], {
    type: ["length", "number", "percentage"]
  }),
  objectFit: ({ addUtilities }) => {
    addUtilities({
      ".object-contain": { "object-fit": "contain" },
      ".object-cover": { "object-fit": "cover" },
      ".object-fill": { "object-fit": "fill" },
      ".object-none": { "object-fit": "none" },
      ".object-scale-down": { "object-fit": "scale-down" }
    });
  },
  objectPosition: createUtilityPlugin("objectPosition", [["object", ["object-position"]]]),
  padding: createUtilityPlugin("padding", [
    ["p", ["padding"]],
    [
      ["px", ["padding-left", "padding-right"]],
      ["py", ["padding-top", "padding-bottom"]]
    ],
    [
      ["ps", ["padding-inline-start"]],
      ["pe", ["padding-inline-end"]],
      ["pt", ["padding-top"]],
      ["pr", ["padding-right"]],
      ["pb", ["padding-bottom"]],
      ["pl", ["padding-left"]]
    ]
  ]),
  textAlign: ({ addUtilities }) => {
    addUtilities({
      ".text-left": { "text-align": "left" },
      ".text-center": { "text-align": "center" },
      ".text-right": { "text-align": "right" },
      ".text-justify": { "text-align": "justify" },
      ".text-start": { "text-align": "start" },
      ".text-end": { "text-align": "end" }
    });
  },
  textIndent: createUtilityPlugin("textIndent", [["indent", ["text-indent"]]], {
    supportsNegativeValues: true
  }),
  verticalAlign: ({ addUtilities, matchUtilities }) => {
    addUtilities({
      ".align-baseline": { "vertical-align": "baseline" },
      ".align-top": { "vertical-align": "top" },
      ".align-middle": { "vertical-align": "middle" },
      ".align-bottom": { "vertical-align": "bottom" },
      ".align-text-top": { "vertical-align": "text-top" },
      ".align-text-bottom": { "vertical-align": "text-bottom" },
      ".align-sub": { "vertical-align": "sub" },
      ".align-super": { "vertical-align": "super" }
    });
    matchUtilities({ align: (value2) => ({ "vertical-align": value2 }) });
  },
  fontFamily: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        font: (value2) => {
          let [families, options = {}] = Array.isArray(value2) && isPlainObject(value2[1]) ? value2 : [value2];
          let { fontFeatureSettings, fontVariationSettings } = options;
          return {
            "font-family": Array.isArray(families) ? families.join(", ") : families,
            ...fontFeatureSettings === void 0 ? {} : { "font-feature-settings": fontFeatureSettings },
            ...fontVariationSettings === void 0 ? {} : { "font-variation-settings": fontVariationSettings }
          };
        }
      },
      {
        values: theme("fontFamily"),
        type: ["lookup", "generic-name", "family-name"]
      }
    );
  },
  fontSize: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        text: (value2, { modifier }) => {
          let [fontSize, options] = Array.isArray(value2) ? value2 : [value2];
          if (modifier) {
            return {
              "font-size": fontSize,
              "line-height": modifier
            };
          }
          let { lineHeight, letterSpacing, fontWeight } = isPlainObject(options) ? options : { lineHeight: options };
          return {
            "font-size": fontSize,
            ...lineHeight === void 0 ? {} : { "line-height": lineHeight },
            ...letterSpacing === void 0 ? {} : { "letter-spacing": letterSpacing },
            ...fontWeight === void 0 ? {} : { "font-weight": fontWeight }
          };
        }
      },
      {
        values: theme("fontSize"),
        modifiers: theme("lineHeight"),
        type: ["absolute-size", "relative-size", "length", "percentage"]
      }
    );
  },
  fontWeight: createUtilityPlugin("fontWeight", [["font", ["fontWeight"]]], {
    type: ["lookup", "number", "any"]
  }),
  textTransform: ({ addUtilities }) => {
    addUtilities({
      ".uppercase": { "text-transform": "uppercase" },
      ".lowercase": { "text-transform": "lowercase" },
      ".capitalize": { "text-transform": "capitalize" },
      ".normal-case": { "text-transform": "none" }
    });
  },
  fontStyle: ({ addUtilities }) => {
    addUtilities({
      ".italic": { "font-style": "italic" },
      ".not-italic": { "font-style": "normal" }
    });
  },
  fontVariantNumeric: ({ addDefaults, addUtilities }) => {
    let cssFontVariantNumericValue = "var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction)";
    addDefaults("font-variant-numeric", {
      "--tw-ordinal": " ",
      "--tw-slashed-zero": " ",
      "--tw-numeric-figure": " ",
      "--tw-numeric-spacing": " ",
      "--tw-numeric-fraction": " "
    });
    addUtilities({
      ".normal-nums": { "font-variant-numeric": "normal" },
      ".ordinal": {
        "@defaults font-variant-numeric": {},
        "--tw-ordinal": "ordinal",
        "font-variant-numeric": cssFontVariantNumericValue
      },
      ".slashed-zero": {
        "@defaults font-variant-numeric": {},
        "--tw-slashed-zero": "slashed-zero",
        "font-variant-numeric": cssFontVariantNumericValue
      },
      ".lining-nums": {
        "@defaults font-variant-numeric": {},
        "--tw-numeric-figure": "lining-nums",
        "font-variant-numeric": cssFontVariantNumericValue
      },
      ".oldstyle-nums": {
        "@defaults font-variant-numeric": {},
        "--tw-numeric-figure": "oldstyle-nums",
        "font-variant-numeric": cssFontVariantNumericValue
      },
      ".proportional-nums": {
        "@defaults font-variant-numeric": {},
        "--tw-numeric-spacing": "proportional-nums",
        "font-variant-numeric": cssFontVariantNumericValue
      },
      ".tabular-nums": {
        "@defaults font-variant-numeric": {},
        "--tw-numeric-spacing": "tabular-nums",
        "font-variant-numeric": cssFontVariantNumericValue
      },
      ".diagonal-fractions": {
        "@defaults font-variant-numeric": {},
        "--tw-numeric-fraction": "diagonal-fractions",
        "font-variant-numeric": cssFontVariantNumericValue
      },
      ".stacked-fractions": {
        "@defaults font-variant-numeric": {},
        "--tw-numeric-fraction": "stacked-fractions",
        "font-variant-numeric": cssFontVariantNumericValue
      }
    });
  },
  lineHeight: createUtilityPlugin("lineHeight", [["leading", ["lineHeight"]]]),
  letterSpacing: createUtilityPlugin("letterSpacing", [["tracking", ["letterSpacing"]]], {
    supportsNegativeValues: true
  }),
  textColor: ({ matchUtilities, theme, corePlugins: corePlugins2 }) => {
    matchUtilities(
      {
        text: (value2) => {
          if (!corePlugins2("textOpacity")) {
            return { color: toColorValue(value2) };
          }
          return withAlphaVariable({
            color: value2,
            property: "color",
            variable: "--tw-text-opacity"
          });
        }
      },
      { values: flattenColorPalette_default(theme("textColor")), type: ["color", "any"] }
    );
  },
  textOpacity: createUtilityPlugin("textOpacity", [["text-opacity", ["--tw-text-opacity"]]]),
  textDecoration: ({ addUtilities }) => {
    addUtilities({
      ".underline": { "text-decoration-line": "underline" },
      ".overline": { "text-decoration-line": "overline" },
      ".line-through": { "text-decoration-line": "line-through" },
      ".no-underline": { "text-decoration-line": "none" }
    });
  },
  textDecorationColor: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        decoration: (value2) => {
          return { "text-decoration-color": toColorValue(value2) };
        }
      },
      { values: flattenColorPalette_default(theme("textDecorationColor")), type: ["color", "any"] }
    );
  },
  textDecorationStyle: ({ addUtilities }) => {
    addUtilities({
      ".decoration-solid": { "text-decoration-style": "solid" },
      ".decoration-double": { "text-decoration-style": "double" },
      ".decoration-dotted": { "text-decoration-style": "dotted" },
      ".decoration-dashed": { "text-decoration-style": "dashed" },
      ".decoration-wavy": { "text-decoration-style": "wavy" }
    });
  },
  textDecorationThickness: createUtilityPlugin(
    "textDecorationThickness",
    [["decoration", ["text-decoration-thickness"]]],
    { type: ["length", "percentage"] }
  ),
  textUnderlineOffset: createUtilityPlugin(
    "textUnderlineOffset",
    [["underline-offset", ["text-underline-offset"]]],
    { type: ["length", "percentage", "any"] }
  ),
  fontSmoothing: ({ addUtilities }) => {
    addUtilities({
      ".antialiased": {
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale"
      },
      ".subpixel-antialiased": {
        "-webkit-font-smoothing": "auto",
        "-moz-osx-font-smoothing": "auto"
      }
    });
  },
  placeholderColor: ({ matchUtilities, theme, corePlugins: corePlugins2 }) => {
    matchUtilities(
      {
        placeholder: (value2) => {
          if (!corePlugins2("placeholderOpacity")) {
            return {
              "&::placeholder": {
                color: toColorValue(value2)
              }
            };
          }
          return {
            "&::placeholder": withAlphaVariable({
              color: value2,
              property: "color",
              variable: "--tw-placeholder-opacity"
            })
          };
        }
      },
      { values: flattenColorPalette_default(theme("placeholderColor")), type: ["color", "any"] }
    );
  },
  placeholderOpacity: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        "placeholder-opacity": (value2) => {
          return { ["&::placeholder"]: { "--tw-placeholder-opacity": value2 } };
        }
      },
      { values: theme("placeholderOpacity") }
    );
  },
  caretColor: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        caret: (value2) => {
          return { "caret-color": toColorValue(value2) };
        }
      },
      { values: flattenColorPalette_default(theme("caretColor")), type: ["color", "any"] }
    );
  },
  accentColor: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        accent: (value2) => {
          return { "accent-color": toColorValue(value2) };
        }
      },
      { values: flattenColorPalette_default(theme("accentColor")), type: ["color", "any"] }
    );
  },
  opacity: createUtilityPlugin("opacity", [["opacity", ["opacity"]]]),
  backgroundBlendMode: ({ addUtilities }) => {
    addUtilities({
      ".bg-blend-normal": { "background-blend-mode": "normal" },
      ".bg-blend-multiply": { "background-blend-mode": "multiply" },
      ".bg-blend-screen": { "background-blend-mode": "screen" },
      ".bg-blend-overlay": { "background-blend-mode": "overlay" },
      ".bg-blend-darken": { "background-blend-mode": "darken" },
      ".bg-blend-lighten": { "background-blend-mode": "lighten" },
      ".bg-blend-color-dodge": { "background-blend-mode": "color-dodge" },
      ".bg-blend-color-burn": { "background-blend-mode": "color-burn" },
      ".bg-blend-hard-light": { "background-blend-mode": "hard-light" },
      ".bg-blend-soft-light": { "background-blend-mode": "soft-light" },
      ".bg-blend-difference": { "background-blend-mode": "difference" },
      ".bg-blend-exclusion": { "background-blend-mode": "exclusion" },
      ".bg-blend-hue": { "background-blend-mode": "hue" },
      ".bg-blend-saturation": { "background-blend-mode": "saturation" },
      ".bg-blend-color": { "background-blend-mode": "color" },
      ".bg-blend-luminosity": { "background-blend-mode": "luminosity" }
    });
  },
  mixBlendMode: ({ addUtilities }) => {
    addUtilities({
      ".mix-blend-normal": { "mix-blend-mode": "normal" },
      ".mix-blend-multiply": { "mix-blend-mode": "multiply" },
      ".mix-blend-screen": { "mix-blend-mode": "screen" },
      ".mix-blend-overlay": { "mix-blend-mode": "overlay" },
      ".mix-blend-darken": { "mix-blend-mode": "darken" },
      ".mix-blend-lighten": { "mix-blend-mode": "lighten" },
      ".mix-blend-color-dodge": { "mix-blend-mode": "color-dodge" },
      ".mix-blend-color-burn": { "mix-blend-mode": "color-burn" },
      ".mix-blend-hard-light": { "mix-blend-mode": "hard-light" },
      ".mix-blend-soft-light": { "mix-blend-mode": "soft-light" },
      ".mix-blend-difference": { "mix-blend-mode": "difference" },
      ".mix-blend-exclusion": { "mix-blend-mode": "exclusion" },
      ".mix-blend-hue": { "mix-blend-mode": "hue" },
      ".mix-blend-saturation": { "mix-blend-mode": "saturation" },
      ".mix-blend-color": { "mix-blend-mode": "color" },
      ".mix-blend-luminosity": { "mix-blend-mode": "luminosity" },
      ".mix-blend-plus-lighter": { "mix-blend-mode": "plus-lighter" }
    });
  },
  boxShadow: (() => {
    let transformValue = transformThemeValue("boxShadow");
    let defaultBoxShadow = [
      `var(--tw-ring-offset-shadow, 0 0 #0000)`,
      `var(--tw-ring-shadow, 0 0 #0000)`,
      `var(--tw-shadow)`
    ].join(", ");
    return function({ matchUtilities, addDefaults, theme }) {
      addDefaults(" box-shadow", {
        "--tw-ring-offset-shadow": "0 0 #0000",
        "--tw-ring-shadow": "0 0 #0000",
        "--tw-shadow": "0 0 #0000",
        "--tw-shadow-colored": "0 0 #0000"
      });
      matchUtilities(
        {
          shadow: (value2) => {
            value2 = transformValue(value2);
            let ast = parseBoxShadowValue(value2);
            for (let shadow2 of ast) {
              if (!shadow2.valid) {
                continue;
              }
              shadow2.color = "var(--tw-shadow-color)";
            }
            return {
              "@defaults box-shadow": {},
              "--tw-shadow": value2 === "none" ? "0 0 #0000" : value2,
              "--tw-shadow-colored": value2 === "none" ? "0 0 #0000" : formatBoxShadowValue(ast),
              "box-shadow": defaultBoxShadow
            };
          }
        },
        { values: theme("boxShadow"), type: ["shadow"] }
      );
    };
  })(),
  boxShadowColor: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        shadow: (value2) => {
          return {
            "--tw-shadow-color": toColorValue(value2),
            "--tw-shadow": "var(--tw-shadow-colored)"
          };
        }
      },
      { values: flattenColorPalette_default(theme("boxShadowColor")), type: ["color", "any"] }
    );
  },
  outlineStyle: ({ addUtilities }) => {
    addUtilities({
      ".outline-none": {
        outline: "2px solid transparent",
        "outline-offset": "2px"
      },
      ".outline": { "outline-style": "solid" },
      ".outline-dashed": { "outline-style": "dashed" },
      ".outline-dotted": { "outline-style": "dotted" },
      ".outline-double": { "outline-style": "double" }
    });
  },
  outlineWidth: createUtilityPlugin("outlineWidth", [["outline", ["outline-width"]]], {
    type: ["length", "number", "percentage"]
  }),
  outlineOffset: createUtilityPlugin("outlineOffset", [["outline-offset", ["outline-offset"]]], {
    type: ["length", "number", "percentage", "any"],
    supportsNegativeValues: true
  }),
  outlineColor: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        outline: (value2) => {
          return { "outline-color": toColorValue(value2) };
        }
      },
      { values: flattenColorPalette_default(theme("outlineColor")), type: ["color", "any"] }
    );
  },
  ringWidth: ({ matchUtilities, addDefaults, addUtilities, theme, config }) => {
    let ringColorDefault = (() => {
      var _a, _b;
      if (flagEnabled(config(), "respectDefaultRingColorOpacity")) {
        return theme("ringColor.DEFAULT");
      }
      let ringOpacityDefault = theme("ringOpacity.DEFAULT", "0.5");
      if (!((_a = theme("ringColor")) == null ? void 0 : _a.DEFAULT)) {
        return `rgb(147 197 253 / ${ringOpacityDefault})`;
      }
      return withAlphaValue(
        (_b = theme("ringColor")) == null ? void 0 : _b.DEFAULT,
        ringOpacityDefault,
        `rgb(147 197 253 / ${ringOpacityDefault})`
      );
    })();
    addDefaults("ring-width", {
      "--tw-ring-inset": " ",
      "--tw-ring-offset-width": theme("ringOffsetWidth.DEFAULT", "0px"),
      "--tw-ring-offset-color": theme("ringOffsetColor.DEFAULT", "#fff"),
      "--tw-ring-color": ringColorDefault,
      "--tw-ring-offset-shadow": "0 0 #0000",
      "--tw-ring-shadow": "0 0 #0000",
      "--tw-shadow": "0 0 #0000",
      "--tw-shadow-colored": "0 0 #0000"
    });
    matchUtilities(
      {
        ring: (value2) => {
          return {
            "@defaults ring-width": {},
            "--tw-ring-offset-shadow": `var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)`,
            "--tw-ring-shadow": `var(--tw-ring-inset) 0 0 0 calc(${value2} + var(--tw-ring-offset-width)) var(--tw-ring-color)`,
            "box-shadow": [
              `var(--tw-ring-offset-shadow)`,
              `var(--tw-ring-shadow)`,
              `var(--tw-shadow, 0 0 #0000)`
            ].join(", ")
          };
        }
      },
      { values: theme("ringWidth"), type: "length" }
    );
    addUtilities({
      ".ring-inset": { "@defaults ring-width": {}, "--tw-ring-inset": "inset" }
    });
  },
  ringColor: ({ matchUtilities, theme, corePlugins: corePlugins2 }) => {
    matchUtilities(
      {
        ring: (value2) => {
          if (!corePlugins2("ringOpacity")) {
            return {
              "--tw-ring-color": toColorValue(value2)
            };
          }
          return withAlphaVariable({
            color: value2,
            property: "--tw-ring-color",
            variable: "--tw-ring-opacity"
          });
        }
      },
      {
        values: Object.fromEntries(
          Object.entries(flattenColorPalette_default(theme("ringColor"))).filter(
            ([modifier]) => modifier !== "DEFAULT"
          )
        ),
        type: ["color", "any"]
      }
    );
  },
  ringOpacity: (helpers) => {
    let { config } = helpers;
    return createUtilityPlugin("ringOpacity", [["ring-opacity", ["--tw-ring-opacity"]]], {
      filterDefault: !flagEnabled(config(), "respectDefaultRingColorOpacity")
    })(helpers);
  },
  ringOffsetWidth: createUtilityPlugin(
    "ringOffsetWidth",
    [["ring-offset", ["--tw-ring-offset-width"]]],
    { type: "length" }
  ),
  ringOffsetColor: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        "ring-offset": (value2) => {
          return {
            "--tw-ring-offset-color": toColorValue(value2)
          };
        }
      },
      { values: flattenColorPalette_default(theme("ringOffsetColor")), type: ["color", "any"] }
    );
  },
  blur: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        blur: (value2) => {
          return {
            "--tw-blur": `blur(${value2})`,
            "@defaults filter": {},
            filter: cssFilterValue
          };
        }
      },
      { values: theme("blur") }
    );
  },
  brightness: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        brightness: (value2) => {
          return {
            "--tw-brightness": `brightness(${value2})`,
            "@defaults filter": {},
            filter: cssFilterValue
          };
        }
      },
      { values: theme("brightness") }
    );
  },
  contrast: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        contrast: (value2) => {
          return {
            "--tw-contrast": `contrast(${value2})`,
            "@defaults filter": {},
            filter: cssFilterValue
          };
        }
      },
      { values: theme("contrast") }
    );
  },
  dropShadow: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        "drop-shadow": (value2) => {
          return {
            "--tw-drop-shadow": Array.isArray(value2) ? value2.map((v) => `drop-shadow(${v})`).join(" ") : `drop-shadow(${value2})`,
            "@defaults filter": {},
            filter: cssFilterValue
          };
        }
      },
      { values: theme("dropShadow") }
    );
  },
  grayscale: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        grayscale: (value2) => {
          return {
            "--tw-grayscale": `grayscale(${value2})`,
            "@defaults filter": {},
            filter: cssFilterValue
          };
        }
      },
      { values: theme("grayscale") }
    );
  },
  hueRotate: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        "hue-rotate": (value2) => {
          return {
            "--tw-hue-rotate": `hue-rotate(${value2})`,
            "@defaults filter": {},
            filter: cssFilterValue
          };
        }
      },
      { values: theme("hueRotate"), supportsNegativeValues: true }
    );
  },
  invert: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        invert: (value2) => {
          return {
            "--tw-invert": `invert(${value2})`,
            "@defaults filter": {},
            filter: cssFilterValue
          };
        }
      },
      { values: theme("invert") }
    );
  },
  saturate: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        saturate: (value2) => {
          return {
            "--tw-saturate": `saturate(${value2})`,
            "@defaults filter": {},
            filter: cssFilterValue
          };
        }
      },
      { values: theme("saturate") }
    );
  },
  sepia: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        sepia: (value2) => {
          return {
            "--tw-sepia": `sepia(${value2})`,
            "@defaults filter": {},
            filter: cssFilterValue
          };
        }
      },
      { values: theme("sepia") }
    );
  },
  filter: ({ addDefaults, addUtilities }) => {
    addDefaults("filter", {
      "--tw-blur": " ",
      "--tw-brightness": " ",
      "--tw-contrast": " ",
      "--tw-grayscale": " ",
      "--tw-hue-rotate": " ",
      "--tw-invert": " ",
      "--tw-saturate": " ",
      "--tw-sepia": " ",
      "--tw-drop-shadow": " "
    });
    addUtilities({
      ".filter": { "@defaults filter": {}, filter: cssFilterValue },
      ".filter-none": { filter: "none" }
    });
  },
  backdropBlur: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        "backdrop-blur": (value2) => {
          return {
            "--tw-backdrop-blur": `blur(${value2})`,
            "@defaults backdrop-filter": {},
            "backdrop-filter": cssBackdropFilterValue
          };
        }
      },
      { values: theme("backdropBlur") }
    );
  },
  backdropBrightness: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        "backdrop-brightness": (value2) => {
          return {
            "--tw-backdrop-brightness": `brightness(${value2})`,
            "@defaults backdrop-filter": {},
            "backdrop-filter": cssBackdropFilterValue
          };
        }
      },
      { values: theme("backdropBrightness") }
    );
  },
  backdropContrast: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        "backdrop-contrast": (value2) => {
          return {
            "--tw-backdrop-contrast": `contrast(${value2})`,
            "@defaults backdrop-filter": {},
            "backdrop-filter": cssBackdropFilterValue
          };
        }
      },
      { values: theme("backdropContrast") }
    );
  },
  backdropGrayscale: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        "backdrop-grayscale": (value2) => {
          return {
            "--tw-backdrop-grayscale": `grayscale(${value2})`,
            "@defaults backdrop-filter": {},
            "backdrop-filter": cssBackdropFilterValue
          };
        }
      },
      { values: theme("backdropGrayscale") }
    );
  },
  backdropHueRotate: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        "backdrop-hue-rotate": (value2) => {
          return {
            "--tw-backdrop-hue-rotate": `hue-rotate(${value2})`,
            "@defaults backdrop-filter": {},
            "backdrop-filter": cssBackdropFilterValue
          };
        }
      },
      { values: theme("backdropHueRotate"), supportsNegativeValues: true }
    );
  },
  backdropInvert: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        "backdrop-invert": (value2) => {
          return {
            "--tw-backdrop-invert": `invert(${value2})`,
            "@defaults backdrop-filter": {},
            "backdrop-filter": cssBackdropFilterValue
          };
        }
      },
      { values: theme("backdropInvert") }
    );
  },
  backdropOpacity: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        "backdrop-opacity": (value2) => {
          return {
            "--tw-backdrop-opacity": `opacity(${value2})`,
            "@defaults backdrop-filter": {},
            "backdrop-filter": cssBackdropFilterValue
          };
        }
      },
      { values: theme("backdropOpacity") }
    );
  },
  backdropSaturate: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        "backdrop-saturate": (value2) => {
          return {
            "--tw-backdrop-saturate": `saturate(${value2})`,
            "@defaults backdrop-filter": {},
            "backdrop-filter": cssBackdropFilterValue
          };
        }
      },
      { values: theme("backdropSaturate") }
    );
  },
  backdropSepia: ({ matchUtilities, theme }) => {
    matchUtilities(
      {
        "backdrop-sepia": (value2) => {
          return {
            "--tw-backdrop-sepia": `sepia(${value2})`,
            "@defaults backdrop-filter": {},
            "backdrop-filter": cssBackdropFilterValue
          };
        }
      },
      { values: theme("backdropSepia") }
    );
  },
  backdropFilter: ({ addDefaults, addUtilities }) => {
    addDefaults("backdrop-filter", {
      "--tw-backdrop-blur": " ",
      "--tw-backdrop-brightness": " ",
      "--tw-backdrop-contrast": " ",
      "--tw-backdrop-grayscale": " ",
      "--tw-backdrop-hue-rotate": " ",
      "--tw-backdrop-invert": " ",
      "--tw-backdrop-opacity": " ",
      "--tw-backdrop-saturate": " ",
      "--tw-backdrop-sepia": " "
    });
    addUtilities({
      ".backdrop-filter": {
        "@defaults backdrop-filter": {},
        "backdrop-filter": cssBackdropFilterValue
      },
      ".backdrop-filter-none": { "backdrop-filter": "none" }
    });
  },
  transitionProperty: ({ matchUtilities, theme }) => {
    let defaultTimingFunction = theme("transitionTimingFunction.DEFAULT");
    let defaultDuration = theme("transitionDuration.DEFAULT");
    matchUtilities(
      {
        transition: (value2) => {
          return {
            "transition-property": value2,
            ...value2 === "none" ? {} : {
              "transition-timing-function": defaultTimingFunction,
              "transition-duration": defaultDuration
            }
          };
        }
      },
      { values: theme("transitionProperty") }
    );
  },
  transitionDelay: createUtilityPlugin("transitionDelay", [["delay", ["transitionDelay"]]]),
  transitionDuration: createUtilityPlugin(
    "transitionDuration",
    [["duration", ["transitionDuration"]]],
    { filterDefault: true }
  ),
  transitionTimingFunction: createUtilityPlugin(
    "transitionTimingFunction",
    [["ease", ["transitionTimingFunction"]]],
    { filterDefault: true }
  ),
  willChange: createUtilityPlugin("willChange", [["will-change", ["will-change"]]]),
  content: createUtilityPlugin("content", [
    ["content", ["--tw-content", ["content", "var(--tw-content)"]]]
  ])
};

// node_modules/tailwindcss/src/util/toPath.js
function toPath(path) {
  if (Array.isArray(path))
    return path;
  let openBrackets = path.split("[").length - 1;
  let closedBrackets = path.split("]").length - 1;
  if (openBrackets !== closedBrackets) {
    throw new Error(`Path is invalid. Has unbalanced brackets: ${path}`);
  }
  return path.split(/\.(?![^\[]*\])|[\[\]]/g).filter(Boolean);
}

// node_modules/tailwindcss/src/util/isSyntacticallyValidPropertyValue.js
var matchingBrackets = /* @__PURE__ */ new Map([
  ["{", "}"],
  ["[", "]"],
  ["(", ")"]
]);
var inverseMatchingBrackets = new Map(
  Array.from(matchingBrackets.entries()).map(([k, v]) => [v, k])
);
var quotes = /* @__PURE__ */ new Set(['"', "'", "`"]);
function isSyntacticallyValidPropertyValue(value2) {
  let stack = [];
  let inQuotes = false;
  for (let i = 0; i < value2.length; i++) {
    let char = value2[i];
    if (char === ":" && !inQuotes && stack.length === 0) {
      return false;
    }
    if (quotes.has(char) && value2[i - 1] !== "\\") {
      inQuotes = !inQuotes;
    }
    if (inQuotes)
      continue;
    if (value2[i - 1] === "\\")
      continue;
    if (matchingBrackets.has(char)) {
      stack.push(char);
    } else if (inverseMatchingBrackets.has(char)) {
      let inverse = inverseMatchingBrackets.get(char);
      if (stack.length <= 0) {
        return false;
      }
      if (stack.pop() !== inverse) {
        return false;
      }
    }
  }
  if (stack.length > 0) {
    return false;
  }
  return true;
}

// node_modules/tailwindcss/src/util/bigSign.js
function bigSign(bigIntValue) {
  return (bigIntValue > 0n) - (bigIntValue < 0n);
}

// node_modules/tailwindcss/src/lib/remap-bitfield.js
function remapBitfield(num, mapping) {
  let oldMask = 0n;
  let newMask = 0n;
  for (let [oldBit, newBit] of mapping) {
    if (num & oldBit) {
      oldMask = oldMask | oldBit;
      newMask = newMask | newBit;
    }
  }
  return num & ~oldMask | newMask;
}

// node_modules/tailwindcss/src/lib/offsets.js
var Offsets = class {
  constructor() {
    this.offsets = {
      defaults: 0n,
      base: 0n,
      components: 0n,
      utilities: 0n,
      variants: 0n,
      user: 0n
    };
    this.layerPositions = {
      defaults: 0n,
      base: 1n,
      components: 2n,
      utilities: 3n,
      user: 4n,
      variants: 5n
    };
    this.reservedVariantBits = 0n;
    this.variantOffsets = /* @__PURE__ */ new Map();
  }
  create(layer) {
    return {
      layer,
      parentLayer: layer,
      arbitrary: 0n,
      variants: 0n,
      parallelIndex: 0n,
      index: this.offsets[layer]++,
      options: []
    };
  }
  arbitraryProperty() {
    return {
      ...this.create("utilities"),
      arbitrary: 1n
    };
  }
  forVariant(variant, index3 = 0) {
    let offset = this.variantOffsets.get(variant);
    if (offset === void 0) {
      throw new Error(`Cannot find offset for unknown variant ${variant}`);
    }
    return {
      ...this.create("variants"),
      variants: offset << BigInt(index3)
    };
  }
  applyVariantOffset(rule3, variant, options) {
    options.variant = variant.variants;
    return {
      ...rule3,
      layer: "variants",
      parentLayer: rule3.layer === "variants" ? rule3.parentLayer : rule3.layer,
      variants: rule3.variants | variant.variants,
      options: options.sort ? [].concat(options, rule3.options) : rule3.options,
      parallelIndex: max([rule3.parallelIndex, variant.parallelIndex])
    };
  }
  applyParallelOffset(offset, parallelIndex) {
    return {
      ...offset,
      parallelIndex: BigInt(parallelIndex)
    };
  }
  recordVariants(variants, getLength) {
    for (let variant of variants) {
      this.recordVariant(variant, getLength(variant));
    }
  }
  recordVariant(variant, fnCount = 1) {
    this.variantOffsets.set(variant, 1n << this.reservedVariantBits);
    this.reservedVariantBits += BigInt(fnCount);
    return {
      ...this.create("variants"),
      variants: this.variantOffsets.get(variant)
    };
  }
  compare(a, b) {
    var _a;
    if (a.layer !== b.layer) {
      return this.layerPositions[a.layer] - this.layerPositions[b.layer];
    }
    if (a.parentLayer !== b.parentLayer) {
      return this.layerPositions[a.parentLayer] - this.layerPositions[b.parentLayer];
    }
    for (let aOptions of a.options) {
      for (let bOptions of b.options) {
        if (aOptions.id !== bOptions.id)
          continue;
        if (!aOptions.sort || !bOptions.sort)
          continue;
        let maxFnVariant = (_a = max([aOptions.variant, bOptions.variant])) != null ? _a : 0n;
        let mask = ~(maxFnVariant | maxFnVariant - 1n);
        let aVariantsAfterFn = a.variants & mask;
        let bVariantsAfterFn = b.variants & mask;
        if (aVariantsAfterFn !== bVariantsAfterFn) {
          continue;
        }
        let result = aOptions.sort(
          {
            value: aOptions.value,
            modifier: aOptions.modifier
          },
          {
            value: bOptions.value,
            modifier: bOptions.modifier
          }
        );
        if (result !== 0)
          return result;
      }
    }
    if (a.variants !== b.variants) {
      return a.variants - b.variants;
    }
    if (a.parallelIndex !== b.parallelIndex) {
      return a.parallelIndex - b.parallelIndex;
    }
    if (a.arbitrary !== b.arbitrary) {
      return a.arbitrary - b.arbitrary;
    }
    return a.index - b.index;
  }
  recalculateVariantOffsets() {
    let variants = Array.from(this.variantOffsets.entries()).filter(([v]) => v.startsWith("[")).sort(([a], [z]) => fastCompare(a, z));
    let newOffsets = variants.map(([, offset]) => offset).sort((a, z) => bigSign(a - z));
    let mapping = variants.map(([, oldOffset], i) => [oldOffset, newOffsets[i]]);
    return mapping.filter(([a, z]) => a !== z);
  }
  remapArbitraryVariantOffsets(list4) {
    let mapping = this.recalculateVariantOffsets();
    if (mapping.length === 0) {
      return list4;
    }
    return list4.map((item) => {
      let [offset, rule3] = item;
      offset = {
        ...offset,
        variants: remapBitfield(offset.variants, mapping)
      };
      return [offset, rule3];
    });
  }
  sort(list4) {
    list4 = this.remapArbitraryVariantOffsets(list4);
    return list4.sort(([a], [b]) => bigSign(this.compare(a, b)));
  }
};
function max(nums) {
  let max2 = null;
  for (const num of nums) {
    max2 = max2 != null ? max2 : num;
    max2 = max2 > num ? max2 : num;
  }
  return max2;
}
function fastCompare(a, b) {
  let aLen = a.length;
  let bLen = b.length;
  let minLen = aLen < bLen ? aLen : bLen;
  for (let i = 0; i < minLen; i++) {
    let cmp = a.charCodeAt(i) - b.charCodeAt(i);
    if (cmp !== 0)
      return cmp;
  }
  return aLen - bLen;
}

// node_modules/tailwindcss/src/lib/setupContextUtils.js
var INTERNAL_FEATURES = Symbol();
var VARIANT_TYPES = {
  AddVariant: Symbol.for("ADD_VARIANT"),
  MatchVariant: Symbol.for("MATCH_VARIANT")
};
var VARIANT_INFO = {
  Base: 1 << 0,
  Dynamic: 1 << 1
};
function prefix(context, selector) {
  let prefix3 = context.tailwindConfig.prefix;
  return typeof prefix3 === "function" ? prefix3(selector) : prefix3 + selector;
}
function normalizeOptionTypes({ type = "any", ...options }) {
  let types2 = [].concat(type);
  return {
    ...options,
    types: types2.map((type2) => {
      if (Array.isArray(type2)) {
        return { type: type2[0], ...type2[1] };
      }
      return { type: type2, preferOnConflict: false };
    })
  };
}
function parseVariantFormatString(input) {
  let parts = [];
  let current = "";
  let depth = 0;
  for (let idx = 0; idx < input.length; idx++) {
    let char = input[idx];
    if (char === "\\") {
      current += "\\" + input[++idx];
    } else if (char === "{") {
      ++depth;
      parts.push(current.trim());
      current = "";
    } else if (char === "}") {
      if (--depth < 0) {
        throw new Error(`Your { and } are unbalanced.`);
      }
      parts.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  if (current.length > 0) {
    parts.push(current.trim());
  }
  parts = parts.filter((part) => part !== "");
  return parts;
}
function insertInto(list4, value2, { before = [] } = {}) {
  before = [].concat(before);
  if (before.length <= 0) {
    list4.push(value2);
    return;
  }
  let idx = list4.length - 1;
  for (let other of before) {
    let iidx = list4.indexOf(other);
    if (iidx === -1)
      continue;
    idx = Math.min(idx, iidx);
  }
  list4.splice(idx, 0, value2);
}
function parseStyles(styles) {
  if (!Array.isArray(styles)) {
    return parseStyles([styles]);
  }
  return styles.flatMap((style) => {
    let isNode = !Array.isArray(style) && !isPlainObject(style);
    return isNode ? style : parseObjectStyles(style);
  });
}
function getClasses(selector, mutate) {
  let parser5 = (0, import_postcss_selector_parser4.default)((selectors) => {
    let allClasses = [];
    if (mutate) {
      mutate(selectors);
    }
    selectors.walkClasses((classNode) => {
      allClasses.push(classNode.value);
    });
    return allClasses;
  });
  return parser5.transformSync(selector);
}
function extractCandidates(node, state = { containsNonOnDemandable: false }, depth = 0) {
  let classes = [];
  if (node.type === "rule") {
    let ignoreNot = function(selectors) {
      selectors.walkPseudos((pseudo) => {
        if (pseudo.value === ":not") {
          pseudo.remove();
        }
      });
    };
    for (let selector of node.selectors) {
      let classCandidates = getClasses(selector, ignoreNot);
      if (classCandidates.length === 0) {
        state.containsNonOnDemandable = true;
      }
      for (let classCandidate of classCandidates) {
        classes.push(classCandidate);
      }
    }
  } else if (node.type === "atrule") {
    node.walkRules((rule3) => {
      for (let classCandidate of rule3.selectors.flatMap((selector) => getClasses(selector))) {
        classes.push(classCandidate);
      }
    });
  }
  if (depth === 0) {
    return [state.containsNonOnDemandable || classes.length === 0, classes];
  }
  return classes;
}
function withIdentifiers(styles) {
  return parseStyles(styles).flatMap((node) => {
    let nodeMap = /* @__PURE__ */ new Map();
    let [containsNonOnDemandableSelectors, candidates] = extractCandidates(node);
    if (containsNonOnDemandableSelectors) {
      candidates.unshift(NOT_ON_DEMAND);
    }
    return candidates.map((c) => {
      if (!nodeMap.has(node)) {
        nodeMap.set(node, node);
      }
      return [c, nodeMap.get(node)];
    });
  });
}
function isValidVariantFormatString(format) {
  return format.startsWith("@") || format.includes("&");
}
function parseVariant(variant) {
  variant = variant.replace(/\n+/g, "").replace(/\s{1,}/g, " ").trim();
  let fns = parseVariantFormatString(variant).map((str) => {
    if (!str.startsWith("@")) {
      return ({ format }) => format(str);
    }
    let [, name, params] = /@(\S*)( .+|[({].*)?/g.exec(str);
    return ({ wrap }) => {
      var _a;
      return wrap(postcss_default.atRule({ name, params: (_a = params == null ? void 0 : params.trim()) != null ? _a : "" }));
    };
  }).reverse();
  return (api) => {
    for (let fn of fns) {
      fn(api);
    }
  };
}
function buildPluginApi(tailwindConfig, context, { variantList, variantMap, offsets, classList }) {
  function getConfigValue(path, defaultValue) {
    return path ? (0, import_dlv.default)(tailwindConfig, path, defaultValue) : tailwindConfig;
  }
  function applyConfiguredPrefix(selector) {
    return prefixSelector_default(tailwindConfig.prefix, selector);
  }
  function prefixIdentifier(identifier, options) {
    if (identifier === NOT_ON_DEMAND) {
      return NOT_ON_DEMAND;
    }
    if (!options.respectPrefix) {
      return identifier;
    }
    return context.tailwindConfig.prefix + identifier;
  }
  function resolveThemeValue(path, defaultValue, opts = {}) {
    let parts = toPath(path);
    let value2 = getConfigValue(["theme", ...parts], defaultValue);
    return transformThemeValue(parts[0])(value2, opts);
  }
  let variantIdentifier = 0;
  let api = {
    postcss: postcss_default,
    prefix: applyConfiguredPrefix,
    e: escapeClassName,
    config: getConfigValue,
    theme: resolveThemeValue,
    corePlugins: (path) => {
      if (Array.isArray(tailwindConfig.corePlugins)) {
        return tailwindConfig.corePlugins.includes(path);
      }
      return getConfigValue(["corePlugins", path], true);
    },
    variants: () => {
      return [];
    },
    addBase(base) {
      for (let [identifier, rule3] of withIdentifiers(base)) {
        let prefixedIdentifier = prefixIdentifier(identifier, {});
        let offset = offsets.create("base");
        if (!context.candidateRuleMap.has(prefixedIdentifier)) {
          context.candidateRuleMap.set(prefixedIdentifier, []);
        }
        context.candidateRuleMap.get(prefixedIdentifier).push([{ sort: offset, layer: "base" }, rule3]);
      }
    },
    addDefaults(group, declarations) {
      const groups = {
        [`@defaults ${group}`]: declarations
      };
      for (let [identifier, rule3] of withIdentifiers(groups)) {
        let prefixedIdentifier = prefixIdentifier(identifier, {});
        if (!context.candidateRuleMap.has(prefixedIdentifier)) {
          context.candidateRuleMap.set(prefixedIdentifier, []);
        }
        context.candidateRuleMap.get(prefixedIdentifier).push([{ sort: offsets.create("defaults"), layer: "defaults" }, rule3]);
      }
    },
    addComponents(components, options) {
      let defaultOptions = {
        preserveSource: false,
        respectPrefix: true,
        respectImportant: false
      };
      options = Object.assign({}, defaultOptions, Array.isArray(options) ? {} : options);
      for (let [identifier, rule3] of withIdentifiers(components)) {
        let prefixedIdentifier = prefixIdentifier(identifier, options);
        classList.add(prefixedIdentifier);
        if (!context.candidateRuleMap.has(prefixedIdentifier)) {
          context.candidateRuleMap.set(prefixedIdentifier, []);
        }
        context.candidateRuleMap.get(prefixedIdentifier).push([{ sort: offsets.create("components"), layer: "components", options }, rule3]);
      }
    },
    addUtilities(utilities, options) {
      let defaultOptions = {
        preserveSource: false,
        respectPrefix: true,
        respectImportant: true
      };
      options = Object.assign({}, defaultOptions, Array.isArray(options) ? {} : options);
      for (let [identifier, rule3] of withIdentifiers(utilities)) {
        let prefixedIdentifier = prefixIdentifier(identifier, options);
        classList.add(prefixedIdentifier);
        if (!context.candidateRuleMap.has(prefixedIdentifier)) {
          context.candidateRuleMap.set(prefixedIdentifier, []);
        }
        context.candidateRuleMap.get(prefixedIdentifier).push([{ sort: offsets.create("utilities"), layer: "utilities", options }, rule3]);
      }
    },
    matchUtilities: function(utilities, options) {
      let defaultOptions = {
        respectPrefix: true,
        respectImportant: true,
        modifiers: false
      };
      options = normalizeOptionTypes({ ...defaultOptions, ...options });
      let offset = offsets.create("utilities");
      for (let identifier in utilities) {
        let wrapped = function(modifier, { isOnlyPlugin }) {
          let [value2, coercedType, utilityModifier] = coerceValue(
            options.types,
            modifier,
            options,
            tailwindConfig
          );
          if (value2 === void 0) {
            return [];
          }
          if (!options.types.some(({ type }) => type === coercedType)) {
            if (isOnlyPlugin) {
              log_default.warn([
                `Unnecessary typehint \`${coercedType}\` in \`${identifier}-${modifier}\`.`,
                `You can safely update it to \`${identifier}-${modifier.replace(
                  coercedType + ":",
                  ""
                )}\`.`
              ]);
            } else {
              return [];
            }
          }
          if (!isSyntacticallyValidPropertyValue(value2)) {
            return [];
          }
          let extras = {
            get modifier() {
              if (!options.modifiers) {
                log_default.warn(`modifier-used-without-options-for-${identifier}`, [
                  "Your plugin must set `modifiers: true` in its options to support modifiers."
                ]);
              }
              return utilityModifier;
            }
          };
          let modifiersEnabled = flagEnabled(tailwindConfig, "generalizedModifiers");
          let ruleSets = [].concat(modifiersEnabled ? rule3(value2, extras) : rule3(value2)).filter(Boolean).map((declaration) => ({
            [nameClass(identifier, modifier)]: declaration
          }));
          return ruleSets;
        };
        let prefixedIdentifier = prefixIdentifier(identifier, options);
        let rule3 = utilities[identifier];
        classList.add([prefixedIdentifier, options]);
        let withOffsets = [{ sort: offset, layer: "utilities", options }, wrapped];
        if (!context.candidateRuleMap.has(prefixedIdentifier)) {
          context.candidateRuleMap.set(prefixedIdentifier, []);
        }
        context.candidateRuleMap.get(prefixedIdentifier).push(withOffsets);
      }
    },
    matchComponents: function(components, options) {
      let defaultOptions = {
        respectPrefix: true,
        respectImportant: false,
        modifiers: false
      };
      options = normalizeOptionTypes({ ...defaultOptions, ...options });
      let offset = offsets.create("components");
      for (let identifier in components) {
        let wrapped = function(modifier, { isOnlyPlugin }) {
          let [value2, coercedType, utilityModifier] = coerceValue(
            options.types,
            modifier,
            options,
            tailwindConfig
          );
          if (value2 === void 0) {
            return [];
          }
          if (!options.types.some(({ type }) => type === coercedType)) {
            if (isOnlyPlugin) {
              log_default.warn([
                `Unnecessary typehint \`${coercedType}\` in \`${identifier}-${modifier}\`.`,
                `You can safely update it to \`${identifier}-${modifier.replace(
                  coercedType + ":",
                  ""
                )}\`.`
              ]);
            } else {
              return [];
            }
          }
          if (!isSyntacticallyValidPropertyValue(value2)) {
            return [];
          }
          let extras = {
            get modifier() {
              if (!options.modifiers) {
                log_default.warn(`modifier-used-without-options-for-${identifier}`, [
                  "Your plugin must set `modifiers: true` in its options to support modifiers."
                ]);
              }
              return utilityModifier;
            }
          };
          let modifiersEnabled = flagEnabled(tailwindConfig, "generalizedModifiers");
          let ruleSets = [].concat(modifiersEnabled ? rule3(value2, extras) : rule3(value2)).filter(Boolean).map((declaration) => ({
            [nameClass(identifier, modifier)]: declaration
          }));
          return ruleSets;
        };
        let prefixedIdentifier = prefixIdentifier(identifier, options);
        let rule3 = components[identifier];
        classList.add([prefixedIdentifier, options]);
        let withOffsets = [{ sort: offset, layer: "components", options }, wrapped];
        if (!context.candidateRuleMap.has(prefixedIdentifier)) {
          context.candidateRuleMap.set(prefixedIdentifier, []);
        }
        context.candidateRuleMap.get(prefixedIdentifier).push(withOffsets);
      }
    },
    addVariant(variantName, variantFunctions, options = {}) {
      variantFunctions = [].concat(variantFunctions).map((variantFunction) => {
        if (typeof variantFunction !== "string") {
          return (api2 = {}) => {
            let { args, modifySelectors, container, separator, wrap, format } = api2;
            let result = variantFunction(
              Object.assign(
                { modifySelectors, container, separator },
                options.type === VARIANT_TYPES.MatchVariant && { args, wrap, format }
              )
            );
            if (typeof result === "string" && !isValidVariantFormatString(result)) {
              throw new Error(
                `Your custom variant \`${variantName}\` has an invalid format string. Make sure it's an at-rule or contains a \`&\` placeholder.`
              );
            }
            if (Array.isArray(result)) {
              return result.filter((variant) => typeof variant === "string").map((variant) => parseVariant(variant));
            }
            return result && typeof result === "string" && parseVariant(result)(api2);
          };
        }
        if (!isValidVariantFormatString(variantFunction)) {
          throw new Error(
            `Your custom variant \`${variantName}\` has an invalid format string. Make sure it's an at-rule or contains a \`&\` placeholder.`
          );
        }
        return parseVariant(variantFunction);
      });
      insertInto(variantList, variantName, options);
      variantMap.set(variantName, variantFunctions);
      context.variantOptions.set(variantName, options);
    },
    matchVariant(variant, variantFn, options) {
      var _a, _b, _c;
      let id = (_a = options == null ? void 0 : options.id) != null ? _a : ++variantIdentifier;
      let isSpecial = variant === "@";
      let modifiersEnabled = flagEnabled(tailwindConfig, "generalizedModifiers");
      for (let [key, value2] of Object.entries((_b = options == null ? void 0 : options.values) != null ? _b : {})) {
        if (key === "DEFAULT")
          continue;
        api.addVariant(
          isSpecial ? `${variant}${key}` : `${variant}-${key}`,
          ({ args, container }) => {
            return variantFn(
              value2,
              modifiersEnabled ? { modifier: args == null ? void 0 : args.modifier, container } : { container }
            );
          },
          {
            ...options,
            value: value2,
            id,
            type: VARIANT_TYPES.MatchVariant,
            variantInfo: VARIANT_INFO.Base
          }
        );
      }
      let hasDefault = "DEFAULT" in ((_c = options == null ? void 0 : options.values) != null ? _c : {});
      api.addVariant(
        variant,
        ({ args, container }) => {
          var _a2;
          if ((args == null ? void 0 : args.value) === NONE && !hasDefault) {
            return null;
          }
          return variantFn(
            (args == null ? void 0 : args.value) === NONE ? options.values.DEFAULT : (_a2 = args == null ? void 0 : args.value) != null ? _a2 : typeof args === "string" ? args : "",
            modifiersEnabled ? { modifier: args == null ? void 0 : args.modifier, container } : { container }
          );
        },
        {
          ...options,
          id,
          type: VARIANT_TYPES.MatchVariant,
          variantInfo: VARIANT_INFO.Dynamic
        }
      );
    }
  };
  return api;
}
function extractVariantAtRules(node) {
  node.walkAtRules((atRule3) => {
    if (["responsive", "variants"].includes(atRule3.name)) {
      extractVariantAtRules(atRule3);
      atRule3.before(atRule3.nodes);
      atRule3.remove();
    }
  });
}
function collectLayerPlugins(root3) {
  let layerPlugins = [];
  root3.each((node) => {
    if (node.type === "atrule" && ["responsive", "variants"].includes(node.name)) {
      node.name = "layer";
      node.params = "utilities";
    }
  });
  root3.walkAtRules("layer", (layerRule) => {
    extractVariantAtRules(layerRule);
    if (layerRule.params === "base") {
      for (let node of layerRule.nodes) {
        layerPlugins.push(function({ addBase }) {
          addBase(node, { respectPrefix: false });
        });
      }
      layerRule.remove();
    } else if (layerRule.params === "components") {
      for (let node of layerRule.nodes) {
        layerPlugins.push(function({ addComponents }) {
          addComponents(node, { respectPrefix: false, preserveSource: true });
        });
      }
      layerRule.remove();
    } else if (layerRule.params === "utilities") {
      for (let node of layerRule.nodes) {
        layerPlugins.push(function({ addUtilities }) {
          addUtilities(node, { respectPrefix: false, preserveSource: true });
        });
      }
      layerRule.remove();
    }
  });
  return layerPlugins;
}
function resolvePlugins(context, root3) {
  let corePluginList = Object.entries({ ...variantPlugins, ...corePlugins }).map(([name, plugin3]) => {
    if (!context.tailwindConfig.corePlugins.includes(name)) {
      return null;
    }
    return plugin3;
  }).filter(Boolean);
  let userPlugins = context.tailwindConfig.plugins.map((plugin3) => {
    if (plugin3.__isOptionsFunction) {
      plugin3 = plugin3();
    }
    return typeof plugin3 === "function" ? plugin3 : plugin3.handler;
  });
  let layerPlugins = collectLayerPlugins(root3);
  let beforeVariants = [
    variantPlugins["pseudoElementVariants"],
    variantPlugins["pseudoClassVariants"],
    variantPlugins["ariaVariants"],
    variantPlugins["dataVariants"]
  ];
  let afterVariants = [
    variantPlugins["supportsVariants"],
    variantPlugins["directionVariants"],
    variantPlugins["reducedMotionVariants"],
    variantPlugins["prefersContrastVariants"],
    variantPlugins["darkVariants"],
    variantPlugins["printVariant"],
    variantPlugins["screenVariants"],
    variantPlugins["orientationVariants"]
  ];
  return [...corePluginList, ...beforeVariants, ...userPlugins, ...afterVariants, ...layerPlugins];
}
function registerPlugins(plugins, context) {
  var _a, _b, _c;
  let variantList = [];
  let variantMap = /* @__PURE__ */ new Map();
  context.variantMap = variantMap;
  let offsets = new Offsets();
  context.offsets = offsets;
  let classList = /* @__PURE__ */ new Set();
  let pluginApi = buildPluginApi(context.tailwindConfig, context, {
    variantList,
    variantMap,
    offsets,
    classList
  });
  for (let plugin3 of plugins) {
    if (Array.isArray(plugin3)) {
      for (let pluginItem of plugin3) {
        pluginItem(pluginApi);
      }
    } else {
      plugin3 == null ? void 0 : plugin3(pluginApi);
    }
  }
  offsets.recordVariants(variantList, (variant) => variantMap.get(variant).length);
  for (let [variantName, variantFunctions] of variantMap.entries()) {
    context.variantMap.set(
      variantName,
      variantFunctions.map((variantFunction, idx) => [
        offsets.forVariant(variantName, idx),
        variantFunction
      ])
    );
  }
  let safelist = ((_a = context.tailwindConfig.safelist) != null ? _a : []).filter(Boolean);
  if (safelist.length > 0) {
    let checks = [];
    for (let value2 of safelist) {
      if (typeof value2 === "string") {
        context.changedContent.push({ content: value2, extension: "html" });
        continue;
      }
      if (value2 instanceof RegExp) {
        log_default.warn("root-regex", [
          "Regular expressions in `safelist` work differently in Tailwind CSS v3.0.",
          "Update your `safelist` configuration to eliminate this warning.",
          "https://tailwindcss.com/docs/content-configuration#safelisting-classes"
        ]);
        continue;
      }
      checks.push(value2);
    }
    if (checks.length > 0) {
      let patternMatchingCount = /* @__PURE__ */ new Map();
      let prefixLength = context.tailwindConfig.prefix.length;
      let checkImportantUtils = checks.some((check) => check.pattern.source.includes("!"));
      for (let util of classList) {
        let utils = Array.isArray(util) ? (() => {
          var _a2;
          let [utilName, options] = util;
          let values = Object.keys((_a2 = options == null ? void 0 : options.values) != null ? _a2 : {});
          let classes = values.map((value2) => formatClass(utilName, value2));
          if (options == null ? void 0 : options.supportsNegativeValues) {
            classes = [...classes, ...classes.map((cls) => "-" + cls)];
            classes = [
              ...classes,
              ...classes.map(
                (cls) => cls.slice(0, prefixLength) + "-" + cls.slice(prefixLength)
              )
            ];
          }
          if (options.types.some(({ type }) => type === "color")) {
            classes = [
              ...classes,
              ...classes.flatMap(
                (cls) => Object.keys(context.tailwindConfig.theme.opacity).map(
                  (opacity) => `${cls}/${opacity}`
                )
              )
            ];
          }
          if (checkImportantUtils && (options == null ? void 0 : options.respectImportant)) {
            classes = [...classes, ...classes.map((cls) => "!" + cls)];
          }
          return classes;
        })() : [util];
        for (let util2 of utils) {
          for (let { pattern: pattern2, variants = [] } of checks) {
            pattern2.lastIndex = 0;
            if (!patternMatchingCount.has(pattern2)) {
              patternMatchingCount.set(pattern2, 0);
            }
            if (!pattern2.test(util2))
              continue;
            patternMatchingCount.set(pattern2, patternMatchingCount.get(pattern2) + 1);
            context.changedContent.push({ content: util2, extension: "html" });
            for (let variant of variants) {
              context.changedContent.push({
                content: variant + context.tailwindConfig.separator + util2,
                extension: "html"
              });
            }
          }
        }
      }
      for (let [regex, count] of patternMatchingCount.entries()) {
        if (count !== 0)
          continue;
        log_default.warn([
          `The safelist pattern \`${regex}\` doesn't match any Tailwind CSS classes.`,
          "Fix this pattern or remove it from your `safelist` configuration.",
          "https://tailwindcss.com/docs/content-configuration#safelisting-classes"
        ]);
      }
    }
  }
  let darkClassName = (_c = [].concat((_b = context.tailwindConfig.darkMode) != null ? _b : "media")[1]) != null ? _c : "dark";
  let parasiteUtilities = [
    prefix(context, darkClassName),
    prefix(context, "group"),
    prefix(context, "peer")
  ];
  context.getClassOrder = function getClassOrder(classes) {
    var _a2;
    let sorted = [...classes].sort((a, z) => {
      if (a === z)
        return 0;
      if (a < z)
        return -1;
      return 1;
    });
    let sortedClassNames = new Map(sorted.map((className) => [className, null]));
    let rules = generateRules(new Set(sorted), context);
    rules = context.offsets.sort(rules);
    let idx = BigInt(parasiteUtilities.length);
    for (const [, rule3] of rules) {
      let candidate = rule3.raws.tailwind.candidate;
      sortedClassNames.set(candidate, (_a2 = sortedClassNames.get(candidate)) != null ? _a2 : idx++);
    }
    return classes.map((className) => {
      var _a3;
      let order = (_a3 = sortedClassNames.get(className)) != null ? _a3 : null;
      let parasiteIndex = parasiteUtilities.indexOf(className);
      if (order === null && parasiteIndex !== -1) {
        order = BigInt(parasiteIndex);
      }
      return [className, order];
    });
  };
  context.getClassList = function getClassList(options = {}) {
    var _a2, _b2, _c2, _d;
    let output = [];
    for (let util of classList) {
      if (Array.isArray(util)) {
        let [utilName, utilOptions] = util;
        let negativeClasses = [];
        let modifiers = Object.keys((_a2 = utilOptions == null ? void 0 : utilOptions.modifiers) != null ? _a2 : {});
        if ((_b2 = utilOptions == null ? void 0 : utilOptions.types) == null ? void 0 : _b2.some(({ type }) => type === "color")) {
          modifiers.push(...Object.keys((_c2 = context.tailwindConfig.theme.opacity) != null ? _c2 : {}));
        }
        let metadata = { modifiers };
        let includeMetadata = options.includeMetadata && modifiers.length > 0;
        for (let [key, value2] of Object.entries((_d = utilOptions == null ? void 0 : utilOptions.values) != null ? _d : {})) {
          if (value2 == null) {
            continue;
          }
          let cls = formatClass(utilName, key);
          output.push(includeMetadata ? [cls, metadata] : cls);
          if ((utilOptions == null ? void 0 : utilOptions.supportsNegativeValues) && negateValue(value2)) {
            let cls2 = formatClass(utilName, `-${key}`);
            negativeClasses.push(includeMetadata ? [cls2, metadata] : cls2);
          }
        }
        output.push(...negativeClasses);
      } else {
        output.push(util);
      }
    }
    return output;
  };
  context.getVariants = function getVariants() {
    var _a2;
    let result = [];
    for (let [name, options] of context.variantOptions.entries()) {
      if (options.variantInfo === VARIANT_INFO.Base)
        continue;
      result.push({
        name,
        isArbitrary: options.type === Symbol.for("MATCH_VARIANT"),
        values: Object.keys((_a2 = options.values) != null ? _a2 : {}),
        hasDash: name !== "@",
        selectors({ modifier, value: value2 } = {}) {
          var _a3, _b2, _c2, _d, _e;
          let candidate = "__TAILWIND_PLACEHOLDER__";
          let rule3 = postcss_default.rule({ selector: `.${candidate}` });
          let container = postcss_default.root({ nodes: [rule3.clone()] });
          let before = container.toString();
          let fns = ((_a3 = context.variantMap.get(name)) != null ? _a3 : []).flatMap(([_, fn]) => fn);
          let formatStrings = [];
          for (let fn of fns) {
            let localFormatStrings = [];
            let api = {
              args: { modifier, value: (_c2 = (_b2 = options.values) == null ? void 0 : _b2[value2]) != null ? _c2 : value2 },
              separator: context.tailwindConfig.separator,
              modifySelectors(modifierFunction) {
                container.each((rule4) => {
                  if (rule4.type !== "rule") {
                    return;
                  }
                  rule4.selectors = rule4.selectors.map((selector) => {
                    return modifierFunction({
                      get className() {
                        return getClassNameFromSelector(selector);
                      },
                      selector
                    });
                  });
                });
                return container;
              },
              format(str) {
                localFormatStrings.push(str);
              },
              wrap(wrapper) {
                localFormatStrings.push(`@${wrapper.name} ${wrapper.params} { & }`);
              },
              container
            };
            let ruleWithVariant = fn(api);
            if (localFormatStrings.length > 0) {
              formatStrings.push(localFormatStrings);
            }
            if (Array.isArray(ruleWithVariant)) {
              for (let variantFunction of ruleWithVariant) {
                localFormatStrings = [];
                variantFunction(api);
                formatStrings.push(localFormatStrings);
              }
            }
          }
          let manualFormatStrings = [];
          let after = container.toString();
          if (before !== after) {
            container.walkRules((rule4) => {
              let modified = rule4.selector;
              let rebuiltBase = (0, import_postcss_selector_parser4.default)((selectors) => {
                selectors.walkClasses((classNode) => {
                  classNode.value = `${name}${context.tailwindConfig.separator}${classNode.value}`;
                });
              }).processSync(modified);
              manualFormatStrings.push(modified.replace(rebuiltBase, "&").replace(candidate, "&"));
            });
            container.walkAtRules((atrule) => {
              manualFormatStrings.push(`@${atrule.name} (${atrule.params}) { & }`);
            });
          }
          let isArbitraryVariant = !(value2 in ((_d = options.values) != null ? _d : {}));
          let internalFeatures = (_e = options[INTERNAL_FEATURES]) != null ? _e : {};
          let respectPrefix = (() => {
            if (isArbitraryVariant)
              return false;
            if (internalFeatures.respectPrefix === false)
              return false;
            return true;
          })();
          formatStrings = formatStrings.map(
            (format) => format.map((str) => ({
              format: str,
              respectPrefix
            }))
          );
          manualFormatStrings = manualFormatStrings.map((format) => ({
            format,
            respectPrefix
          }));
          let opts = {
            candidate,
            context
          };
          let result2 = formatStrings.map(
            (formats) => finalizeSelector(`.${candidate}`, formatVariantSelector(formats, opts), opts).replace(`.${candidate}`, "&").replace("{ & }", "").trim()
          );
          if (manualFormatStrings.length > 0) {
            result2.push(
              formatVariantSelector(manualFormatStrings, opts).toString().replace(`.${candidate}`, "&")
            );
          }
          return result2;
        }
      });
    }
    return result;
  };
}
function markInvalidUtilityCandidate(context, candidate) {
  if (!context.classCache.has(candidate)) {
    return;
  }
  context.notClassCache.add(candidate);
  context.classCache.delete(candidate);
  context.applyClassCache.delete(candidate);
  context.candidateRuleMap.delete(candidate);
  context.candidateRuleCache.delete(candidate);
  context.stylesheetCache = null;
}
function markInvalidUtilityNode(context, node) {
  let candidate = node.raws.tailwind.candidate;
  if (!candidate) {
    return;
  }
  for (const entry of context.ruleCache) {
    if (entry[1].raws.tailwind.candidate === candidate) {
      context.ruleCache.delete(entry);
    }
  }
  markInvalidUtilityCandidate(context, candidate);
}
function createContext(tailwindConfig, changedContent = [], root3 = postcss_default.root()) {
  var _a;
  let context = {
    disposables: [],
    ruleCache: /* @__PURE__ */ new Set(),
    candidateRuleCache: /* @__PURE__ */ new Map(),
    classCache: /* @__PURE__ */ new Map(),
    applyClassCache: /* @__PURE__ */ new Map(),
    notClassCache: new Set((_a = tailwindConfig.blocklist) != null ? _a : []),
    postCssNodeCache: /* @__PURE__ */ new Map(),
    candidateRuleMap: /* @__PURE__ */ new Map(),
    tailwindConfig,
    changedContent,
    variantMap: /* @__PURE__ */ new Map(),
    stylesheetCache: null,
    variantOptions: /* @__PURE__ */ new Map(),
    markInvalidUtilityCandidate: (candidate) => markInvalidUtilityCandidate(context, candidate),
    markInvalidUtilityNode: (node) => markInvalidUtilityNode(context, node)
  };
  let resolvedPlugins = resolvePlugins(context, root3);
  registerPlugins(resolvedPlugins, context);
  return context;
}

// node_modules/tailwindcss/src/util/applyImportantSelector.js
var import_postcss_selector_parser5 = __toESM(require_dist());
function applyImportantSelector(selector, important) {
  let sel = (0, import_postcss_selector_parser5.default)().astSync(selector);
  sel.each((sel2) => {
    let isWrapped = sel2.nodes[0].type === "pseudo" && sel2.nodes[0].value === ":is" && sel2.nodes.every((node) => node.type !== "combinator");
    if (!isWrapped) {
      sel2.nodes = [
        import_postcss_selector_parser5.default.pseudo({
          value: ":is",
          nodes: [sel2.clone()]
        })
      ];
    }
    movePseudos(sel2);
  });
  return `${important} ${sel.toString()}`;
}

// node_modules/tailwindcss/src/lib/generateRules.js
var classNameParser = (0, import_postcss_selector_parser6.default)((selectors) => {
  return selectors.first.filter(({ type }) => type === "class").pop().value;
});
function getClassNameFromSelector(selector) {
  return classNameParser.transformSync(selector);
}
function* candidatePermutations(candidate) {
  let lastIndex = Infinity;
  while (lastIndex >= 0) {
    let dashIdx;
    let wasSlash = false;
    if (lastIndex === Infinity && candidate.endsWith("]")) {
      let bracketIdx = candidate.indexOf("[");
      if (candidate[bracketIdx - 1] === "-") {
        dashIdx = bracketIdx - 1;
      } else if (candidate[bracketIdx - 1] === "/") {
        dashIdx = bracketIdx - 1;
        wasSlash = true;
      } else {
        dashIdx = -1;
      }
    } else if (lastIndex === Infinity && candidate.includes("/")) {
      dashIdx = candidate.lastIndexOf("/");
      wasSlash = true;
    } else {
      dashIdx = candidate.lastIndexOf("-", lastIndex);
    }
    if (dashIdx < 0) {
      break;
    }
    let prefix3 = candidate.slice(0, dashIdx);
    let modifier = candidate.slice(wasSlash ? dashIdx : dashIdx + 1);
    lastIndex = dashIdx - 1;
    if (prefix3 === "" || modifier === "/") {
      continue;
    }
    yield [prefix3, modifier];
  }
}
function applyPrefix(matches, context) {
  if (matches.length === 0 || context.tailwindConfig.prefix === "") {
    return matches;
  }
  for (let match of matches) {
    let [meta] = match;
    if (meta.options.respectPrefix) {
      let container = postcss_default.root({ nodes: [match[1].clone()] });
      let classCandidate = match[1].raws.tailwind.classCandidate;
      container.walkRules((r) => {
        let shouldPrependNegative = classCandidate.startsWith("-");
        r.selector = prefixSelector_default(
          context.tailwindConfig.prefix,
          r.selector,
          shouldPrependNegative
        );
      });
      match[1] = container.nodes[0];
    }
  }
  return matches;
}
function applyImportant(matches, classCandidate) {
  if (matches.length === 0) {
    return matches;
  }
  let result = [];
  for (let [meta, rule3] of matches) {
    let container = postcss_default.root({ nodes: [rule3.clone()] });
    container.walkRules((r) => {
      let ast = (0, import_postcss_selector_parser6.default)().astSync(r.selector);
      ast.each((sel) => eliminateIrrelevantSelectors(sel, classCandidate));
      updateAllClasses(
        ast,
        (className) => className === classCandidate ? `!${className}` : className
      );
      r.selector = ast.toString();
      r.walkDecls((d) => d.important = true);
    });
    result.push([{ ...meta, important: true }, container.nodes[0]]);
  }
  return result;
}
function applyVariant(variant, matches, context) {
  var _a, _b, _c;
  if (matches.length === 0) {
    return matches;
  }
  let args = { modifier: null, value: NONE };
  {
    let [baseVariant, ...modifiers] = splitAtTopLevelOnly(variant, "/");
    if (modifiers.length > 1) {
      baseVariant = baseVariant + "/" + modifiers.slice(0, -1).join("/");
      modifiers = modifiers.slice(-1);
    }
    if (modifiers.length && !context.variantMap.has(variant)) {
      variant = baseVariant;
      args.modifier = modifiers[0];
      if (!flagEnabled(context.tailwindConfig, "generalizedModifiers")) {
        return [];
      }
    }
  }
  if (variant.endsWith("]") && !variant.startsWith("[")) {
    let match = /(.)(-?)\[(.*)\]/g.exec(variant);
    if (match) {
      let [, char, separator, value2] = match;
      if (char === "@" && separator === "-")
        return [];
      if (char !== "@" && separator === "")
        return [];
      variant = variant.replace(`${separator}[${value2}]`, "");
      args.value = value2;
    }
  }
  if (isArbitraryValue2(variant) && !context.variantMap.has(variant)) {
    let sort = context.offsets.recordVariant(variant);
    let selector = normalize(variant.slice(1, -1));
    let selectors = splitAtTopLevelOnly(selector, ",");
    if (selectors.length > 1) {
      return [];
    }
    if (!selectors.every(isValidVariantFormatString)) {
      return [];
    }
    let records = selectors.map((sel, idx) => [
      context.offsets.applyParallelOffset(sort, idx),
      parseVariant(sel.trim())
    ]);
    context.variantMap.set(variant, records);
  }
  if (context.variantMap.has(variant)) {
    let isArbitraryVariant = isArbitraryValue2(variant);
    let internalFeatures = (_b = (_a = context.variantOptions.get(variant)) == null ? void 0 : _a[INTERNAL_FEATURES]) != null ? _b : {};
    let variantFunctionTuples = context.variantMap.get(variant).slice();
    let result = [];
    let respectPrefix = (() => {
      if (isArbitraryVariant)
        return false;
      if (internalFeatures.respectPrefix === false)
        return false;
      return true;
    })();
    for (let [meta, rule3] of matches) {
      if (meta.layer === "user") {
        continue;
      }
      let container = postcss_default.root({ nodes: [rule3.clone()] });
      for (let [variantSort, variantFunction, containerFromArray] of variantFunctionTuples) {
        let prepareBackup = function() {
          if (clone.raws.neededBackup) {
            return;
          }
          clone.raws.neededBackup = true;
          clone.walkRules((rule4) => rule4.raws.originalSelector = rule4.selector);
        }, modifySelectors = function(modifierFunction) {
          prepareBackup();
          clone.each((rule4) => {
            if (rule4.type !== "rule") {
              return;
            }
            rule4.selectors = rule4.selectors.map((selector) => {
              return modifierFunction({
                get className() {
                  return getClassNameFromSelector(selector);
                },
                selector
              });
            });
          });
          return clone;
        };
        let clone = (containerFromArray != null ? containerFromArray : container).clone();
        let collectedFormats = [];
        let ruleWithVariant = variantFunction({
          get container() {
            prepareBackup();
            return clone;
          },
          separator: context.tailwindConfig.separator,
          modifySelectors,
          wrap(wrapper) {
            let nodes = clone.nodes;
            clone.removeAll();
            wrapper.append(nodes);
            clone.append(wrapper);
          },
          format(selectorFormat) {
            collectedFormats.push({
              format: selectorFormat,
              respectPrefix
            });
          },
          args
        });
        if (Array.isArray(ruleWithVariant)) {
          for (let [idx, variantFunction2] of ruleWithVariant.entries()) {
            variantFunctionTuples.push([
              context.offsets.applyParallelOffset(variantSort, idx),
              variantFunction2,
              clone.clone()
            ]);
          }
          continue;
        }
        if (typeof ruleWithVariant === "string") {
          collectedFormats.push({
            format: ruleWithVariant,
            respectPrefix
          });
        }
        if (ruleWithVariant === null) {
          continue;
        }
        if (clone.raws.neededBackup) {
          delete clone.raws.neededBackup;
          clone.walkRules((rule4) => {
            let before = rule4.raws.originalSelector;
            if (!before)
              return;
            delete rule4.raws.originalSelector;
            if (before === rule4.selector)
              return;
            let modified = rule4.selector;
            let rebuiltBase = (0, import_postcss_selector_parser6.default)((selectors) => {
              selectors.walkClasses((classNode) => {
                classNode.value = `${variant}${context.tailwindConfig.separator}${classNode.value}`;
              });
            }).processSync(before);
            collectedFormats.push({
              format: modified.replace(rebuiltBase, "&"),
              respectPrefix
            });
            rule4.selector = before;
          });
        }
        clone.nodes[0].raws.tailwind = { ...clone.nodes[0].raws.tailwind, parentLayer: meta.layer };
        let withOffset = [
          {
            ...meta,
            sort: context.offsets.applyVariantOffset(
              meta.sort,
              variantSort,
              Object.assign(args, context.variantOptions.get(variant))
            ),
            collectedFormats: ((_c = meta.collectedFormats) != null ? _c : []).concat(collectedFormats)
          },
          clone.nodes[0]
        ];
        result.push(withOffset);
      }
    }
    return result;
  }
  return [];
}
function parseRules(rule3, cache2, options = {}) {
  if (!isPlainObject(rule3) && !Array.isArray(rule3)) {
    return [[rule3], options];
  }
  if (Array.isArray(rule3)) {
    return parseRules(rule3[0], cache2, rule3[1]);
  }
  if (!cache2.has(rule3)) {
    cache2.set(rule3, parseObjectStyles(rule3));
  }
  return [cache2.get(rule3), options];
}
var IS_VALID_PROPERTY_NAME = /^[a-z_-]/;
function isValidPropName(name) {
  return IS_VALID_PROPERTY_NAME.test(name);
}
function looksLikeUri(declaration) {
  if (!declaration.includes("://")) {
    return false;
  }
  try {
    const url2 = new URL(declaration);
    return url2.scheme !== "" && url2.host !== "";
  } catch (err) {
    return false;
  }
}
function isParsableNode(node) {
  let isParsable = true;
  node.walkDecls((decl3) => {
    if (!isParsableCssValue(decl3.prop, decl3.value)) {
      isParsable = false;
      return false;
    }
  });
  return isParsable;
}
function isParsableCssValue(property, value2) {
  if (looksLikeUri(`${property}:${value2}`)) {
    return false;
  }
  try {
    postcss_default.parse(`a{${property}:${value2}}`).toResult();
    return true;
  } catch (err) {
    return false;
  }
}
function extractArbitraryProperty(classCandidate, context) {
  var _a;
  let [, property, value2] = (_a = classCandidate.match(/^\[([a-zA-Z0-9-_]+):(\S+)\]$/)) != null ? _a : [];
  if (value2 === void 0) {
    return null;
  }
  if (!isValidPropName(property)) {
    return null;
  }
  if (!isSyntacticallyValidPropertyValue(value2)) {
    return null;
  }
  let normalized = normalize(value2);
  if (!isParsableCssValue(property, normalized)) {
    return null;
  }
  let sort = context.offsets.arbitraryProperty();
  return [
    [
      { sort, layer: "utilities" },
      () => ({
        [asClass(classCandidate)]: {
          [property]: normalized
        }
      })
    ]
  ];
}
function* resolveMatchedPlugins(classCandidate, context) {
  if (context.candidateRuleMap.has(classCandidate)) {
    yield [context.candidateRuleMap.get(classCandidate), "DEFAULT"];
  }
  yield* function* (arbitraryPropertyRule) {
    if (arbitraryPropertyRule !== null) {
      yield [arbitraryPropertyRule, "DEFAULT"];
    }
  }(extractArbitraryProperty(classCandidate, context));
  let candidatePrefix = classCandidate;
  let negative = false;
  const twConfigPrefix = context.tailwindConfig.prefix;
  const twConfigPrefixLen = twConfigPrefix.length;
  const hasMatchingPrefix = candidatePrefix.startsWith(twConfigPrefix) || candidatePrefix.startsWith(`-${twConfigPrefix}`);
  if (candidatePrefix[twConfigPrefixLen] === "-" && hasMatchingPrefix) {
    negative = true;
    candidatePrefix = twConfigPrefix + candidatePrefix.slice(twConfigPrefixLen + 1);
  }
  if (negative && context.candidateRuleMap.has(candidatePrefix)) {
    yield [context.candidateRuleMap.get(candidatePrefix), "-DEFAULT"];
  }
  for (let [prefix3, modifier] of candidatePermutations(candidatePrefix)) {
    if (context.candidateRuleMap.has(prefix3)) {
      yield [context.candidateRuleMap.get(prefix3), negative ? `-${modifier}` : modifier];
    }
  }
}
function splitWithSeparator(input, separator) {
  if (input === NOT_ON_DEMAND) {
    return [NOT_ON_DEMAND];
  }
  return splitAtTopLevelOnly(input, separator);
}
function* recordCandidates(matches, classCandidate) {
  var _a, _b;
  for (const match of matches) {
    match[1].raws.tailwind = {
      ...match[1].raws.tailwind,
      classCandidate,
      preserveSource: (_b = (_a = match[0].options) == null ? void 0 : _a.preserveSource) != null ? _b : false
    };
    yield match;
  }
}
function* resolveMatches(candidate, context, original = candidate) {
  var _a, _b, _c, _d;
  let separator = context.tailwindConfig.separator;
  let [classCandidate, ...variants] = splitWithSeparator(candidate, separator).reverse();
  let important = false;
  if (classCandidate.startsWith("!")) {
    important = true;
    classCandidate = classCandidate.slice(1);
  }
  if (flagEnabled(context.tailwindConfig, "variantGrouping")) {
    if (classCandidate.startsWith("(") && classCandidate.endsWith(")")) {
      let base = variants.slice().reverse().join(separator);
      for (let part of splitAtTopLevelOnly(classCandidate.slice(1, -1), ",")) {
        yield* resolveMatches(base + separator + part, context, original);
      }
    }
  }
  for (let matchedPlugins of resolveMatchedPlugins(classCandidate, context)) {
    let matches = [];
    let typesByMatches = /* @__PURE__ */ new Map();
    let [plugins, modifier] = matchedPlugins;
    let isOnlyPlugin = plugins.length === 1;
    for (let [sort, plugin3] of plugins) {
      let matchesPerPlugin = [];
      if (typeof plugin3 === "function") {
        for (let ruleSet of [].concat(plugin3(modifier, { isOnlyPlugin }))) {
          let [rules, options] = parseRules(ruleSet, context.postCssNodeCache);
          for (let rule3 of rules) {
            matchesPerPlugin.push([{ ...sort, options: { ...sort.options, ...options } }, rule3]);
          }
        }
      } else if (modifier === "DEFAULT" || modifier === "-DEFAULT") {
        let ruleSet = plugin3;
        let [rules, options] = parseRules(ruleSet, context.postCssNodeCache);
        for (let rule3 of rules) {
          matchesPerPlugin.push([{ ...sort, options: { ...sort.options, ...options } }, rule3]);
        }
      }
      if (matchesPerPlugin.length > 0) {
        let matchingTypes = Array.from(
          getMatchingTypes(
            (_b = (_a = sort.options) == null ? void 0 : _a.types) != null ? _b : [],
            modifier,
            (_c = sort.options) != null ? _c : {},
            context.tailwindConfig
          )
        ).map(([_, type]) => type);
        if (matchingTypes.length > 0) {
          typesByMatches.set(matchesPerPlugin, matchingTypes);
        }
        matches.push(matchesPerPlugin);
      }
    }
    if (isArbitraryValue2(modifier)) {
      if (matches.length > 1) {
        let findFallback = function(matches2) {
          if (matches2.length === 1) {
            return matches2[0];
          }
          return matches2.find((rules) => {
            let matchingTypes = typesByMatches.get(rules);
            return rules.some(([{ options }, rule3]) => {
              if (!isParsableNode(rule3)) {
                return false;
              }
              return options.types.some(
                ({ type, preferOnConflict }) => matchingTypes.includes(type) && preferOnConflict
              );
            });
          });
        };
        let [withAny, withoutAny] = matches.reduce(
          (group, plugin3) => {
            let hasAnyType = plugin3.some(
              ([{ options }]) => options.types.some(({ type }) => type === "any")
            );
            if (hasAnyType) {
              group[0].push(plugin3);
            } else {
              group[1].push(plugin3);
            }
            return group;
          },
          [[], []]
        );
        let fallback = (_d = findFallback(withoutAny)) != null ? _d : findFallback(withAny);
        if (fallback) {
          matches = [fallback];
        } else {
          let typesPerPlugin = matches.map(
            (match) => {
              var _a2;
              return /* @__PURE__ */ new Set([...(_a2 = typesByMatches.get(match)) != null ? _a2 : []]);
            }
          );
          for (let pluginTypes of typesPerPlugin) {
            for (let type of pluginTypes) {
              let removeFromOwnGroup = false;
              for (let otherGroup of typesPerPlugin) {
                if (pluginTypes === otherGroup)
                  continue;
                if (otherGroup.has(type)) {
                  otherGroup.delete(type);
                  removeFromOwnGroup = true;
                }
              }
              if (removeFromOwnGroup)
                pluginTypes.delete(type);
            }
          }
          let messages = [];
          for (let [idx, group] of typesPerPlugin.entries()) {
            for (let type of group) {
              let rules = matches[idx].map(([, rule3]) => rule3).flat().map(
                (rule3) => rule3.toString().split("\n").slice(1, -1).map((line) => line.trim()).map((x) => `      ${x}`).join("\n")
              ).join("\n\n");
              messages.push(
                `  Use \`${candidate.replace("[", `[${type}:`)}\` for \`${rules.trim()}\``
              );
              break;
            }
          }
          log_default.warn([
            `The class \`${candidate}\` is ambiguous and matches multiple utilities.`,
            ...messages,
            `If this is content and not a class, replace it with \`${candidate.replace("[", "&lsqb;").replace("]", "&rsqb;")}\` to silence this warning.`
          ]);
          continue;
        }
      }
      matches = matches.map((list4) => list4.filter((match) => isParsableNode(match[1])));
    }
    matches = matches.flat();
    matches = Array.from(recordCandidates(matches, classCandidate));
    matches = applyPrefix(matches, context);
    if (important) {
      matches = applyImportant(matches, classCandidate);
    }
    for (let variant of variants) {
      matches = applyVariant(variant, matches, context);
    }
    for (let match of matches) {
      match[1].raws.tailwind = { ...match[1].raws.tailwind, candidate };
      match = applyFinalFormat(match, { context, candidate, original });
      if (match === null) {
        continue;
      }
      yield match;
    }
  }
}
function applyFinalFormat(match, { context, candidate, original }) {
  if (!match[0].collectedFormats) {
    return match;
  }
  let isValid = true;
  let finalFormat;
  try {
    finalFormat = formatVariantSelector(match[0].collectedFormats, {
      context,
      candidate
    });
  } catch {
    return null;
  }
  let container = postcss_default.root({ nodes: [match[1].clone()] });
  container.walkRules((rule3) => {
    if (inKeyframes(rule3)) {
      return;
    }
    try {
      rule3.selector = finalizeSelector(rule3.selector, finalFormat, {
        candidate: original,
        context
      });
    } catch {
      isValid = false;
      return false;
    }
  });
  if (!isValid) {
    return null;
  }
  match[1] = container.nodes[0];
  return match;
}
function inKeyframes(rule3) {
  return rule3.parent && rule3.parent.type === "atrule" && rule3.parent.name === "keyframes";
}
function getImportantStrategy(important) {
  if (important === true) {
    return (rule3) => {
      if (inKeyframes(rule3)) {
        return;
      }
      rule3.walkDecls((d) => {
        if (d.parent.type === "rule" && !inKeyframes(d.parent)) {
          d.important = true;
        }
      });
    };
  }
  if (typeof important === "string") {
    return (rule3) => {
      if (inKeyframes(rule3)) {
        return;
      }
      rule3.selectors = rule3.selectors.map((selector) => {
        return applyImportantSelector(selector, important);
      });
    };
  }
}
function generateRules(candidates, context) {
  var _a;
  let allRules = [];
  let strategy = getImportantStrategy(context.tailwindConfig.important);
  for (let candidate of candidates) {
    if (context.notClassCache.has(candidate)) {
      continue;
    }
    if (context.candidateRuleCache.has(candidate)) {
      allRules = allRules.concat(Array.from(context.candidateRuleCache.get(candidate)));
      continue;
    }
    let matches = Array.from(resolveMatches(candidate, context));
    if (matches.length === 0) {
      context.notClassCache.add(candidate);
      continue;
    }
    context.classCache.set(candidate, matches);
    let rules = (_a = context.candidateRuleCache.get(candidate)) != null ? _a : /* @__PURE__ */ new Set();
    context.candidateRuleCache.set(candidate, rules);
    for (const match of matches) {
      let [{ sort, options }, rule3] = match;
      if (options.respectImportant && strategy) {
        let container = postcss_default.root({ nodes: [rule3.clone()] });
        container.walkRules(strategy);
        rule3 = container.nodes[0];
      }
      let newEntry = [sort, rule3];
      rules.add(newEntry);
      context.ruleCache.add(newEntry);
      allRules.push(newEntry);
    }
  }
  return allRules;
}
function isArbitraryValue2(input) {
  return input.startsWith("[") && input.endsWith("]");
}

// node_modules/tailwindcss/src/util/cloneNodes.js
function cloneNodes(nodes, source = void 0, raws = void 0) {
  return nodes.map((node) => {
    var _a;
    let cloned = node.clone();
    let shouldOverwriteSource = ((_a = node.raws.tailwind) == null ? void 0 : _a.preserveSource) !== true || !cloned.source;
    if (source !== void 0 && shouldOverwriteSource) {
      cloned.source = source;
      if ("walk" in cloned) {
        cloned.walk((child) => {
          child.source = source;
        });
      }
    }
    if (raws !== void 0) {
      cloned.raws.tailwind = {
        ...cloned.raws.tailwind,
        ...raws
      };
    }
    return cloned;
  });
}

// node_modules/tailwindcss/src/lib/regex.js
var REGEX_SPECIAL = /[\\^$.*+?()[\]{}|]/g;
var REGEX_HAS_SPECIAL = RegExp(REGEX_SPECIAL.source);
function toSource(source) {
  source = Array.isArray(source) ? source : [source];
  source = source.map((item) => item instanceof RegExp ? item.source : item);
  return source.join("");
}
function pattern(source) {
  return new RegExp(toSource(source), "g");
}
function any(sources) {
  return `(?:${sources.map(toSource).join("|")})`;
}
function optional(source) {
  return `(?:${toSource(source)})?`;
}
function zeroOrMore(source) {
  return `(?:${toSource(source)})*`;
}
function escape(string) {
  return string && REGEX_HAS_SPECIAL.test(string) ? string.replace(REGEX_SPECIAL, "\\$&") : string || "";
}

// node_modules/tailwindcss/src/lib/defaultExtractor.js
function defaultExtractor(context) {
  let patterns = Array.from(buildRegExps(context));
  return (content) => {
    var _a;
    let results = [];
    for (let pattern2 of patterns) {
      results = [...results, ...(_a = content.match(pattern2)) != null ? _a : []];
    }
    return results.filter((v) => v !== void 0).map(clipAtBalancedParens);
  };
}
function* buildRegExps(context) {
  let separator = context.tailwindConfig.separator;
  let variantGroupingEnabled = flagEnabled(context.tailwindConfig, "variantGrouping");
  let prefix3 = context.tailwindConfig.prefix !== "" ? optional(pattern([/-?/, escape(context.tailwindConfig.prefix)])) : "";
  let utility = any([
    /\[[^\s:'"`]+:[^\s\[\]]+\]/,
    /\[[^\s:'"`]+:[^\s]+?\[[^\s]+\][^\s]+?\]/,
    pattern([
      /-?(?:\w+)/,
      optional(
        any([
          pattern([
            /-(?:\w+-)*\[[^\s:]+\]/,
            /(?![{([]])/,
            /(?:\/[^\s'"`\\><$]*)?/
          ]),
          pattern([
            /-(?:\w+-)*\[[^\s]+\]/,
            /(?![{([]])/,
            /(?:\/[^\s'"`\\$]*)?/
          ]),
          /[-\/][^\s'"`\\$={><]*/
        ])
      )
    ])
  ]);
  let variantPatterns = [
    any([
      pattern([/@\[[^\s"'`]+\](\/[^\s"'`]+)?/, separator]),
      pattern([/([^\s"'`\[\\]+-)?\[[^\s"'`]+\]/, separator]),
      pattern([/[^\s"'`\[\\]+/, separator])
    ]),
    any([
      pattern([/([^\s"'`\[\\]+-)?\[[^\s`]+\]/, separator]),
      pattern([/[^\s`\[\\]+/, separator])
    ])
  ];
  for (const variantPattern of variantPatterns) {
    yield pattern([
      "((?=((",
      variantPattern,
      ")+))\\2)?",
      /!?/,
      prefix3,
      variantGroupingEnabled ? any([
        pattern([/\(/, utility, zeroOrMore([/,/, utility]), /\)/]),
        utility
      ]) : utility
    ]);
  }
  yield /[^<>"'`\s.(){}[\]#=%$]*[^<>"'`\s.(){}[\]#=%:$]/g;
}
var SPECIALS = /([\[\]'"`])([^\[\]'"`])?/g;
var ALLOWED_CLASS_CHARACTERS = /[^"'`\s<>\]]+/;
function clipAtBalancedParens(input) {
  if (!input.includes("-[")) {
    return input;
  }
  let depth = 0;
  let openStringTypes = [];
  let matches = input.matchAll(SPECIALS);
  matches = Array.from(matches).flatMap((match) => {
    const [, ...groups] = match;
    return groups.map(
      (group, idx) => Object.assign([], match, {
        index: match.index + idx,
        0: group
      })
    );
  });
  for (let match of matches) {
    let char = match[0];
    let inStringType = openStringTypes[openStringTypes.length - 1];
    if (char === inStringType) {
      openStringTypes.pop();
    } else if (char === "'" || char === '"' || char === "`") {
      openStringTypes.push(char);
    }
    if (inStringType) {
      continue;
    } else if (char === "[") {
      depth++;
      continue;
    } else if (char === "]") {
      depth--;
      continue;
    }
    if (depth < 0) {
      return input.substring(0, match.index - 1);
    }
    if (depth === 0 && !ALLOWED_CLASS_CHARACTERS.test(char)) {
      return input.substring(0, match.index);
    }
  }
  return input;
}

// node_modules/tailwindcss/src/lib/expandTailwindAtRules.js
var env2 = env;
var builtInExtractors = {
  DEFAULT: defaultExtractor
};
var builtInTransformers = {
  DEFAULT: (content) => content,
  svelte: (content) => content.replace(/(?:^|\s)class:/g, " ")
};
function getExtractor(context, fileExtension) {
  let extractors = context.tailwindConfig.content.extract;
  return extractors[fileExtension] || extractors.DEFAULT || builtInExtractors[fileExtension] || builtInExtractors.DEFAULT(context);
}
function getTransformer(tailwindConfig, fileExtension) {
  let transformers = tailwindConfig.content.transform;
  return transformers[fileExtension] || transformers.DEFAULT || builtInTransformers[fileExtension] || builtInTransformers.DEFAULT;
}
var extractorCache = /* @__PURE__ */ new WeakMap();
function getClassCandidates(content, extractor, candidates, seen) {
  if (!extractorCache.has(extractor)) {
    extractorCache.set(extractor, new import_quick_lru.default({ maxSize: 25e3 }));
  }
  for (let line of content.split("\n")) {
    line = line.trim();
    if (seen.has(line)) {
      continue;
    }
    seen.add(line);
    if (extractorCache.get(extractor).has(line)) {
      for (let match of extractorCache.get(extractor).get(line)) {
        candidates.add(match);
      }
    } else {
      let extractorMatches = extractor(line).filter((s) => s !== "!*");
      let lineMatchesSet = new Set(extractorMatches);
      for (let match of lineMatchesSet) {
        candidates.add(match);
      }
      extractorCache.get(extractor).set(line, lineMatchesSet);
    }
  }
}
function buildStylesheet(rules, context) {
  let sortedRules = context.offsets.sort(rules);
  let returnValue = {
    base: /* @__PURE__ */ new Set(),
    defaults: /* @__PURE__ */ new Set(),
    components: /* @__PURE__ */ new Set(),
    utilities: /* @__PURE__ */ new Set(),
    variants: /* @__PURE__ */ new Set()
  };
  for (let [sort, rule3] of sortedRules) {
    returnValue[sort.layer].add(rule3);
  }
  return returnValue;
}
function expandTailwindAtRules(context) {
  return async (root3) => {
    var _a;
    let layerNodes = {
      base: null,
      components: null,
      utilities: null,
      variants: null
    };
    root3.walkAtRules((rule3) => {
      if (rule3.name === "tailwind") {
        if (Object.keys(layerNodes).includes(rule3.params)) {
          layerNodes[rule3.params] = rule3;
        }
      }
    });
    if (Object.values(layerNodes).every((n) => n === null)) {
      return root3;
    }
    let candidates = /* @__PURE__ */ new Set([...(_a = context.candidates) != null ? _a : [], NOT_ON_DEMAND]);
    let seen = /* @__PURE__ */ new Set();
    env2.DEBUG && console.time("Reading changed files");
    if (void 0) {
      for (let candidate of null.parseCandidateStringsFromFiles(
        context.changedContent
      )) {
        candidates.add(candidate);
      }
    } else {
      await Promise.all(
        context.changedContent.map(async ({ file, content, extension }) => {
          let transformer = getTransformer(context.tailwindConfig, extension);
          let extractor = getExtractor(context, extension);
          content = file ? await fs_default.promises.readFile(file, "utf8") : content;
          getClassCandidates(transformer(content), extractor, candidates, seen);
        })
      );
    }
    env2.DEBUG && console.timeEnd("Reading changed files");
    let classCacheCount = context.classCache.size;
    env2.DEBUG && console.time("Generate rules");
    env2.DEBUG && console.time("Sorting candidates");
    let sortedCandidates = void 0 ? candidates : new Set(
      [...candidates].sort((a, z) => {
        if (a === z)
          return 0;
        if (a < z)
          return -1;
        return 1;
      })
    );
    env2.DEBUG && console.timeEnd("Sorting candidates");
    generateRules(sortedCandidates, context);
    env2.DEBUG && console.timeEnd("Generate rules");
    env2.DEBUG && console.time("Build stylesheet");
    if (context.stylesheetCache === null || context.classCache.size !== classCacheCount) {
      context.stylesheetCache = buildStylesheet([...context.ruleCache], context);
    }
    env2.DEBUG && console.timeEnd("Build stylesheet");
    let {
      defaults: defaultNodes,
      base: baseNodes,
      components: componentNodes,
      utilities: utilityNodes,
      variants: screenNodes
    } = context.stylesheetCache;
    if (layerNodes.base) {
      layerNodes.base.before(
        cloneNodes([...baseNodes, ...defaultNodes], layerNodes.base.source, {
          layer: "base"
        })
      );
      layerNodes.base.remove();
    }
    if (layerNodes.components) {
      layerNodes.components.before(
        cloneNodes([...componentNodes], layerNodes.components.source, {
          layer: "components"
        })
      );
      layerNodes.components.remove();
    }
    if (layerNodes.utilities) {
      layerNodes.utilities.before(
        cloneNodes([...utilityNodes], layerNodes.utilities.source, {
          layer: "utilities"
        })
      );
      layerNodes.utilities.remove();
    }
    const variantNodes = Array.from(screenNodes).filter((node) => {
      var _a2;
      const parentLayer = (_a2 = node.raws.tailwind) == null ? void 0 : _a2.parentLayer;
      if (parentLayer === "components") {
        return layerNodes.components !== null;
      }
      if (parentLayer === "utilities") {
        return layerNodes.utilities !== null;
      }
      return true;
    });
    if (layerNodes.variants) {
      layerNodes.variants.before(
        cloneNodes(variantNodes, layerNodes.variants.source, {
          layer: "variants"
        })
      );
      layerNodes.variants.remove();
    } else if (variantNodes.length > 0) {
      root3.append(
        cloneNodes(variantNodes, root3.source, {
          layer: "variants"
        })
      );
    }
    const hasUtilityVariants = variantNodes.some(
      (node) => {
        var _a2;
        return ((_a2 = node.raws.tailwind) == null ? void 0 : _a2.parentLayer) === "utilities";
      }
    );
    if (layerNodes.utilities && utilityNodes.size === 0 && !hasUtilityVariants) {
      log_default.warn("content-problems", [
        "No utility classes were detected in your source files. If this is unexpected, double-check the `content` option in your Tailwind CSS configuration.",
        "https://tailwindcss.com/docs/content-configuration"
      ]);
    }
    if (env2.DEBUG) {
      console.log("Potential classes: ", candidates.size);
      console.log("Active contexts: ", contextSourcesMap.size);
    }
    context.changedContent = [];
    root3.walkAtRules("layer", (rule3) => {
      if (Object.keys(layerNodes).includes(rule3.params)) {
        rule3.remove();
      }
    });
  };
}

// node_modules/tailwindcss/src/lib/expandApplyAtRules.js
var import_postcss_selector_parser7 = __toESM(require_dist());
function extractClasses(node) {
  let groups = /* @__PURE__ */ new Map();
  let container = postcss_default.root({ nodes: [node.clone()] });
  container.walkRules((rule3) => {
    (0, import_postcss_selector_parser7.default)((selectors) => {
      selectors.walkClasses((classSelector) => {
        let parentSelector = classSelector.parent.toString();
        let classes2 = groups.get(parentSelector);
        if (!classes2) {
          groups.set(parentSelector, classes2 = /* @__PURE__ */ new Set());
        }
        classes2.add(classSelector.value);
      });
    }).processSync(rule3.selector);
  });
  let normalizedGroups = Array.from(groups.values(), (classes2) => Array.from(classes2));
  let classes = normalizedGroups.flat();
  return Object.assign(classes, { groups: normalizedGroups });
}
var selectorExtractor = (0, import_postcss_selector_parser7.default)();
function extractSelectors(ruleSelectors) {
  return selectorExtractor.astSync(ruleSelectors);
}
function extractBaseCandidates(candidates, separator) {
  let baseClasses = /* @__PURE__ */ new Set();
  for (let candidate of candidates) {
    baseClasses.add(candidate.split(separator).pop());
  }
  return Array.from(baseClasses);
}
function prefix2(context, selector) {
  let prefix3 = context.tailwindConfig.prefix;
  return typeof prefix3 === "function" ? prefix3(selector) : prefix3 + selector;
}
function* pathToRoot(node) {
  yield node;
  while (node.parent) {
    yield node.parent;
    node = node.parent;
  }
}
function shallowClone(node, overrides = {}) {
  let children = node.nodes;
  node.nodes = [];
  let tmp = node.clone(overrides);
  node.nodes = children;
  return tmp;
}
function nestedClone(node) {
  for (let parent of pathToRoot(node)) {
    if (node === parent) {
      continue;
    }
    if (parent.type === "root") {
      break;
    }
    node = shallowClone(parent, {
      nodes: [node]
    });
  }
  return node;
}
function buildLocalApplyCache(root3, context) {
  let cache2 = /* @__PURE__ */ new Map();
  root3.walkRules((rule3) => {
    var _a;
    for (let node of pathToRoot(rule3)) {
      if (((_a = node.raws.tailwind) == null ? void 0 : _a.layer) !== void 0) {
        return;
      }
    }
    let container = nestedClone(rule3);
    let sort = context.offsets.create("user");
    for (let className of extractClasses(rule3)) {
      let list4 = cache2.get(className) || [];
      cache2.set(className, list4);
      list4.push([
        {
          layer: "user",
          sort,
          important: false
        },
        container
      ]);
    }
  });
  return cache2;
}
function buildApplyCache(applyCandidates, context) {
  for (let candidate of applyCandidates) {
    if (context.notClassCache.has(candidate) || context.applyClassCache.has(candidate)) {
      continue;
    }
    if (context.classCache.has(candidate)) {
      context.applyClassCache.set(
        candidate,
        context.classCache.get(candidate).map(([meta, rule3]) => [meta, rule3.clone()])
      );
      continue;
    }
    let matches = Array.from(resolveMatches(candidate, context));
    if (matches.length === 0) {
      context.notClassCache.add(candidate);
      continue;
    }
    context.applyClassCache.set(candidate, matches);
  }
  return context.applyClassCache;
}
function lazyCache(buildCacheFn) {
  let cache2 = null;
  return {
    get: (name) => {
      cache2 = cache2 || buildCacheFn();
      return cache2.get(name);
    },
    has: (name) => {
      cache2 = cache2 || buildCacheFn();
      return cache2.has(name);
    }
  };
}
function combineCaches(caches) {
  return {
    get: (name) => caches.flatMap((cache2) => cache2.get(name) || []),
    has: (name) => caches.some((cache2) => cache2.has(name))
  };
}
function extractApplyCandidates(params) {
  let candidates = params.split(/[\s\t\n]+/g);
  if (candidates[candidates.length - 1] === "!important") {
    return [candidates.slice(0, -1), true];
  }
  return [candidates, false];
}
function processApply(root3, context, localCache) {
  let applyCandidates = /* @__PURE__ */ new Set();
  let applies = [];
  root3.walkAtRules("apply", (rule3) => {
    let [candidates] = extractApplyCandidates(rule3.params);
    for (let util of candidates) {
      applyCandidates.add(util);
    }
    applies.push(rule3);
  });
  if (applies.length === 0) {
    return;
  }
  let applyClassCache = combineCaches([localCache, buildApplyCache(applyCandidates, context)]);
  function replaceSelector(selector, utilitySelectors, candidate) {
    let selectorList = extractSelectors(selector);
    let utilitySelectorsList = extractSelectors(utilitySelectors);
    let candidateList = extractSelectors(`.${escapeClassName(candidate)}`);
    let candidateClass = candidateList.nodes[0].nodes[0];
    selectorList.each((sel) => {
      let replaced = /* @__PURE__ */ new Set();
      utilitySelectorsList.each((utilitySelector) => {
        let hasReplaced = false;
        utilitySelector = utilitySelector.clone();
        utilitySelector.walkClasses((node) => {
          if (node.value !== candidateClass.value) {
            return;
          }
          if (hasReplaced) {
            return;
          }
          node.replaceWith(...sel.nodes.map((node2) => node2.clone()));
          replaced.add(utilitySelector);
          hasReplaced = true;
        });
      });
      for (let sel2 of replaced) {
        let groups = [[]];
        for (let node of sel2.nodes) {
          if (node.type === "combinator") {
            groups.push(node);
            groups.push([]);
          } else {
            let last = groups[groups.length - 1];
            last.push(node);
          }
        }
        sel2.nodes = [];
        for (let group of groups) {
          if (Array.isArray(group)) {
            group.sort((a, b) => {
              if (a.type === "tag" && b.type === "class") {
                return -1;
              } else if (a.type === "class" && b.type === "tag") {
                return 1;
              } else if (a.type === "class" && b.type === "pseudo" && b.value.startsWith("::")) {
                return -1;
              } else if (a.type === "pseudo" && a.value.startsWith("::") && b.type === "class") {
                return 1;
              }
              return 0;
            });
          }
          sel2.nodes = sel2.nodes.concat(group);
        }
      }
      sel.replaceWith(...replaced);
    });
    return selectorList.toString();
  }
  let perParentApplies = /* @__PURE__ */ new Map();
  for (let apply of applies) {
    let [candidates] = perParentApplies.get(apply.parent) || [[], apply.source];
    perParentApplies.set(apply.parent, [candidates, apply.source]);
    let [applyCandidates2, important] = extractApplyCandidates(apply.params);
    if (apply.parent.type === "atrule") {
      if (apply.parent.name === "screen") {
        let screenType = apply.parent.params;
        throw apply.error(
          `@apply is not supported within nested at-rules like @screen. We suggest you write this as @apply ${applyCandidates2.map((c) => `${screenType}:${c}`).join(" ")} instead.`
        );
      }
      throw apply.error(
        `@apply is not supported within nested at-rules like @${apply.parent.name}. You can fix this by un-nesting @${apply.parent.name}.`
      );
    }
    for (let applyCandidate of applyCandidates2) {
      if ([prefix2(context, "group"), prefix2(context, "peer")].includes(applyCandidate)) {
        throw apply.error(`@apply should not be used with the '${applyCandidate}' utility`);
      }
      if (!applyClassCache.has(applyCandidate)) {
        throw apply.error(
          `The \`${applyCandidate}\` class does not exist. If \`${applyCandidate}\` is a custom class, make sure it is defined within a \`@layer\` directive.`
        );
      }
      let rules = applyClassCache.get(applyCandidate);
      candidates.push([applyCandidate, important, rules]);
    }
  }
  for (let [parent, [candidates, atApplySource]] of perParentApplies) {
    let siblings = [];
    for (let [applyCandidate, important, rules] of candidates) {
      let potentialApplyCandidates = [
        applyCandidate,
        ...extractBaseCandidates([applyCandidate], context.tailwindConfig.separator)
      ];
      for (let [meta, node] of rules) {
        let parentClasses = extractClasses(parent);
        let nodeClasses = extractClasses(node);
        nodeClasses = nodeClasses.groups.filter(
          (classList) => classList.some((className) => potentialApplyCandidates.includes(className))
        ).flat();
        nodeClasses = nodeClasses.concat(
          extractBaseCandidates(nodeClasses, context.tailwindConfig.separator)
        );
        let intersects = parentClasses.some((selector) => nodeClasses.includes(selector));
        if (intersects) {
          throw node.error(
            `You cannot \`@apply\` the \`${applyCandidate}\` utility here because it creates a circular dependency.`
          );
        }
        let root4 = postcss_default.root({ nodes: [node.clone()] });
        root4.walk((node2) => {
          node2.source = atApplySource;
        });
        let canRewriteSelector = node.type !== "atrule" || node.type === "atrule" && node.name !== "keyframes";
        if (canRewriteSelector) {
          root4.walkRules((rule3) => {
            if (!extractClasses(rule3).some((candidate) => candidate === applyCandidate)) {
              rule3.remove();
              return;
            }
            let importantSelector = typeof context.tailwindConfig.important === "string" ? context.tailwindConfig.important : null;
            let isGenerated = parent.raws.tailwind !== void 0;
            let parentSelector = isGenerated && importantSelector && parent.selector.indexOf(importantSelector) === 0 ? parent.selector.slice(importantSelector.length) : parent.selector;
            rule3.selector = replaceSelector(parentSelector, rule3.selector, applyCandidate);
            if (importantSelector && parentSelector !== parent.selector) {
              rule3.selector = applyImportantSelector(rule3.selector, importantSelector);
            }
            rule3.walkDecls((d) => {
              d.important = meta.important || important;
            });
            let selector = (0, import_postcss_selector_parser7.default)().astSync(rule3.selector);
            selector.each((sel) => movePseudos(sel));
            rule3.selector = selector.toString();
          });
        }
        if (!root4.nodes[0]) {
          continue;
        }
        siblings.push([meta.sort, root4.nodes[0]]);
      }
    }
    let nodes = context.offsets.sort(siblings).map((s) => s[1]);
    parent.after(nodes);
  }
  for (let apply of applies) {
    if (apply.parent.nodes.length > 1) {
      apply.remove();
    } else {
      apply.parent.remove();
    }
  }
  processApply(root3, context, localCache);
}
function expandApplyAtRules(context) {
  return (root3) => {
    let localCache = lazyCache(() => buildLocalApplyCache(root3, context));
    processApply(root3, context, localCache);
  };
}

// node_modules/tailwindcss/src/lib/evaluateTailwindFunctions.js
var import_dlv2 = __toESM(require_dlv_umd());
var import_didyoumean = __toESM(require_didYouMean_1_2_1());
var import_value_parser = __toESM(require_value_parser());
function isObject(input) {
  return typeof input === "object" && input !== null;
}
function findClosestExistingPath(theme, path) {
  let parts = toPath(path);
  do {
    parts.pop();
    if ((0, import_dlv2.default)(theme, parts) !== void 0)
      break;
  } while (parts.length);
  return parts.length ? parts : void 0;
}
function pathToString(path) {
  if (typeof path === "string")
    return path;
  return path.reduce((acc, cur, i) => {
    if (cur.includes("."))
      return `${acc}[${cur}]`;
    return i === 0 ? cur : `${acc}.${cur}`;
  }, "");
}
function list2(items) {
  return items.map((key) => `'${key}'`).join(", ");
}
function listKeys(obj) {
  return list2(Object.keys(obj));
}
function validatePath(config, path, defaultValue, themeOpts = {}) {
  const pathString = Array.isArray(path) ? pathToString(path) : path.replace(/^['"]+|['"]+$/g, "");
  const pathSegments = Array.isArray(path) ? path : toPath(pathString);
  const value2 = (0, import_dlv2.default)(config.theme, pathSegments, defaultValue);
  if (value2 === void 0) {
    let error = `'${pathString}' does not exist in your theme config.`;
    const parentSegments = pathSegments.slice(0, -1);
    const parentValue = (0, import_dlv2.default)(config.theme, parentSegments);
    if (isObject(parentValue)) {
      const validKeys = Object.keys(parentValue).filter(
        (key) => validatePath(config, [...parentSegments, key]).isValid
      );
      const suggestion = (0, import_didyoumean.default)(pathSegments[pathSegments.length - 1], validKeys);
      if (suggestion) {
        error += ` Did you mean '${pathToString([...parentSegments, suggestion])}'?`;
      } else if (validKeys.length > 0) {
        error += ` '${pathToString(parentSegments)}' has the following valid keys: ${list2(
          validKeys
        )}`;
      }
    } else {
      const closestPath = findClosestExistingPath(config.theme, pathString);
      if (closestPath) {
        const closestValue = (0, import_dlv2.default)(config.theme, closestPath);
        if (isObject(closestValue)) {
          error += ` '${pathToString(closestPath)}' has the following keys: ${listKeys(
            closestValue
          )}`;
        } else {
          error += ` '${pathToString(closestPath)}' is not an object.`;
        }
      } else {
        error += ` Your theme has the following top-level keys: ${listKeys(config.theme)}`;
      }
    }
    return {
      isValid: false,
      error
    };
  }
  if (!(typeof value2 === "string" || typeof value2 === "number" || typeof value2 === "function" || value2 instanceof String || value2 instanceof Number || Array.isArray(value2))) {
    let error = `'${pathString}' was found but does not resolve to a string.`;
    if (isObject(value2)) {
      let validKeys = Object.keys(value2).filter(
        (key) => validatePath(config, [...pathSegments, key]).isValid
      );
      if (validKeys.length) {
        error += ` Did you mean something like '${pathToString([...pathSegments, validKeys[0]])}'?`;
      }
    }
    return {
      isValid: false,
      error
    };
  }
  const [themeSection] = pathSegments;
  return {
    isValid: true,
    value: transformThemeValue(themeSection)(value2, themeOpts)
  };
}
function extractArgs(node, vNodes, functions) {
  vNodes = vNodes.map((vNode) => resolveVNode(node, vNode, functions));
  let args = [""];
  for (let vNode of vNodes) {
    if (vNode.type === "div" && vNode.value === ",") {
      args.push("");
    } else {
      args[args.length - 1] += import_value_parser.default.stringify(vNode);
    }
  }
  return args;
}
function resolveVNode(node, vNode, functions) {
  if (vNode.type === "function" && functions[vNode.value] !== void 0) {
    let args = extractArgs(node, vNode.nodes, functions);
    vNode.type = "word";
    vNode.value = functions[vNode.value](node, ...args);
  }
  return vNode;
}
function resolveFunctions(node, input, functions) {
  let hasAnyFn = Object.keys(functions).some((fn) => input.includes(`${fn}(`));
  if (!hasAnyFn)
    return input;
  return (0, import_value_parser.default)(input).walk((vNode) => {
    resolveVNode(node, vNode, functions);
  }).toString();
}
var nodeTypePropertyMap = {
  atrule: "params",
  decl: "value"
};
function* toPaths(path) {
  path = path.replace(/^['"]+|['"]+$/g, "");
  let matches = path.match(/^([^\s]+)(?![^\[]*\])(?:\s*\/\s*([^\/\s]+))$/);
  let alpha = void 0;
  yield [path, void 0];
  if (matches) {
    path = matches[1];
    alpha = matches[2];
    yield [path, alpha];
  }
}
function resolvePath(config, path, defaultValue) {
  var _a;
  const results = Array.from(toPaths(path)).map(([path2, alpha]) => {
    return Object.assign(validatePath(config, path2, defaultValue, { opacityValue: alpha }), {
      resolvedPath: path2,
      alpha
    });
  });
  return (_a = results.find((result) => result.isValid)) != null ? _a : results[0];
}
function evaluateTailwindFunctions_default(context) {
  let config = context.tailwindConfig;
  let functions = {
    theme: (node, path, ...defaultValue) => {
      var _a;
      let { isValid, value: value2, error, alpha } = resolvePath(
        config,
        path,
        defaultValue.length ? defaultValue : void 0
      );
      if (!isValid) {
        let parentNode = node.parent;
        let candidate = (_a = parentNode == null ? void 0 : parentNode.raws.tailwind) == null ? void 0 : _a.candidate;
        if (parentNode && candidate !== void 0) {
          context.markInvalidUtilityNode(parentNode);
          parentNode.remove();
          log_default.warn("invalid-theme-key-in-class", [
            `The utility \`${candidate}\` contains an invalid theme value and was not generated.`
          ]);
          return;
        }
        throw node.error(error);
      }
      let maybeColor = parseColorFormat(value2);
      let isColorFunction = maybeColor !== void 0 && typeof maybeColor === "function";
      if (alpha !== void 0 || isColorFunction) {
        if (alpha === void 0) {
          alpha = 1;
        }
        value2 = withAlphaValue(maybeColor, alpha, maybeColor);
      }
      return value2;
    },
    screen: (node, screen) => {
      screen = screen.replace(/^['"]+/g, "").replace(/['"]+$/g, "");
      let screens = normalizeScreens(config.theme.screens);
      let screenDefinition = screens.find(({ name }) => name === screen);
      if (!screenDefinition) {
        throw node.error(`The '${screen}' screen does not exist in your theme.`);
      }
      return buildMediaQuery(screenDefinition);
    }
  };
  return (root3) => {
    root3.walk((node) => {
      let property = nodeTypePropertyMap[node.type];
      if (property === void 0) {
        return;
      }
      node[property] = resolveFunctions(node, node[property], functions);
    });
  };
}

// node_modules/tailwindcss/src/lib/substituteScreenAtRules.js
function substituteScreenAtRules_default({ tailwindConfig: { theme } }) {
  return function(css) {
    css.walkAtRules("screen", (atRule3) => {
      let screen = atRule3.params;
      let screens = normalizeScreens(theme.screens);
      let screenDefinition = screens.find(({ name }) => name === screen);
      if (!screenDefinition) {
        throw atRule3.error(`No \`${screen}\` screen found.`);
      }
      atRule3.name = "media";
      atRule3.params = buildMediaQuery(screenDefinition);
    });
  };
}

// node_modules/tailwindcss/src/lib/resolveDefaultsAtRules.js
var import_postcss_selector_parser8 = __toESM(require_dist());
var getNode = {
  id(node) {
    return import_postcss_selector_parser8.default.attribute({
      attribute: "id",
      operator: "=",
      value: node.value,
      quoteMark: '"'
    });
  }
};
function minimumImpactSelector(nodes) {
  let rest = nodes.filter((node2) => {
    if (node2.type !== "pseudo")
      return true;
    if (node2.nodes.length > 0)
      return true;
    return node2.value.startsWith("::") || [":before", ":after", ":first-line", ":first-letter"].includes(node2.value);
  }).reverse();
  let searchFor = /* @__PURE__ */ new Set(["tag", "class", "id", "attribute"]);
  let splitPointIdx = rest.findIndex((n) => searchFor.has(n.type));
  if (splitPointIdx === -1)
    return rest.reverse().join("").trim();
  let node = rest[splitPointIdx];
  let bestNode = getNode[node.type] ? getNode[node.type](node) : node;
  rest = rest.slice(0, splitPointIdx);
  let combinatorIdx = rest.findIndex((n) => n.type === "combinator" && n.value === ">");
  if (combinatorIdx !== -1) {
    rest.splice(0, combinatorIdx);
    rest.unshift(import_postcss_selector_parser8.default.universal());
  }
  return [bestNode, ...rest.reverse()].join("").trim();
}
var elementSelectorParser = (0, import_postcss_selector_parser8.default)((selectors) => {
  return selectors.map((s) => {
    let nodes = s.split((n) => n.type === "combinator" && n.value === " ").pop();
    return minimumImpactSelector(nodes);
  });
});
var cache = /* @__PURE__ */ new Map();
function extractElementSelector(selector) {
  if (!cache.has(selector)) {
    cache.set(selector, elementSelectorParser.transformSync(selector));
  }
  return cache.get(selector);
}
function resolveDefaultsAtRules({ tailwindConfig }) {
  return (root3) => {
    var _a, _b;
    let variableNodeMap = /* @__PURE__ */ new Map();
    let universals = /* @__PURE__ */ new Set();
    root3.walkAtRules("defaults", (rule3) => {
      if (rule3.nodes && rule3.nodes.length > 0) {
        universals.add(rule3);
        return;
      }
      let variable = rule3.params;
      if (!variableNodeMap.has(variable)) {
        variableNodeMap.set(variable, /* @__PURE__ */ new Set());
      }
      variableNodeMap.get(variable).add(rule3.parent);
      rule3.remove();
    });
    if (flagEnabled(tailwindConfig, "optimizeUniversalDefaults")) {
      for (let universal of universals) {
        let selectorGroups = /* @__PURE__ */ new Map();
        let rules = (_a = variableNodeMap.get(universal.params)) != null ? _a : [];
        for (let rule3 of rules) {
          for (let selector of extractElementSelector(rule3.selector)) {
            let selectorGroupName = selector.includes(":-") || selector.includes("::-") ? selector : "__DEFAULT__";
            let selectors = (_b = selectorGroups.get(selectorGroupName)) != null ? _b : /* @__PURE__ */ new Set();
            selectorGroups.set(selectorGroupName, selectors);
            selectors.add(selector);
          }
        }
        if (flagEnabled(tailwindConfig, "optimizeUniversalDefaults")) {
          if (selectorGroups.size === 0) {
            universal.remove();
            continue;
          }
          for (let [, selectors] of selectorGroups) {
            let universalRule = postcss_default.rule({
              source: universal.source
            });
            universalRule.selectors = [...selectors];
            universalRule.append(universal.nodes.map((node) => node.clone()));
            universal.before(universalRule);
          }
        }
        universal.remove();
      }
    } else if (universals.size) {
      let universalRule = postcss_default.rule({
        selectors: ["*", "::before", "::after"]
      });
      for (let universal of universals) {
        universalRule.append(universal.nodes);
        if (!universalRule.parent) {
          universal.before(universalRule);
        }
        if (!universalRule.source) {
          universalRule.source = universal.source;
        }
        universal.remove();
      }
      let backdropRule = universalRule.clone({
        selectors: ["::backdrop"]
      });
      universalRule.after(backdropRule);
    }
  };
}

// node_modules/tailwindcss/src/lib/collapseAdjacentRules.js
var comparisonMap = {
  atrule: ["name", "params"],
  rule: ["selector"]
};
var types = new Set(Object.keys(comparisonMap));
function collapseAdjacentRules() {
  function collapseRulesIn(root3) {
    let currentRule = null;
    root3.each((node) => {
      if (!types.has(node.type)) {
        currentRule = null;
        return;
      }
      if (currentRule === null) {
        currentRule = node;
        return;
      }
      let properties = comparisonMap[node.type];
      if (node.type === "atrule" && node.name === "font-face") {
        currentRule = node;
      } else if (properties.every(
        (property) => {
          var _a, _b;
          return ((_a = node[property]) != null ? _a : "").replace(/\s+/g, " ") === ((_b = currentRule[property]) != null ? _b : "").replace(/\s+/g, " ");
        }
      )) {
        if (node.nodes) {
          currentRule.append(node.nodes);
        }
        node.remove();
      } else {
        currentRule = node;
      }
    });
    root3.each((node) => {
      if (node.type === "atrule") {
        collapseRulesIn(node);
      }
    });
  }
  return (root3) => {
    collapseRulesIn(root3);
  };
}

// node_modules/tailwindcss/src/lib/collapseDuplicateDeclarations.js
function collapseDuplicateDeclarations() {
  return (root3) => {
    root3.walkRules((node) => {
      let seen = /* @__PURE__ */ new Map();
      let droppable = /* @__PURE__ */ new Set([]);
      let byProperty = /* @__PURE__ */ new Map();
      node.walkDecls((decl3) => {
        if (decl3.parent !== node) {
          return;
        }
        if (seen.has(decl3.prop)) {
          if (seen.get(decl3.prop).value === decl3.value) {
            droppable.add(seen.get(decl3.prop));
            seen.set(decl3.prop, decl3);
            return;
          }
          if (!byProperty.has(decl3.prop)) {
            byProperty.set(decl3.prop, /* @__PURE__ */ new Set());
          }
          byProperty.get(decl3.prop).add(seen.get(decl3.prop));
          byProperty.get(decl3.prop).add(decl3);
        }
        seen.set(decl3.prop, decl3);
      });
      for (let decl3 of droppable) {
        decl3.remove();
      }
      for (let declarations of byProperty.values()) {
        let byUnit = /* @__PURE__ */ new Map();
        for (let decl3 of declarations) {
          let unit = resolveUnit(decl3.value);
          if (unit === null) {
            continue;
          }
          if (!byUnit.has(unit)) {
            byUnit.set(unit, /* @__PURE__ */ new Set());
          }
          byUnit.get(unit).add(decl3);
        }
        for (let declarations2 of byUnit.values()) {
          let removableDeclarations = Array.from(declarations2).slice(0, -1);
          for (let decl3 of removableDeclarations) {
            decl3.remove();
          }
        }
      }
    });
  };
}
var UNITLESS_NUMBER = Symbol("unitless-number");
function resolveUnit(input) {
  var _a;
  let result = /^-?\d*.?\d+([\w%]+)?$/g.exec(input);
  if (result) {
    return (_a = result[1]) != null ? _a : UNITLESS_NUMBER;
  }
  return null;
}

// node_modules/tailwindcss/src/lib/partitionApplyAtRules.js
function partitionRules(root3) {
  if (!root3.walkAtRules)
    return;
  let applyParents = /* @__PURE__ */ new Set();
  root3.walkAtRules("apply", (rule3) => {
    applyParents.add(rule3.parent);
  });
  if (applyParents.size === 0) {
    return;
  }
  for (let rule3 of applyParents) {
    let nodeGroups = [];
    let lastGroup = [];
    for (let node of rule3.nodes) {
      if (node.type === "atrule" && node.name === "apply") {
        if (lastGroup.length > 0) {
          nodeGroups.push(lastGroup);
          lastGroup = [];
        }
        nodeGroups.push([node]);
      } else {
        lastGroup.push(node);
      }
    }
    if (lastGroup.length > 0) {
      nodeGroups.push(lastGroup);
    }
    if (nodeGroups.length === 1) {
      continue;
    }
    for (let group of [...nodeGroups].reverse()) {
      let clone = rule3.clone({ nodes: [] });
      clone.append(group);
      rule3.after(clone);
    }
    rule3.remove();
  }
}
function expandApplyAtRules2() {
  return (root3) => {
    partitionRules(root3);
  };
}

// node_modules/tailwindcss/src/lib/detectNesting.js
function isRoot(node) {
  return node.type === "root";
}
function isAtLayer(node) {
  return node.type === "atrule" && node.name === "layer";
}
function detectNesting_default(_context) {
  return (root3, result) => {
    let found = false;
    root3.walkAtRules("tailwind", (node) => {
      if (found)
        return false;
      if (node.parent && !(isRoot(node.parent) || isAtLayer(node.parent))) {
        found = true;
        node.warn(
          result,
          [
            "Nested @tailwind rules were detected, but are not supported.",
            "Consider using a prefix to scope Tailwind's classes: https://tailwindcss.com/docs/configuration#prefix",
            "Alternatively, use the important selector strategy: https://tailwindcss.com/docs/configuration#selector-strategy"
          ].join("\n")
        );
        return false;
      }
    });
    root3.walkRules((rule3) => {
      if (found)
        return false;
      rule3.walkRules((nestedRule) => {
        found = true;
        nestedRule.warn(
          result,
          [
            "Nested CSS was detected, but CSS nesting has not been configured correctly.",
            "Please enable a CSS nesting plugin *before* Tailwind in your configuration.",
            "See how here: https://tailwindcss.com/docs/using-with-preprocessors#nesting"
          ].join("\n")
        );
        return false;
      });
    });
  };
}

// node_modules/tailwindcss/src/processTailwindFeatures.js
function processTailwindFeatures(setupContext) {
  return async function(root3, result) {
    let { tailwindDirectives, applyDirectives } = normalizeTailwindDirectives(root3);
    detectNesting_default()(root3, result);
    expandApplyAtRules2()(root3, result);
    let context = setupContext({
      tailwindDirectives,
      applyDirectives,
      registerDependency(dependency) {
        result.messages.push({
          plugin: "tailwindcss",
          parent: result.opts.from,
          ...dependency
        });
      },
      createContext(tailwindConfig, changedContent) {
        return createContext(tailwindConfig, changedContent, root3);
      }
    })(root3, result);
    if (context.tailwindConfig.separator === "-") {
      throw new Error(
        "The '-' character cannot be used as a custom separator in JIT mode due to parsing ambiguity. Please use another character like '_' instead."
      );
    }
    issueFlagNotices(context.tailwindConfig);
    await expandTailwindAtRules(context)(root3, result);
    expandApplyAtRules2()(root3, result);
    expandApplyAtRules(context)(root3, result);
    evaluateTailwindFunctions_default(context)(root3, result);
    substituteScreenAtRules_default(context)(root3, result);
    resolveDefaultsAtRules(context)(root3, result);
    collapseAdjacentRules(context)(root3, result);
    collapseDuplicateDeclarations(context)(root3, result);
  };
}

// node_modules/tailwindcss/src/corePluginList.js
var corePluginList_default = ["preflight", "container", "accessibility", "pointerEvents", "visibility", "position", "inset", "isolation", "zIndex", "order", "gridColumn", "gridColumnStart", "gridColumnEnd", "gridRow", "gridRowStart", "gridRowEnd", "float", "clear", "margin", "boxSizing", "lineClamp", "display", "aspectRatio", "height", "maxHeight", "minHeight", "width", "minWidth", "maxWidth", "flex", "flexShrink", "flexGrow", "flexBasis", "tableLayout", "captionSide", "borderCollapse", "borderSpacing", "transformOrigin", "translate", "rotate", "skew", "scale", "transform", "animation", "cursor", "touchAction", "userSelect", "resize", "scrollSnapType", "scrollSnapAlign", "scrollSnapStop", "scrollMargin", "scrollPadding", "listStylePosition", "listStyleType", "listStyleImage", "appearance", "columns", "breakBefore", "breakInside", "breakAfter", "gridAutoColumns", "gridAutoFlow", "gridAutoRows", "gridTemplateColumns", "gridTemplateRows", "flexDirection", "flexWrap", "placeContent", "placeItems", "alignContent", "alignItems", "justifyContent", "justifyItems", "gap", "space", "divideWidth", "divideStyle", "divideColor", "divideOpacity", "placeSelf", "alignSelf", "justifySelf", "overflow", "overscrollBehavior", "scrollBehavior", "textOverflow", "hyphens", "whitespace", "wordBreak", "borderRadius", "borderWidth", "borderStyle", "borderColor", "borderOpacity", "backgroundColor", "backgroundOpacity", "backgroundImage", "gradientColorStops", "boxDecorationBreak", "backgroundSize", "backgroundAttachment", "backgroundClip", "backgroundPosition", "backgroundRepeat", "backgroundOrigin", "fill", "stroke", "strokeWidth", "objectFit", "objectPosition", "padding", "textAlign", "textIndent", "verticalAlign", "fontFamily", "fontSize", "fontWeight", "textTransform", "fontStyle", "fontVariantNumeric", "lineHeight", "letterSpacing", "textColor", "textOpacity", "textDecoration", "textDecorationColor", "textDecorationStyle", "textDecorationThickness", "textUnderlineOffset", "fontSmoothing", "placeholderColor", "placeholderOpacity", "caretColor", "accentColor", "opacity", "backgroundBlendMode", "mixBlendMode", "boxShadow", "boxShadowColor", "outlineStyle", "outlineWidth", "outlineOffset", "outlineColor", "ringWidth", "ringColor", "ringOpacity", "ringOffsetWidth", "ringOffsetColor", "blur", "brightness", "contrast", "dropShadow", "grayscale", "hueRotate", "invert", "saturate", "sepia", "filter", "backdropBlur", "backdropBrightness", "backdropContrast", "backdropGrayscale", "backdropHueRotate", "backdropInvert", "backdropOpacity", "backdropSaturate", "backdropSepia", "backdropFilter", "transitionProperty", "transitionDelay", "transitionDuration", "transitionTimingFunction", "willChange", "content"];

// node_modules/tailwindcss/src/util/configurePlugins.js
function configurePlugins_default(pluginConfig, plugins) {
  if (pluginConfig === void 0) {
    return plugins;
  }
  const pluginNames = Array.isArray(pluginConfig) ? pluginConfig : [
    ...new Set(
      plugins.filter((pluginName) => {
        return pluginConfig !== false && pluginConfig[pluginName] !== false;
      }).concat(
        Object.keys(pluginConfig).filter((pluginName) => {
          return pluginConfig[pluginName] !== false;
        })
      )
    )
  ];
  return pluginNames;
}

// node_modules/tailwindcss/src/public/colors.js
function warn({ version: version2, from, to }) {
  log_default.warn(`${from}-color-renamed`, [
    `As of Tailwind CSS ${version2}, \`${from}\` has been renamed to \`${to}\`.`,
    "Update your configuration file to silence this warning."
  ]);
}
var colors_default = {
  inherit: "inherit",
  current: "currentColor",
  transparent: "transparent",
  black: "#000",
  white: "#fff",
  slate: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
    950: "#020617"
  },
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
    950: "#030712"
  },
  zinc: {
    50: "#fafafa",
    100: "#f4f4f5",
    200: "#e4e4e7",
    300: "#d4d4d8",
    400: "#a1a1aa",
    500: "#71717a",
    600: "#52525b",
    700: "#3f3f46",
    800: "#27272a",
    900: "#18181b",
    950: "#09090b"
  },
  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
    950: "#0a0a0a"
  },
  stone: {
    50: "#fafaf9",
    100: "#f5f5f4",
    200: "#e7e5e4",
    300: "#d6d3d1",
    400: "#a8a29e",
    500: "#78716c",
    600: "#57534e",
    700: "#44403c",
    800: "#292524",
    900: "#1c1917",
    950: "#0c0a09"
  },
  red: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
    950: "#450a0a"
  },
  orange: {
    50: "#fff7ed",
    100: "#ffedd5",
    200: "#fed7aa",
    300: "#fdba74",
    400: "#fb923c",
    500: "#f97316",
    600: "#ea580c",
    700: "#c2410c",
    800: "#9a3412",
    900: "#7c2d12",
    950: "#431407"
  },
  amber: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
    950: "#451a03"
  },
  yellow: {
    50: "#fefce8",
    100: "#fef9c3",
    200: "#fef08a",
    300: "#fde047",
    400: "#facc15",
    500: "#eab308",
    600: "#ca8a04",
    700: "#a16207",
    800: "#854d0e",
    900: "#713f12",
    950: "#422006"
  },
  lime: {
    50: "#f7fee7",
    100: "#ecfccb",
    200: "#d9f99d",
    300: "#bef264",
    400: "#a3e635",
    500: "#84cc16",
    600: "#65a30d",
    700: "#4d7c0f",
    800: "#3f6212",
    900: "#365314",
    950: "#1a2e05"
  },
  green: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
    950: "#052e16"
  },
  emerald: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
    950: "#022c22"
  },
  teal: {
    50: "#f0fdfa",
    100: "#ccfbf1",
    200: "#99f6e4",
    300: "#5eead4",
    400: "#2dd4bf",
    500: "#14b8a6",
    600: "#0d9488",
    700: "#0f766e",
    800: "#115e59",
    900: "#134e4a",
    950: "#042f2e"
  },
  cyan: {
    50: "#ecfeff",
    100: "#cffafe",
    200: "#a5f3fc",
    300: "#67e8f9",
    400: "#22d3ee",
    500: "#06b6d4",
    600: "#0891b2",
    700: "#0e7490",
    800: "#155e75",
    900: "#164e63",
    950: "#083344"
  },
  sky: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9",
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
    950: "#082f49"
  },
  blue: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
    950: "#172554"
  },
  indigo: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81",
    950: "#1e1b4b"
  },
  violet: {
    50: "#f5f3ff",
    100: "#ede9fe",
    200: "#ddd6fe",
    300: "#c4b5fd",
    400: "#a78bfa",
    500: "#8b5cf6",
    600: "#7c3aed",
    700: "#6d28d9",
    800: "#5b21b6",
    900: "#4c1d95",
    950: "#2e1065"
  },
  purple: {
    50: "#faf5ff",
    100: "#f3e8ff",
    200: "#e9d5ff",
    300: "#d8b4fe",
    400: "#c084fc",
    500: "#a855f7",
    600: "#9333ea",
    700: "#7e22ce",
    800: "#6b21a8",
    900: "#581c87",
    950: "#3b0764"
  },
  fuchsia: {
    50: "#fdf4ff",
    100: "#fae8ff",
    200: "#f5d0fe",
    300: "#f0abfc",
    400: "#e879f9",
    500: "#d946ef",
    600: "#c026d3",
    700: "#a21caf",
    800: "#86198f",
    900: "#701a75",
    950: "#4a044e"
  },
  pink: {
    50: "#fdf2f8",
    100: "#fce7f3",
    200: "#fbcfe8",
    300: "#f9a8d4",
    400: "#f472b6",
    500: "#ec4899",
    600: "#db2777",
    700: "#be185d",
    800: "#9d174d",
    900: "#831843",
    950: "#500724"
  },
  rose: {
    50: "#fff1f2",
    100: "#ffe4e6",
    200: "#fecdd3",
    300: "#fda4af",
    400: "#fb7185",
    500: "#f43f5e",
    600: "#e11d48",
    700: "#be123c",
    800: "#9f1239",
    900: "#881337",
    950: "#4c0519"
  },
  get lightBlue() {
    warn({ version: "v2.2", from: "lightBlue", to: "sky" });
    return this.sky;
  },
  get warmGray() {
    warn({ version: "v3.0", from: "warmGray", to: "stone" });
    return this.stone;
  },
  get trueGray() {
    warn({ version: "v3.0", from: "trueGray", to: "neutral" });
    return this.neutral;
  },
  get coolGray() {
    warn({ version: "v3.0", from: "coolGray", to: "gray" });
    return this.gray;
  },
  get blueGray() {
    warn({ version: "v3.0", from: "blueGray", to: "slate" });
    return this.slate;
  }
};

// node_modules/tailwindcss/src/util/defaults.js
function defaults2(target, ...sources) {
  var _a, _b;
  for (let source of sources) {
    for (let k in source) {
      if (!((_a = target == null ? void 0 : target.hasOwnProperty) == null ? void 0 : _a.call(target, k))) {
        target[k] = source[k];
      }
    }
    for (let k of Object.getOwnPropertySymbols(source)) {
      if (!((_b = target == null ? void 0 : target.hasOwnProperty) == null ? void 0 : _b.call(target, k))) {
        target[k] = source[k];
      }
    }
  }
  return target;
}

// node_modules/tailwindcss/src/util/normalizeConfig.js
function normalizeConfig(config) {
  var _a;
  let valid = (() => {
    if (config.purge) {
      return false;
    }
    if (!config.content) {
      return false;
    }
    if (!Array.isArray(config.content) && !(typeof config.content === "object" && config.content !== null)) {
      return false;
    }
    if (Array.isArray(config.content)) {
      return config.content.every((path) => {
        if (typeof path === "string")
          return true;
        if (typeof (path == null ? void 0 : path.raw) !== "string")
          return false;
        if ((path == null ? void 0 : path.extension) && typeof (path == null ? void 0 : path.extension) !== "string") {
          return false;
        }
        return true;
      });
    }
    if (typeof config.content === "object" && config.content !== null) {
      if (Object.keys(config.content).some(
        (key) => !["files", "relative", "extract", "transform"].includes(key)
      )) {
        return false;
      }
      if (Array.isArray(config.content.files)) {
        if (!config.content.files.every((path) => {
          if (typeof path === "string")
            return true;
          if (typeof (path == null ? void 0 : path.raw) !== "string")
            return false;
          if ((path == null ? void 0 : path.extension) && typeof (path == null ? void 0 : path.extension) !== "string") {
            return false;
          }
          return true;
        })) {
          return false;
        }
        if (typeof config.content.extract === "object") {
          for (let value2 of Object.values(config.content.extract)) {
            if (typeof value2 !== "function") {
              return false;
            }
          }
        } else if (!(config.content.extract === void 0 || typeof config.content.extract === "function")) {
          return false;
        }
        if (typeof config.content.transform === "object") {
          for (let value2 of Object.values(config.content.transform)) {
            if (typeof value2 !== "function") {
              return false;
            }
          }
        } else if (!(config.content.transform === void 0 || typeof config.content.transform === "function")) {
          return false;
        }
        if (typeof config.content.relative !== "boolean" && typeof config.content.relative !== "undefined") {
          return false;
        }
      }
      return true;
    }
    return false;
  })();
  if (!valid) {
    log_default.warn("purge-deprecation", [
      "The `purge`/`content` options have changed in Tailwind CSS v3.0.",
      "Update your configuration file to eliminate this warning.",
      "https://tailwindcss.com/docs/upgrade-guide#configure-content-sources"
    ]);
  }
  config.safelist = (() => {
    var _a2;
    let { content, purge, safelist } = config;
    if (Array.isArray(safelist))
      return safelist;
    if (Array.isArray(content == null ? void 0 : content.safelist))
      return content.safelist;
    if (Array.isArray(purge == null ? void 0 : purge.safelist))
      return purge.safelist;
    if (Array.isArray((_a2 = purge == null ? void 0 : purge.options) == null ? void 0 : _a2.safelist))
      return purge.options.safelist;
    return [];
  })();
  config.blocklist = (() => {
    let { blocklist } = config;
    if (Array.isArray(blocklist)) {
      if (blocklist.every((item) => typeof item === "string")) {
        return blocklist;
      }
      log_default.warn("blocklist-invalid", [
        "The `blocklist` option must be an array of strings.",
        "https://tailwindcss.com/docs/content-configuration#discarding-classes"
      ]);
    }
    return [];
  })();
  if (typeof config.prefix === "function") {
    log_default.warn("prefix-function", [
      "As of Tailwind CSS v3.0, `prefix` cannot be a function.",
      "Update `prefix` in your configuration to be a string to eliminate this warning.",
      "https://tailwindcss.com/docs/upgrade-guide#prefix-cannot-be-a-function"
    ]);
    config.prefix = "";
  } else {
    config.prefix = (_a = config.prefix) != null ? _a : "";
  }
  config.content = {
    relative: (() => {
      let { content } = config;
      if (content == null ? void 0 : content.relative) {
        return content.relative;
      }
      return flagEnabled(config, "relativeContentPathsByDefault");
    })(),
    files: (() => {
      let { content, purge } = config;
      if (Array.isArray(purge))
        return purge;
      if (Array.isArray(purge == null ? void 0 : purge.content))
        return purge.content;
      if (Array.isArray(content))
        return content;
      if (Array.isArray(content == null ? void 0 : content.content))
        return content.content;
      if (Array.isArray(content == null ? void 0 : content.files))
        return content.files;
      return [];
    })(),
    extract: (() => {
      let extract = (() => {
        var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j;
        if ((_a2 = config.purge) == null ? void 0 : _a2.extract)
          return config.purge.extract;
        if ((_b = config.content) == null ? void 0 : _b.extract)
          return config.content.extract;
        if ((_d = (_c = config.purge) == null ? void 0 : _c.extract) == null ? void 0 : _d.DEFAULT)
          return config.purge.extract.DEFAULT;
        if ((_f = (_e = config.content) == null ? void 0 : _e.extract) == null ? void 0 : _f.DEFAULT)
          return config.content.extract.DEFAULT;
        if ((_h = (_g = config.purge) == null ? void 0 : _g.options) == null ? void 0 : _h.extractors)
          return config.purge.options.extractors;
        if ((_j = (_i = config.content) == null ? void 0 : _i.options) == null ? void 0 : _j.extractors)
          return config.content.options.extractors;
        return {};
      })();
      let extractors = {};
      let defaultExtractor2 = (() => {
        var _a2, _b, _c, _d;
        if ((_b = (_a2 = config.purge) == null ? void 0 : _a2.options) == null ? void 0 : _b.defaultExtractor) {
          return config.purge.options.defaultExtractor;
        }
        if ((_d = (_c = config.content) == null ? void 0 : _c.options) == null ? void 0 : _d.defaultExtractor) {
          return config.content.options.defaultExtractor;
        }
        return void 0;
      })();
      if (defaultExtractor2 !== void 0) {
        extractors.DEFAULT = defaultExtractor2;
      }
      if (typeof extract === "function") {
        extractors.DEFAULT = extract;
      } else if (Array.isArray(extract)) {
        for (let { extensions, extractor } of extract != null ? extract : []) {
          for (let extension of extensions) {
            extractors[extension] = extractor;
          }
        }
      } else if (typeof extract === "object" && extract !== null) {
        Object.assign(extractors, extract);
      }
      return extractors;
    })(),
    transform: (() => {
      let transform = (() => {
        var _a2, _b, _c, _d, _e, _f;
        if ((_a2 = config.purge) == null ? void 0 : _a2.transform)
          return config.purge.transform;
        if ((_b = config.content) == null ? void 0 : _b.transform)
          return config.content.transform;
        if ((_d = (_c = config.purge) == null ? void 0 : _c.transform) == null ? void 0 : _d.DEFAULT)
          return config.purge.transform.DEFAULT;
        if ((_f = (_e = config.content) == null ? void 0 : _e.transform) == null ? void 0 : _f.DEFAULT)
          return config.content.transform.DEFAULT;
        return {};
      })();
      let transformers = {};
      if (typeof transform === "function") {
        transformers.DEFAULT = transform;
      }
      if (typeof transform === "object" && transform !== null) {
        Object.assign(transformers, transform);
      }
      return transformers;
    })()
  };
  for (let file of config.content.files) {
    if (typeof file === "string" && /{([^,]*?)}/g.test(file)) {
      log_default.warn("invalid-glob-braces", [
        `The glob pattern ${dim(file)} in your Tailwind CSS configuration is invalid.`,
        `Update it to ${dim(file.replace(/{([^,]*?)}/g, "$1"))} to silence this warning.`
      ]);
      break;
    }
  }
  return config;
}

// node_modules/tailwindcss/src/util/cloneDeep.js
function cloneDeep(value2) {
  if (Array.isArray(value2)) {
    return value2.map((child) => cloneDeep(child));
  }
  if (typeof value2 === "object" && value2 !== null) {
    return Object.fromEntries(Object.entries(value2).map(([k, v]) => [k, cloneDeep(v)]));
  }
  return value2;
}

// node_modules/tailwindcss/src/util/resolveConfig.js
function isFunction(input) {
  return typeof input === "function";
}
function mergeWith(target, ...sources) {
  let customizer = sources.pop();
  for (let source of sources) {
    for (let k in source) {
      let merged = customizer(target[k], source[k]);
      if (merged === void 0) {
        if (isPlainObject(target[k]) && isPlainObject(source[k])) {
          target[k] = mergeWith({}, target[k], source[k], customizer);
        } else {
          target[k] = source[k];
        }
      } else {
        target[k] = merged;
      }
    }
  }
  return target;
}
var configUtils = {
  colors: colors_default,
  negative(scale) {
    return Object.keys(scale).filter((key) => scale[key] !== "0").reduce((negativeScale, key) => {
      let negativeValue = negateValue(scale[key]);
      if (negativeValue !== void 0) {
        negativeScale[`-${key}`] = negativeValue;
      }
      return negativeScale;
    }, {});
  },
  breakpoints(screens) {
    return Object.keys(screens).filter((key) => typeof screens[key] === "string").reduce(
      (breakpoints, key) => ({
        ...breakpoints,
        [`screen-${key}`]: screens[key]
      }),
      {}
    );
  }
};
function value(valueToResolve, ...args) {
  return isFunction(valueToResolve) ? valueToResolve(...args) : valueToResolve;
}
function collectExtends(items) {
  return items.reduce((merged, { extend }) => {
    return mergeWith(merged, extend, (mergedValue, extendValue) => {
      if (mergedValue === void 0) {
        return [extendValue];
      }
      if (Array.isArray(mergedValue)) {
        return [extendValue, ...mergedValue];
      }
      return [extendValue, mergedValue];
    });
  }, {});
}
function mergeThemes(themes) {
  return {
    ...themes.reduce((merged, theme) => defaults2(merged, theme), {}),
    extend: collectExtends(themes)
  };
}
function mergeExtensionCustomizer(merged, value2) {
  if (Array.isArray(merged) && isPlainObject(merged[0])) {
    return merged.concat(value2);
  }
  if (Array.isArray(value2) && isPlainObject(value2[0]) && isPlainObject(merged)) {
    return [merged, ...value2];
  }
  if (Array.isArray(value2)) {
    return value2;
  }
  return void 0;
}
function mergeExtensions({ extend, ...theme }) {
  return mergeWith(theme, extend, (themeValue, extensions) => {
    if (!isFunction(themeValue) && !extensions.some(isFunction)) {
      return mergeWith({}, themeValue, ...extensions, mergeExtensionCustomizer);
    }
    return (resolveThemePath, utils) => mergeWith(
      {},
      ...[themeValue, ...extensions].map((e) => value(e, resolveThemePath, utils)),
      mergeExtensionCustomizer
    );
  });
}
function* toPaths2(key) {
  let path = toPath(key);
  if (path.length === 0) {
    return;
  }
  yield path;
  if (Array.isArray(key)) {
    return;
  }
  let pattern2 = /^(.*?)\s*\/\s*([^/]+)$/;
  let matches = key.match(pattern2);
  if (matches !== null) {
    let [, prefix3, alpha] = matches;
    let newPath = toPath(prefix3);
    newPath.alpha = alpha;
    yield newPath;
  }
}
function resolveFunctionKeys(object) {
  const resolvePath2 = (key, defaultValue) => {
    for (const path of toPaths2(key)) {
      let index3 = 0;
      let val = object;
      while (val !== void 0 && val !== null && index3 < path.length) {
        val = val[path[index3++]];
        let shouldResolveAsFn = isFunction(val) && (path.alpha === void 0 || index3 <= path.length - 1);
        val = shouldResolveAsFn ? val(resolvePath2, configUtils) : val;
      }
      if (val !== void 0) {
        if (path.alpha !== void 0) {
          let normalized = parseColorFormat(val);
          return withAlphaValue(normalized, path.alpha, toColorValue(normalized));
        }
        if (isPlainObject(val)) {
          return cloneDeep(val);
        }
        return val;
      }
    }
    return defaultValue;
  };
  Object.assign(resolvePath2, {
    theme: resolvePath2,
    ...configUtils
  });
  return Object.keys(object).reduce((resolved, key) => {
    resolved[key] = isFunction(object[key]) ? object[key](resolvePath2, configUtils) : object[key];
    return resolved;
  }, {});
}
function extractPluginConfigs(configs) {
  let allConfigs = [];
  configs.forEach((config) => {
    var _a;
    allConfigs = [...allConfigs, config];
    const plugins = (_a = config == null ? void 0 : config.plugins) != null ? _a : [];
    if (plugins.length === 0) {
      return;
    }
    plugins.forEach((plugin3) => {
      var _a2;
      if (plugin3.__isOptionsFunction) {
        plugin3 = plugin3();
      }
      allConfigs = [...allConfigs, ...extractPluginConfigs([(_a2 = plugin3 == null ? void 0 : plugin3.config) != null ? _a2 : {}])];
    });
  });
  return allConfigs;
}
function resolveCorePlugins(corePluginConfigs) {
  const result = [...corePluginConfigs].reduceRight((resolved, corePluginConfig) => {
    if (isFunction(corePluginConfig)) {
      return corePluginConfig({ corePlugins: resolved });
    }
    return configurePlugins_default(corePluginConfig, resolved);
  }, corePluginList_default);
  return result;
}
function resolvePluginLists(pluginLists) {
  const result = [...pluginLists].reduceRight((resolved, pluginList) => {
    return [...resolved, ...pluginList];
  }, []);
  return result;
}
function resolveConfig(configs) {
  let allConfigs = [
    ...extractPluginConfigs(configs),
    {
      prefix: "",
      important: false,
      separator: ":"
    }
  ];
  return normalizeConfig(
    defaults2(
      {
        theme: resolveFunctionKeys(
          mergeExtensions(mergeThemes(allConfigs.map((t) => {
            var _a;
            return (_a = t == null ? void 0 : t.theme) != null ? _a : {};
          })))
        ),
        corePlugins: resolveCorePlugins(allConfigs.map((c) => c.corePlugins)),
        plugins: resolvePluginLists(configs.map((c) => {
          var _a;
          return (_a = c == null ? void 0 : c.plugins) != null ? _a : [];
        }))
      },
      ...allConfigs
    )
  );
}

// node_modules/tailwindcss/src/util/getAllConfigs.js
var import_config_full = __toESM(require_config_full());
function getAllConfigs(config) {
  var _a;
  const configs = ((_a = config == null ? void 0 : config.presets) != null ? _a : [import_config_full.default]).slice().reverse().flatMap((preset) => getAllConfigs(preset instanceof Function ? preset() : preset));
  const features = {
    respectDefaultRingColorOpacity: {
      theme: {
        ringColor: ({ theme }) => ({
          DEFAULT: "#3b82f67f",
          ...theme("colors")
        })
      }
    },
    disableColorOpacityUtilitiesByDefault: {
      corePlugins: {
        backgroundOpacity: false,
        borderOpacity: false,
        divideOpacity: false,
        placeholderOpacity: false,
        ringOpacity: false,
        textOpacity: false
      }
    }
  };
  const experimentals = Object.keys(features).filter((feature) => flagEnabled(config, feature)).map((feature) => features[feature]);
  return [config, ...experimentals, ...configs];
}

// node_modules/tailwindcss/src/public/resolve-config.js
function resolveConfig2(...configs) {
  let [, ...defaultConfigs] = getAllConfigs(configs[0]);
  return resolveConfig([...configs, ...defaultConfigs]);
}

// src/util/create-tailwind-css-plugin.ts
var createTailwindcssPlugin = (props) => {
  var _a;
  const tailwindConfig = resolveConfig2((_a = props.config) != null ? _a : {});
  const tailwindcssPlugin = processTailwindFeatures(
    (processOptions) => () => processOptions.createContext(tailwindConfig, [{ content: props.content }])
  );
  return tailwindcssPlugin;
};

// node_modules/postcss/lib/postcss.mjs
var import_postcss9 = __toESM(require_postcss2(), 1);
var postcss_default2 = import_postcss9.default;
var stringify2 = import_postcss9.default.stringify;
var fromJSON2 = import_postcss9.default.fromJSON;
var plugin2 = import_postcss9.default.plugin;
var parse3 = import_postcss9.default.parse;
var list3 = import_postcss9.default.list;
var document2 = import_postcss9.default.document;
var comment2 = import_postcss9.default.comment;
var atRule2 = import_postcss9.default.atRule;
var rule2 = import_postcss9.default.rule;
var decl2 = import_postcss9.default.decl;
var root2 = import_postcss9.default.root;
var CssSyntaxError2 = import_postcss9.default.CssSyntaxError;
var Declaration2 = import_postcss9.default.Declaration;
var Container2 = import_postcss9.default.Container;
var Processor2 = import_postcss9.default.Processor;
var Document2 = import_postcss9.default.Document;
var Comment2 = import_postcss9.default.Comment;
var Warning2 = import_postcss9.default.Warning;
var AtRule2 = import_postcss9.default.AtRule;
var Result2 = import_postcss9.default.Result;
var Input2 = import_postcss9.default.Input;
var Rule2 = import_postcss9.default.Rule;
var Root2 = import_postcss9.default.Root;
var Node2 = import_postcss9.default.Node;

// src/util/process-tailwind-css.ts
var import_postcss_css_variables = __toESM(require_postcss_css_variables());
var processTailwindCSS = (props) => {
  const tailwindcssPlugin = createTailwindcssPlugin({
    config: props.config,
    content: props.content
  });
  const processor = postcss_default2([tailwindcssPlugin, (0, import_postcss_css_variables.default)()]);
  return processor.process(defaultTailwindCSS, { from: void 0 }).css;
};

// src/util/default-tailwind-css.ts
var defaultTailwindCSS = String.raw`
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
`;

// node_modules/postcss-js/index.mjs
var import_index2 = __toESM(require_postcss_js2(), 1);
var postcss_js_default2 = import_index2.default;
var objectify2 = import_index2.default.objectify;
var parse4 = import_index2.default.parse;
var async2 = import_index2.default.async;
var sync2 = import_index2.default.sync;

// src/util/css-to-json.ts
function cssToJson(css) {
  const root3 = postcss_default2.parse(css);
  return postcss_js_default2.objectify(root3);
}

// src/index.ts
var getCSS = (content, config) => {
  var _a, _b;
  const preflight = (_b = (_a = config == null ? void 0 : config.corePlugins) == null ? void 0 : _a.preflight) != null ? _b : false;
  const corePlugins2 = (config == null ? void 0 : config.corePlugins) || {};
  return processTailwindCSS({
    config: {
      ...config,
      corePlugins: {
        ...corePlugins2,
        preflight
      }
    },
    content
  });
};
var tailwindToCSS = ({ config, options }) => ({
  twi: tailwindInlineCSS(config, options),
  twj: tailwindInlineJson(config, options)
});
var classListFormatter = (...params) => {
  let classList = "";
  if (typeof params[0] === "string") {
    classList = params[0];
  } else if (Array.isArray(params[0])) {
    classList = params.flat(Infinity).map((styles) => classListFormatter(styles)).join(" ");
  } else if (typeof params[0] === "object") {
    classList = Object.entries(params[0]).filter((entry) => !!entry[1]).map((entry) => entry[0]).join(" ");
  }
  classList = classList.replace(/\s+/g, " ");
  return classList;
};
var tailwindInlineCSS = (config, mainOptions) => (...params) => {
  const content = classListFormatter(params);
  const { 1: options } = params || {};
  const defaultOptions = { merge: true, minify: true, ignoreMediaQueries: true };
  const twiOptions = { ...defaultOptions, ...mainOptions, ...options };
  let css = formatCSS(getCSS(content, config));
  if (twiOptions == null ? void 0 : twiOptions.ignoreMediaQueries) {
    css.removeMediaQueries();
  } else {
    css.removeUndefined();
    css.combineMediaQueries();
  }
  css.fixRGB();
  if (twiOptions == null ? void 0 : twiOptions.merge)
    css.merge();
  if (twiOptions == null ? void 0 : twiOptions.minify)
    css.minify();
  return css.get();
};
var tailwindInlineJson = (config, mainOptions) => (...params) => {
  return cssToJson(tailwindInlineCSS(config, mainOptions)(params));
};
var twi = tailwindInlineCSS();
var twj = tailwindInlineJson();
var twToCSS = tailwindToCSS;
/*! https://mths.be/cssesc v3.0.0 by @mathias */
