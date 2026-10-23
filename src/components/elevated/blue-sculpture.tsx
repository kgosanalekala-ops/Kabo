"use client";

import { useEffect, useRef, useState } from "react";
import type * as Three from "three";

type Props = { paused?: boolean; className?: string };

/** Original, decorative glass sculpture. The live scene loads after the HTML. */
export default function BlueSculpture({
  paused = false,
  className = "",
}: Props) {
  const host = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);
  const wake = useRef<() => void>(() => {});
  const [ready, setReady] = useState(false);
  useEffect(() => {
    pausedRef.current = paused;
    wake.current();
  }, [paused]);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let disposed = false;
    let destroy: (() => void) | undefined;

    async function createScene() {
      const THREE = await import("three");
      const { RoomEnvironment } = await import(
        "three/examples/jsm/environments/RoomEnvironment.js"
      );
      if (disposed || !element) return;
      let renderer: Three.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "low-power",
        });
      } catch {
        return;
      }
      renderer.setClearColor(0xeaf0f5, 0);
      renderer.setPixelRatio(
        Math.min(
          window.devicePixelRatio || 1,
          window.innerWidth < 700 ? 1.3 : 1.6,
        ),
      );
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.02;
      renderer.domElement.style.cssText =
        "position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none";
      renderer.domElement.setAttribute("aria-hidden", "true");
      element.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const environment = new RoomEnvironment();
      const generator = new THREE.PMREMGenerator(renderer);
      const environmentMap = generator.fromScene(environment, 0.03);
      scene.environment = environmentMap.texture;
      scene.environmentIntensity = 1.05;
      environment.dispose();
      generator.dispose();
      const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 35);
      const sculpture = new THREE.Group();
      sculpture.rotation.set(0.14, -0.45, -0.17);
      scene.add(sculpture);
      const geometries: Three.BufferGeometry[] = [];
      const materials: Three.Material[] = [];
      const textures: Three.Texture[] = [];
      const geometry = <T extends Three.BufferGeometry>(value: T): T => {
        geometries.push(value);
        return value;
      };
      const material = <T extends Three.Material>(value: T): T => {
        materials.push(value);
        return value;
      };

      const clearGlass = material(
        new THREE.MeshPhysicalMaterial({
          color: 0x1374d4,
          metalness: 0.12,
          roughness: 0.065,
          transmission: 0.76,
          thickness: 0.6,
          ior: 1.46,
          attenuationColor: new THREE.Color(0x1459c7),
          attenuationDistance: 1.9,
          clearcoat: 1,
          clearcoatRoughness: 0.045,
          side: THREE.DoubleSide,
          iridescence: 0.13,
          iridescenceIOR: 1.25,
          iridescenceThicknessRange: [180, 380],
          envMapIntensity: 1.45,
        }),
      );
      const cobaltGlass = material(
        new THREE.MeshPhysicalMaterial({
          color: 0x034ad4,
          metalness: 0.26,
          roughness: 0.09,
          transmission: 0.3,
          thickness: 1.05,
          ior: 1.48,
          attenuationColor: new THREE.Color(0x0637af),
          attenuationDistance: 2.1,
          clearcoat: 1,
          clearcoatRoughness: 0.06,
          side: THREE.DoubleSide,
          iridescence: 0.28,
          iridescenceIOR: 1.32,
          iridescenceThicknessRange: [150, 450],
          envMapIntensity: 1.1,
        }),
      );
      const edge = material(
        new THREE.MeshPhysicalMaterial({
          color: 0xb5d7ee,
          metalness: 0.92,
          roughness: 0.12,
          clearcoat: 1,
          envMapIntensity: 1.15,
        }),
      );
      const coreMaterial = material(
        new THREE.MeshPhysicalMaterial({
          color: 0x043ac9,
          metalness: 0.38,
          roughness: 0.13,
          transmission: 0.1,
          thickness: 1.5,
          ior: 1.42,
          clearcoat: 1,
          clearcoatRoughness: 0.05,
          iridescence: 0.72,
          iridescenceIOR: 1.35,
          iridescenceThicknessRange: [210, 510],
          envMapIntensity: 0.9,
        }),
      );

      // Closed, thick spherical ribbons: both faces and their cut edges are
      // actual geometry, so the strips refract, occlude and cast highlights.
      function shell(
        radius: number,
        thetaStart: number,
        thetaSize: number,
        phiStart: number,
        phiSize: number,
        bodyMaterial: Three.Material,
      ) {
        const uCount = 100,
          vCount = 18,
          thickness = 0.055;
        const points: number[] = [],
          indices: number[] = [];
        const stride = vCount + 1,
          surfaceSize = (uCount + 1) * stride;
        const point = (r: number, theta: number, phi: number) =>
          new THREE.Vector3(
            r * Math.sin(theta) * Math.cos(phi),
            r * Math.cos(theta),
            r * Math.sin(theta) * Math.sin(phi),
          );
        for (let surface = 0; surface < 2; surface++)
          for (let u = 0; u <= uCount; u++)
            for (let v = 0; v <= vCount; v++) {
              const phi = phiStart + (u / uCount) * phiSize;
              const taper = Math.sin((Math.PI * u) / uCount) * 0.035;
              const theta = thetaStart + (v / vCount) * (thetaSize + taper);
              const p = point(radius - surface * thickness, theta, phi);
              points.push(p.x, p.y, p.z);
            }
        for (let u = 0; u < uCount; u++)
          for (let v = 0; v < vCount; v++) {
            const a = u * stride + v,
              b = a + stride,
              c = b + 1,
              d = a + 1;
            indices.push(a, b, c, a, c, d);
            indices.push(
              a + surfaceSize,
              c + surfaceSize,
              b + surfaceSize,
              a + surfaceSize,
              d + surfaceSize,
              c + surfaceSize,
            );
          }
        const edgeStart = indices.length;
        const join = (a: number, b: number) =>
          indices.push(
            a,
            a + surfaceSize,
            b + surfaceSize,
            a,
            b + surfaceSize,
            b,
          );
        for (let u = 0; u < uCount; u++) {
          join(u * stride, (u + 1) * stride);
          join((u + 1) * stride + vCount, u * stride + vCount);
        }
        for (let v = 0; v < vCount; v++) {
          join(v + 1, v);
          join(uCount * stride + v, uCount * stride + v + 1);
        }
        const geo = geometry(new THREE.BufferGeometry());
        geo.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(points, 3),
        );
        geo.setIndex(indices);
        geo.computeVertexNormals();
        geo.addGroup(0, edgeStart, 0);
        geo.addGroup(edgeStart, indices.length - edgeStart, 1);
        const group = new THREE.Group();
        group.add(new THREE.Mesh(geo, [bodyMaterial, edge]));
        // A very fine polished bevel follows the long cut edges, rather than
        // approximating the sculpture with tubes or flattened circles.
        for (const v of [0, 1]) {
          const curvePoints = Array.from({ length: 101 }, (_, u) => {
            const taper = Math.sin((Math.PI * u) / 100) * 0.035;
            return point(
              radius - 0.006,
              thetaStart + v * (thetaSize + taper),
              phiStart + (u / 100) * phiSize,
            );
          });
          const bevel = new THREE.Mesh(
            geometry(
              new THREE.TubeGeometry(
                new THREE.CatmullRomCurve3(curvePoints),
                100,
                0.009,
                6,
                false,
              ),
            ),
            edge,
          );
          group.add(bevel);
        }
        return group;
      }

      const bowl = shell(1.46, 1.52, 1.08, 0, Math.PI * 2, cobaltGlass);
      bowl.rotation.set(0.17, 0, -0.13);
      bowl.position.set(0.04, -0.1, 0);
      sculpture.add(bowl);
      const core = new THREE.Mesh(
        geometry(new THREE.SphereGeometry(1.16, 72, 48)),
        coreMaterial,
      );
      core.scale.set(1, 0.93, 1);
      core.position.y = -0.05;
      sculpture.add(core);
      const layers = [
        {
          mesh: shell(1.63, 1.07, 0.58, -0.3, Math.PI * 1.78, clearGlass),
          x: -0.33,
          y: 0.2,
          z: -0.34,
          direction: 1,
        },
        {
          mesh: shell(1.73, 1.2, 0.31, 0.25, Math.PI * 1.8, clearGlass),
          x: 1.03,
          y: -0.36,
          z: 0.62,
          direction: -1,
        },
        {
          mesh: shell(1.81, 1.26, 0.23, 1.08, Math.PI * 1.66, clearGlass),
          x: -0.68,
          y: 0.15,
          z: -0.89,
          direction: 1,
        },
      ];
      for (const layer of layers) {
        layer.mesh.rotation.set(layer.x, layer.y, layer.z);
        sculpture.add(layer.mesh);
      }

      scene.add(new THREE.HemisphereLight(0xffffff, 0x7e9abe, 1.25));
      const key = new THREE.DirectionalLight(0xe8f5ff, 3.1);
      key.position.set(-4, 6, 5);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0xffffff, 2.3);
      rim.position.set(5, 3, -4);
      scene.add(rim);
      const blue = new THREE.PointLight(0x3c8aff, 7, 9, 2);
      blue.position.set(-2.5, -1, 2);
      scene.add(blue);

      const shadowCanvas = document.createElement("canvas");
      shadowCanvas.width = shadowCanvas.height = 128;
      const shadowContext = shadowCanvas.getContext("2d");
      if (shadowContext) {
        const fade = shadowContext.createRadialGradient(64, 64, 1, 64, 64, 64);
        fade.addColorStop(0, "rgba(16,64,132,.25)");
        fade.addColorStop(0.35, "rgba(27,74,132,.13)");
        fade.addColorStop(1, "rgba(40,89,144,0)");
        shadowContext.fillStyle = fade;
        shadowContext.fillRect(0, 0, 128, 128);
        const texture = new THREE.CanvasTexture(shadowCanvas);
        textures.push(texture);
        const shadow = new THREE.Mesh(
          geometry(new THREE.PlaneGeometry(5.3, 4.2)),
          material(
            new THREE.MeshBasicMaterial({
              map: texture,
              transparent: true,
              depthWrite: false,
            }),
          ),
        );
        shadow.rotation.x = -Math.PI / 2;
        shadow.position.y = -1.95;
        scene.add(shadow);
      }

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
      let frame = 0,
        visible = true,
        elapsed = 0,
        previousTime = performance.now();
      let pointerX = 0,
        pointerY = 0,
        targetX = 0,
        targetY = 0,
        spread = 0,
        targetSpread = 0;
      const resize = () => {
        const width = Math.max(1, element.clientWidth),
          height = Math.max(1, element.clientHeight);
        camera.aspect = width / height;
        const fit = Math.max(1, 0.98 / camera.aspect);
        camera.position.set(3.5 * fit, 2.3 * fit, 6.8 * fit);
        camera.lookAt(0, -0.04, 0);
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
        draw();
      };
      const draw = () => {
        if (disposed) return;
        const now = performance.now();
        const moving = !reduced.matches && !pausedRef.current;
        if (moving) {
          elapsed += Math.min((now - previousTime) / 1000, 0.05);
          pointerX += (targetX - pointerX) * 0.045;
          pointerY += (targetY - pointerY) * 0.045;
          spread += (targetSpread - spread) * 0.035;
        }
        previousTime = now;
        sculpture.rotation.y = -0.45 + elapsed * 0.085 + pointerX * 0.16;
        sculpture.rotation.x = 0.14 + pointerY * 0.12;
        sculpture.position.y = Math.sin(elapsed * 0.46) * 0.045;
        for (let i = 0; i < layers.length; i++) {
          const layer = layers[i];
          layer.mesh.rotation.x =
            layer.x + Math.sin(elapsed * 0.22 + i * 1.8) * 0.1;
          layer.mesh.rotation.y = layer.y + elapsed * 0.025 * layer.direction;
          layer.mesh.position.y = spread * (i - 0.7) * 0.17;
          layer.mesh.position.x = spread * Math.sin(i * 2.1) * 0.13;
        }
        core.rotation.y = elapsed * -0.04;
        renderer.render(scene, camera);
      };
      const tick = () => {
        frame = 0;
        if (disposed || !visible || document.hidden) return;
        draw();
        if (!reduced.matches && !pausedRef.current)
          frame = requestAnimationFrame(tick);
      };
      const start = () => {
        previousTime = performance.now();
        if (!frame && visible && !document.hidden && !disposed)
          frame = requestAnimationFrame(tick);
      };
      const stop = () => {
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
      };
      wake.current = () => {
        stop();
        start();
      };
      const onPointer = (event: PointerEvent) => {
        if (
          event.pointerType !== "mouse" ||
          reduced.matches ||
          pausedRef.current
        )
          return;
        const bounds = element.getBoundingClientRect();
        targetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
        targetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
      };
      const onLeave = () => {
        targetX = targetY = 0;
      };
      const onScroll = () => {
        if (reduced.matches || pausedRef.current) return;
        const bounds = element.getBoundingClientRect();
        targetSpread = Math.min(
          1,
          Math.max(0, -bounds.top / window.innerHeight),
        );
      };
      const onVisibility = () => {
        if (document.hidden) stop();
        else start();
      };
      const onMotion = () => {
        stop();
        targetX = targetY = targetSpread = 0;
        if (reduced.matches) {
          pointerX = pointerY = spread = 0;
        }
        start();
      };
      const onLost = (event: Event) => {
        event.preventDefault();
        stop();
        setReady(false);
      };
      const onRestored = () => {
        resize();
        setReady(true);
        start();
      };
      const observer = new ResizeObserver(resize);
      observer.observe(element);
      const visibility = new IntersectionObserver(
        (entries) => {
          visible = entries[0].isIntersecting;
          if (visible) start();
          else stop();
        },
        { rootMargin: "120px" },
      );
      visibility.observe(element);
      document.addEventListener("visibilitychange", onVisibility);
      window.addEventListener("scroll", onScroll, { passive: true });
      element.addEventListener("pointermove", onPointer, { passive: true });
      element.addEventListener("pointerleave", onLeave);
      reduced.addEventListener("change", onMotion);
      renderer.domElement.addEventListener("webglcontextlost", onLost);
      renderer.domElement.addEventListener("webglcontextrestored", onRestored);
      resize();
      setReady(true);
      start();
      destroy = () => {
        stop();
        observer.disconnect();
        visibility.disconnect();
        wake.current = () => {};
        document.removeEventListener("visibilitychange", onVisibility);
        window.removeEventListener("scroll", onScroll);
        element.removeEventListener("pointermove", onPointer);
        element.removeEventListener("pointerleave", onLeave);
        reduced.removeEventListener("change", onMotion);
        renderer.domElement.removeEventListener("webglcontextlost", onLost);
        renderer.domElement.removeEventListener(
          "webglcontextrestored",
          onRestored,
        );
        geometries.forEach((value) => value.dispose());
        materials.forEach((value) => value.dispose());
        textures.forEach((value) => value.dispose());
        environmentMap.dispose();
        renderer.renderLists.dispose();
        renderer.dispose();
        renderer.forceContextLoss();
        renderer.domElement.remove();
      };
    }

    createScene().catch(() => {
      if (!disposed) setReady(false);
    });
    return () => {
      disposed = true;
      destroy?.();
    };
  }, []);

  return (
    <div
      className={className}
      aria-hidden="true"
      data-blue-sculpture
      data-renderer={ready ? "webgl" : "fallback"}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: 220,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          opacity: ready ? 0 : 1,
          transition: "opacity .5s",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "64%",
            height: "13%",
            bottom: "13%",
            borderRadius: "50%",
            background: "#4575b14a",
            filter: "blur(23px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "58%",
            aspectRatio: "1",
            borderRadius: "50%",
            transform: "rotate(-24deg)",
            background:
              "radial-gradient(ellipse at 28% 21%,#ddf4ff 0%,#76b1f1 14%,#146dd5 37%,#1538b2 65%,#071d74 93%)",
            boxShadow:
              "inset 13px 9px 24px #ffffff80,inset -15px -9px 31px #082f7d70,0 15px 25px #1560ae22",
          }}
        />
        {[
          [-26, 63, 77],
          [39, 68, 83],
          [105, 58, 80],
        ].map(([angle, tilt, width], i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: `${width}%`,
              aspectRatio: "1",
              borderRadius: "50%",
              border: `${i === 0 ? 13 : 8}px solid #9cc8f4b5`,
              borderLeftColor: "#125baac9",
              borderBottomColor: "#477fc1cf",
              boxShadow: "inset 2px 2px 3px #ffffffb0,2px 1px 3px #e7f8ffb0",
              transform: `perspective(800px) rotateZ(${angle}deg) rotateX(${tilt}deg)`,
            }}
          />
        ))}
      </div>
      <div
        ref={host}
        style={{
          position: "absolute",
          inset: 0,
          opacity: ready ? 1 : 0,
          transition: "opacity .5s",
        }}
      />
    </div>
  );
}
