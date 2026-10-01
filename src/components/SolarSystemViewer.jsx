import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PLANETS_DATA } from '../data/planets';

// Helper to calculate responsive camera position so the full solar system (out to Neptune) fits completely
export const getOptimalFramingPosition = (width, height) => {
  const aspect = width / height;
  // Outermost planet is Neptune (dist: 70).
  // Orbit radius is 70, plus buffer for Saturn rings, planet labels, and comfortable margin
  const boundingRadius = 78;
  const vFovRad = THREE.MathUtils.degToRad(45);
  const tanHalfV = Math.tan(vFovRad / 2);

  // In Three.js perspective camera, visible half-width is: D * tanHalfV * aspect.
  // Visible half-height is: D * tanHalfV.
  // On mobile portrait, horizontal FOV is the tightest constraint:
  const distForWidth = (boundingRadius / (tanHalfV * aspect)) * 1.12;
  const distForHeight = (boundingRadius / tanHalfV) * 0.95;

  if (aspect >= 1.5) {
    // Desktop widescreen: dramatic cinematic perspective
    return new THREE.Vector3(0, 52, 115);
  }

  // Tablet or Mobile portrait / square:
  // Steeper elevation angle (48°) makes orbits circular and utilizes the tall mobile screen height gorgeously
  const dist = Math.max(distForWidth, distForHeight);
  const elevationDeg = aspect < 1.0 ? 48 : 38;
  const elevationRad = THREE.MathUtils.degToRad(elevationDeg);

  const y = dist * Math.sin(elevationRad);
  const z = dist * Math.cos(elevationRad);

  return new THREE.Vector3(0, y, z);
};

