import { defineComponent as U, ref as u, onMounted as W, onUnmounted as N, openBlock as R, createElementBlock as Y, Fragment as j, createElementVNode as r, normalizeStyle as _, unref as J, pushScopeId as O, popScopeId as q } from "vue";
const $ = (i) => (O("data-v-49b64f1a"), i = i(), q(), i), G = ["width", "height"], K = ["width", "height"], Q = /* @__PURE__ */ $(() => /* @__PURE__ */ r("svg", {
  t: "1697120534385",
  class: "icon",
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "4319",
  width: "24",
  height: "24"
}, [
  /* @__PURE__ */ r("path", {
    d: "M512 32C246.4 32 32 246.4 32 512s214.4 480 480 480 480-214.4 480-480S777.6 32 512 32z m288 566.4c-38.4 128-156.8 214.4-288 214.4-166.4 0-300.8-134.4-300.8-300.8S345.6 211.2 512 211.2c83.2 0 160 32 214.4 89.6v-16c0-19.2 12.8-32 32-32s32 12.8 32 32v86.4c0 19.2-12.8 32-32 32H652.8c-19.2 0-32-12.8-32-32s12.8-32 32-32h22.4c-44.8-41.6-102.4-64-163.2-64-131.2 0-236.8 105.6-236.8 236.8S380.8 748.8 512 748.8c105.6 0 198.4-70.4 227.2-169.6 6.4-16 22.4-25.6 38.4-22.4 16 6.4 25.6 22.4 22.4 41.6z",
    "p-id": "4320",
    fill: "#FFF"
  })
], -1)), Z = [
  Q
], ee = /* @__PURE__ */ $(() => /* @__PURE__ */ r("span", { class: "slider_text" }, "向右滑动完成验证", -1)), V = 5, te = /* @__PURE__ */ U({
  __name: "index",
  props: {
    img: {},
    verifyPass: { type: Boolean },
    width: {},
    height: {}
  },
  emits: ["onSuccess", "onError"],
  setup(i, { emit: c }) {
    const s = i, h = (t) => `https://z1.ax1x.com/2023/10/17/${t}.jpg`;
    function M() {
      const t = [h("piPmwgP"), h("piPma9I"), h("piPmd3t"), h("piPmN4A"), h("piPmeAJ")];
      return t[Math.floor(Math.random() * t.length)];
    }
    const d = u(s.width ? s.width : 320), v = u(s.height ? s.height : 180), P = u(), w = u();
    let b = u(""), I = u().value, S = u().value;
    const l = u(0);
    let m = !1, y = 0, f = u(56), A = u(1).value, g = u(86), o = u(99);
    const k = (t, n) => Math.ceil(Math.random() * (n - t) + t);
    W(() => {
      E();
    }), N(() => {
      window.removeEventListener("mousemove", x), window.removeEventListener("mouseup", z), window.removeEventListener("mousedown", C), window.removeEventListener("touchmove", F), window.removeEventListener("touchend", p), window.removeEventListener("touchstart", B);
    });
    function D(t) {
      const n = t.getContext("2d");
      if (!n)
        return;
      const e = new Image();
      e.src = b.value, e.onload = () => {
        n.drawImage(e, 0, 0, d.value, v.value), X(n), n.fill();
      };
    }
    function X(t, n) {
      let e = Math.ceil(16 * A), a = n !== void 0 ? n : g.value;
      t.beginPath(), t.moveTo(a, o.value), t.lineTo(a + e, o.value), t.arcTo(
        a + e,
        o.value - e / 2,
        a + e + e / 2,
        o.value - e / 2,
        e / 2
      ), t.arcTo(
        a + e + e,
        o.value - e / 2,
        a + e + e,
        o.value,
        e / 2
      ), t.lineTo(a + e + e + e, o.value), t.lineTo(a + e + e + e, o.value + e), t.arcTo(
        a + e + e + e + e / 2,
        o.value + e,
        a + e + e + e + e / 2,
        o.value + e + e / 2,
        e / 2
      ), t.arcTo(
        a + e + e + e + e / 2,
        o.value + e + e,
        a + e + e + e,
        o.value + e + e,
        e / 2
      ), t.lineTo(
        a + e + e + e,
        o.value + e + e + e
      ), t.lineTo(a, o.value + e + e + e), t.lineTo(a, o.value + e + e), t.arcTo(
        a + e / 2,
        o.value + e + e,
        a + e / 2,
        o.value + e + e / 2,
        e / 2
      ), t.arcTo(
        a + e / 2,
        o.value + e,
        a,
        o.value + e,
        e / 2
      ), t.lineTo(a, o.value);
    }
    function C(t) {
      m = !0, y = t.clientX, window.addEventListener("mousemove", x), window.addEventListener("mouseup", z);
    }
    function x(t) {
      if (m) {
        const n = t.clientX - y;
        n > 0 && n < d.value - 60 && (l.value = n);
      }
    }
    function z() {
      m = !1, window.removeEventListener("mousemove", x), window.removeEventListener("mouseup", z), Math.abs(g.value - l.value) < V ? (c("onSuccess", {
        type: "success",
        message: "验证通过",
        verify: !0
      }), s.verifyPass && s.verifyPass === !0 && setTimeout(() => {
        l.value = 0;
      }, 600)) : (c("onError", {
        type: "error",
        message: "验证失败",
        verify: !1
      }), l.value = 0, E());
    }
    const E = () => {
      if (b.value = s.img ? s.img : M(), g.value = k(f.value, d.value - f.value), o.value = k(20, v.value - f.value), P.value && D(P.value), w.value) {
        w.value.width = f.value, w.value.height = v.value;
        const t = w.value.getContext("2d");
        if (t) {
          const n = new Image();
          n.src = b.value, n.onload = () => {
            I = n.width / d.value, S = n.height / v.value, n.width = d.value, n.height = v.value, t.drawImage(n, g.value * I, (o.value - 16) * S, f.value * I, v.value * S, 0, o.value - 16, f.value, v.value);
          }, X(t, 0), t.clip();
        }
      }
    }, H = () => {
      l.value !== 0 && (l.value = 0), E();
    }, B = (t) => {
      console.log(t.touches[0].clientX, t.touches[0].clientY), m = !0, y = t.touches[0].clientX, window.addEventListener("touchmove", F), window.addEventListener("touchend", p), window.addEventListener("touchcancel", p);
    }, p = () => {
      m = !1, window.addEventListener("touchmove", F), window.addEventListener("touchend", p), window.addEventListener("touchcancel", p), Math.abs(g.value - l.value) < V ? (c("onSuccess", {
        type: "success",
        message: "验证通过",
        verify: !0
      }), s.verifyPass && s.verifyPass === !0 && setTimeout(() => {
        l.value = 0;
      }, 600)) : (c("onError", {
        type: "error",
        message: "验证失败",
        verify: !1
      }), l.value = 0, E());
    }, F = (t) => {
      if (m) {
        const n = t.touches[0].clientX - y;
        n > 0 && n < d.value - 60 && (l.value = n);
      }
    };
    return (t, n) => (R(), Y(j, null, [
      r("div", {
        class: "slide_puzzle",
        style: _({ width: `${d.value}px`, height: `${v.value}px` })
      }, [
        r("canvas", {
          ref_key: "canvas",
          ref: P,
          width: d.value,
          height: v.value,
          class: "mb-4"
        }, null, 8, G),
        r("canvas", {
          ref_key: "sliderImg",
          ref: w,
          width: J(f),
          style: _({ top: "0px", left: l.value + "px" }),
          class: "slider_img",
          height: v.value
        }, null, 12, K),
        r("div", {
          class: "refresh",
          onClick: H
        }, Z)
      ], 4),
      r("div", {
        class: "slider",
        style: _({ width: `${d.value}px` })
      }, [
        ee,
        r("div", {
          class: "slider_text_bg",
          style: _({ width: l.value + "px" })
        }, null, 4),
        r("div", {
          class: "slider_bar",
          style: _({ left: l.value + "px" }),
          onMousedown: C,
          onTouchstart: B
        }, null, 36)
      ], 4)
    ], 64));
  }
});
const ne = (i, c) => {
  const s = i.__vccOpts || i;
  for (const [h, M] of c)
    s[h] = M;
  return s;
}, L = /* @__PURE__ */ ne(te, [["__scopeId", "data-v-49b64f1a"]]);
L.name = "slider-verify";
L.install = (i) => {
  i.component("slider-verify", L);
};
const oe = [
  L
], T = function(i) {
  T.installed || (T.installed = !0, oe.map((c) => {
    i.component(c.name, c);
  }));
};
typeof window < "u" && window.Vue && T(window.Vue);
const se = {
  install: T
};
export {
  se as default,
  L as sliderVerify
};
