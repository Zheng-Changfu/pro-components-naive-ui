import { defineComponent as $, openBlock as ee, createElementBlock as be, createElementVNode as le, computed as y, ref as R, onScopeDispose as fr, inject as ue, onBeforeMount as kl, createBlock as Ee, Transition as Bl, normalizeProps as Pt, guardReactiveProps as wt, unref as V, withCtx as ae, renderSlot as We, withDirectives as ra, mergeProps as P, vShow as na, provide as _e, getCurrentScope as Vl, readonly as Ll, watch as J, getCurrentInstance as oa, nextTick as ve, onMounted as bn, toValue as sa, onUnmounted as aa, onUpdated as Nl, onBeforeUpdate as Ul, isProxy as zl, toRaw as sr, shallowReactive as Kl, createVNode as h, useAttrs as Pn, isVNode as de, toRef as O, Fragment as St, useSlots as ia, createSlots as la, normalizeClass as To, createTextVNode as _o, toDisplayString as So, resolveDynamicComponent as Oo, createCommentVNode as Fo, normalizeStyle as Wl, renderList as Jr, h as ua } from "vue";
import { cardProps as ql, collapseTransitionProps as wn, cB as Vt, formProps as Gl, configProviderProps as Hl, NConfigProvider as Yl, formItemProps as ca, NFormItem as Ql, NEl as X, NTooltip as pr, NIcon as Me, useThemeVars as $n, NPopover as Xl, c as xe, buttonProps as Jl, NButton as Lt, NFlex as fe, rateProps as Zl, NRate as jo, inputProps as da, NInput as fa, inputNumberProps as eu, NInputNumber as tu, sliderProps as ru, NSlider as nu, switchProps as ou, NSwitch as su, uploadProps as au, NUpload as Ao, selectProps as iu, NSelect as lu, mentionProps as uu, NMention as cu, cascaderProps as du, NCascader as fu, checkboxProps as pu, NCheckbox as Zr, transferProps as hu, NTransfer as mu, datePickerProps as vu, NDatePicker as gu, treeSelectProps as yu, NTreeSelect as bu, timePickerProps as Pu, NTimePicker as wu, radioGroupProps as $u, NRadioGroup as xu, NRadio as Tu, colorPickerProps as _u, NColorPicker as Eo, dynamicTagsProps as Su, NDynamicTags as Co, autoCompleteProps as Ou, NAutoComplete as Fu, checkboxGroupProps as ju, NCheckboxGroup as Au, NForm as Eu, createLocale as pa, zhCN as Cu, enUS as Mu, NCard as Ru, treeProps as Du, NTree as Iu, modalProps as ku, NModal as Bu, descriptionsProps as Vu, NSpin as Lu, NDescriptions as Nu, NDescriptionsItem as Uu, NGrid as zu, NGi as Mo } from "naive-ui";
var ha = typeof global == "object" && global && global.Object === Object && global, Ku = typeof self == "object" && self && self.Object === Object && self, ke = ha || Ku || Function("return this")(), Re = ke.Symbol, ma = Object.prototype, Wu = ma.hasOwnProperty, qu = ma.toString, Ct = Re ? Re.toStringTag : void 0;
function Gu(e) {
  var t = Wu.call(e, Ct), r = e[Ct];
  try {
    e[Ct] = void 0;
    var n = !0;
  } catch {
  }
  var o = qu.call(e);
  return n && (t ? e[Ct] = r : delete e[Ct]), o;
}
var Hu = Object.prototype, Yu = Hu.toString;
function Qu(e) {
  return Yu.call(e);
}
var Xu = "[object Null]", Ju = "[object Undefined]", Ro = Re ? Re.toStringTag : void 0;
function Be(e) {
  return e == null ? e === void 0 ? Ju : Xu : Ro && Ro in Object(e) ? Gu(e) : Qu(e);
}
function Se(e) {
  return e != null && typeof e == "object";
}
var Zu = "[object Symbol]";
function hr(e) {
  return typeof e == "symbol" || Se(e) && Be(e) == Zu;
}
function xn(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, o = Array(n); ++r < n; )
    o[r] = t(e[r], r, e);
  return o;
}
var W = Array.isArray, ec = 1 / 0, Do = Re ? Re.prototype : void 0, Io = Do ? Do.toString : void 0;
function va(e) {
  if (typeof e == "string")
    return e;
  if (W(e))
    return xn(e, va) + "";
  if (hr(e))
    return Io ? Io.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -ec ? "-0" : t;
}
function De(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
function ga(e) {
  return e;
}
var tc = "[object AsyncFunction]", rc = "[object Function]", nc = "[object GeneratorFunction]", oc = "[object Proxy]";
function ge(e) {
  if (!De(e))
    return !1;
  var t = Be(e);
  return t == rc || t == nc || t == tc || t == oc;
}
var zr = ke["__core-js_shared__"], ko = function() {
  var e = /[^.]+$/.exec(zr && zr.keys && zr.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function sc(e) {
  return !!ko && ko in e;
}
var ac = Function.prototype, ic = ac.toString;
function dt(e) {
  if (e != null) {
    try {
      return ic.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var lc = /[\\^$.*+?()[\]{}|]/g, uc = /^\[object .+?Constructor\]$/, cc = Function.prototype, dc = Object.prototype, fc = cc.toString, pc = dc.hasOwnProperty, hc = RegExp(
  "^" + fc.call(pc).replace(lc, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function mc(e) {
  if (!De(e) || sc(e))
    return !1;
  var t = ge(e) ? hc : uc;
  return t.test(dt(e));
}
function vc(e, t) {
  return e == null ? void 0 : e[t];
}
function ft(e, t) {
  var r = vc(e, t);
  return mc(r) ? r : void 0;
}
var en = ft(ke, "WeakMap"), Bo = Object.create, gc = /* @__PURE__ */ function() {
  function e() {
  }
  return function(t) {
    if (!De(t))
      return {};
    if (Bo)
      return Bo(t);
    e.prototype = t;
    var r = new e();
    return e.prototype = void 0, r;
  };
}();
function yc(e, t, r) {
  switch (r.length) {
    case 0:
      return e.call(t);
    case 1:
      return e.call(t, r[0]);
    case 2:
      return e.call(t, r[0], r[1]);
    case 3:
      return e.call(t, r[0], r[1], r[2]);
  }
  return e.apply(t, r);
}
function It() {
}
function Tn(e, t) {
  var r = -1, n = e.length;
  for (t || (t = Array(n)); ++r < n; )
    t[r] = e[r];
  return t;
}
var bc = 800, Pc = 16, wc = Date.now;
function $c(e) {
  var t = 0, r = 0;
  return function() {
    var n = wc(), o = Pc - (n - r);
    if (r = n, o > 0) {
      if (++t >= bc)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
function xc(e) {
  return function() {
    return e;
  };
}
var ar = function() {
  try {
    var e = ft(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), Tc = ar ? function(e, t) {
  return ar(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: xc(t),
    writable: !0
  });
} : ga, ya = $c(Tc);
function _c(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n && t(e[r], r, e) !== !1; )
    ;
  return e;
}
var Sc = 9007199254740991, Oc = /^(?:0|[1-9]\d*)$/;
function mr(e, t) {
  var r = typeof e;
  return t = t ?? Sc, !!t && (r == "number" || r != "symbol" && Oc.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function _n(e, t, r) {
  t == "__proto__" && ar ? ar(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r;
}
function vr(e, t) {
  return e === t || e !== e && t !== t;
}
var Fc = Object.prototype, jc = Fc.hasOwnProperty;
function Sn(e, t, r) {
  var n = e[t];
  (!(jc.call(e, t) && vr(n, r)) || r === void 0 && !(t in e)) && _n(e, t, r);
}
function Ot(e, t, r, n) {
  var o = !r;
  r || (r = {});
  for (var s = -1, i = t.length; ++s < i; ) {
    var a = t[s], l = void 0;
    l === void 0 && (l = e[a]), o ? _n(r, a, l) : Sn(r, a, l);
  }
  return r;
}
var Vo = Math.max;
function ba(e, t, r) {
  return t = Vo(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var n = arguments, o = -1, s = Vo(n.length - t, 0), i = Array(s); ++o < s; )
      i[o] = n[t + o];
    o = -1;
    for (var a = Array(t + 1); ++o < t; )
      a[o] = n[o];
    return a[t] = r(i), yc(e, this, a);
  };
}
function Ac(e, t) {
  return ya(ba(e, t, ga), e + "");
}
var Ec = 9007199254740991;
function On(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Ec;
}
function gr(e) {
  return e != null && On(e.length) && !ge(e);
}
function Cc(e, t, r) {
  if (!De(r))
    return !1;
  var n = typeof t;
  return (n == "number" ? gr(r) && mr(t, r.length) : n == "string" && t in r) ? vr(r[t], e) : !1;
}
function Mc(e) {
  return Ac(function(t, r) {
    var n = -1, o = r.length, s = o > 1 ? r[o - 1] : void 0, i = o > 2 ? r[2] : void 0;
    for (s = e.length > 3 && typeof s == "function" ? (o--, s) : void 0, i && Cc(r[0], r[1], i) && (s = o < 3 ? void 0 : s, o = 1), t = Object(t); ++n < o; ) {
      var a = r[n];
      a && e(t, a, n, s);
    }
    return t;
  });
}
var Rc = Object.prototype;
function Fn(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || Rc;
  return e === r;
}
function Dc(e, t) {
  for (var r = -1, n = Array(e); ++r < e; )
    n[r] = t(r);
  return n;
}
var Ic = "[object Arguments]";
function Lo(e) {
  return Se(e) && Be(e) == Ic;
}
var Pa = Object.prototype, kc = Pa.hasOwnProperty, Bc = Pa.propertyIsEnumerable, Nt = Lo(/* @__PURE__ */ function() {
  return arguments;
}()) ? Lo : function(e) {
  return Se(e) && kc.call(e, "callee") && !Bc.call(e, "callee");
};
function Vc() {
  return !1;
}
var wa = typeof exports == "object" && exports && !exports.nodeType && exports, No = wa && typeof module == "object" && module && !module.nodeType && module, Lc = No && No.exports === wa, Uo = Lc ? ke.Buffer : void 0, Nc = Uo ? Uo.isBuffer : void 0, jn = Nc || Vc, Uc = "[object Arguments]", zc = "[object Array]", Kc = "[object Boolean]", Wc = "[object Date]", qc = "[object Error]", Gc = "[object Function]", Hc = "[object Map]", Yc = "[object Number]", Qc = "[object Object]", Xc = "[object RegExp]", Jc = "[object Set]", Zc = "[object String]", ed = "[object WeakMap]", td = "[object ArrayBuffer]", rd = "[object DataView]", nd = "[object Float32Array]", od = "[object Float64Array]", sd = "[object Int8Array]", ad = "[object Int16Array]", id = "[object Int32Array]", ld = "[object Uint8Array]", ud = "[object Uint8ClampedArray]", cd = "[object Uint16Array]", dd = "[object Uint32Array]", Y = {};
Y[nd] = Y[od] = Y[sd] = Y[ad] = Y[id] = Y[ld] = Y[ud] = Y[cd] = Y[dd] = !0;
Y[Uc] = Y[zc] = Y[td] = Y[Kc] = Y[rd] = Y[Wc] = Y[qc] = Y[Gc] = Y[Hc] = Y[Yc] = Y[Qc] = Y[Xc] = Y[Jc] = Y[Zc] = Y[ed] = !1;
function fd(e) {
  return Se(e) && On(e.length) && !!Y[Be(e)];
}
function An(e) {
  return function(t) {
    return e(t);
  };
}
var $a = typeof exports == "object" && exports && !exports.nodeType && exports, kt = $a && typeof module == "object" && module && !module.nodeType && module, pd = kt && kt.exports === $a, Kr = pd && ha.process, xt = function() {
  try {
    var e = kt && kt.require && kt.require("util").types;
    return e || Kr && Kr.binding && Kr.binding("util");
  } catch {
  }
}(), zo = xt && xt.isTypedArray, xa = zo ? An(zo) : fd, hd = Object.prototype, md = hd.hasOwnProperty;
function Ta(e, t) {
  var r = W(e), n = !r && Nt(e), o = !r && !n && jn(e), s = !r && !n && !o && xa(e), i = r || n || o || s, a = i ? Dc(e.length, String) : [], l = a.length;
  for (var u in e)
    (t || md.call(e, u)) && !(i && // Safari 9 has enumerable `arguments.length` in strict mode.
    (u == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    o && (u == "offset" || u == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    s && (u == "buffer" || u == "byteLength" || u == "byteOffset") || // Skip index properties.
    mr(u, l))) && a.push(u);
  return a;
}
function _a(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var vd = _a(Object.keys, Object), gd = Object.prototype, yd = gd.hasOwnProperty;
function bd(e) {
  if (!Fn(e))
    return vd(e);
  var t = [];
  for (var r in Object(e))
    yd.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
function En(e) {
  return gr(e) ? Ta(e) : bd(e);
}
function Pd(e) {
  var t = [];
  if (e != null)
    for (var r in Object(e))
      t.push(r);
  return t;
}
var wd = Object.prototype, $d = wd.hasOwnProperty;
function xd(e) {
  if (!De(e))
    return Pd(e);
  var t = Fn(e), r = [];
  for (var n in e)
    n == "constructor" && (t || !$d.call(e, n)) || r.push(n);
  return r;
}
function Ht(e) {
  return gr(e) ? Ta(e, !0) : xd(e);
}
var Td = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, _d = /^\w*$/;
function Sd(e, t) {
  if (W(e))
    return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || hr(e) ? !0 : _d.test(e) || !Td.test(e) || t != null && e in Object(t);
}
var Ut = ft(Object, "create");
function Od() {
  this.__data__ = Ut ? Ut(null) : {}, this.size = 0;
}
function Fd(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var jd = "__lodash_hash_undefined__", Ad = Object.prototype, Ed = Ad.hasOwnProperty;
function Cd(e) {
  var t = this.__data__;
  if (Ut) {
    var r = t[e];
    return r === jd ? void 0 : r;
  }
  return Ed.call(t, e) ? t[e] : void 0;
}
var Md = Object.prototype, Rd = Md.hasOwnProperty;
function Dd(e) {
  var t = this.__data__;
  return Ut ? t[e] !== void 0 : Rd.call(t, e);
}
var Id = "__lodash_hash_undefined__";
function kd(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = Ut && t === void 0 ? Id : t, this;
}
function st(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
st.prototype.clear = Od;
st.prototype.delete = Fd;
st.prototype.get = Cd;
st.prototype.has = Dd;
st.prototype.set = kd;
function Bd() {
  this.__data__ = [], this.size = 0;
}
function yr(e, t) {
  for (var r = e.length; r--; )
    if (vr(e[r][0], t))
      return r;
  return -1;
}
var Vd = Array.prototype, Ld = Vd.splice;
function Nd(e) {
  var t = this.__data__, r = yr(t, e);
  if (r < 0)
    return !1;
  var n = t.length - 1;
  return r == n ? t.pop() : Ld.call(t, r, 1), --this.size, !0;
}
function Ud(e) {
  var t = this.__data__, r = yr(t, e);
  return r < 0 ? void 0 : t[r][1];
}
function zd(e) {
  return yr(this.__data__, e) > -1;
}
function Kd(e, t) {
  var r = this.__data__, n = yr(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
}
function Ge(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Ge.prototype.clear = Bd;
Ge.prototype.delete = Nd;
Ge.prototype.get = Ud;
Ge.prototype.has = zd;
Ge.prototype.set = Kd;
var zt = ft(ke, "Map");
function Wd() {
  this.size = 0, this.__data__ = {
    hash: new st(),
    map: new (zt || Ge)(),
    string: new st()
  };
}
function qd(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function br(e, t) {
  var r = e.__data__;
  return qd(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
function Gd(e) {
  var t = br(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function Hd(e) {
  return br(this, e).get(e);
}
function Yd(e) {
  return br(this, e).has(e);
}
function Qd(e, t) {
  var r = br(this, e), n = r.size;
  return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
}
function et(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
et.prototype.clear = Wd;
et.prototype.delete = Gd;
et.prototype.get = Hd;
et.prototype.has = Yd;
et.prototype.set = Qd;
var Xd = "Expected a function";
function Cn(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(Xd);
  var r = function() {
    var n = arguments, o = t ? t.apply(this, n) : n[0], s = r.cache;
    if (s.has(o))
      return s.get(o);
    var i = e.apply(this, n);
    return r.cache = s.set(o, i) || s, i;
  };
  return r.cache = new (Cn.Cache || et)(), r;
}
Cn.Cache = et;
var Jd = 500;
function Zd(e) {
  var t = Cn(e, function(n) {
    return r.size === Jd && r.clear(), n;
  }), r = t.cache;
  return t;
}
var ef = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, tf = /\\(\\)?/g, Sa = Zd(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(ef, function(r, n, o, s) {
    t.push(o ? s.replace(tf, "$1") : n || r);
  }), t;
});
function Pr(e) {
  return e == null ? "" : va(e);
}
function Ft(e, t) {
  return W(e) ? e : Sd(e, t) ? [e] : Sa(Pr(e));
}
var rf = 1 / 0;
function Yt(e) {
  if (typeof e == "string" || hr(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -rf ? "-0" : t;
}
function Mn(e, t) {
  t = Ft(t, e);
  for (var r = 0, n = t.length; e != null && r < n; )
    e = e[Yt(t[r++])];
  return r && r == n ? e : void 0;
}
function ie(e, t, r) {
  var n = e == null ? void 0 : Mn(e, t);
  return n === void 0 ? r : n;
}
function Rn(e, t) {
  for (var r = -1, n = t.length, o = e.length; ++r < n; )
    e[o + r] = t[r];
  return e;
}
var Ko = Re ? Re.isConcatSpreadable : void 0;
function nf(e) {
  return W(e) || Nt(e) || !!(Ko && e && e[Ko]);
}
function of(e, t, r, n, o) {
  var s = -1, i = e.length;
  for (r || (r = nf), o || (o = []); ++s < i; ) {
    var a = e[s];
    r(a) ? Rn(o, a) : o[o.length] = a;
  }
  return o;
}
function sf(e) {
  var t = e == null ? 0 : e.length;
  return t ? of(e) : [];
}
function Oa(e) {
  return ya(ba(e, void 0, sf), e + "");
}
var Dn = _a(Object.getPrototypeOf, Object), af = "[object Object]", lf = Function.prototype, uf = Object.prototype, Fa = lf.toString, cf = uf.hasOwnProperty, df = Fa.call(Object);
function In(e) {
  if (!Se(e) || Be(e) != af)
    return !1;
  var t = Dn(e);
  if (t === null)
    return !0;
  var r = cf.call(t, "constructor") && t.constructor;
  return typeof r == "function" && r instanceof r && Fa.call(r) == df;
}
function ff(e, t, r) {
  var n = -1, o = e.length;
  t < 0 && (t = -t > o ? 0 : o + t), r = r > o ? o : r, r < 0 && (r += o), o = t > r ? 0 : r - t >>> 0, t >>>= 0;
  for (var s = Array(o); ++n < o; )
    s[n] = e[n + t];
  return s;
}
function pf() {
  this.__data__ = new Ge(), this.size = 0;
}
function hf(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
function mf(e) {
  return this.__data__.get(e);
}
function vf(e) {
  return this.__data__.has(e);
}
var gf = 200;
function yf(e, t) {
  var r = this.__data__;
  if (r instanceof Ge) {
    var n = r.__data__;
    if (!zt || n.length < gf - 1)
      return n.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new et(n);
  }
  return r.set(e, t), this.size = r.size, this;
}
function pt(e) {
  var t = this.__data__ = new Ge(e);
  this.size = t.size;
}
pt.prototype.clear = pf;
pt.prototype.delete = hf;
pt.prototype.get = mf;
pt.prototype.has = vf;
pt.prototype.set = yf;
function bf(e, t) {
  return e && Ot(t, En(t), e);
}
function Pf(e, t) {
  return e && Ot(t, Ht(t), e);
}
var ja = typeof exports == "object" && exports && !exports.nodeType && exports, Wo = ja && typeof module == "object" && module && !module.nodeType && module, wf = Wo && Wo.exports === ja, qo = wf ? ke.Buffer : void 0, Go = qo ? qo.allocUnsafe : void 0;
function Aa(e, t) {
  if (t)
    return e.slice();
  var r = e.length, n = Go ? Go(r) : new e.constructor(r);
  return e.copy(n), n;
}
function $f(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, o = 0, s = []; ++r < n; ) {
    var i = e[r];
    t(i, r, e) && (s[o++] = i);
  }
  return s;
}
function Ea() {
  return [];
}
var xf = Object.prototype, Tf = xf.propertyIsEnumerable, Ho = Object.getOwnPropertySymbols, kn = Ho ? function(e) {
  return e == null ? [] : (e = Object(e), $f(Ho(e), function(t) {
    return Tf.call(e, t);
  }));
} : Ea;
function _f(e, t) {
  return Ot(e, kn(e), t);
}
var Sf = Object.getOwnPropertySymbols, Ca = Sf ? function(e) {
  for (var t = []; e; )
    Rn(t, kn(e)), e = Dn(e);
  return t;
} : Ea;
function Of(e, t) {
  return Ot(e, Ca(e), t);
}
function Ma(e, t, r) {
  var n = t(e);
  return W(e) ? n : Rn(n, r(e));
}
function Ff(e) {
  return Ma(e, En, kn);
}
function Ra(e) {
  return Ma(e, Ht, Ca);
}
var tn = ft(ke, "DataView"), rn = ft(ke, "Promise"), nn = ft(ke, "Set"), Yo = "[object Map]", jf = "[object Object]", Qo = "[object Promise]", Xo = "[object Set]", Jo = "[object WeakMap]", Zo = "[object DataView]", Af = dt(tn), Ef = dt(zt), Cf = dt(rn), Mf = dt(nn), Rf = dt(en), ze = Be;
(tn && ze(new tn(new ArrayBuffer(1))) != Zo || zt && ze(new zt()) != Yo || rn && ze(rn.resolve()) != Qo || nn && ze(new nn()) != Xo || en && ze(new en()) != Jo) && (ze = function(e) {
  var t = Be(e), r = t == jf ? e.constructor : void 0, n = r ? dt(r) : "";
  if (n)
    switch (n) {
      case Af:
        return Zo;
      case Ef:
        return Yo;
      case Cf:
        return Qo;
      case Mf:
        return Xo;
      case Rf:
        return Jo;
    }
  return t;
});
var Df = Object.prototype, If = Df.hasOwnProperty;
function kf(e) {
  var t = e.length, r = new e.constructor(t);
  return t && typeof e[0] == "string" && If.call(e, "index") && (r.index = e.index, r.input = e.input), r;
}
var es = ke.Uint8Array;
function Bn(e) {
  var t = new e.constructor(e.byteLength);
  return new es(t).set(new es(e)), t;
}
function Bf(e, t) {
  var r = t ? Bn(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.byteLength);
}
var Vf = /\w*$/;
function Lf(e) {
  var t = new e.constructor(e.source, Vf.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var ts = Re ? Re.prototype : void 0, rs = ts ? ts.valueOf : void 0;
function Nf(e) {
  return rs ? Object(rs.call(e)) : {};
}
function Da(e, t) {
  var r = t ? Bn(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.length);
}
var Uf = "[object Boolean]", zf = "[object Date]", Kf = "[object Map]", Wf = "[object Number]", qf = "[object RegExp]", Gf = "[object Set]", Hf = "[object String]", Yf = "[object Symbol]", Qf = "[object ArrayBuffer]", Xf = "[object DataView]", Jf = "[object Float32Array]", Zf = "[object Float64Array]", ep = "[object Int8Array]", tp = "[object Int16Array]", rp = "[object Int32Array]", np = "[object Uint8Array]", op = "[object Uint8ClampedArray]", sp = "[object Uint16Array]", ap = "[object Uint32Array]";
function ip(e, t, r) {
  var n = e.constructor;
  switch (t) {
    case Qf:
      return Bn(e);
    case Uf:
    case zf:
      return new n(+e);
    case Xf:
      return Bf(e, r);
    case Jf:
    case Zf:
    case ep:
    case tp:
    case rp:
    case np:
    case op:
    case sp:
    case ap:
      return Da(e, r);
    case Kf:
      return new n();
    case Wf:
    case Hf:
      return new n(e);
    case qf:
      return Lf(e);
    case Gf:
      return new n();
    case Yf:
      return Nf(e);
  }
}
function Ia(e) {
  return typeof e.constructor == "function" && !Fn(e) ? gc(Dn(e)) : {};
}
var lp = "[object Map]";
function up(e) {
  return Se(e) && ze(e) == lp;
}
var ns = xt && xt.isMap, cp = ns ? An(ns) : up, dp = "[object Set]";
function fp(e) {
  return Se(e) && ze(e) == dp;
}
var os = xt && xt.isSet, pp = os ? An(os) : fp, hp = 1, mp = 2, vp = 4, ka = "[object Arguments]", gp = "[object Array]", yp = "[object Boolean]", bp = "[object Date]", Pp = "[object Error]", Ba = "[object Function]", wp = "[object GeneratorFunction]", $p = "[object Map]", xp = "[object Number]", Va = "[object Object]", Tp = "[object RegExp]", _p = "[object Set]", Sp = "[object String]", Op = "[object Symbol]", Fp = "[object WeakMap]", jp = "[object ArrayBuffer]", Ap = "[object DataView]", Ep = "[object Float32Array]", Cp = "[object Float64Array]", Mp = "[object Int8Array]", Rp = "[object Int16Array]", Dp = "[object Int32Array]", Ip = "[object Uint8Array]", kp = "[object Uint8ClampedArray]", Bp = "[object Uint16Array]", Vp = "[object Uint32Array]", G = {};
G[ka] = G[gp] = G[jp] = G[Ap] = G[yp] = G[bp] = G[Ep] = G[Cp] = G[Mp] = G[Rp] = G[Dp] = G[$p] = G[xp] = G[Va] = G[Tp] = G[_p] = G[Sp] = G[Op] = G[Ip] = G[kp] = G[Bp] = G[Vp] = !0;
G[Pp] = G[Ba] = G[Fp] = !1;
function rr(e, t, r, n, o, s) {
  var i, a = t & hp, l = t & mp, u = t & vp;
  if (r && (i = o ? r(e, n, o, s) : r(e)), i !== void 0)
    return i;
  if (!De(e))
    return e;
  var c = W(e);
  if (c) {
    if (i = kf(e), !a)
      return Tn(e, i);
  } else {
    var p = ze(e), f = p == Ba || p == wp;
    if (jn(e))
      return Aa(e, a);
    if (p == Va || p == ka || f && !o) {
      if (i = l || f ? {} : Ia(e), !a)
        return l ? Of(e, Pf(i, e)) : _f(e, bf(i, e));
    } else {
      if (!G[p])
        return o ? e : {};
      i = ip(e, p, a);
    }
  }
  s || (s = new pt());
  var m = s.get(e);
  if (m)
    return m;
  s.set(e, i), pp(e) ? e.forEach(function(b) {
    i.add(rr(b, t, r, b, e, s));
  }) : cp(e) && e.forEach(function(b, g) {
    i.set(g, rr(b, t, r, g, e, s));
  });
  var d = u ? l ? Ra : Ff : l ? Ht : En, v = c ? void 0 : d(e);
  return _c(v || e, function(b, g) {
    v && (g = b, b = e[g]), Sn(i, g, rr(b, t, r, g, e, s));
  }), i;
}
function Lp(e, t) {
  return e != null && t in Object(e);
}
function La(e, t, r) {
  t = Ft(t, e);
  for (var n = -1, o = t.length, s = !1; ++n < o; ) {
    var i = Yt(t[n]);
    if (!(s = e != null && r(e, i)))
      break;
    e = e[i];
  }
  return s || ++n != o ? s : (o = e == null ? 0 : e.length, !!o && On(o) && mr(i, o) && (W(e) || Nt(e)));
}
function Np(e, t) {
  return e != null && La(e, t, Lp);
}
function Up(e) {
  return function(t, r, n) {
    for (var o = -1, s = Object(t), i = n(t), a = i.length; a--; ) {
      var l = i[++o];
      if (r(s[l], l, s) === !1)
        break;
    }
    return t;
  };
}
var zp = Up();
function on(e, t, r) {
  (r !== void 0 && !vr(e[t], r) || r === void 0 && !(t in e)) && _n(e, t, r);
}
function Kp(e) {
  return Se(e) && gr(e);
}
function sn(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
function Wp(e) {
  return Ot(e, Ht(e));
}
function qp(e, t, r, n, o, s, i) {
  var a = sn(e, r), l = sn(t, r), u = i.get(l);
  if (u) {
    on(e, r, u);
    return;
  }
  var c = s ? s(a, l, r + "", e, t, i) : void 0, p = c === void 0;
  if (p) {
    var f = W(l), m = !f && jn(l), d = !f && !m && xa(l);
    c = l, f || m || d ? W(a) ? c = a : Kp(a) ? c = Tn(a) : m ? (p = !1, c = Aa(l, !0)) : d ? (p = !1, c = Da(l, !0)) : c = [] : In(l) || Nt(l) ? (c = a, Nt(a) ? c = Wp(a) : (!De(a) || ge(a)) && (c = Ia(l))) : p = !1;
  }
  p && (i.set(l, c), o(c, l, n, s, i), i.delete(l)), on(e, r, c);
}
function Na(e, t, r, n, o) {
  e !== t && zp(t, function(s, i) {
    if (o || (o = new pt()), De(s))
      qp(e, t, i, r, Na, n, o);
    else {
      var a = n ? n(sn(e, i), s, i + "", e, t, o) : void 0;
      a === void 0 && (a = s), on(e, i, a);
    }
  }, Ht);
}
function Gp(e) {
  var t = e == null ? 0 : e.length;
  return t ? e[t - 1] : void 0;
}
var Hp = Object.prototype, Yp = Hp.hasOwnProperty;
function Qp(e, t) {
  return e != null && Yp.call(e, t);
}
function Ua(e, t) {
  return e != null && La(e, t, Qp);
}
var Xp = "[object String]";
function ye(e) {
  return typeof e == "string" || !W(e) && Se(e) && Be(e) == Xp;
}
function Jp(e, t) {
  return t.length < 2 ? e : Mn(e, ff(t, 0, -1));
}
var Zp = "[object Boolean]";
function eh(e) {
  return e === !0 || e === !1 || Se(e) && Be(e) == Zp;
}
var th = "[object Number]";
function Vn(e) {
  return typeof e == "number" || Se(e) && Be(e) == th;
}
function za(e) {
  return e === void 0;
}
var rh = Mc(function(e, t, r) {
  Na(e, t, r);
});
function nh(e, t) {
  return t = Ft(t, e), e = Jp(e, t), e == null || delete e[Yt(Gp(t))];
}
function oh(e) {
  return In(e) ? void 0 : e;
}
var sh = 1, ah = 2, ih = 4, Te = Oa(function(e, t) {
  var r = {};
  if (e == null)
    return r;
  var n = !1;
  t = xn(t, function(s) {
    return s = Ft(s, e), n || (n = s.length > 1), s;
  }), Ot(e, Ra(e), r), n && (r = rr(r, sh | ah | ih, oh));
  for (var o = t.length; o--; )
    nh(r, t[o]);
  return r;
});
function Ka(e, t, r, n) {
  if (!De(e))
    return e;
  t = Ft(t, e);
  for (var o = -1, s = t.length, i = s - 1, a = e; a != null && ++o < s; ) {
    var l = Yt(t[o]), u = r;
    if (l === "__proto__" || l === "constructor" || l === "prototype")
      return e;
    if (o != i) {
      var c = a[l];
      u = void 0, u === void 0 && (u = De(c) ? c : mr(t[o + 1]) ? [] : {});
    }
    Sn(a, l, u), a = a[l];
  }
  return e;
}
function lh(e, t, r) {
  for (var n = -1, o = t.length, s = {}; ++n < o; ) {
    var i = t[n], a = Mn(e, i);
    r(a, i) && Ka(s, Ft(i, e), a);
  }
  return s;
}
function uh(e, t) {
  return lh(e, t, function(r, n) {
    return Np(e, n);
  });
}
var Wa = Oa(function(e, t) {
  return e == null ? {} : uh(e, t);
});
function qa(e, t, r) {
  return e == null ? e : Ka(e, t, r);
}
function ch(e) {
  return W(e) ? xn(e, Yt) : hr(e) ? [e] : Tn(Sa(Pr(e)));
}
function dh({
  components: e = []
} = {}) {
  const t = [];
  function r(s, i, a) {
    s.component(i) || s.component(i, a);
  }
  function n(s) {
    if (!In(s))
      return !1;
    const { name: i, setup: a } = s;
    return i && a;
  }
  function o(s) {
    t.includes(s) || (t.push(s), e.forEach((i) => {
      if (n(i)) {
        const { name: a } = i;
        r(s, a, i);
      }
    }));
  }
  return {
    install: o
  };
}
const Ln = {
  /**
   * 提示文字，显示在 title 的右边
   */
  tooltip: {
    type: [String, Array]
  },
  /**
   * 在字首显示带颜色的竖条
   */
  prefix: {
    type: Boolean,
    default: !0
  },
  /**
   * 触发展开的区域，如果不想让某些区域触发展开，可以使用此属性
   */
  triggerAreas: {
    type: Array,
    default: () => ["main", "arrow"]
  },
  /**
   * 是否显示展开收起，如果外界没有传递此参数，除了在 closable 为 true 的情况下不显示，其他情况都显示
   */
  showSwitcher: {
    type: Boolean,
    default: void 0
  }
}, Ga = {
  ...ql,
  ...Ln,
  ...wn,
  /**
   * ---重写默认值---
   */
  size: {
    type: String,
    default: "small"
  },
  /**
   * ---重写默认值---
   */
  segmented: {
    type: [Object, Boolean],
    default: () => ({
      content: !0
    })
  }
}, fh = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  viewBox: "0 0 1024 1024"
}, ph = /* @__PURE__ */ le(
  "path",
  {
    d: "M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z",
    fill: "currentColor"
  },
  null,
  -1
  /* HOISTED */
), hh = [ph], mh = $({
  name: "CopyOutlined",
  render: function(t, r) {
    return ee(), be("svg", fh, hh);
  }
}), vh = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  viewBox: "0 0 1024 1024"
}, gh = /* @__PURE__ */ le(
  "path",
  {
    d: "M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z",
    fill: "currentColor"
  },
  null,
  -1
  /* HOISTED */
), yh = [gh], bh = $({
  name: "DeleteOutlined",
  render: function(t, r) {
    return ee(), be("svg", vh, yh);
  }
}), Ph = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  viewBox: "0 0 1024 1024"
}, wh = /* @__PURE__ */ le(
  "path",
  {
    d: "M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2L227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z",
    fill: "currentColor"
  },
  null,
  -1
  /* HOISTED */
), $h = [wh], Ha = $({
  name: "DownOutlined",
  render: function(t, r) {
    return ee(), be("svg", Ph, $h);
  }
}), xh = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  viewBox: "0 0 1024 1024"
}, Th = /* @__PURE__ */ le(
  "path",
  {
    d: "M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512C791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 0 0 0-51.5zm-63.57-320.64L836 122.88a8 8 0 0 0-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 0 0 0 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 0 0 0 11.31L155.17 889a8 8 0 0 0 11.31 0l712.15-712.12a8 8 0 0 0 0-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 0 0-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 0 1 146.2-106.69L401.31 546.2A112 112 0 0 1 396 512z",
    fill: "currentColor"
  },
  null,
  -1
  /* HOISTED */
), _h = /* @__PURE__ */ le(
  "path",
  {
    d: "M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 0 0 227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 0 1-112 112z",
    fill: "currentColor"
  },
  null,
  -1
  /* HOISTED */
), Sh = [Th, _h], Oh = $({
  name: "EyeInvisibleOutlined",
  render: function(t, r) {
    return ee(), be("svg", xh, Sh);
  }
}), Fh = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  viewBox: "0 0 1024 1024"
}, jh = /* @__PURE__ */ le(
  "path",
  {
    d: "M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3c7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176s176-78.8 176-176s-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112s112 50.1 112 112s-50.1 112-112 112z",
    fill: "currentColor"
  },
  null,
  -1
  /* HOISTED */
), Ah = [jh], Eh = $({
  name: "EyeOutlined",
  render: function(t, r) {
    return ee(), be("svg", Fh, Ah);
  }
}), Ch = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  viewBox: "0 0 1024 1024"
}, Mh = /* @__PURE__ */ le(
  "path",
  {
    d: "M391 240.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L200 146.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L280 333.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L401 410c5.1.6 9.5-3.7 8.9-8.9L391 240.9zm10.1 373.2L240.8 633c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L146.3 824a8.03 8.03 0 0 0 0 11.3l42.4 42.3c3.1 3.1 8.2 3.1 11.3 0L333.7 744l43.7 43.7A8.01 8.01 0 0 0 391 783l18.9-160.1c.6-5.1-3.7-9.4-8.8-8.8zm221.8-204.2L783.2 391c6.6-.8 9.4-8.9 4.7-13.6L744 333.6L877.7 200c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.3a8.03 8.03 0 0 0-11.3 0L690.3 279.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L614.1 401c-.6 5.2 3.7 9.5 8.8 8.9zM744 690.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L623 614c-5.1-.6-9.5 3.7-8.9 8.9L633 783.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L824 877.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L744 690.4z",
    fill: "currentColor"
  },
  null,
  -1
  /* HOISTED */
), Rh = [Mh], Dh = $({
  name: "FullscreenExitOutlined",
  render: function(t, r) {
    return ee(), be("svg", Ch, Rh);
  }
}), Ih = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  viewBox: "0 0 1024 1024"
}, kh = /* @__PURE__ */ le(
  "path",
  {
    d: "M290 236.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L169 160c-5.1-.6-9.5 3.7-8.9 8.9L179 329.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L370 423.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L290 236.4zm352.7 187.3c3.1 3.1 8.2 3.1 11.3 0l133.7-133.6l43.7 43.7a8.01 8.01 0 0 0 13.6-4.7L863.9 169c.6-5.1-3.7-9.5-8.9-8.9L694.8 179c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L600.3 370a8.03 8.03 0 0 0 0 11.3l42.4 42.4zM845 694.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L654 600.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L734 787.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L855 864c5.1.6 9.5-3.7 8.9-8.9L845 694.9zm-463.7-94.6a8.03 8.03 0 0 0-11.3 0L236.3 733.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L160.1 855c-.6 5.1 3.7 9.5 8.9 8.9L329.2 845c6.6-.8 9.4-8.9 4.7-13.6L290 787.6L423.7 654c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.4z",
    fill: "currentColor"
  },
  null,
  -1
  /* HOISTED */
), Bh = [kh], Vh = $({
  name: "FullscreenOutlined",
  render: function(t, r) {
    return ee(), be("svg", Ih, Bh);
  }
}), Lh = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  viewBox: "0 0 1024 1024"
}, Nh = /* @__PURE__ */ le(
  "path",
  {
    d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372s372 166.6 372 372s-166.6 372-372 372z",
    fill: "currentColor"
  },
  null,
  -1
  /* HOISTED */
), Uh = /* @__PURE__ */ le(
  "path",
  {
    d: "M464 336a48 48 0 1 0 96 0a48 48 0 1 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z",
    fill: "currentColor"
  },
  null,
  -1
  /* HOISTED */
), zh = [Nh, Uh], Ya = $({
  name: "InfoCircleOutlined",
  render: function(t, r) {
    return ee(), be("svg", Lh, zh);
  }
}), Kh = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  viewBox: "0 0 1024 1024"
}, Wh = /* @__PURE__ */ le(
  "defs",
  null,
  null,
  -1
  /* HOISTED */
), qh = /* @__PURE__ */ le(
  "path",
  {
    d: "M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z",
    fill: "currentColor"
  },
  null,
  -1
  /* HOISTED */
), Gh = /* @__PURE__ */ le(
  "path",
  {
    d: "M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z",
    fill: "currentColor"
  },
  null,
  -1
  /* HOISTED */
), Hh = [Wh, qh, Gh], Yh = $({
  name: "PlusOutlined",
  render: function(t, r) {
    return ee(), be("svg", Kh, Hh);
  }
}), Qh = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  viewBox: "0 0 1024 1024"
}, Xh = /* @__PURE__ */ le(
  "path",
  {
    d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372s372 166.6 372 372s-166.6 372-372 372z",
    fill: "currentColor"
  },
  null,
  -1
  /* HOISTED */
), Jh = /* @__PURE__ */ le(
  "path",
  {
    d: "M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7c-21.2 8.1-39.2 22.3-52.1 40.9c-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0 1 30.9-44.8c59-22.7 97.1-74.7 97.1-132.5c.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1 0 80 0a40 40 0 1 0-80 0z",
    fill: "currentColor"
  },
  null,
  -1
  /* HOISTED */
), Zh = [Xh, Jh], em = $({
  name: "QuestionCircleOutlined",
  render: function(t, r) {
    return ee(), be("svg", Qh, Zh);
  }
}), tm = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  viewBox: "0 0 1024 1024"
}, rm = /* @__PURE__ */ le(
  "path",
  {
    d: "M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 0 0 140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z",
    fill: "currentColor"
  },
  null,
  -1
  /* HOISTED */
), nm = [rm], Qa = $({
  name: "UpOutlined",
  render: function(t, r) {
    return ee(), be("svg", tm, nm);
  }
});
function jt(e, t) {
  const r = Object.keys(t);
  return y(() => Te(e, r));
}
function oe(e) {
  return function() {
    const t = () => {
    }, r = R(), n = /* @__PURE__ */ new Map(), o = new Proxy(r, {
      get(i, a) {
        if (n.has(a))
          return n.get(a);
        const l = s(t, a);
        return n.set(a, l), l;
      },
      has() {
        return !0;
      }
    });
    function s(i, a) {
      return new Proxy(i, {
        apply(l, u, c) {
          const p = r.value;
          return p ? Reflect.apply(p[a], u, c) : (console.warn(`[${e}]：instance does not exits!`), s(t, a));
        }
      });
    }
    return fr(() => {
      n.clear();
    }), [r, o];
  };
}
const om = "@css-render/vue3-ssr";
function sm(e, t) {
  return `<style cssr-id="${e}">
${t}
</style>`;
}
function am(e, t, r) {
  const { styles: n, ids: o } = r;
  o.has(e) || n !== null && (o.add(e), n.push(sm(e, t)));
}
const im = typeof document < "u";
function lm() {
  if (im)
    return;
  const e = ue(om, null);
  if (e !== null)
    return {
      adapter: (t, r) => am(t, r, e),
      context: e
    };
}
function wr(e, t, r) {
  const n = lm(), o = "naive-ui-style", s = ue("n-config-provider", null);
  if (r) {
    const i = () => {
      r.mount({
        id: t,
        head: !0,
        anchorMetaName: o,
        ssr: n,
        parent: s == null ? void 0 : s.styleMountTarget
      });
    };
    n ? i() : kl(i);
  }
  return y(() => {
    var i;
    return ((i = s == null ? void 0 : s.mergedThemeOverridesRef.value) == null ? void 0 : i[e]) ?? {};
  });
}
const um = /* @__PURE__ */ $({
  name: "ProFadeInExpandTransition",
  __name: "fade-in-expand-transition",
  props: {
    appear: Boolean,
    mode: String,
    onLeave: Function,
    onAfterLeave: Function,
    onAfterEnter: Function,
    width: Boolean,
    // reverse mode is only used in tree
    // it make it from expanded to collapsed after mounted
    reverse: Boolean
  },
  setup(e) {
    const t = e;
    function r(l) {
      t.width ? l.style.maxWidth = `${l.offsetWidth}px` : l.style.maxHeight = `${l.offsetHeight}px`, l.offsetWidth;
    }
    function n(l) {
      t.width ? l.style.maxWidth = "0" : l.style.maxHeight = "0", l.offsetWidth;
      const {
        onLeave: u
      } = t;
      u && u();
    }
    function o(l) {
      t.width ? l.style.maxWidth = "" : l.style.maxHeight = "";
      const {
        onAfterLeave: u
      } = t;
      u && u();
    }
    function s(l) {
      if (l.style.transition = "none", t.width) {
        const u = l.offsetWidth;
        l.style.maxWidth = "0", l.offsetWidth, l.style.transition = "", l.style.maxWidth = `${u}px`;
      } else if (t.reverse)
        l.style.maxHeight = `${l.offsetHeight}px`, l.offsetHeight, l.style.transition = "", l.style.maxHeight = "0";
      else {
        const u = l.offsetHeight;
        l.style.maxHeight = "0", l.offsetWidth, l.style.transition = "", l.style.maxHeight = `${u}px`;
      }
      l.offsetWidth;
    }
    function i(l) {
      var u;
      t.width ? l.style.maxWidth = "" : t.reverse || (l.style.maxHeight = ""), (u = t.onAfterEnter) == null || u.call(t);
    }
    const a = y(() => {
      const {
        width: l,
        mode: u,
        appear: c
      } = t;
      return {
        name: l ? "fade-in-width-expand-transition" : "fade-in-height-expand-transition",
        mode: u,
        appear: c,
        onEnter: s,
        onLeave: n,
        onAfterLeave: o,
        onAfterEnter: i,
        onBeforeLeave: r
      };
    });
    return (l, u) => (ee(), Ee(Bl, Pt(wt(V(a))), {
      default: ae(() => [We(l.$slots, "default")]),
      _: 3
    }, 16));
  }
});
function cm(e) {
  let t = 0;
  for (let r = 0; r < e.length; ++r)
    e[r] === "&" && ++t;
  return t;
}
const Xa = /\s*,(?![^(]*\))\s*/g, dm = /\s+/g;
function fm(e, t) {
  const r = [];
  return t.split(Xa).forEach((n) => {
    let o = cm(n);
    if (o) {
      if (o === 1) {
        e.forEach((i) => {
          r.push(n.replace("&", i));
        });
        return;
      }
    } else {
      e.forEach((i) => {
        r.push(
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          (i && i + " ") + n
        );
      });
      return;
    }
    let s = [
      n
    ];
    for (; o--; ) {
      const i = [];
      s.forEach((a) => {
        e.forEach((l) => {
          i.push(a.replace("&", l));
        });
      }), s = i;
    }
    s.forEach((i) => r.push(i));
  }), r;
}
function pm(e, t) {
  const r = [];
  return t.split(Xa).forEach((n) => {
    e.forEach((o) => {
      r.push((o && o + " ") + n);
    });
  }), r;
}
function hm(e) {
  let t = [""];
  return e.forEach((r) => {
    r = r && r.trim(), // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    r && (r.includes("&") ? t = fm(t, r) : t = pm(t, r));
  }), t.join(", ").replace(dm, " ");
}
function ss(e) {
  if (!e)
    return;
  const t = e.parentElement;
  t && t.removeChild(e);
}
function Nn(e, t) {
  return (t ?? document.head).querySelector(`style[cssr-id="${e}"]`);
}
function mm(e) {
  const t = document.createElement("style");
  return t.setAttribute("cssr-id", e), t;
}
function Zt(e) {
  return e ? /^\s*@(s|m)/.test(e) : !1;
}
const vm = /[A-Z]/g;
function Ja(e) {
  return e.replace(vm, (t) => "-" + t.toLowerCase());
}
function gm(e, t = "  ") {
  return typeof e == "object" && e !== null ? ` {
` + Object.entries(e).map((r) => t + `  ${Ja(r[0])}: ${r[1]};`).join(`
`) + `
` + t + "}" : `: ${e};`;
}
function ym(e, t, r) {
  return typeof e == "function" ? e({
    context: t.context,
    props: r
  }) : e;
}
function as(e, t, r, n) {
  if (!t)
    return "";
  const o = ym(t, r, n);
  if (!o)
    return "";
  if (typeof o == "string")
    return `${e} {
${o}
}`;
  const s = Object.keys(o);
  if (s.length === 0)
    return r.config.keepEmptyBlock ? e + ` {
}` : "";
  const i = e ? [
    e + " {"
  ] : [];
  return s.forEach((a) => {
    const l = o[a];
    if (a === "raw") {
      i.push(`
` + l + `
`);
      return;
    }
    a = Ja(a), l != null && i.push(`  ${a}${gm(l)}`);
  }), e && i.push("}"), i.join(`
`);
}
function an(e, t, r) {
  e && e.forEach((n) => {
    if (Array.isArray(n))
      an(n, t, r);
    else if (typeof n == "function") {
      const o = n(t);
      Array.isArray(o) ? an(o, t, r) : o && r(o);
    } else
      n && r(n);
  });
}
function Za(e, t, r, n, o) {
  const s = e.$;
  let i = "";
  if (!s || typeof s == "string")
    Zt(s) ? i = s : t.push(s);
  else if (typeof s == "function") {
    const u = s({
      context: n.context,
      props: o
    });
    Zt(u) ? i = u : t.push(u);
  } else if (s.before && s.before(n.context), !s.$ || typeof s.$ == "string")
    Zt(s.$) ? i = s.$ : t.push(s.$);
  else if (s.$) {
    const u = s.$({
      context: n.context,
      props: o
    });
    Zt(u) ? i = u : t.push(u);
  }
  const a = hm(t), l = as(a, e.props, n, o);
  i ? r.push(`${i} {`) : l.length && r.push(l), e.children && an(e.children, {
    context: n.context,
    props: o
  }, (u) => {
    if (typeof u == "string") {
      const c = as(a, { raw: u }, n, o);
      r.push(c);
    } else
      Za(u, t, r, n, o);
  }), t.pop(), i && r.push("}"), s && s.after && s.after(n.context);
}
function bm(e, t, r) {
  const n = [];
  return Za(e, [], n, t, r), n.join(`

`);
}
function Pm(e) {
  for (var t = 0, r, n = 0, o = e.length; o >= 4; ++n, o -= 4)
    r = e.charCodeAt(n) & 255 | (e.charCodeAt(++n) & 255) << 8 | (e.charCodeAt(++n) & 255) << 16 | (e.charCodeAt(++n) & 255) << 24, r = /* Math.imul(k, m): */
    (r & 65535) * 1540483477 + ((r >>> 16) * 59797 << 16), r ^= /* k >>> r: */
    r >>> 24, t = /* Math.imul(k, m): */
    (r & 65535) * 1540483477 + ((r >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
  switch (o) {
    case 3:
      t ^= (e.charCodeAt(n + 2) & 255) << 16;
    case 2:
      t ^= (e.charCodeAt(n + 1) & 255) << 8;
    case 1:
      t ^= e.charCodeAt(n) & 255, t = /* Math.imul(h, m): */
      (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
  }
  return t ^= t >>> 13, t = /* Math.imul(h, m): */
  (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16), ((t ^ t >>> 15) >>> 0).toString(36);
}
typeof window < "u" && (window.__cssrContext = {});
function wm(e, t, r, n) {
  const { els: o } = t;
  if (r === void 0)
    o.forEach(ss), t.els = [];
  else {
    const s = Nn(r, n);
    s && o.includes(s) && (ss(s), t.els = o.filter((i) => i !== s));
  }
}
function is(e, t) {
  e.push(t);
}
function $m(e, t, r, n, o, s, i, a, l) {
  let u;
  if (r === void 0 && (u = t.render(n), r = Pm(u)), l) {
    l.adapter(r, u ?? t.render(n));
    return;
  }
  a === void 0 && (a = document.head);
  const c = Nn(r, a);
  if (c !== null && !s)
    return c;
  const p = c ?? mm(r);
  if (u === void 0 && (u = t.render(n)), p.textContent = u, c !== null)
    return c;
  if (i) {
    const f = a.querySelector(`meta[name="${i}"]`);
    if (f)
      return a.insertBefore(p, f), is(t.els, p), p;
  }
  return o ? a.insertBefore(p, a.querySelector("style, link")) : a.appendChild(p), is(t.els, p), p;
}
function xm(e) {
  return bm(this, this.instance, e);
}
function Tm(e = {}) {
  const { id: t, ssr: r, props: n, head: o = !1, force: s = !1, anchorMetaName: i, parent: a } = e;
  return $m(this.instance, this, t, n, o, s, i, a, r);
}
function _m(e = {}) {
  const { id: t, parent: r } = e;
  wm(this.instance, this, t, r);
}
const er = function(e, t, r, n) {
  return {
    instance: e,
    $: t,
    props: r,
    children: n,
    els: [],
    render: xm,
    mount: Tm,
    unmount: _m
  };
}, Sm = function(e, t, r, n) {
  return Array.isArray(t) ? er(e, { $: null }, null, t) : Array.isArray(r) ? er(e, t, null, r) : Array.isArray(n) ? er(e, t, r, n) : er(e, t, r, null);
};
function Om(e = {}) {
  const t = {
    c: (...r) => Sm(t, ...r),
    use: (r, ...n) => r.install(t, ...n),
    find: Nn,
    context: {},
    config: e
  };
  return t;
}
function Fm(e) {
  let t = ".", r = "__", n = "--", o;
  if (e) {
    let d = e.blockPrefix;
    d && (t = d), d = e.elementPrefix, d && (r = d), d = e.modifierPrefix, d && (n = d);
  }
  const s = {
    install(d) {
      o = d.c;
      const v = d.context;
      v.bem = {}, v.bem.b = null, v.bem.els = null;
    }
  };
  function i(d) {
    let v, b;
    return {
      before(g) {
        v = g.bem.b, b = g.bem.els, g.bem.els = null;
      },
      after(g) {
        g.bem.b = v, g.bem.els = b;
      },
      $({ context: g, props: w }) {
        return d = typeof d == "string" ? d : d({ context: g, props: w }), g.bem.b = d, `${(w == null ? void 0 : w.bPrefix) || t}${g.bem.b}`;
      }
    };
  }
  function a(d) {
    let v;
    return {
      before(b) {
        v = b.bem.els;
      },
      after(b) {
        b.bem.els = v;
      },
      $({ context: b, props: g }) {
        return d = typeof d == "string" ? d : d({ context: b, props: g }), b.bem.els = d.split(",").map((w) => w.trim()), b.bem.els.map((w) => `${(g == null ? void 0 : g.bPrefix) || t}${b.bem.b}${r}${w}`).join(", ");
      }
    };
  }
  function l(d) {
    return {
      $({ context: v, props: b }) {
        d = typeof d == "string" ? d : d({ context: v, props: b });
        const g = d.split(",").map((_) => _.trim());
        function w(_) {
          return g.map((j) => `&${(b == null ? void 0 : b.bPrefix) || t}${v.bem.b}${_ !== void 0 ? `${r}${_}` : ""}${n}${j}`).join(", ");
        }
        const x = v.bem.els;
        if (x !== null) {
          if (process.env.NODE_ENV !== "production" && x.length >= 2)
            throw Error(`[css-render/plugin-bem]: m(${d}) is invalid, using modifier inside multiple elements is not allowed`);
          return w(x[0]);
        } else
          return w();
      }
    };
  }
  function u(d) {
    return {
      $({ context: v, props: b }) {
        d = typeof d == "string" ? d : d({ context: v, props: b });
        const g = v.bem.els;
        if (process.env.NODE_ENV !== "production" && g !== null && g.length >= 2)
          throw Error(`[css-render/plugin-bem]: notM(${d}) is invalid, using modifier inside multiple elements is not allowed`);
        return `&:not(${(b == null ? void 0 : b.bPrefix) || t}${v.bem.b}${g !== null && g.length > 0 ? `${r}${g[0]}` : ""}${n}${d})`;
      }
    };
  }
  return Object.assign(s, {
    cB: (...d) => o(i(d[0]), d[1], d[2]),
    cE: (...d) => o(a(d[0]), d[1], d[2]),
    cM: (...d) => o(l(d[0]), d[1], d[2]),
    cNotM: (...d) => o(u(d[0]), d[1], d[2])
  }), s;
}
const jm = "n", Am = `.${jm}-`, Em = "__", Cm = "--", ei = Om(), Mm = Fm({
  blockPrefix: Am,
  elementPrefix: Em,
  modifierPrefix: Cm
});
ei.use(Mm);
const { c: tr, find: b$ } = ei, Rm = "cubic-bezier(.4, 0, 1, 1)", Dm = "cubic-bezier(0, 0, .2, 1)", Ae = "cubic-bezier(.4, 0, .2, 1)";
function Im({
  overflow: e = "hidden",
  duration: t = ".3s",
  originalTransition: r = "",
  leavingDelay: n = "0s",
  foldPadding: o = !1,
  enterToProps: s = void 0,
  leaveToProps: i = void 0,
  reverse: a = !1
} = {}) {
  const l = a ? "leave" : "enter", u = a ? "enter" : "leave";
  return [
    tr(`&.fade-in-height-expand-transition-${u}-from,
      &.fade-in-height-expand-transition-${l}-to`, {
      ...s,
      opacity: 1
    }),
    tr(`&.fade-in-height-expand-transition-${u}-to,
      &.fade-in-height-expand-transition-${l}-from`, {
      ...i,
      opacity: 0,
      marginTop: "0 !important",
      marginBottom: "0 !important",
      paddingTop: o ? "0 !important" : void 0,
      paddingBottom: o ? "0 !important" : void 0
    }),
    tr(`&.fade-in-height-expand-transition-${u}-active`, `
      overflow: ${e};
      transition:
        max-height ${t} ${Ae} ${n},
        opacity ${t} ${Dm} ${n},
        margin-top ${t} ${Ae} ${n},
        margin-bottom ${t} ${Ae} ${n},
        padding-top ${t} ${Ae} ${n},
        padding-bottom ${t} ${Ae} ${n}
        ${r ? `,${r}` : ""}
    `),
    tr(`&.fade-in-height-expand-transition-${l}-active`, `
      overflow: ${e};
      transition:
        max-height ${t} ${Ae},
        opacity ${t} ${Rm},
        margin-top ${t} ${Ae},
        margin-bottom ${t} ${Ae},
        padding-top ${t} ${Ae},
        padding-bottom ${t} ${Ae}
        ${r ? `,${r}` : ""}
    `)
  ];
}
const km = Vt("pro-collapse-transition", {
  width: "100%"
}, [
  Im()
]), Bm = /* @__PURE__ */ $({
  name: "ProCollapseTransition",
  inheritAttrs: !1,
  __name: "index",
  props: wn,
  setup(e) {
    return wr("ProCollapseTransition", "pro-collapse-transition", km), (t, r) => (ee(), Ee(um, {
      appear: t.$props.appear
    }, {
      default: ae(() => [ra(le("div", P(t.$attrs, {
        class: "n-pro-collapse-transition"
      }), [We(t.$slots, "default")], 16), [[na, t.$props.show]])]),
      _: 3
    }, 8, ["appear"]));
  }
}), ti = oe("ProForm"), Un = {
  /**
   * 表单是否切换为禁用状态
   * 支持表达式
   */
  disabled: {
    type: [Boolean, String],
    default: !1
  },
  /**
   * 表单是否切换为只读状态，优先级低于 ProFormItem 的 readonly
   * 支持表达式
   */
  readonly: {
    type: [Boolean, String],
    default: void 0
  },
  /**
   * 表达式可以读取到的作用域，浅合并，优先级比全局高
   */
  scope: Object,
  /**
   * 表单初始值
   */
  initialValues: Object,
  /**
   * 校验行为，为 popover 时验证不通过会通过 popover 进行提示
   */
  validateBehavior: String,
  /**
   * 验证不通过时传递的属性，只对 popover 生效
   */
  validateBehaviorProps: Object,
  /**
   * 数据验证成功后回调事件
   */
  onSubmit: Function,
  /**
   * 数据验证失败后回调事件
   */
  onSubmitFailed: Function,
  /**
   * 字段值发生变化时触发的回调函数
   */
  onFieldValueChange: {
    type: Function
  },
  /**
   * 依赖项的值发生变化时触发的回调函数
   */
  onDependenciesValueChange: {
    type: Function
  }
}, $r = {
  /**
   * 继承原来的属性
   * 剔除 model, 表单值内部管理
   * 剔除 rules, 校验规则内部自动生成或在 pro-form-item 上书写
   * 剔除 disabled，重写属性，支持表达式
   */
  ...Te(Gl, ["model", "disabled", "rules"]),
  ...Un
}, zn = Symbol("proFormInst"), Kn = Symbol("proForm");
function ri(e) {
  _e(zn, e);
}
function xr() {
  return ue(zn);
}
function Tr() {
  return ue(Kn, {
    readonly: void 0,
    validateBehavior: R(void 0),
    validateBehaviorProps: R(void 0),
    addValidateErrors: It,
    clearValidateResults: It,
    addValidateWarnings: It
  });
}
const Xe = "x-field-extra-key", te = {
  /**
   * 字段路径
   */
  path: String,
  /**
   * 默认值，优先级最低，用来兜底
   */
  defaultValue: void 0,
  /**
   * 初始值，优先级大于 Form 组件的 initialValues
   */
  initialValue: void 0,
  /**
   * 透传给表单控件的 placeholder
   */
  placeholder: [String, Array],
  /**
   * 传递给表单控件的 props
   */
  fieldProps: Object,
  /**
   * 字段被隐藏或删除时是否还保留值
   */
  preserve: {
    type: Boolean,
    default: !0
  },
  /**
   * 表单值，优先级大于 initialValue，支持表达式
   */
  value: void 0,
  /**
   * 是否显示，支持表达式
   */
  visible: {
    type: [Boolean, String],
    default: void 0
  },
  /**
   * 是否隐藏，支持表达式
   */
  hidden: {
    type: [Boolean, String],
    default: void 0
  },
  /**
   * 字段的依赖项，当依赖项的值发生变化时，会触发校验
   */
  dependencies: [String, Object, Array],
  /**
   * 后置状态钩子，可以二次修改数据，返回的值为表单的最终结果值
   * @param val 当前表单值
   * @returns 表单结果值
   */
  postState: Function,
  /**
   * 表单值发生变化后触发的回调函数
   * @param val 当前表单值
   */
  onChange: Function,
  /**
   * 提交时转化值，返回为一个对象会和当前层级所在对象深度合并，返回非对象会改变原有值
   */
  transform: Function,
  /**
   * 显示在 label 右边的提示
   */
  tooltip: [String, Array],
  /**
   * 是否为列表，会根据此字段判断使用 createField 还是 createArrayField
   */
  isList: {
    type: Boolean,
    default: void 0
  },
  /**
   * 用于表示值的类型是属于哪个组件的
   */
  valueType: String,
  /**
   * 用于 v-model:xxx 的名称，默认为 'value'，用于支持 'v-model:value'
   */
  valueModelName: {
    type: String,
    default: "value"
  },
  /**
   * 校验行为，为 popover 时验证不通过会通过 popover 进行提示
   */
  validateBehavior: String,
  /**
   * 验证不通过时传递的属性，只对 popover 生效
   */
  validateBehaviorProps: Object,
  /**
   * 精简模式，不包装 formItem
   */
  simple: {
    type: [Boolean, String],
    default: !1
  },
  /**
   * 是否只读
   */
  readonly: {
    type: [Boolean, String],
    default: void 0
  },
  /**
   * 表单项前缀
   */
  addonBefore: String,
  /**
   * 表单项后缀
   */
  addonAfter: String,
  /**
   * --------NFormItem 的 props-----------
   */
  label: String,
  title: String,
  // 同 label，为了工程化统一
  rulePath: String,
  feedback: String,
  feedbackClass: String,
  first: [Boolean, String],
  required: [Boolean, String],
  labelPlacement: String,
  labelProps: [Object],
  size: String,
  ignorePathChange: [Boolean, String],
  labelWidth: [Number, String],
  labelAlign: String,
  rule: [Object, Array],
  labelStyle: [String, Object],
  feedbackStyle: [String, Object],
  validationStatus: String,
  requireMarkPlacement: String,
  showRequireMark: {
    type: [Boolean, String],
    default: void 0
  },
  showFeedback: {
    type: [Boolean, String],
    default: void 0
  },
  showLabel: {
    type: [Boolean, String],
    default: void 0
  }
  /**
   * --------NFormItem 的 props-----------
   */
};
var T = /* @__PURE__ */ ((e) => (e.RATE = "rate", e.INPUT = "input", e.DIGIT = "digit", e.SLIDER = "slider", e.SWITCH = "switch", e.UPLOAD = "upload", e.SELECT = "select", e.MENTION = "mention", e.CASCADER = "cascader", e.PASSWORD = "password", e.TEXTAREA = "textarea", e.CHECKBOX = "checkbox", e.TRANSFER = "transfer", e.TREE_SELECT = "tree-select", e.RADIO_GROUP = "radio-group", e.COLOR_PICKER = "color-picker", e.DYNAMIC_TAGS = "dynamic-tags", e.AUTO_COMPLETE = "auto-complete", e.CHECKBOX_GROUP = "checkbox-group", e.DATE = "date", e.TIME = "time", e.DATE_TIME = "date-time", e.DATE_YEAR = "date-year", e.DATE_WEEK = "date-week", e.DATE_MONTH = "date-month", e.DATE_RANGE = "date-range", e.DATE_QUARTER = "date-quarter", e.DATE_TIME_RANGE = "date-time-range", e.DATE_YEAR_RANGE = "date-year-range", e.DATE_MONTH_RANGE = "date-month-range", e.DATE_QUARTER_RANGE = "date-quarter-range", e.FORM_LIST = "form-list", e))(T || {});
function _r(e) {
  return Vl() ? (fr(e), !0) : !1;
}
function at() {
  const e = /* @__PURE__ */ new Set(), t = (o) => {
    e.delete(o);
  };
  return {
    on: (o) => {
      e.add(o);
      const s = () => t(o);
      return _r(s), {
        off: s
      };
    },
    off: t,
    trigger: (...o) => Promise.all(Array.from(e).map((s) => s(...o)))
  };
}
function Wn(e) {
  return typeof e == "function" ? e() : V(e);
}
const Sr = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const Vm = (e) => typeof e < "u", Lm = Object.prototype.toString, Nm = (e) => Lm.call(e) === "[object Object]", nr = () => {
}, Um = /* @__PURE__ */ zm();
function zm() {
  var e, t;
  return Sr && ((e = window == null ? void 0 : window.navigator) == null ? void 0 : e.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((t = window == null ? void 0 : window.navigator) == null ? void 0 : t.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent));
}
function Km(e, t, r = {}) {
  const {
    immediate: n = !0
  } = r, o = R(!1);
  let s = null;
  function i() {
    s && (clearTimeout(s), s = null);
  }
  function a() {
    o.value = !1, i();
  }
  function l(...u) {
    i(), o.value = !0, s = setTimeout(() => {
      o.value = !1, s = null, e(...u);
    }, Wn(t));
  }
  return n && (o.value = !0, Sr && l()), _r(a), {
    isPending: Ll(o),
    start: l,
    stop: a
  };
}
function Wm(e, t, r) {
  return J(
    e,
    t,
    {
      ...r,
      immediate: !0
    }
  );
}
function nt(e) {
  var t;
  const r = Wn(e);
  return (t = r == null ? void 0 : r.$el) != null ? t : r;
}
const ni = Sr ? window : void 0, oi = Sr ? window.document : void 0;
function Ce(...e) {
  let t, r, n, o;
  if (typeof e[0] == "string" || Array.isArray(e[0]) ? ([r, n, o] = e, t = ni) : [t, r, n, o] = e, !t)
    return nr;
  Array.isArray(r) || (r = [r]), Array.isArray(n) || (n = [n]);
  const s = [], i = () => {
    s.forEach((c) => c()), s.length = 0;
  }, a = (c, p, f, m) => (c.addEventListener(p, f, m), () => c.removeEventListener(p, f, m)), l = J(
    () => [nt(t), Wn(o)],
    ([c, p]) => {
      if (i(), !c)
        return;
      const f = Nm(p) ? { ...p } : p;
      s.push(
        ...r.flatMap((m) => n.map((d) => a(c, m, d, f)))
      );
    },
    { immediate: !0, flush: "post" }
  ), u = () => {
    l(), i();
  };
  return _r(u), u;
}
let ls = !1;
function qm(e, t, r = {}) {
  const { window: n = ni, ignore: o = [], capture: s = !0, detectIframe: i = !1 } = r;
  if (!n)
    return nr;
  Um && !ls && (ls = !0, Array.from(n.document.body.children).forEach((f) => f.addEventListener("click", nr)), n.document.documentElement.addEventListener("click", nr));
  let a = !0;
  const l = (f) => o.some((m) => {
    if (typeof m == "string")
      return Array.from(n.document.querySelectorAll(m)).some((d) => d === f.target || f.composedPath().includes(d));
    {
      const d = nt(m);
      return d && (f.target === d || f.composedPath().includes(d));
    }
  }), c = [
    Ce(n, "click", (f) => {
      const m = nt(e);
      if (!(!m || m === f.target || f.composedPath().includes(m))) {
        if (f.detail === 0 && (a = !l(f)), !a) {
          a = !0;
          return;
        }
        t(f);
      }
    }, { passive: !0, capture: s }),
    Ce(n, "pointerdown", (f) => {
      const m = nt(e);
      a = !l(f) && !!(m && !f.composedPath().includes(m));
    }, { passive: !0 }),
    i && Ce(n, "blur", (f) => {
      setTimeout(() => {
        var m;
        const d = nt(e);
        ((m = n.document.activeElement) == null ? void 0 : m.tagName) === "IFRAME" && !(d != null && d.contains(n.document.activeElement)) && t(f);
      }, 0);
    })
  ].filter(Boolean);
  return () => c.forEach((f) => f());
}
function si() {
  const e = R(!1), t = oa();
  return t && bn(() => {
    e.value = !0;
  }, t), e;
}
function Gm(e) {
  const t = si();
  return y(() => (t.value, !!e()));
}
function Hm(e) {
  return JSON.parse(JSON.stringify(e));
}
function Ym(e = {}) {
  const { document: t = oi } = e;
  if (!t)
    return R("visible");
  const r = R(t.visibilityState);
  return Ce(t, "visibilitychange", () => {
    r.value = t.visibilityState;
  }), r;
}
const us = [
  "fullscreenchange",
  "webkitfullscreenchange",
  "webkitendfullscreen",
  "mozfullscreenchange",
  "MSFullscreenChange"
];
function Qm(e, t = {}) {
  const {
    document: r = oi,
    autoExit: n = !1
  } = t, o = y(() => {
    var g;
    return (g = nt(e)) != null ? g : r == null ? void 0 : r.querySelector("html");
  }), s = R(!1), i = y(() => [
    "requestFullscreen",
    "webkitRequestFullscreen",
    "webkitEnterFullscreen",
    "webkitEnterFullScreen",
    "webkitRequestFullScreen",
    "mozRequestFullScreen",
    "msRequestFullscreen"
  ].find((g) => r && g in r || o.value && g in o.value)), a = y(() => [
    "exitFullscreen",
    "webkitExitFullscreen",
    "webkitExitFullScreen",
    "webkitCancelFullScreen",
    "mozCancelFullScreen",
    "msExitFullscreen"
  ].find((g) => r && g in r || o.value && g in o.value)), l = y(() => [
    "fullScreen",
    "webkitIsFullScreen",
    "webkitDisplayingFullscreen",
    "mozFullScreen",
    "msFullscreenElement"
  ].find((g) => r && g in r || o.value && g in o.value)), u = [
    "fullscreenElement",
    "webkitFullscreenElement",
    "mozFullScreenElement",
    "msFullscreenElement"
  ].find((g) => r && g in r), c = Gm(() => o.value && r && i.value !== void 0 && a.value !== void 0 && l.value !== void 0), p = () => u ? (r == null ? void 0 : r[u]) === o.value : !1, f = () => {
    if (l.value) {
      if (r && r[l.value] != null)
        return r[l.value];
      {
        const g = o.value;
        if ((g == null ? void 0 : g[l.value]) != null)
          return !!g[l.value];
      }
    }
    return !1;
  };
  async function m() {
    if (!(!c.value || !s.value)) {
      if (a.value)
        if ((r == null ? void 0 : r[a.value]) != null)
          await r[a.value]();
        else {
          const g = o.value;
          (g == null ? void 0 : g[a.value]) != null && await g[a.value]();
        }
      s.value = !1;
    }
  }
  async function d() {
    if (!c.value || s.value)
      return;
    f() && await m();
    const g = o.value;
    i.value && (g == null ? void 0 : g[i.value]) != null && (await g[i.value](), s.value = !0);
  }
  async function v() {
    await (s.value ? m() : d());
  }
  const b = () => {
    const g = f();
    (!g || g && p()) && (s.value = g);
  };
  return Ce(r, us, b, !1), Ce(() => nt(o), us, b, !1), n && _r(m), {
    isSupported: c,
    isFullscreen: s,
    enter: d,
    exit: m,
    toggle: v
  };
}
function ai(e, t, r, n = {}) {
  var o, s, i;
  const {
    clone: a = !1,
    passive: l = !1,
    eventName: u,
    deep: c = !1,
    defaultValue: p,
    shouldEmit: f
  } = n, m = oa(), d = (m == null ? void 0 : m.emit) || ((o = m == null ? void 0 : m.$emit) == null ? void 0 : o.bind(m)) || ((i = (s = m == null ? void 0 : m.proxy) == null ? void 0 : s.$emit) == null ? void 0 : i.bind(m == null ? void 0 : m.proxy));
  let v = u;
  t || (t = "modelValue"), v = v || `update:${t.toString()}`;
  const b = (x) => a ? typeof a == "function" ? a(x) : Hm(x) : x, g = () => Vm(e[t]) ? b(e[t]) : p, w = (x) => {
    f ? f(x) && d(v, x) : d(v, x);
  };
  if (l) {
    const x = g(), _ = R(x);
    let j = !1;
    return J(
      () => e[t],
      (F) => {
        j || (j = !0, _.value = b(F), ve(() => j = !1));
      }
    ), J(
      _,
      (F) => {
        !j && (F !== e[t] || c) && w(F);
      },
      { deep: c }
    ), _;
  } else
    return y({
      get() {
        return g();
      },
      set(x) {
        w(x);
      }
    });
}
var Xm = Object.defineProperty, Jm = (e, t, r) => t in e ? Xm(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, K = (e, t, r) => (Jm(e, typeof t != "symbol" ? t + "" : t, r), r);
const ii = Symbol("path"), li = Symbol("pathIndex");
function Zm(e) {
  _e(ii, e);
}
function ev(e) {
  _e(li, e);
}
function tv() {
  return ue(ii, []);
}
function rv() {
  return ue(li, -1);
}
var ui = typeof global == "object" && global && global.Object === Object && global, nv = typeof self == "object" && self && self.Object === Object && self, Ve = ui || nv || Function("return this")(), Je = Ve.Symbol, ci = Object.prototype, ov = ci.hasOwnProperty, sv = ci.toString, Mt = Je ? Je.toStringTag : void 0;
function av(e) {
  var t = ov.call(e, Mt), r = e[Mt];
  try {
    e[Mt] = void 0;
    var n = !0;
  } catch {
  }
  var o = sv.call(e);
  return n && (t ? e[Mt] = r : delete e[Mt]), o;
}
var iv = Object.prototype, lv = iv.toString;
function uv(e) {
  return lv.call(e);
}
var cv = "[object Null]", dv = "[object Undefined]", cs = Je ? Je.toStringTag : void 0;
function Le(e) {
  return e == null ? e === void 0 ? dv : cv : cs && cs in Object(e) ? av(e) : uv(e);
}
function Oe(e) {
  return e != null && typeof e == "object";
}
var fv = "[object Symbol]";
function Or(e) {
  return typeof e == "symbol" || Oe(e) && Le(e) == fv;
}
function di(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, o = Array(n); ++r < n; )
    o[r] = t(e[r], r, e);
  return o;
}
var ce = Array.isArray, pv = 1 / 0, ds = Je ? Je.prototype : void 0, fs = ds ? ds.toString : void 0;
function fi(e) {
  if (typeof e == "string")
    return e;
  if (ce(e))
    return di(e, fi) + "";
  if (Or(e))
    return fs ? fs.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -pv ? "-0" : t;
}
function Ie(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
function pi(e) {
  return e;
}
var hv = "[object AsyncFunction]", mv = "[object Function]", vv = "[object GeneratorFunction]", gv = "[object Proxy]";
function Fr(e) {
  if (!Ie(e))
    return !1;
  var t = Le(e);
  return t == mv || t == vv || t == hv || t == gv;
}
var Wr = Ve["__core-js_shared__"], ps = function() {
  var e = /[^.]+$/.exec(Wr && Wr.keys && Wr.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function yv(e) {
  return !!ps && ps in e;
}
var bv = Function.prototype, Pv = bv.toString;
function ht(e) {
  if (e != null) {
    try {
      return Pv.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var wv = /[\\^$.*+?()[\]{}|]/g, $v = /^\[object .+?Constructor\]$/, xv = Function.prototype, Tv = Object.prototype, _v = xv.toString, Sv = Tv.hasOwnProperty, Ov = RegExp(
  "^" + _v.call(Sv).replace(wv, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Fv(e) {
  if (!Ie(e) || yv(e))
    return !1;
  var t = Fr(e) ? Ov : $v;
  return t.test(ht(e));
}
function jv(e, t) {
  return e == null ? void 0 : e[t];
}
function mt(e, t) {
  var r = jv(e, t);
  return Fv(r) ? r : void 0;
}
var ln = mt(Ve, "WeakMap"), hs = Object.create, Av = /* @__PURE__ */ function() {
  function e() {
  }
  return function(t) {
    if (!Ie(t))
      return {};
    if (hs)
      return hs(t);
    e.prototype = t;
    var r = new e();
    return e.prototype = void 0, r;
  };
}();
function Ev(e, t, r) {
  switch (r.length) {
    case 0:
      return e.call(t);
    case 1:
      return e.call(t, r[0]);
    case 2:
      return e.call(t, r[0], r[1]);
    case 3:
      return e.call(t, r[0], r[1], r[2]);
  }
  return e.apply(t, r);
}
function hi(e, t) {
  var r = -1, n = e.length;
  for (t || (t = Array(n)); ++r < n; )
    t[r] = e[r];
  return t;
}
var Cv = 800, Mv = 16, Rv = Date.now;
function Dv(e) {
  var t = 0, r = 0;
  return function() {
    var n = Rv(), o = Mv - (n - r);
    if (r = n, o > 0) {
      if (++t >= Cv)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
function Iv(e) {
  return function() {
    return e;
  };
}
var ir = function() {
  try {
    var e = mt(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), kv = ir ? function(e, t) {
  return ir(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: Iv(t),
    writable: !0
  });
} : pi, Bv = Dv(kv);
function Vv(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n && t(e[r], r, e) !== !1; )
    ;
  return e;
}
var Lv = 9007199254740991, Nv = /^(?:0|[1-9]\d*)$/;
function jr(e, t) {
  var r = typeof e;
  return t = t ?? Lv, !!t && (r == "number" || r != "symbol" && Nv.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function qn(e, t, r) {
  t == "__proto__" && ir ? ir(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r;
}
function Ar(e, t) {
  return e === t || e !== e && t !== t;
}
var Uv = Object.prototype, zv = Uv.hasOwnProperty;
function Gn(e, t, r) {
  var n = e[t];
  (!(zv.call(e, t) && Ar(n, r)) || r === void 0 && !(t in e)) && qn(e, t, r);
}
function Kv(e, t, r, n) {
  var o = !r;
  r || (r = {});
  for (var s = -1, i = t.length; ++s < i; ) {
    var a = t[s], l = void 0;
    l === void 0 && (l = e[a]), o ? qn(r, a, l) : Gn(r, a, l);
  }
  return r;
}
var ms = Math.max;
function Wv(e, t, r) {
  return t = ms(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var n = arguments, o = -1, s = ms(n.length - t, 0), i = Array(s); ++o < s; )
      i[o] = n[t + o];
    o = -1;
    for (var a = Array(t + 1); ++o < t; )
      a[o] = n[o];
    return a[t] = r(i), Ev(e, this, a);
  };
}
function qv(e, t) {
  return Bv(Wv(e, t, pi), e + "");
}
var Gv = 9007199254740991;
function Hn(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Gv;
}
function Er(e) {
  return e != null && Hn(e.length) && !Fr(e);
}
function Hv(e, t, r) {
  if (!Ie(r))
    return !1;
  var n = typeof t;
  return (n == "number" ? Er(r) && jr(t, r.length) : n == "string" && t in r) ? Ar(r[t], e) : !1;
}
function Yv(e) {
  return qv(function(t, r) {
    var n = -1, o = r.length, s = o > 1 ? r[o - 1] : void 0, i = o > 2 ? r[2] : void 0;
    for (s = e.length > 3 && typeof s == "function" ? (o--, s) : void 0, i && Hv(r[0], r[1], i) && (s = o < 3 ? void 0 : s, o = 1), t = Object(t); ++n < o; ) {
      var a = r[n];
      a && e(t, a, n, s);
    }
    return t;
  });
}
var Qv = Object.prototype;
function Yn(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || Qv;
  return e === r;
}
function Xv(e, t) {
  for (var r = -1, n = Array(e); ++r < e; )
    n[r] = t(r);
  return n;
}
var Jv = "[object Arguments]";
function vs(e) {
  return Oe(e) && Le(e) == Jv;
}
var mi = Object.prototype, Zv = mi.hasOwnProperty, eg = mi.propertyIsEnumerable, lr = vs(/* @__PURE__ */ function() {
  return arguments;
}()) ? vs : function(e) {
  return Oe(e) && Zv.call(e, "callee") && !eg.call(e, "callee");
};
function tg() {
  return !1;
}
var vi = typeof exports == "object" && exports && !exports.nodeType && exports, gs = vi && typeof module == "object" && module && !module.nodeType && module, rg = gs && gs.exports === vi, ys = rg ? Ve.Buffer : void 0, ng = ys ? ys.isBuffer : void 0, Qn = ng || tg, og = "[object Arguments]", sg = "[object Array]", ag = "[object Boolean]", ig = "[object Date]", lg = "[object Error]", ug = "[object Function]", cg = "[object Map]", dg = "[object Number]", fg = "[object Object]", pg = "[object RegExp]", hg = "[object Set]", mg = "[object String]", vg = "[object WeakMap]", gg = "[object ArrayBuffer]", yg = "[object DataView]", bg = "[object Float32Array]", Pg = "[object Float64Array]", wg = "[object Int8Array]", $g = "[object Int16Array]", xg = "[object Int32Array]", Tg = "[object Uint8Array]", _g = "[object Uint8ClampedArray]", Sg = "[object Uint16Array]", Og = "[object Uint32Array]", Q = {};
Q[bg] = Q[Pg] = Q[wg] = Q[$g] = Q[xg] = Q[Tg] = Q[_g] = Q[Sg] = Q[Og] = !0;
Q[og] = Q[sg] = Q[gg] = Q[ag] = Q[yg] = Q[ig] = Q[lg] = Q[ug] = Q[cg] = Q[dg] = Q[fg] = Q[pg] = Q[hg] = Q[mg] = Q[vg] = !1;
function Fg(e) {
  return Oe(e) && Hn(e.length) && !!Q[Le(e)];
}
function Cr(e) {
  return function(t) {
    return e(t);
  };
}
var gi = typeof exports == "object" && exports && !exports.nodeType && exports, Bt = gi && typeof module == "object" && module && !module.nodeType && module, jg = Bt && Bt.exports === gi, qr = jg && ui.process, Ze = function() {
  try {
    var e = Bt && Bt.require && Bt.require("util").types;
    return e || qr && qr.binding && qr.binding("util");
  } catch {
  }
}(), bs = Ze && Ze.isTypedArray, yi = bs ? Cr(bs) : Fg, Ag = Object.prototype, Eg = Ag.hasOwnProperty;
function bi(e, t) {
  var r = ce(e), n = !r && lr(e), o = !r && !n && Qn(e), s = !r && !n && !o && yi(e), i = r || n || o || s, a = i ? Xv(e.length, String) : [], l = a.length;
  for (var u in e)
    (t || Eg.call(e, u)) && !(i && // Safari 9 has enumerable `arguments.length` in strict mode.
    (u == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    o && (u == "offset" || u == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    s && (u == "buffer" || u == "byteLength" || u == "byteOffset") || // Skip index properties.
    jr(u, l))) && a.push(u);
  return a;
}
function Pi(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var Cg = Pi(Object.keys, Object), Mg = Object.prototype, Rg = Mg.hasOwnProperty;
function Dg(e) {
  if (!Yn(e))
    return Cg(e);
  var t = [];
  for (var r in Object(e))
    Rg.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
function Ig(e) {
  return Er(e) ? bi(e) : Dg(e);
}
function kg(e) {
  var t = [];
  if (e != null)
    for (var r in Object(e))
      t.push(r);
  return t;
}
var Bg = Object.prototype, Vg = Bg.hasOwnProperty;
function Lg(e) {
  if (!Ie(e))
    return kg(e);
  var t = Yn(e), r = [];
  for (var n in e)
    n == "constructor" && (t || !Vg.call(e, n)) || r.push(n);
  return r;
}
function wi(e) {
  return Er(e) ? bi(e, !0) : Lg(e);
}
var Ng = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Ug = /^\w*$/;
function zg(e, t) {
  if (ce(e))
    return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || Or(e) ? !0 : Ug.test(e) || !Ng.test(e) || t != null && e in Object(t);
}
var Kt = mt(Object, "create");
function Kg() {
  this.__data__ = Kt ? Kt(null) : {}, this.size = 0;
}
function Wg(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var qg = "__lodash_hash_undefined__", Gg = Object.prototype, Hg = Gg.hasOwnProperty;
function Yg(e) {
  var t = this.__data__;
  if (Kt) {
    var r = t[e];
    return r === qg ? void 0 : r;
  }
  return Hg.call(t, e) ? t[e] : void 0;
}
var Qg = Object.prototype, Xg = Qg.hasOwnProperty;
function Jg(e) {
  var t = this.__data__;
  return Kt ? t[e] !== void 0 : Xg.call(t, e);
}
var Zg = "__lodash_hash_undefined__";
function ey(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = Kt && t === void 0 ? Zg : t, this;
}
function it(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
it.prototype.clear = Kg;
it.prototype.delete = Wg;
it.prototype.get = Yg;
it.prototype.has = Jg;
it.prototype.set = ey;
function ty() {
  this.__data__ = [], this.size = 0;
}
function Mr(e, t) {
  for (var r = e.length; r--; )
    if (Ar(e[r][0], t))
      return r;
  return -1;
}
var ry = Array.prototype, ny = ry.splice;
function oy(e) {
  var t = this.__data__, r = Mr(t, e);
  if (r < 0)
    return !1;
  var n = t.length - 1;
  return r == n ? t.pop() : ny.call(t, r, 1), --this.size, !0;
}
function sy(e) {
  var t = this.__data__, r = Mr(t, e);
  return r < 0 ? void 0 : t[r][1];
}
function ay(e) {
  return Mr(this.__data__, e) > -1;
}
function iy(e, t) {
  var r = this.__data__, n = Mr(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
}
function He(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
He.prototype.clear = ty;
He.prototype.delete = oy;
He.prototype.get = sy;
He.prototype.has = ay;
He.prototype.set = iy;
var Wt = mt(Ve, "Map");
function ly() {
  this.size = 0, this.__data__ = {
    hash: new it(),
    map: new (Wt || He)(),
    string: new it()
  };
}
function uy(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function Rr(e, t) {
  var r = e.__data__;
  return uy(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
function cy(e) {
  var t = Rr(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function dy(e) {
  return Rr(this, e).get(e);
}
function fy(e) {
  return Rr(this, e).has(e);
}
function py(e, t) {
  var r = Rr(this, e), n = r.size;
  return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
}
function tt(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
tt.prototype.clear = ly;
tt.prototype.delete = cy;
tt.prototype.get = dy;
tt.prototype.has = fy;
tt.prototype.set = py;
var hy = "Expected a function";
function Xn(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(hy);
  var r = function() {
    var n = arguments, o = t ? t.apply(this, n) : n[0], s = r.cache;
    if (s.has(o))
      return s.get(o);
    var i = e.apply(this, n);
    return r.cache = s.set(o, i) || s, i;
  };
  return r.cache = new (Xn.Cache || tt)(), r;
}
Xn.Cache = tt;
var my = 500;
function vy(e) {
  var t = Xn(e, function(n) {
    return r.size === my && r.clear(), n;
  }), r = t.cache;
  return t;
}
var gy = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, yy = /\\(\\)?/g, $i = vy(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(gy, function(r, n, o, s) {
    t.push(o ? s.replace(yy, "$1") : n || r);
  }), t;
});
function xi(e) {
  return e == null ? "" : fi(e);
}
function Dr(e, t) {
  return ce(e) ? e : zg(e, t) ? [e] : $i(xi(e));
}
var by = 1 / 0;
function Qt(e) {
  if (typeof e == "string" || Or(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -by ? "-0" : t;
}
function Ti(e, t) {
  t = Dr(t, e);
  for (var r = 0, n = t.length; e != null && r < n; )
    e = e[Qt(t[r++])];
  return r && r == n ? e : void 0;
}
function lt(e, t, r) {
  var n = e == null ? void 0 : Ti(e, t);
  return n === void 0 ? r : n;
}
function Py(e, t) {
  for (var r = -1, n = t.length, o = e.length; ++r < n; )
    e[o + r] = t[r];
  return e;
}
var _i = Pi(Object.getPrototypeOf, Object), wy = "[object Object]", $y = Function.prototype, xy = Object.prototype, Si = $y.toString, Ty = xy.hasOwnProperty, _y = Si.call(Object);
function Jn(e) {
  if (!Oe(e) || Le(e) != wy)
    return !1;
  var t = _i(e);
  if (t === null)
    return !0;
  var r = Ty.call(t, "constructor") && t.constructor;
  return typeof r == "function" && r instanceof r && Si.call(r) == _y;
}
function Sy(e, t, r) {
  var n = -1, o = e.length;
  t < 0 && (t = -t > o ? 0 : o + t), r = r > o ? o : r, r < 0 && (r += o), o = t > r ? 0 : r - t >>> 0, t >>>= 0;
  for (var s = Array(o); ++n < o; )
    s[n] = e[n + t];
  return s;
}
function Oy() {
  this.__data__ = new He(), this.size = 0;
}
function Fy(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
function jy(e) {
  return this.__data__.get(e);
}
function Ay(e) {
  return this.__data__.has(e);
}
var Ey = 200;
function Cy(e, t) {
  var r = this.__data__;
  if (r instanceof He) {
    var n = r.__data__;
    if (!Wt || n.length < Ey - 1)
      return n.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new tt(n);
  }
  return r.set(e, t), this.size = r.size, this;
}
function vt(e) {
  var t = this.__data__ = new He(e);
  this.size = t.size;
}
vt.prototype.clear = Oy;
vt.prototype.delete = Fy;
vt.prototype.get = jy;
vt.prototype.has = Ay;
vt.prototype.set = Cy;
var Oi = typeof exports == "object" && exports && !exports.nodeType && exports, Ps = Oi && typeof module == "object" && module && !module.nodeType && module, My = Ps && Ps.exports === Oi, ws = My ? Ve.Buffer : void 0, $s = ws ? ws.allocUnsafe : void 0;
function Fi(e, t) {
  if (t)
    return e.slice();
  var r = e.length, n = $s ? $s(r) : new e.constructor(r);
  return e.copy(n), n;
}
function Ry(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, o = 0, s = []; ++r < n; ) {
    var i = e[r];
    t(i, r, e) && (s[o++] = i);
  }
  return s;
}
function Dy() {
  return [];
}
var Iy = Object.prototype, ky = Iy.propertyIsEnumerable, xs = Object.getOwnPropertySymbols, By = xs ? function(e) {
  return e == null ? [] : (e = Object(e), Ry(xs(e), function(t) {
    return ky.call(e, t);
  }));
} : Dy;
function Vy(e, t, r) {
  var n = t(e);
  return ce(e) ? n : Py(n, r(e));
}
function Ly(e) {
  return Vy(e, Ig, By);
}
var un = mt(Ve, "DataView"), cn = mt(Ve, "Promise"), dn = mt(Ve, "Set"), Ts = "[object Map]", Ny = "[object Object]", _s = "[object Promise]", Ss = "[object Set]", Os = "[object WeakMap]", Fs = "[object DataView]", Uy = ht(un), zy = ht(Wt), Ky = ht(cn), Wy = ht(dn), qy = ht(ln), Ke = Le;
(un && Ke(new un(new ArrayBuffer(1))) != Fs || Wt && Ke(new Wt()) != Ts || cn && Ke(cn.resolve()) != _s || dn && Ke(new dn()) != Ss || ln && Ke(new ln()) != Os) && (Ke = function(e) {
  var t = Le(e), r = t == Ny ? e.constructor : void 0, n = r ? ht(r) : "";
  if (n)
    switch (n) {
      case Uy:
        return Fs;
      case zy:
        return Ts;
      case Ky:
        return _s;
      case Wy:
        return Ss;
      case qy:
        return Os;
    }
  return t;
});
var Gy = Object.prototype, Hy = Gy.hasOwnProperty;
function Yy(e) {
  var t = e.length, r = new e.constructor(t);
  return t && typeof e[0] == "string" && Hy.call(e, "index") && (r.index = e.index, r.input = e.input), r;
}
var js = Ve.Uint8Array;
function Zn(e) {
  var t = new e.constructor(e.byteLength);
  return new js(t).set(new js(e)), t;
}
function Qy(e, t) {
  var r = Zn(e.buffer);
  return new e.constructor(r, e.byteOffset, e.byteLength);
}
var Xy = /\w*$/;
function Jy(e) {
  var t = new e.constructor(e.source, Xy.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var As = Je ? Je.prototype : void 0, Es = As ? As.valueOf : void 0;
function Zy(e) {
  return Es ? Object(Es.call(e)) : {};
}
function ji(e, t) {
  var r = t ? Zn(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.length);
}
var eb = "[object Boolean]", tb = "[object Date]", rb = "[object Map]", nb = "[object Number]", ob = "[object RegExp]", sb = "[object Set]", ab = "[object String]", ib = "[object Symbol]", lb = "[object ArrayBuffer]", ub = "[object DataView]", cb = "[object Float32Array]", db = "[object Float64Array]", fb = "[object Int8Array]", pb = "[object Int16Array]", hb = "[object Int32Array]", mb = "[object Uint8Array]", vb = "[object Uint8ClampedArray]", gb = "[object Uint16Array]", yb = "[object Uint32Array]";
function bb(e, t, r) {
  var n = e.constructor;
  switch (t) {
    case lb:
      return Zn(e);
    case eb:
    case tb:
      return new n(+e);
    case ub:
      return Qy(e);
    case cb:
    case db:
    case fb:
    case pb:
    case hb:
    case mb:
    case vb:
    case gb:
    case yb:
      return ji(e, r);
    case rb:
      return new n();
    case nb:
    case ab:
      return new n(e);
    case ob:
      return Jy(e);
    case sb:
      return new n();
    case ib:
      return Zy(e);
  }
}
function Ai(e) {
  return typeof e.constructor == "function" && !Yn(e) ? Av(_i(e)) : {};
}
var Pb = "[object Map]";
function wb(e) {
  return Oe(e) && Ke(e) == Pb;
}
var Cs = Ze && Ze.isMap, $b = Cs ? Cr(Cs) : wb, xb = "[object Set]";
function Tb(e) {
  return Oe(e) && Ke(e) == xb;
}
var Ms = Ze && Ze.isSet, _b = Ms ? Cr(Ms) : Tb, Sb = 1, Ei = "[object Arguments]", Ob = "[object Array]", Fb = "[object Boolean]", jb = "[object Date]", Ab = "[object Error]", Ci = "[object Function]", Eb = "[object GeneratorFunction]", Cb = "[object Map]", Mb = "[object Number]", Mi = "[object Object]", Rb = "[object RegExp]", Db = "[object Set]", Ib = "[object String]", kb = "[object Symbol]", Bb = "[object WeakMap]", Vb = "[object ArrayBuffer]", Lb = "[object DataView]", Nb = "[object Float32Array]", Ub = "[object Float64Array]", zb = "[object Int8Array]", Kb = "[object Int16Array]", Wb = "[object Int32Array]", qb = "[object Uint8Array]", Gb = "[object Uint8ClampedArray]", Hb = "[object Uint16Array]", Yb = "[object Uint32Array]", H = {};
H[Ei] = H[Ob] = H[Vb] = H[Lb] = H[Fb] = H[jb] = H[Nb] = H[Ub] = H[zb] = H[Kb] = H[Wb] = H[Cb] = H[Mb] = H[Mi] = H[Rb] = H[Db] = H[Ib] = H[kb] = H[qb] = H[Gb] = H[Hb] = H[Yb] = !0;
H[Ab] = H[Ci] = H[Bb] = !1;
function or(e, t, r, n, o, s) {
  var i, a = t & Sb;
  if (i !== void 0)
    return i;
  if (!Ie(e))
    return e;
  var l = ce(e);
  if (l)
    i = Yy(e);
  else {
    var u = Ke(e), c = u == Ci || u == Eb;
    if (Qn(e))
      return Fi(e, a);
    if (u == Mi || u == Ei || c && !o)
      i = c ? {} : Ai(e);
    else {
      if (!H[u])
        return o ? e : {};
      i = bb(e, u, a);
    }
  }
  s || (s = new vt());
  var p = s.get(e);
  if (p)
    return p;
  s.set(e, i), _b(e) ? e.forEach(function(d) {
    i.add(or(d, t, r, d, e, s));
  }) : $b(e) && e.forEach(function(d, v) {
    i.set(v, or(d, t, r, v, e, s));
  });
  var f = Ly, m = l ? void 0 : f(e);
  return Vv(m || e, function(d, v) {
    m && (v = d, d = e[v]), Gn(i, v, or(d, t, r, v, e, s));
  }), i;
}
var Qb = 1, Xb = 4;
function bt(e) {
  return or(e, Qb | Xb);
}
function Jb(e, t, r) {
  t = Dr(t, e);
  for (var n = -1, o = t.length, s = !1; ++n < o; ) {
    var i = Qt(t[n]);
    if (!(s = e != null && r(e, i)))
      break;
    e = e[i];
  }
  return s || ++n != o ? s : (o = e == null ? 0 : e.length, !!o && Hn(o) && jr(i, o) && (ce(e) || lr(e)));
}
function Zb(e) {
  return function(t, r, n) {
    for (var o = -1, s = Object(t), i = n(t), a = i.length; a--; ) {
      var l = i[++o];
      if (r(s[l], l, s) === !1)
        break;
    }
    return t;
  };
}
var e0 = Zb();
function fn(e, t, r) {
  (r !== void 0 && !Ar(e[t], r) || r === void 0 && !(t in e)) && qn(e, t, r);
}
function t0(e) {
  return Oe(e) && Er(e);
}
function pn(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
function r0(e) {
  return Kv(e, wi(e));
}
function n0(e, t, r, n, o, s, i) {
  var a = pn(e, r), l = pn(t, r), u = i.get(l);
  if (u) {
    fn(e, r, u);
    return;
  }
  var c = s ? s(a, l, r + "", e, t, i) : void 0, p = c === void 0;
  if (p) {
    var f = ce(l), m = !f && Qn(l), d = !f && !m && yi(l);
    c = l, f || m || d ? ce(a) ? c = a : t0(a) ? c = hi(a) : m ? (p = !1, c = Fi(l, !0)) : d ? (p = !1, c = ji(l, !0)) : c = [] : Jn(l) || lr(l) ? (c = a, lr(a) ? c = r0(a) : (!Ie(a) || Fr(a)) && (c = Ai(l))) : p = !1;
  }
  p && (i.set(l, c), o(c, l, n, s, i), i.delete(l)), fn(e, r, c);
}
function Ri(e, t, r, n, o) {
  e !== t && e0(t, function(s, i) {
    if (o || (o = new vt()), Ie(s))
      n0(e, t, i, r, Ri, n, o);
    else {
      var a = n ? n(pn(e, i), s, i + "", e, t, o) : void 0;
      a === void 0 && (a = s), fn(e, i, a);
    }
  }, wi);
}
function o0(e) {
  var t = e == null ? 0 : e.length;
  return t ? e[t - 1] : void 0;
}
var s0 = Object.prototype, a0 = s0.hasOwnProperty;
function i0(e, t) {
  return e != null && a0.call(e, t);
}
function eo(e, t) {
  return e != null && Jb(e, t, i0);
}
var l0 = "[object String]";
function Tt(e) {
  return typeof e == "string" || !ce(e) && Oe(e) && Le(e) == l0;
}
function u0(e, t) {
  return t.length < 2 ? e : Ti(e, Sy(t, 0, -1));
}
var c0 = "[object Boolean]";
function Rs(e) {
  return e === !0 || e === !1 || Oe(e) && Le(e) == c0;
}
var d0 = "[object RegExp]";
function f0(e) {
  return Oe(e) && Le(e) == d0;
}
var Ds = Ze && Ze.isRegExp, p0 = Ds ? Cr(Ds) : f0;
function h0(e) {
  return e === void 0;
}
var hn = Yv(function(e, t, r) {
  Ri(e, t, r);
});
function m0(e, t) {
  return t = Dr(t, e), e = u0(e, t), e == null || delete e[Qt(o0(t))];
}
function v0(e, t, r, n) {
  if (!Ie(e))
    return e;
  t = Dr(t, e);
  for (var o = -1, s = t.length, i = s - 1, a = e; a != null && ++o < s; ) {
    var l = Qt(t[o]), u = r;
    if (l === "__proto__" || l === "constructor" || l === "prototype")
      return e;
    if (o != i) {
      var c = a[l];
      u = void 0, u === void 0 && (u = Ie(c) ? c : jr(t[o + 1]) ? [] : {});
    }
    Gn(a, l, u), a = a[l];
  }
  return e;
}
function qe(e, t, r) {
  return e == null ? e : v0(e, t, r);
}
function mn(e) {
  return ce(e) ? di(e, Qt) : Or(e) ? [e] : hi($i(xi(e)));
}
function g0(e, t) {
  return e == null ? !0 : m0(e, t);
}
let Is = 36, Di = "";
for (; Is--; )
  Di += Is.toString(36);
function ut(e) {
  let t = "", r = e || 11;
  for (; r--; )
    t += Di[Math.random() * 36 | 0];
  return t;
}
function $t(e) {
  return e ? mn(e).join(".") : "";
}
function Ii(e) {
  return (t, r) => Tt(e) ? e === t : p0(e) ? e.test(t) : e(t, r);
}
function y0(e) {
  const t = rv(), r = tv(), n = y(() => {
    const s = V(e == null ? void 0 : e.value) ?? [];
    return s.length > 0 ? [
      ...mn(V(r)),
      ...mn(s)
    ] : [];
  }), o = y(() => V(t));
  return {
    path: n,
    index: o,
    stringPath: y(() => $t(n.value))
  };
}
const ki = Symbol("formContext");
function b0(e) {
  _e(ki, e);
}
function to() {
  const e = ue(ki);
  if (!e)
    throw new Error("field must be used in form");
  return e;
}
function P0(e) {
  Nl(() => e(!1)), Ul(() => e(!0));
}
const w0 = /\{\{([\s\S]*)\}\}/, Gr = /* @__PURE__ */ new WeakMap();
function $0(e) {
  if (Gr.has(e))
    return Gr.get(e);
  const t = new Proxy(e, {
    get(r, n, o) {
      return V(Reflect.get(r, n, o));
    },
    set() {
      throw new Error("not set!");
    }
  });
  return Gr.set(e, t), t;
}
function ks(e, t) {
  if (!Tt(e))
    return e;
  const [, r] = e.match(w0) ?? [];
  if (!r)
    return e;
  const n = $0(t);
  return new Function("$ctx", `with($ctx){ return ${r} }`)(n);
}
function qt(e, t) {
  if (Tt(e))
    return ks(e, t);
  if (e === void 0)
    return e;
  const r = (n) => {
    if (!zl(n) && !ce(n) && !Jn(n))
      return n;
    const o = ce(n) ? [] : {};
    for (const s in n) {
      const i = r(n[s]);
      o[s] = ks(i, t);
    }
    return o;
  };
  return r(e);
}
function M(e, t = {}) {
  const { scope: r = {} } = t;
  return y(() => {
    const n = V(e);
    return qt(n, r);
  });
}
const x0 = Symbol("requestTipConfig");
function T0() {
  return ue(x0, {});
}
function _0(e) {
  const {
    api: t,
    tipApi: r,
    transform: n,
    failureTip: o,
    successTip: s,
    initialValue: i,
    dependencies: a,
    immediate: l = !0,
    onFailure: u,
    onSuccess: c
  } = e, {
    tipApi: p,
    successTip: f,
    failureTip: m
  } = T0(), d = r ?? p, v = s ?? f, b = o ?? m, g = R(), w = R(!1), x = R(i), { on: _, trigger: j } = at(), { on: F, trigger: q } = at();
  function B(...E) {
    return new Promise(async (A) => {
      if (!t) {
        A([void 0, i]);
        return;
      }
      w.value = !0, g.value = void 0;
      try {
        const C = await t(...E), ne = n ? n(C) : C;
        x.value = ne, j(ne), A([void 0, ne]);
      } catch (C) {
        g.value = C, x.value = i, q(C), A([C, void 0]);
      } finally {
        w.value = !1;
      }
    });
  }
  function S(...E) {
    return B(...E);
  }
  async function L(...E) {
    const [A] = await B(...E);
    return h0(A);
  }
  function N(E, A) {
    if (Tt(A))
      return A;
    if (Fr(A)) {
      const C = A(E);
      if (Tt(C))
        return C;
    }
    return !1;
  }
  function re(E) {
    let A;
    !d || (A = N(E, v)) === !1 || d("success", A, E);
  }
  function D(E) {
    let A;
    !d || (A = N(E, b)) === !1 || d("failure", A, E);
  }
  const I = {
    run: S,
    data: x,
    error: g,
    loading: w,
    runBool: L,
    onSuccess: _,
    onFailure: F
  };
  if (F(D), _(re), u && F(u), c && _(c), bn(() => {
    l && Km(() => I.run(), 16);
  }), a) {
    const {
      guard: E = !0,
      watch: A
    } = a;
    J(
      A,
      () => sa(E) && I.run()
    );
  }
  return I;
}
function S0(e) {
  const { scope: t } = e, r = R({});
  function n(o) {
    r.value = qt(o, t);
  }
  return {
    fieldProps: y(() => r.value),
    doUpdateFieldProps: n
  };
}
const Bi = Symbol("parentField");
function O0(e) {
  _e(Bi, e);
}
function Ir() {
  return ue(Bi, null);
}
const Vi = Symbol("field");
function F0(e) {
  _e(Vi, e);
}
function gt() {
  return ue(Vi, null);
}
function j0(e) {
  const { scope: t } = e, r = R({});
  function n(o) {
    r.value = qt(o, t);
  }
  return {
    formItemProps: y(() => r.value),
    doUpdateFormItemProps: n
  };
}
function A0(e, t, r) {
  const { scope: n } = r, o = M(e, { scope: n }), s = M(t, { scope: n });
  return {
    show: y(() => {
      const i = s.value;
      if (Rs(i))
        return i;
      const a = o.value;
      return Rs(a) ? !a : !0;
    })
  };
}
function E0(e, t, r) {
  let n = !0, o = Symbol("");
  const s = to(), {
    onChange: i,
    postState: a
  } = r, l = y({
    get: u,
    set: c
  });
  function u(p) {
    const f = t.value;
    let m = s.valueStore.getFieldValue(f);
    if (a) {
      if (Object.is(m, o) || Object.is(sr(m), o))
        return m;
      const b = o = m = a(m);
      s.valueStore.setFieldValue(f, b);
    }
    const d = s.fieldStore.getField(e), v = !n && !Object.is(p, m);
    return n = !1, d && v && (s.triggerFieldValueChange({
      field: d,
      value: m
    }), i && i(m)), m;
  }
  function c(p) {
    s.valueStore.setFieldValue(t.value, p);
  }
  return {
    value: l,
    doUpdateValue: (p) => l.value = p
  };
}
function C0(e, t, r = {}) {
  const n = to(), o = Ir(), s = y(() => {
    if (!o || t.value === -1)
      return {};
    const { stringPath: c } = o, p = c.value, f = t.value, m = `${p}.${f}`;
    return n.valueStore.getFieldValue(m);
  }), i = y(() => o ? o.value.value.length : 0), a = y(() => t.value ?? -1), l = y(() => n.valueStore.getFieldValue(e.value)), u = {
    /**
     * 如果在列表中则为当前行数据，否则是空对象
     */
    $row: s,
    /**
     * 当前字段如果在列表中则为这个列表的长度，否则为0
     */
    $total: i,
    /**
     * 当前字段的值
     */
    $self: l,
    /**
     * 如果在列表中则为当前行索引，否则是 -1
     */
    $index: a,
    /**
     * @alias $row
     */
    $record: s,
    /**
     * @alias $index
     */
    $rowIndex: a
  };
  return {
    ...r,
    ...n.scope,
    ...u
  };
}
function Li(e = {}, t = {}) {
  const {
    path: r,
    value: n,
    hidden: o,
    visible: s,
    scope: i = {},
    defaultValue: a,
    initialValue: l,
    preserve: u = !0,
    dependencies: c = [],
    onChange: p,
    postState: f,
    transform: m,
    ...d
  } = e, {
    isList: v = !1
  } = t;
  return M0(
    {
      path: r,
      value: n,
      scope: i,
      hidden: o,
      visible: s,
      preserve: u,
      defaultValue: a,
      initialValue: l,
      dependencies: c,
      onChange: p,
      postState: f,
      transform: m,
      ...d
    },
    { isList: v }
  );
}
function M0(e, t) {
  const {
    onChange: r,
    postState: n,
    transform: o,
    preserve: s,
    defaultValue: i,
    initialValue: a,
    dependencies: l,
    path: u,
    value: c,
    scope: p,
    hidden: f,
    visible: m,
    ...d
  } = e, v = ut(), { isList: b } = t, g = to(), w = Ir(), x = !!w, {
    path: _,
    index: j,
    stringPath: F
  } = y0(u), q = C0(
    _,
    j,
    p
  ), { show: B } = A0(
    f,
    m,
    { scope: q }
  ), S = M(
    c,
    { scope: q }
  ), {
    fieldProps: L,
    doUpdateFieldProps: N
  } = S0({ scope: q }), {
    formItemProps: re,
    doUpdateFormItemProps: D
  } = j0({ scope: q }), {
    value: I,
    doUpdateValue: E
  } = E0(v, _, { postState: n, onChange: r }), A = {
    id: v,
    show: B,
    path: _,
    value: I,
    scope: q,
    index: j,
    parent: w,
    isList: b,
    preserve: s,
    fieldProps: L,
    isListPath: x,
    stringPath: F,
    dependencies: l,
    formItemProps: re,
    parsedPropValue: S,
    updating: !1,
    meta: e,
    onChange: r,
    postState: n,
    transform: o,
    doUpdateValue: E,
    doUpdateFieldProps: N,
    doUpdateFormItemProps: D,
    ...d
  };
  return P0((C) => {
    A.updating = C;
  }), J(
    _,
    (C, ne) => {
      R0(g, w, C, ne);
    }
  ), J(
    B,
    (C) => {
      C ? Bs(g, A) : Vs(g, A, w);
    }
  ), J(
    S,
    (C) => {
      B.value && _.value.length > 0 && g.valueStore.setFieldValue(_.value, C);
    }
  ), F0(A), g.dependStore.add(A), Bs(g, A), aa(() => Vs(g, A, w)), A;
}
function Bs(e, t) {
  const {
    show: r,
    meta: n,
    path: o,
    parsedPropValue: s
  } = t;
  if (!r.value || o.value.length <= 0)
    return;
  e.fieldStore.mountField(t);
  const i = o.value, { defaultValue: a, initialValue: l } = n;
  let u;
  e.valueStore.has(i) ? u = e.valueStore.getFieldValue(i) : s.value !== void 0 ? u = s.value : l !== void 0 ? u = l : !e.mounted.value && eo(e.valueStore.initialValues, i) && (u = lt(e.valueStore.initialValues, i)), u === void 0 && a !== void 0 && (u = a), e.valueStore.setFieldValue(i, u), e.mounted.value || e.valueStore.setInitialValue(i, bt(u));
}
function Vs(e, t, r) {
  e.fieldStore.unmountField(t), !(r != null && r.updating) && !t.preserve && e.valueStore.delete(t.path.value);
}
function R0(e, t, r, n) {
  if (!(t != null && t.updating)) {
    const o = e.valueStore.getFieldValue(n);
    e.valueStore.delete(n), e.valueStore.setFieldValue(r, o);
  }
}
function D0(e, ...t) {
  const r = [...e];
  return r.push(...t), r;
}
function I0(e) {
  const t = [...e];
  return t.pop(), t;
}
function k0(e, t, ...r) {
  const n = [...e];
  return n.splice(t, 0, ...r), n;
}
function B0(e, t) {
  const r = [...e];
  return r.splice(t, 1), r;
}
function V0(e) {
  const t = [...e];
  return t.shift(), t;
}
function L0(e, ...t) {
  const r = [...e];
  return r.unshift(...t), r;
}
function ro(e, t, r) {
  const n = [...e];
  if (t === r || t < 0 || r < 0 || t > n.length - 1 || r > n.length - 1)
    return n;
  if (t < r) {
    const o = n[t];
    for (let s = t; s < r; s++)
      n[s] = n[s + 1];
    n[r] = o;
  } else {
    const o = n[t];
    for (let s = t; s > r; s--)
      n[s] = n[s - 1];
    n[r] = o;
  }
  return n;
}
function N0(e, t) {
  return ro(e, t, t - 1 < 0 ? e.length - 1 : t - 1);
}
function U0(e, t) {
  return ro(e, t, t + 1 >= e.length ? 0 : t + 1);
}
function z0(e) {
  const {
    on: t,
    trigger: r
  } = at(), n = Li(e, {
    isList: !0
  });
  function o(...d) {
    n.value.value = D0(n.value.value ?? [], ...d), r("push");
  }
  function s() {
    n.value.value = I0(n.value.value ?? []), r("pop");
  }
  function i(d, ...v) {
    n.value.value = k0(n.value.value ?? [], d, ...v), r("insert");
  }
  function a(d) {
    n.value.value = B0(n.value.value ?? [], d), r("remove");
  }
  function l() {
    n.value.value = V0(n.value.value ?? []), r("shift");
  }
  function u(...d) {
    n.value.value = L0(n.value.value ?? [], ...d), r("unshift");
  }
  function c(d, v) {
    n.value.value = ro(n.value.value ?? [], d, v), r("move");
  }
  function p(d) {
    n.value.value = N0(n.value.value ?? [], d), r("moveUp");
  }
  function f(d) {
    n.value.value = U0(n.value.value ?? [], d), r("moveDown");
  }
  const m = Object.assign(n, {
    push: o,
    pop: s,
    insert: i,
    remove: a,
    shift: l,
    unshift: u,
    move: c,
    moveUp: p,
    moveDown: f,
    onActionChange: t
  });
  return O0(m), m;
}
class K0 {
  constructor() {
    K(this, "idToFieldMap"), K(this, "getField", (t) => this.idToFieldMap.get(t)), K(this, "mountField", (t) => {
      this.idToFieldMap.set(t.id, t);
    }), K(this, "unmountField", (t) => {
      this.idToFieldMap.delete(t.id);
    }), K(this, "matchFieldPath", (t) => {
      const r = [], n = this.fieldsPath.value, o = Ii(t);
      return this.idToFieldMap.forEach((s) => {
        const i = s.stringPath.value;
        o(i, n) && r.push(i);
      }), r;
    }), K(this, "getFieldsValue", () => this.fieldsValue), K(this, "transform", (t, r) => {
      const {
        index: n,
        value: o,
        parent: s,
        isList: i,
        stringPath: a,
        transform: l
      } = t, u = i ? lt(r, a.value) : o.value, c = sr(l(u, a.value));
      if (!Jn(c)) {
        qe(r, a.value, c);
        return;
      }
      if (!s) {
        hn(r, c);
        return;
      }
      const p = [...s.path.value, n.value], f = lt(r, p);
      hn(f, c);
    }), K(this, "getFieldsTransformedValue", () => {
      const t = {}, r = [];
      return this.idToFieldMap.forEach((n) => {
        const { isList: o, path: s, transform: i, value: a } = n, l = a.value;
        if (o) {
          const u = (l ?? []).length;
          qe(t, s.value, Array.from(Array(u), () => ({}))), i && r.push(n);
        }
      }), this.idToFieldMap.forEach((n) => {
        const { isList: o, path: s, transform: i, value: a } = n, l = a.value;
        if (!o) {
          if (!i) {
            qe(t, s.value, sr(l));
            return;
          }
          this.transform(n, t);
        }
      }), r.forEach((n) => {
        this.transform(n, t);
      }), t;
    }), this.idToFieldMap = Kl(/* @__PURE__ */ new Map());
  }
  get fieldsValue() {
    return y(() => {
      const t = {};
      return this.idToFieldMap.forEach((r) => {
        const { isList: n, path: o, value: s } = r, i = s.value;
        if (n) {
          const a = (i ?? []).length;
          qe(t, o.value, Array.from(Array(a), () => ({})));
        }
      }), this.idToFieldMap.forEach((r) => {
        const { isList: n, path: o, value: s } = r, i = s.value;
        n || qe(t, o.value, i);
      }), t;
    });
  }
  get fieldsPath() {
    return y(() => {
      const t = [];
      return this.idToFieldMap.forEach((r) => {
        t.push(r.stringPath.value);
      }), t;
    });
  }
  get fieldsPathMap() {
    return y(() => {
      const t = /* @__PURE__ */ new Map();
      return this.idToFieldMap.forEach((r) => {
        t.set(r.stringPath.value, r);
      }), t;
    });
  }
}
function W0() {
  return new K0();
}
function Ls(e, t, r = "merge") {
  return r === "merge" ? hn(e, t) : r === "shallowMerge" ? {
    ...e,
    ...t
  } : t;
}
class q0 {
  constructor(t, r) {
    K(this, "fieldStore"), K(this, "values"), K(this, "initialValues"), K(this, "getFieldValue", (n) => lt(this.values.value, n)), K(this, "getFieldsValue", (n) => n === !0 ? this.values.value : n ? n.reduce(
      (o, s) => {
        const i = this.getFieldValue(s);
        return qe(o, s, i), o;
      },
      {}
    ) : this.fieldStore.fieldsValue.value), K(this, "getFieldsTransformedValue", () => this.fieldStore.getFieldsTransformedValue()), K(this, "matchPath", (n) => this.fieldStore.matchFieldPath(n)), K(this, "setFieldValue", (n, o) => {
      qe(this.values.value, n, o);
    }), K(this, "setFieldsValue", (n, o) => {
      this.values.value = Ls(
        this.values.value,
        n,
        o
      );
    }), K(this, "resetFieldValue", (n) => {
      const o = lt(this.initialValues, n);
      qe(this.values.value, n, bt(o));
    }), K(this, "resetFieldsValue", () => {
      this.values.value = bt(this.initialValues);
    }), K(this, "setInitialValue", (n, o) => {
      qe(this.initialValues, n, bt(o));
    }), K(this, "setInitialValues", (n, o) => {
      this.initialValues = Ls(
        this.initialValues,
        bt(n),
        o
      );
    }), this.values = R({}), this.fieldStore = t, this.initialValues = bt(r.initialValues ?? {});
  }
  has(t) {
    return eo(this.values.value, t);
  }
  delete(t) {
    return g0(this.values.value, t);
  }
}
function G0(e, t) {
  return new q0(e, t);
}
class H0 {
  constructor(t) {
    K(this, "deps"), K(this, "shouldTrigger"), K(this, "fieldStore"), K(this, "add", (r) => {
      (ce(r.dependencies) ? r.dependencies : [r.dependencies]).forEach((n) => {
        const o = Tt(n) ? n : n.pattern, s = Ii(o);
        s.field = r, s.guard = n.guard ?? !0, this.deps.add(s);
      });
    }), K(this, "pauseDependenciesTrigger", () => {
      this.shouldTrigger = !1;
    }), K(this, "resumeDependenciesTrigger", () => {
      ve(() => {
        this.shouldTrigger = !0;
      });
    }), K(this, "matchDepend", (r, n) => {
      if (!this.shouldTrigger)
        return;
      const o = this.fieldStore.fieldsPath.value;
      this.deps.forEach((s) => {
        s(r, o) && sa(s.guard) && n(s.field.path.value);
      });
    }), this.deps = /* @__PURE__ */ new Set(), this.shouldTrigger = !0, this.fieldStore = t, fr(() => {
      this.deps.clear();
    });
  }
}
function Y0(e) {
  return new H0(e);
}
function Ni(e) {
  const t = si(), r = W0(), n = Y0(r), o = G0(r, e), {
    matchDepend: s,
    pauseDependenciesTrigger: i,
    resumeDependenciesTrigger: a
  } = n, {
    values: l,
    matchPath: u,
    getFieldValue: c,
    setFieldValue: p,
    getFieldsValue: f,
    setFieldsValue: m,
    resetFieldValue: d,
    setInitialValue: v,
    resetFieldsValue: b,
    setInitialValues: g,
    getFieldsTransformedValue: w
  } = o, {
    on: x,
    trigger: _
  } = at(), j = {
    scope: {
      /**
       * 用户传递的
       */
      ...e.expressionScope ?? {},
      /**
       * 整个表单的值，等同于 getFieldsValue(true)
       */
      $values: l.value,
      /**
       * @alias $values
       */
      $vals: l.value
    },
    mounted: t,
    id: ut(),
    valueStore: o,
    fieldStore: r,
    dependStore: n,
    matchPath: u,
    getFieldValue: c,
    getFieldsValue: f,
    setFieldValue: p,
    setFieldsValue: m,
    resetFieldValue: d,
    resetFieldsValue: b,
    setInitialValue: v,
    setInitialValues: g,
    onFieldValueChange: x,
    triggerFieldValueChange: _,
    pauseDependenciesTrigger: i,
    resumeDependenciesTrigger: a,
    getFieldsTransformedValue: w
  };
  function F(q) {
    const { field: B, value: S } = q, L = B.path.value;
    ve(() => {
      s(
        B.stringPath.value,
        (N) => {
          e.onDependenciesValueChange({ field: B, path: L, dependPath: N, value: S });
        }
      );
    });
  }
  return b0(j), e.onFieldValueChange && x(e.onFieldValueChange), e.onDependenciesValueChange && x(F), j;
}
function no(e, t, r, n = { level: 1, parent: null }) {
  return r = r ?? "children", e.map((o, s, i) => {
    const a = lt(o, r), l = t(o, s, n, i);
    if (ce(a)) {
      const u = no(
        a,
        t,
        r,
        {
          level: n.level + 1,
          parent: o
        }
      );
      return eo(l, r) ? {
        ...l,
        [r]: u
      } : l;
    }
    return l;
  });
}
function At(e, t, r, n = { level: 1, parent: null }) {
  r = r ?? "children", e.forEach((o, s, i) => {
    const a = lt(o, r, []);
    t(o, s, n, i), ce(a) && At(
      a,
      t,
      r,
      { level: n.level + 1, parent: o }
    );
  });
}
const oo = {
  proForm: Object,
  proTable: Object,
  proButton: Object,
  valueTypeMap: Object,
  presetFieldProps: Object
}, Ui = {
  ...Hl,
  ...oo
}, zi = Symbol("globalConfig");
function Ki(e) {
  _e(zi, e);
}
function Ne() {
  return ue(zi, {
    proForm: {},
    proTable: {},
    proButton: {},
    valueTypeMap: {},
    presetFieldProps: {}
  });
}
const Q0 = /* @__PURE__ */ $({
  name: "ProConfigProvider",
  props: Ui,
  setup(e) {
    const {
      proForm: t = {},
      proTable: r = {},
      proButton: n = {}
    } = e, {
      proForm: o,
      proTable: s,
      proButton: i,
      valueTypeMap: a,
      presetFieldProps: l
    } = Ne(), u = y(() => ({
      ...V(a),
      ...V(e.valueTypeMap) ?? {}
    })), c = y(() => ({
      ...V(l),
      ...V(e.presetFieldProps) ?? {}
    })), p = y(() => Te({
      ...e,
      themeOverrides: rh({
        Card: {
          borderRadius: "8px"
        }
      }, e.themeOverrides ?? {})
    }, Object.keys(oo)));
    return Ki({
      proForm: {
        validateTrigger: "input",
        ...o,
        ...t
      },
      proTable: {
        ...s,
        ...r
      },
      proButton: {
        ...i,
        ...n,
        authData: y(() => {
          var d, v;
          const f = (d = e.proButton) == null ? void 0 : d.authData, m = (v = i.authData) == null ? void 0 : v.value;
          return f ?? m;
        })
      },
      valueTypeMap: u,
      presetFieldProps: c
    }), {
      nConfigProviderProps: p
    };
  },
  render() {
    return h(Yl, this.nConfigProviderProps, this.$slots);
  }
});
function so(e) {
  return !!(e == null || W(e) && !e.filter((t) => ![null, void 0].includes(t)).length || ye(e) && !e);
}
function Z() {
  const e = gt(), t = e[Xe], { readonlyEmptyText: r } = Ne().proForm, {
    readonly: n,
    valueType: o
  } = t, s = y(() => so(e.value.value)), i = y(() => r ?? "-"), a = y(() => s.value ? i.value : e.value.value);
  return {
    empty: s,
    readonly: n,
    valueType: o,
    emptyText: i,
    readonlyText: a,
    value: e.value
  };
}
function Wi() {
  const e = gt(), t = xr(), r = y(() => {
    const s = e == null ? void 0 : e.path.value;
    if (s)
      return t.getFieldValidateResult(s);
  }), n = y(() => {
    var s;
    return ((s = r.value) == null ? void 0 : s.errors) ?? [];
  }), o = y(() => {
    var s;
    return ((s = r.value) == null ? void 0 : s.warnings) ?? [];
  });
  return {
    errors: n,
    warnings: o
  };
}
const qi = {
  ...ca,
  /**
   * 同 label
   */
  title: String,
  /**
   * 显示在 label 右边的提示
   */
  tooltip: [String, Array]
};
function X0(e) {
  const {
    getMessage: t
  } = Ye("ProForm"), {
    validateTrigger: r
  } = Ne().proForm, {
    stringPath: n
  } = gt() ?? {};
  function o(i, a) {
    return !so(a);
  }
  function s() {
    const i = t("validateMessages.required"), { title: a, label: l } = e;
    return i(Pr(a ?? l));
  }
  return y(() => {
    const { rule: i, required: a } = e;
    let l = W(i) ? [...i] : [i].filter(Boolean);
    return a && l.push({
      required: !0,
      validator: o
    }), l = l.map((u) => u.required ? {
      validator: o,
      ...u
    } : u), l.map((u) => ({
      /**
       * 统一设置表单校验时机
       */
      trigger: r,
      /**
       * 统一设置必填的提示信息
       */
      message: s,
      ...u,
      /**
       * 给每个 rule 增加 key，方便 validate 方法校验
       */
      key: n == null ? void 0 : n.value
    }));
  });
}
const J0 = /* @__PURE__ */ $({
  name: "PatchInternalValidate",
  props: {
    rule: Array
  },
  setup(e) {
    var c;
    const t = gt(), r = ue("n-form-item"), n = Tr(), o = (c = t == null ? void 0 : t[Xe]) == null ? void 0 : c.proFormItemInst;
    function s(p, f) {
      const {
        errors: m,
        warnings: d
      } = f;
      if (!t)
        return;
      const v = t.stringPath.value;
      e.rule.filter((g) => Array.isArray(g.trigger) ? g.trigger.includes(p) : g.trigger === p).length && v && n && (n.clearValidateResults(v), n.addValidateErrors(v, m), n.addValidateWarnings(v, d));
    }
    function i() {
      var p;
      (p = o == null ? void 0 : o.value) == null || p.internalValidate("blur").then((f) => s("blur", f));
    }
    function a() {
      var p;
      (p = o == null ? void 0 : o.value) == null || p.internalValidate("change").then((f) => s("change", f));
    }
    function l() {
      var p;
      (p = o == null ? void 0 : o.value) == null || p.internalValidate("focus").then((f) => s("focus", f));
    }
    function u() {
      var p;
      (p = o == null ? void 0 : o.value) == null || p.internalValidate("input").then((f) => s("input", f));
    }
    _e("n-form-item", {
      ...r,
      handleContentBlur: i,
      handleContentChange: a,
      handleContentFocus: l,
      handleContentInput: u
    }), aa(() => {
      n && t && n.clearValidateResults(t.stringPath.value);
    });
  },
  render() {
    var e, t;
    return (t = (e = this.$slots).default) == null ? void 0 : t.call(e);
  }
});
function Z0(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !de(e);
}
const ao = /* @__PURE__ */ $({
  name: "ProFormItem",
  inheritAttrs: !1,
  props: qi,
  slots: Object,
  setup(e) {
    const t = Pn(), r = X0(e), n = gt(), o = R(), s = y(() => {
      const {
        label: a,
        title: l,
        tooltip: u,
        required: c,
        ...p
      } = e;
      return {
        ...t,
        ...p,
        rule: r.value,
        ref: o,
        label: l ?? a
      };
    }), i = y(() => {
      const {
        tooltip: a
      } = e;
      return (W(a) ? a : [a]).filter(Boolean);
    });
    return n && (n[Xe] = {
      ...n[Xe],
      proFormItemInst: o
    }), {
      rules: r,
      tooltips: i,
      nFormItemProps: s
    };
  },
  render() {
    var t, r;
    const e = !!(((r = (t = this.$slots).label) == null ? void 0 : r.call(t)) ?? this.title ?? this.label);
    return h(Ql, this.nFormItemProps, {
      feedback: this.$slots.feedback,
      label: e ? () => {
        var s, i;
        const n = ((i = (s = this.$slots).label) == null ? void 0 : i.call(s)) ?? this.title ?? this.label, o = this.tooltips.length > 0 || !!this.$slots.tooltip;
        return h(X, {
          style: {
            display: "inline-flex",
            alignItems: "center"
          }
        }, {
          default: () => [n, o && h(pr, {
            trigger: "hover"
          }, {
            trigger: () => h(Me, {
              size: 16,
              depth: 3,
              style: {
                cursor: "help",
                marginInlineStart: "4px"
              }
            }, {
              default: () => [h(em, null, null)]
            }),
            default: () => this.$slots.tooltip ? this.$slots.tooltip() : this.tooltips.map((a, l) => h(X, {
              key: l + a
            }, Z0(a) ? a : {
              default: () => [a]
            }))
          })]
        });
      } : void 0,
      default: () => h(J0, {
        rule: this.rules
      }, {
        default: () => {
          var n, o;
          return [(o = (n = this.$slots).default) == null ? void 0 : o.call(n)];
        }
      })
    });
  }
}), Gi = {
  ...ca,
  /**
   * 同 label
   */
  title: String,
  /**
   * 显示在 label 右边
   */
  tooltip: [String, Array],
  /**
   * 传递给 popover 的 props
   */
  popoverProps: Object
}, Hi = /* @__PURE__ */ $({
  name: "ProPopoverFormItem",
  inheritAttrs: !1,
  props: Gi,
  slots: Object,
  setup(e) {
    const t = Pn(), r = R(!0), n = R(), o = $n(), {
      errors: s,
      warnings: i
    } = Wi(), a = y(() => {
      var f;
      return (f = n.value) == null ? void 0 : f.$el;
    }), l = y(() => {
      const f = !!r.value, m = !!s.value.length || !!i.value.length;
      return f && m;
    }), u = y(() => s.value.length > 0 ? o.value.errorColor : o.value.warningColor), c = y(() => s.value.length > 0 ? s.value : i.value), p = y(() => {
      const {
        popoverProps: f,
        ...m
      } = e;
      return {
        ...t,
        ...m
      };
    });
    return qm(a, () => {
      r.value = !1;
    }), Ce(a, "click", () => {
      r.value = !0;
    }, {
      capture: !0
    }), {
      feedbacks: c,
      showPopover: l,
      feedbackColor: u,
      proFormItemProps: p
    };
  },
  render() {
    const e = this.$props.popoverProps ?? {};
    return h(Xl, P({
      placement: "top-start"
    }, e, {
      show: this.showPopover
    }), {
      trigger: () => h(ao, P({
        ref: "formItemInstRef"
      }, this.proFormItemProps), this.$slots),
      default: () => this.feedbacks.map((t) => h(X, {
        key: t.message,
        style: {
          color: this.feedbackColor
        }
      }, {
        default: () => [t.message]
      }))
    });
  }
});
function eP({ scope: e }, t) {
  const r = Pn(), n = M(O(t, "size"), { scope: e }), o = M(O(t, "rule"), { scope: e }), s = M(O(t, "title"), { scope: e }), i = M(O(t, "label"), { scope: e }), a = M(O(t, "first"), { scope: e }), l = M(O(t, "simple"), { scope: e }), u = M(O(t, "tooltip"), { scope: e }), c = M(O(t, "rulePath"), { scope: e }), p = M(O(t, "feedback"), { scope: e }), f = M(O(t, "readonly"), { scope: e }), m = M(O(t, "required"), { scope: e }), d = M(O(t, "valueType"), { scope: e }), v = M(O(t, "showLabel"), { scope: e }), b = M(y(() => ({ ...r })), { scope: e }), g = M(O(t, "addonAfter"), { scope: e }), w = M(O(t, "labelWidth"), { scope: e }), x = M(O(t, "labelAlign"), { scope: e }), _ = M(O(t, "fieldProps"), { scope: e }), j = M(O(t, "labelProps"), { scope: e }), F = M(O(t, "labelStyle"), { scope: e }), q = M(O(t, "placeholder"), { scope: e }), B = M(O(t, "addonBefore"), { scope: e }), S = M(O(t, "showFeedback"), { scope: e }), L = M(O(t, "feedbackStyle"), { scope: e }), N = M(O(t, "feedbackClass"), { scope: e }), re = M(O(t, "labelPlacement"), { scope: e }), D = M(O(t, "valueModelName"), { scope: e }), I = M(O(t, "showRequireMark"), { scope: e }), E = M(O(t, "ignorePathChange"), { scope: e }), A = M(O(t, "validationStatus"), { scope: e }), C = M(O(t, "validateBehavior"), { scope: e }), ne = M(O(t, "requireMarkPlacement"), { scope: e }), se = M(O(t, "validateBehaviorProps"), { scope: e });
  return {
    size: n,
    rule: o,
    title: s,
    label: i,
    first: a,
    attrs: b,
    simple: l,
    tooltip: u,
    rulePath: c,
    feedback: p,
    readonly: f,
    required: m,
    valueType: d,
    showLabel: v,
    addonAfter: g,
    labelWidth: w,
    labelAlign: x,
    fieldProps: _,
    labelProps: j,
    labelStyle: F,
    addonBefore: B,
    placeholder: q,
    showFeedback: S,
    feedbackStyle: L,
    feedbackClass: N,
    labelPlacement: re,
    valueModelName: D,
    showRequireMark: I,
    ignorePathChange: E,
    validationStatus: A,
    validateBehavior: C,
    requireMarkPlacement: ne,
    validateBehaviorProps: se
  };
}
function tP(e) {
  const {
    isList: t,
    preserve: r,
    onChange: n,
    postState: o,
    transform: s,
    defaultValue: i,
    dependencies: a,
    initialValue: l
  } = e, u = {
    preserve: r,
    defaultValue: i,
    initialValue: l,
    dependencies: a,
    path: O(e, "path"),
    value: O(e, "value"),
    hidden: O(e, "hidden"),
    visible: O(e, "visible"),
    onChange: n,
    transform: s,
    postState: o
  };
  return t ? z0(u) : Li(u);
}
const Yi = oe("ProFormList"), io = Symbol("proFormListInst"), lo = Symbol("proFormListContext");
function Qi(e) {
  _e(io, e);
}
function kr() {
  return ue(io);
}
const _t = "AUTO_CREATE_ID", Xi = {
  /**
   * 额外的字段属性
   */
  ...te,
  /**
   * 添加一行按钮显示在顶部还是底部
   *  顶部：每次添加数据都添加在首行
   *  底部：每次添加数据都添加在尾行
   * @default 'bottom'
   */
  position: String,
  /**
   * 最少行数，删除时如果少于该数则无法删除
   */
  min: Number,
  /**
   * 最多行数，新增或复制时多于该数则无法新增或复制
   */
  max: [Number],
  /**
   * 只显示第一行的 label
   */
  onlyShowFirstItemLabel: {
    type: [String, Boolean],
    default: void 0
  },
  /**
   * 新增一行的默认值
   */
  creatorInitialValue: Function,
  /**
   * 新增一行按钮的属性，false 不显示
   */
  creatorButtonProps: {
    type: [Object, Boolean],
    default: void 0
  },
  /**
   * 复制按钮的属性，false 不显示
   */
  copyButtonProps: {
    type: [Object, Boolean],
    default: void 0
  },
  /**
   * 删除按钮的属性，false 不显示
   */
  removeButtonProps: {
    type: [Object, Boolean],
    default: void 0
  },
  /**
   * 列表操作的拦截器
   */
  actionGuard: Object
}, rP = Vt("pro-form-item.n-form-item", [
  xe(">", [
    Vt("form-item-blank", `
      display: block;
    `)
  ])
]), uo = {
  /**
   * 是否自动检测异步函数开启 loading
   * @default true
   */
  autoLoading: {
    type: Boolean,
    default: !0
  },
  /**
   * 提示文字
   * @example
   * ```vue
   * <ProButton tooltip="xxxx"></ProButton> // 单行
   * <ProButton :tooltip="['xxxx','xxxx']"></ProButton> // 多行
   * ```
   */
  tooltip: {
    type: [String, Array]
  },
  /**
   * 按钮禁用时的 tooltip，优先级高于 tooltip
   */
  disabledTooltip: {
    type: [String, Array]
  },
  /**
   * 权限编码，可以是任意数据，配合 ProConfigProvider 使用
   */
  auth: {
    type: void 0,
    default: void 0
  },
  /**
   * 按钮文本
   */
  content: String
}, Ji = {
  ...Jl,
  ...uo
};
function nP(e) {
  const t = ai(e, "loading", void 0, {
    passive: !0,
    shouldEmit: () => !1
  });
  function r(o) {
    t.value = o;
  }
  function n(o) {
    const {
      autoLoading: s,
      onClick: i
    } = e, a = ge(i) ? [i] : i;
    if (!W(a))
      return;
    const l = a.reduce((u, c) => (u.push(c(o)), u), []);
    s && (Promise.all(l).finally(() => r(!1)), ve(() => {
      r(!0);
    }));
  }
  return {
    loading: t,
    setLoading: r,
    clickLoading: n
  };
}
function oP(e) {
  const t = y(() => {
    const { tooltip: s, disabled: i, disabledTooltip: a } = e;
    return i ? !a : !s;
  }), r = y(() => ({
    trigger: "hover",
    disabled: t.value
  }));
  function n(s) {
    return W(s) ? s : [s].filter(Boolean);
  }
  const o = y(() => {
    const { tooltip: s, disabled: i, disabledTooltip: a } = e;
    return i && a ? n(a) : s ? n(s) : [];
  });
  return {
    tooltipProps: r,
    tooltipTexts: o
  };
}
function sP(e) {
  const { proButton: t } = Ne(), {
    hasAuth: r,
    authData: n
  } = t;
  return {
    pass: y(() => {
      const { auth: s } = e;
      return za(s) ? !0 : ge(r) ? r(s, V(n)) : !1;
    })
  };
}
function aP(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !de(e);
}
const ot = /* @__PURE__ */ $({
  name: "ProButton",
  inheritAttrs: !1,
  props: Ji,
  slots: Object,
  setup(e) {
    const t = jt(e, uo), {
      loading: r,
      clickLoading: n
    } = nP(e), {
      tooltipProps: o,
      tooltipTexts: s
    } = oP(e), {
      pass: i
    } = sP(e), a = y(() => ({
      ...t.value,
      loading: r.value,
      onClick: n
    }));
    return {
      pass: i,
      tooltipProps: o,
      tooltipTexts: s,
      nButtonProps: a
    };
  },
  render() {
    const {
      pass: e,
      $props: t,
      $attrs: r,
      $slots: n,
      nButtonProps: o,
      tooltipProps: s,
      tooltipTexts: i
    } = this;
    return e ? h(pr, s, {
      trigger: () => h(Lt, P(r, o), {
        ...n,
        default: () => {
          var a;
          return t.content ? t.content : (a = n.default) == null ? void 0 : a.call(n);
        }
      }),
      default: () => i.map((a, l) => h(X, {
        key: l
      }, aP(a) ? a : {
        default: () => [a]
      }))
    }) : null;
  }
});
function iP(e) {
  const t = Ir(), r = y(() => [
    ...t.path.value,
    // list path
    e.value
  ]);
  return Zm(r), ev(e), {
    path: r
  };
}
function lP(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !de(e);
}
const uP = /* @__PURE__ */ $({
  name: "ProFieldItemAction",
  props: {
    min: Number,
    max: Number,
    index: {
      type: Number,
      required: !0
    },
    total: {
      type: Number,
      required: !0
    },
    readonly: {
      type: Boolean,
      required: !0
    },
    copyButtonProps: {
      type: [Object, Boolean],
      default: void 0
    },
    removeButtonProps: {
      type: [Object, Boolean],
      default: void 0
    },
    path: Array,
    actionGuard: Object
  },
  setup(e) {
    const t = xr(), r = kr(), {
      getMessage: n
    } = Ye("ProFormList"), o = y(() => {
      const {
        max: c,
        total: p,
        readonly: f,
        copyButtonProps: m
      } = e;
      return !(f || m === !1 || c !== void 0 && p >= c);
    }), s = y(() => {
      const {
        min: c,
        total: p,
        readonly: f,
        removeButtonProps: m
      } = e;
      return !(f || m === !1 || c !== void 0 && p <= c);
    }), i = y(() => ({
      text: !0,
      tooltip: n("copyThisLine"),
      renderIcon: () => h(Me, null, {
        default: () => [h(mh, null, null)]
      }),
      ...e.copyButtonProps ?? {}
    })), a = y(() => ({
      text: !0,
      tooltip: n("removeThisLine"),
      renderIcon: () => h(Me, null, {
        default: () => [h(bh, null, null)]
      }),
      ...e.removeButtonProps ?? {}
    }));
    async function l() {
      const {
        path: c,
        index: p,
        total: f,
        actionGuard: m
      } = e, d = p + 1, v = t.getFieldValue(c) ?? {};
      m != null && m.beforeAddRow ? await m.beforeAddRow({
        index: p,
        total: f,
        insertIndex: d
      }) && r.insert(d, Te(v, _t)) : r.insert(d, Te(v, _t));
    }
    async function u() {
      const {
        index: c,
        total: p,
        actionGuard: f
      } = e;
      f != null && f.beforeRemoveRow ? await f.beforeRemoveRow({
        index: c,
        total: p
      }) && r.remove(c) : r.remove(c);
    }
    return {
      copy: l,
      remove: u,
      showCopyButton: o,
      showRemoveButton: s,
      copyButtonProps: i,
      removeButtonProps: a
    };
  },
  render() {
    const {
      copy: e,
      remove: t,
      showCopyButton: r,
      copyButtonProps: n,
      showRemoveButton: o,
      removeButtonProps: s
    } = this, i = r ? h(ot, P(n, {
      onClick: e
    }), null) : null, a = o ? h(ot, P(s, {
      onClick: t
    }), null) : null;
    return h(St, null, [i, a]);
  }
}), cP = /* @__PURE__ */ $({
  name: "FieldItem",
  props: {
    min: Number,
    max: Number,
    actionGuard: Object,
    index: {
      type: Number,
      required: !0
    },
    onlyShowFirstItemLabel: {
      type: Boolean,
      default: void 0
    },
    copyButtonProps: {
      type: [Object, Boolean],
      default: void 0
    },
    removeButtonProps: {
      type: [Object, Boolean],
      default: void 0
    }
  },
  slots: Object,
  setup(e) {
    const t = $n(), r = kr(), {
      readonly: n
    } = Z(), o = ue("n-form-item"), s = Ir(), {
      validateBehavior: i
    } = Tr(), {
      path: a
    } = iP(O(e, "index")), l = y(() => s.value.value.length), u = y(() => {
      const {
        index: p,
        onlyShowFirstItemLabel: f
      } = e;
      return f && p === 0;
    }), c = y(() => {
      var b;
      const {
        heightSmall: p,
        heightMedium: f,
        heightLarge: m
      } = t.value, d = {
        small: p,
        medium: f,
        large: m
      }, v = ((b = o == null ? void 0 : o.mergedSize) == null ? void 0 : b.value) ?? "medium";
      return d[v];
    });
    return _e(lo, {
      showLabel: u
    }), {
      path: a,
      total: l,
      action: r,
      readonly: n,
      actionHeight: c,
      validateBehavior: i
    };
  },
  render() {
    var g;
    const {
      min: e,
      max: t,
      path: r,
      total: n,
      $props: o,
      $slots: s,
      action: i,
      readonly: a,
      actionHeight: l,
      validateBehavior: u
    } = this, {
      index: c,
      actionGuard: p,
      copyButtonProps: f,
      removeButtonProps: m
    } = o, d = h(uP, {
      min: e,
      max: t,
      path: r,
      index: c,
      total: n,
      readonly: a,
      actionGuard: p,
      copyButtonProps: f,
      removeButtonProps: m
    }, null), v = s.action ? s.action({
      total: n,
      index: c,
      action: i,
      actionVNode: d
    }) : h(fe, {
      style: {
        height: l,
        linHeight: l,
        marginBlockEnd: s.item || u === "popover" ? 0 : "var(--n-feedback-height)"
      }
    }, lP(d) ? d : {
      default: () => [d]
    }), b = h(St, null, [(g = s.default) == null ? void 0 : g.call(s, {
      total: n,
      index: c,
      action: i
    })]);
    return s.item ? s.item({
      total: n,
      index: c,
      action: i,
      itemVNode: b,
      actionVNode: v
    }) : h(X, {
      style: {
        display: "flex",
        gap: "0 16px",
        flexWrap: "wrap",
        alignItems: "flex-end"
      }
    }, {
      default: () => [b, v]
    });
  }
}), dP = /* @__PURE__ */ $({
  name: "ProFieldListCreatorButton",
  props: {
    max: Number,
    readonly: {
      type: Boolean,
      required: !0
    },
    total: {
      type: Number,
      required: !0
    },
    creatorButtonProps: {
      type: [Object, Boolean],
      default: void 0
    },
    position: String,
    actionGuard: Object,
    creatorInitialValue: Function
  },
  setup(e) {
    const t = kr(), {
      getMessage: r
    } = Ye("ProFormList"), n = y(() => {
      const {
        max: i,
        total: a,
        readonly: l,
        creatorButtonProps: u
      } = e;
      return !(l || u === !1 || i !== void 0 && a >= i);
    }), o = y(() => {
      const {
        creatorButtonProps: i
      } = e;
      return {
        block: !0,
        dashed: !0,
        content: r("add"),
        renderIcon: () => h(Me, null, {
          default: () => [h(Yh, null, null)]
        }),
        ...i ?? {}
      };
    });
    async function s() {
      const {
        total: i,
        position: a,
        actionGuard: l,
        creatorInitialValue: u
      } = e, c = a === "top" ? 0 : i;
      l != null && l.beforeAddRow ? await l.beforeAddRow({
        total: i,
        index: -1,
        insertIndex: c
      }) && t.insert(c, (u == null ? void 0 : u()) ?? {}) : t.insert(c, (u == null ? void 0 : u()) ?? {});
    }
    return {
      add: s,
      showButton: n,
      buttonProps: o
    };
  },
  render() {
    const {
      add: e,
      $props: t,
      showButton: r,
      buttonProps: n
    } = this;
    return r ? h(ot, P(n, {
      style: {
        marginBlockEnd: t.position === "top" ? "24px" : 0
      },
      onClick: e
    }), null) : null;
  }
}), fP = /* @__PURE__ */ $({
  name: "ProFieldList",
  props: {
    min: Number,
    max: Number,
    position: String,
    value: {
      type: Array,
      required: !0
    },
    actionGuard: Object,
    creatorInitialValue: Function,
    onlyShowFirstItemLabel: {
      type: Boolean,
      default: void 0
    },
    creatorButtonProps: {
      type: [Object, Boolean],
      default: void 0
    },
    copyButtonProps: {
      type: [Object, Boolean],
      default: void 0
    },
    removeButtonProps: {
      type: [Object, Boolean],
      default: void 0
    }
  },
  slots: Object,
  setup(e, {
    expose: t
  }) {
    const r = xr(), {
      readonly: n
    } = Z(), {
      pop: o,
      push: s,
      move: i,
      shift: a,
      insert: l,
      moveUp: u,
      remove: c,
      unshift: p,
      moveDown: f,
      onActionChange: m,
      stringPath: d
    } = gt(), v = y(() => e.value.length);
    m((g) => {
      ["pop", "push", "shift", "insert", "remove", "unshift"].includes(g) && ve(() => {
        r.validate(d.value);
      });
    });
    const b = {
      pop: o,
      push: s,
      move: i,
      shift: a,
      insert: l,
      moveUp: u,
      remove: c,
      unshift: p,
      moveDown: f
    };
    return t(b), Qi(b), {
      total: v,
      readonly: n
    };
  },
  render() {
    const {
      total: e,
      $props: t,
      $slots: r,
      readonly: n,
      value: o
    } = this, {
      min: s,
      max: i,
      actionGuard: a,
      copyButtonProps: l,
      removeButtonProps: u,
      position: c = "bottom",
      creatorButtonProps: p,
      creatorInitialValue: f,
      onlyShowFirstItemLabel: m
    } = t, d = o.map((b, g) => h(cP, {
      key: b[_t],
      min: s,
      max: i,
      index: g,
      actionGuard: a,
      copyButtonProps: l,
      removeButtonProps: u,
      onlyShowFirstItemLabel: m
    }, r)), v = h(dP, {
      max: i,
      total: e,
      readonly: n,
      position: c,
      actionGuard: a,
      creatorButtonProps: p,
      creatorInitialValue: f
    }, null);
    return r.container ? r.container({
      listVNode: d,
      creatorButtonVNode: v
    }) : h(St, null, [c === "top" && v, d, c === "bottom" && v]);
  }
}), pP = /* @__PURE__ */ $({
  name: "ProFormList",
  props: Xi,
  slots: Object,
  setup(e, {
    expose: t
  }) {
    const [r, n] = Yi(), o = y(() => {
      const {
        min: i,
        max: a,
        position: l,
        actionGuard: u,
        copyButtonProps: c,
        removeButtonProps: p,
        creatorButtonProps: f,
        creatorInitialValue: m,
        onlyShowFirstItemLabel: d,
        ...v
      } = e;
      return {
        proFieldProps: v,
        fieldListProps: {
          min: i,
          max: a,
          position: l,
          actionGuard: u,
          copyButtonProps: c,
          removeButtonProps: p,
          creatorButtonProps: f,
          creatorInitialValue: m,
          onlyShowFirstItemLabel: d
        }
      };
    });
    wr("ProFormItem", "pro-form-item", rP);
    function s(i) {
      const {
        postState: a
      } = e;
      if (!W(i))
        return a ? a(i) : [];
      const l = i.map((u) => u[_t] ? u : {
        ...u,
        [_t]: ut()
      });
      return a ? a(l) : l;
    }
    return t(n), {
      instRef: r,
      separateProps: o,
      autoCreateRowId: s
    };
  },
  render() {
    return h(k, P({
      ref: "instRef",
      class: "n-pro-form-item"
    }, this.separateProps.proFieldProps, {
      "is-list": !0,
      "post-state": this.autoCreateRowId,
      "field-props": this.separateProps.fieldListProps,
      valueType: T.FORM_LIST
    }), {
      ...this.$slots,
      input: (e) => h(fP, e, this.$slots)
    });
  }
});
function hP(e) {
  const {
    field: t,
    title: r,
    label: n,
    readonly: o,
    valueType: s,
    fieldProps: i,
    placeholder: a,
    behavior: l,
    showLabel: u,
    behaviorProps: c
  } = e, {
    getMessage: p
  } = Ye("ProForm"), {
    presetFieldProps: f
  } = Ne(), {
    showLabel: m
  } = ue(lo, null) ?? {}, {
    validateBehavior: d,
    validateBehaviorProps: v,
    readonly: b
  } = Tr(), g = y(() => r.value ?? n.value), w = y(() => {
    const B = a.value;
    if (B !== void 0)
      return B;
    if (!t.isList)
      return p("fieldPlaceholder")(Pr(g.value), s.value);
  }), x = y(() => {
    const B = o.value, S = V(b);
    return B !== void 0 ? !!B : S !== void 0 ? !!S : !1;
  }), _ = y(() => l.value ?? d.value ?? "default"), j = y(() => ({
    ...v.value ?? {},
    ...c.value ?? {}
  })), F = y(() => {
    if (u.value !== void 0)
      return u.value;
    if ((m == null ? void 0 : m.value) !== void 0)
      return m.value;
  }), q = y(() => {
    const B = s.value;
    return {
      ...V(f)[B] ?? {},
      ...i.value ?? {}
    };
  });
  return {
    mergedTitle: g,
    mergedReadonly: x,
    mergedBehavior: _,
    mergedShowLabel: F,
    mergedFieldProps: q,
    mergedPlaceholder: w,
    mergedBehaviorProps: j
  };
}
function mP(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !de(e);
}
const k = /* @__PURE__ */ $({
  name: "ProField",
  inheritAttrs: !1,
  props: te,
  slots: Object,
  setup(e, {
    slots: t
  }) {
    const r = tP(e), {
      show: n,
      value: o,
      isList: s,
      stringPath: i,
      doUpdateValue: a
    } = r, {
      size: l,
      rule: u,
      label: c,
      title: p,
      first: f,
      simple: m,
      tooltip: d,
      rulePath: v,
      feedback: b,
      required: g,
      valueType: w,
      labelWidth: x,
      labelAlign: _,
      labelProps: j,
      labelStyle: F,
      fieldProps: q,
      addonAfter: B,
      addonBefore: S,
      feedbackClass: L,
      feedbackStyle: N,
      valueModelName: re,
      labelPlacement: D,
      showRequireMark: I,
      ignorePathChange: E,
      validationStatus: A,
      attrs: C,
      requireMarkPlacement: ne,
      readonly: se,
      showLabel: Nr,
      placeholder: Ur,
      showFeedback: Xt,
      validateBehavior: Jt,
      validateBehaviorProps: U
    } = eP(r, e), {
      mergedTitle: he,
      mergedReadonly: we,
      mergedBehavior: me,
      mergedShowLabel: $e,
      mergedFieldProps: Ue,
      mergedPlaceholder: $o,
      mergedBehaviorProps: El
    } = hP({
      title: p,
      label: c,
      field: r,
      valueType: w,
      fieldProps: q,
      readonly: se,
      showLabel: Nr,
      placeholder: Ur,
      behavior: Jt,
      behaviorProps: U
    }), Cl = y(() => Xt.value ?? me.value !== "popover"), xo = y(() => {
      const Et = re.value;
      if (!Et)
        return {};
      if (s)
        return {
          [Et]: o.value
        };
      const Il = `onUpdate${Et.slice(0, 1).toUpperCase()}${Et.slice(1)}`;
      return {
        [Et]: o.value,
        [Il]: a
      };
    }), Ml = y(() => $o.value === void 0 ? {
      ...Ue.value,
      ...xo.value
    } : {
      ...Ue.value,
      ...xo.value,
      placeholder: $o.value
    }), Rl = y(() => ({
      ...C.value,
      size: l.value,
      rule: u.value,
      first: f.value,
      tooltip: d.value,
      path: i.value,
      rulePath: v.value,
      feedback: b.value,
      title: he.value,
      required: g.value,
      labelWidth: x.value,
      labelAlign: _.value,
      labelProps: j.value,
      labelStyle: F.value,
      showLabel: $e.value,
      showFeedback: Cl.value,
      feedbackClass: L.value,
      feedbackStyle: N.value,
      labelPlacement: D.value,
      showRequireMark: I.value,
      ignorePathChange: E.value,
      validationStatus: A.value,
      requireMarkPlacement: ne.value
    })), Dl = y(() => Wa(t, ["label", "tooltip", "feedback"]));
    return r[Xe] = {
      valueType: w,
      readonly: we
    }, {
      show: n,
      simple: m,
      addonAfter: B,
      addonBefore: S,
      fieldBindProps: Ml,
      mergedBehavior: me,
      proFormItemSlots: Dl,
      mergedBehaviorProps: El,
      proFormItemBindProps: Rl
    };
  },
  render() {
    const {
      $slots: e,
      addonAfter: t,
      addonBefore: r,
      fieldBindProps: n
    } = this, o = () => {
      var m;
      const l = e.group, u = (m = e.input) == null ? void 0 : m.call(e, n), c = e["addon-after"] ?? (() => t), p = e["addon-before"] ?? (() => r);
      if (!t && !r && !e["addon-after"] && !e["addon-before"])
        return u;
      const f = h(St, null, [p(), u, c()]);
      return l ? l(f) : h(fe, {
        wrap: !1,
        align: "center",
        size: [8, 0],
        style: {
          width: "100%"
        }
      }, mP(f) ? f : {
        default: () => [f]
      });
    };
    if (!this.show)
      return null;
    if (this.simple)
      return o();
    const {
      mergedBehavior: s,
      mergedBehaviorProps: i,
      proFormItemBindProps: a
    } = this;
    return s === "popover" ? h(Hi, P(a, {
      popoverProps: i
    }), {
      ...this.proFormItemSlots,
      default: o
    }) : h(ao, a, {
      ...this.proFormItemSlots,
      default: o
    });
  }
}), Zi = {
  ...te,
  fieldProps: {
    type: Object,
    default: () => ({})
  }
}, vP = /* @__PURE__ */ $({
  name: "ProFieldRate",
  props: Zl,
  slots: Object,
  inheritAttrs: !1,
  setup() {
    const {
      readonly: e
    } = Z();
    return {
      readonly: e
    };
  },
  render() {
    return this.readonly ? this.$slots.readonly ? this.$slots.readonly(this.$props) : h(jo, P(this.$props, this.$attrs, {
      readonly: !0
    }), this.$slots) : h(jo, P(this.$props, this.$attrs), this.$slots);
  }
}), gP = /* @__PURE__ */ $({
  name: "ProRate",
  props: Zi,
  slots: Object,
  setup() {
  },
  render() {
    return h(k, P(this.$props, {
      defaultValue: null,
      valueType: T.RATE
    }), {
      ...this.$slots,
      input: (e) => h(vP, e, this.$slots)
    });
  }
}), Br = oe("ProInput"), co = oe("ProPassword"), yP = oe("ProTextareaInst"), Vr = {
  ...te,
  fieldProps: {
    type: Object,
    default: () => ({})
  }
};
function Hr(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !de(e);
}
const el = /* @__PURE__ */ $({
  name: "ProFieldInput",
  props: da,
  slots: Object,
  inheritAttrs: !1,
  setup(e, {
    expose: t
  }) {
    const [r, n] = Br(), {
      empty: o,
      value: s,
      readonly: i,
      emptyText: a
    } = Z();
    return t(n), {
      empty: o,
      value: s,
      instRef: r,
      readonly: i,
      emptyText: a
    };
  },
  render() {
    if (this.readonly) {
      let e, t;
      const {
        value: r,
        empty: n,
        emptyText: o,
        $slots: s
      } = this;
      return s.readonly ? s.readonly(this.$props) : n ? o : h(fe, {
        size: [8, 0]
      }, {
        default: () => [s.prefix && h(X, null, Hr(e = this.$slots.prefix()) ? e : {
          default: () => [e]
        }), h(X, null, Hr(r) ? r : {
          default: () => [r]
        }), s.suffix && h(X, null, Hr(t = this.$slots.suffix()) ? t : {
          default: () => [t]
        })]
      });
    }
    return h(fa, P({
      ref: "instRef"
    }, this.$props, this.$attrs), this.$slots);
  }
}), bP = /* @__PURE__ */ $({
  name: "ProInput",
  props: Vr,
  slots: Object,
  setup(e, {
    expose: t
  }) {
    const [r, n] = Br();
    return t(n), {
      instRef: r
    };
  },
  render() {
    return h(k, P(this.$props, {
      defaultValue: null,
      fieldProps: {
        ...this.$props.fieldProps,
        type: "text"
      },
      valueType: T.INPUT
    }), {
      ...this.$slots,
      input: (e) => h(el, P({
        ref: "instRef"
      }, e), this.$slots)
    });
  }
}), PP = /* @__PURE__ */ $({
  name: "ProTextarea",
  props: Vr,
  slots: Object,
  setup(e, {
    expose: t
  }) {
    const [r, n] = Br();
    return t(n), {
      instRef: r
    };
  },
  render() {
    return h(k, P(this.$props, {
      defaultValue: null,
      fieldProps: {
        ...this.$props.fieldProps,
        type: "textarea"
      },
      valueType: T.TEXTAREA
    }), {
      ...this.$slots,
      input: (e) => h(el, P({
        ref: "instRef"
      }, e), this.$slots)
    });
  }
}), wP = /* @__PURE__ */ $({
  name: "ProFieldPassword",
  props: da,
  slots: Object,
  inheritAttrs: !1,
  setup(e, {
    expose: t
  }) {
    const r = R(!1), [n, o] = co(), {
      empty: s,
      value: i,
      readonly: a,
      emptyText: l
    } = Z();
    function u(c) {
      r.value = c;
    }
    return t(o), {
      open: r,
      empty: s,
      value: i,
      instRef: n,
      setOpen: u,
      readonly: a,
      emptyText: l
    };
  },
  render() {
    if (this.readonly) {
      const {
        value: e,
        empty: t,
        emptyText: r
      } = this;
      return this.$slots.readonly ? this.$slots.readonly(this.$props) : t ? r : h(fe, {
        align: "center",
        wrap: !1
      }, {
        default: () => [this.open ? e : "********", h(Lt, {
          type: "primary",
          text: !0,
          onClick: () => this.setOpen(!this.open)
        }, {
          default: () => [h(Me, {
            size: 16
          }, {
            default: () => [this.open ? h(Eh, null, null) : h(Oh, null, null)]
          })]
        })]
      });
    }
    return h(fa, P({
      ref: "instRef"
    }, this.$props, this.$attrs), this.$slots);
  }
}), $P = /* @__PURE__ */ $({
  name: "ProPassword",
  props: Vr,
  slots: Object,
  setup(e, {
    expose: t
  }) {
    const [r, n] = co();
    return t(n), {
      instRef: r
    };
  },
  render() {
    return h(k, P(this.$props, {
      defaultValue: null,
      fieldProps: {
        ...this.$props.fieldProps,
        type: "password"
      },
      valueType: T.PASSWORD
    }), {
      ...this.$slots,
      input: (e) => h(wP, P({
        ref: "instRef"
      }, e), this.$slots)
    });
  }
}), fo = oe("ProDigit"), tl = {
  ...te,
  fieldProps: {
    type: Object,
    default: () => ({})
  }
};
function Yr(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !de(e);
}
const xP = /* @__PURE__ */ $({
  name: "ProFieldDigit",
  props: eu,
  slots: Object,
  inheritAttrs: !1,
  setup(e, {
    expose: t
  }) {
    const [r, n] = fo(), {
      empty: o,
      value: s,
      readonly: i,
      emptyText: a
    } = Z();
    return t(n), {
      empty: o,
      value: s,
      instRef: r,
      readonly: i,
      emptyText: a
    };
  },
  render() {
    if (this.readonly) {
      let e, t;
      const {
        value: r,
        empty: n,
        emptyText: o,
        $slots: s
      } = this;
      return s.readonly ? s.readonly(this.$props) : n ? o : h(fe, {
        size: [8, 0]
      }, {
        default: () => [s.prefix && h(X, null, Yr(e = this.$slots.prefix()) ? e : {
          default: () => [e]
        }), h(X, null, Yr(r) ? r : {
          default: () => [r]
        }), s.suffix && h(X, null, Yr(t = this.$slots.suffix()) ? t : {
          default: () => [t]
        })]
      });
    }
    return h(tu, P({
      ref: "instRef"
    }, this.$props, this.$attrs), this.$slots);
  }
}), TP = /* @__PURE__ */ $({
  name: "ProDigit",
  props: tl,
  slots: Object,
  setup(e, {
    expose: t
  }) {
    const [r, n] = fo();
    function o(s) {
      if (e.postState)
        return e.postState(s);
      if (ye(s)) {
        if (s === "")
          return null;
        const i = Number(s);
        return Number.isNaN(i) ? s : i;
      }
      return s;
    }
    return t(n), {
      instRef: r,
      tryConvertStringToNumber: o
    };
  },
  render() {
    return h(k, P(this.$props, {
      defaultValue: null,
      postState: this.tryConvertStringToNumber,
      valueType: T.DIGIT
    }), {
      ...this.$slots,
      input: (e) => h(xP, P({
        ref: "instRef"
      }, e), this.$slots)
    });
  }
}), rl = {
  ...te,
  fieldProps: {
    type: Object,
    default: () => ({})
  }
}, _P = /* @__PURE__ */ $({
  name: "ProFieldSlider",
  props: ru,
  slots: Object,
  inheritAttrs: !1,
  setup() {
    const {
      readonly: e,
      readonlyText: t
    } = Z();
    return {
      readonly: e,
      readonlyText: t
    };
  },
  render() {
    if (this.readonly) {
      const {
        readonlyText: e
      } = this;
      return this.$slots.readonly ? this.$slots.readonly(this.$props) : e;
    }
    return h(nu, P(this.$props, this.$attrs), this.$slots);
  }
}), SP = /* @__PURE__ */ $({
  name: "ProSlider",
  props: rl,
  slots: Object,
  setup() {
  },
  render() {
    return h(k, P(this.$props, {
      defaultValue: null,
      valueType: T.SLIDER
    }), {
      ...this.$slots,
      input: (e) => h(_P, e, this.$slots)
    });
  }
}), nl = {
  ...te,
  fieldProps: {
    type: Object,
    default: () => ({})
  }
}, OP = /* @__PURE__ */ $({
  name: "ProFieldSwitch",
  props: ou,
  slots: Object,
  inheritAttrs: !1,
  setup() {
    const {
      value: e,
      readonly: t
    } = Z();
    return {
      value: e,
      readonly: t
    };
  },
  render() {
    var e, t, r, n;
    if (this.readonly) {
      const {
        value: o
      } = this;
      return this.$slots.readonly ? this.$slots.readonly(this.$props) : o ? ((t = (e = this.$slots).checked) == null ? void 0 : t.call(e)) ?? "打开" : ((n = (r = this.$slots).unchecked) == null ? void 0 : n.call(r)) ?? "关闭";
    }
    return h(su, P(this.$props, this.$attrs), this.$slots);
  }
}), FP = /* @__PURE__ */ $({
  name: "ProSwitch",
  props: nl,
  slots: Object,
  setup() {
  },
  render() {
    return h(k, P(this.$props, {
      defaultValue: !1,
      valueType: T.SWITCH
    }), {
      ...this.$slots,
      input: (e) => h(OP, e, this.$slots)
    });
  }
}), po = oe("ProUpload"), vn = {
  /**
   * 按钮文本，优先级低于插槽
   */
  title: String,
  /**
   * 文件的最大大小，单位 kb
   */
  maxSize: Number,
  /**
   * 是否只允许上传图片类型
   */
  onlyAcceptImage: {
    type: Boolean,
    default: void 0
  },
  /**
   * 超出文件最大大小时触发的回调
   */
  onOverFileMaxSize: Function,
  /**
   * 上传不支持类型文件时触发的回调
   */
  onUnAcceptType: Function
}, ol = {
  ...te,
  fieldProps: {
    type: Object,
    default: () => ({})
  }
};
function jP(e, t) {
  if (so(e))
    return t ? t(e) : [];
  W(e) || (e = [e].filter(Boolean));
  const r = e.map((n) => ye(n) ? {
    id: ut(),
    url: n,
    name: n,
    status: "finished"
  } : {
    id: ut(),
    ...n
  });
  return t ? t(r) : r;
}
const AP = /* @__PURE__ */ $({
  name: "ProFieldUpload",
  props: {
    ...au,
    ...vn
  },
  slots: Object,
  inheritAttrs: !1,
  setup(e, {
    expose: t
  }) {
    const [r, n] = po(), {
      empty: o,
      readonly: s,
      emptyText: i
    } = Z(), a = jt(e, vn), {
      localeRef: l
    } = Ye("ProUpload"), u = y(() => ({
      ...a.value,
      onBeforeUpload: c
    }));
    function c(f) {
      var _, j;
      const {
        maxSize: m,
        onUnAcceptType: d,
        onlyAcceptImage: v,
        onOverFileMaxSize: b,
        onBeforeUpload: g
      } = e, w = (_ = f.file.file) == null ? void 0 : _.size, x = (j = f.file.file) == null ? void 0 : j.name;
      return v && x && !/\.(jpg|jpeg|png|gif|webp)$/i.test(x) ? (d && d(f), !1) : m && w && w > m ? (b && b(m, f), !1) : g ? g(f) : !0;
    }
    function p() {
      var m, d, v, b, g, w;
      if (!e.directory && !e.directoryDnd)
        return;
      const f = r.value;
      (m = f == null ? void 0 : f.$slots) != null && m.default && ((w = (g = (b = (v = (d = f.$slots.default()[0].children) == null ? void 0 : d[0]) == null ? void 0 : v.children) == null ? void 0 : b[0]) == null ? void 0 : g.type) == null ? void 0 : w.name) === "UploadDragger" && (f.draggerInsideRef.value = !0);
    }
    return t(n), {
      empty: o,
      instRef: r,
      readonly: s,
      emptyText: i,
      localeRef: l,
      nUploadProps: u,
      fixUploadDragger: p
    };
  },
  render() {
    if (this.fixUploadDragger(), this.readonly) {
      const {
        empty: e,
        emptyText: t
      } = this;
      return this.$slots.readonly ? this.$slots.readonly(this.$props) : e ? t : h(Ao, P({
        ref: "instRef"
      }, this.$attrs, this.nUploadProps, {
        disabled: !0
      }), {
        ...this.$slots,
        default: () => this.$slots.default ? this.$slots.default() : this.nUploadProps.listType === "image-card" ? this.localeRef.title : h(Lt, {
          type: "primary"
        }, {
          default: () => [this.localeRef.title]
        })
      });
    }
    return h(Ao, P({
      ref: "instRef"
    }, this.$attrs, this.nUploadProps), {
      ...this.$slots,
      default: () => this.$slots.default ? this.$slots.default() : this.nUploadProps.listType === "image-card" ? this.localeRef.title : h(Lt, {
        type: "primary"
      }, {
        default: () => [this.localeRef.title]
      })
    });
  }
}), EP = /* @__PURE__ */ $({
  name: "ProUpload",
  props: ol,
  slots: Object,
  setup(e, {
    expose: t
  }) {
    const [r, n] = po();
    function o(s) {
      return jP(s, e.postState);
    }
    return t(n), {
      instRef: r,
      postState: o
    };
  },
  render() {
    return h(k, P(this.$props, {
      defaultValue: [],
      valueModelName: "fileList",
      valueType: T.UPLOAD,
      postState: this.postState
    }), {
      ...this.$slots,
      input: (e) => h(AP, P({
        ref: "instRef"
      }, e), this.$slots)
    });
  }
}), ho = oe("ProSelect"), sl = {
  ...te,
  fieldProps: {
    type: Object,
    default: () => ({})
  }
};
function Ns(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !de(e);
}
const CP = /* @__PURE__ */ $({
  name: "ProFieldSelect",
  props: iu,
  slots: Object,
  inheritAttrs: !1,
  setup(e, {
    expose: t
  }) {
    const [r, n] = ho(), {
      empty: o,
      value: s,
      readonly: i,
      emptyText: a
    } = Z(), l = y(() => {
      const {
        renderTag: u,
        renderLabel: c,
        options: p = [],
        labelField: f = "label",
        valueField: m = "value",
        childrenField: d = "children"
      } = e, v = [], b = W(s.value) ? s.value : [s.value];
      return At(p, (g) => {
        const w = ie(g, m);
        if (b.includes(w)) {
          let x = ie(g, f);
          u && (x = u({
            option: g,
            handleClose: It
          })), c && (x = c(g, !0)), ge(x) && (x = x(g, !0)), x && v.push(h(X, null, Ns(x) ? x : {
            default: () => [x]
          }));
        }
      }, d), v;
    });
    return t(n), {
      empty: o,
      instRef: r,
      readonly: i,
      emptyText: a,
      selectedLabels: l
    };
  },
  render() {
    if (this.readonly) {
      const {
        empty: e,
        emptyText: t,
        selectedLabels: r
      } = this;
      return this.$slots.readonly ? this.$slots.readonly(this.$props) : e ? t : h(fe, {
        size: [8, 0]
      }, Ns(r) ? r : {
        default: () => [r]
      });
    }
    return h(lu, P({
      ref: "instRef"
    }, this.$props, this.$attrs), this.$slots);
  }
}), MP = /* @__PURE__ */ $({
  name: "ProSelect",
  props: sl,
  slots: Object,
  setup(e, {
    expose: t
  }) {
    const [r, n] = ho();
    return t(n), {
      instRef: r
    };
  },
  render() {
    return h(k, P(this.$props, {
      defaultValue: null,
      valueType: T.SELECT
    }), {
      ...this.$slots,
      input: (e) => h(CP, P({
        ref: "instRef"
      }, e), this.$slots)
    });
  }
}), mo = oe("ProMention"), al = {
  ...te,
  fieldProps: {
    type: Object,
    default: () => ({})
  }
}, RP = /* @__PURE__ */ $({
  name: "ProFieldMention",
  props: uu,
  slots: Object,
  inheritAttrs: !1,
  setup(e, {
    expose: t
  }) {
    const [r, n] = mo(), {
      readonly: o,
      readonlyText: s
    } = Z();
    return t(n), {
      instRef: r,
      readonly: o,
      readonlyText: s
    };
  },
  render() {
    if (this.readonly) {
      const {
        readonlyText: e
      } = this;
      return this.$slots.readonly ? this.$slots.readonly(this.$props) : e;
    }
    return h(cu, P({
      ref: "instRef"
    }, this.$props, this.$attrs), this.$slots);
  }
}), DP = /* @__PURE__ */ $({
  name: "ProMention",
  props: al,
  slots: Object,
  setup(e, {
    expose: t
  }) {
    const [r, n] = mo();
    return t(n), {
      instRef: r
    };
  },
  render() {
    return h(k, P(this.$props, {
      defaultValue: null,
      valueType: T.MENTION
    }), {
      ...this.$slots,
      input: (e) => h(RP, P({
        ref: "instRef"
      }, e), this.$slots)
    });
  }
}), vo = oe("ProCascader"), il = {
  ...te,
  fieldProps: {
    type: Object,
    default: () => ({})
  }
};
function Us(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !de(e);
}
const IP = /* @__PURE__ */ $({
  name: "ProFieldCascader",
  inheritAttrs: !1,
  props: du,
  slots: Object,
  setup(e, {
    expose: t
  }) {
    const [r, n] = vo(), {
      empty: o,
      value: s,
      readonly: i,
      emptyText: a
    } = Z(), l = y(() => {
      const {
        renderLabel: u,
        options: c = [],
        labelField: p = "label",
        valueField: f = "value",
        childrenField: m = "children"
      } = e, d = [], v = W(s.value) ? s.value : [s.value];
      return At(c, (b) => {
        const g = ie(b, f);
        if (v.includes(g)) {
          let w = ie(b, p);
          u && (w = u(b, !0)), w && d.push(h(X, null, Us(w) ? w : {
            default: () => [w]
          }));
        }
      }, m), d;
    });
    return t(n), {
      empty: o,
      value: s,
      instRef: r,
      readonly: i,
      emptyText: a,
      selectedLabels: l
    };
  },
  render() {
    if (this.readonly) {
      const {
        empty: e,
        emptyText: t,
        selectedLabels: r
      } = this;
      return this.$slots.readonly ? this.$slots.readonly(this.$props) : e ? t : h(fe, {
        size: [8, 0]
      }, Us(r) ? r : {
        default: () => [r]
      });
    }
    return h(fu, P({
      ref: "instRef"
    }, this.$props, this.$attrs), this.$slots);
  }
}), kP = /* @__PURE__ */ $({
  name: "ProCascader",
  props: il,
  slots: Object,
  setup(e, {
    expose: t
  }) {
    const [r, n] = vo();
    return t(n), {
      instRef: r
    };
  },
  render() {
    return h(k, P(this.$props, {
      defaultValue: null,
      valueType: T.CASCADER
    }), {
      ...this.$slots,
      input: (e) => h(IP, P({
        ref: "instRef"
      }, e), this.$slots)
    });
  }
}), go = oe("ProCheckbox"), ll = {
  ...te,
  fieldProps: {
    type: Object,
    default: () => ({})
  }
}, BP = /* @__PURE__ */ $({
  name: "ProFieldCheckbox",
  inheritAttrs: !1,
  props: pu,
  slots: Object,
  setup(e, {
    expose: t
  }) {
    const [r, n] = go(), {
      readonly: o
    } = Z();
    return t(n), {
      instRef: r,
      readonly: o
    };
  },
  render() {
    return this.readonly ? this.$slots.readonly ? this.$slots.readonly(this.$props) : h(Zr, P(this.$props, this.$attrs, {
      disabled: !0
    }), this.$slots) : h(Zr, P({
      ref: "instRef"
    }, this.$props, this.$attrs), this.$slots);
  }
}), VP = /* @__PURE__ */ $({
  name: "ProCheckbox",
  props: ll,
  slots: Object,
  setup(e, {
    expose: t
  }) {
    const [r, n] = go();
    return t(n), {
      instRef: r
    };
  },
  render() {
    return h(k, P(this.$props, {
      defaultValue: !1,
      valueModelName: "checked",
      valueType: T.CHECKBOX
    }), {
      ...this.$slots,
      input: (e) => h(BP, P({
        ref: "instRef"
      }, e), this.$slots)
    });
  }
}), ul = {
  ...te,
  fieldProps: {
    type: Object,
    default: () => ({})
  }
}, LP = /* @__PURE__ */ $({
  name: "ProFieldTransfer",
  inheritAttrs: !1,
  props: {
    ...hu,
    labelField: String,
    valueField: String,
    placeholder: Array
  },
  setup(e) {
    const {
      empty: t,
      value: r,
      readonly: n,
      emptyText: o
    } = Z(), s = y(() => {
      const {
        options: l = [],
        labelField: u = "label",
        valueField: c = "value"
      } = e;
      return l.map((p) => {
        const f = ie(p, u), m = ie(p, c);
        return {
          ...Te(p, [u, c]),
          label: f,
          value: m
        };
      });
    }), i = y(() => {
      const {
        placeholder: l,
        ...u
      } = e, [c, p] = l ?? [];
      return {
        ...u,
        options: s.value,
        sourceFilterPlaceholder: c,
        targetFilterPlaceholder: p
      };
    }), a = y(() => {
      const l = r.value ?? [];
      return s.value.filter((u) => l.includes(u.value)).map((u) => u.label);
    });
    return {
      empty: t,
      readonly: n,
      emptyText: o,
      selectedLabels: a,
      nTransferProps: i
    };
  },
  render() {
    if (this.readonly) {
      const {
        empty: e,
        emptyText: t,
        selectedLabels: r
      } = this;
      return this.$slots.readonly ? this.$slots.readonly(this.$props) : e ? t : r.join("，");
    }
    return h(mu, P(this.$attrs, this.nTransferProps), null);
  }
}), NP = /* @__PURE__ */ $({
  name: "ProTransfer",
  props: ul,
  slots: Object,
  setup() {
  },
  render() {
    return h(k, P(this.$props, {
      defaultValue: [],
      valueType: T.TRANSFER
    }), {
      ...this.$slots,
      input: (e) => h(LP, e, this.$slots)
    });
  }
}), pe = oe("ProDatePicker"), Pe = {
  ...te,
  fieldProps: {
    type: Object,
    default: () => ({})
  }
};
function Fe(e) {
  const t = Object.prototype.toString.call(e);
  return e instanceof Date || typeof e == "object" && t === "[object Date]" ? new e.constructor(+e) : typeof e == "number" || t === "[object Number]" || typeof e == "string" || t === "[object String]" ? new Date(e) : /* @__PURE__ */ new Date(NaN);
}
function ct(e, t) {
  return e instanceof Date ? new e.constructor(t) : new Date(t);
}
const cl = 6048e5, UP = 864e5;
let zP = {};
function Lr() {
  return zP;
}
function Gt(e, t) {
  var a, l, u, c;
  const r = Lr(), n = (t == null ? void 0 : t.weekStartsOn) ?? ((l = (a = t == null ? void 0 : t.locale) == null ? void 0 : a.options) == null ? void 0 : l.weekStartsOn) ?? r.weekStartsOn ?? ((c = (u = r.locale) == null ? void 0 : u.options) == null ? void 0 : c.weekStartsOn) ?? 0, o = Fe(e), s = o.getDay(), i = (s < n ? 7 : 0) + s - n;
  return o.setDate(o.getDate() - i), o.setHours(0, 0, 0, 0), o;
}
function ur(e) {
  return Gt(e, { weekStartsOn: 1 });
}
function dl(e) {
  const t = Fe(e), r = t.getFullYear(), n = ct(e, 0);
  n.setFullYear(r + 1, 0, 4), n.setHours(0, 0, 0, 0);
  const o = ur(n), s = ct(e, 0);
  s.setFullYear(r, 0, 4), s.setHours(0, 0, 0, 0);
  const i = ur(s);
  return t.getTime() >= o.getTime() ? r + 1 : t.getTime() >= i.getTime() ? r : r - 1;
}
function zs(e) {
  const t = Fe(e);
  return t.setHours(0, 0, 0, 0), t;
}
function Ks(e) {
  const t = Fe(e), r = new Date(
    Date.UTC(
      t.getFullYear(),
      t.getMonth(),
      t.getDate(),
      t.getHours(),
      t.getMinutes(),
      t.getSeconds(),
      t.getMilliseconds()
    )
  );
  return r.setUTCFullYear(t.getFullYear()), +e - +r;
}
function KP(e, t) {
  const r = zs(e), n = zs(t), o = +r - Ks(r), s = +n - Ks(n);
  return Math.round((o - s) / UP);
}
function WP(e) {
  const t = dl(e), r = ct(e, 0);
  return r.setFullYear(t, 0, 4), r.setHours(0, 0, 0, 0), ur(r);
}
function fl(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function qP(e) {
  if (!fl(e) && typeof e != "number")
    return !1;
  const t = Fe(e);
  return !isNaN(Number(t));
}
function GP(e) {
  const t = Fe(e), r = ct(e, 0);
  return r.setFullYear(t.getFullYear(), 0, 1), r.setHours(0, 0, 0, 0), r;
}
const HP = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
}, YP = (e, t, r) => {
  let n;
  const o = HP[e];
  return typeof o == "string" ? n = o : t === 1 ? n = o.one : n = o.other.replace("{{count}}", t.toString()), r != null && r.addSuffix ? r.comparison && r.comparison > 0 ? "in " + n : n + " ago" : n;
};
function Qr(e) {
  return (t = {}) => {
    const r = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[r] || e.formats[e.defaultWidth];
  };
}
const QP = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, XP = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, JP = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, ZP = {
  date: Qr({
    formats: QP,
    defaultWidth: "full"
  }),
  time: Qr({
    formats: XP,
    defaultWidth: "full"
  }),
  dateTime: Qr({
    formats: JP,
    defaultWidth: "full"
  })
}, e1 = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, t1 = (e, t, r, n) => e1[e];
function Rt(e) {
  return (t, r) => {
    const n = r != null && r.context ? String(r.context) : "standalone";
    let o;
    if (n === "formatting" && e.formattingValues) {
      const i = e.defaultFormattingWidth || e.defaultWidth, a = r != null && r.width ? String(r.width) : i;
      o = e.formattingValues[a] || e.formattingValues[i];
    } else {
      const i = e.defaultWidth, a = r != null && r.width ? String(r.width) : e.defaultWidth;
      o = e.values[a] || e.values[i];
    }
    const s = e.argumentCallback ? e.argumentCallback(t) : t;
    return o[s];
  };
}
const r1 = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, n1 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, o1 = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
}, s1 = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
}, a1 = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
}, i1 = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
}, l1 = (e, t) => {
  const r = Number(e), n = r % 100;
  if (n > 20 || n < 10)
    switch (n % 10) {
      case 1:
        return r + "st";
      case 2:
        return r + "nd";
      case 3:
        return r + "rd";
    }
  return r + "th";
}, u1 = {
  ordinalNumber: l1,
  era: Rt({
    values: r1,
    defaultWidth: "wide"
  }),
  quarter: Rt({
    values: n1,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: Rt({
    values: o1,
    defaultWidth: "wide"
  }),
  day: Rt({
    values: s1,
    defaultWidth: "wide"
  }),
  dayPeriod: Rt({
    values: a1,
    defaultWidth: "wide",
    formattingValues: i1,
    defaultFormattingWidth: "wide"
  })
};
function Dt(e) {
  return (t, r = {}) => {
    const n = r.width, o = n && e.matchPatterns[n] || e.matchPatterns[e.defaultMatchWidth], s = t.match(o);
    if (!s)
      return null;
    const i = s[0], a = n && e.parsePatterns[n] || e.parsePatterns[e.defaultParseWidth], l = Array.isArray(a) ? d1(a, (p) => p.test(i)) : (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      c1(a, (p) => p.test(i))
    );
    let u;
    u = e.valueCallback ? e.valueCallback(l) : l, u = r.valueCallback ? (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      r.valueCallback(u)
    ) : u;
    const c = t.slice(i.length);
    return { value: u, rest: c };
  };
}
function c1(e, t) {
  for (const r in e)
    if (Object.prototype.hasOwnProperty.call(e, r) && t(e[r]))
      return r;
}
function d1(e, t) {
  for (let r = 0; r < e.length; r++)
    if (t(e[r]))
      return r;
}
function f1(e) {
  return (t, r = {}) => {
    const n = t.match(e.matchPattern);
    if (!n)
      return null;
    const o = n[0], s = t.match(e.parsePattern);
    if (!s)
      return null;
    let i = e.valueCallback ? e.valueCallback(s[0]) : s[0];
    i = r.valueCallback ? r.valueCallback(i) : i;
    const a = t.slice(o.length);
    return { value: i, rest: a };
  };
}
const p1 = /^(\d+)(th|st|nd|rd)?/i, h1 = /\d+/i, m1 = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, v1 = {
  any: [/^b/i, /^(a|c)/i]
}, g1 = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, y1 = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, b1 = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, P1 = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
}, w1 = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, $1 = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, x1 = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, T1 = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
}, _1 = {
  ordinalNumber: f1({
    matchPattern: p1,
    parsePattern: h1,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: Dt({
    matchPatterns: m1,
    defaultMatchWidth: "wide",
    parsePatterns: v1,
    defaultParseWidth: "any"
  }),
  quarter: Dt({
    matchPatterns: g1,
    defaultMatchWidth: "wide",
    parsePatterns: y1,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: Dt({
    matchPatterns: b1,
    defaultMatchWidth: "wide",
    parsePatterns: P1,
    defaultParseWidth: "any"
  }),
  day: Dt({
    matchPatterns: w1,
    defaultMatchWidth: "wide",
    parsePatterns: $1,
    defaultParseWidth: "any"
  }),
  dayPeriod: Dt({
    matchPatterns: x1,
    defaultMatchWidth: "any",
    parsePatterns: T1,
    defaultParseWidth: "any"
  })
}, S1 = {
  code: "en-US",
  formatDistance: YP,
  formatLong: ZP,
  formatRelative: t1,
  localize: u1,
  match: _1,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function O1(e) {
  const t = Fe(e);
  return KP(t, GP(t)) + 1;
}
function F1(e) {
  const t = Fe(e), r = +ur(t) - +WP(t);
  return Math.round(r / cl) + 1;
}
function pl(e, t) {
  var c, p, f, m;
  const r = Fe(e), n = r.getFullYear(), o = Lr(), s = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((p = (c = t == null ? void 0 : t.locale) == null ? void 0 : c.options) == null ? void 0 : p.firstWeekContainsDate) ?? o.firstWeekContainsDate ?? ((m = (f = o.locale) == null ? void 0 : f.options) == null ? void 0 : m.firstWeekContainsDate) ?? 1, i = ct(e, 0);
  i.setFullYear(n + 1, 0, s), i.setHours(0, 0, 0, 0);
  const a = Gt(i, t), l = ct(e, 0);
  l.setFullYear(n, 0, s), l.setHours(0, 0, 0, 0);
  const u = Gt(l, t);
  return r.getTime() >= a.getTime() ? n + 1 : r.getTime() >= u.getTime() ? n : n - 1;
}
function j1(e, t) {
  var a, l, u, c;
  const r = Lr(), n = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((l = (a = t == null ? void 0 : t.locale) == null ? void 0 : a.options) == null ? void 0 : l.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((c = (u = r.locale) == null ? void 0 : u.options) == null ? void 0 : c.firstWeekContainsDate) ?? 1, o = pl(e, t), s = ct(e, 0);
  return s.setFullYear(o, 0, n), s.setHours(0, 0, 0, 0), Gt(s, t);
}
function A1(e, t) {
  const r = Fe(e), n = +Gt(r, t) - +j1(r, t);
  return Math.round(n / cl) + 1;
}
function z(e, t) {
  const r = e < 0 ? "-" : "", n = Math.abs(e).toString().padStart(t, "0");
  return r + n;
}
const Qe = {
  // Year
  y(e, t) {
    const r = e.getFullYear(), n = r > 0 ? r : 1 - r;
    return z(t === "yy" ? n % 100 : n, t.length);
  },
  // Month
  M(e, t) {
    const r = e.getMonth();
    return t === "M" ? String(r + 1) : z(r + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return z(e.getDate(), t.length);
  },
  // AM or PM
  a(e, t) {
    const r = e.getHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return r.toUpperCase();
      case "aaa":
        return r;
      case "aaaaa":
        return r[0];
      case "aaaa":
      default:
        return r === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h(e, t) {
    return z(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return z(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return z(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return z(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const r = t.length, n = e.getMilliseconds(), o = Math.trunc(
      n * Math.pow(10, r - 3)
    );
    return z(o, t.length);
  }
}, yt = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, Ws = {
  // Era
  G: function(e, t, r) {
    const n = e.getFullYear() > 0 ? 1 : 0;
    switch (t) {
      case "G":
      case "GG":
      case "GGG":
        return r.era(n, { width: "abbreviated" });
      case "GGGGG":
        return r.era(n, { width: "narrow" });
      case "GGGG":
      default:
        return r.era(n, { width: "wide" });
    }
  },
  // Year
  y: function(e, t, r) {
    if (t === "yo") {
      const n = e.getFullYear(), o = n > 0 ? n : 1 - n;
      return r.ordinalNumber(o, { unit: "year" });
    }
    return Qe.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, r, n) {
    const o = pl(e, n), s = o > 0 ? o : 1 - o;
    if (t === "YY") {
      const i = s % 100;
      return z(i, 2);
    }
    return t === "Yo" ? r.ordinalNumber(s, { unit: "year" }) : z(s, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const r = dl(e);
    return z(r, t.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(e, t) {
    const r = e.getFullYear();
    return z(r, t.length);
  },
  // Quarter
  Q: function(e, t, r) {
    const n = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      case "Q":
        return String(n);
      case "QQ":
        return z(n, 2);
      case "Qo":
        return r.ordinalNumber(n, { unit: "quarter" });
      case "QQQ":
        return r.quarter(n, {
          width: "abbreviated",
          context: "formatting"
        });
      case "QQQQQ":
        return r.quarter(n, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return r.quarter(n, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(e, t, r) {
    const n = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      case "q":
        return String(n);
      case "qq":
        return z(n, 2);
      case "qo":
        return r.ordinalNumber(n, { unit: "quarter" });
      case "qqq":
        return r.quarter(n, {
          width: "abbreviated",
          context: "standalone"
        });
      case "qqqqq":
        return r.quarter(n, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return r.quarter(n, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(e, t, r) {
    const n = e.getMonth();
    switch (t) {
      case "M":
      case "MM":
        return Qe.M(e, t);
      case "Mo":
        return r.ordinalNumber(n + 1, { unit: "month" });
      case "MMM":
        return r.month(n, {
          width: "abbreviated",
          context: "formatting"
        });
      case "MMMMM":
        return r.month(n, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return r.month(n, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(e, t, r) {
    const n = e.getMonth();
    switch (t) {
      case "L":
        return String(n + 1);
      case "LL":
        return z(n + 1, 2);
      case "Lo":
        return r.ordinalNumber(n + 1, { unit: "month" });
      case "LLL":
        return r.month(n, {
          width: "abbreviated",
          context: "standalone"
        });
      case "LLLLL":
        return r.month(n, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return r.month(n, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(e, t, r, n) {
    const o = A1(e, n);
    return t === "wo" ? r.ordinalNumber(o, { unit: "week" }) : z(o, t.length);
  },
  // ISO week of year
  I: function(e, t, r) {
    const n = F1(e);
    return t === "Io" ? r.ordinalNumber(n, { unit: "week" }) : z(n, t.length);
  },
  // Day of the month
  d: function(e, t, r) {
    return t === "do" ? r.ordinalNumber(e.getDate(), { unit: "date" }) : Qe.d(e, t);
  },
  // Day of year
  D: function(e, t, r) {
    const n = O1(e);
    return t === "Do" ? r.ordinalNumber(n, { unit: "dayOfYear" }) : z(n, t.length);
  },
  // Day of week
  E: function(e, t, r) {
    const n = e.getDay();
    switch (t) {
      case "E":
      case "EE":
      case "EEE":
        return r.day(n, {
          width: "abbreviated",
          context: "formatting"
        });
      case "EEEEE":
        return r.day(n, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return r.day(n, {
          width: "short",
          context: "formatting"
        });
      case "EEEE":
      default:
        return r.day(n, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(e, t, r, n) {
    const o = e.getDay(), s = (o - n.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      case "e":
        return String(s);
      case "ee":
        return z(s, 2);
      case "eo":
        return r.ordinalNumber(s, { unit: "day" });
      case "eee":
        return r.day(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "eeeee":
        return r.day(o, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return r.day(o, {
          width: "short",
          context: "formatting"
        });
      case "eeee":
      default:
        return r.day(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(e, t, r, n) {
    const o = e.getDay(), s = (o - n.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      case "c":
        return String(s);
      case "cc":
        return z(s, t.length);
      case "co":
        return r.ordinalNumber(s, { unit: "day" });
      case "ccc":
        return r.day(o, {
          width: "abbreviated",
          context: "standalone"
        });
      case "ccccc":
        return r.day(o, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return r.day(o, {
          width: "short",
          context: "standalone"
        });
      case "cccc":
      default:
        return r.day(o, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(e, t, r) {
    const n = e.getDay(), o = n === 0 ? 7 : n;
    switch (t) {
      case "i":
        return String(o);
      case "ii":
        return z(o, t.length);
      case "io":
        return r.ordinalNumber(o, { unit: "day" });
      case "iii":
        return r.day(n, {
          width: "abbreviated",
          context: "formatting"
        });
      case "iiiii":
        return r.day(n, {
          width: "narrow",
          context: "formatting"
        });
      case "iiiiii":
        return r.day(n, {
          width: "short",
          context: "formatting"
        });
      case "iiii":
      default:
        return r.day(n, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(e, t, r) {
    const o = e.getHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return r.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return r.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return r.dayPeriod(o, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return r.dayPeriod(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(e, t, r) {
    const n = e.getHours();
    let o;
    switch (n === 12 ? o = yt.noon : n === 0 ? o = yt.midnight : o = n / 12 >= 1 ? "pm" : "am", t) {
      case "b":
      case "bb":
        return r.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return r.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return r.dayPeriod(o, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return r.dayPeriod(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(e, t, r) {
    const n = e.getHours();
    let o;
    switch (n >= 17 ? o = yt.evening : n >= 12 ? o = yt.afternoon : n >= 4 ? o = yt.morning : o = yt.night, t) {
      case "B":
      case "BB":
      case "BBB":
        return r.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return r.dayPeriod(o, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return r.dayPeriod(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(e, t, r) {
    if (t === "ho") {
      let n = e.getHours() % 12;
      return n === 0 && (n = 12), r.ordinalNumber(n, { unit: "hour" });
    }
    return Qe.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, r) {
    return t === "Ho" ? r.ordinalNumber(e.getHours(), { unit: "hour" }) : Qe.H(e, t);
  },
  // Hour [0-11]
  K: function(e, t, r) {
    const n = e.getHours() % 12;
    return t === "Ko" ? r.ordinalNumber(n, { unit: "hour" }) : z(n, t.length);
  },
  // Hour [1-24]
  k: function(e, t, r) {
    let n = e.getHours();
    return n === 0 && (n = 24), t === "ko" ? r.ordinalNumber(n, { unit: "hour" }) : z(n, t.length);
  },
  // Minute
  m: function(e, t, r) {
    return t === "mo" ? r.ordinalNumber(e.getMinutes(), { unit: "minute" }) : Qe.m(e, t);
  },
  // Second
  s: function(e, t, r) {
    return t === "so" ? r.ordinalNumber(e.getSeconds(), { unit: "second" }) : Qe.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return Qe.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, r) {
    const n = e.getTimezoneOffset();
    if (n === 0)
      return "Z";
    switch (t) {
      case "X":
        return Gs(n);
      case "XXXX":
      case "XX":
        return rt(n);
      case "XXXXX":
      case "XXX":
      default:
        return rt(n, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, r) {
    const n = e.getTimezoneOffset();
    switch (t) {
      case "x":
        return Gs(n);
      case "xxxx":
      case "xx":
        return rt(n);
      case "xxxxx":
      case "xxx":
      default:
        return rt(n, ":");
    }
  },
  // Timezone (GMT)
  O: function(e, t, r) {
    const n = e.getTimezoneOffset();
    switch (t) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + qs(n, ":");
      case "OOOO":
      default:
        return "GMT" + rt(n, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(e, t, r) {
    const n = e.getTimezoneOffset();
    switch (t) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + qs(n, ":");
      case "zzzz":
      default:
        return "GMT" + rt(n, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, r) {
    const n = Math.trunc(e.getTime() / 1e3);
    return z(n, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, r) {
    const n = e.getTime();
    return z(n, t.length);
  }
};
function qs(e, t = "") {
  const r = e > 0 ? "-" : "+", n = Math.abs(e), o = Math.trunc(n / 60), s = n % 60;
  return s === 0 ? r + String(o) : r + String(o) + t + z(s, 2);
}
function Gs(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + z(Math.abs(e) / 60, 2) : rt(e, t);
}
function rt(e, t = "") {
  const r = e > 0 ? "-" : "+", n = Math.abs(e), o = z(Math.trunc(n / 60), 2), s = z(n % 60, 2);
  return r + o + t + s;
}
const Hs = (e, t) => {
  switch (e) {
    case "P":
      return t.date({ width: "short" });
    case "PP":
      return t.date({ width: "medium" });
    case "PPP":
      return t.date({ width: "long" });
    case "PPPP":
    default:
      return t.date({ width: "full" });
  }
}, hl = (e, t) => {
  switch (e) {
    case "p":
      return t.time({ width: "short" });
    case "pp":
      return t.time({ width: "medium" });
    case "ppp":
      return t.time({ width: "long" });
    case "pppp":
    default:
      return t.time({ width: "full" });
  }
}, E1 = (e, t) => {
  const r = e.match(/(P+)(p+)?/) || [], n = r[1], o = r[2];
  if (!o)
    return Hs(e, t);
  let s;
  switch (n) {
    case "P":
      s = t.dateTime({ width: "short" });
      break;
    case "PP":
      s = t.dateTime({ width: "medium" });
      break;
    case "PPP":
      s = t.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      s = t.dateTime({ width: "full" });
      break;
  }
  return s.replace("{{date}}", Hs(n, t)).replace("{{time}}", hl(o, t));
}, C1 = {
  p: hl,
  P: E1
}, M1 = /^D+$/, R1 = /^Y+$/, D1 = ["D", "DD", "YY", "YYYY"];
function I1(e) {
  return M1.test(e);
}
function k1(e) {
  return R1.test(e);
}
function B1(e, t, r) {
  const n = V1(e, t, r);
  if (console.warn(n), D1.includes(e))
    throw new RangeError(n);
}
function V1(e, t, r) {
  const n = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${n} to the input \`${r}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const L1 = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, N1 = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, U1 = /^'([^]*?)'?$/, z1 = /''/g, K1 = /[a-zA-Z]/;
function Ys(e, t, r) {
  var c, p, f, m;
  const n = Lr(), o = n.locale ?? S1, s = n.firstWeekContainsDate ?? ((p = (c = n.locale) == null ? void 0 : c.options) == null ? void 0 : p.firstWeekContainsDate) ?? 1, i = n.weekStartsOn ?? ((m = (f = n.locale) == null ? void 0 : f.options) == null ? void 0 : m.weekStartsOn) ?? 0, a = Fe(e);
  if (!qP(a))
    throw new RangeError("Invalid time value");
  let l = t.match(N1).map((d) => {
    const v = d[0];
    if (v === "p" || v === "P") {
      const b = C1[v];
      return b(d, o.formatLong);
    }
    return d;
  }).join("").match(L1).map((d) => {
    if (d === "''")
      return { isToken: !1, value: "'" };
    const v = d[0];
    if (v === "'")
      return { isToken: !1, value: W1(d) };
    if (Ws[v])
      return { isToken: !0, value: d };
    if (v.match(K1))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + v + "`"
      );
    return { isToken: !1, value: d };
  });
  o.localize.preprocessor && (l = o.localize.preprocessor(a, l));
  const u = {
    firstWeekContainsDate: s,
    weekStartsOn: i,
    locale: o
  };
  return l.map((d) => {
    if (!d.isToken)
      return d.value;
    const v = d.value;
    (k1(v) || I1(v)) && B1(v, t, String(e));
    const b = Ws[v[0]];
    return b(a, v, o.localize, u);
  }).join("");
}
function W1(e) {
  const t = e.match(U1);
  return t ? t[1].replace(z1, "'") : e;
}
function cr(e, t) {
  if (ye(e))
    return /^\d+$/.test(e) ? Ys(Number(e), t) : e;
  if (fl(e) || Vn(e))
    return Ys(e, t);
  if (W(e)) {
    const [r, n] = e;
    return [
      cr(r, t),
      cr(n, t)
    ].filter(Boolean);
  }
  return null;
}
function ml(e) {
  const { localeRef: t } = Ye("DatePicker");
  return y(() => {
    const r = t.value, { type: n, format: o, valueFormat: s } = e;
    if (s)
      return s;
    if (o)
      return o;
    switch (n) {
      case "date":
      case "daterange":
        return r.dateFormat;
      case "datetime":
      case "datetimerange":
        return r.dateTimeFormat;
      case "year":
      case "yearrange":
        return r.yearTypeFormat;
      case "month":
      case "monthrange":
        return r.monthTypeFormat;
      case "quarter":
      case "quarterrange":
        return r.quarterFormat;
      case "week":
        return r.weekFormat;
    }
  });
}
function q1(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !de(e);
}
const je = /* @__PURE__ */ $({
  name: "ProFieldDatePicker",
  inheritAttrs: !1,
  /**
   * 支持 value 传递字符串
   */
  props: {
    ...vu,
    placeholder: [String, Array],
    value: [String, Number, Array],
    formattedValue: [String, Number]
  },
  slots: Object,
  setup(e, {
    expose: t
  }) {
    const [r, n] = pe(), {
      empty: o,
      value: s,
      readonly: i,
      emptyText: a
    } = Z(), l = ml(e), u = y(() => {
      const {
        value: d,
        valueFormat: v,
        onUpdateValue: b
      } = e;
      return v && (ye(d) || W(d) && d.every(ye)) ? {
        formattedValue: d,
        onUpdateFormattedValue: b
      } : {
        value: d,
        onUpdateValue: b
      };
    }), c = y(() => {
      const {
        placeholder: d
      } = e;
      if (!W(d))
        return {
          placeholder: d
        };
      const [v, b] = d;
      return {
        endPlaceholder: b,
        startPlaceholder: v
      };
    }), p = y(() => {
      const {
        value: d,
        onUpdateValue: v,
        placeholder: b,
        ...g
      } = e;
      return {
        ...g,
        ...u.value,
        ...c.value
      };
    }), f = y(() => cr(s.value, l.value)), m = y(() => W(f.value));
    return t(n), {
      empty: o,
      instRef: r,
      readonly: i,
      emptyText: a,
      displayDateText: f,
      nDatePickerProps: p,
      arrayableDateText: m
    };
  },
  render() {
    var e, t;
    if (this.readonly) {
      const {
        empty: r,
        emptyText: n,
        arrayableDateText: o,
        displayDateText: s
      } = this;
      if (this.$slots.readonly)
        return this.$slots.readonly(this.$props);
      if (r)
        return n;
      if (o) {
        const i = ((t = (e = this.$slots).separator) == null ? void 0 : t.call(e)) ?? this.$props.separator;
        return h(fe, {
          size: [8, 0]
        }, {
          default: () => [h(X, null, {
            default: () => [s[0]]
          }), i && h(X, null, q1(i) ? i : {
            default: () => [i]
          }), h(X, null, {
            default: () => [s[1]]
          })]
        });
      }
      return s;
    }
    return h(gu, P({
      ref: "instRef"
    }, this.$attrs, this.nDatePickerProps), this.$slots);
  }
}), G1 = /* @__PURE__ */ $({
  name: "ProDate",
  props: Pe,
  slots: Object,
  setup(e, {
    expose: t
  }) {
    const [r, n] = pe();
    return t(n), {
      instRef: r
    };
  },
  render() {
    return h(k, P(this.$props, {
      defaultValue: null,
      fieldProps: {
        ...this.$props.fieldProps ?? {},
        type: "date"
      },
      valueType: T.DATE
    }), {
      ...this.$slots,
      input: (e) => h(je, P({
        ref: "instRef"
      }, e), this.$slots)
    });
  }
}), H1 = /* @__PURE__ */ $({
  name: "ProDateYear",
  props: Pe,
  slots: Object,
  setup(e, {
    expose: t
  }) {
    const [r, n] = pe();
    return t(n), {
      instRef: r
    };
  },
  render() {
    return h(k, P(this.$props, {
      defaultValue: null,
      fieldProps: {
        ...this.$props.fieldProps ?? {},
        type: "year"
      },
      valueType: T.DATE_YEAR
    }), {
      ...this.$slots,
      input: (e) => h(je, P({
        ref: "instRef"
      }, e), this.$slots)
    });
  }
}), Y1 = /* @__PURE__ */ $({
  name: "ProDateWeek",
  props: Pe,
  slots: Object,
  setup(e, {
    expose: t
  }) {
    const [r, n] = pe();
    return t(n), {
      instRef: r
    };
  },
  render() {
    return h(k, P({
      ref: "instRef"
    }, this.$props, {
      defaultValue: null,
      fieldProps: {
        ...this.$props.fieldProps ?? {},
        type: "week"
      },
      valueType: T.DATE_WEEK
    }), {
      ...this.$slots,
      input: (e) => h(je, P({
        ref: "instRef"
      }, e), this.$slots)
    });
  }
}), Q1 = /* @__PURE__ */ $({
  name: "ProDateTime",
  props: Pe,
  slots: Object,
  setup(e, {
    expose: t
  }) {
    const [r, n] = pe();
    return t(n), {
      instRef: r
    };
  },
  render() {
    return h(k, P(this.$props, {
      defaultValue: null,
      fieldProps: {
        ...this.$props.fieldProps ?? {},
        type: "datetime"
      },
      valueType: T.DATE_TIME
    }), {
      ...this.$slots,
      input: (e) => h(je, P({
        ref: "instRef"
      }, e), this.$slots)
    });
  }
}), X1 = /* @__PURE__ */ $({
  name: "ProDateRange",
  props: Pe,
  slots: Object,
  setup(e, {
    expose: t
  }) {
    const [r, n] = pe();
    return t(n), {
      instRef: r
    };
  },
  render() {
    return h(k, P(this.$props, {
      defaultValue: null,
      fieldProps: {
        ...this.$props.fieldProps ?? {},
        type: "daterange"
      },
      valueType: T.DATE_RANGE
    }), {
      ...this.$slots,
      input: (e) => h(je, P({
        ref: "instRef"
      }, e), this.$slots)
    });
  }
}), J1 = /* @__PURE__ */ $({
  name: "ProDateMonth",
  props: Pe,
  slots: Object,
  setup(e, {
    expose: t
  }) {
    const [r, n] = pe();
    return t(n), {
      instRef: r
    };
  },
  render() {
    return h(k, P(this.$props, {
      defaultValue: null,
      fieldProps: {
        ...this.$props.fieldProps ?? {},
        type: "month"
      },
      valueType: T.DATE_MONTH
    }), {
      ...this.$slots,
      input: (e) => h(je, P({
        ref: "instRef"
      }, e), this.$slots)
    });
  }
}), Z1 = /* @__PURE__ */ $({
  name: "ProDateQuarter",
  props: Pe,
  slots: Object,
  setup(e, {
    expose: t
  }) {
    const [r, n] = pe();
    return t(n), {
      instRef: r
    };
  },
  render() {
    return h(k, P(this.$props, {
      defaultValue: null,
      fieldProps: {
        ...this.$props.fieldProps ?? {},
        type: "quarter"
      },
      valueType: T.DATE_QUARTER
    }), {
      ...this.$slots,
      input: (e) => h(je, P({
        ref: "instRef"
      }, e), this.$slots)
    });
  }
}), ew = /* @__PURE__ */ $({
  name: "ProDateYearRange",
  props: Pe,
  slots: Object,
  setup(e, {
    expose: t
  }) {
    const [r, n] = pe();
    return t(n), {
      instRef: r
    };
  },
  render() {
    return h(k, P(this.$props, {
      defaultValue: null,
      fieldProps: {
        ...this.$props.fieldProps ?? {},
        type: "yearrange"
      },
      valueType: T.DATE_YEAR_RANGE
    }), {
      ...this.$slots,
      input: (e) => h(je, P({
        ref: "instRef"
      }, e), this.$slots)
    });
  }
}), tw = /* @__PURE__ */ $({
  name: "ProDateTimeRange",
  props: Pe,
  slots: Object,
  setup(e, {
    expose: t
  }) {
    const [r, n] = pe();
    return t(n), {
      instRef: r
    };
  },
  render() {
    return h(k, P(this.$props, {
      defaultValue: null,
      fieldProps: {
        ...this.$props.fieldProps ?? {},
        type: "datetimerange"
      },
      valueType: T.DATE_TIME_RANGE
    }), {
      ...this.$slots,
      input: (e) => h(je, P({
        ref: "instRef"
      }, e), this.$slots)
    });
  }
}), rw = /* @__PURE__ */ $({
  name: "ProDateMonthRange",
  props: Pe,
  slots: Object,
  setup(e, {
    expose: t
  }) {
    const [r, n] = pe();
    return t(n), {
      instRef: r
    };
  },
  render() {
    return h(k, P(this.$props, {
      defaultValue: null,
      fieldProps: {
        ...this.$props.fieldProps ?? {},
        type: "monthrange"
      },
      valueType: T.DATE_MONTH_RANGE
    }), {
      ...this.$slots,
      input: (e) => h(je, P({
        ref: "instRef"
      }, e), this.$slots)
    });
  }
}), nw = /* @__PURE__ */ $({
  name: "ProDateQuarterRange",
  props: Pe,
  slots: Object,
  setup(e, {
    expose: t
  }) {
    const [r, n] = pe();
    return t(n), {
      instRef: r
    };
  },
  render() {
    return h(k, P(this.$props, {
      defaultValue: null,
      fieldProps: {
        ...this.$props.fieldProps ?? {},
        type: "quarterrange"
      },
      valueType: T.DATE_QUARTER_RANGE
    }), {
      ...this.$slots,
      input: (e) => h(je, P({
        ref: "instRef"
      }, e), this.$slots)
    });
  }
}), vl = oe("ProTreeSelect"), gl = {
  ...te,
  fieldProps: {
    type: Object,
    default: () => ({})
  }
};
function ow(e, t) {
  const { keyToNodeMap: r } = t, n = R([]);
  J(
    y(() => e.expandedKeys ?? []),
    (a) => n.value = a ?? [],
    { immediate: !0 }
  );
  function o(a, ...l) {
    const {
      onUpdateExpandedKeys: u,
      "onUpdate:expandedKeys": c
    } = e;
    n.value = a, u && u(a, ...l), c && c(a, ...l);
  }
  function s() {
    return n.value;
  }
  function i(a) {
    const l = r.value, u = [...l.keys()];
    a && (a = a.filter((c) => l.get(c))), n.value = a ?? u;
  }
  return {
    expandedKeys: n,
    getExpandedKeys: s,
    setExpandedKeys: i,
    doUpdateExpandedKeys: o
  };
}
function sw(e, t) {
  const { keyToNodeMap: r } = t, n = R([]);
  J(
    y(() => e.indeterminateKeys ?? []),
    (a) => n.value = a ?? [],
    { immediate: !0 }
  );
  function o(a, ...l) {
    const {
      onUpdateIndeterminateKeys: u,
      "onUpdate:indeterminateKeys": c
    } = e;
    n.value = a, u && u(a, ...l), c && c(a, ...l);
  }
  function s() {
    return n.value;
  }
  function i(a) {
    const l = r.value;
    a && (a = a.filter((u) => l.get(u))), n.value = a;
  }
  return {
    indeterminateKeys: n,
    getIndeterminateKeys: s,
    setIndeterminateKeys: i,
    doUpdateIndeterminateKeys: o
  };
}
const gn = "__level__";
function aw(e) {
  const t = R([]), r = y(() => {
    const {
      keyField: s = "key",
      childrenField: i = "children"
    } = e, a = /* @__PURE__ */ new Map();
    return At(
      t.value,
      (l) => {
        const u = ie(l, s);
        (ye(u) || Vn(u)) && a.set(u, l);
      },
      i
    ), a;
  });
  J(
    O(e, "options"),
    (s) => t.value = o(s ?? []),
    { immediate: !0, deep: !0 }
  );
  let n = !1;
  J(
    t,
    (s) => {
      !n && e.onLoad && (n = !0, t.value = o(s), ve(() => {
        n = !1;
      }));
    },
    { deep: !0 }
  );
  function o(s) {
    const {
      childrenField: i = "children"
    } = e;
    return no(
      s,
      (a, l, { level: u }) => {
        const c = { ...a };
        return Ua(c, gn) || qa(c, gn, u), c;
      },
      i
    );
  }
  return {
    keyToNodeMap: r,
    options: t
  };
}
function Qs(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !de(e);
}
const iw = /* @__PURE__ */ $({
  name: "ProFieldTreeSelect",
  props: yu,
  slots: Object,
  inheritAttrs: !1,
  setup(e, {
    expose: t
  }) {
    const r = R(), n = gt(), {
      empty: o,
      value: s,
      readonly: i,
      emptyText: a
    } = Z(), {
      options: l,
      keyToNodeMap: u
    } = aw(e), {
      expandedKeys: c,
      getExpandedKeys: p,
      setExpandedKeys: f,
      doUpdateExpandedKeys: m
    } = ow(e, {
      keyToNodeMap: u
    }), {
      indeterminateKeys: d,
      getIndeterminateKeys: v,
      setIndeterminateKeys: b,
      doUpdateIndeterminateKeys: g
    } = sw(e, {
      keyToNodeMap: u
    }), w = y(() => ({
      ...e,
      options: l.value,
      expandedKeys: c.value,
      indeterminateKeys: d.value,
      onUpdateExpandedKeys: m,
      onUpdateIndeterminateKeys: g
    })), x = y(() => {
      const {
        renderTag: S,
        renderLabel: L,
        options: N = [],
        keyField: re = "key",
        labelField: D = "label",
        childrenField: I = "children"
      } = e, E = [], A = W(s.value) ? s.value : [s.value];
      return At(N, (C) => {
        const ne = ie(C, re);
        if (A.includes(ne)) {
          let se = ie(C, D);
          S && (se = S({
            option: C,
            handleClose: It
          })), L && (se = L({
            option: C,
            checked: !0,
            selected: !0
          })), se && E.push(h(X, null, Qs(se) ? se : {
            default: () => [se]
          }));
        }
      }, I), E;
    });
    function _() {
      return [...u.value.keys()];
    }
    function j(S, L = !0) {
      if (S <= 0)
        return [];
      const N = [];
      return u.value.forEach((D, I) => {
        const E = D[gn];
        E === S && N.push(I), L && E < S && N.push(I);
      }), N;
    }
    function F() {
      const S = [], L = u.value, N = e.disabledField ?? "disabled", re = (D) => !ie(D, N);
      return L.forEach((D, I) => {
        re(D) && S.push(I);
      }), S;
    }
    function q(S) {
      const {
        multiple: L
      } = e, N = u.value, re = [...N.keys()];
      S && (S = S.filter((E) => N.get(E)));
      const D = S ?? re, I = L ? D : D[0];
      za(I) || (n.value.value = I);
    }
    return t({
      getFullKeys: _,
      getLevelKeys: j,
      getEnabledKeys: F,
      setCheckedKeys: q,
      getExpandedKeys: p,
      setExpandedKeys: f,
      getIndeterminateKeys: v,
      setIndeterminateKeys: b,
      blur: () => {
        var S;
        return (S = r.value) == null ? void 0 : S.blur();
      },
      focus: () => {
        var S;
        return (S = r.value) == null ? void 0 : S.focus();
      },
      blurInput: () => {
        var S;
        return (S = r.value) == null ? void 0 : S.blurInput();
      },
      getCheckedKeys: () => n.value.value ?? [],
      focusInput: () => {
        var S;
        return (S = r.value) == null ? void 0 : S.focusInput();
      },
      getCheckedData: () => r.value.getCheckedData(),
      getIndeterminateData: () => r.value.getIndeterminateData()
    }), {
      empty: o,
      instRef: r,
      readonly: i,
      emptyText: a,
      selectedLabels: x,
      nTreeSelectProps: w
    };
  },
  render() {
    if (this.readonly) {
      const {
        empty: e,
        emptyText: t,
        selectedLabels: r
      } = this;
      return this.$slots.readonly ? this.$slots.readonly(this.$props) : e ? t : h(fe, {
        size: [8, 0]
      }, Qs(r) ? r : {
        default: () => [r]
      });
    }
    return h(bu, P({
      ref: "instRef"
    }, this.$attrs, this.nTreeSelectProps), this.$slots);
  }
}), lw = /* @__PURE__ */ $({
  name: "ProTreeSelect",
  props: gl,
  slots: Object,
  setup(e, {
    expose: t
  }) {
    const [r, n] = vl();
    return t(n), {
      instRef: r
    };
  },
  render() {
    return h(k, P(this.$props, {
      defaultValue: null,
      valueType: T.TREE_SELECT
    }), {
      ...this.$slots,
      input: (e) => h(iw, P({
        ref: "instRef"
      }, e), this.$slots)
    });
  }
}), yo = oe("ProTime"), yl = {
  ...te,
  fieldProps: {
    type: Object,
    default: () => ({})
  }
};
function uw(e) {
  const { localeRef: t } = Ye("Time");
  return y(() => {
    const r = t.value, { format: n, valueFormat: o } = e;
    return o || n || r.dateFormat;
  });
}
const cw = /* @__PURE__ */ $({
  name: "ProFieldTimePicker",
  inheritAttrs: !1,
  /**
   * 支持 value 传递字符串
   */
  props: {
    ...Pu,
    value: [String, Number],
    formattedValue: [String, Number]
  },
  slots: Object,
  setup(e, {
    expose: t
  }) {
    const [r, n] = yo(), {
      value: o,
      empty: s,
      readonly: i,
      emptyText: a
    } = Z(), l = uw(e), u = y(() => {
      const {
        value: f,
        valueFormat: m,
        onUpdateValue: d
      } = e;
      return m && ye(f) ? {
        formattedValue: f,
        onUpdateFormattedValue: d
      } : {
        value: f,
        onUpdateValue: d
      };
    }), c = y(() => {
      const {
        value: f,
        onUpdateValue: m,
        ...d
      } = e;
      return {
        ...d,
        ...u.value
      };
    }), p = y(() => cr(o.value, l.value));
    return t(n), {
      empty: s,
      instRef: r,
      readonly: i,
      emptyText: a,
      displayDateText: p,
      nTimePickerProps: c
    };
  },
  render() {
    if (this.readonly) {
      const {
        empty: e,
        emptyText: t,
        displayDateText: r
      } = this;
      return this.$slots.readonly ? this.$slots.readonly(this.$props) : e ? t : r;
    }
    return h(wu, P({
      ref: "instRef"
    }, this.$attrs, this.nTimePickerProps), this.$slots);
  }
}), dw = /* @__PURE__ */ $({
  name: "ProTime",
  props: yl,
  slots: Object,
  setup(e, {
    expose: t
  }) {
    const [r, n] = yo();
    return t(n), {
      instRef: r
    };
  },
  render() {
    return h(k, P(this.$props, {
      defaultValue: null,
      valueType: T.TIME
    }), {
      ...this.$slots,
      input: (e) => h(cw, P({
        ref: "instRef"
      }, e), this.$slots)
    });
  }
}), bl = {
  ...te,
  fieldProps: {
    type: Object,
    default: () => ({})
  }
};
function fw(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !de(e);
}
const pw = /* @__PURE__ */ $({
  name: "ProFieldRadioGroup",
  inheritAttrs: !1,
  props: {
    labelField: String,
    valueField: String,
    flexProps: Object,
    options: Array,
    ...$u
  },
  slots: Object,
  setup(e) {
    const {
      empty: t,
      value: r,
      readonly: n,
      emptyText: o
    } = Z(), s = y(() => {
      const {
        options: l = [],
        labelField: u = "label",
        valueField: c = "value"
      } = e;
      return l.map((p) => {
        const f = ie(p, u), m = ie(p, c);
        return {
          ...Te(p, [u, c]),
          label: f,
          value: m
        };
      });
    }), i = y(() => {
      const {
        options: l,
        flexProps: u,
        labelField: c,
        valueField: p,
        ...f
      } = e;
      return f;
    }), a = y(() => {
      const l = r.value, u = s.value.find((c) => c.value === l);
      return u ? u.label ?? l : l;
    });
    return {
      empty: t,
      value: r,
      readonly: n,
      emptyText: o,
      selectedLabel: a,
      nRadioGroupProps: i,
      normalizedOptions: s
    };
  },
  render() {
    if (this.readonly) {
      const {
        empty: e,
        value: t,
        emptyText: r,
        selectedLabel: n
      } = this;
      return this.$slots.readonly ? this.$slots.readonly(this.$props) : e ? r : this.$slots.default ? t : n;
    }
    return h(xu, P(this.nRadioGroupProps, this.$attrs), {
      default: () => {
        let e;
        return this.$slots.default ? this.$slots.default() : h(fe, this.$props.flexProps ?? {}, fw(e = this.normalizedOptions.map((t) => h(Tu, P({
          key: t.value
        }, t), null))) ? e : {
          default: () => [e]
        });
      }
    });
  }
}), hw = /* @__PURE__ */ $({
  name: "ProRadioGroup",
  props: bl,
  slots: Object,
  setup() {
  },
  render() {
    return h(k, P(this.$props, {
      defaultValue: null,
      valueType: T.RADIO_GROUP
    }), {
      ...this.$slots,
      input: (e) => h(pw, e, this.$slots)
    });
  }
}), Pl = {
  ...te,
  fieldProps: {
    type: Object,
    default: () => ({})
  }
}, mw = /* @__PURE__ */ $({
  name: "ProFieldColorPicker",
  inheritAttrs: !1,
  props: _u,
  slots: Object,
  setup() {
    const {
      empty: e,
      readonly: t,
      emptyText: r
    } = Z();
    return {
      empty: e,
      readonly: t,
      emptyText: r
    };
  },
  render() {
    const e = {
      ...Te(this.$slots, "title"),
      label: this.$slots.title
    };
    if (this.readonly) {
      const {
        empty: t,
        emptyText: r
      } = this;
      return this.$slots.readonly ? this.$slots.readonly(this.$props) : t ? r : h(Eo, P(this.$props, this.$attrs, {
        disabled: !0
      }), e);
    }
    return h(Eo, P(this.$props, this.$attrs), e);
  }
}), vw = /* @__PURE__ */ $({
  name: "ProColorPicker",
  props: Pl,
  slots: Object,
  setup() {
  },
  render() {
    return h(k, P(this.$props, {
      defaultValue: null,
      valueType: T.COLOR_PICKER
    }), {
      ...this.$slots,
      input: (e) => h(mw, e, this.$slots)
    });
  }
}), wl = {
  ...te,
  fieldProps: {
    type: Object,
    default: () => ({})
  }
}, gw = /* @__PURE__ */ $({
  name: "ProFieldDynamicTags",
  props: Su,
  slots: Object,
  inheritAttrs: !1,
  setup() {
    const {
      empty: e,
      readonly: t,
      emptyText: r
    } = Z();
    return {
      empty: e,
      readonly: t,
      emptyText: r
    };
  },
  render() {
    if (this.readonly) {
      const {
        empty: e,
        emptyText: t
      } = this;
      return this.$slots.readonly ? this.$slots.readonly(this.$props) : e ? t : h(Co, P(this.$props, this.$attrs, {
        closable: !1,
        disabled: !0
      }), this.$slots);
    }
    return h(Co, P(this.$props, this.$attrs), this.$slots);
  }
}), yw = /* @__PURE__ */ $({
  name: "ProDynamicTags",
  props: wl,
  slots: Object,
  setup() {
  },
  render() {
    return h(k, P(this.$props, {
      defaultValue: [],
      valueType: T.DYNAMIC_TAGS
    }), {
      ...this.$slots,
      input: (e) => h(gw, e, this.$slots)
    });
  }
}), bo = oe("ProAutoComplete"), $l = {
  ...te,
  fieldProps: {
    type: Object,
    default: () => ({})
  }
};
function Xr(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !de(e);
}
const bw = /* @__PURE__ */ $({
  name: "ProFieldAutoComplete",
  inheritAttrs: !1,
  props: {
    ...Ou,
    options: {
      type: [Array, Function],
      default: []
    }
  },
  slots: Object,
  setup(e, {
    expose: t
  }) {
    const [r, n] = bo(), {
      value: o,
      empty: s,
      readonly: i,
      emptyText: a
    } = Z(), l = y(() => {
      const {
        options: c = []
      } = e;
      return ge(c) ? c(o.value) : c;
    }), u = y(() => ({
      ...e,
      options: l.value
    }));
    return t(n), {
      empty: s,
      value: o,
      instRef: r,
      readonly: i,
      emptyText: a,
      nAutoCompleteProps: u
    };
  },
  render() {
    if (this.readonly) {
      let e, t;
      const {
        value: r,
        empty: n,
        emptyText: o,
        $slots: s
      } = this;
      return s.readonly ? s.readonly(this.$props) : n ? o : h(fe, {
        size: [8, 0]
      }, {
        default: () => [s.prefix && h(X, null, Xr(e = this.$slots.prefix()) ? e : {
          default: () => [e]
        }), h(X, null, Xr(r) ? r : {
          default: () => [r]
        }), s.suffix && h(X, null, Xr(t = this.$slots.suffix()) ? t : {
          default: () => [t]
        })]
      });
    }
    return h(Fu, P({
      ref: "instRef"
    }, this.nAutoCompleteProps, this.$attrs), this.$slots);
  }
}), Pw = /* @__PURE__ */ $({
  name: "ProAutoComplete",
  props: $l,
  slots: Object,
  setup(e, {
    expose: t
  }) {
    const [r, n] = bo();
    return t(n), {
      instRef: r
    };
  },
  render() {
    return h(k, P(this.$props, {
      defaultValue: null,
      valueType: T.AUTO_COMPLETE
    }), {
      ...this.$slots,
      input: (e) => h(bw, P({
        ref: "instRef"
      }, e), this.$slots)
    });
  }
}), xl = {
  ...te,
  fieldProps: {
    type: Object,
    default: () => ({})
  }
};
function ww(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !de(e);
}
const $w = /* @__PURE__ */ $({
  name: "ProFieldCheckboxGroup",
  inheritAttrs: !1,
  props: {
    labelField: String,
    valueField: String,
    flexProps: Object,
    options: Array,
    ...ju
  },
  slots: Object,
  setup(e) {
    const {
      empty: t,
      value: r,
      readonly: n,
      emptyText: o
    } = Z(), s = y(() => {
      const {
        options: l = [],
        labelField: u = "label",
        valueField: c = "value"
      } = e;
      return l.map((p) => {
        const f = ie(p, u), m = ie(p, c);
        return {
          ...Te(p, [u, c]),
          label: f,
          value: m
        };
      });
    }), i = y(() => {
      const {
        options: l,
        flexProps: u,
        labelField: c,
        valueField: p,
        ...f
      } = e;
      return f;
    }), a = y(() => {
      const l = r.value ?? [];
      return s.value.filter((u) => l.includes(u.value)).map((u) => u.label);
    });
    return {
      empty: t,
      value: r,
      readonly: n,
      emptyText: o,
      selectedLabels: a,
      normalizedOptions: s,
      nCheckboxGroupProps: i
    };
  },
  render() {
    if (this.readonly) {
      const {
        empty: e,
        value: t,
        emptyText: r,
        selectedLabels: n
      } = this;
      return this.$slots.readonly ? this.$slots.readonly(this.$props) : e ? r : this.$slots.default ? (t ?? []).join("，") : n.join("，");
    }
    return h(Au, P(this.$attrs, this.nCheckboxGroupProps), {
      default: () => {
        let e;
        return this.$slots.default ? this.$slots.default() : h(fe, this.$props.flexProps ?? {}, ww(e = this.normalizedOptions.map((t) => h(Zr, P({
          key: t.value
        }, t), null))) ? e : {
          default: () => [e]
        });
      }
    });
  }
}), xw = /* @__PURE__ */ $({
  name: "ProCheckboxGroup",
  props: xl,
  slots: Object,
  setup() {
  },
  render() {
    return h(k, P(this.$props, {
      defaultValue: [],
      valueType: T.CHECKBOX_GROUP
    }), {
      ...this.$slots,
      input: (e) => h($w, e, this.$slots)
    });
  }
});
function Tw() {
  const e = R(/* @__PURE__ */ new Map());
  function t(a, l) {
    if (!a)
      return;
    const u = e.value;
    u.has(a) || u.set(a, {
      valid: !1,
      errors: [],
      warnings: []
    });
    const c = u.get(a);
    c.valid = !1, c.errors = l ?? [];
  }
  function r(a, l) {
    if (!a)
      return;
    const u = e.value;
    u.has(a) || u.set(a, {
      valid: !0,
      errors: [],
      warnings: []
    });
    const c = u.get(a);
    c.valid = !0, c.warnings = l ?? [];
  }
  function n(a) {
    if (!a) {
      e.value.clear();
      return;
    }
    e.value.delete($t(a));
  }
  function o() {
    const a = e.value, l = {};
    return a.forEach((u, c) => {
      l[c] = u;
    }), l;
  }
  function s(a) {
    const l = $t(a);
    return e.value.get(l) ?? null;
  }
  return {
    validateResults: y(() => o()),
    addValidateErrors: t,
    addValidateWarnings: r,
    clearValidateResults: n,
    getFieldValidateResult: s,
    validateResultsMap: e
  };
}
const Tl = /* @__PURE__ */ $({
  name: "ProForm",
  __name: "index",
  props: $r,
  setup(e, {
    expose: t
  }) {
    const r = e, n = R(), o = jt(r, Un), {
      scope: s
    } = Ne().proForm, {
      addValidateErrors: i,
      addValidateWarnings: a,
      clearValidateResults: l,
      getFieldValidateResult: u
    } = Tw(), {
      initialValues: c,
      scope: p,
      onFieldValueChange: f
    } = r, m = {
      ...s ?? {},
      ...p ?? {}
    };
    console.log(r.scope);
    const {
      scope: d,
      matchPath: v,
      fieldStore: b,
      valueStore: g,
      getFieldValue: w,
      setFieldValue: x,
      getFieldsValue: _,
      setFieldsValue: j,
      setInitialValue: F,
      resetFieldValue: q,
      resetFieldsValue: B,
      setInitialValues: S,
      pauseDependenciesTrigger: L,
      resumeDependenciesTrigger: N,
      getFieldsTransformedValue: re
    } = Ni({
      initialValues: c,
      expressionScope: m,
      onFieldValueChange: f,
      onDependenciesValueChange: A
    }), D = M(O(r, "disabled"), {
      scope: d
    }), I = M(O(r, "readonly"), {
      scope: d
    }), E = y(() => ({
      ...o.value,
      rules: void 0,
      ref: n,
      model: g.values.value,
      disabled: D.value,
      onSubmit: (U) => {
        U.preventDefault(), C();
      }
    }));
    function A(U) {
      const {
        field: he,
        path: we,
        value: me,
        dependPath: $e
      } = U;
      he.show.value && (ne($t(U.dependPath)), r.onDependenciesValueChange && r.onDependenciesValueChange({
        path: we,
        value: me,
        dependPath: $e
      }));
    }
    function C() {
      const {
        onSubmit: U,
        onSubmitFailed: he
      } = r;
      return ne().then(({
        warnings: we
      }) => {
        const me = re();
        return U && U(me, we ?? []);
      }).catch((we) => {
        he && he(we);
      });
    }
    function ne(U) {
      return U ? (U = (ye(U) ? [U] : U).map($t), n.value.validate(Xt, (he) => U.includes(he.key))) : n.value.validate(Xt);
    }
    function se(U) {
      if (!U) {
        n.value.restoreValidation();
        return;
      }
      (ye(U) ? [U] : U).map($t).forEach((we) => {
        const me = b.fieldsPathMap.value.get(we);
        if (!me || !me[Xe])
          return;
        const {
          proFormItemInst: $e
        } = me[Xe], Ue = $e.value;
        Ue && Ue.restoreValidation();
      });
    }
    function Nr(U) {
      L(), q(U), l(U), se(ch(U)), ve(N);
    }
    function Ur() {
      L(), B(), se(), l(), ve(N);
    }
    function Xt(U, he) {
      const we = U ?? [], me = he.warnings ?? [];
      l(), we.forEach(($e) => {
        const Ue = $e[0].field;
        i(Ue, $e);
      }), me.forEach(($e) => {
        const Ue = $e[0].field;
        a(Ue, $e);
      });
    }
    const Jt = {
      submit: C,
      validate: ne,
      matchPath: v,
      getFieldValue: w,
      setFieldValue: x,
      getFieldsValue: _,
      setFieldsValue: j,
      resetFieldValue: q,
      setInitialValue: F,
      setInitialValues: S,
      resetFieldsValue: B,
      restoreValidation: se,
      restoreFieldValue: Nr,
      restoreFieldsValue: Ur,
      getScope: () => d,
      getFieldValidateResult: u,
      pauseDependenciesTrigger: L,
      getFieldsTransformedValue: re,
      resumeDependenciesTrigger: N
    };
    return ri(Jt), _e(Kn, {
      addValidateErrors: i,
      addValidateWarnings: a,
      clearValidateResults: l,
      readonly: I,
      validateBehavior: O(r, "validateBehavior"),
      validateBehaviorProps: O(r, "validateBehaviorProps")
    }), t(Jt), (U, he) => (ee(), Ee(V(Eu), Pt(wt(E.value)), {
      default: ae(() => [We(U.$slots, "default")]),
      _: 3
    }, 16));
  }
}), P$ = pa({
  ProForm: {
    validateMessages: {
      required: (e) => `${e}不能为空`
    },
    fieldPlaceholder: (e, t) => {
      switch (t) {
        case T.INPUT:
        case T.DIGIT:
        case T.MENTION:
        case T.PASSWORD:
        case T.AUTO_COMPLETE:
          return `请输入${e}`;
        case T.DATE:
        case T.TIME:
        case T.SELECT:
        case T.CASCADER:
        case T.DATE_TIME:
        case T.DATE_YEAR:
        case T.DATE_WEEK:
        case T.DATE_MONTH:
        case T.TREE_SELECT:
        case T.DATE_QUARTER:
          return `请选择${e}`;
        case T.DATE_RANGE:
        case T.DATE_TIME_RANGE:
          return ["开始日期", "结束日期"];
        case T.DATE_YEAR_RANGE:
          return ["开始年份", "结束年份"];
        case T.DATE_MONTH_RANGE:
          return ["开始月份", "结束月份"];
        case T.DATE_QUARTER_RANGE:
          return ["开始季度", "结束季度"];
      }
    }
  },
  ProFormList: {
    add: "添加一行数据",
    copyThisLine: "复制此项",
    removeThisLine: "删除此项"
  },
  ProUpload: {
    title: "上传"
  },
  ProCard: {
    collapseText: (e) => e ? "展开" : "收起"
  },
  ProSearchForm: {
    resetText: "重置",
    searchText: "查询",
    collapseText: (e) => e ? "展开" : "收起"
  }
}, Cu), Xs = pa({
  ProForm: {
    validateMessages: {
      required: (e) => `${e} Not Empty`
    },
    fieldPlaceholder: (e, t) => {
      switch (t) {
        case T.INPUT:
        case T.DIGIT:
        case T.MENTION:
        case T.PASSWORD:
        case T.AUTO_COMPLETE:
          return `Please Input ${e}`;
        case T.DATE:
        case T.TIME:
        case T.SELECT:
        case T.CASCADER:
        case T.DATE_TIME:
        case T.DATE_YEAR:
        case T.DATE_WEEK:
        case T.DATE_MONTH:
        case T.TREE_SELECT:
        case T.DATE_QUARTER:
          return `Please Select ${e}`;
        case T.DATE_RANGE:
        case T.DATE_TIME_RANGE:
          return ["Start Date", "End Date"];
        case T.DATE_YEAR_RANGE:
          return ["Start Year", "End Year"];
        case T.DATE_MONTH_RANGE:
          return ["Start Month", "End Month"];
        case T.DATE_QUARTER_RANGE:
          return ["Start Quarter", "End Quarter"];
      }
    }
  },
  ProFormList: {
    add: "add",
    copyThisLine: "copyThisLine",
    removeThisLine: "removeThisLine"
  },
  ProUpload: {
    title: "Upload"
  },
  ProCard: {
    collapseText: (e) => e ? "uncollapsed" : "collapsed"
  },
  ProSearchForm: {
    resetText: "reset",
    searchText: "search",
    collapseText: (e) => e ? "uncollapsed" : "collapsed"
  }
}, Mu);
function Ye(e) {
  const { mergedLocaleRef: t } = ue("n-config-provider", null) || {}, r = y(() => {
    var o;
    return e ? ((o = t == null ? void 0 : t.value) == null ? void 0 : o[e]) ?? Xs[e] : (t == null ? void 0 : t.value) ?? Xs;
  });
  function n(o, s) {
    const i = r.value;
    return ie(i, o, s);
  }
  return {
    localeRef: r,
    getMessage: n
  };
}
function _w(e) {
  const t = R(!0);
  J(
    O(e, "show"),
    (o) => t.value = o ?? !0,
    { immediate: !0 }
  );
  function r(o) {
    t.value = o;
  }
  const n = y(() => ({
    show: t.value,
    appear: e.appear
  }));
  return {
    show: t,
    doUpdateShow: r,
    nCollapseTransitionProps: n
  };
}
const Sw = Vt("pro-card", [
  xe("&-content", `
    transition: 
      border-color 0.3s var(--n-bezier),
      padding 0.1s var(--n-bezier) 0.1s !important;
  `, [
    xe("&__hidden", `
      padding-top: 0 !important;
      padding-bottom: 0 !important;
    `)
  ]),
  xe("&-header__main", [
    xe("&__tooltip", `
        cursor: pointer;
        margin-inline-start: 4px;
        vertical-align: middle;
        display: inline !important;
    `),
    xe("&.triggerable", `
      cursor: pointer;
    `),
    xe("&.prefix", `
      position: relative;
      padding-left: 12px;
    `, [
      xe("&::before", `
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        margin: auto 0;
        content: ''; 
        width: 4px;
        border-radius: 2px;
        height: var(--n-prefix-height);
        background: var(--n-prefix-bg-color);
      `)
    ])
  ]),
  xe("&-header__extra", `
    margin-left: 8px;  
  `, [
    xe("&.triggerable", `
        cursor: pointer;
    `)
  ])
]), Ow = /* @__PURE__ */ $({
  name: "ProCard",
  __name: "index",
  props: Ga,
  setup(e) {
    const t = e, r = ia(), n = wr("ProCard", "pro-card", Sw), o = $n(), {
      getMessage: s
    } = Ye("ProCard"), i = jt(t, {
      ...Ln,
      ...wn,
      title: t.title
      // 忽略掉 title，自定义 title
    }), {
      show: a,
      nCollapseTransitionProps: l
    } = _w(t), u = y(() => {
      const {
        title: w,
        tooltip: x
      } = t;
      return !!w || !!r.header || !!x;
    }), c = y(() => {
      const {
        size: w
      } = t, {
        prefixHeightSmall: x = "16px",
        prefixHeightDefault: _ = "18px",
        prefixBgColor: j = o.value.errorColor
      } = n.value;
      return {
        "--n-prefix-bg-color": j,
        "--n-prefix-height": w === "small" ? x : _
      };
    }), p = y(() => {
      const {
        showSwitcher: w,
        closable: x
      } = t;
      return w !== void 0 ? !!w : !x;
    }), f = y(() => s("collapseText")(!a.value));
    function m(w) {
      const {
        triggerAreas: x = []
      } = t;
      x.includes(w) && (a.value = !a.value);
    }
    const d = y(() => {
      const {
        title: w
      } = t;
      return ge(w) ? w : () => w;
    }), v = y(() => Te(r, ["switcher", "header-extra", "default", "header"])), b = y(() => ["n-pro-card-content", t.contentClass ?? "", !a.value && "n-pro-card-content__hidden"].filter(Boolean).join(" ")), g = y(() => {
      const {
        tooltip: w
      } = t;
      return w ? W(w) ? w : [w] : [];
    });
    return (w, x) => (ee(), Ee(V(Ru), P(V(i), {
      "content-class": b.value
    }), la({
      default: ae(() => [h(Bm, Pt(wt(V(l))), {
        default: ae(() => [We(w.$slots, "default")]),
        _: 3
      }, 16)]),
      "header-extra": ae(() => [We(w.$slots, "header-extra"), p.value ? (ee(), Ee(V(fe), {
        key: 0,
        size: [4, 0],
        align: "center",
        class: To(["n-pro-card-header__extra", [(w.$props.triggerAreas ?? []).includes("arrow") && "triggerable"]]),
        onClick: x[1] || (x[1] = (_) => m("arrow"))
      }, {
        default: ae(() => [We(w.$slots, "switcher", Pt(wt({
          expanded: V(a)
        })), () => [h(V(X), null, {
          default: ae(() => [_o(So(f.value), 1)]),
          _: 1
        }), h(V(Me), null, {
          default: ae(() => [(ee(), Ee(Oo(V(a) ? V(Qa) : V(Ha))))]),
          _: 1
        })])]),
        _: 3
      }, 8, ["class"])) : Fo("", !0)]),
      _: 2
    }, [u.value ? {
      name: "header",
      fn: ae(() => [h(V(X), {
        class: To(["n-pro-card-header__main", [w.$props.prefix && "prefix", (w.$props.triggerAreas ?? []).includes("main") && "triggerable"]]),
        style: Wl(c.value),
        onClick: x[0] || (x[0] = (_) => m("main"))
      }, {
        default: ae(() => [We(w.$slots, "header", {}, () => [(ee(), Ee(Oo(d.value)))]), g.value.length > 0 ? (ee(), Ee(V(pr), {
          key: 0,
          trigger: "hover"
        }, {
          trigger: ae(() => [h(V(Me), {
            size: 18,
            class: "n-pro-card-header__main__tooltip"
          }, {
            default: ae(() => [h(V(Ya))]),
            _: 1
          })]),
          default: ae(() => [(ee(!0), be(St, null, Jr(g.value, (_, j) => (ee(), Ee(V(X), {
            key: j
          }, {
            default: ae(() => [_o(So(_), 1)]),
            _: 2
          }, 1024))), 128))]),
          _: 1
        })) : Fo("", !0)]),
        _: 3
      }, 8, ["class", "style"])]),
      key: "0"
    } : void 0, Jr(v.value, (_, j) => ({
      name: j,
      fn: ae((F) => [We(w.$slots, j, Pt(wt(F ?? {})))])
    }))]), 1040, ["content-class"]));
  }
}), Fw = oe("ProTree"), _l = {
  ...Te(Du, [
    "defaultExpandAll",
    "defaultCheckedKeys",
    "defaultExpandedKeys",
    "defaultSelectedKeys"
  ])
}, yn = "__level__";
function jw(e) {
  const t = R([]), r = y(() => {
    const {
      keyField: i = "key",
      childrenField: a = "children"
    } = e, l = /* @__PURE__ */ new Map();
    return At(
      t.value,
      (u) => {
        const c = ie(u, i);
        (ye(c) || Vn(c)) && l.set(c, u);
      },
      a
    ), l;
  });
  let n = !1;
  J(
    O(e, "data"),
    (i) => {
      n = !0, t.value = o(i ?? []), ve(() => {
        n = !1;
      });
    },
    { immediate: !0, deep: !0 }
  ), J(
    t,
    (i) => {
      n || (n = !0, t.value = o(i), ve(() => {
        n = !1;
      }));
    },
    { deep: !0 }
  );
  function o(i) {
    const {
      childrenField: a = "children"
    } = e;
    return no(
      i,
      (l, u, { level: c }) => {
        const p = { ...l };
        return Ua(p, yn) || qa(p, yn, c), p;
      },
      a
    );
  }
  function s(i) {
    t.value = i;
  }
  return {
    setData: s,
    keyToNodeMap: r,
    data: t
  };
}
function Aw(e, t) {
  const { keyToNodeMap: r } = t, n = R([]);
  J(
    y(() => e.expandedKeys),
    (a) => {
      n.value = a ?? [];
    },
    { immediate: !0 }
  );
  function o(a, ...l) {
    const {
      onUpdateExpandedKeys: u,
      "onUpdate:expandedKeys": c
    } = e;
    n.value = a, u && u(a, ...l), c && c(a, ...l);
  }
  function s() {
    return n.value;
  }
  function i(a) {
    const l = r.value, u = [...l.keys()];
    a && (a = a.filter((c) => l.get(c))), n.value = a ?? u;
  }
  return {
    expandedKeys: n,
    getExpandedKeys: s,
    setExpandedKeys: i,
    doUpdateExpandedKeys: o
  };
}
function Ew(e, t) {
  const { keyToNodeMap: r } = t, n = R([]);
  J(
    y(() => e.selectedKeys),
    (a) => {
      n.value = a ?? [];
    },
    { immediate: !0 }
  );
  function o(a, ...l) {
    const {
      onUpdateSelectedKeys: u,
      "onUpdate:selectedKeys": c
    } = e;
    n.value = a, u && u(a, ...l), c && c(a, ...l);
  }
  function s() {
    return n.value;
  }
  function i(a) {
    const l = r.value;
    a && (a = a.filter((u) => l.get(u))), n.value = a ?? [...l.keys()];
  }
  return {
    selectedKeys: n,
    getSelectedKeys: s,
    setSelectedKeys: i,
    doUpdateSelectedKeys: o
  };
}
function Cw(e, t) {
  const { keyToNodeMap: r } = t, n = R([]);
  J(
    y(() => e.checkedKeys),
    (a) => {
      n.value = a ?? [];
    },
    { immediate: !0 }
  );
  function o(a, ...l) {
    const {
      onUpdateCheckedKeys: u,
      "onUpdate:checkedKeys": c
    } = e;
    n.value = a, u && u(a, ...l), c && c(a, ...l);
  }
  function s() {
    return n.value;
  }
  function i(a) {
    const l = r.value;
    a && (a = a.filter((u) => l.get(u))), n.value = a ?? [...l.keys()];
  }
  return {
    checkedKeys: n,
    getCheckedKeys: s,
    setCheckedKeys: i,
    doUpdateCheckedKeys: o
  };
}
function Mw(e, t) {
  const { keyToNodeMap: r } = t, n = R([]);
  J(
    y(() => e.indeterminateKeys),
    (a) => {
      n.value = a ?? [];
    },
    { immediate: !0 }
  );
  function o(a, ...l) {
    const {
      onUpdateIndeterminateKeys: u,
      "onUpdate:indeterminateKeys": c
    } = e;
    n.value = a, u && u(a, ...l), c && c(a, ...l);
  }
  function s() {
    return n.value;
  }
  function i(a) {
    const l = r.value;
    a && (a = a.filter((u) => l.get(u))), n.value = a;
  }
  return {
    indeterminateKeys: n,
    getIndeterminateKeys: s,
    setIndeterminateKeys: i,
    doUpdateIndeterminateKeys: o
  };
}
const Rw = /* @__PURE__ */ $({
  name: "ProTree",
  __name: "index",
  props: _l,
  setup(e, {
    expose: t
  }) {
    const r = e, n = ia(), o = R(), {
      data: s,
      setData: i,
      keyToNodeMap: a
    } = jw(r), {
      expandedKeys: l,
      getExpandedKeys: u,
      setExpandedKeys: c,
      doUpdateExpandedKeys: p
    } = Aw(r, {
      keyToNodeMap: a
    }), {
      selectedKeys: f,
      getSelectedKeys: m,
      setSelectedKeys: d,
      doUpdateSelectedKeys: v
    } = Ew(r, {
      keyToNodeMap: a
    }), {
      checkedKeys: b,
      getCheckedKeys: g,
      setCheckedKeys: w,
      doUpdateCheckedKeys: x
    } = Cw(r, {
      keyToNodeMap: a
    }), {
      indeterminateKeys: _,
      getIndeterminateKeys: j,
      setIndeterminateKeys: F,
      doUpdateIndeterminateKeys: q
    } = Mw(r, {
      keyToNodeMap: a
    }), B = y(() => ({
      ...r,
      data: s.value,
      checkedKeys: b.value,
      expandedKeys: l.value,
      selectedKeys: f.value,
      indeterminateKeys: _.value,
      onUpdateCheckedKeys: x,
      onUpdateExpandedKeys: p,
      onUpdateSelectedKeys: v,
      onUpdateIndeterminateKeys: q,
      "onUpdate:checkedKeys": void 0,
      "onUpdate:expandedKeys": void 0,
      "onUpdate:selectedKeys": void 0,
      "onUpdate:indeterminateKeys": void 0
    }));
    function S() {
      return [...a.value.keys()];
    }
    function L(D, I = !0) {
      if (D <= 0)
        return [];
      const E = [];
      return a.value.forEach((C, ne) => {
        const se = C[yn];
        se === D && E.push(ne), I && se < D && E.push(ne);
      }), E;
    }
    function N() {
      const D = [], I = a.value, E = r.disabledField ?? "disabled", A = (C) => !ie(C, E) && !C.checkboxDisabled;
      return I.forEach((C, ne) => {
        A(C) && D.push(ne);
      }), D;
    }
    return t({
      getFullKeys: S,
      getLevelKeys: L,
      getEnabledKeys: N,
      setCheckedKeys: w,
      getCheckedKeys: g,
      getSelectedKeys: m,
      getExpandedKeys: u,
      setExpandedKeys: c,
      setSelectedKeys: d,
      getIndeterminateKeys: j,
      setIndeterminateKeys: F,
      setTreeData: i,
      getTreeData: () => s.value,
      getCheckedData: () => o.value.getCheckedData(),
      getIndeterminateData: () => o.value.getIndeterminateData(),
      scrollTo: (...D) => {
        var I;
        return ((I = o.value) == null ? void 0 : I.scrollTo).call(I, ...D);
      }
    }), (D, I) => (ee(), Ee(V(Iu), P({
      ref_key: "treeInstRef",
      ref: o
    }, B.value), la({
      _: 2
    }, [Jr(n, (E, A) => ({
      name: A,
      fn: ae((C) => [We(D.$slots, A, Pt(wt(C ?? {})))])
    }))]), 1040));
  }
}), Dw = oe("ProModal"), Po = {
  /**
   * 弹窗是否可拖拽，无预设时不生效
   */
  draggable: {
    type: [Boolean, Object],
    default: !0
  },
  /**
   * 弹窗是否可全屏，无预设时不生效，可通过实例方法实现全屏
   */
  fullscreen: {
    type: Boolean,
    default: !0
  }
}, Sl = {
  ...ku,
  ...Po
}, dr = "pro-modal-draggable";
function Iw(e) {
  const t = [], r = y(() => e.draggable !== !1), n = y(() => {
    const { draggable: i } = e;
    return i === !1 ? null : i === !0 || i === void 0 ? {
      sticky: !0
    } : {
      sticky: !0,
      ...i
    };
  });
  function o(i) {
    const a = i.querySelector(`.${dr}`);
    a && t.push(
      Ce(a, "mousedown", (l) => {
        const u = n.value;
        if (!i || !a || !u)
          return;
        const c = a.getBoundingClientRect(), p = i.getBoundingClientRect(), f = c.left - p.left, { clientX: m, clientY: d } = l, v = m - f, b = d - f, g = +i.style.top.slice(0, -2) - f, w = +i.style.left.slice(0, -2) - f, x = Ce(window, "mousemove", (j) => {
          const { sticky: F } = u, { clientX: q, clientY: B } = j;
          let S = q - v, L = B - b;
          if (F) {
            const N = window.innerWidth || document.documentElement.clientWidth, re = window.innerHeight || document.documentElement.clientHeight, D = Math.max(0, N - p.width - p.x + f), I = Math.max(0, re - p.height - p.y + f);
            S = S > D ? D : -S > p.x - f ? -(p.x - f) : S, L = L > I ? I : -L > p.y - f ? -(p.y - f) : L;
          }
          i.style.cssText += `;left:${w + S}px;top:${g + L}px`;
        }, { capture: !0 }), _ = Ce(window, "mouseup", () => {
          _(), x();
        }, { capture: !0 });
      }, { capture: !0 })
    );
  }
  function s() {
    t.forEach((i) => i()), t.length = 0;
  }
  return fr(s), {
    canDraggable: r,
    bindingEvents: o
  };
}
const kw = Vt("pro-modal", [
  xe(`.${dr}`, `
      cursor: move;
  `)
]);
function Bw(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !de(e);
}
const Vw = /* @__PURE__ */ $({
  name: "ProModal",
  props: Sl,
  slots: Object,
  setup(e, {
    expose: t
  }) {
    const r = R(), {
      on: n,
      trigger: o
    } = at(), {
      on: s,
      trigger: i
    } = at();
    wr("ProModal", "pro-modal", kw);
    const a = jt(e, Po), l = ai(e, "show", void 0, {
      passive: !0
    }), {
      isFullscreen: u,
      exit: c,
      enter: p,
      toggle: f
    } = Qm(r), {
      canDraggable: m,
      bindingEvents: d
    } = Iw(e), v = y(() => {
      const {
        preset: F,
        titleClass: q,
        headerClass: B
      } = e;
      return F === "confirm" || F === "dialog" ? {
        titleClass: [q, m.value && dr].filter(Boolean).join(" ")
      } : F === "card" ? {
        headerClass: [B, m.value && dr].filter(Boolean).join(" ")
      } : {};
    }), b = y(() => ({
      class: "n-pro-modal",
      ...a.value,
      ...v.value,
      show: l.value,
      "onUpdate:show": (F) => l.value = F,
      onAfterEnter: g,
      onAfterLeave: w
    }));
    function g(F) {
      r.value = F, e.onAfterEnter && e.onAfterEnter(F), o(), m.value && d(F);
    }
    function w(F) {
      e.onAfterLeave && e.onAfterLeave(F), i();
    }
    function x(F) {
      l.value = !0, ge(F) && ve(F);
    }
    function _(F) {
      l.value = !1, ge(F) && ve(F);
    }
    return t({
      open: x,
      close: _,
      exitFullscreen: c,
      enterFullscreen: p,
      toggleFullscreen: f,
      onAfterEnter: n,
      onAfterLeave: s
    }), {
      nModalProps: b,
      isFullscreen: u,
      toggleFullscreen: f
    };
  },
  render() {
    const {
      $slots: e,
      preset: t,
      fullscreen: r,
      nModalProps: n,
      isFullscreen: o,
      toggleFullscreen: s
    } = this;
    function i() {
      return h(Lt, {
        text: !0,
        onClick: s
      }, {
        default: () => [h(Me, {
          size: "var(--n-title-font-size)"
        }, {
          default: () => [o ? h(Dh, null, null) : h(Vh, null, null)]
        })]
      });
    }
    const a = r && t === "card" ? {
      ...e,
      "header-extra": () => {
        var l;
        return [(l = e["header-extra"]) == null ? void 0 : l.call(e), i()];
      }
    } : e;
    return h(Bu, n, Bw(a) ? a : {
      default: () => [a]
    });
  }
}), Ol = oe("ProDescriptions"), wo = {
  /**
   * 数据源
   */
  data: Object,
  /**
   * DescriptionItems
   */
  columns: {
    type: Array
  },
  /**
   * 是否在请求中
   */
  loading: {
    type: Boolean,
    default: void 0
  },
  /**
   * 是否手动调用 request，设置后不会调用 request
   */
  manual: {
    type: Boolean,
    default: !1
  },
  /**
   * 屏幕聚焦刷新请求
   */
  refreshOnWindowFocus: {
    type: [Boolean, Object],
    default: void 0
  },
  /**
   * 是否接收路由的 query 和 params 参数作为请求参数
   */
  receiveRouteQueryParams: {
    type: Boolean,
    default: void 0
  },
  /**
   * 请求成功后可以转化数据，返回值为最终的结果值
   */
  transform: Function,
  /**
   * 请求函数
   */
  request: Function,
  /**
   * 请求失败触发的函数
   */
  onRequestError: Function,
  /**
   * 请求成功触发的函数
   */
  onRequestSuccess: Function,
  /**
   * 请求结束后触发的函数
   */
  onRequestComplete: Function
}, Fl = {
  ...Vu,
  ...wo
};
/*!
  * vue-router v4.3.3
  * (c) 2024 Eduardo San Martin Morote
  * @license MIT
  */
var Js;
(function(e) {
  e.pop = "pop", e.push = "push";
})(Js || (Js = {}));
var Zs;
(function(e) {
  e.back = "back", e.forward = "forward", e.unknown = "";
})(Zs || (Zs = {}));
Symbol(process.env.NODE_ENV !== "production" ? "navigation failure" : "");
var ea;
(function(e) {
  e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated";
})(ea || (ea = {}));
Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router" : "");
const Lw = Symbol(process.env.NODE_ENV !== "production" ? "route location" : "");
Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
function Nw() {
  return ue(Lw);
}
function Uw(e) {
  const {
    transform: t,
    onRequestError: r,
    onRequestSuccess: n,
    onRequestComplete: o,
    receiveRouteQueryParams: s = !1,
    refreshOnWindowFocus: i = { intervalTime: 3e3 }
  } = e, a = Nw(), l = R(!1), u = R({});
  let c = performance.now();
  const p = Ym(), {
    on: f,
    trigger: m
  } = at(), d = y(() => ({
    ...a.query,
    ...a.params
  }));
  async function v(g = {}) {
    if (!(!e.request || l.value))
      try {
        l.value = !0;
        const x = {
          ...(s ? d.value : void 0) ?? {},
          ...g ?? {}
        };
        let _ = await e.request(x) ?? {};
        t && (_ = t(_)), u.value = _, m(sr(_));
      } catch (w) {
        if (u.value = {}, !r)
          throw new Error(w);
        r(w);
      } finally {
        l.value = !1, o && o();
      }
  }
  J(
    p,
    (g, w) => {
      if (i && g === "visible" && w === "hidden") {
        const x = eh(i) ? 0 : i.intervalTime;
        if (x <= 0) {
          v();
          return;
        }
        const _ = performance.now();
        _ - c >= x && (v(), c = _);
      }
    }
  ), J(
    O(e, "manual"),
    (g) => {
      g || v();
    }
  );
  function b(g) {
    return v(g instanceof Event ? {} : g);
  }
  return bn(() => {
    e.manual || v();
  }), n && f(n), {
    reload: b,
    loading: l,
    data: u,
    onRequestSuccess: f
  };
}
function zw(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !de(e);
}
const Kw = /* @__PURE__ */ $({
  name: "ProDescriptions",
  inheritAttrs: !1,
  props: Fl,
  slots: Object,
  setup(e, {
    expose: t
  }) {
    const {
      getFieldsValue: r,
      setFieldsValue: n
    } = Ni({
      initialValues: e.data ?? {}
    }), {
      reload: o,
      loading: s,
      onRequestSuccess: i
    } = Uw(e), {
      valueTypeMap: a
    } = Ne(), l = jt(e, wo), u = y(() => r(!0)), c = y(() => (e.columns ?? []).filter(Boolean).map((f) => {
      const {
        label: m,
        title: d,
        tooltip: v,
        valueType: b = "input",
        ...g
      } = f;
      return {
        ...g,
        uid: ut(),
        valueType: b,
        title: d ?? m,
        tooltip: ye(v) ? [v] : [v].filter(Boolean)
      };
    }));
    return J(O(e, "data"), (f) => {
      n(f ?? {}, "overwrite");
    }, {
      deep: !0
    }), J(O(e, "loading"), (f) => s.value = !!f), i((f) => {
      n(f ?? {}, "overwrite");
    }), t({
      reload: o
    }), {
      data: u,
      loading: s,
      valueTypeMap: a,
      normalizedColumns: c,
      nDescriptionsProps: l
    };
  },
  render() {
    const {
      data: e,
      $attrs: t,
      loading: r,
      valueTypeMap: n,
      normalizedColumns: o,
      nDescriptionsProps: s
    } = this;
    return h(Lu, {
      show: r
    }, {
      default: () => [h(Nu, P(s, t), {
        ...this.$slots,
        default: () => o.map((i) => {
          const {
            uid: a,
            key: l,
            path: u,
            slots: c,
            title: p,
            render: f,
            tooltip: m,
            valueType: d,
            fieldProps: v,
            addonAfter: b,
            addonBefore: g,
            ...w
          } = i;
          return h(Uu, P({
            key: l ?? a
          }, w), {
            label: () => {
              const x = ge(p) ? p() : p;
              return x ? h(St, null, [x, m.length > 0 && h(pr, {
                trigger: "hover"
              }, {
                trigger: () => h(Me, {
                  size: 16,
                  style: {
                    cursor: "pointer",
                    verticalAlign: "text-bottom",
                    marginInlineStart: "4px"
                  }
                }, {
                  default: () => [h(Ya, null, null)]
                }),
                default: () => m.map((_, j) => h(X, {
                  key: j + _
                }, zw(_) ? _ : {
                  default: () => [_]
                }))
              })]) : null;
            },
            default: () => {
              if (f)
                return f(e);
              const x = n[d];
              return x ? ua(x, {
                path: u,
                fieldProps: v,
                simple: !0,
                readonly: !0,
                addonAfter: b,
                addonBefore: g
              }, c) : null;
            }
          });
        })
      })]
    });
  }
});
function Ww(e) {
  const [t, { reload: r }] = Ol(), n = y(() => ge(e) ? e() : e);
  return [
    y(() => ({
      ref: t,
      ...n.value
    })),
    {
      reload: r
    }
  ];
}
const qw = oe("ProSeachForm"), jl = {
  ...$r,
  /**
   * 重写默认值
   */
  labelWidth: {
    type: [String, Number],
    default: "auto"
  },
  /**
   * 重写默认值
   */
  labelPlacement: {
    type: String,
    default: "left"
  },
  /**
   * 表单项集合
   */
  columns: Array,
  /**
   * 重置按钮的属性，false 不显示
   */
  resetButtonProps: {
    type: [Object, Boolean],
    default: void 0
  },
  /**
   * 查询按钮的属性，false 不显示
   */
  searchButtonProps: {
    type: [Object, Boolean],
    default: void 0
  },
  /**
   * 展开收起按钮的属性，false 不显示
   */
  collapseButtonProps: {
    type: [Object, Boolean],
    default: void 0
  },
  /**
   * 栅格组件的属性
   */
  gridProps: Object,
  /**
   * 是否显示后缀(收起、重置、搜索)
   */
  showSuffixGridItem: {
    type: Boolean,
    default: !0
  },
  /**
   * 重置后触发的事件
   */
  onReset: Function,
  /**
   * 搜索后触发的事件
   */
  onSearch: Function,
  /**
   * 收起后触发的事件
   */
  onCollapse: Function
};
function Gw(e) {
  const t = R(!0);
  Wm(
    y(() => {
      var o;
      return ((o = e.gridProps) == null ? void 0 : o.collapsed) ?? !0;
    }),
    (o) => t.value = o
  );
  const r = y(() => {
    const { collapseButtonProps: o, showSuffixGridItem: s } = e;
    return {
      xGap: 24,
      yGap: 0,
      collapsedRows: 1,
      responsive: "screen",
      cols: "1 s:2 l:3 xl:4",
      ...e.gridProps ?? {},
      collapsed: o === !1 || s === !1 ? void 0 : t.value
    };
  });
  function n() {
    const { onCollapse: o } = e;
    t.value = !t.value, o && o(t.value);
  }
  return {
    nGridProps: r,
    toggleCollapsed: n,
    collapsed: y(() => t.value)
  };
}
function Hw(e) {
  const [t, r] = ti(), {
    scope: n
  } = Ne().proForm, o = y(() => ({
    ref: t,
    ...Wa(e, Object.keys($r)),
    onSubmit: l
  }));
  function s(c) {
    var d, v;
    const p = ((d = t.value) == null ? void 0 : d.getFieldsValue(!0)) ?? !0, f = (v = t.value) == null ? void 0 : v.getFieldValue(c.path ?? "");
    return {
      ...{
        $row: {},
        $total: 0,
        $index: -1,
        $record: {},
        $rowIndex: -1,
        $vals: p,
        $values: p,
        $self: f
      },
      ...n ?? {},
      ...e.scope ?? {}
    };
  }
  function i(c) {
    const { visible: p, hidden: f } = c;
    if (p === void 0 || f === void 0)
      return !0;
    const m = s(c);
    return p !== void 0 ? qt(p, m) : !qt(f, m);
  }
  function a() {
    const c = t.value;
    if (!c)
      return;
    const { onReset: p } = e;
    c.restoreFieldsValue(), p && p();
  }
  function l(c, p) {
    const { onSubmit: f, onSearch: m } = e;
    m && m(c), f && f(c, p);
  }
  function u() {
    const c = t.value;
    c && c.submit();
  }
  return {
    reset: a,
    search: u,
    formMethods: r,
    formInstRef: t,
    proFormProps: o,
    getColumnVisible: i
  };
}
function Yw(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !de(e);
}
const Qw = /* @__PURE__ */ $({
  name: "ProSearchForm",
  props: jl,
  slots: Object,
  setup(e, {
    expose: t
  }) {
    const {
      collapsed: r,
      nGridProps: n,
      toggleCollapsed: o
    } = Gw(e), {
      reset: s,
      search: i,
      formMethods: a,
      proFormProps: l,
      getColumnVisible: u
    } = Hw(e), {
      getMessage: c
    } = Ye("ProSearchForm"), {
      valueTypeMap: p
    } = Ne(), f = y(() => {
      const {
        resetButtonProps: b
      } = e;
      return b === !1 ? !1 : {
        content: c("resetText"),
        ...b ?? {},
        onClick: s
      };
    }), m = y(() => {
      const {
        searchButtonProps: b
      } = e;
      return b === !1 ? !1 : {
        type: "primary",
        content: c("searchText"),
        ...b ?? {},
        attrType: "submit"
      };
    }), d = y(() => {
      const {
        collapseButtonProps: b
      } = e;
      return b === !1 ? !1 : {
        text: !0,
        type: "primary",
        iconPlacement: "right",
        content: c("collapseText")(r.value),
        renderIcon: () => h(Me, {
          size: 14
        }, {
          default: () => [r.value ? h(Ha, null, null) : h(Qa, null, null)]
        }),
        ...b ?? {},
        onClick: o
      };
    }), v = {
      reset: s,
      search: i,
      toggleCollapsed: o,
      submit: a.submit,
      getScope: a.getScope,
      validate: a.validate,
      matchPath: a.matchPath,
      getFieldValue: a.getFieldValue,
      setFieldValue: a.setFieldValue,
      getFieldsValue: a.getFieldsValue,
      setFieldsValue: a.setFieldsValue,
      resetFieldValue: a.resetFieldValue,
      setInitialValue: a.setInitialValue,
      setInitialValues: a.setInitialValues,
      resetFieldsValue: a.resetFieldsValue,
      restoreValidation: a.restoreValidation,
      restoreFieldValue: a.restoreFieldValue,
      restoreFieldsValue: a.restoreFieldsValue,
      getFieldValidateResult: a.getFieldValidateResult,
      pauseDependenciesTrigger: a.pauseDependenciesTrigger,
      getFieldsTransformedValue: a.getFieldsTransformedValue,
      resumeDependenciesTrigger: a.resumeDependenciesTrigger
    };
    return t(v), {
      reset: s,
      search: i,
      collapsed: r,
      nGridProps: n,
      proFormProps: l,
      valueTypeMap: p,
      toggleCollapsed: o,
      getColumnVisible: u,
      resetButtonProps: f,
      searchButtonProps: m,
      collapseButtonProps: d
    };
  },
  render() {
    const {
      columns: e,
      nGridProps: t,
      valueTypeMap: r,
      proFormProps: n,
      getColumnVisible: o,
      showSuffixGridItem: s
    } = this;
    function i(a) {
      if (a.render)
        return a.render();
      const {
        slots: l,
        render: u,
        valueType: c = "input",
        ...p
      } = a, f = r[c];
      return f ? ua(f, p, l) : null;
    }
    return h(Tl, n, {
      default: () => [h(zu, t, {
        default: () => [(e ?? []).map((a) => {
          let l;
          const u = o(a), {
            span: c,
            offset: p,
            ...f
          } = a;
          return ra(h(Mo, {
            span: c,
            offset: p
          }, Yw(l = i(f)) ? l : {
            default: () => [l]
          }), [[na, u]]);
        }), s && h(Mo, {
          suffix: !0
        }, {
          default: () => [this.$slots.suffix ? this.$slots.suffix({
            reset: this.reset,
            search: this.search,
            toggle: this.toggleCollapsed,
            collapsed: this.collapsed
          }) : h(fe, {
            justify: "end"
          }, {
            default: () => [this.searchButtonProps !== !1 && h(ot, this.searchButtonProps, null), this.resetButtonProps !== !1 && h(ot, this.resetButtonProps, null), this.collapseButtonProps !== !1 && h(ot, this.collapseButtonProps, null)]
          })]
        })]
      })]
    });
  }
}), ta = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AUTO_CREATE_ID: _t,
  ProAutoComplete: Pw,
  ProButton: ot,
  ProCard: Ow,
  ProCascader: kP,
  ProCheckbox: VP,
  ProCheckboxGroup: xw,
  ProColorPicker: vw,
  ProConfigProvider: Q0,
  ProDate: G1,
  ProDateMonth: J1,
  ProDateMonthRange: rw,
  ProDateQuarter: Z1,
  ProDateQuarterRange: nw,
  ProDateRange: X1,
  ProDateTime: Q1,
  ProDateTimeRange: tw,
  ProDateWeek: Y1,
  ProDateYear: H1,
  ProDateYearRange: ew,
  ProDescriptions: Kw,
  ProDigit: TP,
  ProDynamicTags: yw,
  ProField: k,
  ProForm: Tl,
  ProFormItem: ao,
  ProFormList: pP,
  ProInput: bP,
  ProMention: DP,
  ProModal: Vw,
  ProPassword: $P,
  ProPopoverFormItem: Hi,
  ProRadioGroup: hw,
  ProRate: gP,
  ProSearchForm: Qw,
  ProSelect: MP,
  ProSlider: SP,
  ProSwitch: FP,
  ProTextarea: PP,
  ProTime: dw,
  ProTransfer: NP,
  ProTree: Rw,
  ProTreeSelect: lw,
  ProUpload: EP,
  ValueTypeEnum: T,
  fieldExtraKey: Xe,
  proAutoCompleteProps: $l,
  proButtonExtendProps: uo,
  proButtonProps: Ji,
  proCardExtendProps: Ln,
  proCardProps: Ga,
  proCascaderProps: il,
  proCheckboxGroupProps: xl,
  proCheckboxProps: ll,
  proColorPickerProps: Pl,
  proConfigProviderExtendProps: oo,
  proConfigProviderProps: Ui,
  proDatePickerProps: Pe,
  proDescriptionsExtendProps: wo,
  proDescriptionsProps: Fl,
  proDigitProps: tl,
  proDynamicTagsProps: wl,
  proFieldProps: te,
  proFormContextKey: Kn,
  proFormExtendProps: Un,
  proFormInstContextKey: zn,
  proFormItemProps: qi,
  proFormListContextKey: lo,
  proFormListInstContextKey: io,
  proFormListProps: Xi,
  proFormProps: $r,
  proInputProps: Vr,
  proMentionProps: al,
  proModalExtendProps: Po,
  proModalProps: Sl,
  proPopoverFormItemProps: Gi,
  proRadioGroupProps: bl,
  proRateProps: Zi,
  proSearchFormProps: jl,
  proSelectProps: sl,
  proSliderProps: rl,
  proSwitchProps: nl,
  proTimePickerProps: yl,
  proTransferProps: ul,
  proTreeProps: _l,
  proTreeSelectProps: gl,
  proUploadFieldProps: vn,
  proUploadProps: ol,
  provideGlobalConfig: Ki,
  provideProFormInst: ri,
  provideProFormListInst: Qi,
  uid: ut,
  useFieldValidateStatus: Wi,
  useInjectGlobalConfig: Ne,
  useInjectProFormContext: Tr,
  useInjectProFormInst: xr,
  useInjectProFormListInst: kr,
  useMentionInst: mo,
  useMergeFormat: ml,
  useProAutoCompleteInst: bo,
  useProCascaderInst: vo,
  useProCheckboxInst: go,
  useProDatePickerInst: pe,
  useProDescriptions: Ww,
  useProDescriptionsInst: Ol,
  useProDigitInst: fo,
  useProFormInst: ti,
  useProFormListInst: Yi,
  useProInputInst: Br,
  useProModalInst: Dw,
  useProPasswordInst: co,
  useProRequest: _0,
  useProSearchFormInst: qw,
  useProSelectInst: ho,
  useProTextareaInst: yP,
  useProTimePickerInst: yo,
  useProTreeInst: Fw,
  useProTreeSelectInst: vl,
  useProUploadInst: po,
  useReadonlyHelpers: Z
}, Symbol.toStringTag, { value: "Module" })), Al = dh({
  components: Object.keys(ta).map(
    (e) => ta[e]
  )
}), w$ = Al, $$ = Al.install, Xw = "pro-components-naive-ui", Jw = "module", Zw = "0.0.3", e$ = "pnpm@9.0.6", t$ = "基于 naive-ui 二次封装，让中后台开发更简单", r$ = "zhengchangfu", n$ = "MIT", o$ = !1, s$ = {
  access: "public"
}, a$ = {
  ".": {
    import: "./dist/index.js",
    require: "./dist/index.cjs"
  }
}, i$ = "./dist/index.cjs", l$ = "./dist/index.js", u$ = "./dist/index.d.ts", c$ = [
  "dist"
], d$ = {
  node: ">=18.12.0"
}, f$ = {
  "test:watch": "vitest",
  test: "vitest run",
  build: "vite build"
}, p$ = {
  "naive-ui": "^2.38.2",
  vue: "^3.0.0"
}, h$ = {
  "date-fns": "^3.6.0"
}, m$ = {
  "@vue/test-utils": "^2.4.6",
  jsdom: "^24.0.0",
  vitest: "^1.6.0"
}, v$ = {
  name: Xw,
  type: Jw,
  version: Zw,
  packageManager: e$,
  description: t$,
  author: r$,
  license: n$,
  sideEffects: o$,
  publishConfig: s$,
  exports: a$,
  main: i$,
  module: l$,
  types: u$,
  files: c$,
  engines: d$,
  scripts: f$,
  peerDependencies: p$,
  dependencies: h$,
  devDependencies: m$
}, x$ = v$.version;
export {
  _t as AUTO_CREATE_ID,
  Pw as ProAutoComplete,
  ot as ProButton,
  Ow as ProCard,
  kP as ProCascader,
  VP as ProCheckbox,
  xw as ProCheckboxGroup,
  vw as ProColorPicker,
  Q0 as ProConfigProvider,
  G1 as ProDate,
  J1 as ProDateMonth,
  rw as ProDateMonthRange,
  Z1 as ProDateQuarter,
  nw as ProDateQuarterRange,
  X1 as ProDateRange,
  Q1 as ProDateTime,
  tw as ProDateTimeRange,
  Y1 as ProDateWeek,
  H1 as ProDateYear,
  ew as ProDateYearRange,
  Kw as ProDescriptions,
  TP as ProDigit,
  yw as ProDynamicTags,
  k as ProField,
  Tl as ProForm,
  ao as ProFormItem,
  pP as ProFormList,
  bP as ProInput,
  DP as ProMention,
  Vw as ProModal,
  $P as ProPassword,
  Hi as ProPopoverFormItem,
  hw as ProRadioGroup,
  gP as ProRate,
  Qw as ProSearchForm,
  MP as ProSelect,
  SP as ProSlider,
  FP as ProSwitch,
  PP as ProTextarea,
  dw as ProTime,
  NP as ProTransfer,
  Rw as ProTree,
  lw as ProTreeSelect,
  EP as ProUpload,
  T as ValueTypeEnum,
  dh as create,
  w$ as default,
  Xs as enUS,
  Xe as fieldExtraKey,
  $$ as install,
  $l as proAutoCompleteProps,
  uo as proButtonExtendProps,
  Ji as proButtonProps,
  Ln as proCardExtendProps,
  Ga as proCardProps,
  il as proCascaderProps,
  xl as proCheckboxGroupProps,
  ll as proCheckboxProps,
  Pl as proColorPickerProps,
  oo as proConfigProviderExtendProps,
  Ui as proConfigProviderProps,
  Pe as proDatePickerProps,
  wo as proDescriptionsExtendProps,
  Fl as proDescriptionsProps,
  tl as proDigitProps,
  wl as proDynamicTagsProps,
  te as proFieldProps,
  Kn as proFormContextKey,
  Un as proFormExtendProps,
  zn as proFormInstContextKey,
  qi as proFormItemProps,
  lo as proFormListContextKey,
  io as proFormListInstContextKey,
  Xi as proFormListProps,
  $r as proFormProps,
  Vr as proInputProps,
  al as proMentionProps,
  Po as proModalExtendProps,
  Sl as proModalProps,
  Gi as proPopoverFormItemProps,
  bl as proRadioGroupProps,
  Zi as proRateProps,
  jl as proSearchFormProps,
  sl as proSelectProps,
  rl as proSliderProps,
  nl as proSwitchProps,
  yl as proTimePickerProps,
  ul as proTransferProps,
  _l as proTreeProps,
  gl as proTreeSelectProps,
  vn as proUploadFieldProps,
  ol as proUploadProps,
  Ki as provideGlobalConfig,
  ri as provideProFormInst,
  Qi as provideProFormListInst,
  ut as uid,
  Wi as useFieldValidateStatus,
  Ne as useInjectGlobalConfig,
  Tr as useInjectProFormContext,
  xr as useInjectProFormInst,
  kr as useInjectProFormListInst,
  Ye as useLocale,
  mo as useMentionInst,
  ml as useMergeFormat,
  bo as useProAutoCompleteInst,
  vo as useProCascaderInst,
  go as useProCheckboxInst,
  pe as useProDatePickerInst,
  Ww as useProDescriptions,
  Ol as useProDescriptionsInst,
  fo as useProDigitInst,
  ti as useProFormInst,
  Yi as useProFormListInst,
  Br as useProInputInst,
  Dw as useProModalInst,
  co as useProPasswordInst,
  _0 as useProRequest,
  qw as useProSearchFormInst,
  ho as useProSelectInst,
  yP as useProTextareaInst,
  yo as useProTimePickerInst,
  Fw as useProTreeInst,
  vl as useProTreeSelectInst,
  po as useProUploadInst,
  Z as useReadonlyHelpers,
  x$ as version,
  P$ as zhCN
};