export default function SolarSystemViewer({
  orbitActive = true,
  speedMultiplier = 1,
  showOrbitPaths = true,
  showLabels = true,
  selectedPlanetId = null,
  focusedPlanetId = null,
  onSelectPlanet = () => {},
  lang = 'en'
}) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const planetMeshesRef = useRef({});
  const orbitLinesRef = useRef([]);
  const animFrameIdRef = useRef(null);
  const [screenLabels, setScreenLabels] = useState([]);

  // Store references for dynamic state access in animation loop
  const stateRef = useRef({
    orbitActive,
    speedMultiplier,
    focusedPlanetId,
    showLabels
  });

  useEffect(() => {
    stateRef.current.orbitActive = orbitActive;
    stateRef.current.speedMultiplier = speedMultiplier;
    stateRef.current.focusedPlanetId = focusedPlanetId;
    stateRef.current.showLabels = showLabels;
  }, [orbitActive, speedMultiplier, focusedPlanetId, showLabels]);

  // Handle orbit lines visibility
  useEffect(() => {
    orbitLinesRef.current.forEach(line => {
      line.visible = showOrbitPaths;
    });
  }, [showOrbitPaths]);

  // Main Three.js Scene Setup (Preserving Original Animation Source)
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    // Ultra-light fog so outer planets (Saturn, Uranus, Neptune) and mobile zoomed-out views are crystal clear
    scene.fog = new THREE.FogExp2(0x020206, 0.0006);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Far plane at 2500 for deep cosmic framing on mobile & desktop
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2500);
    // Responsive framing position so all planets from Mercury to Neptune are immediately in view
    const initialCamPos = getOptimalFramingPosition(width, height);
    camera.position.copy(initialCamPos);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x020206, 1);
    rendererRef.current = renderer;

    // Remove any existing canvas children
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 6;
    controls.maxDistance = 1200; // Allows full solar system framing on all devices
    controls.target.set(0, 0, 0);
    controlsRef.current = controls;

    // 2. Lighting (Clear, balanced celestial lighting)
    const ambientLight = new THREE.AmbientLight(0x444466, 1.15);
    scene.add(ambientLight);

    const sunLight = new THREE.PointLight(0xffffff, 2.8, 550);
    scene.add(sunLight);

    // 3. Background Subtle Starfield
    const starCount = 1800;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 500 + Math.random() * 400;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2.0 * Math.random() - 1.0);
      starPos[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPos[i * 3 + 2] = r * Math.cos(phi);
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      size: 1.2,
      color: 0xffffff,
      transparent: true,
      opacity: 0.75
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 4. Celestial Hierarchy & System Group (Original Animation Preserved)
    const systemGroup = new THREE.Group();
    scene.add(systemGroup);

    const planetMeshes = {};
    const orbitLines = [];
    const clickableObjects = [];

    PLANETS_DATA.forEach(spec => {
      const pGroup = new THREE.Group();

      if (spec.id === "sun") {
        // Glowing Central Star (Original Clean Golden Star)
        const sunGeo = new THREE.SphereGeometry(spec.r, 32, 32);
        const sunMat = new THREE.MeshBasicMaterial({ color: 0xffcc00 });
        const sunMesh = new THREE.Mesh(sunGeo, sunMat);
        sunMesh.userData = { id: spec.id, isPlanet: true };
        pGroup.add(sunMesh);
        clickableObjects.push(sunMesh);

        // Sun Corona Flare Billboard Canvas (Original)
        const flareCanvas = document.createElement('canvas');
        flareCanvas.width = 256;
        flareCanvas.height = 256;
        const ctx = flareCanvas.getContext('2d');
        const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
        grad.addColorStop(0, 'rgba(255, 240, 150, 1.0)');
        grad.addColorStop(0.35, 'rgba(255, 170, 0, 0.65)');
        grad.addColorStop(0.75, 'rgba(249, 115, 22, 0.15)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 256, 256);

        const flareTexture = new THREE.CanvasTexture(flareCanvas);
        const flareMat = new THREE.SpriteMaterial({
          map: flareTexture,
          transparent: true,
          blending: THREE.AdditiveBlending
        });
        const flareSprite = new THREE.Sprite(flareMat);
        flareSprite.scale.set(spec.r * 5.2, spec.r * 5.2, 1);
        pGroup.add(flareSprite);
      } else {
        // Orbiting Planet (Original clean geometry with vivid, radiant color)
        const pGeo = new THREE.SphereGeometry(spec.r, 32, 32);
        const pMat = new THREE.MeshStandardMaterial({
          color: spec.color,
          roughness: 0.45,
          metalness: 0.15,
          emissive: spec.color,
          emissiveIntensity: 0.18 // Ensures each planet is vivid and easily visible
        });
        const pMesh = new THREE.Mesh(pGeo, pMat);
        pMesh.userData = { id: spec.id, isPlanet: true };
        pGroup.add(pMesh);
        clickableObjects.push(pMesh);

        // Earth's Moon (Original)
        if (spec.hasMoon) {
          const moonGeo = new THREE.SphereGeometry(0.35, 16, 16);
          const moonMat = new THREE.MeshStandardMaterial({
            color: 0xd1d5db,
            roughness: 0.5,
            emissive: 0x9ca3af,
            emissiveIntensity: 0.1
          });
          const moonMesh = new THREE.Mesh(moonGeo, moonMat);
          moonMesh.position.set(2.2, 0, 0);
          pGroup.add(moonMesh);
        }

        // Saturn / Uranus Rings (Original)
        if (spec.hasRings) {
          const ringGeo = new THREE.RingGeometry(spec.r * 1.4, spec.r * 2.3, 64);
          const ringMat = new THREE.MeshBasicMaterial({
            color: spec.color,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.75
          });
          const ringMesh = new THREE.Mesh(ringGeo, ringMat);
          ringMesh.rotation.x = Math.PI / 2.2;
          pGroup.add(ringMesh);
        }

        // Orbital Line (Color-coded to each planet for instant tracking)
        const orbitGeo = new THREE.BufferGeometry();
        const points = [];
        for (let i = 0; i <= 128; i++) {
          const theta = (i / 128) * Math.PI * 2;
          points.push(new THREE.Vector3(Math.cos(theta) * spec.dist, 0, Math.sin(theta) * spec.dist));
        }
        orbitGeo.setFromPoints(points);
        const orbitMat = new THREE.LineBasicMaterial({
          color: spec.color,
          transparent: true,
          opacity: 0.28
        });
        const orbitMesh = new THREE.Line(orbitGeo, orbitMat);
        orbitMesh.visible = showOrbitPaths;
        systemGroup.add(orbitMesh);
        orbitLines.push(orbitMesh);

        // Random start position along orbit (Original)
        const angle = Math.random() * Math.PI * 2;
        pGroup.position.set(Math.cos(angle) * spec.dist, 0, Math.sin(angle) * spec.dist);
        pGroup.userData = { angle: angle, dist: spec.dist, speed: spec.speed, id: spec.id };
      }

      systemGroup.add(pGroup);
      planetMeshes[spec.id] = pGroup;
    });

    planetMeshesRef.current = planetMeshes;
    orbitLinesRef.current = orbitLines;

    // 5. Asteroid Belt (Original 1500 asteroids)
    const asteroidCount = 1500;
    const asteroidPositions = new Float32Array(asteroidCount * 3);
    for (let i = 0; i < asteroidCount; i++) {
      const r = 30 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      asteroidPositions[i * 3 + 0] = Math.cos(theta) * r + (Math.random() - 0.5) * 1.5;
      asteroidPositions[i * 3 + 1] = (Math.random() - 0.5) * 1.2;
      asteroidPositions[i * 3 + 2] = Math.sin(theta) * r + (Math.random() - 0.5) * 1.5;
    }
    const asteroidGeo = new THREE.BufferGeometry();
    asteroidGeo.setAttribute('position', new THREE.BufferAttribute(asteroidPositions, 3));
    const asteroidMat = new THREE.PointsMaterial({
      size: 0.65,
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.65
    });
    const asteroidField = new THREE.Points(asteroidGeo, asteroidMat);
    systemGroup.add(asteroidField);

    // 6. Raycasting for Planet Selection (safe for drag vs tap)
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    let pointerStartX = 0;
    let pointerStartY = 0;
    let isPointerMoved = false;

    const handlePointerDown = (event) => {
      pointerStartX = event.clientX;
      pointerStartY = event.clientY;
      isPointerMoved = false;
    };

    const handlePointerMove = (event) => {
      if (Math.hypot(event.clientX - pointerStartX, event.clientY - pointerStartY) > 6) {
        isPointerMoved = true;
      }
    };

    const handlePointerUp = (event) => {
      if (isPointerMoved) return; // Ignore drag gestures (rotating / pinch zoom)
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(clickableObjects);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit.userData && hit.userData.id) {
          onSelectPlanet(hit.userData.id);
        }
      }
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('pointerdown', handlePointerDown);
    domElement.addEventListener('pointermove', handlePointerMove);
    domElement.addEventListener('pointerup', handlePointerUp);

    // 7. Animation Loop (Exact preservation of physics + smooth camera lerp & label updates)
    const clock = new THREE.Clock();
    const tempVec = new THREE.Vector3();
    const targetLookAt = new THREE.Vector3(0, 0, 0);

    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      const { orbitActive: isOrbiting, speedMultiplier: spd, focusedPlanetId: focusedId, showLabels: isLabelsOn } = stateRef.current;

      // Planet Orbits & Axial Rotations (Original logic)
      PLANETS_DATA.forEach(spec => {
        if (spec.id !== "sun") {
          const pGroup = planetMeshes[spec.id];
          if (pGroup) {
            if (isOrbiting) {
              pGroup.userData.angle += spec.speed * delta * 15 * spd;
              pGroup.position.x = Math.cos(pGroup.userData.angle) * spec.dist;
              pGroup.position.z = Math.sin(pGroup.userData.angle) * spec.dist;
            }
            if (pGroup.children[0]) {
              pGroup.children[0].rotation.y += 0.01;
            }
          }
        }
      });

      // Asteroid Field Slow Rotation (Original)
      if (isOrbiting) {
        asteroidField.rotation.y += 0.0005 * spd;
      }

      // Gentle Starfield Drift (Original)
      starField.rotation.y += 0.00008;

      // Smooth Camera Focus Lerping
      if (focusedId && planetMeshes[focusedId]) {
        planetMeshes[focusedId].getWorldPosition(tempVec);
        targetLookAt.lerp(tempVec, 0.05);
        controls.target.copy(targetLookAt);
      } else {
        targetLookAt.lerp(new THREE.Vector3(0, 0, 0), 0.05);
        controls.target.copy(targetLookAt);
      }

      controls.update();
      renderer.render(scene, camera);

      // Compute 2D Screen Positions for Planet Labels
      if (isLabelsOn) {
        const labels = [];
        const w = renderer.domElement.clientWidth;
        const h = renderer.domElement.clientHeight;

        PLANETS_DATA.forEach(spec => {
          const pGroup = planetMeshes[spec.id];
          if (pGroup) {
            pGroup.getWorldPosition(tempVec);
            // Offset label slightly above planet sphere
            tempVec.y += spec.r + 1.2;
            tempVec.project(camera);

            // Only display if within front frustum
            if (tempVec.z < 1) {
              const x = (tempVec.x * 0.5 + 0.5) * w;
              const y = (-tempVec.y * 0.5 + 0.5) * h;
              labels.push({
                id: spec.id,
                name: spec.names[lang] || spec.names.en,
                x,
                y,
                color: spec.hexColor
              });
            }
          }
        });
        setScreenLabels(labels);
      } else {
        setScreenLabels([]);
      }
    };

    animate();

    // 8. Resize Handler (Responsive Camera Framing)
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Keep full solar system framed if in overview mode (target at center)
      if (!stateRef.current.focusedPlanetId && controlsRef.current) {
        if (controlsRef.current.target.lengthSq() < 5) {
          const optimalPos = getOptimalFramingPosition(w, h);
          camera.position.copy(optimalPos);
          controlsRef.current.update();
        }
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      domElement.removeEventListener('pointerdown', handlePointerDown);
      domElement.removeEventListener('pointermove', handlePointerMove);
      domElement.removeEventListener('pointerup', handlePointerUp);
      renderer.dispose();
      starGeo.dispose();
      starMat.dispose();
      asteroidGeo.dispose();
      asteroidMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [lang, onSelectPlanet, showOrbitPaths]);

  // Expose camera control triggers via window events / imperative helpers
  useEffect(() => {
    const handleResetCam = () => {
      if (cameraRef.current && controlsRef.current && mountRef.current) {
        const w = mountRef.current.clientWidth || window.innerWidth;
        const h = mountRef.current.clientHeight || window.innerHeight;
        const optimalPos = getOptimalFramingPosition(w, h);
        cameraRef.current.position.copy(optimalPos);
        controlsRef.current.target.set(0, 0, 0);
        controlsRef.current.update();
      }
    };

    const handleZoomIn = () => {
      if (cameraRef.current && controlsRef.current) {
        const dir = new THREE.Vector3();
        cameraRef.current.getWorldDirection(dir);
        const dist = cameraRef.current.position.distanceTo(controlsRef.current.target);
        const step = Math.max(12, dist * 0.18);
        cameraRef.current.position.addScaledVector(dir, step);
        controlsRef.current.update();
      }
    };

    const handleZoomOut = () => {
      if (cameraRef.current && controlsRef.current) {
        const dir = new THREE.Vector3();
        cameraRef.current.getWorldDirection(dir);
        const dist = cameraRef.current.position.distanceTo(controlsRef.current.target);
        const step = Math.max(12, dist * 0.18);
        cameraRef.current.position.addScaledVector(dir, -step);
        controlsRef.current.update();
      }
    };

    window.addEventListener('solar:resetCamera', handleResetCam);
    window.addEventListener('solar:zoomIn', handleZoomIn);
    window.addEventListener('solar:zoomOut', handleZoomOut);

    return () => {
      window.removeEventListener('solar:resetCamera', handleResetCam);
      window.removeEventListener('solar:zoomIn', handleZoomIn);
      window.removeEventListener('solar:zoomOut', handleZoomOut);
    };
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      {/* Canvas Viewport */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full z-0 cursor-grab active:cursor-grabbing" />

      {/* Cinematic Radial Vignette (Original design preserved) */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(2,2,6,0.4)_75%,rgba(2,2,6,0.95)_100%)]" />

      {/* Screen Space 2D Floating Planet Labels */}
      {showLabels && (
        <div className="absolute inset-0 pointer-events-none z-20">
          {screenLabels.map(label => (
            <div
              key={label.id}
              onClick={() => onSelectPlanet(label.id)}
              className="absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200"
              style={{
                left: `${label.x}px`,
                top: `${label.y}px`
              }}
            >
              <div
                className={`flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold backdrop-blur-md border transition-all hover:scale-110 shadow-lg ${
                  selectedPlanetId === label.id
                    ? 'bg-sky-500/30 border-sky-400 text-sky-200 ring-2 ring-sky-400/50'
                    : 'bg-black/75 border-white/20 text-slate-200 hover:border-sky-400 hover:text-white'
                }`}
              >
                <span
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shadow-sm shrink-0"
                  style={{ backgroundColor: label.color }}
                />
                <span className="tracking-wide drop-shadow-sm whitespace-nowrap">{label.name}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
