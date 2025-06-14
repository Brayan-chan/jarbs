import "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js";
const Mn = document.querySelectorAll(".hex-input"),
    Nn = document.querySelector(".colors-rollout"),
    Un = document.querySelector(".fonts-rollout");
Mn.forEach(function(t) {
    t.addEventListener("keydown", function(n) {
        (n.keyCode === 32 || n.key === "ArrowLeft" || n.key === "ArrowRight") && n.stopPropagation()
    })
});
document.addEventListener("keydown", function(t) {
    Nn.classList.contains("showing") ? t.key === "ArrowLeft" || (t.ctrlKey || t.metaKey) && t.key === "z" || t.key === "Z" ? document.getElementById("undo").click() : (t.key === "ArrowRight" || (t.ctrlKey || t.metaKey) && (t.key === "y" || t.key === "Y")) && document.getElementById("redo").click() : Un.classList.contains("hide") && (t.key === "ArrowLeft" || (t.ctrlKey || t.metaKey) && t.key === "z" || t.key === "Z" ? document.getElementById("font-undo").click() : (t.key === "ArrowRight" || (t.ctrlKey || t.metaKey) && (t.key === "y" || t.key === "Y")) && document.getElementById("font-redo").click())
});
const Fr = (t, n, e) => "#" + ((1 << 24) + (t << 16) + (n << 8) + e).toString(16).slice(1),
    zr = (t, n, e) => {
        let c,
            l,
            o,
            s = Math.floor(t * 6),
            r = t * 6 - s,
            f = e * (1 - n),
            y = e * (1 - r * n),
            _ = e * (1 - (1 - r) * n);
        switch (s % 6) {
        case 0:
            c = e,
            l = _,
            o = f;
            break;
        case 1:
            c = y,
            l = e,
            o = f;
            break;
        case 2:
            c = f,
            l = e,
            o = _;
            break;
        case 3:
            c = f,
            l = y,
            o = e;
            break;
        case 4:
            c = _,
            l = f,
            o = e;
            break;
        case 5:
            c = e,
            l = f,
            o = y;
            break
        }
        return [Math.floor(c * 255), Math.floor(l * 255), Math.floor(o * 255)]
    };
function bt(t) {
    const n = parseInt(t.substring(1), 16),
        e = n >> 16 & 255,
        c = n >> 8 & 255,
        l = n & 255;
    return {
        r: e,
        g: c,
        b: l
    }
}
function qn(t, n, e) {
    t /= 255,
    n /= 255,
    e /= 255;
    const c = Math.max(t, n, e),
        l = Math.min(t, n, e),
        o = c - l;
    let s = 0;
    const r = c === 0 ? 0 : o / c,
        f = c;
    if (c !== l) {
        switch (c) {
        case t:
            s = (n - e) / o + (n < e ? 6 : 0);
            break;
        case n:
            s = (e - t) / o + 2;
            break;
        case e:
            s = (t - n) / o + 4;
            break
        }
        s /= 6
    }
    return {
        h: s,
        s: r,
        v: f
    }
}
function Hn(t, n, e) {
    t = t % 1;
    var c,
        l,
        o;
    if (n == 0)
        c = l = o = e;
    else {
        let f = function(y, _, h) {
            return h < 0 && (h += 1), h > 1 && (h -= 1), h < 1 / 6 ? y + (_ - y) * 6 * h : h < 1 / 2 ? _ : h < 2 / 3 ? y + (_ - y) * (2 / 3 - h) * 6 : y
        };
        var s = e < .5 ? e * (1 + n) : e + n - e * n,
            r = 2 * e - s;
        c = f(r, s, t + 1 / 3),
        l = f(r, s, t),
        o = f(r, s, t - 1 / 3)
    }
    return [Math.round(c * 255), Math.round(l * 255), Math.round(o * 255)]
}
function jn(t) {
    const n = atob(t.split(",")[1]),
        e = t.split(",")[0].split(":")[1].split(";")[0],
        c = new ArrayBuffer(n.length),
        l = new Uint8Array(c);
    for (let o = 0; o < n.length; o++)
        l[o] = n.charCodeAt(o);
    return new Blob([c], {
        type: e
    })
}
function st(t) {
    let n,
        e,
        c;
    if (t = t.charAt(0) === "#" ? t.slice(1) : t, t.length === 3)
        n = parseInt(t[0] + t[0], 16) / 255,
        e = parseInt(t[1] + t[1], 16) / 255,
        c = parseInt(t[2] + t[2], 16) / 255;
    else if (t.length === 6)
        n = parseInt(t.slice(0, 2), 16) / 255,
        e = parseInt(t.slice(2, 4), 16) / 255,
        c = parseInt(t.slice(4, 6), 16) / 255;
    else
        return {
            h: 0,
            s: 0,
            l: 0
        };
    const l = Math.max(n, e, c),
        o = Math.min(n, e, c);
    let s,
        r;
    const f = (l + o) / 2;
    if (l === o)
        s = r = 0;
    else {
        const y = l - o;
        switch (r = f > .5 ? y / (2 - l - o) : y / (l + o), l) {
        case n:
            s = (e - c) / y + (e < c ? 6 : 0);
            break;
        case e:
            s = (c - n) / y + 2;
            break;
        case c:
            s = (n - e) / y + 4;
            break
        }
        s /= 6
    }
    return {
        h: Math.round(s * 360),
        s: Math.round(r * 100),
        l: Math.round(f * 100)
    }
}
function Wn(t) {
    return /^#?([0-9A-Fa-f]{3}){1,2}$/i.test(t)
}
function Zn(t) {
    const n = /^(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})$/,
        e = t.match(n);
    if (!e)
        return !1;
    const c = parseInt(e[1]),
        l = parseInt(e[2]),
        o = parseInt(e[3]);
    return c >= 0 && c <= 255 && l >= 0 && l <= 255 && o >= 0 && o <= 255
}
function Kn(t) {
    const n = /^(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})$/,
        e = t.match(n);
    if (!e)
        return !1;
    const c = parseFloat(e[1]),
        l = parseFloat(e[2]),
        o = parseFloat(e[3]);
    return c >= 0 && c <= 360 && l >= 0 && l <= 100 && o >= 0 && o <= 100
}
function Gn(t) {
    return t = t.trim().substring(0, 7), t.length === 4 && t[0] === "#" ? "#" + t[1] + t[1] + t[2] + t[2] + t[3] + t[3] : t.length === 3 ? "#" + t[0] + t[0] + t[1] + t[1] + t[2] + t[2] : t[0] !== "#" ? "#" + t : t
}
function Vn(t) {
    const [n, e, c] = t.split(",").map(l => parseInt(l));
    return `#${n.toString(16).padStart(2, "0")}${e.toString(16).padStart(2, "0")}${c.toString(16).padStart(2, "0")}`
}
function Xn(t) {
    const [n, e, c] = t.split(",").map(l => parseFloat(l));
    return yt(n, e, c)
}
function ee(t) {
    let n = t;
    n.startsWith("#") && (n = n.slice(1)),
    n.length === 3 && (n = n.split("").map(r => r + r).join(""));
    const e = parseInt(n, 16),
        c = e >> 16 & 255,
        l = e >> 8 & 255,
        o = e & 255,
        s = Yn(c, l, o);
    return Math.round(s[0])
}
function Yn(t, n, e) {
    t /= 255,
    n /= 255,
    e /= 255;
    const c = Math.max(t, n, e),
        l = Math.min(t, n, e);
    let o,
        s,
        r;
    return c === l ? o = 0 : c === t ? o = (n - e) / (c - l) % 6 : c === n ? o = (e - t) / (c - l) + 2 : o = (t - n) / (c - l) + 4, o = Math.round(o * 60), o < 0 && (o += 360), r = (c + l) / 2, c === l ? s = 0 : r <= .5 ? s = (c - l) / (c + l) : s = (c - l) / (2 - c - l), s = Math.round(s * 100), r = Math.round(r * 100), [o, s, r]
}
function yt(t, n, e) {
    t /= 360,
    n /= 100,
    e /= 100;
    let c,
        l,
        o;
    if (n === 0)
        c = l = o = Math.round(e * 255);
    else {
        const s = (y, _, h) => (h < 0 && (h += 1), h > 1 && (h -= 1), h < .16666666666666666 ? y + (_ - y) * 6 * h : h < .5 ? _ : h < .6666666666666666 ? y + (_ - y) * (.6666666666666666 - h) * 6 : y),
            r = e < .5 ? e * (1 + n) : e + n - e * n,
            f = 2 * e - r;
        c = Math.round(s(f, r, t + 1 / 3) * 255),
        l = Math.round(s(f, r, t) * 255),
        o = Math.round(s(f, r, t - 1 / 3) * 255)
    }
    return `#${c.toString(16).padStart(2, "0")}${l.toString(16).padStart(2, "0")}${o.toString(16).padStart(2, "0")}`
}
function jt(t) {
    const {r: n, g: e, b: c} = bt(t);
    return `rgb(${n}, ${e}, ${c})`
}
function Or(t) {
    const {r: n, g: e, b: c} = bt(t);
    return `${n} ${e} ${c}`
}
function Jn(t) {
    const {r: n, g: e, b: c} = bt(t);
    return `${n}, ${e}, ${c}`
}
function Wt(t) {
    const {h: n, s: e, l: c} = st(t);
    return `hsl(${n}, ${e}%, ${c}%)`
}
function Pr(t) {
    const {h: n, s: e, l: c} = st(t);
    return `${n} ${e}% ${c}%`
}
function Qn(t) {
    const {h: n, s: e, l: c} = st(t);
    return `${n}, ${e}%, ${c}%`
}
function to(t) {
    return `0xFF${t.slice(1)}`
}
function Mr(t, n, e) {
    let c = t / 255,
        l = n / 255,
        o = e / 255;
    return [c <= .04045 ? c / 12.92 : Math.pow((c + .055) / 1.055, 2.4), l <= .04045 ? l / 12.92 : Math.pow((l + .055) / 1.055, 2.4), o <= .04045 ? o / 12.92 : Math.pow((o + .055) / 1.055, 2.4)]
}
function Nr(t, n, e) {
    let c = .4122214708 * t + .5363325363 * n + .0514459929 * e,
        l = .2119034982 * t + .6806995451 * n + .1073969566 * e,
        o = .0883024619 * t + .2817188376 * n + .6299787005 * e,
        s = Math.cbrt(c),
        r = Math.cbrt(l),
        f = Math.cbrt(o);
    return [.2104542553 * s + .793617785 * r - .0040720468 * f, 1.9779984951 * s - 2.428592205 * r + .4505937099 * f, .0259040371 * s + .7827717662 * r - .808675766 * f]
}
function eo(t, n, e) {
    let c = Math.sqrt(n * n + e * e),
        l = Math.atan2(e, n);
    return l < 0 && (l += 2 * Math.PI), l = l * (180 / Math.PI), [(t * 100).toFixed(2), c.toFixed(3), l.toFixed(2)]
}
function Ke(t) {
    let {r: n, g: e, b: c} = bt(t),
        [l, o, s] = Mr(n, e, c),
        [r, f, y] = Nr(l, o, s);
    return [(r * 100).toFixed(2), f.toFixed(3), y.toFixed(2)]
}
function Ur(t) {
    let [n, e, c] = Ke(t);
    return `oklab(${n}% ${e} ${c})`
}
function qr(t) {
    let [n, e, c] = Ke(t);
    return `${n}%, ${e}, ${c}`
}
function Ie(t) {
    let [n, e, c] = Ke(t);
    return {
        L: n,
        a: e,
        B: c
    }
}
function Ge(t) {
    let {r: n, g: e, b: c} = bt(t),
        [l, o, s] = Mr(n, e, c),
        [r, f, y] = Nr(l, o, s);
    return eo(r, f, y)
}
function Hr(t) {
    let [n, e, c] = Ge(t);
    return `${n}%, ${e}, ${c}`
}
function jr(t) {
    let [n, e, c] = Ge(t);
    return `oklch(${n}% ${e} ${c})`
}
function Re(t) {
    let [n, e, c] = Ge(t);
    return {
        L: n,
        c: e,
        h: c
    }
}
let nt = !1,
    pe = "light";
const ro = document.getElementById("theme");
ro.addEventListener("click", ao);
function no(t) {
    return st(t).l
}
function oo() {
    const c = new URLSearchParams(window.location.search).get("colors").split("-")[1],
        l = no(c);
    if (l > 50) {
        nt = !1;
        const o = document.getElementById("theme");
        o.style.backgroundColor = nt ? "var(--static3)" : "";
        const r = o.querySelector(".darkorlight-cont").children[0];
        r.style.transform = "translateY(-30px)"
    } else if (l < 50) {
        nt = !0;
        const o = document.getElementById("theme");
        o.style.backgroundColor = nt ? "var(--static3)" : "";
        const r = o.querySelector(".darkorlight-cont").children[0];
        nt ? r.style.transform = "translateY(0)" : r.style.transform = "translateY(-30px)"
    }
    document.documentElement.setAttribute("data-theme", nt ? "dark" : "light"),
    pe = nt ? "dark" : "light"
}
function Ve() {
    const t = nt ? Et(Tt.value) : Tt.value,
        n = nt ? Et(Dt.value) : Dt.value,
        e = nt ? Et(Ft.value) : Ft.value,
        c = nt ? Et(zt.value) : zt.value,
        l = nt ? Et(Ot.value) : Ot.value,
        o = nt ? Tt.value : Et(Tt.value),
        s = nt ? Dt.value : Et(Dt.value),
        r = nt ? Ft.value : Et(Ft.value),
        f = nt ? zt.value : Et(zt.value),
        y = nt ? Ot.value : Et(Ot.value);
    return {
        textDark: o,
        textLight: t,
        bgDark: s,
        bgLight: n,
        primaryDark: r,
        primaryLight: e,
        secondaryDark: f,
        secondaryLight: c,
        accentDark: y,
        accentLight: l
    }
}
let Te = !1;
function ao() {
    if (Te)
        return;
    Te = !0,
    nt = !nt;
    const t = document.getElementById("theme");
    t.style.backgroundColor = nt ? "var(--static3)" : "";
    const e = t.querySelector(".darkorlight-cont").children[0];
    e.style.transform = nt ? "translateY(0)" : "translateY(-30px)";
    const c = Ve();
    Tt.value = nt ? c.textLight : c.textDark,
    Dt.value = nt ? c.bgLight : c.bgDark,
    Ft.value = nt ? c.primaryLight : c.primaryDark,
    zt.value = nt ? c.secondaryLight : c.secondaryDark,
    Ot.value = nt ? c.accentLight : c.accentDark,
    document.documentElement.setAttribute("data-theme", nt ? "dark" : "light"),
    pe = nt ? "dark" : "light",
    localStorage.setItem("colorTheme", pe),
    xt(!0),
    Te = !1
}
document.addEventListener("keydown", function(t) {
    t.altKey && (t.key === "t" || t.key === "T") && (t.preventDefault(), document.getElementById("theme").click())
});
function Et(t) {
    const n = st(t),
        {h: e, s: c, l} = n,
        o = 100 - n.l;
    return yt(e, c, o)
}
function ar(t) {
    const e = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.exec(t);
    if (e)
        return {
            r: parseInt(e[1]),
            g: parseInt(e[2]),
            b: parseInt(e[3])
        };
    const l = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.exec(t);
    if (l) {
        const o = l[1],
            s = parseInt(o.substring(0, 2), 16),
            r = parseInt(o.substring(2, 4), 16),
            f = parseInt(o.substring(4, 6), 16);
        return {
            r: s,
            g: r,
            b: f
        }
    }
}
function Wr(t, n) {
    const e = ar(t),
        c = ar(n),
        l = sr(e),
        o = sr(c);
    return l > o ? (l + .05) / (o + .05) : (o + .05) / (l + .05)
}
function sr(t) {
    const n = t.r / 255,
        e = t.g / 255,
        c = t.b / 255;
    return .2126 * Math.pow(n, 2.2) + .7152 * Math.pow(e, 2.2) + .0722 * Math.pow(c, 2.2)
}
function ir(t) {
    let n = t;
    if (t.substring(0, 3) === "rgb") {
        const [f, y, _] = t.match(/\d+/g);
        n = "#" + ((1 << 24) + (+f << 16) + (+y << 8) + +_).toString(16).slice(1)
    }
    if (n === "#000000")
        return 0;
    if (n === "#FFFFFF")
        return 100;
    const e = parseInt(n.substring(1, 3), 16),
        c = parseInt(n.substring(3, 5), 16),
        l = parseInt(n.substring(5, 7), 16),
        o = Math.max(e, c, l),
        s = Math.min(e, c, l);
    return (o + s) / 2 * 100 / 255
}
let Oe,
    Pe,
    Me,
    Zr,
    Kr,
    Gr,
    Vr,
    Xr,
    Yr;
function so() {
    const t = wt.update();
    Oe = It(t.primary, t.text, t.bg),
    Pe = It(t.secondary, t.text, t.bg),
    Me = It(t.accent, t.text, t.bg),
    Zr = It(t.primaryL, t.textL, t.bgL),
    Kr = It(t.secondaryL, t.textL, t.bgL),
    Gr = It(t.accentL, t.textL, t.bgL),
    Vr = It(t.primaryD, t.textD, t.bgD),
    Xr = It(t.secondaryD, t.textD, t.bgD),
    Yr = It(t.accentD, t.textD, t.bgD),
    De(Oe, [...lo, Jr]),
    De(Pe, [...uo, Qr]),
    De(Me, [tn, ...ho])
}
function It(t, n, e) {
    const c = ir(n),
        l = ir(e),
        o = Wr(t, n);
    return c < l, o < 4.5 ? e : n
}
function De(t, n) {
    n.forEach(e => {
        e.style.color = t
    })
}
const Pt = document.querySelectorAll(".colorpicker"),
    Tt = document.getElementById("text"),
    Dt = document.getElementById("bg"),
    Ft = document.getElementById("primary"),
    zt = document.getElementById("secondary"),
    Ot = document.getElementById("accent"),
    io = document.querySelector(".text"),
    co = document.querySelector(".bg"),
    Jr = document.querySelector(".primary"),
    Qr = document.querySelector(".secondary"),
    tn = document.querySelector(".accent"),
    lo = document.querySelectorAll(".primary-text-contrast"),
    uo = document.querySelectorAll(".secondary-text-contrast"),
    ho = document.querySelectorAll(".accent-color-box");
