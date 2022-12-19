/* eslint-disable */
!(function (e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t(require("three")))
    : "function" == typeof define && define.amd
    ? define(["three"], t)
    : "object" == typeof exports
    ? (exports.IJEWEL = t(require("three")))
    : (e.IJEWEL = t(e.THREE));
})(window, function (e) {
  return (function (e) {
    var t = {};
    function n(o) {
      if (t[o]) return t[o].exports;
      var r = (t[o] = { i: o, l: !1, exports: {} });
      return e[o].call(r.exports, r, r.exports, n), (r.l = !0), r.exports;
    }
    return (
      (n.m = e),
      (n.c = t),
      (n.d = function (e, t, o) {
        n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: o });
      }),
      (n.r = function (e) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      }),
      (n.t = function (e, t) {
        if ((1 & t && (e = n(e)), 8 & t)) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var o = Object.create(null);
        if (
          (n.r(o),
          Object.defineProperty(o, "default", { enumerable: !0, value: e }),
          2 & t && "string" != typeof e)
        )
          for (var r in e)
            n.d(
              o,
              r,
              function (t) {
                return e[t];
              }.bind(null, r)
            );
        return o;
      }),
      (n.n = function (e) {
        var t =
          e && e.__esModule
            ? function () {
                return e.default;
              }
            : function () {
                return e;
              };
        return n.d(t, "a", t), t;
      }),
      (n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (n.p = ""),
      n((n.s = 0))
    );
  })({
    "./src/Diamond.ts": function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.Diamond = void 0);
      const o = n("three");
      t.Diamond = class {
        constructor(e, t) {
          (this.u = []),
            (this.v = e),
            (this.v.material = t.clone()),
            this.v.geometry.computeBoundingBox(),
            (this.h = new o.Vector3()),
            this.v.geometry.boundingBox.getCenter(this.h),
            this.v.material.uniforms.centreOffset.value.copy(this.h),
            this.v.geometry.computeBoundingSphere(),
            (this.M = this.v.geometry.boundingSphere.radius),
            (this.v.material.uniforms.radius.value = this.M);
          let n = this;
          this.v.onBeforeRender = function (e, t, o) {
            n.updateDiamond(o);
          };
        }
        get isDiamond() {
          return !0;
        }
        getCentreOffset() {
          return this.h;
        }
        getBoundingRadius() {
          return this.M;
        }
        getMesh() {
          return this.v;
        }
        getMaterial() {
          return this.v.material;
        }
        setPosition(e, t, n) {
          this.v.position.set(e, t, n);
        }
        setRotation(e, t, n) {
          this.v.rotation.set(e, t, n);
        }
        setQuaternion(e, t, n, o) {
          this.v.quaternion.set(e, t, n, o);
        }
        setScale(e, t, n) {
          this.v.scale.set(e, t, n);
          for (var o = 0; o < this.u.length; o++) this.u[o].setScale(e);
        }
        setTransform(e) {
          this.v.matrix.copy(e);
        }
        updateDiamond(e) {
          if (void 0 === this.v.material.isDiamondMaterial) return;
          let t = new o.Vector3();
          this.v.updateMatrixWorld();
          let n = this.v.matrixWorld,
            r = this.v.material.uniforms.InverseModelMatrix;
          r && r.value.copy(n).invert(),
            (this.v.material.uniforms.opacity.value = this.v.material.opacity);
          for (var i = 0; i < this.u.length; i++) {
            this.u[i].syncWithTransform(this.v.matrixWorld),
              t.copy(e.position),
              t.sub(this.u[i].mesh.position),
              t.normalize();
            var a = t.x + t.y + t.z;
            this.u[i].setRotation(a * this.u[i].rotationSpeedFactor),
              this.u[i].alignWithCamera(e);
          }
        }
        addSparkle(e) {
          this.u.push(e);
        }
        dispose() {
          this.v.onBeforeRender = () => {};
        }
      };
    },
    "./src/DiamondMaterial.ts": function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.DiamondMaterial = void 0);
      const o = n("three"),
        r = n("./src/DiamondShaders.ts");
      class i extends o.ShaderMaterial {
        constructor(e, t, n, i) {
          if (
            (super(),
            (this.C = new o.Scene()),
            (this.D = !0),
            (this.h = new o.Vector3()),
            (this.u = []),
            void 0 === e)
          )
            return;
          (this._ = null), (i = i || 1024);
          const a = new o.WebGLCubeRenderTarget(i, {
            format: o.RGBAFormat,
            generateMipmaps: !1,
            minFilter: o.NearestFilter,
            magFilter: o.NearestFilter,
          });
          (this.P = new o.CubeCamera(1e-4, 100, a)),
            this.C.add(this.P),
            (this.extensions = r.diamondMaterial.extensions),
            (this.defines = r.diamondMaterial.defines),
            (this.uniforms = o.UniformsUtils.clone(r.diamondMaterial.uniforms)),
            (this.side = o.DoubleSide),
            (this.envMap = t),
            (this.vertexShader = r.diamondMaterial.vertexShader),
            (this.fragmentShader = r.diamondMaterial.fragmentShader),
            (this.D = !0),
            (this._ = e.clone()),
            (this._.material = r.normalMapCaptureMaterial),
            (this._.material.side = o.DoubleSide),
            (this._.geometry = e.geometry.clone()),
            this._.geometry.center();
          let s = e.geometry;
          s.computeBoundingBox(),
            s.boundingBox.getCenter(this.h),
            s.computeBoundingSphere(),
            this._.position.set(0, 0, 0),
            this._.rotation.set(0, 0, 0),
            this._.quaternion.set(0, 0, 0, 1),
            this._.scale.set(1, 1, 1),
            this.C.add(this._),
            this.prepareNormalsCubeMap(n);
        }
        clone() {
          const e = new i();
          return (
            (e.uniforms = o.UniformsUtils.clone(this.uniforms)),
            (e.extensions = this.extensions),
            (e.defines = this.defines),
            (e.uniforms.tCubeMapNormals.value = this.P.renderTarget.texture),
            (e.uniforms.envMap.value = this.S),
            (e.envMap = this.S),
            (e.side = o.DoubleSide),
            (e.vertexShader = this.vertexShader),
            (e.fragmentShader = this.fragmentShader),
            (e.P = this.P),
            (e._ = this._),
            (e.name = this.name),
            (e.transparent = this.transparent),
            (e.opacity = this.opacity),
            e
          );
        }
        prepareNormalsCubeMap(e) {
          this.D &&
            (this.P.update(e, this.C),
            (this.uniforms.tCubeMapNormals.value = this.P.renderTarget),
            (this.D = !1));
        }
        dispose(e) {
          e && (this.P.renderTarget.dispose(), this._.geometry.dispose()),
            super.dispose();
        }
        set lut(e) {
          const t = this;
          if (e !== this.lut)
            if (
              ((t.uniforms.lut3d.value = null),
              (t.uniforms.lut.value = null),
              e)
            ) {
              const n = e.isDataTexture3D ? 1 : 0;
              n !== t.defines.USE_3DTEXTURE &&
                ((t.defines.USE_3DTEXTURE = n), (t.needsUpdate = !0)),
                e.isDataTexture3D
                  ? (t.uniforms.lut3d.value = e)
                  : ((t.uniforms.lut.value = e),
                    (t.uniforms.lutSize.value = e.image.width)),
                (t.defines.USE_LUT = 1),
                (t.needsUpdate = !0);
            } else (t.defines.USE_LUT = 0), (t.needsUpdate = !0);
        }
        get lut() {
          return this.uniforms.lut.value || this.uniforms.lut3d.value;
        }
        get isDiamondMaterial() {
          return !0;
        }
        set envMap(e) {
          e &&
            ((this.S = e),
            this.S.isCubeTexture
              ? (this.defines.ENV_MAP_TYPE = 0)
              : (this.defines.ENV_MAP_TYPE = 1),
            (this.uniforms.envMap.value = e));
        }
        set envMapRotation(e) {
          this.uniforms.envMapRotation.value = e;
        }
        set envMapIntensity(e) {
          this.uniforms.envMapIntensity.value = e;
        }
        set dispersion(e) {
          this.uniforms.rIndexDelta.value = e;
        }
        set squashFactor(e) {
          this.uniforms.squashFactor.value = e;
        }
        set geometryFactor(e) {
          this.uniforms.geometryFactor.value = e;
        }
        set gammaFactor(e) {
          this.uniforms.gammaFactor.value = e;
        }
        set absorbptionFactor(e) {
          this.uniforms.absorbptionFactor.value = e;
        }
        set refractiveIndex(e) {
          this.uniforms.refractiveIndex.value = e;
        }
        set color(e) {
          const t = this.uniforms.Absorbption.value;
          (t.x = 1 - e.r), (t.y = 1 - e.g), (t.z = 1 - e.b);
        }
        set boostFactors(e) {
          const t = this.uniforms.boostFactors.value;
          void 0 !== e.x && (t.x = e.x),
            void 0 !== e.y && (t.y = e.y),
            void 0 !== e.z && (t.z = e.z);
        }
        get envMap() {
          return this.uniforms.envMap.value;
        }
        get envMapRotation() {
          return this.uniforms.envMapRotation.value;
        }
        get envMapIntensity() {
          return this.uniforms.envMapIntensity.value;
        }
        get dispersion() {
          return this.uniforms.rIndexDelta.value;
        }
        get squashFactor() {
          return this.uniforms.squashFactor.value;
        }
        get geometryFactor() {
          return this.uniforms.geometryFactor.value;
        }
        get refractiveIndex() {
          return this.uniforms.refractiveIndex.value;
        }
        get color() {
          const e = this.uniforms.Absorbption.value;
          return new o.Color(1 - e.x, 1 - e.y, 1 - e.z);
        }
        get boostFactors() {
          return this.uniforms.boostFactors.value;
        }
        get gammaFactor() {
          return this.uniforms.gammaFactor.value;
        }
        get absorbptionFactor() {
          return this.uniforms.absorbptionFactor.value;
        }
      }
      t.DiamondMaterial = i;
    },
    "./src/DiamondShaders.ts": function (e, t, n) {
      "use strict";
      var o =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e };
        };
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.diamondMaterial = t.normalMapCaptureMaterial = void 0);
      const r = n("three"),
        i = o(n("./src/shaders/normalcapture.vert")),
        a = o(n("./src/shaders/normalcapture.frag")),
        s = o(n("./src/shaders/diamond.vert")),
        c = o(n("./src/shaders/diamond.frag")),
        l = {
          vertexShader: i.default,
          fragmentShader: a.default,
          side: r.DoubleSide,
        },
        u = {
          defines: {
            RAY_BOUNCES: 5,
            ENV_MAP_TYPE: 0,
            PI: 3.1428,
            USE_3DTEXTURE: 0,
            USE_LUT: 0,
          },
          vertexShader: s.default,
          fragmentShader: c.default,
          uniforms: {
            tCubeMapNormals: { type: "t", value: null },
            envMap: { type: "t", value: null },
            envRefractionMap: { type: "t", value: null },
            sphereMap: { type: "t", value: null },
            envMapIntensity: { type: "f", value: 1 },
            maxBounces: { type: "i", value: 1 },
            tanAngleSqCone: { type: "f", value: 0 },
            coneHeight: { type: "f", value: 0 },
            bDebugBounces: { type: "i", value: !1 },
            rIndexDelta: { type: "f", value: 0.012 },
            refractiveIndex: { type: "f", value: 2.4 },
            radius: { type: "f", value: 1 },
            normalOffset: { type: "f", value: 0 },
            squashFactor: { type: "f", value: 0.98 },
            distanceOffset: { type: "f", value: 0 },
            geometryFactor: { type: "f", value: 0.28 },
            Absorbption: { type: "v3", value: new r.Vector3(0, 0, 0) },
            colorCorrection: { type: "v3", value: new r.Vector3(1, 1, 1) },
            boostFactors: {
              type: "v3",
              value: new r.Vector3(0.892, 0.892, 0.98595025),
            },
            centreOffset: { type: "v3", value: new r.Vector3(0, 0, 0) },
            gammaFactor: { type: "f", value: 1 },
            absorbptionFactor: { type: "f", value: 1 },
            envMapRotation: { type: "f", value: 0 },
            InverseModelMatrix: {
              type: "m4",
              value: new r.Matrix4().identity(),
            },
            lut3d: { value: null },
            lut: { value: null },
            lutSize: { value: 0 },
            opacity: { value: 1 },
          },
          side: r.DoubleSide,
        };
      (t.normalMapCaptureMaterial = new r.ShaderMaterial(l)),
        (t.diamondMaterial = new r.ShaderMaterial(u));
    },
    "./src/DiamondUtils.ts": function (e, t, n) {
      "use strict";
      var o =
          (this && this.__createBinding) ||
          (Object.create
            ? function (e, t, n, o) {
                void 0 === o && (o = n),
                  Object.defineProperty(e, o, {
                    enumerable: !0,
                    get: function () {
                      return t[n];
                    },
                  });
              }
            : function (e, t, n, o) {
                void 0 === o && (o = n), (e[o] = t[n]);
              }),
        r =
          (this && this.__setModuleDefault) ||
          (Object.create
            ? function (e, t) {
                Object.defineProperty(e, "default", {
                  enumerable: !0,
                  value: t,
                });
              }
            : function (e, t) {
                e.default = t;
              }),
        i =
          (this && this.__importStar) ||
          function (e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e)
              for (var n in e)
                "default" !== n &&
                  Object.prototype.hasOwnProperty.call(e, n) &&
                  o(t, e, n);
            return r(t, e), t;
          };
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.DiamondUtils = void 0);
      const a = n("./src/Diamond.ts"),
        s = n("./src/DiamondMaterial.ts"),
        c = i(n("three"));
      function l(e, n) {
        let o = [];
        e.traverse((e) => {
          e.isMesh && o.push(e);
        }),
          o.forEach((e) => {
            if (e.isMesh) {
              const o = u(e.material, n),
                r = f(e, n);
              let i = o && o.name;
              (i = i || (r && r.name)) ||
                (i = e.name.toLowerCase().includes("diamond")
                  ? "diamond"
                  : void 0),
                i &&
                  (!(function (e) {
                    let t = e.geometry;
                    if (t.transformed) {
                      let n = new c.Vector3(),
                        o = new c.Quaternion(),
                        r = new c.Vector3();
                      t.xForm.decompose(n, o, r);
                      let i = new c.Object3D();
                      i.position.copy(e.position),
                        i.quaternion.copy(e.quaternion),
                        i.scale.copy(e.scale);
                      let a = e.parent;
                      return (
                        i.add(e),
                        a.add(i),
                        e.position.copy(n),
                        e.quaternion.copy(o),
                        void e.scale.copy(r)
                      );
                    }
                    g.set(0, 0, 0);
                    let n = t.getAttribute("position").array,
                      o = t.index;
                    if (o) {
                      let e = o.array;
                      for (let t = 0; t < e.length / 3; t += 3) {
                        let o = 3 * e[t],
                          r = 3 * e[t + 1],
                          i = 3 * e[t + 2];
                        m.set(n[o], n[o + 1], n[o + 2]),
                          h.set(n[r], n[r + 1], n[r + 2]),
                          p.set(n[i], n[i + 1], n[i + 2]),
                          h.sub(m),
                          p.sub(m),
                          p.cross(h),
                          p.normalize(),
                          g.add(p);
                      }
                    } else
                      for (let e = 0; e < n.length / 3; e += 9)
                        m.set(n[e], n[e + 1], n[e + 2]),
                          h.set(n[e + 3], n[e + 4], n[e + 5]),
                          p.set(n[e + 6], n[e + 7], n[e + 8]),
                          h.sub(m),
                          p.sub(m),
                          p.cross(h),
                          p.normalize(),
                          g.add(p);
                    g.normalize(),
                      t.computeBoundingBox(),
                      t.computeBoundingSphere();
                    let r = new c.Matrix4();
                    r.identity();
                    let i = t.boundingSphere.center;
                    r.makeTranslation(i.x, i.y, i.z), t.center();
                    let a = !1,
                      s = 0;
                    for (; !a; ) {
                      m.set(n[s], n[s + 1], n[s + 2]), m.normalize();
                      let e = g.dot(m);
                      Math.abs(e - 1) > 0.001 && (a = !0), (s += 3);
                    }
                    h.crossVectors(m, g), h.normalize();
                    let l = g.dot(h);
                    m.crossVectors(g, h),
                      m.normalize(),
                      (l = g.dot(m)),
                      (l = h.dot(m));
                    let u = new c.Matrix4();
                    (u.elements[0] = m.x),
                      (u.elements[1] = m.y),
                      (u.elements[2] = m.z),
                      (u.elements[3] = 0),
                      (u.elements[4] = g.x),
                      (u.elements[5] = g.y),
                      (u.elements[6] = g.z),
                      (u.elements[7] = 0),
                      (u.elements[8] = h.x),
                      (u.elements[9] = h.y),
                      (u.elements[10] = h.z),
                      (u.elements[11] = 0),
                      (u.elements[12] = 0),
                      (u.elements[13] = 0),
                      (u.elements[14] = 0),
                      (u.elements[15] = 1);
                    let f = new c.Matrix4();
                    f.copy(u).invert(),
                      t.applyMatrix4(f),
                      t.computeBoundingSphere();
                    let v = t.boundingSphere.radius,
                      d = new c.Matrix4();
                    d.identity(), d.makeScale(v, v, v);
                    let b = new c.Matrix4();
                    b.copy(d).invert(),
                      t.applyMatrix4(b),
                      u.multiply(d),
                      r.multiply(u);
                    let y = new c.Vector3(),
                      x = new c.Quaternion(),
                      M = new c.Vector3();
                    r.decompose(y, x, M);
                    let C = new c.Object3D();
                    C.position.copy(e.position),
                      C.quaternion.copy(e.quaternion),
                      C.scale.copy(e.scale);
                    let w = e.parent;
                    C.add(e),
                      w.add(C),
                      e.position.copy(y),
                      e.quaternion.copy(x),
                      e.scale.copy(M),
                      (t.parentMesh = e),
                      (t.xForm = r),
                      (t.transformed = !0);
                  })(e),
                  t.DiamondUtils.prototypeMaterials[i] ||
                    (t.DiamondUtils.prototypeMaterials[i] = e));
            }
          });
      }
      function u(e, t) {
        let n;
        const o = e.name.toLowerCase();
        if (t && t.diamondClass) {
          const e = t.diamondClass;
          for (let t in e) {
            let n = e[t];
            if (n.name && o === n.name.toLowerCase()) return n;
          }
        } else
          t &&
            !t.diamondConfiguration &&
            o.includes("diamond") &&
            (n = { name: e.name.substring(0, 8) });
        return n;
      }
      function f(e, t) {
        let n;
        const o = e.name.toLowerCase();
        if (t && t.diamondClass) {
          const e = t.diamondClass;
          for (let t in e) {
            let n = e[t];
            if (n.name && o.includes(n.name.toLowerCase())) return n;
          }
        } else
          t &&
            !t.diamondConfiguration &&
            o.includes("diamond") &&
            (n = { name: e.name.substring(0, 8) });
        return n;
      }
      function v(e, t) {
        const n = e.name.toLowerCase();
        if (t && t.diamondConfiguration) {
          const e = t.diamondConfiguration;
          for (let t in e) {
            let o = e[t];
            if (o.name && n === o.name.toLowerCase()) return o;
          }
        } else n.includes("diamond");
      }
      function d(e, t) {
        const n = e.material;
        void 0 !== t.color && (n.color = new c.Color(t.color)),
          void 0 !== t.boostFactors &&
            (n.boostFactors = {
              x: t.boostFactors.x,
              y: t.boostFactors.y,
              z: t.boostFactors.z,
            }),
          void 0 !== t.squashFactor && (n.squashFactor = t.squashFactor),
          void 0 !== t.dispersion && (n.dispersion = t.dispersion),
          void 0 !== t.geometryFactor && (n.geometryFactor = t.geometryFactor),
          void 0 !== t.refractiveIndex &&
            (n.refractiveIndex = t.refractiveIndex),
          void 0 !== t.gammaFactor && (n.gammaFactor = t.gammaFactor),
          void 0 !== t.absorbptionFactor &&
            (n.absorbptionFactor = t.absorbptionFactor),
          void 0 !== t.envMapIntensity &&
            (n.envMapIntensity = t.envMapIntensity),
          (n.needsUpdate = !0);
      }
      t.DiamondUtils = {};
      const m = new c.Vector3(),
        h = new c.Vector3(),
        p = new c.Vector3(),
        g = new c.Vector3();
      (t.DiamondUtils.processScene = function (e, n, o) {
        return (
          (t.DiamondUtils.prototypeMaterials = []),
          l(n, o),
          (function (e, n, o) {
            let r = [],
              i = o && o.envCubeMap;
            for (var c in t.DiamondUtils.prototypeMaterials) {
              const n = t.DiamondUtils.prototypeMaterials[c];
              let r;
              r =
                o && o.quality
                  ? "low" === o.quality
                    ? 64
                    : "medium" === o.quality
                    ? 256
                    : "high" === o.quality
                    ? 1024
                    : 256
                  : 256;
              const a = new s.DiamondMaterial(n, i, e, r);
              t.DiamondUtils.prototypeMaterials[c] = a;
            }
            return (
              n.updateMatrixWorld(),
              n.traverse((e) => {
                if (e.isMesh) {
                  e.material && (e.material.envMap = i);
                  const n = f(e, o),
                    s = v(e, o),
                    c = u(e.material, o);
                  let l = c && c.name;
                  if (
                    ((l = (l = l || (s && s.name)) || (n && n.name)) ||
                      (l = e.name.toLowerCase().includes("diamond")
                        ? "diamond"
                        : void 0),
                    l && t.DiamondUtils.prototypeMaterials[l])
                  ) {
                    let o = t.DiamondUtils.prototypeMaterials[l];
                    o.name = l;
                    const i = new a.Diamond(e, o);
                    d(e, c || s || n || { name: l }), r.push(i);
                  }
                }
              }),
              r
            );
          })(e, n, o)
        );
      }),
        (t.DiamondUtils.setGemstoneConfig = function (e, t) {
          let n = t && t.envCubeMap;
          e.forEach((e) => {
            const o = e.getMesh();
            if (o.isMesh) {
              o.material &&
                n &&
                ((o.material.uniforms.envMap.value = n),
                (o.material.envMap = n));
              const e = f(o, t),
                r = v(o, t),
                i = u(o.material, t);
              let a = e && e.name;
              if (
                (a = (a = a || (r && r.name)) || (i && i.name) || "diamond")
              ) {
                d(o, i || r || e || { name: a });
              }
            }
          });
        });
    },
    "./src/Sparkle.ts": function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.Sparkle = void 0);
      const o = n("three"),
        r = n("./src/SparkleShader.ts");
      class i {
        constructor(e, t) {
          (this.F = e),
            (this.R = t),
            (this.O = new o.PlaneGeometry(1, 1, 1)),
            (this.N = new o.ShaderMaterial()),
            (this.N.depthTest = !1),
            (this.N.depthWrite = !1),
            (this.N.transparent = !0),
            (this.N.side = o.DoubleSide),
            (this.N.blending = o.AdditiveBlending),
            (this.N.vertexShader = r.SparkleShader.vertexShader),
            (this.N.fragmentShader = r.SparkleShader.fragmentShader),
            (this.N.uniforms = o.UniformsUtils.clone(r.SparkleShader.uniforms)),
            void 0 !== this.F && (this.N.uniforms.sparkleTexture.value = e),
            void 0 !== this.R && (this.N.uniforms.noiseTexture.value = t),
            (this.v = new o.Mesh(this.O, this.N)),
            (this.v.positionOffset = new o.Vector3()),
            (this.j = 5);
        }
        get mesh() {
          return this.v;
        }
        get material() {
          return this.N;
        }
        shallowCopy() {
          let e = new i(this.F, this.R);
          return (
            (e.mesh.positionOffset = new o.Vector3()),
            e.mesh.positionOffset.copy(this.v.positionOffset),
            (e.material.uniforms.scale.value = this.N.uniforms.scale.value),
            (e.material.uniforms.rotation.value =
              this.N.uniforms.rotation.value),
            (e.material.uniforms.intensity.value =
              this.N.uniforms.intensity.value),
            (e.material.uniforms.screenTexture.value =
              this.N.uniforms.screenTexture.value),
            (e.material.uniforms.noiseTexture.value =
              this.N.uniforms.noiseTexture.value),
            e.material.uniforms.ModelViewMatrix.value.copy(
              this.N.uniforms.ModelViewMatrix.value
            ),
            (e.rotationSpeedFactor = this.j),
            e
          );
        }
        setScale(e) {
          this.N.uniforms.scale.value = e;
        }
        setIntensity(e) {
          this.N.uniforms.intensity.value = e;
        }
        setRotation(e) {
          this.N.uniforms.rotation.value = e;
        }
        setRotationSpeedFactor(e) {
          this.j = e;
        }
        setPositionOffset(e, t, n) {
          (this.v.positionOffset.x = e),
            (this.v.positionOffset.y = t),
            (this.v.positionOffset.z = n),
            this.v.position.copy(this.v.positionOffset),
            this.v.updateMatrix();
        }
        alignWithCamera(e) {
          this.v.modelViewMatrix.multiplyMatrices(
            e.matrixWorldInverse,
            this.v.matrix
          ),
            this.N.uniforms.ModelViewMatrix.value.copy(this.v.modelViewMatrix);
        }
        syncWithTransform(e, t) {
          this.v.position.copy(this.v.positionOffset),
            t && this.v.position.add(t),
            this.v.position.applyMatrix4(e),
            this.v.updateMatrix();
        }
      }
      t.Sparkle = i;
    },
    "./src/SparkleShader.ts": function (e, t, n) {
      "use strict";
      var o =
          (this && this.__createBinding) ||
          (Object.create
            ? function (e, t, n, o) {
                void 0 === o && (o = n),
                  Object.defineProperty(e, o, {
                    enumerable: !0,
                    get: function () {
                      return t[n];
                    },
                  });
              }
            : function (e, t, n, o) {
                void 0 === o && (o = n), (e[o] = t[n]);
              }),
        r =
          (this && this.__setModuleDefault) ||
          (Object.create
            ? function (e, t) {
                Object.defineProperty(e, "default", {
                  enumerable: !0,
                  value: t,
                });
              }
            : function (e, t) {
                e.default = t;
              }),
        i =
          (this && this.__importStar) ||
          function (e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e)
              for (var n in e)
                "default" !== n &&
                  Object.prototype.hasOwnProperty.call(e, n) &&
                  o(t, e, n);
            return r(t, e), t;
          };
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.SparkleShader = void 0);
      const a = i(n("three"));
      t.SparkleShader = {
        vertexShader: [
          "varying vec2 vUv;",
          "varying vec4 sparkleProjectedCentre;",
          "uniform mat4 ModelViewMatrix;",
          "uniform float scale;",
          "uniform float rotation;",
          "void main() { ",
          "vUv = uv; ",
          "vec4 finalPosition;",
          "vec2 alignedPosition = position.xy * scale;",
          "vec2 rotatedPosition;",
          "rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;",
          "rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;",
          "finalPosition = ModelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );",
          "finalPosition.xy += rotatedPosition;",
          "finalPosition = projectionMatrix * finalPosition;",
          "sparkleProjectedCentre = projectionMatrix * ModelViewMatrix * vec4(0.0,0.0,0.0,1.0 );",
          "gl_Position = finalPosition;",
          "}",
        ].join("\n"),
        fragmentShader: [
          "varying vec2 vUv;",
          "varying vec4 sparkleProjectedCentre;",
          "uniform sampler2D sparkleTexture;",
          "uniform sampler2D screenTexture;",
          "uniform sampler2D noiseTexture;",
          "uniform float intensity;",
          "vec3 ClosestPrimaryColor(vec3 color) {",
          "vec3 diffColor1 = vec3(1.0,0.0,0.0) - color;",
          "vec3 diffColor2 = vec3(0.0,1.0,0.0) - color;",
          "vec3 diffColor3 = vec3(0.0,0.0,1.0) - color;",
          "const float margin = 0.5; ",
          "if(dot(diffColor1, diffColor1) < margin)",
          "return vec3(1.0, margin, margin); ",
          "if(dot(diffColor2, diffColor2) < margin)",
          "return vec3(margin, 1.0, margin);",
          "if(dot(diffColor3, diffColor3) < margin)",
          "return vec3(margin, margin, 1.0);",
          "return color;",
          "}",
          "void main() {",
          "vec2 uv = (sparkleProjectedCentre.xy/sparkleProjectedCentre.w + 1.0)*0.5;",
          "vec4 screenColor = texture2D( screenTexture, uv );",
          "//screenColor.rgb = ClosestPrimaryColor(screenColor.rgb);",
          "float noise = texture2D( noiseTexture, uv ).r;",
          "screenColor.xyz *= screenColor.xyz;",
          "screenColor.xyz *= screenColor.xyz;",
          "screenColor.xyz *= screenColor.xyz;",
          "//float luminance = dot(vec3(0.3, 0.59, 0.11), screenColor.xyz);",
          "//luminance = luminance > 0.0 ? luminance : 0.0;",
          "vec4 spriteColor = vec4(1.) * texture2D( sparkleTexture, vUv ).a * screenColor * noise * intensity;",
          "gl_FragColor = spriteColor;",
          "}",
        ].join("\n"),
        uniforms: {
          ModelViewMatrix: { type: "m4", value: new a.Matrix4().identity() },
          sparkleTexture: { type: "t", value: null },
          screenTexture: { type: "t", value: null },
          noiseTexture: { type: "t", value: null },
          scale: { type: "f", value: 1 },
          rotation: { type: "f", value: 0 },
          intensity: { type: "f", value: 1 },
        },
        side: a.DoubleSide,
      };
    },
    "./src/index.ts": function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.Sparkle = t.DiamondUtils = t.DiamondMaterial = t.Diamond = void 0);
      const o = n("./src/Diamond.ts");
      Object.defineProperty(t, "Diamond", {
        enumerable: !0,
        get: function () {
          return o.Diamond;
        },
      });
      const r = n("./src/DiamondUtils.ts");
      Object.defineProperty(t, "DiamondUtils", {
        enumerable: !0,
        get: function () {
          return r.DiamondUtils;
        },
      });
      const i = n("./src/Sparkle.ts");
      Object.defineProperty(t, "Sparkle", {
        enumerable: !0,
        get: function () {
          return i.Sparkle;
        },
      });
      const a = n("./src/DiamondMaterial.ts");
      Object.defineProperty(t, "DiamondMaterial", {
        enumerable: !0,
        get: function () {
          return a.DiamondMaterial;
        },
      });
    },
    "./src/shaders/diamond.frag": function (e, t, n) {
      "use strict";
      n.r(t),
        (t.default =
          "varying vec2 vUv;\n    varying vec3 Normal;\n    varying vec3 worldNormal;\n    varying vec3 vecPos;\n    varying vec3 viewPos;\n    uniform samplerCube tCubeMapNormals;\n\n    #if ENV_MAP_TYPE == 0\n      uniform samplerCube envMap;\n    #elif ENV_MAP_TYPE == 1\n      uniform sampler2D envMap;\n    #endif\n    uniform samplerCube envRefractionMap;\n    uniform sampler2D sphereMap;\n    uniform float envMapIntensity;\n    uniform float tanAngleSqCone;\n    uniform float coneHeight;\n    uniform int maxBounces;\n    uniform mat4 modelMatrix;\n    uniform mat4 InverseModelMatrix;\n    uniform float refractiveIndex;\n    uniform float radius;\n    uniform bool bDebugBounces;\n    uniform float rIndexDelta;\n    uniform float normalOffset;\n    uniform float squashFactor;\n    uniform float distanceOffset;\n    uniform float geometryFactor;\n    uniform vec3 Absorbption;\n    uniform vec3 colorCorrection;\n    uniform vec3 boostFactors;\n    uniform vec3 centreOffset;\n    uniform float gammaFactor;\n    uniform float absorbptionFactor;\n\n    uniform float envMapRotation;\n    uniform float opacity;\n\n    #if USE_3DTEXTURE\n    precision highp sampler3D;\n\t\tuniform sampler3D lut3d;\n\t\t#else\n\t\tuniform sampler2D lut;\n\t\tuniform float lutSize;\n\n\t\tvec3 lutLookup( sampler2D tex, float size, vec3 rgb ) {\n\n\t\t\tfloat halfPixelWidth = 0.5 / size;\n\t\t\trgb.rg = clamp( rgb.rg, halfPixelWidth, 1.0 - halfPixelWidth );\n\n\t\t\tfloat gOffset = rgb.g / size;\n\t\t\tvec2 uv1 = vec2( rgb.r, gOffset );\n\t\t\tvec2 uv2 = vec2( rgb.r, gOffset );\n\n\t\t\tfloat bNormalized = size * rgb.b;\n\t\t\tfloat bSlice = min( floor( size * rgb.b ), size - 1.0 );\n\t\t\tfloat bMix = ( bNormalized - bSlice ) / size;\n\t\t\tfloat b1 = bSlice / size;\n\t\t\tfloat b2 = ( bSlice + 1.0 ) / size;\n\n\t\t\tuv1.y += b1;\n\t\t\tuv2.y += b2;\n\n\t\t\tvec3 sample1 = texture2D( tex, uv1 ).rgb;\n\t\t\tvec3 sample2 = texture2D( tex, uv2 ).rgb;\n\n\t\t\treturn mix( sample1, sample2, bMix );\n\t\t}\n\n\t\t#endif\n\n    vec3 BRDF_Specular_GGX_Environment( const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float roughness ) {\n      float dotNV = abs( dot( normal, viewDir ) );\n      const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n      const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n      vec4 r = roughness * c0 + c1;\n      float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n      vec2 AB = vec2( -1.04, 1.04 ) * a004 + r.zw;\n      return specularColor * AB.x + AB.y;\n    }\n\n    vec4 sampleEnvMap(vec3 direction) {\n        float cs = cos(envMapRotation);\n        float sn = sin(envMapRotation);\n\n        float temp = cs * direction.x + sn * direction.z;\n        direction.z = -sn * direction.x + cs * direction.z;\n        direction.x = temp;\n\n        #if ENV_MAP_TYPE == 0\n          return textureCube( envMap, direction );\n        #elif ENV_MAP_TYPE == 1\n          float theta = acos(direction.y);\n          float phi = atan(direction.x, direction.z);\n          return texture2D( envMap, vec2(phi/(2. * PI), theta/PI) );\n        #endif\n    }\n\n    vec4 SampleSpecularReflection(vec4 specularColor, vec3 direction ) {\n        // direction = normalize(direction);\n        direction.x *= -1.0;\n        direction.z *= -1.0;\n        vec3 tempDir = normalize(vec3(0., 0., 1.) + direction);\n        vec4 sampleColorRGB = envMapIntensity * envMapTexelToLinear( sampleEnvMap( direction ) );\n        //vec4 sampleColorRefraction = envMapIntensity * ( texture2D( sphereMap, tempDir.xy * 0.5 + 0.5 ) );\n        #if defined(TONE_MAPPING)\n          vec3 toneMappedColor = toneMapping(sampleColorRGB.rgb);\n        #else\n          vec3 toneMappedColor = sampleColorRGB.rgb;\n        #endif\n        return vec4(toneMappedColor, 1.0);\n     }\n\n    vec4 SampleSpecularContribution(vec4 specularColor, vec3 direction ) {\n        direction = normalize(direction);\n        direction.x *= -1.0;\n        direction.z *= -1.0;\n        vec4 sampleColorRGB = envMapIntensity * envMapTexelToLinear( sampleEnvMap( direction ) );\n        vec3 tempDir = normalize(vec3(0., 0., 1.) + direction);\n        float m = 2.8284271247461903 * sqrt( direction.z+1.0 );\n        //vec4 sampleColorRefraction = envMapIntensity * texture2D( sphereMap, clamp(direction.xy / m + 0.45, vec2(0.), vec2(1.)) );\n        #if defined(TONE_MAPPING)\n          vec3 toneMappedColor = toneMapping( sampleColorRGB.rgb );\n        #else\n          vec3 toneMappedColor = sampleColorRGB.rgb;\n        #endif\n        return vec4(toneMappedColor, 1.0);\n     }\n\n     vec3 intersectSphere(vec3 origin, vec3 direction) {\n         origin -= centreOffset;\n         direction.y /= squashFactor;\n         float A = dot(direction, direction);\n         float B = 2.0*dot(origin, direction);\n         float C = dot(origin, origin) - radius * radius;\n         float disc = B*B - 4.0 * A * C;\n         if(disc > 0.0)\n         {\n             disc = sqrt(disc);\n             float t1 = (-B + disc)*geometryFactor/A;\n             float t2 = (-B - disc)*geometryFactor/A;\n             float t = (t1 > t2) ? t1 : t2;\n             direction.y *= squashFactor;\n             return vec3(origin + centreOffset + direction * t);\n         }\n         return vec3(0.0);\n     }\n\n     vec3 debugBounces(int count) {\n         vec3 color = vec3(1.,1.,1.);\n         if(count == 1)\n             color = vec3(0.0,1.0,0.0);\n         else if(count == 2)\n             color = vec3(0.0,0.0,1.0);\n         else if(count == 3)\n             color = vec3(1.0,1.0,0.0);\n         else if(count == 4)\n             color = vec3(0.0,1.0,1.0);\n         else\n             color = vec3(0.0,1.0,0.0);\n         if(count ==0)\n             color = vec3(1.0,0.0,0.0);\n         return color;\n     }\n\n     vec3 traceRay(vec3 origin, vec3 direction, vec3 normal) {\n       vec3 outColor = vec3(0.0);\n\n       // Reflect/Refract ray entering the diamond\n\n       const float n1 = 1.0;\n       const float epsilon = 1e-4;\n       float f0 = (2.4- n1)/(2.4 + n1);\n       f0 *= f0;\n       vec3 attenuationFactor = vec3(1.0);\n       vec3 newDirection = refract(direction, normal, n1/refractiveIndex);\n       vec3 reflectedDirection = reflect(direction, normal);\n       vec3 brdfReflected = BRDF_Specular_GGX_Environment(reflectedDirection, normal, vec3(f0), 0.0);\n       vec3 brdfRefracted = BRDF_Specular_GGX_Environment(newDirection, -normal, vec3(f0), 0.0);\n       attenuationFactor *= ( vec3(1.0) - brdfRefracted);\n       outColor += SampleSpecularReflection(vec4(1.0), reflectedDirection ).rgb * brdfReflected;\n       int count = 0;\n       newDirection = (InverseModelMatrix * vec4(newDirection, 0.0)).xyz;\n       newDirection = normalize(newDirection);\n       origin = (InverseModelMatrix * vec4(origin, 1.0)).xyz;\n\n       // ray bounces \n\n       for( int i=0; i<RAY_BOUNCES; i++) { \n          vec3 intersectedPos;\n          intersectedPos = intersectSphere(origin + vec3(epsilon), newDirection);\n          vec3 dist = intersectedPos - origin;\n          vec3 d = normalize(intersectedPos - centreOffset);\n\n          vec3 mappedNormal = textureCube( tCubeMapNormals, d ).xyz;\n          mappedNormal = 2. * mappedNormal - 1.;\n          mappedNormal.y += normalOffset;\n          mappedNormal = normalize(mappedNormal);\n          //dist = (modelMatrix * vec4(dist, 1.)).xyz;\n          float r = length(dist)/radius * absorbptionFactor;\n          attenuationFactor *= exp(-r*Absorbption);\n\n           // refract the ray at first intersection \n\n           vec3 oldOrigin = origin;\n           origin = intersectedPos - normalize(intersectedPos - centreOffset) * distanceOffset;\n\n          vec3 oldDir = newDirection;\n          newDirection = refract(newDirection, mappedNormal, refractiveIndex/n1);\n          if( dot(newDirection, newDirection) == 0.0) { // Total Internal Reflection. Continue inside the diamond \n               newDirection = reflect(oldDir, mappedNormal);\n               if(i == RAY_BOUNCES-1 ) //If the ray got trapped even after max iterations, simply sample along the outgoing refraction! \n               {\n                  vec3 brdfReflected = BRDF_Specular_GGX_Environment(-oldDir, mappedNormal, vec3(f0), 0.0);\n                  vec3 d1 = (modelMatrix * vec4(oldDir, 0.0)).xyz;\n                  outColor += SampleSpecularContribution(vec4(1.0), d1 ).rgb * colorCorrection * attenuationFactor  * boostFactors * (vec3(1.0) - brdfReflected);\n                  //outColor = vec3(1.,0.,0.);\n                  //if(d1.y > 0.95) {\n                    //outColor += d1.y * vec3(1.,0.,0) * attenuationFactor * (vec3(1.0) - brdfReflected) * boostFactors;\n                  //}\n               }\n          } else { // Add the contribution from outgoing ray, and continue the reflected ray inside the diamond \n              vec3 brdfRefracted = BRDF_Specular_GGX_Environment(newDirection, -mappedNormal, vec3(f0), 0.0);\n              // outgoing(refracted) ray's contribution \n              vec3 d1 = (modelMatrix * vec4(newDirection, 0.0)).xyz;\n              vec3 colorG = SampleSpecularContribution(vec4(1.0), d1 ).rgb * ( vec3(1.0) - brdfRefracted);\n              vec3 dir1 = refract(oldDir, mappedNormal, (refractiveIndex+rIndexDelta)/n1);\n              vec3 dir2 = refract(oldDir, mappedNormal, (refractiveIndex-rIndexDelta)/n1);\n              vec3 d2 = (modelMatrix * vec4(dir1, 0.0)).xyz;\n              vec3 d3 = (modelMatrix * vec4(dir2, 0.0)).xyz;\n              vec3 colorR = SampleSpecularContribution(vec4(1.0), d2 ).rgb * ( vec3(1.0) - brdfRefracted);\n              vec3 colorB = SampleSpecularContribution(vec4(1.0), d3 ).rgb * ( vec3(1.0) - brdfRefracted);\n              outColor += vec3(colorR.r, colorG.g, colorB.b) * colorCorrection * attenuationFactor * boostFactors;\n              //outColor = oldDir;\n              //new reflected ray inside the diamond \n\n              newDirection = reflect(oldDir, mappedNormal);\n              vec3 brdfReflected = BRDF_Specular_GGX_Environment(newDirection, mappedNormal, vec3(f0), 0.0);\n              attenuationFactor *= brdfReflected * boostFactors;\n              count++;\n          }\n       }\n         if(false)\n            outColor = debugBounces(count);\n         return outColor;\n     }\n\n      void main() {\n          vec3 normalizedNormal = normalize(worldNormal);\n          vec3 viewVector = normalize(vecPos - cameraPosition);\n          vec3 color = traceRay(vecPos, viewVector, normalizedNormal);\n          gl_FragColor = vec4(color.rgb,1.);\n          #include <tonemapping_fragment>\n          gl_FragColor = GammaToLinear(gl_FragColor, gammaFactor);\n\n          #if USE_LUT\n            vec4 lutVal;\n      \t\t\t#if USE_3DTEXTURE\n      \t\t\t   lutVal = vec4( texture( lut3d, gl_FragColor.rgb ).rgb, gl_FragColor.a );\n      \t\t\t#else\n      \t\t\t   lutVal = vec4( lutLookup( lut, lutSize, gl_FragColor.rgb ), gl_FragColor.a );\n      \t\t\t#endif\n            gl_FragColor = lutVal;\n          #endif\n\n          #include <encodings_fragment>\n          gl_FragColor.a = opacity;\n          //gl_FragColor = textureCube(tCubeMapNormals, normalize(Normal));\n      }");
    },
    "./src/shaders/diamond.vert": function (e, t, n) {
      "use strict";
      n.r(t),
        (t.default =
          "varying vec2 vUv;\nvarying vec3 Normal;\nvarying vec3 worldNormal;\nvarying vec3 vecPos;\nvarying vec3 viewPos;\n\nvoid main() {\n    vUv = uv;\n    Normal =  normal;\n    worldNormal = (modelMatrix * vec4(normal,0.0)).xyz;\n    vecPos = (modelMatrix * vec4(position, 1.0 )).xyz;\n    viewPos = (modelViewMatrix * vec4(position, 1.0 )).xyz;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}");
    },
    "./src/shaders/normalcapture.frag": function (e, t, n) {
      "use strict";
      n.r(t),
        (t.default =
          "varying vec3 vNormal;\n\nvoid main() {\n    vec3 color = normalize(vNormal);\n    color = color * 0.5 + 0.5;\n    gl_FragColor = vec4( color.x, color.y, color.z, 1.0 );\n}\n");
    },
    "./src/shaders/normalcapture.vert": function (e, t, n) {
      "use strict";
      n.r(t),
        (t.default =
          "varying vec3 vNormal;\n\nvoid main() {\n    vNormal = normal;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}");
    },
    0: function (e, t, n) {
      e.exports = n("./src/index.ts");
    },
    three: function (t, n) {
      t.exports = e;
    },
  });
});
/* eslint-enable */
