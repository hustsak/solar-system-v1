import * as THREE from 'three';

// Procedural Equirectangular Texture Generator for Three.js Spheres (1024x512)
export function createPlanetTexture(planetId) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  switch (planetId) {
    case 'sun': {
      // Vivid Solar Granules and Glowing Plasma
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, '#fef08a');
      grad.addColorStop(0.3, '#f59e0b');
      grad.addColorStop(0.5, '#ea580c');
      grad.addColorStop(0.7, '#f59e0b');
      grad.addColorStop(1, '#fef08a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Granule noise & flares
      for (let i = 0; i < 4000; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const rad = 2 + Math.random() * 8;
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 255, 200, 0.25)' : 'rgba(234, 88, 12, 0.25)';
        ctx.beginPath();
        ctx.arc(x, y, rad, 0, Math.PI * 2);
        ctx.fill();
      }

      // Sunspots
      for (let i = 0; i < 12; i++) {
        const sx = 150 + Math.random() * (w - 300);
        const sy = 180 + Math.random() * 150;
        const sr = 6 + Math.random() * 12;
        ctx.fillStyle = 'rgba(67, 20, 7, 0.85)';
        ctx.beginPath();
        ctx.arc(sx, sy, sr, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(154, 52, 18, 0.5)';
        ctx.beginPath();
        ctx.arc(sx, sy, sr * 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }

    case 'mercury': {
      // Slate Gray, Craters & Highland Ridges
      ctx.fillStyle = '#6b7280';
      ctx.fillRect(0, 0, w, h);

      // Regolith texture
      for (let i = 0; i < 3000; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const r = Math.random() * 4;
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(209, 213, 219, 0.2)' : 'rgba(31, 41, 55, 0.25)';
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Craters with bright rims and ejecta rays
      for (let i = 0; i < 60; i++) {
        const cx = Math.random() * w;
        const cy = Math.random() * h;
        const cr = 4 + Math.random() * 18;

        ctx.fillStyle = 'rgba(17, 24, 39, 0.6)';
        ctx.beginPath();
        ctx.arc(cx, cy, cr, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(229, 231, 235, 0.7)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Central peak
        ctx.fillStyle = 'rgba(243, 244, 246, 0.8)';
        ctx.beginPath();
        ctx.arc(cx, cy, cr * 0.2, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }

    case 'venus': {
      // Swirling Golden Amber Greenhouse Atmosphere
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, '#fef3c7');
      grad.addColorStop(0.2, '#fde68a');
      grad.addColorStop(0.4, '#f59e0b');
      grad.addColorStop(0.6, '#fbbf24');
      grad.addColorStop(0.8, '#d97706');
      grad.addColorStop(1, '#fef3c7');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Diagonal atmospheric winds
      ctx.lineWidth = 14;
      for (let i = -w; i < w * 2; i += 30) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.bezierCurveTo(i + 150, 150, i - 100, 350, i + 80, h);
        ctx.stroke();
      }
      break;
    }

    case 'earth': {
      // Deep Azure Oceans
      ctx.fillStyle = '#1d4ed8';
      ctx.fillRect(0, 0, w, h);

      // Ocean color variations / Continental shelves
      for (let i = 0; i < 15; i++) {
        const ox = Math.random() * w;
        const oy = Math.random() * h;
        const or = 40 + Math.random() * 80;
        ctx.fillStyle = 'rgba(30, 64, 175, 0.4)';
        ctx.beginPath();
        ctx.arc(ox, oy, or, 0, Math.PI * 2);
        ctx.fill();
      }

      // Continents (Africa, Europe, Americas, Asia, Oceania approximations)
      ctx.fillStyle = '#15803d'; // Rich green
      const drawContinent = (x, y, rx, ry, col = '#15803d') => {
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
        ctx.fill();
        // Inner mountain / desert ochre
        ctx.fillStyle = '#b45309';
        ctx.beginPath();
        ctx.ellipse(x, y, rx * 0.5, ry * 0.4, 0, 0, Math.PI * 2);
        ctx.fill();
      };

      drawContinent(250, 220, 60, 100); // North America
      drawContinent(320, 360, 45, 80);  // South America
      drawContinent(520, 260, 55, 75);  // Africa
      drawContinent(550, 140, 65, 50);  // Europe
      drawContinent(720, 180, 120, 80); // Asia
      drawContinent(820, 360, 50, 40);  // Australia

      // Polar Ice Caps
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, w, 35); // North Pole
      ctx.fillRect(0, h - 45, w, 45); // Antarctica

      // Swirling White Cloud Cover
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      for (let i = 0; i < 200; i++) {
        const cx = Math.random() * w;
        const cy = 40 + Math.random() * (h - 80);
        const crx = 25 + Math.random() * 60;
        const cry = 6 + Math.random() * 15;
        ctx.beginPath();
        ctx.ellipse(cx, cy, crx, cry, Math.PI / 10, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }

    case 'mars': {
      // Rusty Red Ochre & Dark Basaltic Plains
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, '#ea580c');
      grad.addColorStop(0.3, '#c2410c');
      grad.addColorStop(0.7, '#9a3412');
      grad.addColorStop(1, '#ea580c');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Dark volcanic maria (Syrtis Major & Acidalia Planitia)
      ctx.fillStyle = 'rgba(67, 20, 7, 0.6)';
      for (let i = 0; i < 20; i++) {
        const mx = Math.random() * w;
        const my = 150 + Math.random() * 200;
        const mrx = 30 + Math.random() * 80;
        const mry = 20 + Math.random() * 40;
        ctx.beginPath();
        ctx.ellipse(mx, my, mrx, mry, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Craters and canyon fissures
      ctx.strokeStyle = 'rgba(251, 146, 60, 0.5)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(w * 0.3, h * 0.5);
      ctx.lineTo(w * 0.6, h * 0.52); // Valles Marineris representation
      ctx.stroke();

      // White Polar Ice Caps
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, w, 22);
      ctx.fillRect(0, h - 28, w, 28);
      break;
    }

    case 'jupiter': {
      // Iconic Horizontal Cloud Belts
      const bands = [
        '#fef08a', '#fed7aa', '#ea580c', '#c2410c', '#7c2d12',
        '#fef08a', '#ea580c', '#fed7aa', '#fde047', '#9a3412'
      ];
      const bandHeight = h / bands.length;
      bands.forEach((color, idx) => {
        ctx.fillStyle = color;
        ctx.fillRect(0, idx * bandHeight, w, bandHeight + 2);
      });

      // Atmospheric wavy turbulence
      ctx.lineWidth = 5;
      for (let y = 0; y < h; y += 18) {
        ctx.strokeStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.2)' : 'rgba(67,20,7,0.25)';
        ctx.beginPath();
        ctx.moveTo(0, y);
        for (let x = 0; x < w; x += 40) {
          ctx.lineTo(x, y + Math.sin(x * 0.05) * 6);
        }
        ctx.stroke();
      }

      // The Great Red Spot
      const grsX = w * 0.65;
      const grsY = h * 0.65;
      const grsW = 55;
      const grsH = 32;

      ctx.fillStyle = '#b91c1c'; // Deep crimson red
      ctx.beginPath();
      ctx.ellipse(grsX, grsY, grsW, grsH, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ef4444'; // Inner vortex
      ctx.beginPath();
      ctx.ellipse(grsX, grsY, grsW * 0.6, grsH * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Swirling white eddy ring around GRS
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(grsX, grsY, grsW * 1.2, grsH * 1.25, 0, 0, Math.PI * 2);
      ctx.stroke();
      break;
    }

    case 'saturn': {
      // Elegant Golden Butterscotch & Honey Bands
      const bands = [
        '#fef3c7', '#fde68a', '#fcd34d', '#f59e0b',
        '#fbbf24', '#fde68a', '#d97706', '#fef3c7'
      ];
      const bandHeight = h / bands.length;
      bands.forEach((color, idx) => {
        ctx.fillStyle = color;
        ctx.fillRect(0, idx * bandHeight, w, bandHeight + 2);
      });

      // Subtle haze
      for (let y = 0; y < h; y += 12) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.fillRect(0, y, w, 4);
      }
      break;
    }

    case 'uranus': {
      // Soft Aquamarine Cyan with Gentle Latitudinal Gradients
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, '#cffafe');
      grad.addColorStop(0.3, '#67e8f9');
      grad.addColorStop(0.5, '#22d3ee');
      grad.addColorStop(0.7, '#06b6d4');
      grad.addColorStop(1, '#cffafe');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Soft polar methane haze
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.fillRect(0, 0, w, 60);
      ctx.fillRect(0, h - 60, w, 60);
      break;
    }

    case 'neptune': {
      // Vivid Deep Azure Cobalt Blue & Cirrus Storms
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, '#1e40af');
      grad.addColorStop(0.2, '#1d4ed8');
      grad.addColorStop(0.4, '#2563eb');
      grad.addColorStop(0.6, '#1d4ed8');
      grad.addColorStop(0.8, '#1e3a8a');
      grad.addColorStop(1, '#1e40af');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Dark storm belt
      ctx.fillStyle = 'rgba(15, 23, 42, 0.4)';
      ctx.fillRect(0, h * 0.45, w, 45);

      // Bright white high-altitude methane cirrus clouds (The Scooter)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      for (let i = 0; i < 35; i++) {
        const cx = Math.random() * w;
        const cy = 100 + Math.random() * (h - 200);
        const crx = 15 + Math.random() * 45;
        const cry = 2 + Math.random() * 5;
        ctx.beginPath();
        ctx.ellipse(cx, cy, crx, cry, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }

    case 'moon': {
      // Silvery Gray Lunar Regolith & Basalt Maria
      ctx.fillStyle = '#9ca3af';
      ctx.fillRect(0, 0, w, h);

      // Lunar Maria (Dark plains)
      ctx.fillStyle = '#4b5563';
      for (let i = 0; i < 8; i++) {
        const mx = Math.random() * w;
        const my = Math.random() * h;
        const mr = 40 + Math.random() * 70;
        ctx.beginPath();
        ctx.arc(mx, my, mr, 0, Math.PI * 2);
        ctx.fill();
      }

      // Small craters
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 40; i++) {
        const cx = Math.random() * w;
        const cy = Math.random() * h;
        const cr = 4 + Math.random() * 12;
        ctx.beginPath();
        ctx.arc(cx, cy, cr, 0, Math.PI * 2);
        ctx.stroke();
      }
      break;
    }

    default:
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(0, 0, w, h);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// Procedural Saturn / Uranus Ring Texture (Radial Gradient with Cassini Division)
export function createRingTexture(type = 'saturn') {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);

  if (type === 'saturn') {
    // Ring C (inner faint)
    grad.addColorStop(0, 'rgba(180, 160, 120, 0.1)');
    grad.addColorStop(0.15, 'rgba(210, 190, 140, 0.4)');
    // Ring B (bright dense)
    grad.addColorStop(0.2, 'rgba(240, 220, 170, 0.9)');
    grad.addColorStop(0.55, 'rgba(255, 235, 185, 0.95)');
    // Cassini Division (transparent dark gap)
    grad.addColorStop(0.58, 'rgba(0, 0, 0, 0.02)');
    grad.addColorStop(0.62, 'rgba(0, 0, 0, 0.02)');
    // Ring A (outer)
    grad.addColorStop(0.65, 'rgba(230, 210, 160, 0.75)');
    grad.addColorStop(0.85, 'rgba(200, 180, 130, 0.6)');
    // Encke gap & outer boundary
    grad.addColorStop(0.9, 'rgba(150, 130, 100, 0.2)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  } else {
    // Uranus faint silver-cyan ring
    grad.addColorStop(0, 'rgba(6, 182, 212, 0)');
    grad.addColorStop(0.3, 'rgba(103, 232, 249, 0.5)');
    grad.addColorStop(0.7, 'rgba(6, 182, 212, 0.6)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  }

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}
