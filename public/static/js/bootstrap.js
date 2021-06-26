/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/*!
 * Bootstrap v5.0.0 (https://getbootstrap.com/)
 * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */
!(function (t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = e(require('@popperjs/core')))
    : 'function' == typeof define && define.amd
    ? define(['@popperjs/core'], e)
    : ((t =
        'undefined' != typeof globalThis ? globalThis : t || self).bootstrap =
        e(t.Popper));
})(this, function (t) {
  function e(t) {
    if (t && t.__esModule) return t;
    var e = Object.create(null);
    return (
      t &&
        Object.keys(t).forEach(function (s) {
          if ('default' !== s) {
            var i = Object.getOwnPropertyDescriptor(t, s);
            Object.defineProperty(
              e,
              s,
              i.get
                ? i
                : {
                    enumerable: !0,
                    get: function () {
                      return t[s];
                    },
                  }
            );
          }
        }),
      (e.default = t),
      Object.freeze(e)
    );
  }
  var s = e(t);
  const i = t => {
      do {
        t += Math.floor(1e6 * Math.random());
      } while (document.getElementById(t));
      return t;
    },
    n = t => {
      let e = t.getAttribute('data-bs-target');
      if (!e || '#' === e) {
        let s = t.getAttribute('href');
        if (!s || (!s.includes('#') && !s.startsWith('.'))) return null;
        s.includes('#') && !s.startsWith('#') && (s = '#' + s.split('#')[1]),
          (e = s && '#' !== s ? s.trim() : null);
      }
      return e;
    },
    o = t => {
      const e = n(t);
      return e && document.querySelector(e) ? e : null;
    },
    r = t => {
      const e = n(t);
      return e ? document.querySelector(e) : null;
    },
    a = t => {
      if (!t) return 0;
      let { transitionDuration: e, transitionDelay: s } =
        window.getComputedStyle(t);
      const i = Number.parseFloat(e),
        n = Number.parseFloat(s);
      return i || n
        ? ((e = e.split(',')[0]),
          (s = s.split(',')[0]),
          1e3 * (Number.parseFloat(e) + Number.parseFloat(s)))
        : 0;
    },
    l = t => {
      t.dispatchEvent(new Event('transitionend'));
    },
    c = t => (t[0] || t).nodeType,
    h = (t, e) => {
      let s = !1;
      const i = e + 5;
      t.addEventListener('transitionend', function e() {
        (s = !0), t.removeEventListener('transitionend', e);
      }),
        setTimeout(() => {
          s || l(t);
        }, i);
    },
    d = (t, e, s) => {
      Object.keys(s).forEach(i => {
        const n = s[i],
          o = e[i],
          r =
            o && c(o)
              ? 'element'
              : null == (a = o)
              ? '' + a
              : {}.toString
                  .call(a)
                  .match(/\s([a-z]+)/i)[1]
                  .toLowerCase();
        var a;
        if (!new RegExp(n).test(r))
          throw new TypeError(
            `${t.toUpperCase()}: Option "${i}" provided type "${r}" but expected type "${n}".`
          );
      });
    },
    u = t => {
      if (!t) return !1;
      if (t.style && t.parentNode && t.parentNode.style) {
        const e = getComputedStyle(t),
          s = getComputedStyle(t.parentNode);
        return (
          'none' !== e.display &&
          'none' !== s.display &&
          'hidden' !== e.visibility
        );
      }
      return !1;
    },
    g = t =>
      !t ||
      t.nodeType !== Node.ELEMENT_NODE ||
      !!t.classList.contains('disabled') ||
      (void 0 !== t.disabled
        ? t.disabled
        : t.hasAttribute('disabled') && 'false' !== t.getAttribute('disabled')),
    f = t => {
      if (!document.documentElement.attachShadow) return null;
      if ('function' == typeof t.getRootNode) {
        const e = t.getRootNode();
        return e instanceof ShadowRoot ? e : null;
      }
      return t instanceof ShadowRoot
        ? t
        : t.parentNode
        ? f(t.parentNode)
        : null;
    },
    p = () => {},
    m = t => t.offsetHeight,
    _ = () => {
      const { jQuery: t } = window;
      return t && !document.body.hasAttribute('data-bs-no-jquery') ? t : null;
    },
    b = () => 'rtl' === document.documentElement.dir,
    v = (t, e) => {
      var s;
      (s = () => {
        const s = _();
        if (s) {
          const i = s.fn[t];
          (s.fn[t] = e.jQueryInterface),
            (s.fn[t].Constructor = e),
            (s.fn[t].noConflict = () => ((s.fn[t] = i), e.jQueryInterface));
        }
      }),
        'loading' === document.readyState
          ? document.addEventListener('DOMContentLoaded', s)
          : s();
    },
    y = t => {
      'function' == typeof t && t();
    },
    w = new Map();
  var E = {
    set(t, e, s) {
      w.has(t) || w.set(t, new Map());
      const i = w.get(t);
      i.has(e) || 0 === i.size
        ? i.set(e, s)
        : console.error(
            `Bootstrap doesn't allow more than one instance per element. Bound instance: ${
              Array.from(i.keys())[0]
            }.`
          );
    },
    get: (t, e) => (w.has(t) && w.get(t).get(e)) || null,
    remove(t, e) {
      if (!w.has(t)) return;
      const s = w.get(t);
      s.delete(e), 0 === s.size && w.delete(t);
    },
  };
  const T = /[^.]*(?=\..*)\.|.*/,
    A = /\..*/,
    L = /::\d+$/,
    k = {};
  let C = 1;
  const D = { mouseenter: 'mouseover', mouseleave: 'mouseout' },
    S = /^(mouseenter|mouseleave)/i,
    N = new Set([
      'click',
      'dblclick',
      'mouseup',
      'mousedown',
      'contextmenu',
      'mousewheel',
      'DOMMouseScroll',
      'mouseover',
      'mouseout',
      'mousemove',
      'selectstart',
      'selectend',
      'keydown',
      'keypress',
      'keyup',
      'orientationchange',
      'touchstart',
      'touchmove',
      'touchend',
      'touchcancel',
      'pointerdown',
      'pointermove',
      'pointerup',
      'pointerleave',
      'pointercancel',
      'gesturestart',
      'gesturechange',
      'gestureend',
      'focus',
      'blur',
      'change',
      'reset',
      'select',
      'submit',
      'focusin',
      'focusout',
      'load',
      'unload',
      'beforeunload',
      'resize',
      'move',
      'DOMContentLoaded',
      'readystatechange',
      'error',
      'abort',
      'scroll',
    ]);
  function O(t, e) {
    return (e && `${e}::${C++}`) || t.uidEvent || C++;
  }
  function I(t) {
    const e = O(t);
    return (t.uidEvent = e), (k[e] = k[e] || {}), k[e];
  }
  function j(t, e, s = null) {
    const i = Object.keys(t);
    for (let n = 0, o = i.length; n < o; n++) {
      const o = t[i[n]];
      if (o.originalHandler === e && o.delegationSelector === s) return o;
    }
    return null;
  }
  function x(t, e, s) {
    const i = 'string' == typeof e,
      n = i ? s : e;
    let o = M(t);
    return N.has(o) || (o = t), [i, n, o];
  }
  function P(t, e, s, i, n) {
    if ('string' != typeof e || !t) return;
    if ((s || ((s = i), (i = null)), S.test(e))) {
      const t = t =>
        function (e) {
          if (
            !e.relatedTarget ||
            (e.relatedTarget !== e.delegateTarget &&
              !e.delegateTarget.contains(e.relatedTarget))
          )
            return t.call(this, e);
        };
      i ? (i = t(i)) : (s = t(s));
    }
    const [o, r, a] = x(e, s, i),
      l = I(t),
      c = l[a] || (l[a] = {}),
      h = j(c, r, o ? s : null);
    if (h) return void (h.oneOff = h.oneOff && n);
    const d = O(r, e.replace(T, '')),
      u = o
        ? (function (t, e, s) {
            return function i(n) {
              const o = t.querySelectorAll(e);
              for (let { target: r } = n; r && r !== this; r = r.parentNode)
                for (let a = o.length; a--; )
                  if (o[a] === r)
                    return (
                      (n.delegateTarget = r),
                      i.oneOff && R.off(t, n.type, e, s),
                      s.apply(r, [n])
                    );
              return null;
            };
          })(t, s, i)
        : (function (t, e) {
            return function s(i) {
              return (
                (i.delegateTarget = t),
                s.oneOff && R.off(t, i.type, e),
                e.apply(t, [i])
              );
            };
          })(t, s);
    (u.delegationSelector = o ? s : null),
      (u.originalHandler = r),
      (u.oneOff = n),
      (u.uidEvent = d),
      (c[d] = u),
      t.addEventListener(a, u, o);
  }
  function H(t, e, s, i, n) {
    const o = j(e[s], i, n);
    o && (t.removeEventListener(s, o, Boolean(n)), delete e[s][o.uidEvent]);
  }
  function M(t) {
    return (t = t.replace(A, '')), D[t] || t;
  }
  const R = {
    on(t, e, s, i) {
      P(t, e, s, i, !1);
    },
    one(t, e, s, i) {
      P(t, e, s, i, !0);
    },
    off(t, e, s, i) {
      if ('string' != typeof e || !t) return;
      const [n, o, r] = x(e, s, i),
        a = r !== e,
        l = I(t),
        c = e.startsWith('.');
      if (void 0 !== o) {
        if (!l || !l[r]) return;
        return void H(t, l, r, o, n ? s : null);
      }
      c &&
        Object.keys(l).forEach(s => {
          !(function (t, e, s, i) {
            const n = e[s] || {};
            Object.keys(n).forEach(o => {
              if (o.includes(i)) {
                const i = n[o];
                H(t, e, s, i.originalHandler, i.delegationSelector);
              }
            });
          })(t, l, s, e.slice(1));
        });
      const h = l[r] || {};
      Object.keys(h).forEach(s => {
        const i = s.replace(L, '');
        if (!a || e.includes(i)) {
          const e = h[s];
          H(t, l, r, e.originalHandler, e.delegationSelector);
        }
      });
    },
    trigger(t, e, s) {
      if ('string' != typeof e || !t) return null;
      const i = _(),
        n = M(e),
        o = e !== n,
        r = N.has(n);
      let a,
        l = !0,
        c = !0,
        h = !1,
        d = null;
      return (
        o &&
          i &&
          ((a = i.Event(e, s)),
          i(t).trigger(a),
          (l = !a.isPropagationStopped()),
          (c = !a.isImmediatePropagationStopped()),
          (h = a.isDefaultPrevented())),
        r
          ? ((d = document.createEvent('HTMLEvents')), d.initEvent(n, l, !0))
          : (d = new CustomEvent(e, { bubbles: l, cancelable: !0 })),
        void 0 !== s &&
          Object.keys(s).forEach(t => {
            Object.defineProperty(d, t, { get: () => s[t] });
          }),
        h && d.preventDefault(),
        c && t.dispatchEvent(d),
        d.defaultPrevented && void 0 !== a && a.preventDefault(),
        d
      );
    },
  };
  class B {
    constructor(t) {
      (t = 'string' == typeof t ? document.querySelector(t) : t) &&
        ((this._element = t),
        E.set(this._element, this.constructor.DATA_KEY, this));
    }
    dispose() {
      E.remove(this._element, this.constructor.DATA_KEY),
        R.off(this._element, '.' + this.constructor.DATA_KEY),
        (this._element = null);
    }
    static getInstance(t) {
      return E.get(t, this.DATA_KEY);
    }
    static get VERSION() {
      return '5.0.0';
    }
  }
  class $ extends B {
    static get DATA_KEY() {
      return 'bs.alert';
    }
    close(t) {
      const e = t ? this._getRootElement(t) : this._element,
        s = this._triggerCloseEvent(e);
      null === s || s.defaultPrevented || this._removeElement(e);
    }
    _getRootElement(t) {
      return r(t) || t.closest('.alert');
    }
    _triggerCloseEvent(t) {
      return R.trigger(t, 'close.bs.alert');
    }
    _removeElement(t) {
      if ((t.classList.remove('show'), !t.classList.contains('fade')))
        return void this._destroyElement(t);
      const e = a(t);
      R.one(t, 'transitionend', () => this._destroyElement(t)), h(t, e);
    }
    _destroyElement(t) {
      t.parentNode && t.parentNode.removeChild(t),
        R.trigger(t, 'closed.bs.alert');
    }
    static jQueryInterface(t) {
      return this.each(function () {
        let e = E.get(this, 'bs.alert');
        e || (e = new $(this)), 'close' === t && e[t](this);
      });
    }
    static handleDismiss(t) {
      return function (e) {
        e && e.preventDefault(), t.close(this);
      };
    }
  }
  R.on(
    document,
    'click.bs.alert.data-api',
    '[data-bs-dismiss="alert"]',
    $.handleDismiss(new $())
  ),
    v('alert', $);
  class z extends B {
    static get DATA_KEY() {
      return 'bs.button';
    }
    toggle() {
      this._element.setAttribute(
        'aria-pressed',
        this._element.classList.toggle('active')
      );
    }
    static jQueryInterface(t) {
      return this.each(function () {
        let e = E.get(this, 'bs.button');
        e || (e = new z(this)), 'toggle' === t && e[t]();
      });
    }
  }
  function U(t) {
    return (
      'true' === t ||
      ('false' !== t &&
        (t === Number(t).toString()
          ? Number(t)
          : '' === t || 'null' === t
          ? null
          : t))
    );
  }
  function K(t) {
    return t.replace(/[A-Z]/g, t => '-' + t.toLowerCase());
  }
  R.on(document, 'click.bs.button.data-api', '[data-bs-toggle="button"]', t => {
    t.preventDefault();
    const e = t.target.closest('[data-bs-toggle="button"]');
    let s = E.get(e, 'bs.button');
    s || (s = new z(e)), s.toggle();
  }),
    v('button', z);
  const F = {
      setDataAttribute(t, e, s) {
        t.setAttribute('data-bs-' + K(e), s);
      },
      removeDataAttribute(t, e) {
        t.removeAttribute('data-bs-' + K(e));
      },
      getDataAttributes(t) {
        if (!t) return {};
        const e = {};
        return (
          Object.keys(t.dataset)
            .filter(t => t.startsWith('bs'))
            .forEach(s => {
              let i = s.replace(/^bs/, '');
              (i = i.charAt(0).toLowerCase() + i.slice(1, i.length)),
                (e[i] = U(t.dataset[s]));
            }),
          e
        );
      },
      getDataAttribute: (t, e) => U(t.getAttribute('data-bs-' + K(e))),
      offset(t) {
        const e = t.getBoundingClientRect();
        return {
          top: e.top + document.body.scrollTop,
          left: e.left + document.body.scrollLeft,
        };
      },
      position: t => ({ top: t.offsetTop, left: t.offsetLeft }),
    },
    W = {
      find: (t, e = document.documentElement) =>
        [].concat(...Element.prototype.querySelectorAll.call(e, t)),
      findOne: (t, e = document.documentElement) =>
        Element.prototype.querySelector.call(e, t),
      children: (t, e) => [].concat(...t.children).filter(t => t.matches(e)),
      parents(t, e) {
        const s = [];
        let i = t.parentNode;
        for (; i && i.nodeType === Node.ELEMENT_NODE && 3 !== i.nodeType; )
          i.matches(e) && s.push(i), (i = i.parentNode);
        return s;
      },
      prev(t, e) {
        let s = t.previousElementSibling;
        for (; s; ) {
          if (s.matches(e)) return [s];
          s = s.previousElementSibling;
        }
        return [];
      },
      next(t, e) {
        let s = t.nextElementSibling;
        for (; s; ) {
          if (s.matches(e)) return [s];
          s = s.nextElementSibling;
        }
        return [];
      },
    },
    Y = {
      interval: 5e3,
      keyboard: !0,
      slide: !1,
      pause: 'hover',
      wrap: !0,
      touch: !0,
    },
    V = {
      interval: '(number|boolean)',
      keyboard: 'boolean',
      slide: '(boolean|string)',
      pause: '(string|boolean)',
      wrap: 'boolean',
      touch: 'boolean',
    },
    q = 'next',
    Q = 'prev',
    X = 'left',
    G = 'right';
  class Z extends B {
    constructor(t, e) {
      super(t),
        (this._items = null),
        (this._interval = null),
        (this._activeElement = null),
        (this._isPaused = !1),
        (this._isSliding = !1),
        (this.touchTimeout = null),
        (this.touchStartX = 0),
        (this.touchDeltaX = 0),
        (this._config = this._getConfig(e)),
        (this._indicatorsElement = W.findOne(
          '.carousel-indicators',
          this._element
        )),
        (this._touchSupported =
          'ontouchstart' in document.documentElement ||
          navigator.maxTouchPoints > 0),
        (this._pointerEvent = Boolean(window.PointerEvent)),
        this._addEventListeners();
    }
    static get Default() {
      return Y;
    }
    static get DATA_KEY() {
      return 'bs.carousel';
    }
    next() {
      this._isSliding || this._slide(q);
    }
    nextWhenVisible() {
      !document.hidden && u(this._element) && this.next();
    }
    prev() {
      this._isSliding || this._slide(Q);
    }
    pause(t) {
      t || (this._isPaused = !0),
        W.findOne('.carousel-item-next, .carousel-item-prev', this._element) &&
          (l(this._element), this.cycle(!0)),
        clearInterval(this._interval),
        (this._interval = null);
    }
    cycle(t) {
      t || (this._isPaused = !1),
        this._interval &&
          (clearInterval(this._interval), (this._interval = null)),
        this._config &&
          this._config.interval &&
          !this._isPaused &&
          (this._updateInterval(),
          (this._interval = setInterval(
            (document.visibilityState ? this.nextWhenVisible : this.next).bind(
              this
            ),
            this._config.interval
          )));
    }
    to(t) {
      this._activeElement = W.findOne('.active.carousel-item', this._element);
      const e = this._getItemIndex(this._activeElement);
      if (t > this._items.length - 1 || t < 0) return;
      if (this._isSliding)
        return void R.one(this._element, 'slid.bs.carousel', () => this.to(t));
      if (e === t) return this.pause(), void this.cycle();
      const s = t > e ? q : Q;
      this._slide(s, this._items[t]);
    }
    dispose() {
      (this._items = null),
        (this._config = null),
        (this._interval = null),
        (this._isPaused = null),
        (this._isSliding = null),
        (this._activeElement = null),
        (this._indicatorsElement = null),
        super.dispose();
    }
    _getConfig(t) {
      return (t = { ...Y, ...t }), d('carousel', t, V), t;
    }
    _handleSwipe() {
      const t = Math.abs(this.touchDeltaX);
      if (t <= 40) return;
      const e = t / this.touchDeltaX;
      (this.touchDeltaX = 0), e && this._slide(e > 0 ? G : X);
    }
    _addEventListeners() {
      this._config.keyboard &&
        R.on(this._element, 'keydown.bs.carousel', t => this._keydown(t)),
        'hover' === this._config.pause &&
          (R.on(this._element, 'mouseenter.bs.carousel', t => this.pause(t)),
          R.on(this._element, 'mouseleave.bs.carousel', t => this.cycle(t))),
        this._config.touch &&
          this._touchSupported &&
          this._addTouchEventListeners();
    }
    _addTouchEventListeners() {
      const t = t => {
          !this._pointerEvent ||
          ('pen' !== t.pointerType && 'touch' !== t.pointerType)
            ? this._pointerEvent || (this.touchStartX = t.touches[0].clientX)
            : (this.touchStartX = t.clientX);
        },
        e = t => {
          this.touchDeltaX =
            t.touches && t.touches.length > 1
              ? 0
              : t.touches[0].clientX - this.touchStartX;
        },
        s = t => {
          !this._pointerEvent ||
            ('pen' !== t.pointerType && 'touch' !== t.pointerType) ||
            (this.touchDeltaX = t.clientX - this.touchStartX),
            this._handleSwipe(),
            'hover' === this._config.pause &&
              (this.pause(),
              this.touchTimeout && clearTimeout(this.touchTimeout),
              (this.touchTimeout = setTimeout(
                t => this.cycle(t),
                500 + this._config.interval
              )));
        };
      W.find('.carousel-item img', this._element).forEach(t => {
        R.on(t, 'dragstart.bs.carousel', t => t.preventDefault());
      }),
        this._pointerEvent
          ? (R.on(this._element, 'pointerdown.bs.carousel', e => t(e)),
            R.on(this._element, 'pointerup.bs.carousel', t => s(t)),
            this._element.classList.add('pointer-event'))
          : (R.on(this._element, 'touchstart.bs.carousel', e => t(e)),
            R.on(this._element, 'touchmove.bs.carousel', t => e(t)),
            R.on(this._element, 'touchend.bs.carousel', t => s(t)));
    }
    _keydown(t) {
      /input|textarea/i.test(t.target.tagName) ||
        ('ArrowLeft' === t.key
          ? (t.preventDefault(), this._slide(G))
          : 'ArrowRight' === t.key && (t.preventDefault(), this._slide(X)));
    }
    _getItemIndex(t) {
      return (
        (this._items =
          t && t.parentNode ? W.find('.carousel-item', t.parentNode) : []),
        this._items.indexOf(t)
      );
    }
    _getItemByOrder(t, e) {
      const s = t === q,
        i = t === Q,
        n = this._getItemIndex(e),
        o = this._items.length - 1;
      if (((i && 0 === n) || (s && n === o)) && !this._config.wrap) return e;
      const r = (n + (i ? -1 : 1)) % this._items.length;
      return -1 === r ? this._items[this._items.length - 1] : this._items[r];
    }
    _triggerSlideEvent(t, e) {
      const s = this._getItemIndex(t),
        i = this._getItemIndex(
          W.findOne('.active.carousel-item', this._element)
        );
      return R.trigger(this._element, 'slide.bs.carousel', {
        relatedTarget: t,
        direction: e,
        from: i,
        to: s,
      });
    }
    _setActiveIndicatorElement(t) {
      if (this._indicatorsElement) {
        const e = W.findOne('.active', this._indicatorsElement);
        e.classList.remove('active'), e.removeAttribute('aria-current');
        const s = W.find('[data-bs-target]', this._indicatorsElement);
        for (let e = 0; e < s.length; e++)
          if (
            Number.parseInt(s[e].getAttribute('data-bs-slide-to'), 10) ===
            this._getItemIndex(t)
          ) {
            s[e].classList.add('active'),
              s[e].setAttribute('aria-current', 'true');
            break;
          }
      }
    }
    _updateInterval() {
      const t =
        this._activeElement ||
        W.findOne('.active.carousel-item', this._element);
      if (!t) return;
      const e = Number.parseInt(t.getAttribute('data-bs-interval'), 10);
      e
        ? ((this._config.defaultInterval =
            this._config.defaultInterval || this._config.interval),
          (this._config.interval = e))
        : (this._config.interval =
            this._config.defaultInterval || this._config.interval);
    }
    _slide(t, e) {
      const s = this._directionToOrder(t),
        i = W.findOne('.active.carousel-item', this._element),
        n = this._getItemIndex(i),
        o = e || this._getItemByOrder(s, i),
        r = this._getItemIndex(o),
        l = Boolean(this._interval),
        c = s === q,
        d = c ? 'carousel-item-start' : 'carousel-item-end',
        u = c ? 'carousel-item-next' : 'carousel-item-prev',
        g = this._orderToDirection(s);
      if (o && o.classList.contains('active')) this._isSliding = !1;
      else if (!this._triggerSlideEvent(o, g).defaultPrevented && i && o) {
        if (
          ((this._isSliding = !0),
          l && this.pause(),
          this._setActiveIndicatorElement(o),
          (this._activeElement = o),
          this._element.classList.contains('slide'))
        ) {
          o.classList.add(u), m(o), i.classList.add(d), o.classList.add(d);
          const t = a(i);
          R.one(i, 'transitionend', () => {
            o.classList.remove(d, u),
              o.classList.add('active'),
              i.classList.remove('active', u, d),
              (this._isSliding = !1),
              setTimeout(() => {
                R.trigger(this._element, 'slid.bs.carousel', {
                  relatedTarget: o,
                  direction: g,
                  from: n,
                  to: r,
                });
              }, 0);
          }),
            h(i, t);
        } else
          i.classList.remove('active'),
            o.classList.add('active'),
            (this._isSliding = !1),
            R.trigger(this._element, 'slid.bs.carousel', {
              relatedTarget: o,
              direction: g,
              from: n,
              to: r,
            });
        l && this.cycle();
      }
    }
    _directionToOrder(t) {
      return [G, X].includes(t)
        ? b()
          ? t === X
            ? Q
            : q
          : t === X
          ? q
          : Q
        : t;
    }
    _orderToDirection(t) {
      return [q, Q].includes(t)
        ? b()
          ? t === Q
            ? X
            : G
          : t === Q
          ? G
          : X
        : t;
    }
    static carouselInterface(t, e) {
      let s = E.get(t, 'bs.carousel'),
        i = { ...Y, ...F.getDataAttributes(t) };
      'object' == typeof e && (i = { ...i, ...e });
      const n = 'string' == typeof e ? e : i.slide;
      if ((s || (s = new Z(t, i)), 'number' == typeof e)) s.to(e);
      else if ('string' == typeof n) {
        if (void 0 === s[n]) throw new TypeError(`No method named "${n}"`);
        s[n]();
      } else i.interval && i.ride && (s.pause(), s.cycle());
    }
    static jQueryInterface(t) {
      return this.each(function () {
        Z.carouselInterface(this, t);
      });
    }
    static dataApiClickHandler(t) {
      const e = r(this);
      if (!e || !e.classList.contains('carousel')) return;
      const s = { ...F.getDataAttributes(e), ...F.getDataAttributes(this) },
        i = this.getAttribute('data-bs-slide-to');
      i && (s.interval = !1),
        Z.carouselInterface(e, s),
        i && E.get(e, 'bs.carousel').to(i),
        t.preventDefault();
    }
  }
  R.on(
    document,
    'click.bs.carousel.data-api',
    '[data-bs-slide], [data-bs-slide-to]',
    Z.dataApiClickHandler
  ),
    R.on(window, 'load.bs.carousel.data-api', () => {
      const t = W.find('[data-bs-ride="carousel"]');
      for (let e = 0, s = t.length; e < s; e++)
        Z.carouselInterface(t[e], E.get(t[e], 'bs.carousel'));
    }),
    v('carousel', Z);
  const J = { toggle: !0, parent: '' },
    tt = { toggle: 'boolean', parent: '(string|element)' };
  class et extends B {
    constructor(t, e) {
      super(t),
        (this._isTransitioning = !1),
        (this._config = this._getConfig(e)),
        (this._triggerArray = W.find(
          `[data-bs-toggle="collapse"][href="#${this._element.id}"],[data-bs-toggle="collapse"][data-bs-target="#${this._element.id}"]`
        ));
      const s = W.find('[data-bs-toggle="collapse"]');
      for (let t = 0, e = s.length; t < e; t++) {
        const e = s[t],
          i = o(e),
          n = W.find(i).filter(t => t === this._element);
        null !== i &&
          n.length &&
          ((this._selector = i), this._triggerArray.push(e));
      }
      (this._parent = this._config.parent ? this._getParent() : null),
        this._config.parent ||
          this._addAriaAndCollapsedClass(this._element, this._triggerArray),
        this._config.toggle && this.toggle();
    }
    static get Default() {
      return J;
    }
    static get DATA_KEY() {
      return 'bs.collapse';
    }
    toggle() {
      this._element.classList.contains('show') ? this.hide() : this.show();
    }
    show() {
      if (this._isTransitioning || this._element.classList.contains('show'))
        return;
      let t, e;
      this._parent &&
        ((t = W.find('.show, .collapsing', this._parent).filter(t =>
          'string' == typeof this._config.parent
            ? t.getAttribute('data-bs-parent') === this._config.parent
            : t.classList.contains('collapse')
        )),
        0 === t.length && (t = null));
      const s = W.findOne(this._selector);
      if (t) {
        const i = t.find(t => s !== t);
        if (((e = i ? E.get(i, 'bs.collapse') : null), e && e._isTransitioning))
          return;
      }
      if (R.trigger(this._element, 'show.bs.collapse').defaultPrevented) return;
      t &&
        t.forEach(t => {
          s !== t && et.collapseInterface(t, 'hide'),
            e || E.set(t, 'bs.collapse', null);
        });
      const i = this._getDimension();
      this._element.classList.remove('collapse'),
        this._element.classList.add('collapsing'),
        (this._element.style[i] = 0),
        this._triggerArray.length &&
          this._triggerArray.forEach(t => {
            t.classList.remove('collapsed'),
              t.setAttribute('aria-expanded', !0);
          }),
        this.setTransitioning(!0);
      const n = 'scroll' + (i[0].toUpperCase() + i.slice(1)),
        o = a(this._element);
      R.one(this._element, 'transitionend', () => {
        this._element.classList.remove('collapsing'),
          this._element.classList.add('collapse', 'show'),
          (this._element.style[i] = ''),
          this.setTransitioning(!1),
          R.trigger(this._element, 'shown.bs.collapse');
      }),
        h(this._element, o),
        (this._element.style[i] = this._element[n] + 'px');
    }
    hide() {
      if (this._isTransitioning || !this._element.classList.contains('show'))
        return;
      if (R.trigger(this._element, 'hide.bs.collapse').defaultPrevented) return;
      const t = this._getDimension();
      (this._element.style[t] =
        this._element.getBoundingClientRect()[t] + 'px'),
        m(this._element),
        this._element.classList.add('collapsing'),
        this._element.classList.remove('collapse', 'show');
      const e = this._triggerArray.length;
      if (e > 0)
        for (let t = 0; t < e; t++) {
          const e = this._triggerArray[t],
            s = r(e);
          s &&
            !s.classList.contains('show') &&
            (e.classList.add('collapsed'), e.setAttribute('aria-expanded', !1));
        }
      this.setTransitioning(!0), (this._element.style[t] = '');
      const s = a(this._element);
      R.one(this._element, 'transitionend', () => {
        this.setTransitioning(!1),
          this._element.classList.remove('collapsing'),
          this._element.classList.add('collapse'),
          R.trigger(this._element, 'hidden.bs.collapse');
      }),
        h(this._element, s);
    }
    setTransitioning(t) {
      this._isTransitioning = t;
    }
    dispose() {
      super.dispose(),
        (this._config = null),
        (this._parent = null),
        (this._triggerArray = null),
        (this._isTransitioning = null);
    }
    _getConfig(t) {
      return (
        ((t = { ...J, ...t }).toggle = Boolean(t.toggle)),
        d('collapse', t, tt),
        t
      );
    }
    _getDimension() {
      return this._element.classList.contains('width') ? 'width' : 'height';
    }
    _getParent() {
      let { parent: t } = this._config;
      c(t)
        ? (void 0 === t.jquery && void 0 === t[0]) || (t = t[0])
        : (t = W.findOne(t));
      const e = `[data-bs-toggle="collapse"][data-bs-parent="${t}"]`;
      return (
        W.find(e, t).forEach(t => {
          const e = r(t);
          this._addAriaAndCollapsedClass(e, [t]);
        }),
        t
      );
    }
    _addAriaAndCollapsedClass(t, e) {
      if (!t || !e.length) return;
      const s = t.classList.contains('show');
      e.forEach(t => {
        s ? t.classList.remove('collapsed') : t.classList.add('collapsed'),
          t.setAttribute('aria-expanded', s);
      });
    }
    static collapseInterface(t, e) {
      let s = E.get(t, 'bs.collapse');
      const i = {
        ...J,
        ...F.getDataAttributes(t),
        ...('object' == typeof e && e ? e : {}),
      };
      if (
        (!s &&
          i.toggle &&
          'string' == typeof e &&
          /show|hide/.test(e) &&
          (i.toggle = !1),
        s || (s = new et(t, i)),
        'string' == typeof e)
      ) {
        if (void 0 === s[e]) throw new TypeError(`No method named "${e}"`);
        s[e]();
      }
    }
    static jQueryInterface(t) {
      return this.each(function () {
        et.collapseInterface(this, t);
      });
    }
  }
  R.on(
    document,
    'click.bs.collapse.data-api',
    '[data-bs-toggle="collapse"]',
    function (t) {
      ('A' === t.target.tagName ||
        (t.delegateTarget && 'A' === t.delegateTarget.tagName)) &&
        t.preventDefault();
      const e = F.getDataAttributes(this),
        s = o(this);
      W.find(s).forEach(t => {
        const s = E.get(t, 'bs.collapse');
        let i;
        s
          ? (null === s._parent &&
              'string' == typeof e.parent &&
              ((s._config.parent = e.parent), (s._parent = s._getParent())),
            (i = 'toggle'))
          : (i = e),
          et.collapseInterface(t, i);
      });
    }
  ),
    v('collapse', et);
  const st = new RegExp('ArrowUp|ArrowDown|Escape'),
    it = b() ? 'top-end' : 'top-start',
    nt = b() ? 'top-start' : 'top-end',
    ot = b() ? 'bottom-end' : 'bottom-start',
    rt = b() ? 'bottom-start' : 'bottom-end',
    at = b() ? 'left-start' : 'right-start',
    lt = b() ? 'right-start' : 'left-start',
    ct = {
      offset: [0, 2],
      boundary: 'clippingParents',
      reference: 'toggle',
      display: 'dynamic',
      popperConfig: null,
      autoClose: !0,
    },
    ht = {
      offset: '(array|string|function)',
      boundary: '(string|element)',
      reference: '(string|element|object)',
      display: 'string',
      popperConfig: '(null|object|function)',
      autoClose: '(boolean|string)',
    };
  class dt extends B {
    constructor(t, e) {
      super(t),
        (this._popper = null),
        (this._config = this._getConfig(e)),
        (this._menu = this._getMenuElement()),
        (this._inNavbar = this._detectNavbar()),
        this._addEventListeners();
    }
    static get Default() {
      return ct;
    }
    static get DefaultType() {
      return ht;
    }
    static get DATA_KEY() {
      return 'bs.dropdown';
    }
    toggle() {
      g(this._element) ||
        (this._element.classList.contains('show') ? this.hide() : this.show());
    }
    show() {
      if (g(this._element) || this._menu.classList.contains('show')) return;
      const t = dt.getParentFromElement(this._element),
        e = { relatedTarget: this._element };
      if (!R.trigger(this._element, 'show.bs.dropdown', e).defaultPrevented) {
        if (this._inNavbar) F.setDataAttribute(this._menu, 'popper', 'none');
        else {
          if (void 0 === s)
            throw new TypeError(
              "Bootstrap's dropdowns require Popper (https://popper.js.org)"
            );
          let e = this._element;
          'parent' === this._config.reference
            ? (e = t)
            : c(this._config.reference)
            ? ((e = this._config.reference),
              void 0 !== this._config.reference.jquery &&
                (e = this._config.reference[0]))
            : 'object' == typeof this._config.reference &&
              (e = this._config.reference);
          const i = this._getPopperConfig(),
            n = i.modifiers.find(
              t => 'applyStyles' === t.name && !1 === t.enabled
            );
          (this._popper = s.createPopper(e, this._menu, i)),
            n && F.setDataAttribute(this._menu, 'popper', 'static');
        }
        'ontouchstart' in document.documentElement &&
          !t.closest('.navbar-nav') &&
          []
            .concat(...document.body.children)
            .forEach(t => R.on(t, 'mouseover', p)),
          this._element.focus(),
          this._element.setAttribute('aria-expanded', !0),
          this._menu.classList.toggle('show'),
          this._element.classList.toggle('show'),
          R.trigger(this._element, 'shown.bs.dropdown', e);
      }
    }
    hide() {
      if (g(this._element) || !this._menu.classList.contains('show')) return;
      const t = { relatedTarget: this._element };
      this._completeHide(t);
    }
    dispose() {
      (this._menu = null),
        this._popper && (this._popper.destroy(), (this._popper = null)),
        super.dispose();
    }
    update() {
      (this._inNavbar = this._detectNavbar()),
        this._popper && this._popper.update();
    }
    _addEventListeners() {
      R.on(this._element, 'click.bs.dropdown', t => {
        t.preventDefault(), this.toggle();
      });
    }
    _completeHide(t) {
      R.trigger(this._element, 'hide.bs.dropdown', t).defaultPrevented ||
        ('ontouchstart' in document.documentElement &&
          []
            .concat(...document.body.children)
            .forEach(t => R.off(t, 'mouseover', p)),
        this._popper && this._popper.destroy(),
        this._menu.classList.remove('show'),
        this._element.classList.remove('show'),
        this._element.setAttribute('aria-expanded', 'false'),
        F.removeDataAttribute(this._menu, 'popper'),
        R.trigger(this._element, 'hidden.bs.dropdown', t));
    }
    _getConfig(t) {
      if (
        ((t = {
          ...this.constructor.Default,
          ...F.getDataAttributes(this._element),
          ...t,
        }),
        d('dropdown', t, this.constructor.DefaultType),
        'object' == typeof t.reference &&
          !c(t.reference) &&
          'function' != typeof t.reference.getBoundingClientRect)
      )
        throw new TypeError(
          'dropdown'.toUpperCase() +
            ': Option "reference" provided type "object" without a required "getBoundingClientRect" method.'
        );
      return t;
    }
    _getMenuElement() {
      return W.next(this._element, '.dropdown-menu')[0];
    }
    _getPlacement() {
      const t = this._element.parentNode;
      if (t.classList.contains('dropend')) return at;
      if (t.classList.contains('dropstart')) return lt;
      const e =
        'end' ===
        getComputedStyle(this._menu).getPropertyValue('--bs-position').trim();
      return t.classList.contains('dropup') ? (e ? nt : it) : e ? rt : ot;
    }
    _detectNavbar() {
      return null !== this._element.closest('.navbar');
    }
    _getOffset() {
      const { offset: t } = this._config;
      return 'string' == typeof t
        ? t.split(',').map(t => Number.parseInt(t, 10))
        : 'function' == typeof t
        ? e => t(e, this._element)
        : t;
    }
    _getPopperConfig() {
      const t = {
        placement: this._getPlacement(),
        modifiers: [
          {
            name: 'preventOverflow',
            options: { boundary: this._config.boundary },
          },
          { name: 'offset', options: { offset: this._getOffset() } },
        ],
      };
      return (
        'static' === this._config.display &&
          (t.modifiers = [{ name: 'applyStyles', enabled: !1 }]),
        {
          ...t,
          ...('function' == typeof this._config.popperConfig
            ? this._config.popperConfig(t)
            : this._config.popperConfig),
        }
      );
    }
    _selectMenuItem(t) {
      const e = W.find(
        '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)',
        this._menu
      ).filter(u);
      if (!e.length) return;
      let s = e.indexOf(t.target);
      'ArrowUp' === t.key && s > 0 && s--,
        'ArrowDown' === t.key && s < e.length - 1 && s++,
        (s = -1 === s ? 0 : s),
        e[s].focus();
    }
    static dropdownInterface(t, e) {
      let s = E.get(t, 'bs.dropdown');
      if (
        (s || (s = new dt(t, 'object' == typeof e ? e : null)),
        'string' == typeof e)
      ) {
        if (void 0 === s[e]) throw new TypeError(`No method named "${e}"`);
        s[e]();
      }
    }
    static jQueryInterface(t) {
      return this.each(function () {
        dt.dropdownInterface(this, t);
      });
    }
    static clearMenus(t) {
      if (t) {
        if (2 === t.button || ('keyup' === t.type && 'Tab' !== t.key)) return;
        if (/input|select|option|textarea|form/i.test(t.target.tagName)) return;
      }
      const e = W.find('[data-bs-toggle="dropdown"]');
      for (let s = 0, i = e.length; s < i; s++) {
        const i = E.get(e[s], 'bs.dropdown');
        if (!i || !1 === i._config.autoClose) continue;
        if (!i._element.classList.contains('show')) continue;
        const n = { relatedTarget: i._element };
        if (t) {
          const e = t.composedPath(),
            s = e.includes(i._menu);
          if (
            e.includes(i._element) ||
            ('inside' === i._config.autoClose && !s) ||
            ('outside' === i._config.autoClose && s)
          )
            continue;
          if (
            'keyup' === t.type &&
            'Tab' === t.key &&
            i._menu.contains(t.target)
          )
            continue;
          'click' === t.type && (n.clickEvent = t);
        }
        i._completeHide(n);
      }
    }
    static getParentFromElement(t) {
      return r(t) || t.parentNode;
    }
    static dataApiKeydownHandler(t) {
      if (
        /input|textarea/i.test(t.target.tagName)
          ? 'Space' === t.key ||
            ('Escape' !== t.key &&
              (('ArrowDown' !== t.key && 'ArrowUp' !== t.key) ||
                t.target.closest('.dropdown-menu')))
          : !st.test(t.key)
      )
        return;
      const e = this.classList.contains('show');
      if (!e && 'Escape' === t.key) return;
      if ((t.preventDefault(), t.stopPropagation(), g(this))) return;
      const s = () =>
        this.matches('[data-bs-toggle="dropdown"]')
          ? this
          : W.prev(this, '[data-bs-toggle="dropdown"]')[0];
      if ('Escape' === t.key) return s().focus(), void dt.clearMenus();
      e || ('ArrowUp' !== t.key && 'ArrowDown' !== t.key)
        ? e && 'Space' !== t.key
          ? dt.getInstance(s())._selectMenuItem(t)
          : dt.clearMenus()
        : s().click();
    }
  }
  R.on(
    document,
    'keydown.bs.dropdown.data-api',
    '[data-bs-toggle="dropdown"]',
    dt.dataApiKeydownHandler
  ),
    R.on(
      document,
      'keydown.bs.dropdown.data-api',
      '.dropdown-menu',
      dt.dataApiKeydownHandler
    ),
    R.on(document, 'click.bs.dropdown.data-api', dt.clearMenus),
    R.on(document, 'keyup.bs.dropdown.data-api', dt.clearMenus),
    R.on(
      document,
      'click.bs.dropdown.data-api',
      '[data-bs-toggle="dropdown"]',
      function (t) {
        t.preventDefault(), dt.dropdownInterface(this);
      }
    ),
    v('dropdown', dt);
  const ut = () => {
      const t = document.documentElement.clientWidth;
      return Math.abs(window.innerWidth - t);
    },
    gt = (t = ut()) => {
      ft(),
        pt('body', 'paddingRight', e => e + t),
        pt(
          '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
          'paddingRight',
          e => e + t
        ),
        pt('.sticky-top', 'marginRight', e => e - t);
    },
    ft = () => {
      const t = document.body.style.overflow;
      t && F.setDataAttribute(document.body, 'overflow', t),
        (document.body.style.overflow = 'hidden');
    },
    pt = (t, e, s) => {
      const i = ut();
      W.find(t).forEach(t => {
        if (t !== document.body && window.innerWidth > t.clientWidth + i)
          return;
        const n = t.style[e],
          o = window.getComputedStyle(t)[e];
        F.setDataAttribute(t, e, n),
          (t.style[e] = s(Number.parseFloat(o)) + 'px');
      });
    },
    mt = () => {
      _t('body', 'overflow'),
        _t('body', 'paddingRight'),
        _t('.fixed-top, .fixed-bottom, .is-fixed, .sticky-top', 'paddingRight'),
        _t('.sticky-top', 'marginRight');
    },
    _t = (t, e) => {
      W.find(t).forEach(t => {
        const s = F.getDataAttribute(t, e);
        void 0 === s
          ? t.style.removeProperty(e)
          : (F.removeDataAttribute(t, e), (t.style[e] = s));
      });
    },
    bt = {
      isVisible: !0,
      isAnimated: !1,
      rootElement: document.body,
      clickCallback: null,
    },
    vt = {
      isVisible: 'boolean',
      isAnimated: 'boolean',
      rootElement: 'element',
      clickCallback: '(function|null)',
    };
  class yt {
    constructor(t) {
      (this._config = this._getConfig(t)),
        (this._isAppended = !1),
        (this._element = null);
    }
    show(t) {
      this._config.isVisible
        ? (this._append(),
          this._config.isAnimated && m(this._getElement()),
          this._getElement().classList.add('show'),
          this._emulateAnimation(() => {
            y(t);
          }))
        : y(t);
    }
    hide(t) {
      this._config.isVisible
        ? (this._getElement().classList.remove('show'),
          this._emulateAnimation(() => {
            this.dispose(), y(t);
          }))
        : y(t);
    }
    _getElement() {
      if (!this._element) {
        const t = document.createElement('div');
        (t.className = 'modal-backdrop'),
          this._config.isAnimated && t.classList.add('fade'),
          (this._element = t);
      }
      return this._element;
    }
    _getConfig(t) {
      return (
        (t = { ...bt, ...('object' == typeof t ? t : {}) }),
        d('backdrop', t, vt),
        t
      );
    }
    _append() {
      this._isAppended ||
        (this._config.rootElement.appendChild(this._getElement()),
        R.on(this._getElement(), 'mousedown.bs.backdrop', () => {
          y(this._config.clickCallback);
        }),
        (this._isAppended = !0));
    }
    dispose() {
      this._isAppended &&
        (R.off(this._element, 'mousedown.bs.backdrop'),
        this._getElement().parentNode.removeChild(this._element),
        (this._isAppended = !1));
    }
    _emulateAnimation(t) {
      if (!this._config.isAnimated) return void y(t);
      const e = a(this._getElement());
      R.one(this._getElement(), 'transitionend', () => y(t)),
        h(this._getElement(), e);
    }
  }
  const wt = { backdrop: !0, keyboard: !0, focus: !0 },
    Et = {
      backdrop: '(boolean|string)',
      keyboard: 'boolean',
      focus: 'boolean',
    };
  class Tt extends B {
    constructor(t, e) {
      super(t),
        (this._config = this._getConfig(e)),
        (this._dialog = W.findOne('.modal-dialog', this._element)),
        (this._backdrop = this._initializeBackDrop()),
        (this._isShown = !1),
        (this._ignoreBackdropClick = !1),
        (this._isTransitioning = !1);
    }
    static get Default() {
      return wt;
    }
    static get DATA_KEY() {
      return 'bs.modal';
    }
    toggle(t) {
      return this._isShown ? this.hide() : this.show(t);
    }
    show(t) {
      if (this._isShown || this._isTransitioning) return;
      this._isAnimated() && (this._isTransitioning = !0);
      const e = R.trigger(this._element, 'show.bs.modal', { relatedTarget: t });
      this._isShown ||
        e.defaultPrevented ||
        ((this._isShown = !0),
        gt(),
        document.body.classList.add('modal-open'),
        this._adjustDialog(),
        this._setEscapeEvent(),
        this._setResizeEvent(),
        R.on(
          this._element,
          'click.dismiss.bs.modal',
          '[data-bs-dismiss="modal"]',
          t => this.hide(t)
        ),
        R.on(this._dialog, 'mousedown.dismiss.bs.modal', () => {
          R.one(this._element, 'mouseup.dismiss.bs.modal', t => {
            t.target === this._element && (this._ignoreBackdropClick = !0);
          });
        }),
        this._showBackdrop(() => this._showElement(t)));
    }
    hide(t) {
      if ((t && t.preventDefault(), !this._isShown || this._isTransitioning))
        return;
      if (R.trigger(this._element, 'hide.bs.modal').defaultPrevented) return;
      this._isShown = !1;
      const e = this._isAnimated();
      if (
        (e && (this._isTransitioning = !0),
        this._setEscapeEvent(),
        this._setResizeEvent(),
        R.off(document, 'focusin.bs.modal'),
        this._element.classList.remove('show'),
        R.off(this._element, 'click.dismiss.bs.modal'),
        R.off(this._dialog, 'mousedown.dismiss.bs.modal'),
        e)
      ) {
        const t = a(this._element);
        R.one(this._element, 'transitionend', t => this._hideModal(t)),
          h(this._element, t);
      } else this._hideModal();
    }
    dispose() {
      [window, this._dialog].forEach(t => R.off(t, '.bs.modal')),
        super.dispose(),
        R.off(document, 'focusin.bs.modal'),
        (this._config = null),
        (this._dialog = null),
        this._backdrop.dispose(),
        (this._backdrop = null),
        (this._isShown = null),
        (this._ignoreBackdropClick = null),
        (this._isTransitioning = null);
    }
    handleUpdate() {
      this._adjustDialog();
    }
    _initializeBackDrop() {
      return new yt({
        isVisible: Boolean(this._config.backdrop),
        isAnimated: this._isAnimated(),
      });
    }
    _getConfig(t) {
      return (
        (t = { ...wt, ...F.getDataAttributes(this._element), ...t }),
        d('modal', t, Et),
        t
      );
    }
    _showElement(t) {
      const e = this._isAnimated(),
        s = W.findOne('.modal-body', this._dialog);
      (this._element.parentNode &&
        this._element.parentNode.nodeType === Node.ELEMENT_NODE) ||
        document.body.appendChild(this._element),
        (this._element.style.display = 'block'),
        this._element.removeAttribute('aria-hidden'),
        this._element.setAttribute('aria-modal', !0),
        this._element.setAttribute('role', 'dialog'),
        (this._element.scrollTop = 0),
        s && (s.scrollTop = 0),
        e && m(this._element),
        this._element.classList.add('show'),
        this._config.focus && this._enforceFocus();
      const i = () => {
        this._config.focus && this._element.focus(),
          (this._isTransitioning = !1),
          R.trigger(this._element, 'shown.bs.modal', { relatedTarget: t });
      };
      if (e) {
        const t = a(this._dialog);
        R.one(this._dialog, 'transitionend', i), h(this._dialog, t);
      } else i();
    }
    _enforceFocus() {
      R.off(document, 'focusin.bs.modal'),
        R.on(document, 'focusin.bs.modal', t => {
          document === t.target ||
            this._element === t.target ||
            this._element.contains(t.target) ||
            this._element.focus();
        });
    }
    _setEscapeEvent() {
      this._isShown
        ? R.on(this._element, 'keydown.dismiss.bs.modal', t => {
            this._config.keyboard && 'Escape' === t.key
              ? (t.preventDefault(), this.hide())
              : this._config.keyboard ||
                'Escape' !== t.key ||
                this._triggerBackdropTransition();
          })
        : R.off(this._element, 'keydown.dismiss.bs.modal');
    }
    _setResizeEvent() {
      this._isShown
        ? R.on(window, 'resize.bs.modal', () => this._adjustDialog())
        : R.off(window, 'resize.bs.modal');
    }
    _hideModal() {
      (this._element.style.display = 'none'),
        this._element.setAttribute('aria-hidden', !0),
        this._element.removeAttribute('aria-modal'),
        this._element.removeAttribute('role'),
        (this._isTransitioning = !1),
        this._backdrop.hide(() => {
          document.body.classList.remove('modal-open'),
            this._resetAdjustments(),
            mt(),
            R.trigger(this._element, 'hidden.bs.modal');
        });
    }
    _showBackdrop(t) {
      R.on(this._element, 'click.dismiss.bs.modal', t => {
        this._ignoreBackdropClick
          ? (this._ignoreBackdropClick = !1)
          : t.target === t.currentTarget &&
            (!0 === this._config.backdrop
              ? this.hide()
              : 'static' === this._config.backdrop &&
                this._triggerBackdropTransition());
      }),
        this._backdrop.show(t);
    }
    _isAnimated() {
      return this._element.classList.contains('fade');
    }
    _triggerBackdropTransition() {
      if (R.trigger(this._element, 'hidePrevented.bs.modal').defaultPrevented)
        return;
      const t =
        this._element.scrollHeight > document.documentElement.clientHeight;
      t || (this._element.style.overflowY = 'hidden'),
        this._element.classList.add('modal-static');
      const e = a(this._dialog);
      R.off(this._element, 'transitionend'),
        R.one(this._element, 'transitionend', () => {
          this._element.classList.remove('modal-static'),
            t ||
              (R.one(this._element, 'transitionend', () => {
                this._element.style.overflowY = '';
              }),
              h(this._element, e));
        }),
        h(this._element, e),
        this._element.focus();
    }
    _adjustDialog() {
      const t =
          this._element.scrollHeight > document.documentElement.clientHeight,
        e = ut(),
        s = e > 0;
      ((!s && t && !b()) || (s && !t && b())) &&
        (this._element.style.paddingLeft = e + 'px'),
        ((s && !t && !b()) || (!s && t && b())) &&
          (this._element.style.paddingRight = e + 'px');
    }
    _resetAdjustments() {
      (this._element.style.paddingLeft = ''),
        (this._element.style.paddingRight = '');
    }
    static jQueryInterface(t, e) {
      return this.each(function () {
        const s =
          Tt.getInstance(this) || new Tt(this, 'object' == typeof t ? t : {});
        if ('string' == typeof t) {
          if (void 0 === s[t]) throw new TypeError(`No method named "${t}"`);
          s[t](e);
        }
      });
    }
  }
  R.on(
    document,
    'click.bs.modal.data-api',
    '[data-bs-toggle="modal"]',
    function (t) {
      const e = r(this);
      ['A', 'AREA'].includes(this.tagName) && t.preventDefault(),
        R.one(e, 'show.bs.modal', t => {
          t.defaultPrevented ||
            R.one(e, 'hidden.bs.modal', () => {
              u(this) && this.focus();
            });
        }),
        (Tt.getInstance(e) || new Tt(e)).toggle(this);
    }
  ),
    v('modal', Tt);
  const At = { backdrop: !0, keyboard: !0, scroll: !1 },
    Lt = { backdrop: 'boolean', keyboard: 'boolean', scroll: 'boolean' };
  class kt extends B {
    constructor(t, e) {
      super(t),
        (this._config = this._getConfig(e)),
        (this._isShown = !1),
        (this._backdrop = this._initializeBackDrop()),
        this._addEventListeners();
    }
    static get Default() {
      return At;
    }
    static get DATA_KEY() {
      return 'bs.offcanvas';
    }
    toggle(t) {
      return this._isShown ? this.hide() : this.show(t);
    }
    show(t) {
      if (this._isShown) return;
      if (
        R.trigger(this._element, 'show.bs.offcanvas', { relatedTarget: t })
          .defaultPrevented
      )
        return;
      (this._isShown = !0),
        (this._element.style.visibility = 'visible'),
        this._backdrop.show(),
        this._config.scroll ||
          (gt(), this._enforceFocusOnElement(this._element)),
        this._element.removeAttribute('aria-hidden'),
        this._element.setAttribute('aria-modal', !0),
        this._element.setAttribute('role', 'dialog'),
        this._element.classList.add('show');
      const e = a(this._element);
      R.one(this._element, 'transitionend', () => {
        R.trigger(this._element, 'shown.bs.offcanvas', { relatedTarget: t });
      }),
        h(this._element, e);
    }
    hide() {
      if (!this._isShown) return;
      if (R.trigger(this._element, 'hide.bs.offcanvas').defaultPrevented)
        return;
      R.off(document, 'focusin.bs.offcanvas'),
        this._element.blur(),
        (this._isShown = !1),
        this._element.classList.remove('show'),
        this._backdrop.hide();
      const t = a(this._element);
      R.one(this._element, 'transitionend', () => {
        this._element.setAttribute('aria-hidden', !0),
          this._element.removeAttribute('aria-modal'),
          this._element.removeAttribute('role'),
          (this._element.style.visibility = 'hidden'),
          this._config.scroll || mt(),
          R.trigger(this._element, 'hidden.bs.offcanvas');
      }),
        h(this._element, t);
    }
    dispose() {
      this._backdrop.dispose(),
        super.dispose(),
        R.off(document, 'focusin.bs.offcanvas'),
        (this._config = null),
        (this._backdrop = null);
    }
    _getConfig(t) {
      return (
        (t = {
          ...At,
          ...F.getDataAttributes(this._element),
          ...('object' == typeof t ? t : {}),
        }),
        d('offcanvas', t, Lt),
        t
      );
    }
    _initializeBackDrop() {
      return new yt({
        isVisible: this._config.backdrop,
        isAnimated: !0,
        rootElement: this._element.parentNode,
        clickCallback: () => this.hide(),
      });
    }
    _enforceFocusOnElement(t) {
      R.off(document, 'focusin.bs.offcanvas'),
        R.on(document, 'focusin.bs.offcanvas', e => {
          document === e.target ||
            t === e.target ||
            t.contains(e.target) ||
            t.focus();
        }),
        t.focus();
    }
    _addEventListeners() {
      R.on(
        this._element,
        'click.dismiss.bs.offcanvas',
        '[data-bs-dismiss="offcanvas"]',
        () => this.hide()
      ),
        R.on(this._element, 'keydown.dismiss.bs.offcanvas', t => {
          this._config.keyboard && 'Escape' === t.key && this.hide();
        });
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e =
          E.get(this, 'bs.offcanvas') ||
          new kt(this, 'object' == typeof t ? t : {});
        if ('string' == typeof t) {
          if (void 0 === e[t] || t.startsWith('_') || 'constructor' === t)
            throw new TypeError(`No method named "${t}"`);
          e[t](this);
        }
      });
    }
  }
  R.on(
    document,
    'click.bs.offcanvas.data-api',
    '[data-bs-toggle="offcanvas"]',
    function (t) {
      const e = r(this);
      if ((['A', 'AREA'].includes(this.tagName) && t.preventDefault(), g(this)))
        return;
      R.one(e, 'hidden.bs.offcanvas', () => {
        u(this) && this.focus();
      });
      const s = W.findOne('.offcanvas.show');
      s && s !== e && kt.getInstance(s).hide(),
        (E.get(e, 'bs.offcanvas') || new kt(e)).toggle(this);
    }
  ),
    R.on(window, 'load.bs.offcanvas.data-api', () => {
      W.find('.offcanvas.show').forEach(t =>
        (E.get(t, 'bs.offcanvas') || new kt(t)).show()
      );
    }),
    v('offcanvas', kt);
  const Ct = new Set([
      'background',
      'cite',
      'href',
      'itemtype',
      'longdesc',
      'poster',
      'src',
      'xlink:href',
    ]),
    Dt = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/i,
    St =
      /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i,
    Nt = (t, e) => {
      const s = t.nodeName.toLowerCase();
      if (e.includes(s))
        return (
          !Ct.has(s) || Boolean(Dt.test(t.nodeValue) || St.test(t.nodeValue))
        );
      const i = e.filter(t => t instanceof RegExp);
      for (let t = 0, e = i.length; t < e; t++) if (i[t].test(s)) return !0;
      return !1;
    };
  function Ot(t, e, s) {
    if (!t.length) return t;
    if (s && 'function' == typeof s) return s(t);
    const i = new window.DOMParser().parseFromString(t, 'text/html'),
      n = Object.keys(e),
      o = [].concat(...i.body.querySelectorAll('*'));
    for (let t = 0, s = o.length; t < s; t++) {
      const s = o[t],
        i = s.nodeName.toLowerCase();
      if (!n.includes(i)) {
        s.parentNode.removeChild(s);
        continue;
      }
      const r = [].concat(...s.attributes),
        a = [].concat(e['*'] || [], e[i] || []);
      r.forEach(t => {
        Nt(t, a) || s.removeAttribute(t.nodeName);
      });
    }
    return i.body.innerHTML;
  }
  const It = new RegExp('(^|\\s)bs-tooltip\\S+', 'g'),
    jt = new Set(['sanitize', 'allowList', 'sanitizeFn']),
    xt = {
      animation: 'boolean',
      template: 'string',
      title: '(string|element|function)',
      trigger: 'string',
      delay: '(number|object)',
      html: 'boolean',
      selector: '(string|boolean)',
      placement: '(string|function)',
      offset: '(array|string|function)',
      container: '(string|element|boolean)',
      fallbackPlacements: 'array',
      boundary: '(string|element)',
      customClass: '(string|function)',
      sanitize: 'boolean',
      sanitizeFn: '(null|function)',
      allowList: 'object',
      popperConfig: '(null|object|function)',
    },
    Pt = {
      AUTO: 'auto',
      TOP: 'top',
      RIGHT: b() ? 'left' : 'right',
      BOTTOM: 'bottom',
      LEFT: b() ? 'right' : 'left',
    },
    Ht = {
      animation: !0,
      template:
        '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
      trigger: 'hover focus',
      title: '',
      delay: 0,
      html: !1,
      selector: !1,
      placement: 'top',
      offset: [0, 0],
      container: !1,
      fallbackPlacements: ['top', 'right', 'bottom', 'left'],
      boundary: 'clippingParents',
      customClass: '',
      sanitize: !0,
      sanitizeFn: null,
      allowList: {
        '*': ['class', 'dir', 'id', 'lang', 'role', /^aria-[\w-]*$/i],
        a: ['target', 'href', 'title', 'rel'],
        area: [],
        b: [],
        br: [],
        col: [],
        code: [],
        div: [],
        em: [],
        hr: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        i: [],
        img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
        li: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        u: [],
        ul: [],
      },
      popperConfig: null,
    },
    Mt = {
      HIDE: 'hide.bs.tooltip',
      HIDDEN: 'hidden.bs.tooltip',
      SHOW: 'show.bs.tooltip',
      SHOWN: 'shown.bs.tooltip',
      INSERTED: 'inserted.bs.tooltip',
      CLICK: 'click.bs.tooltip',
      FOCUSIN: 'focusin.bs.tooltip',
      FOCUSOUT: 'focusout.bs.tooltip',
      MOUSEENTER: 'mouseenter.bs.tooltip',
      MOUSELEAVE: 'mouseleave.bs.tooltip',
    };
  class Rt extends B {
    constructor(t, e) {
      if (void 0 === s)
        throw new TypeError(
          "Bootstrap's tooltips require Popper (https://popper.js.org)"
        );
      super(t),
        (this._isEnabled = !0),
        (this._timeout = 0),
        (this._hoverState = ''),
        (this._activeTrigger = {}),
        (this._popper = null),
        (this.config = this._getConfig(e)),
        (this.tip = null),
        this._setListeners();
    }
    static get Default() {
      return Ht;
    }
    static get NAME() {
      return 'tooltip';
    }
    static get DATA_KEY() {
      return 'bs.tooltip';
    }
    static get Event() {
      return Mt;
    }
    static get EVENT_KEY() {
      return '.bs.tooltip';
    }
    static get DefaultType() {
      return xt;
    }
    enable() {
      this._isEnabled = !0;
    }
    disable() {
      this._isEnabled = !1;
    }
    toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    }
    toggle(t) {
      if (this._isEnabled)
        if (t) {
          const e = this._initializeOnDelegatedTarget(t);
          (e._activeTrigger.click = !e._activeTrigger.click),
            e._isWithActiveTrigger() ? e._enter(null, e) : e._leave(null, e);
        } else {
          if (this.getTipElement().classList.contains('show'))
            return void this._leave(null, this);
          this._enter(null, this);
        }
    }
    dispose() {
      clearTimeout(this._timeout),
        R.off(
          this._element.closest('.modal'),
          'hide.bs.modal',
          this._hideModalHandler
        ),
        this.tip &&
          this.tip.parentNode &&
          this.tip.parentNode.removeChild(this.tip),
        (this._isEnabled = null),
        (this._timeout = null),
        (this._hoverState = null),
        (this._activeTrigger = null),
        this._popper && this._popper.destroy(),
        (this._popper = null),
        (this.config = null),
        (this.tip = null),
        super.dispose();
    }
    show() {
      if ('none' === this._element.style.display)
        throw new Error('Please use show on visible elements');
      if (!this.isWithContent() || !this._isEnabled) return;
      const t = R.trigger(this._element, this.constructor.Event.SHOW),
        e = f(this._element),
        n =
          null === e
            ? this._element.ownerDocument.documentElement.contains(
                this._element
              )
            : e.contains(this._element);
      if (t.defaultPrevented || !n) return;
      const o = this.getTipElement(),
        r = i(this.constructor.NAME);
      o.setAttribute('id', r),
        this._element.setAttribute('aria-describedby', r),
        this.setContent(),
        this.config.animation && o.classList.add('fade');
      const l =
          'function' == typeof this.config.placement
            ? this.config.placement.call(this, o, this._element)
            : this.config.placement,
        c = this._getAttachment(l);
      this._addAttachmentClass(c);
      const d = this._getContainer();
      E.set(o, this.constructor.DATA_KEY, this),
        this._element.ownerDocument.documentElement.contains(this.tip) ||
          (d.appendChild(o),
          R.trigger(this._element, this.constructor.Event.INSERTED)),
        this._popper
          ? this._popper.update()
          : (this._popper = s.createPopper(
              this._element,
              o,
              this._getPopperConfig(c)
            )),
        o.classList.add('show');
      const u =
        'function' == typeof this.config.customClass
          ? this.config.customClass()
          : this.config.customClass;
      u && o.classList.add(...u.split(' ')),
        'ontouchstart' in document.documentElement &&
          [].concat(...document.body.children).forEach(t => {
            R.on(t, 'mouseover', p);
          });
      const g = () => {
        const t = this._hoverState;
        (this._hoverState = null),
          R.trigger(this._element, this.constructor.Event.SHOWN),
          'out' === t && this._leave(null, this);
      };
      if (this.tip.classList.contains('fade')) {
        const t = a(this.tip);
        R.one(this.tip, 'transitionend', g), h(this.tip, t);
      } else g();
    }
    hide() {
      if (!this._popper) return;
      const t = this.getTipElement(),
        e = () => {
          this._isWithActiveTrigger() ||
            ('show' !== this._hoverState &&
              t.parentNode &&
              t.parentNode.removeChild(t),
            this._cleanTipClass(),
            this._element.removeAttribute('aria-describedby'),
            R.trigger(this._element, this.constructor.Event.HIDDEN),
            this._popper && (this._popper.destroy(), (this._popper = null)));
        };
      if (
        !R.trigger(this._element, this.constructor.Event.HIDE).defaultPrevented
      ) {
        if (
          (t.classList.remove('show'),
          'ontouchstart' in document.documentElement &&
            []
              .concat(...document.body.children)
              .forEach(t => R.off(t, 'mouseover', p)),
          (this._activeTrigger.click = !1),
          (this._activeTrigger.focus = !1),
          (this._activeTrigger.hover = !1),
          this.tip.classList.contains('fade'))
        ) {
          const s = a(t);
          R.one(t, 'transitionend', e), h(t, s);
        } else e();
        this._hoverState = '';
      }
    }
    update() {
      null !== this._popper && this._popper.update();
    }
    isWithContent() {
      return Boolean(this.getTitle());
    }
    getTipElement() {
      if (this.tip) return this.tip;
      const t = document.createElement('div');
      return (
        (t.innerHTML = this.config.template),
        (this.tip = t.children[0]),
        this.tip
      );
    }
    setContent() {
      const t = this.getTipElement();
      this.setElementContent(W.findOne('.tooltip-inner', t), this.getTitle()),
        t.classList.remove('fade', 'show');
    }
    setElementContent(t, e) {
      if (null !== t)
        return 'object' == typeof e && c(e)
          ? (e.jquery && (e = e[0]),
            void (this.config.html
              ? e.parentNode !== t && ((t.innerHTML = ''), t.appendChild(e))
              : (t.textContent = e.textContent)))
          : void (this.config.html
              ? (this.config.sanitize &&
                  (e = Ot(e, this.config.allowList, this.config.sanitizeFn)),
                (t.innerHTML = e))
              : (t.textContent = e));
    }
    getTitle() {
      let t = this._element.getAttribute('data-bs-original-title');
      return (
        t ||
          (t =
            'function' == typeof this.config.title
              ? this.config.title.call(this._element)
              : this.config.title),
        t
      );
    }
    updateAttachment(t) {
      return 'right' === t ? 'end' : 'left' === t ? 'start' : t;
    }
    _initializeOnDelegatedTarget(t, e) {
      const s = this.constructor.DATA_KEY;
      return (
        (e = e || E.get(t.delegateTarget, s)) ||
          ((e = new this.constructor(
            t.delegateTarget,
            this._getDelegateConfig()
          )),
          E.set(t.delegateTarget, s, e)),
        e
      );
    }
    _getOffset() {
      const { offset: t } = this.config;
      return 'string' == typeof t
        ? t.split(',').map(t => Number.parseInt(t, 10))
        : 'function' == typeof t
        ? e => t(e, this._element)
        : t;
    }
    _getPopperConfig(t) {
      const e = {
        placement: t,
        modifiers: [
          {
            name: 'flip',
            options: { fallbackPlacements: this.config.fallbackPlacements },
          },
          { name: 'offset', options: { offset: this._getOffset() } },
          {
            name: 'preventOverflow',
            options: { boundary: this.config.boundary },
          },
          {
            name: 'arrow',
            options: { element: `.${this.constructor.NAME}-arrow` },
          },
          {
            name: 'onChange',
            enabled: !0,
            phase: 'afterWrite',
            fn: t => this._handlePopperPlacementChange(t),
          },
        ],
        onFirstUpdate: t => {
          t.options.placement !== t.placement &&
            this._handlePopperPlacementChange(t);
        },
      };
      return {
        ...e,
        ...('function' == typeof this.config.popperConfig
          ? this.config.popperConfig(e)
          : this.config.popperConfig),
      };
    }
    _addAttachmentClass(t) {
      this.getTipElement().classList.add(
        'bs-tooltip-' + this.updateAttachment(t)
      );
    }
    _getContainer() {
      return !1 === this.config.container
        ? document.body
        : c(this.config.container)
        ? this.config.container
        : W.findOne(this.config.container);
    }
    _getAttachment(t) {
      return Pt[t.toUpperCase()];
    }
    _setListeners() {
      this.config.trigger.split(' ').forEach(t => {
        if ('click' === t)
          R.on(
            this._element,
            this.constructor.Event.CLICK,
            this.config.selector,
            t => this.toggle(t)
          );
        else if ('manual' !== t) {
          const e =
              'hover' === t
                ? this.constructor.Event.MOUSEENTER
                : this.constructor.Event.FOCUSIN,
            s =
              'hover' === t
                ? this.constructor.Event.MOUSELEAVE
                : this.constructor.Event.FOCUSOUT;
          R.on(this._element, e, this.config.selector, t => this._enter(t)),
            R.on(this._element, s, this.config.selector, t => this._leave(t));
        }
      }),
        (this._hideModalHandler = () => {
          this._element && this.hide();
        }),
        R.on(
          this._element.closest('.modal'),
          'hide.bs.modal',
          this._hideModalHandler
        ),
        this.config.selector
          ? (this.config = { ...this.config, trigger: 'manual', selector: '' })
          : this._fixTitle();
    }
    _fixTitle() {
      const t = this._element.getAttribute('title'),
        e = typeof this._element.getAttribute('data-bs-original-title');
      (t || 'string' !== e) &&
        (this._element.setAttribute('data-bs-original-title', t || ''),
        !t ||
          this._element.getAttribute('aria-label') ||
          this._element.textContent ||
          this._element.setAttribute('aria-label', t),
        this._element.setAttribute('title', ''));
    }
    _enter(t, e) {
      (e = this._initializeOnDelegatedTarget(t, e)),
        t && (e._activeTrigger['focusin' === t.type ? 'focus' : 'hover'] = !0),
        e.getTipElement().classList.contains('show') || 'show' === e._hoverState
          ? (e._hoverState = 'show')
          : (clearTimeout(e._timeout),
            (e._hoverState = 'show'),
            e.config.delay && e.config.delay.show
              ? (e._timeout = setTimeout(() => {
                  'show' === e._hoverState && e.show();
                }, e.config.delay.show))
              : e.show());
    }
    _leave(t, e) {
      (e = this._initializeOnDelegatedTarget(t, e)),
        t &&
          (e._activeTrigger['focusout' === t.type ? 'focus' : 'hover'] =
            e._element.contains(t.relatedTarget)),
        e._isWithActiveTrigger() ||
          (clearTimeout(e._timeout),
          (e._hoverState = 'out'),
          e.config.delay && e.config.delay.hide
            ? (e._timeout = setTimeout(() => {
                'out' === e._hoverState && e.hide();
              }, e.config.delay.hide))
            : e.hide());
    }
    _isWithActiveTrigger() {
      for (const t in this._activeTrigger)
        if (this._activeTrigger[t]) return !0;
      return !1;
    }
    _getConfig(t) {
      const e = F.getDataAttributes(this._element);
      return (
        Object.keys(e).forEach(t => {
          jt.has(t) && delete e[t];
        }),
        t &&
          'object' == typeof t.container &&
          t.container.jquery &&
          (t.container = t.container[0]),
        'number' ==
          typeof (t = {
            ...this.constructor.Default,
            ...e,
            ...('object' == typeof t && t ? t : {}),
          }).delay && (t.delay = { show: t.delay, hide: t.delay }),
        'number' == typeof t.title && (t.title = t.title.toString()),
        'number' == typeof t.content && (t.content = t.content.toString()),
        d('tooltip', t, this.constructor.DefaultType),
        t.sanitize && (t.template = Ot(t.template, t.allowList, t.sanitizeFn)),
        t
      );
    }
    _getDelegateConfig() {
      const t = {};
      if (this.config)
        for (const e in this.config)
          this.constructor.Default[e] !== this.config[e] &&
            (t[e] = this.config[e]);
      return t;
    }
    _cleanTipClass() {
      const t = this.getTipElement(),
        e = t.getAttribute('class').match(It);
      null !== e &&
        e.length > 0 &&
        e.map(t => t.trim()).forEach(e => t.classList.remove(e));
    }
    _handlePopperPlacementChange(t) {
      const { state: e } = t;
      e &&
        ((this.tip = e.elements.popper),
        this._cleanTipClass(),
        this._addAttachmentClass(this._getAttachment(e.placement)));
    }
    static jQueryInterface(t) {
      return this.each(function () {
        let e = E.get(this, 'bs.tooltip');
        const s = 'object' == typeof t && t;
        if (
          (e || !/dispose|hide/.test(t)) &&
          (e || (e = new Rt(this, s)), 'string' == typeof t)
        ) {
          if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
          e[t]();
        }
      });
    }
  }
  v('tooltip', Rt);
  const Bt = new RegExp('(^|\\s)bs-popover\\S+', 'g'),
    $t = {
      ...Rt.Default,
      placement: 'right',
      offset: [0, 8],
      trigger: 'click',
      content: '',
      template:
        '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
    },
    zt = { ...Rt.DefaultType, content: '(string|element|function)' },
    Ut = {
      HIDE: 'hide.bs.popover',
      HIDDEN: 'hidden.bs.popover',
      SHOW: 'show.bs.popover',
      SHOWN: 'shown.bs.popover',
      INSERTED: 'inserted.bs.popover',
      CLICK: 'click.bs.popover',
      FOCUSIN: 'focusin.bs.popover',
      FOCUSOUT: 'focusout.bs.popover',
      MOUSEENTER: 'mouseenter.bs.popover',
      MOUSELEAVE: 'mouseleave.bs.popover',
    };
  class Kt extends Rt {
    static get Default() {
      return $t;
    }
    static get NAME() {
      return 'popover';
    }
    static get DATA_KEY() {
      return 'bs.popover';
    }
    static get Event() {
      return Ut;
    }
    static get EVENT_KEY() {
      return '.bs.popover';
    }
    static get DefaultType() {
      return zt;
    }
    isWithContent() {
      return this.getTitle() || this._getContent();
    }
    setContent() {
      const t = this.getTipElement();
      this.setElementContent(W.findOne('.popover-header', t), this.getTitle());
      let e = this._getContent();
      'function' == typeof e && (e = e.call(this._element)),
        this.setElementContent(W.findOne('.popover-body', t), e),
        t.classList.remove('fade', 'show');
    }
    _addAttachmentClass(t) {
      this.getTipElement().classList.add(
        'bs-popover-' + this.updateAttachment(t)
      );
    }
    _getContent() {
      return (
        this._element.getAttribute('data-bs-content') || this.config.content
      );
    }
    _cleanTipClass() {
      const t = this.getTipElement(),
        e = t.getAttribute('class').match(Bt);
      null !== e &&
        e.length > 0 &&
        e.map(t => t.trim()).forEach(e => t.classList.remove(e));
    }
    static jQueryInterface(t) {
      return this.each(function () {
        let e = E.get(this, 'bs.popover');
        const s = 'object' == typeof t ? t : null;
        if (
          (e || !/dispose|hide/.test(t)) &&
          (e || ((e = new Kt(this, s)), E.set(this, 'bs.popover', e)),
          'string' == typeof t)
        ) {
          if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
          e[t]();
        }
      });
    }
  }
  v('popover', Kt);
  const Ft = { offset: 10, method: 'auto', target: '' },
    Wt = { offset: 'number', method: 'string', target: '(string|element)' };
  class Yt extends B {
    constructor(t, e) {
      super(t),
        (this._scrollElement =
          'BODY' === this._element.tagName ? window : this._element),
        (this._config = this._getConfig(e)),
        (this._selector = `${this._config.target} .nav-link, ${this._config.target} .list-group-item, ${this._config.target} .dropdown-item`),
        (this._offsets = []),
        (this._targets = []),
        (this._activeTarget = null),
        (this._scrollHeight = 0),
        R.on(this._scrollElement, 'scroll.bs.scrollspy', () => this._process()),
        this.refresh(),
        this._process();
    }
    static get Default() {
      return Ft;
    }
    static get DATA_KEY() {
      return 'bs.scrollspy';
    }
    refresh() {
      const t =
          this._scrollElement === this._scrollElement.window
            ? 'offset'
            : 'position',
        e = 'auto' === this._config.method ? t : this._config.method,
        s = 'position' === e ? this._getScrollTop() : 0;
      (this._offsets = []),
        (this._targets = []),
        (this._scrollHeight = this._getScrollHeight()),
        W.find(this._selector)
          .map(t => {
            const i = o(t),
              n = i ? W.findOne(i) : null;
            if (n) {
              const t = n.getBoundingClientRect();
              if (t.width || t.height) return [F[e](n).top + s, i];
            }
            return null;
          })
          .filter(t => t)
          .sort((t, e) => t[0] - e[0])
          .forEach(t => {
            this._offsets.push(t[0]), this._targets.push(t[1]);
          });
    }
    dispose() {
      super.dispose(),
        R.off(this._scrollElement, '.bs.scrollspy'),
        (this._scrollElement = null),
        (this._config = null),
        (this._selector = null),
        (this._offsets = null),
        (this._targets = null),
        (this._activeTarget = null),
        (this._scrollHeight = null);
    }
    _getConfig(t) {
      if (
        'string' !=
          typeof (t = {
            ...Ft,
            ...F.getDataAttributes(this._element),
            ...('object' == typeof t && t ? t : {}),
          }).target &&
        c(t.target)
      ) {
        let { id: e } = t.target;
        e || ((e = i('scrollspy')), (t.target.id = e)), (t.target = '#' + e);
      }
      return d('scrollspy', t, Wt), t;
    }
    _getScrollTop() {
      return this._scrollElement === window
        ? this._scrollElement.pageYOffset
        : this._scrollElement.scrollTop;
    }
    _getScrollHeight() {
      return (
        this._scrollElement.scrollHeight ||
        Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight
        )
      );
    }
    _getOffsetHeight() {
      return this._scrollElement === window
        ? window.innerHeight
        : this._scrollElement.getBoundingClientRect().height;
    }
    _process() {
      const t = this._getScrollTop() + this._config.offset,
        e = this._getScrollHeight(),
        s = this._config.offset + e - this._getOffsetHeight();
      if ((this._scrollHeight !== e && this.refresh(), t >= s)) {
        const t = this._targets[this._targets.length - 1];
        this._activeTarget !== t && this._activate(t);
      } else {
        if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0)
          return (this._activeTarget = null), void this._clear();
        for (let e = this._offsets.length; e--; )
          this._activeTarget !== this._targets[e] &&
            t >= this._offsets[e] &&
            (void 0 === this._offsets[e + 1] || t < this._offsets[e + 1]) &&
            this._activate(this._targets[e]);
      }
    }
    _activate(t) {
      (this._activeTarget = t), this._clear();
      const e = this._selector
          .split(',')
          .map(e => `${e}[data-bs-target="${t}"],${e}[href="${t}"]`),
        s = W.findOne(e.join(','));
      s.classList.contains('dropdown-item')
        ? (W.findOne('.dropdown-toggle', s.closest('.dropdown')).classList.add(
            'active'
          ),
          s.classList.add('active'))
        : (s.classList.add('active'),
          W.parents(s, '.nav, .list-group').forEach(t => {
            W.prev(t, '.nav-link, .list-group-item').forEach(t =>
              t.classList.add('active')
            ),
              W.prev(t, '.nav-item').forEach(t => {
                W.children(t, '.nav-link').forEach(t =>
                  t.classList.add('active')
                );
              });
          })),
        R.trigger(this._scrollElement, 'activate.bs.scrollspy', {
          relatedTarget: t,
        });
    }
    _clear() {
      W.find(this._selector)
        .filter(t => t.classList.contains('active'))
        .forEach(t => t.classList.remove('active'));
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e =
          Yt.getInstance(this) || new Yt(this, 'object' == typeof t ? t : {});
        if ('string' == typeof t) {
          if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
          e[t]();
        }
      });
    }
  }
  R.on(window, 'load.bs.scrollspy.data-api', () => {
    W.find('[data-bs-spy="scroll"]').forEach(t => new Yt(t));
  }),
    v('scrollspy', Yt);
  class Vt extends B {
    static get DATA_KEY() {
      return 'bs.tab';
    }
    show() {
      if (
        this._element.parentNode &&
        this._element.parentNode.nodeType === Node.ELEMENT_NODE &&
        this._element.classList.contains('active')
      )
        return;
      let t;
      const e = r(this._element),
        s = this._element.closest('.nav, .list-group');
      if (s) {
        const e =
          'UL' === s.nodeName || 'OL' === s.nodeName
            ? ':scope > li > .active'
            : '.active';
        (t = W.find(e, s)), (t = t[t.length - 1]);
      }
      const i = t
        ? R.trigger(t, 'hide.bs.tab', { relatedTarget: this._element })
        : null;
      if (
        R.trigger(this._element, 'show.bs.tab', { relatedTarget: t })
          .defaultPrevented ||
        (null !== i && i.defaultPrevented)
      )
        return;
      this._activate(this._element, s);
      const n = () => {
        R.trigger(t, 'hidden.bs.tab', { relatedTarget: this._element }),
          R.trigger(this._element, 'shown.bs.tab', { relatedTarget: t });
      };
      e ? this._activate(e, e.parentNode, n) : n();
    }
    _activate(t, e, s) {
      const i = (
          !e || ('UL' !== e.nodeName && 'OL' !== e.nodeName)
            ? W.children(e, '.active')
            : W.find(':scope > li > .active', e)
        )[0],
        n = s && i && i.classList.contains('fade'),
        o = () => this._transitionComplete(t, i, s);
      if (i && n) {
        const t = a(i);
        i.classList.remove('show'), R.one(i, 'transitionend', o), h(i, t);
      } else o();
    }
    _transitionComplete(t, e, s) {
      if (e) {
        e.classList.remove('active');
        const t = W.findOne(':scope > .dropdown-menu .active', e.parentNode);
        t && t.classList.remove('active'),
          'tab' === e.getAttribute('role') &&
            e.setAttribute('aria-selected', !1);
      }
      t.classList.add('active'),
        'tab' === t.getAttribute('role') && t.setAttribute('aria-selected', !0),
        m(t),
        t.classList.contains('fade') && t.classList.add('show');
      let i = t.parentNode;
      if (
        (i && 'LI' === i.nodeName && (i = i.parentNode),
        i && i.classList.contains('dropdown-menu'))
      ) {
        const e = t.closest('.dropdown');
        e &&
          W.find('.dropdown-toggle', e).forEach(t => t.classList.add('active')),
          t.setAttribute('aria-expanded', !0);
      }
      s && s();
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = E.get(this, 'bs.tab') || new Vt(this);
        if ('string' == typeof t) {
          if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
          e[t]();
        }
      });
    }
  }
  R.on(
    document,
    'click.bs.tab.data-api',
    '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
    function (t) {
      ['A', 'AREA'].includes(this.tagName) && t.preventDefault(),
        g(this) || (E.get(this, 'bs.tab') || new Vt(this)).show();
    }
  ),
    v('tab', Vt);
  const qt = { animation: 'boolean', autohide: 'boolean', delay: 'number' },
    Qt = { animation: !0, autohide: !0, delay: 5e3 };
  class Xt extends B {
    constructor(t, e) {
      super(t),
        (this._config = this._getConfig(e)),
        (this._timeout = null),
        this._setListeners();
    }
    static get DefaultType() {
      return qt;
    }
    static get Default() {
      return Qt;
    }
    static get DATA_KEY() {
      return 'bs.toast';
    }
    show() {
      if (R.trigger(this._element, 'show.bs.toast').defaultPrevented) return;
      this._clearTimeout(),
        this._config.animation && this._element.classList.add('fade');
      const t = () => {
        this._element.classList.remove('showing'),
          this._element.classList.add('show'),
          R.trigger(this._element, 'shown.bs.toast'),
          this._config.autohide &&
            (this._timeout = setTimeout(() => {
              this.hide();
            }, this._config.delay));
      };
      if (
        (this._element.classList.remove('hide'),
        m(this._element),
        this._element.classList.add('showing'),
        this._config.animation)
      ) {
        const e = a(this._element);
        R.one(this._element, 'transitionend', t), h(this._element, e);
      } else t();
    }
    hide() {
      if (!this._element.classList.contains('show')) return;
      if (R.trigger(this._element, 'hide.bs.toast').defaultPrevented) return;
      const t = () => {
        this._element.classList.add('hide'),
          R.trigger(this._element, 'hidden.bs.toast');
      };
      if ((this._element.classList.remove('show'), this._config.animation)) {
        const e = a(this._element);
        R.one(this._element, 'transitionend', t), h(this._element, e);
      } else t();
    }
    dispose() {
      this._clearTimeout(),
        this._element.classList.contains('show') &&
          this._element.classList.remove('show'),
        super.dispose(),
        (this._config = null);
    }
    _getConfig(t) {
      return (
        (t = {
          ...Qt,
          ...F.getDataAttributes(this._element),
          ...('object' == typeof t && t ? t : {}),
        }),
        d('toast', t, this.constructor.DefaultType),
        t
      );
    }
    _setListeners() {
      R.on(
        this._element,
        'click.dismiss.bs.toast',
        '[data-bs-dismiss="toast"]',
        () => this.hide()
      );
    }
    _clearTimeout() {
      clearTimeout(this._timeout), (this._timeout = null);
    }
    static jQueryInterface(t) {
      return this.each(function () {
        let e = E.get(this, 'bs.toast');
        if (
          (e || (e = new Xt(this, 'object' == typeof t && t)),
          'string' == typeof t)
        ) {
          if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
          e[t](this);
        }
      });
    }
  }
  return (
    v('toast', Xt),
    {
      Alert: $,
      Button: z,
      Carousel: Z,
      Collapse: et,
      Dropdown: dt,
      Modal: Tt,
      Offcanvas: kt,
      Popover: Kt,
      ScrollSpy: Yt,
      Tab: Vt,
      Toast: Xt,
      Tooltip: Rt,
    }
  );
});
