'use strict';
Object.defineProperty(exports, '__esModule', { value: !0 });
var e = require('effector'),
  t = require('react'),
  r = function () {
    return (
      (r =
        Object.assign ||
        function (e) {
          for (var t, r = 1, n = arguments.length; r < n; r++)
            for (var s in (t = arguments[r]))
              Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);
          return e;
        }),
      r.apply(this, arguments)
    );
  };
exports.createLib = function (n) {
  var s = n.useEvent,
    i = n.useStore;
  return {
    createView: function (n) {
      var o = {},
        u = r(
          r(
            {},
            (function (e) {
              return {
                displayName: function (t) {
                  return (e.displayName = t), this;
                },
                defaultProps: function (t) {
                  return (e.defaultProps = t), this;
                },
                props: function (t) {
                  return (e.props = t), this;
                },
                map: function (t) {
                  return (e.map = t), this;
                },
                enter: function (t) {
                  return (e.enter = t), this;
                },
                exit: function (t) {
                  return (e.exit = t), this;
                },
                effect: function (t) {
                  return (e.effect = t), this;
                }
              };
            })(o)
          ),
          {
            view: function (u) {
              var a,
                c = n || u,
                f = (function (t) {
                  void 0 === t && (t = {});
                  for (
                    var r = {}, n = {}, s = {}, i = 0, o = Object.entries(t);
                    i < o.length;
                    i++
                  ) {
                    var u = o[i],
                      a = u[0],
                      c = u[1];
                    e.is.store(c, { sid: 'oyk9og' })
                      ? (n[a] = c)
                      : e.is.event(c, { sid: 'kjvjw5' }) ||
                        e.is.effect(c, { sid: 'kjvlco' })
                      ? (r[a] = c)
                      : (s[a] = c);
                  }
                  return {
                    rest: s,
                    events: r,
                    stores: n,
                    hasEvents: Object.keys(r).length > 0,
                    hasStores: Object.keys(n).length > 0
                  };
                })(o.props),
                l = f.hasEvents,
                p = f.hasStores,
                v = f.stores,
                d = f.events,
                h = f.rest;
              p &&
                (a = e.combine({
                  and: [v],
                  or: { name: '$store', sid: '-7m05m0' }
                }));
              var m = function (e) {
                var n,
                  u = r(r(r(r({}, e), h), l && s(d)), p && i(a));
                return (
                  o.map && (u = r(r(r({}, e), u), o.map(u))),
                  null === (n = o.effect) || void 0 === n || n.call(o, u),
                  ((null == o ? void 0 : o.enter) ||
                    (null == o ? void 0 : o.exit)) &&
                    t.useEffect(function () {
                      var e;
                      return (
                        null === (e = o.enter) || void 0 === e || e.call(o),
                        o.exit
                      );
                    }, []),
                  c(u)
                );
              };
              return (
                o.displayName && (m.displayName = o.displayName),
                o.defaultProps && (m.defaultProps = o.defaultProps),
                (m.Memo = t.memo(m)),
                (m.Original = n || u),
                m
              );
            }
          }
        );
      return u;
    }
  };
};
//# sourceMappingURL=index.js.map
