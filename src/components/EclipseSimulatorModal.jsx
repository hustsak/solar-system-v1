import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Sun,
  Moon,
  Globe2,
  Eye,
  Info,
  Layers,
  Sparkles,
  AlertTriangle,
  Compass,
  Sliders
} from 'lucide-react';

export default function EclipseSimulatorModal({
  isOpen,
  onClose,
  lang = 'en',
  t
}) {
  const [eclipseType, setEclipseType] = useState('solar'); // 'solar' | 'lunar'
  const [moonAngle, setMoonAngle] = useState(0); // in degrees: 0 = directly between Sun and Earth (Solar Eclipse)
  const [isPlaying, setIsPlaying] = useState(false);
  const [showShadowCones, setShowShadowCones] = useState(true);
  const [cameraPreset, setCameraPreset] = useState('3d'); // '3d' | 'top' | 'side'

  const mountRef = useRef(null);
  const skyCanvasRef = useRef(null);
  const animFrameIdRef = useRef(null);

  // Three.js object references
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const moonGroupRef = useRef(null);
  const moonMeshRef = useRef(null);
  const umbraConeRef = useRef(null);
  const penumbraConeRef = useRef(null);
  const earthShadowSpotRef = useRef(null);

  const tLab = t.eclipseLab;

  // Set preset alignment
  const setPreset = useCallback((type, angleDeg) => {
    setEclipseType(type);
    setMoonAngle(angleDeg);
    setIsPlaying(false);
  }, []);

  // Update Three.js scene objects based on angle & eclipseType
  const updateSceneState = useCallback((angleDeg, type, showCones) => {
    const rad = THREE.MathUtils.degToRad(angleDeg);
    const moonOrbitRadius = 14;

    // Earth position is fixed at (0, 0, 0)
    // Sun position is fixed at (-48, 0, 0)
    // Moon orbits around Earth in X-Z plane with subtle 5° inclination
    const moonX = Math.cos(rad) * moonOrbitRadius;
    const moonZ = Math.sin(rad) * moonOrbitRadius;
    const moonY = Math.sin(rad) * (moonOrbitRadius * Math.sin(THREE.MathUtils.degToRad(5)));

    if (moonGroupRef.current) {
      moonGroupRef.current.position.set(moonX, moonY, moonZ);
    }

    // Dynamic Moon coloration: In Lunar Eclipse (near 180°), Moon enters Earth's shadow and turns Blood Red!
    if (moonMeshRef.current) {
      if (type === 'lunar') {
        const diffFrom180 = Math.abs(180 - angleDeg);
        if (diffFrom180 < 8) {
          // Inside Umbra: Deep Copper/Blood Red!
          const bloodIntensity = 1 - diffFrom180 / 8;
          moonMeshRef.current.material.color.setHex(0xb91c1c);
          moonMeshRef.current.material.emissive.setHex(0x991b1b);
          moonMeshRef.current.material.emissiveIntensity = 0.5 * bloodIntensity;
        } else if (diffFrom180 < 18) {
          // Inside Penumbra: Partially dimming
          moonMeshRef.current.material.color.setHex(0x78716c);
          moonMeshRef.current.material.emissive.setHex(0x292524);
          moonMeshRef.current.material.emissiveIntensity = 0.1;
        } else {
          // Normal Moon
          moonMeshRef.current.material.color.setHex(0xd1d5db);
          moonMeshRef.current.material.emissive.setHex(0x444444);
          moonMeshRef.current.material.emissiveIntensity = 0.15;
        }
      } else {
        // Solar Eclipse mode: Moon is illuminated from Sun side
        moonMeshRef.current.material.color.setHex(0xd1d5db);
        moonMeshRef.current.material.emissive.setHex(0x222222);
        moonMeshRef.current.material.emissiveIntensity = 0.05;
      }
    }

    // Shadow Cones visibility and orientation
    if (umbraConeRef.current && penumbraConeRef.current) {
      umbraConeRef.current.visible = showCones;
      penumbraConeRef.current.visible = showCones;

      if (type === 'solar') {
        // Moon casts shadow towards Earth (from moonX, moonY, moonZ towards positive X)
        umbraConeRef.current.position.set(moonX + 7, moonY, moonZ);
        umbraConeRef.current.rotation.z = -Math.PI / 2;
        penumbraConeRef.current.position.set(moonX + 9, moonY, moonZ);
        penumbraConeRef.current.rotation.z = -Math.PI / 2;

        // Shadow spot on Earth surface
        if (earthShadowSpotRef.current) {
          const isShadowOnEarth = Math.abs(angleDeg) < 14 || Math.abs(angleDeg - 360) < 14;
          earthShadowSpotRef.current.visible = isShadowOnEarth;
          earthShadowSpotRef.current.position.set(-3.7, moonY * 0.3, moonZ * 0.3);
        }
      } else {
        // Earth casts shadow towards Moon (from Earth towards positive X)
        umbraConeRef.current.position.set(16, 0, 0);
        umbraConeRef.current.rotation.z = -Math.PI / 2;
        penumbraConeRef.current.position.set(22, 0, 0);
        penumbraConeRef.current.rotation.z = -Math.PI / 2;

        if (earthShadowSpotRef.current) {
          earthShadowSpotRef.current.visible = false;
        }
      }
    }
  }, []);

  // Real-time 2D Canvas render: "What an Observer on Earth Sees Looking Up"
  const renderSkyView = useCallback((angleDeg, type) => {
    const canvas = skyCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;

    ctx.clearRect(0, 0, w, h);

    if (type === 'solar') {
      // Background Sky: Darkness increases during totality
      const diffFromZero = Math.min(Math.abs(angleDeg), Math.abs(angleDeg - 360));
      const totalityFactor = Math.max(0, 1 - diffFromZero / 15);

      // Deep sky gradient
      const skyGrad = ctx.createRadialGradient(cx, cy, 30, cx, cy, w / 2);
      if (totalityFactor > 0.85) {
        skyGrad.addColorStop(0, '#020617');
        skyGrad.addColorStop(1, '#000000');
      } else {
        skyGrad.addColorStop(0, '#0284c7');
        skyGrad.addColorStop(1, '#075985');
      }
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // Stars become visible during total solar eclipse
      if (totalityFactor > 0.8) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        for (let i = 0; i < 35; i++) {
          const sx = (Math.sin(i * 99) * 0.5 + 0.5) * w;
          const sy = (Math.cos(i * 33) * 0.5 + 0.5) * h;
          ctx.beginPath();
          ctx.arc(sx, sy, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Sun disk
      const sunRadius = 42;

      // Solar Corona Flare (Visible during totality)
      if (totalityFactor > 0.75) {
        const coronaGrad = ctx.createRadialGradient(cx, cy, sunRadius - 5, cx, cy, sunRadius + 50);
        coronaGrad.addColorStop(0, 'rgba(255, 245, 180, 0.95)');
        coronaGrad.addColorStop(0.3, 'rgba(251, 191, 36, 0.6)');
        coronaGrad.addColorStop(0.7, 'rgba(249, 115, 22, 0.2)');
        coronaGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = coronaGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, sunRadius + 50, 0, Math.PI * 2);
        ctx.fill();
      }

      // Bright Sun Body
      const sunGrad = ctx.createRadialGradient(cx - 10, cy - 10, 5, cx, cy, sunRadius);
      sunGrad.addColorStop(0, '#fffbeb');
      sunGrad.addColorStop(0.5, '#fbbf24');
      sunGrad.addColorStop(1, '#f59e0b');
      ctx.fillStyle = sunGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, sunRadius, 0, Math.PI * 2);
      ctx.fill();

      // Moon Silhouette moving across Sun
      // At angle = 0, Moon is at center (cx, cy)
      const moonOffset = ((angleDeg > 180 ? angleDeg - 360 : angleDeg) / 16) * (sunRadius * 2.2);
      const moonX = cx + moonOffset;
      const moonY = cy + Math.sin(THREE.MathUtils.degToRad(angleDeg)) * 8;
      const moonRadius = 42; // Apparent size similar to Sun (The cosmic coincidence!)

      ctx.fillStyle = '#020617';
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
      ctx.fill();

      // Subtle edge rim if totality
      if (totalityFactor > 0.95) {
        ctx.strokeStyle = '#fef08a';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    } else {
      // Lunar Eclipse: Observer looks at Full Moon at night
      ctx.fillStyle = '#020206';
      ctx.fillRect(0, 0, w, h);

      // Night Stars
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      for (let i = 0; i < 40; i++) {
        const sx = (Math.sin(i * 123) * 0.5 + 0.5) * w;
        const sy = (Math.cos(i * 45) * 0.5 + 0.5) * h;
        ctx.beginPath();
        ctx.arc(sx, sy, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      const moonRadius = 48;
      const diffFrom180 = Math.abs(180 - angleDeg);

      // Moon base
      const moonGrad = ctx.createRadialGradient(cx - 10, cy - 10, 5, cx, cy, moonRadius);
      if (diffFrom180 < 8) {
        // Blood Moon: Vivid glowing copper-red
        moonGrad.addColorStop(0, '#f87171');
        moonGrad.addColorStop(0.4, '#dc2626');
        moonGrad.addColorStop(0.8, '#991b1b');
        moonGrad.addColorStop(1, '#450a0a');
      } else {
        // Silver Full Moon
        moonGrad.addColorStop(0, '#f8fafc');
        moonGrad.addColorStop(0.6, '#cbd5e1');
        moonGrad.addColorStop(1, '#64748b');
      }

      ctx.fillStyle = moonGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, moonRadius, 0, Math.PI * 2);
      ctx.fill();

      // Earth's shadow sweep across the Moon
      if (diffFrom180 >= 8 && diffFrom180 < 22) {
        const shadowOffset = ((180 - angleDeg) / 14) * (moonRadius * 2.2);
        const shadowX = cx + shadowOffset;
        const earthShadowRadius = moonRadius * 2.4;

        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, moonRadius, 0, Math.PI * 2);
        ctx.clip();

        // Earth shadow circle
        ctx.fillStyle = 'rgba(2, 6, 23, 0.88)';
        ctx.beginPath();
        ctx.arc(shadowX, cy, earthShadowRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
  }, []);

  // Animation Loop for Orbit
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setMoonAngle(prev => {
        const next = (prev + 0.5) % 360;
        return Number(next.toFixed(1));
      });
    }, 30);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Sync state to 3D scene & 2D sky view
  useEffect(() => {
    updateSceneState(moonAngle, eclipseType, showShadowCones);
    renderSkyView(moonAngle, eclipseType);
  }, [moonAngle, eclipseType, showShadowCones, updateSceneState, renderSkyView]);

  // Main Three.js Scene Setup
  useEffect(() => {
    if (!isOpen) return;

    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(-15, 25, 45);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x02040c, 1);
    rendererRef.current = renderer;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 15;
    controls.maxDistance = 120;
    controls.target.set(-8, 0, 0); // centered between Earth & Sun
    controlsRef.current = controls;

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0x222238, 0.4);
    scene.add(ambientLight);

    // Sun Point Light located at Sun center (-48, 0, 0)
    const sunLight = new THREE.PointLight(0xffffff, 3.2, 500);
    sunLight.position.set(-48, 0, 0);
    scene.add(sunLight);

    // Directional light from Sun towards Earth
    const dirLight = new THREE.DirectionalLight(0xfff5ea, 2.5);
    dirLight.position.set(-48, 0, 0);
    dirLight.target.position.set(0, 0, 0);
    scene.add(dirLight);
    scene.add(dirLight.target);

    // 3. Background Starfield
    const starCount = 1200;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 180 + Math.random() * 100;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2.0 * Math.random() - 1.0);
      starPos[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPos[i * 3 + 2] = r * Math.cos(phi);
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ size: 1.2, color: 0xffffff, transparent: true, opacity: 0.75 });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 4. THE SUN (At X = -48)
    const sunGeo = new THREE.SphereGeometry(7.5, 32, 32);
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunMesh.position.set(-48, 0, 0);
    scene.add(sunMesh);

    // Sun Corona Flare Billboard
    const flareCanvas = document.createElement('canvas');
    flareCanvas.width = 256;
    flareCanvas.height = 256;
    const fCtx = flareCanvas.getContext('2d');
    const fGrad = fCtx.createRadialGradient(128, 128, 0, 128, 128, 128);
    fGrad.addColorStop(0, 'rgba(255, 240, 150, 1.0)');
    fGrad.addColorStop(0.35, 'rgba(255, 170, 0, 0.7)');
    fGrad.addColorStop(0.7, 'rgba(249, 115, 22, 0.2)');
    fGrad.addColorStop(1, 'rgba(0,0,0,0)');
    fCtx.fillStyle = fGrad;
    fCtx.fillRect(0, 0, 256, 256);

    const flareTexture = new THREE.CanvasTexture(flareCanvas);
    const flareMat = new THREE.SpriteMaterial({ map: flareTexture, transparent: true, blending: THREE.AdditiveBlending });
    const flareSprite = new THREE.Sprite(flareMat);
    flareSprite.scale.set(38, 38, 1);
    sunMesh.add(flareSprite);

    // 5. THE EARTH (At X = 0, Center of orbit)
    const earthGeo = new THREE.SphereGeometry(3.6, 32, 32);
    const earthMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.5,
      metalness: 0.1
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthMesh.position.set(0, 0, 0);
    scene.add(earthMesh);

    // Earth's day/night shadow terminator helper
    const earthAtmosphereGeo = new THREE.SphereGeometry(3.8, 32, 32);
    const earthAtmosphereMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide
    });
    const earthAtmosphere = new THREE.Mesh(earthAtmosphereGeo, earthAtmosphereMat);
    earthMesh.add(earthAtmosphere);

    // Shadow spot projected onto Earth (during solar eclipse)
    const spotGeo = new THREE.CircleGeometry(0.55, 32);
    const spotMat = new THREE.MeshBasicMaterial({ color: 0x020617, side: THREE.DoubleSide });
    const earthShadowSpot = new THREE.Mesh(spotGeo, spotMat);
    earthShadowSpot.rotation.y = Math.PI / 2;
    earthShadowSpot.position.set(-3.7, 0, 0);
    scene.add(earthShadowSpot);
    earthShadowSpotRef.current = earthShadowSpot;

    // 6. THE MOON (Orbiting Earth)
    const moonGroup = new THREE.Group();
    scene.add(moonGroup);
    moonGroupRef.current = moonGroup;

    const moonGeo = new THREE.SphereGeometry(1.0, 32, 32);
    const moonMat = new THREE.MeshStandardMaterial({
      color: 0xd1d5db,
      roughness: 0.6,
      metalness: 0.1,
      emissive: 0x222222,
      emissiveIntensity: 0.1
    });
    const moonMesh = new THREE.Mesh(moonGeo, moonMat);
    moonGroup.add(moonMesh);
    moonMeshRef.current = moonMesh;

    // Moon Orbit Guide Ring
    const orbitRingGeo = new THREE.BufferGeometry();
    const ringPoints = [];
    const rDist = 14;
    for (let i = 0; i <= 128; i++) {
      const theta = (i / 128) * Math.PI * 2;
      const x = Math.cos(theta) * rDist;
      const z = Math.sin(theta) * rDist;
      const y = Math.sin(theta) * (rDist * Math.sin(THREE.MathUtils.degToRad(5)));
      ringPoints.push(new THREE.Vector3(x, y, z));
    }
    orbitRingGeo.setFromPoints(ringPoints);
    const orbitRingMat = new THREE.LineBasicMaterial({ color: 0x7c8cff, transparent: true, opacity: 0.35 });
    const orbitRing = new THREE.Line(orbitRingGeo, orbitRingMat);
    scene.add(orbitRing);

    // 7. VOLUMETRIC SHADOW CONES (Umbra & Penumbra)
    // Umbra (dark inner shadow cone)
    const umbraGeo = new THREE.ConeGeometry(2.4, 20, 32, 1, true);
    const umbraMat = new THREE.MeshBasicMaterial({
      color: 0x1e1b4b,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide
    });
    const umbraCone = new THREE.Mesh(umbraGeo, umbraMat);
    scene.add(umbraCone);
    umbraConeRef.current = umbraCone;

    // Penumbra (lighter outer shadow cone)
    const penumbraGeo = new THREE.ConeGeometry(4.8, 28, 32, 1, true);
    const penumbraMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide
    });
    const penumbraCone = new THREE.Mesh(penumbraGeo, penumbraMat);
    scene.add(penumbraCone);
    penumbraConeRef.current = penumbraCone;

    // 8. Animation Loop
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      // Rotate Earth on axis
      earthMesh.rotation.y += 0.005;

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth || 800;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      renderer.dispose();
      starGeo.dispose();
      sunGeo.dispose();
      earthGeo.dispose();
      moonGeo.dispose();
      umbraGeo.dispose();
      penumbraGeo.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isOpen]);

  // Camera preset handler
  const setCamView = (mode) => {
    if (!cameraRef.current || !controlsRef.current) return;
    setCameraPreset(mode);
    if (mode === '3d') {
      cameraRef.current.position.set(-15, 25, 45);
      controlsRef.current.target.set(-8, 0, 0);
    } else if (mode === 'top') {
      cameraRef.current.position.set(-10, 60, 0);
      controlsRef.current.target.set(-10, 0, 0);
    } else if (mode === 'side') {
      cameraRef.current.position.set(-10, 0, 50);
      controlsRef.current.target.set(-10, 0, 0);
    }
    controlsRef.current.update();
  };

  if (!isOpen) return null;

  const currentInfo = eclipseType === 'solar' ? tLab.solar : tLab.lunar;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-6xl h-[94vh] bg-[#050818] border border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500/20 via-sky-500/20 to-indigo-500/20 border border-amber-400/30 text-amber-300">
              <Sun className="w-5 h-5 animate-spin" style={{ animationDuration: '30s' }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300">
                  {tLab.badge}
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">
                  Interactive Astronomy Exhibit
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                {tLab.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mode Switcher Buttons */}
            <div className="flex items-center p-1 rounded-xl bg-white/5 border border-white/10">
              <button
                onClick={() => setPreset('solar', 0)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  eclipseType === 'solar'
                    ? 'bg-amber-500/25 border border-amber-400/80 text-amber-200 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>{tLab.solarTab}</span>
              </button>

              <button
                onClick={() => setPreset('lunar', 180)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  eclipseType === 'lunar'
                    ? 'bg-rose-500/25 border border-rose-400/80 text-rose-200 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>{tLab.lunarTab}</span>
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Body: 3D Viewport on Left, Interactive Controls & Explanation on Right */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* LEFT: 3D Celestial Simulation Viewport */}
          <div className="flex-1 relative bg-[#02040c] overflow-hidden flex flex-col min-h-[320px]">
            {/* Three.js canvas container */}
            <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

            {/* Camera View Angle Selector Overlay */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-[#080d22]/80 backdrop-blur-md p-1 rounded-xl border border-white/10">
              <span className="text-[11px] text-slate-400 px-2 font-medium">Camera:</span>
              {[
                { id: '3d', label: '3D Orbit' },
                { id: 'top', label: 'Top-Down' },
                { id: 'side', label: 'Side Plane' }
              ].map(cam => (
                <button
                  key={cam.id}
                  onClick={() => setCamView(cam.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                    cameraPreset === cam.id
                      ? 'bg-sky-500/25 border border-sky-400/80 text-sky-200'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cam.label}
                </button>
              ))}
            </div>

            {/* Picture-in-Picture: Observer's Sky View from Earth */}
            <div className="absolute top-4 right-4 z-10 bg-[#090e24]/90 backdrop-blur-xl border border-white/15 p-2.5 rounded-2xl shadow-2xl flex flex-col items-center">
              <div className="flex items-center gap-1.5 mb-1.5 text-[11px] font-bold text-slate-300">
                <Eye className="w-3.5 h-3.5 text-sky-400" />
                <span>{tLab.earthSkyView}</span>
              </div>
              <canvas
                ref={skyCanvasRef}
                width={150}
                height={150}
                className="rounded-xl border border-white/10 shadow-inner bg-black"
              />
              <span className="text-[10px] text-slate-400 mt-1 font-medium">
                {eclipseType === 'solar'
                  ? (Math.abs(moonAngle) < 3 || Math.abs(moonAngle - 360) < 3 ? '✨ Total Solar Eclipse' : 'Partial / New Moon')
                  : (Math.abs(180 - moonAngle) < 4 ? '🩸 Blood Moon (Totality)' : 'Partial / Full Moon')}
              </span>
            </div>

            {/* Bottom Real-Time Slider Bar over 3D viewport */}
            <div className="absolute bottom-4 left-4 right-4 z-10 bg-[#090e24]/85 backdrop-blur-xl border border-white/15 p-3 sm:p-4 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`p-2.5 rounded-xl border font-bold text-xs flex items-center gap-1.5 transition-all ${
                    isPlaying
                      ? 'bg-amber-500/25 border-amber-400 text-amber-200'
                      : 'bg-sky-500/20 border-sky-400/60 text-sky-300 hover:bg-sky-500/30'
                  }`}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlaying ? tLab.pauseMotion : tLab.playMotion}</span>
                </button>

                <button
                  onClick={() => setPreset(eclipseType, eclipseType === 'solar' ? 0 : 180)}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  title={tLab.resetAlignment}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">{tLab.resetAlignment}</span>
                </button>
              </div>

              {/* Angle Scrubber Slider */}
              <div className="flex-1 w-full flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-300 shrink-0 flex items-center gap-1">
                  <Sliders className="w-3.5 h-3.5 text-sky-400" />
                  <span className="hidden sm:inline">{tLab.sliderLabel}:</span>
                </span>

                <input
                  type="range"
                  min="0"
                  max="360"
                  step="0.5"
                  value={moonAngle}
                  onChange={(e) => {
                    setMoonAngle(parseFloat(e.target.value));
                    setIsPlaying(false);
                  }}
                  className="w-full accent-sky-400 h-2 bg-slate-700/60 rounded-lg cursor-pointer"
                />

                <span className="text-xs font-bold text-amber-300 shrink-0 w-12 text-right">
                  {Math.round(moonAngle)}°
                </span>
              </div>

              {/* Shadow Cones Toggle */}
              <button
                onClick={() => setShowShadowCones(!showShadowCones)}
                className={`p-2 rounded-xl border text-xs font-semibold transition-all shrink-0 ${
                  showShadowCones
                    ? 'bg-indigo-500/20 border-indigo-400/80 text-indigo-200'
                    : 'bg-white/5 border-white/10 text-slate-400'
                }`}
                title={tLab.shadowCones}
              >
                <Layers className="w-4 h-4 inline-block mr-1" />
                <span className="hidden lg:inline">{tLab.shadowCones}</span>
              </button>
            </div>
          </div>

          {/* RIGHT: Clear Educational Explanation & Step-by-Step Guide */}
          <div className="w-full lg:w-[420px] bg-[#070b1e] border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col overflow-y-auto p-5 sm:p-6 space-y-5 shrink-0">
            {/* Alignment Order Badge */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[11px] uppercase tracking-wider text-sky-400 font-bold block mb-1">
                {tLab.alignment}
              </span>
              <p className="text-sm font-bold text-white">
                {currentInfo.order}
              </p>
              <span className="text-xs text-amber-300/90 block mt-1">
                {currentInfo.phase}
              </span>
            </div>

            {/* Main Summary */}
            <div>
              <h3 className="text-base font-extrabold text-white mb-2">
                {currentInfo.heading}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {currentInfo.explanation}
              </p>
            </div>

            {/* Quick Presets for Students */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-400 block">
                {lang === 'en' ? 'Quick Test Alignments:' : 'សាកល្បងទីតាំងគ្រាសនានា៖'}
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setPreset(eclipseType, eclipseType === 'solar' ? 0 : 180)}
                  className="py-2 px-2 rounded-xl bg-white/5 hover:bg-sky-500/20 border border-white/10 hover:border-sky-400/60 text-xs font-semibold text-center text-slate-200 hover:text-white transition-all"
                >
                  {lang === 'en' ? 'Total (0°/180°)' : 'ពេញលេញ'}
                </button>
                <button
                  onClick={() => setPreset(eclipseType, eclipseType === 'solar' ? 8 : 170)}
                  className="py-2 px-2 rounded-xl bg-white/5 hover:bg-sky-500/20 border border-white/10 hover:border-sky-400/60 text-xs font-semibold text-center text-slate-200 hover:text-white transition-all"
                >
                  {lang === 'en' ? 'Partial' : 'មួយផ្នែក'}
                </button>
                <button
                  onClick={() => setPreset(eclipseType, 90)}
                  className="py-2 px-2 rounded-xl bg-white/5 hover:bg-sky-500/20 border border-white/10 hover:border-sky-400/60 text-xs font-semibold text-center text-slate-200 hover:text-white transition-all"
                >
                  {lang === 'en' ? 'No Eclipse (90°)' : 'គ្មានគ្រាស'}
                </button>
              </div>
            </div>

            {/* Step-by-Step Educational Cards */}
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <h4 className="text-xs sm:text-sm font-bold text-sky-300">
                  {currentInfo.step1Title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {currentInfo.step1Desc}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <h4 className="text-xs sm:text-sm font-bold text-amber-300">
                  {currentInfo.step2Title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {currentInfo.step2Desc}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <h4 className="text-xs sm:text-sm font-bold text-indigo-300">
                  {currentInfo.step3Title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {currentInfo.step3Desc}
                </p>
              </div>
            </div>

            {/* Eclipse Categories */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-transparent border border-white/10 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400">
                {currentInfo.typesTitle}
              </h4>
              <div className="space-y-2">
                {currentInfo.types.map((type, idx) => (
                  <div key={idx} className="border-l-2 border-sky-400/60 pl-2.5 py-0.5">
                    <span className="text-xs font-bold text-slate-100 block">{type.name}</span>
                    <span className="text-[11px] text-slate-300 leading-relaxed block">{type.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Not Every Month? Question Box */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>{tLab.whyNotEveryMonthTitle}</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {tLab.whyNotEveryMonthDesc}
              </p>
            </div>

            {/* Safety Warning (For Solar Eclipse) */}
            {eclipseType === 'solar' && currentInfo.warning && (
              <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <p className="text-xs text-red-200/90 leading-relaxed">
                  {currentInfo.warning}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
