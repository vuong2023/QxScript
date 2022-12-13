/**************************
 *  * @Author: XiaoMao
 * @LastMod: 20212-11-24
 *
spotify自动歌词翻译

********************************
# 小版本更新请查看更新日志 ｜ 或加入xiaomao组织⬇️
# 微信公众号 【小帽集团】
# XiaoMao · Tg频道频道：https://t.me/xiaomaoJT
# XiaoMao · GitHub仓库：https://github.com/xiaomaoJT/QxScript


使用方法：
1、使用BoxJS增加以下脚本订阅。
https://raw.githubusercontent.com/xiaomaoJT/QxScript/main/rewrite/xiaomao/xiaomaoJS/BoxJs/XiaoMao.json

2、根据以下方法注册翻译API，在boxJS中spotify自动翻译里填写AppID和securityKey
https://github.com/xiaomaoJT/QxScript/tree/No_Ad_Branch/rewrite/xiaomao/js#百度翻译api免费注册方法

3、QX > 右下角风车 > 重写 > 规则资源 > 引用以下脚本 > 打开资源解析器
https://raw.githubusercontent.com/xiaomaoJT/QxScript/main/rewrite/boxJS/XiaoMaoSpotify.js

********************************

[mitm]
hostname = spclient.wg.spotify.com

[rewrite_local]
^https:\/\/spclient\.wg\.spotify\.com\/color-lyrics\/v2\/track\/ url script-response-body https://raw.githubusercontent.com/xiaomaoJT/QxScript/main/rewrite/boxJS/XiaoMaoSpotify.js


 */

var $XiaoMao = "";
var appName = "";
var spotifyAppID = "";
var spotifySecurityKey = "";
var options = {
  appid: "",
  securityKey: "",
};

!(async () => {
  await XiaoMaoMao();
})()
  .catch((err) => $XiaoMao.error(err))
  .finally(() => {
    startFunction();
    console.log(appName + "完成");
  });

function XiaoMaoMao() {
  $XiaoMao = API("XiaoMao");
  appName = `XiaoMao-Spotify-我爱歌词`;
  spotifyAppID = $XiaoMao.read("AppID");
  spotifySecurityKey = $XiaoMao.read("securityKey");
  console.log(appName + "开始执行！");
  if (spotifyAppID && spotifySecurityKey) {
    options.appid = spotifyAppID;
    options.securityKey = spotifySecurityKey;
    console.log(appName + "获取key成功!");
    // $XiaoMao.notify(appName, "", "获取key成功");
  } else if (!spotifyAppID) {
    $XiaoMao.notify(appName, "", "AppID为空，需前往BoxJs填写");
    console.log(
      appName +
        "执行异常！" +
        "\n" +
        "XiaoMao-BoxJs订阅：https://raw.githubusercontent.com/xiaomaoJT/QxScript/main/rewrite/xiaomao/xiaomaoJS/BoxJs/XiaoMao.json"
    );
  } else if (!spotifySecurityKey) {
    $XiaoMao.notify(appName, "", "SecurityKey为空，需前往BoxJs填写");
    console.log(
      appName +
        "执行异常！" +
        "\n" +
        "XiaoMao-BoxJs订阅：https://raw.githubusercontent.com/xiaomaoJT/QxScript/main/rewrite/xiaomao/xiaomaoJS/BoxJs/XiaoMao.json"
    );
  } else {
    $XiaoMao.done();
  }

  function ENV() {
    const e = "function" == typeof require && "undefined" != typeof $jsbox;
    return {
      isQX: "undefined" != typeof $task,
      isLoon: "undefined" != typeof $loon,
      isSurge: "undefined" != typeof $httpClient && "undefined" == typeof $loon,
      isBrowser: "undefined" != typeof document,
      isNode: "function" == typeof require && !e,
      isJSBox: e,
      isRequest: "undefined" != typeof $request,
      isScriptable: "undefined" != typeof importModule,
    };
  }
  function HTTP(e = { baseURL: "" }) {
    function t(t, a) {
      a = "string" == typeof a ? { url: a } : a;
      const h = e.baseURL;
      h && !d.test(a.url || "") && (a.url = h ? h + a.url : a.url),
        a.body &&
          a.headers &&
          !a.headers["Content-Type"] &&
          (a.headers["Content-Type"] = "application/x-www-form-urlencoded"),
        (a = { ...e, ...a });
      const c = a.timeout,
        l = {
          onRequest: () => {},
          onResponse: (e) => e,
          onTimeout: () => {},
          ...a.events,
        };
      let f, y;
      if ((l.onRequest(t, a), s)) f = $task.fetch({ method: t, ...a });
      else if (o || n)
        f = new Promise((e, s) => {
          $httpClient[t.toLowerCase()](a, (t, o, n) => {
            t
              ? s(t)
              : e({
                  statusCode: o.status || o.statusCode,
                  headers: o.headers,
                  body: n,
                });
          });
        });
      else if (r) {
        const e = require("got"),
          s = require("iconv-lite");
        f = new Promise((o, n) => {
          e[t.toLowerCase()](a)
            .then((e) =>
              o({
                statusCode: e.statusCode,
                headers: e.headers,
                body: s.decode(e.rawBody, "utf-8"),
              })
            )
            .catch(n);
        });
      } else if (i) {
        const e = new Request(a.url);
        (e.method = t),
          (e.headers = a.headers),
          (e.body = a.body),
          (f = new Promise((t, s) => {
            e.loadString()
              .then((s) => {
                t({
                  statusCode: e.response.statusCode,
                  headers: e.response.headers,
                  body: s,
                });
              })
              .catch((e) => s(e));
          }));
      } else
        u &&
          (f = new Promise((e, s) => {
            fetch(a.url, { method: t, headers: a.headers, body: a.body })
              .then((e) => e.json())
              .then((t) =>
                e({ statusCode: t.status, headers: t.headers, body: t.data })
              )
              .catch(s);
          }));
      const p = c
        ? new Promise((e, s) => {
            y = setTimeout(
              () => (
                l.onTimeout(),
                s(`${t} URL: ${a.url} exceeds the timeout ${c} ms`)
              ),
              c
            );
          })
        : null;
      return (
        p ? Promise.race([p, f]).then((e) => (clearTimeout(y), e)) : f
      ).then((e) => l.onResponse(e));
    }
    const {
        isQX: s,
        isLoon: o,
        isSurge: n,
        isScriptable: i,
        isNode: r,
        isBrowser: u,
      } = ENV(),
      a = ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS", "PATCH"],
      d =
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      h = {};
    return a.forEach((e) => (h[e.toLowerCase()] = (s) => t(e, s))), h;
  }
  function API(e = "untitled", t = !1) {
    const {
      isQX: s,
      isLoon: o,
      isSurge: n,
      isNode: i,
      isJSBox: r,
      isScriptable: u,
    } = ENV();
    return new (class {
      constructor(e, t) {
        (this.name = e),
          (this.debug = t),
          (this.http = HTTP()),
          (this.env = ENV()),
          (this.node = (() => {
            if (i) {
              const e = require("fs");
              return { fs: e };
            }
            return null;
          })()),
          this.initCache();
        const s = (e, t) =>
          new Promise(function (s) {
            setTimeout(s.bind(null, t), e);
          });
        Promise.prototype.delay = function (e) {
          return this.then(function (t) {
            return s(e, t);
          });
        };
      }
      initCache() {
        if (
          (s &&
            (this.cache = JSON.parse($prefs.valueForKey(this.name) || "{}")),
          (o || n) &&
            (this.cache = JSON.parse($persistentStore.read(this.name) || "{}")),
          i)
        ) {
          let e = "root.json";
          this.node.fs.existsSync(e) ||
            this.node.fs.writeFileSync(
              e,
              JSON.stringify({}),
              { flag: "wx" },
              (e) => console.log(e)
            ),
            (this.root = {}),
            (e = `${this.name}.json`),
            this.node.fs.existsSync(e)
              ? (this.cache = JSON.parse(
                  this.node.fs.readFileSync(`${this.name}.json`)
                ))
              : (this.node.fs.writeFileSync(
                  e,
                  JSON.stringify({}),
                  { flag: "wx" },
                  (e) => console.log(e)
                ),
                (this.cache = {}));
        }
      }
      persistCache() {
        const e = JSON.stringify(this.cache, null, 2);
        s && $prefs.setValueForKey(e, this.name),
          (o || n) && $persistentStore.write(e, this.name),
          i &&
            (this.node.fs.writeFileSync(
              `${this.name}.json`,
              e,
              { flag: "w" },
              (e) => console.log(e)
            ),
            this.node.fs.writeFileSync(
              "root.json",
              JSON.stringify(this.root, null, 2),
              { flag: "w" },
              (e) => console.log(e)
            ));
      }
      write(e, t) {
        if ((this.log(`SET ${t}`), -1 !== t.indexOf("#"))) {
          if (((t = t.substr(1)), n || o)) return $persistentStore.write(e, t);
          if (s) return $prefs.setValueForKey(e, t);
          i && (this.root[t] = e);
        } else this.cache[t] = e;
        this.persistCache();
      }
      read(e) {
        return (
          this.log(`READ ${e}`),
          -1 === e.indexOf("#")
            ? this.cache[e]
            : ((e = e.substr(1)),
              n || o
                ? $persistentStore.read(e)
                : s
                ? $prefs.valueForKey(e)
                : i
                ? this.root[e]
                : void 0)
        );
      }
      delete(e) {
        if ((this.log(`DELETE ${e}`), -1 !== e.indexOf("#"))) {
          if (((e = e.substr(1)), n || o))
            return $persistentStore.write(null, e);
          if (s) return $prefs.removeValueForKey(e);
          i && delete this.root[e];
        } else delete this.cache[e];
        this.persistCache();
      }
      notify(e, t = "", a = "", d = {}) {
        const h = d["open-url"],
          c = d["media-url"];
        if (
          (s && $notify(e, t, a, d),
          n &&
            $notification.post(e, t, a + `${c ? "\n多媒体:" + c : ""}`, {
              url: h,
            }),
          o)
        ) {
          let s = {};
          h && (s.openUrl = h),
            c && (s.mediaUrl = c),
            "{}" === JSON.stringify(s)
              ? $notification.post(e, t, a)
              : $notification.post(e, t, a, s);
        }
        if (i || u) {
          const s =
            a + (h ? `\n点击跳转: ${h}` : "") + (c ? `\n多媒体: ${c}` : "");
          if (r) {
            const o = require("push");
            o.schedule({ title: e, body: (t ? t + "\n" : "") + s });
          } else console.log(`${e}\n${t}\n${s}\n\n`);
        }
      }
      log(e) {
        this.debug && console.log(`[${this.name}] LOG: ${this.stringify(e)}`);
      }
      info(e) {
        console.log(`[${this.name}] INFO: ${this.stringify(e)}`);
      }
      error(e) {
        console.log(`[${this.name}] ERROR: ${this.stringify(e)}`);
      }
      wait(e) {
        return new Promise((t) => setTimeout(t, e));
      }
      done(e = {}) {
        s || o || n
          ? $done(e)
          : i &&
            !r &&
            "undefined" != typeof $context &&
            (($context.headers = e.headers),
            ($context.statusCode = e.statusCode),
            ($context.body = e.body));
      }
      stringify(e) {
        if ("string" == typeof e || e instanceof String) return e;
        try {
          return JSON.stringify(e, null, 2);
        } catch (e) {
          return "[object Object]";
        }
      }
    })(e, t);
  }
}

