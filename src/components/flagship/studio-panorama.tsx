"use client";

import { useEffect, useRef, useState } from "react";
import { Move, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";

/** A navigable conceptual 360-degree panorama; the image is not a measured site scan. */
export function StudioPanorama({ source }: { source: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const controlRef = useRef<{ rotate: (degrees: number) => void; zoom: (change: number) => void; reset: () => void } | null>(null);
  const [loadState, setLoadState] = useState<"loading" | "ready" | "failed">("loading");
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let disposed = false;
    let cleanup = () => {};
    setLoadState("loading");
    import("three").then((THREE) => {
      if (disposed || !container.isConnected) return;
      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      } catch {
        setLoadState("failed");
        return;
      }
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(73, 1, .1, 200);
      camera.position.set(0, 0, .01);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.domElement.className = "ks-panorama-canvas";
      renderer.domElement.setAttribute("aria-hidden", "true");
      container.appendChild(renderer.domElement);
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const geometry = new THREE.SphereGeometry(60, 64, 40);
      geometry.scale(-1, 1, 1);
      const sphere = new THREE.Mesh(geometry, material);
      scene.add(sphere);
      let yaw = -25;
      let pitch = 0;
      let frameId = 0;
      function render() {
        const radians = Math.PI / 180;
        const phi = (90 - pitch) * radians;
        const theta = yaw * radians;
        camera.lookAt(60 * Math.sin(phi) * Math.cos(theta), 60 * Math.cos(phi), 60 * Math.sin(phi) * Math.sin(theta));
        renderer.render(scene, camera);
      }
      function resize() {
        const { width, height } = container!.getBoundingClientRect();
        if (!width || !height) return;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        render();
      }
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);
      let dragging = false;
      let x = 0, y = 0;
      function pointerDown(event: PointerEvent) {
        if (event.button !== 0) return;
        dragging = true;
        x = event.clientX; y = event.clientY;
        renderer.domElement.setPointerCapture(event.pointerId);
      }
      function pointerMove(event: PointerEvent) {
        if (!dragging) return;
        const scale = .14 * (camera.fov / 70);
        yaw -= (event.clientX - x) * scale;
        pitch = Math.max(-82, Math.min(82, pitch + (event.clientY - y) * scale));
        x = event.clientX; y = event.clientY;
        render();
      }
      function pointerUp() { dragging = false; }
      function wheel(event: WheelEvent) {
        event.preventDefault();
        camera.fov = Math.max(35, Math.min(90, camera.fov + Math.sign(event.deltaY) * 4));
        camera.updateProjectionMatrix();
        render();
      }
      const canvas = renderer.domElement;
      canvas.addEventListener("pointerdown", pointerDown);
      canvas.addEventListener("pointermove", pointerMove);
      canvas.addEventListener("pointerup", pointerUp);
      canvas.addEventListener("pointercancel", pointerUp);
      canvas.addEventListener("wheel", wheel, { passive: false });
      controlRef.current = {
        rotate(degrees) { yaw += degrees; render(); },
        zoom(change) { camera.fov = Math.max(35, Math.min(90, camera.fov + change)); camera.updateProjectionMatrix(); render(); },
        reset() { yaw = -25; pitch = 0; camera.fov = 73; camera.updateProjectionMatrix(); render(); },
      };
      new THREE.TextureLoader().load(source, (texture) => {
        if (disposed) { texture.dispose(); return; }
        texture.colorSpace = THREE.SRGBColorSpace;
        material.map = texture;
        material.needsUpdate = true;
        resize();
        setLoadState("ready");
      }, undefined, () => { if (!disposed) setLoadState("failed"); });
      cleanup = () => {
        resizeObserver.disconnect();
        canvas.removeEventListener("pointerdown", pointerDown);
        canvas.removeEventListener("pointermove", pointerMove);
        canvas.removeEventListener("pointerup", pointerUp);
        canvas.removeEventListener("pointercancel", pointerUp);
        canvas.removeEventListener("wheel", wheel);
        cancelAnimationFrame(frameId);
        material.map?.dispose();
        material.dispose();
        geometry.dispose();
        renderer.dispose();
        canvas.remove();
        controlRef.current = null;
      };
    }).catch(() => { if (!disposed) setLoadState("failed"); });
    return () => { disposed = true; cleanup(); };
  }, [source]);
  return <div className="ks-panorama" role="group" aria-label="Concept campus 360 degree view. Drag or swipe to look around. Use the controls to rotate and zoom.">
    <img className="ks-panorama-fallback" src={source} alt="" aria-hidden="true" />
    <div ref={containerRef} className="ks-panorama-stage"/>
    {loadState === "loading" && <span className="ks-panorama-message">PREPARING INTERACTIVE VIEW…</span>}
    {loadState === "failed" && <span className="ks-panorama-message">360° panorama is unavailable on this device. The main studio scene remains available.</span>}
    {loadState === "ready" && <div className="ks-panorama-controls" aria-label="Panorama controls">
      <span><Move size={14}/> DRAG OR SWIPE TO LOOK AROUND</span>
      <button aria-label="Rotate panorama left" onClick={() => controlRef.current?.rotate(-20)}>←</button>
      <button aria-label="Rotate panorama right" onClick={() => controlRef.current?.rotate(20)}>→</button>
      <button aria-label="Zoom into panorama" onClick={() => controlRef.current?.zoom(-7)}><ZoomIn size={16}/></button>
      <button aria-label="Zoom out of panorama" onClick={() => controlRef.current?.zoom(7)}><ZoomOut size={16}/></button>
      <button aria-label="Reset panorama view" onClick={() => controlRef.current?.reset()}><RotateCcw size={15}/></button>
    </div>}
  </div>;
}
