import React, { useState, useEffect } from 'react';
import SolarSystemViewer from './components/SolarSystemViewer';
import Navbar from './components/Navbar';
import PlanetDock from './components/PlanetDock';
import ControlsOverlay from './components/ControlsOverlay';
import PlanetModal from './components/PlanetModal';
import EducationalModal from './components/EducationalModal';
import EclipseSimulatorModal from './components/EclipseSimulatorModal';
import Footer from './components/Footer';

import { en } from './translations/en';
import { km } from './translations/km';

export default function App() {
  const [lang, setLang] = useState('en');
  const [orbitActive, setOrbitActive] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [showOrbitPaths, setShowOrbitPaths] = useState(true);
  const [showLabels, setShowLabels] = useState(true);

  const [selectedPlanetId, setSelectedPlanetId] = useState(null);
  const [focusedPlanetId, setFocusedPlanetId] = useState(null);
  const [isExhibitsOpen, setIsExhibitsOpen] = useState(false);
  const [isEclipseLabOpen, setIsEclipseLabOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const t = lang === 'en' ? en : km;

  // Sync html lang attribute and font styling
  useEffect(() => {
    document.documentElement.lang = lang;
    document.body.setAttribute('data-lang', lang);
  }, [lang]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const handleToggleLang = () => {
    setLang(prev => (prev === 'en' ? 'km' : 'en'));
  };

  const handleToggleOrbit = () => {
    setOrbitActive(prev => !prev);
  };

  const handleCycleSpeed = () => {
    const speeds = [0.5, 1, 2, 4];
    const currentIndex = speeds.indexOf(speedMultiplier);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setSpeedMultiplier(speeds[nextIndex]);
  };

  const handleTogglePaths = () => {
    setShowOrbitPaths(prev => !prev);
  };

  const handleToggleLabels = () => {
    setShowLabels(prev => !prev);
  };

  const handleSelectPlanet = (planetId) => {
    setSelectedPlanetId(planetId);
    setFocusedPlanetId(planetId);
  };

  const handleFocusPlanet = (planetId) => {
    if (focusedPlanetId === planetId) {
      setFocusedPlanetId(null);
      window.dispatchEvent(new CustomEvent('solar:resetCamera'));
    } else {
      setFocusedPlanetId(planetId);
    }
  };

  const handleResetView = () => {
    setSelectedPlanetId(null);
    setFocusedPlanetId(null);
    window.dispatchEvent(new CustomEvent('solar:resetCamera'));
  };

  const handleZoomIn = () => {
    window.dispatchEvent(new CustomEvent('solar:zoomIn'));
  };

  const handleZoomOut = () => {
    window.dispatchEvent(new CustomEvent('solar:zoomOut'));
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div
      className={`relative w-screen h-screen overflow-hidden bg-[#020206] text-[#f8fafc] ${
        lang === 'km' ? 'font-khmer' : 'font-en'
      }`}
    >
      {/* 3D Solar System Canvas (Core Animation Preserved) */}
      <SolarSystemViewer
        orbitActive={orbitActive}
        speedMultiplier={speedMultiplier}
        showOrbitPaths={showOrbitPaths}
        showLabels={showLabels}
        selectedPlanetId={selectedPlanetId}
        focusedPlanetId={focusedPlanetId}
        onSelectPlanet={handleSelectPlanet}
        lang={lang}
      />

      {/* Top Navigation Bar */}
      <Navbar
        lang={lang}
        onToggleLang={handleToggleLang}
        t={t}
        onOpenExhibits={() => setIsExhibitsOpen(true)}
        onOpenEclipseLab={() => setIsEclipseLabOpen(true)}
        onSelectPlanet={handleSelectPlanet}
        onResetView={handleResetView}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
      />

      {/* Interactive Controls Overlay Bar */}
      <ControlsOverlay
        t={t}
        orbitActive={orbitActive}
        onToggleOrbit={handleToggleOrbit}
        speedMultiplier={speedMultiplier}
        onCycleSpeed={handleCycleSpeed}
        showOrbitPaths={showOrbitPaths}
        onTogglePaths={handleTogglePaths}
        showLabels={showLabels}
        onToggleLabels={handleToggleLabels}
        onResetView={handleResetView}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
      />

      {/* Bottom Planet Selection Dock */}
      <PlanetDock
        selectedPlanetId={selectedPlanetId}
        onSelectPlanet={handleSelectPlanet}
        lang={lang}
      />

      {/* Planet Detailed Information Modal / Drawer */}
      {selectedPlanetId && (
        <PlanetModal
          planetId={selectedPlanetId}
          onClose={() => setSelectedPlanetId(null)}
          lang={lang}
          t={t}
          onFocusPlanet={handleFocusPlanet}
          isFocused={focusedPlanetId === selectedPlanetId}
        />
      )}

      {/* Comprehensive Educational Exhibits Modal */}
      <EducationalModal
        isOpen={isExhibitsOpen}
        onClose={() => setIsExhibitsOpen(false)}
        lang={lang}
        t={t}
        onSelectPlanet={handleSelectPlanet}
      />

      {/* 3D Solar & Lunar Eclipse Laboratory Modal */}
      <EclipseSimulatorModal
        isOpen={isEclipseLabOpen}
        onClose={() => setIsEclipseLabOpen(false)}
        lang={lang}
        t={t}
      />

      {/* Minimal Footer */}
      <Footer t={t} onOpenExhibits={() => setIsExhibitsOpen(true)} />
    </div>
  );
}
