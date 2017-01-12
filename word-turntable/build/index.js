/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var init_1 = __webpack_require__(1);
	var WordCircle_1 = __webpack_require__(3);
	var words_1 = __webpack_require__(6);
	var stage = init_1.initStage();
	var ticker = init_1.initTicker(stage);
	var wordCircle = new WordCircle_1.WordCircle(init_1.width / 4, init_1.height / 2, Math.min(init_1.width / 4, init_1.height / 2) * 0.8);
	var actionCircle = new WordCircle_1.WordCircle(init_1.width * 3 / 4, init_1.height / 2, Math.min(init_1.width / 4, init_1.height / 2) * 0.8);
	var words3 = [].concat(_toConsumableArray(words_1.words[0]), _toConsumableArray(words_1.words[1]), _toConsumableArray(words_1.words[2]));
	wordCircle.fillWords(words3, stage);
	var actions3 = [].concat(_toConsumableArray(words_1.actions[0]), _toConsumableArray(words_1.actions[1]), _toConsumableArray(words_1.actions[2]));
	actionCircle.fillWords(actions3, stage);
	ticker.start();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Hilo = __webpack_require__(2);
	exports.width = window.innerWidth;
	exports.height = window.innerHeight;
	exports.initStage = function () {
	    var stage = new Hilo.Stage({
	        renderType: 'canvas',
	        container: document.getElementById('game-container'),
	        width: exports.width,
	        height: exports.height
	    });
	    return stage;
	};
	exports.initTicker = function (stage) {
	    var ticker = new Hilo.Ticker(60);
	    ticker.addTick(stage);
	    ticker.addTick(Hilo.Tween);
	    return ticker;
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = window.Hilo;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TextBox_1 = __webpack_require__(4);

	var WordCircle = function () {
	    function WordCircle(x, y, r) {
	        _classCallCheck(this, WordCircle);

	        this.x = x;
	        this.y = y;
	        this.r = r;
	    }

	    _createClass(WordCircle, [{
	        key: "fillWords",
	        value: function fillWords(words, stage) {
	            var _this = this;

	            var cnt = words.length;
	            words.map(function (word, idx) {
	                return new TextBox_1.TextBox({
	                    text: word,
	                    totalCnt: cnt,
	                    idx: idx,
	                    centerX: _this.x,
	                    centerY: _this.y,
	                    radius: _this.r
	                });
	            }).forEach(function (wordBox) {
	                wordBox.addTo(stage);
	                wordBox.getReady();
	            });
	        }
	    }]);

	    return WordCircle;
	}();

	exports.WordCircle = WordCircle;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Hilo = __webpack_require__(2);
	var extend = __webpack_require__(5);
	exports.TextBox = Hilo.Class.create({
	    Extends: Hilo.Text,
	    constructor: function constructor(props) {
	        var defaultProps = {
	            font: '30px 微软雅黑 bold',
	            color: '#fff',
	            maxWidth: 700,
	            textAlign: 'center'
	        };
	        exports.TextBox.superclass.constructor.call(this, extend({}, props, defaultProps));
	    },
	    totalCnt: 0,
	    idx: 0,
	    degree: 0,
	    radius: 0,
	    centerX: 0,
	    centerY: 0,
	    getReady: function getReady() {
	        var radius = this.radius * (1 + 0.2 * Math.random());
	        this.degree = this.idx / this.totalCnt * 2 * Math.PI;
	        this.x = this.centerX + this.radius * Math.cos(this.degree);
	        this.y = this.centerY + this.radius * Math.sin(this.degree);
	    }
	});

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	var hasOwn = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;

	var isArray = function isArray(arr) {
		if (typeof Array.isArray === 'function') {
			return Array.isArray(arr);
		}

		return toStr.call(arr) === '[object Array]';
	};

	var isPlainObject = function isPlainObject(obj) {
		if (!obj || toStr.call(obj) !== '[object Object]') {
			return false;
		}

		var hasOwnConstructor = hasOwn.call(obj, 'constructor');
		var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
		// Not own constructor property must be Object
		if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		var key;
		for (key in obj) {/**/}

		return typeof key === 'undefined' || hasOwn.call(obj, key);
	};

	module.exports = function extend() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0],
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if (typeof target === 'boolean') {
			deep = target;
			target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		} else if ((typeof target !== 'object' && typeof target !== 'function') || target == null) {
			target = {};
		}

		for (; i < length; ++i) {
			options = arguments[i];
			// Only deal with non-null/undefined values
			if (options != null) {
				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];

					// Prevent never-ending loop
					if (target !== copy) {
						// Recurse if we're merging plain objects or arrays
						if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
							if (copyIsArray) {
								copyIsArray = false;
								clone = src && isArray(src) ? src : [];
							} else {
								clone = src && isPlainObject(src) ? src : {};
							}

							// Never move original objects, clone them
							target[name] = extend(deep, clone, copy);

						// Don't bring in undefined values
						} else if (typeof copy !== 'undefined') {
							target[name] = copy;
						}
					}
				}
			}
		}

		// Return the modified object
		return target;
	};



/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	exports.words = [['你自己都没想到', '洪荒之力'], ['你睁大眼睛看着我', '我看不见，是不是', '不要叫，当心把敌人叫来'], ['不是哪一位，是一半人一半鱼的美人鱼', '不是左和右，是上和下', '没鸡鸡的，她是女的'], ['听说，你要找我度蜜月', '来，搁这儿'], ['好缺好缺人']];
	exports.actions = [['倒吸一口凉气', '继续吸凉气', '傅园慧震惊脸', '一边震惊脸一边狂摇头'], ['尔康呐喊', '尔康抱住紫薇', '紫薇惊恐状', '此时紫薇需要无辜的大眼睛凝望', '紫薇摔倒在地', '拥抱'], ['邓超长叹一口气', '警察抬头，正襟危坐', '警察把画纸倒过来', '邓超欲言又止，捂脸崩溃状态', '比划八爪鱼'], ['冰冰风情万种的出场', '目瞪口呆的注视', '妩媚的撩头发']];

/***/ }
/******/ ]);