function startFunction() {
  // console.log(options+JSON.stringify(options))
  /************************************************function***************************************************/
  let protobuf;
  !(function (g) {
    "use strict";
    !(function (r, e, t) {
      var i = (function t(i) {
        var n = e[i];
        return (
          n || r[i][0].call((n = e[i] = { exports: {} }), t, n, n.exports),
          n.exports
        );
      })(t[0]);
      (protobuf = i.util.global.protobuf = i),
        "function" == typeof define &&
          define.amd &&
          define(["long"], function (t) {
            return t && t.isLong && ((i.util.Long = t), i.configure()), i;
          }),
        "object" == typeof module &&
          module &&
          module.exports &&
          (module.exports = i);
    })(
      {
        1: [
          function (t, i, n) {
            i.exports = function (t, i) {
              var n = Array(arguments.length - 1),
                s = 0,
                r = 2,
                u = !0;
              for (; r < arguments.length; ) n[s++] = arguments[r++];
              return new Promise(function (r, e) {
                n[s] = function (t) {
                  if (u)
                    if (((u = !1), t)) e(t);
                    else {
                      for (
                        var i = Array(arguments.length - 1), n = 0;
                        n < i.length;

                      )
                        i[n++] = arguments[n];
                      r.apply(null, i);
                    }
                };
                try {
                  t.apply(i || null, n);
                } catch (t) {
                  u && ((u = !1), e(t));
                }
              });
            };
          },
          {},
        ],
        2: [
          function (t, i, n) {
            n.length = function (t) {
              var i = t.length;
              if (!i) return 0;
              for (var n = 0; 1 < --i % 4 && "=" == (t[0 | i] || ""); ) ++n;
              return Math.ceil(3 * t.length) / 4 - n;
            };
            for (var f = Array(64), h = Array(123), r = 0; r < 64; )
              h[
                (f[r] =
                  r < 26
                    ? r + 65
                    : r < 52
                    ? r + 71
                    : r < 62
                    ? r - 4
                    : (r - 59) | 43)
              ] = r++;
            n.encode = function (t, i, n) {
              for (var r, e = null, s = [], u = 0, o = 0; i < n; ) {
                var h = t[i++];
                switch (o) {
                  case 0:
                    (s[u++] = f[h >> 2]), (r = (3 & h) << 4), (o = 1);
                    break;
                  case 1:
                    (s[u++] = f[r | (h >> 4)]), (r = (15 & h) << 2), (o = 2);
                    break;
                  case 2:
                    (s[u++] = f[r | (h >> 6)]), (s[u++] = f[63 & h]), (o = 0);
                }
                8191 < u &&
                  ((e = e || []).push(String.fromCharCode.apply(String, s)),
                  (u = 0));
              }
              return (
                o && ((s[u++] = f[r]), (s[u++] = 61), 1 === o && (s[u++] = 61)),
                e
                  ? (u &&
                      e.push(String.fromCharCode.apply(String, s.slice(0, u))),
                    e.join(""))
                  : String.fromCharCode.apply(String, s.slice(0, u))
              );
            };
            var c = "invalid encoding";
            (n.decode = function (t, i, n) {
              for (var r, e = n, s = 0, u = 0; u < t.length; ) {
                var o = t.charCodeAt(u++);
                if (61 == o && 1 < s) break;
                if ((o = h[o]) === g) throw Error(c);
                switch (s) {
                  case 0:
                    (r = o), (s = 1);
                    break;
                  case 1:
                    (i[n++] = (r << 2) | ((48 & o) >> 4)), (r = o), (s = 2);
                    break;
                  case 2:
                    (i[n++] = ((15 & r) << 4) | ((60 & o) >> 2)),
                      (r = o),
                      (s = 3);
                    break;
                  case 3:
                    (i[n++] = ((3 & r) << 6) | o), (s = 0);
                }
              }
              if (1 === s) throw Error(c);
              return n - e;
            }),
              (n.test = function (t) {
                return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(
                  t
                );
              });
          },
          {},
        ],
        3: [
          function (t, i, n) {
            function a(i, n) {
              "string" == typeof i && ((n = i), (i = g));
              var h = [];
              function f(t) {
                if ("string" != typeof t) {
                  var i = c();
                  if (
                    (a.verbose && console.log("codegen: " + i),
                    (i = "return " + i),
                    t)
                  ) {
                    for (
                      var n = Object.keys(t),
                        r = Array(n.length + 1),
                        e = Array(n.length),
                        s = 0;
                      s < n.length;

                    )
                      (r[s] = n[s]), (e[s] = t[n[s++]]);
                    return (r[s] = i), Function.apply(null, r).apply(null, e);
                  }
                  return Function(i)();
                }
                for (var u = Array(arguments.length - 1), o = 0; o < u.length; )
                  u[o] = arguments[++o];
                if (
                  ((o = 0),
                  (t = t.replace(/%([%dfijs])/g, function (t, i) {
                    var n = u[o++];
                    switch (i) {
                      case "d":
                      case "f":
                        return "" + +("" + n);
                      case "i":
                        return "" + Math.floor(n);
                      case "j":
                        return JSON.stringify(n);
                      case "s":
                        return "" + n;
                    }
                    return "%";
                  })),
                  o !== u.length)
                )
                  throw Error("parameter count mismatch");
                return h.push(t), f;
              }
              function c(t) {
                return (
                  "function " +
                  (t || n || "") +
                  "(" +
                  ((i && i.join(",")) || "") +
                  "){\n  " +
                  h.join("\n  ") +
                  "\n}"
                );
              }
              return (f.toString = c), f;
            }
            (i.exports = a).verbose = !1;
          },
          {},
        ],
        4: [
          function (t, i, n) {
            function r() {
              this.t = {};
            }
            ((i.exports = r).prototype.on = function (t, i, n) {
              return (
                (this.t[t] || (this.t[t] = [])).push({ fn: i, ctx: n || this }),
                this
              );
            }),
              (r.prototype.off = function (t, i) {
                if (t === g) this.t = {};
                else if (i === g) this.t[t] = [];
                else
                  for (var n = this.t[t], r = 0; r < n.length; )
                    n[r].fn === i ? n.splice(r, 1) : ++r;
                return this;
              }),
              (r.prototype.emit = function (t) {
                var i = this.t[t];
                if (i) {
                  for (var n = [], r = 1; r < arguments.length; )
                    n.push(arguments[r++]);
                  for (r = 0; r < i.length; ) i[r].fn.apply(i[r++].ctx, n);
                }
                return this;
              });
          },
          {},
        ],
        5: [
          function (t, i, n) {
            i.exports = o;
            var s = t(1),
              u = t(7)("fs");
            function o(n, r, e) {
              return (
                (r = "function" == typeof r ? ((e = r), {}) : r || {}),
                e
                  ? !r.xhr && u && u.readFile
                    ? u.readFile(n, function (t, i) {
                        return t && "undefined" != typeof XMLHttpRequest
                          ? o.xhr(n, r, e)
                          : t
                          ? e(t)
                          : e(null, r.binary ? i : i.toString("utf8"));
                      })
                    : o.xhr(n, r, e)
                  : s(o, this, n, r)
              );
            }
            o.xhr = function (t, n, r) {
              var e = new XMLHttpRequest();
              (e.onreadystatechange = function () {
                if (4 !== e.readyState) return g;
                if (0 !== e.status && 200 !== e.status)
                  return r(Error("status " + e.status));
                if (n.binary) {
                  if (!(t = e.response))
                    for (var t = [], i = 0; i < e.responseText.length; ++i)
                      t.push(255 & e.responseText.charCodeAt(i));
                  return r(
                    null,
                    "undefined" != typeof Uint8Array ? new Uint8Array(t) : t
                  );
                }
                return r(null, e.responseText);
              }),
                n.binary &&
                  ("overrideMimeType" in e &&
                    e.overrideMimeType("text/plain; charset=x-user-defined"),
                  (e.responseType = "arraybuffer")),
                e.open("GET", t),
                e.send();
            };
          },
          { 1: 1, 7: 7 },
        ],
        6: [
          function (t, i, n) {
            function r(t) {
              function i(t, i, n, r) {
                var e = i < 0 ? 1 : 0;
                t(
                  0 === (i = e ? -i : i)
                    ? 0 < 1 / i
                      ? 0
                      : 2147483648
                    : isNaN(i)
                    ? 2143289344
                    : 34028234663852886e22 < i
                    ? ((e << 31) | 2139095040) >>> 0
                    : i < 11754943508222875e-54
                    ? ((e << 31) | Math.round(i / 1401298464324817e-60)) >>> 0
                    : ((e << 31) |
                        ((127 + (t = Math.floor(Math.log(i) / Math.LN2))) <<
                          23) |
                        (8388607 &
                          Math.round(i * Math.pow(2, -t) * 8388608))) >>>
                      0,
                  n,
                  r
                );
              }
              function n(t, i, n) {
                (t = t(i, n)),
                  (i = 2 * (t >> 31) + 1),
                  (n = (t >>> 23) & 255),
                  (t &= 8388607);
                return 255 == n
                  ? t
                    ? NaN
                    : (1 / 0) * i
                  : 0 == n
                  ? 1401298464324817e-60 * i * t
                  : i * Math.pow(2, n - 150) * (8388608 + t);
              }
              function r(t, i, n) {
                (o[0] = t),
                  (i[n] = h[0]),
                  (i[n + 1] = h[1]),
                  (i[n + 2] = h[2]),
                  (i[n + 3] = h[3]);
              }
              function e(t, i, n) {
                (o[0] = t),
                  (i[n] = h[3]),
                  (i[n + 1] = h[2]),
                  (i[n + 2] = h[1]),
                  (i[n + 3] = h[0]);
              }
              function s(t, i) {
                return (
                  (h[0] = t[i]),
                  (h[1] = t[i + 1]),
                  (h[2] = t[i + 2]),
                  (h[3] = t[i + 3]),
                  o[0]
                );
              }
              function u(t, i) {
                return (
                  (h[3] = t[i]),
                  (h[2] = t[i + 1]),
                  (h[1] = t[i + 2]),
                  (h[0] = t[i + 3]),
                  o[0]
                );
              }
              var o, h, f, c, a;
              function l(t, i, n, r, e, s) {
                var u,
                  o = r < 0 ? 1 : 0;
                0 === (r = o ? -r : r)
                  ? (t(0, e, s + i), t(0 < 1 / r ? 0 : 2147483648, e, s + n))
                  : isNaN(r)
                  ? (t(0, e, s + i), t(2146959360, e, s + n))
                  : 17976931348623157e292 < r
                  ? (t(0, e, s + i),
                    t(((o << 31) | 2146435072) >>> 0, e, s + n))
                  : r < 22250738585072014e-324
                  ? (t((u = r / 5e-324) >>> 0, e, s + i),
                    t(((o << 31) | (u / 4294967296)) >>> 0, e, s + n))
                  : (t(
                      (4503599627370496 *
                        (u =
                          r *
                          Math.pow(
                            2,
                            -(r =
                              1024 === (r = Math.floor(Math.log(r) / Math.LN2))
                                ? 1023
                                : r)
                          ))) >>>
                        0,
                      e,
                      s + i
                    ),
                    t(
                      ((o << 31) |
                        ((r + 1023) << 20) |
                        ((1048576 * u) & 1048575)) >>>
                        0,
                      e,
                      s + n
                    ));
              }
              function d(t, i, n, r, e) {
                (i = t(r, e + i)),
                  (t = t(r, e + n)),
                  (r = 2 * (t >> 31) + 1),
                  (e = (t >>> 20) & 2047),
                  (n = 4294967296 * (1048575 & t) + i);
                return 2047 == e
                  ? n
                    ? NaN
                    : (1 / 0) * r
                  : 0 == e
                  ? 5e-324 * r * n
                  : r * Math.pow(2, e - 1075) * (n + 4503599627370496);
              }
              function v(t, i, n) {
                (f[0] = t),
                  (i[n] = c[0]),
                  (i[n + 1] = c[1]),
                  (i[n + 2] = c[2]),
                  (i[n + 3] = c[3]),
                  (i[n + 4] = c[4]),
                  (i[n + 5] = c[5]),
                  (i[n + 6] = c[6]),
                  (i[n + 7] = c[7]);
              }
              function b(t, i, n) {
                (f[0] = t),
                  (i[n] = c[7]),
                  (i[n + 1] = c[6]),
                  (i[n + 2] = c[5]),
                  (i[n + 3] = c[4]),
                  (i[n + 4] = c[3]),
                  (i[n + 5] = c[2]),
                  (i[n + 6] = c[1]),
                  (i[n + 7] = c[0]);
              }
              function p(t, i) {
                return (
                  (c[0] = t[i]),
                  (c[1] = t[i + 1]),
                  (c[2] = t[i + 2]),
                  (c[3] = t[i + 3]),
                  (c[4] = t[i + 4]),
                  (c[5] = t[i + 5]),
                  (c[6] = t[i + 6]),
                  (c[7] = t[i + 7]),
                  f[0]
                );
              }
              function y(t, i) {
                return (
                  (c[7] = t[i]),
                  (c[6] = t[i + 1]),
                  (c[5] = t[i + 2]),
                  (c[4] = t[i + 3]),
                  (c[3] = t[i + 4]),
                  (c[2] = t[i + 5]),
                  (c[1] = t[i + 6]),
                  (c[0] = t[i + 7]),
                  f[0]
                );
              }
              return (
                "undefined" != typeof Float32Array
                  ? ((o = new Float32Array([-0])),
                    (h = new Uint8Array(o.buffer)),
                    (a = 128 === h[3]),
                    (t.writeFloatLE = a ? r : e),
                    (t.writeFloatBE = a ? e : r),
                    (t.readFloatLE = a ? s : u),
                    (t.readFloatBE = a ? u : s))
                  : ((t.writeFloatLE = i.bind(null, m)),
                    (t.writeFloatBE = i.bind(null, w)),
                    (t.readFloatLE = n.bind(null, g)),
                    (t.readFloatBE = n.bind(null, j))),
                "undefined" != typeof Float64Array
                  ? ((f = new Float64Array([-0])),
                    (c = new Uint8Array(f.buffer)),
                    (a = 128 === c[7]),
                    (t.writeDoubleLE = a ? v : b),
                    (t.writeDoubleBE = a ? b : v),
                    (t.readDoubleLE = a ? p : y),
                    (t.readDoubleBE = a ? y : p))
                  : ((t.writeDoubleLE = l.bind(null, m, 0, 4)),
                    (t.writeDoubleBE = l.bind(null, w, 4, 0)),
                    (t.readDoubleLE = d.bind(null, g, 0, 4)),
                    (t.readDoubleBE = d.bind(null, j, 4, 0))),
                t
              );
            }
            function m(t, i, n) {
              (i[n] = 255 & t),
                (i[n + 1] = (t >>> 8) & 255),
                (i[n + 2] = (t >>> 16) & 255),
                (i[n + 3] = t >>> 24);
            }
            function w(t, i, n) {
              (i[n] = t >>> 24),
                (i[n + 1] = (t >>> 16) & 255),
                (i[n + 2] = (t >>> 8) & 255),
                (i[n + 3] = 255 & t);
            }
            function g(t, i) {
              return (
                (t[i] |
                  (t[i + 1] << 8) |
                  (t[i + 2] << 16) |
                  (t[i + 3] << 24)) >>>
                0
              );
            }
            function j(t, i) {
              return (
                ((t[i] << 24) |
                  (t[i + 1] << 16) |
                  (t[i + 2] << 8) |
                  t[i + 3]) >>>
                0
              );
            }
            i.exports = r(r);
          },
          {},
        ],
        7: [
          function (t, i, n) {
            function r(t) {
              try {
                var i = eval("require")(t);
                if (i && (i.length || Object.keys(i).length)) return i;
              } catch (t) {}
              return null;
            }
            i.exports = r;
          },
          {},
        ],
        8: [
          function (t, i, n) {
            var e = (n.isAbsolute = function (t) {
                return /^(?:\/|\w+:)/.test(t);
              }),
              r = (n.normalize = function (t) {
                var i = (t = t
                    .replace(/\\/g, "/")
                    .replace(/\/{2,}/g, "/")).split("/"),
                  n = e(t),
                  t = "";
                n && (t = i.shift() + "/");
                for (var r = 0; r < i.length; )
                  ".." === i[r]
                    ? 0 < r && ".." !== i[r - 1]
                      ? i.splice(--r, 2)
                      : n
                      ? i.splice(r, 1)
                      : ++r
                    : "." === i[r]
                    ? i.splice(r, 1)
                    : ++r;
                return t + i.join("/");
              });
            n.resolve = function (t, i, n) {
              return (
                n || (i = r(i)),
                !e(i) &&
                (t = (t = n ? t : r(t)).replace(/(?:\/|^)[^/]+$/, "")).length
                  ? r(t + "/" + i)
                  : i
              );
            };
          },
          {},
        ],
        9: [
          function (t, i, n) {
            i.exports = function (i, n, t) {
              var r = t || 8192,
                e = r >>> 1,
                s = null,
                u = r;
              return function (t) {
                if (t < 1 || e < t) return i(t);
                r < u + t && ((s = i(r)), (u = 0));
                t = n.call(s, u, (u += t));
                return 7 & u && (u = 1 + (7 | u)), t;
              };
            };
          },
          {},
        ],
        10: [
          function (t, i, n) {
            (n.length = function (t) {
              for (var i, n = 0, r = 0; r < t.length; ++r)
                (i = t.charCodeAt(r)) < 128
                  ? (n += 1)
                  : i < 2048
                  ? (n += 2)
                  : 55296 == (64512 & i) &&
                    56320 == (64512 & t.charCodeAt(r + 1))
                  ? (++r, (n += 4))
                  : (n += 3);
              return n;
            }),
              (n.read = function (t, i, n) {
                if (n - i < 1) return "";
                for (var r, e = null, s = [], u = 0; i < n; )
                  (r = t[i++]) < 128
                    ? (s[u++] = r)
                    : 191 < r && r < 224
                    ? (s[u++] = ((31 & r) << 6) | (63 & t[i++]))
                    : 239 < r && r < 365
                    ? ((r =
                        (((7 & r) << 18) |
                          ((63 & t[i++]) << 12) |
                          ((63 & t[i++]) << 6) |
                          (63 & t[i++])) -
                        65536),
                      (s[u++] = 55296 + (r >> 10)),
                      (s[u++] = 56320 + (1023 & r)))
                    : (s[u++] =
                        ((15 & r) << 12) |
                        ((63 & t[i++]) << 6) |
                        (63 & t[i++])),
                    8191 < u &&
                      ((e = e || []).push(String.fromCharCode.apply(String, s)),
                      (u = 0));
                return e
                  ? (u &&
                      e.push(String.fromCharCode.apply(String, s.slice(0, u))),
                    e.join(""))
                  : String.fromCharCode.apply(String, s.slice(0, u));
              }),
              (n.write = function (t, i, n) {
                for (var r, e, s = n, u = 0; u < t.length; ++u)
                  (r = t.charCodeAt(u)) < 128
                    ? (i[n++] = r)
                    : (r < 2048
                        ? (i[n++] = (r >> 6) | 192)
                        : (55296 == (64512 & r) &&
                          56320 == (64512 & (e = t.charCodeAt(u + 1)))
                            ? (++u,
                              (i[n++] =
                                ((r =
                                  65536 + ((1023 & r) << 10) + (1023 & e)) >>
                                  18) |
                                240),
                              (i[n++] = ((r >> 12) & 63) | 128))
                            : (i[n++] = (r >> 12) | 224),
                          (i[n++] = ((r >> 6) & 63) | 128)),
                      (i[n++] = (63 & r) | 128));
                return n - s;
              });
          },
          {},
        ],
        11: [
          function (t, i, n) {
            var l = t(14),
              d = t(33);
            function u(t, i, n, r) {
              var e = !1;
              if (i.resolvedType)
                if (i.resolvedType instanceof l) {
                  t("switch(d%s){", r);
                  for (
                    var s = i.resolvedType.values, u = Object.keys(s), o = 0;
                    o < u.length;
                    ++o
                  )
                    s[u[o]] !== i.typeDefault ||
                      e ||
                      (t("default:")(
                        'if(typeof(d%s)==="number"){m%s=d%s;break}',
                        r,
                        r,
                        r
                      ),
                      i.repeated || t("break"),
                      (e = !0)),
                      t("case%j:", u[o])("case %i:", s[u[o]])(
                        "m%s=%j",
                        r,
                        s[u[o]]
                      )("break");
                  t("}");
                } else
                  t('if(typeof d%s!=="object")', r)(
                    "throw TypeError(%j)",
                    i.fullName + ": object expected"
                  )("m%s=types[%i].fromObject(d%s)", r, n, r);
              else {
                var h = !1;
                switch (i.type) {
                  case "double":
                  case "float":
                    t("m%s=Number(d%s)", r, r);
                    break;
                  case "uint32":
                  case "fixed32":
                    t("m%s=d%s>>>0", r, r);
                    break;
                  case "int32":
                  case "sint32":
                  case "sfixed32":
                    t("m%s=d%s|0", r, r);
                    break;
                  case "uint64":
                    h = !0;
                  case "int64":
                  case "sint64":
                  case "fixed64":
                  case "sfixed64":
                    t("if(util.Long)")(
                      "(m%s=util.Long.fromValue(d%s)).unsigned=%j",
                      r,
                      r,
                      h
                    )('else if(typeof d%s==="string")', r)(
                      "m%s=parseInt(d%s,10)",
                      r,
                      r
                    )('else if(typeof d%s==="number")', r)(
                      "m%s=d%s",
                      r,
                      r
                    )('else if(typeof d%s==="object")', r)(
                      "m%s=new util.LongBits(d%s.low>>>0,d%s.high>>>0).toNumber(%s)",
                      r,
                      r,
                      r,
                      h ? "true" : ""
                    );
                    break;
                  case "bytes":
                    t('if(typeof d%s==="string")', r)(
                      "util.base64.decode(d%s,m%s=util.newBuffer(util.base64.length(d%s)),0)",
                      r,
                      r,
                      r
                    )("else if(d%s.length >= 0)", r)("m%s=d%s", r, r);
                    break;
                  case "string":
                    t("m%s=String(d%s)", r, r);
                    break;
                  case "bool":
                    t("m%s=Boolean(d%s)", r, r);
                }
              }
              return t;
            }
            function v(t, i, n, r) {
              if (i.resolvedType)
                i.resolvedType instanceof l
                  ? t(
                      "d%s=o.enums===String?(types[%i].values[m%s]===undefined?m%s:types[%i].values[m%s]):m%s",
                      r,
                      n,
                      r,
                      r,
                      n,
                      r,
                      r
                    )
                  : t("d%s=types[%i].toObject(m%s,o)", r, n, r);
              else {
                var e = !1;
                switch (i.type) {
                  case "double":
                  case "float":
                    t("d%s=o.json&&!isFinite(m%s)?String(m%s):m%s", r, r, r, r);
                    break;
                  case "uint64":
                    e = !0;
                  case "int64":
                  case "sint64":
                  case "fixed64":
                  case "sfixed64":
                    t('if(typeof m%s==="number")', r)(
                      "d%s=o.longs===String?String(m%s):m%s",
                      r,
                      r,
                      r
                    )("else")(
                      "d%s=o.longs===String?util.Long.prototype.toString.call(m%s):o.longs===Number?new util.LongBits(m%s.low>>>0,m%s.high>>>0).toNumber(%s):m%s",
                      r,
                      r,
                      r,
                      r,
                      e ? "true" : "",
                      r
                    );
                    break;
                  case "bytes":
                    t(
                      "d%s=o.bytes===String?util.base64.encode(m%s,0,m%s.length):o.bytes===Array?Array.prototype.slice.call(m%s):m%s",
                      r,
                      r,
                      r,
                      r,
                      r
                    );
                    break;
                  default:
                    t("d%s=m%s", r, r);
                }
              }
              return t;
            }
            (n.fromObject = function (t) {
              var i = t.fieldsArray,
                n = d.codegen(
                  ["d"],
                  t.name + "$fromObject"
                )("if(d instanceof this.ctor)")("return d");
              if (!i.length) return n("return new this.ctor");
              n("var m=new this.ctor");
              for (var r = 0; r < i.length; ++r) {
                var e = i[r].resolve(),
                  s = d.safeProp(e.name);
                e.map
                  ? (n("if(d%s){", s)('if(typeof d%s!=="object")', s)(
                      "throw TypeError(%j)",
                      e.fullName + ": object expected"
                    )("m%s={}", s)(
                      "for(var ks=Object.keys(d%s),i=0;i<ks.length;++i){",
                      s
                    ),
                    u(n, e, r, s + "[ks[i]]")("}")("}"))
                  : e.repeated
                  ? (n("if(d%s){", s)("if(!Array.isArray(d%s))", s)(
                      "throw TypeError(%j)",
                      e.fullName + ": array expected"
                    )("m%s=[]", s)("for(var i=0;i<d%s.length;++i){", s),
                    u(n, e, r, s + "[i]")("}")("}"))
                  : (e.resolvedType instanceof l || n("if(d%s!=null){", s),
                    u(n, e, r, s),
                    e.resolvedType instanceof l || n("}"));
              }
              return n("return m");
            }),
              (n.toObject = function (t) {
                var i = t.fieldsArray.slice().sort(d.compareFieldsById);
                if (!i.length) return d.codegen()("return {}");
                for (
                  var n = d.codegen(["m", "o"], t.name + "$toObject")("if(!o)")(
                      "o={}"
                    )("var d={}"),
                    r = [],
                    e = [],
                    s = [],
                    u = 0;
                  u < i.length;
                  ++u
                )
                  i[u].partOf ||
                    (i[u].resolve().repeated ? r : i[u].map ? e : s).push(i[u]);
                if (r.length) {
                  for (n("if(o.arrays||o.defaults){"), u = 0; u < r.length; ++u)
                    n("d%s=[]", d.safeProp(r[u].name));
                  n("}");
                }
                if (e.length) {
                  for (
                    n("if(o.objects||o.defaults){"), u = 0;
                    u < e.length;
                    ++u
                  )
                    n("d%s={}", d.safeProp(e[u].name));
                  n("}");
                }
                if (s.length) {
                  for (n("if(o.defaults){"), u = 0; u < s.length; ++u) {
                    var o,
                      h = s[u],
                      f = d.safeProp(h.name);
                    h.resolvedType instanceof l
                      ? n(
                          "d%s=o.enums===String?%j:%j",
                          f,
                          h.resolvedType.valuesById[h.typeDefault],
                          h.typeDefault
                        )
                      : h.long
                      ? n("if(util.Long){")(
                          "var n=new util.Long(%i,%i,%j)",
                          h.typeDefault.low,
                          h.typeDefault.high,
                          h.typeDefault.unsigned
                        )(
                          "d%s=o.longs===String?n.toString():o.longs===Number?n.toNumber():n",
                          f
                        )("}else")(
                          "d%s=o.longs===String?%j:%i",
                          f,
                          h.typeDefault.toString(),
                          h.typeDefault.toNumber()
                        )
                      : h.bytes
                      ? ((o =
                          "[" +
                          Array.prototype.slice.call(h.typeDefault).join(",") +
                          "]"),
                        n(
                          "if(o.bytes===String)d%s=%j",
                          f,
                          String.fromCharCode.apply(String, h.typeDefault)
                        )("else{")("d%s=%s", f, o)(
                          "if(o.bytes!==Array)d%s=util.newBuffer(d%s)",
                          f,
                          f
                        )("}"))
                      : n("d%s=%j", f, h.typeDefault);
                  }
                  n("}");
                }
                for (var c = !1, u = 0; u < i.length; ++u) {
                  var h = i[u],
                    a = t.i.indexOf(h),
                    f = d.safeProp(h.name);
                  h.map
                    ? (c || ((c = !0), n("var ks2")),
                      n(
                        "if(m%s&&(ks2=Object.keys(m%s)).length){",
                        f,
                        f
                      )(
                        "d%s={}",
                        f
                      )("for(var j=0;j<ks2.length;++j){"),
                      v(n, h, a, f + "[ks2[j]]")("}"))
                    : h.repeated
                    ? (n("if(m%s&&m%s.length){", f, f)("d%s=[]", f)(
                        "for(var j=0;j<m%s.length;++j){",
                        f
                      ),
                      v(n, h, a, f + "[j]")("}"))
                    : (n("if(m%s!=null&&m.hasOwnProperty(%j)){", f, h.name),
                      v(n, h, a, f),
                      h.partOf &&
                        n("if(o.oneofs)")(
                          "d%s=%j",
                          d.safeProp(h.partOf.name),
                          h.name
                        )),
                    n("}");
                }
                return n("return d");
              });
          },
          { 14: 14, 33: 33 },
        ],
        12: [
          function (t, i, n) {
            i.exports = function (t) {
              var i = f.codegen(
                ["r", "l"],
                t.name + "$decode"
              )("if(!(r instanceof Reader))")("r=Reader.create(r)")(
                "var c=l===undefined?r.len:r.pos+l,m=new this.ctor" +
                  (t.fieldsArray.filter(function (t) {
                    return t.map;
                  }).length
                    ? ",k,value"
                    : "")
              )("while(r.pos<c){")("var t=r.uint32()");
              t.group && i("if((t&7)===4)")("break");
              i("switch(t>>>3){");
              for (var n = 0; n < t.fieldsArray.length; ++n) {
                var r = t.i[n].resolve(),
                  e = r.resolvedType instanceof o ? "int32" : r.type,
                  s = "m" + f.safeProp(r.name);
                i("case %i: {", r.id),
                  r.map
                    ? (i("if(%s===util.emptyObject)", s)("%s={}", s)(
                        "var c2 = r.uint32()+r.pos"
                      ),
                      h.defaults[r.keyType] !== g
                        ? i("k=%j", h.defaults[r.keyType])
                        : i("k=null"),
                      h.defaults[e] !== g
                        ? i("value=%j", h.defaults[e])
                        : i("value=null"),
                      i("while(r.pos<c2){")("var tag2=r.uint32()")(
                        "switch(tag2>>>3){"
                      )(
                        "case 1: k=r.%s(); break",
                        r.keyType
                      )("case 2:"),
                      h.basic[e] === g
                        ? i("value=types[%i].decode(r,r.uint32())", n)
                        : i("value=r.%s()", e),
                      i("break")("default:")("r.skipType(tag2&7)")("break")(
                        "}"
                      )("}"),
                      h.long[r.keyType] !== g
                        ? i(
                            '%s[typeof k==="object"?util.longToHash(k):k]=value',
                            s
                          )
                        : i("%s[k]=value", s))
                    : r.repeated
                    ? (i("if(!(%s&&%s.length))", s, s)("%s=[]", s),
                      h.packed[e] !== g &&
                        i("if((t&7)===2){")("var c2=r.uint32()+r.pos")(
                          "while(r.pos<c2)"
                        )(
                          "%s.push(r.%s())",
                          s,
                          e
                        )("}else"),
                      h.basic[e] === g
                        ? i(
                            r.resolvedType.group
                              ? "%s.push(types[%i].decode(r))"
                              : "%s.push(types[%i].decode(r,r.uint32()))",
                            s,
                            n
                          )
                        : i("%s.push(r.%s())", s, e))
                    : h.basic[e] === g
                    ? i(
                        r.resolvedType.group
                          ? "%s=types[%i].decode(r)"
                          : "%s=types[%i].decode(r,r.uint32())",
                        s,
                        n
                      )
                    : i("%s=r.%s()", s, e),
                  i("break")("}");
              }
              for (
                i("default:")("r.skipType(t&7)")("break")("}")("}"), n = 0;
                n < t.i.length;
                ++n
              ) {
                var u = t.i[n];
                u.required &&
                  i("if(!m.hasOwnProperty(%j))", u.name)(
                    "throw util.ProtocolError(%j,{instance:m})",
                    "missing required '" + u.name + "'"
                  );
              }
              return i("return m");
            };
            var o = t(14),
              h = t(32),
              f = t(33);
          },
          { 14: 14, 32: 32, 33: 33 },
        ],
        13: [
          function (t, i, n) {
            i.exports = function (t) {
              for (
                var i,
                  n = a.codegen(["m", "w"], t.name + "$encode")("if(!w)")(
                    "w=Writer.create()"
                  ),
                  r = t.fieldsArray.slice().sort(a.compareFieldsById),
                  e = 0;
                e < r.length;
                ++e
              ) {
                var s = r[e].resolve(),
                  u = t.i.indexOf(s),
                  o = s.resolvedType instanceof f ? "int32" : s.type,
                  h = c.basic[o];
                (i = "m" + a.safeProp(s.name)),
                  s.map
                    ? (n(
                        "if(%s!=null&&Object.hasOwnProperty.call(m,%j)){",
                        i,
                        s.name
                      )("for(var ks=Object.keys(%s),i=0;i<ks.length;++i){", i)(
                        "w.uint32(%i).fork().uint32(%i).%s(ks[i])",
                        ((s.id << 3) | 2) >>> 0,
                        8 | c.mapKey[s.keyType],
                        s.keyType
                      ),
                      h === g
                        ? n(
                            "types[%i].encode(%s[ks[i]],w.uint32(18).fork()).ldelim().ldelim()",
                            u,
                            i
                          )
                        : n(".uint32(%i).%s(%s[ks[i]]).ldelim()", 16 | h, o, i),
                      n("}")("}"))
                    : s.repeated
                    ? (n("if(%s!=null&&%s.length){", i, i),
                      s.packed && c.packed[o] !== g
                        ? n("w.uint32(%i).fork()", ((s.id << 3) | 2) >>> 0)(
                            "for(var i=0;i<%s.length;++i)",
                            i
                          )(
                            "w.%s(%s[i])",
                            o,
                            i
                          )("w.ldelim()")
                        : (n("for(var i=0;i<%s.length;++i)", i),
                          h === g
                            ? l(n, s, u, i + "[i]")
                            : n(
                                "w.uint32(%i).%s(%s[i])",
                                ((s.id << 3) | h) >>> 0,
                                o,
                                i
                              )),
                      n("}"))
                    : (s.optional &&
                        n(
                          "if(%s!=null&&Object.hasOwnProperty.call(m,%j))",
                          i,
                          s.name
                        ),
                      h === g
                        ? l(n, s, u, i)
                        : n(
                            "w.uint32(%i).%s(%s)",
                            ((s.id << 3) | h) >>> 0,
                            o,
                            i
                          ));
              }
              return n("return w");
            };
            var f = t(14),
              c = t(32),
              a = t(33);
            function l(t, i, n, r) {
              i.resolvedType.group
                ? t(
                    "types[%i].encode(%s,w.uint32(%i)).uint32(%i)",
                    n,
                    r,
                    ((i.id << 3) | 3) >>> 0,
                    ((i.id << 3) | 4) >>> 0
                  )
                : t(
                    "types[%i].encode(%s,w.uint32(%i).fork()).ldelim()",
                    n,
                    r,
                    ((i.id << 3) | 2) >>> 0
                  );
            }
          },
          { 14: 14, 32: 32, 33: 33 },
        ],
        14: [
          function (t, i, n) {
            i.exports = s;
            var h = t(22),
              r =
                ((((s.prototype = Object.create(h.prototype)).constructor =
                  s).className = "Enum"),
                t(21)),
              e = t(33);
            function s(t, i, n, r, e, s) {
              if ((h.call(this, t, n), i && "object" != typeof i))
                throw TypeError("values must be an object");
              if (
                ((this.valuesById = {}),
                (this.values = Object.create(this.valuesById)),
                (this.comment = r),
                (this.comments = e || {}),
                (this.valuesOptions = s),
                (this.reserved = g),
                i)
              )
                for (var u = Object.keys(i), o = 0; o < u.length; ++o)
                  "number" == typeof i[u[o]] &&
                    (this.valuesById[(this.values[u[o]] = i[u[o]])] = u[o]);
            }
            (s.fromJSON = function (t, i) {
              t = new s(t, i.values, i.options, i.comment, i.comments);
              return (t.reserved = i.reserved), t;
            }),
              (s.prototype.toJSON = function (t) {
                t = !!t && !!t.keepComments;
                return e.toObject([
                  "options",
                  this.options,
                  "valuesOptions",
                  this.valuesOptions,
                  "values",
                  this.values,
                  "reserved",
                  this.reserved && this.reserved.length ? this.reserved : g,
                  "comment",
                  t ? this.comment : g,
                  "comments",
                  t ? this.comments : g,
                ]);
              }),
              (s.prototype.add = function (t, i, n, r) {
                if (!e.isString(t)) throw TypeError("name must be a string");
                if (!e.isInteger(i)) throw TypeError("id must be an integer");
                if (this.values[t] !== g)
                  throw Error("duplicate name '" + t + "' in " + this);
                if (this.isReservedId(i))
                  throw Error("id " + i + " is reserved in " + this);
                if (this.isReservedName(t))
                  throw Error("name '" + t + "' is reserved in " + this);
                if (this.valuesById[i] !== g) {
                  if (!this.options || !this.options.allow_alias)
                    throw Error("duplicate id " + i + " in " + this);
                  this.values[t] = i;
                } else this.valuesById[(this.values[t] = i)] = t;
                return (
                  r &&
                    (this.valuesOptions === g && (this.valuesOptions = {}),
                    (this.valuesOptions[t] = r || null)),
                  (this.comments[t] = n || null),
                  this
                );
              }),
              (s.prototype.remove = function (t) {
                if (!e.isString(t)) throw TypeError("name must be a string");
                var i = this.values[t];
                if (null == i)
                  throw Error("name '" + t + "' does not exist in " + this);
                return (
                  delete this.valuesById[i],
                  delete this.values[t],
                  delete this.comments[t],
                  this.valuesOptions && delete this.valuesOptions[t],
                  this
                );
              }),
              (s.prototype.isReservedId = function (t) {
                return r.isReservedId(this.reserved, t);
              }),
              (s.prototype.isReservedName = function (t) {
                return r.isReservedName(this.reserved, t);
              });
          },
          { 21: 21, 22: 22, 33: 33 },
        ],
        15: [
          function (t, i, n) {
            i.exports = u;
            var r,
              o = t(22),
              e =
                ((((u.prototype = Object.create(o.prototype)).constructor =
                  u).className = "Field"),
                t(14)),
              h = t(32),
              f = t(33),
              c = /^required|optional|repeated$/;
            function u(t, i, n, r, e, s, u) {
              if (
                (f.isObject(r)
                  ? ((u = e), (s = r), (r = e = g))
                  : f.isObject(e) && ((u = s), (s = e), (e = g)),
                o.call(this, t, s),
                !f.isInteger(i) || i < 0)
              )
                throw TypeError("id must be a non-negative integer");
              if (!f.isString(n)) throw TypeError("type must be a string");
              if (r !== g && !c.test((r = r.toString().toLowerCase())))
                throw TypeError("rule must be a string rule");
              if (e !== g && !f.isString(e))
                throw TypeError("extend must be a string");
              (this.rule =
                (r = "proto3_optional" === r ? "optional" : r) &&
                "optional" !== r
                  ? r
                  : g),
                (this.type = n),
                (this.id = i),
                (this.extend = e || g),
                (this.required = "required" === r),
                (this.optional = !this.required),
                (this.repeated = "repeated" === r),
                (this.map = !1),
                (this.message = null),
                (this.partOf = null),
                (this.typeDefault = null),
                (this.defaultValue = null),
                (this.long = !!f.Long && h.long[n] !== g),
                (this.bytes = "bytes" === n),
                (this.resolvedType = null),
                (this.extensionField = null),
                (this.declaringField = null),
                (this.n = null),
                (this.comment = u);
            }
            (u.fromJSON = function (t, i) {
              return new u(
                t,
                i.id,
                i.type,
                i.rule,
                i.extend,
                i.options,
                i.comment
              );
            }),
              Object.defineProperty(u.prototype, "packed", {
                get: function () {
                  return (
                    null === this.n &&
                      (this.n = !1 !== this.getOption("packed")),
                    this.n
                  );
                },
              }),
              (u.prototype.setOption = function (t, i, n) {
                return (
                  "packed" === t && (this.n = null),
                  o.prototype.setOption.call(this, t, i, n)
                );
              }),
              (u.prototype.toJSON = function (t) {
                t = !!t && !!t.keepComments;
                return f.toObject([
                  "rule",
                  ("optional" !== this.rule && this.rule) || g,
                  "type",
                  this.type,
                  "id",
                  this.id,
                  "extend",
                  this.extend,
                  "options",
                  this.options,
                  "comment",
                  t ? this.comment : g,
                ]);
              }),
              (u.prototype.resolve = function () {
                var t;
                return this.resolved
                  ? this
                  : ((this.typeDefault = h.defaults[this.type]) === g
                      ? ((this.resolvedType = (
                          this.declaringField || this
                        ).parent.lookupTypeOrEnum(this.type)),
                        this.resolvedType instanceof r
                          ? (this.typeDefault = null)
                          : (this.typeDefault =
                              this.resolvedType.values[
                                Object.keys(this.resolvedType.values)[0]
                              ]))
                      : this.options &&
                        this.options.proto3_optional &&
                        (this.typeDefault = null),
                    this.options &&
                      null != this.options.default &&
                      ((this.typeDefault = this.options.default),
                      this.resolvedType instanceof e &&
                        "string" == typeof this.typeDefault &&
                        (this.typeDefault =
                          this.resolvedType.values[this.typeDefault])),
                    this.options &&
                      ((!0 !== this.options.packed &&
                        (this.options.packed === g ||
                          !this.resolvedType ||
                          this.resolvedType instanceof e)) ||
                        delete this.options.packed,
                      Object.keys(this.options).length || (this.options = g)),
                    this.long
                      ? ((this.typeDefault = f.Long.fromNumber(
                          this.typeDefault,
                          "u" == (this.type[0] || "")
                        )),
                        Object.freeze && Object.freeze(this.typeDefault))
                      : this.bytes &&
                        "string" == typeof this.typeDefault &&
                        (f.base64.test(this.typeDefault)
                          ? f.base64.decode(
                              this.typeDefault,
                              (t = f.newBuffer(
                                f.base64.length(this.typeDefault)
                              )),
                              0
                            )
                          : f.utf8.write(
                              this.typeDefault,
                              (t = f.newBuffer(
                                f.utf8.length(this.typeDefault)
                              )),
                              0
                            ),
                        (this.typeDefault = t)),
                    this.map
                      ? (this.defaultValue = f.emptyObject)
                      : this.repeated
                      ? (this.defaultValue = f.emptyArray)
                      : (this.defaultValue = this.typeDefault),
                    this.parent instanceof r &&
                      (this.parent.ctor.prototype[this.name] =
                        this.defaultValue),
                    o.prototype.resolve.call(this));
              }),
              (u.d = function (n, r, e, s) {
                return (
                  "function" == typeof r
                    ? (r = f.decorateType(r).name)
                    : r && "object" == typeof r && (r = f.decorateEnum(r).name),
                  function (t, i) {
                    f.decorateType(t.constructor).add(
                      new u(i, n, r, e, { default: s })
                    );
                  }
                );
              }),
              (u.r = function (t) {
                r = t;
              });
          },
          { 14: 14, 22: 22, 32: 32, 33: 33 },
        ],
        16: [
          function (t, i, n) {
            var r = (i.exports = t(17));
            (r.build = "light"),
              (r.load = function (t, i, n) {
                return (i =
                  "function" == typeof i
                    ? ((n = i), new r.Root())
                    : i || new r.Root()).load(t, n);
              }),
              (r.loadSync = function (t, i) {
                return (i = i || new r.Root()).loadSync(t);
              }),
              (r.encoder = t(13)),
              (r.decoder = t(12)),
              (r.verifier = t(36)),
              (r.converter = t(11)),
              (r.ReflectionObject = t(22)),
              (r.Namespace = t(21)),
              (r.Root = t(26)),
              (r.Enum = t(14)),
              (r.Type = t(31)),
              (r.Field = t(15)),
              (r.OneOf = t(23)),
              (r.MapField = t(18)),
              (r.Service = t(30)),
              (r.Method = t(20)),
              (r.Message = t(19)),
              (r.wrappers = t(37)),
              (r.types = t(32)),
              (r.util = t(33)),
              r.ReflectionObject.r(r.Root),
              r.Namespace.r(r.Type, r.Service, r.Enum),
              r.Root.r(r.Type),
              r.Field.r(r.Type);
          },
          {
            11: 11,
            12: 12,
            13: 13,
            14: 14,
            15: 15,
            17: 17,
            18: 18,
            19: 19,
            20: 20,
            21: 21,
            22: 22,
            23: 23,
            26: 26,
            30: 30,
            31: 31,
            32: 32,
            33: 33,
            36: 36,
            37: 37,
          },
        ],
        17: [
          function (t, i, n) {
            var r = n;
            function e() {
              r.util.r(),
                r.Writer.r(r.BufferWriter),
                r.Reader.r(r.BufferReader);
            }
            (r.build = "minimal"),
              (r.Writer = t(38)),
              (r.BufferWriter = t(39)),
              (r.Reader = t(24)),
              (r.BufferReader = t(25)),
              (r.util = t(35)),
              (r.rpc = t(28)),
              (r.roots = t(27)),
              (r.configure = e),
              e();
          },
          { 24: 24, 25: 25, 27: 27, 28: 28, 35: 35, 38: 38, 39: 39 },
        ],
        18: [
          function (t, i, n) {
            i.exports = s;
            var u = t(15),
              r =
                ((((s.prototype = Object.create(u.prototype)).constructor =
                  s).className = "MapField"),
                t(32)),
              o = t(33);
            function s(t, i, n, r, e, s) {
              if ((u.call(this, t, i, r, g, g, e, s), !o.isString(n)))
                throw TypeError("keyType must be a string");
              (this.keyType = n),
                (this.resolvedKeyType = null),
                (this.map = !0);
            }
            (s.fromJSON = function (t, i) {
              return new s(t, i.id, i.keyType, i.type, i.options, i.comment);
            }),
              (s.prototype.toJSON = function (t) {
                t = !!t && !!t.keepComments;
                return o.toObject([
                  "keyType",
                  this.keyType,
                  "type",
                  this.type,
                  "id",
                  this.id,
                  "extend",
                  this.extend,
                  "options",
                  this.options,
                  "comment",
                  t ? this.comment : g,
                ]);
              }),
              (s.prototype.resolve = function () {
                if (this.resolved) return this;
                if (r.mapKey[this.keyType] === g)
                  throw Error("invalid key type: " + this.keyType);
                return u.prototype.resolve.call(this);
              }),
              (s.d = function (n, r, e) {
                return (
                  "function" == typeof e
                    ? (e = o.decorateType(e).name)
                    : e && "object" == typeof e && (e = o.decorateEnum(e).name),
                  function (t, i) {
                    o.decorateType(t.constructor).add(new s(i, n, r, e));
                  }
                );
              });
          },
          { 15: 15, 32: 32, 33: 33 },
        ],
        19: [
          function (t, i, n) {
            i.exports = e;
            var r = t(35);
            function e(t) {
              if (t)
                for (var i = Object.keys(t), n = 0; n < i.length; ++n)
                  this[i[n]] = t[i[n]];
            }
            (e.create = function (t) {
              return this.$type.create(t);
            }),
              (e.encode = function (t, i) {
                return this.$type.encode(t, i);
              }),
              (e.encodeDelimited = function (t, i) {
                return this.$type.encodeDelimited(t, i);
              }),
              (e.decode = function (t) {
                return this.$type.decode(t);
              }),
              (e.decodeDelimited = function (t) {
                return this.$type.decodeDelimited(t);
              }),
              (e.verify = function (t) {
                return this.$type.verify(t);
              }),
              (e.fromObject = function (t) {
                return this.$type.fromObject(t);
              }),
              (e.toObject = function (t, i) {
                return this.$type.toObject(t, i);
              }),
              (e.prototype.toJSON = function () {
                return this.$type.toObject(this, r.toJSONOptions);
              });
          },
          { 35: 35 },
        ],
        20: [
          function (t, i, n) {
            i.exports = r;
            var f = t(22),
              c =
                ((((r.prototype = Object.create(f.prototype)).constructor =
                  r).className = "Method"),
                t(33));
            function r(t, i, n, r, e, s, u, o, h) {
              if (
                (c.isObject(e)
                  ? ((u = e), (e = s = g))
                  : c.isObject(s) && ((u = s), (s = g)),
                i !== g && !c.isString(i))
              )
                throw TypeError("type must be a string");
              if (!c.isString(n))
                throw TypeError("requestType must be a string");
              if (!c.isString(r))
                throw TypeError("responseType must be a string");
              f.call(this, t, u),
                (this.type = i || "rpc"),
                (this.requestType = n),
                (this.requestStream = !!e || g),
                (this.responseType = r),
                (this.responseStream = !!s || g),
                (this.resolvedRequestType = null),
                (this.resolvedResponseType = null),
                (this.comment = o),
                (this.parsedOptions = h);
            }
            (r.fromJSON = function (t, i) {
              return new r(
                t,
                i.type,
                i.requestType,
                i.responseType,
                i.requestStream,
                i.responseStream,
                i.options,
                i.comment,
                i.parsedOptions
              );
            }),
              (r.prototype.toJSON = function (t) {
                t = !!t && !!t.keepComments;
                return c.toObject([
                  "type",
                  ("rpc" !== this.type && this.type) || g,
                  "requestType",
                  this.requestType,
                  "requestStream",
                  this.requestStream,
                  "responseType",
                  this.responseType,
                  "responseStream",
                  this.responseStream,
                  "options",
                  this.options,
                  "comment",
                  t ? this.comment : g,
                  "parsedOptions",
                  this.parsedOptions,
                ]);
              }),
              (r.prototype.resolve = function () {
                return this.resolved
                  ? this
                  : ((this.resolvedRequestType = this.parent.lookupType(
                      this.requestType
                    )),
                    (this.resolvedResponseType = this.parent.lookupType(
                      this.responseType
                    )),
                    f.prototype.resolve.call(this));
              });
          },
          { 22: 22, 33: 33 },
        ],
        21: [
          function (t, i, n) {
            i.exports = a;
            var e,
              s,
              u,
              r = t(22),
              o =
                ((((a.prototype = Object.create(r.prototype)).constructor =
                  a).className = "Namespace"),
                t(15)),
              h = t(33),
              f = t(23);
            function c(t, i) {
              if (!t || !t.length) return g;
              for (var n = {}, r = 0; r < t.length; ++r)
                n[t[r].name] = t[r].toJSON(i);
              return n;
            }
            function a(t, i) {
              r.call(this, t, i), (this.nested = g), (this.e = null);
            }
            function l(t) {
              return (t.e = null), t;
            }
            (a.fromJSON = function (t, i) {
              return new a(t, i.options).addJSON(i.nested);
            }),
              (a.arrayToJSON = c),
              (a.isReservedId = function (t, i) {
                if (t)
                  for (var n = 0; n < t.length; ++n)
                    if ("string" != typeof t[n] && t[n][0] <= i && t[n][1] > i)
                      return !0;
                return !1;
              }),
              (a.isReservedName = function (t, i) {
                if (t)
                  for (var n = 0; n < t.length; ++n) if (t[n] === i) return !0;
                return !1;
              }),
              Object.defineProperty(a.prototype, "nestedArray", {
                get: function () {
                  return this.e || (this.e = h.toArray(this.nested));
                },
              }),
              (a.prototype.toJSON = function (t) {
                return h.toObject([
                  "options",
                  this.options,
                  "nested",
                  c(this.nestedArray, t),
                ]);
              }),
              (a.prototype.addJSON = function (t) {
                if (t)
                  for (var i, n = Object.keys(t), r = 0; r < n.length; ++r)
                    (i = t[n[r]]),
                      this.add(
                        (i.fields !== g
                          ? e
                          : i.values !== g
                          ? u
                          : i.methods !== g
                          ? s
                          : i.id !== g
                          ? o
                          : a
                        ).fromJSON(n[r], i)
                      );
                return this;
              }),
              (a.prototype.get = function (t) {
                return (this.nested && this.nested[t]) || null;
              }),
              (a.prototype.getEnum = function (t) {
                if (this.nested && this.nested[t] instanceof u)
                  return this.nested[t].values;
                throw Error("no such enum: " + t);
              }),
              (a.prototype.add = function (t) {
                if (
                  !(
                    (t instanceof o && t.extend !== g) ||
                    t instanceof e ||
                    t instanceof f ||
                    t instanceof u ||
                    t instanceof s ||
                    t instanceof a
                  )
                )
                  throw TypeError("object must be a valid nested object");
                if (this.nested) {
                  var i = this.get(t.name);
                  if (i) {
                    if (
                      !(i instanceof a && t instanceof a) ||
                      i instanceof e ||
                      i instanceof s
                    )
                      throw Error("duplicate name '" + t.name + "' in " + this);
                    for (var n = i.nestedArray, r = 0; r < n.length; ++r)
                      t.add(n[r]);
                    this.remove(i),
                      this.nested || (this.nested = {}),
                      t.setOptions(i.options, !0);
                  }
                } else this.nested = {};
                return (this.nested[t.name] = t).onAdd(this), l(this);
              }),
              (a.prototype.remove = function (t) {
                if (!(t instanceof r))
                  throw TypeError("object must be a ReflectionObject");
                if (t.parent !== this)
                  throw Error(t + " is not a member of " + this);
                return (
                  delete this.nested[t.name],
                  Object.keys(this.nested).length || (this.nested = g),
                  t.onRemove(this),
                  l(this)
                );
              }),
              (a.prototype.define = function (t, i) {
                if (h.isString(t)) t = t.split(".");
                else if (!Array.isArray(t)) throw TypeError("illegal path");
                if (t && t.length && "" === t[0])
                  throw Error("path must be relative");
                for (var n = this; 0 < t.length; ) {
                  var r = t.shift();
                  if (n.nested && n.nested[r]) {
                    if (!((n = n.nested[r]) instanceof a))
                      throw Error("path conflicts with non-namespace objects");
                  } else n.add((n = new a(r)));
                }
                return i && n.addJSON(i), n;
              }),
              (a.prototype.resolveAll = function () {
                for (var t = this.nestedArray, i = 0; i < t.length; )
                  t[i] instanceof a ? t[i++].resolveAll() : t[i++].resolve();
                return this.resolve();
              }),
              (a.prototype.lookup = function (t, i, n) {
                if (
                  ("boolean" == typeof i
                    ? ((n = i), (i = g))
                    : i && !Array.isArray(i) && (i = [i]),
                  h.isString(t) && t.length)
                ) {
                  if ("." === t) return this.root;
                  t = t.split(".");
                } else if (!t.length) return this;
                if ("" === t[0]) return this.root.lookup(t.slice(1), i);
                var r = this.get(t[0]);
                if (r) {
                  if (1 === t.length) {
                    if (!i || ~i.indexOf(r.constructor)) return r;
                  } else if (
                    r instanceof a &&
                    (r = r.lookup(t.slice(1), i, !0))
                  )
                    return r;
                } else
                  for (var e = 0; e < this.nestedArray.length; ++e)
                    if (
                      this.e[e] instanceof a &&
                      (r = this.e[e].lookup(t, i, !0))
                    )
                      return r;
                return null === this.parent || n
                  ? null
                  : this.parent.lookup(t, i);
              }),
              (a.prototype.lookupType = function (t) {
                var i = this.lookup(t, [e]);
                if (i) return i;
                throw Error("no such type: " + t);
              }),
              (a.prototype.lookupEnum = function (t) {
                var i = this.lookup(t, [u]);
                if (i) return i;
                throw Error("no such Enum '" + t + "' in " + this);
              }),
              (a.prototype.lookupTypeOrEnum = function (t) {
                var i = this.lookup(t, [e, u]);
                if (i) return i;
                throw Error("no such Type or Enum '" + t + "' in " + this);
              }),
              (a.prototype.lookupService = function (t) {
                var i = this.lookup(t, [s]);
                if (i) return i;
                throw Error("no such Service '" + t + "' in " + this);
              }),
              (a.r = function (t, i, n) {
                (e = t), (s = i), (u = n);
              });
          },
          { 15: 15, 22: 22, 23: 23, 33: 33 },
        ],
        22: [
          function (t, i, n) {
            (i.exports = e).className = "ReflectionObject";
            var r,
              u = t(33);
            function e(t, i) {
              if (!u.isString(t)) throw TypeError("name must be a string");
              if (i && !u.isObject(i))
                throw TypeError("options must be an object");
              (this.options = i),
                (this.parsedOptions = null),
                (this.name = t),
                (this.parent = null),
                (this.resolved = !1),
                (this.comment = null),
                (this.filename = null);
            }
            Object.defineProperties(e.prototype, {
              root: {
                get: function () {
                  for (var t = this; null !== t.parent; ) t = t.parent;
                  return t;
                },
              },
              fullName: {
                get: function () {
                  for (var t = [this.name], i = this.parent; i; )
                    t.unshift(i.name), (i = i.parent);
                  return t.join(".");
                },
              },
            }),
              (e.prototype.toJSON = function () {
                throw Error();
              }),
              (e.prototype.onAdd = function (t) {
                this.parent && this.parent !== t && this.parent.remove(this),
                  (this.parent = t),
                  (this.resolved = !1);
                t = t.root;
                t instanceof r && t.u(this);
              }),
              (e.prototype.onRemove = function (t) {
                t = t.root;
                t instanceof r && t.o(this),
                  (this.parent = null),
                  (this.resolved = !1);
              }),
              (e.prototype.resolve = function () {
                return (
                  this.resolved ||
                    (this.root instanceof r && (this.resolved = !0)),
                  this
                );
              }),
              (e.prototype.getOption = function (t) {
                return this.options ? this.options[t] : g;
              }),
              (e.prototype.setOption = function (t, i, n) {
                return (
                  (n && this.options && this.options[t] !== g) ||
                    ((this.options || (this.options = {}))[t] = i),
                  this
                );
              }),
              (e.prototype.setParsedOption = function (i, t, n) {
                this.parsedOptions || (this.parsedOptions = []);
                var r,
                  e,
                  s = this.parsedOptions;
                return (
                  n
                    ? (r = s.find(function (t) {
                        return Object.prototype.hasOwnProperty.call(t, i);
                      }))
                      ? ((e = r[i]), u.setProperty(e, n, t))
                      : (((r = {})[i] = u.setProperty({}, n, t)), s.push(r))
                    : (((e = {})[i] = t), s.push(e)),
                  this
                );
              }),
              (e.prototype.setOptions = function (t, i) {
                if (t)
                  for (var n = Object.keys(t), r = 0; r < n.length; ++r)
                    this.setOption(n[r], t[n[r]], i);
                return this;
              }),
              (e.prototype.toString = function () {
                var t = this.constructor.className,
                  i = this.fullName;
                return i.length ? t + " " + i : t;
              }),
              (e.r = function (t) {
                r = t;
              });
          },
          { 33: 33 },
        ],
        23: [
          function (t, i, n) {
            i.exports = u;
            var e = t(22),
              r =
                ((((u.prototype = Object.create(e.prototype)).constructor =
                  u).className = "OneOf"),
                t(15)),
              s = t(33);
            function u(t, i, n, r) {
              if (
                (Array.isArray(i) || ((n = i), (i = g)),
                e.call(this, t, n),
                i !== g && !Array.isArray(i))
              )
                throw TypeError("fieldNames must be an Array");
              (this.oneof = i || []),
                (this.fieldsArray = []),
                (this.comment = r);
            }
            function o(t) {
              if (t.parent)
                for (var i = 0; i < t.fieldsArray.length; ++i)
                  t.fieldsArray[i].parent || t.parent.add(t.fieldsArray[i]);
            }
            (u.fromJSON = function (t, i) {
              return new u(t, i.oneof, i.options, i.comment);
            }),
              (u.prototype.toJSON = function (t) {
                t = !!t && !!t.keepComments;
                return s.toObject([
                  "options",
                  this.options,
                  "oneof",
                  this.oneof,
                  "comment",
                  t ? this.comment : g,
                ]);
              }),
              (u.prototype.add = function (t) {
                if (t instanceof r)
                  return (
                    t.parent && t.parent !== this.parent && t.parent.remove(t),
                    this.oneof.push(t.name),
                    this.fieldsArray.push(t),
                    o((t.partOf = this)),
                    this
                  );
                throw TypeError("field must be a Field");
              }),
              (u.prototype.remove = function (t) {
                if (!(t instanceof r)) throw TypeError("field must be a Field");
                var i = this.fieldsArray.indexOf(t);
                if (i < 0) throw Error(t + " is not a member of " + this);
                return (
                  this.fieldsArray.splice(i, 1),
                  -1 < (i = this.oneof.indexOf(t.name)) &&
                    this.oneof.splice(i, 1),
                  (t.partOf = null),
                  this
                );
              }),
              (u.prototype.onAdd = function (t) {
                e.prototype.onAdd.call(this, t);
                for (var i = 0; i < this.oneof.length; ++i) {
                  var n = t.get(this.oneof[i]);
                  n && !n.partOf && (n.partOf = this).fieldsArray.push(n);
                }
                o(this);
              }),
              (u.prototype.onRemove = function (t) {
                for (var i, n = 0; n < this.fieldsArray.length; ++n)
                  (i = this.fieldsArray[n]).parent && i.parent.remove(i);
                e.prototype.onRemove.call(this, t);
              }),
              (u.d = function () {
                for (
                  var n = Array(arguments.length), t = 0;
                  t < arguments.length;

                )
                  n[t] = arguments[t++];
                return function (t, i) {
                  s.decorateType(t.constructor).add(new u(i, n)),
                    Object.defineProperty(t, i, {
                      get: s.oneOfGetter(n),
                      set: s.oneOfSetter(n),
                    });
                };
              });
          },
          { 15: 15, 22: 22, 33: 33 },
        ],
        24: [
          function (t, i, n) {
            i.exports = h;
            var r,
              e = t(35),
              s = e.LongBits,
              u = e.utf8;
            function o(t, i) {
              return RangeError(
                "index out of range: " +
                  t.pos +
                  " + " +
                  (i || 1) +
                  " > " +
                  t.len
              );
            }
            function h(t) {
              (this.buf = t), (this.pos = 0), (this.len = t.length);
            }
            function f() {
              return e.Buffer
                ? function (t) {
                    return (h.create = function (t) {
                      return e.Buffer.isBuffer(t) ? new r(t) : a(t);
                    })(t);
                  }
                : a;
            }
            var c,
              a =
                "undefined" != typeof Uint8Array
                  ? function (t) {
                      if (t instanceof Uint8Array || Array.isArray(t))
                        return new h(t);
                      throw Error("illegal buffer");
                    }
                  : function (t) {
                      if (Array.isArray(t)) return new h(t);
                      throw Error("illegal buffer");
                    };
            function l() {
              var t = new s(0, 0),
                i = 0;
              if (!(4 < this.len - this.pos)) {
                for (; i < 3; ++i) {
                  if (this.pos >= this.len) throw o(this);
                  if (
                    ((t.lo =
                      (t.lo | ((127 & this.buf[this.pos]) << (7 * i))) >>> 0),
                    this.buf[this.pos++] < 128)
                  )
                    return t;
                }
                return (
                  (t.lo =
                    (t.lo | ((127 & this.buf[this.pos++]) << (7 * i))) >>> 0),
                  t
                );
              }
              for (; i < 4; ++i)
                if (
                  ((t.lo =
                    (t.lo | ((127 & this.buf[this.pos]) << (7 * i))) >>> 0),
                  this.buf[this.pos++] < 128)
                )
                  return t;
              if (
                ((t.lo = (t.lo | ((127 & this.buf[this.pos]) << 28)) >>> 0),
                (t.hi = (t.hi | ((127 & this.buf[this.pos]) >> 4)) >>> 0),
                this.buf[this.pos++] < 128)
              )
                return t;
              if (((i = 0), 4 < this.len - this.pos)) {
                for (; i < 5; ++i)
                  if (
                    ((t.hi =
                      (t.hi | ((127 & this.buf[this.pos]) << (7 * i + 3))) >>>
                      0),
                    this.buf[this.pos++] < 128)
                  )
                    return t;
              } else
                for (; i < 5; ++i) {
                  if (this.pos >= this.len) throw o(this);
                  if (
                    ((t.hi =
                      (t.hi | ((127 & this.buf[this.pos]) << (7 * i + 3))) >>>
                      0),
                    this.buf[this.pos++] < 128)
                  )
                    return t;
                }
              throw Error("invalid varint encoding");
            }
            function d(t, i) {
              return (
                (t[i - 4] |
                  (t[i - 3] << 8) |
                  (t[i - 2] << 16) |
                  (t[i - 1] << 24)) >>>
                0
              );
            }
            function v() {
              if (this.pos + 8 > this.len) throw o(this, 8);
              return new s(
                d(this.buf, (this.pos += 4)),
                d(this.buf, (this.pos += 4))
              );
            }
            (h.create = f()),
              (h.prototype.h =
                e.Array.prototype.subarray || e.Array.prototype.slice),
              (h.prototype.uint32 =
                ((c = 4294967295),
                function () {
                  if (
                    ((c = (127 & this.buf[this.pos]) >>> 0),
                    this.buf[this.pos++] < 128 ||
                      ((c = (c | ((127 & this.buf[this.pos]) << 7)) >>> 0),
                      this.buf[this.pos++] < 128 ||
                        ((c = (c | ((127 & this.buf[this.pos]) << 14)) >>> 0),
                        this.buf[this.pos++] < 128 ||
                          ((c = (c | ((127 & this.buf[this.pos]) << 21)) >>> 0),
                          this.buf[this.pos++] < 128 ||
                            ((c =
                              (c | ((15 & this.buf[this.pos]) << 28)) >>> 0),
                            this.buf[this.pos++] < 128 ||
                              !((this.pos += 5) > this.len))))))
                  )
                    return c;
                  throw ((this.pos = this.len), o(this, 10));
                })),
              (h.prototype.int32 = function () {
                return 0 | this.uint32();
              }),
              (h.prototype.sint32 = function () {
                var t = this.uint32();
                return ((t >>> 1) ^ -(1 & t)) | 0;
              }),
              (h.prototype.bool = function () {
                return 0 !== this.uint32();
              }),
              (h.prototype.fixed32 = function () {
                if (this.pos + 4 > this.len) throw o(this, 4);
                return d(this.buf, (this.pos += 4));
              }),
              (h.prototype.sfixed32 = function () {
                if (this.pos + 4 > this.len) throw o(this, 4);
                return 0 | d(this.buf, (this.pos += 4));
              }),
              (h.prototype.float = function () {
                if (this.pos + 4 > this.len) throw o(this, 4);
                var t = e.float.readFloatLE(this.buf, this.pos);
                return (this.pos += 4), t;
              }),
              (h.prototype.double = function () {
                if (this.pos + 8 > this.len) throw o(this, 4);
                var t = e.float.readDoubleLE(this.buf, this.pos);
                return (this.pos += 8), t;
              }),
              (h.prototype.bytes = function () {
                var t = this.uint32(),
                  i = this.pos,
                  n = this.pos + t;
                if (n > this.len) throw o(this, t);
                return (
                  (this.pos += t),
                  Array.isArray(this.buf)
                    ? this.buf.slice(i, n)
                    : i === n
                    ? new this.buf.constructor(0)
                    : this.h.call(this.buf, i, n)
                );
              }),
              (h.prototype.string = function () {
                var t = this.bytes();
                return u.read(t, 0, t.length);
              }),
              (h.prototype.skip = function (t) {
                if ("number" == typeof t) {
                  if (this.pos + t > this.len) throw o(this, t);
                  this.pos += t;
                } else
                  do {
                    if (this.pos >= this.len) throw o(this);
                  } while (128 & this.buf[this.pos++]);
                return this;
              }),
              (h.prototype.skipType = function (t) {
                switch (t) {
                  case 0:
                    this.skip();
                    break;
                  case 1:
                    this.skip(8);
                    break;
                  case 2:
                    this.skip(this.uint32());
                    break;
                  case 3:
                    for (; 4 != (t = 7 & this.uint32()); ) this.skipType(t);
                    break;
                  case 5:
                    this.skip(4);
                    break;
                  default:
                    throw Error(
                      "invalid wire type " + t + " at offset " + this.pos
                    );
                }
                return this;
              }),
              (h.r = function (t) {
                (r = t), (h.create = f()), r.r();
                var i = e.Long ? "toLong" : "toNumber";
                e.merge(h.prototype, {
                  int64: function () {
                    return l.call(this)[i](!1);
                  },
                  uint64: function () {
                    return l.call(this)[i](!0);
                  },
                  sint64: function () {
                    return l.call(this).zzDecode()[i](!1);
                  },
                  fixed64: function () {
                    return v.call(this)[i](!0);
                  },
                  sfixed64: function () {
                    return v.call(this)[i](!1);
                  },
                });
              });
          },
          { 35: 35 },
        ],
        25: [
          function (t, i, n) {
            i.exports = s;
            var r = t(24),
              e =
                (((s.prototype = Object.create(r.prototype)).constructor = s),
                t(35));
            function s(t) {
              r.call(this, t);
            }
            (s.r = function () {
              e.Buffer && (s.prototype.h = e.Buffer.prototype.slice);
            }),
              (s.prototype.string = function () {
                var t = this.uint32();
                return this.buf.utf8Slice
                  ? this.buf.utf8Slice(
                      this.pos,
                      (this.pos = Math.min(this.pos + t, this.len))
                    )
                  : this.buf.toString(
                      "utf-8",
                      this.pos,
                      (this.pos = Math.min(this.pos + t, this.len))
                    );
              }),
              s.r();
          },
          { 24: 24, 35: 35 },
        ],
        26: [
          function (t, i, n) {
            i.exports = h;
            var r,
              d,
              v,
              e = t(21),
              s =
                ((((h.prototype = Object.create(e.prototype)).constructor =
                  h).className = "Root"),
                t(15)),
              u = t(14),
              o = t(23),
              b = t(33);
            function h(t) {
              e.call(this, "", t), (this.deferred = []), (this.files = []);
            }
            function p() {}
            (h.fromJSON = function (t, i) {
              return (
                (i = i || new h()),
                t.options && i.setOptions(t.options),
                i.addJSON(t.nested)
              );
            }),
              (h.prototype.resolvePath = b.path.resolve),
              (h.prototype.fetch = b.fetch),
              (h.prototype.load = function t(i, s, e) {
                "function" == typeof s && ((e = s), (s = g));
                var u = this;
                if (!e) return b.asPromise(t, u, i, s);
                var o = e === p;
                function h(t, i) {
                  if (e) {
                    var n = e;
                    if (((e = null), o)) throw t;
                    n(t, i);
                  }
                }
                function f(t) {
                  var i = t.lastIndexOf("google/protobuf/");
                  if (-1 < i) {
                    t = t.substring(i);
                    if (t in v) return t;
                  }
                  return null;
                }
                function c(t, i) {
                  try {
                    if (
                      (b.isString(i) &&
                        "{" == (i[0] || "") &&
                        (i = JSON.parse(i)),
                      b.isString(i))
                    ) {
                      d.filename = t;
                      var n,
                        r = d(i, u, s),
                        e = 0;
                      if (r.imports)
                        for (; e < r.imports.length; ++e)
                          (n =
                            f(r.imports[e]) ||
                            u.resolvePath(t, r.imports[e])) && a(n);
                      if (r.weakImports)
                        for (e = 0; e < r.weakImports.length; ++e)
                          (n =
                            f(r.weakImports[e]) ||
                            u.resolvePath(t, r.weakImports[e])) && a(n, !0);
                    } else u.setOptions(i.options).addJSON(i.nested);
                  } catch (t) {
                    h(t);
                  }
                  o || l || h(null, u);
                }
                function a(n, r) {
                  if (!~u.files.indexOf(n))
                    if ((u.files.push(n), n in v))
                      o
                        ? c(n, v[n])
                        : (++l,
                          setTimeout(function () {
                            --l, c(n, v[n]);
                          }));
                    else if (o) {
                      var t;
                      try {
                        t = b.fs.readFileSync(n).toString("utf8");
                      } catch (t) {
                        return void (r || h(t));
                      }
                      c(n, t);
                    } else
                      ++l,
                        u.fetch(n, function (t, i) {
                          --l,
                            e && (t ? (r ? l || h(null, u) : h(t)) : c(n, i));
                        });
                }
                var l = 0;
                b.isString(i) && (i = [i]);
                for (var n, r = 0; r < i.length; ++r)
                  (n = u.resolvePath("", i[r])) && a(n);
                return o ? u : (l || h(null, u), g);
              }),
              (h.prototype.loadSync = function (t, i) {
                if (b.isNode) return this.load(t, i, p);
                throw Error("not supported");
              }),
              (h.prototype.resolveAll = function () {
                if (this.deferred.length)
                  throw Error(
                    "unresolvable extensions: " +
                      this.deferred
                        .map(function (t) {
                          return (
                            "'extend " + t.extend + "' in " + t.parent.fullName
                          );
                        })
                        .join(", ")
                  );
                return e.prototype.resolveAll.call(this);
              });
            var f = /^[A-Z]/;
            function c(t, i) {
              var n,
                r = i.parent.lookup(i.extend);
              if (r)
                return (
                  (((n = new s(
                    i.fullName,
                    i.id,
                    i.type,
                    i.rule,
                    g,
                    i.options
                  )).declaringField = i).extensionField = n),
                  r.add(n),
                  1
                );
            }
            (h.prototype.u = function (t) {
              if (t instanceof s)
                t.extend === g ||
                  t.extensionField ||
                  c(0, t) ||
                  this.deferred.push(t);
              else if (t instanceof u)
                f.test(t.name) && (t.parent[t.name] = t.values);
              else if (!(t instanceof o)) {
                if (t instanceof r)
                  for (var i = 0; i < this.deferred.length; )
                    c(0, this.deferred[i]) ? this.deferred.splice(i, 1) : ++i;
                for (var n = 0; n < t.nestedArray.length; ++n) this.u(t.e[n]);
                f.test(t.name) && (t.parent[t.name] = t);
              }
            }),
              (h.prototype.o = function (t) {
                var i;
                if (t instanceof s)
                  t.extend !== g &&
                    (t.extensionField
                      ? (t.extensionField.parent.remove(t.extensionField),
                        (t.extensionField = null))
                      : -1 < (i = this.deferred.indexOf(t)) &&
                        this.deferred.splice(i, 1));
                else if (t instanceof u)
                  f.test(t.name) && delete t.parent[t.name];
                else if (t instanceof e) {
                  for (var n = 0; n < t.nestedArray.length; ++n) this.o(t.e[n]);
                  f.test(t.name) && delete t.parent[t.name];
                }
              }),
              (h.r = function (t, i, n) {
                (r = t), (d = i), (v = n);
              });
          },
          { 14: 14, 15: 15, 21: 21, 23: 23, 33: 33 },
        ],
        27: [
          function (t, i, n) {
            i.exports = {};
          },
          {},
        ],
        28: [
          function (t, i, n) {
            n.Service = t(29);
          },
          { 29: 29 },
        ],
        29: [
          function (t, i, n) {
            i.exports = r;
            var o = t(35);
            function r(t, i, n) {
              if ("function" != typeof t)
                throw TypeError("rpcImpl must be a function");
              o.EventEmitter.call(this),
                (this.rpcImpl = t),
                (this.requestDelimited = !!i),
                (this.responseDelimited = !!n);
            }
            (((r.prototype = Object.create(
              o.EventEmitter.prototype
            )).constructor = r).prototype.rpcCall = function t(n, i, r, e, s) {
              if (!e) throw TypeError("request must be specified");
              var u = this;
              if (!s) return o.asPromise(t, u, n, i, r, e);
              if (!u.rpcImpl)
                return (
                  setTimeout(function () {
                    s(Error("already ended"));
                  }, 0),
                  g
                );
              try {
                return u.rpcImpl(
                  n,
                  i[u.requestDelimited ? "encodeDelimited" : "encode"](
                    e
                  ).finish(),
                  function (t, i) {
                    if (t) return u.emit("error", t, n), s(t);
                    if (null === i) return u.end(!0), g;
                    if (!(i instanceof r))
                      try {
                        i =
                          r[u.responseDelimited ? "decodeDelimited" : "decode"](
                            i
                          );
                      } catch (t) {
                        return u.emit("error", t, n), s(t);
                      }
                    return u.emit("data", i, n), s(null, i);
                  }
                );
              } catch (t) {
                return (
                  u.emit("error", t, n),
                  setTimeout(function () {
                    s(t);
                  }, 0),
                  g
                );
              }
            }),
              (r.prototype.end = function (t) {
                return (
                  this.rpcImpl &&
                    (t || this.rpcImpl(null, null, null),
                    (this.rpcImpl = null),
                    this.emit("end").off()),
                  this
                );
              });
          },
          { 35: 35 },
        ],
        30: [
          function (t, i, n) {
            i.exports = u;
            var r = t(21),
              s =
                ((((u.prototype = Object.create(r.prototype)).constructor =
                  u).className = "Service"),
                t(20)),
              o = t(33),
              h = t(28);
            function u(t, i) {
              r.call(this, t, i), (this.methods = {}), (this.f = null);
            }
            function e(t) {
              return (t.f = null), t;
            }
            (u.fromJSON = function (t, i) {
              var n = new u(t, i.options);
              if (i.methods)
                for (var r = Object.keys(i.methods), e = 0; e < r.length; ++e)
                  n.add(s.fromJSON(r[e], i.methods[r[e]]));
              return (
                i.nested && n.addJSON(i.nested), (n.comment = i.comment), n
              );
            }),
              (u.prototype.toJSON = function (t) {
                var i = r.prototype.toJSON.call(this, t),
                  n = !!t && !!t.keepComments;
                return o.toObject([
                  "options",
                  (i && i.options) || g,
                  "methods",
                  r.arrayToJSON(this.methodsArray, t) || {},
                  "nested",
                  (i && i.nested) || g,
                  "comment",
                  n ? this.comment : g,
                ]);
              }),
              Object.defineProperty(u.prototype, "methodsArray", {
                get: function () {
                  return this.f || (this.f = o.toArray(this.methods));
                },
              }),
              (u.prototype.get = function (t) {
                return this.methods[t] || r.prototype.get.call(this, t);
              }),
              (u.prototype.resolveAll = function () {
                for (var t = this.methodsArray, i = 0; i < t.length; ++i)
                  t[i].resolve();
                return r.prototype.resolve.call(this);
              }),
              (u.prototype.add = function (t) {
                if (this.get(t.name))
                  throw Error("duplicate name '" + t.name + "' in " + this);
                return t instanceof s
                  ? e(((this.methods[t.name] = t).parent = this))
                  : r.prototype.add.call(this, t);
              }),
              (u.prototype.remove = function (t) {
                if (t instanceof s) {
                  if (this.methods[t.name] !== t)
                    throw Error(t + " is not a member of " + this);
                  return (
                    delete this.methods[t.name], (t.parent = null), e(this)
                  );
                }
                return r.prototype.remove.call(this, t);
              }),
              (u.prototype.create = function (t, i, n) {
                for (
                  var r, e = new h.Service(t, i, n), s = 0;
                  s < this.methodsArray.length;
                  ++s
                ) {
                  var u = o
                    .lcFirst((r = this.f[s]).resolve().name)
                    .replace(/[^$\w_]/g, "");
                  e[u] = o.codegen(
                    ["r", "c"],
                    o.isReserved(u) ? u + "_" : u
                  )("return this.rpcCall(m,q,s,r,c)")({
                    m: r,
                    q: r.resolvedRequestType.ctor,
                    s: r.resolvedResponseType.ctor,
                  });
                }
                return e;
              });
          },
          { 20: 20, 21: 21, 28: 28, 33: 33 },
        ],
        31: [
          function (t, i, n) {
            i.exports = w;
            var u = t(21),
              o =
                ((((w.prototype = Object.create(u.prototype)).constructor =
                  w).className = "Type"),
                t(14)),
              h = t(23),
              f = t(15),
              c = t(18),
              a = t(30),
              e = t(19),
              s = t(24),
              l = t(38),
              d = t(33),
              v = t(13),
              b = t(12),
              p = t(36),
              y = t(11),
              m = t(37);
            function w(t, i) {
              u.call(this, t, i),
                (this.fields = {}),
                (this.oneofs = g),
                (this.extensions = g),
                (this.reserved = g),
                (this.group = g),
                (this.c = null),
                (this.i = null),
                (this.a = null),
                (this.l = null);
            }
            function r(t) {
              return (
                (t.c = t.i = t.a = null),
                delete t.encode,
                delete t.decode,
                delete t.verify,
                t
              );
            }
            Object.defineProperties(w.prototype, {
              fieldsById: {
                get: function () {
                  if (!this.c) {
                    this.c = {};
                    for (
                      var t = Object.keys(this.fields), i = 0;
                      i < t.length;
                      ++i
                    ) {
                      var n = this.fields[t[i]],
                        r = n.id;
                      if (this.c[r])
                        throw Error("duplicate id " + r + " in " + this);
                      this.c[r] = n;
                    }
                  }
                  return this.c;
                },
              },
              fieldsArray: {
                get: function () {
                  return this.i || (this.i = d.toArray(this.fields));
                },
              },
              oneofsArray: {
                get: function () {
                  return this.a || (this.a = d.toArray(this.oneofs));
                },
              },
              ctor: {
                get: function () {
                  return this.l || (this.ctor = w.generateConstructor(this)());
                },
                set: function (t) {
                  for (
                    var i = t.prototype,
                      n =
                        (i instanceof e ||
                          (((t.prototype = new e()).constructor = t),
                          d.merge(t.prototype, i)),
                        (t.$type = t.prototype.$type = this),
                        d.merge(t, e, !0),
                        (this.l = t),
                        0);
                    n < this.fieldsArray.length;
                    ++n
                  )
                    this.i[n].resolve();
                  for (var r = {}, n = 0; n < this.oneofsArray.length; ++n)
                    r[this.a[n].resolve().name] = {
                      get: d.oneOfGetter(this.a[n].oneof),
                      set: d.oneOfSetter(this.a[n].oneof),
                    };
                  n && Object.defineProperties(t.prototype, r);
                },
              },
            }),
              (w.generateConstructor = function (t) {
                for (
                  var i, n = d.codegen(["p"], t.name), r = 0;
                  r < t.fieldsArray.length;
                  ++r
                )
                  (i = t.i[r]).map
                    ? n("this%s={}", d.safeProp(i.name))
                    : i.repeated && n("this%s=[]", d.safeProp(i.name));
                return n(
                  "if(p)for(var ks=Object.keys(p),i=0;i<ks.length;++i)if(p[ks[i]]!=null)"
                )("this[ks[i]]=p[ks[i]]");
              }),
              (w.fromJSON = function (t, i) {
                for (
                  var n = new w(t, i.options),
                    r =
                      ((n.extensions = i.extensions),
                      (n.reserved = i.reserved),
                      Object.keys(i.fields)),
                    e = 0;
                  e < r.length;
                  ++e
                )
                  n.add(
                    (void 0 !== i.fields[r[e]].keyType ? c : f).fromJSON(
                      r[e],
                      i.fields[r[e]]
                    )
                  );
                if (i.oneofs)
                  for (r = Object.keys(i.oneofs), e = 0; e < r.length; ++e)
                    n.add(h.fromJSON(r[e], i.oneofs[r[e]]));
                if (i.nested)
                  for (r = Object.keys(i.nested), e = 0; e < r.length; ++e) {
                    var s = i.nested[r[e]];
                    n.add(
                      (s.id !== g
                        ? f
                        : s.fields !== g
                        ? w
                        : s.values !== g
                        ? o
                        : s.methods !== g
                        ? a
                        : u
                      ).fromJSON(r[e], s)
                    );
                  }
                return (
                  i.extensions &&
                    i.extensions.length &&
                    (n.extensions = i.extensions),
                  i.reserved && i.reserved.length && (n.reserved = i.reserved),
                  i.group && (n.group = !0),
                  i.comment && (n.comment = i.comment),
                  n
                );
              }),
              (w.prototype.toJSON = function (t) {
                var i = u.prototype.toJSON.call(this, t),
                  n = !!t && !!t.keepComments;
                return d.toObject([
                  "options",
                  (i && i.options) || g,
                  "oneofs",
                  u.arrayToJSON(this.oneofsArray, t),
                  "fields",
                  u.arrayToJSON(
                    this.fieldsArray.filter(function (t) {
                      return !t.declaringField;
                    }),
                    t
                  ) || {},
                  "extensions",
                  this.extensions && this.extensions.length
                    ? this.extensions
                    : g,
                  "reserved",
                  this.reserved && this.reserved.length ? this.reserved : g,
                  "group",
                  this.group || g,
                  "nested",
                  (i && i.nested) || g,
                  "comment",
                  n ? this.comment : g,
                ]);
              }),
              (w.prototype.resolveAll = function () {
                for (var t = this.fieldsArray, i = 0; i < t.length; )
                  t[i++].resolve();
                for (var n = this.oneofsArray, i = 0; i < n.length; )
                  n[i++].resolve();
                return u.prototype.resolveAll.call(this);
              }),
              (w.prototype.get = function (t) {
                return (
                  this.fields[t] ||
                  (this.oneofs && this.oneofs[t]) ||
                  (this.nested && this.nested[t]) ||
                  null
                );
              }),
              (w.prototype.add = function (t) {
                if (this.get(t.name))
                  throw Error("duplicate name '" + t.name + "' in " + this);
                if (t instanceof f && t.extend === g) {
                  if ((this.c || this.fieldsById)[t.id])
                    throw Error("duplicate id " + t.id + " in " + this);
                  if (this.isReservedId(t.id))
                    throw Error("id " + t.id + " is reserved in " + this);
                  if (this.isReservedName(t.name))
                    throw Error("name '" + t.name + "' is reserved in " + this);
                  return (
                    t.parent && t.parent.remove(t),
                    ((this.fields[t.name] = t).message = this),
                    t.onAdd(this),
                    r(this)
                  );
                }
                return t instanceof h
                  ? (this.oneofs || (this.oneofs = {}),
                    (this.oneofs[t.name] = t).onAdd(this),
                    r(this))
                  : u.prototype.add.call(this, t);
              }),
              (w.prototype.remove = function (t) {
                if (t instanceof f && t.extend === g) {
                  if (this.fields && this.fields[t.name] === t)
                    return (
                      delete this.fields[t.name],
                      (t.parent = null),
                      t.onRemove(this),
                      r(this)
                    );
                  throw Error(t + " is not a member of " + this);
                }
                if (t instanceof h) {
                  if (this.oneofs && this.oneofs[t.name] === t)
                    return (
                      delete this.oneofs[t.name],
                      (t.parent = null),
                      t.onRemove(this),
                      r(this)
                    );
                  throw Error(t + " is not a member of " + this);
                }
                return u.prototype.remove.call(this, t);
              }),
              (w.prototype.isReservedId = function (t) {
                return u.isReservedId(this.reserved, t);
              }),
              (w.prototype.isReservedName = function (t) {
                return u.isReservedName(this.reserved, t);
              }),
              (w.prototype.create = function (t) {
                return new this.ctor(t);
              }),
              (w.prototype.setup = function () {
                for (
                  var t = this.fullName, i = [], n = 0;
                  n < this.fieldsArray.length;
                  ++n
                )
                  i.push(this.i[n].resolve().resolvedType);
                (this.encode = v(this)({ Writer: l, types: i, util: d })),
                  (this.decode = b(this)({ Reader: s, types: i, util: d })),
                  (this.verify = p(this)({ types: i, util: d })),
                  (this.fromObject = y.fromObject(this)({ types: i, util: d })),
                  (this.toObject = y.toObject(this)({ types: i, util: d }));
                var r,
                  t = m[t];
                return (
                  t &&
                    (((r = Object.create(this)).fromObject = this.fromObject),
                    (this.fromObject = t.fromObject.bind(r)),
                    (r.toObject = this.toObject),
                    (this.toObject = t.toObject.bind(r))),
                  this
                );
              }),
              (w.prototype.encode = function (t, i) {
                return this.setup().encode(t, i);
              }),
              (w.prototype.encodeDelimited = function (t, i) {
                return this.encode(t, i && i.len ? i.fork() : i).ldelim();
              }),
              (w.prototype.decode = function (t, i) {
                return this.setup().decode(t, i);
              }),
              (w.prototype.decodeDelimited = function (t) {
                return (
                  t instanceof s || (t = s.create(t)),
                  this.decode(t, t.uint32())
                );
              }),
              (w.prototype.verify = function (t) {
                return this.setup().verify(t);
              }),
              (w.prototype.fromObject = function (t) {
                return this.setup().fromObject(t);
              }),
              (w.prototype.toObject = function (t, i) {
                return this.setup().toObject(t, i);
              }),
              (w.d = function (i) {
                return function (t) {
                  d.decorateType(t, i);
                };
              });
          },
          {
            11: 11,
            12: 12,
            13: 13,
            14: 14,
            15: 15,
            18: 18,
            19: 19,
            21: 21,
            23: 23,
            24: 24,
            30: 30,
            33: 33,
            36: 36,
            37: 37,
            38: 38,
          },
        ],
        32: [
          function (t, i, n) {
            var t = t(33),
              e = [
                "double",
                "float",
                "int32",
                "uint32",
                "sint32",
                "fixed32",
                "sfixed32",
                "int64",
                "uint64",
                "sint64",
                "fixed64",
                "sfixed64",
                "bool",
                "string",
                "bytes",
              ];
            function r(t, i) {
              var n = 0,
                r = {};
              for (i |= 0; n < t.length; ) r[e[n + i]] = t[n++];
              return r;
            }
            (n.basic = r([1, 5, 0, 0, 0, 5, 5, 0, 0, 0, 1, 1, 0, 2, 2])),
              (n.defaults = r([
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                !1,
                "",
                t.emptyArray,
                null,
              ])),
              (n.long = r([0, 0, 0, 1, 1], 7)),
              (n.mapKey = r([0, 0, 0, 5, 5, 0, 0, 0, 1, 1, 0, 2], 2)),
              (n.packed = r([1, 5, 0, 0, 0, 5, 5, 0, 0, 0, 1, 1, 0]));
          },
          { 33: 33 },
        ],
        33: [
          function (n, t, i) {
            var r,
              e,
              s = (t.exports = n(35)),
              u = n(27),
              o =
                ((s.codegen = n(3)),
                (s.fetch = n(5)),
                (s.path = n(8)),
                (s.fs = s.inquire("fs")),
                (s.toArray = function (t) {
                  if (t) {
                    for (
                      var i = Object.keys(t), n = Array(i.length), r = 0;
                      r < i.length;

                    )
                      n[r] = t[i[r++]];
                    return n;
                  }
                  return [];
                }),
                (s.toObject = function (t) {
                  for (var i = {}, n = 0; n < t.length; ) {
                    var r = t[n++],
                      e = t[n++];
                    e !== g && (i[r] = e);
                  }
                  return i;
                }),
                /\\/g),
              h = /"/g,
              f =
                ((s.isReserved = function (t) {
                  return /^(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$/.test(
                    t
                  );
                }),
                (s.safeProp = function (t) {
                  return !/^[$\w_]+$/.test(t) || s.isReserved(t)
                    ? '["' + t.replace(o, "\\\\").replace(h, '\\"') + '"]'
                    : "." + t;
                }),
                (s.ucFirst = function (t) {
                  return (t[0] || "").toUpperCase() + t.substring(1);
                }),
                /_([a-z])/g),
              c =
                ((s.camelCase = function (t) {
                  return (
                    t.substring(0, 1) +
                    t.substring(1).replace(f, function (t, i) {
                      return i.toUpperCase();
                    })
                  );
                }),
                (s.compareFieldsById = function (t, i) {
                  return t.id - i.id;
                }),
                (s.decorateType = function (t, i) {
                  return t.$type
                    ? (i &&
                        t.$type.name !== i &&
                        (s.decorateRoot.remove(t.$type),
                        (t.$type.name = i),
                        s.decorateRoot.add(t.$type)),
                      t.$type)
                    : ((i = new (r = r || n(31))(i || t.name)),
                      s.decorateRoot.add(i),
                      (i.ctor = t),
                      Object.defineProperty(t, "$type", {
                        value: i,
                        enumerable: !1,
                      }),
                      Object.defineProperty(t.prototype, "$type", {
                        value: i,
                        enumerable: !1,
                      }),
                      i);
                }),
                0);
            (s.decorateEnum = function (t) {
              var i;
              return (
                t.$type ||
                ((i = new (e = e || n(14))("Enum" + c++, t)),
                s.decorateRoot.add(i),
                Object.defineProperty(t, "$type", { value: i, enumerable: !1 }),
                i)
              );
            }),
              (s.setProperty = function (t, i, n) {
                if ("object" != typeof t)
                  throw TypeError("dst must be an object");
                if (i)
                  return (function t(i, n, r) {
                    var e = n.shift();
                    return (
                      "__proto__" !== e &&
                        (0 < n.length
                          ? (i[e] = t(i[e] || {}, n, r))
                          : ((n = i[e]) && (r = [].concat(n).concat(r)),
                            (i[e] = r))),
                      i
                    );
                  })(t, (i = i.split(".")), n);
                throw TypeError("path must be specified");
              }),
              Object.defineProperty(s, "decorateRoot", {
                get: function () {
                  return u.decorated || (u.decorated = new (n(26))());
                },
              });
          },
          { 14: 14, 26: 26, 27: 27, 3: 3, 31: 31, 35: 35, 5: 5, 8: 8 },
        ],
        34: [
          function (t, i, n) {
            i.exports = e;
            var r = t(35);
            function e(t, i) {
              (this.lo = t >>> 0), (this.hi = i >>> 0);
            }
            var s = (e.zero = new e(0, 0)),
              u =
                ((s.toNumber = function () {
                  return 0;
                }),
                (s.zzEncode = s.zzDecode =
                  function () {
                    return this;
                  }),
                (s.length = function () {
                  return 1;
                }),
                (e.zeroHash = "\0\0\0\0\0\0\0\0"),
                (e.fromNumber = function (t) {
                  var i, n;
                  return 0 === t
                    ? s
                    : ((n = (t = (i = t < 0) ? -t : t) >>> 0),
                      (t = ((t - n) / 4294967296) >>> 0),
                      i &&
                        ((t = ~t >>> 0),
                        (n = ~n >>> 0),
                        4294967295 < ++n &&
                          ((n = 0), 4294967295 < ++t && (t = 0))),
                      new e(n, t));
                }),
                (e.from = function (t) {
                  if ("number" == typeof t) return e.fromNumber(t);
                  if (r.isString(t)) {
                    if (!r.Long) return e.fromNumber(parseInt(t, 10));
                    t = r.Long.fromString(t);
                  }
                  return t.low || t.high ? new e(t.low >>> 0, t.high >>> 0) : s;
                }),
                (e.prototype.toNumber = function (t) {
                  var i;
                  return !t && this.hi >>> 31
                    ? ((t = (1 + ~this.lo) >>> 0),
                      (i = ~this.hi >>> 0),
                      -(t + 4294967296 * (i = t ? i : (i + 1) >>> 0)))
                    : this.lo + 4294967296 * this.hi;
                }),
                (e.prototype.toLong = function (t) {
                  return r.Long
                    ? new r.Long(0 | this.lo, 0 | this.hi, !!t)
                    : { low: 0 | this.lo, high: 0 | this.hi, unsigned: !!t };
                }),
                String.prototype.charCodeAt);
            (e.fromHash = function (t) {
              return "\0\0\0\0\0\0\0\0" === t
                ? s
                : new e(
                    (u.call(t, 0) |
                      (u.call(t, 1) << 8) |
                      (u.call(t, 2) << 16) |
                      (u.call(t, 3) << 24)) >>>
                      0,
                    (u.call(t, 4) |
                      (u.call(t, 5) << 8) |
                      (u.call(t, 6) << 16) |
                      (u.call(t, 7) << 24)) >>>
                      0
                  );
            }),
              (e.prototype.toHash = function () {
                return String.fromCharCode(
                  255 & this.lo,
                  (this.lo >>> 8) & 255,
                  (this.lo >>> 16) & 255,
                  this.lo >>> 24,
                  255 & this.hi,
                  (this.hi >>> 8) & 255,
                  (this.hi >>> 16) & 255,
                  this.hi >>> 24
                );
              }),
              (e.prototype.zzEncode = function () {
                var t = this.hi >> 31;
                return (
                  (this.hi = (((this.hi << 1) | (this.lo >>> 31)) ^ t) >>> 0),
                  (this.lo = ((this.lo << 1) ^ t) >>> 0),
                  this
                );
              }),
              (e.prototype.zzDecode = function () {
                var t = -(1 & this.lo);
                return (
                  (this.lo = (((this.lo >>> 1) | (this.hi << 31)) ^ t) >>> 0),
                  (this.hi = ((this.hi >>> 1) ^ t) >>> 0),
                  this
                );
              }),
              (e.prototype.length = function () {
                var t = this.lo,
                  i = ((this.lo >>> 28) | (this.hi << 4)) >>> 0,
                  n = this.hi >>> 24;
                return 0 == n
                  ? 0 == i
                    ? t < 16384
                      ? t < 128
                        ? 1
                        : 2
                      : t < 2097152
                      ? 3
                      : 4
                    : i < 16384
                    ? i < 128
                      ? 5
                      : 6
                    : i < 2097152
                    ? 7
                    : 8
                  : n < 128
                  ? 9
                  : 10;
              });
          },
          { 35: 35 },
        ],
        35: [
          function (t, i, n) {
            var r = n;
            function e(t, i, n) {
              for (var r = Object.keys(i), e = 0; e < r.length; ++e)
                (t[r[e]] !== g && n) || (t[r[e]] = i[r[e]]);
              return t;
            }
            function s(t) {
              function n(t, i) {
                if (!(this instanceof n)) return new n(t, i);
                Object.defineProperty(this, "message", {
                  get: function () {
                    return t;
                  },
                }),
                  Error.captureStackTrace
                    ? Error.captureStackTrace(this, n)
                    : Object.defineProperty(this, "stack", {
                        value: Error().stack || "",
                      }),
                  i && e(this, i);
              }
              return (
                (n.prototype = Object.create(Error.prototype, {
                  constructor: {
                    value: n,
                    writable: !0,
                    enumerable: !1,
                    configurable: !0,
                  },
                  name: {
                    get() {
                      return t;
                    },
                    set: g,
                    enumerable: !1,
                    configurable: !0,
                  },
                  toString: {
                    value() {
                      return this.name + ": " + this.message;
                    },
                    writable: !0,
                    enumerable: !1,
                    configurable: !0,
                  },
                })),
                n
              );
            }
            (r.asPromise = t(1)),
              (r.base64 = t(2)),
              (r.EventEmitter = t(4)),
              (r.float = t(6)),
              (r.inquire = t(7)),
              (r.utf8 = t(10)),
              (r.pool = t(9)),
              (r.LongBits = t(34)),
              (r.isNode = !!(
                "undefined" != typeof global &&
                global &&
                global.process &&
                global.process.versions &&
                global.process.versions.node
              )),
              (r.global =
                (r.isNode && global) ||
                ("undefined" != typeof window && window) ||
                ("undefined" != typeof self && self) ||
                this),
              (r.emptyArray = Object.freeze ? Object.freeze([]) : []),
              (r.emptyObject = Object.freeze ? Object.freeze({}) : {}),
              (r.isInteger =
                Number.isInteger ||
                function (t) {
                  return (
                    "number" == typeof t && isFinite(t) && Math.floor(t) === t
                  );
                }),
              (r.isString = function (t) {
                return "string" == typeof t || t instanceof String;
              }),
              (r.isObject = function (t) {
                return t && "object" == typeof t;
              }),
              (r.isset = r.isSet =
                function (t, i) {
                  var n = t[i];
                  return (
                    null != n &&
                    t.hasOwnProperty(i) &&
                    ("object" != typeof n ||
                      0 < (Array.isArray(n) ? n : Object.keys(n)).length)
                  );
                }),
              (r.Buffer = (function () {
                try {
                  var t = r.inquire("buffer").Buffer;
                  return t.prototype.utf8Write ? t : null;
                } catch (t) {
                  return null;
                }
              })()),
              (r.v = null),
              (r.b = null),
              (r.newBuffer = function (t) {
                return "number" == typeof t
                  ? r.Buffer
                    ? r.b(t)
                    : new r.Array(t)
                  : r.Buffer
                  ? r.v(t)
                  : "undefined" == typeof Uint8Array
                  ? t
                  : new Uint8Array(t);
              }),
              (r.Array = "undefined" != typeof Uint8Array ? Uint8Array : Array),
              (r.Long =
                (r.global.dcodeIO && r.global.dcodeIO.Long) ||
                r.global.Long ||
                r.inquire("long")),
              (r.key2Re = /^true|false|0|1$/),
              (r.key32Re = /^-?(?:0|[1-9][0-9]*)$/),
              (r.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/),
              (r.longToHash = function (t) {
                return t ? r.LongBits.from(t).toHash() : r.LongBits.zeroHash;
              }),
              (r.longFromHash = function (t, i) {
                t = r.LongBits.fromHash(t);
                return r.Long
                  ? r.Long.fromBits(t.lo, t.hi, i)
                  : t.toNumber(!!i);
              }),
              (r.merge = e),
              (r.lcFirst = function (t) {
                return (t[0] || "").toLowerCase() + t.substring(1);
              }),
              (r.newError = s),
              (r.ProtocolError = s("ProtocolError")),
              (r.oneOfGetter = function (t) {
                for (var n = {}, i = 0; i < t.length; ++i) n[t[i]] = 1;
                return function () {
                  for (var t = Object.keys(this), i = t.length - 1; -1 < i; --i)
                    if (
                      1 === n[t[i]] &&
                      this[t[i]] !== g &&
                      null !== this[t[i]]
                    )
                      return t[i];
                };
              }),
              (r.oneOfSetter = function (n) {
                return function (t) {
                  for (var i = 0; i < n.length; ++i)
                    n[i] !== t && delete this[n[i]];
                };
              }),
              (r.toJSONOptions = {
                longs: String,
                enums: String,
                bytes: String,
                json: !0,
              }),
              (r.r = function () {
                var n = r.Buffer;
                n
                  ? ((r.v =
                      (n.from !== Uint8Array.from && n.from) ||
                      function (t, i) {
                        return new n(t, i);
                      }),
                    (r.b =
                      n.allocUnsafe ||
                      function (t) {
                        return new n(t);
                      }))
                  : (r.v = r.b = null);
              });
          },
          { 1: 1, 10: 10, 2: 2, 34: 34, 4: 4, 6: 6, 7: 7, 9: 9 },
        ],
        36: [
          function (t, i, n) {
            i.exports = function (t) {
              var i = h.codegen(
                  ["m"],
                  t.name + "$verify"
                )('if(typeof m!=="object"||m===null)')(
                  "return%j",
                  "object expected"
                ),
                n = t.oneofsArray,
                r = {};
              n.length && i("var p={}");
              for (var e = 0; e < t.fieldsArray.length; ++e) {
                var s,
                  u = t.i[e].resolve(),
                  o = "m" + h.safeProp(u.name);
                u.optional &&
                  i("if(%s!=null&&m.hasOwnProperty(%j)){", o, u.name),
                  u.map
                    ? (i("if(!util.isObject(%s))", o)(
                        "return%j",
                        f(u, "object")
                      )(
                        "var k=Object.keys(%s)",
                        o
                      )("for(var i=0;i<k.length;++i){"),
                      (function (t, i, n) {
                        switch (i.keyType) {
                          case "int32":
                          case "uint32":
                          case "sint32":
                          case "fixed32":
                          case "sfixed32":
                            t("if(!util.key32Re.test(%s))", n)(
                              "return%j",
                              f(i, "integer key")
                            );
                            break;
                          case "int64":
                          case "uint64":
                          case "sint64":
                          case "fixed64":
                          case "sfixed64":
                            t("if(!util.key64Re.test(%s))", n)(
                              "return%j",
                              f(i, "integer|Long key")
                            );
                            break;
                          case "bool":
                            t("if(!util.key2Re.test(%s))", n)(
                              "return%j",
                              f(i, "boolean key")
                            );
                        }
                      })(i, u, "k[i]"),
                      c(i, u, e, o + "[k[i]]")("}"))
                    : u.repeated
                    ? (i("if(!Array.isArray(%s))", o)(
                        "return%j",
                        f(u, "array")
                      )("for(var i=0;i<%s.length;++i){", o),
                      c(i, u, e, o + "[i]")("}"))
                    : (u.partOf &&
                        ((s = h.safeProp(u.partOf.name)),
                        1 === r[u.partOf.name] &&
                          i("if(p%s===1)", s)(
                            "return%j",
                            u.partOf.name + ": multiple values"
                          ),
                        (r[u.partOf.name] = 1),
                        i("p%s=1", s)),
                      c(i, u, e, o)),
                  u.optional && i("}");
              }
              return i("return null");
            };
            var u = t(14),
              h = t(33);
            function f(t, i) {
              return (
                t.name +
                ": " +
                i +
                (t.repeated && "array" !== i
                  ? "[]"
                  : t.map && "object" !== i
                  ? "{k:" + t.keyType + "}"
                  : "") +
                " expected"
              );
            }
            function c(t, i, n, r) {
              if (i.resolvedType)
                if (i.resolvedType instanceof u) {
                  t("switch(%s){", r)("default:")(
                    "return%j",
                    f(i, "enum value")
                  );
                  for (
                    var e = Object.keys(i.resolvedType.values), s = 0;
                    s < e.length;
                    ++s
                  )
                    t("case %i:", i.resolvedType.values[e[s]]);
                  t("break")("}");
                } else
                  t("{")("var e=types[%i].verify(%s);", n, r)("if(e)")(
                    "return%j+e",
                    i.name + "."
                  )("}");
              else
                switch (i.type) {
                  case "int32":
                  case "uint32":
                  case "sint32":
                  case "fixed32":
                  case "sfixed32":
                    t("if(!util.isInteger(%s))", r)(
                      "return%j",
                      f(i, "integer")
                    );
                    break;
                  case "int64":
                  case "uint64":
                  case "sint64":
                  case "fixed64":
                  case "sfixed64":
                    t(
                      "if(!util.isInteger(%s)&&!(%s&&util.isInteger(%s.low)&&util.isInteger(%s.high)))",
                      r,
                      r,
                      r,
                      r
                    )("return%j", f(i, "integer|Long"));
                    break;
                  case "float":
                  case "double":
                    t('if(typeof %s!=="number")', r)(
                      "return%j",
                      f(i, "number")
                    );
                    break;
                  case "bool":
                    t('if(typeof %s!=="boolean")', r)(
                      "return%j",
                      f(i, "boolean")
                    );
                    break;
                  case "string":
                    t("if(!util.isString(%s))", r)("return%j", f(i, "string"));
                    break;
                  case "bytes":
                    t(
                      'if(!(%s&&typeof %s.length==="number"||util.isString(%s)))',
                      r,
                      r,
                      r
                    )("return%j", f(i, "buffer"));
                }
              return t;
            }
          },
          { 14: 14, 33: 33 },
        ],
        37: [
          function (t, i, n) {
            var u = t(19);
            n[".google.protobuf.Any"] = {
              fromObject: function (t) {
                if (t && t["@type"]) {
                  var i,
                    n = t["@type"].substring(1 + t["@type"].lastIndexOf("/")),
                    n = this.lookup(n);
                  if (n)
                    return (
                      ~(i =
                        "." == (t["@type"][0] || "")
                          ? t["@type"].slice(1)
                          : t["@type"]).indexOf("/") || (i = "/" + i),
                      this.create({
                        type_url: i,
                        value: n.encode(n.fromObject(t)).finish(),
                      })
                    );
                }
                return this.fromObject(t);
              },
              toObject: function (t, i) {
                var n,
                  r,
                  e = "",
                  s = "";
                return (
                  i &&
                    i.json &&
                    t.type_url &&
                    t.value &&
                    ((s = t.type_url.substring(
                      1 + t.type_url.lastIndexOf("/")
                    )),
                    (e = t.type_url.substring(
                      0,
                      1 + t.type_url.lastIndexOf("/")
                    )),
                    (n = this.lookup(s)) && (t = n.decode(t.value))),
                  !(t instanceof this.ctor) && t instanceof u
                    ? ((n = t.$type.toObject(t, i)),
                      (r =
                        "." === t.$type.fullName[0]
                          ? t.$type.fullName.slice(1)
                          : t.$type.fullName),
                      (n["@type"] = s =
                        (e = "" === e ? "type.googleapis.com/" : e) + r),
                      n)
                    : this.toObject(t, i)
                );
              },
            };
          },
          { 19: 19 },
        ],
        38: [
          function (t, i, n) {
            i.exports = a;
            var r,
              e = t(35),
              s = e.LongBits,
              u = e.base64,
              o = e.utf8;
            function h(t, i, n) {
              (this.fn = t), (this.len = i), (this.next = g), (this.val = n);
            }
            function f() {}
            function c(t) {
              (this.head = t.head),
                (this.tail = t.tail),
                (this.len = t.len),
                (this.next = t.states);
            }
            function a() {
              (this.len = 0),
                (this.head = new h(f, 0, 0)),
                (this.tail = this.head),
                (this.states = null);
            }
            function l() {
              return e.Buffer
                ? function () {
                    return (a.create = function () {
                      return new r();
                    })();
                  }
                : function () {
                    return new a();
                  };
            }
            function d(t, i, n) {
              i[n] = 255 & t;
            }
            function v(t, i) {
              (this.len = t), (this.next = g), (this.val = i);
            }
            function b(t, i, n) {
              for (; t.hi; )
                (i[n++] = (127 & t.lo) | 128),
                  (t.lo = ((t.lo >>> 7) | (t.hi << 25)) >>> 0),
                  (t.hi >>>= 7);
              for (; 127 < t.lo; )
                (i[n++] = (127 & t.lo) | 128), (t.lo = t.lo >>> 7);
              i[n++] = t.lo;
            }
            function p(t, i, n) {
              (i[n] = 255 & t),
                (i[n + 1] = (t >>> 8) & 255),
                (i[n + 2] = (t >>> 16) & 255),
                (i[n + 3] = t >>> 24);
            }
            (a.create = l()),
              (a.alloc = function (t) {
                return new e.Array(t);
              }),
              e.Array !== Array &&
                (a.alloc = e.pool(a.alloc, e.Array.prototype.subarray)),
              (a.prototype.p = function (t, i, n) {
                return (
                  (this.tail = this.tail.next = new h(t, i, n)),
                  (this.len += i),
                  this
                );
              }),
              ((v.prototype = Object.create(h.prototype)).fn = function (
                t,
                i,
                n
              ) {
                for (; 127 < t; ) (i[n++] = (127 & t) | 128), (t >>>= 7);
                i[n] = t;
              }),
              (a.prototype.uint32 = function (t) {
                return (
                  (this.len += (this.tail = this.tail.next =
                    new v(
                      (t >>>= 0) < 128
                        ? 1
                        : t < 16384
                        ? 2
                        : t < 2097152
                        ? 3
                        : t < 268435456
                        ? 4
                        : 5,
                      t
                    )).len),
                  this
                );
              }),
              (a.prototype.int32 = function (t) {
                return t < 0 ? this.p(b, 10, s.fromNumber(t)) : this.uint32(t);
              }),
              (a.prototype.sint32 = function (t) {
                return this.uint32(((t << 1) ^ (t >> 31)) >>> 0);
              }),
              (a.prototype.int64 = a.prototype.uint64 =
                function (t) {
                  t = s.from(t);
                  return this.p(b, t.length(), t);
                }),
              (a.prototype.sint64 = function (t) {
                t = s.from(t).zzEncode();
                return this.p(b, t.length(), t);
              }),
              (a.prototype.bool = function (t) {
                return this.p(d, 1, t ? 1 : 0);
              }),
              (a.prototype.sfixed32 = a.prototype.fixed32 =
                function (t) {
                  return this.p(p, 4, t >>> 0);
                }),
              (a.prototype.sfixed64 = a.prototype.fixed64 =
                function (t) {
                  t = s.from(t);
                  return this.p(p, 4, t.lo).p(p, 4, t.hi);
                }),
              (a.prototype.float = function (t) {
                return this.p(e.float.writeFloatLE, 4, t);
              }),
              (a.prototype.double = function (t) {
                return this.p(e.float.writeDoubleLE, 8, t);
              });
            var y = e.Array.prototype.set
              ? function (t, i, n) {
                  i.set(t, n);
                }
              : function (t, i, n) {
                  for (var r = 0; r < t.length; ++r) i[n + r] = t[r];
                };
            (a.prototype.bytes = function (t) {
              var i,
                n = t.length >>> 0;
              return n
                ? (e.isString(t) &&
                    ((i = a.alloc((n = u.length(t)))),
                    u.decode(t, i, 0),
                    (t = i)),
                  this.uint32(n).p(y, n, t))
                : this.p(d, 1, 0);
            }),
              (a.prototype.string = function (t) {
                var i = o.length(t);
                return i ? this.uint32(i).p(o.write, i, t) : this.p(d, 1, 0);
              }),
              (a.prototype.fork = function () {
                return (
                  (this.states = new c(this)),
                  (this.head = this.tail = new h(f, 0, 0)),
                  (this.len = 0),
                  this
                );
              }),
              (a.prototype.reset = function () {
                return (
                  this.states
                    ? ((this.head = this.states.head),
                      (this.tail = this.states.tail),
                      (this.len = this.states.len),
                      (this.states = this.states.next))
                    : ((this.head = this.tail = new h(f, 0, 0)),
                      (this.len = 0)),
                  this
                );
              }),
              (a.prototype.ldelim = function () {
                var t = this.head,
                  i = this.tail,
                  n = this.len;
                return (
                  this.reset().uint32(n),
                  n &&
                    ((this.tail.next = t.next),
                    (this.tail = i),
                    (this.len += n)),
                  this
                );
              }),
              (a.prototype.finish = function () {
                for (
                  var t = this.head.next,
                    i = this.constructor.alloc(this.len),
                    n = 0;
                  t;

                )
                  t.fn(t.val, i, n), (n += t.len), (t = t.next);
                return i;
              }),
              (a.r = function (t) {
                (r = t), (a.create = l()), r.r();
              });
          },
          { 35: 35 },
        ],
        39: [
          function (t, i, n) {
            i.exports = s;
            var r = t(38),
              e =
                (((s.prototype = Object.create(r.prototype)).constructor = s),
                t(35));
            function s() {
              r.call(this);
            }
            function u(t, i, n) {
              t.length < 40
                ? e.utf8.write(t, i, n)
                : i.utf8Write
                ? i.utf8Write(t, n)
                : i.write(t, n);
            }
            (s.r = function () {
              (s.alloc = e.b),
                (s.writeBytesBuffer =
                  e.Buffer &&
                  e.Buffer.prototype instanceof Uint8Array &&
                  "set" === e.Buffer.prototype.set.name
                    ? function (t, i, n) {
                        i.set(t, n);
                      }
                    : function (t, i, n) {
                        if (t.copy) t.copy(i, n, 0, t.length);
                        else for (var r = 0; r < t.length; ) i[n++] = t[r++];
                      });
            }),
              (s.prototype.bytes = function (t) {
                var i = (t = e.isString(t) ? e.v(t, "base64") : t).length >>> 0;
                return (
                  this.uint32(i), i && this.p(s.writeBytesBuffer, i, t), this
                );
              }),
              (s.prototype.string = function (t) {
                var i = e.Buffer.byteLength(t);
                return this.uint32(i), i && this.p(u, i, t), this;
              }),
              s.r();
          },
          { 35: 35, 38: 38 },
        ],
      },
      {},
      [16]
    );
  })();
  // https://github.com/emn178/js-md5 md5=i.md5=_
  let md5;
  !(function () {
    "use strict";
    function t(t) {
      if (t)
        (d[0] =
          d[16] =
          d[1] =
          d[2] =
          d[3] =
          d[4] =
          d[5] =
          d[6] =
          d[7] =
          d[8] =
          d[9] =
          d[10] =
          d[11] =
          d[12] =
          d[13] =
          d[14] =
          d[15] =
            0),
          (this.blocks = d),
          (this.buffer8 = l);
      else if (a) {
        var r = new ArrayBuffer(68);
        (this.buffer8 = new Uint8Array(r)), (this.blocks = new Uint32Array(r));
      } else this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      (this.h0 =
        this.h1 =
        this.h2 =
        this.h3 =
        this.start =
        this.bytes =
        this.hBytes =
          0),
        (this.finalized = this.hashed = !1),
        (this.first = !0);
    }
    var r = "input is invalid type",
      e = "object" == typeof window,
      i = e ? window : {};
    i.JS_MD5_NO_WINDOW && (e = !1);
    var s = !e && "object" == typeof self,
      h =
        !i.JS_MD5_NO_NODE_JS &&
        "object" == typeof process &&
        process.versions &&
        process.versions.node;
    h ? (i = global) : s && (i = self);
    var f =
        !i.JS_MD5_NO_COMMON_JS && "object" == typeof module && module.exports,
      o = "function" == typeof define && define.amd,
      a = !i.JS_MD5_NO_ARRAY_BUFFER && "undefined" != typeof ArrayBuffer,
      n = "0123456789abcdef".split(""),
      u = [128, 32768, 8388608, -2147483648],
      y = [0, 8, 16, 24],
      c = ["hex", "array", "digest", "buffer", "arrayBuffer", "base64"],
      p =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(
          ""
        ),
      d = [],
      l;
    if (a) {
      var A = new ArrayBuffer(68);
      (l = new Uint8Array(A)), (d = new Uint32Array(A));
    }
    (!i.JS_MD5_NO_NODE_JS && Array.isArray) ||
      (Array.isArray = function (t) {
        return "[object Array]" === Object.prototype.toString.call(t);
      }),
      !a ||
        (!i.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW && ArrayBuffer.isView) ||
        (ArrayBuffer.isView = function (t) {
          return (
            "object" == typeof t &&
            t.buffer &&
            t.buffer.constructor === ArrayBuffer
          );
        });
    var b = function (r) {
        return function (e) {
          return new t(!0).update(e)[r]();
        };
      },
      v = function () {
        var r = b("hex");
        h && (r = w(r)),
          (r.create = function () {
            return new t();
          }),
          (r.update = function (t) {
            return r.create().update(t);
          });
        for (var e = 0; e < c.length; ++e) {
          var i = c[e];
          r[i] = b(i);
        }
        return r;
      },
      w = function (t) {
        var e = eval("require('crypto')"),
          i = eval("require('buffer').Buffer"),
          s = function (s) {
            if ("string" == typeof s)
              return e.createHash("md5").update(s, "utf8").digest("hex");
            if (null === s || void 0 === s) throw r;
            return (
              s.constructor === ArrayBuffer && (s = new Uint8Array(s)),
              Array.isArray(s) || ArrayBuffer.isView(s) || s.constructor === i
                ? e.createHash("md5").update(new i(s)).digest("hex")
                : t(s)
            );
          };
        return s;
      };
    (t.prototype.update = function (t) {
      if (!this.finalized) {
        var e,
          i = typeof t;
        if ("string" !== i) {
          if ("object" !== i) throw r;
          if (null === t) throw r;
          if (a && t.constructor === ArrayBuffer) t = new Uint8Array(t);
          else if (!(Array.isArray(t) || (a && ArrayBuffer.isView(t)))) throw r;
          e = !0;
        }
        for (
          var s, h, f = 0, o = t.length, n = this.blocks, u = this.buffer8;
          f < o;

        ) {
          if (
            (this.hashed &&
              ((this.hashed = !1),
              (n[0] = n[16]),
              (n[16] =
                n[1] =
                n[2] =
                n[3] =
                n[4] =
                n[5] =
                n[6] =
                n[7] =
                n[8] =
                n[9] =
                n[10] =
                n[11] =
                n[12] =
                n[13] =
                n[14] =
                n[15] =
                  0)),
            e)
          )
            if (a) for (h = this.start; f < o && h < 64; ++f) u[h++] = t[f];
            else
              for (h = this.start; f < o && h < 64; ++f)
                n[h >> 2] |= t[f] << y[3 & h++];
          else if (a)
            for (h = this.start; f < o && h < 64; ++f)
              (s = t.charCodeAt(f)) < 128
                ? (u[h++] = s)
                : s < 2048
                ? ((u[h++] = 192 | (s >> 6)), (u[h++] = 128 | (63 & s)))
                : s < 55296 || s >= 57344
                ? ((u[h++] = 224 | (s >> 12)),
                  (u[h++] = 128 | ((s >> 6) & 63)),
                  (u[h++] = 128 | (63 & s)))
                : ((s =
                    65536 + (((1023 & s) << 10) | (1023 & t.charCodeAt(++f)))),
                  (u[h++] = 240 | (s >> 18)),
                  (u[h++] = 128 | ((s >> 12) & 63)),
                  (u[h++] = 128 | ((s >> 6) & 63)),
                  (u[h++] = 128 | (63 & s)));
          else
            for (h = this.start; f < o && h < 64; ++f)
              (s = t.charCodeAt(f)) < 128
                ? (n[h >> 2] |= s << y[3 & h++])
                : s < 2048
                ? ((n[h >> 2] |= (192 | (s >> 6)) << y[3 & h++]),
                  (n[h >> 2] |= (128 | (63 & s)) << y[3 & h++]))
                : s < 55296 || s >= 57344
                ? ((n[h >> 2] |= (224 | (s >> 12)) << y[3 & h++]),
                  (n[h >> 2] |= (128 | ((s >> 6) & 63)) << y[3 & h++]),
                  (n[h >> 2] |= (128 | (63 & s)) << y[3 & h++]))
                : ((s =
                    65536 + (((1023 & s) << 10) | (1023 & t.charCodeAt(++f)))),
                  (n[h >> 2] |= (240 | (s >> 18)) << y[3 & h++]),
                  (n[h >> 2] |= (128 | ((s >> 12) & 63)) << y[3 & h++]),
                  (n[h >> 2] |= (128 | ((s >> 6) & 63)) << y[3 & h++]),
                  (n[h >> 2] |= (128 | (63 & s)) << y[3 & h++]));
          (this.lastByteIndex = h),
            (this.bytes += h - this.start),
            h >= 64
              ? ((this.start = h - 64), this.hash(), (this.hashed = !0))
              : (this.start = h);
        }
        return (
          this.bytes > 4294967295 &&
            ((this.hBytes += (this.bytes / 4294967296) << 0),
            (this.bytes = this.bytes % 4294967296)),
          this
        );
      }
    }),
      (t.prototype.finalize = function () {
        if (!this.finalized) {
          this.finalized = !0;
          var t = this.blocks,
            r = this.lastByteIndex;
          (t[r >> 2] |= u[3 & r]),
            r >= 56 &&
              (this.hashed || this.hash(),
              (t[0] = t[16]),
              (t[16] =
                t[1] =
                t[2] =
                t[3] =
                t[4] =
                t[5] =
                t[6] =
                t[7] =
                t[8] =
                t[9] =
                t[10] =
                t[11] =
                t[12] =
                t[13] =
                t[14] =
                t[15] =
                  0)),
            (t[14] = this.bytes << 3),
            (t[15] = (this.hBytes << 3) | (this.bytes >>> 29)),
            this.hash();
        }
      }),
      (t.prototype.hash = function () {
        var t,
          r,
          e,
          i,
          s,
          h,
          f = this.blocks;
        this.first
          ? (r =
              ((((r =
                ((t =
                  ((((t = f[0] - 680876937) << 7) | (t >>> 25)) - 271733879) <<
                  0) ^
                  ((e =
                    ((((e =
                      (-271733879 ^
                        ((i =
                          ((((i =
                            (-1732584194 ^ (2004318071 & t)) +
                            f[1] -
                            117830708) <<
                            12) |
                            (i >>> 20)) +
                            t) <<
                          0) &
                          (-271733879 ^ t))) +
                      f[2] -
                      1126478375) <<
                      17) |
                      (e >>> 15)) +
                      i) <<
                    0) &
                    (i ^ t))) +
                f[3] -
                1316259209) <<
                22) |
                (r >>> 10)) +
                e) <<
              0)
          : ((t = this.h0),
            (r = this.h1),
            (e = this.h2),
            (r =
              ((((r +=
                ((t =
                  ((((t +=
                    ((i = this.h3) ^ (r & (e ^ i))) + f[0] - 680876936) <<
                    7) |
                    (t >>> 25)) +
                    r) <<
                  0) ^
                  ((e =
                    ((((e +=
                      (r ^
                        ((i =
                          ((((i += (e ^ (t & (r ^ e))) + f[1] - 389564586) <<
                            12) |
                            (i >>> 20)) +
                            t) <<
                          0) &
                          (t ^ r))) +
                      f[2] +
                      606105819) <<
                      17) |
                      (e >>> 15)) +
                      i) <<
                    0) &
                    (i ^ t))) +
                f[3] -
                1044525330) <<
                22) |
                (r >>> 10)) +
                e) <<
              0)),
          (r =
            ((((r +=
              ((t =
                ((((t += (i ^ (r & (e ^ i))) + f[4] - 176418897) << 7) |
                  (t >>> 25)) +
                  r) <<
                0) ^
                ((e =
                  ((((e +=
                    (r ^
                      ((i =
                        ((((i += (e ^ (t & (r ^ e))) + f[5] + 1200080426) <<
                          12) |
                          (i >>> 20)) +
                          t) <<
                        0) &
                        (t ^ r))) +
                    f[6] -
                    1473231341) <<
                    17) |
                    (e >>> 15)) +
                    i) <<
                  0) &
                  (i ^ t))) +
              f[7] -
              45705983) <<
              22) |
              (r >>> 10)) +
              e) <<
            0),
          (r =
            ((((r +=
              ((t =
                ((((t += (i ^ (r & (e ^ i))) + f[8] + 1770035416) << 7) |
                  (t >>> 25)) +
                  r) <<
                0) ^
                ((e =
                  ((((e +=
                    (r ^
                      ((i =
                        ((((i += (e ^ (t & (r ^ e))) + f[9] - 1958414417) <<
                          12) |
                          (i >>> 20)) +
                          t) <<
                        0) &
                        (t ^ r))) +
                    f[10] -
                    42063) <<
                    17) |
                    (e >>> 15)) +
                    i) <<
                  0) &
                  (i ^ t))) +
              f[11] -
              1990404162) <<
              22) |
              (r >>> 10)) +
              e) <<
            0),
          (r =
            ((((r +=
              ((t =
                ((((t += (i ^ (r & (e ^ i))) + f[12] + 1804603682) << 7) |
                  (t >>> 25)) +
                  r) <<
                0) ^
                ((e =
                  ((((e +=
                    (r ^
                      ((i =
                        ((((i += (e ^ (t & (r ^ e))) + f[13] - 40341101) <<
                          12) |
                          (i >>> 20)) +
                          t) <<
                        0) &
                        (t ^ r))) +
                    f[14] -
                    1502002290) <<
                    17) |
                    (e >>> 15)) +
                    i) <<
                  0) &
                  (i ^ t))) +
              f[15] +
              1236535329) <<
              22) |
              (r >>> 10)) +
              e) <<
            0),
          (r =
            ((((r +=
              ((i =
                ((((i +=
                  (r ^
                    (e &
                      ((t =
                        ((((t += (e ^ (i & (r ^ e))) + f[1] - 165796510) << 5) |
                          (t >>> 27)) +
                          r) <<
                        0) ^
                        r))) +
                  f[6] -
                  1069501632) <<
                  9) |
                  (i >>> 23)) +
                  t) <<
                0) ^
                (t &
                  ((e =
                    ((((e += (t ^ (r & (i ^ t))) + f[11] + 643717713) << 14) |
                      (e >>> 18)) +
                      i) <<
                    0) ^
                    i))) +
              f[0] -
              373897302) <<
              20) |
              (r >>> 12)) +
              e) <<
            0),
          (r =
            ((((r +=
              ((i =
                ((((i +=
                  (r ^
                    (e &
                      ((t =
                        ((((t += (e ^ (i & (r ^ e))) + f[5] - 701558691) << 5) |
                          (t >>> 27)) +
                          r) <<
                        0) ^
                        r))) +
                  f[10] +
                  38016083) <<
                  9) |
                  (i >>> 23)) +
                  t) <<
                0) ^
                (t &
                  ((e =
                    ((((e += (t ^ (r & (i ^ t))) + f[15] - 660478335) << 14) |
                      (e >>> 18)) +
                      i) <<
                    0) ^
                    i))) +
              f[4] -
              405537848) <<
              20) |
              (r >>> 12)) +
              e) <<
            0),
          (r =
            ((((r +=
              ((i =
                ((((i +=
                  (r ^
                    (e &
                      ((t =
                        ((((t += (e ^ (i & (r ^ e))) + f[9] + 568446438) << 5) |
                          (t >>> 27)) +
                          r) <<
                        0) ^
                        r))) +
                  f[14] -
                  1019803690) <<
                  9) |
                  (i >>> 23)) +
                  t) <<
                0) ^
                (t &
                  ((e =
                    ((((e += (t ^ (r & (i ^ t))) + f[3] - 187363961) << 14) |
                      (e >>> 18)) +
                      i) <<
                    0) ^
                    i))) +
              f[8] +
              1163531501) <<
              20) |
              (r >>> 12)) +
              e) <<
            0),
          (r =
            ((((r +=
              ((i =
                ((((i +=
                  (r ^
                    (e &
                      ((t =
                        ((((t += (e ^ (i & (r ^ e))) + f[13] - 1444681467) <<
                          5) |
                          (t >>> 27)) +
                          r) <<
                        0) ^
                        r))) +
                  f[2] -
                  51403784) <<
                  9) |
                  (i >>> 23)) +
                  t) <<
                0) ^
                (t &
                  ((e =
                    ((((e += (t ^ (r & (i ^ t))) + f[7] + 1735328473) << 14) |
                      (e >>> 18)) +
                      i) <<
                    0) ^
                    i))) +
              f[12] -
              1926607734) <<
              20) |
              (r >>> 12)) +
              e) <<
            0),
          (r =
            ((((r +=
              ((h =
                (i =
                  ((((i +=
                    ((s = r ^ e) ^
                      (t =
                        ((((t += (s ^ i) + f[5] - 378558) << 4) | (t >>> 28)) +
                          r) <<
                        0)) +
                    f[8] -
                    2022574463) <<
                    11) |
                    (i >>> 21)) +
                    t) <<
                  0) ^ t) ^
                (e =
                  ((((e += (h ^ r) + f[11] + 1839030562) << 16) | (e >>> 16)) +
                    i) <<
                  0)) +
              f[14] -
              35309556) <<
              23) |
              (r >>> 9)) +
              e) <<
            0),
          (r =
            ((((r +=
              ((h =
                (i =
                  ((((i +=
                    ((s = r ^ e) ^
                      (t =
                        ((((t += (s ^ i) + f[1] - 1530992060) << 4) |
                          (t >>> 28)) +
                          r) <<
                        0)) +
                    f[4] +
                    1272893353) <<
                    11) |
                    (i >>> 21)) +
                    t) <<
                  0) ^ t) ^
                (e =
                  ((((e += (h ^ r) + f[7] - 155497632) << 16) | (e >>> 16)) +
                    i) <<
                  0)) +
              f[10] -
              1094730640) <<
              23) |
              (r >>> 9)) +
              e) <<
            0),
          (r =
            ((((r +=
              ((h =
                (i =
                  ((((i +=
                    ((s = r ^ e) ^
                      (t =
                        ((((t += (s ^ i) + f[13] + 681279174) << 4) |
                          (t >>> 28)) +
                          r) <<
                        0)) +
                    f[0] -
                    358537222) <<
                    11) |
                    (i >>> 21)) +
                    t) <<
                  0) ^ t) ^
                (e =
                  ((((e += (h ^ r) + f[3] - 722521979) << 16) | (e >>> 16)) +
                    i) <<
                  0)) +
              f[6] +
              76029189) <<
              23) |
              (r >>> 9)) +
              e) <<
            0),
          (r =
            ((((r +=
              ((h =
                (i =
                  ((((i +=
                    ((s = r ^ e) ^
                      (t =
                        ((((t += (s ^ i) + f[9] - 640364487) << 4) |
                          (t >>> 28)) +
                          r) <<
                        0)) +
                    f[12] -
                    421815835) <<
                    11) |
                    (i >>> 21)) +
                    t) <<
                  0) ^ t) ^
                (e =
                  ((((e += (h ^ r) + f[15] + 530742520) << 16) | (e >>> 16)) +
                    i) <<
                  0)) +
              f[2] -
              995338651) <<
              23) |
              (r >>> 9)) +
              e) <<
            0),
          (r =
            ((((r +=
              ((i =
                ((((i +=
                  (r ^
                    ((t =
                      ((((t += (e ^ (r | ~i)) + f[0] - 198630844) << 6) |
                        (t >>> 26)) +
                        r) <<
                      0) |
                      ~e)) +
                  f[7] +
                  1126891415) <<
                  10) |
                  (i >>> 22)) +
                  t) <<
                0) ^
                ((e =
                  ((((e += (t ^ (i | ~r)) + f[14] - 1416354905) << 15) |
                    (e >>> 17)) +
                    i) <<
                  0) |
                  ~t)) +
              f[5] -
              57434055) <<
              21) |
              (r >>> 11)) +
              e) <<
            0),
          (r =
            ((((r +=
              ((i =
                ((((i +=
                  (r ^
                    ((t =
                      ((((t += (e ^ (r | ~i)) + f[12] + 1700485571) << 6) |
                        (t >>> 26)) +
                        r) <<
                      0) |
                      ~e)) +
                  f[3] -
                  1894986606) <<
                  10) |
                  (i >>> 22)) +
                  t) <<
                0) ^
                ((e =
                  ((((e += (t ^ (i | ~r)) + f[10] - 1051523) << 15) |
                    (e >>> 17)) +
                    i) <<
                  0) |
                  ~t)) +
              f[1] -
              2054922799) <<
              21) |
              (r >>> 11)) +
              e) <<
            0),
          (r =
            ((((r +=
              ((i =
                ((((i +=
                  (r ^
                    ((t =
                      ((((t += (e ^ (r | ~i)) + f[8] + 1873313359) << 6) |
                        (t >>> 26)) +
                        r) <<
                      0) |
                      ~e)) +
                  f[15] -
                  30611744) <<
                  10) |
                  (i >>> 22)) +
                  t) <<
                0) ^
                ((e =
                  ((((e += (t ^ (i | ~r)) + f[6] - 1560198380) << 15) |
                    (e >>> 17)) +
                    i) <<
                  0) |
                  ~t)) +
              f[13] +
              1309151649) <<
              21) |
              (r >>> 11)) +
              e) <<
            0),
          (r =
            ((((r +=
              ((i =
                ((((i +=
                  (r ^
                    ((t =
                      ((((t += (e ^ (r | ~i)) + f[4] - 145523070) << 6) |
                        (t >>> 26)) +
                        r) <<
                      0) |
                      ~e)) +
                  f[11] -
                  1120210379) <<
                  10) |
                  (i >>> 22)) +
                  t) <<
                0) ^
                ((e =
                  ((((e += (t ^ (i | ~r)) + f[2] + 718787259) << 15) |
                    (e >>> 17)) +
                    i) <<
                  0) |
                  ~t)) +
              f[9] -
              343485551) <<
              21) |
              (r >>> 11)) +
              e) <<
            0),
          this.first
            ? ((this.h0 = (t + 1732584193) << 0),
              (this.h1 = (r - 271733879) << 0),
              (this.h2 = (e - 1732584194) << 0),
              (this.h3 = (i + 271733878) << 0),
              (this.first = !1))
            : ((this.h0 = (this.h0 + t) << 0),
              (this.h1 = (this.h1 + r) << 0),
              (this.h2 = (this.h2 + e) << 0),
              (this.h3 = (this.h3 + i) << 0));
      }),
      (t.prototype.hex = function () {
        this.finalize();
        var t = this.h0,
          r = this.h1,
          e = this.h2,
          i = this.h3;
        return (
          n[(t >> 4) & 15] +
          n[15 & t] +
          n[(t >> 12) & 15] +
          n[(t >> 8) & 15] +
          n[(t >> 20) & 15] +
          n[(t >> 16) & 15] +
          n[(t >> 28) & 15] +
          n[(t >> 24) & 15] +
          n[(r >> 4) & 15] +
          n[15 & r] +
          n[(r >> 12) & 15] +
          n[(r >> 8) & 15] +
          n[(r >> 20) & 15] +
          n[(r >> 16) & 15] +
          n[(r >> 28) & 15] +
          n[(r >> 24) & 15] +
          n[(e >> 4) & 15] +
          n[15 & e] +
          n[(e >> 12) & 15] +
          n[(e >> 8) & 15] +
          n[(e >> 20) & 15] +
          n[(e >> 16) & 15] +
          n[(e >> 28) & 15] +
          n[(e >> 24) & 15] +
          n[(i >> 4) & 15] +
          n[15 & i] +
          n[(i >> 12) & 15] +
          n[(i >> 8) & 15] +
          n[(i >> 20) & 15] +
          n[(i >> 16) & 15] +
          n[(i >> 28) & 15] +
          n[(i >> 24) & 15]
        );
      }),
      (t.prototype.toString = t.prototype.hex),
      (t.prototype.digest = function () {
        this.finalize();
        var t = this.h0,
          r = this.h1,
          e = this.h2,
          i = this.h3;
        return [
          255 & t,
          (t >> 8) & 255,
          (t >> 16) & 255,
          (t >> 24) & 255,
          255 & r,
          (r >> 8) & 255,
          (r >> 16) & 255,
          (r >> 24) & 255,
          255 & e,
          (e >> 8) & 255,
          (e >> 16) & 255,
          (e >> 24) & 255,
          255 & i,
          (i >> 8) & 255,
          (i >> 16) & 255,
          (i >> 24) & 255,
        ];
      }),
      (t.prototype.array = t.prototype.digest),
      (t.prototype.arrayBuffer = function () {
        this.finalize();
        var t = new ArrayBuffer(16),
          r = new Uint32Array(t);
        return (
          (r[0] = this.h0),
          (r[1] = this.h1),
          (r[2] = this.h2),
          (r[3] = this.h3),
          t
        );
      }),
      (t.prototype.buffer = t.prototype.arrayBuffer),
      (t.prototype.base64 = function () {
        for (var t, r, e, i = "", s = this.array(), h = 0; h < 15; )
          (t = s[h++]),
            (r = s[h++]),
            (e = s[h++]),
            (i +=
              p[t >>> 2] +
              p[63 & ((t << 4) | (r >>> 4))] +
              p[63 & ((r << 2) | (e >>> 6))] +
              p[63 & e]);
        return (t = s[h]), (i += p[t >>> 2] + p[(t << 4) & 63] + "==");
      });
    var _ = v();
    f
      ? (module.exports = _)
      : ((md5 = i.md5 = _),
        o &&
          define(function () {
            return _;
          }));
  })();

  const notifyName = "spotify歌词翻译2022.9.22";
  const commonApi = new Env2(notifyName);
  const isQX = commonApi.isQuanX();
  const binaryBody = isQX
    ? new Uint8Array($response.bodyBytes)
    : $response.body;
  const lyricJson = {
    nested: {
      ColorLyricsResponse: {
        fields: {
          lyrics: { type: "LyricsResponse", id: 1 },
          colors: { type: "ColorData", id: 2 },
          hasVocalRemoval: { type: "bool", id: 3 },
          vocalRemovalColors: { type: "ColorData", id: 4 },
        },
      },
      LyricsResponse: {
        fields: {
          syncType: { type: "SyncTypeEnum", id: 1 },
          lines: { rule: "repeated", type: "LyricsLine", id: 2 },
          provider: { type: "string", id: 3 },
          providerLyricsId: { type: "string", id: 4 },
          providerDisplayName: { type: "string", id: 5 },
          syncLyricsUri: { type: "string", id: 7 },
          isDenseTypeface: { type: "bool", id: 8 },
          language: { type: "string", id: 10 },
          isRtlLanguage: { type: "bool", id: 11 },
          fullscreenAction: { type: "int32", id: 12 },
        },
      },
      LyricsLine: {
        fields: {
          startTimeMs: { type: "int64", id: 1 },
          words: { type: "string", id: 2 },
          syllables: { rule: "repeated", type: "Syllable", id: 3 },
        },
      },
      Syllable: {
        fields: {
          startTimeMs: { type: "int64", id: 1 },
          numChars: { type: "int64", id: 2 },
        },
      },
      SyncTypeEnum: {
        values: { UNSYNCED: 0, LINE_SYNCED: 1, SYLLABLE_SYNCED: 2 },
      },
      ColorData: {
        fields: {
          background: { type: "int32", id: 1 },
          text: { type: "int32", id: 2 },
          highlightText: { type: "int32", id: 3 },
        },
      },
    },
  };
  const colorLyricsResponseType = protobuf.Root.fromJSON(lyricJson).lookupType(
    "ColorLyricsResponse"
  );
  const colorLyricsResponseObj = colorLyricsResponseType.decode(binaryBody);
  const originLanguage = colorLyricsResponseObj.lyrics.language;
  if ("z1" !== originLanguage) {
    console.log(`歌词语言为:${originLanguage}`);
    if (typeof $argument !== "undefined") {
      //console.log($argument);
      try {
        const params = Object.fromEntries(
          $argument.split("&").map((item) => item.split("="))
        );
        Object.assign(options, params);
      } catch (error) {
        commonApi.msg(notifyName, "$argument解析失败", $argument);
      }
    }
    const { appid, securityKey } = options;
    //console.log(`appid:${appid},securityKey:${securityKey}`);

    const query = colorLyricsResponseObj.lyrics.lines
      .map((x) => x.words)
      .filter((words) => words !== "♪")
      .filter((v, i, a) => a.indexOf(v) === i)
      .join("\n");
    const salt = Date.now();
    const queryObj = {
      q: query,
      from: "auto",
      to: "zh",
      appid,
      salt,
      sign: md5(appid + query + salt + securityKey),
    };
    const requestBody = Object.entries(queryObj)
      .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
      .join("&");

    // 调用翻译
    commonApi.post(
      {
        url: "https://fanyi-api.baidu.com/api/trans/vip/translate",
        body: requestBody,
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
      },
      (error, response, data) => {
        if (error) {
          commonApi.msg(notifyName, "百度翻译", `error错误${error}`);
          $done({});
        } else if (response.status !== 200) {
          commonApi.msg(
            notifyName,
            "百度翻译",
            `响应不为200:${response.status}`
          );
          $done({});
        } else {
          const baiduResult = JSON.parse(data);
          if (baiduResult.error_code) {
            commonApi.msg(
              notifyName,
              "百度翻译",
              `翻译错误,请检查appid和密钥配置:"${data}`
            );
            $done({});
          } else {
            console.log("翻译成功");
            // 因为采用了批量翻译,如果歌词为多种语言,只会翻译其中的一种语言
            const transArr = baiduResult.trans_result
              .filter((trans) => trans.src !== trans.dst)
              .map((trans) => [trans.src, trans.dst]);
            const transMap = new Map(transArr);
            colorLyricsResponseObj.lyrics.lines.forEach((line) => {
              const dst = transMap.get(line.words);
              if (dst) {
                line.words = `${line.words}(${dst})`;
              }
            });
            // 构造新数据
            const body = colorLyricsResponseType
              .encode(colorLyricsResponseObj)
              .finish();
            if (isQX) {
              $done({
                bodyBytes: body.buffer.slice(
                  body.byteOffset,
                  body.byteLength + body.byteOffset
                ),
              });
            } else {
              $done({ body });
            }
          }
        }
      }
    );
  } else {
    console.log("歌词为中文,无需翻译");
    $done({});
  }
  // https://github.com/chavyleung/scripts/blob/master/Env2.min.js
  function Env2(t, e) {
    class s {
      constructor(t) {
        this.env = t;
      }
      send(t, e = "GET") {
        t = "string" == typeof t ? { url: t } : t;
        let s = this.get;
        return (
          "POST" === e && (s = this.post),
          new Promise((e, i) => {
            s.call(this, t, (t, s, r) => {
              t ? i(t) : e(s);
            });
          })
        );
      }
      get(t) {
        return this.send.call(this.env, t);
      }
      post(t) {
        return this.send.call(this.env, t, "POST");
      }
    }
    return new (class {
      constructor(t, e) {
        (this.name = t),
          (this.http = new s(this)),
          (this.data = null),
          (this.dataFile = "box.dat"),
          (this.logs = []),
          (this.isMute = !1),
          (this.isNeedRewrite = !1),
          (this.logSeparator = "\n"),
          (this.encoding = "utf-8"),
          (this.startTime = new Date().getTime()),
          Object.assign(this, e),
          this.log("", `🔔${this.name}, 开始!`);
      }
      isNode() {
        return "undefined" != typeof module && !!module.exports;
      }
      isQuanX() {
        return "undefined" != typeof $task;
      }
      isSurge() {
        return "undefined" != typeof $httpClient && "undefined" == typeof $loon;
      }
      isLoon() {
        return "undefined" != typeof $loon;
      }
      isShadowrocket() {
        return "undefined" != typeof $rocket;
      }
      isStash() {
        return (
          "undefined" != typeof $environment && $environment["stash-version"]
        );
      }
      toObj(t, e = null) {
        try {
          return JSON.parse(t);
        } catch {
          return e;
        }
      }
      toStr(t, e = null) {
        try {
          return JSON.stringify(t);
        } catch {
          return e;
        }
      }
      getjson(t, e) {
        let s = e;
        const i = this.getdata(t);
        if (i)
          try {
            s = JSON.parse(this.getdata(t));
          } catch {}
        return s;
      }
      setjson(t, e) {
        try {
          return this.setdata(JSON.stringify(t), e);
        } catch {
          return !1;
        }
      }
      getScript(t) {
        return new Promise((e) => {
          this.get({ url: t }, (t, s, i) => e(i));
        });
      }
      runScript(t, e) {
        return new Promise((s) => {
          let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
          i = i ? i.replace(/\n/g, "").trim() : i;
          let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
          (r = r ? 1 * r : 20), (r = e && e.timeout ? e.timeout : r);
          const [o, n] = i.split("@"),
            a = {
              url: `http://${n}/v1/scripting/evaluate`,
              body: { script_text: t, mock_type: "cron", timeout: r },
              headers: { "X-Key": o, Accept: "*/*" },
            };
          this.post(a, (t, e, i) => s(i));
        }).catch((t) => this.logErr(t));
      }
      loaddata() {
        if (!this.isNode()) return {};
        {
          (this.fs = this.fs ? this.fs : require("fs")),
            (this.path = this.path ? this.path : require("path"));
          const t = this.path.resolve(this.dataFile),
            e = this.path.resolve(process.cwd(), this.dataFile),
            s = this.fs.existsSync(t),
            i = !s && this.fs.existsSync(e);
          if (!s && !i) return {};
          {
            const i = s ? t : e;
            try {
              return JSON.parse(this.fs.readFileSync(i));
            } catch (t) {
              return {};
            }
          }
        }
      }
      writedata() {
        if (this.isNode()) {
          (this.fs = this.fs ? this.fs : require("fs")),
            (this.path = this.path ? this.path : require("path"));
          const t = this.path.resolve(this.dataFile),
            e = this.path.resolve(process.cwd(), this.dataFile),
            s = this.fs.existsSync(t),
            i = !s && this.fs.existsSync(e),
            r = JSON.stringify(this.data);
          s
            ? this.fs.writeFileSync(t, r)
            : i
            ? this.fs.writeFileSync(e, r)
            : this.fs.writeFileSync(t, r);
        }
      }
      lodash_get(t, e, s) {
        const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
        let r = t;
        for (const t of i) if (((r = Object(r)[t]), void 0 === r)) return s;
        return r;
      }
      lodash_set(t, e, s) {
        return Object(t) !== t
          ? t
          : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []),
            (e
              .slice(0, -1)
              .reduce(
                (t, s, i) =>
                  Object(t[s]) === t[s]
                    ? t[s]
                    : (t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}),
                t
              )[e[e.length - 1]] = s),
            t);
      }
      getdata(t) {
        let e = this.getval(t);
        if (/^@/.test(t)) {
          const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t),
            r = s ? this.getval(s) : "";
          if (r)
            try {
              const t = JSON.parse(r);
              e = t ? this.lodash_get(t, i, "") : e;
            } catch (t) {
              e = "";
            }
        }
        return e;
      }
      setdata(t, e) {
        let s = !1;
        if (/^@/.test(e)) {
          const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e),
            o = this.getval(i),
            n = i ? ("null" === o ? null : o || "{}") : "{}";
          try {
            const e = JSON.parse(n);
            this.lodash_set(e, r, t), (s = this.setval(JSON.stringify(e), i));
          } catch (e) {
            const o = {};
            this.lodash_set(o, r, t), (s = this.setval(JSON.stringify(o), i));
          }
        } else s = this.setval(t, e);
        return s;
      }
      getval(t) {
        return this.isSurge() || this.isLoon()
          ? $persistentStore.read(t)
          : this.isQuanX()
          ? $prefs.valueForKey(t)
          : this.isNode()
          ? ((this.data = this.loaddata()), this.data[t])
          : (this.data && this.data[t]) || null;
      }
      setval(t, e) {
        return this.isSurge() || this.isLoon()
          ? $persistentStore.write(t, e)
          : this.isQuanX()
          ? $prefs.setValueForKey(t, e)
          : this.isNode()
          ? ((this.data = this.loaddata()),
            (this.data[e] = t),
            this.writedata(),
            !0)
          : (this.data && this.data[e]) || null;
      }
      initGotEnv(t) {
        (this.got = this.got ? this.got : require("got")),
          (this.cktough = this.cktough
            ? this.cktough
            : require("tough-cookie")),
          (this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar()),
          t &&
            ((t.headers = t.headers ? t.headers : {}),
            void 0 === t.headers.Cookie &&
              void 0 === t.cookieJar &&
              (t.cookieJar = this.ckjar));
      }
      get(t, e = () => {}) {
        if (
          (t.headers &&
            (delete t.headers["Content-Type"],
            delete t.headers["Content-Length"]),
          this.isSurge() || this.isLoon())
        )
          this.isSurge() &&
            this.isNeedRewrite &&
            ((t.headers = t.headers || {}),
            Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })),
            $httpClient.get(t, (t, s, i) => {
              !t &&
                s &&
                ((s.body = i),
                (s.statusCode = s.status ? s.status : s.statusCode),
                (s.status = s.statusCode)),
                e(t, s, i);
            });
        else if (this.isQuanX())
          this.isNeedRewrite &&
            ((t.opts = t.opts || {}), Object.assign(t.opts, { hints: !1 })),
            $task.fetch(t).then(
              (t) => {
                const { statusCode: s, statusCode: i, headers: r, body: o } = t;
                e(null, { status: s, statusCode: i, headers: r, body: o }, o);
              },
              (t) => e((t && t.error) || "UndefinedError")
            );
        else if (this.isNode()) {
          let s = require("iconv-lite");
          this.initGotEnv(t),
            this.got(t)
              .on("redirect", (t, e) => {
                try {
                  if (t.headers["set-cookie"]) {
                    const s = t.headers["set-cookie"]
                      .map(this.cktough.Cookie.parse)
                      .toString();
                    s && this.ckjar.setCookieSync(s, null),
                      (e.cookieJar = this.ckjar);
                  }
                } catch (t) {
                  this.logErr(t);
                }
              })
              .then(
                (t) => {
                  const {
                      statusCode: i,
                      statusCode: r,
                      headers: o,
                      rawBody: n,
                    } = t,
                    a = s.decode(n, this.encoding);
                  e(
                    null,
                    {
                      status: i,
                      statusCode: r,
                      headers: o,
                      rawBody: n,
                      body: a,
                    },
                    a
                  );
                },
                (t) => {
                  const { message: i, response: r } = t;
                  e(i, r, r && s.decode(r.rawBody, this.encoding));
                }
              );
        }
      }
      post(t, e = () => {}) {
        const s = t.method ? t.method.toLocaleLowerCase() : "post";
        if (
          (t.body &&
            t.headers &&
            !t.headers["Content-Type"] &&
            (t.headers["Content-Type"] = "application/x-www-form-urlencoded"),
          t.headers && delete t.headers["Content-Length"],
          this.isSurge() || this.isLoon())
        )
          this.isSurge() &&
            this.isNeedRewrite &&
            ((t.headers = t.headers || {}),
            Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })),
            $httpClient[s](t, (t, s, i) => {
              !t &&
                s &&
                ((s.body = i),
                (s.statusCode = s.status ? s.status : s.statusCode),
                (s.status = s.statusCode)),
                e(t, s, i);
            });
        else if (this.isQuanX())
          (t.method = s),
            this.isNeedRewrite &&
              ((t.opts = t.opts || {}), Object.assign(t.opts, { hints: !1 })),
            $task.fetch(t).then(
              (t) => {
                const { statusCode: s, statusCode: i, headers: r, body: o } = t;
                e(null, { status: s, statusCode: i, headers: r, body: o }, o);
              },
              (t) => e((t && t.error) || "UndefinedError")
            );
        else if (this.isNode()) {
          let i = require("iconv-lite");
          this.initGotEnv(t);
          const { url: r, ...o } = t;
          this.got[s](r, o).then(
            (t) => {
              const {
                  statusCode: s,
                  statusCode: r,
                  headers: o,
                  rawBody: n,
                } = t,
                a = i.decode(n, this.encoding);
              e(
                null,
                { status: s, statusCode: r, headers: o, rawBody: n, body: a },
                a
              );
            },
            (t) => {
              const { message: s, response: r } = t;
              e(s, r, r && i.decode(r.rawBody, this.encoding));
            }
          );
        }
      }
      time(t, e = null) {
        const s = e ? new Date(e) : new Date();
        let i = {
          "M+": s.getMonth() + 1,
          "d+": s.getDate(),
          "H+": s.getHours(),
          "m+": s.getMinutes(),
          "s+": s.getSeconds(),
          "q+": Math.floor((s.getMonth() + 3) / 3),
          S: s.getMilliseconds(),
        };
        /(y+)/.test(t) &&
          (t = t.replace(
            RegExp.$1,
            (s.getFullYear() + "").substr(4 - RegExp.$1.length)
          ));
        for (let e in i)
          new RegExp("(" + e + ")").test(t) &&
            (t = t.replace(
              RegExp.$1,
              1 == RegExp.$1.length
                ? i[e]
                : ("00" + i[e]).substr(("" + i[e]).length)
            ));
        return t;
      }
      queryStr(t) {
        let e = "";
        for (const s in t) {
          let i = t[s];
          null != i &&
            "" !== i &&
            ("object" == typeof i && (i = JSON.stringify(i)),
            (e += `${s}=${i}&`));
        }
        return (e = e.substring(0, e.length - 1)), e;
      }
      msg(e = t, s = "", i = "", r) {
        const o = (t) => {
          if (!t) return t;
          if ("string" == typeof t)
            return this.isLoon()
              ? t
              : this.isQuanX()
              ? { "open-url": t }
              : this.isSurge()
              ? { url: t }
              : void 0;
          if ("object" == typeof t) {
            if (this.isLoon()) {
              let e = t.openUrl || t.url || t["open-url"],
                s = t.mediaUrl || t["media-url"];
              return { openUrl: e, mediaUrl: s };
            }
            if (this.isQuanX()) {
              let e = t["open-url"] || t.url || t.openUrl,
                s = t["media-url"] || t.mediaUrl,
                i = t["update-pasteboard"] || t.updatePasteboard;
              return { "open-url": e, "media-url": s, "update-pasteboard": i };
            }
            if (this.isSurge()) {
              let e = t.url || t.openUrl || t["open-url"];
              return { url: e };
            }
          }
        };
        if (
          (this.isMute ||
            (this.isSurge() || this.isLoon()
              ? $notification.post(e, s, i, o(r))
              : this.isQuanX() && $notify(e, s, i, o(r))),
          !this.isMuteLog)
        ) {
          let t = ["", "==============📣系统通知📣=============="];
          t.push(e),
            s && t.push(s),
            i && t.push(i),
            console.log(t.join("\n")),
            (this.logs = this.logs.concat(t));
        }
      }
      log(...t) {
        t.length > 0 && (this.logs = [...this.logs, ...t]),
          console.log(t.join(this.logSeparator));
      }
      logErr(t, e) {
        const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
        s
          ? this.log("", `❗️${this.name}, 错误!`, t.stack)
          : this.log("", `❗️${this.name}, 错误!`, t);
      }
      wait(t) {
        return new Promise((e) => setTimeout(e, t));
      }
      done(t = {}) {
        const e = new Date().getTime(),
          s = (e - this.startTime) / 1e3;
        this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`),
          this.log(),
          this.isSurge() || this.isQuanX() || this.isLoon()
            ? $done(t)
            : this.isNode() && process.exit(1);
      }
    })(t, e);
  }
}