function Xe() {
    return Array.from(Pt).map(t => t.value)
}
const wt = {
    update: () => {
        const t = Ve();
        return {
            text: Tt.value,
            bg: Dt.value,
            primary: Ft.value,
            secondary: zt.value,
            accent: Ot.value,
            textL: t.textLight,
            bgL: t.bgLight,
            primaryL: t.primaryLight,
            secondaryL: t.secondaryLight,
            accentL: t.accentLight,
            textD: t.textDark,
            bgD: t.bgDark,
            primaryD: t.primaryDark,
            secondaryD: t.secondaryDark,
            accentD: t.accentDark
        }
    }
};
var Kt;
(function() {
    function t(d) {
        this.mode = e.MODE_8BIT_BYTE,
        this.data = d,
        this.parsedData = [];
        for (var b = 0, v = this.data.length; b < v; b++) {
            var C = [],
                E = this.data.charCodeAt(b);
            E > 65536 ? (C[0] = 240 | (E & 1835008) >>> 18, C[1] = 128 | (E & 258048) >>> 12, C[2] = 128 | (E & 4032) >>> 6, C[3] = 128 | E & 63) : E > 2048 ? (C[0] = 224 | (E & 61440) >>> 12, C[1] = 128 | (E & 4032) >>> 6, C[2] = 128 | E & 63) : E > 128 ? (C[0] = 192 | (E & 1984) >>> 6, C[1] = 128 | E & 63) : C[0] = E,
            this.parsedData.push(C)
        }
        this.parsedData = Array.prototype.concat.apply([], this.parsedData),
        this.parsedData.length != this.data.length && (this.parsedData.unshift(191), this.parsedData.unshift(187), this.parsedData.unshift(239))
    }
    t.prototype = {
        getLength: function(d) {
            return this.parsedData.length
        },
        write: function(d) {
            for (var b = 0, v = this.parsedData.length; b < v; b++)
                d.put(this.parsedData[b], 8)
        }
    };
    function n(d, b) {
        this.typeNumber = d,
        this.errorCorrectLevel = b,
        this.modules = null,
        this.moduleCount = 0,
        this.dataCache = null,
        this.dataList = []
    }
    n.prototype = {
        addData: function(d) {
            var b = new t(d);
            this.dataList.push(b),
            this.dataCache = null
        },
        isDark: function(d, b) {
            if (d < 0 || this.moduleCount <= d || b < 0 || this.moduleCount <= b)
                throw new Error(d + "," + b);
            return this.modules[d][b]
        },
        getModuleCount: function() {
            return this.moduleCount
        },
        make: function() {
            this.makeImpl(!1, this.getBestMaskPattern())
        },
        makeImpl: function(d, b) {
            this.moduleCount = this.typeNumber * 4 + 17,
            this.modules = new Array(this.moduleCount);
            for (var v = 0; v < this.moduleCount; v++) {
                this.modules[v] = new Array(this.moduleCount);
                for (var C = 0; C < this.moduleCount; C++)
                    this.modules[v][C] = null
            }
            this.setupPositionProbePattern(0, 0),
            this.setupPositionProbePattern(this.moduleCount - 7, 0),
            this.setupPositionProbePattern(0, this.moduleCount - 7),
            this.setupPositionAdjustPattern(),
            this.setupTimingPattern(),
            this.setupTypeInfo(d, b),
            this.typeNumber >= 7 && this.setupTypeNumber(d),
            this.dataCache == null && (this.dataCache = n.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)),
            this.mapData(this.dataCache, b)
        },
        setupPositionProbePattern: function(d, b) {
            for (var v = -1; v <= 7; v++)
                if (!(d + v <= -1 || this.moduleCount <= d + v))
                    for (var C = -1; C <= 7; C++)
                        b + C <= -1 || this.moduleCount <= b + C || (0 <= v && v <= 6 && (C == 0 || C == 6) || 0 <= C && C <= 6 && (v == 0 || v == 6) || 2 <= v && v <= 4 && 2 <= C && C <= 4 ? this.modules[d + v][b + C] = !0 : this.modules[d + v][b + C] = !1)
        },
        getBestMaskPattern: function() {
            for (var d = 0, b = 0, v = 0; v < 8; v++) {
                this.makeImpl(!0, v);
                var C = o.getLostPoint(this);
                (v == 0 || d > C) && (d = C, b = v)
            }
            return b
        },
        createMovieClip: function(d, b, v) {
            var C = d.createEmptyMovieClip(b, v),
                E = 1;
            this.make();
            for (var B = 0; B < this.modules.length; B++)
                for (var A = B * E, T = 0; T < this.modules[B].length; T++) {
                    var j = T * E,
                        $ = this.modules[B][T];
                    $ && (C.beginFill(0, 100), C.moveTo(j, A), C.lineTo(j + E, A), C.lineTo(j + E, A + E), C.lineTo(j, A + E), C.endFill())
                }
            return C
        },
        setupTimingPattern: function() {
            for (var d = 8; d < this.moduleCount - 8; d++)
                this.modules[d][6] == null && (this.modules[d][6] = d % 2 == 0);
            for (var b = 8; b < this.moduleCount - 8; b++)
                this.modules[6][b] == null && (this.modules[6][b] = b % 2 == 0)
        },
        setupPositionAdjustPattern: function() {
            for (var d = o.getPatternPosition(this.typeNumber), b = 0; b < d.length; b++)
                for (var v = 0; v < d.length; v++) {
                    var C = d[b],
                        E = d[v];
                    if (this.modules[C][E] == null)
                        for (var B = -2; B <= 2; B++)
                            for (var A = -2; A <= 2; A++)
                                B == -2 || B == 2 || A == -2 || A == 2 || B == 0 && A == 0 ? this.modules[C + B][E + A] = !0 : this.modules[C + B][E + A] = !1
                }
        },
        setupTypeNumber: function(d) {
            for (var b = o.getBCHTypeNumber(this.typeNumber), v = 0; v < 18; v++) {
                var C = !d && (b >> v & 1) == 1;
                this.modules[Math.floor(v / 3)][v % 3 + this.moduleCount - 8 - 3] = C
            }
            for (var v = 0; v < 18; v++) {
                var C = !d && (b >> v & 1) == 1;
                this.modules[v % 3 + this.moduleCount - 8 - 3][Math.floor(v / 3)] = C
            }
        },
        setupTypeInfo: function(d, b) {
            for (var v = this.errorCorrectLevel << 3 | b, C = o.getBCHTypeInfo(v), E = 0; E < 15; E++) {
                var B = !d && (C >> E & 1) == 1;
                E < 6 ? this.modules[E][8] = B : E < 8 ? this.modules[E + 1][8] = B : this.modules[this.moduleCount - 15 + E][8] = B
            }
            for (var E = 0; E < 15; E++) {
                var B = !d && (C >> E & 1) == 1;
                E < 8 ? this.modules[8][this.moduleCount - E - 1] = B : E < 9 ? this.modules[8][15 - E - 1 + 1] = B : this.modules[8][15 - E - 1] = B
            }
            this.modules[this.moduleCount - 8][8] = !d
        },
        mapData: function(d, b) {
            for (var v = -1, C = this.moduleCount - 1, E = 7, B = 0, A = this.moduleCount - 1; A > 0; A -= 2)
                for (A == 6 && A--;;) {
                    for (var T = 0; T < 2; T++)
                        if (this.modules[C][A - T] == null) {
                            var j = !1;
                            B < d.length && (j = (d[B] >>> E & 1) == 1);
                            var $ = o.getMask(b, C, A - T);
                            $ && (j = !j),
                            this.modules[C][A - T] = j,
                            E--,
                            E == -1 && (B++, E = 7)
                        }
                    if (C += v, C < 0 || this.moduleCount <= C) {
                        C -= v,
                        v = -v;
                        break
                    }
                }
        }
    },
    n.PAD0 = 236,
    n.PAD1 = 17,
    n.createData = function(d, b, v) {
        for (var C = y.getRSBlocks(d, b), E = new _, B = 0; B < v.length; B++) {
            var A = v[B];
            E.put(A.mode, 4),
            E.put(A.getLength(), o.getLengthInBits(A.mode, d)),
            A.write(E)
        }
        for (var T = 0, B = 0; B < C.length; B++)
            T += C[B].dataCount;
        if (E.getLengthInBits() > T * 8)
            throw new Error("code length overflow. (" + E.getLengthInBits() + ">" + T * 8 + ")");
        for (E.getLengthInBits() + 4 <= T * 8 && E.put(0, 4); E.getLengthInBits() % 8 != 0;)
            E.putBit(!1);
        for (; !(E.getLengthInBits() >= T * 8 || (E.put(n.PAD0, 8), E.getLengthInBits() >= T * 8));)
            E.put(n.PAD1, 8);
        return n.createBytes(E, C)
    },
    n.createBytes = function(d, b) {
        for (var v = 0, C = 0, E = 0, B = new Array(b.length), A = new Array(b.length), T = 0; T < b.length; T++) {
            var j = b[T].dataCount,
                $ = b[T].totalCount - j;
            C = Math.max(C, j),
            E = Math.max(E, $),
            B[T] = new Array(j);
            for (var R = 0; R < B[T].length; R++)
                B[T][R] = 255 & d.buffer[R + v];
            v += j;
            var u = o.getErrorCorrectPolynomial($),
                P = new f(B[T], u.getLength() - 1),
                X = P.mod(u);
            A[T] = new Array(u.getLength() - 1);
            for (var R = 0; R < A[T].length; R++) {
                var q = R + X.getLength() - A[T].length;
                A[T][R] = q >= 0 ? X.get(q) : 0
            }
        }
        for (var tt = 0, R = 0; R < b.length; R++)
            tt += b[R].totalCount;
        for (var H = new Array(tt), Q = 0, R = 0; R < C; R++)
            for (var T = 0; T < b.length; T++)
                R < B[T].length && (H[Q++] = B[T][R]);
        for (var R = 0; R < E; R++)
            for (var T = 0; T < b.length; T++)
                R < A[T].length && (H[Q++] = A[T][R]);
        return H
    };
    for (var e = {
            MODE_NUMBER: 1,
            MODE_ALPHA_NUM: 2,
            MODE_8BIT_BYTE: 4,
            MODE_KANJI: 8
        }, c = {
            L: 1,
            M: 0,
            Q: 3,
            H: 2
        }, l = {
            PATTERN000: 0,
            PATTERN001: 1,
            PATTERN010: 2,
            PATTERN011: 3,
            PATTERN100: 4,
            PATTERN101: 5,
            PATTERN110: 6,
            PATTERN111: 7
        }, o = {
            PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
            G15: 1335,
            G18: 7973,
            G15_MASK: 21522,
            getBCHTypeInfo: function(d) {
                for (var b = d << 10; o.getBCHDigit(b) - o.getBCHDigit(o.G15) >= 0;)
                    b ^= o.G15 << o.getBCHDigit(b) - o.getBCHDigit(o.G15);
                return (d << 10 | b) ^ o.G15_MASK
            },
            getBCHTypeNumber: function(d) {
                for (var b = d << 12; o.getBCHDigit(b) - o.getBCHDigit(o.G18) >= 0;)
                    b ^= o.G18 << o.getBCHDigit(b) - o.getBCHDigit(o.G18);
                return d << 12 | b
            },
            getBCHDigit: function(d) {
                for (var b = 0; d != 0;)
                    b++,
                    d >>>= 1;
                return b
            },
            getPatternPosition: function(d) {
                return o.PATTERN_POSITION_TABLE[d - 1]
            },
            getMask: function(d, b, v) {
                switch (d) {
                case l.PATTERN000:
                    return (b + v) % 2 == 0;
                case l.PATTERN001:
                    return b % 2 == 0;
                case l.PATTERN010:
                    return v % 3 == 0;
                case l.PATTERN011:
                    return (b + v) % 3 == 0;
                case l.PATTERN100:
                    return (Math.floor(b / 2) + Math.floor(v / 3)) % 2 == 0;
                case l.PATTERN101:
                    return b * v % 2 + b * v % 3 == 0;
                case l.PATTERN110:
                    return (b * v % 2 + b * v % 3) % 2 == 0;
                case l.PATTERN111:
                    return (b * v % 3 + (b + v) % 2) % 2 == 0;
                default:
                    throw new Error("bad maskPattern:" + d)
                }
            },
            getErrorCorrectPolynomial: function(d) {
                for (var b = new f([1], 0), v = 0; v < d; v++)
                    b = b.multiply(new f([1, s.gexp(v)], 0));
                return b
            },
            getLengthInBits: function(d, b) {
                if (1 <= b && b < 10)
                    switch (d) {
                    case e.MODE_NUMBER:
                        return 10;
                    case e.MODE_ALPHA_NUM:
                        return 9;
                    case e.MODE_8BIT_BYTE:
                        return 8;
                    case e.MODE_KANJI:
                        return 8;
                    default:
                        throw new Error("mode:" + d)
                    }
                else if (b < 27)
                    switch (d) {
                    case e.MODE_NUMBER:
                        return 12;
                    case e.MODE_ALPHA_NUM:
                        return 11;
                    case e.MODE_8BIT_BYTE:
                        return 16;
                    case e.MODE_KANJI:
                        return 10;
                    default:
                        throw new Error("mode:" + d)
                    }
                else if (b < 41)
                    switch (d) {
                    case e.MODE_NUMBER:
                        return 14;
                    case e.MODE_ALPHA_NUM:
                        return 13;
                    case e.MODE_8BIT_BYTE:
                        return 16;
                    case e.MODE_KANJI:
                        return 12;
                    default:
                        throw new Error("mode:" + d)
                    }
                else
                    throw new Error("type:" + b)
            },
            getLostPoint: function(d) {
                for (var b = d.getModuleCount(), v = 0, C = 0; C < b; C++)
                    for (var E = 0; E < b; E++) {
                        for (var B = 0, A = d.isDark(C, E), T = -1; T <= 1; T++)
                            if (!(C + T < 0 || b <= C + T))
                                for (var j = -1; j <= 1; j++)
                                    E + j < 0 || b <= E + j || T == 0 && j == 0 || A == d.isDark(C + T, E + j) && B++;
                        B > 5 && (v += 3 + B - 5)
                    }
                for (var C = 0; C < b - 1; C++)
                    for (var E = 0; E < b - 1; E++) {
                        var $ = 0;
                        d.isDark(C, E) && $++,
                        d.isDark(C + 1, E) && $++,
                        d.isDark(C, E + 1) && $++,
                        d.isDark(C + 1, E + 1) && $++,
                        ($ == 0 || $ == 4) && (v += 3)
                    }
                for (var C = 0; C < b; C++)
                    for (var E = 0; E < b - 6; E++)
                        d.isDark(C, E) && !d.isDark(C, E + 1) && d.isDark(C, E + 2) && d.isDark(C, E + 3) && d.isDark(C, E + 4) && !d.isDark(C, E + 5) && d.isDark(C, E + 6) && (v += 40);
                for (var E = 0; E < b; E++)
                    for (var C = 0; C < b - 6; C++)
                        d.isDark(C, E) && !d.isDark(C + 1, E) && d.isDark(C + 2, E) && d.isDark(C + 3, E) && d.isDark(C + 4, E) && !d.isDark(C + 5, E) && d.isDark(C + 6, E) && (v += 40);
                for (var R = 0, E = 0; E < b; E++)
                    for (var C = 0; C < b; C++)
                        d.isDark(C, E) && R++;
                var u = Math.abs(100 * R / b / b - 50) / 5;
                return v += u * 10, v
            }
        }, s = {
            glog: function(d) {
                if (d < 1)
                    throw new Error("glog(" + d + ")");
                return s.LOG_TABLE[d]
            },
            gexp: function(d) {
                for (; d < 0;)
                    d += 255;
                for (; d >= 256;)
                    d -= 255;
                return s.EXP_TABLE[d]
            },
            EXP_TABLE: new Array(256),
            LOG_TABLE: new Array(256)
        }, r = 0; r < 8; r++)
        s.EXP_TABLE[r] = 1 << r;
    for (var r = 8; r < 256; r++)
        s.EXP_TABLE[r] = s.EXP_TABLE[r - 4] ^ s.EXP_TABLE[r - 5] ^ s.EXP_TABLE[r - 6] ^ s.EXP_TABLE[r - 8];
    for (var r = 0; r < 255; r++)
        s.LOG_TABLE[s.EXP_TABLE[r]] = r;
    function f(d, b) {
        if (d.length == null)
            throw new Error(d.length + "/" + b);
        for (var v = 0; v < d.length && d[v] == 0;)
            v++;
        this.num = new Array(d.length - v + b);
        for (var C = 0; C < d.length - v; C++)
            this.num[C] = d[C + v]
    }
    f.prototype = {
        get: function(d) {
            return this.num[d]
        },
        getLength: function() {
            return this.num.length
        },
        multiply: function(d) {
            for (var b = new Array(this.getLength() + d.getLength() - 1), v = 0; v < this.getLength(); v++)
                for (var C = 0; C < d.getLength(); C++)
                    b[v + C] ^= s.gexp(s.glog(this.get(v)) + s.glog(d.get(C)));
            return new f(b, 0)
        },
        mod: function(d) {
            if (this.getLength() - d.getLength() < 0)
                return this;
            for (var b = s.glog(this.get(0)) - s.glog(d.get(0)), v = new Array(this.getLength()), C = 0; C < this.getLength(); C++)
                v[C] = this.get(C);
            for (var C = 0; C < d.getLength(); C++)
                v[C] ^= s.gexp(s.glog(d.get(C)) + b);
            return new f(v, 0).mod(d)
        }
    };
    function y(d, b) {
        this.totalCount = d,
        this.dataCount = b
    }
    y.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]],
    y.getRSBlocks = function(d, b) {
        var v = y.getRsBlockTable(d, b);
        if (v == null)
            throw new Error("bad rs block @ typeNumber:" + d + "/errorCorrectLevel:" + b);
        for (var C = v.length / 3, E = [], B = 0; B < C; B++)
            for (var A = v[B * 3 + 0], T = v[B * 3 + 1], j = v[B * 3 + 2], $ = 0; $ < A; $++)
                E.push(new y(T, j));
        return E
    },
    y.getRsBlockTable = function(d, b) {
        switch (b) {
        case c.L:
            return y.RS_BLOCK_TABLE[(d - 1) * 4 + 0];
        case c.M:
            return y.RS_BLOCK_TABLE[(d - 1) * 4 + 1];
        case c.Q:
            return y.RS_BLOCK_TABLE[(d - 1) * 4 + 2];
        case c.H:
            return y.RS_BLOCK_TABLE[(d - 1) * 4 + 3];
        default:
            return
        }
    };
    function _() {
        this.buffer = [],
        this.length = 0
    }
    _.prototype = {
        get: function(d) {
            var b = Math.floor(d / 8);
            return (this.buffer[b] >>> 7 - d % 8 & 1) == 1
        },
        put: function(d, b) {
            for (var v = 0; v < b; v++)
                this.putBit((d >>> b - v - 1 & 1) == 1)
        },
        getLengthInBits: function() {
            return this.length
        },
        putBit: function(d) {
            var b = Math.floor(this.length / 8);
            this.buffer.length <= b && this.buffer.push(0),
            d && (this.buffer[b] |= 128 >>> this.length % 8),
            this.length++
        }
    };
    var h = [[17, 14, 11, 7], [32, 26, 20, 14], [53, 42, 32, 24], [78, 62, 46, 34], [106, 84, 60, 44], [134, 106, 74, 58], [154, 122, 86, 64], [192, 152, 108, 84], [230, 180, 130, 98], [271, 213, 151, 119], [321, 251, 177, 137], [367, 287, 203, 155], [425, 331, 241, 177], [458, 362, 258, 194], [520, 412, 292, 220], [586, 450, 322, 250], [644, 504, 364, 280], [718, 560, 394, 310], [792, 624, 442, 338], [858, 666, 482, 382], [929, 711, 509, 403], [1003, 779, 565, 439], [1091, 857, 611, 461], [1171, 911, 661, 511], [1273, 997, 715, 535], [1367, 1059, 751, 593], [1465, 1125, 805, 625], [1528, 1190, 868, 658], [1628, 1264, 908, 698], [1732, 1370, 982, 742], [1840, 1452, 1030, 790], [1952, 1538, 1112, 842], [2068, 1628, 1168, 898], [2188, 1722, 1228, 958], [2303, 1809, 1283, 983], [2431, 1911, 1351, 1051], [2563, 1989, 1423, 1093], [2699, 2099, 1499, 1139], [2809, 2213, 1579, 1219], [2953, 2331, 1663, 1273]];
    function S() {
        return typeof CanvasRenderingContext2D < "u"
    }
    function m() {
        var d = !1,
            b = navigator.userAgent;
        if (/android/i.test(b)) {
            d = !0;
            var v = b.toString().match(/android ([0-9]\.[0-9])/i);
            v && v[1] && (d = parseFloat(v[1]))
        }
        return d
    }
    var w = function() {
            var d = function(b, v) {
                this._el = b,
                this._htOption = v
            };
            return d.prototype.draw = function(b) {
                var v = this._htOption,
                    C = this._el,
                    E = b.getModuleCount();
                Math.floor(v.width / E),
                Math.floor(v.height / E),
                this.clear();
                function B(R, u) {
                    var P = document.createElementNS("http://www.w3.org/2000/svg", R);
                    for (var X in u)
                        u.hasOwnProperty(X) && P.setAttribute(X, u[X]);
                    return P
                }
                var A = B("svg", {
                    viewBox: "0 0 " + String(E) + " " + String(E),
                    width: "100%",
                    height: "100%",
                    fill: v.colorLight
                });
                A.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink"),
                C.appendChild(A),
                A.appendChild(B("rect", {
                    fill: v.colorLight,
                    width: "100%",
                    height: "100%"
                })),
                A.appendChild(B("rect", {
                    fill: v.colorDark,
                    width: "1",
                    height: "1",
                    id: "template"
                }));
                for (var T = 0; T < E; T++)
                    for (var j = 0; j < E; j++)
                        if (b.isDark(T, j)) {
                            var $ = B("use", {
                                x: String(j),
                                y: String(T)
                            });
                            $.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#template"),
                            A.appendChild($)
                        }
            }, d.prototype.clear = function() {
                for (; this._el.hasChildNodes();)
                    this._el.removeChild(this._el.lastChild)
            }, d
        }(),
        i = document.documentElement.tagName.toLowerCase() === "svg",
        p = i ? w : S() ? function() {
            function d() {
                this._elImage.src = this._elCanvas.toDataURL("image/png"),
                this._elImage.style.display = "block",
                this._elCanvas.style.display = "none"
            }
            function b(C, E) {
                var B = this;
                if (B._fFail = E, B._fSuccess = C, B._bSupportDataURI === null) {
                    var A = document.createElement("img"),
                        T = function() {
                            B._bSupportDataURI = !1,
                            B._fFail && B._fFail.call(B)
                        },
                        j = function() {
                            B._bSupportDataURI = !0,
                            B._fSuccess && B._fSuccess.call(B)
                        };
                    A.onabort = T,
                    A.onerror = T,
                    A.onload = j,
                    A.src = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
                    return
                } else
                    B._bSupportDataURI === !0 && B._fSuccess ? B._fSuccess.call(B) : B._bSupportDataURI === !1 && B._fFail && B._fFail.call(B)
            }
            var v = function(C, E) {
                this._bIsPainted = !1,
                this._android = m(),
                this._htOption = E,
                this._elCanvas = document.createElement("canvas"),
                this._elCanvas.width = E.width,
                this._elCanvas.height = E.height,
                C.appendChild(this._elCanvas),
                this._el = C,
                this._oContext = this._elCanvas.getContext("2d"),
                this._bIsPainted = !1,
                this._elImage = document.createElement("img"),
                this._elImage.alt = "Scan me!",
                this._elImage.style.display = "none",
                this._el.appendChild(this._elImage),
                this._bSupportDataURI = null
            };
            return v.prototype.draw = function(C) {
                var E = this._elImage,
                    B = this._oContext,
                    A = this._htOption,
                    T = C.getModuleCount(),
                    j = A.width / T,
                    $ = A.height / T,
                    R = Math.round(j),
                    u = Math.round($);
                E.style.display = "none",
                this.clear();
                for (var P = 0; P < T; P++)
                    for (var X = 0; X < T; X++) {
                        var q = C.isDark(P, X),
                            tt = X * j,
                            H = P * $;
                        B.strokeStyle = q ? A.colorDark : A.colorLight,
                        B.lineWidth = 1,
                        B.fillStyle = q ? A.colorDark : A.colorLight,
                        B.fillRect(tt, H, j, $),
                        B.strokeRect(Math.floor(tt) + .5, Math.floor(H) + .5, R, u),
                        B.strokeRect(Math.ceil(tt) - .5, Math.ceil(H) - .5, R, u)
                    }
                this._bIsPainted = !0
            }, v.prototype.makeImage = function() {
                this._bIsPainted && b.call(this, d)
            }, v.prototype.isPainted = function() {
                return this._bIsPainted
            }, v.prototype.clear = function() {
                this._oContext.clearRect(0, 0, this._elCanvas.width, this._elCanvas.height),
                this._bIsPainted = !1
            }, v.prototype.round = function(C) {
                return C && Math.floor(C * 1e3) / 1e3
            }, v
        }() : function() {
            var d = function(b, v) {
                this._el = b,
                this._htOption = v
            };
            return d.prototype.draw = function(b) {
                for (var v = this._htOption, C = this._el, E = b.getModuleCount(), B = Math.floor(v.width / E), A = Math.floor(v.height / E), T = ['<table style="border:0;border-collapse:collapse;">'], j = 0; j < E; j++) {
                    T.push("<tr>");
                    for (var $ = 0; $ < E; $++)
                        T.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' + B + "px;height:" + A + "px;background-color:" + (b.isDark(j, $) ? v.colorDark : v.colorLight) + ';"></td>');
                    T.push("</tr>")
                }
                T.push("</table>"),
                C.innerHTML = T.join("");
                var R = C.childNodes[0],
                    u = (v.width - R.offsetWidth) / 2,
                    P = (v.height - R.offsetHeight) / 2;
                u > 0 && P > 0 && (R.style.margin = P + "px " + u + "px")
            }, d.prototype.clear = function() {
                this._el.innerHTML = ""
            }, d
        }();
    function g(d, b) {
        for (var v = 1, C = k(d), E = 0, B = h.length; E <= B; E++) {
            var A = 0;
            switch (b) {
            case c.L:
                A = h[E][0];
                break;
            case c.M:
                A = h[E][1];
                break;
            case c.Q:
                A = h[E][2];
                break;
            case c.H:
                A = h[E][3];
                break
            }
            if (C <= A)
                break;
            v++
        }
        if (v > h.length)
            throw new Error("Too long data");
        return v
    }
    function k(d) {
        var b = encodeURI(d).toString().replace(/\%[0-9a-fA-F]{2}/g, "a");
        return b.length + (b.length != d ? 3 : 0)
    }
    Kt = function(d, b) {
        if (this._htOption = {
            width: 256,
            height: 256,
            typeNumber: 4,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: c.H
        }, typeof b == "string" && (b = {
            text: b
        }), b)
            for (var v in b)
                this._htOption[v] = b[v];
        typeof d == "string" && (d = document.getElementById(d)),
        this._htOption.useSVG && (p = w),
        this._android = m(),
        this._el = d,
        this._oQRCode = null,
        this._oDrawing = new p(this._el, this._htOption),
        this._htOption.text && this.makeCode(this._htOption.text)
    },
    Kt.prototype.makeCode = function(d) {
        this._oQRCode = new n(g(d, this._htOption.correctLevel), this._htOption.correctLevel),
        this._oQRCode.addData(d),
        this._oQRCode.make(),
        this._el.title = d,
        this._oDrawing.draw(this._oQRCode),
        this.makeImage()
    },
    Kt.prototype.makeImage = function() {
        typeof this._oDrawing.makeImage == "function" && (!this._android || this._android >= 3) && this._oDrawing.makeImage()
    },
    Kt.prototype.clear = function() {
        this._oDrawing.clear()
    },
    Kt.CorrectLevel = c
})();
var Rt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function fo(t) {
    return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t
}
var en = {
    exports: {}
};
(function(t, n) {
    (function(e, c) {
        c()
    })(Rt, function() {
        function e(y, _) {
            return typeof _ > "u" ? _ = {
                autoBom: !1
            } : typeof _ != "object" && (console.warn("Deprecated: Expected third argument to be a object"), _ = {
                autoBom: !_
            }), _.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(y.type) ? new Blob(["\uFEFF", y], {
                type: y.type
            }) : y
        }
        function c(y, _, h) {
            var S = new XMLHttpRequest;
            S.open("GET", y),
            S.responseType = "blob",
            S.onload = function() {
                f(S.response, _, h)
            },
            S.onerror = function() {
                console.error("could not download file")
            },
            S.send()
        }
        function l(y) {
            var _ = new XMLHttpRequest;
            _.open("HEAD", y, !1);
            try {
                _.send()
            } catch {}
            return 200 <= _.status && 299 >= _.status
        }
        function o(y) {
            try {
                y.dispatchEvent(new MouseEvent("click"))
            } catch {
                var _ = document.createEvent("MouseEvents");
                _.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null),
                y.dispatchEvent(_)
            }
        }
        var s = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof Rt == "object" && Rt.global === Rt ? Rt : void 0,
            r = s.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent),
            f = s.saveAs || (typeof window != "object" || window !== s ? function() {} : "download" in HTMLAnchorElement.prototype && !r ? function(y, _, h) {
                var S = s.URL || s.webkitURL,
                    m = document.createElement("a");
                _ = _ || y.name || "download",
                m.download = _,
                m.rel = "noopener",
                typeof y == "string" ? (m.href = y, m.origin === location.origin ? o(m) : l(m.href) ? c(y, _, h) : o(m, m.target = "_blank")) : (m.href = S.createObjectURL(y), setTimeout(function() {
                    S.revokeObjectURL(m.href)
                }, 4e4), setTimeout(function() {
                    o(m)
                }, 0))
            } : "msSaveOrOpenBlob" in navigator ? function(y, _, h) {
                if (_ = _ || y.name || "download", typeof y != "string")
                    navigator.msSaveOrOpenBlob(e(y, h), _);
                else if (l(y))
                    c(y, _, h);
                else {
                    var S = document.createElement("a");
                    S.href = y,
                    S.target = "_blank",
                    setTimeout(function() {
                        o(S)
                    })
                }
            } : function(y, _, h, S) {
                if (S = S || open("", "_blank"), S && (S.document.title = S.document.body.innerText = "downloading..."), typeof y == "string")
                    return c(y, _, h);
                var m = y.type === "application/octet-stream",
                    w = /constructor/i.test(s.HTMLElement) || s.safari,
                    i = /CriOS\/[\d]+/.test(navigator.userAgent);
                if ((i || m && w || r) && typeof FileReader < "u") {
                    var p = new FileReader;
                    p.onloadend = function() {
                        var d = p.result;
                        d = i ? d : d.replace(/^data:[^;]*;/, "data:attachment/file;"),
                        S ? S.location.href = d : location = d,
                        S = null
                    },
                    p.readAsDataURL(y)
                } else {
                    var g = s.URL || s.webkitURL,
                        k = g.createObjectURL(y);
                    S ? S.location = k : location.href = k,
                    S = null,
                    setTimeout(function() {
                        g.revokeObjectURL(k)
                    }, 4e4)
                }
            });
        s.saveAs = f.saveAs = f,
        t.exports = f
    })
})(en);
var mo = en.exports;
function ce(t) {
    throw new Error('Could not dynamically require "' + t + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')
}
var rn = {
    exports: {}
}; /*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/









(function(t, n) {
    (function(e) {
        t.exports = e()
    })(function() {
        return function e(c, l, o) {
            function s(y, _) {
                if (!l[y]) {
                    if (!c[y]) {
                        var h = typeof ce == "function" && ce;
                        if (!_ && h)
                            return h(y, !0);
                        if (r)
                            return r(y, !0);
                        var S = new Error("Cannot find module '" + y + "'");
                        throw S.code = "MODULE_NOT_FOUND", S
                    }
                    var m = l[y] = {
                        exports: {}
                    };
                    c[y][0].call(m.exports, function(w) {
                        var i = c[y][1][w];
                        return s(i || w)
                    }, m, m.exports, e, c, l, o)
                }
                return l[y].exports
            }
            for (var r = typeof ce == "function" && ce, f = 0; f < o.length; f++)
                s(o[f]);
            return s
        }({
            1: [function(e, c, l) {
                var o = e("./utils"),
                    s = e("./support"),
                    r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                l.encode = function(f) {
                    for (var y, _, h, S, m, w, i, p = [], g = 0, k = f.length, d = k, b = o.getTypeOf(f) !== "string"; g < f.length;)
                        d = k - g,
                        h = b ? (y = f[g++], _ = g < k ? f[g++] : 0, g < k ? f[g++] : 0) : (y = f.charCodeAt(g++), _ = g < k ? f.charCodeAt(g++) : 0, g < k ? f.charCodeAt(g++) : 0),
                        S = y >> 2,
                        m = (3 & y) << 4 | _ >> 4,
                        w = 1 < d ? (15 & _) << 2 | h >> 6 : 64,
                        i = 2 < d ? 63 & h : 64,
                        p.push(r.charAt(S) + r.charAt(m) + r.charAt(w) + r.charAt(i));
                    return p.join("")
                },
                l.decode = function(f) {
                    var y,
                        _,
                        h,
                        S,
                        m,
                        w,
                        i = 0,
                        p = 0,
                        g = "data:";
                    if (f.substr(0, g.length) === g)
                        throw new Error("Invalid base64 input, it looks like a data url.");
                    var k,
                        d = 3 * (f = f.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
                    if (f.charAt(f.length - 1) === r.charAt(64) && d--, f.charAt(f.length - 2) === r.charAt(64) && d--, d % 1 != 0)
                        throw new Error("Invalid base64 input, bad content length.");
                    for (k = s.uint8array ? new Uint8Array(0 | d) : new Array(0 | d); i < f.length;)
                        y = r.indexOf(f.charAt(i++)) << 2 | (S = r.indexOf(f.charAt(i++))) >> 4,
                        _ = (15 & S) << 4 | (m = r.indexOf(f.charAt(i++))) >> 2,
                        h = (3 & m) << 6 | (w = r.indexOf(f.charAt(i++))),
                        k[p++] = y,
                        m !== 64 && (k[p++] = _),
                        w !== 64 && (k[p++] = h);
                    return k
                }
            }, {
                "./support": 30,
                "./utils": 32
            }],
            2: [function(e, c, l) {
                var o = e("./external"),
                    s = e("./stream/DataWorker"),
                    r = e("./stream/Crc32Probe"),
                    f = e("./stream/DataLengthProbe");
                function y(_, h, S, m, w) {
                    this.compressedSize = _,
                    this.uncompressedSize = h,
                    this.crc32 = S,
                    this.compression = m,
                    this.compressedContent = w
                }
                y.prototype = {
                    getContentWorker: function() {
                        var _ = new s(o.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new f("data_length")),
                            h = this;
                        return _.on("end", function() {
                            if (this.streamInfo.data_length !== h.uncompressedSize)
                                throw new Error("Bug : uncompressed data size mismatch")
                        }), _
                    },
                    getCompressedWorker: function() {
                        return new s(o.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression)
                    }
                },
                y.createWorkerFrom = function(_, h, S) {
                    return _.pipe(new r).pipe(new f("uncompressedSize")).pipe(h.compressWorker(S)).pipe(new f("compressedSize")).withStreamInfo("compression", h)
                },
                c.exports = y
            }, {
                "./external": 6,
                "./stream/Crc32Probe": 25,
                "./stream/DataLengthProbe": 26,
                "./stream/DataWorker": 27
            }],
            3: [function(e, c, l) {
                var o = e("./stream/GenericWorker");
                l.STORE = {
                    magic: "\0\0",
                    compressWorker: function() {
                        return new o("STORE compression")
                    },
                    uncompressWorker: function() {
                        return new o("STORE decompression")
                    }
                },
                l.DEFLATE = e("./flate")
            }, {
                "./flate": 7,
                "./stream/GenericWorker": 28
            }],
            4: [function(e, c, l) {
                var o = e("./utils"),
                    s = function() {
                        for (var r, f = [], y = 0; y < 256; y++) {
                            r = y;
                            for (var _ = 0; _ < 8; _++)
                                r = 1 & r ? 3988292384 ^ r >>> 1 : r >>> 1;
                            f[y] = r
                        }
                        return f
                    }();
                c.exports = function(r, f) {
                    return r !== void 0 && r.length ? o.getTypeOf(r) !== "string" ? function(y, _, h, S) {
                        var m = s,
                            w = S + h;
                        y ^= -1;
                        for (var i = S; i < w; i++)
                            y = y >>> 8 ^ m[255 & (y ^ _[i])];
                        return -1 ^ y
                    }(0 | f, r, r.length, 0) : function(y, _, h, S) {
                        var m = s,
                            w = S + h;
                        y ^= -1;
                        for (var i = S; i < w; i++)
                            y = y >>> 8 ^ m[255 & (y ^ _.charCodeAt(i))];
                        return -1 ^ y
                    }(0 | f, r, r.length, 0) : 0
                }
            }, {
                "./utils": 32
            }],
            5: [function(e, c, l) {
                l.base64 = !1,
                l.binary = !1,
                l.dir = !1,
                l.createFolders = !0,
                l.date = null,
                l.compression = null,
                l.compressionOptions = null,
                l.comment = null,
                l.unixPermissions = null,
                l.dosPermissions = null
            }, {}],
            6: [function(e, c, l) {
                var o = null;
                o = typeof Promise < "u" ? Promise : e("lie"),
                c.exports = {
                    Promise: o
                }
            }, {
                lie: 37
            }],
            7: [function(e, c, l) {
                var o = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Uint32Array < "u",
                    s = e("pako"),
                    r = e("./utils"),
                    f = e("./stream/GenericWorker"),
                    y = o ? "uint8array" : "array";
                function _(h, S) {
                    f.call(this, "FlateWorker/" + h),
                    this._pako = null,
                    this._pakoAction = h,
                    this._pakoOptions = S,
                    this.meta = {}
                }
                l.magic = "\b\0",
                r.inherits(_, f),
                _.prototype.processChunk = function(h) {
                    this.meta = h.meta,
                    this._pako === null && this._createPako(),
                    this._pako.push(r.transformTo(y, h.data), !1)
                },
                _.prototype.flush = function() {
                    f.prototype.flush.call(this),
                    this._pako === null && this._createPako(),
                    this._pako.push([], !0)
                },
                _.prototype.cleanUp = function() {
                    f.prototype.cleanUp.call(this),
                    this._pako = null
                },
                _.prototype._createPako = function() {
                    this._pako = new s[this._pakoAction]({
                        raw: !0,
                        level: this._pakoOptions.level || -1
                    });
                    var h = this;
                    this._pako.onData = function(S) {
                        h.push({
                            data: S,
                            meta: h.meta
                        })
                    }
                },
                l.compressWorker = function(h) {
                    return new _("Deflate", h)
                },
                l.uncompressWorker = function() {
                    return new _("Inflate", {})
                }
            }, {
                "./stream/GenericWorker": 28,
                "./utils": 32,
                pako: 38
            }],
            8: [function(e, c, l) {
                function o(m, w) {
                    var i,
                        p = "";
                    for (i = 0; i < w; i++)
                        p += String.fromCharCode(255 & m),
                        m >>>= 8;
                    return p
                }
                function s(m, w, i, p, g, k) {
                    var d,
                        b,
                        v = m.file,
                        C = m.compression,
                        E = k !== y.utf8encode,
                        B = r.transformTo("string", k(v.name)),
                        A = r.transformTo("string", y.utf8encode(v.name)),
                        T = v.comment,
                        j = r.transformTo("string", k(T)),
                        $ = r.transformTo("string", y.utf8encode(T)),
                        R = A.length !== v.name.length,
                        u = $.length !== T.length,
                        P = "",
                        X = "",
                        q = "",
                        tt = v.dir,
                        H = v.date,
                        Q = {
                            crc32: 0,
                            compressedSize: 0,
                            uncompressedSize: 0
                        };
                    w && !i || (Q.crc32 = m.crc32, Q.compressedSize = m.compressedSize, Q.uncompressedSize = m.uncompressedSize);
                    var z = 0;
                    w && (z |= 8),
                    E || !R && !u || (z |= 2048);
                    var F = 0,
                        J = 0;
                    tt && (F |= 16),
                    g === "UNIX" ? (J = 798, F |= function(K, ct) {
                        var ht = K;
                        return K || (ht = ct ? 16893 : 33204), (65535 & ht) << 16
                    }(v.unixPermissions, tt)) : (J = 20, F |= function(K) {
                        return 63 & (K || 0)
                    }(v.dosPermissions)),
                    d = H.getUTCHours(),
                    d <<= 6,
                    d |= H.getUTCMinutes(),
                    d <<= 5,
                    d |= H.getUTCSeconds() / 2,
                    b = H.getUTCFullYear() - 1980,
                    b <<= 4,
                    b |= H.getUTCMonth() + 1,
                    b <<= 5,
                    b |= H.getUTCDate(),
                    R && (X = o(1, 1) + o(_(B), 4) + A, P += "up" + o(X.length, 2) + X),
                    u && (q = o(1, 1) + o(_(j), 4) + $, P += "uc" + o(q.length, 2) + q);
                    var G = "";
                    return G += `
\0`
                    , G += o(z, 2), G += C.magic, G += o(d, 2), G += o(b, 2), G += o(Q.crc32, 4), G += o(Q.compressedSize, 4), G += o(Q.uncompressedSize, 4), G += o(B.length, 2), G += o(P.length, 2), {
                        fileRecord: h.LOCAL_FILE_HEADER + G + B + P,
                        dirRecord: h.CENTRAL_FILE_HEADER + o(J, 2) + G + o(j.length, 2) + "\0\0\0\0" + o(F, 4) + o(p, 4) + B + P + j
                    }
                }
                var r = e("../utils"),
                    f = e("../stream/GenericWorker"),
                    y = e("../utf8"),
                    _ = e("../crc32"),
                    h = e("../signature");
                function S(m, w, i, p) {
                    f.call(this, "ZipFileWorker"),
                    this.bytesWritten = 0,
                    this.zipComment = w,
                    this.zipPlatform = i,
                    this.encodeFileName = p,
                    this.streamFiles = m,
                    this.accumulate = !1,
                    this.contentBuffer = [],
                    this.dirRecords = [],
                    this.currentSourceOffset = 0,
                    this.entriesCount = 0,
                    this.currentFile = null,
                    this._sources = []
                }
                r.inherits(S, f),
                S.prototype.push = function(m) {
                    var w = m.meta.percent || 0,
                        i = this.entriesCount,
                        p = this._sources.length;
                    this.accumulate ? this.contentBuffer.push(m) : (this.bytesWritten += m.data.length, f.prototype.push.call(this, {
                        data: m.data,
                        meta: {
                            currentFile: this.currentFile,
                            percent: i ? (w + 100 * (i - p - 1)) / i : 100
                        }
                    }))
                },
                S.prototype.openedSource = function(m) {
                    this.currentSourceOffset = this.bytesWritten,
                    this.currentFile = m.file.name;
                    var w = this.streamFiles && !m.file.dir;
                    if (w) {
                        var i = s(m, w, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
                        this.push({
                            data: i.fileRecord,
                            meta: {
                                percent: 0
                            }
                        })
                    } else
                        this.accumulate = !0
                },
                S.prototype.closedSource = function(m) {
                    this.accumulate = !1;
                    var w = this.streamFiles && !m.file.dir,
                        i = s(m, w, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
                    if (this.dirRecords.push(i.dirRecord), w)
                        this.push({
                            data: function(p) {
                                return h.DATA_DESCRIPTOR + o(p.crc32, 4) + o(p.compressedSize, 4) + o(p.uncompressedSize, 4)
                            }(m),
                            meta: {
                                percent: 100
                            }
                        });
                    else
                        for (this.push({
                            data: i.fileRecord,
                            meta: {
                                percent: 0
                            }
                        }); this.contentBuffer.length;)
                            this.push(this.contentBuffer.shift());
                    this.currentFile = null
                },
                S.prototype.flush = function() {
                    for (var m = this.bytesWritten, w = 0; w < this.dirRecords.length; w++)
                        this.push({
                            data: this.dirRecords[w],
                            meta: {
                                percent: 100
                            }
                        });
                    var i = this.bytesWritten - m,
                        p = function(g, k, d, b, v) {
                            var C = r.transformTo("string", v(b));
                            return h.CENTRAL_DIRECTORY_END + "\0\0\0\0" + o(g, 2) + o(g, 2) + o(k, 4) + o(d, 4) + o(C.length, 2) + C
                        }(this.dirRecords.length, i, m, this.zipComment, this.encodeFileName);
                    this.push({
                        data: p,
                        meta: {
                            percent: 100
                        }
                    })
                },
                S.prototype.prepareNextSource = function() {
                    this.previous = this._sources.shift(),
                    this.openedSource(this.previous.streamInfo),
                    this.isPaused ? this.previous.pause() : this.previous.resume()
                },
                S.prototype.registerPrevious = function(m) {
                    this._sources.push(m);
                    var w = this;
                    return m.on("data", function(i) {
                        w.processChunk(i)
                    }), m.on("end", function() {
                        w.closedSource(w.previous.streamInfo),
                        w._sources.length ? w.prepareNextSource() : w.end()
                    }), m.on("error", function(i) {
                        w.error(i)
                    }), this
                },
                S.prototype.resume = function() {
                    return !!f.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), !0))
                },
                S.prototype.error = function(m) {
                    var w = this._sources;
                    if (!f.prototype.error.call(this, m))
                        return !1;
                    for (var i = 0; i < w.length; i++)
                        try {
                            w[i].error(m)
                        } catch {}
                    return !0
                },
                S.prototype.lock = function() {
                    f.prototype.lock.call(this);
                    for (var m = this._sources, w = 0; w < m.length; w++)
                        m[w].lock()
                },
                c.exports = S
            }, {
                "../crc32": 4,
                "../signature": 23,
                "../stream/GenericWorker": 28,
                "../utf8": 31,
                "../utils": 32
            }],
            9: [function(e, c, l) {
                var o = e("../compressions"),
                    s = e("./ZipFileWorker");
                l.generateWorker = function(r, f, y) {
                    var _ = new s(f.streamFiles, y, f.platform, f.encodeFileName),
                        h = 0;
                    try {
                        r.forEach(function(S, m) {
                            h++;
                            var w = function(k, d) {
                                    var b = k || d,
                                        v = o[b];
                                    if (!v)
                                        throw new Error(b + " is not a valid compression method !");
                                    return v
                                }(m.options.compression, f.compression),
                                i = m.options.compressionOptions || f.compressionOptions || {},
                                p = m.dir,
                                g = m.date;
                            m._compressWorker(w, i).withStreamInfo("file", {
                                name: S,
                                dir: p,
                                date: g,
                                comment: m.comment || "",
                                unixPermissions: m.unixPermissions,
                                dosPermissions: m.dosPermissions
                            }).pipe(_)
                        }),
                        _.entriesCount = h
                    } catch (S) {
                        _.error(S)
                    }
                    return _
                }
            }, {
                "../compressions": 3,
                "./ZipFileWorker": 8
            }],
            10: [function(e, c, l) {
                function o() {
                    if (!(this instanceof o))
                        return new o;
                    if (arguments.length)
                        throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
                    this.files = Object.create(null),
                    this.comment = null,
                    this.root = "",
                    this.clone = function() {
                        var s = new o;
                        for (var r in this)
                            typeof this[r] != "function" && (s[r] = this[r]);
                        return s
                    }
                }
                (o.prototype = e("./object")).loadAsync = e("./load"),
                o.support = e("./support"),
                o.defaults = e("./defaults"),
                o.version = "3.10.1",
                o.loadAsync = function(s, r) {
                    return new o().loadAsync(s, r)
                },
                o.external = e("./external"),
                c.exports = o
            }, {
                "./defaults": 5,
                "./external": 6,
                "./load": 11,
                "./object": 15,
                "./support": 30
            }],
            11: [function(e, c, l) {
                var o = e("./utils"),
                    s = e("./external"),
                    r = e("./utf8"),
                    f = e("./zipEntries"),
                    y = e("./stream/Crc32Probe"),
                    _ = e("./nodejsUtils");
                function h(S) {
                    return new s.Promise(function(m, w) {
                        var i = S.decompressed.getContentWorker().pipe(new y);
                        i.on("error", function(p) {
                            w(p)
                        }).on("end", function() {
                            i.streamInfo.crc32 !== S.decompressed.crc32 ? w(new Error("Corrupted zip : CRC32 mismatch")) : m()
                        }).resume()
                    })
                }
                c.exports = function(S, m) {
                    var w = this;
                    return m = o.extend(m || {}, {
                        base64: !1,
                        checkCRC32: !1,
                        optimizedBinaryString: !1,
                        createFolders: !1,
                        decodeFileName: r.utf8decode
                    }), _.isNode && _.isStream(S) ? s.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : o.prepareContent("the loaded zip file", S, !0, m.optimizedBinaryString, m.base64).then(function(i) {
                        var p = new f(m);
                        return p.load(i), p
                    }).then(function(i) {
                        var p = [s.Promise.resolve(i)],
                            g = i.files;
                        if (m.checkCRC32)
                            for (var k = 0; k < g.length; k++)
                                p.push(h(g[k]));
                        return s.Promise.all(p)
                    }).then(function(i) {
                        for (var p = i.shift(), g = p.files, k = 0; k < g.length; k++) {
                            var d = g[k],
                                b = d.fileNameStr,
                                v = o.resolve(d.fileNameStr);
                            w.file(v, d.decompressed, {
                                binary: !0,
                                optimizedBinaryString: !0,
                                date: d.date,
                                dir: d.dir,
                                comment: d.fileCommentStr.length ? d.fileCommentStr : null,
                                unixPermissions: d.unixPermissions,
                                dosPermissions: d.dosPermissions,
                                createFolders: m.createFolders
                            }),
                            d.dir || (w.file(v).unsafeOriginalName = b)
                        }
                        return p.zipComment.length && (w.comment = p.zipComment), w
                    })
                }
            }, {
                "./external": 6,
                "./nodejsUtils": 14,
                "./stream/Crc32Probe": 25,
                "./utf8": 31,
                "./utils": 32,
                "./zipEntries": 33
            }],
            12: [function(e, c, l) {
                var o = e("../utils"),
                    s = e("../stream/GenericWorker");
                function r(f, y) {
                    s.call(this, "Nodejs stream input adapter for " + f),
                    this._upstreamEnded = !1,
                    this._bindStream(y)
                }
                o.inherits(r, s),
                r.prototype._bindStream = function(f) {
                    var y = this;
                    (this._stream = f).pause(),
                    f.on("data", function(_) {
                        y.push({
                            data: _,
                            meta: {
                                percent: 0
                            }
                        })
                    }).on("error", function(_) {
                        y.isPaused ? this.generatedError = _ : y.error(_)
                    }).on("end", function() {
                        y.isPaused ? y._upstreamEnded = !0 : y.end()
                    })
                },
                r.prototype.pause = function() {
                    return !!s.prototype.pause.call(this) && (this._stream.pause(), !0)
                },
                r.prototype.resume = function() {
                    return !!s.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), !0)
                },
                c.exports = r
            }, {
                "../stream/GenericWorker": 28,
                "../utils": 32
            }],
            13: [function(e, c, l) {
                var o = e("readable-stream").Readable;
                function s(r, f, y) {
                    o.call(this, f),
                    this._helper = r;
                    var _ = this;
                    r.on("data", function(h, S) {
                        _.push(h) || _._helper.pause(),
                        y && y(S)
                    }).on("error", function(h) {
                        _.emit("error", h)
                    }).on("end", function() {
                        _.push(null)
                    })
                }
                e("../utils").inherits(s, o),
                s.prototype._read = function() {
                    this._helper.resume()
                },
                c.exports = s
            }, {
                "../utils": 32,
                "readable-stream": 16
            }],
            14: [function(e, c, l) {
                c.exports = {
                    isNode: typeof Buffer < "u",
                    newBufferFrom: function(o, s) {
                        if (Buffer.from && Buffer.from !== Uint8Array.from)
                            return Buffer.from(o, s);
                        if (typeof o == "number")
                            throw new Error('The "data" argument must not be a number');
                        return new Buffer(o, s)
                    },
                    allocBuffer: function(o) {
                        if (Buffer.alloc)
                            return Buffer.alloc(o);
                        var s = new Buffer(o);
                        return s.fill(0), s
                    },
                    isBuffer: function(o) {
                        return Buffer.isBuffer(o)
                    },
                    isStream: function(o) {
                        return o && typeof o.on == "function" && typeof o.pause == "function" && typeof o.resume == "function"
                    }
                }
            }, {}],
            15: [function(e, c, l) {
                function o(v, C, E) {
                    var B,
                        A = r.getTypeOf(C),
                        T = r.extend(E || {}, _);
                    T.date = T.date || new Date,
                    T.compression !== null && (T.compression = T.compression.toUpperCase()),
                    typeof T.unixPermissions == "string" && (T.unixPermissions = parseInt(T.unixPermissions, 8)),
                    T.unixPermissions && 16384 & T.unixPermissions && (T.dir = !0),
                    T.dosPermissions && 16 & T.dosPermissions && (T.dir = !0),
                    T.dir && (v = g(v)),
                    T.createFolders && (B = p(v)) && k.call(this, B, !0);
                    var j = A === "string" && T.binary === !1 && T.base64 === !1;
                    E && E.binary !== void 0 || (T.binary = !j),
                    (C instanceof h && C.uncompressedSize === 0 || T.dir || !C || C.length === 0) && (T.base64 = !1, T.binary = !0, C = "", T.compression = "STORE", A = "string");
                    var $ = null;
                    $ = C instanceof h || C instanceof f ? C : w.isNode && w.isStream(C) ? new i(v, C) : r.prepareContent(v, C, T.binary, T.optimizedBinaryString, T.base64);
                    var R = new S(v, $, T);
                    this.files[v] = R
                }
                var s = e("./utf8"),
                    r = e("./utils"),
                    f = e("./stream/GenericWorker"),
                    y = e("./stream/StreamHelper"),
                    _ = e("./defaults"),
                    h = e("./compressedObject"),
                    S = e("./zipObject"),
                    m = e("./generate"),
                    w = e("./nodejsUtils"),
                    i = e("./nodejs/NodejsStreamInputAdapter"),
                    p = function(v) {
                        v.slice(-1) === "/" && (v = v.substring(0, v.length - 1));
                        var C = v.lastIndexOf("/");
                        return 0 < C ? v.substring(0, C) : ""
                    },
                    g = function(v) {
                        return v.slice(-1) !== "/" && (v += "/"), v
                    },
                    k = function(v, C) {
                        return C = C !== void 0 ? C : _.createFolders, v = g(v), this.files[v] || o.call(this, v, null, {
                            dir: !0,
                            createFolders: C
                        }), this.files[v]
                    };
                function d(v) {
                    return Object.prototype.toString.call(v) === "[object RegExp]"
                }
                var b = {
                    load: function() {
                        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")
                    },
                    forEach: function(v) {
                        var C,
                            E,
                            B;
                        for (C in this.files)
                            B = this.files[C],
                            (E = C.slice(this.root.length, C.length)) && C.slice(0, this.root.length) === this.root && v(E, B)
                    },
                    filter: function(v) {
                        var C = [];
                        return this.forEach(function(E, B) {
                            v(E, B) && C.push(B)
                        }), C
                    },
                    file: function(v, C, E) {
                        if (arguments.length !== 1)
                            return v = this.root + v, o.call(this, v, C, E), this;
                        if (d(v)) {
                            var B = v;
                            return this.filter(function(T, j) {
                                return !j.dir && B.test(T)
                            })
                        }
                        var A = this.files[this.root + v];
                        return A && !A.dir ? A : null
                    },
                    folder: function(v) {
                        if (!v)
                            return this;
                        if (d(v))
                            return this.filter(function(A, T) {
                                return T.dir && v.test(A)
                            });
                        var C = this.root + v,
                            E = k.call(this, C),
                            B = this.clone();
                        return B.root = E.name, B
                    },
                    remove: function(v) {
                        v = this.root + v;
                        var C = this.files[v];
                        if (C || (v.slice(-1) !== "/" && (v += "/"), C = this.files[v]), C && !C.dir)
                            delete this.files[v];
                        else
                            for (var E = this.filter(function(A, T) {
                                    return T.name.slice(0, v.length) === v
                                }), B = 0; B < E.length; B++)
                                delete this.files[E[B].name];
                        return this
                    },
                    generate: function() {
                        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")
                    },
                    generateInternalStream: function(v) {
                        var C,
                            E = {};
                        try {
                            if ((E = r.extend(v || {}, {
                                streamFiles: !1,
                                compression: "STORE",
                                compressionOptions: null,
                                type: "",
                                platform: "DOS",
                                comment: null,
                                mimeType: "application/zip",
                                encodeFileName: s.utf8encode
                            })).type = E.type.toLowerCase(), E.compression = E.compression.toUpperCase(), E.type === "binarystring" && (E.type = "string"), !E.type)
                                throw new Error("No output type specified.");
                            r.checkSupport(E.type),
                            E.platform !== "darwin" && E.platform !== "freebsd" && E.platform !== "linux" && E.platform !== "sunos" || (E.platform = "UNIX"),
                            E.platform === "win32" && (E.platform = "DOS");
                            var B = E.comment || this.comment || "";
                            C = m.generateWorker(this, E, B)
                        } catch (A) {
                            (C = new f("error")).error(A)
                        }
                        return new y(C, E.type || "string", E.mimeType)
                    },
                    generateAsync: function(v, C) {
                        return this.generateInternalStream(v).accumulate(C)
                    },
                    generateNodeStream: function(v, C) {
                        return (v = v || {}).type || (v.type = "nodebuffer"), this.generateInternalStream(v).toNodejsStream(C)
                    }
                };
                c.exports = b
            }, {
                "./compressedObject": 2,
                "./defaults": 5,
                "./generate": 9,
                "./nodejs/NodejsStreamInputAdapter": 12,
                "./nodejsUtils": 14,
                "./stream/GenericWorker": 28,
                "./stream/StreamHelper": 29,
                "./utf8": 31,
                "./utils": 32,
                "./zipObject": 35
            }],
            16: [function(e, c, l) {
                c.exports = e("stream")
            }, {
                stream: void 0
            }],
            17: [function(e, c, l) {
                var o = e("./DataReader");
                function s(r) {
                    o.call(this, r);
                    for (var f = 0; f < this.data.length; f++)
                        r[f] = 255 & r[f]
                }
                e("../utils").inherits(s, o),
                s.prototype.byteAt = function(r) {
                    return this.data[this.zero + r]
                },
                s.prototype.lastIndexOfSignature = function(r) {
                    for (var f = r.charCodeAt(0), y = r.charCodeAt(1), _ = r.charCodeAt(2), h = r.charCodeAt(3), S = this.length - 4; 0 <= S; --S)
                        if (this.data[S] === f && this.data[S + 1] === y && this.data[S + 2] === _ && this.data[S + 3] === h)
                            return S - this.zero;
                    return -1
                },
                s.prototype.readAndCheckSignature = function(r) {
                    var f = r.charCodeAt(0),
                        y = r.charCodeAt(1),
                        _ = r.charCodeAt(2),
                        h = r.charCodeAt(3),
                        S = this.readData(4);
                    return f === S[0] && y === S[1] && _ === S[2] && h === S[3]
                },
                s.prototype.readData = function(r) {
                    if (this.checkOffset(r), r === 0)
                        return [];
                    var f = this.data.slice(this.zero + this.index, this.zero + this.index + r);
                    return this.index += r, f
                },
                c.exports = s
            }, {
                "../utils": 32,
                "./DataReader": 18
            }],
            18: [function(e, c, l) {
                var o = e("../utils");
                function s(r) {
                    this.data = r,
                    this.length = r.length,
                    this.index = 0,
                    this.zero = 0
                }
                s.prototype = {
                    checkOffset: function(r) {
                        this.checkIndex(this.index + r)
                    },
                    checkIndex: function(r) {
                        if (this.length < this.zero + r || r < 0)
                            throw new Error("End of data reached (data length = " + this.length + ", asked index = " + r + "). Corrupted zip ?")
                    },
                    setIndex: function(r) {
                        this.checkIndex(r),
                        this.index = r
                    },
                    skip: function(r) {
                        this.setIndex(this.index + r)
                    },
                    byteAt: function() {},
                    readInt: function(r) {
                        var f,
                            y = 0;
                        for (this.checkOffset(r), f = this.index + r - 1; f >= this.index; f--)
                            y = (y << 8) + this.byteAt(f);
                        return this.index += r, y
                    },
                    readString: function(r) {
                        return o.transformTo("string", this.readData(r))
                    },
                    readData: function() {},
                    lastIndexOfSignature: function() {},
                    readAndCheckSignature: function() {},
                    readDate: function() {
                        var r = this.readInt(4);
                        return new Date(Date.UTC(1980 + (r >> 25 & 127), (r >> 21 & 15) - 1, r >> 16 & 31, r >> 11 & 31, r >> 5 & 63, (31 & r) << 1))
                    }
                },
                c.exports = s
            }, {
                "../utils": 32
            }],
            19: [function(e, c, l) {
                var o = e("./Uint8ArrayReader");
                function s(r) {
                    o.call(this, r)
                }
                e("../utils").inherits(s, o),
                s.prototype.readData = function(r) {
                    this.checkOffset(r);
                    var f = this.data.slice(this.zero + this.index, this.zero + this.index + r);
                    return this.index += r, f
                },
                c.exports = s
            }, {
                "../utils": 32,
                "./Uint8ArrayReader": 21
            }],
            20: [function(e, c, l) {
                var o = e("./DataReader");
                function s(r) {
                    o.call(this, r)
                }
                e("../utils").inherits(s, o),
                s.prototype.byteAt = function(r) {
                    return this.data.charCodeAt(this.zero + r)
                },
                s.prototype.lastIndexOfSignature = function(r) {
                    return this.data.lastIndexOf(r) - this.zero
                },
                s.prototype.readAndCheckSignature = function(r) {
                    return r === this.readData(4)
                },
                s.prototype.readData = function(r) {
                    this.checkOffset(r);
                    var f = this.data.slice(this.zero + this.index, this.zero + this.index + r);
                    return this.index += r, f
                },
                c.exports = s
            }, {
                "../utils": 32,
                "./DataReader": 18
            }],
            21: [function(e, c, l) {
                var o = e("./ArrayReader");
                function s(r) {
                    o.call(this, r)
                }
                e("../utils").inherits(s, o),
                s.prototype.readData = function(r) {
                    if (this.checkOffset(r), r === 0)
                        return new Uint8Array(0);
                    var f = this.data.subarray(this.zero + this.index, this.zero + this.index + r);
                    return this.index += r, f
                },
                c.exports = s
            }, {
                "../utils": 32,
                "./ArrayReader": 17
            }],
            22: [function(e, c, l) {
                var o = e("../utils"),
                    s = e("../support"),
                    r = e("./ArrayReader"),
                    f = e("./StringReader"),
                    y = e("./NodeBufferReader"),
                    _ = e("./Uint8ArrayReader");
                c.exports = function(h) {
                    var S = o.getTypeOf(h);
                    return o.checkSupport(S), S !== "string" || s.uint8array ? S === "nodebuffer" ? new y(h) : s.uint8array ? new _(o.transformTo("uint8array", h)) : new r(o.transformTo("array", h)) : new f(h)
                }
            }, {
                "../support": 30,
                "../utils": 32,
                "./ArrayReader": 17,
                "./NodeBufferReader": 19,
                "./StringReader": 20,
                "./Uint8ArrayReader": 21
            }],
            23: [function(e, c, l) {
                l.LOCAL_FILE_HEADER = "PK",
                l.CENTRAL_FILE_HEADER = "PK",
                l.CENTRAL_DIRECTORY_END = "PK",
                l.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07",
                l.ZIP64_CENTRAL_DIRECTORY_END = "PK",
                l.DATA_DESCRIPTOR = "PK\x07\b"
            }, {}],
            24: [function(e, c, l) {
                var o = e("./GenericWorker"),
                    s = e("../utils");
                function r(f) {
                    o.call(this, "ConvertWorker to " + f),
                    this.destType = f
                }
                s.inherits(r, o),
                r.prototype.processChunk = function(f) {
                    this.push({
                        data: s.transformTo(this.destType, f.data),
                        meta: f.meta
                    })
                },
                c.exports = r
            }, {
                "../utils": 32,
                "./GenericWorker": 28
            }],
            25: [function(e, c, l) {
                var o = e("./GenericWorker"),
                    s = e("../crc32");
                function r() {
                    o.call(this, "Crc32Probe"),
                    this.withStreamInfo("crc32", 0)
                }
                e("../utils").inherits(r, o),
                r.prototype.processChunk = function(f) {
                    this.streamInfo.crc32 = s(f.data, this.streamInfo.crc32 || 0),
                    this.push(f)
                },
                c.exports = r
            }, {
                "../crc32": 4,
                "../utils": 32,
                "./GenericWorker": 28
            }],
            26: [function(e, c, l) {
                var o = e("../utils"),
                    s = e("./GenericWorker");
                function r(f) {
                    s.call(this, "DataLengthProbe for " + f),
                    this.propName = f,
                    this.withStreamInfo(f, 0)
                }
                o.inherits(r, s),
                r.prototype.processChunk = function(f) {
                    if (f) {
                        var y = this.streamInfo[this.propName] || 0;
                        this.streamInfo[this.propName] = y + f.data.length
                    }
                    s.prototype.processChunk.call(this, f)
                },
                c.exports = r
            }, {
                "../utils": 32,
                "./GenericWorker": 28
            }],
            27: [function(e, c, l) {
                var o = e("../utils"),
                    s = e("./GenericWorker");
                function r(f) {
                    s.call(this, "DataWorker");
                    var y = this;
                    this.dataIsReady = !1,
                    this.index = 0,
                    this.max = 0,
                    this.data = null,
                    this.type = "",
                    this._tickScheduled = !1,
                    f.then(function(_) {
                        y.dataIsReady = !0,
                        y.data = _,
                        y.max = _ && _.length || 0,
                        y.type = o.getTypeOf(_),
                        y.isPaused || y._tickAndRepeat()
                    }, function(_) {
                        y.error(_)
                    })
                }
                o.inherits(r, s),
                r.prototype.cleanUp = function() {
                    s.prototype.cleanUp.call(this),
                    this.data = null
                },
                r.prototype.resume = function() {
                    return !!s.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0, o.delay(this._tickAndRepeat, [], this)), !0)
                },
                r.prototype._tickAndRepeat = function() {
                    this._tickScheduled = !1,
                    this.isPaused || this.isFinished || (this._tick(), this.isFinished || (o.delay(this._tickAndRepeat, [], this), this._tickScheduled = !0))
                },
                r.prototype._tick = function() {
                    if (this.isPaused || this.isFinished)
                        return !1;
                    var f = null,
                        y = Math.min(this.max, this.index + 16384);
                    if (this.index >= this.max)
                        return this.end();
                    switch (this.type) {
                    case "string":
                        f = this.data.substring(this.index, y);
                        break;
                    case "uint8array":
                        f = this.data.subarray(this.index, y);
                        break;
                    case "array":
                    case "nodebuffer":
                        f = this.data.slice(this.index, y)
                    }
                    return this.index = y, this.push({
                        data: f,
                        meta: {
                            percent: this.max ? this.index / this.max * 100 : 0
                        }
                    })
                },
                c.exports = r
            }, {
                "../utils": 32,
                "./GenericWorker": 28
            }],
            28: [function(e, c, l) {
                function o(s) {
                    this.name = s || "default",
                    this.streamInfo = {},
                    this.generatedError = null,
                    this.extraStreamInfo = {},
                    this.isPaused = !0,
                    this.isFinished = !1,
                    this.isLocked = !1,
                    this._listeners = {
                        data: [],
                        end: [],
                        error: []
                    },
                    this.previous = null
                }
                o.prototype = {
                    push: function(s) {
                        this.emit("data", s)
                    },
                    end: function() {
                        if (this.isFinished)
                            return !1;
                        this.flush();
                        try {
                            this.emit("end"),
                            this.cleanUp(),
                            this.isFinished = !0
                        } catch (s) {
                            this.emit("error", s)
                        }
                        return !0
                    },
                    error: function(s) {
                        return !this.isFinished && (this.isPaused ? this.generatedError = s : (this.isFinished = !0, this.emit("error", s), this.previous && this.previous.error(s), this.cleanUp()), !0)
                    },
                    on: function(s, r) {
                        return this._listeners[s].push(r), this
                    },
                    cleanUp: function() {
                        this.streamInfo = this.generatedError = this.extraStreamInfo = null,
                        this._listeners = []
                    },
                    emit: function(s, r) {
                        if (this._listeners[s])
                            for (var f = 0; f < this._listeners[s].length; f++)
                                this._listeners[s][f].call(this, r)
                    },
                    pipe: function(s) {
                        return s.registerPrevious(this)
                    },
                    registerPrevious: function(s) {
                        if (this.isLocked)
                            throw new Error("The stream '" + this + "' has already been used.");
                        this.streamInfo = s.streamInfo,
                        this.mergeStreamInfo(),
                        this.previous = s;
                        var r = this;
                        return s.on("data", function(f) {
                            r.processChunk(f)
                        }), s.on("end", function() {
                            r.end()
                        }), s.on("error", function(f) {
                            r.error(f)
                        }), this
                    },
                    pause: function() {
                        return !this.isPaused && !this.isFinished && (this.isPaused = !0, this.previous && this.previous.pause(), !0)
                    },
                    resume: function() {
                        if (!this.isPaused || this.isFinished)
                            return !1;
                        var s = this.isPaused = !1;
                        return this.generatedError && (this.error(this.generatedError), s = !0), this.previous && this.previous.resume(), !s
                    },
                    flush: function() {},
                    processChunk: function(s) {
                        this.push(s)
                    },
                    withStreamInfo: function(s, r) {
                        return this.extraStreamInfo[s] = r, this.mergeStreamInfo(), this
                    },
                    mergeStreamInfo: function() {
                        for (var s in this.extraStreamInfo)
                            Object.prototype.hasOwnProperty.call(this.extraStreamInfo, s) && (this.streamInfo[s] = this.extraStreamInfo[s])
                    },
                    lock: function() {
                        if (this.isLocked)
                            throw new Error("The stream '" + this + "' has already been used.");
                        this.isLocked = !0,
                        this.previous && this.previous.lock()
                    },
                    toString: function() {
                        var s = "Worker " + this.name;
                        return this.previous ? this.previous + " -> " + s : s
                    }
                },
                c.exports = o
            }, {}],
            29: [function(e, c, l) {
                var o = e("../utils"),
                    s = e("./ConvertWorker"),
                    r = e("./GenericWorker"),
                    f = e("../base64"),
                    y = e("../support"),
                    _ = e("../external"),
                    h = null;
                if (y.nodestream)
                    try {
                        h = e("../nodejs/NodejsStreamOutputAdapter")
                    } catch {}
                function S(w, i) {
                    return new _.Promise(function(p, g) {
                        var k = [],
                            d = w._internalType,
                            b = w._outputType,
                            v = w._mimeType;
                        w.on("data", function(C, E) {
                            k.push(C),
                            i && i(E)
                        }).on("error", function(C) {
                            k = [],
                            g(C)
                        }).on("end", function() {
                            try {
                                var C = function(E, B, A) {
                                    switch (E) {
                                    case "blob":
                                        return o.newBlob(o.transformTo("arraybuffer", B), A);
                                    case "base64":
                                        return f.encode(B);
                                    default:
                                        return o.transformTo(E, B)
                                    }
                                }(b, function(E, B) {
                                    var A,
                                        T = 0,
                                        j = null,
                                        $ = 0;
                                    for (A = 0; A < B.length; A++)
                                        $ += B[A].length;
                                    switch (E) {
                                    case "string":
                                        return B.join("");
                                    case "array":
                                        return Array.prototype.concat.apply([], B);
                                    case "uint8array":
                                        for (j = new Uint8Array($), A = 0; A < B.length; A++)
                                            j.set(B[A], T),
                                            T += B[A].length;
                                        return j;
                                    case "nodebuffer":
                                        return Buffer.concat(B);
                                    default:
                                        throw new Error("concat : unsupported type '" + E + "'")
                                    }
                                }(d, k), v);
                                p(C)
                            } catch (E) {
                                g(E)
                            }
                            k = []
                        }).resume()
                    })
                }
                function m(w, i, p) {
                    var g = i;
                    switch (i) {
                    case "blob":
                    case "arraybuffer":
                        g = "uint8array";
                        break;
                    case "base64":
                        g = "string"
                    }
                    try {
                        this._internalType = g,
                        this._outputType = i,
                        this._mimeType = p,
                        o.checkSupport(g),
                        this._worker = w.pipe(new s(g)),
                        w.lock()
                    } catch (k) {
                        this._worker = new r("error"),
                        this._worker.error(k)
                    }
                }
                m.prototype = {
                    accumulate: function(w) {
                        return S(this, w)
                    },
                    on: function(w, i) {
                        var p = this;
                        return w === "data" ? this._worker.on(w, function(g) {
                            i.call(p, g.data, g.meta)
                        }) : this._worker.on(w, function() {
                            o.delay(i, arguments, p)
                        }), this
                    },
                    resume: function() {
                        return o.delay(this._worker.resume, [], this._worker), this
                    },
                    pause: function() {
                        return this._worker.pause(), this
                    },
                    toNodejsStream: function(w) {
                        if (o.checkSupport("nodestream"), this._outputType !== "nodebuffer")
                            throw new Error(this._outputType + " is not supported by this method");
                        return new h(this, {
                            objectMode: this._outputType !== "nodebuffer"
                        }, w)
                    }
                },
                c.exports = m
            }, {
                "../base64": 1,
                "../external": 6,
                "../nodejs/NodejsStreamOutputAdapter": 13,
                "../support": 30,
                "../utils": 32,
                "./ConvertWorker": 24,
                "./GenericWorker": 28
            }],
            30: [function(e, c, l) {
                if (l.base64 = !0, l.array = !0, l.string = !0, l.arraybuffer = typeof ArrayBuffer < "u" && typeof Uint8Array < "u", l.nodebuffer = typeof Buffer < "u", l.uint8array = typeof Uint8Array < "u", typeof ArrayBuffer > "u")
                    l.blob = !1;
                else {
                    var o = new ArrayBuffer(0);
                    try {
                        l.blob = new Blob([o], {
                            type: "application/zip"
                        }).size === 0
                    } catch {
                        try {
                            var s = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder);
                            s.append(o),
                            l.blob = s.getBlob("application/zip").size === 0
                        } catch {
                            l.blob = !1
                        }
                    }
                }
                try {
                    l.nodestream = !!e("readable-stream").Readable
                } catch {
                    l.nodestream = !1
                }
            }, {
                "readable-stream": 16
            }],
            31: [function(e, c, l) {
                for (var o = e("./utils"), s = e("./support"), r = e("./nodejsUtils"), f = e("./stream/GenericWorker"), y = new Array(256), _ = 0; _ < 256; _++)
                    y[_] = 252 <= _ ? 6 : 248 <= _ ? 5 : 240 <= _ ? 4 : 224 <= _ ? 3 : 192 <= _ ? 2 : 1;
                y[254] = y[254] = 1;
                function h() {
                    f.call(this, "utf-8 decode"),
                    this.leftOver = null
                }
                function S() {
                    f.call(this, "utf-8 encode")
                }
                l.utf8encode = function(m) {
                    return s.nodebuffer ? r.newBufferFrom(m, "utf-8") : function(w) {
                        var i,
                            p,
                            g,
                            k,
                            d,
                            b = w.length,
                            v = 0;
                        for (k = 0; k < b; k++)
                            (64512 & (p = w.charCodeAt(k))) == 55296 && k + 1 < b && (64512 & (g = w.charCodeAt(k + 1))) == 56320 && (p = 65536 + (p - 55296 << 10) + (g - 56320), k++),
                            v += p < 128 ? 1 : p < 2048 ? 2 : p < 65536 ? 3 : 4;
                        for (i = s.uint8array ? new Uint8Array(v) : new Array(v), k = d = 0; d < v; k++)
                            (64512 & (p = w.charCodeAt(k))) == 55296 && k + 1 < b && (64512 & (g = w.charCodeAt(k + 1))) == 56320 && (p = 65536 + (p - 55296 << 10) + (g - 56320), k++),
                            p < 128 ? i[d++] = p : (p < 2048 ? i[d++] = 192 | p >>> 6 : (p < 65536 ? i[d++] = 224 | p >>> 12 : (i[d++] = 240 | p >>> 18, i[d++] = 128 | p >>> 12 & 63), i[d++] = 128 | p >>> 6 & 63), i[d++] = 128 | 63 & p);
                        return i
                    }(m)
                },
                l.utf8decode = function(m) {
                    return s.nodebuffer ? o.transformTo("nodebuffer", m).toString("utf-8") : function(w) {
                        var i,
                            p,
                            g,
                            k,
                            d = w.length,
                            b = new Array(2 * d);
                        for (i = p = 0; i < d;)
                            if ((g = w[i++]) < 128)
                                b[p++] = g;
                            else if (4 < (k = y[g]))
                                b[p++] = 65533,
                                i += k - 1;
                            else {
                                for (g &= k === 2 ? 31 : k === 3 ? 15 : 7; 1 < k && i < d;)
                                    g = g << 6 | 63 & w[i++],
                                    k--;
                                1 < k ? b[p++] = 65533 : g < 65536 ? b[p++] = g : (g -= 65536, b[p++] = 55296 | g >> 10 & 1023, b[p++] = 56320 | 1023 & g)
                            }
                        return b.length !== p && (b.subarray ? b = b.subarray(0, p) : b.length = p), o.applyFromCharCode(b)
                    }(m = o.transformTo(s.uint8array ? "uint8array" : "array", m))
                },
                o.inherits(h, f),
                h.prototype.processChunk = function(m) {
                    var w = o.transformTo(s.uint8array ? "uint8array" : "array", m.data);
                    if (this.leftOver && this.leftOver.length) {
                        if (s.uint8array) {
                            var i = w;
                            (w = new Uint8Array(i.length + this.leftOver.length)).set(this.leftOver, 0),
                            w.set(i, this.leftOver.length)
                        } else
                            w = this.leftOver.concat(w);
                        this.leftOver = null
                    }
                    var p = function(k, d) {
                            var b;
                            for ((d = d || k.length) > k.length && (d = k.length), b = d - 1; 0 <= b && (192 & k[b]) == 128;)
                                b--;
                            return b < 0 || b === 0 ? d : b + y[k[b]] > d ? b : d
                        }(w),
                        g = w;
                    p !== w.length && (s.uint8array ? (g = w.subarray(0, p), this.leftOver = w.subarray(p, w.length)) : (g = w.slice(0, p), this.leftOver = w.slice(p, w.length))),
                    this.push({
                        data: l.utf8decode(g),
                        meta: m.meta
                    })
                },
                h.prototype.flush = function() {
                    this.leftOver && this.leftOver.length && (this.push({
                        data: l.utf8decode(this.leftOver),
                        meta: {}
                    }), this.leftOver = null)
                },
                l.Utf8DecodeWorker = h,
                o.inherits(S, f),
                S.prototype.processChunk = function(m) {
                    this.push({
                        data: l.utf8encode(m.data),
                        meta: m.meta
                    })
                },
                l.Utf8EncodeWorker = S
            }, {
                "./nodejsUtils": 14,
                "./stream/GenericWorker": 28,
                "./support": 30,
                "./utils": 32
            }],
            32: [function(e, c, l) {
                var o = e("./support"),
                    s = e("./base64"),
                    r = e("./nodejsUtils"),
                    f = e("./external");
                function y(i) {
                    return i
                }
                function _(i, p) {
                    for (var g = 0; g < i.length; ++g)
                        p[g] = 255 & i.charCodeAt(g);
                    return p
                }
                e("setimmediate"),
                l.newBlob = function(i, p) {
                    l.checkSupport("blob");
                    try {
                        return new Blob([i], {
                            type: p
                        })
                    } catch {
                        try {
                            var g = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder);
                            return g.append(i), g.getBlob(p)
                        } catch {
                            throw new Error("Bug : can't construct the Blob.")
                        }
                    }
                };
                var h = {
                    stringifyByChunk: function(i, p, g) {
                        var k = [],
                            d = 0,
                            b = i.length;
                        if (b <= g)
                            return String.fromCharCode.apply(null, i);
                        for (; d < b;)
                            p === "array" || p === "nodebuffer" ? k.push(String.fromCharCode.apply(null, i.slice(d, Math.min(d + g, b)))) : k.push(String.fromCharCode.apply(null, i.subarray(d, Math.min(d + g, b)))),
                            d += g;
                        return k.join("")
                    },
                    stringifyByChar: function(i) {
                        for (var p = "", g = 0; g < i.length; g++)
                            p += String.fromCharCode(i[g]);
                        return p
                    },
                    applyCanBeUsed: {
                        uint8array: function() {
                            try {
                                return o.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1
                            } catch {
                                return !1
                            }
                        }(),
                        nodebuffer: function() {
                            try {
                                return o.nodebuffer && String.fromCharCode.apply(null, r.allocBuffer(1)).length === 1
                            } catch {
                                return !1
                            }
                        }()
                    }
                };
                function S(i) {
                    var p = 65536,
                        g = l.getTypeOf(i),
                        k = !0;
                    if (g === "uint8array" ? k = h.applyCanBeUsed.uint8array : g === "nodebuffer" && (k = h.applyCanBeUsed.nodebuffer), k)
                        for (; 1 < p;)
                            try {
                                return h.stringifyByChunk(i, g, p)
                            } catch {
                                p = Math.floor(p / 2)
                            }
                    return h.stringifyByChar(i)
                }
                function m(i, p) {
                    for (var g = 0; g < i.length; g++)
                        p[g] = i[g];
                    return p
                }
                l.applyFromCharCode = S;
                var w = {};
                w.string = {
                    string: y,
                    array: function(i) {
                        return _(i, new Array(i.length))
                    },
                    arraybuffer: function(i) {
                        return w.string.uint8array(i).buffer
                    },
                    uint8array: function(i) {
                        return _(i, new Uint8Array(i.length))
                    },
                    nodebuffer: function(i) {
                        return _(i, r.allocBuffer(i.length))
                    }
                },
                w.array = {
                    string: S,
                    array: y,
                    arraybuffer: function(i) {
                        return new Uint8Array(i).buffer
                    },
                    uint8array: function(i) {
                        return new Uint8Array(i)
                    },
                    nodebuffer: function(i) {
                        return r.newBufferFrom(i)
                    }
                },
                w.arraybuffer = {
                    string: function(i) {
                        return S(new Uint8Array(i))
                    },
                    array: function(i) {
                        return m(new Uint8Array(i), new Array(i.byteLength))
                    },
                    arraybuffer: y,
                    uint8array: function(i) {
                        return new Uint8Array(i)
                    },
                    nodebuffer: function(i) {
                        return r.newBufferFrom(new Uint8Array(i))
                    }
                },
                w.uint8array = {
                    string: S,
                    array: function(i) {
                        return m(i, new Array(i.length))
                    },
                    arraybuffer: function(i) {
                        return i.buffer
                    },
                    uint8array: y,
                    nodebuffer: function(i) {
                        return r.newBufferFrom(i)
                    }
                },
                w.nodebuffer = {
                    string: S,
                    array: function(i) {
                        return m(i, new Array(i.length))
                    },
                    arraybuffer: function(i) {
                        return w.nodebuffer.uint8array(i).buffer
                    },
                    uint8array: function(i) {
                        return m(i, new Uint8Array(i.length))
                    },
                    nodebuffer: y
                },
                l.transformTo = function(i, p) {
                    if (p = p || "", !i)
                        return p;
                    l.checkSupport(i);
                    var g = l.getTypeOf(p);
                    return w[g][i](p)
                },
                l.resolve = function(i) {
                    for (var p = i.split("/"), g = [], k = 0; k < p.length; k++) {
                        var d = p[k];
                        d === "." || d === "" && k !== 0 && k !== p.length - 1 || (d === ".." ? g.pop() : g.push(d))
                    }
                    return g.join("/")
                },
                l.getTypeOf = function(i) {
                    return typeof i == "string" ? "string" : Object.prototype.toString.call(i) === "[object Array]" ? "array" : o.nodebuffer && r.isBuffer(i) ? "nodebuffer" : o.uint8array && i instanceof Uint8Array ? "uint8array" : o.arraybuffer && i instanceof ArrayBuffer ? "arraybuffer" : void 0
                },
                l.checkSupport = function(i) {
                    if (!o[i.toLowerCase()])
                        throw new Error(i + " is not supported by this platform")
                },
                l.MAX_VALUE_16BITS = 65535,
                l.MAX_VALUE_32BITS = -1,
                l.pretty = function(i) {
                    var p,
                        g,
                        k = "";
                    for (g = 0; g < (i || "").length; g++)
                        k += "\\x" + ((p = i.charCodeAt(g)) < 16 ? "0" : "") + p.toString(16).toUpperCase();
                    return k
                },
                l.delay = function(i, p, g) {
                    setImmediate(function() {
                        i.apply(g || null, p || [])
                    })
                },
                l.inherits = function(i, p) {
                    function g() {}
                    g.prototype = p.prototype,
                    i.prototype = new g
                },
                l.extend = function() {
                    var i,
                        p,
                        g = {};
                    for (i = 0; i < arguments.length; i++)
                        for (p in arguments[i])
                            Object.prototype.hasOwnProperty.call(arguments[i], p) && g[p] === void 0 && (g[p] = arguments[i][p]);
                    return g
                },
                l.prepareContent = function(i, p, g, k, d) {
                    return f.Promise.resolve(p).then(function(b) {
                        return o.blob && (b instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(b)) !== -1) && typeof FileReader < "u" ? new f.Promise(function(v, C) {
                            var E = new FileReader;
                            E.onload = function(B) {
                                v(B.target.result)
                            },
                            E.onerror = function(B) {
                                C(B.target.error)
                            },
                            E.readAsArrayBuffer(b)
                        }) : b
                    }).then(function(b) {
                        var v = l.getTypeOf(b);
                        return v ? (v === "arraybuffer" ? b = l.transformTo("uint8array", b) : v === "string" && (d ? b = s.decode(b) : g && k !== !0 && (b = function(C) {
                            return _(C, o.uint8array ? new Uint8Array(C.length) : new Array(C.length))
                        }(b))), b) : f.Promise.reject(new Error("Can't read the data of '" + i + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))
                    })
                }
            }, {
                "./base64": 1,
                "./external": 6,
                "./nodejsUtils": 14,
                "./support": 30,
                setimmediate: 54
            }],
            33: [function(e, c, l) {
                var o = e("./reader/readerFor"),
                    s = e("./utils"),
                    r = e("./signature"),
                    f = e("./zipEntry"),
                    y = e("./support");
                function _(h) {
                    this.files = [],
                    this.loadOptions = h
                }
                _.prototype = {
                    checkSignature: function(h) {
                        if (!this.reader.readAndCheckSignature(h)) {
                            this.reader.index -= 4;
                            var S = this.reader.readString(4);
                            throw new Error("Corrupted zip or bug: unexpected signature (" + s.pretty(S) + ", expected " + s.pretty(h) + ")")
                        }
                    },
                    isSignature: function(h, S) {
                        var m = this.reader.index;
                        this.reader.setIndex(h);
                        var w = this.reader.readString(4) === S;
                        return this.reader.setIndex(m), w
                    },
                    readBlockEndOfCentral: function() {
                        this.diskNumber = this.reader.readInt(2),
                        this.diskWithCentralDirStart = this.reader.readInt(2),
                        this.centralDirRecordsOnThisDisk = this.reader.readInt(2),
                        this.centralDirRecords = this.reader.readInt(2),
                        this.centralDirSize = this.reader.readInt(4),
                        this.centralDirOffset = this.reader.readInt(4),
                        this.zipCommentLength = this.reader.readInt(2);
                        var h = this.reader.readData(this.zipCommentLength),
                            S = y.uint8array ? "uint8array" : "array",
                            m = s.transformTo(S, h);
                        this.zipComment = this.loadOptions.decodeFileName(m)
                    },
                    readBlockZip64EndOfCentral: function() {
                        this.zip64EndOfCentralSize = this.reader.readInt(8),
                        this.reader.skip(4),
                        this.diskNumber = this.reader.readInt(4),
                        this.diskWithCentralDirStart = this.reader.readInt(4),
                        this.centralDirRecordsOnThisDisk = this.reader.readInt(8),
                        this.centralDirRecords = this.reader.readInt(8),
                        this.centralDirSize = this.reader.readInt(8),
                        this.centralDirOffset = this.reader.readInt(8),
                        this.zip64ExtensibleData = {};
                        for (var h, S, m, w = this.zip64EndOfCentralSize - 44; 0 < w;)
                            h = this.reader.readInt(2),
                            S = this.reader.readInt(4),
                            m = this.reader.readData(S),
                            this.zip64ExtensibleData[h] = {
                                id: h,
                                length: S,
                                value: m
                            }
                    },
                    readBlockZip64EndOfCentralLocator: function() {
                        if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount)
                            throw new Error("Multi-volumes zip are not supported")
                    },
                    readLocalFiles: function() {
                        var h,
                            S;
                        for (h = 0; h < this.files.length; h++)
                            S = this.files[h],
                            this.reader.setIndex(S.localHeaderOffset),
                            this.checkSignature(r.LOCAL_FILE_HEADER),
                            S.readLocalPart(this.reader),
                            S.handleUTF8(),
                            S.processAttributes()
                    },
                    readCentralDir: function() {
                        var h;
                        for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(r.CENTRAL_FILE_HEADER);)
                            (h = new f({
                                zip64: this.zip64
                            }, this.loadOptions)).readCentralPart(this.reader),
                            this.files.push(h);
                        if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0)
                            throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length)
                    },
                    readEndOfCentral: function() {
                        var h = this.reader.lastIndexOfSignature(r.CENTRAL_DIRECTORY_END);
                        if (h < 0)
                            throw this.isSignature(0, r.LOCAL_FILE_HEADER) ? new Error("Corrupted zip: can't find end of central directory") : new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
                        this.reader.setIndex(h);
                        var S = h;
                        if (this.checkSignature(r.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === s.MAX_VALUE_16BITS || this.diskWithCentralDirStart === s.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === s.MAX_VALUE_16BITS || this.centralDirRecords === s.MAX_VALUE_16BITS || this.centralDirSize === s.MAX_VALUE_32BITS || this.centralDirOffset === s.MAX_VALUE_32BITS) {
                            if (this.zip64 = !0, (h = this.reader.lastIndexOfSignature(r.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0)
                                throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
                            if (this.reader.setIndex(h), this.checkSignature(r.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, r.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(r.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0))
                                throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
                            this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),
                            this.checkSignature(r.ZIP64_CENTRAL_DIRECTORY_END),
                            this.readBlockZip64EndOfCentral()
                        }
                        var m = this.centralDirOffset + this.centralDirSize;
                        this.zip64 && (m += 20, m += 12 + this.zip64EndOfCentralSize);
                        var w = S - m;
                        if (0 < w)
                            this.isSignature(S, r.CENTRAL_FILE_HEADER) || (this.reader.zero = w);
                        else if (w < 0)
                            throw new Error("Corrupted zip: missing " + Math.abs(w) + " bytes.")
                    },
                    prepareReader: function(h) {
                        this.reader = o(h)
                    },
                    load: function(h) {
                        this.prepareReader(h),
                        this.readEndOfCentral(),
                        this.readCentralDir(),
                        this.readLocalFiles()
                    }
                },
                c.exports = _
            }, {
                "./reader/readerFor": 22,
                "./signature": 23,
                "./support": 30,
                "./utils": 32,
                "./zipEntry": 34
            }],
            34: [function(e, c, l) {
                var o = e("./reader/readerFor"),
                    s = e("./utils"),
                    r = e("./compressedObject"),
                    f = e("./crc32"),
                    y = e("./utf8"),
                    _ = e("./compressions"),
                    h = e("./support");
                function S(m, w) {
                    this.options = m,
                    this.loadOptions = w
                }
                S.prototype = {
                    isEncrypted: function() {
                        return (1 & this.bitFlag) == 1
                    },
                    useUTF8: function() {
                        return (2048 & this.bitFlag) == 2048
                    },
                    readLocalPart: function(m) {
                        var w,
                            i;
                        if (m.skip(22), this.fileNameLength = m.readInt(2), i = m.readInt(2), this.fileName = m.readData(this.fileNameLength), m.skip(i), this.compressedSize === -1 || this.uncompressedSize === -1)
                            throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
                        if ((w = function(p) {
                            for (var g in _)
                                if (Object.prototype.hasOwnProperty.call(_, g) && _[g].magic === p)
                                    return _[g];
                            return null
                        }(this.compressionMethod)) === null)
                            throw new Error("Corrupted zip : compression " + s.pretty(this.compressionMethod) + " unknown (inner file : " + s.transformTo("string", this.fileName) + ")");
                        this.decompressed = new r(this.compressedSize, this.uncompressedSize, this.crc32, w, m.readData(this.compressedSize))
                    },
                    readCentralPart: function(m) {
                        this.versionMadeBy = m.readInt(2),
                        m.skip(2),
                        this.bitFlag = m.readInt(2),
                        this.compressionMethod = m.readString(2),
                        this.date = m.readDate(),
                        this.crc32 = m.readInt(4),
                        this.compressedSize = m.readInt(4),
                        this.uncompressedSize = m.readInt(4);
                        var w = m.readInt(2);
                        if (this.extraFieldsLength = m.readInt(2), this.fileCommentLength = m.readInt(2), this.diskNumberStart = m.readInt(2), this.internalFileAttributes = m.readInt(2), this.externalFileAttributes = m.readInt(4), this.localHeaderOffset = m.readInt(4), this.isEncrypted())
                            throw new Error("Encrypted zip are not supported");
                        m.skip(w),
                        this.readExtraFields(m),
                        this.parseZIP64ExtraField(m),
                        this.fileComment = m.readData(this.fileCommentLength)
                    },
                    processAttributes: function() {
                        this.unixPermissions = null,
                        this.dosPermissions = null;
                        var m = this.versionMadeBy >> 8;
                        this.dir = !!(16 & this.externalFileAttributes),
                        m == 0 && (this.dosPermissions = 63 & this.externalFileAttributes),
                        m == 3 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535),
                        this.dir || this.fileNameStr.slice(-1) !== "/" || (this.dir = !0)
                    },
                    parseZIP64ExtraField: function() {
                        if (this.extraFields[1]) {
                            var m = o(this.extraFields[1].value);
                            this.uncompressedSize === s.MAX_VALUE_32BITS && (this.uncompressedSize = m.readInt(8)),
                            this.compressedSize === s.MAX_VALUE_32BITS && (this.compressedSize = m.readInt(8)),
                            this.localHeaderOffset === s.MAX_VALUE_32BITS && (this.localHeaderOffset = m.readInt(8)),
                            this.diskNumberStart === s.MAX_VALUE_32BITS && (this.diskNumberStart = m.readInt(4))
                        }
                    },
                    readExtraFields: function(m) {
                        var w,
                            i,
                            p,
                            g = m.index + this.extraFieldsLength;
                        for (this.extraFields || (this.extraFields = {}); m.index + 4 < g;)
                            w = m.readInt(2),
                            i = m.readInt(2),
                            p = m.readData(i),
                            this.extraFields[w] = {
                                id: w,
                                length: i,
                                value: p
                            };
                        m.setIndex(g)
                    },
                    handleUTF8: function() {
                        var m = h.uint8array ? "uint8array" : "array";
                        if (this.useUTF8())
                            this.fileNameStr = y.utf8decode(this.fileName),
                            this.fileCommentStr = y.utf8decode(this.fileComment);
                        else {
                            var w = this.findExtraFieldUnicodePath();
                            if (w !== null)
                                this.fileNameStr = w;
                            else {
                                var i = s.transformTo(m, this.fileName);
                                this.fileNameStr = this.loadOptions.decodeFileName(i)
                            }
                            var p = this.findExtraFieldUnicodeComment();
                            if (p !== null)
                                this.fileCommentStr = p;
                            else {
                                var g = s.transformTo(m, this.fileComment);
                                this.fileCommentStr = this.loadOptions.decodeFileName(g)
                            }
                        }
                    },
                    findExtraFieldUnicodePath: function() {
                        var m = this.extraFields[28789];
                        if (m) {
                            var w = o(m.value);
                            return w.readInt(1) !== 1 || f(this.fileName) !== w.readInt(4) ? null : y.utf8decode(w.readData(m.length - 5))
                        }
                        return null
                    },
                    findExtraFieldUnicodeComment: function() {
                        var m = this.extraFields[25461];
                        if (m) {
                            var w = o(m.value);
                            return w.readInt(1) !== 1 || f(this.fileComment) !== w.readInt(4) ? null : y.utf8decode(w.readData(m.length - 5))
                        }
                        return null
                    }
                },
                c.exports = S
            }, {
                "./compressedObject": 2,
                "./compressions": 3,
                "./crc32": 4,
                "./reader/readerFor": 22,
                "./support": 30,
                "./utf8": 31,
                "./utils": 32
            }],
            35: [function(e, c, l) {
                function o(w, i, p) {
                    this.name = w,
                    this.dir = p.dir,
                    this.date = p.date,
                    this.comment = p.comment,
                    this.unixPermissions = p.unixPermissions,
                    this.dosPermissions = p.dosPermissions,
                    this._data = i,
                    this._dataBinary = p.binary,
                    this.options = {
                        compression: p.compression,
                        compressionOptions: p.compressionOptions
                    }
                }
                var s = e("./stream/StreamHelper"),
                    r = e("./stream/DataWorker"),
                    f = e("./utf8"),
                    y = e("./compressedObject"),
                    _ = e("./stream/GenericWorker");
                o.prototype = {
                    internalStream: function(w) {
                        var i = null,
                            p = "string";
                        try {
                            if (!w)
                                throw new Error("No output type specified.");
                            var g = (p = w.toLowerCase()) === "string" || p === "text";
                            p !== "binarystring" && p !== "text" || (p = "string"),
                            i = this._decompressWorker();
                            var k = !this._dataBinary;
                            k && !g && (i = i.pipe(new f.Utf8EncodeWorker)),
                            !k && g && (i = i.pipe(new f.Utf8DecodeWorker))
                        } catch (d) {
                            (i = new _("error")).error(d)
                        }
                        return new s(i, p, "")
                    },
                    async: function(w, i) {
                        return this.internalStream(w).accumulate(i)
                    },
                    nodeStream: function(w, i) {
                        return this.internalStream(w || "nodebuffer").toNodejsStream(i)
                    },
                    _compressWorker: function(w, i) {
                        if (this._data instanceof y && this._data.compression.magic === w.magic)
                            return this._data.getCompressedWorker();
                        var p = this._decompressWorker();
                        return this._dataBinary || (p = p.pipe(new f.Utf8EncodeWorker)), y.createWorkerFrom(p, w, i)
                    },
                    _decompressWorker: function() {
                        return this._data instanceof y ? this._data.getContentWorker() : this._data instanceof _ ? this._data : new r(this._data)
                    }
                };
                for (var h = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], S = function() {
                        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")
                    }, m = 0; m < h.length; m++)
                    o.prototype[h[m]] = S;
                c.exports = o
            }, {
                "./compressedObject": 2,
                "./stream/DataWorker": 27,
                "./stream/GenericWorker": 28,
                "./stream/StreamHelper": 29,
                "./utf8": 31
            }],
            36: [function(e, c, l) {
                (function(o) {
                    var s,
                        r,
                        f = o.MutationObserver || o.WebKitMutationObserver;
                    if (f) {
                        var y = 0,
                            _ = new f(w),
                            h = o.document.createTextNode("");
                        _.observe(h, {
                            characterData: !0
                        }),
                        s = function() {
                            h.data = y = ++y % 2
                        }
                    } else if (o.setImmediate || o.MessageChannel === void 0)
                        s = "document" in o && "onreadystatechange" in o.document.createElement("script") ? function() {
                            var i = o.document.createElement("script");
                            i.onreadystatechange = function() {
                                w(),
                                i.onreadystatechange = null,
                                i.parentNode.removeChild(i),
                                i = null
                            },
                            o.document.documentElement.appendChild(i)
                        } : function() {
                            setTimeout(w, 0)
                        };
                    else {
                        var S = new o.MessageChannel;
                        S.port1.onmessage = w,
                        s = function() {
                            S.port2.postMessage(0)
                        }
                    }
                    var m = [];
                    function w() {
                        var i,
                            p;
                        r = !0;
                        for (var g = m.length; g;) {
                            for (p = m, m = [], i = -1; ++i < g;)
                                p[i]();
                            g = m.length
                        }
                        r = !1
                    }
                    c.exports = function(i) {
                        m.push(i) !== 1 || r || s()
                    }
                }).call(this, typeof Rt < "u" ? Rt : typeof self < "u" ? self : typeof window < "u" ? window : {})
            }, {}],
            37: [function(e, c, l) {
                var o = e("immediate");
                function s() {}
                var r = {},
                    f = ["REJECTED"],
                    y = ["FULFILLED"],
                    _ = ["PENDING"];
                function h(g) {
                    if (typeof g != "function")
                        throw new TypeError("resolver must be a function");
                    this.state = _,
                    this.queue = [],
                    this.outcome = void 0,
                    g !== s && i(this, g)
                }
                function S(g, k, d) {
                    this.promise = g,
                    typeof k == "function" && (this.onFulfilled = k, this.callFulfilled = this.otherCallFulfilled),
                    typeof d == "function" && (this.onRejected = d, this.callRejected = this.otherCallRejected)
                }
                function m(g, k, d) {
                    o(function() {
                        var b;
                        try {
                            b = k(d)
                        } catch (v) {
                            return r.reject(g, v)
                        }
                        b === g ? r.reject(g, new TypeError("Cannot resolve promise with itself")) : r.resolve(g, b)
                    })
                }
                function w(g) {
                    var k = g && g.then;
                    if (g && (typeof g == "object" || typeof g == "function") && typeof k == "function")
                        return function() {
                            k.apply(g, arguments)
                        }
                }
                function i(g, k) {
                    var d = !1;
                    function b(E) {
                        d || (d = !0, r.reject(g, E))
                    }
                    function v(E) {
                        d || (d = !0, r.resolve(g, E))
                    }
                    var C = p(function() {
                        k(v, b)
                    });
                    C.status === "error" && b(C.value)
                }
                function p(g, k) {
                    var d = {};
                    try {
                        d.value = g(k),
                        d.status = "success"
                    } catch (b) {
                        d.status = "error",
                        d.value = b
                    }
                    return d
                }
                (c.exports = h).prototype.finally = function(g) {
                    if (typeof g != "function")
                        return this;
                    var k = this.constructor;
                    return this.then(function(d) {
                        return k.resolve(g()).then(function() {
                            return d
                        })
                    }, function(d) {
                        return k.resolve(g()).then(function() {
                            throw d
                        })
                    })
                },
                h.prototype.catch = function(g) {
                    return this.then(null, g)
                },
                h.prototype.then = function(g, k) {
                    if (typeof g != "function" && this.state === y || typeof k != "function" && this.state === f)
                        return this;
                    var d = new this.constructor(s);
                    return this.state !== _ ? m(d, this.state === y ? g : k, this.outcome) : this.queue.push(new S(d, g, k)), d
                },
                S.prototype.callFulfilled = function(g) {
                    r.resolve(this.promise, g)
                },
                S.prototype.otherCallFulfilled = function(g) {
                    m(this.promise, this.onFulfilled, g)
                },
                S.prototype.callRejected = function(g) {
                    r.reject(this.promise, g)
                },
                S.prototype.otherCallRejected = function(g) {
                    m(this.promise, this.onRejected, g)
                },
                r.resolve = function(g, k) {
                    var d = p(w, k);
                    if (d.status === "error")
                        return r.reject(g, d.value);
                    var b = d.value;
                    if (b)
                        i(g, b);
                    else {
                        g.state = y,
                        g.outcome = k;
                        for (var v = -1, C = g.queue.length; ++v < C;)
                            g.queue[v].callFulfilled(k)
                    }
                    return g
                },
                r.reject = function(g, k) {
                    g.state = f,
                    g.outcome = k;
                    for (var d = -1, b = g.queue.length; ++d < b;)
                        g.queue[d].callRejected(k);
                    return g
                },
                h.resolve = function(g) {
                    return g instanceof this ? g : r.resolve(new this(s), g)
                },
                h.reject = function(g) {
                    var k = new this(s);
                    return r.reject(k, g)
                },
                h.all = function(g) {
                    var k = this;
                    if (Object.prototype.toString.call(g) !== "[object Array]")
                        return this.reject(new TypeError("must be an array"));
                    var d = g.length,
                        b = !1;
                    if (!d)
                        return this.resolve([]);
                    for (var v = new Array(d), C = 0, E = -1, B = new this(s); ++E < d;)
                        A(g[E], E);
                    return B;
                    function A(T, j) {
                        k.resolve(T).then(function($) {
                            v[j] = $,
                            ++C !== d || b || (b = !0, r.resolve(B, v))
                        }, function($) {
                            b || (b = !0, r.reject(B, $))
                        })
                    }
                },
                h.race = function(g) {
                    var k = this;
                    if (Object.prototype.toString.call(g) !== "[object Array]")
                        return this.reject(new TypeError("must be an array"));
                    var d = g.length,
                        b = !1;
                    if (!d)
                        return this.resolve([]);
                    for (var v = -1, C = new this(s); ++v < d;)
                        E = g[v],
                        k.resolve(E).then(function(B) {
                            b || (b = !0, r.resolve(C, B))
                        }, function(B) {
                            b || (b = !0, r.reject(C, B))
                        });
                    var E;
                    return C
                }
            }, {
                immediate: 36
            }],
            38: [function(e, c, l) {
                var o = {};
                (0, e("./lib/utils/common").assign)(o, e("./lib/deflate"), e("./lib/inflate"), e("./lib/zlib/constants")),
                c.exports = o
            }, {
                "./lib/deflate": 39,
                "./lib/inflate": 40,
                "./lib/utils/common": 41,
                "./lib/zlib/constants": 44
            }],
            39: [function(e, c, l) {
                var o = e("./zlib/deflate"),
                    s = e("./utils/common"),
                    r = e("./utils/strings"),
                    f = e("./zlib/messages"),
                    y = e("./zlib/zstream"),
                    _ = Object.prototype.toString,
                    h = 0,
                    S = -1,
                    m = 0,
                    w = 8;
                function i(g) {
                    if (!(this instanceof i))
                        return new i(g);
                    this.options = s.assign({
                        level: S,
                        method: w,
                        chunkSize: 16384,
                        windowBits: 15,
                        memLevel: 8,
                        strategy: m,
                        to: ""
                    }, g || {});
                    var k = this.options;
                    k.raw && 0 < k.windowBits ? k.windowBits = -k.windowBits : k.gzip && 0 < k.windowBits && k.windowBits < 16 && (k.windowBits += 16),
                    this.err = 0,
                    this.msg = "",
                    this.ended = !1,
                    this.chunks = [],
                    this.strm = new y,
                    this.strm.avail_out = 0;
                    var d = o.deflateInit2(this.strm, k.level, k.method, k.windowBits, k.memLevel, k.strategy);
                    if (d !== h)
                        throw new Error(f[d]);
                    if (k.header && o.deflateSetHeader(this.strm, k.header), k.dictionary) {
                        var b;
                        if (b = typeof k.dictionary == "string" ? r.string2buf(k.dictionary) : _.call(k.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(k.dictionary) : k.dictionary, (d = o.deflateSetDictionary(this.strm, b)) !== h)
                            throw new Error(f[d]);
                        this._dict_set = !0
                    }
                }
                function p(g, k) {
                    var d = new i(k);
                    if (d.push(g, !0), d.err)
                        throw d.msg || f[d.err];
                    return d.result
                }
                i.prototype.push = function(g, k) {
                    var d,
                        b,
                        v = this.strm,
                        C = this.options.chunkSize;
                    if (this.ended)
                        return !1;
                    b = k === ~~k ? k : k === !0 ? 4 : 0,
                    typeof g == "string" ? v.input = r.string2buf(g) : _.call(g) === "[object ArrayBuffer]" ? v.input = new Uint8Array(g) : v.input = g,
                    v.next_in = 0,
                    v.avail_in = v.input.length;
                    do {
                        if (v.avail_out === 0 && (v.output = new s.Buf8(C), v.next_out = 0, v.avail_out = C), (d = o.deflate(v, b)) !== 1 && d !== h)
                            return this.onEnd(d), !(this.ended = !0);
                        v.avail_out !== 0 && (v.avail_in !== 0 || b !== 4 && b !== 2) || (this.options.to === "string" ? this.onData(r.buf2binstring(s.shrinkBuf(v.output, v.next_out))) : this.onData(s.shrinkBuf(v.output, v.next_out)))
                    } while ((0 < v.avail_in || v.avail_out === 0) && d !== 1);
                    return b === 4 ? (d = o.deflateEnd(this.strm), this.onEnd(d), this.ended = !0, d === h) : b !== 2 || (this.onEnd(h), !(v.avail_out = 0))
                },
                i.prototype.onData = function(g) {
                    this.chunks.push(g)
                },
                i.prototype.onEnd = function(g) {
                    g === h && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = s.flattenChunks(this.chunks)),
                    this.chunks = [],
                    this.err = g,
                    this.msg = this.strm.msg
                },
                l.Deflate = i,
                l.deflate = p,
                l.deflateRaw = function(g, k) {
                    return (k = k || {}).raw = !0, p(g, k)
                },
                l.gzip = function(g, k) {
                    return (k = k || {}).gzip = !0, p(g, k)
                }
            }, {
                "./utils/common": 41,
                "./utils/strings": 42,
                "./zlib/deflate": 46,
                "./zlib/messages": 51,
                "./zlib/zstream": 53
            }],
            40: [function(e, c, l) {
                var o = e("./zlib/inflate"),
                    s = e("./utils/common"),
                    r = e("./utils/strings"),
                    f = e("./zlib/constants"),
                    y = e("./zlib/messages"),
                    _ = e("./zlib/zstream"),
                    h = e("./zlib/gzheader"),
                    S = Object.prototype.toString;
                function m(i) {
                    if (!(this instanceof m))
                        return new m(i);
                    this.options = s.assign({
                        chunkSize: 16384,
                        windowBits: 0,
                        to: ""
                    }, i || {});
                    var p = this.options;
                    p.raw && 0 <= p.windowBits && p.windowBits < 16 && (p.windowBits = -p.windowBits, p.windowBits === 0 && (p.windowBits = -15)),
                    !(0 <= p.windowBits && p.windowBits < 16) || i && i.windowBits || (p.windowBits += 32),
                    15 < p.windowBits && p.windowBits < 48 && !(15 & p.windowBits) && (p.windowBits |= 15),
                    this.err = 0,
                    this.msg = "",
                    this.ended = !1,
                    this.chunks = [],
                    this.strm = new _,
                    this.strm.avail_out = 0;
                    var g = o.inflateInit2(this.strm, p.windowBits);
                    if (g !== f.Z_OK)
                        throw new Error(y[g]);
                    this.header = new h,
                    o.inflateGetHeader(this.strm, this.header)
                }
                function w(i, p) {
                    var g = new m(p);
                    if (g.push(i, !0), g.err)
                        throw g.msg || y[g.err];
                    return g.result
                }
                m.prototype.push = function(i, p) {
                    var g,
                        k,
                        d,
                        b,
                        v,
                        C,
                        E = this.strm,
                        B = this.options.chunkSize,
                        A = this.options.dictionary,
                        T = !1;
                    if (this.ended)
                        return !1;
                    k = p === ~~p ? p : p === !0 ? f.Z_FINISH : f.Z_NO_FLUSH,
                    typeof i == "string" ? E.input = r.binstring2buf(i) : S.call(i) === "[object ArrayBuffer]" ? E.input = new Uint8Array(i) : E.input = i,
                    E.next_in = 0,
                    E.avail_in = E.input.length;
                    do {
                        if (E.avail_out === 0 && (E.output = new s.Buf8(B), E.next_out = 0, E.avail_out = B), (g = o.inflate(E, f.Z_NO_FLUSH)) === f.Z_NEED_DICT && A && (C = typeof A == "string" ? r.string2buf(A) : S.call(A) === "[object ArrayBuffer]" ? new Uint8Array(A) : A, g = o.inflateSetDictionary(this.strm, C)), g === f.Z_BUF_ERROR && T === !0 && (g = f.Z_OK, T = !1), g !== f.Z_STREAM_END && g !== f.Z_OK)
                            return this.onEnd(g), !(this.ended = !0);
                        E.next_out && (E.avail_out !== 0 && g !== f.Z_STREAM_END && (E.avail_in !== 0 || k !== f.Z_FINISH && k !== f.Z_SYNC_FLUSH) || (this.options.to === "string" ? (d = r.utf8border(E.output, E.next_out), b = E.next_out - d, v = r.buf2string(E.output, d), E.next_out = b, E.avail_out = B - b, b && s.arraySet(E.output, E.output, d, b, 0), this.onData(v)) : this.onData(s.shrinkBuf(E.output, E.next_out)))),
                        E.avail_in === 0 && E.avail_out === 0 && (T = !0)
                    } while ((0 < E.avail_in || E.avail_out === 0) && g !== f.Z_STREAM_END);
                    return g === f.Z_STREAM_END && (k = f.Z_FINISH), k === f.Z_FINISH ? (g = o.inflateEnd(this.strm), this.onEnd(g), this.ended = !0, g === f.Z_OK) : k !== f.Z_SYNC_FLUSH || (this.onEnd(f.Z_OK), !(E.avail_out = 0))
                },
                m.prototype.onData = function(i) {
                    this.chunks.push(i)
                },
                m.prototype.onEnd = function(i) {
                    i === f.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = s.flattenChunks(this.chunks)),
                    this.chunks = [],
                    this.err = i,
                    this.msg = this.strm.msg
                },
                l.Inflate = m,
                l.inflate = w,
                l.inflateRaw = function(i, p) {
                    return (p = p || {}).raw = !0, w(i, p)
                },
                l.ungzip = w
            }, {
                "./utils/common": 41,
                "./utils/strings": 42,
                "./zlib/constants": 44,
                "./zlib/gzheader": 47,
                "./zlib/inflate": 49,
                "./zlib/messages": 51,
                "./zlib/zstream": 53
            }],
            41: [function(e, c, l) {
                var o = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
                l.assign = function(f) {
                    for (var y = Array.prototype.slice.call(arguments, 1); y.length;) {
                        var _ = y.shift();
                        if (_) {
                            if (typeof _ != "object")
                                throw new TypeError(_ + "must be non-object");
                            for (var h in _)
                                _.hasOwnProperty(h) && (f[h] = _[h])
                        }
                    }
                    return f
                },
                l.shrinkBuf = function(f, y) {
                    return f.length === y ? f : f.subarray ? f.subarray(0, y) : (f.length = y, f)
                };
                var s = {
                        arraySet: function(f, y, _, h, S) {
                            if (y.subarray && f.subarray)
                                f.set(y.subarray(_, _ + h), S);
                            else
                                for (var m = 0; m < h; m++)
                                    f[S + m] = y[_ + m]
                        },
                        flattenChunks: function(f) {
                            var y,
                                _,
                                h,
                                S,
                                m,
                                w;
                            for (y = h = 0, _ = f.length; y < _; y++)
                                h += f[y].length;
                            for (w = new Uint8Array(h), y = S = 0, _ = f.length; y < _; y++)
                                m = f[y],
                                w.set(m, S),
                                S += m.length;
                            return w
                        }
                    },
                    r = {
                        arraySet: function(f, y, _, h, S) {
                            for (var m = 0; m < h; m++)
                                f[S + m] = y[_ + m]
                        },
                        flattenChunks: function(f) {
                            return [].concat.apply([], f)
                        }
                    };
                l.setTyped = function(f) {
                    f ? (l.Buf8 = Uint8Array, l.Buf16 = Uint16Array, l.Buf32 = Int32Array, l.assign(l, s)) : (l.Buf8 = Array, l.Buf16 = Array, l.Buf32 = Array, l.assign(l, r))
                },
                l.setTyped(o)
            }, {}],
            42: [function(e, c, l) {
                var o = e("./common"),
                    s = !0,
                    r = !0;
                try {
                    String.fromCharCode.apply(null, [0])
                } catch {
                    s = !1
                }
                try {
                    String.fromCharCode.apply(null, new Uint8Array(1))
                } catch {
                    r = !1
                }
                for (var f = new o.Buf8(256), y = 0; y < 256; y++)
                    f[y] = 252 <= y ? 6 : 248 <= y ? 5 : 240 <= y ? 4 : 224 <= y ? 3 : 192 <= y ? 2 : 1;
                function _(h, S) {
                    if (S < 65537 && (h.subarray && r || !h.subarray && s))
                        return String.fromCharCode.apply(null, o.shrinkBuf(h, S));
                    for (var m = "", w = 0; w < S; w++)
                        m += String.fromCharCode(h[w]);
                    return m
                }
                f[254] = f[254] = 1,
                l.string2buf = function(h) {
                    var S,
                        m,
                        w,
                        i,
                        p,
                        g = h.length,
                        k = 0;
                    for (i = 0; i < g; i++)
                        (64512 & (m = h.charCodeAt(i))) == 55296 && i + 1 < g && (64512 & (w = h.charCodeAt(i + 1))) == 56320 && (m = 65536 + (m - 55296 << 10) + (w - 56320), i++),
                        k += m < 128 ? 1 : m < 2048 ? 2 : m < 65536 ? 3 : 4;
                    for (S = new o.Buf8(k), i = p = 0; p < k; i++)
                        (64512 & (m = h.charCodeAt(i))) == 55296 && i + 1 < g && (64512 & (w = h.charCodeAt(i + 1))) == 56320 && (m = 65536 + (m - 55296 << 10) + (w - 56320), i++),
                        m < 128 ? S[p++] = m : (m < 2048 ? S[p++] = 192 | m >>> 6 : (m < 65536 ? S[p++] = 224 | m >>> 12 : (S[p++] = 240 | m >>> 18, S[p++] = 128 | m >>> 12 & 63), S[p++] = 128 | m >>> 6 & 63), S[p++] = 128 | 63 & m);
                    return S
                },
                l.buf2binstring = function(h) {
                    return _(h, h.length)
                },
                l.binstring2buf = function(h) {
                    for (var S = new o.Buf8(h.length), m = 0, w = S.length; m < w; m++)
                        S[m] = h.charCodeAt(m);
                    return S
                },
                l.buf2string = function(h, S) {
                    var m,
                        w,
                        i,
                        p,
                        g = S || h.length,
                        k = new Array(2 * g);
                    for (m = w = 0; m < g;)
                        if ((i = h[m++]) < 128)
                            k[w++] = i;
                        else if (4 < (p = f[i]))
                            k[w++] = 65533,
                            m += p - 1;
                        else {
                            for (i &= p === 2 ? 31 : p === 3 ? 15 : 7; 1 < p && m < g;)
                                i = i << 6 | 63 & h[m++],
                                p--;
                            1 < p ? k[w++] = 65533 : i < 65536 ? k[w++] = i : (i -= 65536, k[w++] = 55296 | i >> 10 & 1023, k[w++] = 56320 | 1023 & i)
                        }
                    return _(k, w)
                },
                l.utf8border = function(h, S) {
                    var m;
                    for ((S = S || h.length) > h.length && (S = h.length), m = S - 1; 0 <= m && (192 & h[m]) == 128;)
                        m--;
                    return m < 0 || m === 0 ? S : m + f[h[m]] > S ? m : S
                }
            }, {
                "./common": 41
            }],
            43: [function(e, c, l) {
                c.exports = function(o, s, r, f) {
                    for (var y = 65535 & o | 0, _ = o >>> 16 & 65535 | 0, h = 0; r !== 0;) {
                        for (r -= h = 2e3 < r ? 2e3 : r; _ = _ + (y = y + s[f++] | 0) | 0, --h;)
                            ;
                        y %= 65521,
                        _ %= 65521
                    }
                    return y | _ << 16 | 0
                }
            }, {}],
            44: [function(e, c, l) {
                c.exports = {
                    Z_NO_FLUSH: 0,
                    Z_PARTIAL_FLUSH: 1,
                    Z_SYNC_FLUSH: 2,
                    Z_FULL_FLUSH: 3,
                    Z_FINISH: 4,
                    Z_BLOCK: 5,
                    Z_TREES: 6,
                    Z_OK: 0,
                    Z_STREAM_END: 1,
                    Z_NEED_DICT: 2,
                    Z_ERRNO: -1,
                    Z_STREAM_ERROR: -2,
                    Z_DATA_ERROR: -3,
                    Z_BUF_ERROR: -5,
                    Z_NO_COMPRESSION: 0,
                    Z_BEST_SPEED: 1,
                    Z_BEST_COMPRESSION: 9,
                    Z_DEFAULT_COMPRESSION: -1,
                    Z_FILTERED: 1,
                    Z_HUFFMAN_ONLY: 2,
                    Z_RLE: 3,
                    Z_FIXED: 4,
                    Z_DEFAULT_STRATEGY: 0,
                    Z_BINARY: 0,
                    Z_TEXT: 1,
                    Z_UNKNOWN: 2,
                    Z_DEFLATED: 8
                }
            }, {}],
            45: [function(e, c, l) {
                var o = function() {
                    for (var s, r = [], f = 0; f < 256; f++) {
                        s = f;
                        for (var y = 0; y < 8; y++)
                            s = 1 & s ? 3988292384 ^ s >>> 1 : s >>> 1;
                        r[f] = s
                    }
                    return r
                }();
                c.exports = function(s, r, f, y) {
                    var _ = o,
                        h = y + f;
                    s ^= -1;
                    for (var S = y; S < h; S++)
                        s = s >>> 8 ^ _[255 & (s ^ r[S])];
                    return -1 ^ s
                }
            }, {}],
            46: [function(e, c, l) {
                var o,
                    s = e("../utils/common"),
                    r = e("./trees"),
                    f = e("./adler32"),
                    y = e("./crc32"),
                    _ = e("./messages"),
                    h = 0,
                    S = 4,
                    m = 0,
                    w = -2,
                    i = -1,
                    p = 4,
                    g = 2,
                    k = 8,
                    d = 9,
                    b = 286,
                    v = 30,
                    C = 19,
                    E = 2 * b + 1,
                    B = 15,
                    A = 3,
                    T = 258,
                    j = T + A + 1,
                    $ = 42,
                    R = 113,
                    u = 1,
                    P = 2,
                    X = 3,
                    q = 4;
                function tt(a, M) {
                    return a.msg = _[M], M
                }
                function H(a) {
                    return (a << 1) - (4 < a ? 9 : 0)
                }
                function Q(a) {
                    for (var M = a.length; 0 <= --M;)
                        a[M] = 0
                }
                function z(a) {
                    var M = a.state,
                        O = M.pending;
                    O > a.avail_out && (O = a.avail_out),
                    O !== 0 && (s.arraySet(a.output, M.pending_buf, M.pending_out, O, a.next_out), a.next_out += O, M.pending_out += O, a.total_out += O, a.avail_out -= O, M.pending -= O, M.pending === 0 && (M.pending_out = 0))
                }
                function F(a, M) {
                    r._tr_flush_block(a, 0 <= a.block_start ? a.block_start : -1, a.strstart - a.block_start, M),
                    a.block_start = a.strstart,
                    z(a.strm)
                }
                function J(a, M) {
                    a.pending_buf[a.pending++] = M
                }
                function G(a, M) {
                    a.pending_buf[a.pending++] = M >>> 8 & 255,
                    a.pending_buf[a.pending++] = 255 & M
                }
                function K(a, M) {
                    var O,
                        L,
                        x = a.max_chain_length,
                        I = a.strstart,
                        N = a.prev_length,
                        U = a.nice_match,
                        D = a.strstart > a.w_size - j ? a.strstart - (a.w_size - j) : 0,
                        W = a.window,
                        V = a.w_mask,
                        Z = a.prev,
                        Y = a.strstart + T,
                        it = W[I + N - 1],
                        rt = W[I + N];
                    a.prev_length >= a.good_match && (x >>= 2),
                    U > a.lookahead && (U = a.lookahead);
                    do if (W[(O = M) + N] === rt && W[O + N - 1] === it && W[O] === W[I] && W[++O] === W[I + 1]) {
                        I += 2,
                        O++;
                        do ;
                        while (W[++I] === W[++O] && W[++I] === W[++O] && W[++I] === W[++O] && W[++I] === W[++O] && W[++I] === W[++O] && W[++I] === W[++O] && W[++I] === W[++O] && W[++I] === W[++O] && I < Y);
                        if (L = T - (Y - I), I = Y - T, N < L) {
                            if (a.match_start = M, U <= (N = L))
                                break;
                            it = W[I + N - 1],
                            rt = W[I + N]
                        }
                    }
                    while ((M = Z[M & V]) > D && --x != 0);
                    return N <= a.lookahead ? N : a.lookahead
                }
                function ct(a) {
                    var M,
                        O,
                        L,
                        x,
                        I,
                        N,
                        U,
                        D,
                        W,
                        V,
                        Z = a.w_size;
                    do {
                        if (x = a.window_size - a.lookahead - a.strstart, a.strstart >= Z + (Z - j)) {
                            for (s.arraySet(a.window, a.window, Z, Z, 0), a.match_start -= Z, a.strstart -= Z, a.block_start -= Z, M = O = a.hash_size; L = a.head[--M], a.head[M] = Z <= L ? L - Z : 0, --O;)
                                ;
                            for (M = O = Z; L = a.prev[--M], a.prev[M] = Z <= L ? L - Z : 0, --O;)
                                ;
                            x += Z
                        }
                        if (a.strm.avail_in === 0)
                            break;
                        if (N = a.strm, U = a.window, D = a.strstart + a.lookahead, W = x, V = void 0, V = N.avail_in, W < V && (V = W), O = V === 0 ? 0 : (N.avail_in -= V, s.arraySet(U, N.input, N.next_in, V, D), N.state.wrap === 1 ? N.adler = f(N.adler, U, V, D) : N.state.wrap === 2 && (N.adler = y(N.adler, U, V, D)), N.next_in += V, N.total_in += V, V), a.lookahead += O, a.lookahead + a.insert >= A)
                            for (I = a.strstart - a.insert, a.ins_h = a.window[I], a.ins_h = (a.ins_h << a.hash_shift ^ a.window[I + 1]) & a.hash_mask; a.insert && (a.ins_h = (a.ins_h << a.hash_shift ^ a.window[I + A - 1]) & a.hash_mask, a.prev[I & a.w_mask] = a.head[a.ins_h], a.head[a.ins_h] = I, I++, a.insert--, !(a.lookahead + a.insert < A));)
                                ;
                    } while (a.lookahead < j && a.strm.avail_in !== 0)
                }
                function ht(a, M) {
                    for (var O, L;;) {
                        if (a.lookahead < j) {
                            if (ct(a), a.lookahead < j && M === h)
                                return u;
                            if (a.lookahead === 0)
                                break
                        }
                        if (O = 0, a.lookahead >= A && (a.ins_h = (a.ins_h << a.hash_shift ^ a.window[a.strstart + A - 1]) & a.hash_mask, O = a.prev[a.strstart & a.w_mask] = a.head[a.ins_h], a.head[a.ins_h] = a.strstart), O !== 0 && a.strstart - O <= a.w_size - j && (a.match_length = K(a, O)), a.match_length >= A)
                            if (L = r._tr_tally(a, a.strstart - a.match_start, a.match_length - A), a.lookahead -= a.match_length, a.match_length <= a.max_lazy_match && a.lookahead >= A) {
                                for (a.match_length--; a.strstart++, a.ins_h = (a.ins_h << a.hash_shift ^ a.window[a.strstart + A - 1]) & a.hash_mask, O = a.prev[a.strstart & a.w_mask] = a.head[a.ins_h], a.head[a.ins_h] = a.strstart, --a.match_length != 0;)
                                    ;
                                a.strstart++
                            } else
                                a.strstart += a.match_length,
                                a.match_length = 0,
                                a.ins_h = a.window[a.strstart],
                                a.ins_h = (a.ins_h << a.hash_shift ^ a.window[a.strstart + 1]) & a.hash_mask;
                        else
                            L = r._tr_tally(a, 0, a.window[a.strstart]),
                            a.lookahead--,
                            a.strstart++;
                        if (L && (F(a, !1), a.strm.avail_out === 0))
                            return u
                    }
                    return a.insert = a.strstart < A - 1 ? a.strstart : A - 1, M === S ? (F(a, !0), a.strm.avail_out === 0 ? X : q) : a.last_lit && (F(a, !1), a.strm.avail_out === 0) ? u : P
                }
                function et(a, M) {
                    for (var O, L, x;;) {
                        if (a.lookahead < j) {
                            if (ct(a), a.lookahead < j && M === h)
                                return u;
                            if (a.lookahead === 0)
                                break
                        }
                        if (O = 0, a.lookahead >= A && (a.ins_h = (a.ins_h << a.hash_shift ^ a.window[a.strstart + A - 1]) & a.hash_mask, O = a.prev[a.strstart & a.w_mask] = a.head[a.ins_h], a.head[a.ins_h] = a.strstart), a.prev_length = a.match_length, a.prev_match = a.match_start, a.match_length = A - 1, O !== 0 && a.prev_length < a.max_lazy_match && a.strstart - O <= a.w_size - j && (a.match_length = K(a, O), a.match_length <= 5 && (a.strategy === 1 || a.match_length === A && 4096 < a.strstart - a.match_start) && (a.match_length = A - 1)), a.prev_length >= A && a.match_length <= a.prev_length) {
                            for (x = a.strstart + a.lookahead - A, L = r._tr_tally(a, a.strstart - 1 - a.prev_match, a.prev_length - A), a.lookahead -= a.prev_length - 1, a.prev_length -= 2; ++a.strstart <= x && (a.ins_h = (a.ins_h << a.hash_shift ^ a.window[a.strstart + A - 1]) & a.hash_mask, O = a.prev[a.strstart & a.w_mask] = a.head[a.ins_h], a.head[a.ins_h] = a.strstart), --a.prev_length != 0;)
                                ;
                            if (a.match_available = 0, a.match_length = A - 1, a.strstart++, L && (F(a, !1), a.strm.avail_out === 0))
                                return u
                        } else if (a.match_available) {
                            if ((L = r._tr_tally(a, 0, a.window[a.strstart - 1])) && F(a, !1), a.strstart++, a.lookahead--, a.strm.avail_out === 0)
                                return u
                        } else
                            a.match_available = 1,
                            a.strstart++,
                            a.lookahead--
                    }
                    return a.match_available && (L = r._tr_tally(a, 0, a.window[a.strstart - 1]), a.match_available = 0), a.insert = a.strstart < A - 1 ? a.strstart : A - 1, M === S ? (F(a, !0), a.strm.avail_out === 0 ? X : q) : a.last_lit && (F(a, !1), a.strm.avail_out === 0) ? u : P
                }
                function ot(a, M, O, L, x) {
                    this.good_length = a,
                    this.max_lazy = M,
                    this.nice_length = O,
                    this.max_chain = L,
                    this.func = x
                }
                function ut() {
                    this.strm = null,
                    this.status = 0,
                    this.pending_buf = null,
                    this.pending_buf_size = 0,
                    this.pending_out = 0,
                    this.pending = 0,
                    this.wrap = 0,
                    this.gzhead = null,
                    this.gzindex = 0,
                    this.method = k,
                    this.last_flush = -1,
                    this.w_size = 0,
                    this.w_bits = 0,
                    this.w_mask = 0,
                    this.window = null,
                    this.window_size = 0,
                    this.prev = null,
                    this.head = null,
                    this.ins_h = 0,
                    this.hash_size = 0,
                    this.hash_bits = 0,
                    this.hash_mask = 0,
                    this.hash_shift = 0,
                    this.block_start = 0,
                    this.match_length = 0,
                    this.prev_match = 0,
                    this.match_available = 0,
                    this.strstart = 0,
                    this.match_start = 0,
                    this.lookahead = 0,
                    this.prev_length = 0,
                    this.max_chain_length = 0,
                    this.max_lazy_match = 0,
                    this.level = 0,
                    this.strategy = 0,
                    this.good_match = 0,
                    this.nice_match = 0,
                    this.dyn_ltree = new s.Buf16(2 * E),
                    this.dyn_dtree = new s.Buf16(2 * (2 * v + 1)),
                    this.bl_tree = new s.Buf16(2 * (2 * C + 1)),
                    Q(this.dyn_ltree),
                    Q(this.dyn_dtree),
                    Q(this.bl_tree),
                    this.l_desc = null,
                    this.d_desc = null,
                    this.bl_desc = null,
                    this.bl_count = new s.Buf16(B + 1),
                    this.heap = new s.Buf16(2 * b + 1),
                    Q(this.heap),
                    this.heap_len = 0,
                    this.heap_max = 0,
                    this.depth = new s.Buf16(2 * b + 1),
                    Q(this.depth),
                    this.l_buf = 0,
                    this.lit_bufsize = 0,
                    this.last_lit = 0,
                    this.d_buf = 0,
                    this.opt_len = 0,
                    this.static_len = 0,
                    this.matches = 0,
                    this.insert = 0,
                    this.bi_buf = 0,
                    this.bi_valid = 0
                }
                function lt(a) {
                    var M;
                    return a && a.state ? (a.total_in = a.total_out = 0, a.data_type = g, (M = a.state).pending = 0, M.pending_out = 0, M.wrap < 0 && (M.wrap = -M.wrap), M.status = M.wrap ? $ : R, a.adler = M.wrap === 2 ? 0 : 1, M.last_flush = h, r._tr_init(M), m) : tt(a, w)
                }
                function Ct(a) {
                    var M = lt(a);
                    return M === m && function(O) {
                        O.window_size = 2 * O.w_size,
                        Q(O.head),
                        O.max_lazy_match = o[O.level].max_lazy,
                        O.good_match = o[O.level].good_length,
                        O.nice_match = o[O.level].nice_length,
                        O.max_chain_length = o[O.level].max_chain,
                        O.strstart = 0,
                        O.block_start = 0,
                        O.lookahead = 0,
                        O.insert = 0,
                        O.match_length = O.prev_length = A - 1,
                        O.match_available = 0,
                        O.ins_h = 0
                    }(a.state), M
                }
                function kt(a, M, O, L, x, I) {
                    if (!a)
                        return w;
                    var N = 1;
                    if (M === i && (M = 6), L < 0 ? (N = 0, L = -L) : 15 < L && (N = 2, L -= 16), x < 1 || d < x || O !== k || L < 8 || 15 < L || M < 0 || 9 < M || I < 0 || p < I)
                        return tt(a, w);
                    L === 8 && (L = 9);
                    var U = new ut;
                    return (a.state = U).strm = a, U.wrap = N, U.gzhead = null, U.w_bits = L, U.w_size = 1 << U.w_bits, U.w_mask = U.w_size - 1, U.hash_bits = x + 7, U.hash_size = 1 << U.hash_bits, U.hash_mask = U.hash_size - 1, U.hash_shift = ~~((U.hash_bits + A - 1) / A), U.window = new s.Buf8(2 * U.w_size), U.head = new s.Buf16(U.hash_size), U.prev = new s.Buf16(U.w_size), U.lit_bufsize = 1 << x + 6, U.pending_buf_size = 4 * U.lit_bufsize, U.pending_buf = new s.Buf8(U.pending_buf_size), U.d_buf = 1 * U.lit_bufsize, U.l_buf = 3 * U.lit_bufsize, U.level = M, U.strategy = I, U.method = O, Ct(a)
                }
                o = [new ot(0, 0, 0, 0, function(a, M) {
                    var O = 65535;
                    for (O > a.pending_buf_size - 5 && (O = a.pending_buf_size - 5);;) {
                        if (a.lookahead <= 1) {
                            if (ct(a), a.lookahead === 0 && M === h)
                                return u;
                            if (a.lookahead === 0)
                                break
                        }
                        a.strstart += a.lookahead,
                        a.lookahead = 0;
                        var L = a.block_start + O;
                        if ((a.strstart === 0 || a.strstart >= L) && (a.lookahead = a.strstart - L, a.strstart = L, F(a, !1), a.strm.avail_out === 0) || a.strstart - a.block_start >= a.w_size - j && (F(a, !1), a.strm.avail_out === 0))
                            return u
                    }
                    return a.insert = 0, M === S ? (F(a, !0), a.strm.avail_out === 0 ? X : q) : (a.strstart > a.block_start && (F(a, !1), a.strm.avail_out), u)
                }), new ot(4, 4, 8, 4, ht), new ot(4, 5, 16, 8, ht), new ot(4, 6, 32, 32, ht), new ot(4, 4, 16, 16, et), new ot(8, 16, 32, 32, et), new ot(8, 16, 128, 128, et), new ot(8, 32, 128, 256, et), new ot(32, 128, 258, 1024, et), new ot(32, 258, 258, 4096, et)],
                l.deflateInit = function(a, M) {
                    return kt(a, M, k, 15, 8, 0)
                },
                l.deflateInit2 = kt,
                l.deflateReset = Ct,
                l.deflateResetKeep = lt,
                l.deflateSetHeader = function(a, M) {
                    return a && a.state ? a.state.wrap !== 2 ? w : (a.state.gzhead = M, m) : w
                },
                l.deflate = function(a, M) {
                    var O,
                        L,
                        x,
                        I;
                    if (!a || !a.state || 5 < M || M < 0)
                        return a ? tt(a, w) : w;
                    if (L = a.state, !a.output || !a.input && a.avail_in !== 0 || L.status === 666 && M !== S)
                        return tt(a, a.avail_out === 0 ? -5 : w);
                    if (L.strm = a, O = L.last_flush, L.last_flush = M, L.status === $)
                        if (L.wrap === 2)
                            a.adler = 0,
                            J(L, 31),
                            J(L, 139),
                            J(L, 8),
                            L.gzhead ? (J(L, (L.gzhead.text ? 1 : 0) + (L.gzhead.hcrc ? 2 : 0) + (L.gzhead.extra ? 4 : 0) + (L.gzhead.name ? 8 : 0) + (L.gzhead.comment ? 16 : 0)), J(L, 255 & L.gzhead.time), J(L, L.gzhead.time >> 8 & 255), J(L, L.gzhead.time >> 16 & 255), J(L, L.gzhead.time >> 24 & 255), J(L, L.level === 9 ? 2 : 2 <= L.strategy || L.level < 2 ? 4 : 0), J(L, 255 & L.gzhead.os), L.gzhead.extra && L.gzhead.extra.length && (J(L, 255 & L.gzhead.extra.length), J(L, L.gzhead.extra.length >> 8 & 255)), L.gzhead.hcrc && (a.adler = y(a.adler, L.pending_buf, L.pending, 0)), L.gzindex = 0, L.status = 69) : (J(L, 0), J(L, 0), J(L, 0), J(L, 0), J(L, 0), J(L, L.level === 9 ? 2 : 2 <= L.strategy || L.level < 2 ? 4 : 0), J(L, 3), L.status = R);
                        else {
                            var N = k + (L.w_bits - 8 << 4) << 8;
                            N |= (2 <= L.strategy || L.level < 2 ? 0 : L.level < 6 ? 1 : L.level === 6 ? 2 : 3) << 6,
                            L.strstart !== 0 && (N |= 32),
                            N += 31 - N % 31,
                            L.status = R,
                            G(L, N),
                            L.strstart !== 0 && (G(L, a.adler >>> 16), G(L, 65535 & a.adler)),
                            a.adler = 1
                        }
                    if (L.status === 69)
                        if (L.gzhead.extra) {
                            for (x = L.pending; L.gzindex < (65535 & L.gzhead.extra.length) && (L.pending !== L.pending_buf_size || (L.gzhead.hcrc && L.pending > x && (a.adler = y(a.adler, L.pending_buf, L.pending - x, x)), z(a), x = L.pending, L.pending !== L.pending_buf_size));)
                                J(L, 255 & L.gzhead.extra[L.gzindex]),
                                L.gzindex++;
                            L.gzhead.hcrc && L.pending > x && (a.adler = y(a.adler, L.pending_buf, L.pending - x, x)),
                            L.gzindex === L.gzhead.extra.length && (L.gzindex = 0, L.status = 73)
                        } else
                            L.status = 73;
                    if (L.status === 73)
                        if (L.gzhead.name) {
                            x = L.pending;
                            do {
                                if (L.pending === L.pending_buf_size && (L.gzhead.hcrc && L.pending > x && (a.adler = y(a.adler, L.pending_buf, L.pending - x, x)), z(a), x = L.pending, L.pending === L.pending_buf_size)) {
                                    I = 1;
                                    break
                                }
                                I = L.gzindex < L.gzhead.name.length ? 255 & L.gzhead.name.charCodeAt(L.gzindex++) : 0,
                                J(L, I)
                            } while (I !== 0);
                            L.gzhead.hcrc && L.pending > x && (a.adler = y(a.adler, L.pending_buf, L.pending - x, x)),
                            I === 0 && (L.gzindex = 0, L.status = 91)
                        } else
                            L.status = 91;
                    if (L.status === 91)
                        if (L.gzhead.comment) {
                            x = L.pending;
                            do {
                                if (L.pending === L.pending_buf_size && (L.gzhead.hcrc && L.pending > x && (a.adler = y(a.adler, L.pending_buf, L.pending - x, x)), z(a), x = L.pending, L.pending === L.pending_buf_size)) {
                                    I = 1;
                                    break
                                }
                                I = L.gzindex < L.gzhead.comment.length ? 255 & L.gzhead.comment.charCodeAt(L.gzindex++) : 0,
                                J(L, I)
                            } while (I !== 0);
                            L.gzhead.hcrc && L.pending > x && (a.adler = y(a.adler, L.pending_buf, L.pending - x, x)),
                            I === 0 && (L.status = 103)
                        } else
                            L.status = 103;
                    if (L.status === 103 && (L.gzhead.hcrc ? (L.pending + 2 > L.pending_buf_size && z(a), L.pending + 2 <= L.pending_buf_size && (J(L, 255 & a.adler), J(L, a.adler >> 8 & 255), a.adler = 0, L.status = R)) : L.status = R), L.pending !== 0) {
                        if (z(a), a.avail_out === 0)
                            return L.last_flush = -1, m
                    } else if (a.avail_in === 0 && H(M) <= H(O) && M !== S)
                        return tt(a, -5);
                    if (L.status === 666 && a.avail_in !== 0)
                        return tt(a, -5);
                    if (a.avail_in !== 0 || L.lookahead !== 0 || M !== h && L.status !== 666) {
                        var U = L.strategy === 2 ? function(D, W) {
                            for (var V;;) {
                                if (D.lookahead === 0 && (ct(D), D.lookahead === 0)) {
                                    if (W === h)
                                        return u;
                                    break
                                }
                                if (D.match_length = 0, V = r._tr_tally(D, 0, D.window[D.strstart]), D.lookahead--, D.strstart++, V && (F(D, !1), D.strm.avail_out === 0))
                                    return u
                            }
                            return D.insert = 0, W === S ? (F(D, !0), D.strm.avail_out === 0 ? X : q) : D.last_lit && (F(D, !1), D.strm.avail_out === 0) ? u : P
                        }(L, M) : L.strategy === 3 ? function(D, W) {
                            for (var V, Z, Y, it, rt = D.window;;) {
                                if (D.lookahead <= T) {
                                    if (ct(D), D.lookahead <= T && W === h)
                                        return u;
                                    if (D.lookahead === 0)
                                        break
                                }
                                if (D.match_length = 0, D.lookahead >= A && 0 < D.strstart && (Z = rt[Y = D.strstart - 1]) === rt[++Y] && Z === rt[++Y] && Z === rt[++Y]) {
                                    it = D.strstart + T;
                                    do ;
                                    while (Z === rt[++Y] && Z === rt[++Y] && Z === rt[++Y] && Z === rt[++Y] && Z === rt[++Y] && Z === rt[++Y] && Z === rt[++Y] && Z === rt[++Y] && Y < it);
                                    D.match_length = T - (it - Y),
                                    D.match_length > D.lookahead && (D.match_length = D.lookahead)
                                }
                                if (D.match_length >= A ? (V = r._tr_tally(D, 1, D.match_length - A), D.lookahead -= D.match_length, D.strstart += D.match_length, D.match_length = 0) : (V = r._tr_tally(D, 0, D.window[D.strstart]), D.lookahead--, D.strstart++), V && (F(D, !1), D.strm.avail_out === 0))
                                    return u
                            }
                            return D.insert = 0, W === S ? (F(D, !0), D.strm.avail_out === 0 ? X : q) : D.last_lit && (F(D, !1), D.strm.avail_out === 0) ? u : P
                        }(L, M) : o[L.level].func(L, M);
                        if (U !== X && U !== q || (L.status = 666), U === u || U === X)
                            return a.avail_out === 0 && (L.last_flush = -1), m;
                        if (U === P && (M === 1 ? r._tr_align(L) : M !== 5 && (r._tr_stored_block(L, 0, 0, !1), M === 3 && (Q(L.head), L.lookahead === 0 && (L.strstart = 0, L.block_start = 0, L.insert = 0))), z(a), a.avail_out === 0))
                            return L.last_flush = -1, m
                    }
                    return M !== S ? m : L.wrap <= 0 ? 1 : (L.wrap === 2 ? (J(L, 255 & a.adler), J(L, a.adler >> 8 & 255), J(L, a.adler >> 16 & 255), J(L, a.adler >> 24 & 255), J(L, 255 & a.total_in), J(L, a.total_in >> 8 & 255), J(L, a.total_in >> 16 & 255), J(L, a.total_in >> 24 & 255)) : (G(L, a.adler >>> 16), G(L, 65535 & a.adler)), z(a), 0 < L.wrap && (L.wrap = -L.wrap), L.pending !== 0 ? m : 1)
                },
                l.deflateEnd = function(a) {
                    var M;
                    return a && a.state ? (M = a.state.status) !== $ && M !== 69 && M !== 73 && M !== 91 && M !== 103 && M !== R && M !== 666 ? tt(a, w) : (a.state = null, M === R ? tt(a, -3) : m) : w
                },
                l.deflateSetDictionary = function(a, M) {
                    var O,
                        L,
                        x,
                        I,
                        N,
                        U,
                        D,
                        W,
                        V = M.length;
                    if (!a || !a.state || (I = (O = a.state).wrap) === 2 || I === 1 && O.status !== $ || O.lookahead)
                        return w;
                    for (I === 1 && (a.adler = f(a.adler, M, V, 0)), O.wrap = 0, V >= O.w_size && (I === 0 && (Q(O.head), O.strstart = 0, O.block_start = 0, O.insert = 0), W = new s.Buf8(O.w_size), s.arraySet(W, M, V - O.w_size, O.w_size, 0), M = W, V = O.w_size), N = a.avail_in, U = a.next_in, D = a.input, a.avail_in = V, a.next_in = 0, a.input = M, ct(O); O.lookahead >= A;) {
                        for (L = O.strstart, x = O.lookahead - (A - 1); O.ins_h = (O.ins_h << O.hash_shift ^ O.window[L + A - 1]) & O.hash_mask, O.prev[L & O.w_mask] = O.head[O.ins_h], O.head[O.ins_h] = L, L++, --x;)
                            ;
                        O.strstart = L,
                        O.lookahead = A - 1,
                        ct(O)
                    }
                    return O.strstart += O.lookahead, O.block_start = O.strstart, O.insert = O.lookahead, O.lookahead = 0, O.match_length = O.prev_length = A - 1, O.match_available = 0, a.next_in = U, a.input = D, a.avail_in = N, O.wrap = I, m
                },
                l.deflateInfo = "pako deflate (from Nodeca project)"
            }, {
                "../utils/common": 41,
                "./adler32": 43,
                "./crc32": 45,
                "./messages": 51,
                "./trees": 52
            }],
            47: [function(e, c, l) {
                c.exports = function() {
                    this.text = 0,
                    this.time = 0,
                    this.xflags = 0,
                    this.os = 0,
                    this.extra = null,
                    this.extra_len = 0,
                    this.name = "",
                    this.comment = "",
                    this.hcrc = 0,
                    this.done = !1
                }
            }, {}],
            48: [function(e, c, l) {
                c.exports = function(o, s) {
                    var r,
                        f,
                        y,
                        _,
                        h,
                        S,
                        m,
                        w,
                        i,
                        p,
                        g,
                        k,
                        d,
                        b,
                        v,
                        C,
                        E,
                        B,
                        A,
                        T,
                        j,
                        $,
                        R,
                        u,
                        P;
                    r = o.state,
                    f = o.next_in,
                    u = o.input,
                    y = f + (o.avail_in - 5),
                    _ = o.next_out,
                    P = o.output,
                    h = _ - (s - o.avail_out),
                    S = _ + (o.avail_out - 257),
                    m = r.dmax,
                    w = r.wsize,
                    i = r.whave,
                    p = r.wnext,
                    g = r.window,
                    k = r.hold,
                    d = r.bits,
                    b = r.lencode,
                    v = r.distcode,
                    C = (1 << r.lenbits) - 1,
                    E = (1 << r.distbits) - 1;
                    t:
                    do {
                        d < 15 && (k += u[f++] << d, d += 8, k += u[f++] << d, d += 8),
                        B = b[k & C];
                        e:
                        for (;;) {
                            if (k >>>= A = B >>> 24, d -= A, (A = B >>> 16 & 255) === 0)
                                P[_++] = 65535 & B;
                            else {
                                if (!(16 & A)) {
                                    if (!(64 & A)) {
                                        B = b[(65535 & B) + (k & (1 << A) - 1)];
                                        continue e
                                    }
                                    if (32 & A) {
                                        r.mode = 12;
                                        break t
                                    }
                                    o.msg = "invalid literal/length code",
                                    r.mode = 30;
                                    break t
                                }
                                T = 65535 & B,
                                (A &= 15) && (d < A && (k += u[f++] << d, d += 8), T += k & (1 << A) - 1, k >>>= A, d -= A),
                                d < 15 && (k += u[f++] << d, d += 8, k += u[f++] << d, d += 8),
                                B = v[k & E];
                                r:
                                for (;;) {
                                    if (k >>>= A = B >>> 24, d -= A, !(16 & (A = B >>> 16 & 255))) {
                                        if (!(64 & A)) {
                                            B = v[(65535 & B) + (k & (1 << A) - 1)];
                                            continue r
                                        }
                                        o.msg = "invalid distance code",
                                        r.mode = 30;
                                        break t
                                    }
                                    if (j = 65535 & B, d < (A &= 15) && (k += u[f++] << d, (d += 8) < A && (k += u[f++] << d, d += 8)), m < (j += k & (1 << A) - 1)) {
                                        o.msg = "invalid distance too far back",
                                        r.mode = 30;
                                        break t
                                    }
                                    if (k >>>= A, d -= A, (A = _ - h) < j) {
                                        if (i < (A = j - A) && r.sane) {
                                            o.msg = "invalid distance too far back",
                                            r.mode = 30;
                                            break t
                                        }
                                        if (R = g, ($ = 0) === p) {
                                            if ($ += w - A, A < T) {
                                                for (T -= A; P[_++] = g[$++], --A;)
                                                    ;
                                                $ = _ - j,
                                                R = P
                                            }
                                        } else if (p < A) {
                                            if ($ += w + p - A, (A -= p) < T) {
                                                for (T -= A; P[_++] = g[$++], --A;)
                                                    ;
                                                if ($ = 0, p < T) {
                                                    for (T -= A = p; P[_++] = g[$++], --A;)
                                                        ;
                                                    $ = _ - j,
                                                    R = P
                                                }
                                            }
                                        } else if ($ += p - A, A < T) {
                                            for (T -= A; P[_++] = g[$++], --A;)
                                                ;
                                            $ = _ - j,
                                            R = P
                                        }
                                        for (; 2 < T;)
                                            P[_++] = R[$++],
                                            P[_++] = R[$++],
                                            P[_++] = R[$++],
                                            T -= 3;
                                        T && (P[_++] = R[$++], 1 < T && (P[_++] = R[$++]))
                                    } else {
                                        for ($ = _ - j; P[_++] = P[$++], P[_++] = P[$++], P[_++] = P[$++], 2 < (T -= 3);)
                                            ;
                                        T && (P[_++] = P[$++], 1 < T && (P[_++] = P[$++]))
                                    }
                                    break
                                }
                            }
                            break
                        }
                    } while (f < y && _ < S);
                    f -= T = d >> 3,
                    k &= (1 << (d -= T << 3)) - 1,
                    o.next_in = f,
                    o.next_out = _,
                    o.avail_in = f < y ? y - f + 5 : 5 - (f - y),
                    o.avail_out = _ < S ? S - _ + 257 : 257 - (_ - S),
                    r.hold = k,
                    r.bits = d
                }
            }, {}],
            49: [function(e, c, l) {
                var o = e("../utils/common"),
                    s = e("./adler32"),
                    r = e("./crc32"),
                    f = e("./inffast"),
                    y = e("./inftrees"),
                    _ = 1,
                    h = 2,
                    S = 0,
                    m = -2,
                    w = 1,
                    i = 852,
                    p = 592;
                function g($) {
                    return ($ >>> 24 & 255) + ($ >>> 8 & 65280) + ((65280 & $) << 8) + ((255 & $) << 24)
                }
                function k() {
                    this.mode = 0,
                    this.last = !1,
                    this.wrap = 0,
                    this.havedict = !1,
                    this.flags = 0,
                    this.dmax = 0,
                    this.check = 0,
                    this.total = 0,
                    this.head = null,
                    this.wbits = 0,
                    this.wsize = 0,
                    this.whave = 0,
                    this.wnext = 0,
                    this.window = null,
                    this.hold = 0,
                    this.bits = 0,
                    this.length = 0,
                    this.offset = 0,
                    this.extra = 0,
                    this.lencode = null,
                    this.distcode = null,
                    this.lenbits = 0,
                    this.distbits = 0,
                    this.ncode = 0,
                    this.nlen = 0,
                    this.ndist = 0,
                    this.have = 0,
                    this.next = null,
                    this.lens = new o.Buf16(320),
                    this.work = new o.Buf16(288),
                    this.lendyn = null,
                    this.distdyn = null,
                    this.sane = 0,
                    this.back = 0,
                    this.was = 0
                }
                function d($) {
                    var R;
                    return $ && $.state ? (R = $.state, $.total_in = $.total_out = R.total = 0, $.msg = "", R.wrap && ($.adler = 1 & R.wrap), R.mode = w, R.last = 0, R.havedict = 0, R.dmax = 32768, R.head = null, R.hold = 0, R.bits = 0, R.lencode = R.lendyn = new o.Buf32(i), R.distcode = R.distdyn = new o.Buf32(p), R.sane = 1, R.back = -1, S) : m
                }
                function b($) {
                    var R;
                    return $ && $.state ? ((R = $.state).wsize = 0, R.whave = 0, R.wnext = 0, d($)) : m
                }
                function v($, R) {
                    var u,
                        P;
                    return $ && $.state ? (P = $.state, R < 0 ? (u = 0, R = -R) : (u = 1 + (R >> 4), R < 48 && (R &= 15)), R && (R < 8 || 15 < R) ? m : (P.window !== null && P.wbits !== R && (P.window = null), P.wrap = u, P.wbits = R, b($))) : m
                }
                function C($, R) {
                    var u,
                        P;
                    return $ ? (P = new k, ($.state = P).window = null, (u = v($, R)) !== S && ($.state = null), u) : m
                }
                var E,
                    B,
                    A = !0;
                function T($) {
                    if (A) {
                        var R;
                        for (E = new o.Buf32(512), B = new o.Buf32(32), R = 0; R < 144;)
                            $.lens[R++] = 8;
                        for (; R < 256;)
                            $.lens[R++] = 9;
                        for (; R < 280;)
                            $.lens[R++] = 7;
                        for (; R < 288;)
                            $.lens[R++] = 8;
                        for (y(_, $.lens, 0, 288, E, 0, $.work, {
                            bits: 9
                        }), R = 0; R < 32;)
                            $.lens[R++] = 5;
                        y(h, $.lens, 0, 32, B, 0, $.work, {
                            bits: 5
                        }),
                        A = !1
                    }
                    $.lencode = E,
                    $.lenbits = 9,
                    $.distcode = B,
                    $.distbits = 5
                }
                function j($, R, u, P) {
                    var X,
                        q = $.state;
                    return q.window === null && (q.wsize = 1 << q.wbits, q.wnext = 0, q.whave = 0, q.window = new o.Buf8(q.wsize)), P >= q.wsize ? (o.arraySet(q.window, R, u - q.wsize, q.wsize, 0), q.wnext = 0, q.whave = q.wsize) : (P < (X = q.wsize - q.wnext) && (X = P), o.arraySet(q.window, R, u - P, X, q.wnext), (P -= X) ? (o.arraySet(q.window, R, u - P, P, 0), q.wnext = P, q.whave = q.wsize) : (q.wnext += X, q.wnext === q.wsize && (q.wnext = 0), q.whave < q.wsize && (q.whave += X))), 0
                }
                l.inflateReset = b,
                l.inflateReset2 = v,
                l.inflateResetKeep = d,
                l.inflateInit = function($) {
                    return C($, 15)
                },
                l.inflateInit2 = C,
                l.inflate = function($, R) {
                    var u,
                        P,
                        X,
                        q,
                        tt,
                        H,
                        Q,
                        z,
                        F,
                        J,
                        G,
                        K,
                        ct,
                        ht,
                        et,
                        ot,
                        ut,
                        lt,
                        Ct,
                        kt,
                        a,
                        M,
                        O,
                        L,
                        x = 0,
                        I = new o.Buf8(4),
                        N = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
                    if (!$ || !$.state || !$.output || !$.input && $.avail_in !== 0)
                        return m;
                    (u = $.state).mode === 12 && (u.mode = 13),
                    tt = $.next_out,
                    X = $.output,
                    Q = $.avail_out,
                    q = $.next_in,
                    P = $.input,
                    H = $.avail_in,
                    z = u.hold,
                    F = u.bits,
                    J = H,
                    G = Q,
                    M = S;
                    t:
                    for (;;)
                        switch (u.mode) {
                        case w:
                            if (u.wrap === 0) {
                                u.mode = 13;
                                break
                            }
                            for (; F < 16;) {
                                if (H === 0)
                                    break t;
                                H--,
                                z += P[q++] << F,
                                F += 8
                            }
                            if (2 & u.wrap && z === 35615) {
                                I[u.check = 0] = 255 & z,
                                I[1] = z >>> 8 & 255,
                                u.check = r(u.check, I, 2, 0),
                                F = z = 0,
                                u.mode = 2;
                                break
                            }
                            if (u.flags = 0, u.head && (u.head.done = !1), !(1 & u.wrap) || (((255 & z) << 8) + (z >> 8)) % 31) {
                                $.msg = "incorrect header check",
                                u.mode = 30;
                                break
                            }
                            if ((15 & z) != 8) {
                                $.msg = "unknown compression method",
                                u.mode = 30;
                                break
                            }
                            if (F -= 4, a = 8 + (15 & (z >>>= 4)), u.wbits === 0)
                                u.wbits = a;
                            else if (a > u.wbits) {
                                $.msg = "invalid window size",
                                u.mode = 30;
                                break
                            }
                            u.dmax = 1 << a,
                            $.adler = u.check = 1,
                            u.mode = 512 & z ? 10 : 12,
                            F = z = 0;
                            break;
                        case 2:
                            for (; F < 16;) {
                                if (H === 0)
                                    break t;
                                H--,
                                z += P[q++] << F,
                                F += 8
                            }
                            if (u.flags = z, (255 & u.flags) != 8) {
                                $.msg = "unknown compression method",
                                u.mode = 30;
                                break
                            }
                            if (57344 & u.flags) {
                                $.msg = "unknown header flags set",
                                u.mode = 30;
                                break
                            }
                            u.head && (u.head.text = z >> 8 & 1),
                            512 & u.flags && (I[0] = 255 & z, I[1] = z >>> 8 & 255, u.check = r(u.check, I, 2, 0)),
                            F = z = 0,
                            u.mode = 3;
                        case 3:
                            for (; F < 32;) {
                                if (H === 0)
                                    break t;
                                H--,
                                z += P[q++] << F,
                                F += 8
                            }
                            u.head && (u.head.time = z),
                            512 & u.flags && (I[0] = 255 & z, I[1] = z >>> 8 & 255, I[2] = z >>> 16 & 255, I[3] = z >>> 24 & 255, u.check = r(u.check, I, 4, 0)),
                            F = z = 0,
                            u.mode = 4;
                        case 4:
                            for (; F < 16;) {
                                if (H === 0)
                                    break t;
                                H--,
                                z += P[q++] << F,
                                F += 8
                            }
                            u.head && (u.head.xflags = 255 & z, u.head.os = z >> 8),
                            512 & u.flags && (I[0] = 255 & z, I[1] = z >>> 8 & 255, u.check = r(u.check, I, 2, 0)),
                            F = z = 0,
                            u.mode = 5;
                        case 5:
                            if (1024 & u.flags) {
                                for (; F < 16;) {
                                    if (H === 0)
                                        break t;
                                    H--,
                                    z += P[q++] << F,
                                    F += 8
                                }
                                u.length = z,
                                u.head && (u.head.extra_len = z),
                                512 & u.flags && (I[0] = 255 & z, I[1] = z >>> 8 & 255, u.check = r(u.check, I, 2, 0)),
                                F = z = 0
                            } else
                                u.head && (u.head.extra = null);
                            u.mode = 6;
                        case 6:
                            if (1024 & u.flags && (H < (K = u.length) && (K = H), K && (u.head && (a = u.head.extra_len - u.length, u.head.extra || (u.head.extra = new Array(u.head.extra_len)), o.arraySet(u.head.extra, P, q, K, a)), 512 & u.flags && (u.check = r(u.check, P, K, q)), H -= K, q += K, u.length -= K), u.length))
                                break t;
                            u.length = 0,
                            u.mode = 7;
                        case 7:
                            if (2048 & u.flags) {
                                if (H === 0)
                                    break t;
                                for (K = 0; a = P[q + K++], u.head && a && u.length < 65536 && (u.head.name += String.fromCharCode(a)), a && K < H;)
                                    ;
                                if (512 & u.flags && (u.check = r(u.check, P, K, q)), H -= K, q += K, a)
                                    break t
                            } else
                                u.head && (u.head.name = null);
                            u.length = 0,
                            u.mode = 8;
                        case 8:
                            if (4096 & u.flags) {
                                if (H === 0)
                                    break t;
                                for (K = 0; a = P[q + K++], u.head && a && u.length < 65536 && (u.head.comment += String.fromCharCode(a)), a && K < H;)
                                    ;
                                if (512 & u.flags && (u.check = r(u.check, P, K, q)), H -= K, q += K, a)
                                    break t
                            } else
                                u.head && (u.head.comment = null);
                            u.mode = 9;
                        case 9:
                            if (512 & u.flags) {
                                for (; F < 16;) {
                                    if (H === 0)
                                        break t;
                                    H--,
                                    z += P[q++] << F,
                                    F += 8
                                }
                                if (z !== (65535 & u.check)) {
                                    $.msg = "header crc mismatch",
                                    u.mode = 30;
                                    break
                                }
                                F = z = 0
                            }
                            u.head && (u.head.hcrc = u.flags >> 9 & 1, u.head.done = !0),
                            $.adler = u.check = 0,
                            u.mode = 12;
                            break;
                        case 10:
                            for (; F < 32;) {
                                if (H === 0)
                                    break t;
                                H--,
                                z += P[q++] << F,
                                F += 8
                            }
                            $.adler = u.check = g(z),
                            F = z = 0,
                            u.mode = 11;
                        case 11:
                            if (u.havedict === 0)
                                return $.next_out = tt, $.avail_out = Q, $.next_in = q, $.avail_in = H, u.hold = z, u.bits = F, 2;
                            $.adler = u.check = 1,
                            u.mode = 12;
                        case 12:
                            if (R === 5 || R === 6)
                                break t;
                        case 13:
                            if (u.last) {
                                z >>>= 7 & F,
                                F -= 7 & F,
                                u.mode = 27;
                                break
                            }
                            for (; F < 3;) {
                                if (H === 0)
                                    break t;
                                H--,
                                z += P[q++] << F,
                                F += 8
                            }
                            switch (u.last = 1 & z, F -= 1, 3 & (z >>>= 1)) {
                            case 0:
                                u.mode = 14;
                                break;
                            case 1:
                                if (T(u), u.mode = 20, R !== 6)
                                    break;
                                z >>>= 2,
                                F -= 2;
                                break t;
                            case 2:
                                u.mode = 17;
                                break;
                            case 3:
                                $.msg = "invalid block type",
                                u.mode = 30
                            }
                            z >>>= 2,
                            F -= 2;
                            break;
                        case 14:
                            for (z >>>= 7 & F, F -= 7 & F; F < 32;) {
                                if (H === 0)
                                    break t;
                                H--,
                                z += P[q++] << F,
                                F += 8
                            }
                            if ((65535 & z) != (z >>> 16 ^ 65535)) {
                                $.msg = "invalid stored block lengths",
                                u.mode = 30;
                                break
                            }
                            if (u.length = 65535 & z, F = z = 0, u.mode = 15, R === 6)
                                break t;
                        case 15:
                            u.mode = 16;
                        case 16:
                            if (K = u.length) {
                                if (H < K && (K = H), Q < K && (K = Q), K === 0)
                                    break t;
                                o.arraySet(X, P, q, K, tt),
                                H -= K,
                                q += K,
                                Q -= K,
                                tt += K,
                                u.length -= K;
                                break
                            }
                            u.mode = 12;
                            break;
                        case 17:
                            for (; F < 14;) {
                                if (H === 0)
                                    break t;
                                H--,
                                z += P[q++] << F,
                                F += 8
                            }
                            if (u.nlen = 257 + (31 & z), z >>>= 5, F -= 5, u.ndist = 1 + (31 & z), z >>>= 5, F -= 5, u.ncode = 4 + (15 & z), z >>>= 4, F -= 4, 286 < u.nlen || 30 < u.ndist) {
                                $.msg = "too many length or distance symbols",
                                u.mode = 30;
                                break
                            }
                            u.have = 0,
                            u.mode = 18;
                        case 18:
                            for (; u.have < u.ncode;) {
                                for (; F < 3;) {
                                    if (H === 0)
                                        break t;
                                    H--,
                                    z += P[q++] << F,
                                    F += 8
                                }
                                u.lens[N[u.have++]] = 7 & z,
                                z >>>= 3,
                                F -= 3
                            }
                            for (; u.have < 19;)
                                u.lens[N[u.have++]] = 0;
                            if (u.lencode = u.lendyn, u.lenbits = 7, O = {
                                bits: u.lenbits
                            }, M = y(0, u.lens, 0, 19, u.lencode, 0, u.work, O), u.lenbits = O.bits, M) {
                                $.msg = "invalid code lengths set",
                                u.mode = 30;
                                break
                            }
                            u.have = 0,
                            u.mode = 19;
                        case 19:
                            for (; u.have < u.nlen + u.ndist;) {
                                for (; ot = (x = u.lencode[z & (1 << u.lenbits) - 1]) >>> 16 & 255, ut = 65535 & x, !((et = x >>> 24) <= F);) {
                                    if (H === 0)
                                        break t;
                                    H--,
                                    z += P[q++] << F,
                                    F += 8
                                }
                                if (ut < 16)
                                    z >>>= et,
                                    F -= et,
                                    u.lens[u.have++] = ut;
                                else {
                                    if (ut === 16) {
                                        for (L = et + 2; F < L;) {
                                            if (H === 0)
                                                break t;
                                            H--,
                                            z += P[q++] << F,
                                            F += 8
                                        }
                                        if (z >>>= et, F -= et, u.have === 0) {
                                            $.msg = "invalid bit length repeat",
                                            u.mode = 30;
                                            break
                                        }
                                        a = u.lens[u.have - 1],
                                        K = 3 + (3 & z),
                                        z >>>= 2,
                                        F -= 2
                                    } else if (ut === 17) {
                                        for (L = et + 3; F < L;) {
                                            if (H === 0)
                                                break t;
                                            H--,
                                            z += P[q++] << F,
                                            F += 8
                                        }
                                        F -= et,
                                        a = 0,
                                        K = 3 + (7 & (z >>>= et)),
                                        z >>>= 3,
                                        F -= 3
                                    } else {
                                        for (L = et + 7; F < L;) {
                                            if (H === 0)
                                                break t;
                                            H--,
                                            z += P[q++] << F,
                                            F += 8
                                        }
                                        F -= et,
                                        a = 0,
                                        K = 11 + (127 & (z >>>= et)),
                                        z >>>= 7,
                                        F -= 7
                                    }
                                    if (u.have + K > u.nlen + u.ndist) {
                                        $.msg = "invalid bit length repeat",
                                        u.mode = 30;
                                        break
                                    }
                                    for (; K--;)
                                        u.lens[u.have++] = a
                                }
                            }
                            if (u.mode === 30)
                                break;
                            if (u.lens[256] === 0) {
                                $.msg = "invalid code -- missing end-of-block",
                                u.mode = 30;
                                break
                            }
                            if (u.lenbits = 9, O = {
                                bits: u.lenbits
                            }, M = y(_, u.lens, 0, u.nlen, u.lencode, 0, u.work, O), u.lenbits = O.bits, M) {
                                $.msg = "invalid literal/lengths set",
                                u.mode = 30;
                                break
                            }
                            if (u.distbits = 6, u.distcode = u.distdyn, O = {
                                bits: u.distbits
                            }, M = y(h, u.lens, u.nlen, u.ndist, u.distcode, 0, u.work, O), u.distbits = O.bits, M) {
                                $.msg = "invalid distances set",
                                u.mode = 30;
                                break
                            }
                            if (u.mode = 20, R === 6)
                                break t;
                        case 20:
                            u.mode = 21;
                        case 21:
                            if (6 <= H && 258 <= Q) {
                                $.next_out = tt,
                                $.avail_out = Q,
                                $.next_in = q,
                                $.avail_in = H,
                                u.hold = z,
                                u.bits = F,
                                f($, G),
                                tt = $.next_out,
                                X = $.output,
                                Q = $.avail_out,
                                q = $.next_in,
                                P = $.input,
                                H = $.avail_in,
                                z = u.hold,
                                F = u.bits,
                                u.mode === 12 && (u.back = -1);
                                break
                            }
                            for (u.back = 0; ot = (x = u.lencode[z & (1 << u.lenbits) - 1]) >>> 16 & 255, ut = 65535 & x, !((et = x >>> 24) <= F);) {
                                if (H === 0)
                                    break t;
                                H--,
                                z += P[q++] << F,
                                F += 8
                            }
                            if (ot && !(240 & ot)) {
                                for (lt = et, Ct = ot, kt = ut; ot = (x = u.lencode[kt + ((z & (1 << lt + Ct) - 1) >> lt)]) >>> 16 & 255, ut = 65535 & x, !(lt + (et = x >>> 24) <= F);) {
                                    if (H === 0)
                                        break t;
                                    H--,
                                    z += P[q++] << F,
                                    F += 8
                                }
                                z >>>= lt,
                                F -= lt,
                                u.back += lt
                            }
                            if (z >>>= et, F -= et, u.back += et, u.length = ut, ot === 0) {
                                u.mode = 26;
                                break
                            }
                            if (32 & ot) {
                                u.back = -1,
                                u.mode = 12;
                                break
                            }
                            if (64 & ot) {
                                $.msg = "invalid literal/length code",
                                u.mode = 30;
                                break
                            }
                            u.extra = 15 & ot,
                            u.mode = 22;
                        case 22:
                            if (u.extra) {
                                for (L = u.extra; F < L;) {
                                    if (H === 0)
                                        break t;
                                    H--,
                                    z += P[q++] << F,
                                    F += 8
                                }
                                u.length += z & (1 << u.extra) - 1,
                                z >>>= u.extra,
                                F -= u.extra,
                                u.back += u.extra
                            }
                            u.was = u.length,
                            u.mode = 23;
                        case 23:
                            for (; ot = (x = u.distcode[z & (1 << u.distbits) - 1]) >>> 16 & 255, ut = 65535 & x, !((et = x >>> 24) <= F);) {
                                if (H === 0)
                                    break t;
                                H--,
                                z += P[q++] << F,
                                F += 8
                            }
                            if (!(240 & ot)) {
                                for (lt = et, Ct = ot, kt = ut; ot = (x = u.distcode[kt + ((z & (1 << lt + Ct) - 1) >> lt)]) >>> 16 & 255, ut = 65535 & x, !(lt + (et = x >>> 24) <= F);) {
                                    if (H === 0)
                                        break t;
                                    H--,
                                    z += P[q++] << F,
                                    F += 8
                                }
                                z >>>= lt,
                                F -= lt,
                                u.back += lt
                            }
                            if (z >>>= et, F -= et, u.back += et, 64 & ot) {
                                $.msg = "invalid distance code",
                                u.mode = 30;
                                break
                            }
                            u.offset = ut,
                            u.extra = 15 & ot,
                            u.mode = 24;
                        case 24:
                            if (u.extra) {
                                for (L = u.extra; F < L;) {
                                    if (H === 0)
                                        break t;
                                    H--,
                                    z += P[q++] << F,
                                    F += 8
                                }
                                u.offset += z & (1 << u.extra) - 1,
                                z >>>= u.extra,
                                F -= u.extra,
                                u.back += u.extra
                            }
                            if (u.offset > u.dmax) {
                                $.msg = "invalid distance too far back",
                                u.mode = 30;
                                break
                            }
                            u.mode = 25;
                        case 25:
                            if (Q === 0)
                                break t;
                            if (K = G - Q, u.offset > K) {
                                if ((K = u.offset - K) > u.whave && u.sane) {
                                    $.msg = "invalid distance too far back",
                                    u.mode = 30;
                                    break
                                }
                                ct = K > u.wnext ? (K -= u.wnext, u.wsize - K) : u.wnext - K,
                                K > u.length && (K = u.length),
                                ht = u.window
                            } else
                                ht = X,
                                ct = tt - u.offset,
                                K = u.length;
                            for (Q < K && (K = Q), Q -= K, u.length -= K; X[tt++] = ht[ct++], --K;)
                                ;
                            u.length === 0 && (u.mode = 21);
                            break;
                        case 26:
                            if (Q === 0)
                                break t;
                            X[tt++] = u.length,
                            Q--,
                            u.mode = 21;
                            break;
                        case 27:
                            if (u.wrap) {
                                for (; F < 32;) {
                                    if (H === 0)
                                        break t;
                                    H--,
                                    z |= P[q++] << F,
                                    F += 8
                                }
                                if (G -= Q, $.total_out += G, u.total += G, G && ($.adler = u.check = u.flags ? r(u.check, X, G, tt - G) : s(u.check, X, G, tt - G)), G = Q, (u.flags ? z : g(z)) !== u.check) {
                                    $.msg = "incorrect data check",
                                    u.mode = 30;
                                    break
                                }
                                F = z = 0
                            }
                            u.mode = 28;
                        case 28:
                            if (u.wrap && u.flags) {
                                for (; F < 32;) {
                                    if (H === 0)
                                        break t;
                                    H--,
                                    z += P[q++] << F,
                                    F += 8
                                }
                                if (z !== (4294967295 & u.total)) {
                                    $.msg = "incorrect length check",
                                    u.mode = 30;
                                    break
                                }
                                F = z = 0
                            }
                            u.mode = 29;
                        case 29:
                            M = 1;
                            break t;
                        case 30:
                            M = -3;
                            break t;
                        case 31:
                            return -4;
                        case 32:
                        default:
                            return m
                        }
                    return $.next_out = tt, $.avail_out = Q, $.next_in = q, $.avail_in = H, u.hold = z, u.bits = F, (u.wsize || G !== $.avail_out && u.mode < 30 && (u.mode < 27 || R !== 4)) && j($, $.output, $.next_out, G - $.avail_out) ? (u.mode = 31, -4) : (J -= $.avail_in, G -= $.avail_out, $.total_in += J, $.total_out += G, u.total += G, u.wrap && G && ($.adler = u.check = u.flags ? r(u.check, X, G, $.next_out - G) : s(u.check, X, G, $.next_out - G)), $.data_type = u.bits + (u.last ? 64 : 0) + (u.mode === 12 ? 128 : 0) + (u.mode === 20 || u.mode === 15 ? 256 : 0), (J == 0 && G === 0 || R === 4) && M === S && (M = -5), M)
                },
                l.inflateEnd = function($) {
                    if (!$ || !$.state)
                        return m;
                    var R = $.state;
                    return R.window && (R.window = null), $.state = null, S
                },
                l.inflateGetHeader = function($, R) {
                    var u;
                    return $ && $.state && 2 & (u = $.state).wrap ? ((u.head = R).done = !1, S) : m
                },
                l.inflateSetDictionary = function($, R) {
                    var u,
                        P = R.length;
                    return $ && $.state ? (u = $.state).wrap !== 0 && u.mode !== 11 ? m : u.mode === 11 && s(1, R, P, 0) !== u.check ? -3 : j($, R, P, P) ? (u.mode = 31, -4) : (u.havedict = 1, S) : m
                },
                l.inflateInfo = "pako inflate (from Nodeca project)"
            }, {
                "../utils/common": 41,
                "./adler32": 43,
                "./crc32": 45,
                "./inffast": 48,
                "./inftrees": 50
            }],
            50: [function(e, c, l) {
                var o = e("../utils/common"),
                    s = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
                    r = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78],
                    f = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0],
                    y = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
                c.exports = function(_, h, S, m, w, i, p, g) {
                    var k,
                        d,
                        b,
                        v,
                        C,
                        E,
                        B,
                        A,
                        T,
                        j = g.bits,
                        $ = 0,
                        R = 0,
                        u = 0,
                        P = 0,
                        X = 0,
                        q = 0,
                        tt = 0,
                        H = 0,
                        Q = 0,
                        z = 0,
                        F = null,
                        J = 0,
                        G = new o.Buf16(16),
                        K = new o.Buf16(16),
                        ct = null,
                        ht = 0;
                    for ($ = 0; $ <= 15; $++)
                        G[$] = 0;
                    for (R = 0; R < m; R++)
                        G[h[S + R]]++;
                    for (X = j, P = 15; 1 <= P && G[P] === 0; P--)
                        ;
                    if (P < X && (X = P), P === 0)
                        return w[i++] = 20971520, w[i++] = 20971520, g.bits = 1, 0;
                    for (u = 1; u < P && G[u] === 0; u++)
                        ;
                    for (X < u && (X = u), $ = H = 1; $ <= 15; $++)
                        if (H <<= 1, (H -= G[$]) < 0)
                            return -1;
                    if (0 < H && (_ === 0 || P !== 1))
                        return -1;
                    for (K[1] = 0, $ = 1; $ < 15; $++)
                        K[$ + 1] = K[$] + G[$];
                    for (R = 0; R < m; R++)
                        h[S + R] !== 0 && (p[K[h[S + R]]++] = R);
                    if (E = _ === 0 ? (F = ct = p, 19) : _ === 1 ? (F = s, J -= 257, ct = r, ht -= 257, 256) : (F = f, ct = y, -1), $ = u, C = i, tt = R = z = 0, b = -1, v = (Q = 1 << (q = X)) - 1, _ === 1 && 852 < Q || _ === 2 && 592 < Q)
                        return 1;
                    for (;;) {
                        for (B = $ - tt, T = p[R] < E ? (A = 0, p[R]) : p[R] > E ? (A = ct[ht + p[R]], F[J + p[R]]) : (A = 96, 0), k = 1 << $ - tt, u = d = 1 << q; w[C + (z >> tt) + (d -= k)] = B << 24 | A << 16 | T | 0, d !== 0;)
                            ;
                        for (k = 1 << $ - 1; z & k;)
                            k >>= 1;
                        if (k !== 0 ? (z &= k - 1, z += k) : z = 0, R++, --G[$] == 0) {
                            if ($ === P)
                                break;
                            $ = h[S + p[R]]
                        }
                        if (X < $ && (z & v) !== b) {
                            for (tt === 0 && (tt = X), C += u, H = 1 << (q = $ - tt); q + tt < P && !((H -= G[q + tt]) <= 0);)
                                q++,
                                H <<= 1;
                            if (Q += 1 << q, _ === 1 && 852 < Q || _ === 2 && 592 < Q)
                                return 1;
                            w[b = z & v] = X << 24 | q << 16 | C - i | 0
                        }
                    }
                    return z !== 0 && (w[C + z] = $ - tt << 24 | 64 << 16 | 0), g.bits = X, 0
                }
            }, {
                "../utils/common": 41
            }],
            51: [function(e, c, l) {
                c.exports = {
                    2: "need dictionary",
                    1: "stream end",
                    0: "",
                    "-1": "file error",
                    "-2": "stream error",
                    "-3": "data error",
                    "-4": "insufficient memory",
                    "-5": "buffer error",
                    "-6": "incompatible version"
                }
            }, {}],
            52: [function(e, c, l) {
                var o = e("../utils/common"),
                    s = 0,
                    r = 1;
                function f(x) {
                    for (var I = x.length; 0 <= --I;)
                        x[I] = 0
                }
                var y = 0,
                    _ = 29,
                    h = 256,
                    S = h + 1 + _,
                    m = 30,
                    w = 19,
                    i = 2 * S + 1,
                    p = 15,
                    g = 16,
                    k = 7,
                    d = 256,
                    b = 16,
                    v = 17,
                    C = 18,
                    E = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0],
                    B = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
                    A = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
                    T = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
                    j = new Array(2 * (S + 2));
                f(j);
                var $ = new Array(2 * m);
                f($);
                var R = new Array(512);
                f(R);
                var u = new Array(256);
                f(u);
                var P = new Array(_);
                f(P);
                var X,
                    q,
                    tt,
                    H = new Array(m);
                function Q(x, I, N, U, D) {
                    this.static_tree = x,
                    this.extra_bits = I,
                    this.extra_base = N,
                    this.elems = U,
                    this.max_length = D,
                    this.has_stree = x && x.length
                }
                function z(x, I) {
                    this.dyn_tree = x,
                    this.max_code = 0,
                    this.stat_desc = I
                }
                function F(x) {
                    return x < 256 ? R[x] : R[256 + (x >>> 7)]
                }
                function J(x, I) {
                    x.pending_buf[x.pending++] = 255 & I,
                    x.pending_buf[x.pending++] = I >>> 8 & 255
                }
                function G(x, I, N) {
                    x.bi_valid > g - N ? (x.bi_buf |= I << x.bi_valid & 65535, J(x, x.bi_buf), x.bi_buf = I >> g - x.bi_valid, x.bi_valid += N - g) : (x.bi_buf |= I << x.bi_valid & 65535, x.bi_valid += N)
                }
                function K(x, I, N) {
                    G(x, N[2 * I], N[2 * I + 1])
                }
                function ct(x, I) {
                    for (var N = 0; N |= 1 & x, x >>>= 1, N <<= 1, 0 < --I;)
                        ;
                    return N >>> 1
                }
                function ht(x, I, N) {
                    var U,
                        D,
                        W = new Array(p + 1),
                        V = 0;
                    for (U = 1; U <= p; U++)
                        W[U] = V = V + N[U - 1] << 1;
                    for (D = 0; D <= I; D++) {
                        var Z = x[2 * D + 1];
                        Z !== 0 && (x[2 * D] = ct(W[Z]++, Z))
                    }
                }
                function et(x) {
                    var I;
                    for (I = 0; I < S; I++)
                        x.dyn_ltree[2 * I] = 0;
                    for (I = 0; I < m; I++)
                        x.dyn_dtree[2 * I] = 0;
                    for (I = 0; I < w; I++)
                        x.bl_tree[2 * I] = 0;
                    x.dyn_ltree[2 * d] = 1,
                    x.opt_len = x.static_len = 0,
                    x.last_lit = x.matches = 0
                }
                function ot(x) {
                    8 < x.bi_valid ? J(x, x.bi_buf) : 0 < x.bi_valid && (x.pending_buf[x.pending++] = x.bi_buf),
                    x.bi_buf = 0,
                    x.bi_valid = 0
                }
                function ut(x, I, N, U) {
                    var D = 2 * I,
                        W = 2 * N;
                    return x[D] < x[W] || x[D] === x[W] && U[I] <= U[N]
                }
                function lt(x, I, N) {
                    for (var U = x.heap[N], D = N << 1; D <= x.heap_len && (D < x.heap_len && ut(I, x.heap[D + 1], x.heap[D], x.depth) && D++, !ut(I, U, x.heap[D], x.depth));)
                        x.heap[N] = x.heap[D],
                        N = D,
                        D <<= 1;
                    x.heap[N] = U
                }
                function Ct(x, I, N) {
                    var U,
                        D,
                        W,
                        V,
                        Z = 0;
                    if (x.last_lit !== 0)
                        for (; U = x.pending_buf[x.d_buf + 2 * Z] << 8 | x.pending_buf[x.d_buf + 2 * Z + 1], D = x.pending_buf[x.l_buf + Z], Z++, U === 0 ? K(x, D, I) : (K(x, (W = u[D]) + h + 1, I), (V = E[W]) !== 0 && G(x, D -= P[W], V), K(x, W = F(--U), N), (V = B[W]) !== 0 && G(x, U -= H[W], V)), Z < x.last_lit;)
                            ;
                    K(x, d, I)
                }
                function kt(x, I) {
                    var N,
                        U,
                        D,
                        W = I.dyn_tree,
                        V = I.stat_desc.static_tree,
                        Z = I.stat_desc.has_stree,
                        Y = I.stat_desc.elems,
                        it = -1;
                    for (x.heap_len = 0, x.heap_max = i, N = 0; N < Y; N++)
                        W[2 * N] !== 0 ? (x.heap[++x.heap_len] = it = N, x.depth[N] = 0) : W[2 * N + 1] = 0;
                    for (; x.heap_len < 2;)
                        W[2 * (D = x.heap[++x.heap_len] = it < 2 ? ++it : 0)] = 1,
                        x.depth[D] = 0,
                        x.opt_len--,
                        Z && (x.static_len -= V[2 * D + 1]);
                    for (I.max_code = it, N = x.heap_len >> 1; 1 <= N; N--)
                        lt(x, W, N);
                    for (D = Y; N = x.heap[1], x.heap[1] = x.heap[x.heap_len--], lt(x, W, 1), U = x.heap[1], x.heap[--x.heap_max] = N, x.heap[--x.heap_max] = U, W[2 * D] = W[2 * N] + W[2 * U], x.depth[D] = (x.depth[N] >= x.depth[U] ? x.depth[N] : x.depth[U]) + 1, W[2 * N + 1] = W[2 * U + 1] = D, x.heap[1] = D++, lt(x, W, 1), 2 <= x.heap_len;)
                        ;
                    x.heap[--x.heap_max] = x.heap[1],
                    function(rt, gt) {
                        var Jt,
                            St,
                            Qt,
                            dt,
                            se,
                            Be,
                            Bt = gt.dyn_tree,
                            nr = gt.max_code,
                            zn = gt.stat_desc.static_tree,
                            On = gt.stat_desc.has_stree,
                            Pn = gt.stat_desc.extra_bits,
                            or = gt.stat_desc.extra_base,
                            te = gt.stat_desc.max_length,
                            ie = 0;
                        for (dt = 0; dt <= p; dt++)
                            rt.bl_count[dt] = 0;
                        for (Bt[2 * rt.heap[rt.heap_max] + 1] = 0, Jt = rt.heap_max + 1; Jt < i; Jt++)
                            te < (dt = Bt[2 * Bt[2 * (St = rt.heap[Jt]) + 1] + 1] + 1) && (dt = te, ie++),
                            Bt[2 * St + 1] = dt,
                            nr < St || (rt.bl_count[dt]++, se = 0, or <= St && (se = Pn[St - or]), Be = Bt[2 * St], rt.opt_len += Be * (dt + se), On && (rt.static_len += Be * (zn[2 * St + 1] + se)));
                        if (ie !== 0) {
                            do {
                                for (dt = te - 1; rt.bl_count[dt] === 0;)
                                    dt--;
                                rt.bl_count[dt]--,
                                rt.bl_count[dt + 1] += 2,
                                rt.bl_count[te]--,
                                ie -= 2
                            } while (0 < ie);
                            for (dt = te; dt !== 0; dt--)
                                for (St = rt.bl_count[dt]; St !== 0;)
                                    nr < (Qt = rt.heap[--Jt]) || (Bt[2 * Qt + 1] !== dt && (rt.opt_len += (dt - Bt[2 * Qt + 1]) * Bt[2 * Qt], Bt[2 * Qt + 1] = dt), St--)
                        }
                    }(x, I),
                    ht(W, it, x.bl_count)
                }
                function a(x, I, N) {
                    var U,
                        D,
                        W = -1,
                        V = I[1],
                        Z = 0,
                        Y = 7,
                        it = 4;
                    for (V === 0 && (Y = 138, it = 3), I[2 * (N + 1) + 1] = 65535, U = 0; U <= N; U++)
                        D = V,
                        V = I[2 * (U + 1) + 1],
                        ++Z < Y && D === V || (Z < it ? x.bl_tree[2 * D] += Z : D !== 0 ? (D !== W && x.bl_tree[2 * D]++, x.bl_tree[2 * b]++) : Z <= 10 ? x.bl_tree[2 * v]++ : x.bl_tree[2 * C]++, W = D, it = (Z = 0) === V ? (Y = 138, 3) : D === V ? (Y = 6, 3) : (Y = 7, 4))
                }
                function M(x, I, N) {
                    var U,
                        D,
                        W = -1,
                        V = I[1],
                        Z = 0,
                        Y = 7,
                        it = 4;
                    for (V === 0 && (Y = 138, it = 3), U = 0; U <= N; U++)
                        if (D = V, V = I[2 * (U + 1) + 1], !(++Z < Y && D === V)) {
                            if (Z < it)
                                for (; K(x, D, x.bl_tree), --Z != 0;)
                                    ;
                            else
                                D !== 0 ? (D !== W && (K(x, D, x.bl_tree), Z--), K(x, b, x.bl_tree), G(x, Z - 3, 2)) : Z <= 10 ? (K(x, v, x.bl_tree), G(x, Z - 3, 3)) : (K(x, C, x.bl_tree), G(x, Z - 11, 7));
                            W = D,
                            it = (Z = 0) === V ? (Y = 138, 3) : D === V ? (Y = 6, 3) : (Y = 7, 4)
                        }
                }
                f(H);
                var O = !1;
                function L(x, I, N, U) {
                    G(x, (y << 1) + (U ? 1 : 0), 3),
                    function(D, W, V, Z) {
                        ot(D),
                        Z && (J(D, V), J(D, ~V)),
                        o.arraySet(D.pending_buf, D.window, W, V, D.pending),
                        D.pending += V
                    }(x, I, N, !0)
                }
                l._tr_init = function(x) {
                    O || (function() {
                        var I,
                            N,
                            U,
                            D,
                            W,
                            V = new Array(p + 1);
                        for (D = U = 0; D < _ - 1; D++)
                            for (P[D] = U, I = 0; I < 1 << E[D]; I++)
                                u[U++] = D;
                        for (u[U - 1] = D, D = W = 0; D < 16; D++)
                            for (H[D] = W, I = 0; I < 1 << B[D]; I++)
                                R[W++] = D;
                        for (W >>= 7; D < m; D++)
                            for (H[D] = W << 7, I = 0; I < 1 << B[D] - 7; I++)
                                R[256 + W++] = D;
                        for (N = 0; N <= p; N++)
                            V[N] = 0;
                        for (I = 0; I <= 143;)
                            j[2 * I + 1] = 8,
                            I++,
                            V[8]++;
                        for (; I <= 255;)
                            j[2 * I + 1] = 9,
                            I++,
                            V[9]++;
                        for (; I <= 279;)
                            j[2 * I + 1] = 7,
                            I++,
                            V[7]++;
                        for (; I <= 287;)
                            j[2 * I + 1] = 8,
                            I++,
                            V[8]++;
                        for (ht(j, S + 1, V), I = 0; I < m; I++)
                            $[2 * I + 1] = 5,
                            $[2 * I] = ct(I, 5);
                        X = new Q(j, E, h + 1, S, p),
                        q = new Q($, B, 0, m, p),
                        tt = new Q(new Array(0), A, 0, w, k)
                    }(), O = !0),
                    x.l_desc = new z(x.dyn_ltree, X),
                    x.d_desc = new z(x.dyn_dtree, q),
                    x.bl_desc = new z(x.bl_tree, tt),
                    x.bi_buf = 0,
                    x.bi_valid = 0,
                    et(x)
                },
                l._tr_stored_block = L,
                l._tr_flush_block = function(x, I, N, U) {
                    var D,
                        W,
                        V = 0;
                    0 < x.level ? (x.strm.data_type === 2 && (x.strm.data_type = function(Z) {
                        var Y,
                            it = 4093624447;
                        for (Y = 0; Y <= 31; Y++, it >>>= 1)
                            if (1 & it && Z.dyn_ltree[2 * Y] !== 0)
                                return s;
                        if (Z.dyn_ltree[18] !== 0 || Z.dyn_ltree[20] !== 0 || Z.dyn_ltree[26] !== 0)
                            return r;
                        for (Y = 32; Y < h; Y++)
                            if (Z.dyn_ltree[2 * Y] !== 0)
                                return r;
                        return s
                    }(x)), kt(x, x.l_desc), kt(x, x.d_desc), V = function(Z) {
                        var Y;
                        for (a(Z, Z.dyn_ltree, Z.l_desc.max_code), a(Z, Z.dyn_dtree, Z.d_desc.max_code), kt(Z, Z.bl_desc), Y = w - 1; 3 <= Y && Z.bl_tree[2 * T[Y] + 1] === 0; Y--)
                            ;
                        return Z.opt_len += 3 * (Y + 1) + 5 + 5 + 4, Y
                    }(x), D = x.opt_len + 3 + 7 >>> 3, (W = x.static_len + 3 + 7 >>> 3) <= D && (D = W)) : D = W = N + 5,
                    N + 4 <= D && I !== -1 ? L(x, I, N, U) : x.strategy === 4 || W === D ? (G(x, 2 + (U ? 1 : 0), 3), Ct(x, j, $)) : (G(x, 4 + (U ? 1 : 0), 3), function(Z, Y, it, rt) {
                        var gt;
                        for (G(Z, Y - 257, 5), G(Z, it - 1, 5), G(Z, rt - 4, 4), gt = 0; gt < rt; gt++)
                            G(Z, Z.bl_tree[2 * T[gt] + 1], 3);
                        M(Z, Z.dyn_ltree, Y - 1),
                        M(Z, Z.dyn_dtree, it - 1)
                    }(x, x.l_desc.max_code + 1, x.d_desc.max_code + 1, V + 1), Ct(x, x.dyn_ltree, x.dyn_dtree)),
                    et(x),
                    U && ot(x)
                },
                l._tr_tally = function(x, I, N) {
                    return x.pending_buf[x.d_buf + 2 * x.last_lit] = I >>> 8 & 255, x.pending_buf[x.d_buf + 2 * x.last_lit + 1] = 255 & I, x.pending_buf[x.l_buf + x.last_lit] = 255 & N, x.last_lit++, I === 0 ? x.dyn_ltree[2 * N]++ : (x.matches++, I--, x.dyn_ltree[2 * (u[N] + h + 1)]++, x.dyn_dtree[2 * F(I)]++), x.last_lit === x.lit_bufsize - 1
                },
                l._tr_align = function(x) {
                    G(x, 2, 3),
                    K(x, d, j),
                    function(I) {
                        I.bi_valid === 16 ? (J(I, I.bi_buf), I.bi_buf = 0, I.bi_valid = 0) : 8 <= I.bi_valid && (I.pending_buf[I.pending++] = 255 & I.bi_buf, I.bi_buf >>= 8, I.bi_valid -= 8)
                    }(x)
                }
            }, {
                "../utils/common": 41
            }],
            53: [function(e, c, l) {
                c.exports = function() {
                    this.input = null,
                    this.next_in = 0,
                    this.avail_in = 0,
                    this.total_in = 0,
                    this.output = null,
                    this.next_out = 0,
                    this.avail_out = 0,
                    this.total_out = 0,
                    this.msg = "",
                    this.state = null,
                    this.data_type = 2,
                    this.adler = 0
                }
            }, {}],
            54: [function(e, c, l) {
                (function(o) {
                    (function(s, r) {
                        if (!s.setImmediate) {
                            var f,
                                y,
                                _,
                                h,
                                S = 1,
                                m = {},
                                w = !1,
                                i = s.document,
                                p = Object.getPrototypeOf && Object.getPrototypeOf(s);
                            p = p && p.setTimeout ? p : s,
                            f = {}.toString.call(s.process) === "[object process]" ? function(b) {
                                process.nextTick(function() {
                                    k(b)
                                })
                            } : function() {
                                if (s.postMessage && !s.importScripts) {
                                    var b = !0,
                                        v = s.onmessage;
                                    return s.onmessage = function() {
                                        b = !1
                                    }, s.postMessage("", "*"), s.onmessage = v, b
                                }
                            }() ? (h = "setImmediate$" + Math.random() + "$", s.addEventListener ? s.addEventListener("message", d, !1) : s.attachEvent("onmessage", d), function(b) {
                                s.postMessage(h + b, "*")
                            }) : s.MessageChannel ? ((_ = new MessageChannel).port1.onmessage = function(b) {
                                k(b.data)
                            }, function(b) {
                                _.port2.postMessage(b)
                            }) : i && "onreadystatechange" in i.createElement("script") ? (y = i.documentElement, function(b) {
                                var v = i.createElement("script");
                                v.onreadystatechange = function() {
                                    k(b),
                                    v.onreadystatechange = null,
                                    y.removeChild(v),
                                    v = null
                                },
                                y.appendChild(v)
                            }) : function(b) {
                                setTimeout(k, 0, b)
                            },
                            p.setImmediate = function(b) {
                                typeof b != "function" && (b = new Function("" + b));
                                for (var v = new Array(arguments.length - 1), C = 0; C < v.length; C++)
                                    v[C] = arguments[C + 1];
                                var E = {
                                    callback: b,
                                    args: v
                                };
                                return m[S] = E, f(S), S++
                            },
                            p.clearImmediate = g
                        }
                        function g(b) {
                            delete m[b]
                        }
                        function k(b) {
                            if (w)
                                setTimeout(k, 0, b);
                            else {
                                var v = m[b];
                                if (v) {
                                    w = !0;
                                    try {
                                        (function(C) {
                                            var E = C.callback,
                                                B = C.args;
                                            switch (B.length) {
                                            case 0:
                                                E();
                                                break;
                                            case 1:
                                                E(B[0]);
                                                break;
                                            case 2:
                                                E(B[0], B[1]);
                                                break;
                                            case 3:
                                                E(B[0], B[1], B[2]);
                                                break;
                                            default:
                                                E.apply(r, B)
                                            }
                                        })(v)
                                    } finally {
                                        g(b),
                                        w = !1
                                    }
                                }
                            }
                        }
                        function d(b) {
                            b.source === s && typeof b.data == "string" && b.data.indexOf(h) === 0 && k(+b.data.slice(h.length))
                        }
                    })(typeof self > "u" ? o === void 0 ? this : o : self)
                }).call(this, typeof Rt < "u" ? Rt : typeof self < "u" ? self : typeof window < "u" ? window : {})
            }, {}]
        }, {}, [10])(10)
    })
})(rn);
var po = rn.exports;
const go = fo(po);
document.getElementById("custom-code");
const yo = document.getElementById("heading-fonts"),
    bo = document.getElementById("body-fonts"),
    vo = document.querySelector(".colors-rollout"),
    _o = document.querySelector(".fonts-rollout");
document.addEventListener("keydown", function(t) {
    vo.classList.contains("showing") ? (t.ctrlKey || t.metaKey) && (t.key === "e" || t.key === "E") && (t.preventDefault(), document.getElementById("export").click()) : _o.classList.contains("hide") && (t.ctrlKey || t.metaKey) && (t.key === "e" || t.key === "E") && (t.preventDefault(), document.getElementById("export-font").click())
});
function nn() {
    for (var t = window.location.href, n = document.getElementById("qrcode"); n.firstChild;)
        n.removeChild(n.firstChild);
    new Kt(n, {
        text: t,
        width: 250,
        height: 250
    })
}
function ko() {
    Ye(),
    Lo(),
    Ao(),
    Bo(),
    $o(),
    nn(),
    on()
}
const wo = document.getElementById("download"),
    xo = document.getElementById("file-name-input"),
    me = document.getElementById("error-message");
wo.addEventListener("click", () => {
    const t = wt.update(),
        e = document.getElementById("file-name-input").value.trim();
    if (!Co(e)) {
        me.textContent = "Uh-oh! File name should include only A-Z, a-z, 0-9, -, _ and .",
        me.style.display = "block";
        return
    }
    me.style.display = "none";
    const c = Object.values(wt.update()),
        l = document.createElement("canvas"),
        o = l.getContext("2d");
    l.width = 5 * 100,
    l.height = 100;
    for (let m = 0; m < 6 && !(m >= 5); m++)
        o.fillStyle = c[m],
        o.fillRect(m * 100, 0, 100, 100);
    const s = l.toDataURL("image/png"),
        r = jn(s),
        f = new File([r], e + "-palette.png", {
            type: "image/png"
        }),
        y = `Your selected colors:

    Text: ${
        t.text} - ${jt(t.text)} - ${Wt(t.text)}
    Background: ${t.bg} - ${jt(t.bg)} - ${Wt(t.bg)}
    Primary: ${t.primary} - ${jt(t.primary)} - ${Wt(t.primary)}
    Secondary: ${t.secondary} - ${jt(t.secondary)} - ${Wt(t.secondary)}
    Accent: ${t.accent} - ${jt(t.accent)} - ${Wt(t.accent)}

Realtime Colors link for selected colors: ${
        window.location.href}

Thanks for using RealtimeColors.com!`

        ,
        _ = new Blob([y], {
            type: "text/plain"
        }),
        h = new File([_], e + "-codes.txt", {
            type: "text/plain"
        }),
        S = new go;
    S.file(f.name, f),
    S.file(h.name, h),
    S.generateAsync({
        type: "blob"
    }).then(function(m) {
        mo.saveAs(m, e + ".zip")
    })
});
xo.addEventListener("input", () => {
    me.style.display = "none"
});
function Co(t) {
    return /^[a-zA-Z0-9-_]+(\.[a-zA-Z0-9]+)?$/.test(t)
}
function So(t, n) {
    const e = document.createElement("span");
    e.innerText = n,
    e.classList.add("hex-value"),
    e.dataset.originalValue = n,
    t.appendChild(e)
}
function at(t, n) {
    switch (n) {
    case "hex":
        return t;
    case "rgb":
        return jt(t);
    case "hsl":
        return Wt(t);
    case "oklab":
        return Ur(t);
    case "oklch":
        return jr(t);
    default:
        return t
    }
}
function le(t, n) {
    switch (n) {
    case "hex":
        return t;
    case "rgb":
        return Or(t);
    case "hsl":
        return Pr(t);
    case "oklab":
        return qr(t);
    case "oklch":
        return Hr(t);
    default:
        return t
    }
}
function on() {
    const t = wt.update();
    let n = {
        text: [],
        bg: [],
        primary: [],
        secondary: [],
        accent: []
    };
    const e = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95],
        c = document.querySelector(".text-shades"),
        l = document.querySelector(".bg-shades"),
        o = document.querySelector(".primary-shades"),
        s = document.querySelector(".secondary-shades"),
        r = document.querySelector(".accent-shades");
    function f(i, p) {
        return `hsl(${i.h}, ${i.s}%, ${p}%)`
    }
    c.innerHTML = "",
    l.innerHTML = "",
    o.innerHTML = "",
    s.innerHTML = "",
    r.innerHTML = "";
    const y = [];
    function _(i, p, g) {
        y.some(d => Math.abs(d - i.h) < 10);
        const k = [];
        for (let d = 0; d < e.length; d++) {
            const b = f(i, e[d]),
                v = document.createElement("div");
            v.style.background = b;
            const C = yt(i.h, i.s, e[d]);
            k.push(C),
            So(v, C),
            p.appendChild(v)
        }
        y.push(i.h),
        n[g].push(k)
    }
    Vt(document.querySelector(".shades-hex")),
    _(st(t.text), c, "text"),
    _(st(t.bg), l, "bg"),
    _(st(t.primary), o, "primary"),
    _(st(t.secondary), s, "secondary"),
    _(st(t.accent), r, "accent");
    const h = document.querySelectorAll(".shade-cont > * > div");
    document.querySelectorAll(".code-type");
    function S(i) {
        h.forEach(p => {
            const g = p.querySelector(".hex-value");
            g && (g.textContent = at(g.dataset.originalValue, i))
        })
    }
    return document.querySelectorAll(".shade-code-type").forEach(i => {
        i.addEventListener("click", () => {
            const p = i.textContent.toLowerCase();
            S(p),
            Vt(i)
        })
    }), document.querySelectorAll(".shade-cont > * > div").forEach(i => {
        i.addEventListener("mouseover", function() {
            const p = this.querySelector(".hex-value");
            p && (p.style.visibility = "visible")
        }),
        i.addEventListener("mouseout", function() {
            const p = this.querySelector(".hex-value");
            p && (p.style.visibility = "hidden")
        }),
        i.addEventListener("click", function() {
            const p = this.querySelector(".hex-value");
            if (p) {
                const g = p.innerText;
                if (p.textContent !== "Copied!") {
                    const k = document.createElement("textarea");
                    k.value = g,
                    document.body.appendChild(k),
                    k.select(),
                    document.execCommand("copy"),
                    p.textContent = "Copied!",
                    setTimeout(() => {
                        p.textContent = g
                    }, 2e3),
                    document.body.removeChild(k)
                }
            }
        })
    }), n
}
on();
function Eo() {
    const t = wt.update(),
        n = document.getElementById("custom-code").value;
    let e = yo.value,
        c = bo.value;
    return n.replace(/\${(.*?)}/g, (o, s) => {
        const r = s.split("."),
            f = r[0],
            y = r[1],
            _ = r[2];
        let h;
        switch (f) {
        case "text":
            h = t.text;
            break;
        case "bg":
            h = t.bg;
            break;
        case "primary":
            h = t.primary;
            break;
        case "secondary":
            h = t.secondary;
            break;
        case "accent":
            h = t.accent;
            break;
        case "textL":
            h = t.textL;
            break;
        case "bgL":
            h = t.bgL;
            break;
        case "primaryL":
            h = t.primaryL;
            break;
        case "secondaryL":
            h = t.secondaryL;
            break;
        case "accentL":
            h = t.accentL;
            break;
        case "textD":
            h = t.textD;
            break;
        case "bgD":
            h = t.bgD;
            break;
        case "primaryD":
            h = t.primaryD;
            break;
        case "secondaryD":
            h = t.secondaryD;
            break;
        case "accentD":
            h = t.accentD;
            break;
        case "primaryFg":
            h = Oe;
            break;
        case "secondaryFg":
            h = Pe;
            break;
        case "accentFg":
            h = Me;
            break;
        case "primaryFgL":
            h = Zr;
            break;
        case "secondaryFgL":
            h = Kr;
            break;
        case "accentFgL":
            h = Gr;
            break;
        case "primaryFgD":
            h = Vr;
            break;
        case "secondaryFgD":
            h = Xr;
            break;
        case "accentFgD":
            h = Yr;
            break;
        case "theme":
            h = pe;
            break;
        case "heading":
            h = e;
            break;
        case "body":
            h = c;
            break;
        default:
            return o
        }
        if (_ !== void 0 && f !== "theme") {
            let S = Math.max(0, Math.min(100, _));
            const m = st(h),
                {h: w, s: i, l: p} = m;
            h = yt(w, i, S)
        }
        switch (y) {
        case void 0:
        case "hex":
            break;
        case "hexMtrl":
            h = to(h);
            break;
        case "rgb":
            h = jt(h);
            break;
        case "rgbR":
            h = bt(h).r;
            break;
        case "rgbG":
            h = bt(h).g;
            break;
        case "rgbB":
            h = bt(h).b;
            break;
        case "hsl":
            h = Wt(h);
            break;
        case "hslH":
            h = st(h).h;
            break;
        case "hslS":
            h = st(h).s + "%";
            break;
        case "hslL":
            h = st(h).l + "%";
            break;
        case "rgbRaw":
            h = Or(h);
            break;
        case "rgbRawComma":
            h = Jn(h);
            break;
        case "hslRaw":
            h = Pr(h);
            break;
        case "hslRawComma":
            h = Qn(h);
            break;
        case "oklab":
            h = Ur(h);
            break;
        case "oklabL":
            h = Ie(h).L + "%";
            break;
        case "oklabA":
            h = Ie(h).a;
            break;
        case "oklabB":
            h = Ie(h).B;
            break;
        case "oklabRaw":
            h = qr(h);
            break;
        case "oklch":
            h = jr(h);
            break;
        case "oklchL":
            h = Re(h).L + "%";
            break;
        case "oklchC":
            h = Re(h).c;
            break;
        case "oklchH":
            h = Re(h).h;
            break;
        case "oklchRaw":
            h = Hr(h);
            break;
        default:
            return o
        }
        return h !== void 0 ? h : o
    })
}
function Ye() {
    document.getElementById("custom-code").textContent;
    const t = Eo();
    document.getElementById("custom-output").textContent = t
}
document.getElementById("custom-output").textContent = "E.g. myPrimaryColor: #ff00ff";
document.getElementById("custom-code").addEventListener("input", Ye);
Ye();
function Vt(t) {
    t.closest(".code-type-cont").querySelectorAll(".code-type").forEach(c => {
        c.classList.remove("selected-type")
    }),
    t.classList.add("selected-type")
}
function qt(t, n) {
    const e = document.getElementById(t),
        c = document.getElementById(n);
    e.addEventListener("click", () => {
        const l = c.textContent;
        navigator.clipboard.writeText(l).then(() => {
            e.textContent = "Copied!",
            setTimeout(() => {
                e.textContent = "Copy"
            }, 2e3)
        })
    })
}
qt("copy-tailwind", "tailwind-code");
qt("copy-tailwind-css", "tailwind-css-code");
qt("copy-scss", "scss-code");
qt("copy-css", "css-code");
qt("copy-css-font", "css-font");
qt("copy-grad", "grad-code");
qt("copy-tailwind-font", "tailwind-font");
qt("copy-custom-code", "custom-output");
const cr = document.querySelector(".toggle-input"),
    lr = document.querySelector(".toggle-label");
cr.addEventListener("change", () => {
    cr.checked ? lr.classList.add("checked") : lr.classList.remove("checked")
});
const dr = document.querySelector(".theme-checker-css"),
    ur = document.querySelector(".media-label");
dr.addEventListener("change", () => {
    dr.checked ? ur.classList.add("show") : ur.classList.remove("show")
});
function Lo() {
    const t = wt.update(),
        n = {
            text: t.text,
            background: t.bg,
            primary: t.primary,
            secondary: t.secondary,
            accent: t.accent
        },
        e = {
            text: t.textL,
            background: t.bgL,
            primary: t.primaryL,
            secondary: t.secondaryL,
            accent: t.accentL
        },
        c = {
            text: t.textD,
            background: t.bgD,
            primary: t.primaryD,
            secondary: t.secondaryD,
            accent: t.accentD
        },
        l = document.querySelectorAll(".css-hex, .css-rgb, .css-hsl, .css-oklab, .css-oklch"),
        o = document.querySelector(".shade-checker-css"),
        s = document.querySelector(".theme-checker-css"),
        r = document.querySelector(".media-checker");
    let f = Ut(document.querySelector(".css.code-type.selected-type"));
    function y(S, m, w) {
        let i = "";
        if (w)
            if (S) {
                i += `:root[data-theme="light"] {
`
                ;
                for (const p in e) {
                    for (const g of _) {
                        const k = st(e[p]);
                        k.l = 100 - g / 10;
                        const d = at(yt(k.h, k.s, k.l), f);
                        i += `  --${p}-${g}: ${d};
`
                    }
                    i += `
`
                }
                i += `}
`
                ,
                i += `:root[data-theme="dark"] {
`
                ;
                for (const p in c) {
                    for (const g of _) {
                        const k = st(c[p]);
                        k.l = g / 10;
                        const d = at(yt(k.h, k.s, k.l), f);
                        i += `  --${p}-${g}: ${d};
`
                    }
                    i += `
`
                }
                if (i += `}
`
                , m) {
                    i = `@media (prefers-color-scheme: light) {
`
                    ,
                    i += `  :root {
`
                    ;
                    for (const p in e) {
                        for (const g of _) {
                            const k = st(e[p]);
                            k.l = 100 - g / 10;
                            const d = at(yt(k.h, k.s, k.l), f);
                            i += `    --${p}-${g}: ${d};
`
                        }
                        i += `
`
                    }
                    i += `  }
`
                    ,
                    i += `}
`
                    ,
                    i += `@media (prefers-color-scheme: dark) {
`
                    ,
                    i += `  :root {
`
                    ;
                    for (const p in c) {
                        for (const g of _) {
                            const k = st(c[p]);
                            k.l = g / 10;
                            const d = at(yt(k.h, k.s, k.l), f);
                            i += `    --${p}-${g}: ${d};
`
                        }
                        i += `
`
                    }
                    i += `  }
`
                    ,
                    i += `}
`
                }
            } else
                for (const p in n) {
                    for (const g of _) {
                        const k = st(n[p]);
                        k.l = 100 - g / 10;
                        const d = at(yt(k.h, k.s, k.l), f);
                        i += `--${p}-${g}: ${d};
`
                    }
                    i += `
`
                }
        else if (S) {
            i += `:root[data-theme="light"] {
`
            ;
            for (const p in e)
                i += `  --${p}: ${at(e[p], f)};
`
                ;
            i += `}
`
            ,
            i += `:root[data-theme="dark"] {
`
            ;
            for (const p in c)
                i += `  --${p}: ${at(c[p], f)};
`
                ;
            if (i += `}
`
            , m) {
                i = `@media (prefers-color-scheme: light) {
`
                ,
                i += `  :root {
`
                ;
                for (const p in e)
                    i += `    --${p}: ${at(e[p], f)};
`
                    ;
                i += `  }
`
                ,
                i += `}
`
                ,
                i += `@media (prefers-color-scheme: dark) {
`
                ,
                i += `  :root {
`
                ;
                for (const p in c)
                    i += `    --${p}: ${at(c[p], f)};
`
                    ;
                i += `  }
`
                ,
                i += `}
`
            }
        } else
            for (const p in n)
                i += `--${p}: ${at(n[p], f)};
`
                ;
        return i
    }
    const _ = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
    function h() {
        const S = s.checked,
            m = r.checked,
            w = o.checked,
            i = y(S, m, w);
        document.getElementById("css-code").textContent = i
    }
    l.forEach(S => {
        S.addEventListener("click", () => {
            f = Ut(S),
            h(),
            Vt(S)
        })
    }),
    s.addEventListener("change", () => {
        h()
    }),
    r.addEventListener("change", () => {
        h()
    }),
    o.addEventListener("change", () => {
        h()
    }),
    h()
}
function Ut(t) {
    if (t.classList.contains("hex"))
        return "hex";
    if (t.classList.contains("rgb"))
        return "rgb";
    if (t.classList.contains("hsl"))
        return "hsl";
    if (t.classList.contains("oklab"))
        return "oklab";
    if (t.classList.contains("oklch"))
        return "oklch"
}
const hr = document.querySelector(".theme-checker-tcss"),
    fr = document.querySelector(".tcss-css-code-block");
hr.addEventListener("change", () => {
    hr.checked ? fr.classList.add("show") : fr.classList.remove("show")
});
function $o() {
    const t = wt.update(),
        n = {
            text: t.text,
            background: t.bg,
            primary: t.primary,
            secondary: t.secondary,
            accent: t.accent
        },
        e = {
            text: t.textL,
            background: t.bgL,
            primary: t.primaryL,
            secondary: t.secondaryL,
            accent: t.accentL
        },
        c = {
            text: t.textD,
            background: t.bgD,
            primary: t.primaryD,
            secondary: t.secondaryD,
            accent: t.accentD
        },
        l = document.querySelectorAll(".tcss-hex, .tcss-rgb, .tcss-hsl, .tcss-oklab, .tcss-oklch"),
        o = document.querySelector(".shade-checker-tcss"),
        s = document.querySelector(".theme-checker-tcss");
    let r = Ut(document.querySelector(".tcss.code-type.selected-type"));
    function f(S, m) {
        let w = `colors: {
`
        ;
        if (S)
            for (const i in n)
                if (m) {
                    w += ` '${i}': {
`
                    ;
                    for (const p of _) {
                        const g = st(n[i]);
                        g.l = 100 - p / 10;
                        const k = r === "hex" ? `var(--${i}-${p})` : `${r}(var(--${i}-${p}))`;
                        w += `   ${p}: '${k}',
`
                    }
                    w += ` },
`
                } else {
                    w += ` '${i}': {
`
                    ;
                    for (const p of _) {
                        const g = st(n[i]);
                        g.l = nt ? 100 - p / 10 : p / 10;
                        const k = at(yt(g.h, g.s, g.l), r);
                        w += `   ${p}: '${k}',
`
                    }
                    w += ` },
`
                }
        else if (m)
            for (const i in n)
                if (S) {
                    w += ` '${i}': {
`
                    ;
                    for (const p of _) {
                        const g = st(n[i]);
                        g.l = 100 - p / 10;
                        const k = r === "hex" ? `var(--${i}-${p})` : `${r}(var(--${i}-${p}))`;
                        w += `   ${p}: '${k}',
`
                    }
                    w += ` },
`
                } else {
                    const p = r === "hex" ? `var(--${i})` : `${r}(var(--${i}))`;
                    w += ` '${i}': '${p}',
`
                }
        else
            for (const i in n) {
                const p = at(n[i], r);
                w += ` '${i}': '${p}',
`
            }
        return w += `},
`
        , w
    }
    function y(S, m) {
        let w = `@layer base {
`
        ;
        if (w += `  :root {
`
        , m)
            for (const i in e) {
                for (const p of _) {
                    const g = st(e[i]);
                    g.l = 100 - p / 10;
                    const k = le(yt(g.h, g.s, g.l), r);
                    w += `    --${i}-${p}: ${k};
`
                }
                w += `    
`
            }
        else
            for (const i in e) {
                const p = le(e[i], r);
                w += `    --${i}: ${p};
`
            }
        if (w += `  }
`
        , w += `  .dark {
`
        , m)
            for (const i in c) {
                for (const p of _) {
                    const g = st(c[i]);
                    g.l = p / 10;
                    const k = le(yt(g.h, g.s, g.l), r);
                    w += `    --${i}-${p}: ${k};
`
                }
                w += `    
`
            }
        else
            for (const i in c) {
                const p = le(c[i], r);
                w += `    --${i}: ${p};
`
            }
        return w += `  }
`
        , w += `},
`
        , w
    }
    const _ = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
    function h() {
        const S = f(o.checked, s.checked),
            m = y(s.checked, o.checked);
        document.getElementById("tailwind-code").textContent = S,
        document.getElementById("tailwind-css-code").textContent = m
    }
    l.forEach(S => {
        S.addEventListener("click", () => {
            r = Ut(S),
            h(),
            Vt(S)
        })
    }),
    o.addEventListener("change", () => {
        h()
    }),
    s.addEventListener("change", () => {
        h()
    }),
    h()
}
function Ao() {
    const t = wt.update(),
        n = {
            text: t.text,
            background: t.bg,
            primary: t.primary,
            secondary: t.secondary,
            accent: t.accent
        },
        e = {
            text: t.textL,
            background: t.bgL,
            primary: t.primaryL,
            secondary: t.secondaryL,
            accent: t.accentL
        },
        c = {
            text: t.textD,
            background: t.bgD,
            primary: t.primaryD,
            secondary: t.secondaryD,
            accent: t.accentD
        },
        l = document.querySelectorAll(".scss-hex, .scss-rgb, .scss-hsl, .scss-oklab, .scss-oklch"),
        o = document.querySelector(".theme-checker-scss");
    let s = Ut(document.querySelector(".scss.code-type.selected-type"));
    function r(y) {
        let _ = "";
        if (y) {
            _ += `$themes: (
`
            ,
            _ += ` light: (
`
            ;
            for (const h in e)
                _ += `   ${h}: ${at(e[h], s)},
`
                ;
            _ += ` ),
`
            ,
            _ += ` dark: (
`
            ;
            for (const h in c)
                _ += `   ${h}: ${at(c[h], s)},
`
                ;
            _ += ` ),
`
            ,
            _ += ");"
        } else
            for (const h in n)
                _ += `$${h}: ${at(n[h], s)};
`
                ;
        return _
    }
    function f() {
        const y = r(o.checked);
        document.getElementById("scss-code").textContent = y
    }
    l.forEach(y => {
        y.addEventListener("click", () => {
            s = Ut(y),
            f(),
            Vt(y)
        })
    }),
    o.addEventListener("change", () => {
        f()
    }),
    f()
}
function Bo() {
    const t = wt.update(),
        n = {
            text: t.text,
            background: t.bg,
            primary: t.primary,
            secondary: t.secondary,
            accent: t.accent
        },
        e = document.querySelectorAll(".grad-hex, .grad-rgb, .grad-hsl, .grad-oklab, .grad-oklch");
    let c = Ut(document.querySelector(".grad.code-type.selected-type"));
    function l() {
        for (const s in n) {
            let r = "";
            return r += `--linearPrimarySecondary: linear-gradient(${at(n.primary, c)}, ${at(n.secondary, c)});
`
            , r += `--linearPrimaryAccent: linear-gradient(${at(n.primary, c)}, ${at(n.accent, c)});
`
            , r += `--linearSecondaryAccent: linear-gradient(${at(n.secondary, c)}, ${at(n.accent, c)});
`
            , r += `--radialPrimarySecondary: radial-gradient(${at(n.primary, c)}, ${at(n.secondary, c)});
`
            , r += `--radialPrimaryAccent: radial-gradient(${at(n.primary, c)}, ${at(n.accent, c)});
`
            , r += `--radialSecondaryAccent: radial-gradient(${at(n.secondary, c)}, ${at(n.accent, c)});
`
            , r
        }
    }
    function o() {
        let s = l();
        document.getElementById("grad-code").textContent = s
    }
    e.forEach(s => {
        s.addEventListener("click", () => {
            c = Ut(s),
            o(),
            Vt(s)
        })
    }),
    o()
}
const mr = {
        "daisy-ui": `daisyui: {
    themes: [
      {
        myTheme: {
          "primary": "\${primary.hex}",
          "secondary": "\${secondary.hex}",
          "accent": "\${accent.hex}",
          "neutral": "\${bg.hex.15}",
          "base-100": "\${bg.hex}",
        },
      },
    ],
  },`











        ,
        "daisy-ui-themes": `daisyui: {
    themes: [
      {
        light: {
          "primary": "\${primaryL.hex}",
          "secondary": "\${secondaryL.hex}",
          "accent": "\${accentL.hex}",
          "neutral": "\${bgL.hex.15}",
          "base-100": "\${bgL.hex}",
        },
        dark: {
          "primary": "\${primaryD.hex}",
          "secondary": "\${secondaryD.hex}",
          "accent": "\${accentD.hex}",
          "neutral": "\${bgD.hex.15}",
          "base-100": "\${bgD.hex}",
        },
      },
    ],
  },`


















        ,
        shadcn: `@layer base {
    :root {
      --background: \${bgL.hslRaw};
      --foreground: \${textL.hslRaw};
      --card: \${bgL.hslRaw};
      --card-foreground: \${textL.hslRaw};
      --popover: \${bgL.hslRaw};
      --popover-foreground: \${textL.hslRaw};
      --primary: \${primaryL.hslRaw};
      --primary-foreground: \${primaryFgL.hslRaw};
      --secondary: \${secondaryL.hslRaw};
      --secondary-foreground: \${secondaryFgL.hslRaw};
      --muted: \${bgL.hslRaw.20};
      --muted-foreground: \${textL.hslRaw.70};
      --accent: \${accentL.hslRaw};
      --accent-foreground: \${accentFgL.hslRaw};
      --destructive: 0 85% 60%;
      --destructive-foreground: \${textL.hslRaw};
      --border: \${bgL.hslRaw.20};
      --input: \${bgL.hslRaw.20};
      --ring: \${accentL.hslRaw.40};
      --radius: 0.5rem;
    }
   
    .dark {
      --background: \${bgD.hslRaw};
      --foreground: \${textD.hslRaw};
      --card: \${bgD.hslRaw};
      --card-foreground: \${textD.hslRaw};
      --popover: \${bgD.hslRaw};
      --popover-foreground: \${textD.hslRaw};
      --primary: \${primaryD.hslRaw};
      --primary-foreground: \${primaryFgD.hslRaw};
      --secondary: \${secondaryD.hslRaw};
      --secondary-foreground: \${secondaryFgD.hslRaw};
      --muted: \${bgD.hslRaw.80};
      --muted-foreground: \${textD.hslRaw};
      --accent: \${accentD.hslRaw};
      --accent-foreground: \${accentFgD.hslRaw};
      --destructive: 0 62% 30%;
      --destructive-foreground: \${textD.hslRaw.10};
      --border: \${bgD.hslRaw.60};
      --input: \${bgD.hslRaw.80};
      --ring: \${accentD.hslRaw.60};
    }
  }`












































        ,
        "next-ui": `export default {
    colors: {
      text: '\${text.hex}',
      background: '\${bg.hex}',
      primary: '\${primary.hex}',
      secondary: '\${secondary.hex}',
      accent: '\${accent.hex}',
    }
  };`







        ,
        flutter: `const textColor = Color(\${text.hexMtrl});
const backgroundColor = Color(\${bg.hexMtrl});
const primaryColor = Color(\${primary.hexMtrl});
const primaryFgColor = Color(\${primaryFg.hexMtrl});
const secondaryColor = Color(\${secondary.hexMtrl});
const secondaryFgColor = Color(\${secondaryFg.hexMtrl});
const accentColor = Color(\${accent.hexMtrl});
const accentFgColor = Color(\${accentFg.hexMtrl});
  
const colorScheme = ColorScheme(
  brightness: Brightness.\${theme},
  background: backgroundColor,
  onBackground: textColor,
  primary: primaryColor,
  onPrimary: primaryFgColor,
  secondary: secondaryColor,
  onSecondary: secondaryFgColor,
  tertiary: accentColor,
  onTertiary: accentFgColor,
  surface: backgroundColor,
  onSurface: textColor,
  error: Brightness.\${theme} == Brightness.light ? Color(0xffB3261E) : Color(0xffF2B8B5),
  onError: Brightness.\${theme} == Brightness.light ? Color(0xffFFFFFF) : Color(0xff601410),
);`






















        ,
        less: "@text: ${text.hex};\n@background: ${bg.hex};\n@primary: ${primary.hex};\n@secondary: ${secondary.hex};\n@accent: ${accent.hex};",
        "material-ui": `import { ThemeOptions } from '@mui/material/styles';
    
export const themeOptions: ThemeOptions = {
  palette: {
    mode: '\${theme}',
    primary: {
      main: '\${primary.hex}',
      contrastText: '\${primaryFg.hex}',
    },
    secondary: {
      main: '\${secondary.hex}',
      contrastText: '\${secondaryFg.hex}',
    },
    divider: '\${accent.hex}',
    text: {
      primary: '\${text.rgb}',
      secondary: 'rgba(\${text.rgbRawComma}, 0.6)',
      disabled: 'rgba(\${text.rgbRawComma}, 0.38)',
      hint: '\${accent.rgb}',
    },
    background: {
      default: '\${bg.hex}',
    },
  },
};`























        ,
        "material-ui-shades": `export const primary = {
  50: "\${primary.hex.95}",
  100: "\${primary.hex.90}",
  200: "\${primary.hex.80}",
  300: "\${primary.hex.70}",
  400: "\${primary.hex.60}",
  500: "\${primary.hex.50}",
  600: "\${primary.hex.40}",
  700: "\${primary.hex.30}",
  800: "\${primary.hex.20}",
  900: "\${primary.hex.10}",
};

export const secondary = {
  50: "\${secondary.hex.95}",
  100: "\${secondary.hex.90}",
  200: "\${secondary.hex.80}",
  300: "\${secondary.hex.70}",
  400: "\${secondary.hex.60}",
  500: "\${secondary.hex.50}",
  600: "\${secondary.hex.40}",
  700: "\${secondary.hex.30}",
  800: "\${secondary.hex.20}",
  900: "\${secondary.hex.10}",
};

export const accent = {
  50: "\${accent.hex.95}",
  100: "\${accent.hex.90}",
  200: "\${accent.hex.80}",
  300: "\${accent.hex.70}",
  400: "\${accent.hex.60}",
  500: "\${accent.hex.50}",
  600: "\${accent.hex.40}",
  700: "\${accent.hex.30}",
  800: "\${accent.hex.20}",
  900: "\${accent.hex.10}",
};

export const background = {
  50: "\${bg.hex.95}",
  100: "\${bg.hex.90}",
  200: "\${bg.hex.80}",
  300: "\${bg.hex.70}",
  400: "\${bg.hex.60}",
  500: "\${bg.hex.50}",
  600: "\${bg.hex.40}",
  700: "\${bg.hex.30}",
  800: "\${bg.hex.20}",
  900: "\${bg.hex.10}",
};`

















































        ,
        "chakra-ui": `const theme = extendTheme({
  colors: {
    text: {
      main: "\${text.hex}",
    },
    background: {
      main: "\${bg.hex}",
      50: "\${bg.hex.95}",
      100: "\${bg.hex.90}",
      200: "\${bg.hex.80}",
      300: "\${bg.hex.70}",
      400: "\${bg.hex.60}",
      500: "\${bg.hex.50}",
      600: "\${bg.hex.40}",
      700: "\${bg.hex.30}",
      800: "\${bg.hex.20}",
      900: "\${bg.hex.10}",
    },
    primary: {
      main: "\${primary.hex}",
      50: "\${primary.hex.95}",
      100: "\${primary.hex.90}",
      200: "\${primary.hex.80}",
      300: "\${primary.hex.70}",
      400: "\${primary.hex.60}",
      500: "\${primary.hex.50}",
      600: "\${primary.hex.40}",
      700: "\${primary.hex.30}",
      800: "\${primary.hex.20}",
      900: "\${primary.hex.10}",
    },
    secondary: {
      main: "\${secondary.hex}",
      50: "\${secondary.hex.95}",
      100: "\${secondary.hex.90}",
      200: "\${secondary.hex.80}",
      300: "\${secondary.hex.70}",
      400: "\${secondary.hex.60}",
      500: "\${secondary.hex.50}",
      600: "\${secondary.hex.40}",
      700: "\${secondary.hex.30}",
      800: "\${secondary.hex.20}",
      900: "\${secondary.hex.10}",
    },
    accent: {
      main: "\${accent.hex}",
      50: "\${accent.hex.95}",
      100: "\${accent.hex.90}",
      200: "\${accent.hex.80}",
      300: "\${accent.hex.70}",
      400: "\${accent.hex.60}",
      500: "\${accent.hex.50}",
      600: "\${accent.hex.40}",
      700: "\${accent.hex.30}",
      800: "\${accent.hex.20}",
      900: "\${accent.hex.10}",
    },
  },
});`

























































        ,
        "skeleton-ui": `export const myCustomTheme: CustomThemeConfig = {
  name: 'my-custom-theme',
  properties: {
    // =~= Theme Properties =~=
    "--theme-font-color-base": "\${text.rgbRaw}", // \${text.hex}
    "--theme-font-color-dark": "\${bg.rgbRaw}", // \${bg.hex}
    "--theme-font-family-base": \`'\${body}'\`,
		"--theme-font-family-heading": \`'\${heading}'\`,
		"--theme-rounded-base": "9999px",
		"--theme-rounded-container": "8px",
		"--theme-border-base": "1px",

    // =~= Theme On-X Colors =~=
    "--on-primary": "\${primaryFg.rgbRaw}", // \${primaryFg.hex}
    "--on-secondary": "\${secondaryFg.rgbRaw}", // \${secondaryFg.hex}
    "--on-tertiary": "\${accentFg.rgbRaw}", // \${accentFg.hex}
    "--on-success": "\${text.rgbRaw}", // \${text.hex}
		"--on-warning": "\${text.rgbRaw}", // \${text.hex}
		"--on-error": "\${text.rgbRaw}", // \${text.hex}
    "--on-surface": "\${text.rgbRaw}", // \${text.hex}

    // =~= Theme Colors  =~=
    // primary | \${primary.hex} 
    "--color-primary-50": "\${primary.rgbRaw.95}", // \${primary.hex.95} 
    "--color-primary-100": "\${primary.rgbRaw.90}", // \${primary.hex.90} 
    "--color-primary-200": "\${primary.rgbRaw.80}", // \${primary.hex.80} 
    "--color-primary-300": "\${primary.rgbRaw.70}", // \${primary.hex.70} 
    "--color-primary-400": "\${primary.rgbRaw.60}", // \${primary.hex.60} 
    "--color-primary-500": "\${primary.rgbRaw.50}", // \${primary.hex.50} 
    "--color-primary-600": "\${primary.rgbRaw.40}", // \${primary.hex.40} 
    "--color-primary-700": "\${primary.rgbRaw.30}", // \${primary.hex.30} 
    "--color-primary-800": "\${primary.rgbRaw.20}", // \${primary.hex.20} 
    "--color-primary-900": "\${primary.rgbRaw.10}", // \${primary.hex.10} 

    // secondary | \${secondary.hex}
    "--color-secondary-50": "\${secondary.rgbRaw.95}", // \${secondary.hex.95} 
    "--color-secondary-100": "\${secondary.rgbRaw.90}", // \${secondary.hex.90} 
    "--color-secondary-200": "\${secondary.rgbRaw.80}", // \${secondary.hex.80} 
    "--color-secondary-300": "\${secondary.rgbRaw.70}", // \${secondary.hex.70} 
    "--color-secondary-400": "\${secondary.rgbRaw.60}", // \${secondary.hex.60} 
    "--color-secondary-500": "\${secondary.rgbRaw.50}", // \${secondary.hex.50} 
    "--color-secondary-600": "\${secondary.rgbRaw.40}", // \${secondary.hex.40} 
    "--color-secondary-700": "\${secondary.rgbRaw.30}", // \${secondary.hex.30} 
    "--color-secondary-800": "\${secondary.rgbRaw.20}", // \${secondary.hex.20} 
    "--color-secondary-900": "\${secondary.rgbRaw.10}", // \${primary.hex.10} 

    // tertiary | \${accent.hex}
    "--color-tertiary-50": "\${accent.rgbRaw.95}", // \${accent.hex.95} 
    "--color-tertiary-100": "\${accent.rgbRaw.90}", // \${accent.hex.90} 
    "--color-tertiary-200": "\${accent.rgbRaw.80}", // \${accent.hex.80} 
    "--color-tertiary-300": "\${accent.rgbRaw.70}", // \${accent.hex.70} 
    "--color-tertiary-400": "\${accent.rgbRaw.60}", // \${accent.hex.60} 
    "--color-tertiary-500": "\${accent.rgbRaw.50}", // \${accent.hex.50} 
    "--color-tertiary-600": "\${accent.rgbRaw.40}", // \${accent.hex.40} 
    "--color-tertiary-700": "\${accent.rgbRaw.30}", // \${accent.hex.30} 
    "--color-tertiary-800": "\${accent.rgbRaw.20}", // \${accent.hex.20} 
    "--color-tertiary-900": "\${accent.rgbRaw.10}", // \${accent.hex.10}

    // success | #1a7a1f 
		"--color-success-50": "221 235 221", // #ddebdd
		"--color-success-100": "209 228 210", // #d1e4d2
		"--color-success-200": "198 222 199", // #c6dec7
		"--color-success-300": "163 202 165", // #a3caa5
		"--color-success-400": "95 162 98", // #5fa262
		"--color-success-500": "26 122 31", // #1a7a1f
		"--color-success-600": "23 110 28", // #176e1c
		"--color-success-700": "20 92 23", // #145c17
		"--color-success-800": "16 73 19", // #104913
		"--color-success-900": "13 60 15", // #0d3c0f

		// warning | #b6aa20 
		"--color-warning-50": "244 242 222", // #f4f2de
		"--color-warning-100": "240 238 210", // #f0eed2
		"--color-warning-200": "237 234 199", // #edeac7
		"--color-warning-300": "226 221 166", // #e2dda6
		"--color-warning-400": "204 196 99", // #ccc463
		"--color-warning-500": "182 170 32", // #b6aa20
		"--color-warning-600": "164 153 29", // #a4991d
		"--color-warning-700": "137 128 24", // #898018
		"--color-warning-800": "109 102 19", // #6d6613
		"--color-warning-900": "89 83 16", // #595310
    
		// error | #ad1a1a 
		"--color-error-50": "243 221 221", // #f3dddd
		"--color-error-100": "239 209 209", // #efd1d1
		"--color-error-200": "235 198 198", // #ebc6c6
		"--color-error-300": "222 163 163", // #dea3a3
		"--color-error-400": "198 95 95", // #c65f5f
		"--color-error-500": "173 26 26", // #ad1a1a
		"--color-error-600": "156 23 23", // #9c1717
		"--color-error-700": "130 20 20", // #821414
		"--color-error-800": "104 16 16", // #681010
		"--color-error-900": "85 13 13", // #550d0d

    // surface | \${bg.hex}
    "--color-surface-50": "\${bg.rgbRaw.95}", // \${bg.hex.95} 
    "--color-surface-100": "\${bg.rgbRaw.90}", // \${bg.hex.90} 
    "--color-surface-200": "\${bg.rgbRaw.80}", // \${bg.hex.80} 
    "--color-surface-300": "\${bg.rgbRaw.70}", // \${bg.hex.70} 
    "--color-surface-400": "\${bg.rgbRaw.60}", // \${bg.hex.60} 
    "--color-surface-500": "\${bg.rgbRaw.50}", // \${bg.hex.50} 
    "--color-surface-600": "\${bg.rgbRaw.40}", // \${bg.hex.40} 
    "--color-surface-700": "\${bg.rgbRaw.30}", // \${bg.hex.30} 
    "--color-surface-800": "\${bg.rgbRaw.20}", // \${bg.hex.20} 
    "--color-surface-900": "\${bg.rgbRaw.10}", // \${bg.hex.10}
  }
},`









































































































        ,
        vuetify: `const myCustomLightTheme = {
  dark: false,
  colors: {
    background: '\${bgL.hex}',
    surface: '\${bgL.hex}',
    primary: '\${primaryL.hex}',
    secondary: '\${secondaryL.hex}',
    accent: '\${accentL.hex}',
  },
}

const myCustomDarkTheme = {
  dark: true,
  colors: {
    background: '\${bgD.hex}',
    surface: '\${bgD.hex}',
    primary: '\${primaryD.hex}',
    secondary: '\${secondaryD.hex}',
    accent: '\${accentD.hex}',
  },
}`



















        ,
        bootstrap: "$primary: ${primary.hex};\n$secondary: ${secondary.hex};\n$light: ${textD.hex};\n$dark: ${textL.hex};"
    },
    Io = document.querySelectorAll(".preset"),
    Zt = document.getElementById("custom-code");
Io.forEach(t => {
    t.addEventListener("click", function() {
        const n = t.getAttribute("data-preset-id");
        if (n in mr) {
            Zt.value = mr[n];
            const e = new Event("input", {
                bubbles: !0,
                cancelable: !0
            });
            Zt.dispatchEvent(e)
        }
    })
});
Zt.addEventListener("keydown", function(t) {
    if (t.key === "Tab") {
        t.preventDefault();
        const {selectionStart: n, selectionEnd: e, value: c} = Zt,
            l = c.substring(0, n) + "    " + c.substring(e);
        Zt.value = l,
        Zt.selectionStart = Zt.selectionEnd = n + 4
    }
});
const pr = document.getElementById("text-lock"),
    gr = document.getElementById("bg-lock"),
    yr = document.getElementById("primary-lock"),
    br = document.getElementById("secondary-lock"),
    vr = document.getElementById("accent-lock"),
    Ro = document.querySelectorAll(".lock-button");
Ro.forEach(t => {
    t.addEventListener("click", () => {
        t.querySelector(".lock-closed").classList.toggle("show"),
        t.querySelector(".lock-open").classList.toggle("show")
    })
});
let ge = !1,
    ye = !1,
    be = !1,
    ve = !1,
    _e = !1;
pr.addEventListener("click", function() {
    pr.classList.toggle("locked"),
    ge = !ge,
    ae()
});
gr.addEventListener("click", function() {
    gr.classList.toggle("locked"),
    ye = !ye,
    ae()
});
yr.addEventListener("click", function() {
    yr.classList.toggle("locked"),
    be = !be,
    ae()
});
br.addEventListener("click", function() {
    br.classList.toggle("locked"),
    ve = !ve,
    ae()
});
vr.addEventListener("click", function() {
    vr.classList.toggle("locked"),
    _e = !_e,
    ae()
});
function ae() {
    const t = document.querySelectorAll(".lock-button");
    document.querySelectorAll(".locked").length >= 4 ? t.forEach(e => {
        e.classList.contains("locked") || e.classList.add("lock-disabled")
    }) : t.forEach(e => {
        e.classList.remove("lock-disabled")
    })
}
const _r = document.querySelectorAll(".scheme-option");
_r.forEach(t => {
    t.addEventListener("click", () => {
        _r.forEach(n => {
            n.classList.remove("selected-scheme")
        }),
        t.getAttribute("data-scheme"),
        t.classList.add("selected-scheme")
    })
});
function To(t) {
    const n = ["monochromatic", "analogous", "complementary", "triadic", "tetradic"];
    if (t === "all")
        return n[Math.floor(Math.random() * n.length)];
    switch (t) {
    case "monochromatic":
        return "monochromatic";
    case "analogous":
        return "analogous";
    case "complementary":
        return "complementary";
    case "split-complementary":
        return "split-complementary";
    case "triadic":
        return "triadic";
    case "tetradic":
        return "tetradic";
    default:
        return "all"
    }
}
function an() {
    const t = document.querySelector(".selected-scheme");
    let n = t ? t.getAttribute("data-scheme").toLowerCase() : "all",
        e = To(n),
        c = null,
        l = !1;
    ge ? (c = ee(Tt.value), l = !0) : ye ? (c = ee(Dt.value), l = !0) : be ? (c = ee(Ft.value), l = !0) : ve ? (c = ee(zt.value), l = !0) : _e ? (c = ee(Ot.value), l = !0) : l = !1,
    l || (c = Math.random() * 360);
    let o = Do(5, c);
    const s = Fo(e, o).map(r => {
        if (r && Array.isArray(r))
            return Fr(...r)
    });
    [Tt, Dt, Ft, zt, Ot].forEach((r, f) => {
        [ge, ye, be, ve, _e][f] || (r.value = s[f])
    }),
    xt()
}
function de(t, n, e) {
    return t + (n - t) * e
}
function Do(t, n=null) {
    return {
        hueBase: n !== null ? n : Math.random() * 360,
        hueContrast: Math.random(),
        saturationBase: Math.random(),
        saturationContrast: Math.random(),
        luminanceBase: 1,
        luminanceContrast: Math.random(),
        fixed: Math.random(),
        saturationConstant: !0,
        colorCount: t
    }
}
function Fo(t, n) {
    return n.hueBase = n.hueBase !== null ? n.hueBase : Math.random(), zo(t, n)
}
function Lt(t, n) {
    return Math.random() * (n - t) + t
}
function zo(t, n) {
    let e = [];
    const c = nt ? [Lt(.9, .95), Lt(.02, .08), Lt(.7, .75), Lt(.3, .35), Lt(.5, .6)] : [Lt(.02, .08), Lt(.96, .99), Lt(.5, .55), Lt(.7, .75), Lt(.6, .65)];
    let l = n.hueBase / 360,
        o = de(.33, 1, n.hueContrast),
        s = de(.01, .5, n.saturationBase),
        r = de(.1, 1 - s, n.saturationContrast),
        f = de(.1, 1, n.fixed),
        y = n.saturationConstant,
        _ = !y;
    t == "monochromatic" && (y = !1, _ = !1);
    for (let h = 0; h < n.colorCount; ++h) {
        let S = h / (n.colorCount - 1),
            m = h < 3 ? 0 : S * o;
        t == "monochromatic" && (m *= 0),
        t == "analogous" && (m *= .25),
        t == "complementary" && (m *= .33),
        t == "triadic" && (m *= .66),
        t == "tetradic" && (m *= .75),
        t == "split-complementary" && (m *= .5),
        t != "monochromatic" && (m += (Math.random() * 2 - 1) * .01);
        let w = s + S * r,
            i = c[h];
        y && (w = f),
        _ && (i = lightnessFixed),
        e.push(Hn(l + m, w, i))
    }
    return e
}
function re(t, n) {
    const e = getComputedStyle(n).color,
        c = getComputedStyle(n).backgroundColor,
        l = Wr(e, c),
        o = n.querySelector(".contrast-tooltip"),
        s = n.querySelector(".svg-cont");
    let r,
        f;
    l < 4.5 ? (document.documentElement.style.setProperty(t, "#ff8f8f"), f = "Fail", r = '<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 6L11 11M11 6L6 11M16 8.5C16 12.6421 12.6421 16 8.5 16C4.35786 16 1 12.6421 1 8.5C1 4.35786 4.35786 1 8.5 1C12.6421 1 16 4.35786 16 8.5Z" stroke="currentColor"/></svg>') : l < 7 ? (document.documentElement.style.setProperty(t, "#ffdd00"), f = "AA", r = '<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 8.5H12M16 8.5C16 12.6421 12.6421 16 8.5 16C4.35786 16 1 12.6421 1 8.5C1 4.35786 4.35786 1 8.5 1C12.6421 1 16 4.35786 16 8.5Z" stroke="currentColor"/></svg>') : (document.documentElement.style.setProperty(t, "#64d97b"), f = "AAA", r = '<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 8L7.5 10.5L12 6M16 8.5C16 12.6421 12.6421 16 8.5 16C4.35786 16 1 12.6421 1 8.5C1 4.35786 4.35786 1 8.5 1C12.6421 1 16 4.35786 16 8.5Z" stroke="currentColor"/></svg>'),
    o.innerHTML = `${f} - ${l.toFixed(2)}:1<br><span style="font-size: var(--small); opacity: 60%; margin: 0;"><a href="/docs/contrast-checker" target="_blank">Learn more</a></span>`,
    s.innerHTML = r
}
function Oo() {
    re("--textcontrast", io),
    re("--bgcontrast", co),
    re("--primarycontrast", Jr),
    re("--secondarycontrast", Qr),
    re("--accentcontrast", tn)
}
const kr = document.querySelectorAll(".faq");
document.querySelectorAll(".faq-a");
document.querySelectorAll(".faq-icon");
document.querySelectorAll(".contrast-link");
document.querySelector(".contrast-answer");
document.querySelector(".contrast-icon");
const wr = document.querySelector(".tooltip-share"),
    Po = document.querySelector(".fonts-rollout"),
    Mo = document.querySelector(".colors-rollout"),
    No = document.querySelectorAll(".highlight-toolbar");
No.forEach(function(t) {
    t.addEventListener("click", function() {
        var n = document.getElementById("toolbar");
        n.classList.add("highlighted"),
        setTimeout(function() {
            n.classList.remove("highlighted")
        }, 1e3)
    })
});
if (window.innerWidth < 1e3) {
    const t = document.querySelector("#hamburger"),
        n = document.querySelector(".menu");
    t.addEventListener("click", function() {
        this.classList.toggle("active"),
        n.classList.toggle("hide")
    })
}
const Uo = document.querySelectorAll(".randomize-option");
Uo.forEach(function(t) {
    t.addEventListener("click", () => {
        event.stopPropagation()
    })
});
const qo = document.getElementById("share-link");
qo.addEventListener("click", () => {
    sn()
});
function sn() {
    const t = window.location.href;
    navigator.clipboard.writeText(t);
    const n = document.querySelector(".tooltip-share");
    n.textContent = "Copied!",
    n.classList.add("copied"),
    setTimeout(function() {
        n.innerHTML = 'Share Link<br><span class="controls-tooltip">(CTRL + S)</span>',
        n.classList.remove("copied")
    }, 2e3)
}
document.addEventListener("keydown", function(t) {
    (t.ctrlKey || t.metaKey) && t.key === "s" && (t.preventDefault(), sn(), wr.classList.add("hover"), setTimeout(function() {
        wr.classList.remove("hover")
    }, 2e3))
});
var Ne = 0;
document.getElementById("export").addEventListener("click", function() {
    document.getElementById("overlay").style.display = "block",
    document.getElementById("popup").style.display = "flex",
    document.querySelector(".export-options").style.display = "block";
    var t = document.querySelectorAll(".tab"),
        n = t[Ne];
    dn(n, Ne)
});
function cn() {
    document.getElementById("overlay").style.display = "none",
    document.getElementById("popup").style.display = "none",
    document.querySelector(".export-options").style.display = "none"
}
document.getElementById("overlay").addEventListener("click", cn);
Po.addEventListener("click", () => {
    document.getElementById("overlay").style.display = "none",
    document.getElementById("popup").style.display = "none",
    document.querySelector(".export-options").style.display = "none"
});
var ln = document.querySelectorAll(".tab"),
    Ho = document.querySelectorAll(".tabContent"),
    Fe = document.querySelector(".line");
ln.forEach(function(t, n) {
    t.addEventListener("click", function() {
        var e = this.getAttribute("data-tab");
        jo(e),
        dn(t, n)
    })
});
function jo(t) {
    ln.forEach(function(n) {
        n.classList.remove("active")
    }),
    Ho.forEach(function(n) {
        n.classList.remove("active")
    }),
    document.querySelector(".tab[data-tab='" + t + "']").classList.add("active"),
    document.getElementById(t).classList.add("active")
}
function dn(t, n) {
    var e = t.offsetLeft,
        c = t.offsetWidth;
    Fe.style.setProperty("--tab-position", e + "px"),
    Fe.style.setProperty("--tab-width", c + "px"),
    Fe.classList.add("active"),
    Ne = n
}
var Ue = 0;
document.getElementById("export-font").addEventListener("click", function() {
    document.getElementById("font-overlay").style.display = "block",
    document.getElementById("popup-font").style.display = "flex",
    document.querySelector(".export-font-options").style.display = "block";
    var t = document.querySelectorAll(".font-tab"),
        n = t[Ue];
    fn(n, Ue)
});
function un() {
    document.getElementById("font-overlay").style.display = "none",
    document.getElementById("popup-font").style.display = "none",
    document.querySelector(".export-font-options").style.display = "none"
}
document.getElementById("font-overlay").addEventListener("click", un);
Mo.addEventListener("click", () => {
    document.getElementById("font-overlay").style.display = "none",
    document.getElementById("popup-font").style.display = "none",
    document.querySelector(".export-font-options").style.display = "none"
});
document.addEventListener("keydown", function(t) {
    t.key === "Escape" && (cn(), un())
});
var hn = document.querySelectorAll(".font-tab"),
    Wo = document.querySelectorAll(".tabContentFont"),
    ze = document.querySelector(".font-line");
hn.forEach(function(t, n) {
    t.addEventListener("click", function() {
        var e = this.getAttribute("data-font-tab");
        Zo(e),
        fn(t, n)
    })
});
function Zo(t) {
    hn.forEach(function(n) {
        n.classList.remove("font-active")
    }),
    Wo.forEach(function(n) {
        n.classList.remove("font-active")
    }),
    document.querySelector(".font-tab[data-font-tab='" + t + "']").classList.add("font-active"),
    document.getElementById(t).classList.add("font-active")
}
function fn(t, n) {
    var e = t.offsetLeft,
        c = t.offsetWidth;
    ze.style.setProperty("--font-tab-position", e + "px"),
    ze.style.setProperty("--font-tab-width", c + "px"),
    ze.classList.add("font-active"),
    Ue = n
}
kr.forEach(t => {
    t.onclick = function() {
        kr.forEach(e => {
            e !== t && (e.classList.remove("is-open"), e.nextElementSibling.style.maxHeight = null, e.querySelector(".faq-icon").classList.remove("expand"))
        }),
        this.classList.toggle("is-open");
        let n = this.nextElementSibling;
        n.style.maxHeight ? (n.style.maxHeight = null, this.querySelector(".faq-icon").classList.remove("expand")) : (n.style.maxHeight = n.scrollHeight + "px", this.querySelector(".faq-icon").classList.add("expand"))
    }
});
var Ko = document.querySelectorAll(".text-input"),
    Go = document.querySelectorAll(".color-code-input");
Ko.forEach(function(t) {
    t.addEventListener("keydown", function(n) {
        n.code === "Space" && n.stopPropagation()
    }),
    t.addEventListener("keydown", function(n) {
        (n.key === "ArrowLeft" || n.key === "ArrowRight" || n.altKey && (n.key === "t" || n.key === "T") || (n.ctrlKey || n.metaKey) && (n.key === "e" || n.key === "E") || (n.ctrlKey || n.metaKey) && (n.key === "y" || n.key === "Y") || (n.ctrlKey || n.metaKey) && (n.key === "z" || n.key === "Z")) && n.stopPropagation()
    })
});
Go.forEach(function(t) {
    t.addEventListener("keydown", function(n) {
        n.code === "Space" && n.stopPropagation()
    }),
    t.addEventListener("keydown", function(n) {
        (n.key === "ArrowLeft" || n.key === "ArrowRight" || n.altKey && (n.key === "t" || n.key === "T") || (n.ctrlKey || n.metaKey) && (n.key === "e" || n.key === "E") || (n.ctrlKey || n.metaKey) && (n.key === "y" || n.key === "Y") || (n.ctrlKey || n.metaKey) && (n.key === "z" || n.key === "Z")) && n.stopPropagation()
    })
});
const ne = document.querySelector(".colors-rollout"),
    qe = document.querySelector(".fonts-rollout"),
    ke = document.querySelector(".color-tools-span"),
    we = document.querySelector(".font-tools-span"),
    mn = document.querySelector(".colors-rollout svg"),
    pn = document.querySelector(".fonts-rollout svg");
ne.addEventListener("click", () => {
    ne.classList.remove("hide"),
    qe.classList.remove("hide"),
    ke.classList.remove("hide"),
    ne.classList.add("showing"),
    we.classList.add("hide"),
    we.classList.remove("m-hide"),
    ke.classList.toggle("m-hide"),
    mn.classList.toggle("rotateX"),
    pn.classList.remove("rotateX")
});
qe.addEventListener("click", () => {
    qe.classList.add("hide"),
    ne.classList.add("hide"),
    we.classList.remove("hide"),
    ke.classList.add("hide"),
    ne.classList.remove("showing"),
    we.classList.toggle("m-hide"),
    ke.classList.remove("m-hide"),
    pn.classList.toggle("rotateX"),
    mn.classList.remove("rotateX")
});
const Vo = document.querySelectorAll(".open-option-settings"),
    gn = document.querySelectorAll(".option-settings");
Vo.forEach((t, n) => {
    const e = gn[n];
    let c = t.querySelector(".option-icon");
    e.addEventListener("click", l => {
        l.stopPropagation()
    }),
    t.addEventListener("click", () => {
        e.classList.toggle("open-settings"),
        c || (c = t.querySelector(".option-icon")),
        c && c.classList.toggle("rotate")
    }),
    document.addEventListener("mousedown", l => {
        !e.contains(l.target) && l.target !== t && (e.classList.remove("open-settings"), c || (c = t.querySelector(".option-icon")), c && c.classList.remove("rotate"))
    })
});
function xe() {
    gn.forEach(t => {
        t.classList.remove("open-settings")
    })
}
console.clear();
const Je = "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBGvuAr8QpuKsPCBBr9bWgzxysFMLG4oeE",
    yn = "Inter",
    $t = document.getElementById("heading-fonts"),
    At = document.getElementById("body-fonts"),
    Mt = ["h1", "h2", "h3", "h4", "h5", ".color-effect", ".font-effect"],
    Nt = ["p", "a", "li", ".quote", "table", "button", "small", ".bento-sub", ".menu-item-header", "b"];
$t.value = yn;
At.value = yn;
const Xo = document.getElementById("reset-font-text"),
    Yo = document.getElementById("reset-font-heading"),
    xr = document.getElementById("heading-font-lock"),
    Cr = document.getElementById("text-font-lock"),
    Jo = document.querySelectorAll(".lock-button-font"),
    Qo = document.querySelectorAll(".autocomplete-dropdown");
document.getElementById("google-font-link-heading");
document.getElementById("google-font-link-text");
Jo.forEach(t => {
    t.addEventListener("click", () => {
        t.querySelector(".lock-closed").classList.toggle("show"),
        t.querySelector(".lock-open").classList.toggle("show")
    })
});
const Sr = document.querySelectorAll(".font-category");
Sr.forEach(t => {
    t.addEventListener("click", () => {
        Sr.forEach(n => {
            n.classList.remove("selected-font-category")
        }),
        t.getAttribute("data-category"),
        t.classList.add("selected-font-category")
    })
});
const Er = document.querySelectorAll(".type-scale");
let Lr;
Er.forEach(t => {
    t.addEventListener("click", () => {
        Er.forEach(n => {
            n.classList.remove("selected-scale")
        }),
        Lr = t.getAttribute("data-type-scale"),
        t.classList.add("selected-scale"),
        document.documentElement.style.setProperty("--font-scale", Lr),
        Ht()
    })
});
let oe = null;
xr.addEventListener("click", function() {
    xr.classList.toggle("font-locked"),
    bn("heading", $t),
    vn(),
    event.stopPropagation()
});
Cr.addEventListener("click", function() {
    Cr.classList.toggle("font-locked"),
    bn("text", At),
    vn(),
    event.stopPropagation()
});
function bn(t, n) {
    oe === t ? oe = null : (oe = t, n.value)
}
function vn() {
    const t = document.querySelectorAll(".lock-button-font");
    document.querySelectorAll(".font-locked").length >= 1 ? t.forEach(e => {
        e.classList.contains("font-locked") || e.classList.add("lock-disabled")
    }) : t.forEach(e => {
        e.classList.remove("lock-disabled")
    })
}
const Gt = [$t, At];
Gt.forEach(t => {
    t.addEventListener("keydown", n => {
        (n.key === "c" || n.key === "C" || n.key === "f" || n.key === "F") && n.stopPropagation()
    })
});
Yo.addEventListener("click", () => {
    $t.value = "Inter",
    ft("Inter", Mt);
    const t = document.getElementById("heading-error-message");
    t.style.display = "none",
    Ht()
});
Xo.addEventListener("click", () => {
    At.value = "Inter",
    ft("Inter", Nt);
    const t = document.getElementById("text-error-message");
    t.style.display = "none",
    Ht()
});
$t.addEventListener("change", async () => {
    let t = $t.value;
    ft(t, Mt),
    Ht()
});
At.addEventListener("change", async () => {
    let t = At.value;
    ft(t, Nt),
    Ht()
});
function ta(t, n) {
    const e = document.createElement("span");
    e.style.fontFamily = t,
    e.innerText = "Sample text",
    document.body.appendChild(e);
    const c = e.offsetWidth !== 0 || e.offsetHeight !== 0;
    return document.body.removeChild(e), c ? (n.textContent = "No results found.", n.style.display = "block", t) : (console.log("Font not available locally"), null)
}
function ea() {
    const t = $t.value,
        n = At.value;
    ft(t, Mt, !1),
    ft(n, Nt, !1)
}
function ft(t, n, e=!0) {
    const c = `https://fonts.googleapis.com/css2?family=${t.toString().replace(" ", "+")}`,
        l = document.createElement("link");
    l.rel = "stylesheet",
    l.href = c;
    const o = document.querySelector(`link[href="${c}"]`);
    o && o.remove(),
    document.head.appendChild(l),
    n.forEach(s => {
        document.querySelectorAll(s).forEach(f => {
            f.style.fontFamily = `'${t}', sans-serif`
        })
    }),
    Ht(),
    ra(),
    Ze(!!e, !1)
}
let Xt = new Set,
    $r = !0;
async function _n() {
    if ((await (await fetch(Je)).json()).items.forEach(e => {
        if (e.subsets.includes("latin")) {
            const c = {
                name: e.family,
                type: "Google Font",
                url: `https://fonts.google.com/specimen/${encodeURIComponent(e.family)}`
            };
            Xt.add(c)
        }
    }), $r && "queryLocalFonts" in window)
        try {
            (await window.queryLocalFonts()).forEach(c => {
                const l = {
                    name: c.family,
                    type: "Local Font"
                };
                Xt.add(l)
            })
        } catch (e) {
            console.error("Error accessing local fonts:", e)
        }
    else
        console.warn("Local Font Access API is not supported in this browser."),
        $r = !1
}
function ra() {
    const {headingFont: t, bodyFont: n, headingFontEncoded: e, bodyFontEncoded: c} = Qe(),
        l = Array.from(Xt).find(y => y.name === t),
        o = Array.from(Xt).find(y => y.name === n),
        s = document.getElementById("google-font-link-heading"),
        r = document.getElementById("google-font-link-text");
    l ? s.href = l.url : s.href = `https://fonts.google.com/specimen/${e}`,
    o ? r.href = o.url : r.href = `https://fonts.google.com/specimen/${c}`;
    function f(y) {
        const _ = y.getAttribute("href");
        !_ || _.trim() === "" || _ === "undefined" ? y.style.display = "none" : y.style.display = "flex"
    }
    f(s),
    f(r)
}
_n();
function Ar(t, n, e) {
    if (n) {
        e.innerHTML = "";
        const c = new Set;
        let l = n.replace(/\s/g, " "),
            o = Array.from(Xt).filter(s => s.name.toLowerCase().includes(l.toLowerCase()));
        for (let s = 0; s < n.length; s++) {
            const r = n[s].toLowerCase();
            o = o.filter(f => f.name.toLowerCase().includes(r))
        }
        if (o.forEach(s => {
            if (!c.has(s.name)) {
                c.add(s.name);
                const r = document.createElement("div");
                r.classList.add("autocomplete-option");
                let f = s.name;
                if (n) {
                    const y = new RegExp(n, "gi");
                    f = s.name.replace(y, "<strong>$&</strong>")
                }
                r.innerHTML = `
            <div class="font-info">
              <span class="font-name">${
                f}</span>
            </div>
          `

                ,
                r.addEventListener("click", y => {
                    const _ = y.currentTarget.querySelector(".font-name");
                    if (_) {
                        const h = _.textContent;
                        t.value = h,
                        e.innerHTML = ""
                    }
                }),
                e.appendChild(r)
            }
        }), o.length === 0) {
            const s = Gt[0] === t ? document.getElementById("heading-error-message") : document.getElementById("text-error-message"),
                r = ta(n, s);
            r && (Gt[0] === t ? ft(r, Mt) : ft(r, Nt))
        } else {
            const s = Gt[0] === t ? document.getElementById("heading-error-message") : document.getElementById("text-error-message");
            s.style.display = "none"
        }
        e.style.display = "block"
    }
}
Gt.forEach((t, n) => {
    const e = Qo[n];
    let c = -1,
        l = "";
    t.addEventListener("click", s => {
        const r = s.target.value;
        _n().then(() => {
            Ar(t, r, e)
        })
    }),
    t.addEventListener("input", s => {
        let r = s.target.value.trim();
        if (!r) {
            e.style.display = "none";
            return
        }
        Ar(t, r, e)
    }),
    document.addEventListener("click", s => {
        !t.contains(s.target) && !e.contains(s.target) && (e.style.display = "none")
    }),
    e.addEventListener("click", s => {
        const r = s.target.closest(".font-name");
        if (r) {
            l = r.textContent.trim(),
            t.value = l,
            Gt[n].value = l,
            ft(l, n === 0 ? Mt : Nt);
            const y = document.getElementById("text-error-message"),
                _ = document.getElementById("heading-error-message");
            y.style.display = "none",
            _.style.display = "none"
        }
    });
    let o = !0;
    t.addEventListener("keydown", s => {
        if (s.key === "Enter") {
            s.preventDefault();
            const r = s.target.value,
                f = new Set,
                y = Array.from(Xt).filter(_ => _.name.toLowerCase().includes(r.toLowerCase()));
            if (y.length > 0) {
                const _ = y.find(h => h.name.toLowerCase().startsWith(r.toLowerCase()));
                _ && (l = _.name, t.value = l, f.has(l) || (f.add(l), ft(l, n === 0 ? Mt : Nt)))
            } else
                y.length === 0 && o && (o = !1)
        } else if (s.key === "ArrowUp" || s.key === "ArrowDown") {
            const r = e.querySelectorAll(".autocomplete-option");
            s.key === "ArrowUp" ? c = Math.max(c - 1, 0) : s.key === "ArrowDown" && (c = Math.min(c + 1, r.length - 1)),
            r.forEach((f, y) => {
                y === c ? (f.classList.add("selected"), f.focus(), f.scrollIntoView({
                    block: "nearest"
                })) : f.classList.remove("selected")
            }),
            r[c] && (l = r[c].querySelector(".font-name").textContent.trim(), t.value = l)
        }
    })
});
const Br = document.querySelectorAll(".font-category");
async function kn() {
    const t = document.querySelector(".selected-font-category").getAttribute("data-category"),
        n = await na(t, 1);
    oe !== "heading" && ($t.value = n[0], ft(n[0], Mt, !0)),
    oe !== "text" && (At.value = n[0], ft(n[0], Nt, !0)),
    Ht()
}
Br.forEach(t => {
    t.addEventListener("click", async () => {
        Br.forEach(n => n.classList.remove("selected-font-category")),
        t.classList.add("selected-font-category")
    })
});
async function na(t, n) {
    if (t === "all")
        return aa(n);
    {
        const e = await oa(t);
        return wn(e, n)
    }
}
async function oa(t) {
    return (await (await fetch(Je)).json()).items.filter(c => c.subsets.includes("latin") ? c.category.toLowerCase() === t.toLowerCase() : !1)
}
function wn(t, n) {
    const e = [];
    for (let c = 0; c < n; c++) {
        const l = Math.floor(Math.random() * t.length);
        e.push(t[l].family)
    }
    return e
}
async function aa(t) {
    const c = (await (await fetch(Je)).json()).items.filter(l => l.subsets.includes("latin"));
    return wn(c, t)
}
function Qe() {
    return {
        headingFont: $t.value,
        headingFontEncoded: encodeURIComponent($t.value),
        bodyFont: At.value,
        bodyFontEncoded: encodeURIComponent(At.value),
        pSize: getComputedStyle(document.documentElement).getPropertyValue("--p"),
        fontScale: getComputedStyle(document.documentElement).getPropertyValue("--font-scale")
    }
}
function xn(t, n) {
    const e = (l, o) => {
        const s = parseFloat(l) * o;
        return {
            css: `${s.toFixed(3)}rem; /* ${s.toFixed(2) * 16}px */`,
            tcss: `${s.toFixed(3)}rem`
        }
    };
    let c = {
        small: e(t, 1 / n),
        h5: e(t, n)
    };
    return ["h4", "h3", "h2", "h1"].reduce((l, o) => (c[o] = e(c[l].css, n), o), "h5"), c
}
function sa() {
    let {headingFont: t, bodyFont: n, pSize: e, fontScale: c, headingFontEncoded: l, bodyFontEncoded: o} = Qe(),
        s = xn(e, c),
        r = "";
    r += `@import url('https://fonts.googleapis.com/css?family=${l}:700|${o}:400');

`

    ,
    r += `body {
  font-family: '${n}';
  font-weight: 400;
}

`



    ,
    r += `h1, h2, h3, h4, h5 {
  font-family: '${t}';
  font-weight: 700;
}

`



    ,
    r += `html {font-size: 100%;} /* 16px */

`

    ,
    r += `h1 {font-size: ${s.h1.css}}

`

    ,
    r += `h2 {font-size: ${s.h2.css}}

`

    ,
    r += `h3 {font-size: ${s.h3.css}}

`

    ,
    r += `h4 {font-size: ${s.h4.css}}

`

    ,
    r += `h5 {font-size: ${s.h5.css}}

`

    ,
    r += `small {font-size: ${s.small.css}}`,
    document.getElementById("css-font").textContent = r
}
function ia() {
    let {headingFont: t, bodyFont: n, pSize: e, fontScale: c} = Qe(),
        l = xn(e, c);
    const o = `fontSize: {
  sm: '${l.small.tcss}',
  base: '${e}',
  xl: '${l.h5.tcss}',
  '2xl': '${l.h4.tcss}',
  '3xl': '${l.h3.tcss}',
  '4xl': '${l.h2.tcss}',
  '5xl': '${l.h1.tcss}',
},
fontFamily: {
  heading: '${

    t}',
  body: '${n}',
},
fontWeight: {
  normal: '400',
  bold: '700',
},`




    ;
    document.getElementById("tailwind-font").textContent = o
}
function Ht() {
    sa(),
    ia(),
    nn()
}
const Cn = document.querySelectorAll(".hex-input"),
    Sn = document.querySelectorAll(".sl-handle"),
    ca = document.querySelectorAll(".rgb-input"),
    la = document.querySelectorAll(".hsl-input"),
    En = document.querySelectorAll(".color-underlay"),
    Ln = document.querySelectorAll(".selected-color"),
    $n = document.querySelectorAll(".sat-lightness-picker"),
    An = document.querySelectorAll(".hue-rotation"),
    He = 200,
    je = 200;
let Ce = [],
    tr = [],
    er = [];
const Yt = t => zr(Ce[t], tr[t], er[t]);
function da() {
    Pt.forEach((t, n) => {
        const e = Ln[n],
            c = Sn[n],
            l = $n[n],
            o = bt(t.value),
            s = qn(o.r, o.g, o.b);
        Ce[n] = s.h,
        tr[n] = s.s,
        er[n] = s.v,
        An[n].value = s.h * 360,
        En[n].style.background = `hsl(${s.h * 360}, 100%, 50%)`,
        e.style.backgroundColor = t.value;
        const r = s.s * je,
            f = (1 - s.v) * He;
        c.style.transform = `translate3d(${r}px, ${f}px, 0)`,
        c.style.backgroundColor = `rgb(${Yt(n)})`,
        l.style.backgroundColor = `rgb(${Yt(n)})`
    })
}
Cn.forEach((t, n) => {
    t.addEventListener("change", function() {
        let e = t.value;
        Wn(e) ? (e = Gn(e), Pt[n].value = e, t.dataset.previousValue = e, xt()) : t.value = t.dataset.previousValue
    }),
    t.addEventListener("focus", function() {
        t.dataset.previousValue = t.value
    })
});
ca.forEach((t, n) => {
    t.addEventListener("change", function() {
        let e = t.value;
        if (Zn(e)) {
            const c = Vn(e);
            Pt[n].value = c,
            t.dataset.previousValue = e,
            xt()
        } else
            t.value = t.dataset.previousValue
    }),
    t.addEventListener("focus", function() {
        t.dataset.previousValue = t.value
    })
});
la.forEach((t, n) => {
    t.addEventListener("change", function() {
        let e = t.value;
        if (Kn(e)) {
            const c = Xn(e);
            Pt[n].value = c,
            t.dataset.previousValue = e,
            xt()
        } else
            t.value = t.dataset.previousValue
    }),
    t.addEventListener("focus", function() {
        t.dataset.previousValue = t.value
    })
});
const Bn = t => {
        const n = Ln[t],
            e = Cn[t],
            c = Pt[t];
        n.setAttribute("style", `background-color: rgb(${Yt(t)})`);
        const l = Yt(t),
            o = Fr(...l);
        e.value !== o && e.dataset.modified !== "true" && (e.value = o, e.setAttribute("value", o), c.setAttribute("value", o), c.value = o)
    },
    ua = t => {
        const n = Sn[t],
            e = $n[t],
            c = (r, f) => {
                const y = e.getBoundingClientRect();
                let _ = Math.min(Math.max(r - y.left - window.scrollX, 0), je),
                    h = Math.min(Math.max(f - y.top - window.scrollY, 0), He);
                tr[t] = _ / je,
                er[t] = 1 - h / He,
                n.style.transform = `translate3d(${_}px, ${h}px, 1px)`,
                n.style.backgroundColor = `rgb(${Yt(t)})`,
                Bn(t)
            },
            l = r => {
                r.preventDefault(),
                document.addEventListener("mousemove", o),
                document.addEventListener("mouseup", s),
                c(r.pageX, r.pageY)
            },
            o = r => {
                r.preventDefault(),
                c(r.pageX, r.pageY)
            },
            s = () => {
                document.removeEventListener("mousemove", o),
                document.removeEventListener("mouseup", s),
                xt(!0, !1)
            };
        e.addEventListener("mousedown", l)
    };
An.forEach((t, n) => {
    const e = document.querySelectorAll(".sl-handle")[n];
    t.addEventListener("input", c => {
        Ce[n] = c.target.value / 360,
        En[n].style.background = `rgb(${zr(Ce[n], 1, 1)})`,
        e.style.backgroundColor = `rgb(${Yt(n)})`,
        Bn(n)
    }),
    t.addEventListener("change", () => xt(!0, !1)),
    ua(n)
});
const ha = document.querySelectorAll(".color-output");
ha.forEach(t => {
    const n = t.querySelectorAll(".color-code-input"),
        e = t.querySelectorAll(".color-code-label");
    let c = 0;
    e.forEach(l => {
        const o = l.querySelector("small");
        l.addEventListener("click", s => {
            switch (s.preventDefault(), n[c].classList.remove("selected-color-code"), c = (c + 1) % n.length, n[c].classList.add("selected-color-code"), o.innerText) {
            case "HEX":
                o.innerText = "RGB";
                break;
            case "RGB":
                o.innerText = "HSL";
                break;
            case "HSL":
                o.innerText = "HEX";
                break
            }
        })
    })
});
const Se = document.getElementById("heading-fonts"),
    Ee = document.getElementById("body-fonts"),
    fa = document.getElementById("randomize"),
    ma = document.querySelectorAll(".hex-input"),
    pa = document.querySelectorAll(".rgb-input"),
    ga = document.querySelectorAll(".hsl-input"),
    ya = document.querySelector(".colors-rollout"),
    ba = document.querySelector(".fonts-rollout"),
    va = document.getElementById("randomize-fonts-button"),
    We = document.getElementById("custom-code");
console.clear();
let mt = [],
    vt = -1,
    In = [Se, Ee];
const _a = ["--text", "--bg", "--primary", "--secondary", "--accent"];
function Ir() {
    const t = localStorage.getItem("customCode");
    t && (We.textContent = t)
}
We.addEventListener("input", () => {
    const t = We.value;
    localStorage.setItem("customCode", t)
});
const ue = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95];
function he(t, n) {
    return wt.update(), n.map(e => {
        let c = Math.max(0, Math.min(100, e));
        const l = st(t),
            {h: o, s, l: r} = l;
        return `hsl(${o}, ${s}%, ${r}%, ${c}%)`
    })
}
function fe(t, n) {
    const e = document.documentElement,
        c = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95];
    t.forEach((l, o) => {
        const s = c[o],
            r = `--${n}${s}`;
        e.style.setProperty(r, l)
    })
}
function ka() {
    const t = wt.update(),
        n = he(t.text, ue),
        e = he(t.primary, ue),
        c = he(t.secondary, ue),
        l = he(t.accent, ue);
    fe(n, "text"),
    fe(e, "primary"),
    fe(c, "secondary"),
    fe(l, "accent")
}
function Rn() {
    return In.map(t => t.value)
}
function wa() {
    const t = Xe();
    mt = mt.slice(0, vt + 1),
    mt.push(t),
    vt++,
    localStorage.setItem("colorStates", JSON.stringify(mt))
}
function xt(t=!0, n=!0) {
    t && wa(),
    n && da(),
    $e(),
    La(),
    rr(),
    oo(),
    Ve(),
    so(),
    Le(),
    Oo(),
    ka(),
    ko()
}
function xa() {
    const t = localStorage.getItem("colorStates");
    t ? (mt = JSON.parse(t), vt = mt.length - 1) : (mt = [Xe()], vt = 0),
    $e()
}
xa();
let pt = [],
    _t = -1,
    Rr;
function Ca() {
    clearTimeout(Rr),
    Rr = setTimeout(() => {
        const t = Rn();
        pt = pt.slice(0, _t + 1),
        pt.push(t),
        _t++,
        localStorage.setItem("fontStates", JSON.stringify(pt))
    }, 100)
}
function Ze(t=!0, n=!0) {
    t && Ca(),
    n && ea(),
    Ae(),
    Ht(),
    Le(),
    rr()
}
function Sa() {
    const t = localStorage.getItem("fontStates");
    t ? (pt = JSON.parse(t), _t = pt.length - 1) : (pt = [Rn()], _t = 0),
    Ae()
}
Sa();
Ea();
function Le() {
    const t = new URLSearchParams(window.location.search),
        n = t.get("colors"),
        e = t.get("fonts");
    document.querySelectorAll("a:not(.exclude)").forEach(l => {
        const o = l.getAttribute("href");
        if (o) {
            const s = new URL(o, window.location.origin);
            n && s.searchParams.set("colors", n),
            e && s.searchParams.set("fonts", e),
            l.setAttribute("href", s.toString())
        }
    })
}
let Tr = "";
const Dr = () => {
    const n = new URLSearchParams(window.location.search).get("colors");
    n && n !== Tr && (Tr = n, Le())
};
document.addEventListener("DOMContentLoaded", () => {
    Dr(),
    Le(),
    setInterval(Dr, 10)
});
fa.addEventListener("click", () => {
    an(),
    xe()
});
va.addEventListener("click", () => {
    kn(),
    xe()
});
document.addEventListener("keydown", t => {
    t.code === "Space" && ya.classList.contains("showing") && (an(), xe(), t.preventDefault()),
    ba.classList.contains("hide") && t.code === "Space" && (kn(), xe(), t.preventDefault())
});
function rr() {
    const t = [Tt, Dt, Ft, zt, Ot].map(c => {
            const l = c.value;
            return l ? encodeURIComponent(l.replace("#", "")) : ""
        }),
        n = [Se.value, Ee.value].filter(c => c !== "").join("-"),
        e = `?colors=${t.join("-")}&fonts=${n}`;
    window.history.replaceState({}, document.title, e)
}
function Ea() {
    const t = new URLSearchParams(window.location.search),
        n = t.get("colors"),
        e = t.get("fonts");
    if (n ? (n.split("-").map(l => `#${decodeURIComponent(l)}`).forEach((l, o) => {
        l && Pt[o] && (Pt[o].value = l)
    }), Ir(), xt(!1, !0)) : (Ir(), rr(), xt(!0, !0)), e) {
        const c = e.split("-").map(o => decodeURIComponent(o)),
            l = /^[A-Za-z0-9\s.,!?&'"()%@-]+$/;
        c[0] && l.test(c[0]) ? (Se.value = c[0], ft(c[0], Mt, !1)) : (Se.value = "Inter", ft("Inter", Mt, !1)),
        c[1] && l.test(c[1]) ? (Ee.value = c[1], ft(c[1], Nt, !1)) : (Ee.value = "Inter", ft("Inter", Nt, !1))
    }
}
function La() {
    const t = Xe();
    _a.forEach((n, e) => {
        const c = t[e];
        c && (document.documentElement.style.setProperty(n, c), ma[e].value = c, pa[e].value = `${bt(c).r}, ${bt(c).g}, ${bt(c).b}`, ga[e].value = `${st(c).h}, ${st(c).s}, ${st(c).l}`)
    })
}
function $a() {
    vt > 0 && (vt--, Tn(mt[vt]), $e(), localStorage.setItem("colorStates", JSON.stringify(mt)))
}
function Aa() {
    vt < mt.length - 1 && (vt++, Tn(mt[vt]), $e(), localStorage.setItem("colorStates", JSON.stringify(mt)))
}
function Tn(t) {
    Pt.forEach((n, e) => {
        n.value = t[e]
    }),
    xt(!1, !0)
}
document.getElementById("undo").addEventListener("click", $a);
document.getElementById("redo").addEventListener("click", Aa);
function Ba() {
    _t > 0 && (_t--, Dn(pt[_t]), Ae(), localStorage.setItem("fontStates", JSON.stringify(pt)))
}
function Ia() {
    _t < pt.length - 1 && (_t++, Dn(pt[_t]), Ae(), localStorage.setItem("fontStates", JSON.stringify(pt)))
}
function Dn(t) {
    In.forEach((n, e) => {
        n.value = t[e]
    }),
    Ze(!1, !0)
}
document.getElementById("font-undo").addEventListener("click", Ba);
document.getElementById("font-redo").addEventListener("click", Ia);
function $e() {
    let t = document.getElementById("undo"),
        n = document.getElementById("redo");
    vt <= 0 ? t.classList.add("disabled") : t.classList.remove("disabled"),
    vt >= mt.length - 1 ? n.classList.add("disabled") : n.classList.remove("disabled")
}
function Ae() {
    let t = document.getElementById("font-undo"),
        n = document.getElementById("font-redo");
    _t <= 0 ? t.classList.add("disabled") : t.classList.remove("disabled"),
    _t >= pt.length - 1 ? n.classList.add("disabled") : n.classList.remove("disabled")
}
document.cookie = "promo_shown=1; SameSite=Strict; Secure";
window.dataLayer = window.dataLayer || [];
function Fn() {
    dataLayer.push(arguments)
}
Fn("js", new Date);
Fn("config", "G-7300FPX4EJ");
document.querySelectorAll(".color-input");
const Ra = document.querySelectorAll(".eyedropper");
Ra.forEach(t => {
    t.addEventListener("click", () => {
        new EyeDropper().open().then(e => {
            const c = t.closest(".colors-option").querySelector(".colorpicker");
            c && (c.value = e.sRGBHex, xt())
        })
    })
});
const Ta = document.querySelectorAll(".copy-icon");
Ta.forEach(function(t) {
    t.addEventListener("click", function() {
        const c = t.closest(".color-output").querySelector(".selected-color-code").value;
        navigator.clipboard.writeText(c);
        const l = t.innerHTML;
        t.innerHTML = `
			<svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
			<rect x="1.06797" y="0.905736" width="24.4083" height="24.4083" rx="3.84742" stroke="rgb(24, 172, 122)" stroke-width="0.7" style="opacity:0.3"/>
			<path d="M7 13.5L11.5 18L20 8" stroke="rgb(24, 172, 122)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		`




        ,
        setTimeout(function() {
            t.innerHTML = l
        }, 1e3)
    })
});
