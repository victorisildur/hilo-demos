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

	var Hilo = __webpack_require__(1);
	var init_1 = __webpack_require__(2);
	var WordCircle_1 = __webpack_require__(3);
	var words_1 = __webpack_require__(8);
	var stage = init_1.initStage();
	var ticker = init_1.initTicker(stage);
	var circleRatio = 0.65;
	var wordCircle = new WordCircle_1.WordCircle(init_1.width / 4, init_1.height / 2, Math.min(init_1.width / 4, init_1.height / 2) * circleRatio, 'word');
	var actionCircle = new WordCircle_1.WordCircle(init_1.width * 3 / 4, init_1.height / 2, Math.min(init_1.width / 4, init_1.height / 2) * circleRatio, 'action');
	var words3 = [].concat(_toConsumableArray(words_1.words[0]), _toConsumableArray(words_1.words[1]), _toConsumableArray(words_1.words[2]));
	wordCircle.fillWords(words3, stage);
	var actions3 = [].concat(_toConsumableArray(words_1.actions[0]), _toConsumableArray(words_1.actions[1]), _toConsumableArray(words_1.actions[2]));
	actionCircle.fillWords(actions3, stage);
	stage.enableDOMEvent([Hilo.event.POINTER_START, Hilo.event.POINTER_MOVE, Hilo.event.POINTER_END]);
	ticker.start();
	var isRolling = false;
	var btn = document.getElementById('btn');
	btn.addEventListener('click', function (e) {
	    if (isRolling) {
	        wordCircle.stopRoll();
	        actionCircle.stopRoll();
	        btn.innerHTML = '开始';
	    } else {
	        btn.innerHTML = '暂停';
	        wordCircle.roll();
	        actionCircle.roll();
	    }
	    isRolling = !isRolling;
	    btn.blur();
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = window.Hilo;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Hilo = __webpack_require__(1);
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Hilo = __webpack_require__(1);
	var extend = __webpack_require__(4);
	var TextBox_1 = __webpack_require__(5);

	var WordCircle = function () {
	    function WordCircle(x, y, r, theme) {
	        _classCallCheck(this, WordCircle);

	        this.x = x;
	        this.y = y;
	        this.r = r;
	        this.theme = theme;
	        this.icon = null;
	        this.words = [];
	        var iconS = 200;
	        var iconProps = {
	            id: theme,
	            x: x,
	            y: y - iconS / 2,
	            width: iconS,
	            height: iconS
	        };
	        if (theme === 'word') {
	            this.icon = new Hilo.Bitmap(extend({}, iconProps, {
	                image: 'images/mouth.png'
	            }));
	        } else {
	            this.icon = new Hilo.Bitmap(extend({}, iconProps, {
	                image: 'images/hand.png'
	            }));
	        }
	    }

	    _createClass(WordCircle, [{
	        key: "fillWords",
	        value: function fillWords(words, stage) {
	            var _this = this;

	            var cnt = words.length;
	            this.icon.addTo(stage);
	            this.words = words.map(function (word, idx) {
	                return new TextBox_1.TextBox({
	                    text: word,
	                    totalCnt: cnt,
	                    idx: idx,
	                    centerX: _this.x,
	                    centerY: _this.y,
	                    radius: _this.r
	                });
	            });
	            this.words.forEach(function (wordBox) {
	                wordBox.addTo(stage);
	                wordBox.getReady();
	            });
	        }
	    }, {
	        key: "roll",
	        value: function roll() {
	            this.words.forEach(function (word) {
	                return word.roll();
	            });
	        }
	    }, {
	        key: "stopRoll",
	        value: function stopRoll() {
	            this.words.forEach(function (word) {
	                return word.stopRoll();
	            });
	        }
	    }]);

	    return WordCircle;
	}();

	exports.WordCircle = WordCircle;

/***/ },
/* 4 */
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Hilo = __webpack_require__(1);
	var extend = __webpack_require__(4);
	var util_1 = __webpack_require__(6);
	exports.TextBox = Hilo.Class.create({
	    Extends: Hilo.Text,
	    constructor: function constructor(props) {
	        var defaultProps = {
	            font: '30px YaHei bold',
	            color: '#fff',
	            maxWidth: 300,
	            textAlign: 'center'
	        };
	        exports.TextBox.superclass.constructor.call(this, extend({}, defaultProps, props));
	        this.cache();
	    },
	    totalCnt: 0,
	    idx: 0,
	    degree: 0,
	    radius: 0,
	    centerX: 0,
	    centerY: 0,
	    shakeRange: 0.05,
	    growRatio: 2,
	    tween: null,
	    growTween: null,
	    isRolling: false,
	    rollSpeed: Math.PI / 90,
	    getReady: function getReady() {
	        var radius = this.radius * util_1.random(0.9, 1.1);
	        this.degree = this.idx / this.totalCnt * 2 * Math.PI - Math.PI / 2;
	        this.x = this.centerX + this.radius * Math.cos(this.degree);
	        this.y = this.centerY + this.radius * Math.sin(this.degree);
	        this.shake();
	    },
	    shake: function shake() {
	        if (!this.tween) {
	            var randomX = this.x + this.radius * util_1.random(-1 * this.shakeRange, this.shakeRange);
	            var randomY = this.y + this.radius * util_1.random(-1 * this.shakeRange, this.shakeRange);
	            this.tween = Hilo.Tween.to(this, {
	                x: randomX,
	                y: randomY
	            }, {
	                duration: 2000,
	                loop: true,
	                reverse: true
	            });
	        }
	    },
	    stopShake: function stopShake() {
	        if (this.tween) {
	            Hilo.Tween.remove(this.tween);
	            this.tween = null;
	        }
	    },
	    grow: function grow() {
	        if (!this.growTween) {
	            this.growTween = Hilo.Tween.to(this, {
	                scaleX: this.growRatio,
	                scaleY: this.growRatio
	            }, {
	                duration: 20
	            });
	        }
	    },
	    shrink: function shrink() {
	        if (this.growTween) {
	            Hilo.Tween.remove(this.growTween);
	            this.growTween = null;
	        }
	        this.scaleX = 1;
	        this.scaleY = 1;
	    },
	    roll: function roll() {
	        this.isRolling = true;
	    },
	    stopRoll: function stopRoll() {
	        this.isRolling = false;
	    },
	    onUpdate: function onUpdate() {
	        var normalDegree = (this.degree + Math.PI / 2) % (Math.PI * 2),
	            oneShare = 2 * Math.PI / this.totalCnt,
	            halfShare = Math.PI / this.totalCnt;
	        var isBig = Math.abs(normalDegree) <= halfShare || normalDegree > 2 * Math.PI - halfShare;
	        if (isBig) {
	            this.grow();
	        } else {
	            this.shrink();
	        }
	        if (this.isRolling) {
	            this.stopShake();
	            this.degree += this.rollSpeed;
	            this.x = this.centerX + this.radius * Math.cos(this.degree);
	            this.y = this.centerY + this.radius * Math.sin(this.degree) - (isBig ? 70 : 0);
	        } else {
	            this.shake();
	        }
	    }
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(7));

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	exports.random = function (min, max) {
	    return Math.random() * (max - min) + min;
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	exports.words = [['你自己都没想到', '洪荒之力'], ['你睁大眼睛看着我', '我看不见，是不是', '不要叫，当心把敌人叫来'], ['不是哪一位，是一半人一半鱼的美人鱼', '不是左和右，是上和下', '没鸡鸡的，她是女的'], ['听说，你要找我度蜜月', '来，搁这儿'], ['好缺好缺人']];
	exports.actions = [['倒吸一口凉气', '继续吸凉气', '震惊脸', '一边震惊脸一边狂摇头'], ['呐喊', '抱住紫薇', '惊恐状', '无辜的大眼睛凝望', '摔倒在地', '拥抱'], ['长叹一口气', '抬头，正襟危坐', '把画纸倒过来', '欲言又止，捂脸崩溃状态', '比划八爪鱼'], ['风情万种的出场', '目瞪口呆的注视', '妩媚的撩头发']];

/***/ }
/******/ ]);