"use client";

import { useEffect, useId, useRef, useState } from "react";
import type * as Three from "three";

type Props = { slide: number; className?: string };

const CHAPTERS = [
  ["01", "Intelligent infrastructure", "COMPUTE / STORAGE / POSSIBILITY"],
  ["02", "A more connected world", "NETWORKS / PEOPLE / PLACE"],
  ["03", "Clarity in every connection", "VISIBILITY / SECURITY / RESILIENCE"],
];

/** An original scene, not a product replica or a photograph of a KABO installation. */
function SceneFallback({ slide }: { slide: number }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 900 680" width="100%" height="100%" aria-hidden="true" style={{ position: "absolute", inset: 0 }}>
      <defs>
        <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#4577a8" /><stop offset=".35" stopColor="#101e39" /><stop offset=".72" stopColor="#183853" /><stop offset="1" stopColor="#40b5ee" /></linearGradient>
        <linearGradient id={`${id}-screen`} x1="0" y1="0" x2=".8" y2="1"><stop stopColor="#061329" /><stop offset="1" stopColor="#06182e" /></linearGradient>
        <linearGradient id={`${id}-beam`}><stop stopColor="#006197" stopOpacity="0" /><stop offset=".47" stopColor="#77e9ff" /><stop offset="1" stopColor="#007bff" stopOpacity=".1" /></linearGradient>
        <radialGradient id={`${id}-ground`}><stop stopColor="#037bbb" stopOpacity=".42" /><stop offset="1" stopColor="#001426" stopOpacity="0" /></radialGradient>
        <filter id={`${id}-glow`} x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="8" /></filter>
      </defs>
      <ellipse cx="500" cy="495" rx="370" ry="130" fill={`url(#${id}-ground)`} />
      <g stroke="#136b9f" strokeWidth="1" opacity=".35"><path d="M-80 480 580 220M-20 550 660 270M70 620 790 310M210 680 940 370M0 360 600 680M120 300 850 650M260 260 960 560" /></g>
      <path d="m130 449 409-133 281 144-411 151z" fill="#0a2544" fillOpacity=".55" stroke="#3889b9" />
      <path d="m130 449 279 145 411-134v29L409 627 130 478z" fill="#0c2c4c" fillOpacity=".68" stroke="#56c8f7" strokeOpacity=".6" />
      <path d="m175 412 359-110 239 122-360 118z" fill="#14426a" fillOpacity=".3" stroke="#9ceaff" strokeOpacity=".68" />
      <path d="M175 427 413 552l360-115" stroke="#38cdff" strokeWidth="5" fill="none" filter={`url(#${id}-glow)`} />
      <path d="M175 427 413 552l360-115" stroke="#87e9ff" strokeWidth="1.7" fill="none" />
      <path d="m239 410 328-98 174 102-326 106z" fill={`url(#${id}-metal)`} stroke="#70c7f5" strokeWidth="1.2" />
      <path d="m243 411 172 103 325-101v8L415 529 243 420z" fill="#182b42" stroke="#4aa7df" />
      <path d="m288 391 265-77 116 67-263 83z" fill="#061426" stroke="#356189" />
      {Array.from({ length: 5 }, (_, row) => Array.from({ length: 13 }, (_, col) => <path key={`${row}-${col}`} d={`m${307 + col * 18 + row * 12} ${386 - col * 5.3 + row * 8.5} 13-3.8 8 4.5-13 4z`} fill="#1c3b5a" stroke="#6c9cbd" strokeWidth=".35" />))}
      <path d="m397 457 88-27 41 24-88 28z" fill="#294966" stroke="#6aaed2" strokeWidth=".6" />
      <path d="m284 381-15-254q-1-10 10-11l349-23q10-1 11 10l28 255z" fill={`url(#${id}-metal)`} stroke="#5c8baa" strokeWidth="2" />
      <path d="m297 366-13-235 342-23 26 237z" fill={`url(#${id}-screen)`} />
      <g fill="none" stroke={`url(#${id}-beam)`}>
        <path d="M288 279c133-155 174 115 361-81M291 290c137-162 164 104 357-101" strokeWidth="14" opacity=".28" filter={`url(#${id}-glow)`} />
        {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M290 ${277 + i * 3}c132 ${-140 + i * 6} 176 ${100 - i * 4} 359 ${-82 - i * 6}`} strokeWidth={i === 4 ? 2 : .7} opacity={i === 4 ? 1 : .5} />)}
      </g>
      <text x="309" y="155" fill="#e3f5ff" fontFamily="Arial,sans-serif" fontSize="11" letterSpacing="3">KABO</text>
      <text x="467" y="192" fill="#c8edff" fontFamily="Arial,sans-serif" fontSize="8" textAnchor="middle" letterSpacing="2">{CHAPTERS[slide]?.[2]}</text>
      <text x="466" y="217" fill="#f0f8ff" fontFamily="Arial,sans-serif" fontSize="17" textAnchor="middle">{CHAPTERS[slide]?.[1]}</text>
      <text x="315" y="345" fill="#7acbff" fontFamily="Arial,sans-serif" fontSize="31">{CHAPTERS[slide]?.[0]}</text>
    </svg>
  );
}

export default function CinematicScene({ slide, className = "" }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const chapter = useRef(slide);
  const [ready, setReady] = useState(false);
  useEffect(() => { chapter.current = slide; }, [slide]);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    async function mount() {
      const THREE = await import("three");
      const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");
      if (cancelled || !element) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
      let renderer: Three.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power", preserveDrawingBuffer: false });
      } catch { return; }

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 700 ? 1.35 : 1.7));
      renderer.setClearColor(0x020915, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
      renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none;";
      renderer.domElement.setAttribute("aria-hidden", "true");
      element.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x030c1d, .045);
      const environment = new RoomEnvironment();
      const environmentGenerator = new THREE.PMREMGenerator(renderer);
      const environmentMap = environmentGenerator.fromScene(environment, .065);
      scene.environment = environmentMap.texture;
      scene.environmentIntensity = .7;
      environment.dispose();
      environmentGenerator.dispose();
      const camera = new THREE.PerspectiveCamera(35, 1, .1, 90);
      const world = new THREE.Group();
      scene.add(world);
      const textures: Three.Texture[] = [];
      const geometries: Three.BufferGeometry[] = [];
      const materials: Three.Material[] = [];
      const keepGeometry = <T extends Three.BufferGeometry>(g: T): T => { geometries.push(g); return g; };
      const keepMaterial = <T extends Three.Material>(m: T): T => { materials.push(m); return m; };

      const metal = keepMaterial(new THREE.MeshStandardMaterial({ color: 0x203b5a, metalness: .88, roughness: .24 }));
      const darkMetal = keepMaterial(new THREE.MeshStandardMaterial({ color: 0x081326, metalness: .72, roughness: .28 }));
      const keyboardMaterial = keepMaterial(new THREE.MeshStandardMaterial({ color: 0x07101c, metalness: .48, roughness: .42 }));
      const keyMaterial = keepMaterial(new THREE.MeshStandardMaterial({ color: 0x142941, metalness: .5, roughness: .3, emissive: 0x092d51, emissiveIntensity: .45 }));
      const edgeMaterial = keepMaterial(new THREE.LineBasicMaterial({ color: 0x68caff, transparent: true, opacity: .65 }));
      const lightMaterial = keepMaterial(new THREE.MeshBasicMaterial({ color: 0x70deff, toneMapped: false }));
      const blueLightMaterial = keepMaterial(new THREE.MeshBasicMaterial({ color: 0x168fff, toneMapped: false }));
      const glass = keepMaterial(new THREE.MeshPhysicalMaterial({ color: 0x256999, metalness: .16, roughness: .12, transmission: .35, transparent: true, opacity: .43, thickness: .45, ior: 1.45, clearcoat: 1, depthWrite: false }));

      const box = (parent: Three.Object3D, width: number, height: number, depth: number, x: number, y: number, z: number, mat: Three.Material) => {
        const geometry = keepGeometry(new THREE.BoxGeometry(width, height, depth));
        const mesh = new THREE.Mesh(geometry, mat); mesh.position.set(x, y, z); parent.add(mesh); return mesh;
      };
      const outline = (mesh: Three.Mesh, mat = edgeMaterial) => {
        const lines = new THREE.LineSegments(keepGeometry(new THREE.EdgesGeometry(mesh.geometry)), mat); mesh.add(lines); return lines;
      };
      const roundedSlab = (parent: Three.Object3D, w: number, d: number, h: number, radius: number, mat: Three.Material) => {
        const shape = new THREE.Shape(); const x = -w / 2, y = -d / 2;
        shape.moveTo(x + radius, y); shape.lineTo(x + w - radius, y); shape.quadraticCurveTo(x + w, y, x + w, y + radius);
        shape.lineTo(x + w, y + d - radius); shape.quadraticCurveTo(x + w, y + d, x + w - radius, y + d);
        shape.lineTo(x + radius, y + d); shape.quadraticCurveTo(x, y + d, x, y + d - radius);
        shape.lineTo(x, y + radius); shape.quadraticCurveTo(x, y, x + radius, y);
        const geo = keepGeometry(new THREE.ExtrudeGeometry(shape, { depth: h, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: .026, bevelThickness: .022, curveSegments: 5 }));
        const mesh = new THREE.Mesh(geo, mat); mesh.rotation.x = -Math.PI / 2; parent.add(mesh); return mesh;
      };

      scene.add(new THREE.HemisphereLight(0xa7cfff, 0x031027, 2.8));
      const key = new THREE.DirectionalLight(0xd5edff, 4.2); key.position.set(-4, 7, 6); scene.add(key);
      const rim = new THREE.DirectionalLight(0x007eff, 7); rim.position.set(4, 3, -5); scene.add(rim);
      const side = new THREE.PointLight(0x24baff, 32, 18, 1.7); side.position.set(-4, 2, 2); scene.add(side);
      const underLight = new THREE.PointLight(0x008bff, 25, 13, 1.7); underLight.position.set(2, .7, -1); scene.add(underLight);

      // A tiered glass architectural base. The light strips are actual geometry.
      const stage = new THREE.Group(); world.add(stage);
      const lower = box(stage, 7.65, .15, 5.35, 0, .11, 0, glass); outline(lower);
      const upper = box(stage, 6.8, .14, 4.55, 0, .62, 0, glass); outline(upper);
      const middle = box(stage, 6.8, .045, 4.55, 0, .54, 0, darkMetal); outline(middle);
      for (const x of [-3.15, 3.15]) for (const z of [-1.98, 1.98]) {
        box(stage, .075, .44, .075, x, .35, z, glass);
        box(stage, .025, .37, .025, x, .36, z, blueLightMaterial);
      }
      box(stage, 6.7, .026, .028, 0, .57, 2.245, lightMaterial);
      box(stage, .028, .026, 4.4, -3.345, .57, 0, blueLightMaterial);
      box(stage, 7.45, .018, .022, 0, .13, 2.65, blueLightMaterial);

      // The one substantial subject: a fully spatial laptop, including chassis,
      // individual keycaps, hinge, ports and an illuminated live screen.
      const laptop = new THREE.Group(); laptop.position.set(0, .77, -.12); laptop.rotation.y = -.16; world.add(laptop);
      roundedSlab(laptop, 5.4, 3.38, .1, .13, metal);
      const bottom = roundedSlab(laptop, 5.31, 3.3, .035, .14, darkMetal); bottom.position.y = -.047;
      box(laptop, 4.73, .018, 1.56, 0, .14, -.49, keyboardMaterial);
      const keyGeometry = keepGeometry(new THREE.BoxGeometry(.272, .025, .187));
      const keys = new THREE.InstancedMesh(keyGeometry, keyMaterial, 70);
      const dummy = new THREE.Object3D(); let index = 0;
      for (let row = 0; row < 5; row++) for (let col = 0; col < 14; col++) {
        dummy.position.set(-2.12 + col * .326, .163, -1.07 + row * .254); dummy.updateMatrix(); keys.setMatrixAt(index++, dummy.matrix);
      }
      laptop.add(keys);
      box(laptop, 1.88, .014, .17, 0, .164, .215, keyMaterial);
      const trackpad = box(laptop, 1.72, .009, .76, 0, .141, .93, metal);
      const trackpadEdges = keepMaterial(new THREE.LineBasicMaterial({ color: 0x73b4dc, transparent: true, opacity: .45 })); outline(trackpad, trackpadEdges);
      for (const x of [-2.42, 2.42]) {
        box(laptop, .05, .065, .27, x * 1.11, .028, -.82, keyboardMaterial);
        box(laptop, .05, .055, .15, x * 1.11, .028, -.35, keyboardMaterial);
        for (let n = 0; n < 14; n++) box(laptop, .055, .008, .035, x, .142, -.95 + n * .105, keyboardMaterial);
      }
      const hinge = new THREE.Mesh(keepGeometry(new THREE.CylinderGeometry(.07, .07, 4.75, 12)), metal); hinge.rotation.z = Math.PI / 2; hinge.position.set(0, .15, -1.46); laptop.add(hinge);
      box(laptop, .065, .011, .035, 2.25, .164, -.92, lightMaterial);

      const lid = new THREE.Group(); lid.position.set(0, .155, -1.46); lid.rotation.x = -.17; laptop.add(lid);
      const panel = box(lid, 5.35, 3.28, .095, 0, 1.66, 0, metal);
      const bezel = box(lid, 5.2, 3.13, .034, 0, 1.66, .06, darkMetal);
      const topRim = keepMaterial(new THREE.LineBasicMaterial({ color: 0x75a8d1, transparent: true, opacity: .47 })); outline(panel, topRim);
      void bezel;
      const screenGeometry = keepGeometry(new THREE.PlaneGeometry(4.98, 2.85));
      const screenMaterial = keepMaterial(new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 }, uChapter: { value: 0 } },
        vertexShader: "varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",
        fragmentShader: `
          precision highp float;
          varying vec2 vUv;
          uniform float uTime;
          uniform float uChapter;
          float glow(float d,float power){return power/(abs(d)+power);}
          float segment(vec2 p,vec2 a,vec2 b){vec2 pa=p-a;vec2 ba=b-a;float h=clamp(dot(pa,ba)/dot(ba,ba),0.,1.);return length(pa-ba*h);}
          void main(){
            vec2 uv=vUv; vec2 p=(uv-.5)*vec2(1.7,1.0);
            float t=uTime*.23;
            vec3 col=vec3(.005,.015,.038);
            float haze=exp(-length((p-vec2(.2,-.12))*vec2(1.,1.8))*3.0);
            col+=vec3(.008,.06,.13)*haze;
            vec3 weights=exp(-vec3(pow(uChapter,2.),pow(uChapter-1.,2.),pow(uChapter-2.,2.))*5.);
            weights/=max(.001,weights.x+weights.y+weights.z);
            for(int i=0;i<18;i++){
              float fi=float(i);float spread=(fi-8.5)*.008;
              float wave=sin(p.x*3.7+t+fi*.025)*.20;
              wave+=sin(p.x*1.8-t*.7)*.075;
              float curve=wave+spread;
              float d=p.y-curve;
              float taper=pow(max(0.,1.-abs(p.x)*.75),2.);
              float line=glow(d,.0014)*taper;
              float bloom=glow(d,.014)*.052;
              vec3 tint=mix(vec3(.012,.16,.52),vec3(.13,.86,1.),fi/18.);
              col+=tint*(line*.78+bloom)*(.18+.82*weights.x);
            }
            vec2 hub=vec2(.1,-.08);
            for(int j=0;j<7;j++){
              float angle=float(j)*.8975979+t*.15;
              vec2 node=hub+vec2(cos(angle)*.29,sin(angle)*.20);
              float nodeRing=glow(abs(length(p-node)-.015),.0014);
              float link=glow(segment(p,hub,node),.0011)*.7;
              col+=vec3(.08,.56,.88)*(nodeRing+link)*weights.y;
            }
            col+=vec3(.14,.74,1.)*glow(abs(length(p-hub)-.032),.002)*weights.y;
            vec2 scan=(p-vec2(.1,-.08))*vec2(1.,1.5);
            float radius=length(scan);
            for(int j=0;j<4;j++){
              float ring=glow(abs(radius-(.12+float(j)*.048)),.0013);
              col+=vec3(.03,.43,.83)*ring*weights.z*.75;
            }
            float scanAngle=atan(scan.y,scan.x);
            float sweep=pow(max(0.,cos(scanAngle-t*1.4)),22.);
            col+=vec3(.035,.55,.9)*sweep*exp(-abs(radius-.2)*14.)*weights.z*.45;
            float center=exp(-length(p-vec2(sin(t)*.18,0.))*8.);
            col+=vec3(.02,.21,.27)*center;
            float gridX=step(.988,fract((p.x+.85)*16.));
            float gridY=step(.988,fract((p.y+.5)*15.));
            col+=vec3(.02,.08,.13)*(gridX+gridY)*.12;
            float chapterGlow=sin(uChapter*1.7+uv.x*3.)*.5+.5;
            col+=vec3(.001,.009,.022)*chapterGlow;
            float vignette=1.-smoothstep(.28,.87,length(p*vec2(.7,1.)));
            col*=.7+.3*vignette;
            gl_FragColor=vec4(col,1.);
          }`,
        toneMapped: false,
      }));
      const display = new THREE.Mesh(screenGeometry, screenMaterial); display.position.set(0, 1.67, .086); lid.add(display);

      const uiCanvas = document.createElement("canvas"); uiCanvas.width = 1536; uiCanvas.height = 880;
      const ui = uiCanvas.getContext("2d");
      const uiTexture = new THREE.CanvasTexture(uiCanvas); uiTexture.colorSpace = THREE.SRGBColorSpace; textures.push(uiTexture);
      uiTexture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
      const uiMaterial = keepMaterial(new THREE.MeshBasicMaterial({ map: uiTexture, transparent: true, depthWrite: false, toneMapped: false }));
      const uiPlane = new THREE.Mesh(screenGeometry, uiMaterial); uiPlane.position.copy(display.position); uiPlane.position.z += .007; lid.add(uiPlane);
      const logoImage = new Image();
      let logoLoaded = false;
      let drawnChapter = -1;
      const drawUI = (selected: number) => {
        if (!ui) return;
        const current = CHAPTERS[selected] || CHAPTERS[0];
        ui.clearRect(0, 0, 1536, 880);
        if (logoLoaded) ui.drawImage(logoImage, 70, 35, 185, 59);
        else { ui.fillStyle = "#e5f4ff"; ui.font = "600 31px Arial,sans-serif"; ui.fillText("KABO", 70, 81); }
        ui.fillStyle = "#91a8c4"; ui.font = "17px Arial,sans-serif"; ui.fillText("Solutions", 890, 78); ui.fillText("Our approach", 1020, 78); ui.fillText("Explore", 1260, 78);
        ui.strokeStyle = "#254969"; ui.lineWidth = 1; ui.beginPath(); ui.moveTo(70, 111); ui.lineTo(1466, 111); ui.stroke();
        ui.textAlign = "center"; ui.fillStyle = "#70cfff"; ui.font = "18px Arial,sans-serif"; ui.fillText(current[2], 768, 239);
        ui.fillStyle = "#f2f7ff"; ui.font = "500 60px Arial,sans-serif"; ui.fillText(current[1], 768, 318);
        ui.fillStyle = "#afc6dd"; ui.font = "22px Arial,sans-serif"; ui.fillText("Engineered thinking. Connected systems.", 768, 364);
        ui.textAlign = "left"; ui.fillStyle = "#e1f0ff"; ui.font = "300 93px Arial,sans-serif"; ui.fillText(current[0], 79, 759);
        ui.fillStyle = "#9fb4cb"; ui.font = "15px Arial,sans-serif"; ui.fillText("SYSTEMS / ENGINEERED", 236, 733);
        ui.fillStyle = "#67c9ff"; ui.fillRect(237, 752, 143, 2);
        ui.textAlign = "right"; ui.font = "17px Arial,sans-serif"; ui.fillStyle = "#cceaff"; ui.fillText("SOUTH AFRICA", 1450, 753); ui.textAlign = "left";
        uiTexture.needsUpdate = true;
      };
      logoImage.onload = () => { if (!cancelled) { logoLoaded = true; drawUI(chapter.current); } };
      logoImage.src = "/logos/kabo-logo-white.png";

      // Quiet architectural surroundings give the platform context and scale.
      const floorMaterial = keepMaterial(new THREE.MeshStandardMaterial({ color: 0x061428, metalness: .75, roughness: .26 }));
      const floorEdges = keepMaterial(new THREE.LineBasicMaterial({ color: 0x10507d, transparent: true, opacity: .31 }));
      for (let x = -3; x <= 3; x++) for (let z = -3; z <= 2; z++) {
        const floor = box(world, 2.08, .11, 1.84, x * 2.14, -.24, z * 1.9, floorMaterial); outline(floor, floorEdges);
      }
      for (const [x, z] of [[-4.5, -2.5], [4.4, -3.4], [4.8, 2.6]]) {
        const disc = new THREE.Mesh(keepGeometry(new THREE.CylinderGeometry(.68, .76, .09, 48)), metal); disc.position.set(x, -.09, z); world.add(disc);
        const top = new THREE.Mesh(keepGeometry(new THREE.CylinderGeometry(.49, .49, .22, 48)), darkMetal); top.position.set(x, .04, z); world.add(top);
        const ring = new THREE.Mesh(keepGeometry(new THREE.TorusGeometry(.6, .014, 5, 64)), blueLightMaterial); ring.rotation.x = Math.PI / 2; ring.position.set(x, -.025, z); world.add(ring);
      }
      for (const [x, z, length] of [[-4.9, 0, 3.2], [4.75, -.6, 3.3], [1.5, -4.4, 4.4]]) box(world, .025, .025, length, x, -.13, z, lightMaterial);

      const glowCanvas = document.createElement("canvas"); glowCanvas.width = glowCanvas.height = 128;
      const glowContext = glowCanvas.getContext("2d");
      if (glowContext) {
        const gradient = glowContext.createRadialGradient(64, 64, 0, 64, 64, 64); gradient.addColorStop(0, "rgba(22,146,255,.4)"); gradient.addColorStop(.28, "rgba(0,99,255,.17)"); gradient.addColorStop(1, "rgba(0,44,120,0)"); glowContext.fillStyle = gradient; glowContext.fillRect(0, 0, 128, 128);
        const glowTexture = new THREE.CanvasTexture(glowCanvas); textures.push(glowTexture);
        const glow = new THREE.Mesh(keepGeometry(new THREE.PlaneGeometry(13, 9)), keepMaterial(new THREE.MeshBasicMaterial({ map: glowTexture, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false })));
        glow.rotation.x = -Math.PI / 2; glow.position.y = -.11; world.add(glow);
      }
      const moteVertices: number[] = [];
      for (let i = 0; i < 80; i++) {
        const fraction = i * .61803398875;
        moteVertices.push(Math.sin(fraction * 7.1) * 8, 1 + ((i * 17) % 53) / 9, -3 - ((i * 13) % 47) / 6);
      }
      const moteGeometry = keepGeometry(new THREE.BufferGeometry()); moteGeometry.setAttribute("position", new THREE.Float32BufferAttribute(moteVertices, 3));
      const motes = new THREE.Points(moteGeometry, keepMaterial(new THREE.PointsMaterial({ color: 0x50baff, size: .018, transparent: true, opacity: .5, depthWrite: false, blending: THREE.AdditiveBlending }))); scene.add(motes);

      let width = 1, height = 1, frame = 0, intersecting = true, hasRendered = false, cameraZoom = 1.12;
      let targetX = 0, targetY = 0, pointerX = 0, pointerY = 0;
      const started = performance.now();
      const resize = () => {
        const rect = element.getBoundingClientRect(); width = Math.max(1, rect.width); height = Math.max(1, rect.height);
        renderer.setSize(width, height, false); camera.aspect = width / height;
        const narrow = camera.aspect < 1.08; camera.fov = narrow ? 37 : 34;
        cameraZoom = 1.12 * Math.max(1, .92 / camera.aspect);
        camera.position.set(6.5 * cameraZoom, 4.4 * cameraZoom, 8.4 * cameraZoom); camera.lookAt(0, 1.2, -.05); camera.updateProjectionMatrix();
        if (reduced.matches || !frame) render();
      };
      const render = () => {
        if (cancelled) return;
        const t = reduced.matches ? 1.5 : (performance.now() - started) * .001;
        pointerX += (targetX - pointerX) * .035; pointerY += (targetY - pointerY) * .035;
        laptop.rotation.y = -.16 + (reduced.matches ? 0 : Math.sin(t * .18) * .035 + pointerX * .055);
        world.rotation.y = reduced.matches ? 0 : pointerX * .018;
        world.position.y = reduced.matches ? 0 : Math.sin(t * .5) * .009;
        camera.position.y += ((4.4 + pointerY * .13) * cameraZoom - camera.position.y) * .025;
        camera.lookAt(0, 1.2, -.05);
        screenMaterial.uniforms.uTime.value = t;
        screenMaterial.uniforms.uChapter.value = reduced.matches ? chapter.current : screenMaterial.uniforms.uChapter.value + (chapter.current - screenMaterial.uniforms.uChapter.value) * .04;
        if (drawnChapter !== chapter.current) { drawUI(chapter.current); drawnChapter = chapter.current; }
        renderer.render(scene, camera);
        if (!hasRendered) { hasRendered = true; if (!cancelled) setReady(true); }
      };
      const tick = () => {
        frame = 0;
        if (cancelled || !intersecting || document.hidden) return;
        render();
        if (!reduced.matches) frame = requestAnimationFrame(tick);
      };
      const resume = () => { if (!frame && intersecting && !document.hidden && !cancelled) frame = requestAnimationFrame(tick); };
      const observer = new ResizeObserver(resize); observer.observe(element);
      const visibility = new IntersectionObserver(entries => { intersecting = entries[0].isIntersecting; if (intersecting) resume(); else if (frame) { cancelAnimationFrame(frame); frame = 0; } }, { rootMargin: "100px" }); visibility.observe(element);
      const onVisibility = () => { if (document.hidden && frame) { cancelAnimationFrame(frame); frame = 0; } else resume(); };
      const onPointer = (event: PointerEvent) => { if (event.pointerType !== "mouse" || reduced.matches) return; const bounds = element.getBoundingClientRect(); targetX = ((event.clientX - bounds.left) / bounds.width - .5) * 2; targetY = ((event.clientY - bounds.top) / bounds.height - .5) * 2; resume(); };
      const onLeave = () => { targetX = targetY = 0; };
      const onMotion = () => { if (frame) { cancelAnimationFrame(frame); frame = 0; } render(); resume(); };
      const onLost = (event: Event) => { event.preventDefault(); if (frame) cancelAnimationFrame(frame); frame = 0; setReady(false); };
      const onRestored = () => { hasRendered = false; resume(); };
      element.addEventListener("pointermove", onPointer, { passive: true }); element.addEventListener("pointerleave", onLeave);
      document.addEventListener("visibilitychange", onVisibility); reduced.addEventListener("change", onMotion);
      renderer.domElement.addEventListener("webglcontextlost", onLost); renderer.domElement.addEventListener("webglcontextrestored", onRestored);
      resize(); resume();
      // Chapter changes also update a reduced-motion scene, without recreating WebGL.
      const chapterTimer = window.setInterval(() => { if (reduced.matches && drawnChapter !== chapter.current && intersecting && !document.hidden) render(); }, 250);

      cleanup = () => {
        window.clearInterval(chapterTimer); cancelAnimationFrame(frame); observer.disconnect(); visibility.disconnect();
        logoImage.onload = null;
        element.removeEventListener("pointermove", onPointer); element.removeEventListener("pointerleave", onLeave);
        document.removeEventListener("visibilitychange", onVisibility); reduced.removeEventListener("change", onMotion);
        renderer.domElement.removeEventListener("webglcontextlost", onLost); renderer.domElement.removeEventListener("webglcontextrestored", onRestored);
        textures.forEach(texture => texture.dispose()); geometries.forEach(geometry => geometry.dispose()); materials.forEach(material => material.dispose());
        environmentMap.dispose(); renderer.renderLists.dispose(); renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove();
      };
    }

    mount().catch(() => { if (!cancelled) setReady(false); });
    return () => { cancelled = true; cleanup?.(); };
  }, []);

  return (
    <div className={className} data-cinematic-scene data-renderer={ready ? "webgl" : "fallback"} role="img" aria-label="An original dimensional laptop on an illuminated glass platform, showing the connected compute, network and security chapters." style={{ position: "relative", width: "100%", height: "100%", minHeight: 210, overflow: "hidden", pointerEvents: "auto" }}>
      <div style={{ position: "absolute", inset: 0, opacity: ready ? 0 : 1, transition: "opacity .6s", pointerEvents: "none" }}><SceneFallback slide={slide} /></div>
      <div ref={host} style={{ position: "absolute", inset: 0, opacity: ready ? 1 : 0, transition: "opacity .6s" }} />
    </div>
  );
}
