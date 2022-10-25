(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? (module.exports = factory())
        : typeof define === 'function' && define.amd
        ? define(factory)
        : ((global =
              typeof globalThis !== 'undefined' ? globalThis : global || self),
          (global.WZoom = factory()));
})(this, function () {
    'use strict';

    function ownKeys(object, enumerableOnly) {
        var keys = Object.keys(object);
        if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(object);
            enumerableOnly &&
                (symbols = symbols.filter(function (sym) {
                    return Object.getOwnPropertyDescriptor(
                        object,
                        sym
                    ).enumerable;
                })),
                keys.push.apply(keys, symbols);
        }
        return keys;
    }
    function _objectSpread2(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = null != arguments[i] ? arguments[i] : {};
            i % 2
                ? ownKeys(Object(source), !0).forEach(function (key) {
                      _defineProperty(target, key, source[key]);
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                      target,
                      Object.getOwnPropertyDescriptors(source)
                  )
                : ownKeys(Object(source)).forEach(function (key) {
                      Object.defineProperty(
                          target,
                          key,
                          Object.getOwnPropertyDescriptor(source, key)
                      );
                  });
        }
        return target;
    }
    function _defineProperty(obj, key, value) {
        if (key in obj) {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true,
            });
        } else {
            obj[key] = value;
        }
        return obj;
    }
    function _slicedToArray(arr, i) {
        return (
            _arrayWithHoles(arr) ||
            _iterableToArrayLimit(arr, i) ||
            _unsupportedIterableToArray(arr, i) ||
            _nonIterableRest()
        );
    }
    function _arrayWithHoles(arr) {
        if (Array.isArray(arr)) return arr;
    }
    function _iterableToArrayLimit(arr, i) {
        var _i =
            arr == null
                ? null
                : (typeof Symbol !== 'undefined' && arr[Symbol.iterator]) ||
                  arr['@@iterator'];
        if (_i == null) return;
        var _arr = [];
        var _n = true;
        var _d = false;
        var _s, _e;
        try {
            for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);
                if (i && _arr.length === i) break;
            }
        } catch (err) {
            _d = true;
            _e = err;
        } finally {
            try {
                if (!_n && _i['return'] != null) _i['return']();
            } finally {
                if (_d) throw _e;
            }
        }
        return _arr;
    }
    function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === 'Object' && o.constructor) n = o.constructor.name;
        if (n === 'Map' || n === 'Set') return Array.from(o);
        if (
            n === 'Arguments' ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
        )
            return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
        return arr2;
    }
    function _nonIterableRest() {
        throw new TypeError(
            'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
        );
    }
    function _createForOfIteratorHelper(o, allowArrayLike) {
        var it =
            (typeof Symbol !== 'undefined' && o[Symbol.iterator]) ||
            o['@@iterator'];
        if (!it) {
            if (
                Array.isArray(o) ||
                (it = _unsupportedIterableToArray(o)) ||
                (allowArrayLike && o && typeof o.length === 'number')
            ) {
                if (it) o = it;
                var i = 0;
                var F = function () {};
                return {
                    s: F,
                    n: function () {
                        if (i >= o.length)
                            return {
                                done: true,
                            };
                        return {
                            done: false,
                            value: o[i++],
                        };
                    },
                    e: function (e) {
                        throw e;
                    },
                    f: F,
                };
            }
            throw new TypeError(
                'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
            );
        }
        var normalCompletion = true,
            didErr = false,
            err;
        return {
            s: function () {
                it = it.call(o);
            },
            n: function () {
                var step = it.next();
                normalCompletion = step.done;
                return step;
            },
            e: function (e) {
                didErr = true;
                err = e;
            },
            f: function () {
                try {
                    if (!normalCompletion && it.return != null) it.return();
                } finally {
                    if (didErr) throw err;
                }
            },
        };
    }

    /**
     * Get element position (with support old browsers)
     * @param {Element} element
     * @returns {{top: number, left: number}}
     */
    function getElementPosition(element) {
        var box = element.getBoundingClientRect();
        var _document = document,
            body = _document.body,
            documentElement = _document.documentElement;
        var scrollTop = getPageScrollTop();
        var scrollLeft = getPageScrollLeft();
        var clientTop = documentElement.clientTop || body.clientTop || 0;
        var clientLeft = documentElement.clientLeft || body.clientLeft || 0;
        var top = box.top + scrollTop - clientTop;
        var left = box.left + scrollLeft - clientLeft;
        return {
            top: top,
            left: left,
        };
    }

    /**
     * Get page scroll left
     * @returns {number}
     */
    function getPageScrollLeft() {
        var supportPageOffset = window.pageXOffset !== undefined;
        var isCSS1Compat = (document.compatMode || '') === 'CSS1Compat';
        return supportPageOffset
            ? window.pageXOffset
            : isCSS1Compat
            ? document.documentElement.scrollLeft
            : document.body.scrollLeft;
    }

    /**
     * Get page scroll top
     * @returns {number}
     */
    function getPageScrollTop() {
        var supportPageOffset = window.pageYOffset !== undefined;
        var isCSS1Compat = (document.compatMode || '') === 'CSS1Compat';
        return supportPageOffset
            ? window.pageYOffset
            : isCSS1Compat
            ? document.documentElement.scrollTop
            : document.body.scrollTop;
    }

    /**
     * Universal alternative to Object.assign()
     * @param {Object} destination
     * @param {Object} source
     * @returns {Object}
     */
    function extendObject(destination, source) {
        if (destination && source) {
            for (var key in source) {
                if (source.hasOwnProperty(key)) {
                    destination[key] = source[key];
                }
            }
        }
        return destination;
    }

    /**
     * @param target
     * @param type
     * @param listener
     * @param options
     */
    function on(target, type, listener) {
        var options =
            arguments.length > 3 && arguments[3] !== undefined
                ? arguments[3]
                : false;
        target.addEventListener(type, listener, options);
    }

    /**
     * @param target
     * @param type
     * @param listener
     * @param options
     */
    function off(target, type, listener) {
        var options =
            arguments.length > 3 && arguments[3] !== undefined
                ? arguments[3]
                : false;
        target.removeEventListener(type, listener, options);
    }

    /**
     * @returns {boolean}
     */
    function isTouch() {
        return (
            'ontouchstart' in window ||
            navigator.MaxTouchPoints > 0 ||
            navigator.msMaxTouchPoints > 0
        );
    }

    /**
     * @param {Event} event
     * @returns {number}
     */
    function eventClientX(event) {
        return event.type === 'wheel' ||
            event.type === 'pointerup' ||
            event.type === 'pointerdown' ||
            event.type === 'pointermove' ||
            event.type === 'mousedown' ||
            event.type === 'mousemove' ||
            event.type === 'mouseup'
            ? event.clientX
            : event.changedTouches[0].clientX;
    }

    /**
     * @param {Event} event
     * @returns {number}
     */
    function eventClientY(event) {
        return event.type === 'wheel' ||
            event.type === 'pointerup' ||
            event.type === 'pointerdown' ||
            event.type === 'pointermove' ||
            event.type === 'mousedown' ||
            event.type === 'mousemove' ||
            event.type === 'mouseup'
            ? event.clientY
            : event.changedTouches[0].clientY;
    }

    /**
     * @class DragScrollable
     * @param {Object} windowObject
     * @param {Object} contentObject
     * @param {Object} options
     * @constructor
     */
    function DragScrollable(windowObject, contentObject) {
        var options =
            arguments.length > 2 && arguments[2] !== undefined
                ? arguments[2]
                : {};
        this._dropHandler = this._dropHandler.bind(this);
        this._grabHandler = this._grabHandler.bind(this);
        this._moveHandler = this._moveHandler.bind(this);
        options.smoothExtinction = Number(options.smoothExtinction) || 0.25;
        this.options = extendObject(
            {
                // smooth extinction
                smoothExtinction: 0.25,
                // callback triggered when grabbing an element
                onGrab: null,
                // callback triggered when moving an element
                onMove: null,
                // callback triggered when dropping an element
                onDrop: null,
            },
            options
        );

        // check if we're using a touch screen
        this.isTouch = isTouch();
        // switch to touch events if using a touch screen
        this.events = this.isTouch
            ? {
                  grab: 'touchstart',
                  move: 'touchmove',
                  drop: 'touchend',
              }
            : {
                  grab: 'mousedown',
                  move: 'mousemove',
                  drop: 'mouseup',
              };
        // for the touch screen we set the parameter forcibly
        this.events.options = this.isTouch
            ? {
                  passive: false,
              }
            : false;
        this.window = windowObject;
        this.content = contentObject;
        on(
            this.content.$element,
            this.events.grab,
            this._grabHandler,
            this.events.options
        );
    }
    DragScrollable.prototype = {
        constructor: DragScrollable,
        window: null,
        content: null,
        isTouch: false,
        isGrab: false,
        events: null,
        moveTimer: null,
        options: {},
        coordinates: null,
        coordinatesShift: null,
        /**
         * @param {Event} event
         * @private
         */
        _grabHandler: function _grabHandler(event) {
            // if touch started (only one finger) or pressed left mouse button
            if (
                (this.isTouch && event.touches.length === 1) ||
                event.buttons === 1
            ) {
                event.preventDefault();
                this.isGrab = true;
                this.coordinates = {
                    x: eventClientX(event),
                    y: eventClientY(event),
                };
                this.coordinatesShift = {
                    x: 0,
                    y: 0,
                };
                on(
                    document,
                    this.events.drop,
                    this._dropHandler,
                    this.events.options
                );
                on(
                    document,
                    this.events.move,
                    this._moveHandler,
                    this.events.options
                );
                if (typeof this.options.onGrab === 'function') {
                    this.options.onGrab(event);
                }
            }
        },
        /**
         * @param {Event} event
         * @private
         */
        _dropHandler: function _dropHandler(event) {
            event.preventDefault();
            this.isGrab = false;
            off(document, this.events.drop, this._dropHandler);
            off(document, this.events.move, this._moveHandler);
            if (typeof this.options.onDrop === 'function') {
                this.options.onDrop(event);
            }
        },
        /**
         * @param {Event} event
         * @returns {boolean}
         * @private
         */
        _moveHandler: function _moveHandler(event) {
            // so that it does not move when the touch screen and more than one finger
            if (this.isTouch && event.touches.length > 1) return false;
            event.preventDefault();
            var window = this.window,
                content = this.content,
                coordinatesShift = this.coordinatesShift,
                coordinates = this.coordinates,
                options = this.options;

            // change of the coordinate of the mouse cursor along the X/Y axis
            coordinatesShift.x = eventClientX(event) - coordinates.x;
            coordinatesShift.y = eventClientY(event) - coordinates.y;
            coordinates.x = eventClientX(event);
            coordinates.y = eventClientY(event);
            clearTimeout(this.moveTimer);

            // reset shift if cursor stops
            this.moveTimer = setTimeout(function () {
                coordinatesShift.x = 0;
                coordinatesShift.y = 0;
            }, 50);
            var contentNewLeft = content.currentLeft + coordinatesShift.x;
            var contentNewTop = content.currentTop + coordinatesShift.y;
            var maxAvailableLeft =
                (content.currentWidth - window.originalWidth) / 2 +
                content.correctX;
            var maxAvailableTop =
                (content.currentHeight - window.originalHeight) / 2 +
                content.correctY;

            // if we do not go beyond the permissible boundaries of the window
            if (Math.abs(contentNewLeft) <= maxAvailableLeft)
                content.currentLeft = contentNewLeft;

            // if we do not go beyond the permissible boundaries of the window
            if (Math.abs(contentNewTop) <= maxAvailableTop)
                content.currentTop = contentNewTop;
            transform(
                content.$element,
                {
                    left: content.currentLeft,
                    top: content.currentTop,
                    scale: content.currentScale,
                },
                this.options
            );
            if (typeof options.onMove === 'function') {
                options.onMove(event);
            }
        },
        destroy: function destroy() {
            off(
                this.content.$element,
                this.events.grab,
                this._grabHandler,
                this.events.options
            );
            for (var key in this) {
                if (this.hasOwnProperty(key)) {
                    this[key] = null;
                }
            }
        },
    };
    function transform($element, _ref, options) {
        var left = _ref.left,
            top = _ref.top,
            scale = _ref.scale;
        if (options.smoothExtinction) {
            $element.style.transition = 'transform '.concat(
                options.smoothExtinction,
                's'
            );
        } else {
            $element.style.removeProperty('transition');
        }
        $element.style.transform = 'translate3d('
            .concat(left, 'px, ')
            .concat(top, 'px, 0px) scale(')
            .concat(scale, ')');
    }

    var EVENT_CLICK = 'click';
    var EVENT_DBLCLICK = 'dblclick';
    var EVENT_WHEEL = 'wheel';
    var EVENT_PINCH_TO_ZOOM = 'pinchtozoom';

    /**
     * @param {HTMLElement} target
     * @constructor
     */
    function Interactor(target) {
        this.target = target;
        this.subscribes = {};
        this.coordsOnDown = null;
        this.pressingTimeout = null;
        this.firstClick = true;
        this.fingersHypot = null;
        this.zoomPinchWasDetected = false;

        // check if we're using a touch screen
        this.isTouch = isTouch();
        // switch to touch events if using a touch screen
        this.events = this.isTouch
            ? {
                  down: 'touchstart',
                  up: 'touchend',
              }
            : {
                  down: 'mousedown',
                  up: 'mouseup',
              };
        // if using touch screen tells the browser that the default action will not be undone
        this.events.options = this.isTouch
            ? {
                  passive: true,
              }
            : false;
        this._downHandler = this._downHandler.bind(this);
        this._upHandler = this._upHandler.bind(this);
        this._wheelHandler = this._wheelHandler.bind(this);
        this._touchMoveHandler = this._touchMoveHandler.bind(this);
        this._touchEndHandler = this._touchEndHandler.bind(this);
        on(
            this.target,
            this.events.down,
            this._downHandler,
            this.events.options
        );
        on(this.target, this.events.up, this._upHandler, this.events.options);
        on(this.target, EVENT_WHEEL, this._wheelHandler);
        if (this.isTouch) {
            on(this.target, 'touchmove', this._touchMoveHandler);
            on(this.target, 'touchend', this._touchEndHandler);
        }
    }
    Interactor.prototype = {
        constructor: Interactor,
        /**
         * @param {string} eventType
         * @param {Function} eventHandler
         * @returns {Interactor}
         */
        on: function on(eventType, eventHandler) {
            if (!(eventType in this.subscribes)) {
                this.subscribes[eventType] = [];
            }
            this.subscribes[eventType].push(eventHandler);
            return this;
        },
        destroy: function destroy() {
            off(
                this.target,
                this.events.down,
                this._downHandler,
                this.events.options
            );
            off(
                this.target,
                this.events.up,
                this._upHandler,
                this.events.options
            );
            off(
                this.target,
                EVENT_WHEEL,
                this._wheelHandler,
                this.events.options
            );
            if (this.isTouch) {
                off(this.target, 'touchmove', this._touchMoveHandler);
                off(this.target, 'touchend', this._touchEndHandler);
            }
            for (var key in this) {
                if (this.hasOwnProperty(key)) {
                    this[key] = null;
                }
            }
        },
        /**
         * @param {string} eventType
         * @param {Event} event
         * @private
         */
        _run: function _run(eventType, event) {
            if (this.subscribes[eventType]) {
                var _iterator = _createForOfIteratorHelper(
                        this.subscribes[eventType]
                    ),
                    _step;
                try {
                    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                        var eventHandler = _step.value;
                        eventHandler(event);
                    }
                } catch (err) {
                    _iterator.e(err);
                } finally {
                    _iterator.f();
                }
            }
        },
        /**
         * @param {TouchEvent|MouseEvent|Event} event
         * @private
         */
        _downHandler: function _downHandler(event) {
            this.coordsOnDown = null;
            if (
                (this.isTouch && event.touches.length === 1) ||
                event.buttons === 1
            ) {
                this.coordsOnDown = {
                    x: eventClientX(event),
                    y: eventClientY(event),
                };
            }
            clearTimeout(this.pressingTimeout);
        },
        /**
         * @param {TouchEvent|MouseEvent|Event} event
         * @private
         */
        _upHandler: function _upHandler(event) {
            var _this = this;
            var delay = this.subscribes[EVENT_DBLCLICK] ? 200 : 0;
            if (this.firstClick) {
                this.pressingTimeout = setTimeout(function () {
                    if (
                        _this.coordsOnDown &&
                        _this.coordsOnDown.x === eventClientX(event) &&
                        _this.coordsOnDown.y === eventClientY(event)
                    ) {
                        _this._run(EVENT_CLICK, event);
                    }
                    _this.firstClick = true;
                }, delay);
                this.firstClick = false;
            } else {
                this.pressingTimeout = setTimeout(function () {
                    _this._run(EVENT_DBLCLICK, event);
                    _this.firstClick = true;
                }, delay / 2);
            }
        },
        /**
         * @param {WheelEvent|Event} event
         * @private
         */
        _wheelHandler: function _wheelHandler(event) {
            this._run(EVENT_WHEEL, event);
        },
        /**
         * @param {TouchEvent|Event} event
         * @private
         */
        _touchMoveHandler: function _touchMoveHandler(event) {
            // detect two fingers
            if (event.targetTouches.length === 2) {
                var pageX1 = event.targetTouches[0].clientX;
                var pageY1 = event.targetTouches[0].clientY;
                var pageX2 = event.targetTouches[1].clientX;
                var pageY2 = event.targetTouches[1].clientY;

                // Math.hypot() analog
                var fingersHypotNew = Math.round(
                    Math.sqrt(
                        Math.pow(Math.abs(pageX1 - pageX2), 2) +
                            Math.pow(Math.abs(pageY1 - pageY2), 2)
                    )
                );
                var direction = 0;
                if (fingersHypotNew > this.fingersHypot + 5) direction = -1;
                if (fingersHypotNew < this.fingersHypot - 5) direction = 1;
                if (direction !== 0) {
                    if (this.fingersHypot !== null || direction === 1) {
                        // middle position between fingers
                        var clientX =
                            Math.min(pageX1, pageX2) +
                            Math.abs(pageX1 - pageX2) / 2;
                        var clientY =
                            Math.min(pageY1, pageY2) +
                            Math.abs(pageY1 - pageY2) / 2;
                        event.data = _objectSpread2(
                            _objectSpread2({}, event.data || {}),
                            {},
                            {
                                clientX: clientX,
                                clientY: clientY,
                                direction: direction,
                            }
                        );
                        this._run(EVENT_PINCH_TO_ZOOM, event);
                    }
                    this.fingersHypot = fingersHypotNew;
                    this.zoomPinchWasDetected = true;
                }
            }
        },
        /**
         * @private
         */
        _touchEndHandler: function _touchEndHandler() {
            if (this.zoomPinchWasDetected) {
                this.fingersHypot = null;
                this.zoomPinchWasDetected = false;
            }
        },
    };

    /**
     * @param {string} align
     * @param {WZoomContent} content
     * @param {WZoomWindow} window
     * @returns {number[]}
     */
    function calculateAlignPoint(align, content, window) {
        var pointX = 0;
        var pointY = 0;
        switch (align) {
            case 'top':
                pointY = (content.currentHeight - window.originalHeight) / 2;
                break;
            case 'right':
                pointX =
                    ((content.currentWidth - window.originalWidth) / 2) * -1;
                break;
            case 'bottom':
                pointY =
                    ((content.currentHeight - window.originalHeight) / 2) * -1;
                break;
            case 'left':
                pointX = (content.currentWidth - window.originalWidth) / 2;
                break;
        }
        return [pointX, pointY];
    }

    /**
     * @param {string} align
     * @param {WZoomContent} content
     * @param {WZoomWindow} window
     * @returns {number[]}
     */
    function calculateCorrectPoint(align, content, window) {
        var pointX = Math.max(
            0,
            (window.originalWidth - content.currentWidth) / 2
        );
        var pointY = Math.max(
            0,
            (window.originalHeight - content.currentHeight) / 2
        );
        switch (align) {
            case 'top':
                pointY = 0;
                break;
            case 'right':
                pointX = 0;
                break;
            case 'bottom':
                pointY = pointY * 2;
                break;
            case 'left':
                pointX = pointX * 2;
                break;
        }
        return [pointX, pointY];
    }
    function calculateContentShift(
        axisValue,
        axisScroll,
        axisWindowPosition,
        axisContentPosition,
        originalWindowSize,
        contentSizeRatio
    ) {
        var windowShift = axisValue + axisScroll - axisWindowPosition;
        var centerWindowShift = originalWindowSize / 2 - windowShift;
        var centerContentShift = centerWindowShift + axisContentPosition;
        return (
            centerContentShift * contentSizeRatio -
            centerContentShift +
            axisContentPosition
        );
    }
    function calculateContentMaxShift(
        align,
        originalWindowSize,
        correctCoordinate,
        size,
        shift
    ) {
        switch (align) {
            case 'left':
                if (size / 2 - shift < originalWindowSize / 2) {
                    shift = (size - originalWindowSize) / 2;
                }
                break;
            case 'right':
                if (size / 2 + shift < originalWindowSize / 2) {
                    shift = ((size - originalWindowSize) / 2) * -1;
                }
                break;
            default:
                if (
                    (size - originalWindowSize) / 2 + correctCoordinate <
                    Math.abs(shift)
                ) {
                    var positive = shift < 0 ? -1 : 1;
                    shift =
                        ((size - originalWindowSize) / 2 + correctCoordinate) *
                        positive;
                }
        }
        return shift;
    }

    /**
     * @param {WZoomWindow} window
     * @returns {{x: number, y: number}}
     */
    function calculateWindowCenter(window) {
        var windowPosition = getElementPosition(window.$element);
        return {
            x:
                windowPosition.left +
                window.originalWidth / 2 -
                getPageScrollLeft(),
            y:
                windowPosition.top +
                window.originalHeight / 2 -
                getPageScrollTop(),
        };
    }

    /**
     * @class WZoom
     * @param {string|HTMLElement} selectorOrHTMLElement
     * @param {Object} options
     * @constructor
     */
    function WZoom(selectorOrHTMLElement) {
        var options =
            arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : {};
        this._init = this._init.bind(this);
        this._prepare = this._prepare.bind(this);
        this._computeNewScale = this._computeNewScale.bind(this);
        this._computeNewPosition = this._computeNewPosition.bind(this);
        this._transform = this._transform.bind(this);

        /** @type {WZoomContent} */
        this.content = {};
        /** @type {WZoomWindow} */
        this.window = {};

        /********************/
        /********************/
        this.isTouch = false;
        this.direction = 1;
        this.options = null;
        this.dragScrollable = null;
        this.content.elementInteractor = null;
        /********************/
        /********************/

        var defaults = {
            // type content: `image` - only one image, `html` - any HTML content
            type: 'image',
            // for type `image` computed auto (if width set null), for type `html` need set real html content width, else computed auto
            width: null,
            // for type `image` computed auto (if height set null), for type `html` need set real html content height, else computed auto
            height: null,
            // drag scrollable content
            dragScrollable: true,
            // options for the DragScrollable module
            dragScrollableOptions: {},
            // minimum allowed proportion of scale (computed auto if null)
            minScale: null,
            // maximum allowed proportion of scale (1 = 100% content size)
            maxScale: 1,
            // content resizing speed
            speed: 50,
            // zoom to maximum (minimum) size on click
            zoomOnClick: true,
            // zoom to maximum (minimum) size on double click
            zoomOnDblClick: false,
            // if is true, then when the source image changes, the plugin will automatically restart init function (used with type = image)
            // attention: if false, it will work correctly only if the images are of the same size
            watchImageChange: true,
            // smooth extinction
            smoothExtinction: 0.3,
            // align content `center`, `left`, `top`, `right`, `bottom`
            alignContent: 'center',
            /********************/
            disableWheelZoom: false,
            // option to reverse wheel direction
            reverseWheelDirection: false,
        };
        if (typeof selectorOrHTMLElement === 'string') {
            this.content.$element = document.querySelector(
                selectorOrHTMLElement
            );
        } else if (selectorOrHTMLElement instanceof HTMLElement) {
            this.content.$element = selectorOrHTMLElement;
        } else {
            throw 'WZoom: `selectorOrHTMLElement` must be selector or HTMLElement, and not '.concat(
                {}.toString.call(selectorOrHTMLElement)
            );
        }

        // check if we're using a touch screen
        this.isTouch = isTouch();
        if (this.content.$element) {
            options.smoothExtinction =
                Number(options.smoothExtinction) || defaults.smoothExtinction;
            this.options = extendObject(defaults, options);
            if (
                this.options.minScale &&
                this.options.minScale >= this.options.maxScale
            ) {
                this.options.minScale = null;
            }

            // for window take just the parent
            this.window.$element = this.content.$element.parentNode;
            if (this.options.type === 'image') {
                var initAlreadyDone = false;

                // if the `image` has already been loaded
                if (this.content.$element.complete) {
                    this._init();
                    initAlreadyDone = true;
                }
                if (
                    !initAlreadyDone ||
                    this.options.watchImageChange === true
                ) {
                    // even if the `image` has already been loaded (for "hotswap" of src support)
                    on(
                        this.content.$element,
                        'load',
                        this._init,
                        // if watchImageChange == false listen add only until the first call
                        this.options.watchImageChange
                            ? false
                            : {
                                  once: true,
                              }
                    );
                }
            } else {
                this._init();
            }
        }
    }
    WZoom.prototype = {
        constructor: WZoom,
        /**
         * @private
         */
        _init: function _init() {
            var _this = this;
            this._prepare();
            if (this.content.elementInteractor) {
                this.content.elementInteractor.destroy();
            }
            this.content.elementInteractor = new Interactor(
                this.content.$element
            );
            if (this.options.dragScrollable === true) {
                // this can happen if the src of this.content.$element (when type = image) is changed and repeat event load at image
                if (this.dragScrollable) {
                    this.dragScrollable.destroy();
                }
                this.setDragScrollable(
                    new DragScrollable(
                        this.window,
                        this.content,
                        this.options.dragScrollableOptions
                    )
                );
            }
            if (!this.options.disableWheelZoom) {
                // support for zoom and pinch on touch screen devices
                if (this.isTouch) {
                    this.content.elementInteractor.on(
                        'pinchtozoom',
                        function (event) {
                            var _event$data = event.data,
                                clientX = _event$data.clientX,
                                clientY = _event$data.clientY,
                                direction = _event$data.direction;
                            _this._transform(
                                _this._computeNewPosition(
                                    _this._computeNewScale(direction),
                                    {
                                        x: clientX,
                                        y: clientY,
                                    }
                                )
                            );
                        }
                    );
                }
                this.content.elementInteractor.on('wheel', function (event) {
                    event.preventDefault();
                    var direction = _this.options.reverseWheelDirection
                        ? -event.deltaY
                        : event.deltaY;
                    _this._transform(
                        _this._computeNewPosition(
                            _this._computeNewScale(direction),
                            {
                                x: eventClientX(event),
                                y: eventClientY(event),
                            }
                        )
                    );
                });
            }
            if (this.options.zoomOnClick || this.options.zoomOnDblClick) {
                var eventType = this.options.zoomOnDblClick
                    ? 'dblclick'
                    : 'click';
                this.content.elementInteractor.on(eventType, function (event) {
                    _this._transform(
                        _this._computeNewPosition(
                            _this.direction === 1
                                ? _this.content.maxScale
                                : _this.content.minScale,
                            {
                                x: eventClientX(event),
                                y: eventClientY(event),
                            }
                        )
                    );
                    _this.direction *= -1;
                });
            }
        },
        /**
         * @private
         */
        _prepare: function _prepare() {
            var windowPosition = getElementPosition(this.window.$element);

            // original window sizes and position
            this.window.originalWidth = this.window.$element.offsetWidth;
            this.window.originalHeight = this.window.$element.offsetHeight;
            this.window.positionLeft = windowPosition.left;
            this.window.positionTop = windowPosition.top;

            // original content sizes
            if (this.options.type === 'image') {
                this.content.originalWidth =
                    this.options.width || this.content.$element.naturalWidth;
                this.content.originalHeight =
                    this.options.height || this.content.$element.naturalHeight;
            } else {
                this.content.originalWidth =
                    this.options.width || this.content.$element.offsetWidth;
                this.content.originalHeight =
                    this.options.height || this.content.$element.offsetHeight;
            }

            // minScale && maxScale
            this.content.minScale =
                this.options.minScale ||
                Math.min(
                    this.window.originalWidth / this.content.originalWidth,
                    this.window.originalHeight / this.content.originalHeight
                );
            this.content.maxScale = this.options.maxScale;

            // current content sizes and transform data
            this.content.currentWidth =
                this.content.originalWidth * this.content.minScale;
            this.content.currentHeight =
                this.content.originalHeight * this.content.minScale;
            var _calculateAlignPoint = calculateAlignPoint(
                    this.options.alignContent,
                    this.content,
                    this.window
                ),
                _calculateAlignPoint2 = _slicedToArray(_calculateAlignPoint, 2),
                alignPointX = _calculateAlignPoint2[0],
                alignPointY = _calculateAlignPoint2[1];
            this.content.alignPointX = alignPointX;
            this.content.alignPointY = alignPointY;

            // calculate indent-left and indent-top to of content from window borders
            var _calculateCorrectPoin = calculateCorrectPoint(
                    this.options.alignContent,
                    this.content,
                    this.window
                ),
                _calculateCorrectPoin2 = _slicedToArray(
                    _calculateCorrectPoin,
                    2
                ),
                correctX = _calculateCorrectPoin2[0],
                correctY = _calculateCorrectPoin2[1];
            this.content.correctX = correctX;
            this.content.correctY = correctY;
            this.content.currentLeft = this.content.alignPointX;
            this.content.currentTop = this.content.alignPointY;
            this.content.currentScale = this.content.minScale;
            this.content.$element.style.transform = 'translate3d('
                .concat(this.content.alignPointX, 'px, ')
                .concat(this.content.alignPointY, 'px, 0px) scale(')
                .concat(this.content.minScale, ')');
            if (typeof this.options.prepare === 'function') {
                this.options.prepare();
            }
        },
        /**
         * @private
         */
        _computeNewScale: function _computeNewScale(direction) {
            this.direction = direction < 0 ? 1 : -1;
            var _this$content = this.content,
                minScale = _this$content.minScale,
                maxScale = _this$content.maxScale,
                currentScale = _this$content.currentScale;
            var contentNewScale =
                currentScale + this.direction / this.options.speed;
            if (contentNewScale < minScale) {
                this.direction = 1;
            } else if (contentNewScale > maxScale) {
                this.direction = -1;
            }
            return contentNewScale < minScale
                ? minScale
                : contentNewScale > maxScale
                ? maxScale
                : contentNewScale;
        },
        /**
         * @private
         */
        _computeNewPosition: function _computeNewPosition(
            contentNewScale,
            _ref
        ) {
            var x = _ref.x,
                y = _ref.y;
            var window = this.window,
                content = this.content;
            var contentNewWidth = content.originalWidth * contentNewScale;
            var contentNewHeight = content.originalHeight * contentNewScale;
            var scrollLeft = getPageScrollLeft();
            var scrollTop = getPageScrollTop();

            // calculate the parameters along the X axis
            var contentNewLeft = calculateContentShift(
                x,
                scrollLeft,
                window.positionLeft,
                content.currentLeft,
                window.originalWidth,
                contentNewWidth / content.currentWidth
            );

            // calculate the parameters along the Y axis
            var contentNewTop = calculateContentShift(
                y,
                scrollTop,
                window.positionTop,
                content.currentTop,
                window.originalHeight,
                contentNewHeight / content.currentHeight
            );
            if (this.direction === -1) {
                // check that the content does not go beyond the X axis
                contentNewLeft = calculateContentMaxShift(
                    this.options.alignContent,
                    window.originalWidth,
                    content.correctX,
                    contentNewWidth,
                    contentNewLeft
                );

                // check that the content does not go beyond the Y axis
                contentNewTop = calculateContentMaxShift(
                    this.options.alignContent,
                    window.originalHeight,
                    content.correctY,
                    contentNewHeight,
                    contentNewTop
                );
            }
            if (contentNewScale === this.content.minScale) {
                contentNewLeft = this.content.alignPointX;
                contentNewTop = this.content.alignPointY;
            }
            var response = {
                currentLeft: content.currentLeft,
                newLeft: contentNewLeft,
                currentTop: content.currentTop,
                newTop: contentNewTop,
                currentScale: content.currentScale,
                newScale: contentNewScale,
            };
            content.currentWidth = contentNewWidth;
            content.currentHeight = contentNewHeight;
            content.currentLeft = contentNewLeft;
            content.currentTop = contentNewTop;
            content.currentScale = contentNewScale;
            return response;
        },
        /**
         * @private
         */
        _transform: function _transform(_ref2) {
            _ref2.currentLeft;
            var newLeft = _ref2.newLeft;
            _ref2.currentTop;
            var newTop = _ref2.newTop;
            _ref2.currentScale;
            var newScale = _ref2.newScale;
            if (this.options.smoothExtinction) {
                this.content.$element.style.transition = 'transform '.concat(
                    this.options.smoothExtinction,
                    's'
                );
            } else {
                this.content.$element.style.removeProperty('transition');
            }
            this.content.$element.style.transform = 'translate3d('
                .concat(newLeft, 'px, ')
                .concat(newTop, 'px, 0px) scale(')
                .concat(newScale, ')');
            if (typeof this.options.rescale === 'function') {
                this.options.rescale();
            }
        },
        /**
         * @private
         */
        _zoom: function _zoom(scale, coordinates) {
            // if the coordinates are not passed, then use the coordinates of the center
            if (
                coordinates === undefined ||
                coordinates.x === undefined ||
                coordinates.y === undefined
            ) {
                coordinates = calculateWindowCenter(this.window);
            }

            // @TODO добавить проверку на то что бы переданные координаты не выходили за пределы возможного

            this._transform(this._computeNewPosition(scale, coordinates));
        },
        prepare: function prepare() {
            this._prepare();
        },
        zoomUp: function zoomUp() {
            this._zoom(this._computeNewScale(-1));
        },
        zoomDown: function zoomDown() {
            this._zoom(this._computeNewScale(1));
        },
        maxZoomUp: function maxZoomUp() {
            this._zoom(this.content.maxScale);
        },
        maxZoomDown: function maxZoomDown() {
            this._zoom(this.content.minScale);
        },
        zoomUpToPoint: function zoomUpToPoint(coordinates) {
            this._zoom(this._computeNewScale(-1), coordinates);
        },
        zoomDownToPoint: function zoomDownToPoint(coordinates) {
            this._zoom(this._computeNewScale(1), coordinates);
        },
        maxZoomUpToPoint: function maxZoomUpToPoint(coordinates) {
            this._zoom(this.content.maxScale, coordinates);
        },
        setDragScrollable: function setDragScrollable(dragScrollable) {
            this.dragScrollable = dragScrollable;
        },
        destroy: function destroy() {
            this.content.$element.style.transform = '';
            if (this.options.type === 'image') {
                off(this.content.$element, 'load', this._init);
            }
            if (this.content.elementInteractor) {
                this.content.elementInteractor.destroy();
            }
            if (this.dragScrollable) {
                this.dragScrollable.destroy();
            }
            for (var key in this) {
                if (this.hasOwnProperty(key)) {
                    this[key] = null;
                }
            }
        },
    };

    /**
     * Create WZoom instance
     * @param {string|HTMLElement} selectorOrHTMLElement
     * @param {Object} [options]
     * @returns {WZoom}
     */
    WZoom.create = function (selectorOrHTMLElement, options) {
        return new WZoom(selectorOrHTMLElement, options);
    };

    // @todo define types without any

    /**
     * @typedef WZoomContent
     * @type {object}
     * @property {?Interactor} elementInteractor,
     * @property {HTMLElement} [$element],
     * @property {any} [originalWidth],
     * @property {any} [originalHeight],
     * @property {any} [currentWidth],
     * @property {any} [currentHeight],
     * @property {any} [currentLeft],
     * @property {any} [currentTop],
     * @property {any} [currentScale],
     * @property {any} [maxScale],
     * @property {any} [minScale],
     * @property {any} [alignPointX],
     * @property {any} [alignPointY],
     * @property {any} [correctX],
     * @property {any} [correctY],
     */

    /**
     * @typedef WZoomWindow
     * @type {object}
     * @property {HTMLElement} [$element],
     * @property {any} [originalWidth],
     * @property {any} [originalHeight],
     * @property {any} [positionLeft]
     * @property {any} [positionTop]
     */

    return WZoom;
});
